# AI Systems Engineering

**English** | [한국어](README.ko.md)

An illustrated guide to AI systems engineering: model internals, GPU execution, and performance, explained step by step.

Start with the available articles on model and GPU fundamentals. The learning roadmap continues into inference, training (pretraining and SFT), and RL-based post-training.

[Read in English](https://ai-systems-engineering.com/en/) · [한국어로 읽기](https://ai-systems-engineering.com/)

Available in English and Korean. Browse the articles and diagrams below.

## Start here

- [The Structure of an LLM: From the Embedding Layer to the LM Head](https://ai-systems-engineering.com/en/posts/embedding-to-lm-head/)
- [GPU Architecture: Compute Units and Memory](https://ai-systems-engineering.com/en/posts/gpu-architecture/)
- [Starting GPU Optimization: Arithmetic Intensity and Data Movement](https://ai-systems-engineering.com/en/posts/gpu-arithmetic-intensity-and-fusion/)

## RunPod referral link and experiment support

New users who sign up through [my RunPod referral link](https://runpod.io?ref=6jviazkz) and spend at least $10 on the platform can receive bonus credits. I can also earn referral credits, which help me continue the GPU experiments for this guide. See [RunPod’s official program](https://www.runpod.io/referral-and-affiliate-program) for rewards and eligibility conditions.

## All articles

### Shared Concepts

- [LLM Systems Engineering: Connecting Models, Hardware, and Workloads](https://ai-systems-engineering.com/en/posts/llm-systems-engineering-introduction/)

#### Models

- [The Structure of an LLM: From the Embedding Layer to the LM Head](https://ai-systems-engineering.com/en/posts/embedding-to-lm-head/)
- [The Flow Through a Decoder Block: Residual Connections and RMSNorm](https://ai-systems-engineering.com/en/posts/residual-and-rmsnorm/)
- [Attention and MLP: Information Across Tokens and Transformations Within a Token](https://ai-systems-engineering.com/en/posts/attention-and-mlp/)
- [Attention Projections: Q, K, V and Multiple Heads](https://ai-systems-engineering.com/en/posts/attention-projections/)
- [Core Attention: Combining Information Across Tokens](https://ai-systems-engineering.com/en/posts/core-attention/)
- [RoPE: Incorporating Token Positions into Attention](https://ai-systems-engineering.com/en/posts/rope/)
- [MoE: Choosing Which MLPs to Use for Each Token](https://ai-systems-engineering.com/en/posts/moe/)
- [Revisiting the Flow Through the Model](https://ai-systems-engineering.com/en/posts/model-summary/)
- [MQA and GQA: Sharing KV Across Queries](https://ai-systems-engineering.com/en/posts/model-advanced-mqa-gqa/)
- [MLA storage: Representing KV with a small latent vector](https://ai-systems-engineering.com/en/posts/model-advanced-mla-storage/)
- [MLA Computation: Attention Without Expanding KV](https://ai-systems-engineering.com/en/posts/model-advanced-mla-computation/)
- [Local and Sparse Attention: Reading Fewer Token Positions](https://ai-systems-engineering.com/en/posts/model-advanced-local-sparse/)
- [Sparse Attention Indexers: Choosing Positions by Content](https://ai-systems-engineering.com/en/posts/model-advanced-sparse-indexer/)
- [Token-Axis Compression: Reading Summaries of Multiple KV Positions](https://ai-systems-engineering.com/en/posts/model-advanced-token-compression/)
- [Linear Attention: Accumulating KV in a Fixed-Size State](https://ai-systems-engineering.com/en/posts/model-advanced-linear-attention/)
- [The Delta Rule: Revising State Associations Toward a New Value](https://ai-systems-engineering.com/en/posts/model-advanced-delta-rule/)
- [GDN and KDA: Retaining State and Applying Delta Corrections](https://ai-systems-engineering.com/en/posts/model-advanced-gdn-kda/)
- [SSMs: Carrying Context Through State and New Inputs](https://ai-systems-engineering.com/en/posts/model-advanced-ssm-basics/)
- [Mamba: Choosing What to Remember Based on the Input](https://ai-systems-engineering.com/en/posts/model-advanced-mamba-selective/)
- [Hybrid Models: Using State and Attention Together](https://ai-systems-engineering.com/en/posts/model-advanced-hybrid/)
- [HC and mHC: Widening and Connecting Residual Streams](https://ai-systems-engineering.com/en/posts/model-advanced-hc-mhc/)
- [Gated Residual: Reading Components and Writing to Originals](https://ai-systems-engineering.com/en/posts/model-advanced-gated-residual/)
- [Attention Residuals: Selecting Outputs from Earlier Layers](https://ai-systems-engineering.com/en/posts/model-advanced-attention-residuals/)
- [Cross-Layer KV Sharing: Reusing Keys and Values from Earlier Layers](https://ai-systems-engineering.com/en/posts/model-advanced-cross-layer-kv/)
- [YOCO: Separating Layers That Produce and Read Shared KV](https://ai-systems-engineering.com/en/posts/model-advanced-yoco/)
- [CED: Continuing Context with a Causal Encoder and Decoder](https://ai-systems-engineering.com/en/posts/model-advanced-ced/)

#### Hardware

- [CPU and GPU: Two Devices That Execute Model Computation](https://ai-systems-engineering.com/en/posts/cpu-and-gpu/)
- [GPU Architecture: Compute Units and Memory](https://ai-systems-engineering.com/en/posts/gpu-architecture/)
- [Parallelism in Model Operations: Element-wise Operations, Reductions, and Matrix Multiplication](https://ai-systems-engineering.com/en/posts/model-operation-parallelism/)
- [Parallel Execution on GPUs: From Threads to Warp Scheduling](https://ai-systems-engineering.com/en/posts/gpu-execution-and-warp-scheduling/)
- [How the CPU and GPU Execute Work Together](https://ai-systems-engineering.com/en/posts/cpu-gpu-work-execution/)
- [Starting GPU Optimization: Arithmetic Intensity and Data Movement](https://ai-systems-engineering.com/en/posts/gpu-arithmetic-intensity-and-fusion/)
- [Optimizing Matrix Multiplication: Input Reuse and Tiling](https://ai-systems-engineering.com/en/posts/matmul-tiling-and-data-reuse/)
- [Why Attention Is Difficult to Optimize](https://ai-systems-engineering.com/en/posts/attention-memory-and-softmax/)
- [Processing Scores in Chunks with Online Softmax](https://ai-systems-engineering.com/en/posts/online-softmax/)
- [Reducing Memory Traffic with Output Accumulation in FlashAttention](https://ai-systems-engineering.com/en/posts/flash-attention/)
- [From Operation Optimization to Whole-Model Performance](https://ai-systems-engineering.com/en/posts/model-performance-and-bottlenecks/)
- [Scaling Across Multiple GPUs](https://ai-systems-engineering.com/en/posts/multi-gpu-execution/)
- [Transferring Data Between GPUs](https://ai-systems-engineering.com/en/posts/gpu-communication-basics/)
- [SMs and Copy Engines in GPU Communication](https://ai-systems-engineering.com/en/posts/gpu-communication-engines/)
- [GPU Communication Across Servers and the CPU's Role](https://ai-systems-engineering.com/en/posts/gpu-network-data-path/)
- [The Basic Operations of Collective Communication](https://ai-systems-engineering.com/en/posts/collective-communication-basics/)
- [Collective Communication: Combinations and Extensions](https://ai-systems-engineering.com/en/posts/collective-communication-combinations/)
- [How Collectives Move Data: Ring and Tree](https://ai-systems-engineering.com/en/posts/collective-ring-tree/)
- [DP: Replicate the Model, Partition the Inputs](https://ai-systems-engineering.com/en/posts/data-parallelism/)
- [TP: Split One Operation Across GPUs](https://ai-systems-engineering.com/en/posts/tensor-parallelism/)
- [SP: Partition Activations Alongside TP](https://ai-systems-engineering.com/en/posts/sequence-parallelism/)
- [CP: Split Long Contexts Across GPUs](https://ai-systems-engineering.com/en/posts/context-parallelism/)
- [PP: Partition and Execute Model Layers](https://ai-systems-engineering.com/en/posts/pipeline-parallelism/)
- [EP: Partition Experts and Route Tokens](https://ai-systems-engineering.com/en/posts/expert-parallelism/)
- [How Should We Arrange Multiple GPUs?](https://ai-systems-engineering.com/en/posts/choosing-parallelism/)

#### Workloads

- [Same Model, Different Workloads: Inference and Training](https://ai-systems-engineering.com/en/posts/inference-and-training/)

### Inference

#### Workloads

- [Inference and the KV Cache](https://ai-systems-engineering.com/en/posts/inference-kv-cache/)
- [Prefill and Decode](https://ai-systems-engineering.com/en/posts/prefill-and-decode/)
- [Batching and Scheduling](https://ai-systems-engineering.com/en/posts/batching-and-scheduling/)
- [KV Cache Management and PagedAttention](https://ai-systems-engineering.com/en/posts/paged-kv-cache/)
- [When KV Capacity Runs Out: Pausing and Resuming Requests](https://ai-systems-engineering.com/en/posts/inference-preemption/)
- [Inference Metrics: Latency and Throughput](https://ai-systems-engineering.com/en/posts/inference-metrics/)

### Training

- [Training preparation 1: the repository and RunPod environment](https://ai-systems-engineering.com/en/posts/training-prep-01-repository-runpod/)
- [Training preparation 2: from FineWeb to training batches](https://ai-systems-engineering.com/en/posts/training-prep-02-data-preparation/)
- [One training step: from forward to a weight update](https://ai-systems-engineering.com/en/posts/training-01-forward-backward/)

### RL

- [How Token Generation Becomes an Action in Reinforcement Learning](https://ai-systems-engineering.com/en/posts/rl-token-actions/)
- [How Rewards Change Token Generation Probabilities](https://ai-systems-engineering.com/en/posts/rl-reward-to-update/)
- [Computing Advantages with Groups and Critics](https://ai-systems-engineering.com/en/posts/rl-critic-and-groups/)
- [Learning from a Teacher’s Probabilities: OPD](https://ai-systems-engineering.com/en/posts/rl-on-policy-distillation/)
- [Combining RL and OPD in a Training Strategy](https://ai-systems-engineering.com/en/posts/rl-training-strategy/)
- [How an LLM RL System Fits Together](https://ai-systems-engineering.com/en/posts/rl-system-architecture/)
- [Carrying Generation Records into Training: TITO and R3](https://ai-systems-engineering.com/en/posts/rl-token-context/)
- [Using Quantization in RL](https://ai-systems-engineering.com/en/posts/rl-quantized-training/)
- [Why Generation and Training Probabilities Differ](https://ai-systems-engineering.com/en/posts/rl-probability-mismatch/)
- [Asynchronous RL and Stale Data](https://ai-systems-engineering.com/en/posts/rl-async-staleness/)
- [Inference Optimization for RL Rollouts](https://ai-systems-engineering.com/en/posts/rl-rollout-inference/)
- [Scheduling the Whole Agent Program](https://ai-systems-engineering.com/en/posts/rl-program-scheduling/)
- [Delivering New Weights to the Inference Engine](https://ai-systems-engineering.com/en/posts/rl-weight-sync/)
- [LLM RL in Review: From Token Choices to the System Loop](https://ai-systems-engineering.com/en/posts/rl-summary/)
