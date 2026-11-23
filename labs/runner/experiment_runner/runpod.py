"""RunPod lifecycle controller shared by command-based experiments."""
from __future__ import annotations
import base64
import hashlib
import json
import os
import secrets
import shlex
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path
from .artifacts import collect, source_archive
from .job import fingerprint, remote_job, validate_job
from .state import save_private

API_URL = "https://rest.runpod.io/v1"


class HTTPStatusError(RuntimeError):
    def __init__(self, code, method, url):
        self.code = code
        super().__init__(f"HTTP {code} for {method} {url.split('?')[0]}")


def git_revision(root):
    try:
        return subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, stderr=subprocess.DEVNULL, text=True).strip()
    except (OSError, subprocess.CalledProcessError):
        return None


def bootstrap_command():
    script = "\n".join([
        "import base64, io, os, pathlib, tarfile",
        "root = pathlib.Path('/workspace/experiments') / os.environ['EXPERIMENT_RUN_ID']; root.mkdir(parents=True, exist_ok=True)",
        "with tarfile.open(fileobj=io.BytesIO(base64.b64decode(os.environ.pop('EXPERIMENT_SOURCE_B64')))) as archive:",
        "    archive.extractall(root, filter='data')",
        "os.chdir(root)",
        "os.execvp('python', ['python', '-u', '-m', 'experiment_runner.worker'])",
    ])
    return ["python", "-u", "-c", script]


def make_payload(job, auth_token, archive, dry_run=False, environment=None):
    validate_job(job)
    cloud = job["runpod"]
    provenance = {"git_commit": git_revision(job["source_root"]),
                  "source_sha256": hashlib.sha256(archive).hexdigest(),
                  "config_sha256": fingerprint(job.get("config", {})),
                  "job_sha256": fingerprint(remote_job(job)), "image": cloud["image"]}
    environment = os.environ if environment is None else environment
    env = dict(job.get("env", {}))
    for key in set(job.get("forward_env", []) + job.get("required_env", [])):
        if key in environment:
            env[key] = environment[key]
        elif dry_run and key in job.get("required_env", []):
            env[key] = "REDACTED"
    env.update(EXPERIMENT_RUN_ID=auth_token[:16], EXPERIMENT_AUTH_TOKEN=auth_token,
               EXPERIMENT_SOURCE_B64=base64.b64encode(archive).decode(),
               EXPERIMENT_JOB_B64=base64.b64encode(json.dumps(remote_job(job)).encode()).decode(),
               EXPERIMENT_PROVENANCE=json.dumps(provenance), PYTHONUNBUFFERED="1")
    payload = {"name": "experiment-" + job["name"] + "-" + auth_token[:8],
               "computeType": "GPU", "cloudType": "SECURE", "gpuCount": cloud.get("gpu_count", 1),
               "gpuTypeIds": [cloud["gpu"]], "gpuTypePriority": "custom", "imageName": cloud["image"],
               "containerDiskInGb": cloud.get("container_disk_gb", 30), "volumeInGb": cloud.get("volume_gb", 30),
               "volumeMountPath": "/workspace", "ports": ["8765/http"],
               "dockerEntrypoint": ["/bin/bash", "-lc"],
               "dockerStartCmd": ["exec " + shlex.join(bootstrap_command())], "env": env,
               "interruptible": False, "minVCPUPerGPU": cloud.get("min_vcpu_per_gpu", 8),
               "minRAMPerGPU": cloud.get("min_ram_per_gpu", 32)}
    if cloud.get("network_volume_id"):
        payload["networkVolumeId"] = cloud["network_volume_id"]
        payload.pop("volumeInGb")
    return payload


def request_json(url, method="GET", token=None, payload=None, timeout=45):
    headers = {"Content-Type": "application/json", "Accept": "application/json", "User-Agent": "experiment-runner/0.1"}
    if token:
        headers["Authorization"] = "Bearer " + token
    data = json.dumps(payload).encode() if payload is not None else None
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            body = response.read()
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as error:
        # Request bodies/env can include secrets; never echo server bodies wholesale.
        raise HTTPStatusError(error.code, method, url) from None


def stop_pod(state):
    request_json(API_URL + "/pods/" + state["pod_id"] + "/stop", method="POST", token=os.environ["RUNPOD_API_KEY"])


