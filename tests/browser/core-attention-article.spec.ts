import { test, expect } from '@playwright/test';

const slug = 'core-attention';
for (const locale of ['ko', 'en']) {
  test(`${locale}: core attention article, five figures and navigation`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const prefix = locale === 'en' ? '/en' : '';
    const route = `${prefix}/posts/${slug}/`;
    await page.goto(`${prefix}/posts/attention-projections/`);
    await page.locator(`article nav a[href="${route}"]`).click();
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('article h1')).toHaveText(locale === 'ko'
      ? 'Core Attention: 토큰 사이의 정보 조합하기'
      : 'Core Attention: Combining Information Across Tokens');
    await expect(page.locator('article header [role="status"]')).toHaveCount(0);
    await expect(page.locator('.prose h2')).toHaveCount(5);
    await expect(page.locator('.prose img')).toHaveCount(5);
    await expect(page.locator('.prose')).toContainText('P = softmax(S / √dh + M)');
    await expect(page.locator('.prose')).not.toContainText('**');
    await expect(page.locator('article nav a').first()).toHaveAttribute('href', `${prefix}/posts/attention-projections/`);
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
    }
    const other = locale === 'ko' ? 'en' : 'ko';
    await page.getByRole('combobox').selectOption(`${other === 'en' ? '/en' : ''}/posts/${slug}/`);
    await expect(page.locator('html')).toHaveAttribute('lang', other);
    expect(errors).toEqual([]);
  });
}
