// Every published figure image must come from a config in src/data/figures, and each SVG must match
// what the config renders now, so no figure is left without an editable source.
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
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
      if(compose(spec,locale,mobile).svg!==readFileSync(join(dir,file),'utf8'))problems.push(`${join(dir,file)}: out of date, run npm run viz:build -- ${config} <QA dir>`);
    }
  }
  return problems;
}
