# LLM Systems Engineering

**English** | [한국어](README.ko.md)

An illustrated guide to LLM systems engineering: model internals, GPU execution, and performance, explained step by step.

Start with the available articles on model and GPU fundamentals. The learning roadmap continues into inference, training (pretraining and SFT), and RL-based post-training.

[Read in English](https://llm-systems-engineering.pages.dev/en/) · [한국어로 읽기](https://llm-systems-engineering.pages.dev/)

Available in English and Korean. Browse the articles and diagrams below.

## Start here

- [The Structure of an LLM: From the Embedding Layer to the LM Head](https://llm-systems-engineering.pages.dev/en/posts/embedding-to-lm-head/)
- [GPU Architecture: Compute Units and Memory](https://llm-systems-engineering.pages.dev/en/posts/gpu-architecture/)
- [Starting GPU Optimization: Arithmetic Intensity and Data Movement](https://llm-systems-engineering.pages.dev/en/posts/gpu-arithmetic-intensity-and-fusion/)

## All articles

### Shared Concepts

- [LLM Systems Engineering: Connecting Models, Hardware, and Workloads](https://llm-systems-engineering.pages.dev/en/posts/llm-systems-engineering-introduction/)

#### Models

- [The Structure of an LLM: From the Embedding Layer to the LM Head](https://llm-systems-engineering.pages.dev/en/posts/embedding-to-lm-head/)
- [The Flow Through a Decoder Block: Residual Connections and RMSNorm](https://llm-systems-engineering.pages.dev/en/posts/residual-and-rmsnorm/)
- [Attention and MLP: Information Across Tokens and Transformations Within a Token](https://llm-systems-engineering.pages.dev/en/posts/attention-and-mlp/)
- [Attention Projections: Q, K, V and Multiple Heads](https://llm-systems-engineering.pages.dev/en/posts/attention-projections/)
- [Core Attention: Combining Information Across Tokens](https://llm-systems-engineering.pages.dev/en/posts/core-attention/)
- [RoPE: Incorporating Token Positions into Attention](https://llm-systems-engineering.pages.dev/en/posts/rope/)
- [MoE: Choosing Which MLPs to Use for Each Token](https://llm-systems-engineering.pages.dev/en/posts/moe/)
- [Revisiting the Flow Through the Model](https://llm-systems-engineering.pages.dev/en/posts/model-summary/)

#### Hardware

- [CPU and GPU: Two Devices That Execute Model Computation](https://llm-systems-engineering.pages.dev/en/posts/cpu-and-gpu/)
- [GPU Architecture: Compute Units and Memory](https://llm-systems-engineering.pages.dev/en/posts/gpu-architecture/)
- [Parallelism in Model Operations: Element-wise Operations, Reductions, and Matrix Multiplication](https://llm-systems-engineering.pages.dev/en/posts/model-operation-parallelism/)
- [Parallel Execution on GPUs: From Threads to Warp Scheduling](https://llm-systems-engineering.pages.dev/en/posts/gpu-execution-and-warp-scheduling/)
- [How the CPU and GPU Execute Work Together](https://llm-systems-engineering.pages.dev/en/posts/cpu-gpu-work-execution/)
- [Starting GPU Optimization: Arithmetic Intensity and Data Movement](https://llm-systems-engineering.pages.dev/en/posts/gpu-arithmetic-intensity-and-fusion/)
- [Optimizing Matrix Multiplication: Input Reuse and Tiling](https://llm-systems-engineering.pages.dev/en/posts/matmul-tiling-and-data-reuse/)
- [Why Attention Is Difficult to Optimize](https://llm-systems-engineering.pages.dev/en/posts/attention-memory-and-softmax/)
- [Processing Scores in Chunks with Online Softmax](https://llm-systems-engineering.pages.dev/en/posts/online-softmax/)
- [Reducing Memory Traffic with Output Accumulation in FlashAttention](https://llm-systems-engineering.pages.dev/en/posts/flash-attention/)
- [From Operation Optimization to Whole-Model Performance](https://llm-systems-engineering.pages.dev/en/posts/model-performance-and-bottlenecks/)
- [Scaling Across Multiple GPUs](https://llm-systems-engineering.pages.dev/en/posts/multi-gpu-execution/)
- [Transferring Data Between GPUs](https://llm-systems-engineering.pages.dev/en/posts/gpu-communication-basics/)
- [SMs and Copy Engines in GPU Communication](https://llm-systems-engineering.pages.dev/en/posts/gpu-communication-engines/)
- [GPU Communication Across Servers and the CPU's Role](https://llm-systems-engineering.pages.dev/en/posts/gpu-network-data-path/)
- [The Basic Operations of Collective Communication](https://llm-systems-engineering.pages.dev/en/posts/collective-communication-basics/)
- [Collective Communication: Combinations and Extensions](https://llm-systems-engineering.pages.dev/en/posts/collective-communication-combinations/)
- [How Collectives Move Data: Ring and Tree](https://llm-systems-engineering.pages.dev/en/posts/collective-ring-tree/)
- [DP: Replicate the Model, Partition the Inputs](https://llm-systems-engineering.pages.dev/en/posts/data-parallelism/)
- [TP: Split One Operation Across GPUs](https://llm-systems-engineering.pages.dev/en/posts/tensor-parallelism/)
- [SP: Partition Activations Alongside TP](https://llm-systems-engineering.pages.dev/en/posts/sequence-parallelism/)
- [CP: Split Long Contexts Across GPUs](https://llm-systems-engineering.pages.dev/en/posts/context-parallelism/)
