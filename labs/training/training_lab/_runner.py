"""Find the sibling shared runner for source-checkout execution."""
import sys
from pathlib import Path


def ensure_runner():
    try:
        import experiment_runner
    except ModuleNotFoundError as error:
        if error.name != "experiment_runner":
            raise
        root = Path(__file__).resolve().parents[2] / "runner"
        if not (root / "experiment_runner").is_dir():
            raise RuntimeError("Install llm-experiment-runner or keep labs/runner next to labs/training") from None
        sys.path.insert(0, str(root))
