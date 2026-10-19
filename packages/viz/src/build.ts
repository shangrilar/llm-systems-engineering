import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {compose,type FigureSpec} from './frame';
import {tr,type Locale} from './text';
export interface LayoutIssues {bounds:string[];overlaps:string[][];containers:string[];wires:string[];parallel:string[]}
// Renders ko/en × each screen as SVG and 2× PNG into `<outDir>/<articleId>/[en/]` (default `<root>/public/images`),
// checks text layout and connector crossings in Chromium, and writes `<qaDir>/<number>.json`. Visual review is still manual.
export async function buildFigure(spec:FigureSpec,{root,qaDir,source,outDir=path.join(root,'public/images')}:{root:string;qaDir:string;source:string;outDir?:string}){
  const screens=spec.screens??['desktop','mobile'];
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({deviceScaleFactor:2});
  const records:any[]=[];
  try{
    for(const locale of ['ko','en'] as Locale[])for(const mobile of screens.map(s=>s==='mobile')){
      const result=compose(spec,locale,mobile);
      const folder=path.join(outDir,spec.articleId,locale==='en'?'en':'');
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
        // Arrowed connectors must not run through text or through boxes (rects/circles). Touching an edge is fine:
        // obstacles are shrunk slightly, and each connector is sampled along its rendered length.
        const wires:string[]=[];
        // No named helpers here: the bundler would wrap them with a `__name` call that does not exist in the page.
        const obstacles=[...texts.map(t=>({name:'text “'+t.s+'”',r:t.r,d:2})),
          ...[...document.querySelectorAll('rect,circle')].filter(e=>e.getAttribute('width')!=='100%').map((e,i)=>({name:e.tagName+'#'+i,r:e.getBoundingClientRect(),d:1.5}))]
          .map(o=>({name:o.name,l:o.r.left+o.d,t:o.r.top+o.d,r:o.r.right-o.d,b:o.r.bottom-o.d}));
        document.querySelectorAll('path[marker-end],path[data-wire]').forEach((e,i)=>{
          const path=e as SVGPathElement,m=path.getScreenCTM()!,len=path.getTotalLength(),hit=new Set<string>();
          for(let d=0;d<=len;d+=2){
            const p=path.getPointAtLength(d),x=m.a*p.x+m.c*p.y+m.e,y=m.b*p.x+m.d*p.y+m.f;
            for(const o of obstacles)if(x>o.l&&x<o.r&&y>o.t&&y<o.b)hit.add(o.name);
          }
          for(const h of hit)wires.push('connector#'+i+' crosses '+h);
        });
        // Wires from one logical source must not run side by side 0.1–30 px apart: they should share one line.
        // The source is data-source (fanOut) or the first point, both mapped to screen coordinates.
        const parallel:string[]=[];
        const segs=[...document.querySelectorAll('path[marker-end],path[data-wire]')].flatMap((e,i)=>{
          const m=(e as SVGPathElement).getScreenCTM()!;
          const pts=[...(e.getAttribute('d')??'').matchAll(/[ML]\s*(-?[\d.]+)[ ,](-?[\d.]+)/g)].map(q=>[m.a*+q[1]+m.c*+q[2]+m.e,m.b*+q[1]+m.d*+q[2]+m.f]);
          const ds=(e.getAttribute('data-source')??'').split(',').map(Number);
          const s0=ds.length===2?[m.a*ds[0]+m.c*ds[1]+m.e,m.b*ds[0]+m.d*ds[1]+m.f]:pts[0];
          const key=Math.round(s0[0]*2)+','+Math.round(s0[1]*2);
          return pts.slice(1).map((b,k)=>({i,key,a:pts[k],b}));
        });
        for(let u=0;u<segs.length;u++)for(let v=u+1;v<segs.length;v++){
          const A=segs[u],B=segs[v];
          if(A.i===B.i||A.key!==B.key)continue;
          for(const k of [0,1]){
            const o=1-k;
            if(Math.abs(A.a[o]-A.b[o])>.1||Math.abs(B.a[o]-B.b[o])>.1)continue;
            const gap=Math.abs(A.a[o]-B.a[o]),lap=Math.min(Math.max(A.a[k],A.b[k]),Math.max(B.a[k],B.b[k]))-Math.max(Math.min(A.a[k],A.b[k]),Math.min(B.a[k],B.b[k]));
            if(gap>.1&&gap<=30&&lap>.1)parallel.push('connector#'+A.i+' runs '+gap.toFixed(1)+'px beside connector#'+B.i);
          }
        }
        return {bounds,overlaps,containers,wires,parallel};
      });
      await page.screenshot({path:file.replace(/\.svg$/,'.png')});
      await recordRender(folder,name,result.svg,await fs.readFile(file.replace(/\.svg$/,'.png')));
      records.push({locale,mobile,...result,svg:undefined,path:path.relative(root,file),...issues});
    }
  }finally{await browser.close();}
  await fs.mkdir(qaDir,{recursive:true});
  const report={number:spec.number,source:path.relative(root,source),title:{ko:tr(spec.title,'ko'),en:tr(spec.title,'en')},caption:{ko:tr(spec.caption,'ko'),en:tr(spec.caption,'en')},alt:{ko:tr(spec.alt,'ko'),en:tr(spec.alt,'en')},sources:spec.sources,records,visualReview:'pending'};
  await fs.writeFile(path.join(qaDir,spec.number+'.json'),JSON.stringify(report,null,2)+'\n');
  const errors=records.filter(r=>r.bounds.length||r.overlaps.length||r.containers.length||r.wires.length||r.parallel.length);
  return {figure:spec.number,rendered:records.length,errors};
}

// `renders.json` in each image folder pairs every SVG with the PNG rendered from it, so a check can tell a
// stale PNG from a current one even when their sizes match (article crops depend on the PNG matching the SVG).
const sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex');
async function recordRender(folder:string,name:string,svg:string,png:Buffer){
  const file=path.join(folder,'renders.json');
  const all:Record<string,{svg:string;png:string}>=JSON.parse(await fs.readFile(file,'utf8').catch(()=>'{}'));
  all[name]={svg:sha(svg),png:sha(png)};
  const sorted=Object.fromEntries(Object.keys(all).sort().map(k=>[k,all[k]]));
  await fs.writeFile(file,JSON.stringify(sorted,null,1)+'\n');
}
