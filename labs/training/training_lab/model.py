from __future__ import annotations

from dataclasses import dataclass

import torch
from torch import nn
from torch.nn import functional as F


def flash_varlen(q, k, v, cu_seqlens, max_seqlen):
    # The causal window selects PyTorch's bundled FlashAttention path; no
    # external CUDA extension is required. cu_seqlens isolates documents.
    from torch.nn.attention.varlen import varlen_attn
    return varlen_attn(q, k, v, cu_seqlens, cu_seqlens, max_seqlen, max_seqlen,
                       window_size=(-1, 0))


@dataclass
class PackedBatch:
    inputs: torch.Tensor
    targets: torch.Tensor
    positions: torch.Tensor
    segment_ids: torch.Tensor
    boundaries: list
    bin_lengths: list
    cu_seqlens: torch.Tensor
    max_seqlen: int

    @classmethod
    def from_segments(cls, segments, bins, device):
        inputs, targets, positions, ids, boundaries = [], [], [], [], [0]
        for i, segment in enumerate(segments):
            length = len(segment.inputs)
            inputs.extend(segment.inputs)
            targets.extend(segment.targets)
            positions.extend(range(length))
            ids.extend([i] * length)
            boundaries.append(len(inputs))
        if not inputs:
            raise ValueError("Empty packed batch")
        return cls(*(torch.tensor(v, dtype=torch.long, device=device)
                     for v in (inputs, targets, positions, ids)), boundaries, bins,
                   torch.tensor(boundaries, dtype=torch.int32, device=device),
                   max(b-a for a,b in zip(boundaries,boundaries[1:])))


def document_mask(segment_ids):
    # create_block_mask can evaluate indices beyond the last partial block.
    def mask(batch, head, query, key):
        length = segment_ids.shape[0]
        return ((query < length) & (key < length) & (query >= key)
                & (segment_ids[query.clamp(max=length - 1)] == segment_ids[key.clamp(max=length - 1)]))

    return mask


class Attention(nn.Module):
    def __init__(self, dim, heads, backend):
        super().__init__()
        self.heads, self.head_dim, self.backend = heads, dim // heads, backend
        self.qkv = nn.Linear(dim, 3 * dim, bias=False)
        self.output = nn.Linear(dim, dim, bias=False)
        self.flex = None
        if backend == "flex":
            from torch.nn.attention.flex_attention import flex_attention
            self.flex = torch.compile(flex_attention, dynamic=True)

    def forward(self, x, batch, block_mask):
        q, k, v = self.qkv(x).view(-1, 3, self.heads, self.head_dim).unbind(1)
        if self.backend == "flash_varlen":
            result = flash_varlen(q.contiguous(), k.contiguous(), v.contiguous(),
                                  batch.cu_seqlens, batch.max_seqlen)
            return self.output(result.reshape(x.shape))
        q, k, v = (t.transpose(0, 1).unsqueeze(0) for t in (q, k, v))
        if self.backend == "flex":
            result = self.flex(q, k, v, block_mask=block_mask)
        else:
            # CPU reference: independent causal SDPA per segment. No dense cross-document mask.
            result = torch.cat([F.scaled_dot_product_attention(q[:, :, start:end], k[:, :, start:end],
                                                              v[:, :, start:end], is_causal=True)
                                for start, end in zip(batch.boundaries, batch.boundaries[1:])], dim=2)
        return self.output(result.squeeze(0).transpose(0, 1).reshape(x.shape))


class Block(nn.Module):
    def __init__(self, dim, heads, backend):
        super().__init__()
        self.norm1, self.norm2 = nn.LayerNorm(dim), nn.LayerNorm(dim)
        self.attention = Attention(dim, heads, backend)
        self.mlp = nn.Sequential(nn.Linear(dim, 4 * dim, bias=False), nn.GELU(),
                                 nn.Linear(4 * dim, dim, bias=False))

    def forward(self, x, batch, mask):
        x = x + self.attention(self.norm1(x), batch, mask)
        return x + self.mlp(self.norm2(x))


class Decoder(nn.Module):
    """Small GPT-style Dense baseline trained from scratch; this is not HF weight loading."""

    def __init__(self, vocab_size, dim, heads, layers, max_seq_len, backend, loss_backend="reference"):
        super().__init__()
        self.backend = backend
        self.loss_backend = loss_backend
        self.embedding = nn.Embedding(vocab_size, dim)
        self.position = nn.Embedding(max_seq_len, dim)
        self.blocks = nn.ModuleList([Block(dim, heads, backend) for _ in range(layers)])
        self.norm = nn.LayerNorm(dim)
        self.apply(self._initialize)

    @staticmethod
    def _initialize(module):
        if isinstance(module, (nn.Embedding, nn.Linear)):
            nn.init.normal_(module.weight, mean=0, std=0.02)

    def forward(self, batch):
        mask = None
        if self.backend == "flex":
            from torch.nn.attention.flex_attention import create_block_mask
            with torch.profiler.record_function("document_block_mask"):
                mask = create_block_mask(document_mask(batch.segment_ids), B=1, H=None,
                                         Q_LEN=batch.inputs.numel(), KV_LEN=batch.inputs.numel(),
                                         device=str(batch.inputs.device), _compile=True)
        x = self.embedding(batch.inputs) + self.position(batch.positions)
        for i, block in enumerate(self.blocks):
            with torch.profiler.record_function("block_" + str(i)):
                x = block(x, batch, mask)
        return self.norm(x)

    def loss_sum(self, batch, loss_chunk_tokens=512):
        from .loss import linear_ce
        hidden = self(batch)
        with torch.profiler.record_function("lm_head_and_ce"):
            return linear_ce(hidden, self.embedding.weight, batch.targets, self.loss_backend, loss_chunk_tokens)
