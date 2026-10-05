"""Small command-based job contract; no model or framework imports."""
from __future__ import annotations
import hashlib
import json
import os
import re
from pathlib import Path


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


def validate_job(job):
    if job.get("version") != 1:
        raise ValueError("Job version must be 1")
    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_.-]{0,79}", job.get("name", "")):
        raise ValueError("Invalid job name")
    cloud = job["runpod"]
    if "max_seconds" not in cloud:
        raise ValueError("Specify max_seconds")
    if not cloud.get("image") or not cloud.get("gpu"):
        raise ValueError("Specify a GPU and container image")
    for key, default in [("gpu_count", 1), ("max_seconds", 3600), ("container_disk_gb", 30), ("volume_gb", 30), ("min_vcpu_per_gpu", 8), ("min_ram_per_gpu", 32)]:
        value = cloud.get(key, default)
        if not isinstance(value, int) or isinstance(value, bool) or value < 1:
            raise ValueError(key + " must be a positive integer")
    if not job.get("stages"):
        raise ValueError("At least one stage is required")
    for stage in job["stages"]:
        if not stage.get("name") or not isinstance(stage.get("command"), list) or not stage["command"] or not all(isinstance(x, str) and x for x in stage["command"]):
            raise ValueError("Stages require a name and command argument list")
    for pattern in job.get("sources", []):
        if Path(pattern).is_absolute() or ".." in Path(pattern).parts:
            raise ValueError("Sources must stay inside source_root")
    if not isinstance(job.get("source_root", ""), str) or not job.get("source_root"):
        raise ValueError("Specify source_root")
    if not isinstance(job.get("env", {}), dict) or any(not isinstance(value, str) for value in job.get("env", {}).values()):
        raise ValueError("Environment values must be strings")
    if any(name.endswith(("_KEY", "_TOKEN", "_SECRET", "_PASSWORD")) for name in job.get("env", {})):
        raise ValueError("Credentials must use forward_env/required_env, not literal env values")
    for field, path in job.get("status_files", {}).items():
        if not isinstance(field, str) or not field or Path(path).is_absolute() or ".." in Path(path).parts:
            raise ValueError("Status files must be relative to output")
        if field in ("stage", "finished", "exit_code", "results_sha256"):
            raise ValueError("Reserved status field")
    names = job.get("forward_env", []) + job.get("required_env", [])
    names += list(job.get("env", {}))
    if any(not re.fullmatch(r"[A-Z][A-Z0-9_]*", name) or name == "RUNPOD_API_KEY" or name.startswith("EXPERIMENT_") for name in names):
        raise ValueError("Controller/reserved environment variables cannot be forwarded")
    return job


def load_job(path):
    path = Path(path).resolve()
    job = json.loads(path.read_text())
    job["source_root"] = str((path.parent / job.get("source_root", ".")).resolve())
    return validate_job(job)


def remote_job(job):
    return {key: value for key, value in job.items() if key not in ("source_root", "sources", "results_root", "state_root")}


def read_env(path, allowed=None):
    """Read literal entries, never execute shell expressions or display values."""
    if not Path(path).exists():
        return
    allowed = set(allowed or ["RUNPOD_API_KEY", "WANDB_API_KEY", "WANDB_ENTITY", "WANDB_PROJECT"])
    for line in Path(path).read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        key, separator, value = line.partition("=")
        key, value = key.strip(), value.strip()
        if not separator or key not in allowed:
            raise ValueError("Unsupported environment file entry")
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        os.environ.setdefault(key, value)
