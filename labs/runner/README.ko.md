# 공통 실험 실행 도구

학습·추론·양자화 실험에서 RunPod 실행, 로그 확인, 결과 회수와 자원 정리를 공유한다. [English](README.md).
공통 도구는 Python 표준 라이브러리만 사용하며 PyTorch, W&B, Hugging Face에 의존하지 않는다.
모델·데이터·프로파일 수집 시점·성능 지표·체크포인트 복원은 각 실험이 담당한다.

## 실행

공개 저장소 루트에서:

```sh
python3 -m pip install -e labs/runner
# 기존 학습 명령도 그대로 사용한다.
cd labs/training
python3 -m training_lab runpod --config corrected --dry-run
python3 -m training_lab runpod --config corrected
```

학습 연결부는 공통 도구에 설치·GPU 검증·학습 명령을 넘긴다. 기본 학습 실행은 RunPod와 W&B 키를 요구한다.
`--no-wandb`를 붙이면 W&B 없이 실행한다. 현재 학습 엔진은 단일 GPU이며, 공통 도구의 `gpu_count: 2`만 지정한다고 분산 학습이 구현되지는 않는다.

다른 실험은 자체 실행 정의를 만든다. 공통 도구의 설치 후 작업 폴더에서:

```sh
experiment-runner run path/to/job.json --env-file path/to/.env --dry-run
experiment-runner run path/to/job.json --env-file path/to/.env
```

`--env-file`로 같은 인증 파일을 여러 실험에서 공유할 수 있다. 키를 실행 정의나 코드에 넣지 않는다.
RunPod 키는 로컬에만 남고, `forward_env` / `required_env`에 지정한 환경 변수만 Pod로 전달한다.
W&B는 공통 도구의 필수 의존성이 아니다. 다른 서비스의 키도 실험이 명시적으로 선택해서 전달한다.

## 실행 정의

실험은 실행 환경, 파일 목록, 명령 인자, 결과 경로 규약을 제공한다.
[CPU 예제의 실행 정의](examples/smoke/job.json)와 [실험 코드](examples/smoke/experiment.py)가 최소 예제다.
이 예제는 실행 규약 확인용이며 실제 모델 실험이나 성능 측정이 아니다.

```json
{
  "version": 1,
  "name": "my-experiment",
  "source_root": ".",
  "sources": ["experiment.py", "requirements.txt"],
  "runpod": {
    "gpu": "NVIDIA H100 80GB HBM3",
    "gpu_count": 1,
    "image": "your-image@sha256:YOUR_DIGEST",
    "max_seconds": 3600
  },
  "config": {"model": "your-model"},
  "stages": [
    {"name": "install", "command": ["{python}", "-m", "pip", "install", "-r", "{source}/requirements.txt"]},
    {"name": "experiment", "command": ["{python}", "-u", "experiment.py"]}
  ],
  "forward_env": [],
  "required_env": [],
  "status_files": {"progress": "progress.json"},
  "artifacts": {"exclude": ["*.pt", "*.safetensors"]}
}
```

- `source_root`는 실행 정의 파일 기준 상대 경로다. `sources`는 그 아래의 명시적 파일/glob 허용 목록이다. 공통 worker 소스는 자동으로 포함한다. 숨김 경로, 자격 증명 파일, private 자료 경로와 외부 symlink는 거부한다. 허용 목록은 직접 검토한다.
- `command`는 shell 문자열이 아닌 인자 배열이다. `{python}`, `{source}`, `{output}`, `{config}`, `{cache}`만 치환한다. 실험이 직접 shell을 선택하지 않는 한 shell 해석은 하지 않는다.
- `config`는 각 실험의 설정이며 공통 도구는 모델이나 배치의 의미를 해석하지 않는다. 값은 `config.json`으로 전달한다.
- `runpod`는 GPU 개수, 이미지, 제한 시간, 디스크·볼륨 용량, GPU당 CPU/RAM 최소값을 지정한다. `container_disk_gb`, `volume_gb` 기본값은 30, `min_vcpu_per_gpu`는 8, `min_ram_per_gpu`는 32다. `network_volume_id`를 지정한 기존 네트워크 볼륨은 삭제하지 않는다.
- `env`는 캐시 경로 같은 비밀이 아닌 기본값이다. 인증 정보는 `forward_env`(존재할 때 전달)나 `required_env`(없으면 실행 중단)에 이름만 적는다.
- `status_files`는 결과 폴더의 JSON 또는 JSONL 마지막 레코드를 상태 API로 전달한다. 학습 loss든 추론 진행 상황이든 내용 해석은 실험의 몫이다. 파일 작성 중의 불완전한 JSON은 다음 조회 때 다시 읽는다.
- `artifacts.include` / `exclude`는 결과 폴더 기준 glob이다. 생략하면 모든 일반 파일을 회수한다. 로그·실행 설정·종료 상태·provenance는 항상 포함하며 symlink는 제외한다. 모델 가중치나 체크포인트 회수 여부는 실험에서 선택한다. 기존 학습은 체크포인트까지 회수하는 기본 동작을 유지한다.

