import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const slug = 'residual-and-rmsnorm';
for (const locale of ['ko', 'en']) {
  test(`${locale}: residual article, four figures, full-size images and language switch`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const prefix = locale === 'en' ? '/en' : '';
    const route = `${prefix}/posts/${slug}/`;
    await page.goto(`${prefix}/`);
    await page.locator(`a.post-link[href="${route}"]`).click();
    await expect(page.locator('article h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('article header [role="status"]')).toHaveCount(0);
    await expect(page.locator('.prose h2')).toHaveCount(4);
    await expect(page.locator('.prose img')).toHaveCount(4);
    await expect(page.locator('.prose')).toContainText('γ');
    await expect(page.locator('.prose')).toContainText('T × d');
    await expect(page.locator('.prose')).not.toContainText('**');
    await expect(page.locator('article nav a').first()).toHaveAttribute('href', `${prefix}/posts/embedding-to-lm-head/`);
    await expect(page.locator('nav[aria-label="Previous and next articles"], nav[aria-label="이전과 다음 글"] a').first()).toBeVisible();
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const img of await page.locator('.prose img').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toBeVisible();
        expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth === 2400)).toBe(true);
        const src = await img.getAttribute('src');
        expect(src).toContain(`/images/${slug}/${locale === 'en' ? 'en/' : ''}`);
        await expect(img.locator('..')).toHaveAttribute('href', src!);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await mkdir('test-results/residual-article', { recursive: true });
      await page.screenshot({ path: `test-results/residual-article/${locale}-${width}.png`, fullPage: true });
    }
    const other = locale === 'ko' ? 'en' : 'ko';
    await page.getByRole('combobox').selectOption(`${other === 'en' ? '/en' : ''}/posts/${slug}/`);
    await expect(page).toHaveURL(new RegExp(`${other === 'en' ? '/en' : ''}/posts/${slug}/$`));
    await expect(page.locator('html')).toHaveAttribute('lang', other);
    expect(errors).toEqual([]);
  });
}
