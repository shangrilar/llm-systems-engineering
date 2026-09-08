import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const slug='llm-systems-engineering-introduction';
for(const locale of ['ko','en'])
  test(`${locale}: draft article, localized image and language navigation`,async({page})=>{
    const errors:string[]=[];
    page.on('pageerror',error=>errors.push(error.message));
    const prefix=locale==='en'?'/en':'';
    const path=`${prefix}/posts/${slug}/`;
    await page.goto(`${prefix}/`);
    await expect(page.locator('.tracks h3').first()).toHaveText(locale==='ko'?'공통':'Shared Concepts');
    await page.locator(`a.post-link[href="${path}"]`).click();
    await expect(page.locator('article h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang',locale);
    await expect(page.locator('article header')).toContainText(locale==='ko'?'초안':'Draft');
    const picture=page.locator('.prose img');
    await expect(picture).toHaveAttribute('src',new RegExp(`venn${locale==='en'?'-en':''}\\.png$`));
    for(const width of [360,768,1280]){
      await page.setViewportSize({width,height:900});
      const selector=page.getByRole('combobox');
      await expect(selector).toHaveValue(path);
      const selectBox=await selector.boundingBox();
      const brandBox=await page.locator('.brand').boundingBox();
      expect(selectBox!.x).toBeGreaterThan(brandBox!.x+brandBox!.width);
      expect(Math.abs((selectBox!.y+selectBox!.height/2)-(brandBox!.y+brandBox!.height/2))).toBeLessThan(2);
      await picture.scrollIntoViewIfNeeded();
      await expect(picture).toBeVisible();
      expect(await picture.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await expect(page.locator('.prose table tbody tr')).toHaveCount(4);
      await mkdir('test-results/articles',{recursive:true});
      await page.screenshot({path:`test-results/articles/${locale}-${width}.png`,fullPage:true});
    }
    const other=locale==='ko'?'en':'ko';
    await page.getByRole('combobox').selectOption(`${other==='en'?'/en':''}/posts/${slug}/`);
    await expect(page).toHaveURL(new RegExp(`${other==='en'?'/en':''}/posts/${slug}/$`));
    await expect(page.locator('html')).toHaveAttribute('lang',other);
    expect(errors).toEqual([]);
  });