실험 프로세스에는 다음 경로를 전달한다.

| 환경 변수 | 용도 |
| --- | --- |
| `EXPERIMENT_CONFIG_PATH` | 실험 설정 JSON |
| `EXPERIMENT_OUTPUT_DIR` | 결과·로그·프로파일을 저장할 폴더 |
| `EXPERIMENT_CACHE_DIR` | 데이터·모델 등 재사용 캐시의 상위 폴더 |
| `EXPERIMENT_PROVENANCE` | 코드 commit, 소스·설정·실행 정의 해시, 이미지 정보 |

결과는 기본적으로 실험 `source_root/.runs/<pod-id>/`에, 제어 상태는 `.runpod/<run-id>.json`에 저장한다.
`results_root` / `state_root`를 지정할 때는 로컬 절대 경로를 사용한다.
Pod는 `/workspace/experiments/<run-id>`에서 명령을 실행하고 `/workspace/results/<run-id>`에 결과를 둔다.

## 종료와 복구

정상 완료와 실험 실패 모두 **결과 회수 → SHA256 확인 → Pod 삭제 → API의 404로 삭제 확인** 순서다.
실험 성공/실패(`outcome`)와 자원 상태(`resource_status`)를 따로 기록한다.
API로 삭제를 확인할 수 없으면 종료 완료로 표시하지 않는다.

중단, 시간 초과, 다운로드 실패 때는 Pod 정지를 시도하고 디스크를 보존한다. 정지된 디스크 비용은 남을 수 있다.
상태 파일은 접근 토큰을 포함하므로 Git에서 제외하고 권한 0600으로 원자적으로 저장한다.
Pod 생성 요청은 재시도하지 않는다. 응답이 불확실하면 생성 전에 저장한 Pod 이름으로 콘솔을 확인한다.
`monitor`는 생성 당시의 절대 기한을 사용하며 제한 시간을 새로 부여하지 않는다.
이미 완료한 결과는 기한 이후에도 회수를 시도한다.

```sh
experiment-runner status path/to/state.json --env-file path/to/.env
experiment-runner logs path/to/state.json --env-file path/to/.env
experiment-runner monitor path/to/state.json --env-file path/to/.env
experiment-runner collect path/to/state.json --output path/to/results --env-file path/to/.env
experiment-runner terminate path/to/state.json --env-file path/to/.env
```

정지된 Pod는 먼저 RunPod 콘솔에서 재시작한다. worker는 완료한 결과 아카이브와 체크섬이 남아 있으면 실험을 재실행하지 않고 다시 제공한다.
미완료 실험의 재시작·체크포인트 복원 정책은 각 실험의 실행 진입점에서 처리한다.
이전 학습 상태 파일도 공통 `collect` / `terminate`로 처리할 수 있다. 이전 형식의 모니터링은 `training_lab monitor`를 사용한다.

worker는 설치와 실험 프로세스에 제한 시간을 적용하지만 **Pod 자체를 삭제하지는 않는다**.
삭제는 로컬 제어기가 담당하므로 컴퓨터 종료나 연결 상실 후 자동 정리를 보장하지 않는다. 별도의 독립적인 정리 장치는 이번 분리 작업에 포함하지 않았다.

## 로컬 검증

GPU, API 키, 유료 Pod 없이 같은 명령 실행 규약을 확인한다.

```sh
cd labs/runner
python3 -m experiment_runner local examples/smoke/job.json --output .runs/smoke --cache .cache
python3 -m unittest discover -s tests -v
```

테스트는 실제 로컬 worker 서버의 인증·결과 다운로드·완료 후 재시작을 확인하고 RunPod API는 모의 응답으로 검증한다.
로컬 서버 포트를 열 수 있어야 한다. 실제 클라우드 실행을 검증했다는 의미는 아니다.
