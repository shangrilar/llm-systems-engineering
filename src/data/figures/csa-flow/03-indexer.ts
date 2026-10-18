import {Panel,C,L,math,spec,SZ,chain,mat,mul,colW,type Item} from './drawing';
import {connect,fanOut,flowMatrix,type FanTap,flowStep,flowWire,type Label,type Wire} from '@llm-systems/viz';
// The indexer of a CSA layer for one query token t. Candidate keys K^{IComp} come from its own compressor (not from the
// main C^{Comp}); its query comes from the same c^Q as the main query; each indexer head has a weight w^I.
// I[t,s] = Σ_h w_h · ReLU(q_h · K_s); only completed blocks s < ⌊(t+1)/m⌋ are candidates. The top-k block ids point at the
// MAIN compressed entries C^{Comp}_s; K^{IComp} itself is never read by the core attention.
// Hadamard rotation and FP4 simulation are omitted; the head weight also carries a positive constant 1/√(d_I·n_I) (omitted).
// Example: t = 11 → ⌊12/4⌋ = 3 candidates, top-k = 2 (the Pro layer uses k = 1024). Scores are made up for teaching.
const SCORES=[0.6,0.8,0.3],K=2;
function desktop(l:'ko'|'en'){
 const S=SZ.desk,p=new Panel(l,null,1100,1104),ws:Wire[]=[],fan:FanTap[]=[],bus=80,RED=C.red;
 flowMatrix(p,S,bus,66,'X','T','D',{w:colW(S,'D'),dims:'right'});
 math(p,170,84,L('예시: t = 11 → 후보 블록 3개 · 선택 수 top-k: 예시 2 / V4-Flash 512','Example: t = 11 → 3 candidate blocks · top-k: example 2 / V4-Flash 512'),{size:S.note-2,color:C.muted,width:900});
 math(p,170,110,L('빨강 = indexer 경로 · 점수와 선택 결과는 교육용 값','red = indexer path · scores and the selection are made up for teaching'),{size:S.note-2,color:RED,width:900});
 const ys=[300,566,802,1032];
 const row=(y:number,title:Label,items:Item[],fromBus:boolean,x=290,note:Label[]=[],below=0)=>{
  const pl=chain(p,S,'h',[x,y],items,ws,{tone:'red'});
  if(fromBus)fan.push({to:[273,y]});
  p.text(bus+20,y-10,title,{size:S.note,weight:600,width:190,color:RED});
  const last=pl.at(-1)!;note.forEach((n,j)=>below?math(p,last.x,y+below+j*26,n,{size:S.note-2,color:C.muted,anchor:'middle',width:400}):math(p,last.right[0]+28,y+7-(note.length-1)*13+j*26,n,{size:S.note-2,color:C.muted,width:420}));
  return pl;
 };
 const r1=row(ys[0],L('① 후보 key','① Candidate keys'),[mul(S,'W^{IKV}','D','2d_I'),{t:'step',label:L('압축 (m = 4, 겹침)','compress, m = 4') as unknown as string,w:200,tone:'gray',},mat(S,'K^{IComp}','d_I',{row:'⌊T/m⌋',tone:'red'})],true,290,
  [L('indexer 전용 압축기 · 메인 C^{Comp}와 별개','indexer-only compressor · separate from the main C^{Comp}')]);
 { const st=r1[1];flowWire(p,[[st.x,ys[0]+68],[st.x,ys[0]+21]],'red');math(p,st.x,ys[0]+68+S.note+4,L('압축 점수 Z^I','compression scores Z^I'),{size:S.note-2,anchor:'middle',color:RED,width:330}); }
 row(ys[1],L('② Query','② Query'),[mat(S,'c^Q','r_q',{tone:'blue',badge:L('메인 Query와 공유','shared with the main query')}),mul(S,'W^{IUQ}','r_q','n_I·d_I'),{t:'step',label:'RoPE',w:92,tone:'red',input:L('위치 t','position t')},mat(S,'q^I','n_I·d_I',{tone:'red',heads:'j'})],false,360,[],124);
 row(ys[2],L('③ head 가중치','③ Head weights'),[mul(S,'W^w','D','n_I'),mat(S,'w^I','n_I',{tone:'red'})],true,290,
  [L('indexer head마다 가중치 하나','one weight per indexer head')]);
 // ④ score and select for one token
 const y=ys[3];
 math(p,0,y-150,L('④ 한 토큰(t = 11)의 점수와 선택','④ Score and select for one token (t = 11)'),{size:S.note,weight:600,width:700});
 const items:Item[]=[mat(S,'q^I','d_I',{row:'n_I',tone:'red'}),mul(S,'(K^{IComp})^T','d_I','N_s','red'),mat(S,'S^I','N_s',{row:'n_I',tone:'red'}),
  {t:'step',label:'ReLU',w:92,tone:'gray'},{t:'step',label:L('head 가중합','weighted sum') as unknown as string,w:150,tone:'red',input:L('w^I (head 가중치)','w^I (head weights)')}];
 const r4=chain(p,S,'h',[90,y],items,ws,{tone:'red'});
 const last=r4.at(-1)!,cw=56,gap=8,x0=last.right[0]+60,cy=y;
 // I: scores of the candidate blocks, with the top-k highlighted
 const pick=SCORES.map((v,i)=>[v,i] as const).sort((a,b)=>b[0]-a[0]).slice(0,K).map(a=>a[1]);
 math(p,x0+(3*cw+2*gap)/2,y-40,'I',{size:S.name,weight:600,anchor:'middle',width:60,color:RED});
 SCORES.forEach((v,i)=>{
  const x=x0+i*(cw+gap),sel=pick.includes(i);
  p.rect(x,cy-24,cw,48,sel?C.redFill:C.paper,sel?C.red:C.line,0,!sel);
  p.text(x+cw/2,cy+7,String(v),{size:S.dim,anchor:'middle',width:cw,color:sel?C.red:C.muted,weight:sel?700:400});
  p.text(x+cw/2,cy+46,`s=${i}`,{size:S.note-3,anchor:'middle',width:cw,color:C.muted});
 });
 math(p,x0+(3*cw+2*gap)/2,cy+80,'[1, N_s]',{size:S.dim-1,anchor:'middle',color:C.muted,width:120});
 ws.push({from:last.right,to:[x0-2,cy],start:'right',end:'right',tone:'red'});
 const xk=x0+3*cw+2*gap+48+62;
 flowStep(p,S,xk,cy,'top-k',{w:100,tone:'gray'});
 ws.push({from:[x0+3*cw+2*gap,cy],to:[xk-52,cy],start:'right',end:'right',tone:'red'});
 math(p,0,y+156,L(`선택 (k = ${K}): 블록 s = ${pick.sort((a,b)=>a-b).join(', ')} → 메인 압축 entry C^{Comp}_${pick[0]}, C^{Comp}_${pick[1]}`,`selected (k = ${K}): blocks s = ${pick.join(', ')} → main compressed entries C^{Comp}_${pick[0]}, C^{Comp}_${pick[1]}`),{size:S.note-2,color:RED,weight:600,width:900});
 // Notes sit next to what they explain: the unrolled query under q^I, the candidate rule under the scores.
 math(p,0,y+100,L('q^I: 토큰 t의 행을 head별로 펼침','q^I: token t’s row unrolled by head'),{size:S.note-2,color:C.muted,width:320});
 math(p,x0+(3*cw+2*gap)/2,cy+108,L('완성된 블록만 후보','completed blocks only'),{size:S.note-2,color:C.muted,anchor:'middle',width:240});
 fanOut(p,[bus,114],fan);connect(p,ws);p.height=y+230;return p;
}
export default {...spec('03-indexer',L('indexer: 블록을 점수 매기고 고르기','Indexer: scoring and picking blocks'),L('자체 압축 key · 공유 Query latent · head 가중치 → ReLU 가중합 → top-k','Own compressed keys · shared query latent · head weights → ReLU-weighted sum → top-k'),L('indexer는 메인 압축기와 별개의 압축기로 후보 key K^{IComp}를 만들고, 메인 Query와 같은 c^Q에서 올린 q^I와 head 가중치 w^I로 점수 I[t, s] = Σ_h w_h · ReLU(q_h · K_s)를 계산해, 완성된 블록 중 점수가 큰 k개의 번호를 고른다. 그 번호는 메인 압축 entry를 가리킨다.','The indexer builds candidate keys K^{IComp} with a compressor separate from the main one, scores each completed block with I[t, s] = Σ_h w_h · ReLU(q_h · K_s) using q^I (raised from the same c^Q as the main query) and the head weights w^I, and picks the k best block ids. Those ids point at the main compressed entries.'),(l)=>[desktop(l as 'ko'|'en')]),screens:['desktop' as const]};
