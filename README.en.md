# LLM Systems Engineering

[한국어](README.md) | **English**

Learning materials for understanding LLM execution systems through three perspectives: models, hardware, and workloads.

The series covers principles, execution, performance measurement, and optimization in this order: shared concepts → inference → training (pretraining and SFT) → RL-based post-training.

Read articles and figures on the [website](https://llm-systems-engineering.pages.dev/en/). Related example code belongs in this repository. Articles are written in Korean with English translations.

## Articles

- [LLM Systems Engineering: Connecting Models, Hardware, and Workloads](https://llm-systems-engineering.pages.dev/en/posts/llm-systems-engineering-introduction/)

### Shared Concepts

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
- [Starting GPU Optimization: Arithmetic Intensity and Data Movement](https://llm-systems-engineering.pages.dev/en/posts/gpu-arithmetic-intensity-and-fusion/)
- [Optimizing Matrix Multiplication: Input Reuse and Tiling](https://llm-systems-engineering.pages.dev/en/posts/matmul-tiling-and-data-reuse/)
