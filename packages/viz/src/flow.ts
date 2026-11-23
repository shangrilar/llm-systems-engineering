import {C,markerId,type Tone} from './theme';
import {esc,tr,units,type Label} from './text';
import {connector} from './diagram';
import type {Panel} from './panel';
// Symbolic flow diagrams: math-style labels, matrix planes named above and shaped below, product junctions and
// small step boxes. Figures choose plane widths (e.g. by the order of column sizes); this module only draws.
export type FlowSizes={name:number;dim:number;note:number;title:number;port:number;op:number};
export const FLOW:{desk:FlowSizes;mob:FlowSizes}={desk:{name:24,dim:19,note:19,title:22,port:15,op:22},mob:{name:20,dim:15,note:16,title:19,port:13,op:20}};
// One source feeding several rows: a single vertical trunk from the source down to the last row, then a horizontal
// arrow from the trunk to each target (no junction dots; the trunk ends in an L at the last branch). Routing every
// branch separately drew near-duplicate parallel lines. Trunk and branches carry data-wire and data-source, so the
// router treats them as drawn wires of one source and the build checks include them.
export interface FanTap {to:readonly [number,number];tone?:Tone;group?:string}
export function fanOut(p:Panel,from:readonly [number,number],taps:readonly FanTap[],o:{tone?:Tone}={}){
 const [x,y]=from,src=`data-source="${x},${y}"`,last=Math.max(...taps.map(t=>t.to[1]));
 if(!taps.length||taps.some(t=>t.to[1]<=y||t.to[0]<=x))throw new Error('fanOut taps must lie below and to the right of the source');
 p.raw(`<path d="M${x} ${y} L${x} ${last}" stroke="${C[o.tone??'blue']}" stroke-width="1.8" fill="none" data-wire="trunk" ${src}/>`);
 for(const t of taps){
  const c=C[t.tone??o.tone??'blue'];
  p.raw(`${t.group?`<g ${t.group}>`:''}<path d="M${x} ${t.to[1]} L${t.to[0]} ${t.to[1]}" stroke="${c}" stroke-width="1.8" fill="none" marker-end="url(#${markerId(c)})" data-wire="branch" ${src}/>${t.group?'</g>':''}`);
 }
}
export function flowWire(p:Panel,points:readonly (readonly [number,number])[],tone:Tone='blue',dash=false){connector(p,points[0],points[points.length-1],{via:points.slice(1,-1),tone,dashed:dash,width:1.8});}
// `^x`/`^{xy}` superscript, `_x`/`_{xy}` subscript. A script that directly follows the opposite script is stacked
// under/over it (e.g. Q^C_h).
type Seg={s:string;k:-1|0|1};
function scripts(s:string){
 const out:Seg[]=[];let buf='',i=0;
 while(i<s.length){
  const c=s[i];
  if((c==='^'||c==='_')&&i+1<s.length){
   if(buf){out.push({s:buf,k:0});buf='';}
   let g:string;
   if(s[i+1]==='{'){const e=s.indexOf('}',i+1);g=s.slice(i+2,e);i=e+1;}else{g=s[i+1];i+=2;}
   out.push({s:g,k:c==='^'?1:-1});
  }else{buf+=c;i++;}
 }
 if(buf)out.push({s:buf,k:0});return out;
}
export function math(p:Panel,x:number,y:number,value:Label,o:{size:number;color?:string;weight?:number;anchor?:string;width?:number}){
 const z=o.size,sz=+(z*.7).toFixed(1),segs=scripts(tr(value,p.locale));
 let shift=0,pad=0,body='';
 segs.forEach((g,i)=>{
  const prev=segs[i-1],target=g.k===1?-z*.38:g.k===-1?z*.22:0;
  let dx=pad;pad=0;
  if(g.k&&prev&&prev.k&&prev.k!==g.k){dx-=units(prev.s)*sz;pad=Math.max(0,units(prev.s)-units(g.s))*sz;}
  const dy=target-shift;shift=target;
  body+=`<tspan${dy?` dy="${+dy.toFixed(1)}"`:''}${dx?` dx="${+dx.toFixed(1)}"`:''}${g.k?` font-size="${sz}"`:''}>${esc(g.s)}</tspan>`;
 });
 p.raw(`<text x="${x}" y="${y}" fill="${o.color??C.ink}" font-size="${z}" font-weight="${o.weight??400}" text-anchor="${o.anchor??'start'}" data-max-width="${o.width??p.width-x}">${body}</text>`);
}
// From a plane's top edge up to the top of its name, plus the gap an incoming arrow leaves.
export const nameGap=(S:FlowSizes)=>12+Math.round(S.name*.75)+6;
export interface FlowMatrix {x:number;y:number;width:number;height:number;cx:number;stop:number;bottom:number}
// A symbolic matrix: a tone-bordered box without brackets (brackets are for matrices with numeric cells).
// `heads` splits `[T, H·d]` into equal strips with the named one first and `⋯` last.
export function flowMatrix(p:Panel,S:FlowSizes,cx:number,y:number,name:string,row:string,col:string,o:{w:number;h?:number;tone?:Tone;heads?:{count:number;label:string};dims?:'center'|'right'}):FlowMatrix{
 const w=o.w,h=o.h??48,tone=o.tone??'blue',x=cx-w/2;
 p.raw(`<g data-matrix="${name}">`);
 p.rect(x,y,w,h,o.heads?C.paper:C[`${tone}Fill`],C[tone],0);
 if(o.heads){
  const n=o.heads.count,strip=w/n;
  p.rect(x,y,strip,h,C[`${tone}Fill`],C[tone],0);
  for(let i=2;i<n;i++)p.line(x+strip*i,y+1,x+strip*i,y+h-1,C.line,1.2);
  p.text(x+strip/2,y+h/2+6,o.heads.label,{size:S.dim-2,anchor:'middle',width:strip,color:C[tone]});
  p.text(x+strip*(n-.5),y+h/2+5,'⋯',{size:S.dim,anchor:'middle',width:strip,color:C.muted});
 }
 p.raw('</g>');
 math(p,cx,y-12,name,{size:S.name,weight:600,anchor:'middle',width:w+120,color:C[tone]});
 const right=o.dims==='right';
 math(p,right?cx+8:cx,y+h+S.dim+4,`[${row}, ${col}]`,{size:S.dim-1,anchor:right?'start':'middle',color:C.muted,width:200});
 return{x,y,width:w,height:h,cx,stop:y-nameGap(S),bottom:y+h};
}
export type FlowSide='left'|'top'|'right'|'bottom';
// A product (or other) junction. Ports are labeled only when the reader cannot infer operand order from layout.
// A top port is labeled left of its wire, since the operand's shape label sits to the right.
export function junction(p:Panel,S:FlowSizes,cx:number,y:number,s='×',ports?:{a:FlowSide;b:FlowSide;t?:boolean}){
 p.circle(cx,y,16,C.paper,C.line);p.text(cx,y+S.op*.3,s,{size:S.op,anchor:'middle',width:26,color:C.ink});
 if(!ports)return;
 const at=(side:FlowSide,label:string)=>{const [x,yy]={left:[cx-34,y-8],top:[cx-30,y-26],right:[cx+24,y-8],bottom:[cx+10,y+36]}[side];p.text(x,yy,label,{size:S.port,width:30,color:C.muted});};
 at(ports.a,'A');at(ports.b,ports.t?'Bᵀ':'B');
}
// A small labeled step (RoPE, ReLU, top-k …) centred at (cx, cy), optionally with a side input from below or the right.
export function flowStep(p:Panel,S:FlowSizes,cx:number,cy:number,label:Label,o:{w?:number;tone?:Tone;input?:{from:'below'|'right';label:Label}}={}){
 const w=o.w??92,tone=o.tone??'teal';
 p.rect(cx-w/2,cy-17,w,34,C[`${tone}Fill`],C[tone],8);p.text(cx,cy+7,label,{size:S.dim,anchor:'middle',width:w-8,color:C[tone],weight:600});
 if(!o.input)return;
 const t=o.input;
 if(t.from==='below'){flowWire(p,[[cx,cy+64],[cx,cy+21]],tone);math(p,cx,cy+64+S.note+4,t.label,{size:S.note,anchor:'middle',color:C[tone],width:140});}
 else{flowWire(p,[[cx+w/2+74,cy],[cx+w/2+4,cy]],tone);math(p,cx+w/2+80,cy+6,t.label,{size:S.note,color:C[tone],width:110});}
}
export function badge(p:Panel,S:FlowSizes,x:number,cy:number,label:Label,tone:Tone='orange'){
 const z=S.note-3,w=Math.ceil(units(tr(label,p.locale))*z)+18;
 p.rect(x,cy-14,w,28,C[`${tone}Fill`],C[tone],14);p.text(x+w/2,cy+z*.36,label,{size:z,anchor:'middle',width:w,color:C[tone],weight:600});
}
