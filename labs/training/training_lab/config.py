from __future__ import annotations

import hashlib
import json
from pathlib import Path

LAB_ROOT = Path(__file__).resolve().parent.parent


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


def load_config(path):
    path = Path(path)
    if not path.exists():
        path = LAB_ROOT / "experiments" / (str(path) + ".json")
    config = json.loads(path.read_text())
    data, model, train = config["data"], config["model"], config["train"]
    if not 2 <= data["max_seq_len"] <= 4096:
        raise ValueError("max_seq_len must be between 2 and 4096")
    if ("batch_size" in train) == ("microbatch_tokens" in train):
        raise ValueError("Specify batch_size (pack count) or legacy microbatch_tokens, not both")
    if "batch_size" in train:
        if not isinstance(train["batch_size"], int) or train["batch_size"] < 1:
            raise ValueError("batch_size must be a positive pack count")
        if not any(k in train for k in ("eval_batch_size", "eval_microbatch_tokens")):
            raise ValueError("Set an explicit fixed evaluation batch")
    elif train["microbatch_tokens"] < data["max_seq_len"]:
        raise ValueError("microbatch_tokens must fit one complete segment")
    if model["dim"] % model["heads"]:
        raise ValueError("model dim must be divisible by heads")
    if train["attention"] not in ("flex", "sdpa_documents", "flash_varlen"):
        raise ValueError("Unknown attention backend")
    if train.get("loss_backend", "legacy_chunked") not in ("auto", "torch_linear_ce", "liger", "reference", "legacy_chunked"):
        raise ValueError("Unknown loss backend")
    for name in ("steps", "accumulation", "eval_every", "eval_batches", "packing_buffer"):
        if train[name] < 1:
            raise ValueError(name + " must be positive")
    for name in ("train_tokens", "validation_tokens", "max_documents"):
        if data[name] < 1:
            raise ValueError(name + " must be positive")
    if not 0 < data["validation_fraction"] < 1:
        raise ValueError("validation_fraction must be between zero and one")
    observed = config.get("observation", {})
    steps = observed.get("profile_steps", [])
    if any(not isinstance(step, int) or not 1 <= step <= train["steps"] for step in steps):
        raise ValueError("profile_steps must be within the training run")
    if observed.get("memory_step") is not None and not 1 <= observed["memory_step"] <= train["steps"]:
        raise ValueError("memory_step must be within the training run")
    peak = config.get("measurement", {}).get("bf16_peak_flops_per_gpu")
    if peak is not None and peak <= 0:
        raise ValueError("MFU peak FLOPs must be positive")
    capacity = config.get("capacity", {})
    if capacity.get("enabled"):
        granularity = capacity["granularity"]
        if granularity < 1 or capacity["min_tokens"] < data["max_seq_len"] or capacity["max_tokens"] < capacity["min_tokens"]:
            raise ValueError("Invalid capacity search range")
        if any(capacity[k] % granularity for k in ("min_tokens", "max_tokens")):
            raise ValueError("Capacity bounds must be aligned to granularity")
        if capacity["probe_steps"] < 2 or capacity["headroom_bytes"] < 0:
            raise ValueError("Capacity probing needs multiple updates and nonnegative headroom")
    return config


def write_json(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
    temporary.replace(path)
