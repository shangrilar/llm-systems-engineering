// Generate SVGs with generate-paged-kv-figures.py, then run this renderer.
// PNGs were reviewed on macOS with Arial and Apple SD Gothic Neo. Other systems
// use the SVG font fallbacks; inspect typography after rendering on another OS.
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL, fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const figs=JSON.parse(await fs.readFile(repo+'/scripts/paged-kv-figures.json','utf8'));
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({deviceScaleFactor:2});
const report=[];
for(const f of figs){
  await page.setViewportSize({width:f.width,height:f.height});
  await page.goto(pathToFileURL(repo+'/'+f.path).href);
  await page.evaluate(()=>document.fonts.ready);
  const issues=await page.evaluate(()=>{
    const ts=[...document.querySelectorAll('text')].map(e=>({text:e.textContent,r:e.getBoundingClientRect()}));
    const bounds=ts.filter(({r})=>r.x<0||r.y<0||r.right>innerWidth||r.bottom>innerHeight).map(t=>t.text);
    const panelBounds=[];
    for(const panel of document.querySelectorAll('[data-panel]')){
      const p=panel.querySelector('rect').getBoundingClientRect();
      for(const t of panel.querySelectorAll('text')){
        if(!t.textContent.trim()) continue;
        const r=t.getBoundingClientRect();
        if(r.left<p.left+10||r.top<p.top+8||r.right>p.right-10||r.bottom>p.bottom-8) panelBounds.push(t.textContent);
      }
    }
    const overlaps=[];
    for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){
      const a=ts[i].r,b=ts[j].r;
      if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2) overlaps.push([ts[i].text,ts[j].text]);
    }
    return {bounds,panelBounds,overlaps};
  });
  await page.screenshot({path:(repo+'/'+f.path).replace(/svg$/,'png')});
  report.push({article:f.article,slug:f.slug,locale:f.locale,...issues});
}
const failures=report.filter(r=>r.bounds.length||r.panelBounds.length||r.overlaps.length);
console.log(JSON.stringify({rendered:report.length,failures},null,2));
if(failures.length)process.exitCode=1;
await browser.close();
