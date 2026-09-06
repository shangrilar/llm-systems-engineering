import { readFileSync, writeFileSync } from 'node:fs';
const config = JSON.parse(readFileSync('site.config.json', 'utf8'));
const posts = JSON.parse(readFileSync('src/data/posts.json', 'utf8'));
const lines = posts.map(p => config.url ? `- [${p.title}](${config.url.replace(/\/$/, '')}/posts/${p.slug}/) — ${p.track}` : `- ${p.title} — ${p.track} (Cloudflare 연동 후 홈페이지 링크 연결)`);
const text = `# LLM Systems Engineering

모델·하드웨어·워크로드로 배우는 한국어 LLM 시스템 엔지니어링.

기초 → 추론 → 학습(Pretraining·SFT) → RL 기반 Post-training 순서로 학습합니다.

설명과 시각화는 홈페이지에서, 실행 코드는 이 저장소에서 확인합니다.

## 홈페이지

${config.url ? `[홈페이지에서 읽기](${config.url})` : 'Cloudflare Pages 연동 준비 중입니다. 실제 배포 주소가 정해지면 이곳에 연결합니다.'}

## 학습 목차

${lines.join('\n') || '첫 글 준비 중.'}

## 로컬 실행

Node 22.22.1 기준입니다.

\`\`\`sh
npm ci
npm run dev
\`\`\`

빌드: \`npm run build\` · 결과: \`dist/\`

## 발행

새 글은 브랜치와 Draft PR에서 작성하고, 미리보기 확인 후 main에 병합합니다.
[작업 지침](AGENTS.md) · [Cloudflare 연동](docs/cloudflare-setup.md)
`;
writeFileSync('README.md', text);
