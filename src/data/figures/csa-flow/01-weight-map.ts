import {Panel,C,L,math,spec,SZ,chain,mat,mul,colW,type Item,type Sizes} from './drawing';
import {connect,fanOut,flowMatrix,type FanTap,type Label,type Wire} from '@llm-systems/viz';
// The attention weights of a CSA layer, folded to what differs from HCA. The Query path up to c^Q is drawn because the indexer
// reuses c^Q (after q_norm); everything after c^Q, the local-KV path and the output side have the same structure as HCA
// (each layer still has its own parameters) and are listed at the bottom. CSA-only: the overlapping compressor (a|b halves,
// 2c wide) and the indexer, drawn as one box whose inside is figure 3.
// Names: W^{KV}_{comp} is this series' name for compressor.wkv (the report's W^a_KV | W^b_KV).
type Row={title:Label;tone:'blue'|'orange'|'teal'|'red';items:Item[];note:Label[]};
const rows=(S:Sizes):Record<string,Row>=>({
 q:{title:L('Query 공통부','Shared query part'),tone:'blue',items:[mul(S,'W^{DQ}','D','r_q'),{t:'step',label:'RMSNorm',w:128,tone:'gray'},mat(S,'c^Q','r_q',{tone:'blue'})],
  note:[L('indexer가 같은 c^Q를 쓴다','the indexer reuses this c^Q'),L('c^Q → W^{UQ} → Q는 HCA와 같음','c^Q → W^{UQ} → Q: as in HCA')]},
 c:{title:L('압축 KV · 후보 C','Compression KV · C'),tone:'teal',items:[mul(S,'W^{KV}_{comp}','D','2c'),mat(S,'C','2c',{tone:'teal'})],
  note:[L('앞 절반 a: 이전 구간용','first half a: for the previous span'),L('뒤 절반 b: 자기 구간용 (겹침)','second half b: for its own span (overlap)')]},
 z:{title:L('압축 KV · 점수 Z','Compression KV · Z'),tone:'teal',items:[mul(S,'W^Z','D','2c'),mat(S,'Z','2c',{tone:'teal'})],
  note:[]},
});
// Omitted paths: CSA has them too, with its own parameters.
const same:Label[]=[L('local KV·출력 경로는 HCA와 같아 생략 (파라미터는 층마다 따로)','local KV and output paths are as in HCA and omitted (parameters are per layer)')];
function desktop(l:'ko'|'en'){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],bus=80,R=rows(S),ys=[270,452,640,820],fan:FanTap[]=[];
 flowMatrix(p,S,bus,66,'X','T','D',{w:colW(S,'D'),dims:'right'});

 const place=(k:'q'|'c'|'z',y:number)=>{
  const a=R[k];p.raw(`<g data-path="${k}">`);
  const pl=chain(p,S,'h',[290,y],a.items,ws,{tone:a.tone,group:`data-path="${k}"`});
  fan.push({to:[273,y],group:`data-path="${k}"`});
  p.text(bus+20,y-10,a.title,{size:S.note,weight:600,width:190});
  const last=pl.at(-1)!;a.note.forEach((n,j)=>math(p,last.right[0]+28,y+7-(a.note.length-1)*13+j*26,n,{size:S.note-2,color:C.muted,width:400}));
  p.raw('</g>');return pl;
 };
 const q=place('q',ys[0]);place('c',ys[2]);place('z',ys[3]);
 // the indexer as one box: it takes X and the shared c^Q and returns the selected block ids
 const yi=ys[1],cx=700,bw=210,cQ=q[2];
 p.raw('<g data-path="iq">');
 p.rect(cx-bw/2,yi-26,bw,52,C.redFill,C.red,10);
 p.text(cx,yi+7,'indexer',{size:S.dim+1,anchor:'middle',width:bw-10,color:C.red,weight:700});
 p.text(bus+20,yi-10,L('indexer','indexer'),{size:S.note,weight:600,width:190,color:C.red});
 // The colour key sits right under the red branch it explains.
 math(p,bus+20,yi+30,L('빨강 = indexer 경로 (CSA에만 있음)','red = indexer path (CSA only)'),{size:S.note-2,color:C.red,width:420});
 fan.push({to:[cx-bw/2-2,yi],tone:'red'});ws.push({from:cQ.right,to:[cx,yi-28],start:'right',end:'down',tone:'blue'});
 const ids=mat(S,'ids','k',{row:'T',tone:'red'});
 const idsPlaced=chain(p,S,'h',[cx+bw/2+120,yi],[ids],ws,{tone:'red'});
 ws.push({from:[cx+bw/2+2,yi],to:[idsPlaced[0].left[0]-6,yi],start:'right',end:'right',tone:'red'});
 [L('내보내는 것: 선택한 블록 번호 (top-k)','outputs: the selected block ids (top-k)')].forEach((n,j)=>math(p,cx-bw/2,yi+62+j*26,n,{size:S.note-2,color:C.muted,width:480}));
 p.raw('</g>');
 same.forEach((n,j)=>math(p,0,ys[3]+110+j*26,n,{size:S.note-2,color:C.muted,width:1100}));
 fanOut(p,[bus,114],fan);connect(p,ws);p.height=ys[3]+140;return p;
}
export default {...spec('01-weight-map',L('CSA 층 Attention의 학습 가중치','Learned weights of CSA attention'),L('HCA와 다른 부분: 겹침 압축(폭 2배)과 indexer','What differs from HCA: overlapping compression (twice as wide) and the indexer'),L('CSA 층은 HCA와 같은 구조의 Query·local KV·출력 가중치에 더해, 폭이 두 배인 겹침 압축 가중치(W^{KV}_{comp}와 W^Z의 a|b 절반)와 indexer를 가진다. indexer는 X와 메인 Query가 공유하는 c^Q를 받아 선택할 블록 번호를 내보낸다.','A CSA layer has query, local-KV and output weights with HCA’s structure, plus twice-as-wide overlapping-compression weights (the a|b halves of W^{KV}_{comp} and W^Z) and an indexer. The indexer takes X and the c^Q shared with the main query and returns the block ids to select.'),(l)=>[desktop(l as 'ko'|'en')]),screens:['desktop' as const]};
