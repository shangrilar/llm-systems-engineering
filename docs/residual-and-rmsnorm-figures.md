# Residual connections and RMSNorm: figure notes

Four original diagrams accompany the Korean article and its English translation. Each locale includes editable SVGs and 2,400-pixel-wide PNGs in `public/images/residual-and-rmsnorm/`. The English assets are in its `en/` subdirectory. Both locales use identical geometry and numerical examples.

1. **Two decoder layouts:** the same sequence of computations, with Attention/MLP in the center on the left and the residual stream in the center on the right. Each branch takes the current input before normalization; its result is added to that input. T × d is preserved.
2. **Residual addition:** `[1, 2, −1, 0] + [0.2, −0.5, 0.3, 0.1] = [1.2, 1.5, −0.7, 0.1]`. This zooms in on one token's addition; it does not imply token-independent Attention.
3. **RMSNorm:** `[1, −1, 3, 3]` has mean square 5 and RMS √5. With all four γ weights set to 1 and ε omitted, the rounded output is `[0.45, −0.45, 1.34, 1.34]`. Both charts use the same scale and unrounded values. The full formula includes ε and learned per-component γ. An RMS is calculated separately for each token, while a given layer shares γ across token positions.
4. **Final normalization:** extends the previous article's compact/expanded model view with RMSNorm after the last decoder block and before the LM Head. RMSNorm preserves T × d; the head maps it to T × V.

All numbers and d = 4 are teaching examples, not model weights, measured activations, or performance results. The figures illustrate a decoder whose normalization precedes each transformation. Attention internals, including any Q/K normalization, are outside this article's scope; the series has not selected a single reference model for every subsequent topic.

## Sources checked

- [PyTorch RMSNorm documentation](https://docs.pytorch.org/docs/2.14/generated/torch.nn.RMSNorm.html): RMS calculation, ε, learned per-element weights, and preserved input/output shape.
- [Transformers v4.51.3 Qwen3 decoder](https://github.com/huggingface/transformers/blob/v4.51.3/src/transformers/models/qwen3/modeling_qwen3.py#L235-L281): residual inputs retained before each normalization, followed by Attention or MLP and addition.
- [Qwen3 model and final normalization](https://github.com/huggingface/transformers/blob/v4.51.3/src/transformers/models/qwen3/modeling_qwen3.py#L424-L549): RMSNorm after the stack of decoder layers. This is a concrete implementation supporting the illustrated sequence, not a claim that every LLM uses it.
