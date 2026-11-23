import {numbered} from './numbers';
import {Panel,C,math,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L,MODELS,bytes,fmt,tr} from './data';
// Per output token, how the fixed state's access (flat) compares with the access that grows with context, for
// the two fixed-state models. Same log axes in both panels. Kimi: MLA global KV read (24 layers, all positions)
// crosses the KDA matrix read + write at N = state / (24 × 1,152). Qwen: QSA reads at most 2,048 positions plus
// the tail, so its KV read stays flat; the search-key read grows; the sum of both crosses the GDN matrix
// read + write at 81,920 and the search alone at 147,456, both within the config maximum 262,144.
// Computed bytes from data.ts (deployed formats), not measured.
const W=528,X0=70,X1=W-14,Y0=120,Y1=470,NX=[12,20],NY=[6,11];
const X=(n:number)=>X0+(X1-X0)*(Math.log2(n)-NX[0])/(NX[1]-NX[0]);
const Y=(v:number)=>Y1-(Y1-Y0)*(Math.log10(v)-NY[0])/(NY[1]-NY[0]);
const NS=Array.from({length:81},(_,i)=>Math.round(2**(NX[0]+i*(NX[1]-NX[0])/80)));
// dash: 'sum' draws a dotted line (a sum of two items); faint draws the extrapolated part lighter (not dashed).
function line(p:Panel,f:(n:number)=>number,c:string,from=0,to=Infinity,dash:false|'sum'=false,faint=false){
 const pts=NS.filter(n=>n>=from&&n<=to).map(n=>`${X(n).toFixed(1)} ${Y(f(n)).toFixed(1)}`);
 p.raw(`<path d="M${pts.join(' L')}" stroke="${c}" stroke-width="${dash?2:2.6}" fill="none"${dash?' stroke-dasharray="2 4"':''}${faint?' stroke-opacity=".35"':''}/>`);
}
function frame(p:Panel){
 for(let e=NY[0];e<=NY[1];e++){const y=Y(10**e);p.line(X0,y,X1,y,C.line,1);p.text(X0-8,y+5,['1 MB','10 MB','100 MB','1 GB','10 GB','100 GB'][e-6],{size:13,color:C.muted,anchor:'end',width:70});}
 for(let e=NX[0];e<=NX[1];e+=2){const x=X(2**e);p.line(x,Y0,x,Y1,C.line,1);p.text(x,Y1+22,e<20?`${2**(e-10)}K`:'1M',{size:13,color:C.muted,anchor:'middle',width:50});}
 p.text((X0+X1)/2,Y1+48,L('문맥 길이 N (토큰, 로그 눈금, 1K = 1,024)','context length N (tokens, log scale, 1K = 1,024)'),{size:14,color:C.muted,anchor:'middle',width:W});
}
function dot(p:Panel,n:number,v:number,t:string,dx=8,dy=-10,anchor='start'){
 p.circle(X(n),Y(v),6,C.paper,C.ink);p.text(X(n)+dx,Y(v)+dy,t,{size:14,weight:700,anchor,width:200});
}
function kimi(l:Locale){
 const m=MODELS.find(x=>x.key==='kimi')!,p=new Panel(l,L('Kimi K3 · KDA 69층 + MLA 24층','Kimi K3 · KDA 69 + MLA 24'),0,W);
 frame(p);
 line(p,()=>m.state,C.purple);line(p,n=>m.kv(n),C.blue);
 const nx=m.state/(24*1152);
 dot(p,nx,m.state,fmt(nx),10,26);
 p.text(X0+8,Y(m.state)-10,L(`상태 행렬 읽기+쓰기 ${bytes(m.state)}`,`state matrix read + write ${bytes(m.state)}`),{size:14,weight:700,color:C.purple,width:300});
 p.text(X(2**17)-6,Y(m.kv(2**17))-12,L('MLA global KV 읽기','MLA global KV read'),{size:14,weight:700,color:C.blue,anchor:'end',width:200});
 p.text(X0+8,Y1-12,L('검색 없음 · MLA 24층이 모든 위치를 읽음','no search · 24 MLA layers read every position'),{size:13,color:C.muted,width:W});
 p.height=Y1+60;return p;
}
function qwen(l:Locale){
 const m=MODELS.find(x=>x.key==='qwen')!,p=new Panel(l,L('Qwen3.8-Flash-Next · GDN 36층 + QSA 12층','Qwen3.8-Flash-Next · GDN 36 + QSA 12'),0,W);
 const mx=m.maxCtx;
 p.rect(X(mx),Y0,X1-X(mx),Y1-Y0,C.surface,C.surface,0);
 p.line(X(mx),Y0,X(mx),Y1,C.slate,1.5,true);
 p.text(X(mx)+6,Y0+18,L('외삽 (옅은 선)','extrapolated (faint)'),{size:13,color:C.slate,width:120});
 p.text(X(mx)-4,Y0+18,L(`config 최대 ${fmt(mx)}`,`config max ${fmt(mx)}`),{size:12,color:C.slate,anchor:'end',width:160});
 frame(p);
 line(p,()=>m.state,C.purple);
 line(p,n=>m.kv(n),C.blue,0,mx);line(p,n=>m.kv(n),C.blue,mx,Infinity,false,true);
 line(p,n=>m.index(n),C.red,0,mx);line(p,n=>m.index(n),C.red,mx,Infinity,false,true);
 line(p,n=>m.kv(n)+m.index(n),C.ink,0,mx,'sum');
 const nSum=(m.state-m.kv(2**16))/(12*256/4),nIdx=m.state/(12*256/4);
 // Two crossings sit close together: each gets its own label at a different height, tied to its point by a thin leader.
 dot(p,nSum,m.state,'');p.line(X(nSum),Y(m.state)-7,X(nSum),Y(m.state)-58,C.muted,1);
 p.text(X(nSum)-6,Y(m.state)-48,L(`KV+검색 = 상태: ${fmt(nSum)}토큰`,`KV + search = state: ${fmt(nSum)}`),{size:13,weight:700,anchor:'end',width:230});
 dot(p,nIdx,m.state,'');p.line(X(nIdx),Y(m.state)-7,X(nIdx),Y(m.state)-92,C.muted,1);
 p.text(X(nIdx)-6,Y(m.state)-82,L(`검색 = 상태: ${fmt(nIdx)}토큰`,`search = state: ${fmt(nIdx)}`),{size:13,weight:700,anchor:'end',width:230});
 p.text(X0+8,Y(m.state)-10,L(`상태 행렬 읽기+쓰기 ${bytes(m.state)}`,`state matrix read + write ${bytes(m.state)}`),{size:14,weight:700,color:C.purple,width:300});
 p.text(X(2**17),Y(m.kv(2**16))+24,L(`QSA KV 읽기 ≈ ${bytes(m.kv(2**16))}`,`QSA KV read ≈ ${bytes(m.kv(2**16))}`),{size:14,weight:700,color:C.blue,width:200});
 p.text(X(2**17),Y(m.kv(2**16))+44,L('(꼬리 최대 3토큰 추가)','(+ up to 3 tail tokens)'),{size:12,color:C.blue,width:200});
 p.text(X(2**15)+6,Y(m.index(2**15))+28,L('검색용 key 읽기','search-key read'),{size:14,weight:700,color:C.red,width:200});
 p.text(X0+8,Y(28e6),L('점선 = KV + 검색용 key','dotted = KV + search keys'),{size:13,color:C.ink,width:200});
 p.text(X0,Y1+72,L('교차점은 4토큰 블록 경계 기준 · 꼬리가 있으면 조금 달라짐','crossings at 4-token block boundaries · slightly different with a tail'),{size:12,color:C.muted,width:W});
 p.height=Y1+84;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'10-state-vs-attn',number:'open-models-kv-cache-10-state-vs-attn',eyebrow:numbered('open-models-kv-cache/10-state-vs-attn',L('linear attention','Linear attention')),
 title:L('문맥 길이에 따른 접근량: 상태 행렬과 global 층','Per-token memory access by context length: state matrices and global layers'),
 subtitle:L('출력 토큰 하나마다 · 두 패널은 같은 로그 축','per output token · both panels share the log axes'),
 captionIn:'article',screens:['desktop'],
 caption:L('보라 선은 상태 행렬을 읽고 쓰는 양으로 문맥과 무관하다. Kimi K3는 MLA 24층이 모든 위치를 읽어 31,403토큰에서 상태 쪽과 같아진다. Qwen3.8-Flash-Next는 QSA가 KV 읽기에 상한을 두고 검색용 key를 읽는 양만 늘어나며, KV와 검색의 합은 81,920토큰, 검색만은 147,456토큰에서 상태 쪽과 같아진다. 계산한 양이며 실측이 아니다.','The purple line is the state matrix read + write, independent of context. In Kimi K3 the 24 MLA layers read every position and match the state at 31,403 tokens. In Qwen3.8-Flash-Next QSA caps the KV read and only the search-key read grows; KV plus search matches the state at 81,920 tokens and search alone at 147,456. Computed, not measured.'),
 alt:L('두 개의 로그-로그 그래프. 가로축은 문맥 4K에서 1M, 세로축은 1 MB에서 100 GB. 왼쪽 Kimi K3는 보라 수평선 868 MB와 파란 직선(MLA global KV 읽기)이 31,403토큰에서 만난다. 오른쪽 Qwen3.8-Flash-Next는 보라 수평선 113 MB, 약 50 MB의 수평선인 파란 선, 문맥 길이에 따라 상승하는 빨간 선(검색용 key 읽기), 둘의 합 점선이 있고 262,144 오른쪽은 외삽 구간이다.','Two log-log graphs, context 4K to 1M, 1 MB to 100 GB. Left, Kimi K3: a flat purple line at 868 MB meets the rising blue line (MLA global KV read) at 31,403 tokens. Right, Qwen3.8-Flash-Next: a flat purple line at 113 MB, a flat blue line near 50 MB, a rising red line (search-key read), their dashed sum, and an extrapolated region beyond 262,144.'),
 sources:[{label:'Kimi K3 report · §2.1',url:'https://arxiv.org/abs/2607.24653'},{label:'Qwen3.8-Flash-Next report · §2.1.2',url:'https://arxiv.org/abs/2608.30320'}],
 panels:(l:Locale)=>[kimi(l),qwen(l)]} satisfies FigureSpec;
