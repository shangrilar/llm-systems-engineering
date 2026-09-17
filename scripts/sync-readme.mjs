import { groupArticles, tracks, categories } from '../src/data/classification.ts';
import { readFileSync, writeFileSync } from 'node:fs';
const config = JSON.parse(readFileSync('site.config.json', 'utf8'));
const posts = JSON.parse(readFileSync('src/data/posts.json', 'utf8'));
const base = config.url.replace(/\/$/, '');
for (const locale of ['ko', 'en']) {
  const korean = locale === 'ko';
  const prefix = korean ? '' : '/en';
  const visible = posts.filter(p => p.locales[locale] && (p.locales[locale].published || p.previewUrl));
  const articles = groupArticles(visible).map(group => {
    const sections = group.categories.map(section => {
      const links = section.articles.map(p => {
        const article = p.locales[locale];
        const articleBase = article.published ? base : p.previewUrl.replace(/\/$/, '');
        const status = article.published ? '' : (korean ? ' · 초안 미리보기' : ' · Draft preview');
        return `- [${article.title}](${articleBase}${prefix}/posts/${article.slug}/)${status}`;
      }).join('\n');
      return (section.category ? `#### ${categories[section.category][locale]}\n\n` : '') + links;
    }).join('\n\n');
    return `### ${tracks[group.track][locale]}\n\n${sections}`;
  }).join('\n\n');
  const startingPoints = ['embedding-to-lm-head', 'gpu-architecture', 'gpu-arithmetic-intensity-and-fusion']
    .map(id => posts.find(post => post.articleId === id)?.locales[locale])
    .filter(article => article?.published)
    .map(article => `- [${article.title}](${base}${prefix}/posts/${article.slug}/)`)
    .join('\n');
  const text = `# LLM Systems Engineering

${korean ? '[English](README.md) | **한국어**' : '**English** | [한국어](README.ko.md)'}

${korean
  ? '모델 내부 구조, GPU 실행, 성능과 최적화를 그림과 함께 단계적으로 배우는 LLM 시스템 엔지니어링 가이드입니다.'
  : 'An illustrated guide to LLM systems engineering: model internals, GPU execution, and performance, explained step by step.'}

${korean
  ? '현재 모델과 GPU의 기초를 다루는 글을 제공합니다. 학습 로드맵은 기초 → 추론 → 학습(Pretraining·SFT) → RL 기반 Post-training으로 이어집니다.'
  : 'Start with the available articles on model and GPU fundamentals. The learning roadmap continues into inference, training (pretraining and SFT), and RL-based post-training.'}

${korean
  ? '[한국어 글 읽기](' + base + '/) · [영어 글 읽기](' + base + '/en/)\n\n한국어와 영어로 제공합니다. 아래 목차에서 개별 글과 그림을 읽을 수 있습니다.'
  : '[Read in English](' + base + '/en/) · [한국어로 읽기](' + base + '/)\n\nAvailable in English and Korean. Browse the articles and diagrams below.'}

${startingPoints ? `## ${korean ? '여기서 시작하세요' : 'Start here'}\n\n${startingPoints}\n\n` : ''}## ${korean ? '전체 글 목록' : 'All articles'}

${articles || (korean ? '첫 글을 준비하고 있습니다.' : 'The first article is in preparation.')}
`;
  writeFileSync(korean ? 'README.ko.md' : 'README.md', text);
}

writeFileSync('README.en.md', '# LLM Systems Engineering\n\nThe English guide is now the [main README](README.md).\n\n[Read articles in English](' + base + '/en/) · [한국어](README.ko.md)\n');
