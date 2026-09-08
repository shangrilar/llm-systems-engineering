import { it, expect } from "vitest";
import { revision, validateArticles, type Article } from "../scripts/content";
import { home, localeFromPath, postUrl } from "../src/i18n/index";
const source = "원문\n";
const article = (): Article => ({
  articleId: "test",
  order: 1,
  date: "2026-09-06",
  track: "기초",
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
