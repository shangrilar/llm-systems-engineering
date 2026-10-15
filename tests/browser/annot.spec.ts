import {test,expect} from '@playwright/test';
import {readdirSync,readFileSync} from 'node:fs';
// Every figure cut into crops by <Annot> must show loaded images whose crops stay inside the image,
// switch between desktop and mobile crops, and link the header to the versioned full-size PNG.
const slugs=readdirSync('src/pages/posts').filter(f=>f.endsWith('.mdx')&&readFileSync('src/pages/posts/'+f,'utf8').includes('<Annot ')).map(f=>f.replace(/\.mdx$/,''));
for(const slug of slugs)for(const locale of ['ko','en'])for(const width of [1280,390])
  test(`${locale} ${width}px: annot figures in ${slug}`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto(`${locale==='en'?'/en':''}/posts/${slug}/`);
    const figures=page.locator('figure.annot');
    expect(await figures.count()).toBeGreaterThan(0);
    for(const fig of await figures.all()){
      await fig.scrollIntoViewIfNeeded();
      await expect(fig.locator('a.annot-head')).toHaveAttribute('href',new RegExp(`/images/[a-z0-9-]+/${locale==='en'?'en/':''}[a-z0-9-]+\\.png\\?v=[0-9a-f]{12}$`));
      const crops=fig.locator('.annot-crop');
      let visible=0;
      for(const crop of await crops.all()){
        if(!await crop.isVisible())continue;
        visible++;
        await crop.locator('img').scrollIntoViewIfNeeded();
        const r=await crop.evaluate((c:HTMLElement)=>{const i=c.querySelector('img')!;const a=c.getBoundingClientRect(),b=i.getBoundingClientRect();
          return {loaded:i.complete&&i.naturalWidth>0,mobileSrc:i.src.includes('-mobile.png'),cw:a.width,ch:a.height,inside:b.left<=a.left+1&&b.top<=a.top+1&&b.right>=a.right-1&&b.bottom>=a.bottom-1};});
        expect(r.loaded).toBe(true);
        expect(r.cw).toBeGreaterThan(100);expect(r.ch).toBeGreaterThan(30);
        expect(r.inside).toBe(true);
        if(width>600)expect(r.mobileSrc).toBe(false);
      }
      // Header plus at least one region, and never both screens' crops at once.
      expect(visible).toBeGreaterThanOrEqual(2);
      expect(visible).toBeLessThanOrEqual(await fig.locator('.annot-part').count()+1);
    }
  });
