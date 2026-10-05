"""Training job definition and compatibility entry points for the shared runner."""
from __future__ import annotations
import os
from .config import LAB_ROOT
from ._runner import ensure_runner
ensure_runner()
from experiment_runner import runpod as runner
from experiment_runner.job import read_env
from experiment_runner.artifacts import collect, unpack_results
from experiment_runner.state import save_private

stop_pod = runner.stop_pod
terminate_pod = runner.terminate_pod
bootstrap_command = runner.bootstrap_command


def make_job(config, wandb=True):
    commands = [{"name": "install", "command": ["{python}", "-m", "pip", "install", "-r", "{source}/requirements-worker.txt"]}]
    runtime = config.get("runtime", {})
    if runtime.get("torch_version"):
        commands.append({"name": "install_torch", "command": ["{python}", "-m", "pip", "install", "torch==" + runtime["torch_version"], "--index-url", runtime["torch_index_url"]]})
    if runtime.get("liger_version"):
        commands.append({"name": "install_liger", "command": ["{python}", "-m", "pip", "install", "liger-kernel==" + runtime["liger_version"], "--no-deps"]})
    if runtime.get("gpu_preflight"):
        commands.append({"name": "gpu_preflight", "command": ["{python}", "-u", "-m", "training_lab.gpu_checks", "--config", "{config}", "--output", "{output}"]})
    commands.append({"name": "prepare_and_train", "command": ["{python}", "-u", "-m", "training_lab.remote"] + (["--wandb"] if wandb else [])})
    return {"version": 1, "name": config["name"], "source_root": str(LAB_ROOT),
            "sources": ["training_lab/*.py", "experiments/*.json", "requirements-worker.txt"],
            "runpod": config["runpod"], "config": config, "stages": commands,
            "required_env": ["WANDB_API_KEY"] if wandb else [],
            "forward_env": ["WANDB_ENTITY", "WANDB_PROJECT"] if wandb else [],
            "env": {"WANDB_PROJECT": os.environ.get("WANDB_PROJECT", "llm-training-lab"),
                    "HF_HOME": "/workspace/cache/huggingface", "PIP_CACHE_DIR": "/workspace/cache/pip"},
            "status_files": {"wandb": "wandb.json", "progress": "metrics.jsonl", "capacity": "capacity-progress.json", "benchmark": "matched-benchmark-progress.json"}}


def source_archive():
    from .config import load_config
    return runner.source_archive(make_job(load_config("smoke")))


def make_payload(config, auth_token, archive, wandb_key):
    # Retained for callers that previously constructed training payloads directly.
    environment = dict(os.environ, WANDB_API_KEY=wandb_key)
    return runner.make_payload(make_job(config), auth_token, archive, environment=environment)


def launch(config, state_path=None, dry_run=False, wandb=True):
    return runner.launch(make_job(config, wandb), state_path, dry_run)


def monitor(config, state, state_path):
    return runner.monitor(state.get("job") or make_job(config), state, state_path)
