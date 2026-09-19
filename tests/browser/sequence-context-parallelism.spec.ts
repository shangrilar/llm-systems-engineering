import { test, expect } from '@playwright/test';
import data from '../../src/data/sp-cp-steps.json' with { type: 'json' };
import ppData from '../../src/data/pp-steps.json' with { type: 'json' };
import epData from '../../src/data/ep-steps.json' with { type: 'json' };

for (const locale of ['ko', 'en'] as const) {
  for (const article of ['sp', 'cp', 'pp', 'ep'] as const) {
    const slug = article === 'sp' ? 'sequence-parallelism' : article === 'cp' ? 'context-parallelism' : article === 'pp' ? 'pipeline-parallelism' : 'expert-parallelism';
    const figures = article === 'ep' ? epData[locale] : article === 'pp' ? ppData[locale] : data[locale][article];
    const route = `${locale === 'en' ? '/en' : ''}/posts/${slug}/`;
    test(`${locale}: ${article} figures preserve states and responsive controls`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('.prose del, .prose s')).toHaveCount(0);
      await expect(page.locator('[data-sp-cp-steps]')).toHaveCount(article === 'cp' ? 5 : 4);
      for (const width of [360, 768, 1280]) {
        await page.setViewportSize({ width, height: 960 });
        for (const [figure, frames] of Object.entries(figures)) {
          const player = page.locator(`#figure-${figure}`);
          const interactive = frames.length > 1;
          if (interactive) await player.locator('[data-reset]').click();
          for (let n = 0; n < frames.length; n++) {
            if (n) await player.locator('[data-next]').click();
            const src = `/images/${slug}/${locale === 'en' ? 'en/' : ''}${frames[n].slug}.svg`;
            await expect(player.locator('[data-stage]')).toHaveAttribute('src', src);
            await expect(player.locator('[data-stage]')).toHaveAttribute('alt', frames[n].alt);
            await expect(player.locator('[data-stage-link]')).toHaveAttribute('href', src);
            await expect(player.locator('[data-status]')).toHaveText(frames[n].label);
            await player.locator('[data-stage]').scrollIntoViewIfNeeded();
            await player.locator('[data-stage]').evaluate((img: HTMLImageElement) => img.decode());
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
            if (interactive) {
              expect(await player.locator('[data-prev]').isDisabled()).toBe(n === 0);
              expect(await player.locator('[data-next]').isDisabled()).toBe(n === frames.length - 1);
            }
          }
          if (interactive) {
            await player.locator('[data-prev]').click();
            await expect(player.locator('select')).toHaveValue(frames.at(-2)!.slug);
            await player.locator('select').selectOption(frames[1].slug);
            await expect(player.locator('[data-status]')).toHaveText(frames[1].label);
            await player.locator('[data-reset]').click();
          } else await expect(player.locator('button')).toHaveCount(0);
        }
      }
      const player = page.locator(article === 'pp' ? '#figure-4' : '#figure-3');
      await player.locator('[data-next]').focus();
      await page.keyboard.press('Space');
      await expect(player.locator('select')).toHaveValue(`${article}-03-step-1`);
      if (article === 'pp') {
        await expect(page.locator('.prose h2')).toHaveCount(5);
        await expect(page.locator('#figure-1 select')).toHaveValue('pp-01-step-0');
      }
      if (article === 'ep') {
        await expect(page.locator('.prose h2')).toHaveCount(5);
        await expect(page.locator('#figure-2 select')).toHaveValue('ep-02-step-0');
      }
      if (article === 'cp') await expect(page.locator('#figure-4 select')).toHaveValue('cp-04-step-0');
      const opened = page.waitForEvent('popup');
      await player.locator('[data-stage-link]').click();
      const popup = await opened;
      await expect(popup.locator('svg')).toBeVisible();
      await popup.close();
    });
    test(`${locale}: ${article} figures remain accessible without JavaScript`, async ({ browser }) => {
      const page = await browser.newPage({ javaScriptEnabled: false, baseURL: test.info().project.use.baseURL });
      await page.goto(route);
      for (const [figure, frames] of Object.entries(figures)) {
        const player = page.locator(`#figure-${figure}`);
        if (frames.length > 1) await expect(player.locator('[data-next]')).toBeDisabled();
        const href = (await player.locator('.step-info a').getAttribute('href'))!;
        expect((await page.request.get(href)).status()).toBe(200);
      }
      await page.close();
    });
  }
}
