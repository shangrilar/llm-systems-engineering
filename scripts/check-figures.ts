// Every published figure image must come from a config in src/data/figures, and each SVG must match
// what the config renders now, so no figure is left without an editable source.
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {compose,type FigureSpec} from '@llm-systems/viz';
export async function checkFigures(){
  const problems:string[]=[];
  for(const article of readdirSync('public/images'))for(const locale of ['ko','en'] as const){
    const dir=join('public/images',article,locale==='en'?'en':'');
    if(!existsSync(dir))continue;
    for(const file of readdirSync(dir).filter(f=>/\.(svg|png)$/.test(f))){
      const mobile=file.includes('-mobile.'),slug=file.replace(/(-mobile)?\.(svg|png)$/,'');
      const config=join('src/data/figures',article,slug+'.ts');
      if(!existsSync(config)){problems.push(`${join(dir,file)}: no figure config`);continue;}
      if(!file.endsWith('.svg'))continue;
      const spec:FigureSpec=(await import(pathToFileURL(config).href)).default;
      const {svg,width,height}=compose(spec,locale,mobile);
      if(svg!==readFileSync(join(dir,file),'utf8'))problems.push(`${join(dir,file)}: out of date, run npm run viz:build -- ${config} <QA dir>`);
      // The PNG is rendered at 2x from this SVG; article crops (<Annot>) are computed from the same layout,
      // so a PNG of another size is stale and would be cut in the wrong places.
      const png=join(dir,file.replace(/\.svg$/,'.png'));
      if(existsSync(png)){const b=readFileSync(png);const [w,h]=[b.readUInt32BE(16),b.readUInt32BE(20)];
        if(w!==width*2||h!==height*2)problems.push(`${png}: ${w}×${h}, expected ${width*2}×${height*2}; regenerate the figure`);
        // renders.json (written by viz:build) records which SVG each PNG was rendered from.
        const rec=renders(dir)[file.replace(/\.svg$/,'')];
        if(rec&&(rec.svg!==sha(svg)||rec.png!==sha(b)))problems.push(`${png}: not rendered from the current SVG; regenerate the figure`);
        if(!rec&&annotFigures().has(`${article}/${slug}`))problems.push(`${png}: used by <Annot> but has no renders.json entry; regenerate the figure`);}
    }
  }
  return problems;
}

const sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex');
const renderCache=new Map<string,Record<string,{svg:string;png:string}>>();
function renders(dir:string){
  if(!renderCache.has(dir)){const f=join(dir,'renders.json');renderCache.set(dir,existsSync(f)?JSON.parse(readFileSync(f,'utf8')):{});}
  return renderCache.get(dir)!;
}
// Figures cut into crops by <Annot> must have a recorded SVG/PNG pair.
let annot:Set<string>|undefined;
function annotFigures(){
  if(annot)return annot;
  annot=new Set();
  for(const d of ['src/pages/posts','src/pages/en/posts'])if(existsSync(d))for(const f of readdirSync(d).filter(f=>f.endsWith('.mdx')))
    for(const m of readFileSync(join(d,f),'utf8').matchAll(/<Annot(?:Part)?\s+fig="([^"]+)"/g))annot.add(m[1]);
  return annot;
}
