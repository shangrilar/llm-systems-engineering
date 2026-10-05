import base64
import contextlib
import io
import json
import os
import socket
import subprocess
import sys
import tarfile
import tempfile
import time
import unittest
import urllib.error
import urllib.request
from pathlib import Path
from unittest.mock import patch

from experiment_runner import runpod
from experiment_runner.artifacts import archive_results, collect, sha256_file, source_archive, unpack_results
from experiment_runner.job import load_job, read_env, validate_job
from experiment_runner.state import save_private
from experiment_runner.worker import read_status_files, run_job

ROOT = Path(__file__).resolve().parents[1]


def smoke():
    return load_job(ROOT / 'examples/smoke/job.json')


class LifecycleTests(unittest.TestCase):
    def lifecycle(self, failed=False, download_failed=False, expired=False):
        events = []
        state_seen = []
        def request(url, method="GET", **kwargs):
            if url.endswith('/pods'):
                events.append('create')
                state_seen.append(json.loads(state_path.read_text()))
                self.assertNotIn('RUNPOD_API_KEY', kwargs['payload']['env'])
                return {'id': 'fake'}
            if method == 'DELETE':
                events.append('delete')
                return {}
            if url.endswith('/stop'):
                events.append('stop')
                return {}
            if url.endswith('/pods/fake'):
                events.append('confirm_deleted')
                raise runpod.HTTPStatusError(404, method, url)
            return {'stage': 'failed' if failed else 'complete', 'finished': not expired, 'exit_code': 1 if failed else 0}
        def download(state, destination):
            events.append('collect')
            if download_failed:
                raise RuntimeError('download failed')
        job = smoke()
        with tempfile.TemporaryDirectory() as directory:
            state_path = Path(directory) / 'state.json'
            job['results_root'] = directory
            with patch.dict(os.environ, {'RUNPOD_API_KEY': 'secret'}, clear=True), \
                    patch.object(runpod, 'request_json', side_effect=request), \
                    patch.object(runpod, 'collect', side_effect=download), \
                    patch.object(runpod.time, 'time', side_effect=[1, 1000] if expired else None, return_value=1000), \
                    contextlib.redirect_stdout(io.StringIO()):
                if failed or download_failed:
                    with self.assertRaises(RuntimeError):
                        runpod.launch(job, state_path)
                elif expired:
                    with self.assertRaises(TimeoutError):
                        runpod.launch(job, state_path)
                else:
                    runpod.launch(job, state_path)
            state = json.loads(state_path.read_text())
            self.assertEqual(state_path.stat().st_mode & 0o777, 0o600)
            self.assertNotIn('secret', state_path.read_text())
            self.assertEqual(state_seen[0]['status'], 'creating')
        return events, state

    def test_success_collects_before_confirmed_deletion_without_wandb(self):
        events, state = self.lifecycle()
        self.assertEqual(events, ['create', 'collect', 'delete', 'confirm_deleted'])
        self.assertEqual(state['outcome'], 'succeeded')
        self.assertEqual(state['resource_status'], 'terminated')

    def test_job_failure_still_collects_and_deletes(self):
        events, state = self.lifecycle(failed=True)
        self.assertEqual(events, ['create', 'collect', 'delete', 'confirm_deleted'])
        self.assertEqual(state['outcome'], 'failed')
        self.assertEqual(state['resource_status'], 'terminated')

    def test_download_failure_preserves_stopped_disk(self):
        events, state = self.lifecycle(download_failed=True)
        self.assertEqual(events, ['create', 'collect', 'stop'])
        self.assertEqual(state['resource_status'], 'stopped')

    def test_timeout_stops(self):
        events, state = self.lifecycle(expired=True)
        self.assertEqual(events, ['create', 'stop'])
        self.assertEqual(state['resource_status'], 'stopped')

    def test_resume_does_not_extend_deadline(self):
        job = smoke()
        state = {'pod_id':'fake', 'auth':'auth', 'url':'http://fake', 'created_at':1, 'status':'created'}
        with tempfile.TemporaryDirectory() as directory, \
                patch.object(runpod, 'request_json', return_value={'finished':False}), \
                patch.object(runpod, 'stop_pod') as stop, \
                contextlib.redirect_stdout(io.StringIO()):
            with self.assertRaises(TimeoutError):
                runpod.monitor(job, state, Path(directory)/'state.json')
            stop.assert_called_once()
        self.assertEqual(state['deadline_at'], 301)

    def test_uncertain_creation_is_persisted_and_never_retried(self):
        with tempfile.TemporaryDirectory() as directory, patch.dict(os.environ, {'RUNPOD_API_KEY':'secret'}), \
                patch.object(runpod, 'request_json', side_effect=OSError('timeout')) as request, \
                contextlib.redirect_stdout(io.StringIO()):
            path = Path(directory)/'state.json'
            with self.assertRaises(OSError):
                runpod.launch(smoke(), path)
            self.assertEqual(request.call_count, 1)
            self.assertEqual(json.loads(path.read_text())['status'], 'creation_uncertain')

    def test_delete_confirmation_failure_does_not_claim_terminated(self):
        with patch.dict(os.environ, {'RUNPOD_API_KEY':'key'}), \
                patch.object(runpod, 'request_json', return_value={}), patch.object(runpod.time, 'sleep'):
            with self.assertRaisesRegex(RuntimeError, 'could not be confirmed'):
                runpod.terminate_pod({'pod_id':'still-present'})

    def test_interrupt_stops(self):
        state={'pod_id':'fake', 'url':'http://fake', 'auth':'auth', 'status':'created', 'created_at':time.time()}
        with tempfile.TemporaryDirectory() as directory, patch.object(runpod,'request_json',side_effect=KeyboardInterrupt), \
                patch.object(runpod,'stop_pod') as stop, contextlib.redirect_stdout(io.StringIO()):
            with self.assertRaises(KeyboardInterrupt):
                runpod.monitor(smoke(),state,Path(directory)/'state.json')
            stop.assert_called_once()


