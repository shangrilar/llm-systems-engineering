import { test, expect } from '@playwright/test';
import steps from '../../src/data/ring-tree-steps.json' with { type: 'json' };

for (const locale of ['ko', 'en'] as const) {
  test(`${locale}: Ring and Tree controls navigate independently through every state`, async ({ page }) => {
    const base = `/images/collective-ring-tree/${locale === 'en' ? 'en/' : ''}`;
    await page.goto(`${locale === 'en' ? '/en' : ''}/posts/collective-ring-tree/`);
    const players = page.locator('[data-communication-steps]');
    await expect(players).toHaveCount(3);
    for (const width of [360, 1280]) {
      await page.setViewportSize({ width, height: 960 });
      for (const figure of ['01', '02', '03'] as const) {
        const player = page.locator(`#figure-${Number(figure)}`);
        const frames = steps[locale][figure];
        await player.locator('[data-reset]').click();
        for (let n = 0; n < frames.length; n++) {
          if (n) await player.locator('[data-next]').click();
          await expect(player.locator('[data-stage]')).toHaveAttribute('src', base + frames[n].slug + '.svg');
          await expect(player.locator('[data-stage]')).toHaveAttribute('alt', frames[n].alt);
          await player.locator('[data-stage]').evaluate((img: HTMLImageElement) => img.decode());
          await expect(player.locator('[data-status]')).toHaveText(frames[n].label);
          expect(await player.locator('[data-prev]').isDisabled()).toBe(n === 0);
          expect(await player.locator('[data-next]').isDisabled()).toBe(n === frames.length - 1);
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        }
        await player.locator('[data-prev]').click();
        await expect(player.locator('[data-steps]')).toHaveValue(frames.at(-2)!.slug);
        await player.locator('[data-steps]').selectOption(frames[1].slug);
        await expect(player.locator('[data-stage-link]')).toHaveAttribute('href', base + frames[1].slug + '.svg');
        await player.locator('[data-reset]').click();
      }
    }
    await players.nth(0).locator('[data-next]').focus();
    await page.keyboard.press('Space');
    await expect(players.nth(0).locator('[data-steps]')).toHaveValue('01-step-1');
    await expect(players.nth(1).locator('[data-steps]')).toHaveValue('02-step-0');
    await expect(players.nth(2).locator('[data-steps]')).toHaveValue('03-step-0');
    const opened = page.waitForEvent('popup');
    await players.nth(0).locator('[data-stage-link]').click();
    const popup = await opened;
    await popup.waitForURL('**/01-step-1.svg');
    await expect(popup.locator('svg')).toBeVisible();
    await popup.close();
  });
  test(`${locale}: Ring and Tree retain an overview without JavaScript`, async ({ browser }) => {
    const page = await browser.newPage({ javaScriptEnabled: false, baseURL: test.info().project.use.baseURL });
    await page.goto(`${locale === 'en' ? '/en' : ''}/posts/collective-ring-tree/`);
    const players = page.locator('[data-communication-steps]');
    for (let i = 0; i < 3; i++) {
      await expect(players.nth(i).locator('[data-next]')).toBeDisabled();
      const overview = players.nth(i).locator('.step-info a');
      expect((await page.request.get((await overview.getAttribute('href'))!)).status()).toBe(200);
    }
    await page.close();
  });
}
