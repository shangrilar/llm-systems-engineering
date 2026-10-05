import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import type {Article} from '../../scripts/content';

const catalog:Article[]=JSON.parse(readFileSync('src/data/posts.json','utf8'));
const ids=['training-prep-01-repository-runpod','training-prep-02-data-preparation','training-01-forward-backward'];

for(const locale of ['ko','en'] as const)for(const [index,id] of ids.entries()){
 test(`${locale}: ${id} reading path and static figures`,async({page})=>{
  const article=catalog.find(p=>p.articleId===id)!;
  const prefix=locale==='en'?'/en':'';
  await page.goto(`${prefix}/posts/${article.locales[locale]!.slug}/`);
  await expect(page.locator('h1')).toHaveText(article.locales[locale]!.title);
  await expect(page.locator('article [role="status"]')).toHaveCount(0);
  const figureLinks=page.locator('a[id^="figure-"]');
  await expect(figureLinks).toHaveCount(article.figureIds?.length??0);
  await expect(page.locator('figcaption')).toHaveCount(0);
  for(const width of [360,1280]){
   await page.setViewportSize({width,height:900});
   for(const image of await figureLinks.locator('img').all()){
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(img=>(img as HTMLImageElement).decode());
    const src=await image.evaluate(img=>(img as HTMLImageElement).currentSrc);
    expect(src.includes('-mobile.png')).toBe(width===360);
    expect(src).toContain(`/images/${id}/${locale==='en'?'en/':''}`);
    expect(src.includes(`/images/${id}/en/`)).toBe(locale==='en');
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   if(id==='training-01-forward-backward'){
    const cells=page.locator('.training-value-table td:not(:first-child)');
    await expect(cells).toHaveCount(6);
    for(const cell of await cells.all())await expect(cell).toHaveCSS('white-space','nowrap');
   }
  }
  const nav=page.locator('article nav[aria-label]').last();
  if(index>0)await expect(nav.locator('a').first()).toHaveAttribute('href',`${prefix}/posts/${ids[index-1]}/`);
  if(index<ids.length-1)await expect(nav.locator('a').last()).toHaveAttribute('href',`${prefix}/posts/${ids[index+1]}/`);
  await expect(page.locator(`.language-switch option[lang="${locale==='ko'?'en':'ko'}"]`)).toHaveAttribute('value',`${locale==='ko'?'/en':''}/posts/${id}/`);
  if(id==='training-prep-01-repository-runpod')await expect(page.locator('article a[href="https://runpod.io?ref=6jviazkz"]')).toHaveCount(1);
  if(id==='training-01-forward-backward')await expect(page.locator('article math')).toHaveCount(7);
 });
}
