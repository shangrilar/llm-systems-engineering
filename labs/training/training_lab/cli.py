from __future__ import annotations

import argparse
import json
from pathlib import Path

from .config import LAB_ROOT, load_config


def main():
    parser = argparse.ArgumentParser(description="Educational LLM training lab")
    commands = parser.add_subparsers(dest="command", required=True)
    launch = commands.add_parser("runpod", help="Launch, collect results, and terminate")
    launch.add_argument("--config", default="smoke")
    launch.add_argument("--env-file", default=str(LAB_ROOT / ".env"))
    launch.add_argument("--state")
    launch.add_argument("--dry-run", action="store_true")
    launch.add_argument("--no-wandb", action="store_true", help="Run without W&B credentials")
    local = commands.add_parser("local", help="Prepare data and train in an existing environment")
    local.add_argument("--config", default="smoke")
    local.add_argument("--cache", default=str(LAB_ROOT / "data-cache"))
    local.add_argument("--output", default=str(LAB_ROOT / ".runs" / "local"))
    local.add_argument("--resume")
    local.add_argument("--device", choices=["cuda", "cpu"], default="cuda")
    local.add_argument("--wandb", action="store_true")
    prepare = commands.add_parser("prepare", help="Prepare a reusable document token cache")
    prepare.add_argument("--config", default="smoke")
    prepare.add_argument("--cache", default=str(LAB_ROOT / "data-cache"))
    inspect = commands.add_parser("inspect-data", help="Summarize lengths, boundaries and packing")
    inspect.add_argument("directory")
    inspect.add_argument("--config", default="smoke")
    inspect.add_argument("--output", default="data-stats.json")
    report = commands.add_parser("report")
    report.add_argument("directory")
    capacity = commands.add_parser("capacity-run", help="Search GPU microbatch capacity, then train once")
    capacity.add_argument("--config", required=True)
    capacity.add_argument("--cache", required=True)
    capacity.add_argument("--output", required=True)
    capacity.add_argument("--wandb", action="store_true")
    capacity.add_argument("--resume")
    probe = commands.add_parser("probe-batch", help="Isolated short GPU capacity probe")
    probe.add_argument("--config", required=True)
    probe.add_argument("--dataset", required=True)
    probe.add_argument("--output", required=True)
    compare = commands.add_parser("compare")
    compare.add_argument("directories", nargs="+")
    compare.add_argument("--output", default="comparison.json")
    for name in ("monitor", "collect", "stop", "terminate"):
        action = commands.add_parser(name)
        action.add_argument("state")
        action.add_argument("--env-file", default=str(LAB_ROOT / ".env"))
        if name == "collect":
            action.add_argument("--output", required=True)
    args = parser.parse_args()
    if args.command == "runpod":
        from .runpod import launch, read_env
        read_env(args.env_file)
        launch(load_config(args.config), args.state, args.dry_run, wandb=not args.no_wandb)
    elif args.command in ("local", "prepare"):
        from .data import prepare as prepare_data
        config = load_config(args.config)
        dataset = prepare_data(config["data"], args.cache)
        if args.command == "prepare":
            print(dataset)
        else:
            if config.get("runtime", {}).get("matched_benchmark") and not args.resume:
                from .benchmark import matched_benchmark
                matched_benchmark(config, dataset, args.output)
            from .engine import train
            train(config, dataset, args.output, args.resume, args.device, args.wandb)
    elif args.command == "inspect-data":
        from .data import inspect_dataset
        from .config import write_json
        write_json(args.output, inspect_dataset(args.directory, load_config(args.config)))
    elif args.command == "capacity-run":
        from .data import prepare as prepare_data
        from .capacity import maximize_and_train
        config = load_config(args.config)
        dataset = prepare_data(config["data"], args.cache)
        maximize_and_train(config, dataset, args.output, args.wandb, args.resume)
    elif args.command == "probe-batch":
        from .capacity import probe
        probe(load_config(args.config), args.dataset, args.output)
    elif args.command == "report":
        from .report import build_report
        build_report(args.directory)
    elif args.command == "compare":
        from .report import compare as compare_runs
        compare_runs(args.directories, args.output)
    else:
        from .runpod import collect, monitor, read_env, save_private, stop_pod, terminate_pod
        read_env(args.env_file)
        state = json.loads(Path(args.state).read_text())
        if args.command == "monitor":
            config = state.get("config") or state["job"]["config"]
            monitor(config, state, args.state)
        elif args.command == "collect":
            collect(state, args.output)
            state.update(status="collected", results=str(Path(args.output).resolve()))
            save_private(args.state, state)
        elif args.command == "stop":
            stop_pod(state)
            state.update(status="stopped", resource_status="stopped")
            save_private(args.state, state)
        else:
            terminate_pod(state)
            state.update(status="terminated", resource_status="terminated")
            save_private(args.state, state)


if __name__ == "__main__":
    main()
