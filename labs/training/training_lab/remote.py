"""Training-specific entry: data, benchmark, capacity, and checkpoint resume."""
import argparse
import os
import sys
from pathlib import Path
from .cli import main
from .config import load_config


def run():
    parser = argparse.ArgumentParser()
    parser.add_argument("--wandb", action="store_true")
    args = parser.parse_args()
    config_path = os.environ["EXPERIMENT_CONFIG_PATH"]
    output = Path(os.environ["EXPERIMENT_OUTPUT_DIR"])
    config = load_config(config_path)
    os.environ["LAB_PROVENANCE"] = os.environ.get("EXPERIMENT_PROVENANCE", "{}")
    command = "capacity-run" if config.get("capacity", {}).get("enabled") else "local"
    sys.argv = ["training_lab", command, "--config", config_path, "--output", str(output),
                "--cache", str(Path(os.environ["EXPERIMENT_CACHE_DIR"]) / "data")]
    if args.wandb:
        sys.argv.append("--wandb")
    if (output / "checkpoint.pt").exists():
        sys.argv.extend(["--resume", str(output / "checkpoint.pt")])
    main()


if __name__ == "__main__":
    run()
