import {test, expect} from '@playwright/test';

for (const locale of ['ko', 'en']) {
  test(`${locale}: GPU execution article preserves ranges and localized figures`, async ({page}) => {
    const prefix = locale === 'en' ? '/en' : '';
    await page.goto(`${prefix}/posts/gpu-execution-and-warp-scheduling/`);
    const prose = page.locator('.prose');
    await expect(prose.locator('h2')).toHaveCount(7);
    await expect(prose.locator('del')).toHaveCount(0);
    await expect(prose).not.toContainText('**');
    for (const range of locale === 'ko' ? ['0~127', '128~255', '0~31', '32~63'] : ['0–127', '128–255', '0–31', '32–63']) {
      await expect(prose).toContainText(range);
    }
    await expect(prose).toContainText('i = 1 × 128 + 0 = 128');
    const images = prose.locator('img');
    await expect(images).toHaveCount(7);
    for (const image of await images.all()) {
      await expect(image).toHaveAttribute('src', new RegExp(`/images/gpu-execution-and-warp-scheduling/${locale === 'en' ? 'en/' : ''}0[1-7]-[^/]+\\.png$`));
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth === 2400)).toBe(true);
    }
  });
}