class ContractTests(unittest.TestCase):
    def test_source_is_stable_and_includes_shared_worker(self):
        job = smoke()
        archive = source_archive(job)
        self.assertEqual(archive, source_archive(job))
        with tarfile.open(fileobj=io.BytesIO(archive)) as source:
            names = source.getnames()
        self.assertIn('experiment.py', names)
        self.assertIn('experiment_runner/worker.py', names)
        self.assertFalse(any('training_lab' in name for name in names))

    def test_source_rejects_secret_and_outside_symlink(self):
        with tempfile.TemporaryDirectory() as directory:
            job = dict(smoke(), source_root=directory, sources=['.env'])
            Path(directory,'.env').write_text('secret')
            with self.assertRaises(ValueError):
                source_archive(job)
            Path(directory,'link.py').symlink_to(ROOT/'experiment_runner/job.py')
            job['sources']=['link.py']
            with self.assertRaises(ValueError):
                source_archive(job)

    def test_environment_is_literal_and_custom_forwarding_is_explicit(self):
        with tempfile.TemporaryDirectory() as directory, patch.dict(os.environ, {}, clear=True):
            path=Path(directory)/'.env'
            path.write_text('RUNPOD_API_KEY="literal$(do-not-run)"\nHF_TOKEN=token\n')
            read_env(path, ['RUNPOD_API_KEY','HF_TOKEN'])
            self.assertEqual(os.environ['RUNPOD_API_KEY'],'literal$(do-not-run)')
            job=smoke()
            payload=runpod.make_payload(job,'auth',source_archive(job))
            self.assertNotIn('HF_TOKEN',payload['env'])
            job['forward_env']=['HF_TOKEN']
            self.assertEqual(runpod.make_payload(job,'auth',source_archive(job))['env']['HF_TOKEN'],'token')

    def test_two_gpu_resources_and_remote_contract(self):
        job=smoke()
        job['runpod'].update(gpu_count=2,container_disk_gb=45,volume_gb=55,min_vcpu_per_gpu=10,min_ram_per_gpu=48)
        payload=runpod.make_payload(job,'auth',source_archive(job))
        self.assertEqual(payload['gpuCount'],2)
        self.assertEqual(payload['containerDiskInGb'],45)
        remote=json.loads(base64.b64decode(payload['env']['EXPERIMENT_JOB_B64']))
        self.assertNotIn('source_root',remote)
        self.assertEqual(remote['config'],job['config'])
        compile(runpod.bootstrap_command()[3],'bootstrap','exec')

    def test_reserved_env_and_status_rejected(self):
        for key in ('RUNPOD_API_KEY','EXPERIMENT_AUTH_TOKEN'):
            job=smoke()
            job['forward_env']=[key]
            with self.assertRaises(ValueError):
                validate_job(job)
        job=smoke()
        job['status_files']={'finished':'some.json'}
        with self.assertRaises(ValueError):
            validate_job(job)

    def test_dry_run_redacts_secrets(self):
        job=smoke()
        job['forward_env']=['HF_TOKEN']
        with patch.dict(os.environ, {'HF_TOKEN':'private-token'}), contextlib.redirect_stdout(io.StringIO()) as output:
            runpod.launch(job,dry_run=True)
        self.assertNotIn('private-token',output.getvalue())
        self.assertEqual(json.loads(output.getvalue())['payload']['env']['HF_TOKEN'],'REDACTED')

    def test_checksum_failure_does_not_extract(self):
        response=io.BytesIO(b'corrupt')
        response.headers={'X-Content-SHA256':'wrong'}
        with tempfile.TemporaryDirectory() as directory, patch('urllib.request.urlopen',return_value=response):
            with self.assertRaisesRegex(RuntimeError,'checksum'):
                collect({'url':'http://local','auth':'auth'},directory)
            self.assertFalse(Path(directory,'config.json').exists())

    def test_artifact_policy_and_external_links(self):
        with tempfile.TemporaryDirectory() as directory:
            output=Path(directory)/'output'
            output.mkdir()
            (output/'worker.log').write_text('log')
            (output/'summary.json').write_text('{}')
            (output/'checkpoint.pt').write_text('large')
            (output/'outside').symlink_to(ROOT/'pyproject.toml')
            archive=Path(directory)/'archive.tar.gz'
            digest=archive_results(output,archive,exclude=['*.pt'])
            self.assertEqual(digest,sha256_file(archive))
            with tarfile.open(archive) as source:
                self.assertEqual(sorted(source.getnames()),['summary.json','worker.log'])

    def test_unpack_rejects_traversal_and_existing_symlink(self):
        with tempfile.TemporaryDirectory() as directory:
            destination=Path(directory)/'output'
            destination.mkdir()
            outside=Path(directory)/'outside'
            outside.mkdir()
            (destination/'link').symlink_to(outside,target_is_directory=True)
            for name in ('../escape','link/escape'):
                archive=Path(directory)/'archive.tar.gz'
                with tarfile.open(archive,'w:gz') as source:
                    item=tarfile.TarInfo(name)
                    item.size=1
                    source.addfile(item,io.BytesIO(b'x'))
                with self.assertRaises(ValueError):
                    unpack_results(archive,destination)

    def test_atomic_private_state(self):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/'state.json'
            path.write_text('{}')
            path.chmod(0o644)
            save_private(path,{'status':'stopped'})
            self.assertEqual(path.stat().st_mode & 0o777,0o600)
            self.assertEqual(json.loads(path.read_text())['status'],'stopped')


