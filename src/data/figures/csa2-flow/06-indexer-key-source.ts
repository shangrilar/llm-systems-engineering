import {Panel,C,L,math,spec,SZ,chain,embed,mat,mul,colW,type Item,type Sizes} from './drawing';
import {connect,flowMatrix,type Label,type Locale,type Wire} from '@llm-systems/viz';
// Where the main compressed KV C^{Comp} and the indexer key K^{IComp} come from, CSA vs CSA2 (report §2.3; V4.1 reference inference/model.py,
// classes Compressor and Indexer). CSA: two separate compressors that both read X (overlapping, with B). CSA2: one compressor (no overlap, no B);
// the indexer key is wk(latent) → k_norm of the main compressed KV, taken after RMSNorm and before RoPE. RoPE (applied to both, at the group's first token) is not drawn.
// Shapes: wkv, wgate [D, c]; wk [c, d_I]. Weight names W^{KV}, W^{IK} are this series' names.
type Row={title:Label;tone:'teal'|'red';items:Item[];note:Label[];from?:'bus'|'above'};
const A=(S:Sizes):Record<string,Row>=>({
 m:{title:L('main KV','main KV'),tone:'teal',from:'bus',items:[mul(S,'W^{KV}_{comp}','D','2c'),mat(S,'C','2c',{tone:'teal'}),{t:'step',label:(S===SZ.mob?L('softmax(Z+B) 풀링','softmax(Z+B) pool'):L('softmax(Z+B) 겹침 풀링','softmax(Z+B) overlap pool')) as unknown as string,w:S===SZ.mob?190:280,tone:'teal'},{t:'step',label:'RMSNorm',w:120,tone:'gray'},mat(S,'C^{Comp}','c',{row:'N_c',tone:'teal'})],
  note:[]},
 i:{title:L('검색용 key','indexer key'),tone:'red',from:'bus',items:[mul(S,'W^{I}_{comp}','D','2d_I'),{t:'step',label:(S===SZ.mob?L('indexer 전용 압축기','indexer compressor'):L('indexer 전용 겹침 압축','indexer-only compressor')) as unknown as string,w:S===SZ.mob?190:260,tone:'red'},mat(S,'K^{IComp}','d_I',{row:'N_c',tone:'red'})],
  note:[L('main과 별개 · X에서 따로','separate from main · from X')]},
});
const B=(S:Sizes):Record<string,Row>=>({
 m:{title:L('main KV','main KV'),tone:'teal',from:'bus',items:[mul(S,'W^{KV}','D','c'),mat(S,'C','c',{tone:'teal'}),{t:'step',label:(S===SZ.mob?L('softmax(Z) 풀링','softmax(Z) pool'):L('softmax(Z) 풀링 (B 없음)','softmax(Z) pool (no B)')) as unknown as string,w:S===SZ.mob?190:270,tone:'teal'},{t:'step',label:'RMSNorm',w:120,tone:'gray'},mat(S,'C^{Comp}','c',{row:'N_c',tone:'teal'})],
  note:[]},
 i:{title:L('검색용 key','indexer key'),tone:'red',from:'above',items:[mat(S,'C^{Comp}','c',{row:'N_c',tone:'teal'}),mul(S,'W^{IK}','c','d_I'),{t:'step',label:'RMSNorm',w:120,tone:'gray'},mat(S,'K^{IComp}','d_I',{row:'N_c',tone:'red'})],
  note:[L('main KV를 투영 (RoPE 앞)','projected from the main KV (pre-RoPE)')]},
});
function desktop(l:Locale){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],bus=80;
 math(p,170,26,L('행 = 토큰 또는 압축 entry · 빨강 = indexer 경로','rows = tokens or compressed entries · red = indexer path'),{size:S.note-2,color:C.muted,width:900});
 const block=(top:number,title:Label,rows:Record<string,Row>)=>{
  math(p,0,top,title,{size:S.title,weight:700,color:C.ink,width:700});
  flowMatrix(p,S,bus,top+54,'X','T','D',{w:colW(S,'D'),dims:'right'});
  const ys=[top+250,top+450],placed:ReturnType<typeof chain>[]=[];
  (['m','i'] as const).forEach((k,n)=>{
   const a=rows[k],y=ys[n];
   p.raw(`<g data-path="${k}">`);
   const pl=chain(p,S,'h',[290,y],a.items,ws,{tone:a.tone,group:`data-path="${k}"`});placed.push(pl);
   if(a.from==='bus')ws.push({from:[bus,top+102],to:[273,y],start:'down',end:'right',group:`data-path="${k}"`});
   p.text(bus+20,y-10,a.title,{size:S.note,weight:600,width:190,color:a.tone==='red'?C.red:undefined});
   const last=pl.at(-1)!;a.note.forEach((t,j)=>math(p,last.right[0]+28,y+7+j*26,t,{size:S.note-2,color:C.muted,width:520}));
   p.raw('</g>');
  });
  return placed;
 };
 block(96,L('CSA · 압축기가 둘, 둘 다 X에서 시작','CSA · two compressors, both start from X'),A(S));
 const pl=block(680,L('CSA2 · 압축기 하나, 검색용 key는 그 결과에서','CSA2 · one compressor, the indexer key comes from its result'),B(S));
 {const a=pl[0].at(-1)!.right,b=pl[1][0].top;ws.push({from:a,to:b,start:'right',end:'down',tone:'teal',via:[[a[0]+36,a[1]],[a[0]+36,a[1]+62],[b[0],a[1]+62]]});}
 connect(p,ws);p.height=1240;return p;
}
function lane(l:Locale,rows:Record<string,Row>,k:'m'|'i',src:'X'|'C'){
 const S=SZ.mob,p=new Panel(l,null,0,328),ws:Wire[]=[],cx=100,a=rows[k];
 math(p,cx+16,24,a.title,{size:S.title,weight:600,width:212,color:a.tone==='red'?C.red:undefined});
 const from=a.from==='above';
 if(!from){p.rect(cx-22,44,44,30,C.blueFill,C.blue,6);math(p,cx,65,'X',{size:S.dim,weight:600,anchor:'middle',width:40,color:C.blue});ws.push({from:[cx,74],to:[cx,143],start:'down',end:'down'});}
 if(from)math(p,cx+16,50,L('위 main KV 결과에서 시작','starts from the main KV above'),{size:S.note-2,color:C.muted,width:212});
 const placed=chain(p,S,'v',[cx,from?116:160],a.items,ws,{tone:a.tone});
 const last=placed.at(-1)!;
 a.note.forEach((n,j)=>math(p,8,last.bottom[1]+48+j*22,n,{size:S.note-2,color:C.muted,width:320}));
 connect(p,ws);p.height=last.bottom[1]+40+a.note.length*22;return p;
}
function mobile(l:Locale){
 const S=SZ.mob,p=new Panel(l,null,0,328);
 p.text(8,22,L('행 = 토큰 또는 압축 entry · 빨강 = indexer','rows = tokens or entries · red = indexer'),{size:S.note-2,color:C.muted,width:320});
 let y=52;
 const add=(title:Label,rows:Record<string,Row>)=>{math(p,8,y+8,title,{size:S.title,weight:700,width:318});y+=28;(['m','i'] as const).forEach(k=>{const a=lane(l,rows,k,'X');embed(p,a,0,y,`data-path="${k}"`);y+=a.height+10;});y+=12;};
 add(L('CSA · 압축기 둘','CSA · two compressors'),A(S));p.line(0,y-6,328,y-6,C.line,1);
 add(L('CSA2 · 압축기 하나','CSA2 · one compressor'),B(S));
 p.text(8,y+12,L('CSA: V4 연재 그림','CSA: V4 series figures'),{size:S.note-2,color:C.muted,width:318});p.text(8,y+34,L('CSA2: V4.1 §2.3 · 공식 코드','CSA2: V4.1 §2.3 · official code'),{size:S.note-2,color:C.muted,width:318});math(p,8,y+56,L('C^{Comp}, K^{IComp}는 RoPE 전','C^{Comp}, K^{IComp} are pre-RoPE'),{size:S.note-2,color:C.muted,width:318});
 p.height=y+80;return p;
}
export default spec('06-indexer-key-source',L('CSA2는 검색용 key를 main KV에서 만든다','CSA2 builds the indexer key from the main KV'),L('CSA는 X에서 압축기 둘 · CSA2는 압축기 하나와 투영 하나','CSA: two compressors from X · CSA2: one compressor and one projection'),L('CSA는 같은 입력 X에서 두 개의 겹침 압축기를 따로 돌려 main KV와 검색용 key를 만든다. CSA2는 겹침과 압축기 안의 절대 위치 임베딩 B가 없는 압축기 하나로 main KV를 만들고, 검색용 key는 그 main KV(RMSNorm 뒤, RoPE 앞)를 가중치 W^{IK}로 투영한 뒤 RMSNorm해서 만든다.','CSA runs two separate overlapping compressors on the same input X to make the main KV and the indexer key. CSA2 builds the main KV with a single compressor that has no overlap and no absolute positional embedding B, and builds the indexer key by projecting that main KV (after RMSNorm, before RoPE) with W^{IK} and normalizing it.'),(l,m)=>[m?mobile(l):desktop(l)]);
