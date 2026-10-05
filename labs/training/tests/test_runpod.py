import base64
import io
import json
import os
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from training_lab.config import load_config
from training_lab.runpod import bootstrap_command, launch, make_job, make_payload, read_env, source_archive, unpack_results
from experiment_runner.runpod import HTTPStatusError


class RunPodTests(unittest.TestCase):
    def test_archive_allowlist_no_secrets_and_stable_hash(self):
        archive = source_archive()
        self.assertEqual(archive, source_archive())
        with tarfile.open(fileobj=io.BytesIO(archive)) as source:
            self.assertTrue(all(p.name.startswith(("training_lab/", "experiments/", "requirements-worker.txt", "experiment_runner/"))
                                for p in source.getmembers()))
            self.assertFalse(any(".env" in p.name or "plans/" in p.name for p in source.getmembers()))

    def test_two_keys_only_and_runpod_key_never_reaches_pod(self):
        payload = make_payload(load_config("smoke"), "auth", source_archive(), "wandb-secret")
        self.assertNotIn("RUNPOD_API_KEY", payload["env"])
        self.assertNotIn("wandb-secret", " ".join(payload["dockerStartCmd"]))
        self.assertEqual(payload["gpuCount"], 1)
        self.assertEqual(payload["ports"], ["8765/http"])
        self.assertIn("@sha256:", payload["imageName"])
        self.assertEqual(json.loads(base64.b64decode(payload["env"]["EXPERIMENT_JOB_B64"]))["config"], load_config("smoke"))
        compile(bootstrap_command()[3], "bootstrap", "exec")

    def test_env_file_is_literal_not_shell_code(self):
        with tempfile.TemporaryDirectory() as directory, patch.dict(os.environ, {}, clear=True):
            path = Path(directory) / ".env"
            path.write_text('RUNPOD_API_KEY="literal$(no-execution)"\nWANDB_API_KEY=key\n')
            read_env(path)
            self.assertEqual(os.environ["RUNPOD_API_KEY"], "literal$(no-execution)")

    def test_collection_precedes_termination(self):
        events = []
        def request(url, method="GET", **kwargs):
            if method == "POST":
                events.append("create")
                return {"id": "fake"}
            if method == "DELETE":
                events.append("terminate")
                return {}
            if url.endswith("/pods/fake"):
                raise HTTPStatusError(404, method, url)
            return {"stage": "complete", "finished": True, "exit_code": 0}

        def collect(state, destination):
            events.append("collect")

        with tempfile.TemporaryDirectory() as directory, patch.dict(os.environ, {"RUNPOD_API_KEY": "fake", "WANDB_API_KEY": "fake"}), \
                patch("experiment_runner.runpod.request_json", side_effect=request), patch("experiment_runner.runpod.collect", side_effect=collect):
            state = Path(directory) / "state.json"
            launch(load_config("smoke"), state)
            self.assertEqual(events, ["create", "collect", "terminate"])
            self.assertEqual(state.stat().st_mode & 0o777, 0o600)
            self.assertNotIn("fake-key", state.read_text())

    def test_failed_collection_stops_instead_of_deleting_results(self):
        events = []
        def request(url, method="GET", **kwargs):
            if method == "POST" and url.endswith("/pods"):
                return {"id": "fake"}
            if method == "POST" and url.endswith("/stop"):
                events.append("stop")
                return {}
            if method == "DELETE":
                events.append("delete")
            return {"stage": "complete", "finished": True, "exit_code": 0}
        with tempfile.TemporaryDirectory() as directory, patch.dict(os.environ, {"RUNPOD_API_KEY": "fake", "WANDB_API_KEY": "fake"}), \
                patch("experiment_runner.runpod.request_json", side_effect=request), \
                patch("experiment_runner.runpod.collect", side_effect=RuntimeError("download failed")):
            with self.assertRaisesRegex(RuntimeError, "download failed"):
                launch(load_config("smoke"), Path(directory) / "state.json")
            self.assertEqual(events, ["stop"])

    def test_training_job_owns_installs_preflight_and_entry(self):
        job = make_job(load_config("corrected"))
        self.assertEqual([stage["name"] for stage in job["stages"]],
                         ["install", "install_torch", "install_liger", "gpu_preflight", "prepare_and_train"])
        self.assertEqual(job["stages"][-1]["command"],
                         ["{python}", "-u", "-m", "training_lab.remote", "--wandb"])
        plain = make_job(load_config("corrected"), wandb=False)
        self.assertEqual(plain["required_env"], [])
        self.assertNotIn("--wandb", plain["stages"][-1]["command"])

    def test_training_remote_preserves_resume_capacity_and_provenance(self):
        from training_lab import remote
        from training_lab.config import write_json
        import sys
        for capacity in (False, True):
            with tempfile.TemporaryDirectory() as directory:
                config = load_config("smoke")
                config["capacity"] = {"enabled": capacity}
                path = Path(directory) / "config.json"
                write_json(path, config)
                # Bypass capacity config validation: dispatch is what this test exercises.
                (Path(directory) / "checkpoint.pt").touch()
                env = {"EXPERIMENT_CONFIG_PATH": str(path), "EXPERIMENT_OUTPUT_DIR": directory,
                       "EXPERIMENT_CACHE_DIR": directory + "/cache", "EXPERIMENT_PROVENANCE": "{\"source_sha256\":\"test\"}"}
                with patch.dict(os.environ, env), patch.object(sys, "argv", ["remote", "--wandb"]), \
                        patch.object(remote, "load_config", return_value=config), patch.object(remote, "main") as main:
                    remote.run()
                    self.assertEqual(sys.argv[1], "capacity-run" if capacity else "local")
                    self.assertIn("--resume", sys.argv)
                    self.assertIn("--wandb", sys.argv)
                    self.assertEqual(json.loads(os.environ["LAB_PROVENANCE"])["source_sha256"], "test")
                    main.assert_called_once()

    def test_result_archive_rejects_path_traversal(self):
        with tempfile.TemporaryDirectory() as directory:
            archive = Path(directory) / "results.tar.gz"
            with tarfile.open(archive, "w:gz") as output:
                item = tarfile.TarInfo("../escape")
                item.size = 1
                output.addfile(item, io.BytesIO(b"x"))
            with self.assertRaisesRegex(ValueError, "Unsafe"):
                unpack_results(archive, Path(directory) / "result")

    def test_result_archive_ignores_log_links_without_following_them(self):
        with tempfile.TemporaryDirectory() as directory:
            archive = Path(directory) / "results.tar.gz"
            with tarfile.open(archive, "w:gz") as output:
                link = tarfile.TarInfo("wandb/debug.log")
                link.type = tarfile.SYMTYPE
                link.linkname = "/outside/secret"
                output.addfile(link)
                item = tarfile.TarInfo("summary.json")
                item.size = 2
                output.addfile(item, io.BytesIO(b"{}"))
            destination = Path(directory) / "result"
            unpack_results(archive, destination)
            self.assertFalse((destination / "wandb/debug.log").exists())
            self.assertEqual((destination / "summary.json").read_text(), "{}")


if __name__ == "__main__":
    unittest.main()
