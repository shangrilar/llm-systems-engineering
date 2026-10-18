import {Panel,C,FLOW,math,badge,type FlowSizes,type Label,type Locale,type FigureSpec} from '@llm-systems/viz';
import {chain,embed,type Item} from '../dsa-flow/drawing';
export {Panel,C,math,badge,chain,embed};
export type {Item};
export const L=(ko:string,en:string):Label=>[ko,en];
export type Sizes=FlowSizes;
export const SZ=FLOW;
const REPO='https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro';
export function spec(id:string,title:Label,sub:Label,alt:Label,panels:(l:Locale,m?:boolean)=>Panel[]):FigureSpec{
 return{articleId:'csa-flow',figureId:id,number:'csa-flow-'+id,layout:'wide',eyebrow:'CSA',title,subtitle:sub,captionIn:'article',caption:alt,alt,
  sources:[{label:'DeepSeek-V4 report · §2.3.1 (CSA)',url:REPO},{label:'DeepSeek-V4-Pro inference code · Attention, Compressor, Indexer',url:REPO+'/blob/main/inference/model.py'}],panels};
}
// Plane widths follow the order of column sizes (not to scale). V4-Pro values: c 512, r_q 1536, D 7168,
// n_h·c 128×512; indexer n_I 64 heads × d_I 128. '2c' and '2d_I' are the overlapping compressor's a|b halves.
const COL:Record<string,number>={c:60,'2c':100,r_q:96,D:128,N_t:80,N_s:80,r_o:80,c_g:100,'g·r_o':110,n_I:38,d_I:52,'2d_I':84,k:44};
const HEADS=4;
export const colW=(S:Sizes,col:string)=>{
 const k=S===SZ.mob?.8:1,h=/^n_[hI]·/.test(col);
 return Math.round((h?COL[col.slice(4)]*HEADS:COL[col]??96)*k);
};
export const mat=(S:Sizes,name:string,col:string,o:Partial<Extract<Item,{t:'mat'}>>={}):Item=>({t:'mat',name,col,w:colW(S,col),...o});
export const mul=(S:Sizes,name:string,row:string,col:string,tone?:Extract<Item,{t:'mul'}>['op']['tone']):Item=>({t:'mul',op:{name,row,col,w:colW(S,col),tone}});
