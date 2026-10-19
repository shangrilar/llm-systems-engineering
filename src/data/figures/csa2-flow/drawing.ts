import {Panel,C,FLOW,math,badge,type FlowSizes,type Label,type Locale,type FigureSpec} from '@llm-systems/viz';
export {Panel,C,math,badge};
export const L=(ko:string,en:string):Label=>[ko,en];
export type Sizes=FlowSizes;
export const SZ=FLOW;
const REPO='https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash';
export function spec(id:string,title:Label,sub:Label,alt:Label,panels:(l:Locale,m?:boolean)=>Panel[],wide=true):FigureSpec{
 return{articleId:'csa2-flow',figureId:id,number:'csa2-flow-'+id,layout:wide?'wide':undefined,eyebrow:numbered('csa2-flow/'+id,'CSA2'),title,subtitle:sub,captionIn:'article',caption:alt,alt,
  sources:[{label:'DeepSeek-V4.1-Flash report · §2.3 (CSA2)',url:'https://arxiv.org/html/2609.19969v1'},{label:'DeepSeek-V4.1-Flash model card and code',url:REPO}],panels};
}
export function embed(p:Panel,child:Panel,x:number,y:number,attrs=''){p.raw(`<g ${attrs} transform="translate(${x} ${y})">${child.svg()}</g>`);}
import {chain,type Item} from '../dsa-flow/drawing';
import {numbered} from '../deepseek-kv-cache/numbers';
export {chain};
export type {Item};
// Plane widths follow the order of column sizes (not to scale). V4-Pro-like values: c 512, r_q 1536, D 7168, n_h·c 128×512.
const COL:Record<string,number>={c:60,'2c':100,r_q:96,D:128,N_t:80,d_I:52,'2d_I':84};
const HEADS=4;
export const colW=(S:Sizes,col:string)=>{
 const k=S===SZ.mob?.8:1,h=/^n_h·/.test(col);
 return Math.round((h?COL[col.slice(4)]*HEADS:COL[col]??96)*k);
};
export const mat=(S:Sizes,name:string,col:string,o:Partial<Extract<Item,{t:'mat'}>>={}):Item=>({t:'mat',name,col,w:colW(S,col),...o});
export const mul=(S:Sizes,name:string,row:string,col:string,tone?:Extract<Item,{t:'mul'}>['op']['tone']):Item=>({t:'mul',op:{name,row,col,w:colW(S,col),tone}});
