# LLM Systems Engineering

모델·하드웨어·워크로드로 배우는 한국어 LLM 시스템 엔지니어링.

기초 → 추론 → 학습(Pretraining·SFT) → RL 기반 Post-training 순서로 학습합니다.

설명과 시각화는 홈페이지에서, 실행 코드는 이 저장소에서 확인합니다.

## 홈페이지

[홈페이지에서 읽기](https://llm-systems-engineering.pages.dev)

## 학습 목차

첫 글 준비 중.

## 로컬 실행

Node 22.22.1 기준입니다.

```sh
npm ci
npm run dev
```

빌드: `npm run build` · 결과: `dist/`

## 발행

새 글은 브랜치와 Draft PR에서 작성하고, 미리보기 확인 후 main에 병합합니다.
[작업 지침](AGENTS.md) · [Cloudflare 연동](docs/cloudflare-setup.md)
