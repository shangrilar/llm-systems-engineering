import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
export type Translation = {
  slug: string;
  title: string;
  description: string;
  published: boolean;
  sourceRevision?: string;
  translationStatus?: "draft" | "reviewed";
  reviewNote?: string;
};
export type Article = {
  articleId: string;
  order: number;
  track: string;
  date: string;
  locales: { ko: Translation; en?: Translation };
  figureIds?: string[];
};
export const revision = (source: string, figures: unknown) =>
  createHash("sha256")
    .update(
      source
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((l) => l.trimEnd())
        .join("\n") +
        "\n" +
        JSON.stringify(figures),
    )
    .digest("hex");
export function validateArticles(
  articles: Article[],
  profile: string,
  read: (locale: string, slug: string) => string,
  figureRevision: (id: string) => string = () => "",
) {
  const ids = new Set<string>(),
    routes = new Set<string>(),
    warnings: string[] = [];
  for (const a of articles) {
    if (!/^[a-z0-9-]+$/.test(a.articleId) || ids.has(a.articleId))
      throw Error("Invalid article ID");
    ids.add(a.articleId);
    if (!Number.isFinite(a.order) || !a.locales.ko)
      throw Error("Invalid article metadata");
    for (const [locale, t] of Object.entries(a.locales)) {
      if (
        !["ko", "en"].includes(locale) ||
        !/^[a-z0-9-]+$/.test(t.slug) ||
        !t.title ||
        !t.description
      )
        throw Error("Invalid locale metadata");
      const path = locale + "/" + t.slug;
      if (routes.has(path)) throw Error("Duplicate route");
      routes.add(path);
      read(locale, t.slug);
    }
    const source = revision(
      read("ko", a.locales.ko.slug),
      (a.figureIds ?? []).map(figureRevision),
    );
    const en = a.locales.en;
    if (profile === "production" && a.locales.ko.published && !en?.published)
      throw Error("Bilingual publication required");
    if (en?.published && !a.locales.ko.published)
      throw Error("English requires a published Korean source");
    if (
      en?.published &&
      (en.translationStatus !== "reviewed" || en.sourceRevision !== source)
    ) {
      if (profile === "production")
        throw Error("English translation requires review: " + a.articleId);
      warnings.push("Translation draft/stale: " + a.articleId);
    }
  }
  return warnings;
}
export function buildProfile() {
  const profile =
    process.env.BUILD_PROFILE ??
    (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== "main"
      ? "preview"
      : "production");
  if (!["preview", "production"].includes(profile))
    throw Error("Invalid BUILD_PROFILE");
  return profile;
}
export function validateContent() {
  const articles = JSON.parse(
      readFileSync("src/data/posts.json", "utf8"),
    ) as Article[],
    profile = buildProfile();
  const pathFor = (locale: string, slug: string) =>
    join("src/pages", locale === "en" ? "en" : "", "posts", slug);
  const read = (locale: string, slug: string) => {
    const base = pathFor(locale, slug);
    const file = [".mdx", ".md"].map((ext) => base + ext).find(existsSync);
    if (!file) throw Error("Missing article file " + base);
    const s = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
    const header = s.match(/^---\n([\s\S]*?)\n---/);
    if (!header) throw Error("Frontmatter required");
    const a = articles.find(
      (a) => a.locales[locale as "ko" | "en"]?.slug === slug,
    )!;
    const metadata = Object.fromEntries(
      header[1].split("\n").map((l) => {
        const i = l.indexOf(":");
        return [
          l.slice(0, i).trim(),
          l
            .slice(i + 1)
            .trim()
            .replace(/^['"]|['"]$/g, ""),
        ];
      }),
    );
    if (metadata.articleId !== a.articleId)
      throw Error("Frontmatter articleId mismatch");
    const t = a.locales[locale as "ko" | "en"]!;
    for (const k of ["title", "description"] as const)
      if (metadata[k] && metadata[k] !== t[k])
        throw Error("Frontmatter/catalog mismatch: " + k);
    const used = [...s.matchAll(/<Figure\s+id=["']([^"']+)["']/g)].map(
      (m) => m[1],
    );
    if (used.some((id) => !a.figureIds?.includes(id)))
      throw Error("Figure missing from article revision inputs");
    // Hash body, not catalog-derived page metadata; structural MDX, code and equations remain intact.
    return s.slice(header[0].length);
  };
  const figureRevision = (id: string) => {
    if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(id)) throw Error("Invalid figure ID");
    const path = "src/data/figures/" + id + ".ts";
    if (!existsSync(path)) throw Error("Missing figure input");
    return readFileSync(path, "utf8");
  };
  const warnings = validateArticles(articles, profile, read, figureRevision);
  for (const locale of ["ko", "en"] as const) {
    const dir = pathFor(locale, "");
    for (const file of (existsSync(dir) ? readdirSync(dir) : []).filter((f) =>
      /\.(md|mdx)$/.test(f),
    )) {
      const slug = file.replace(/\.(md|mdx)$/, "");
      const a = articles.find((a) => a.locales[locale]?.slug === slug);
      if (!a) throw Error("Uncatalogued post route: " + file);
      if (profile === "production" && !a.locales[locale]!.published)
        throw Error("Draft route must not enter production: " + file);
    }
  }
  for (const warning of warnings) console.warn(warning);
  return { articles, warnings, profile };
}
export function translationIsStale(article: Article) {
  const en = article.locales.en;
  if (!en) return false;
  const path = join("src/pages/posts", article.locales.ko.slug);
  const file = [".mdx", ".md"].map((ext) => path + ext).find(existsSync);
  if (!file) return true;
  const body = readFileSync(file, "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/^---\n[\s\S]*?\n---/, "");
  const current = revision(
    body,
    (article.figureIds ?? []).map((id) =>
      readFileSync("src/data/figures/" + id + ".ts", "utf8"),
    ),
  );
  return en.translationStatus !== "reviewed" || en.sourceRevision !== current;
}
