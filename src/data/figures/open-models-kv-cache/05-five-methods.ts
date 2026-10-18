import {numbered} from './numbers';
import {Panel,C,grid,wrap,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L,tr} from './data';
// Five ways to keep earlier context, on one 12-token example, against full attention. One panel per method
// (the legend sits on the first), so the article can crop each row with its note underneath. A cell is one token's KV in one
// layer; its fill says whether it is stored and read for the next token (strong), stored but not read (light),
// or not stored (dashed). Teaching sizes: window 4 (real 128), top-4 (real 512–2,048), 2 tokens per entry.
const N=12,CW=40,GAP=6,X0=270,W=1104,SX=840;
const cx=(i:number)=>X0+i*(CW+GAP);
type Kind='read'|'kept'|'gone';
function cell(p:Panel,x:number,y:number,w:number,k:Kind,t:string){
 const f=k==='read'?C.blue:k==='kept'?C.blueFill:C.paper,s=k==='gone'?C.slate:C.blue;
 p.rect(x,y,w,34,f,s,5,k==='gone');
 p.text(x+w/2,y+23,t,{size:14,color:k==='read'?C.paper:k==='gone'?C.slate:C.blue,anchor:'middle',width:w});
}
function brace(p:Panel,x0:number,x1:number,y:number,t:Label,c:string=C.blue){
 p.path(`M${x0} ${y} L${x0} ${y+8} L${x1} ${y+8} L${x1} ${y}`,c,1.6);
 p.text((x0+x1)/2,y+28,t,{size:14,color:c,anchor:'middle',width:x1-x0+80});
}
function panels(l:Locale){
 const out:Panel[]=[];
 let p=new Panel(l,null,0,W);
 // Legend.
 const leg:[Kind,Label][]=[['read',L('저장하고 이번에 읽음','stored, read now')],['kept',L('저장만 함','stored, not read')],['gone',L('저장하지 않음','not stored')]];
 leg.forEach(([k,t],i)=>{cell(p,X0+i*230,0,30,k,'');p.text(X0+i*230+40,23,t,{size:15,width:180});});
 p.text(0,23,L('칸 = 토큰 하나의 KV(한 층)','cell = a token’s KV in one layer'),{size:15,color:C.muted,width:240});
 p.text(0,48,L('가시 위치 0–11 · 현재 query는 위치 11 · 다음 토큰을 만들 때 읽는 것을 표시','visible positions 0–11 · the current query is at 11 · what is read to make the next token'),{size:14,color:C.muted,width:W});
 let y=92;
 const row=(i:number,name:Label,tag:Label,h:number,body:(y:number)=>void,store:Label,read:Label)=>{
  if(i){p=new Panel(l,null,0,W);y=14;}
  const nl=wrap(tr(l,name),200,18).length;
  p.text(0,y+26,name,{size:18,weight:700,width:200});
  // A tag may hold two fixed lines split by ' | ', so it never breaks inside a phrase.
  tr(l,tag).split(' | ').forEach((t,k)=>p.text(0,y+28+nl*22+k*20,t,{size:14,color:C.muted,width:200}));
  body(y);
  const sl=wrap(tr(l,store),W-SX,15).length;
  p.text(SX,y+26,store,{size:15,width:W-SX});
  p.text(SX,y+30+sl*21,read,{size:15,width:W-SX});
  p.height=y+h-24;out.push(p);
 };
 const nums=Array.from({length:N},(_,i)=>String(i));
 row(0,L('full attention','Full attention'),L('비교 기준','reference'),112,y=>{
  nums.forEach((t,i)=>cell(p,cx(i),y+6,CW,'read',t));brace(p,cx(0),cx(N-1)+CW,y+46,L('12칸 모두 읽음','all 12 read'));
 },L('저장: 12칸, 문맥에 비례','stored: 12 cells, grows with context'),L('읽기: 12칸, 문맥에 비례','read: 12 cells, grows with context'));
 row(1,'SWA',L('최근 window만 유지 | 예시 4 · 실제 128','recent window only | example 4 · real 128'),112,y=>{
  nums.forEach((t,i)=>cell(p,cx(i),y+6,CW,i>=8?'read':'gone',t));brace(p,cx(8),cx(N-1)+CW,y+46,L('window 4칸','window: 4'));
 },L('저장: 최근 4칸에서 멈춤','stored: stops at the last 4'),L('읽기: 4칸','read: 4 cells'));
 row(2,L('linear attention','Linear attention'),L('고정 크기 상태로 요약','summarized in a fixed-size state'),158,y=>{
  nums.forEach((t,i)=>cell(p,cx(i),y+6,CW,'gone',t));
  // S sits under the right end of the token row: tokens update it, the next token reads it.
  const gx=cx(N-1)+CW-70;grid(p,gx,y+62,4,4,{cell:16,gap:2,tone:()=>'purple'});
  p.path(`M${gx+35} ${y+40} L${gx+35} ${y+56}`,C.purple,2,false,true);
  p.text(gx-14,y+90,L('상태 S (크기 고정, head별 행렬을 하나로 표시)','state S (fixed size; per-head matrices shown as one)'),{size:14,color:C.purple,weight:700,anchor:'end',width:420});
  p.text(gx-14,y+114,L('토큰마다 고쳐 씀 · 개별 KV 없음','rewritten every token · no per-token KV'),{size:14,color:C.purple,anchor:'end',width:340});
 },L('저장: 고정 크기 상태, 문맥과 무관','stored: a fixed-size state, independent of context'),L('접근: S 읽기+쓰기','touched: S read + write'));
 row(3,L('sparse attention','Sparse attention'),L('검색용 key로 선택 | 예시: 상위 4개','pick with search keys | example: top 4'),128,y=>{
  const pick=[2,5,9,11];
  nums.forEach((t,i)=>{p.rect(cx(i)+8,y+4,CW-16,12,C.redFill,C.red,3);cell(p,cx(i),y+22,CW,pick.includes(i)?'read':'kept',t);});
  p.text(cx(0)-8,y+15,L('key','key'),{size:12,color:C.red,anchor:'end',width:40});
  brace(p,cx(0),cx(N-1)+CW,y+62,L('검색용 key 12개를 채점해 KV 4칸을 고름','score 12 search keys, read 4 KV cells'),C.red);
 },L('저장: 12칸 + 검색용 key 12개','stored: 12 cells + 12 search keys'),L('읽기: key 12개 → KV 4칸','read: 12 keys → 4 KV cells'));
 row(4,L('토큰 방향 압축','Compression along tokens'),L('토큰 2개를 entry 하나로','2 tokens into one entry'),136,y=>{
  // Original token axis on top; each entry is one cell centred under the two tokens it merges.
  nums.forEach((t,i)=>{p.rect(cx(i)+4,y+2,CW-8,20,C.grayFill,C.slate,4);p.text(cx(i)+CW/2,y+17,t,{size:12,color:C.slate,anchor:'middle',width:CW});});
  for(let e=0;e<N/2;e++){const m=(cx(2*e)+cx(2*e+1)+CW)/2;cell(p,m-CW/2,y+32,CW,'read','');p.text(m,y+55,`${2*e}–${2*e+1}`,{size:11,color:C.paper,anchor:'middle',width:CW});}
  brace(p,cx(0),cx(N-1)+CW,y+72,L('entry 6개 · 칸 하나 = 토큰 2개를 합친 entry','6 entries · one cell = an entry merging 2 tokens'));
 },L('저장: 6 entry, 증가 기울기 1/2','stored: 6 entries, half the slope'),L('읽기: 6 entry','read: 6 entries'));
 row(5,L('KV 층간 공유','Cross-layer KV sharing'),L('한 층의 KV를 여러 층이 읽기','one layer’s KV read by several'),170,y=>{
  p.text(X0-10,y+29,L('층 A','layer A'),{size:14,weight:700,anchor:'end',width:56});
  p.text(X0-10,y+93,L('층 B','layer B'),{size:14,weight:700,anchor:'end',width:56});
  nums.forEach((t,i)=>cell(p,cx(i),y+6,CW,'read',t));
  p.rect(cx(0),y+70,cx(N-1)+CW-cx(0),34,C.paper,C.slate,5,true);
  p.text((cx(0)+cx(N-1)+CW)/2,y+93,L('자기 KV 없음 · 층 A의 12칸을 읽음','no own KV · reads layer A’s 12 cells'),{size:14,color:C.slate,anchor:'middle',width:520});
  p.path(`M${cx(N-1)+CW+18} ${y+23} L${cx(N-1)+CW+18} ${y+87} L${cx(N-1)+CW+4} ${y+87}`,C.blue,2,false,true);
 },L('저장: 두 층이 12칸 한 벌 공유','stored: two layers share one set of 12'),L('읽기: 층마다 12칸, 합계 24칸','read: 12 cells in each layer, 24 in total'));
 return out;
}
export default {articleId:'open-models-kv-cache',figureId:'05-five-methods',number:'open-models-kv-cache-05-five-methods',layout:'wide',eyebrow:numbered('open-models-kv-cache/05-five-methods',L('다섯 방법','Five methods')),
 title:L('이전 문맥을 남기고 읽는 다섯 방법','Five ways to keep and read earlier context'),
 subtitle:L('같은 12토큰 · 다음 토큰을 만들 때 무엇을 저장하고 무엇을 읽나','the same 12 tokens · what is stored and read for the next token'),
 captionIn:'article',screens:['desktop'],
 caption:L('full attention과 다섯 방법을 같은 12토큰 예시로 비교한다. 칸은 한 층에서 토큰 하나의 KV이며(압축 줄은 토큰 2개를 합친 entry), 진한 칸은 다음 토큰을 만들 때 읽는 KV, 옅은 칸은 저장만 한 KV, 점선 칸은 저장하지 않은 위치다. 가시 위치는 0–11, 현재 query는 위치 11이다. window 4, top-4, 토큰 2개 묶음은 교육용 크기다.','Full attention and five methods on the same 12-token example. A cell is one token’s KV in one layer; strong cells are read for the next token, light cells are stored only, dashed cells are not stored. Positions 0–11 are visible and the query is at 11. Window 4, top-4 and 2-token entries are teaching sizes.'),
 alt:L('여섯 줄. full attention은 12칸을 모두 저장하고 읽는다. SWA는 최근 4칸만 저장하고 읽는다. linear attention은 개별 KV를 남기지 않고 4×4 상태 S 하나를 고쳐 쓴다. sparse attention은 12칸과 검색용 key 12개를 저장하고 key를 채점해 4칸만 읽는다. 토큰 방향 압축은 토큰 2개씩 entry 6개로 저장한다. KV 층간 공유는 층 A만 12칸을 저장하고 층 B는 그것을 읽는다.','Six rows. Full attention stores and reads all 12 cells. SWA stores and reads only the last 4. Linear attention keeps no per-token KV and rewrites one 4×4 state S. Sparse selection stores 12 cells and 12 search keys and reads 4 cells picked by scoring the keys. Compression stores 6 entries of 2 tokens. Cross-layer sharing stores 12 cells in layer A only, and layer B reads them.'),
 sources:[],panels:(l:Locale)=>panels(l)} satisfies FigureSpec;
