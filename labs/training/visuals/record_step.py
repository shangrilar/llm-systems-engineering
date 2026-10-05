"""Record one deterministic CPU step for chapter-1 educational figures.

This four-token toy model is NOT a pretrained LLM or a performance experiment.
Run with torch==2.8.0. The JSON is consumed unchanged by SVG and animation scenes.
"""
import json
from pathlib import Path
import torch
import torch.nn.functional as F

torch.set_num_threads(1)
torch.manual_seed(7)
dtype = torch.float64
vocab = ["I", "like", "AI", "<eos>"]
ids = torch.tensor([0, 1, 2, 3])
embedding = torch.nn.Parameter(torch.tensor([[1., .2], [.1, 1.], [.7, .8], [.2, -.5]], dtype=dtype))
projection = torch.nn.Parameter(torch.tensor([[.9, -.3], [.2, .8]], dtype=dtype))
weight = torch.nn.Parameter(torch.tensor([[-.6, 1.2, .5, -.2], [.1, -.4, 1.1, .8]], dtype=dtype))
optimizer = torch.optim.AdamW([embedding, projection, weight], lr=.01, weight_decay=.01)
optimizer.zero_grad(set_to_none=True)
before = weight.detach().clone()
activation = torch.tanh(embedding[ids] @ projection)
activation.retain_grad()
logits = activation @ weight
logits.retain_grad()
probabilities = logits.softmax(-1)
token_losses = F.cross_entropy(logits[:-1], ids[1:], reduction="none")
loss = token_losses.mean()
loss.backward()
after_backward = weight.detach().clone()
explicit_dw = activation.detach().T @ logits.grad
explicit_dx = logits.grad @ weight.detach().T
dw_error = (explicit_dw - weight.grad).abs().max().item()
dx_error = (explicit_dx - activation.grad).abs().max().item()
assert dw_error < 1e-12 and dx_error < 1e-12
assert torch.equal(before, after_backward)
gradient = weight.grad.detach().clone()
optimizer.step()
after_update = weight.detach().clone()
assert not torch.equal(before, after_update)

# A local 1x2 -> 1x2 linear layer with exact small numbers, separate from the toy LM.
x = torch.tensor([[1., 2.]], dtype=dtype, requires_grad=True)
w = torch.tensor([[1., -1.], [.5, 2.]], dtype=dtype, requires_grad=True)
dy = torch.tensor([[.1, -.2]], dtype=dtype)
y = x @ w
y.backward(dy)
assert torch.allclose(w.grad, x.detach().T @ dy)
assert torch.allclose(x.grad, dy @ w.detach().T)
# A real two-linear-layer chain for the global backward diagram.
chain_x = x.detach().clone().requires_grad_()
chain_w1 = w.detach().clone().requires_grad_()
chain_w2 = w.detach().clone().requires_grad_()
chain_h = chain_x @ chain_w1
chain_h.retain_grad()
chain_y = chain_h @ chain_w2
chain_y.backward(dy)
assert torch.allclose(chain_w2.grad, chain_h.detach().T @ dy)
assert torch.allclose(chain_w1.grad, chain_x.detach().T @ chain_h.grad)
state = optimizer.state[weight]
record = {
    "provenance": "deterministic educational CPU toy; not a pretrained LLM or GPU benchmark",
    "torch_version": torch.__version__, "dtype": "float64", "seed": 7,
    "vocabulary": vocab, "input_ids": ids.tolist(), "target_ids": ids[1:].tolist(),
    "probabilities": probabilities.detach().tolist(),
    "target_probabilities": probabilities[:-1].detach()[torch.arange(3), ids[1:]].tolist(),
    "token_losses": token_losses.detach().tolist(), "loss": loss.item(),
    "weight_before": before.tolist(), "weight_after": after_update.tolist(),
    "optimizer_state": {"m": state["exp_avg"].tolist(), "v": state["exp_avg_sq"].tolist()},
    "chain_example": {"X0": chain_x.detach().tolist(), "W1": chain_w1.detach().tolist(),
        "X1": chain_h.detach().tolist(), "W2": chain_w2.detach().tolist(), "Y": chain_y.detach().tolist(),
        "dY2": dy.tolist(), "dX2": chain_h.grad.tolist(), "dW2": chain_w2.grad.tolist(),
        "dX1": chain_x.grad.tolist(), "dW1": chain_w1.grad.tolist()},
    "activation": activation.detach().tolist(), "dY": logits.grad.tolist(),
    "dW": gradient.tolist(), "dX": activation.grad.tolist(),
    "gradient_checks": {"wgrad_max_error": dw_error, "xgrad_max_error": dx_error},
    "optimizer": {"name": "AdamW", "lr": .01, "weight_decay": .01, "betas": [.9, .999], "eps": 1e-8},
    "tracked_parameter": {"name": "head.W[0,1]", "before": before[0,1].item(),
        "after_backward": after_backward[0,1].item(), "gradient": gradient[0,1].item(),
        "after_update": after_update[0,1].item(), "delta": (after_update-before)[0,1].item()},
    "linear_example": {"X": x.detach().tolist(), "W": w.detach().tolist(),
        "Y": y.detach().tolist(), "dY": dy.tolist(), "dW": w.grad.tolist(), "dX": x.grad.tolist()},
}
out = Path(__file__).resolve().parents[3] / "src/data/figures/training-01-forward-backward/step-record.json"
out.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({"output": str(out), "loss": record["loss"], "checks": record["gradient_checks"],
    "parameter": record["tracked_parameter"]}, indent=2))
