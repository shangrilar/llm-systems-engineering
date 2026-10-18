import {Panel,C,L,math,spec,SZ,chain,embed,mat,mul,colW,type Item,type Sizes} from './drawing';
import {connect,fanOut,flowMatrix,type FanTap,type Label,type Locale,type Wire} from '@llm-systems/viz';
// The attention weights an HCA layer applies to its input X, in three branches. Weights are purple, the
// activations they produce use the branch colour. Later figures use the same names and colours.
// W^{KV}_{win}/W^{KV}_{comp} are this series' names for the code's attention.wkv and compressor.wkv (separate parameters). Z are pre-softmax scores.
const rows=(S:Sizes)=>({
 q:{title:L('Query','Query'),tone:'blue' as const,items:[
  mul(S,'W^{DQ}','D','r_q'),{t:'step',label:'RMSNorm',w:108,tone:'gray'} as Item,mat(S,'c^Q','r_q',{tone:'blue'}),
  mul(S,'W^{UQ}','r_q','n_h·c'),mat(S,'Q','n_h·c',{tone:'blue',heads:'h'})] as Item[],
  note:[]},
 w:{title:L('local KV (SWA)','Local KV (SWA)'),tone:'orange' as const,items:[
  mul(S,'W^{KV}_{win}','D','c'),{t:'step',label:'RMSNorm',w:128,tone:'gray'} as Item,mat(S,'E^{win}','c',{tone:'orange'})] as Item[],
  note:[L('압축 없이 토큰마다 1개','not compressed: one per token'),L('최근 n_{win}개만 사용','only the last n_{win} used')]},
 c:{title:L('압축 KV · 후보 C','Compression KV · C'),tone:'teal' as const,items:[
  mul(S,'W^{KV}_{comp}','D','c'),mat(S,'C','c',{tone:'teal'})] as Item[],
  note:[L('m′개씩 묶어 합칠 내용','content to pool m′ at a time')]},
 z:{title:L('압축 KV · 점수 Z','Compression KV · Z'),tone:'teal' as const,items:[
  mul(S,'W^Z','D','c'),mat(S,'Z','c',{tone:'teal'})] as Item[],
  note:[]},
});
function desktop(l:Locale){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],bus=80,R=rows(S),keys=['q','w','c','z'] as const,ys=[270,455,625,790],fan:FanTap[]=[];
 flowMatrix(p,S,bus,66,'X','T','D',{w:colW(S,'D'),dims:'right'});

 keys.forEach((k,i)=>{
  const a=R[k],y=ys[i];
  p.raw(`<g data-path="${k}">`);
  // The query row is the longest; it starts further left so Q stays inside the panel (its title is short).
  const x0=k==='q'?262:290;
  const placed=chain(p,S,'h',[x0,y],a.items,ws,{tone:a.tone,group:`data-path="${k}"`});
  fan.push({to:[x0-17,y],group:`data-path="${k}"`});
  p.text(bus+20,y-10,a.title,{size:S.note,weight:600,width:190});
  const last=placed.at(-1)!;
  a.note.forEach((n,j)=>k==='q'?math(p,last.x,y+84+j*26,n,{size:S.note-2,color:C.muted,anchor:'middle',width:300}):math(p,last.right[0]+28,y+7-(a.note.length-1)*13+j*26,n,{size:S.note-2,color:C.muted,width:360}));
  p.raw('</g>');
 });
 fanOut(p,[bus,114],fan);connect(p,ws);p.height=ys[3]+110;return p;
}
function lane(l:Locale,k:'q'|'w'|'c'|'z'){
 const S=SZ.mob,p=new Panel(l,null,0,328),ws:Wire[]=[],cx=100,a=rows(S)[k];
 math(p,cx+16,24,a.title,{size:S.title,weight:600,width:212});
 p.rect(cx-22,44,44,30,C.blueFill,C.blue,6);math(p,cx,65,'X',{size:S.dim,weight:600,anchor:'middle',width:40,color:C.blue});
 ws.push({from:[cx,74],to:[cx,143],start:'down',end:'down'});
 const placed=chain(p,S,'v',[cx,160],a.items,ws,{tone:a.tone});
 const last=placed.at(-1)!;
 a.note.forEach((n,j)=>math(p,8,last.bottom[1]+48+j*22,n,{size:S.note-2,color:C.muted,width:320}));
 connect(p,ws);p.height=last.bottom[1]+40+a.note.length*22;return p;
}
function mobile(l:Locale){
 const S=SZ.mob,p=new Panel(l,null,0,328),keys=['q','w','c','z'] as const;

 let y=96;
 keys.forEach((k,i)=>{if(i){y+=34;p.line(0,y-17,328,y-17,C.line,1);}const a=lane(l,k);embed(p,a,0,y,`data-path="${k}"`);y+=a.height;});
 p.height=y+16;return p;
}
export default spec('01-weight-map',L('HCA 층 Attention의 학습 가중치','Learned weights of HCA attention'),L('X에서 시작하는 갈래 · Query, local KV, 압축 KV(C와 Z)','Branches from X · query, local KV, compression KV (C and Z)'),L('HCA 층의 Attention은 입력 X에 가중치를 곱하는 세 갈래로 시작한다. Query는 W^{DQ}와 W^{UQ}의 두 단계로 만들고, 최근 토큰의 KV는 W^{KV}_{win}으로, 압축 후보 C와 softmax 전 점수 Z는 각각 W^{KV}_{comp}와 W^Z로 만든다. 상자 폭은 열 차원의 크기 순서를 따른다.','HCA attention starts from three branches that multiply the input X by weights. The query takes two steps, W^{DQ} then W^{UQ}; recent-token KV uses W^{KV}_{win}; the compression candidate C and its pre-softmax scores Z use W^{KV}_{comp} and W^Z. Box widths follow the order of column sizes.'),(l,m)=>[m?mobile(l):desktop(l)]);
