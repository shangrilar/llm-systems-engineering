"""Framework-independent execution and recovery commands."""
import argparse
import json
from pathlib import Path
from .job import load_job, read_env
from .state import save_private


def main():
    parser = argparse.ArgumentParser(description="Shared experiment runner")
    commands = parser.add_subparsers(dest="command", required=True)
    run = commands.add_parser("run", help="Create, execute, collect, and delete a RunPod Pod")
    run.add_argument("job")
    run.add_argument("--env-file", default=".env")
    run.add_argument("--state")
    run.add_argument("--dry-run", action="store_true")
    local = commands.add_parser("local", help="Execute the same stages without cloud resources")
    local.add_argument("job")
    local.add_argument("--output", required=True)
    local.add_argument("--cache", default=".cache")
    for name in ("status", "logs", "monitor", "collect", "stop", "terminate"):
        action = commands.add_parser(name)
        action.add_argument("state")
        action.add_argument("--env-file", default=".env")
        if name == "collect":
            action.add_argument("--output", required=True)
    args = parser.parse_args()
    if args.command == "local":
        from .worker import run_job
        code = run_job(load_job(args.job), args.output, cache=args.cache)
        raise SystemExit(code)
    from . import runpod
    if args.command == "run":
        job = load_job(args.job)
        read_env(args.env_file, ["RUNPOD_API_KEY", "WANDB_API_KEY", "WANDB_ENTITY", "WANDB_PROJECT"] + job.get("forward_env", []) + job.get("required_env", []))
        runpod.launch(job, args.state, args.dry_run)
        return
    state = json.loads(Path(args.state).read_text())
    # Old training state files remain recoverable without importing the training engine.
    job = state.get("job")
    read_env(args.env_file, ["RUNPOD_API_KEY", "WANDB_API_KEY", "WANDB_ENTITY", "WANDB_PROJECT"] + (job or {}).get("forward_env", []) + (job or {}).get("required_env", []))
    if args.command in ("status", "logs"):
        if args.command == "status":
            print(json.dumps(runpod.request_json(state["url"] + "/status", token=state["auth"]), indent=2))
        else:
            import urllib.request
            request = urllib.request.Request(state["url"] + "/log", headers={"Authorization": "Bearer " + state["auth"]})
            with urllib.request.urlopen(request, timeout=20) as response:
                print(response.read().decode())
    elif args.command == "monitor":
        if not job:
            raise ValueError("Use training_lab monitor for an old training state file")
        runpod.monitor(job, state, args.state)
    elif args.command == "collect":
        runpod.collect(state, args.output)
        state.update(results=str(Path(args.output).resolve()), status="collected")
        save_private(args.state, state)
    elif args.command == "stop":
        runpod.stop_pod(state)
        state.update(status="stopped", resource_status="stopped")
        save_private(args.state, state)
    else:
        runpod.terminate_pod(state)
        state.update(status="terminated", resource_status="terminated")
        save_private(args.state, state)


if __name__ == "__main__":
    main()
