/// <reference types="astro/client" />
// Build-time geometry for <Annot>/<AnnotPart>: crop boxes come from the same layout that composes the figure,
// so a regenerated figure (checked by `npm run check`) always matches its crops. Boxes are in SVG units.
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {layoutBoxes,type FigureSpec,type Locale} from '@llm-systems/viz';
// Lazy: only the figures an article uses are loaded (some configs read files relative to themselves).
const specs=import.meta.glob<{default:FigureSpec}>('../data/figures/*/*.ts');
export async function figureSpec(id:string){
  if(!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(id))throw new Error('Invalid figure ID '+id);
  const load=specs[`../data/figures/${id}.ts`];
  if(!load)throw new Error('Unknown figure '+id);
  return (await load()).default;
}
const PAD=8;
export interface Crop{src:string;box:[number,number,number,number];size:[number,number]}
function png(id:string,locale:Locale,mobile:boolean){
  const [a,f]=id.split('/');
  const rel=`/images/${a}/${locale==='en'?'en/':''}${f}${mobile?'-mobile':''}.png`;
  const hash=createHash('sha256').update(readFileSync('public'+rel)).digest('hex').slice(0,12);
  return `${rel}?v=${hash}`;
}
export function hasMobile(spec:FigureSpec){return !spec.screens||spec.screens.includes('mobile');}
// The title block down to the rule under the subtitle.
export function headerCrop(spec:FigureSpec,id:string,locale:Locale,mobile:boolean):Crop{
  const L=layoutBoxes(spec,locale,mobile);
  return {src:png(id,locale,mobile),box:[0,0,L.width,L.header+4],size:[L.width,L.height]};
}
// Union of the listed panels (1-based, e.g. "1+2"), padded and clamped to the figure. "all" takes every panel of
// the screen being cropped, for figures whose desktop and mobile versions split into different panel counts.
// `xr` keeps only part of the region's width, as fractions "0-0.55" (desktop only; mobile panels are narrow).
export function panelCrop(spec:FigureSpec,id:string,locale:Locale,mobile:boolean,panels:string,xr?:string):Crop{
  const L=layoutBoxes(spec,locale,mobile);
  const idx=panels==='all'?L.panels.map((_,i)=>i+1):panels.split('+').map(Number);
  if(idx.some(i=>!Number.isInteger(i)||i<1||i>L.panels.length))throw new Error(`Invalid panels "${panels}" for ${id}`);
  const bs=idx.map(i=>L.panels[i-1]);
  const x0=Math.max(0,Math.min(...bs.map(b=>b.x))-PAD),y0=Math.max(0,Math.min(...bs.map(b=>b.y))-PAD);
  const x1=Math.min(L.width,Math.max(...bs.map(b=>b.x+b.w))+PAD),y1=Math.min(L.height,Math.max(...bs.map(b=>b.y+b.h))+PAD);
  let [cx0,cx1]=[x0,x1];
  if(xr!==undefined){
    const m=/^(0(?:\.\d+)?|1)-(0(?:\.\d+)?|1)$/.exec(xr),f0=m?Number(m[1]):NaN,f1=m?Number(m[2]):NaN;
    if(!(f0<f1))throw new Error('Invalid xr '+xr);
    if(!mobile){cx0=x0+(x1-x0)*f0;cx1=x0+(x1-x0)*f1;}
  }
  return {src:png(id,locale,mobile),box:[cx0,y0,cx1-cx0,y1-y0],size:[L.width,L.height]};
}
// Crops for one screen: the union of the panels, or one crop per panel when that union would also take in a panel
// that was not listed (e.g. panels "1+3" of a 2×2 grid, which the mobile version stacks as 1, 2, 3, 4).
export function panelCrops(spec:FigureSpec,id:string,locale:Locale,mobile:boolean,panels:string,xr?:string):Crop[]{
  const union=panelCrop(spec,id,locale,mobile,panels,xr);
  if(panels==='all'||!panels.includes('+'))return [union];
  const L=layoutBoxes(spec,locale,mobile),picked=new Set(panels.split('+').map(Number));
  const [x,y,w,h]=union.box,inside=(b:{x:number;y:number;w:number;h:number})=>b.x<x+w&&b.x+b.w>x&&b.y<y+h&&b.y+b.h>y;
  if(!L.panels.some((b,i)=>!picked.has(i+1)&&inside(b)))return [union];
  return [...picked].map(i=>panelCrop(spec,id,locale,mobile,String(i)));
}
// Inline style that shows only `box` of an image of `size`, scaling with the container width.
// Desktop crops never show larger than the whole figure would at the annot width (1016 px for 1200 units),
// so every region of a figure shares one scale.
export function cropStyle(c:Crop,mobile=false){
  const [x,y,w,h]=c.box,[W,H]=c.size,pct=(v:number)=>(v*100).toFixed(4)+'%';
  return {wrap:`aspect-ratio:${w.toFixed(2)} / ${h.toFixed(2)}${mobile?'':`;max-width:${Math.round(w*1016/1200)}px`}`,img:`width:${pct(W/w)};left:${pct(-x/w)};top:${pct(-y/h)}`};
}
