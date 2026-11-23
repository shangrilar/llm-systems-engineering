"""Chapter 1: observe forward, loss, backward and one AdamW update.

This is a short CPU/GPU correctness exercise, not a throughput benchmark.
The training step stays here so readers can follow its complete order.
"""
import argparse
import json
import platform
from pathlib import Path

import torch
import torch.nn.functional as F

MODEL = "HuggingFaceTB/SmolLM2-135M"
REVISION = "93efa2f097d58c2a74874c7e644dbc9b0cee75a2"


def linear_example():
    x = torch.tensor([[1., 2.]], dtype=torch.float64, requires_grad=True)
    w = torch.tensor([[1., -1.], [.5, 2.]], dtype=torch.float64, requires_grad=True)
    dy = torch.tensor([[.1, -.2]], dtype=torch.float64)
    y = x @ w
    y.backward(dy)
    dw = x.detach().T @ dy
    dx = dy @ w.detach().T
    torch.testing.assert_close(w.grad, dw)
    torch.testing.assert_close(x.grad, dx)
    return {"X": x.tolist(), "W": w.tolist(), "Y": y.tolist(), "dY": dy.tolist(),
            "dW": dw.tolist(), "dX": dx.tolist(),
            "wgrad_max_error": (w.grad - dw).abs().max().item(),
            "xgrad_max_error": (x.grad - dx).abs().max().item()}


