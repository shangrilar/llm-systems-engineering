import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import {compose,type FigureSpec} from './frame';
import {tr,type Locale} from './text';
export interface LayoutIssues {bounds:string[];overlaps:string[][];containers:string[]}
// Renders ko/en × desktop/mobile SVG and 2× PNG into `<root>/public/images/<articleId>/[en/]`,
// checks text layout in Chromium, and writes `<qaDir>/<number>.json`. Visual review is still manual.
export async function buildFigure(spec:FigureSpec,{root,qaDir,source}:{root:string;qaDir:string;source:string}){
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({deviceScaleFactor:2});
  const records:any[]=[];
  try{
    for(const locale of ['ko','en'] as Locale[])for(const mobile of [false,true]){
      const result=compose(spec,locale,mobile);
      const folder=path.join(root,'public/images',spec.articleId,locale==='en'?'en':'');
      await fs.mkdir(folder,{recursive:true});
      const name=spec.figureId+(mobile?'-mobile':'');
      const file=path.join(folder,name+'.svg');
      await fs.writeFile(file,result.svg);
      await page.setViewportSize({width:result.width,height:result.height});
      await page.goto(pathToFileURL(file).href);
      await page.evaluate(()=>document.fonts.ready);
      // Kept inline: page.evaluate serializes this function, so it must not reference module scope.
      const issues:LayoutIssues=await page.evaluate(()=>{
        const texts=[...document.querySelectorAll('text')].map(e=>({e,s:e.textContent??'',r:e.getBoundingClientRect()}));
        const bounds=texts.filter(t=>t.r.x<0||t.r.y<0||t.r.right>innerWidth+.5||t.r.bottom>innerHeight+.5).map(t=>t.s);
        const overlaps:string[][]=[];
        for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){
          const a=texts[i].r,b=texts[j].r;
          if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2)overlaps.push([texts[i].s,texts[j].s]);
        }
        const containers:string[]=[];
        for(const group of document.querySelectorAll('[data-container]')){
          const r=group.querySelector('rect')!.getBoundingClientRect();
          for(const e of group.querySelectorAll('text')){const t=e.getBoundingClientRect();if(t.left<r.left+3||t.right>r.right-3||t.top<r.top+3||t.bottom>r.bottom-3)containers.push(e.textContent??'');}
        }
        return {bounds,overlaps,containers};
      });
      await page.screenshot({path:file.replace(/\.svg$/,'.png')});
      records.push({locale,mobile,...result,svg:undefined,path:path.relative(root,file),...issues});
    }
  }finally{await browser.close();}
  await fs.mkdir(qaDir,{recursive:true});
  const report={number:spec.number,source:path.relative(root,source),title:{ko:tr(spec.title,'ko'),en:tr(spec.title,'en')},caption:{ko:tr(spec.caption,'ko'),en:tr(spec.caption,'en')},alt:{ko:tr(spec.alt,'ko'),en:tr(spec.alt,'en')},sources:spec.sources,records,visualReview:'pending'};
  await fs.writeFile(path.join(qaDir,spec.number+'.json'),JSON.stringify(report,null,2)+'\n');
  const errors=records.filter(r=>r.bounds.length||r.overlaps.length||r.containers.length);
  return {figure:spec.number,rendered:records.length,errors};
}
