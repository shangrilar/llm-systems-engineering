"""CPU-only contract example, not a model/performance experiment."""
import json
import os
from pathlib import Path

output = Path(os.environ["EXPERIMENT_OUTPUT_DIR"])
config = json.loads(Path(os.environ["EXPERIMENT_CONFIG_PATH"]).read_text())
for step in range(1, config["steps"] + 1):
    (output / "progress.json").write_text(json.dumps({"current": step, "total": config["steps"], "unit": "items"}))
(output / "summary.json").write_text(json.dumps({"completed": config["steps"], "message": "Command contract works without PyTorch or W&B"}))
print("Smoke example completed")
