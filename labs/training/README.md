# Training lab

An educational PyTorch pretraining engine with document-preserving FineWeb preparation,
runtime packing, experiment records, and a RunPod launcher using the [shared experiment runner](../runner/README.md). [한국어 안내](README.ko.md).

Related articles: [Preparation 1: the repository and RunPod environment](https://ai-systems-engineering.com/en/posts/training-prep-01-repository-runpod/) and [Preparation 2: from FineWeb to training batches](https://ai-systems-engineering.com/en/posts/training-prep-02-data-preparation/). The articles are under Draft PR review; these are their publication URLs.

## Run with two API keys

Requires Python 3.9+ on your computer. No local GPU, Docker, SSH key, Hugging Face token,
or GitHub token is needed. RunPod needs an account with credits and H100 availability.

```sh
cd labs/training
cp .env.example .env
# Put RUNPOD_API_KEY and WANDB_API_KEY in .env using your editor.
python3 -m training_lab runpod --config smoke --dry-run
python3 -m training_lab runpod --config smoke
```

The launcher uploads only allowlisted source/config files to a pinned public CUDA image.
It installs worker dependencies, prepares FineWeb, trains, evaluates, uploads an artifact to
W&B, verifies/downloads results locally, then deletes the Pod. The RunPod key stays on your
computer. `.env`, Pod access state, data, checkpoints, traces, and local results are ignored by Git.
The first `cycle` run completed 100 real H100 updates on 2026-10-04, with online W&B logging,
CUDA trace and allocator-history validation. A W&B log-symlink collection failure was fixed
and the downloaded results recovered before Pod deletion. Local unit tests alone do not verify cloud execution.

`smoke` uses 4 layers / width 256, six updates, a 4k context cap, and small data budgets.
`baseline` uses 12 layers / width 768 / 12 heads (about 127M parameters), 100 updates,
and larger budgets. These are initial engineering settings, not validated quality targets.
`profile` is a separate three-update observation run. Do not compare its throughput with unprofiled runs.
`cycle` uses the 127M model for 100 updates, observes updates 21–22 with the profiler,
and records allocator history during update 100, dumping the snapshot before final validation.
It also evaluates the initialized model. This is a short infrastructure baseline, not a convergence run.

```sh
python3 -m training_lab runpod --config profile
python3 -m training_lab runpod --config baseline
python3 -m training_lab runpod --config cycle
python3 -m training_lab runpod --config max-batch
```

`max-batch` prepares the same cache, probes training microbatches in isolated GPU processes,
then runs one 100-update training job with accumulation 1. Probes include backward, clipping,
and AdamW updates. Doubling and a 4096-token binary search locate the largest tested capacity
with 2 GiB of allocator headroom, within a 262144-token search ceiling. This is a discrete
capacity search, not a proof over every possible document mixture or token count.
Validation remains eight deterministic 8192-token-budget batches. Larger training batches
may change total training tokens and the effective update batch; label those changes when
comparing loss. `capacity-search.json` stores every probe and the chosen budget.
The profiler keeps CUDA timelines but disables shape recording for this memory-bound run.

## Corrected engine: explicit batches, FlashAttention, integrated CE

```sh
python3 -m training_lab runpod --config corrected
```

`corrected` pins PyTorch 2.14.1 (CUDA 12.6 wheel). Variable-length FlashAttention uses a PyTorch public API; no external FlashAttention
extension needs compilation. Integrated CE uses the pinned Liger kernel for BF16
compute and FP32 token loss accumulation. The pinned CUDA 12.8 image supplies the bootstrap
runtime, then the exact runtime wheel is installed. Versions are recorded in `environment.json`.

`train.batch_size` is the number of logical packs per microbatch, each capped at 4096 tokens.
The recipe uses 35 packs and accumulation 1. Short documents stay whole; unused slots are
not sent to the model. `microbatch_pack_counts`, `microbatch_segment_counts`, and actual
`step_tokens` distinguish pack count, independent attention sequences, and real targets.
`batch_size` and the historical `microbatch_tokens` control are mutually exclusive.
Historical recipes keep the token-budget/FlexAttention/legacy chunked CE path for comparisons.

Q/K/V contain only actual tokens. `torch.nn.attention.varlen.varlen_attn` receives int32 cumulative lengths
for **each document/chunk**, its maximum length, and the causal window `(-1, 0)`. A logical pack may contain
multiple independent attention sequences. This does not construct a generic global T-by-T mask.

PyTorch's integrated CE API exists, but its BF16 scalar accumulator in 2.14 rounds
large token loss sums even with FP32 internal accumulation. The corrected recipe uses
Liger 0.8.4 integrated linear CE: BF16 AMP matmuls with an FP32 loss sum and FP32
weight-gradient accumulation. The explicit `torch_linear_ce` alternative runs its head
in FP32/TF32 to guarantee an FP32 loss sum; `auto` selects that safe native alternative
when the API is available. Original parameters/grads/AdamW states stay FP32.
Both optimized CE paths precompute head gradients in forward, so timeline boundaries
differ from ordinary autograd. `reference` uses split-based ordinary CE, avoiding repeated
full-hidden slice gradients.

GPU preflight compares native and Liger loss/xgrad/wgrad, including a many-chunk large-token check and FlashAttention output/dq/dk/dv with reference
calculations, including document isolation. `gpu-preflight.json` must pass before training.
The same Pod runs a four-case matched benchmark (Flex/Flash × legacy/Liger CE): same input,
seed, model, optimizer and GPU, three warmup updates then five timed updates per case.
One separate trace per case is outside timings. Benchmark time includes H2D and updates;
runtime best-fit selection is excluded. Results are in `matched-benchmark.json`.
The final 100-update training run includes packing in its normal throughput measurement,
keeps the historical validation token set, profiles updates 21–22 and snapshots update 100.
No automatic checkpoint/data publication occurs.

Native API: [PyTorch linear_cross_entropy](https://docs.pytorch.org/docs/2.14/generated/torch.nn.functional.linear_cross_entropy.html),
[chunking options](https://docs.pytorch.org/docs/2.14/generated/torch.nn.LinearCrossEntropyOptions.html).

## Results and lifecycle

Results go to `.runs/<pod-id>/`: `report.html`, `metrics.jsonl`, resolved config,
data manifest, environment/provenance, checkpoint, and W&B run URL.
Profile runs additionally contain `timeline.json`, `memory-events.json`, and
`memory-snapshot.pickle`. Open the timeline in [Perfetto](https://ui.perfetto.dev/)
and the snapshot in the [PyTorch memory visualizer](https://pytorch.org/memory_viz).

Time includes compile, normal validation/logging, and periodic checkpoints; first steps are marked warmup.
Step throughput includes packing, transfers, forward/backward and optimizer, and excludes evaluation,
logging, checkpoints, and observation export. `summary.json.performance` divides joint real tokens
by joint update time, excluding warmup and observed steps. It reports tokens/s/GPU, estimated MFU,
and peak allocated/reserved memory for those same steps. Raw observed-step measurements remain
in the log with `profiled`, `memory_sampled`, and `instrumented` flags.

MFU uses a documented forward/backward matrix-FLOPs estimate: `6*(12*L*d² + V*d)*T + 12*L*d*Σs²`,
where each `s` is an independent segment length. The vocabulary head is counted; position/embedding
lookups, optimizer, normalization, and kernel overhead are excluded. Attention uses the nanoGPT-style
full-square convention for each segment, rather than counting cross-document pairs.
This is not a hardware FLOP measurement or an exact causal-kernel operation count.
The H100 SXM recipe uses **989 TFLOPS dense BF16**, not the sparse peak, and checks the device name.
The first ten cycle updates are timing warmup, not an LR warmup schedule.
PyTorch allocated/reserved memory is not total GPU process memory.
Historical recipes use ordinary chunked CE; `corrected` uses Liger integrated linear CE.
FP32 parameters/grads/AdamW states with BF16 autocast are the first baseline; there is no separate master copy.

On a timeout, interruption, or failed result download, the controller attempts to **stop**
the Pod without deleting its disk. Storage charges may remain. State is in `.runpod/<run-id>.json`
(mode 0600); it contains the Pod access token, never either API key. If stop cannot be confirmed,
the launcher prints the Pod ID for manual cleanup. Keep the controller running while the Pod is active;
loss of the controlling computer cannot guarantee automatic cloud cleanup.
Do not retry an uncertain Pod creation until checking the console: create requests are not blindly repeated.

The shared runner separates experiment outcome from resource status and confirms Pod deletion with an API 404.
The original absolute deadline is preserved when monitoring resumes. W&B can be disabled with
`python3 -m training_lab runpod --config smoke --no-wandb`.

After resuming a stopped Pod in the RunPod console:

```sh
python3 -m training_lab monitor .runpod/STATE.json
# Or collect and terminate explicitly:
python3 -m training_lab collect .runpod/STATE.json --output .runs/recovered
python3 -m training_lab terminate .runpod/STATE.json
```

Repeated runs may use an existing network volume by setting `runpod.network_volume_id`
in a copied recipe. Its lifecycle is separate from the Pod; the launcher never deletes it.
The default needs no volume setup and re-prepares its small dataset each new Pod.
Network-volume data caches are content-addressed. Use one writer at a time per data identity.

## Data contract

- FineWeb `sample-10BT` (`sample/10BT` Parquet prefix) and GPT-2 tokenizer revisions are pinned in recipes.
  A direct single-thread Parquet reader closes its stream explicitly; no dataset scanner is used.
- Original-document content hashes determine train/validation split before chunking;
  exact duplicate texts are skipped. Near-duplicate detection is not implemented.
- Tokens and original-document offsets are stored, rather than offline packed rows.
  Whole documents are admitted until each raw-token budget is reached, so budgets can overshoot by one document.
- Predictor segments cap at 4096. Short documents remain whole; long documents use
  contiguous, independent segments. EOS is added only at the original document end.
  One-token label lookahead preserves every next-token pair, without connecting attention.
- A seeded bounded candidate buffer applies best-fit into logical 4k bins. Bins do not
  need to be full. The model receives only actual flattened tokens; positions restart
  per segment and causal attention cannot cross any segment boundary.
- `corrected` uses FlashAttention varlen; historical CUDA recipes use compiled PyTorch
  FlexAttention with a document BlockMask. CPU tests use
  independent SDPA per segment. Embedding, projections, MLP, and loss contain no padding rows.
  Internal kernel tile alignment is distinct from padding model input.
- Variable microbatches accumulate loss sums divided by the joint real-target count.
  Validation always recreates a deterministic sampler. Dataset/config fingerprints prevent mismatched resume.
- Checkpoints include model, AdamW, RNG, order/cursor/pending packing buffer, tokens,
  step, and target-loss observation. The initial recipe has constant LR (no scheduler state).
  Local resume requires the same config and a trusted checkpoint.

## Existing environment / tests

Python 3.11+ is recommended for the worker/data environment.
The standard-library-only RunPod controller still works with Python 3.9+.
Install PyTorch 2.8.0 for your hardware, then:

```sh
python3 -m pip install -r requirements-worker.txt
python3 -m training_lab prepare --config smoke
python3 -m training_lab inspect-data data-cache/DATA_ID --config smoke --output data-stats.json
python3 -m training_lab local --config smoke --wandb
python3 -m training_lab local --config smoke --wandb --resume .runs/local/checkpoint.pt
python3 -m unittest discover -s tests -v
```

CPU tests need PyTorch 2.8.0 and NumPy; preparation tests mock network services.
Optional `pip install -e ../runner -e .` installs `experiment-runner` and `training-lab` without GPU dependencies.
Source-checkout commands locate the sibling `labs/runner` automatically; standalone training package installations need the shared package installed.
Do not commit or publish checkpoints/data/traces automatically. Select public report assets separately.
Each published experiment should identify the code commit, source SHA256, image digest,
recipe, data manifest, tokenizer revision, and seed. Future chapters add one feature at a time;
MoE/mHC/KDA, offload, and multi-GPU execution are not yet implemented.

References: [RunPod API](https://docs.runpod.io/api-reference/pods/POST/pods),
[FineWeb](https://huggingface.co/datasets/HuggingFaceFW/fineweb),
[PyTorch 2.8 FlexAttention](https://docs.pytorch.org/docs/2.8/nn.attention.flex_attention.html),
[nanoGPT FLOPs convention](https://github.com/karpathy/nanoGPT/blob/master/model.py),
[H100 specifications](https://www.nvidia.com/en-us/data-center/h100/).
