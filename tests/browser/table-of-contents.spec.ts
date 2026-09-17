import {test, expect} from '@playwright/test';
import catalog from '../../src/data/posts.json' with {type: 'json'};

// The contents and anchor navigation must also work without client-side JavaScript.
test.use({javaScriptEnabled: false, reducedMotion: 'reduce'});

for (const locale of ['ko', 'en'] as const) {
  const tocName = locale === 'ko' ? '목차' : 'On this page';
  const backName = locale === 'ko' ? '목차로 돌아가기 ↑' : 'Back to contents ↑';
  const prefix = locale === 'en' ? '/en' : '';

  test(`${locale}: every published article links to its own section headings`, async ({page}) => {
    for (const article of catalog) {
      const entry = article.locales[locale];
      if (!entry?.published) continue;
      await page.goto(`${prefix}/posts/${entry.slug}/`);
      const headings = await page.locator('.prose h2').evaluateAll(nodes =>
        nodes.map(node => ({id: node.id, text: node.textContent?.trim()})));
      const toc = page.getByRole('navigation', {name: tocName, exact: true});
      if (headings.length < 3) {
        await expect(toc).toHaveCount(0);
        continue;
      }
      await expect(toc).toBeVisible();
      const links = await toc.getByRole('link').evaluateAll(nodes =>
        nodes.map(node => ({id: node.getAttribute('href')?.slice(1), text: node.textContent?.trim()})));
      expect(links, entry.slug).toEqual(headings);
      expect(new Set(links.map(link => link.id)).size, entry.slug).toBe(links.length);
      await expect(page.getByRole('link', {name: backName, exact: true})).toHaveAttribute('href', '#article-toc');
    }
  });

  test(`${locale}: long headings, keyboard jump and return on mobile and desktop`, async ({page}) => {
    await page.goto(`${prefix}/posts/gpu-execution-and-warp-scheduling/`);
    const toc = page.getByRole('navigation', {name: tocName, exact: true});
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({width, height: 900});
      await toc.scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const links = toc.getByRole('link');
      const last = links.last();
      const hash = await last.getAttribute('href');
      await last.focus();
      await last.press('Enter');
      await expect.poll(() => new URL(page.url()).hash).toBe(encodeURI(hash!));
      const target = page.locator('.prose h2').last();
      await expect(target).toBeInViewport();
      expect((await target.boundingBox())!.y).toBeGreaterThanOrEqual(0);
      await page.getByRole('link', {name: backName, exact: true}).click();
      await expect(page).toHaveURL(/#article-toc$/);
      await expect(toc).toBeInViewport();
      await page.screenshot({path: `test-results/toc-${locale}-${width}.png`});
    }
  });
}
