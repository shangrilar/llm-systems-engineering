import { readFileSync, writeFileSync } from 'node:fs';
const config = JSON.parse(readFileSync('site.config.json', 'utf8'));
const posts = JSON.parse(readFileSync('src/data/posts.json', 'utf8'));
const base = config.url.replace(/\/$/, '');
for (const locale of ['ko', 'en']) {
  const korean = locale === 'ko';
  const prefix = korean ? '' : '/en';
  const lines = posts.filter(p => p.locales[locale]?.published)
    .sort((a, b) => a.order - b.order)
    .map(p => `- [${p.locales[locale].title}](${base}${prefix}/posts/${p.locales[locale].slug}/)`);
  const text = `# LLM Systems Engineering

${korean ? '**한국어** | [English](README.en.md)' : '[한국어](README.md) | **English**'}

${korean
  ? '모델·하드웨어·워크로드라는 세 가지 관점으로 LLM 실행 시스템을 이해하는 학습 자료입니다.'
  : 'Learning materials for understanding LLM execution systems through three perspectives: models, hardware, and workloads.'}

${korean
  ? '공통 → 추론 → 학습(Pretraining·SFT) → RL 기반 Post-training 순서로 원리, 실행 과정, 성능 측정과 최적화를 다룹니다.'
  : 'The series covers principles, execution, performance measurement, and optimization in this order: shared concepts → inference → training (pretraining and SFT) → RL-based post-training.'}

${korean
  ? '글과 그림은 [홈페이지](' + base + '/)에서, 관련 실습 코드는 이 저장소에서 제공합니다. 한국어 원문과 영어 번역을 함께 제공합니다.'
  : 'Read articles and figures on the [website](' + base + '/en/). Related example code belongs in this repository. Articles are written in Korean with English translations.'}

## ${korean ? '글 목록' : 'Articles'}

${lines.join('\n') || (korean ? '첫 글을 준비하고 있습니다.' : 'The first article is in preparation.')}
`;
  writeFileSync(korean ? 'README.md' : 'README.en.md', text);
}
