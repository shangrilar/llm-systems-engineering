import { test, expect } from '@playwright/test';

for (const locale of ['ko', 'en']) {
  test(`${locale}: RoPE figures, native equations and self-hosted math font`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const prefix = locale === 'en' ? '/en' : '';
    const route = `${prefix}/posts/rope/`;
    await page.goto(`${prefix}/posts/core-attention/`);
    await page.locator(`article nav a[href="${route}"]`).click();
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('article h1')).toHaveText(locale === 'ko'
      ? 'RoPE: 토큰 위치를 Attention에 반영하기'
      : 'RoPE: Incorporating Token Positions into Attention');
    await expect(page.locator('article header [role="status"]')).toHaveCount(0);
    await expect(page.locator('.prose h2')).toHaveCount(6);
    await expect(page.locator('.prose img')).toHaveCount(6);
    await expect(page.locator('.prose math')).toHaveCount(3);
    await expect(page.locator('.prose')).not.toContainText('**');
    await expect(page.locator('article nav a').first()).toHaveAttribute('href', `${prefix}/posts/core-attention/`);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => [...document.fonts].some(font =>
      font.family.includes('LLM Math') && font.status === 'loaded'))).toBe(true);
    expect(await page.evaluate(() => performance.getEntriesByType('resource').some(r =>
      r.name.includes('stix-two-math') && r.name.endsWith('.woff2')))).toBe(true);
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const img of await page.locator('.prose img').all()) {
        await img.scrollIntoViewIfNeeded();
        expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth === 2400)).toBe(true);
        const src = await img.getAttribute('src');
        expect(src).toContain(`/images/rope/${locale === 'en' ? 'en/' : ''}`);
        await expect(img.locator('..')).toHaveAttribute('href', src!);
      }
      for (const math of await page.locator('.prose math').all()) {
        await expect(math).toHaveAttribute('aria-label', /.+/);
        expect(await math.evaluate(el => el.namespaceURI)).toBe('http://www.w3.org/1998/Math/MathML');
        expect(await math.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
      }
      const matrix = page.locator('.prose math').last();
      const fence = matrix.locator('mo').first();
      expect((await fence.boundingBox())!.height).toBeGreaterThan(35);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const other = locale === 'ko' ? 'en' : 'ko';
    await page.getByRole('combobox').selectOption(`${other === 'en' ? '/en' : ''}/posts/rope/`);
    await expect(page.locator('html')).toHaveAttribute('lang', other);
    expect(errors).toEqual([]);
  });
}
