"""Authenticated worker executing commands supplied by an experiment."""
from __future__ import annotations
import base64
import hmac
import json
import os
import signal
import subprocess
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from .artifacts import archive_results, sha256_file
from .job import validate_job
from .state import write_json


def read_status_files(job, output):
    response = {}
    root = Path(output).resolve()
    for field, name in job.get("status_files", {}).items():
        path = root / name
        if not path.is_file() or path.is_symlink() or root not in path.resolve().parents:
            continue
        try:
            # Progress JSONL may be large; only read the final complete record.
            with path.open("rb") as stream:
                if name.endswith(".jsonl"):
                    stream.seek(max(0, path.stat().st_size - 65536))
                text = stream.read(65536).decode()
            response[field] = json.loads(text.splitlines()[-1] if name.endswith(".jsonl") else text)
        except (ValueError, IndexError, OSError):
            pass
    return response


def run_command(command, log, cwd, env, timeout):
    process = subprocess.Popen(command, cwd=cwd, env=env, stdout=log,
                               stderr=subprocess.STDOUT, start_new_session=True)
    try:
        code = process.wait(timeout=timeout)
    except BaseException:
        # A pip/compiler child must not continue consuming resources after timeout.
        try:
            os.killpg(process.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
        process.wait()
        raise
    if code:
        # Avoid echoing arbitrary command arguments (which could include credentials).
        raise RuntimeError("Stage process exited with code " + str(code))


def run_job(job, output, source_root=None, cache=None, update=None, deadline_at=None):
    """Local/Pod execution uses the same stages; no GPU/library dependencies here."""
    job = dict(job, source_root=str(source_root or job.get("source_root", ".")))
    validate_job(job)
    output = Path(output).resolve()
    output.mkdir(parents=True, exist_ok=True)
    source_root = Path(source_root or job.get("source_root", ".")).resolve()
    cache = Path(cache or "/workspace/cache").resolve()
    cache.mkdir(parents=True, exist_ok=True)
    update = update or (lambda **kwargs: None)
    write_json(output / "config.json", job.get("config", {}))
    # Only the remote contract is stored in results; no local credential paths.
    from .job import remote_job
    write_json(output / "job.json", remote_job(job))
    write_json(output / "provenance.json", json.loads(os.environ.get("EXPERIMENT_PROVENANCE", "{}")))
    env = os.environ.copy()
    env.update(job.get("env", {}))
    env.update(EXPERIMENT_OUTPUT_DIR=str(output), EXPERIMENT_CONFIG_PATH=str(output / "config.json"),
               EXPERIMENT_CACHE_DIR=str(cache))
    # Authentication belongs to the server, not experiment child processes.
    for key in ("RUNPOD_API_KEY", "EXPERIMENT_AUTH_TOKEN", "EXPERIMENT_SOURCE_B64", "EXPERIMENT_JOB_B64"):
        env.pop(key, None)
    started = time.monotonic()
    budget = job["runpod"]["max_seconds"]
    if deadline_at is not None:
        budget = min(budget, deadline_at - time.time())
    replacements = {"python": sys.executable, "output": str(output), "config": str(output / "config.json"),
                    "source": str(source_root), "cache": str(cache)}
    code = 1
    with (output / "worker.log").open("w") as log:
        try:
            for stage in job["stages"]:
                update(stage=stage["name"], finished=False, exit_code=None)
                remaining = budget - (time.monotonic() - started)
                if remaining <= 0:
                    raise TimeoutError("Worker wall-time exceeded")
                command = []
                for argument in stage["command"]:
                    for key, value in replacements.items():
                        argument = argument.replace("{" + key + "}", value)
                    command.append(argument)
                log.write("Stage: " + stage["name"] + "\n")
                log.flush()
                run_command(command, log, source_root, env, remaining)
            code = 0
        except Exception as error:
            log.write("\n" + type(error).__name__ + ": " + str(error) + "\n")
    write_json(output / "worker-status.json", {"exit_code": code, "wall_seconds": time.monotonic() - started})
    return code


def serve(job=None, run_id=None, secret=None, workspace="/workspace", port=8765, legacy_recovery=False):
    job = job or json.loads(base64.b64decode(os.environ.pop("EXPERIMENT_JOB_B64")))
    job = validate_job(dict(job, source_root=str(Path.cwd())))
    run_id = run_id or os.environ["EXPERIMENT_RUN_ID"]
    secret = secret or os.environ.pop("EXPERIMENT_AUTH_TOKEN")
    if not run_id or Path(run_id).name != run_id or run_id in (".", ".."):
        raise ValueError("Invalid run id")
    workspace = Path(workspace)
    output = workspace / "results" / run_id
    results_archive = output.with_suffix(".tar.gz")
    checksum_path = output.with_suffix(".tar.gz.sha256")
    output.mkdir(parents=True, exist_ok=True)
    status = {"stage": "starting", "finished": False, "exit_code": None}
    lock = threading.Lock()
    log_path = output / "worker.log"
    log_path.touch(exist_ok=True)
    saved_status = output / "worker-status.json"
    recovered = saved_status.exists() and results_archive.exists() and (checksum_path.exists() or legacy_recovery)
    if recovered:
        digest = sha256_file(results_archive)
        if checksum_path.exists() and checksum_path.read_text().strip() != digest:
            raise RuntimeError("Saved result archive checksum mismatch")
        code = json.loads(saved_status.read_text())["exit_code"]
        status.update(stage="complete" if code == 0 else "failed", finished=True,
                      exit_code=code, results_sha256=digest)

    def update(**values):
        with lock:
            status.update(values)

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def do_GET(self):
            if not hmac.compare_digest(self.headers.get("Authorization", ""), "Bearer " + secret):
                self.send_error(401)
                return
            if self.path == "/status":
                with lock:
                    response = status.copy()
                response.update(read_status_files(job, output))
                data = json.dumps(response).encode()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
            elif self.path == "/log":
                with log_path.open("rb") as source:
                    source.seek(max(0, log_path.stat().st_size - 12000))
                    data = source.read()
                self.send_response(200)
                self.send_header("Content-Type", "text/plain; charset=utf-8")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
            elif self.path == "/results" and status["finished"]:
                self.send_response(200)
                self.send_header("Content-Type", "application/gzip")
                self.send_header("Content-Length", str(results_archive.stat().st_size))
                self.send_header("X-Content-SHA256", status["results_sha256"])
                self.end_headers()
                import shutil
                with results_archive.open("rb") as source:
                    shutil.copyfileobj(source, self.wfile)
            else:
                self.send_error(404)

    def job_thread():
        code = run_job(job, output, cache=workspace / "cache", update=update,
                       deadline_at=float(os.environ["EXPERIMENT_DEADLINE_AT"]) if "EXPERIMENT_DEADLINE_AT" in os.environ else None)
        update(stage="archive")
        try:
            artifacts = job.get("artifacts", {})
            temporary = results_archive.with_suffix(".tmp")
            digest = archive_results(output, temporary, artifacts.get("include"), artifacts.get("exclude"))
            temporary.replace(results_archive)
            checksum_path.write_text(digest + "\n")
            update(stage="complete" if code == 0 else "failed", finished=True, exit_code=code, results_sha256=digest)
        except Exception as error:
            with log_path.open("a") as log:
                log.write("Archive failed: " + type(error).__name__ + "\n")
            update(stage="archive_failed", exit_code=code)

    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    if not recovered:
        threading.Thread(target=job_thread, daemon=True).start()
    server.serve_forever()


if __name__ == "__main__":
    serve()
