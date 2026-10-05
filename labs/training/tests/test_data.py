import json
import tempfile
import types
import unittest
from pathlib import Path
from unittest.mock import patch

from training_lab.data import BestFitSampler, Segment, TokenStore, document_split, prepare, split_tokens


class ListStore(list):
    def length(self, index):
        return len(self[index].inputs)


class DataTests(unittest.TestCase):
    def test_long_document_preserves_every_pair_without_extra_eos(self):
        tokens = list(range(9000)) + [9999]
        chunks = list(split_tokens("doc", tokens, 4096))
        self.assertEqual([len(c.inputs) for c in chunks], [4096, 4096, 808])
        self.assertEqual([x for c in chunks for x in c.inputs], tokens[:-1])
        self.assertEqual([x for c in chunks for x in c.targets], tokens[1:])
        self.assertEqual(chunks[0].targets[-1], chunks[1].inputs[0])
        self.assertNotIn(9999, [x for c in chunks for x in c.inputs])

    def test_short_documents_are_not_cut_to_fill_bins(self):
        store = ListStore([Segment(str(i), 0, [i] * n, [i] * n) for i, n in enumerate([6, 4, 3, 2])])
        sampler = BestFitSampler(store, 8, 8, 4, 42, shuffle=False)
        segments, bins = sampler.next_batch()
        self.assertEqual(bins, [8])
        self.assertEqual([len(s.inputs) for s in segments], [6, 2])

    def test_sampler_resume_preserves_reordering_and_candidate_buffer(self):
        store = ListStore([Segment(str(i), 0, [i] * n, [i] * n) for i, n in enumerate([6, 4, 3, 2, 5])])
        first = BestFitSampler(store, 8, 16, 3, 42)
        first.next_batch()
        restored = BestFitSampler(store, 8, 16, 3, 123)
        restored.load_state_dict(first.state_dict())
        for _ in range(10):
            self.assertEqual(first.next_batch(), restored.next_batch())

    def test_explicit_pack_count_does_not_add_a_tail_pack_to_fill_token_budget(self):
        store = ListStore([Segment(str(i), 0, [i] * 5, [i] * 5) for i in range(12)])
        sampler = BestFitSampler(store, 8, None, 12, 42, shuffle=False, batch_size=3)
        segments, bins = sampler.next_batch()
        self.assertEqual(bins, [5, 5, 5])
        self.assertEqual(len(segments), 3)
        self.assertEqual(sum(bins), 15)  # not an implicit fourth pack toward 24 tokens
        restored = BestFitSampler(store, 8, None, 12, 999, batch_size=3)
        restored.load_state_dict(sampler.state_dict())
        self.assertEqual(sampler.next_batch(), restored.next_batch())

    def test_pack_count_and_token_budget_are_mutually_exclusive(self):
        with self.assertRaisesRegex(ValueError, "not both"):
            BestFitSampler([], 8, 16, 4, 42, batch_size=2)

    def test_prepare_stable_original_document_split_and_cache(self):
        class Tokenizer:
            eos_token_id = 31
            def __len__(self):
                return 32
            def encode(self, text, **kwargs):
                return [int(text) % 30] * 8

        fake_transformers = types.SimpleNamespace(AutoTokenizer=types.SimpleNamespace(from_pretrained=lambda *a, **kw: Tokenizer()))
        config = {"dataset": "fake", "subset": "fake", "dataset_revision": "fixed", "tokenizer": "fake",
                  "tokenizer_revision": "fixed", "split_seed": 1, "validation_fraction": 0.4,
                  "train_tokens": 40, "validation_tokens": 20, "max_documents": 100, "max_seq_len": 4}
        with tempfile.TemporaryDirectory() as directory, patch.dict("sys.modules", {"transformers": fake_transformers}), \
                patch("training_lab.data.fineweb_rows", side_effect=lambda config: iter({"text": str(i)} for i in range(100))):
            path = prepare(config, directory)
            self.assertEqual(path, prepare(config, directory))
            train = TokenStore(path, "train", 4)
            validation = TokenStore(path, "validation", 4)
            self.assertTrue({x["id"] for x in train.documents}.isdisjoint(x["id"] for x in validation.documents))
            for split, store in [("train", train), ("validation", validation)]:
                for document in store.documents:
                    self.assertEqual(document_split(document["id"], 1, 0.4), split)
                self.assertTrue(all(store.length(i) <= 4 for i in range(len(store))))
            with (path / "train.bin").open("ab") as corrupted:
                corrupted.write(b"bad")
            with self.assertRaisesRegex(ValueError, "Corrupt"):
                prepare(config, directory)


if __name__ == "__main__":
    unittest.main()
