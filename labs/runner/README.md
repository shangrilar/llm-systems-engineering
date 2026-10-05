# Shared experiment runner

Shared RunPod execution, logs, artifact collection, and cleanup for training, inference,
and quantization experiments. [한국어 안내](README.ko.md).
The package uses only the Python standard library. Model code, data preparation,
profiling, metrics, reporting, and checkpoint resume belong to each experiment.

## Run

From the repository root:

```sh
python3 -m pip install -e labs/runner
cd labs/training
python3 -m training_lab runpod --config corrected --dry-run
python3 -m training_lab runpod --config corrected
```

The training adapter supplies dependency installation, GPU checks, and its training entry point.
Training requires RunPod and W&B keys by default; `--no-wandb` makes W&B optional.
The training engine remains single-GPU: setting the shared runner's `gpu_count` to 2 does not implement distributed training.

Other experiments supply a job file:

```sh
experiment-runner run path/to/job.json --env-file path/to/.env --dry-run
experiment-runner run path/to/job.json --env-file path/to/.env
```

Use `--env-file` to share an ignored credentials file across experiments. The RunPod key stays
on your computer. Only environment variables named in `forward_env` or `required_env` are
forwarded to the Pod. W&B is not required by the shared runner.

## Job contract

See the [minimal job](examples/smoke/job.json) and [experiment](examples/smoke/experiment.py).
This CPU example checks the execution contract; it is not a model or performance experiment.

```json
{
  "version": 1,
  "name": "my-experiment",
  "source_root": ".",
  "sources": ["experiment.py", "requirements.txt"],
  "runpod": {
    "gpu": "NVIDIA H100 80GB HBM3",
    "gpu_count": 1,
    "image": "your-image@sha256:YOUR_DIGEST",
    "max_seconds": 3600
  },
  "config": {"model": "your-model"},
  "stages": [
    {"name": "install", "command": ["{python}", "-m", "pip", "install", "-r", "{source}/requirements.txt"]},
    {"name": "experiment", "command": ["{python}", "-u", "experiment.py"]}
  ],
  "forward_env": [],
  "required_env": [],
  "status_files": {"progress": "progress.json"},
  "artifacts": {"exclude": ["*.pt", "*.safetensors"]}
}
```

- `source_root` is relative to the job file. `sources` is an explicit file/glob allowlist inside it.
  Shared worker files are included automatically. Hidden paths, credential files, private material
  paths, and outside symlinks are rejected. Review the allowlist yourself.
- Commands are argument arrays, not shell strings. Only `{python}`, `{source}`, `{output}`,
  `{config}`, and `{cache}` are substituted. There is no shell interpretation unless your command explicitly invokes a shell.
- `config` is opaque experiment configuration, saved as `config.json`.
- `runpod` controls GPU count, image, wall-time budget, disk/volume sizes, CPU/RAM minimums,
  and optional `network_volume_id`. Defaults: `container_disk_gb=30`, `volume_gb=30`,
  `min_vcpu_per_gpu=8`, `min_ram_per_gpu=32`. Existing network volumes are never deleted.
- `env` supplies non-secret defaults, such as cache paths. Credentials belong in environment
  variables named by `forward_env` (optional) or `required_env` (required before cloud creation).
- `status_files` maps status fields to output-relative JSON files or the final JSONL record.
  The runner forwards their content without interpreting training/inference metrics.
  Incomplete records during writes are retried on the next status request.
- `artifacts.include` / `exclude` are output-relative globs. Omission collects all regular files.
  Logs, job/config, exit status, and provenance are always included; symlinks are omitted.
  Weight/checkpoint selection belongs to the experiment. Training retains its existing default of collecting checkpoints.

Experiment processes receive:

| Environment variable | Purpose |
| --- | --- |
| `EXPERIMENT_CONFIG_PATH` | Experiment config JSON |
| `EXPERIMENT_OUTPUT_DIR` | Output artifacts and profiles |
| `EXPERIMENT_CACHE_DIR` | Reusable cache root |
| `EXPERIMENT_PROVENANCE` | Commit, source/config/job hashes, image |

Local defaults are `source_root/.runs/<pod-id>/` and `source_root/.runpod/<run-id>.json`.
Use absolute local paths for `results_root` / `state_root` overrides.
Pod commands run in `/workspace/experiments/<run-id>`, with outputs in `/workspace/results/<run-id>`.

## Cleanup and recovery

Success and experiment failure both follow **collect → verify SHA256 → delete Pod → confirm API 404**.
Experiment `outcome` and `resource_status` are separate. Unconfirmed deletion is not marked terminated.
Timeout, interruption, or download failure attempts to stop the Pod and retain its disk; storage may still be billed.
State files contain a worker access token, are Git-ignored, and are saved atomically with mode 0600.
Creation requests are never blindly retried. An uncertain request leaves the Pod name in the pre-created state file for console reconciliation.
Monitoring preserves the original absolute deadline; an already-finished worker can still be collected after expiry.

```sh
experiment-runner status path/to/state.json --env-file path/to/.env
experiment-runner logs path/to/state.json --env-file path/to/.env
experiment-runner monitor path/to/state.json --env-file path/to/.env
experiment-runner collect path/to/state.json --output path/to/results --env-file path/to/.env
experiment-runner terminate path/to/state.json --env-file path/to/.env
```

Resume a stopped Pod in the RunPod console first. The worker serves a saved completed archive
and checksum without rerunning the experiment. Incomplete execution/checkpoint resume belongs
to each experiment's entry point. Old training state files work with shared `collect` / `terminate`;
use `training_lab monitor` to monitor old training states.

The worker bounds installation and experiment processes, but **does not delete the Pod**.
Deletion belongs to the local controller. Losing that computer/connection cannot guarantee
cloud cleanup; an independent cleanup service is outside this extraction.

## Local checks

No GPU, API keys, or paid Pods are needed:

```sh
cd labs/runner
python3 -m experiment_runner local examples/smoke/job.json --output .runs/smoke --cache .cache
python3 -m unittest discover -s tests -v
```

Tests exercise a real localhost worker for authentication, verified download, and completed
restart. RunPod API calls use mocks; these checks do not establish a successful cloud run.
The test environment must allow binding a local server port.
