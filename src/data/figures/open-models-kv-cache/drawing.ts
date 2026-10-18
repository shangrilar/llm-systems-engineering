import {numbered} from './numbers';
import {Panel,C,wrap,type Label,type Locale,type FigureSpec} from '@llm-systems/viz';
import {MODELS,N128,N1M,access,bytes,fmt,tr,L,type Key} from './data';
export {L};

// Opening comparison of the six models in the first feature's two-graph form. Left: storage added per token
// in a long context (BF16 for KV and search keys) with the context-independent state written underneath.
// Right: what one output token touches at 131,072 positions, as three independent bars (KV read, search-key
// read, recurrent matrix read + write). The bars are not stacked: on a log axis a stacked part would not be
// readable as bytes. Section guides reuse the figure with some models in focus.
const AX={store:{lo:2,hi:6,ticks:['100 B','1 kB','10 kB','100 kB','1 MB']},access:{lo:7,hi:11,ticks:['10 MB','100 MB','1 GB','10 GB','100 GB']}};
const PARTS=[{k:'kv',c:C.blue,t:L('KV 읽기','KV read')},{k:'index',c:C.red,t:L('검색용 key 읽기','search-key read')},{k:'state',c:C.purple,t:L('상태 행렬 읽기+쓰기','state matrix read + write')}] as const;
const ROW=128,W=528;
export type Opt={focus?:Key[];n?:number};
const on=(o:Opt,k:Key)=>!o.focus||o.focus.includes(k);
function axis(p:Panel,kind:'store'|'access',top:number,bottom:number,gridAt:number){
 const ax=AX[kind],span=W-24;
 ax.ticks.forEach((t,i)=>{const x=span*i/(ax.hi-ax.lo);
  p.parts.splice(gridAt,0,`<path d="M${x} ${top} L${x} ${bottom}" stroke="${C.line}" stroke-width="1" fill="none"/>`);
  p.text(x,bottom+22,t,{size:14,color:C.muted,anchor:i===0?'start':i===ax.ticks.length-1?'end':'middle',width:80});});
 return (v:number)=>Math.max(2,span*(Math.log10(v)-ax.lo)/(ax.hi-ax.lo));
}
function graph(l:Locale,kind:'store'|'access',o:Opt){
 const n=o.n??N128;
 const title=kind==='store'?L('저장: 토큰당 증가량','Stored: added per token'):L(`문맥 ${fmt(n)}토큰`,`${fmt(n)}-token context`);
 const p=new Panel(l,title,0,W);
 const sub=kind==='store'?L('긴 문맥 평균 · KV·검색용 key BF16 환산','long-context average · KV and search keys in BF16')
  :L('토큰 하나 생성 · 모든 층 · 세 막대는 따로 센 항목','one generated token · all layers · three separate items');
 p.text(0,96,sub,{size:15,color:C.muted,width:W});
 let y=128;
 // Both graphs keep the legend's height so their rows line up.
 if(kind==='access')PARTS.forEach((q,j)=>{p.raw(`<rect x="${[0,150,320][j]}" y="${y-12}" width="22" height="14" rx="3" fill="${q.c}" fill-opacity=".85"/>`);p.text([0,150,320][j]+30,y,q.t,{size:14,width:180});});
 y+=40;
 const top=y-8,gridAt=p.parts.length,X=axis(p,kind,top,top+MODELS.length*ROW,gridAt);
 for(const m of MODELS){
  const f=on(o,m.key),ink=f?C.ink:C.muted,op=f?.9:.3;
  p.text(0,y+14,`${tr(l,m.name)} · ${m.layers}${l==='en'?' layers':'층'}`,{size:17,weight:f?700:400,color:ink,width:W});
  let by=y+26;
  if(kind==='store'){
   p.raw(`<rect x="0" y="${by}" width="${X(m.g).toFixed(1)}" height="18" rx="3" fill="${C.blue}" fill-opacity="${op}"/>`);
   p.text(0,by+40,`${fmt(m.g)} B`,{size:16,weight:f?700:400,color:ink,width:W});
   if(m.S&&m.sKind)p.text(0,by+64,l==='en'?`+ separately: ${tr(l,m.sKind)} ${bytes(m.S)}`:`+ 별도: ${tr(l,m.sKind)} ${bytes(m.S)}`,{size:15,color:f?(m.state?C.purple:C.orange):C.muted,width:W});
  }else{
   const v={kv:m.kv(n),index:m.index(n),state:m.state};
   for(const q of PARTS){
    const val=v[q.k];
    if(val>0){const w=X(val);p.raw(`<rect x="0" y="${by}" width="${w.toFixed(1)}" height="14" rx="2" fill="${q.c}" fill-opacity="${op}"/>`);
     p.text(w+8,by+12,bytes(val),{size:14,color:ink,width:120});}
    by+=21;
   }
   const ext=n>m.maxCtx?(l==='en'?' (extrapolated)':' (외삽)'):'';
   p.text(0,by+14,(l==='en'?'total ':'합 ')+bytes(access(m,n))+ext,{size:15,weight:f?700:400,color:ink,width:W});
  }
  y+=ROW;
 }
 y+=56;
 const notes:Label[]=kind==='store'
  ?[L('로그 눈금: 한 칸에 10배 · 배포 캐시 형식(SGLang 기본 레시피, H200). 별도 줄은 문맥과 무관하게 요청마다 드는 상태.','Log scale, 10× per step · deployed cache formats (SGLang default recipes, H200). The extra line is per-request state independent of context.')]
  :[L('로그 눈금 · 배포 캐시 형식(SGLang 기본 레시피, H200) · 빈 자리는 해당 항목 없음','Log scale · deployed cache formats (SGLang default recipes, H200) · an empty slot means the item does not apply'),
    L('새 KV 쓰기·conv 갱신 제외, 선택한 위치(Reindex는 후보의 검색용 key)만 읽는 구현을 가정해 계산한 양 · 실측 아님 · 외삽 = Qwen config 최대 문맥 262,144 너머','New KV writes and conv updates excluded; computed assuming only selected entries (for Reindex, the candidates’ search keys) are read · not measured · extrapolated = beyond Qwen’s config maximum of 262,144')];
 for(const t of notes){p.text(0,y,t,{size:14,color:C.muted,width:W});y+=wrap(tr(l,t),W,14).length*20+6;}
 p.height=y;return p;
}
export const SOURCES=[
 {label:'Kimi K3 report · §2.1',url:'https://arxiv.org/abs/2607.24653'},
 {label:'Qwen3.8-Flash-Next report · §2.1',url:'https://arxiv.org/abs/2608.30320'},
 {label:'MiMo-V2.6 technical report',url:'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL/blob/main/MiMo_V2_6_technical_report.pdf'},
 {label:'GLM-5.3 config',url:'https://huggingface.co/zai-org/GLM-5.3'},
 {label:'Hy4-preview config',url:'https://huggingface.co/tencent/Hy4-preview'},
 {label:'DeepSeek-V4.1-Flash report · §2.3, §2.4.4',url:'https://arxiv.org/abs/2609.19969'}];
