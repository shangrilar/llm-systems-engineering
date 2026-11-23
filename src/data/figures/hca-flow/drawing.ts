import {Panel,C,FLOW,math,badge,type FlowSizes,type Label,type Locale,type FigureSpec} from '@llm-systems/viz';
import {chain,embed,type Item} from '../dsa-flow/drawing';
import {numbered} from '../deepseek-kv-cache/numbers';
export {Panel,C,math,badge,chain,embed};
export type {Item};
export const L=(ko:string,en:string):Label=>[ko,en];
export type Sizes=FlowSizes;
export const SZ=FLOW;
const REPO='https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro';
export function spec(id:string,title:Label,sub:Label,alt:Label,panels:(l:Locale,m?:boolean)=>Panel[]):FigureSpec{
 return{articleId:'hca-flow',figureId:id,number:'hca-flow-'+id,layout:'wide',eyebrow:numbered('hca-flow/'+id,'HCA'),title,subtitle:sub,captionIn:'article',caption:alt,alt,
  sources:[{label:'DeepSeek-V4 report · §2.3.2 (HCA)',url:REPO},{label:'DeepSeek-V4-Pro inference code · Attention, Compressor',url:REPO+'/blob/main/inference/model.py'}],panels};
}
// Plane widths follow the order of column sizes (not to scale). V4-Pro values:
// c 512, r_q 1536, D 7168, n_h·c 128×512. Head-split planes show 4 strips.
const COL:Record<string,number>={c:60,r_q:96,D:128,N_t:80,r_o:80,c_g:100,'g·r_o':110};
const HEADS=4;
export const colW=(S:Sizes,col:string)=>{
 const k=S===SZ.mob?.8:1,h=col.startsWith('n_h·');
 return Math.round((h?COL[col.slice(4)]*HEADS:COL[col]??96)*k);
};
// Item builders that fill in the width from this figure's column sizes (chain's own table is DSA's).
export const mat=(S:Sizes,name:string,col:string,o:Partial<Extract<Item,{t:'mat'}>>={}):Item=>({t:'mat',name,col,w:colW(S,col),...o});
export const mul=(S:Sizes,name:string,row:string,col:string,tone?:Extract<Item,{t:'mul'}>['op']['tone']):Item=>({t:'mul',op:{name,row,col,w:colW(S,col),tone}});
