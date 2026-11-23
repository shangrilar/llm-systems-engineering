# Chapter 1: one training step

Related article: [One training step: from forward to a weight update](https://ai-systems-engineering.com/en/posts/training-01-forward-backward/). The article is under Draft PR review; this is its publication URL. [한국어 안내](README.ko.md).

`train.py` independently demonstrates forward → loss → backward → AdamW update. It does not invoke the shared RunPod runner or FineWeb pretraining baseline. This small CPU correctness exercise requires no RunPod or W&B keys. `--device cuda` runs the same code on a GPU; GPU throughput and memory have not been measured in this chapter.

Install and run in a separate environment from the repository root:

```sh
python3 -m venv .venv-chapter-01
. .venv-chapter-01/bin/activate
python -m pip install -r labs/training/chapters/01-forward-backward/requirements.txt
python labs/training/chapters/01-forward-backward/train.py --device cpu
```

The public SmolLM2-135M model and tokenizer share a pinned revision. The first run downloads the model. The default output is `results/chapter-01.json`; use `--output /absolute/path/result.json` to change it. `--toy-only` checks figure 5's float64 linear-layer calculation without downloading a model.

Observations:

- Generation: select one token from the last position of `I like`.
- Training: input `I like AI` plus EOS; record each position's top five probabilities, remaining mass, and target probability.
- Loss: compare CE with one manual shift against Hugging Face's internal loss.
- Backward: compare explicit wgrad/xgrad for the first MLP down projection with autograd, respecting stored-weight orientation.
- Update: record unchanged weights after backward, their changes after a fresh AdamW step, and m/v.

`hf-result.json` records the directly measured CPU FP32 step used in the article. It is not a model-quality evaluation or validation loss. It includes the environment and inputs; the code checks tolerances. Do not compare the four-token toy figures with this real model's numbers to claim a quality difference.
