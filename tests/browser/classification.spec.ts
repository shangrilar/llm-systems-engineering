import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import type { Article } from '../../scripts/content';
const catalog: Article[] = JSON.parse(readFileSync('src/data/posts.json', 'utf8'));

for (const locale of ['ko', 'en'] as const) {
  test(`${locale}: grouped catalog and article classification`, async ({ page }) => {
    const prefix = locale === 'en' ? '/en' : '';
    await page.goto(`${prefix}/`);
    await expect(page.locator('.article-track > h3')).toHaveText(locale === 'ko' ? ['공통', '추론'] : ['Shared Concepts', 'Inference']);
    for (const track of ['shared', 'inference']) {
      const group = page.locator(`[data-track="${track}"]`);
      const categories = track === 'shared' ? [null, 'model', 'hardware', 'workload'] : ['workload'];
      const labels = track === 'shared'
        ? (locale === 'ko' ? ['모델', '하드웨어', '워크로드'] : ['Models', 'Hardware', 'Workloads'])
        : [locale === 'ko' ? '워크로드' : 'Workloads'];
      await expect(group.locator('.article-category > h4')).toHaveText(labels);
      for (const category of categories) {
        const expected = catalog.filter(p => p.track === track && p.category === category && p.locales[locale]?.published)
          .sort((a, b) => a.order - b.order).map(p => `${prefix}/posts/${p.locales[locale]!.slug}/`);
        const links = group.locator(`[data-category="${category ?? 'overview'}"] .post-link`);
        expect(await links.evaluateAll(es => es.map(e => e.getAttribute('href')))).toEqual(expected);
      }
    }
    await expect(page.locator('.post-link')).toHaveCount(catalog.filter(p => p.locales[locale]?.published).length);
    await mkdir('test-results/classification', { recursive: true });
    for (const width of [360, 1280]) {
      await page.setViewportSize({ width, height: 960 });
      await page.locator('[data-category="hardware"] > h4').scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/classification/${locale}-${width}.png` });
    }
    const slug = 'gpu-communication-engines';
    await page.locator(`.post-link[href="${prefix}/posts/${slug}/"]`).click();
    await expect(page.locator('.article-header .eyebrow')).toContainText(locale === 'ko' ? '공통 · 하드웨어' : 'Shared Concepts · Hardware');
    await expect(page.locator('article nav:not(.article-toc) a').last()).toHaveAttribute('href', `${prefix}/posts/gpu-network-data-path/`);
    await page.goto(`${prefix}/posts/inference-kv-cache/`);
    await expect(page.locator('.article-header .eyebrow')).toContainText(locale === 'ko' ? '추론 · 워크로드' : 'Inference · Workloads');
    await expect(page.locator('article nav:not(.article-toc) a')).toHaveCount(1);
    await expect(page.locator('article nav:not(.article-toc) a').first()).toHaveAttribute('href', `${prefix}/posts/inference-and-training/`);
  });
}
