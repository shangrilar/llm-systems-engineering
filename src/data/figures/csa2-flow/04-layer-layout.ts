import {Panel,C,L,math,spec,SZ} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
// The 40-layer layout of DeepSeek-V4.1-Flash (report §4.2.1, p.22). Encoder: 2 SWA-only layers, then 18 CSA2 layers (m = 2) in 3 groups of
// [Full, Reuse×5]. Decoder: 20 CSA2 layers (m = 1) in 5 groups of 4: [Full, Reuse×3] first, then 4 × [Reindex, Reuse×3].
// Cache sharing and index reuse are decoupled: the decoder has ONE main KV (made by its first Full layer from H^{L/2}, §2.3.1) but five selection lists.
// Counting KV banks must not be turned into a memory ratio. top-k 512, window 128, 32 indexer heads (p.22).
type Kind='S'|'F'|'I'|'U';
const ENC:Kind[]=['S','S',...[0,1,2].flatMap(()=>['F','U','U','U','U','U'] as Kind[])];
const DEC:Kind[]=[...(['F','U','U','U'] as Kind[]),...[0,1,2,3].flatMap(()=>['I','U','U','U'] as Kind[])];
const TXT:Record<Kind,string>={S:'S',F:'F',I:'Ri',U:'Ru'};
const TONE:Record<Kind,'gray'|'teal'|'red'|'blue'>={S:'gray',F:'teal',I:'red',U:'blue'};
function cell(p:Panel,x:number,y:number,k:Kind,w=42,h=40){
 const t=TONE[k],solid=k!=='U';
 p.rect(x,y,w,h,solid?C[`${t}Fill`]:C.paper,C[t],6,k==='U');
 p.text(x+w/2,y+h/2+6,TXT[k],{size:16,weight:600,anchor:'middle',width:w-4,color:C[t]});
}
function bracket(p:Panel,x0:number,x1:number,y:number,color:string,label:Label,size=17){
 p.path(`M${x0} ${y} V${y+8} H${x1} V${y}`,color,2);
 math(p,(x0+x1)/2,y+30,label,{size,anchor:'middle',color,width:x1-x0+30,weight:600});
}
const legend=(p:Panel,x:number,y:number,vertical=false)=>{
 const items:[Kind,Label][]=[['S',L('SWA만','SWA only')],['F',L('Full','Full')],['I',L('Reindex','Reindex')],['U',L('Reuse','Reuse')]];
 items.forEach(([k,lab],i)=>{const lx=vertical?x:x+i*170,ly=vertical?y+i*48:y;cell(p,lx,ly,k,42,34);math(p,lx+52,ly+24,lab,{size:19,color:C.ink,width:110});});
};
function desktop(l:Locale){
 const p=new Panel(l,null,640,1104),x0=64,st=50;
 math(p,0,26,L('Reuse = 점선 상자 · 괄호 = main KV 또는 선택 목록을 공유하는 범위','Reuse = dashed box · brackets = the range that shares the main KV or a selection list'),{size:SZ.desk.note-2,color:C.muted,width:1100});
 legend(p,0,52);
 math(p,0,150,L('Encoder · 20층 · CSA2 층의 압축률 m = 2','Encoder · 20 layers · CSA2 layers compress by m = 2'),{size:SZ.desk.title,weight:700,color:C.ink,width:700});
 ENC.forEach((k,i)=>cell(p,x0+i*st,168,k));
 bracket(p,x0,x0+2*st-8,222,C.gray,L('SWA만','SWA only'));
 [0,1,2].forEach(g=>bracket(p,x0+(2+6*g)*st,x0+(2+6*g+6)*st-8,222,C.teal,L(`묶음 ${g+1}: main KV 한 벌 · 선택 1곳`,`group ${g+1}: one main KV · 1 selection`)));
 math(p,0,352,L('Decoder · 20층 · 압축률 m = 1','Decoder · 20 layers · compression m = 1'),{size:SZ.desk.title,weight:700,color:C.ink,width:700});
 DEC.forEach((k,i)=>cell(p,x0+i*st,370,k));
 bracket(p,x0,x0+20*st-8,424,C.teal,L('main KV 한 벌 공유 · 첫 Full 층이 H^{L/2}에서 만든다 (CED)','one shared main KV · built by the first Full layer from H^{L/2} (CED)'),19);
 [0,1,2,3,4].forEach(g=>bracket(p,x0+g*4*st,x0+(g*4+4)*st-8,486,g?C.red:C.teal,g?L('Reindex로 재선택','reselected by Reindex'):L('Full이 선택','chosen by Full'),16));
 return p;
}
function mobile(l:Locale){
 const S=SZ.mob,p=new Panel(l,null,0,328);let y=0;
 const add=(kinds:Kind[],note:Label,color:string)=>{kinds.forEach((k,i)=>cell(p,8+i*46,y,k,40,36));math(p,8,y+62,note,{size:S.note-1,color,width:318,weight:600});y+=92;};
 math(p,8,22,L('Reuse = 점선 상자','Reuse = dashed box'),{size:S.note-2,color:C.muted,width:318});
 legend(p,8,40,true);y=252;
 math(p,8,y,L('Encoder · 20층','Encoder · 20 layers'),{size:S.title,weight:700,width:318});y+=22;math(p,8,y,L('CSA2 18층은 압축률 m = 2','the 18 CSA2 layers: compression m = 2'),{size:S.note-2,color:C.muted,width:318});y+=24;
 add(['S','S'],L('SWA만','SWA only'),C.gray);
 add(['F','U','U','U','U','U'],L('묶음 1~3 (×3): main KV 한 벌 · 선택 1곳','groups 1–3 (×3): one main KV · 1 selection'),C.teal);
 y+=8;math(p,8,y,L('Decoder · 20층 · m = 1','Decoder · 20 layers · m = 1'),{size:S.title,weight:700,width:318});y+=22;
 add(['F','U','U','U'],L('묶음 1: Full이 선택','group 1: Full selects'),C.teal);
 add(['I','U','U','U'],L('묶음 2~5 (같은 모양 ×4): Reindex가 재선택','groups 2–5 (same ×4): Reindex reselects'),C.red);
 math(p,8,y,L('main KV 한 벌 공유: 첫 Full 층이 H^{L/2}에서 만든다','one shared main KV: first Full layer, from H^{L/2}'),{size:S.note-1,color:C.teal,width:318,weight:600});y+=28;
 p.height=y+84;return p;
}
export default spec('04-layer-layout',L('DeepSeek-V4.1-Flash의 40층 배치','The 40-layer layout of DeepSeek-V4.1-Flash'),L('encoder 2 SWA + 18 CSA2 · decoder 20 CSA2 · KV 묶음과 선택 묶음은 다르다','encoder 2 SWA + 18 CSA2 · decoder 20 CSA2 · KV groups differ from selection groups'),L('Encoder는 처음 두 층이 SWA만 쓰고 나머지 18층은 압축률 2의 CSA2로, [Full, Reuse×5] 묶음 세 개다. Decoder 20층은 압축률 1의 CSA2로, 첫 묶음은 [Full, Reuse×3]이고 나머지 네 묶음은 [Reindex, Reuse×3]이다. Decoder의 main KV는 첫 Full 층이 만든 하나뿐이고, 선택 목록은 Full 하나와 Reindex 네 개가 만든다.','In the encoder the first two layers use SWA only and the other 18 are CSA2 layers (compression 2) in three groups of [Full, Reuse×5]. The 20 decoder layers are CSA2 layers (compression 1): the first group is [Full, Reuse×3] and four more groups are [Reindex, Reuse×3]. The decoder has a single main KV, built by its first Full layer, and five selection lists: one from Full and four from Reindex.'),(l,m)=>[m?mobile(l):desktop(l)]);
