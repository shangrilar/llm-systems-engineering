import {Panel,C,FLOW,math,nameGap,flowMatrix,junction,flowStep,badge,flowWire,type FlowSizes,type FlowSide,type Bounds,type Label,type Tone,type Locale,type FigureSpec} from '@llm-systems/viz';
import {numbered} from '../deepseek-kv-cache/numbers';
export {Panel,C,math,nameGap,badge};
export const L=(ko:string,en:string):Label=>[ko,en];
export type Node=Bounds&{cx:number};
export const wire=flowWire;
export function embed(p:Panel,child:Panel,x:number,y:number,attrs=""){p.raw(`<g ${attrs} transform="translate(${x} ${y})">${child.svg()}</g>`);}
export function spec(id:string,title:Label,sub:Label,alt:Label,panels:(l:Locale,m?:boolean)=>Panel[]):FigureSpec{
 return{articleId:'mla-flow',figureId:id,number:'mla-flow-'+id,layout:'wide',eyebrow:numbered('mla-flow/'+id,'MLA'),title,subtitle:sub,captionIn:'article',caption:alt,alt,sources:[{label:'DeepSeek-V2 · §2.1 & Appendix C',url:'https://arxiv.org/html/2405.04434v5#S2.SS1'}],panels};
}

// MLA figures use the shared flow grammar (`@llm-systems/viz` flow.ts). This file keeps what is specific to MLA:
// the column-size order behind plane widths and the head strip count.
export type Sizes=FlowSizes;
export const SZ=FLOW;
const COL:Record<string,number>={'d_r':38,'d_k':52,'d_v':52,'r_{kv}':80,'r_q':102,'D':128};
const HEADS=4;
export const colW=(S:Sizes,col:string)=>{
 const k=S===SZ.mob?.8:1,h=col.startsWith('H·');
 return Math.round((h?COL[col.slice(2)]*HEADS:COL[col]??96)*k);
};
export type Mat=Node&{stop:number;bottom:number};
export function mat(p:Panel,S:Sizes,cx:number,y:number,name:string,row:string,col:string,o:{w?:number;h?:number;tone?:Tone;heads?:boolean;dims?:'center'|'right'}={}):Mat{
 return flowMatrix(p,S,cx,y,name,row,col,{...o,w:o.w??colW(S,col),heads:o.heads?{count:HEADS,label:'h'}:undefined});
}
export function mop(p:Panel,S:Sizes,cx:number,y:number,s='×',ports?:{a:FlowSide;b:FlowSide;t?:boolean}){junction(p,S,cx,y,s,ports);}
export function rope(p:Panel,S:Sizes,cx:number,cy:number,from:'below'|'right'){flowStep(p,S,cx,cy,'RoPE',{input:{from,label:L('위치 p_t','position p_t')}});}
// Horizontal flow rows (desktop): a plane centred on the row line, and a product whose weight sits above it.
export function hmat(p:Panel,S:Sizes,cx:number,cy:number,name:string,row:string,col:string,o:{w?:number;h?:number;tone?:Tone;heads?:boolean}={}):Mat{
 const h=o.h??48;return mat(p,S,cx,cy-h/2,name,row,col,{...o,dims:'center'});
}
export function hmul(p:Panel,S:Sizes,cx:number,cy:number,name:string,row:string,col:string,o:{tone?:Tone;ports?:{a:FlowSide;b:FlowSide;t?:boolean}}={}){
 const w=colW(S,col),tone=o.tone??'purple';
 flowMatrix(p,S,cx,cy-94,name,row,col,{w,tone,dims:'right'});flowWire(p,[[cx,cy-46],[cx,cy-17]],tone);junction(p,S,cx,cy,'×',o.ports);
}
