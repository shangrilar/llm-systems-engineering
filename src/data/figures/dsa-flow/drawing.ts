import {Panel,C,FLOW,math,nameGap,flowMatrix,junction,flowStep,badge,flowWire,type FlowSizes,type FlowSide,type Label,type Locale,type FigureSpec,type Tone,type Wire} from '@llm-systems/viz';
import {numbered} from '../deepseek-kv-cache/numbers';
export {Panel,C,math,badge};
export const L=(ko:string,en:string):Label=>[ko,en];
export type Sizes=FlowSizes;
export const SZ=FLOW;
const REPO='https://github.com/deepseek-ai/DeepSeek-V3.2-Exp/tree/87e509a2e5a100d221c97df52c6e8be7835f0057';
export function spec(id:string,title:Label,sub:Label,alt:Label,panels:(l:Locale,m?:boolean)=>Panel[]):FigureSpec{
 return{articleId:'dsa-flow',figureId:id,number:'dsa-flow-'+id,layout:'wide',eyebrow:numbered('dsa-flow/'+id,'DSA'),title,subtitle:sub,captionIn:'article',caption:alt,alt,
  sources:[{label:'DeepSeek-V3.2-Exp report · §2.1 (DSA)',url:REPO},{label:'DeepSeek-V3.2-Exp inference code · Indexer',url:REPO+'/inference'}],panels};
}
export function embed(p:Panel,child:Panel,x:number,y:number,attrs=''){p.raw(`<g ${attrs} transform="translate(${x} ${y})">${child.svg()}</g>`);}
// Plane widths follow the order of column sizes, as in the MLA figures (not to scale). V3.2-Exp values:
// D 7168, r_q 1536, r_kv 512, d_r 64, indexer heads Hᴵ 64 × dᴵ 128. Head-split planes show 4 strips.
const COL:Record<string,number>={'1':14,'d_r':38,'H^I':38,'d^I':52,'r_{kv}':80,'r_q':102,'D':128};
const HEADS=4;
export const colW=(S:Sizes,col:string)=>{
 const k=S===SZ.mob?.8:1,h=col.startsWith('H^I·');
 return Math.round((h?COL[col.slice(4)]*HEADS:COL[col]??96)*k);
};
export const SQ=(S:Sizes)=>S===SZ.mob?60:72;

// Causal selection pattern on a small grid: row t keeps itself and at most `keep` earlier positions.
// The same pattern is used wherever the top-k selection appears, so the figures agree with each other.
const GRID=8;
export function selected(r:number,c:number,keep=3){
 if(c>r)return false;if(c===r)return true;
 const order=Array.from({length:r},(_,i)=>i).sort((a,b)=>((a*7+r*3)%11)-((b*7+r*3)%11));
 return order.slice(0,keep).includes(c);
}
// A [T, T] plane drawn as a grid. 'causal' tints the lower triangle (scores; above the diagonal is −∞).
// 'mask' is the selection mask: selected cells white (0), everything else grey (−∞).
// 'prob' is the probability matrix: only selected cells are filled, with varying strength for their values.
export type SquareMode='full'|'causal'|'mask'|'prob';
export function square(p:Panel,S:Sizes,cx:number,cy:number,name:string,mode:SquareMode,o:{tone?:Tone;dims?:'center'|'right'}={}){
 const w=SQ(S),tone=o.tone??(mode==='mask'?'gray':'blue'),m=flowMatrix(p,S,cx,cy-w/2,name,'T','T',{w,h:w,tone,dims:o.dims});
 if(mode==='full')return m;
 const cell=w/GRID,x=cx-w/2,y=cy-w/2,f=(v:number)=>+v.toFixed(2);
 p.rect(x+.75,y+.75,w-1.5,w-1.5,C.paper,C.paper,0);
 for(let r=0;r<GRID;r++)for(let c=0;c<GRID;c++){
  const at=`x="${f(x+c*cell+.5)}" y="${f(y+r*cell+.5)}" width="${f(cell-1)}" height="${f(cell-1)}"`,keep=selected(r,c);
  if(mode==='causal'&&c<=r)p.raw(`<rect ${at} fill="${C[tone]}" fill-opacity=".22"/>`);
  if(mode==='mask')p.raw(keep?`<rect ${at} fill="${C.paper}" stroke="${C.line}" stroke-width=".8"/>`:`<rect ${at} fill="${C.gray}" fill-opacity=".38"/>`);
  if(mode==='prob'&&keep)p.raw(`<rect ${at} fill="${C[tone]}" fill-opacity="${.25+.15*((r*5+c*3)%5)}"/>`);
 }
 return m;
}

