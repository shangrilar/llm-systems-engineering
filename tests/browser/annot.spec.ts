import {test,expect} from '@playwright/test';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
// Every figure cut into crops by <Annot> must show loaded images whose crops stay inside the image,
// switch between desktop and mobile crops, and link the header to the versioned full-size PNG.
const slugs=readdirSync('src/pages/posts').filter(f=>f.endsWith('.mdx')&&readFileSync('src/pages/posts/'+f,'utf8').includes('<Annot ')).map(f=>f.replace(/\.mdx$/,''));
// Widths straddle the 700 px (layout) and 600 px (mobile image) breakpoints.
for(const slug of slugs)for(const locale of ['ko','en'])for(const width of [1280,701,699,601,599,390])
  test(`${locale} ${width}px: annot figures in ${slug}`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto(`${locale==='en'?'/en':''}/posts/${slug}/`);
    const figures=page.locator('figure.annot');
    expect(await figures.count()).toBeGreaterThan(0);
    for(const fig of await figures.all()){
      await fig.scrollIntoViewIfNeeded();
      await expect(fig.locator('a.annot-head')).toHaveAttribute('href',new RegExp(`/images/[a-z0-9-]+/${locale==='en'?'en/':''}[a-z0-9-]+\\.png\\?v=[0-9a-f]{12}$`));
      // Expected from the generated images, so a figure that lost its mobile crops fails here.
      const id=(await fig.getAttribute('data-figure-id'))!;
      // A mobile version exists when viz:build wrote one (some configs set `screens` in a shared helper).
      const hasMobile=existsSync(`public/images/${id}-mobile.png`);
      expect(await fig.locator('.annot-mobile').count()>0).toBe(hasMobile);
      // The header and every part show exactly one crop: the mobile one at 600 px and below when it exists.
      // A `whole` figure shows the whole mobile figure in its header there, and its parts show only notes.
      const whole=await fig.evaluate((f:HTMLElement)=>f.classList.contains('annot-whole'));
      // A text header prints the title as page text: no crop, except the whole mobile figure on phones.
      const textHead=await fig.locator('a.annot-texthead').count()>0;
      if(textHead)await expect(fig.locator('.annot-title')).toContainText(locale==='en'?'Figure':'그림');
      for(const [k,holder] of [fig.locator('a.annot-head'),...await fig.locator('.annot-part').all()].entries()){
        const shown=[];
        for(const crop of await holder.locator('.annot-crop').all())if(await crop.isVisible())shown.push(crop);
        expect(shown.length).toBe(k===0&&textHead?(whole&&width<=600?1:0):whole&&k>0&&width<=600?0:1);
        if(!shown.length)continue;
        const crop=shown[0];
        await crop.scrollIntoViewIfNeeded();
        // An inline SVG part (`only`) is the desktop figure cropped by its viewBox, hiding the other steps.
        if(await crop.locator('svg').count()){
          const s=await crop.evaluate((c:HTMLElement)=>{const v=c.querySelector('svg')!,a=v.getBoundingClientRect();return {w:a.width,h:a.height,hidden:!!v.querySelector('style')?.textContent?.includes('opacity:0')};});
          expect(s.w).toBeGreaterThan(100);expect(s.h).toBeGreaterThan(30);expect(s.hidden).toBe(true);
          continue;
        }
        const r=await crop.evaluate((c:HTMLElement)=>{const i=c.querySelector('img')!;const a=c.getBoundingClientRect(),b=i.getBoundingClientRect();
          return {loaded:i.complete&&i.naturalWidth>0,mobileSrc:i.src.includes('-mobile.png'),cw:a.width,ch:a.height,inside:b.left<=a.left+1&&b.top<=a.top+1&&b.right>=a.right-1&&b.bottom>=a.bottom-1};});
        expect(r.loaded).toBe(true);
        expect(r.cw).toBeGreaterThan(100);expect(r.ch).toBeGreaterThan(30);
        expect(r.inside).toBe(true);
        expect(r.mobileSrc).toBe(hasMobile&&width<=600);
      }
    }
  });
