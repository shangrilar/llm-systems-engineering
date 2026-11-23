"""Deterministic source packaging and verified result transport."""
from __future__ import annotations
import fnmatch
import gzip
import hashlib
import io
import shutil
import tarfile
import urllib.request
from pathlib import Path


def sha256_file(path):
    digest = hashlib.sha256()
    with Path(path).open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def source_archive(job):
    root = Path(job["source_root"]).resolve()
    files = {}
    for pattern in job["sources"]:
        for path in sorted(root.glob(pattern)):
            relative = path.relative_to(root)
            if path.is_symlink() or root not in path.resolve().parents:
                raise ValueError("Source links/outside paths are not allowed")
            if not path.is_file():
                continue
            if any(part.startswith(".") or part in ("__pycache__", "data-cache", "wandb", "outputs", "references", "plans") for part in relative.parts):
                raise ValueError("Private/generated source path is not allowed")
            if path.suffix in (".pem", ".key"):
                raise ValueError("Credential file is not allowed")
            if relative.parts[0] == "experiment_runner":
                raise ValueError("experiment_runner is reserved for the shared package")
            files[relative.as_posix()] = path
    if not files:
        raise ValueError("Source allowlist selected no files")
    for path in Path(__file__).parent.glob("*.py"):
        files["experiment_runner/" + path.name] = path
    stream = io.BytesIO()
    with gzip.GzipFile(fileobj=stream, mode="wb", mtime=0) as compressed:
        with tarfile.open(fileobj=compressed, mode="w") as archive:
            for name, path in sorted(files.items()):
                data = path.read_bytes()
                item = tarfile.TarInfo(name)
                item.size, item.mtime, item.mode = len(data), 0, 0o644
                archive.addfile(item, io.BytesIO(data))
    return stream.getvalue()


def archive_results(output, destination, include=None, exclude=None):
    output = Path(output).resolve()
    # Do not dereference experiment-created links (including W&B log aliases).
    with tarfile.open(destination, "w:gz") as archive:
        for path in sorted(output.rglob("*")):
            if not path.is_file() or path.is_symlink() or output not in path.resolve().parents:
                continue
            name = path.relative_to(output).as_posix()
            mandatory = name in ("worker.log", "worker-status.json", "job.json", "config.json", "provenance.json")
            selected = any(fnmatch.fnmatch(name, p) for p in (include or ["*"]))
            excluded = any(fnmatch.fnmatch(name, p) for p in (exclude or []))
            if mandatory or (selected and not excluded):
                archive.add(path, arcname=name)
    return sha256_file(destination)


def unpack_results(archive, destination):
    destination = Path(destination).resolve()
    destination.mkdir(parents=True, exist_ok=True)
    with tarfile.open(archive, "r:gz") as source:
        for member in source.getmembers():
            target = (destination / member.name).resolve()
            if destination not in target.parents or not (member.isfile() or member.isdir() or member.issym() or member.islnk()):
                raise ValueError("Unsafe result archive")
        for member in source.getmembers():
            # W&B writes log aliases as symlinks. Never follow or create archive
            # links; the actual regular log files are also included by the worker.
            if member.issym() or member.islnk():
                continue
            target = destination / member.name
            if member.isdir():
                target.mkdir(parents=True, exist_ok=True)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                with source.extractfile(member) as data, target.open("wb") as result:
                    import shutil
                    shutil.copyfileobj(data, result)


def collect(state, destination):
    destination = Path(destination)
    destination.mkdir(parents=True, exist_ok=True)
    archive = destination / "results.tar.gz"
    request = urllib.request.Request(state["url"] + "/results", headers={"Authorization": "Bearer " + state["auth"],
                                                                        "User-Agent": "experiment-runner/0.1"})
    with urllib.request.urlopen(request, timeout=180) as response, archive.open("wb") as output:
        expected = response.headers.get("X-Content-SHA256")
        import shutil
        shutil.copyfileobj(response, output)
    if not expected or sha256_file(archive) != expected:
        raise RuntimeError("Result download checksum failed; Pod retained")
    unpack_results(archive, destination)
    archive.unlink()
    return destination
