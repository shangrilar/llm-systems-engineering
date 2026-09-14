import { test, expect } from '@playwright/test';

for (const locale of ['ko', 'en']) {
  test(`${locale}: FlashAttention steps preserve navigation and localized originals`, async ({ page }) => {
    const prefix = locale === 'en' ? '/en' : '';
    const base = `/images/flash-attention/${locale === 'en' ? 'en/' : ''}`;
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${prefix}/posts/flash-attention/`);
    await expect(page.locator('.prose h2')).toHaveCount(4);
    await expect(page.locator('.prose img')).toHaveCount(4);
    await expect(page.locator('.prose')).toContainText('FlashAttention-2');
    await expect(page.locator('#caption, .step-caption')).toHaveCount(0);
    const step = page.locator('[data-steps]');
    const image = page.locator('[data-stage]');
    await image.scrollIntoViewIfNeeded();
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (let n = 0; n < 9; n++) {
        const slug = `03-step-${String(n + 1).padStart(2, '0')}`;
        await step.selectOption(slug);
        await expect(image).toHaveAttribute('src', base + slug + '.svg');
        await image.evaluate((e: HTMLImageElement) => e.decode());
        await expect(page.locator('[data-stage-link]')).toHaveAttribute('href', base + slug + '.svg');
        await expect(page.locator('[data-png]')).toHaveAttribute('href', base + slug + '.png');
        expect(await page.locator('[data-prev]').isDisabled()).toBe(n === 0);
        expect(await page.locator('[data-next]').isDisabled()).toBe(n === 8);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
    await page.locator('[data-reset]').click();
    await expect(step).toHaveValue('03-step-01');
    await page.locator('[data-next]').click();
    await expect(step).toHaveValue('03-step-02');
    await page.locator('[data-prev]').click();
    await expect(step).toHaveValue('03-step-01');
    await page.locator('[data-next]').focus();
    await page.keyboard.press('Space');
    await expect(step).toHaveValue('03-step-02');
    const popupPromise = page.waitForEvent('popup');
    await page.locator('[data-stage-link]').click();
    const popup = await popupPromise;
    await popup.waitForURL('**/' + '03-step-02.svg');
    await expect(popup.locator('svg')).toBeVisible();
    await popup.close();
    await page.locator(`.prose a[href="${prefix}/figures/flash-attention/"]`).click();
    await expect(page.locator('[data-steps] option')).toHaveCount(9);
    await page.locator('[data-next]').click();
    await expect(step).toHaveValue('03-step-02');
    expect(errors).toEqual([]);
  });
}
