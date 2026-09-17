import type { Article } from '../../scripts/content';
import type { Locale } from '../i18n/index';

export const tracks = {
  shared: { ko: '공통', en: 'Shared Concepts' },
  inference: { ko: '추론', en: 'Inference' },
  training: { ko: '학습', en: 'Training' },
  rl: { ko: 'RL', en: 'RL' },
};
export const categories = {
  model: { ko: '모델', en: 'Models' },
  hardware: { ko: '하드웨어', en: 'Hardware' },
  workload: { ko: '워크로드', en: 'Workloads' },
};
export type Track = keyof typeof tracks;
export type Category = keyof typeof categories;

export function classificationLabel(article: Article, locale: Locale) {
  return [tracks[article.track][locale], article.category && categories[article.category][locale]]
    .filter(Boolean).join(' · ');
}

// Both the website and README use the same grouping and reading order.
export function groupArticles(articles: Article[]) {
  const groups = new Map<Track, Map<Category | null, Article[]>>();
  for (const article of [...articles].sort((a, b) => a.order - b.order)) {
    if (!groups.has(article.track)) groups.set(article.track, new Map());
    const group = groups.get(article.track)!;
    if (!group.has(article.category)) group.set(article.category, []);
    group.get(article.category)!.push(article);
  }
  return [...groups].map(([track, group]) => ({
    track,
    categories: [...group]
      .sort(([a], [b]) => Number(b === null) - Number(a === null))
      .map(([category, articles]) => ({ category, articles })),
  }));
}
