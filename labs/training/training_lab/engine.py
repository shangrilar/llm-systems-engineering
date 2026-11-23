from __future__ import annotations

import contextlib
import importlib.metadata
import json
import math
import os
import platform
import random
import time
from pathlib import Path

import torch

from .config import fingerprint, write_json
from .data import TokenStore, inspect_dataset, sampler_for_config
from .model import Decoder, PackedBatch
from .measurement import Observations, model_flops, performance_summary


def environment():
    versions = {}
    for name in ("torch", "flash-attn", "liger-kernel", "huggingface-hub", "pyarrow", "transformers", "wandb", "numpy"):
        try:
            versions[name] = importlib.metadata.version(name)
        except importlib.metadata.PackageNotFoundError:
            versions[name] = None
    return {"python": platform.python_version(), "packages": versions, "cuda": torch.version.cuda,
            "gpu": torch.cuda.get_device_name(0) if torch.cuda.is_available() else None,
            "gpu_memory_bytes": torch.cuda.get_device_properties(0).total_memory if torch.cuda.is_available() else None,
            "cpu": platform.processor(), "cpu_count": os.cpu_count(),
            "provenance": json.loads(os.environ.get("LAB_PROVENANCE", "{}"))}


def train(config, dataset, output, resume=None, device="cuda", use_wandb=True):
    output, dataset = Path(output), Path(dataset)
    output.mkdir(parents=True, exist_ok=True)
    if device == "cuda" and not torch.cuda.is_available():
        raise RuntimeError("CUDA GPU required for this recipe")
    if config["train"]["attention"] in ("flex", "flash_varlen") and device != "cuda":
        raise ValueError("Use sdpa_documents for the CPU reference")
    expected_torch = config.get("runtime", {}).get("torch_version", "2.8.0")
    if not torch.__version__.split("+")[0] == expected_torch:
        raise RuntimeError("Recipe pins PyTorch " + expected_torch)
    torch.manual_seed(config["seed"])
    random.seed(config["seed"])
    torch.set_float32_matmul_precision("high")
    train_cfg, data_cfg = config["train"], config["data"]
    manifest = json.loads((dataset / "manifest.json").read_text())
    stores = {s: TokenStore(dataset, s, data_cfg["max_seq_len"]) for s in ("train", "validation")}

    def sampler(split):
        return sampler_for_config(stores[split], config, split)

    training_sampler = sampler("train")
    model = Decoder(manifest["vocab_size"], max_seq_len=data_cfg["max_seq_len"],
                    backend=train_cfg["attention"], loss_backend=train_cfg.get("loss_backend", "legacy_chunked"),
                    **config["model"]).to(device)
    # FP32 parameters, grads, m/v; CUDA autocast BF16 compute. No separate FP32 master copy.
    optimizer = torch.optim.AdamW(model.parameters(), lr=train_cfg["lr"], betas=(0.9, 0.95),
                                  weight_decay=train_cfg["weight_decay"], fused=device == "cuda")
    experiment_identity = fingerprint({"config": config, "dataset": manifest})
    step, consumed_tokens, elapsed_before = 0, 0, 0.0
    if resume:
        state = torch.load(resume, map_location="cpu", weights_only=False)
        if state["identity"] != experiment_identity:
            raise ValueError("Checkpoint config/data mismatch")
        model.load_state_dict(state["model"])
        optimizer.load_state_dict(state["optimizer"])
        training_sampler.load_state_dict(state["sampler"])
        torch.set_rng_state(state["torch_rng"])
        random.setstate(state["python_rng"])
        if device == "cuda":
            torch.cuda.set_rng_state_all(state["cuda_rng"])
        step, consumed_tokens, elapsed_before = state["step"], state["tokens"], state["elapsed_seconds"]
        metrics = output / "metrics.jsonl"
        if metrics.exists():
            # A crash may leave logs newer than the last atomic checkpoint.
            retained = []
            for line in metrics.read_text().splitlines():
                try:
                    if json.loads(line)["step"] <= step:
                        retained.append(line)
                except ValueError:
                    pass
            metrics.write_text("\n".join(retained) + ("\n" if retained else ""))

    write_json(output / "config.json", config)
    write_json(output / "data-manifest.json", manifest)
    write_json(output / "data-stats.json", inspect_dataset(dataset, config))
    info = environment()
    info["parameters"] = sum(p.numel() for p in model.parameters())
    info["gpu_count"] = torch.cuda.device_count() if device == "cuda" else 0
    peak_flops = config.get("measurement", {}).get("bf16_peak_flops_per_gpu") if device == "cuda" else None
    expected_gpu = config.get("measurement", {}).get("expected_gpu")
    if expected_gpu and device == "cuda" and expected_gpu not in info["gpu"]:
        raise ValueError("MFU reference GPU does not match the allocated device")
    info["mfu_reference"] = {"peak_flops_per_gpu": peak_flops, "dtype": "bf16", "sparsity": False,
                             "formula": "6*(12*layers*dim^2 + vocab*dim)*tokens + 12*layers*dim*sum(segment_length^2)",
                             "note": "Estimated forward/backward matrix FLOPs; full-square attention convention for each independent segment. Excludes optimizer, normalization, recompute and kernel/tile overhead."}
    info["precision"] = {"parameters": "fp32", "master_copy": False, "gradients": "fp32",
                         "optimizer": "fp32", "compute": "bf16_autocast" if device == "cuda" else "fp32"}
    from .loss import resolve_backend
    info["loss_backend"] = resolve_backend(model.loss_backend)
    info["precision"]["loss_sum"] = "fp32"
    info["precision"]["head_compute"] = "fp32_tf32" if info["loss_backend"] == "torch_linear_ce" else info["precision"]["compute"]
    info["attention_backend"] = train_cfg["attention"]
    info["attention_implementation"] = ("torch.nn.attention.varlen.varlen_attn"
                                        if train_cfg["attention"] == "flash_varlen" else train_cfg["attention"])
    write_json(output / "environment.json", info)
    run = None
    if use_wandb:
        import wandb
        run = wandb.init(project=os.environ.get("WANDB_PROJECT", "llm-training-lab"),
                         entity=os.environ.get("WANDB_ENTITY") or None,
                         dir=str(output),
                         name=config["name"], group=config.get("group", "preparation"),
                         config={**config, "environment": info, "data_identity": fingerprint(manifest)})
        write_json(output / "wandb.json", {"url": run.url, "id": run.id})

    def synchronize():
        if device == "cuda":
            torch.cuda.synchronize()

    def autocast():
        return torch.autocast("cuda", dtype=torch.bfloat16) if device == "cuda" else contextlib.nullcontext()

    def evaluate():
        # Rebuild the validation sampler every time: same order/batches across evaluations.
        validation_sampler = sampler("validation")
        loss, tokens = 0.0, 0
        model.eval()
        with torch.no_grad(), autocast():
            for _ in range(train_cfg["eval_batches"]):
                segments, bins = validation_sampler.next_batch()
                batch = PackedBatch.from_segments(segments, bins, device)
                loss += model.loss_sum(batch).item()
                tokens += batch.targets.numel()
        model.train()
        return loss / tokens, tokens

    profile_mode = config.get("mode", "train") == "profile"
    observations = Observations(config, output, device)

    metrics_path = output / "metrics.jsonl"
    start_time = time.perf_counter()
    target_hit = state.get("target_loss_hit") if resume else None
    if resume and (output / "summary.json").exists():
        target_hit = json.loads((output / "summary.json").read_text()).get("target_loss_hit")
    last_validation = None
    initial_validation = None
    if step == 0 and train_cfg.get("initial_eval", False):
        initial_validation, initial_tokens = evaluate()
        synchronize()
        write_json(output / "initial-validation.json", {"validation_loss": initial_validation, "tokens": initial_tokens})
        if run:
            run.log({"validation_loss": initial_validation, "tokens": 0}, step=0)

    def save_checkpoint(elapsed):
        checkpoint = {"identity": experiment_identity, "model": model.state_dict(),
                      "optimizer": optimizer.state_dict(), "sampler": training_sampler.state_dict(),
                      "torch_rng": torch.get_rng_state(), "python_rng": random.getstate(),
                      "cuda_rng": torch.cuda.get_rng_state_all() if device == "cuda" else [],
                      "step": step, "tokens": consumed_tokens, "elapsed_seconds": elapsed,
                      "target_loss_hit": target_hit}
        temporary = output / "checkpoint.pt.tmp"
        torch.save(checkpoint, temporary)
        temporary.replace(output / "checkpoint.pt")
    try:
        while step < train_cfg["steps"]:
            profiled, memory_sampled = observations.begin(step + 1)
            synchronize()
            step_start = time.perf_counter()
            if device == "cuda":
                torch.cuda.reset_peak_memory_stats()
            optimizer.zero_grad(set_to_none=True)
            observations.memory_event("zero_grad")
            # Normalize all microbatches by their joint real-target count.
            # Variable packed T means dividing by accumulation alone is incorrect.
            microbatches = [training_sampler.next_batch() for _ in range(train_cfg["accumulation"])]
            pack_counts = [len(bins) for _, bins in microbatches]
            segment_counts = [len(segments) for segments, _ in microbatches]
            tokens = sum(len(s.inputs) for segments, _ in microbatches for s in segments)
            loss_value = 0.0
            lengths = [len(segment.inputs) for segments, _ in microbatches for segment in segments]
            estimated_flops = model_flops(config["model"], manifest["vocab_size"], lengths)
            for microbatch_index, (segments, bins) in enumerate(microbatches):
                with torch.profiler.record_function("batch_to_device"):
                    batch = PackedBatch.from_segments(segments, bins, device)
                with torch.profiler.record_function("forward_loss"), autocast():
                    loss = model.loss_sum(batch)
                observations.memory_event("forward", microbatch_index)
                loss_value += loss.detach().item()
                with torch.profiler.record_function("backward"):
                    (loss / tokens).backward()
                observations.memory_event("backward", microbatch_index)
                del batch, loss
            with torch.profiler.record_function("clip_and_optimizer"):
                grad_norm = torch.nn.utils.clip_grad_norm_(model.parameters(), train_cfg["clip_grad"])
                if not math.isfinite(loss_value) or not math.isfinite(float(grad_norm)):
                    raise RuntimeError("Non-finite loss/gradient; update aborted")
                optimizer.step()
            observations.memory_event("optimizer")
            synchronize()
            step_seconds = time.perf_counter() - step_start
            step += 1
            consumed_tokens += tokens
            peak = torch.cuda.max_memory_allocated() if device == "cuda" else None
            peak_reserved = torch.cuda.max_memory_reserved() if device == "cuda" else None
            allocated = torch.cuda.memory_allocated() if device == "cuda" else None
            reserved = torch.cuda.memory_reserved() if device == "cuda" else None
            observations.end()
            validation_seconds = None
            if step % train_cfg["eval_every"] == 0 or step == train_cfg["steps"]:
                eval_start = time.perf_counter()
                last_validation, validation_tokens = evaluate()
                synchronize()
                validation_seconds = time.perf_counter() - eval_start
                threshold = train_cfg.get("target_loss")
                if threshold is not None and last_validation <= threshold and target_hit is None:
                    target_hit = {"step": step, "tokens": consumed_tokens,
                                  "elapsed_seconds": elapsed_before + time.perf_counter() - start_time}
            record = {"step": step, "tokens": consumed_tokens, "step_tokens": tokens,
                      "microbatch_pack_counts": pack_counts, "microbatch_segment_counts": segment_counts,
                      "train_loss": loss_value / tokens, "validation_loss": last_validation
                      if validation_seconds is not None else None, "step_seconds": step_seconds,
                      "tokens_per_second": tokens / step_seconds, "gpu_peak_allocated": peak,
                      "gpu_reserved": reserved, "gpu_allocated": allocated, "gpu_peak_reserved": peak_reserved,
                      "tokens_per_second_per_gpu": tokens / step_seconds,
                      "estimated_model_flops": estimated_flops,
                      "estimated_mfu": estimated_flops / step_seconds / peak_flops if peak_flops else None,
                      "validation_seconds": validation_seconds,
                      "elapsed_seconds": elapsed_before + time.perf_counter() - start_time,
                      "profiled": profiled, "memory_sampled": memory_sampled,
                      "instrumented": profiled or memory_sampled, "warmup": step <= train_cfg["warmup_steps"]}
            with metrics_path.open("a") as log:
                log.write(json.dumps(record) + "\n")
            print(json.dumps(record), flush=True)
            if run:
                run.log({key: value for key, value in record.items() if value is not None}, step=step)
            if not profile_mode and step % train_cfg.get("checkpoint_every", train_cfg["eval_every"]) == 0:
                save_checkpoint(elapsed_before + time.perf_counter() - start_time)
        records = [json.loads(line) for line in metrics_path.read_text().splitlines()]
        measured = performance_summary(records, peak_flops)
        summary = {"identity": experiment_identity, "steps": step, "tokens": consumed_tokens,
                   "validation_loss": last_validation, "initial_validation_loss": initial_validation,
                   "performance": measured, "target_loss_hit": target_hit,
                   "elapsed_seconds": elapsed_before + time.perf_counter() - start_time,
                   "profiled": profile_mode, "timing_note": "Includes compile, packing, validation, logging, periodic checkpoints; final checkpoint/artifact upload excluded"}
        write_json(output / "summary.json", summary)
        save_checkpoint(summary["elapsed_seconds"])
        from .report import build_report
        build_report(output)
        if run:
            import wandb
            run.summary.update({"final_validation_loss": last_validation,
                                "initial_validation_loss": initial_validation,
                                "performance": measured})
            # Keep checkpoints on the Pod/local download; traces and logs are versioned in W&B.
            artifact = wandb.Artifact("training-" + run.id, type="experiment", metadata=summary)
            for path in output.iterdir():
                if path.is_file() and path.name != "checkpoint.pt":
                    artifact.add_file(str(path))
            logged_artifact = run.log_artifact(artifact)
            if run.settings.mode != "offline":
                logged_artifact.wait()
            run.finish()
        return summary
    except BaseException:
        if run:
            run.finish(exit_code=1)
        raise
    finally:
        observations.close()
