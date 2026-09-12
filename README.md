# LLM Systems Engineering

**한국어** | [English](README.en.md)

모델·하드웨어·워크로드라는 세 가지 관점으로 LLM 실행 시스템을 이해하는 학습 자료입니다.

공통 → 추론 → 학습(Pretraining·SFT) → RL 기반 Post-training 순서로 원리, 실행 과정, 성능 측정과 최적화를 다룹니다.

글과 그림은 [홈페이지](https://llm-systems-engineering.pages.dev/)에서, 관련 실습 코드는 이 저장소에서 제공합니다. 한국어 원문과 영어 번역을 함께 제공합니다.

## 글 목록

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