// Access per generated token at two context lengths, same model order and axis in both panels.
export function accessFigure(id:string,title:Label,sub:Label,alt:Label):FigureSpec{
 return{articleId:'open-models-kv-cache',figureId:id,number:'open-models-kv-cache-'+id,eyebrow:numbered('open-models-kv-cache/'+id,L('여섯 모델 비교','Six models')),title,subtitle:sub,
  captionIn:'article',caption:alt,alt,screens:['desktop'],sources:SOURCES,
  panels:(l:Locale)=>[graph(l,'access',{n:N128}),graph(l,'access',{n:N1M})]};
}
// The signature figure: one number per model, the KV cache added per token (deployed cache formats),
// on a linear axis from zero so bar length reads as a ratio (the six values span about 100×). The
// context-independent state has another unit (B per request) and is never added to the bar.
const SW=1104,SX0=300,SX1=856,SMAX=100e3,SROW=92;
function signaturePanel(l:Locale,o:Opt){
 const p=new Panel(l,null,0,SW),X=(v:number)=>SX0+(SX1-SX0)*v/SMAX;
 const top=10,gridAt=p.parts.length;
 let y=top+16;
 for(const m of MODELS){
  const f=on(o,m.key),ink=f?C.ink:C.muted,op=f?.9:.25;
  p.text(0,y+30,tr(l,m.name),{size:19,weight:f?700:400,color:ink,width:SX0-20});
  p.text(0,y+54,`${m.layers}${l==='en'?' layers':'층'}`,{size:14,color:C.muted,width:SX0-20});
  p.raw(`<rect x="${SX0}" y="${y+12}" width="${(X(m.g)-SX0).toFixed(1)}" height="28" rx="4" fill="${C.blue}" fill-opacity="${op}"/>`);
  p.text(X(m.g)+12,y+34,`${m.g<1e3?fmt(m.g)+' B':(m.g/1e3).toFixed(m.g<1e4?2:1)+' kB'}/${l==='en'?'token':'토큰'}`,{size:22,weight:700,color:f?C.blue:C.muted,width:220});
  if(m.S&&m.sKind)p.text(SX0,y+64,l==='en'?`+ fixed state per request: ${tr(l,m.sKind)} ${bytes(m.S)}`:`+ 요청당 고정 상태: ${tr(l,m.sKind)} ${bytes(m.S)}`,{size:14,color:f?(m.state?C.purple:C.orange):C.muted,width:SW-SX0});
  else p.text(SX0,y+64,L('요청당 고정 상태 없음 · 모두 문맥에 비례','no fixed state per request · all grows with context'),{size:14,color:C.muted,width:SW-SX0});
  y+=SROW;
 }
 const bottom=y;
 [0,20e3,40e3,60e3,80e3,100e3].forEach((v,i)=>{const x=X(v);
  p.parts.splice(gridAt,0,`<path d="M${x} ${top} L${x} ${bottom}" stroke="${C.line}" stroke-width="1" fill="none"/>`);
  p.text(x,bottom+24,`${v/1e3} kB`,{size:14,color:C.muted,anchor:'middle',width:80});});
 p.text(SX1+70,bottom+24,l==='en'?'per token':'토큰당',{size:14,color:C.muted,width:120});
 // Notes stack by their wrapped height, so a longer English line never runs into the next note.
 const notes:Label[]=[L('선형 눈금 · 긴 문맥에서 토큰 하나가 늘 때 모든 층에 더해지는 평균 증가량 · 배포 캐시 형식(SGLang 기본 레시피, H200) · 모델 설정으로 계산, 실측 아님','linear scale · average added across all layers when a long context grows by one token · deployed cache formats (SGLang default recipes, H200) · computed from model configs, not measured'),
  L('요청당 고정 상태: 요청마다 따로 들고 문맥과 무관 · 상태 행렬 Kimi FP32·Qwen BF16, conv BF16 · SWA·local KV는 window를 채운 뒤의 값','fixed state per request: held by each request, independent of context · state matrices Kimi FP32, Qwen BF16; conv BF16 · SWA and local KV after the window fills')];
 if(!o.focus)notes.push(L('모델 순서: 토큰당 KV 캐시가 큰 순 · 뒤의 모델 비교 그림도 같은 순서','model order: largest KV cache per token first · later model comparisons keep it'));
 let ny=bottom+60;
 for(const t of notes){p.text(0,ny,t,{size:14,color:C.muted,width:SW});ny+=wrap(tr(l,t),SW,14).length*20+4;}
 p.height=ny-4;return p;
}
export function signature(id:string,title:Label,sub:Label,alt:Label,o:Opt={}):FigureSpec{
 return{articleId:'open-models-kv-cache',figureId:id,number:'open-models-kv-cache-'+id,layout:'wide',eyebrow:numbered('open-models-kv-cache/'+id,L('모델별 KV 캐시','KV cache by model')),title,subtitle:sub,
  captionIn:'article',caption:alt,alt,screens:['desktop'],sources:SOURCES,
  panels:(l:Locale)=>[signaturePanel(l,o)]};
}

