"""Probe maximum microbatch capacity in isolated processes, then train once."""
from __future__ import annotations

import copy
import json
import subprocess
import sys
from pathlib import Path

from .config import fingerprint, write_json


def probe(config, dataset, output):
    import math
    import time
    import torch
    from .data import BestFitSampler, TokenStore
    from .model import Decoder, PackedBatch

    output = Path(output)
    torch.manual_seed(config["seed"])
    torch.set_float32_matmul_precision("high")
    settings = config["train"]
    manifest = json.loads((Path(dataset) / "manifest.json").read_text())
    store = TokenStore(dataset, "train", config["data"]["max_seq_len"])
    sampler = BestFitSampler(store, config["data"]["max_seq_len"], settings["microbatch_tokens"],
                             settings["packing_buffer"], config["seed"])
    result = {"microbatch_tokens": settings["microbatch_tokens"], "status": "started"}
    model = optimizer = batch = loss = None
    started = time.monotonic()
    try:
        model = Decoder(manifest["vocab_size"], max_seq_len=config["data"]["max_seq_len"],
                        backend=settings["attention"], **config["model"]).cuda()
        optimizer = torch.optim.AdamW(model.parameters(), lr=settings["lr"], betas=(0.9, 0.95),
                                      weight_decay=settings["weight_decay"], fused=True)
        torch.cuda.reset_peak_memory_stats()
        result["updates"] = []
        for index in range(config["capacity"]["probe_steps"]):
            optimizer.zero_grad(set_to_none=True)
            segments, bins = sampler.next_batch()
            batch = PackedBatch.from_segments(segments, bins, "cuda")
            with torch.autocast("cuda", dtype=torch.bfloat16):
                loss = model.loss_sum(batch) / batch.targets.numel()
            loss.backward()
            grad_norm = torch.nn.utils.clip_grad_norm_(model.parameters(), settings["clip_grad"])
            if not math.isfinite(loss.item()) or not math.isfinite(float(grad_norm)):
                raise RuntimeError("Non-finite probe loss or gradient")
            optimizer.step()
            torch.cuda.synchronize()
            result["updates"].append({"step": index + 1, "actual_tokens": batch.targets.numel(),
                                       "loss": loss.item(), "peak_allocated": torch.cuda.max_memory_allocated(),
                                       "peak_reserved": torch.cuda.max_memory_reserved()})
            del batch, loss
            batch = loss = None
        result["status"] = "ok"
    except torch.OutOfMemoryError:
        result["status"] = "oom"
    finally:
        result.update(peak_allocated=torch.cuda.max_memory_allocated(),
                      peak_reserved=torch.cuda.max_memory_reserved(),
                      device_bytes=torch.cuda.get_device_properties(0).total_memory,
                      elapsed_seconds=time.monotonic() - started)
        write_json(output, result)
        print(json.dumps(result), flush=True)
    return result


def choose_capacity(attempt, settings):
    """Doubling followed by a bounded binary search in whole 4k token budgets."""
    granularity = settings["granularity"]
    minimum, maximum = settings["min_tokens"], settings["max_tokens"]
    margin = settings["headroom_bytes"]
    records = []

    def fits(tokens):
        result = attempt(tokens)
        result["accepted"] = result["status"] == "ok" and result["peak_reserved"] <= result["device_bytes"] - margin
        records.append(result)
        return result["accepted"]

    if not fits(minimum):
        raise RuntimeError("Minimum probe microbatch did not fit with the requested headroom")
    low, high = minimum, None
    while low < maximum:
        candidate = min(low * 2, maximum)
        if fits(candidate):
            low = candidate
        else:
            high = candidate
            break
    if high is not None:
        while high - low > granularity:
            candidate = ((low + high) // (2 * granularity)) * granularity
            if candidate <= low:
                break
            if fits(candidate):
                low = candidate
            else:
                high = candidate
    return {"selected_tokens": low, "failed_upper_tokens": high, "search_cap": maximum,
            "granularity": granularity, "headroom_bytes": margin, "attempts": records}


def maximize_and_train(config, dataset, output, use_wandb=True, resume=None):
    output = Path(output)
    output.mkdir(parents=True, exist_ok=True)
    write_json(output / "requested-config.json", config)
    settings = config["capacity"]

    def attempt(tokens):
        candidate = copy.deepcopy(config)
        candidate["train"].update(microbatch_tokens=tokens, accumulation=1)
        candidate_config = output / f"probe-config-{tokens}.json"
        result_file = output / f"probe-result-{tokens}.json"
        write_json(candidate_config, candidate)
        write_json(output / "capacity-progress.json", {"stage": "probe", "microbatch_tokens": tokens})
        with (output / f"probe-{tokens}.log").open("w") as log:
            completed = subprocess.run([sys.executable, "-u", "-m", "training_lab", "probe-batch",
                                        "--config", str(candidate_config), "--dataset", str(dataset),
                                        "--output", str(result_file)], stdout=log, stderr=subprocess.STDOUT,
                                       timeout=settings["probe_timeout_seconds"])
        if completed.returncode != 0 or not result_file.exists():
            raise RuntimeError(f"Capacity probe {tokens} failed; see probe-{tokens}.log")
        result = json.loads(result_file.read_text())
        write_json(output / "capacity-progress.json", {"stage": "probe_complete", "microbatch_tokens": tokens,
                   "status": result["status"], "peak_reserved": result["peak_reserved"]})
        print(json.dumps({"stage": "capacity", **result}), flush=True)
        return result

    search = json.loads((output / "capacity-search.json").read_text()) if resume else choose_capacity(attempt, settings)
    write_json(output / "capacity-search.json", search)
    resolved = copy.deepcopy(config)
    resolved["train"].update(microbatch_tokens=search["selected_tokens"], accumulation=1)
    resolved["capacity_selection"] = {"requested_config_identity": fingerprint(config),
                                      "selected_tokens": search["selected_tokens"],
                                      "headroom_bytes": search["headroom_bytes"]}
    write_json(output / "capacity-progress.json", {"stage": "train", "microbatch_tokens": search["selected_tokens"]})
    from .engine import train
    return train(resolved, dataset, output, resume=resume, device="cuda", use_wandb=use_wandb)