def terminate_pod(state):
    url = API_URL + "/pods/" + state["pod_id"]
    try:
        request_json(url, method="DELETE", token=os.environ["RUNPOD_API_KEY"])
    except HTTPStatusError as error:
        if error.code != 404:
            raise
    for attempt in range(6):
        try:
            request_json(url, token=os.environ["RUNPOD_API_KEY"])
        except HTTPStatusError as error:
            if error.code == 404:
                return
            raise
        if attempt < 5:
            time.sleep(2)
    raise RuntimeError("Pod deletion could not be confirmed: " + state["pod_id"])


def launch(job, state_path=None, dry_run=False):
    validate_job(job)
    archive = source_archive(job)
    if dry_run:
        payload = make_payload(job, "REDACTED", archive, dry_run=True)
        payload["env"] = {key: "REDACTED" for key in payload["env"]}
        shown_job = remote_job(job)
        if "env" in shown_job:
            shown_job["env"] = {key: "REDACTED" for key in shown_job["env"]}
        print(json.dumps({"payload": payload, "source_bytes": len(archive), "job": shown_job}, ensure_ascii=False, indent=2))
        return
    for key in ["RUNPOD_API_KEY"] + job.get("required_env", []):
        if not os.environ.get(key):
            raise ValueError("Missing " + key + "; put it in the ignored environment file")
    token = secrets.token_urlsafe(32)
    root = Path(job["source_root"])
    state_path = Path(state_path) if state_path else Path(job.get("state_root", root / ".runpod")) / (token[:16] + ".json")
    created_at = time.time()
    state = {"auth": token, "job": job, "created_at": created_at,
             "deadline_at": created_at + job["runpod"]["max_seconds"],
             "status": "creating", "resource_status": "unknown", "outcome": "unknown"}
    payload = make_payload(job, token, archive)
    payload["env"]["EXPERIMENT_DEADLINE_AT"] = str(state["deadline_at"])
    state["pod_name"] = payload["name"]
    # Persist correlation and credentials BEFORE the uncertain billed creation call.
    save_private(state_path, state)
    try:
        response = request_json(API_URL + "/pods", method="POST", token=os.environ["RUNPOD_API_KEY"], payload=payload)
        pod_id = response["id"]
    except BaseException:
        state["status"] = "creation_uncertain"
        save_private(state_path, state)
        print("Pod creation could be uncertain. Check RunPod for " + state["pod_name"] + " before retrying; request was not repeated.", flush=True)
        raise
    state.update(pod_id=pod_id, url=f"https://{pod_id}-8765.proxy.runpod.net", status="created", resource_status="active")
    try:
        save_private(state_path, state)
    except BaseException:
        stop_pod(state)
        raise
    print(f"Pod {pod_id}; state: {state_path}", flush=True)
    return monitor(job, state, state_path)


def monitor(job, state, state_path):
    """Recover/monitor without renewing the original wall-time budget."""
    pod_id = state["pod_id"]
    root = Path(job["source_root"])
    destination = Path(job.get("results_root", root / ".runs")) / pod_id
    previous = {}
    deadline = state.setdefault("deadline_at", state["created_at"] + job["runpod"]["max_seconds"])
    try:
        while True:
            # Even after expiry, give an already-finished worker one chance to collect.
            try:
                status = request_json(state["url"] + "/status", token=state["auth"], timeout=20)
            except (OSError, RuntimeError):
                status = None
            if status:
                for field in ["stage"] + list(job.get("status_files", {})):
                    value = status.get(field)
                    if value is not None and value != previous.get(field):
                        previous[field] = value
                        print(field + ": " + json.dumps(value, ensure_ascii=False), flush=True)
                if status.get("finished"):
                    state["outcome"] = "succeeded" if status.get("exit_code") == 0 else "failed"
                    state["exit_code"] = status.get("exit_code")
                    collect(state, destination)
                    state.update(status="collected", results=str(destination))
                    save_private(state_path, state)
                    terminate_pod(state)
                    state.update(status="terminated", resource_status="terminated")
                    save_private(state_path, state)
                    print("Results: " + str(destination), flush=True)
                    if state["outcome"] == "failed":
                        raise RuntimeError("Remote job failed; see worker.log in downloaded results")
                    return destination
            if time.time() >= deadline:
                raise TimeoutError("RunPod wall-time budget exceeded")
            time.sleep(min(10, max(0, deadline - time.time())))
    except BaseException:
        if state.get("resource_status") != "terminated":
            try:
                stop_pod(state)
                state.update(status="stopped", resource_status="stopped")
                save_private(state_path, state)
                print("Pod stopped; disk may still be billed. Recover or terminate using the saved state.", flush=True)
            except Exception:
                print(f"Cleanup could not be confirmed. Check Pod {pod_id} in RunPod immediately.", flush=True)
        raise
