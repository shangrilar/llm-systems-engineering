import {numbered} from './numbers';
import {Panel,C,grid,math,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L} from './data';
// How a fixed-size state is written and read, for one head. Rows are variants, not steps run in sequence:
// r0 the common frame (linear attention: add k vᵀ, read with q), r1 the delta rule (write only the difference
// from what S already predicts for k), r2 the decay that GDN (one scalar α for all of S) and KDA (one factor
// per key component, i.e. per row: Diag(α) S) apply before the delta write. Qwen3.8-Flash-Next report
// eq. (4)–(5), Kimi K3 report eq. (1). S is d_k × d_v: rows are key components, columns value components.
// Every matrix shown is computed from the example vectors with the formulas printed under it; shading only
// rescales those values for display. 4 × 4 and β = 0.6 are teaching values; real heads are 128 × 128.
const W=1104,CELL=22,G=3,SZ=4*CELL+3*G,BETA=.6;
type M=number[][];
const S0:M=[[.55,.2,.35,.7],[.3,.6,.15,.4],[.75,.35,.5,.2],[.25,.45,.65,.55]];
const k=[.9,.15,.7,.1],v=[.3,.8,.5,.6],q=[.2,.7,.4,.9];
const add=(a:M,b:M)=>a.map((r,i)=>r.map((x,j)=>x+b[i][j])),outer=(a:number[],b:number[],s=1)=>a.map(x=>b.map(y=>s*x*y));
const tmul=(S:M,x:number[])=>S[0].map((_,j)=>S.reduce((s,r,i)=>s+r[j]*x[i],0));   // Sᵀx
const purple=(a:number)=>`rgba(121,84,163,${Math.max(.06,Math.min(1,a)).toFixed(2)})`;
const gray=(a:number)=>`rgba(101,119,137,${Math.max(.08,Math.min(1,a)).toFixed(2)})`;
function mat(p:Panel,x:number,y:number,v:M,name:string,o:{scale?:number;color?:(a:number)=>string;sub?:Label;diag?:boolean}={}){
 const r=v.length,c=v[0].length,sc=o.scale??1,col=o.color??purple;
 grid(p,x,y,r,c,{cell:CELL,gap:G,fill:(i,j)=>o.diag&&i!==j?C.paper:col(Math.abs(v[i][j])/sc)});
 math(p,x+(c*(CELL+G)-G)/2,y-12,name,{size:18,weight:700,color:C.purple,anchor:'middle',width:200});
 if(o.sub)p.text(x+(c*(CELL+G)-G)/2,y+r*(CELL+G)+18,o.sub,{size:13,color:C.muted,anchor:'middle',width:200});
}
const colv=(x:number[])=>x.map(a=>[a]),rowv=(x:number[])=>[x];
const sym=(p:Panel,x:number,y:number,t:string)=>p.text(x,y,t,{size:22,weight:700,color:C.muted,anchor:'middle',width:30});
const arrow=(p:Panel,x0:number,y:number,x1:number,c:string=C.muted)=>p.path(`M${x0} ${y} L${x1} ${y}`,c,2,false,true);
function panel(l:Locale){
 const p=new Panel(l,null,0,W);
 let y=0;
 const head=(i:number,t:Label,s:Label)=>{
  if(i)p.line(0,y,W,y,C.line,1);
  p.text(0,y+34,t,{size:19,weight:700,width:W});math(p,0,y+60,s,{size:15,color:C.muted,width:W});
 };
 // r0: the basic rule. The outer product k v^⊤ is drawn as a matrix with k down its left edge and v^⊤ along its top.
 const U0=outer(k,v),S1=add(S0,U0),o1=tmul(S1,q);
 // Every state matrix shares one colour scale so the same S_{t−1} looks the same in all rows; vectors use their own,
 // and the change matrix of the delta rule uses its own blue (up) / red (down) scale.
 const vhAll=tmul(S0,k),dAll=v.map((x,j)=>x-vhAll[j]),U1=outer(k,dAll,BETA),S2all=add(S0,U1),SC=Math.max(...S0.flat(),...S1.flat(),...S2all.flat()),sc0=SC;
 const step=(x:number,yy:number,t:Label)=>p.text(x,yy,t,{size:15,weight:700,color:C.ink,width:420});
 // Outer product block: column a on the left of matrix U, row b above it. Labels: a below, b to the right, U below.
 const outerBlock=(x:number,yy:number,a:number[],b:number[],U:M,an:string,bn:string,un:Label,fill:(i:number,j:number)=>string,bfill?:(j:number)=>string)=>{
  const ux=x+CELL+8;
  grid(p,x,yy,4,1,{cell:CELL,gap:G,fill:(i)=>purple(Math.abs(a[i]))});
  math(p,x+CELL/2,yy+SZ+18,an,{size:16,weight:700,color:C.purple,anchor:'middle',width:60});
  grid(p,ux,yy-CELL-8,1,4,{cell:CELL,gap:G,fill:(_,j)=>bfill?bfill(j):purple(Math.abs(b[j])/Math.max(...b.map(Math.abs)))});
  math(p,ux+SZ+8,yy-CELL+8,bn,{size:16,weight:700,color:C.purple,width:60});
  grid(p,ux,yy,4,4,{cell:CELL,gap:G,fill});
  // English labels are wider than Korean; left-align them on the matrix so they clear the vector name.
  if(p.locale==='en')math(p,ux,yy+SZ+18,un,{size:14,color:C.muted,width:240});
  else math(p,ux+SZ/2,yy+SZ+18,un,{size:14,color:C.muted,anchor:'middle',width:220});
  return ux+SZ;
 };
 p.raw('<g data-path="r0">');
 head(0,L('기본 규칙: 새 값을 더해 쓰고 query로 읽기','Basic rule: add the new value, read with the query'),
  L('상태 S는 head마다 d_k × d_v 행렬 하나 · 행 = key 성분, 열 = value 성분','one d_k × d_v matrix per head · rows = key components, columns = value components'));
 let my=y+150;
 step(40,my-58,L('쓰기','write'));
 mat(p,40,my,S0,'S_{t−1}',{scale:sc0,sub:L('행 = key · 열 = value','rows key · cols value')});
 sym(p,40+SZ+26,my+SZ/2+8,'+');
 let ex=outerBlock(40+SZ+50,my,k,v,U0,'k_t','v_t^⊤',L('k_t v_t^⊤ (외적)','k_t v_t^⊤ (outer product)'),(i,j)=>purple(U0[i][j]/sc0));
 p.text(p.locale==='en'?ex-SZ:ex-SZ/2,my+SZ+38,L('칸 = 왼쪽 × 위쪽','cell = left × top'),{size:13,color:C.muted,anchor:p.locale==='en'?'start':'middle',width:200});
 sym(p,ex+26,my+SZ/2+8,'=');
 mat(p,ex+50,my,S1,'S_t',{scale:sc0});
 const rx=640;
 p.line(rx-40,my-60,rx-40,my+SZ+40,C.line,1);
 step(rx,my-58,L('읽기','read'));
 mat(p,rx,my+SZ/2-CELL/2,rowv(q),'q_t^⊤',{scale:1});
 sym(p,rx+SZ+20,my+SZ/2+8,'×');
 const ox=rx+SZ+44;
 mat(p,ox,my,S1,'S_t',{scale:sc0});
 sym(p,ox+SZ+22,my+SZ/2+8,'=');
 mat(p,ox+SZ+46,my+SZ/2-CELL/2,rowv(o1),'o_t^⊤',{scale:Math.max(...o1)});
 math(p,rx,my+SZ+18,L('q_t가 S_t의 행마다 가중치를 주고 행을 더함','q_t weights the rows of S_t and sums them'),{size:13,color:C.muted,width:420});
 math(p,40,my+SZ+62,'S_t = S_{t−1} + k_t v_t^⊤',{size:17,width:300});
 math(p,rx,my+SZ+62,'o_t^⊤ = q_t^⊤ S_t',{size:17,width:420});
 y=my+SZ+88;p.raw('</g>');
 // r1: delta rule, in the same equation grammar: ① predict with k (the read of r0), ② the difference, ③ write it.
 const vh=vhAll,d=dAll,S2=S2all,sc1=SC,us=Math.max(...U1.flat().map(Math.abs));
 const div=(x:number)=>x>=0?`rgba(36,112,187,${Math.max(.08,x/us).toFixed(2)})`:`rgba(179,66,66,${Math.max(.08,-x/us).toFixed(2)})`;
 const ds=Math.max(...dAll.map(Math.abs)),dfill=(j:number)=>{const x=dAll[j]/ds;return x>=0?`rgba(36,112,187,${Math.max(.08,x).toFixed(2)})`:`rgba(179,66,66,${Math.max(.08,-x).toFixed(2)})`;};
 const fmt=(x:number)=>(x>=0?'+':'−')+Math.abs(x).toFixed(2);
 p.raw('<g data-path="r1">');
 head(1,L('델타 규칙: 예측과의 차이를 쓰기','Delta rule: write the difference from the prediction'),
  L('새 v_t 전체가 아니라, S_{t−1}이 k_t에 대해 이미 예측하는 값 v̂와의 차이 Δ를 씀 (예시 β_t = 0.6)','write not all of v_t but its difference Δ from the value v̂ that S_{t−1} already predicts for k_t (example β_t = 0.6)'));
 my=y+150;
 const vs=Math.max(...vh,...v);
 step(40,my-58,L('① 지금 상태로 예측하기','① predict with the current state'));
 mat(p,40,my+SZ/2-CELL/2,rowv(k),'k_t^⊤',{scale:1});
 sym(p,40+SZ+20,my+SZ/2+8,'×');
 mat(p,40+SZ+44,my,S0,'S_{t−1}',{scale:sc1});
 sym(p,40+2*SZ+66,my+SZ/2+8,'=');
 mat(p,40+2*SZ+90,my+SZ/2-CELL/2,rowv(vh),'v̂^⊤',{scale:vs,sub:L('예측값','prediction')});
 p.line(rx-40,my-60,rx-40,my+SZ+30,C.line,1);
 step(rx,my-58,L('② 새 값과의 차이','② difference from the new value'));
 mat(p,rx,my+SZ/2-CELL/2,rowv(v),'v_t^⊤',{scale:vs,sub:L('새 값','new value')});
 sym(p,rx+SZ+20,my+SZ/2+8,'−');
 mat(p,rx+SZ+44,my+SZ/2-CELL/2,rowv(vh),'v̂^⊤',{scale:vs});
 sym(p,rx+2*SZ+66,my+SZ/2+8,'=');
 const dx=rx+2*SZ+90;
 grid(p,dx,my+SZ/2-CELL/2,1,4,{cell:CELL,gap:G,fill:(_,j)=>dfill(j)});
 math(p,dx+SZ/2,my+SZ/2-CELL/2-12,'Δ^⊤',{size:18,weight:700,color:C.purple,anchor:'middle',width:80});
 p.text(dx+SZ/2,my+SZ/2+CELL/2+18,d.map(fmt).join('  '),{size:12,color:C.ink,anchor:'middle',width:200});
 let my2=my+SZ+120;
 step(40,my2-58,L('③ 차이를 상태에 쓰기','③ write the difference into the state'));
 mat(p,40,my2,S0,'S_{t−1}',{scale:sc1});
 sym(p,40+SZ+26,my2+SZ/2+8,'+');
 ex=outerBlock(40+SZ+50,my2,k,d,U1,'k_t','Δ^⊤',L('β_t k_t Δ^⊤ (β_t = 0.6)','β_t k_t Δ^⊤ (β_t = 0.6)'),(i,j)=>div(U1[i][j]),dfill);
 sym(p,ex+26,my2+SZ/2+8,'=');
 mat(p,ex+50,my2,S2,'S_t',{scale:sc1});
 math(p,rx,my2+14,L('k_t가 큰 행 0·2가 크게 바뀜','rows 0 and 2, where k_t is large, change most'),{size:14,color:C.ink,width:420});
 p.text(rx,my2+40,L('파랑 = 증가 · 빨강 = 감소 · 진하기 = 변화의 크기','blue = up · red = down · shade = size of the change'),{size:14,color:C.muted,width:440});
 p.text(rx,my2+64,L('(변화량은 상태 행렬과 다른 배율)','(changes use their own scale)'),{size:14,color:C.muted,width:440});
 math(p,rx,my2+88,L('갱신한 S_t는 위와 같이 query로 읽음','the updated S_t is read with the query as above'),{size:14,color:C.muted,width:440});
 math(p,40,my2+SZ+62,'S_t = S_{t−1} + β_t k_t Δ^⊤,   Δ = v_t − v̂',{size:17,width:W-40});
 y=my2+SZ+88;p.raw('</g>');
 // r2: decay before the delta write.
 const a=[.9,.35,.75,.2],ALPHA=.5;
 p.raw('<g data-path="r2">');
 head(2,L('감쇠: 델타 쓰기 앞에서 S를 줄이기','Decay: scale S down before the delta write'),
  L('GDN은 S 전체에 같은 비율 α_t, KDA는 key 성분(행)마다 다른 비율','GDN uses one ratio α_t for all of S, KDA one ratio per key component (row)'));
 my=y+112;
 const sc2=SC;
 // GDN: scalar times S.
 math(p,40+12,my+SZ/2+7,'α_t',{size:17,weight:700,color:C.purple,anchor:'middle',width:40});
 sym(p,40+40,my+SZ/2+8,'×');
 mat(p,40+64,my,S0,'S_{t−1}',{scale:sc2});
 arrow(p,40+64+SZ+12,my+SZ/2,40+64+SZ+56);
 mat(p,40+64+SZ+70,my,S0.map(r=>r.map(x=>x*ALPHA)),'S̃',{scale:sc2,sub:L('GDN · 모든 칸 같은 비율','GDN · same ratio everywhere')});
 // KDA: Diag(α) times S.
 const kx=520;
 p.line(kx-40,my-20,kx-40,my+SZ+30,C.line,1);
 mat(p,kx,my,a.map((x,i)=>a.map((_,j)=>i===j?x:0)),'Diag(α_t)',{scale:1,diag:true});
 sym(p,kx+SZ+18,my+SZ/2+8,'×');
 mat(p,kx+SZ+40,my,S0,'S_{t−1}',{scale:sc2});
 arrow(p,kx+2*SZ+52,my+SZ/2,kx+2*SZ+96);
 mat(p,kx+2*SZ+110,my,S0.map((r,i)=>r.map(x=>x*a[i])),'S̃',{scale:sc2,sub:L('KDA · 행마다 다른 비율','KDA · a ratio per row')});
 math(p,40,my+SZ+58,'GDN (Qwen3.8-Flash-Next):  S̃ = α_t S_{t−1}',{size:17,width:420});
 math(p,kx,my+SZ+58,'KDA (Kimi K3):  S̃ = Diag(α_t) S_{t−1}',{size:17,width:420});
 math(p,40,my+SZ+92,L('두 방식 모두 그다음  v̂ = S̃^⊤ k_t로 예측하고  S_t = S̃ + β_t k_t (v_t − v̂)^⊤','both then predict  v̂ = S̃^⊤ k_t  and write  S_t = S̃ + β_t k_t (v_t − v̂)^⊤'),{size:16,color:C.muted,width:W-40});
 y=my+SZ+112;p.raw('</g>');
 p.text(0,y+30,L('예시 4 × 4 · 실제 head 하나는 128 × 128 · 보라 칸의 진하기는 값의 크기 · 상태 행렬은 세 줄 공통 배율, 델타 규칙의 새 값과 예측값은 같은 배율, 그 밖의 벡터는 각자의 배율','example 4 × 4 · a real head is 128 × 128 · purple shading shows magnitude · one scale for all state matrices, one for the new value and prediction, others their own'),{size:14,color:C.muted,width:W});
 p.height=y+44;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'08-state-update',number:'open-models-kv-cache-08-state-update',layout:'wide',eyebrow:numbered('open-models-kv-cache/08-state-update',L('linear attention','Linear attention')),
 title:L('상태 행렬에 쓰고 읽기','Writing to and reading from the state matrix'),
 subtitle:L('head 하나 · 세 가지 쓰기 방식: 기본, 차이로 쓰기, 감쇠를 더한 쓰기','one head · three ways to write: basic, writing the difference, adding decay'),
 captionIn:'article',screens:['desktop'],
 caption:L('linear attention 층의 head 하나. 공통 틀은 k v^⊤를 더해 쓰고 q로 행을 가중합해 읽는다. 델타 규칙은 S가 k에 대해 예측하는 값과의 차이만 쓴다. GDN은 그 앞에서 S 전체를 같은 비율로, KDA는 key 성분마다 다른 비율로 줄인다. 칸 값은 그림의 식으로 계산한 교육용 값이다.','One head of a fixed-size-state layer. The common frame adds k v^⊤ and reads by weighting the rows with q. The delta rule writes only the difference from what S predicts for k. Before that, GDN shrinks all of S by one ratio and KDA by a ratio per key component. Cell values are teaching values computed with the formulas shown.'),
 alt:L('세 줄. 첫 줄은 4×4 상태 S_{t−1}에 k_t와 v_t의 외적을 더해 S_t를 만들고, q_t가 S_t의 행마다 가중치를 주어 더해 출력 o_t를 읽는다. 둘째 줄은 S_{t−1}과 k_t로 예측 v̂를 읽고 v_t와의 차이 Δ(부호 −, +, −, −)를 β = 0.6으로 k가 큰 행 위주로 쓴다. 셋째 줄은 GDN이 S 전체에 α를 곱하고, KDA가 Diag(α)를 곱해 행마다 다른 비율로 줄인 뒤 같은 델타 쓰기를 하는 것을 비교한다.','Three rows. First: the 4×4 state S_{t−1} plus the outer product of k_t and v_t gives S_t, and q_t weights the rows of S_t, which are summed into the output o_t. Second: S_{t−1} and k_t give the prediction v̂, and the difference Δ from v_t (signs −, +, −, −) is written with β = 0.6, mostly into rows where k is large. Third: GDN multiplies all of S by α and KDA multiplies by Diag(α), shrinking each row by its own ratio, before the same delta write.'),
 sources:[{label:'Qwen3.8-Flash-Next report · eq. (4)–(5)',url:'https://arxiv.org/abs/2608.30320'},{label:'Kimi K3 report · eq. (1)',url:'https://arxiv.org/abs/2607.24653'}],
 panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
