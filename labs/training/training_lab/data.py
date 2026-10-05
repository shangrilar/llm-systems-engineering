from __future__ import annotations

import hashlib
import json
import random
import shutil
from dataclasses import dataclass
from pathlib import Path

from .config import fingerprint, write_json


def document_split(document_id, seed, validation_fraction):
    # Split original documents before chunking. Stable across process/hash seeds.
    digest = hashlib.sha256((str(seed) + ":" + document_id).encode()).digest()
    return "validation" if int.from_bytes(digest[:8], "big") / 2**64 < validation_fraction else "train"


@dataclass
class Segment:
    document_id: str
    chunk: int
    inputs: list
    targets: list


def split_tokens(document_id, tokens, max_seq_len):
    # One-token target lookahead preserves every next-token pair exactly once.
    # It does not connect attention between chunks or invent an EOS at a cut.
    for chunk, start in enumerate(range(0, len(tokens) - 1, max_seq_len)):
        end = min(start + max_seq_len, len(tokens) - 1)
        yield Segment(document_id, chunk, list(tokens[start:end]), list(tokens[start + 1:end + 1]))


class TokenStore:
    """Memory-mapped tokens plus original-document offsets; no prepacked rows."""

    def __init__(self, directory, split, max_seq_len):
        import numpy as np

        directory = Path(directory)
        self.tokens = np.memmap(directory / (split + ".bin"), dtype="<u4", mode="r")
        self.documents = [json.loads(line) for line in (directory / (split + ".jsonl")).read_text().splitlines()]
        self.chunks = []
        for document in self.documents:
            for chunk, local_start in enumerate(range(0, document["length"] - 1, max_seq_len)):
                length = min(max_seq_len, document["length"] - 1 - local_start)
                self.chunks.append((document["id"], chunk, document["offset"] + local_start, length))
        if not self.chunks:
            raise ValueError("No usable documents in " + split)

    def __len__(self):
        return len(self.chunks)

    def length(self, index):
        return self.chunks[index][3]

    def __getitem__(self, index):
        document_id, chunk, start, length = self.chunks[index]
        return Segment(document_id, chunk, self.tokens[start:start + length].astype("int64").tolist(),
                       self.tokens[start + 1:start + length + 1].astype("int64").tolist())


class BestFitSampler:
    """Bounded candidate buffer; bins cap at 4k, physical batch contains only real T."""

    def __init__(self, store, max_seq_len, microbatch_tokens, buffer_size, seed, shuffle=True, *, batch_size=None):
        if batch_size is not None and (not isinstance(batch_size, int) or batch_size < 1 or microbatch_tokens is not None):
            raise ValueError("Choose positive batch_size or legacy microbatch_tokens, not both")
        if batch_size is None and (microbatch_tokens is None or microbatch_tokens < max_seq_len):
            raise ValueError("microbatch_tokens must fit max_seq_len")
        self.store, self.max_seq_len = store, max_seq_len
        self.microbatch_tokens, self.buffer_size = microbatch_tokens, buffer_size
        self.batch_size = batch_size
        self.shuffle = shuffle
        self.rng = random.Random(seed)
        self.order = list(range(len(store)))
        if shuffle:
            self.rng.shuffle(self.order)
        self.cursor, self.epoch, self.pending = 0, 0, []

    def _fill(self):
        # Do not wrap the epoch while pending data still exists.
        while len(self.pending) < self.buffer_size and self.cursor < len(self.order):
            self.pending.append(self.order[self.cursor])
            self.cursor += 1
        if not self.pending:
            self.cursor, self.epoch = 0, self.epoch + 1
            if self.shuffle:
                self.rng.shuffle(self.order)
            self._fill()

    def next_batch(self):
        selected, bins, remaining = [], [], self.microbatch_tokens if self.batch_size is None else self.batch_size * self.max_seq_len
        while remaining and (self.batch_size is None or len(bins) < self.batch_size):
            self._fill()
            capacity = min(remaining, self.max_seq_len)
            current_bin = []
            while capacity:
                candidates = [(self.store.length(index), pos) for pos, index in enumerate(self.pending)
                              if self.store.length(index) <= capacity]
                if not candidates:
                    break
                _, pos = max(candidates, key=lambda item: (item[0], -item[1]))
                index = self.pending.pop(pos)
                current_bin.append(index)
                length = self.store.length(index)
                capacity -= length
                remaining -= length
                self._fill()
            if not current_bin:
                break
            bins.append(sum(self.store.length(i) for i in current_bin))
            selected.extend(current_bin)
        return [self.store[i] for i in selected], bins


    def state_dict(self):
        return {"order": self.order.copy(), "cursor": self.cursor, "epoch": self.epoch,
                "pending": self.pending.copy(), "rng": self.rng.getstate()}

    def load_state_dict(self, state):
        if sorted(state["order"]) != list(range(len(self.store))):
            raise ValueError("Sampler state belongs to another dataset")
        self.order, self.cursor = state["order"].copy(), state["cursor"]
        self.epoch, self.pending = state["epoch"], state["pending"].copy()
        self.rng.setstate(state["rng"])