// Layer strip shared by the selection-reuse and KV-sharing figures: one column per layer with its KV,
// search key, search and selection, the selection handed on with dashed arrows and a shared KV store drawn
// as a blue line above the readers.
export const LW=1104,X0=250,CW=104;
export const cx=(i:number)=>X0+i*CW+CW/2;
export type Role={name:string;role:Label;kv:'own'|'make'|'read'|'none';key:boolean;search:'full'|'pool'|'none';sel:'make'|'reuse'};
export function stack(p:Panel,y:number,roles:Role[],from:(i:number)=>number|null,kvFrom:number|null,kvName:Label='main KV'){
 const lab=(yy:number,t:Label)=>p.text(X0-14,yy,t,{size:14,color:C.muted,anchor:'end',width:220});
 lab(y+70,kvName);lab(y+112,L('검색용 key','search key'));lab(y+154,L('검색','search'));lab(y+196,L('선택 위치','selection'));
 roles.forEach((r,i)=>{
  const x=cx(i);
  p.text(x,y+16,r.name,{size:15,weight:700,anchor:'middle',width:CW});
  p.text(x,y+36,r.role,{size:13,color:C.muted,anchor:'middle',width:CW});
  if(r.kv==='own'||r.kv==='make'){p.rect(x-46,y+52,92,28,C.blue,C.blue,5);p.text(x,y+71,r.kv==='own'?L('자기 KV','own KV'):L('global KV 생성','builds KV'),{size:r.kv==='own'?13:12,weight:700,color:C.paper,anchor:'middle',width:92});}
  else if(r.kv==='read'){p.rect(x-40,y+52,80,28,C.paper,C.blue,5,true);p.text(x,y+71,L('읽기만','read only'),{size:13,color:C.blue,anchor:'middle',width:80});}
  if(r.key)p.rect(x-40,y+98,80,22,C.redFill,C.red,5);
  if(r.search!=='none'){p.circle(x,y+150,8,r.search==='full'?C.red:C.redFill,C.red);if(r.key)p.line(x,y+120,x,y+142,C.red,1.6);}
  if(r.sel==='make'){p.rect(x-10,y+184,20,20,C.red,C.red,3);if(r.search!=='none')p.line(x,y+158,x,y+184,C.red,1.6);}
  else p.rect(x-10,y+184,20,20,C.paper,C.red,3,true);
  const f=from(i);
  // The selection is handed on from the layer just before (it is the same positions all the way).
  if(f!==null&&r.sel==='reuse'){const fx=cx(i-1);p.path(`M${fx+12} ${y+194} L${x-14} ${y+194}`,C.red,1.6,true,true);}
 });
 // The shared store runs above the reader boxes; each reader takes a short drop into its box.
 if(kvFrom!==null){const fx=cx(kvFrom),ex=cx(roles.length-1);p.path(`M${fx} ${y+52} L${fx} ${y+46} L${ex} ${y+46}`,C.blue,1.8);roles.forEach((r,i)=>{if(r.kv==='read')p.path(`M${cx(i)} ${y+46} L${cx(i)} ${y+51}`,C.blue,1.8);});
  p.text(X0-14,y+46,L('파란 선 = 공유 global KV 읽기','blue line = shared KV read'),{size:12,color:C.blue,anchor:'end',width:200});}
 return y+250;
}