def run(args):
    from transformers import AutoModelForCausalLM, AutoTokenizer, __version__

    torch.manual_seed(7)
    torch.set_num_threads(args.threads)
    tokenizer = AutoTokenizer.from_pretrained(MODEL, revision=REVISION, token=False)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL, revision=REVISION, token=False, use_safetensors=True,
        dtype=torch.float32, attn_implementation="eager",
    ).to(args.device)

    # Generation uses only the distribution at the last input position.
    model.eval()
    prompt = tokenizer("I like", return_tensors="pt", add_special_tokens=False).to(args.device)
    with torch.no_grad():
        last_logits = model(**prompt, use_cache=False).logits[:, -1]
        next_id = last_logits.argmax(-1, keepdim=True)
    generation = {"prompt": "I like", "next_id": next_id.item(),
                  "next_token": tokenizer.decode(next_id[0]),
                  "text": tokenizer.decode(torch.cat([prompt.input_ids, next_id], dim=1)[0])}

    # One real document, no padding: EOS supplies the final training target.
    ids = tokenizer.encode(args.text, add_special_tokens=False) + [tokenizer.eos_token_id]
    if len(ids) < 2:
        raise ValueError("At least two token IDs are needed")
    input_ids = torch.tensor([ids], device=args.device)
    layer = model.model.layers[0].mlp.down_proj
    saved = {}

    def observe(module, inputs, output):
        # This down-projection input has one consumer; its grad is this layer's xgrad.
        inputs[0].retain_grad()
        output.retain_grad()
        saved.update(x=inputs[0], y=output)

    model.train()
    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4, weight_decay=.01, foreach=False)
    optimizer.zero_grad(set_to_none=True)
    weight_before = layer.weight.detach().clone()
    handle = layer.register_forward_hook(observe)
    try:
        # Forward: HF shifts labels internally; the manual CE below shifts once too.
        outputs = model(input_ids=input_ids, labels=input_ids, use_cache=False)
        logits = outputs.logits
        targets = input_ids[:, 1:]
        token_losses = F.cross_entropy(
            logits[:, :-1].reshape(-1, logits.shape[-1]), targets.reshape(-1), reduction="none",
        )
        loss = token_losses.mean()
        torch.testing.assert_close(loss, outputs.loss)
        probabilities = logits.detach().softmax(-1)
        rows = []
        for position in range(len(ids)):
            top_p, top_id = probabilities[0, position].topk(5)
            target = ids[position + 1] if position + 1 < len(ids) else None
            rows.append({"position": position, "input_id": ids[position],
                "input_token": tokenizer.convert_ids_to_tokens(ids[position]),
                "target_id": target,
                "target_token": tokenizer.convert_ids_to_tokens(target) if target is not None else None,
                "target_probability": probabilities[0, position, target].item() if target is not None else None,
                "token_loss": token_losses[position].item() if target is not None else None,
                "top5": [{"id": i, "token": tokenizer.convert_ids_to_tokens(i), "probability": p}
                         for i, p in zip(top_id.tolist(), top_p.tolist())],
                "other_probability": 1 - top_p.sum().item()})

        # Backward writes gradients. It does not write new parameter values.
        loss.backward()
        assert torch.equal(weight_before, layer.weight.detach())
        x = saved["x"].detach().reshape(-1, layer.in_features)
        dy = saved["y"].grad.detach().reshape(-1, layer.out_features)
        # nn.Linear stores A = W.T in [out_features, in_features] order.
        explicit_da = dy.T @ x
        explicit_dx = dy @ weight_before
        actual_dx = saved["x"].grad.reshape_as(explicit_dx)
        torch.testing.assert_close(layer.weight.grad, explicit_da, atol=1e-5, rtol=1e-4)
        torch.testing.assert_close(actual_dx, explicit_dx, atol=1e-5, rtol=1e-4)
        checks = {"hf_ce_difference": abs(loss.item() - outputs.loss.item()),
                  "wgrad_max_error": (layer.weight.grad - explicit_da).abs().max().item(),
                  "xgrad_max_error": (actual_dx - explicit_dx).abs().max().item(),
                  "weight_unchanged_after_backward": True}
        shapes = {"input_ids": list(input_ids.shape), "logits": list(logits.shape),
                  "X": list(saved["x"].shape), "stored_weight": list(layer.weight.shape),
                  "dY": list(saved["y"].grad.shape), "dA": list(layer.weight.grad.shape),
                  "dX": list(saved["x"].grad.shape)}
        # Select a nonzero gradient for a clear before/after comparison.
        flat = layer.weight.grad.abs().argmax().item()
        row, col = divmod(flat, layer.in_features)
        tracked = {"parameter": "model.layers.0.mlp.down_proj.weight", "index": [row, col],
                   "before": weight_before[row, col].item(),
                   "after_backward": layer.weight[row, col].item(),
                   "gradient": layer.weight.grad[row, col].item()}

        # Update: AdamW creates m/v states and changes the model's parameters.
        optimizer.step()
        tracked.update(after_update=layer.weight[row, col].item(),
                       delta=(layer.weight[row, col] - weight_before[row, col]).item(),
                       m=optimizer.state[layer.weight]["exp_avg"][row, col].item(),
                       v=optimizer.state[layer.weight]["exp_avg_sq"][row, col].item())
        assert tracked["after_update"] != tracked["before"]
    finally:
        handle.remove()

    return {"provenance": "one FP32 correctness step; not validation loss or a GPU benchmark",
            "environment": {"python": platform.python_version(), "torch": torch.__version__,
                            "transformers": __version__, "device": args.device, "threads": args.threads},
            "model": MODEL, "revision": REVISION,
            "parameters": sum(p.numel() for p in model.parameters()), "text": args.text,
            "generation": generation, "input_ids": ids, "positions": rows,
            "loss": loss.item(), "valid_targets": len(ids) - 1, "shapes": shapes,
            "checks": checks, "tracked_parameter": tracked,
            "optimizer": {"name": "AdamW", "lr": 1e-4, "weight_decay": .01},
            "linear_example": linear_example()}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--device", default="cpu", choices=["cpu", "cuda"])
    parser.add_argument("--threads", type=int, default=4)
    parser.add_argument("--text", default="I like AI")
    parser.add_argument("--output", type=Path, default=Path("results/chapter-01.json"))
    parser.add_argument("--toy-only", action="store_true")
    args = parser.parse_args()
    result = {"linear_example": linear_example()} if args.toy_only else run(args)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({k: result[k] for k in ["model", "revision", "loss", "checks", "tracked_parameter", "linear_example"] if k in result}, indent=2))
    print(f"Saved {args.output}")


if __name__ == "__main__":
    main()