def sampler_for_config(store, config, split="train", *, shuffle=None):
    train, data = config["train"], config["data"]
    if split == "validation":
        # Fixed legacy evaluation token set remains comparable with saved runs.
        budget = train.get("eval_microbatch_tokens", train.get("microbatch_tokens"))
        size = train.get("eval_batch_size") if budget is None else None
    else:
        budget, size = train.get("microbatch_tokens"), train.get("batch_size")
    return BestFitSampler(store, data["max_seq_len"], budget, train["packing_buffer"], config["seed"],
                          shuffle=(split == "train") if shuffle is None else shuffle, batch_size=size)


def fineweb_rows(config):
    """Read pinned Parquet shards without an Arrow dataset scanner/thread pool."""
    import pyarrow.parquet as pq
    from huggingface_hub import HfApi, HfFileSystem

    prefix = config["parquet_prefix"]
    api = HfApi(token=False)
    files = sorted(entry.path for entry in api.list_repo_tree(config["dataset"], repo_type="dataset",
                   revision=config["dataset_revision"], path_in_repo=prefix, recursive=True)
                   if entry.path.endswith(".parquet"))
    if not files:
        raise ValueError("No Parquet shards in pinned dataset prefix")
    filesystem = HfFileSystem(token=False)
    for name in files:
        path = f"datasets/{config['dataset']}@{config['dataset_revision']}/{name}"
        with filesystem.open(path, "rb") as source:
            parquet = pq.ParquetFile(source)
            try:
                # Direct single-thread reads avoid scanner teardown hangs on early exit.
                # https://github.com/huggingface/datasets/issues/7467
                for batch in parquet.iter_batches(batch_size=128, columns=["text"], use_threads=False):
                    for text in batch.column(0).to_pylist():
                        yield {"text": text}
            finally:
                parquet.close()


