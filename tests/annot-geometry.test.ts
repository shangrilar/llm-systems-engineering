import {describe,expect,it} from 'vitest';
import {readdirSync,readFileSync} from 'node:fs';
import {layoutBoxes} from '@llm-systems/viz';
import {figureSpec,headerCrop,panelCrop,cropStyle} from '../src/components/annot';
// Crop boxes for every <AnnotPart> in use: inside the image, covering the named panels (or the xr share of them),
// and turned into CSS that shows exactly that box.
const parts=readdirSync('src/pages/posts').filter(f=>f.endsWith('.mdx')).flatMap(f=>
  [...readFileSync('src/pages/posts/'+f,'utf8').matchAll(/<AnnotPart fig="([^"]+)" panels="([^"]+)"(?: xr="([^"]+)")?>/g)].map(m=>({fig:m[1],panels:m[2],xr:m[3]})));
describe('annot crop geometry',()=>{
  it('has parts to check',()=>expect(parts.length).toBeGreaterThan(20));
  for(const u of parts)for(const locale of ['ko','en'] as const)for(const mobile of [false,true])
    it(`${u.fig} panels ${u.panels}${u.xr?' xr '+u.xr:''} ${locale}${mobile?' mobile':''}`,async()=>{
      const spec=await figureSpec(u.fig);
      if(mobile&&spec.screens&&!spec.screens.includes('mobile'))return;
      const L=layoutBoxes(spec,locale,mobile),c=panelCrop(spec,u.fig,locale,mobile,u.panels,u.xr);
      const [x,y,w,h]=c.box;
      expect(c.size).toEqual([L.width,L.height]);
      expect(x).toBeGreaterThanOrEqual(0);expect(y).toBeGreaterThanOrEqual(0);
      expect(x+w).toBeLessThanOrEqual(L.width+1e-6);expect(y+h).toBeLessThanOrEqual(L.height+1e-6);
      const idx=u.panels==='all'?L.panels.map((_,i)=>i+1):u.panels.split('+').map(Number);
      for(const i of idx){
        const b=L.panels[i-1];
        expect(y).toBeLessThanOrEqual(b.y);expect(y+h).toBeGreaterThanOrEqual(b.y+b.h);
        if(!u.xr||mobile){expect(x).toBeLessThanOrEqual(b.x);expect(x+w).toBeGreaterThanOrEqual(b.x+b.w);}
      }
      if(u.xr&&!mobile){const [f0,f1]=u.xr.split('-').map(Number);const full=panelCrop(spec,u.fig,locale,mobile,u.panels);
        expect(x).toBeCloseTo(full.box[0]+full.box[2]*f0,6);expect(w).toBeCloseTo(full.box[2]*(f1-f0),6);expect(y).toBe(full.box[1]);expect(h).toBe(full.box[3]);}
      const s=cropStyle(c,mobile),pct=(k:string)=>Number(s.img.match(new RegExp(k+':(-?[\\d.]+)%'))![1]);
      expect(pct('width')).toBeCloseTo(L.width/w*100,3);
      expect(pct('left')).toBeCloseTo(-x/w*100,3);expect(pct('top')).toBeCloseTo(-y/h*100,3);
      expect(c.src).toMatch(/\.png\?v=[0-9a-f]{12}$/);
    });
  it('rejects invalid panels and xr',async()=>{
    const id=parts[0].fig,spec=await figureSpec(id);
    expect(()=>panelCrop(spec,id,'ko',false,'0')).toThrow();
    expect(()=>panelCrop(spec,id,'ko',false,'99')).toThrow();
    for(const bad of ['0.6-0.2','0-0.5-extra','-0.1-0.5','0-1.5','a-b','0.5'])expect(()=>panelCrop(spec,id,'ko',false,'1',bad),bad).toThrow();
    await expect(figureSpec('nope/missing')).rejects.toThrow();
  });
  for(const fig of [...new Set(parts.map(p=>p.fig))])for(const locale of ['ko','en'] as const)for(const mobile of [false,true])
    it(`header of ${fig} ${locale}${mobile?' mobile':''} ends at the subtitle rule`,async()=>{
      const spec=await figureSpec(fig);
      if(mobile&&spec.screens&&!spec.screens.includes('mobile'))return;
      const L=layoutBoxes(spec,locale,mobile),c=headerCrop(spec,fig,locale,mobile);
      expect(c.box.slice(0,3)).toEqual([0,0,L.width]);
      expect(c.box[3]).toBeCloseTo(L.header+4,6);expect(c.box[3]).toBeLessThan(L.panels[0].y);
    });
});
