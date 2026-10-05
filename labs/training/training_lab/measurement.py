"""Explicit observation windows and a documented model-FLOPs estimate."""
from __future__ import annotations

from pathlib import Path

from .config import write_json


def model_flops(model_config, vocab_size, lengths):
    """Forward + backward matmul estimate; no optimizer, norms, or kernel overhead.

    This uses nanoGPT's full-square attention convention, separately for every
    independent document segment. It is an estimate, not hardware FLOP counters.
    Embedding lookup and learned positions are not dense matrix multiplies;
    the tied vocabulary output projection is counted once as a matrix multiply.
    """
    dim, layers = model_config["dim"], model_config["layers"]
    linear_parameters = 12 * layers * dim * dim + vocab_size * dim
    return 6 * linear_parameters * sum(lengths) + 12 * layers * dim * sum(s * s for s in lengths)


def performance_summary(records, peak_flops=None):
    measured = [r for r in records if not r.get("warmup") and not r.get("instrumented", r.get("profiled", False))]
    seconds = sum(r["step_seconds"] for r in measured)
    tokens = sum(r["step_tokens"] for r in measured)
    flops = sum(r.get("estimated_model_flops", 0) for r in measured)
    def maximum(key):
        values = [r[key] for r in measured if r.get(key) is not None]
        return max(values) if values else None
    return {"measured_steps": [r["step"] for r in measured], "measured_seconds": seconds,
            "measured_tokens": tokens, "tokens_per_second_per_gpu": tokens / seconds if seconds else None,
            "estimated_mfu": flops / seconds / peak_flops if seconds and peak_flops else None,
            "gpu_peak_allocated": maximum("gpu_peak_allocated"),
            "gpu_peak_reserved": maximum("gpu_peak_reserved"),
            "scope": "Single GPU update wall time: packing + H2D + forward + backward + clip + optimizer; validation, logging, checkpoint and profiler export excluded. Warmup and observed steps excluded."}


class Observations:
    def __init__(self, config, output, device):
        import torch
        self.torch, self.device = torch, device
        self.output = Path(output)
        settings = config.get("observation", {})
        total = config["train"]["steps"]
        self.profile_steps = set(settings.get("profile_steps", []))
        self.memory_step = settings.get("memory_step")
        if config.get("mode") == "profile":
            self.profile_steps = set(range(1, total + 1))
            self.memory_step = total
        self.with_stack = settings.get("with_stack", False)
        self.record_shapes = settings.get("record_shapes", True)
        self.max_entries = settings.get("memory_max_entries", 100000)
        self.profiler = None
        self.memory_active = False
        self.events, self.traces = [], []
        self.step, self.window_start = None, None

    def begin(self, step):
        torch = self.torch
        self.step = step
        if step in self.profile_steps and self.profiler is None:
            activities = [torch.profiler.ProfilerActivity.CPU]
            if self.device == "cuda":
                activities.append(torch.profiler.ProfilerActivity.CUDA)
            self.profiler = torch.profiler.profile(activities=activities, record_shapes=self.record_shapes,
                                                   profile_memory=True, with_stack=self.with_stack)
            self.profiler.__enter__()
            self.window_start = step
        if step == self.memory_step and self.device == "cuda":
            torch.cuda.memory._record_memory_history(max_entries=self.max_entries, clear_history=True)
            self.memory_active = True
        return step in self.profile_steps, self.memory_active

    def memory_event(self, stage, microbatch=None):
        if self.memory_active:
            self.torch.cuda.synchronize()
            self.events.append({"stage": stage, "step": self.step, "microbatch": microbatch,
                                "allocated": self.torch.cuda.memory_allocated(),
                                "reserved": self.torch.cuda.memory_reserved()})

    def end(self):
        # Dump immediately after the observed update, before validation/checkpoint.
        if self.memory_active:
            self.torch.cuda.memory._dump_snapshot(str(self.output / "memory-snapshot.pickle"))
            self.torch.cuda.memory._record_memory_history(enabled=None)
            self.memory_active = False
            write_json(self.output / "memory-events.json", self.events)
        if self.profiler is not None:
            self.profiler.step()
            if self.step + 1 not in self.profile_steps:
                self.profiler.__exit__(None, None, None)
                name = "timeline.json" if not self.traces else f"timeline-{self.window_start}-{self.step}.json"
                self.profiler.export_chrome_trace(str(self.output / name))
                sort = "self_cuda_time_total" if self.device == "cuda" else "self_cpu_time_total"
                (self.output / f"operators-{self.window_start}-{self.step}.txt").write_text(
                    self.profiler.key_averages().table(sort_by=sort, row_limit=50))
                self.traces.append({"file": name, "first_step": self.window_start, "last_step": self.step})
                self.profiler = None
        write_json(self.output / "observations.json", {"profile_steps": sorted(self.profile_steps),
                   "memory_step": self.memory_step, "memory_device": self.device, "traces": self.traces,
                   "snapshot": "memory-snapshot.pickle" if self.events else None})

    def close(self):
        if self.profiler is not None:
            self.profiler.__exit__(None, None, None)
            self.profiler = None
        if self.memory_active:
            self.torch.cuda.memory._record_memory_history(enabled=None)
            self.memory_active = False
