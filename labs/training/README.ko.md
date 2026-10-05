# 학습 실습

FineWeb 데이터 준비, PyTorch 사전학습 엔진, W&B 기록, RunPod 실행을 연결하는 실습 코드다.
관련 글은 [학습 준비 1: 저장소와 RunPod 환경](https://ai-systems-engineering.com/posts/training-prep-01-repository-runpod/)과
[학습 준비 2: FineWeb에서 학습 배치까지](https://ai-systems-engineering.com/posts/training-prep-02-data-preparation/)다.
두 글은 한영 Draft PR 검토 중이며 위 URL은 발행 후 사용할 주소다. PR 미리보기에서 먼저 확인할 수 있다.
상세 설정과 제한은 [영문 README](README.md)에도 정리했다.

## 두 키로 실행

컴퓨터에는 Python 3.9 이상만 있으면 된다. 로컬 GPU·Docker·SSH 키·GitHub/HF 토큰은 필요 없다.
RunPod 계정의 크레딧과 H100 가용성은 필요하다.

```sh
cd labs/training
cp .env.example .env
```

편집기로 `.env`의 `RUNPOD_API_KEY`, `WANDB_API_KEY`를 채운다. 이 파일은 Git에서 제외된다.
W&B는 기본 계정과 `llm-training-lab` 프로젝트를 사용한다. 다른 팀을 쓰면 `WANDB_ENTITY`를 지정한다.

```sh
python3 -m training_lab runpod --config smoke --dry-run
python3 -m training_lab runpod --config smoke
```

코드 전송 → H100 Pod 실행 → 데이터 준비 → 학습·검증 → W&B artifact 저장 →
결과 다운로드·해시 확인 → Pod 삭제 순서다. RunPod 키는 컴퓨터에만 남긴다.
GPU 환경은 실제 존재를 확인한 CUDA 12.8·PyTorch 2.8 이미지 digest로 고정했다.
2026-10-04 첫 `cycle`에서 실제 H100 100 updates, W&B 온라인 기록, CUDA timeline,
메모리 이력을 확인했다. 결과 회수 중 W&B 로그 symlink 오류를 수정하고 로컬 결과를 복구한 뒤 Pod를 삭제했다.
로컬 검증과 실제 GPU 실행 검증은 별도로 기록한다.

| 설정 | 목적 | 모델·실행 |
|---|---|---|
| `smoke` | 전체 연결 확인 | 4층·폭 256, 6 updates, 최대 문맥 4k |
| `profile` | timeline·snapshot 수집 | 같은 작은 모델, 별도 3 updates |
| `baseline` | 이후 실험의 초기 기준선 | 12층·폭 768·12 heads, 약 127M, 100 updates |
| `cycle` | 계측을 포함한 전체 사이클 | 약 127M, 100 updates; 21–22 timeline, 100 snapshot |

이 수치는 초기 구현 설정이며 교육용 품질·성능 기준으로 아직 검증되지 않았다.
학습은 무작위 초기값에서 시작한다. 1편의 HF 사전학습 가중치 로딩 예제는 별도로 연결한다.

```sh
python3 -m training_lab runpod --config profile
python3 -m training_lab runpod --config cycle
python3 -m training_lab runpod --config max-batch
```

결과는 `.runs/<pod-id>/report.html`에 모인다. 설정·환경·데이터 manifest·loss·tokens/s·
allocated/reserved memory·checkpoint·W&B URL도 저장한다. Profile 실행에는 timeline과
memory snapshot이 추가된다. [Perfetto](https://ui.perfetto.dev/)에서 timeline을,
[PyTorch memory visualizer](https://pytorch.org/memory_viz)에서 snapshot을 연다.
상세 계측을 켠 스텝의 시간은 일반 스텝과 직접 비교하지 않는다.
`cycle`은 초기 모델도 검증하고, 21–22 업데이트에서 프로파일을 수집한다. 100 업데이트 시작 전에
메모리 이력을 켜고 zero_grad → 각 microbatch forward/backward → optimizer를 기록한 뒤,
마지막 검증 전에 snapshot을 저장한다. snapshot에는 해당 스텝의 할당·해제 이력이 남는다.

`summary.json.performance`는 워밍업 10 스텝과 계측 스텝을 제외하고 실제 정답 토큰의 합을
update 시간의 합으로 나눠 tokens/s/GPU를 계산한다. 시간에는 패킹·H2D·forward·backward·clipping·
optimizer가 포함되며 검증·logging·checkpoint·프로파일 export는 제외한다. 같은 구간의 peak allocated,
peak reserved도 요약한다. 전체 경과 시간은 준비/계측/검증 등과 구분해 읽는다.

MFU는 `6*(12*L*d² + V*d)*T + 12*L*d*Σs²`로 추정한 모델 행렬 연산량을 시간과 GPU 이론 peak로
나눈 값이다. `s`는 각 독립 문서 조각의 실제 길이다. 문서 간 attention은 계산량에 포함하지 않으며,
attention은 nanoGPT와 같은 full-square 추정 관례를 사용한다. 실제 causal 커널의 FLOP counter가 아니다.
출력 head는 포함하고 embedding lookup·position·normalization·optimizer 등은 제외한다.
H100 SXM에서는 sparse peak가 아닌 dense BF16 **989 TFLOPS**를 사용한다.
현재 warmup 표시는 성능 측정 제외 구간이며 LR warmup을 뜻하지 않는다.

## 수정 엔진: 명시적 배치·FlashAttention·통합 LCE

```sh
python3 -m training_lab runpod --config corrected
```

PyTorch 2.14.1 CUDA 12.6 wheel을 고정한다. variable-length FlashAttention은 PyTorch의 공개 API를
사용하므로 외부 FlashAttention CUDA 확장을 빌드할 필요가 없다. 통합 CE는 Liger를 사용한다.
기존 CUDA 12.8 이미지에서 정확한 런타임 wheel을 설치하고 실제 버전은 environment.json에 남긴다.

`train.batch_size`는 microbatch당 최대 4k인 논리 pack의 개수다. 이번 설정은 35 packs × accumulation 1.
pack 안의 문서·chunk는 독립 attention 구간이며 빈 공간은 모델 입력에 포함하지 않는다.
pack 수·독립 chunk 수·실제 token 수를 각각 기록한다. `batch_size`와 과거 token-budget 설정은 동시에 쓸 수 없다.
기존 recipe는 비교용으로 유지하고 수정 경로는 corrected를 사용한다.

PyTorch varlen_attn에 각 문서·chunk의 cu_seqlens(int32), 실제 최대 길이, causal window=(-1, 0)를 넘긴다.
전체 flat T에 대한 일반적인 T×T 마스크 생성은 없다.
통합 CE API는 PyTorch에도 있지만 2.14의 BF16 scalar 누적은 큰 배치의 loss 합을 거칠게 반올림한다.
수정 recipe는 Liger 0.8.4로 BF16 AMP 계산·FP32 loss 합·FP32 weight-gradient 누적을 사용한다.
명시적 torch_linear_ce 대안은 head 계산을 FP32/TF32로 수행하여 FP32 loss 합을 보장한다.
auto는 API가 있으면 이 안전한 native 대안을 선택한다. 원본 parameter·gradient·AdamW state는 FP32다.
두 통합 CE 경로는 head gradient를 forward에서 미리 계산하므로 일반 CE와 timeline 경계가 다르다.
GPU 사전 검증에서 작은 입력과 많은 chunk를 만드는 큰 입력의 loss·xgrad·wgrad를 함께 대조한다.

학습 전에 GPU loss/xgrad/wgrad, attention output/dq/dk/dv와 문서 간 차단을 참조 계산에 대조한다.
같은 Pod에서 동일 입력·seed·모델·optimizer로 Flex/Flash × legacy/Liger CE 네 구성을 비교한다.
각 구성 warmup 3회, 일반 측정 5회, 별도 timeline 1회이며 profiler 시간은 처리량 측정에서 제외한다.
이 비교는 H2D와 update를 포함하고 runtime packing 선택은 제외한다. matched-benchmark.json에 기록한다.
최종 100회 학습의 정상 처리량은 packing도 포함하고, 기존 검증 토큰과 21–22 profile/100 snapshot을 유지한다.

## 최대 microbatch 탐색

`max-batch`는 같은 데이터 cache를 준비한 뒤 후보별 별도 GPU 프로세스에서 3 updates를 수행한다.
Backward, clipping, AdamW state 생성과 update까지 포함한다. 토큰 budget을 두 배씩 올리고,
실패 구간은 4096-token 단위로 좁힌다. 탐색 상한 262144 tokens 안에서 allocator 여유 2 GiB를 남기는
가장 큰 테스트 크기로 accumulation 1, 100 updates를 실행한다. 모든 문서 조합에서의 수학적 최대를 뜻하지 않는다.

검증은 기존 8192-token budget, 8 batches로 고정한다. 학습 배치가 커지면 업데이트당 토큰과
총 처리 토큰도 바뀔 수 있으므로 loss 비교에서 이 조건을 명시한다. 후보와 선택 결과는
`capacity-search.json`에 보관한다. 타임라인은 수집하되 이 실행에서는 profiler shape 기록을 끈다.

## 학습 데이터의 기본 정책

FineWeb `sample-10BT`의 Parquet shard를 직접 읽고 GPT-2 tokenizer의 revision을 고정한다.
읽기는 한 thread로 수행하고 스트림을 명시적으로 닫는다. 원본 문서의 content hash로
train/validation을 나누고 정확히 같은 텍스트는 한 번만 사용한다. 유사 문서 중복 제거는 별도로 구현하지 않았다.
문서별 tokens·offset을 보관하고, 실행할 때 제한된 후보 버퍼에서 best-fit으로 묶는다.
짧은 문서는 추가로 자르지 않으며 긴 문서는 최대 4096 predictor tokens의 조각으로 나눈다.
마지막 짧은 조각도 사용한다. EOS는 실제 문서 끝에만 넣고 다음 정답 한 토큰을 참조해 label 누락을 막는다.
같은 원본 문서의 조각도 서로 attention을 연결하지 않는다.

논리적 4k bin을 구성한 뒤 실제 tokens만 평탄화해 모델에 넣는다. GPU에서는 문서 경계를
반영한 FlashAttention varlen(corrected) 또는 FlexAttention(기존 recipe)을 사용하고, CPU 정확성 검증에서는 조각별 SDPA를 사용한다.
Embedding·projection·MLP 입력에도 패딩 행이 없다. 커널 내부 tile 정렬과 모델 입력 패딩은 구별한다.
Gradient accumulation의 loss 분모는 모든 microbatch의 실제 정답 token 수다.
데이터 준비 예산은 문서 전체를 보존하므로 마지막 문서만큼 초과할 수 있다.
첫 엔진은 FP32 parameter·gradient·AdamW m/v와 BF16 autocast 계산을 사용하며 별도 master 복제본은 없다.

## 실행 중단과 재현

컴퓨터의 실행 관리 프로그램을 계속 켜 둔다. 시간 제한·중단·다운로드 실패 시 Pod 정지를 시도하고
디스크를 보존한다. 정지 후에도 저장 비용은 남을 수 있다. 생성 요청의 응답이 불확실할 때는
자동 재시도하지 않는다. 콘솔에서 Pod 생성 여부를 확인한다.
상태 파일 `.runpod/*.json`은 접근 토큰을 포함하므로 Git에서 제외하고 권한을 제한한다.
컴퓨터 연결이 끊겼다면 자동 정지를 보장할 수 없으므로 RunPod 콘솔에서 확인한다.

정지된 Pod를 콘솔에서 다시 실행한 뒤 결과를 복구하거나 삭제할 수 있다.

```sh
python3 -m training_lab collect .runpod/STATE.json --output .runs/recovered
python3 -m training_lab terminate .runpod/STATE.json
```

첫 실행은 별도 volume 설정 없이 동작하도록 구성했다. 반복 실험에는 설정의
`runpod.network_volume_id`로 기존 network volume을 연결할 수 있다.
Network volume은 Pod 삭제와 별개로 유지하며 자동 삭제하지 않는다. 같은 데이터 cache의 준비는 한 번에 한 실행만 수행한다.
Checkpoint에는 모델·optimizer·RNG·데이터 순서·cursor·packing 후보 버퍼와 처리 tokens를 보관한다.
일정 주기로 저장하고 같은 설정에서 로컬 resume이 가능하다. 현재 LR은 고정이므로 scheduler는 없다.

코드·설정은 Git, 실행 기록은 W&B, 대용량 데이터와 결과는 Git 밖에서 관리한다.
실행마다 code commit·전송 코드 hash·image digest·data manifest·tokenizer revision·seed를 남긴다.
공개할 그림·수치·원본 자료는 별도로 선별한다. Offload·MoE·mHC·KDA·2GPU는 후속 편에서 추가한다.

## 로컬 검증

실제 데이터 준비·학습 환경에는 Python 3.11 이상을 권장한다.
GPU 실행을 관리하는 로컬 프로그램은 별도 dependency 없이 Python 3.9 이상에서 실행한다.

PyTorch 2.8.0과 NumPy가 있는 환경에서:

```sh
python3 -m unittest discover -s tests -v
```

CPU 검증은 문서 경계, next-token 쌍 보존, 패킹 전후 출력·gradient 일치,
누적 정규화, checkpoint 재시작, 키 제외, 결과 회수 후 삭제 순서를 확인한다.
CPU 검증과 실제 FineWeb·H100·클라우드 실행 검증은 구분한다.

## 공통 실험 실행 도구

RunPod 실행·로그·결과 회수·종료는 [공통 실행 도구](../runner/README.ko.md)를 사용한다. 학습 쪽에는 의존성 설치, GPU 검증, 학습 진입점, 체크포인트 복원만 남긴다.
기존 실행 명령과 결과 파일은 유지한다. 소스 체크아웃에서는 형제 폴더 `labs/runner`를 자동으로 찾는다. 패키지 설치는 `pip install -e ../runner -e .`를 사용한다.

`python3 -m training_lab runpod --config smoke --no-wandb`는 W&B 키 없이 실행한다. 다른 실험도 `--env-file`로 같은 인증 파일을 공유할 수 있다.
`python3 -m training_lab monitor .runpod/STATE.json`으로 기존 Pod를 모니터링하고 결과 회수·종료를 이어간다. 생성 당시 기한은 연장하지 않는다.
실험 성공/실패와 자원 상태를 별도로 기록하며 Pod 삭제 후 API의 404를 확인한다. GPU 개수 지정은 공통화했지만 학습 엔진의 분산 학습은 아직 구현하지 않았다.
