import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


@unittest.skipUnless(importlib.util.find_spec("pyarrow"), "Parquet integration needs pyarrow")
class ReaderTests(unittest.TestCase):
    def test_early_exit_closes_real_parquet_reader_without_hanging(self):
        import pyarrow as pa
        import pyarrow.parquet as pq

        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "shard.parquet"
            pq.write_table(pa.table({"text": ["first document", "두 번째 문서", "third document"]}), path)
            script = '''import sys,types
from training_lab.data import fineweb_rows
path = sys.argv[1]
api = lambda **kwargs: types.SimpleNamespace(list_repo_tree=lambda *args, **kw: [types.SimpleNamespace(path="sample/10BT/shard.parquet")])
fs = lambda **kwargs: types.SimpleNamespace(open=lambda name, mode: open(path,mode))
sys.modules['huggingface_hub'] = types.SimpleNamespace(HfApi=api,HfFileSystem=fs)
reader = fineweb_rows({'dataset':'fake','parquet_prefix':'sample/10BT','dataset_revision':'fixed'})
assert next(reader)['text'] == 'first document'
reader.close()
print('closed')
'''
            result = subprocess.run([sys.executable, "-c", script, str(path)], capture_output=True,
                                    text=True, timeout=15, check=True)
            self.assertEqual(result.stdout.strip(), "closed")


if __name__ == "__main__":
    unittest.main()
