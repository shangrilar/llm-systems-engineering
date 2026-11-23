import contextlib
import copy
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import numpy as np
import torch

from training_lab.config import load_config, write_json
from training_lab.engine import train


class EngineTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        torch.set_num_threads(1)

    def dataset(self, root):
        root.mkdir()
        for split in ("train", "validation"):
            offset, documents = 0, []
            with (root / (split + ".bin")).open("wb") as binary:
                for i, length in enumerate([9, 5, 4, 8]):
                    tokens = [1 + (i + k) % 29 for k in range(length - 1)] + [31]
                    np.asarray(tokens, dtype="<u4").tofile(binary)
                    documents.append({"id": split + str(i), "offset": offset, "length": length})
                    offset += length
            (root / (split + ".jsonl")).write_text("\n".join(json.dumps(d) for d in documents))
        write_json(root / "manifest.json", {"vocab_size": 32, "test_data": True})

    def config(self):
        config = copy.deepcopy(load_config("smoke"))
        config["model"] = {"dim": 16, "heads": 2, "layers": 2}
        config["data"]["max_seq_len"] = 8
        config["train"].update(attention="sdpa_documents", microbatch_tokens=8,
                               steps=3, packing_buffer=4, checkpoint_every=1, eval_every=1, eval_batches=1)
        return config

    def test_interrupted_resume_matches_uninterrupted_parameters_optimizer_and_data(self):
        with tempfile.TemporaryDirectory() as temporary, contextlib.redirect_stdout(io.StringIO()):
            root = Path(temporary)
            dataset = root / "data"
            self.dataset(dataset)
            config = self.config()
            train(config, dataset, root / "full", device="cpu", use_wandb=False)
            original_step = torch.optim.AdamW.step
            calls = 0
            def interrupted_step(optimizer, *args, **kwargs):
                nonlocal calls
                calls += 1
                if calls == 2:
                    raise RuntimeError("simulated interruption")
                return original_step(optimizer, *args, **kwargs)
            with patch.object(torch.optim.AdamW, "step", interrupted_step):
                with self.assertRaisesRegex(RuntimeError, "simulated interruption"):
                    train(config, dataset, root / "partial", device="cpu", use_wandb=False)
            with (root / "partial" / "metrics.jsonl").open("a") as stale:
                stale.write(json.dumps({"step": 2, "stale_after_checkpoint": True}) + "\n")
            train(config, dataset, root / "partial", resume=root / "partial" / "checkpoint.pt", device="cpu", use_wandb=False)
            full = torch.load(root / "full" / "checkpoint.pt", weights_only=False)
            resumed = torch.load(root / "partial" / "checkpoint.pt", weights_only=False)
            for key, value in full["model"].items():
                torch.testing.assert_close(value, resumed["model"][key], atol=0, rtol=0)
            self.assertEqual(full["sampler"], resumed["sampler"])
            self.assertEqual(full["tokens"], resumed["tokens"])
            for key, state in full["optimizer"]["state"].items():
                for name, value in state.items():
                    torch.testing.assert_close(value, resumed["optimizer"]["state"][key][name], atol=0, rtol=0)
            self.assertTrue((root / "partial" / "report.html").exists())
            records = [json.loads(line) for line in (root / "partial" / "metrics.jsonl").read_text().splitlines()]
            self.assertEqual([row["step"] for row in records], [1, 2, 3])

    def test_cpu_profile_produces_real_trace_separately(self):
        with tempfile.TemporaryDirectory() as temporary, contextlib.redirect_stdout(io.StringIO()):
            root = Path(temporary)
            self.dataset(root / "data")
            config = self.config()
            config["mode"] = "profile"
            config["train"]["steps"] = 1
            summary = train(config, root / "data", root / "profile", device="cpu", use_wandb=False)
            self.assertTrue(summary["profiled"])
            trace = json.loads((root / "profile" / "timeline.json").read_text())
            self.assertTrue(any(event.get("name") == "backward" for event in trace["traceEvents"]))

    def test_selected_profile_steps_are_excluded_from_throughput_summary(self):
        with tempfile.TemporaryDirectory() as temporary, contextlib.redirect_stdout(io.StringIO()):
            root = Path(temporary)
            self.dataset(root / "data")
            config = self.config()
            config["train"].update(warmup_steps=0, initial_eval=True)
            config["observation"] = {"profile_steps": [2]}
            summary = train(config, root / "data", root / "run", device="cpu", use_wandb=False)
            records = [json.loads(line) for line in (root / "run" / "metrics.jsonl").read_text().splitlines()]
            self.assertEqual([r["step"] for r in records if r["profiled"]], [2])
            measured = summary["performance"]
            self.assertEqual(measured["measured_steps"], [1, 3])
            self.assertEqual(measured["measured_tokens"], records[0]["step_tokens"] + records[2]["step_tokens"])
            self.assertAlmostEqual(measured["tokens_per_second_per_gpu"], measured["measured_tokens"] / measured["measured_seconds"])
            self.assertIsNotNone(summary["initial_validation_loss"])
            self.assertEqual(json.loads((root / "run" / "observations.json").read_text())["traces"][0]["first_step"], 2)

    def test_training_batch_change_keeps_fixed_validation_targets(self):
        with tempfile.TemporaryDirectory() as temporary, contextlib.redirect_stdout(io.StringIO()):
            root = Path(temporary)
            self.dataset(root / "data")
            config = self.config()
            config["train"].update(initial_eval=True, eval_microbatch_tokens=8)
            train(config, root / "data", root / "small", device="cpu", use_wandb=False)
            config["train"]["microbatch_tokens"] = 16
            train(config, root / "data", root / "large", device="cpu", use_wandb=False)
            small = json.loads((root / "small" / "initial-validation.json").read_text())
            large = json.loads((root / "large" / "initial-validation.json").read_text())
            self.assertEqual(small, large)

    def test_explicit_batch_size_logs_pack_count_with_fixed_validation(self):
        with tempfile.TemporaryDirectory() as temporary, contextlib.redirect_stdout(io.StringIO()):
            root=Path(temporary);self.dataset(root/"data");config=self.config()
            config["train"].pop("microbatch_tokens")
            config["train"].update(batch_size=3, eval_microbatch_tokens=8, initial_eval=True, loss_backend="reference")
            train(config,root/"data",root/"run",device="cpu",use_wandb=False)
            records=[json.loads(s) for s in (root/"run"/"metrics.jsonl").read_text().splitlines()]
            self.assertTrue(all(all(n==3 for n in r["microbatch_pack_counts"]) for r in records))


if __name__ == "__main__":
    unittest.main()
