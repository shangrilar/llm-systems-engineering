import {describe,expect,it} from 'vitest';
import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {layoutBoxes} from '@llm-systems/viz';
// Every <Annot>/<AnnotPart> in an article must name a real figure and existing panels, in both languages,
// and the Korean and English articles must split each figure the same way.
const dirs=['src/pages/posts','src/pages/en/posts'];
const uses=(file:string)=>{
  const s=readFileSync(file,'utf8');
  return [...s.matchAll(/<AnnotPart fig="([^"]+)" panels="([^"]+)"(?: xr="([^"]+)")?>/g)].map(m=>({fig:m[1],panels:m[2],xr:m[3]}));
};
describe('annot figures',()=>{
  const files=dirs.flatMap(d=>readdirSync(d).filter(f=>f.endsWith('.mdx')).map(f=>join(d,f)));
  const withAnnot=files.filter(f=>uses(f).length);
  it('is used somewhere',()=>expect(withAnnot.length).toBeGreaterThan(0));
  for(const file of withAnnot)it(file,async()=>{
    for(const u of uses(file)){
      const path=`src/data/figures/${u.fig}.ts`;
      expect(existsSync(path),path).toBe(true);
      const spec=(await import('../'+path)).default;
      for(const mobile of [false,true]){
        const n=layoutBoxes(spec,'ko',mobile).panels.length;
        for(const i of u.panels.split('+').map(Number))expect(i>=1&&i<=n,`${u.fig} panel ${i}`).toBe(true);
      }
    }
  });
  it('splits each figure the same way in Korean and English',()=>{
    for(const file of readdirSync(dirs[0]).filter(f=>f.endsWith('.mdx'))){
      const en=join(dirs[1],file);if(!existsSync(en))continue;
      expect(uses(join(dirs[1],file)),file).toEqual(uses(join(dirs[0],file)));
    }
  });
});
