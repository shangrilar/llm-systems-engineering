"""LM head + CE; sum reduction keeps variable-token accumulation correct."""
from __future__ import annotations

import torch
import torch.nn.functional as F


def resolve_backend(backend):
    if backend == "auto":
        return "torch_linear_ce" if hasattr(F, "linear_cross_entropy") else "liger"
    return backend


def linear_ce(hidden, weight, targets, backend="auto", chunk_tokens=512):
    backend = resolve_backend(backend)
    if backend == "torch_linear_ce":
        if not hasattr(F, "linear_cross_entropy"):
            raise RuntimeError("torch_linear_ce requires a PyTorch build with linear_cross_entropy; use Liger on older builds")
        # PyTorch 2.14's BF16 chunked scalar output/accumulator is BF16 even
        # with acc_dtype=float32. This biases large-token loss sums. Keep this
        # explicit native alternative in FP32 (TF32 matmuls when enabled).
        options = torch.nn.LinearCrossEntropyOptions(acc_policy="compact", acc_dtype=torch.float32)
        with torch.autocast(hidden.device.type, enabled=False):
            result = F.linear_cross_entropy(hidden.float(), weight.float(), targets, reduction="sum", options=options)
        if result.dtype != torch.float32:
            raise RuntimeError("Native CE must return an FP32 token loss sum")
        return result
    if backend == "liger":
        from liger_kernel.transformers import LigerFusedLinearCrossEntropyLoss
        result = LigerFusedLinearCrossEntropyLoss(reduction="sum", accum_dtype=torch.float32)(weight, hidden, targets)
        if result.dtype != torch.float32:
            raise RuntimeError("Liger CE must return an FP32 token loss sum")
        return result
    if backend not in ("reference", "legacy_chunked"):
        raise ValueError("Unknown loss backend: " + backend)
    if backend == "legacy_chunked":
        chunks = (hidden[start:start + chunk_tokens] for start in range(0, hidden.shape[0], chunk_tokens))
    else:
        # SplitBackward concatenates once; independent SliceBackward repeatedly
        # zeroes and accumulates a full [T,H] gradient for every output chunk.
        chunks = hidden.split(chunk_tokens)
    loss = hidden.new_zeros((), dtype=torch.float32)
    for chunk, labels in zip(chunks, targets.split(chunk_tokens)):
        loss = loss + F.cross_entropy(F.linear(chunk, weight).float(), labels, reduction="sum")
    return loss