class WorkerTests(unittest.TestCase):
    def test_cpu_example_uses_only_generic_contract(self):
        with tempfile.TemporaryDirectory() as directory:
            output=Path(directory)/'output'
            stages=[]
            code=run_job(smoke(),output,cache=Path(directory)/'cache',update=lambda **status: stages.append(status['stage']))
            self.assertEqual(code,0)
            self.assertEqual(stages,['experiment'])
            self.assertEqual(json.loads((output/'summary.json').read_text())['completed'],3)
            self.assertEqual(read_status_files(smoke(),output)['progress']['current'],3)

    def test_failed_stage_does_not_run_next_and_preserves_logs(self):
        job=smoke()
        job['stages']=[{'name':'fail','command':['{python}','-c','print("diagnostic"); raise SystemExit(2)']},
                       {'name':'must_not_run','command':['{python}','-c','raise Exception("should not run")']}]
        with tempfile.TemporaryDirectory() as directory:
            stages=[]
            self.assertEqual(run_job(job,directory,cache=Path(directory)/'cache',update=lambda **s:stages.append(s['stage'])),1)
            self.assertEqual(stages,['fail'])
            self.assertIn('diagnostic',Path(directory,'worker.log').read_text())

    def test_timeout_bounds_process(self):
        job=smoke()
        job['runpod']['max_seconds']=1
        job['stages']=[{'name':'sleep','command':['{python}','-c','import time; time.sleep(30)']}]
        with tempfile.TemporaryDirectory() as directory:
            started=time.monotonic()
            self.assertEqual(run_job(job,directory,cache=Path(directory)/'cache'),1)
            self.assertLess(time.monotonic()-started,5)
            self.assertIn('TimeoutExpired',Path(directory,'worker.log').read_text())

    def test_worker_http_auth_download_and_completed_restart(self):
        with tempfile.TemporaryDirectory() as directory:
            workspace=Path(directory)
            job=smoke()
            encoded=base64.b64encode(json.dumps(job).encode()).decode()
            with socket.socket() as sock:
                sock.bind(('127.0.0.1',0))
                port=sock.getsockname()[1]
            script='import base64,json; from experiment_runner.worker import serve; serve(json.loads(base64.b64decode(' + repr(encoded) + ')),"test-run","test-auth",workspace=' + repr(directory) + ',port=' + str(port) + ')'
            env=dict(os.environ,PYTHONPATH=str(ROOT))
            url='http://127.0.0.1:'+str(port)
            def start_and_collect():
                process=subprocess.Popen([sys.executable,'-c',script],cwd=job['source_root'],env=env,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
                try:
                    deadline=time.monotonic()+10
                    while time.monotonic()<deadline:
                        if process.poll() is not None:
                            self.fail(process.stderr.read().decode())
                        try:
                            status=runpod.request_json(url+'/status',token='test-auth',timeout=1)
                            if status['finished']:
                                break
                        except OSError:
                            pass
                        time.sleep(.05)
                    else:
                        self.fail('Worker did not finish')
                    with self.assertRaises(runpod.HTTPStatusError) as error:
                        runpod.request_json(url+'/status',token='bad-auth')
                    self.assertEqual(error.exception.code,401)
                    result=collect({'url':url,'auth':'test-auth'},workspace/'download')
                    self.assertEqual(json.loads((result/'summary.json').read_text())['completed'],3)
                    return sha256_file(workspace/'results/test-run.tar.gz')
                finally:
                    process.terminate()
                    process.wait(timeout=5)
                    process.stderr.close()
            first=start_and_collect()
            self.assertEqual(start_and_collect(),first)
