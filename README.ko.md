# AI Systems Engineering

[English](README.md) | **한국어**

모델 내부 구조, GPU 실행, 성능과 최적화를 그림과 함께 단계적으로 배우는 AI 시스템 엔지니어링 가이드입니다.

현재 모델과 GPU의 기초를 다루는 글을 제공합니다. 학습 로드맵은 기초 → 추론 → 학습(Pretraining·SFT) → RL 기반 Post-training으로 이어집니다.

[한국어 글 읽기](https://ai-systems-engineering.com/) · [영어 글 읽기](https://ai-systems-engineering.com/en/)

한국어와 영어로 제공합니다. 아래 목차에서 개별 글과 그림을 읽을 수 있습니다.

## 여기서 시작하세요

- [LLM의 전체 구조: 임베딩 층에서 LM Head까지](https://ai-systems-engineering.com/posts/embedding-to-lm-head/)
- [GPU 구조: 연산 장치와 메모리](https://ai-systems-engineering.com/posts/gpu-architecture/)
- [GPU 최적화의 출발점: 산술 강도와 데이터 이동](https://ai-systems-engineering.com/posts/gpu-arithmetic-intensity-and-fusion/)

## RunPod 추천 링크와 실험 지원

[제 RunPod 추천 링크](https://runpod.io?ref=6jviazkz)로 새로 가입하고 플랫폼에서 10달러 이상 사용하면 가입자도 추가 크레딧을 받을 수 있습니다. 저도 추천 보상으로 크레딧을 받을 수 있으며, 이 크레딧은 이 가이드의 GPU 실험을 이어 가는 데 큰 도움이 됩니다. 혜택과 적용 조건은 [RunPod 공식 안내](https://www.runpod.io/referral-and-affiliate-program)를 참고해 주세요.

## 전체 글 목록

### 공통

- [LLM 시스템 엔지니어링: 모델, 하드웨어, 워크로드를 연결하는 일](https://ai-systems-engineering.com/posts/llm-systems-engineering-introduction/)

#### 모델

- [LLM의 전체 구조: 임베딩 층에서 LM Head까지](https://ai-systems-engineering.com/posts/embedding-to-lm-head/)
- [디코더 블록의 기본 흐름: Residual과 RMSNorm](https://ai-systems-engineering.com/posts/residual-and-rmsnorm/)
- [Attention과 MLP: 토큰 사이의 정보와 토큰 내부의 변환](https://ai-systems-engineering.com/posts/attention-and-mlp/)
- [Attention의 projection: Q·K·V와 멀티 헤드](https://ai-systems-engineering.com/posts/attention-projections/)
- [Core Attention: 토큰 사이의 정보 조합하기](https://ai-systems-engineering.com/posts/core-attention/)
- [RoPE: 토큰 위치를 Attention에 반영하기](https://ai-systems-engineering.com/posts/rope/)
- [MoE: 토큰마다 사용할 MLP 선택하기](https://ai-systems-engineering.com/posts/moe/)
- [모델 전체 흐름 다시 보기](https://ai-systems-engineering.com/posts/model-summary/)
- [MQA와 GQA: 여러 Query가 KV를 공유하기](https://ai-systems-engineering.com/posts/model-advanced-mqa-gqa/)
- [MLA의 저장 구조: KV를 작은 잠재 벡터로 표현하기](https://ai-systems-engineering.com/posts/model-advanced-mla-storage/)
- [MLA의 계산: KV를 펼치지 않고 Attention하기](https://ai-systems-engineering.com/posts/model-advanced-mla-computation/)
- [Local과 Sparse Attention: 읽을 토큰 범위 줄이기](https://ai-systems-engineering.com/posts/model-advanced-local-sparse/)
- [Sparse Attention의 Indexer: 내용에 따라 읽을 위치 고르기](https://ai-systems-engineering.com/posts/model-advanced-sparse-indexer/)
- [토큰 축 압축: 여러 위치의 KV를 요약해서 읽기](https://ai-systems-engineering.com/posts/model-advanced-token-compression/)
- [Linear Attention: KV를 고정 크기 상태에 누적하기](https://ai-systems-engineering.com/posts/model-advanced-linear-attention/)
- [델타 규칙: 새 Value에 맞춰 상태의 연결 수정하기](https://ai-systems-engineering.com/posts/model-advanced-delta-rule/)
- [GDN과 KDA: 기존 상태의 유지와 델타 보정](https://ai-systems-engineering.com/posts/model-advanced-gdn-kda/)
- [SSM: 이전 상태와 새 입력으로 문맥을 이어가기](https://ai-systems-engineering.com/posts/model-advanced-ssm-basics/)
- [Mamba: 입력에 따라 무엇을 기억할지 조절하기](https://ai-systems-engineering.com/posts/model-advanced-mamba-selective/)
- [하이브리드 모델: 상태와 Attention을 함께 쓰기](https://ai-systems-engineering.com/posts/model-advanced-hybrid/)
- [HC와 mHC: Residual 경로를 넓히고 연결하기](https://ai-systems-engineering.com/posts/model-advanced-hc-mhc/)
- [Gated Residual: 성분별로 읽고 원본에 나누어 쓰기](https://ai-systems-engineering.com/posts/model-advanced-gated-residual/)
- [Attention Residuals: 지나온 층의 출력을 선택해서 읽기](https://ai-systems-engineering.com/posts/model-advanced-attention-residuals/)
- [층간 KV 공유: 앞선 층의 Key와 Value 재사용하기](https://ai-systems-engineering.com/posts/model-advanced-cross-layer-kv/)
- [YOCO: 공통 KV를 만드는 층과 읽는 층 나누기](https://ai-systems-engineering.com/posts/model-advanced-yoco/)
- [CED: 인과적 Encoder와 Decoder로 문맥 이어가기](https://ai-systems-engineering.com/posts/model-advanced-ced/)

#### 하드웨어

- [CPU와 GPU: 모델의 계산을 실행하는 두 장치](https://ai-systems-engineering.com/posts/cpu-and-gpu/)
- [GPU 구조: 연산 장치와 메모리](https://ai-systems-engineering.com/posts/gpu-architecture/)
- [모델 연산의 병렬성: 원소별 연산, Reduction, 행렬 곱](https://ai-systems-engineering.com/posts/model-operation-parallelism/)
- [GPU의 병렬 실행: 스레드에서 워프 스케줄링까지](https://ai-systems-engineering.com/posts/gpu-execution-and-warp-scheduling/)
- [CPU와 GPU가 함께 작업을 실행하는 방법](https://ai-systems-engineering.com/posts/cpu-gpu-work-execution/)
- [GPU 최적화의 출발점: 산술 강도와 데이터 이동](https://ai-systems-engineering.com/posts/gpu-arithmetic-intensity-and-fusion/)
- [행렬 곱 최적화: 입력 재사용과 타일링](https://ai-systems-engineering.com/posts/matmul-tiling-and-data-reuse/)
- [Attention 최적화가 어려운 이유](https://ai-systems-engineering.com/posts/attention-memory-and-softmax/)
- [점수를 나누어 처리하는 온라인 소프트맥스](https://ai-systems-engineering.com/posts/online-softmax/)
- [출력을 누적해 메모리 이동을 줄이는 FlashAttention](https://ai-systems-engineering.com/posts/flash-attention/)
- [연산 최적화에서 모델 전체 성능으로](https://ai-systems-engineering.com/posts/model-performance-and-bottlenecks/)
- [여러 GPU로 확장하기](https://ai-systems-engineering.com/posts/multi-gpu-execution/)
- [GPU 사이에서 데이터를 전달하기](https://ai-systems-engineering.com/posts/gpu-communication-basics/)
- [GPU 통신을 수행하는 SM과 복사 엔진](https://ai-systems-engineering.com/posts/gpu-communication-engines/)
- [서버 사이의 GPU 통신과 CPU의 역할](https://ai-systems-engineering.com/posts/gpu-network-data-path/)
- [집합 통신의 기본 동작](https://ai-systems-engineering.com/posts/collective-communication-basics/)
- [집합 통신의 조합과 확장](https://ai-systems-engineering.com/posts/collective-communication-combinations/)
- [집합 통신은 어떻게 전달될까: Ring과 Tree](https://ai-systems-engineering.com/posts/collective-ring-tree/)
- [DP: 모델을 복제해 입력 나누기](https://ai-systems-engineering.com/posts/data-parallelism/)
- [TP: 하나의 연산을 여러 GPU로 나누기](https://ai-systems-engineering.com/posts/tensor-parallelism/)
- [SP: TP와 함께 활성값 나누기](https://ai-systems-engineering.com/posts/sequence-parallelism/)
- [CP: 긴 문맥을 여러 GPU로 나누기](https://ai-systems-engineering.com/posts/context-parallelism/)
- [PP: 모델의 층을 나누어 실행하기](https://ai-systems-engineering.com/posts/pipeline-parallelism/)
- [EP: Expert를 나누고 토큰 보내기](https://ai-systems-engineering.com/posts/expert-parallelism/)
- [여러 GPU를 어떻게 배치할까?](https://ai-systems-engineering.com/posts/choosing-parallelism/)

#### 워크로드

- [같은 모델, 다른 워크로드: 추론과 학습](https://ai-systems-engineering.com/posts/inference-and-training/)

### 추론

#### 워크로드

- [추론과 KV 캐시](https://ai-systems-engineering.com/posts/inference-kv-cache/)
- [Prefill과 Decode](https://ai-systems-engineering.com/posts/prefill-and-decode/)
- [배치와 스케줄링](https://ai-systems-engineering.com/posts/batching-and-scheduling/)
- [KV 캐시 관리와 PagedAttention](https://ai-systems-engineering.com/posts/paged-kv-cache/)
- [KV 캐시가 부족할 때: 요청 중단과 재개](https://ai-systems-engineering.com/posts/inference-preemption/)
- [추론 성능 지표: 대기 시간과 처리량](https://ai-systems-engineering.com/posts/inference-metrics/)

### 학습

- [학습 준비 1: 저장소와 RunPod 환경](https://ai-systems-engineering.com/posts/training-prep-01-repository-runpod/)
- [학습 준비 2: FineWeb에서 학습 배치까지](https://ai-systems-engineering.com/posts/training-prep-02-data-preparation/)
- [학습 한 스텝: Forward에서 가중치 업데이트까지](https://ai-systems-engineering.com/posts/training-01-forward-backward/)

### RL

- [토큰 생성은 어떻게 강화학습의 행동이 되는가](https://ai-systems-engineering.com/posts/rl-token-actions/)
- [보상은 어떻게 토큰의 생성 확률을 바꾸는가](https://ai-systems-engineering.com/posts/rl-reward-to-update/)
- [그룹 비교와 Critic으로 어드밴티지 구하기](https://ai-systems-engineering.com/posts/rl-critic-and-groups/)
- [교사의 확률에서 학습 신호 얻기: OPD](https://ai-systems-engineering.com/posts/rl-on-policy-distillation/)
- [RL과 OPD를 조합하는 학습 전략](https://ai-systems-engineering.com/posts/rl-training-strategy/)
- [LLM RL 시스템은 어떻게 연결되는가](https://ai-systems-engineering.com/posts/rl-system-architecture/)
- [생성 기록을 학습으로 이어가기: TITO와 R3](https://ai-systems-engineering.com/posts/rl-token-context/)
- [RL에서 양자화를 사용하는 방법](https://ai-systems-engineering.com/posts/rl-quantized-training/)
- [생성 확률과 학습 확률이 달라지는 이유](https://ai-systems-engineering.com/posts/rl-probability-mismatch/)
- [비동기 RL과 오래된 데이터](https://ai-systems-engineering.com/posts/rl-async-staleness/)
- [RL 롤아웃의 추론 최적화](https://ai-systems-engineering.com/posts/rl-rollout-inference/)
- [에이전트 전체를 보고 스케줄링하기](https://ai-systems-engineering.com/posts/rl-program-scheduling/)
- [새 가중치를 추론 엔진으로 전달하기](https://ai-systems-engineering.com/posts/rl-weight-sync/)
- [LLM RL 총정리: 토큰의 선택에서 시스템의 순환까지](https://ai-systems-engineering.com/posts/rl-summary/)
