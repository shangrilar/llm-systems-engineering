import {test,expect} from '@playwright/test';

for(const locale of ['ko','en'] as const){
  test(`${locale}: MQA/GQA subscripts, responsive figures and language navigation`,async({page})=>{
    const prefix=locale==='en'?'/en':'';
    await page.goto(`${prefix}/posts/model-advanced-mqa-gqa/`);
    await expect(page.locator('.prose h2')).toHaveCount(6);
    await expect(page.locator('.prose picture')).toHaveCount(5);
    await expect(page.locator('math[display="block"] msub')).toHaveCount(2);
    const equation=page.locator('math[display="block"]');
    await expect(equation).toContainText('kv');
    expect(await equation.locator('msub').evaluateAll(es=>es.map(e=>e.children.length))).toEqual([2,2]);
    for(const width of [360,768,1280]){
      await page.setViewportSize({width,height:960});
      for(const img of await page.locator('.prose picture img').all()){
        await img.scrollIntoViewIfNeeded();
        await expect.poll(()=>img.evaluate((i:HTMLImageElement)=>i.complete&&i.naturalWidth>0)).toBe(true);
        const src=await img.evaluate((i:HTMLImageElement)=>i.currentSrc);
        expect(src.includes('-mobile.png')).toBe(width<=600);
        expect(src.includes('/model-advanced-mqa-gqa/en/')).toBe(locale==='en');
      }
      await equation.scrollIntoViewIfNeeded();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    }
    const imageLink=page.locator('#figure-0');
    await imageLink.click();
    await expect(page).toHaveURL(/00-attention-head-comparison\.png/);
    await page.goBack();
    const select=page.locator('select');
    const options=await select.locator('option').evaluateAll(es=>es.map(e=>({value:(e as HTMLOptionElement).value,text:e.textContent})));
    const other=options.find(o=>o.text?.includes(locale==='ko'?'English':'한국어'))!;
    await select.selectOption(other.value);
    await expect.poll(()=>new URL(page.url()).pathname).toBe(`${locale==='ko'?'/en':''}/posts/model-advanced-mqa-gqa/`);
  });
}
