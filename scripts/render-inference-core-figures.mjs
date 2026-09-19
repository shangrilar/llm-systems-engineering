// Render original bilingual SVGs and check text bounds/overlap with browser metrics.
// PNGs were reviewed on macOS with Arial and Apple SD Gothic Neo. Other systems
// use the SVG font fallbacks; inspect typography after rendering on another OS.
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL, fileURLToPath} from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const figures=JSON.parse(await fs.readFile(repo+'/scripts/inference-core-figures.json','utf8'))
  .filter(f=>!process.argv[2]||`${f.article}/${f.slug}`===process.argv[2]);
if(!figures.length)throw new Error('No matching figure');
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({deviceScaleFactor:2});
const report=[];
for(const f of figures){
  await page.setViewportSize({width:f.width,height:f.height});
  await page.goto(pathToFileURL(repo+'/'+f.path).href);
  await page.evaluate(()=>document.fonts.ready);
  const issues=await page.evaluate(()=>{
    const labels=[...document.querySelectorAll('text')].map(e=>({text:e.textContent,r:e.getBoundingClientRect()}));
    const bounds=labels.filter(({r})=>r.x<0||r.y<0||r.right>innerWidth||r.bottom>innerHeight).map(t=>t.text);
    const overlaps=[];
    for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){
      const a=labels[i].r,b=labels[j].r;
      if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2)overlaps.push([labels[i].text,labels[j].text]);
    }
    const containerOverflow=[];
    for(const group of document.querySelectorAll('[data-box]')){
      const [x,y,w,h]=group.getAttribute('data-box').split(',').map(Number);
      for(const e of group.querySelectorAll('text')){
        const r=e.getBoundingClientRect();
        if(r.left<x+8||r.right>x+w-8||r.top<y+8||r.bottom>y+h-8)containerOverflow.push(e.textContent);
      }
    }
    return {bounds,overlaps,containerOverflow};
  });
  await page.screenshot({path:(repo+'/'+f.path).replace(/svg$/,'png')});
  report.push({article:f.article,slug:f.slug,locale:f.locale,...issues});
}
const failures=report.filter(r=>r.bounds.length||r.overlaps.length||r.containerOverflow.length);
console.log(JSON.stringify({rendered:report.length,failures},null,2));
await browser.close();
if(failures.length)process.exitCode=1;
