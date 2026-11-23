import unittest

import torch

from training_lab.data import Segment
from training_lab.model import Decoder, PackedBatch, document_mask


class ModelTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        torch.set_num_threads(1)

    def model(self):
        torch.manual_seed(7)
        return Decoder(32, dim=16, heads=2, layers=2, max_seq_len=8, backend="sdpa_documents")

    def test_packing_preserves_isolation_positions_outputs_and_gradients(self):
        model = self.model()
        segments = [Segment("a", 0, [1, 2, 3], [2, 3, 4]), Segment("b", 0, [9, 10], [10, 11])]
        packed = PackedBatch.from_segments(segments, [5], "cpu")
        self.assertEqual(packed.positions.tolist(), [0, 1, 2, 0, 1])
        self.assertEqual(packed.cu_seqlens.dtype, torch.int32)
        self.assertEqual(packed.cu_seqlens.tolist(), [0, 3, 5])
        self.assertEqual(packed.max_seqlen, 3)
        together = model(packed)
        separate = [model(PackedBatch.from_segments([s], [len(s.inputs)], "cpu")) for s in segments]
        torch.testing.assert_close(together, torch.cat(separate))
        model.loss_sum(packed).backward()
        packed_grads = [p.grad.clone() for p in model.parameters()]
        model.zero_grad()
        for segment in segments:
            model.loss_sum(PackedBatch.from_segments([segment], [len(segment.inputs)], "cpu")).backward()
        for expected, parameter in zip(packed_grads, model.parameters()):
            torch.testing.assert_close(expected, parameter.grad, atol=2e-6, rtol=2e-5)
        changed = PackedBatch.from_segments([Segment("a", 0, [20, 21, 22], [21, 22, 23]), segments[1]], [5], "cpu")
        torch.testing.assert_close(model(changed)[3:], together[3:])

    def test_flex_mask_matches_independent_causal_segments_including_partial_block(self):
        from torch.nn.attention.flex_attention import create_mask
        ids = torch.tensor([0, 0, 0, 1, 1])
        mask = create_mask(document_mask(ids), 1, 1, 5, 5, device="cpu")[0, 0]
        expected = (ids[:, None] == ids[None, :]) & torch.ones(5, 5, dtype=torch.bool).tril()
        self.assertTrue(torch.equal(mask, expected))
        self.assertFalse(document_mask(ids)(None, None, torch.tensor(8), torch.tensor(0)).item())

    def test_variable_microbatches_use_joint_token_denominator(self):
        model = self.model()
        segments = [Segment("a", 0, [1, 2, 3], [2, 3, 4]), Segment("b", 0, [9], [10])]
        optimizer = torch.optim.AdamW(model.parameters(), lr=0.001)
        for segment in segments:
            (model.loss_sum(PackedBatch.from_segments([segment], [], "cpu")) / 4).backward()
        grads = [p.grad.clone() for p in model.parameters()]
        model.zero_grad()
        (model.loss_sum(PackedBatch.from_segments(segments, [], "cpu")) / 4).backward()
        for expected, p in zip(grads, model.parameters()):
            torch.testing.assert_close(expected, p.grad, atol=2e-6, rtol=2e-5)
        before = model.embedding.weight.detach().clone()
        optimizer.step()
        self.assertFalse(torch.equal(before, model.embedding.weight))
        self.assertTrue(all("exp_avg" in state and "exp_avg_sq" in state for state in optimizer.state.values()))

    def test_reference_loss_removes_repeated_full_hidden_slice_gradients(self):
        from training_lab.loss import linear_ce
        torch.manual_seed(11)
        hidden = torch.randn(25, 8, requires_grad=True)
        weight = torch.randn(32, 8, requires_grad=True)
        labels = torch.randint(32, (25,))
        expected = torch.nn.functional.cross_entropy(hidden @ weight.T, labels, reduction="sum")
        gradients = torch.autograd.grad(expected, (hidden, weight))
        with torch.profiler.profile(activities=[torch.profiler.ProfilerActivity.CPU]) as profile:
            loss = linear_ce(hidden, weight, labels, "reference", chunk_tokens=4)
            actual = torch.autograd.grad(loss, (hidden, weight))
        torch.testing.assert_close(loss, expected)
        for a,b in zip(actual, gradients):
            torch.testing.assert_close(a,b,atol=1e-5,rtol=1e-5)
        names = [e.name for e in profile.events()]
        self.assertNotIn("aten::slice_backward", names)
        self.assertIn("SplitBackward0", names)


if __name__ == "__main__":
    unittest.main()