// One computation chain laid out left→right (desktop) or top→down (mobile). Consecutive items are joined by
// routed connectors; a product's second operand sits above it (horizontal) or to its right (vertical).
export type Item=
 |{t:'mat';name:string;col:string;row?:string;heads?:string;tone?:Tone;w?:number;badge?:Label}
 |{t:'sq';name:string;mode:SquareMode;tone?:Tone}
 |{t:'mul';sym?:string;op:{name:string;row:string;col:string;tone?:Tone;w?:number};ports?:{t?:boolean}}
 |{t:'step';label:Label;w?:number;tone?:Tone;input?:Label}
 // Continues from a junction already drawn at the start point (radius 16); draws nothing itself.
 |{t:'from'};
export interface Placed {x:number;y:number;left:[number,number];right:[number,number];top:[number,number];bottom:[number,number]}
const GAP=48;
// Spacing rules. Horizontal: GAP between extents, and anything drawn above an item (a name, an operand) clears
// what the previous item drew above it. Vertical: each item starts below the previous one's shape label.
export function chain(p:Panel,S:Sizes,dir:'h'|'v',start:[number,number],items:readonly Item[],ws:Wire[],o:{tone?:Tone;group?:string}={}):Placed[]{
 const h=dir==='h',gap=nameGap(S),out:Placed[]=[];
 let [x,y]=start,edge=start[0],above=start[0],floor=start[1];
 for(const it of items){
  const half=it.t==='mat'?(it.w??colW(S,it.col))/2:it.t==='sq'?SQ(S)/2:it.t==='mul'||it.t==='from'?16:(it.w??92)/2;
  const opHalf=it.t==='mul'?(it.op.w??colW(S,it.op.col))/2:0;
  if(out.length){
   if(h)x=Math.max(edge+GAP+half,above+20+Math.max(opHalf,it.t==='step'?0:half));
   // A step right after a product clears that product's operand shape label on the right.
   else y=it.t==='mul'?floor+64:it.t==='step'?floor+(['mul','from'].includes(items[out.length-1].t)?62:44):floor+24+gap+(it.t==='sq'?SQ(S)/2:24);
  }
  let P:Placed;
  if(it.t==='from')P={x,y,left:[x-16,y],right:[x+16,y],top:[x,y-16],bottom:[x,y+16]};
  else if(it.t==='mat'){
   const w=it.w??colW(S,it.col),m=flowMatrix(p,S,x,y-24,it.name,it.row??'T',it.col,{w,tone:it.tone,dims:h?'center':'right',heads:it.heads?{count:HEADS,label:it.heads}:undefined});
   if(it.badge)badge(p,S,h?x-36:x+w/2+14,h?y+76:y,it.badge);
   P={x,y,left:[m.x,y],right:[m.x+w,y],top:[x,m.stop],bottom:[x,m.bottom]};
  }else if(it.t==='sq'){
   const w=SQ(S),m=square(p,S,x,y,it.name,it.mode,{tone:it.tone,dims:h?'center':'right'});
   P={x,y,left:[m.x,y],right:[m.x+w,y],top:[x,m.stop],bottom:[x,m.bottom]};
  }else if(it.t==='mul'){
   const op=it.op,w=op.w??colW(S,op.col),tone=op.tone??'purple';
   if(h){flowMatrix(p,S,x,y-94,op.name,op.row,op.col,{w,tone,dims:'right'});flowWire(p,[[x,y-46],[x,y-17]],tone);}
   else{const wx=x+40+w/2;flowMatrix(p,S,wx,y-24,op.name,op.row,op.col,{w,tone});flowWire(p,[[wx-w/2,y],[x+18,y]],tone);}
   const ports:{a:FlowSide;b:FlowSide;t?:boolean}|undefined=it.ports?(h?{a:'left',b:'top',t:it.ports.t}:{a:'top',b:'right',t:it.ports.t}):undefined;
   junction(p,S,x,y,it.sym??'×',ports);
   P={x,y,left:[x-16,y],right:[x+16,y],top:[x,y-16],bottom:[x,y+16]};
  }else{
   const w=it.w??92;
   flowStep(p,S,x,y,it.label,{w,tone:it.tone,input:it.input?{from:h?'below':'right',label:it.input}:undefined});
   P={x,y,left:[x-w/2,y],right:[x+w/2,y],top:[x,y-17],bottom:[x,y+17]};
  }
  const prev=out.at(-1);
  if(prev)ws.push(h?{from:prev.right,to:[P.left[0]-(it.t==='mul'?1:it.t==='step'?2:6),y],start:'right',end:'right',tone:o.tone,group:o.group}
   :{from:prev.bottom,to:[x,P.top[1]-(it.t==='mul'?1:it.t==='step'?2:0)],start:'down',end:'down',tone:o.tone,group:o.group});
  out.push(P);
  edge=P.right[0];above=x+Math.max(opHalf,it.t==='step'?0:half,it.t==='mat'||it.t==='sq'?40:0);
  floor=P.bottom[1]+(it.t==='mat'||it.t==='sq'?(it.t==='mat'&&it.badge?40:24):0);
 }
 return out;
}
