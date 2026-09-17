import { it, expect } from "vitest";
import { revision, validateArticles, type Article } from "../scripts/content";
import { home, localeFromPath, postUrl } from "../src/i18n/index";
import { groupArticles, classificationLabel } from "../src/data/classification";
const source = "원문\n";
const article = (): Article => ({
  articleId: "test",
  order: 1,
  date: "2026-09-06",
  track: "shared",
  category: null,
  locales: {
    ko: { slug: "test", title: "제목", description: "설명", published: true },
    en: {
      slug: "test",
      title: "Title",
      description: "Description",
      published: true,
      sourceRevision: revision(source, []),
      translationStatus: "reviewed",
    },
  },
});
it("routes Korean without a prefix and English with one", () => {
  expect(home("ko")).toBe("/");
  expect(postUrl("en", "test")).toBe("/en/posts/test/");
  expect(localeFromPath("/english")).toBe("ko");
});
it("blocks missing/stale translation in production but reports preview status", () => {
  expect(validateArticles([article()], "production", () => source)).toEqual([]);
  const a = article();
  a.locales.en!.sourceRevision = "old";
  expect(() => validateArticles([a], "production", () => source)).toThrow();
  expect(validateArticles([a], "preview", () => source)).toHaveLength(1);
  delete a.locales.en;
  expect(() => validateArticles([a], "production", () => source)).toThrow();
});
it("normalizes line endings while preserving equations", () => {
  expect(revision("A  \r\n", [])).toBe(revision("A\n", []));
  expect(revision("a + b", [])).not.toBe(revision("a - b", []));
});
it("uses shared classification IDs and keeps inserted articles in reading order", () => {
  const first = { ...article(), articleId: 'first', category: 'hardware' as const };
  const last = { ...first, articleId: 'last', order: 3 };
  const inserted = { ...first, articleId: 'inserted', order: 2 };
  expect(groupArticles([last, first, inserted])[0].categories[0].articles.map(a => a.articleId))
    .toEqual(['first', 'inserted', 'last']);
  expect(classificationLabel(first, 'ko')).toBe('공통 · 하드웨어');
  expect(classificationLabel(first, 'en')).toBe('Shared Concepts · Hardware');
  expect(classificationLabel(article(), 'en')).toBe('Shared Concepts');
  const overview = { ...article(), order: 4 };
  expect(groupArticles([first, overview])[0].categories.map(group => group.category))
    .toEqual([null, 'hardware']);
  for (const invalid of [{ track: '공통' }, { category: 'Hardware' }, { category: undefined }]) {
    expect(() => validateArticles([{ ...article(), ...invalid } as Article], 'production', () => source))
      .toThrow('Invalid article classification');
  }
});