def prepare(config, cache):
    import numpy as np
    from transformers import AutoTokenizer

    # Pinned source revisions are part of the cache identity.
    identity = {"schema": 1, "reader": "direct_parquet_single_thread_v1",
                "policy": "document_hash_split_real_eos_v1",
                **{key: value for key, value in config.items() if key != "max_seq_len"}}
    destination = Path(cache) / fingerprint(identity)
    if (destination / "manifest.json").exists():
        manifest = json.loads((destination / "manifest.json").read_text())
        for split in ("train", "validation"):
            for suffix in (".bin", ".jsonl"):
                name = split + suffix
                if sha256_file(destination / name) != manifest["files"][name]:
                    raise ValueError("Corrupt dataset cache: " + name)
        return destination
    temporary = destination.with_name(destination.name + ".preparing")
    if temporary.exists():
        shutil.rmtree(temporary)
    temporary.mkdir(parents=True)
    tokenizer = AutoTokenizer.from_pretrained(config["tokenizer"], revision=config["tokenizer_revision"], token=False)
    # This tokenizer's original GPT-2 model limit is unrelated to our own decoder context.
    # Chunk the complete tokenized document below; do not let tokenization truncate it.
    tokenizer.model_max_length = 10**12
    if tokenizer.eos_token_id is None:
        raise ValueError("Tokenizer requires a real document EOS")
    iterator = fineweb_rows(config)
    counts = {"train": 0, "validation": 0}
    documents = {"train": 0, "validation": 0}
    targets = {"train": config["train_tokens"], "validation": config["validation_tokens"]}
    seen_ids = set()
    handles = {split: ((temporary / (split + ".bin")).open("wb"),
                       (temporary / (split + ".jsonl")).open("w")) for split in counts}
    try:
        for ordinal, row in enumerate(iterator):
            if ordinal >= config["max_documents"]:
                raise RuntimeError("max_documents reached before both data budgets; increase it")
            text = row["text"]
            # A content hash also keeps exact duplicate texts in the same split.
            document_id = hashlib.sha256(text.encode()).hexdigest()
            if document_id in seen_ids:
                continue
            seen_ids.add(document_id)
            split = document_split(document_id, config["split_seed"], config["validation_fraction"])
            if counts[split] >= targets[split]:
                continue
            tokens = tokenizer.encode(text, add_special_tokens=False) + [tokenizer.eos_token_id]
            if len(tokens) < 2:
                continue
            binary, index = handles[split]
            np.asarray(tokens, dtype="<u4").tofile(binary)
            index.write(json.dumps({"id": document_id, "offset": counts[split], "length": len(tokens)}) + "\n")
            counts[split] += len(tokens)
            documents[split] += 1
            if sum(documents.values()) % 100 == 0:
                print(json.dumps({"stage": "prepare", "tokens": counts, "documents": documents}), flush=True)
            if all(counts[s] >= targets[s] for s in counts):
                break
        else:
            raise RuntimeError("Source exhausted before both data budgets")
    finally:
        close = getattr(iterator, "close", None)
        if close:
            close()
        for binary, index in handles.values():
            binary.close()
            index.close()
    manifest = {"identity": identity, "raw_tokens_including_eos": counts, "documents": documents,
                "prediction_tokens": {s: counts[s] - documents[s] for s in counts},
                "vocab_size": len(tokenizer), "eos_token_id": tokenizer.eos_token_id,
                "files": {p.name: sha256_file(p) for p in temporary.iterdir()}}
    write_json(temporary / "manifest.json", manifest)
    temporary.replace(destination)
    return destination


def sha256_file(path):
    digest = hashlib.sha256()
    with Path(path).open("rb") as source:
        for block in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def inspect_dataset(directory, config, batches=10):
    import numpy as np

    data, train = config["data"], config["train"]
    stores = {split: TokenStore(directory, split, data["max_seq_len"]) for split in ("train", "validation")}
    document_ids = {split: {doc["id"] for doc in store.documents} for split, store in stores.items()}
    if document_ids["train"] & document_ids["validation"]:
        raise ValueError("Original document leakage between train and validation")
    result = {"max_seq_len": data["max_seq_len"], "document_overlap": 0, "splits": {}}
    for split, store in stores.items():
        lengths = np.asarray([document["length"] for document in store.documents])
        result["splits"][split] = {"documents": len(lengths), "segments": len(store),
                                   "raw_tokens": int(lengths.sum()),
                                   "length_p50": float(np.quantile(lengths, 0.5)),
                                   "length_p95": float(np.quantile(lengths, 0.95)),
                                   "length_max": int(lengths.max()),
                                   "documents_over_context": int((lengths - 1 > data["max_seq_len"]).sum())}
    sample = sampler_for_config(stores["train"], config)
    observations = []
    for _ in range(batches):
        segments, bins = sample.next_batch()
        tokens = sum(len(s.inputs) for s in segments)
        observations.append({"actual_model_tokens": tokens, "segments": len(segments), "packs": len(bins), "bin_lengths": bins,
                             "logical_bin_capacity": len(bins) * data["max_seq_len"],
                             "logical_unused_slots": len(bins) * data["max_seq_len"] - tokens,
                             "model_padding_tokens": 0})
    result["packing_samples"] = observations
    return result
