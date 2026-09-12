# LLM Systems Engineering

[English](README.md) | **한국어**

모델 내부 구조, GPU 실행, 성능과 최적화를 그림과 함께 단계적으로 배우는 LLM 시스템 엔지니어링 가이드입니다.

현재 모델과 GPU의 기초를 다루는 글을 제공합니다. 학습 로드맵은 기초 → 추론 → 학습(Pretraining·SFT) → RL 기반 Post-training으로 이어집니다.

[한국어 글 읽기](https://llm-systems-engineering.pages.dev/) · [영어 글 읽기](https://llm-systems-engineering.pages.dev/en/)

한국어와 영어로 제공합니다. 아래 목차에서 개별 글과 그림을 읽을 수 있습니다.

## 여기서 시작하세요

- [LLM의 전체 구조: 임베딩 층에서 LM Head까지](https://llm-systems-engineering.pages.dev/posts/embedding-to-lm-head/)
- [GPU 구조: 연산 장치와 메모리](https://llm-systems-engineering.pages.dev/posts/gpu-architecture/)
- [GPU 최적화의 출발점: 산술 강도와 데이터 이동](https://llm-systems-engineering.pages.dev/posts/gpu-arithmetic-intensity-and-fusion/)

## 전체 글 목록

- [LLM 시스템 엔지니어링: 모델, 하드웨어, 워크로드를 연결하는 일](https://llm-systems-engineering.pages.dev/posts/llm-systems-engineering-introduction/)

### 공통

#### 모델

- [LLM의 전체 구조: 임베딩 층에서 LM Head까지](https://llm-systems-engineering.pages.dev/posts/embedding-to-lm-head/)
- [디코더 블록의 기본 흐름: Residual과 RMSNorm](https://llm-systems-engineering.pages.dev/posts/residual-and-rmsnorm/)
- [Attention과 MLP: 토큰 사이의 정보와 토큰 내부의 변환](https://llm-systems-engineering.pages.dev/posts/attention-and-mlp/)
- [Attention의 projection: Q·K·V와 멀티 헤드](https://llm-systems-engineering.pages.dev/posts/attention-projections/)
- [Core Attention: 토큰 사이의 정보 조합하기](https://llm-systems-engineering.pages.dev/posts/core-attention/)
- [RoPE: 토큰 위치를 Attention에 반영하기](https://llm-systems-engineering.pages.dev/posts/rope/)
- [MoE: 토큰마다 사용할 MLP 선택하기](https://llm-systems-engineering.pages.dev/posts/moe/)
- [모델 전체 흐름 다시 보기](https://llm-systems-engineering.pages.dev/posts/model-summary/)

#### 하드웨어

- [CPU와 GPU: 모델의 계산을 실행하는 두 장치](https://llm-systems-engineering.pages.dev/posts/cpu-and-gpu/)
- [GPU 구조: 연산 장치와 메모리](https://llm-systems-engineering.pages.dev/posts/gpu-architecture/)
- [모델 연산의 병렬성: 원소별 연산, Reduction, 행렬 곱](https://llm-systems-engineering.pages.dev/posts/model-operation-parallelism/)
- [GPU의 병렬 실행: 스레드에서 워프 스케줄링까지](https://llm-systems-engineering.pages.dev/posts/gpu-execution-and-warp-scheduling/)
- [GPU 최적화의 출발점: 산술 강도와 데이터 이동](https://llm-systems-engineering.pages.dev/posts/gpu-arithmetic-intensity-and-fusion/)
- [행렬 곱 최적화: 입력 재사용과 타일링](https://llm-systems-engineering.pages.dev/posts/matmul-tiling-and-data-reuse/)
- [Attention 최적화가 어려운 이유](https://llm-systems-engineering.pages.dev/posts/attention-memory-and-softmax/)
