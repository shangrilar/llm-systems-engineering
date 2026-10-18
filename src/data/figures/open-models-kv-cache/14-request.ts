import {numbered} from './numbers';
import {Panel,C,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L,MODELS,N128,N1M,bytes,fmt,tr} from './data';
// What one request stores to keep N tokens of context: N × g + S (KV cache per token times N, plus the fixed
// state), on log–log axes from 4K to 1M so both the fixed part (flat start) and the growth are visible. One
// line per model; GLM-5.3 and Hy4-preview coincide. Qwen beyond its config maximum (262,144) is drawn faint.
// Long-context form: SWA windows are full and compressed entries are averaged. Excludes weights and buffers.
const W=1104,X0=90,X1=860,Y0=20,Y1=440,NX=[12,20],NY=[6,11];
const X=(n:number)=>X0+(X1-X0)*(Math.log2(n)-NX[0])/(NX[1]-NX[0]);
const Y=(v:number)=>Y1-(Y1-Y0)*(Math.log10(v)-NY[0])/(NY[1]-NY[0]);
const NS=Array.from({length:81},(_,i)=>2**(NX[0]+i*(NX[1]-NX[0])/80));
const COL:Record<string,string>={kimi:C.indigo,qwen:C.teal,mimo:C.orange,glm:C.red,hy4:C.red,ds:C.blue};
function panel(l:Locale){
 const p=new Panel(l,null,0,W);
 for(let e=NY[0];e<=NY[1];e++){const y=Y(10**e);p.line(X0,y,X1,y,C.line,1);p.text(X0-10,y+5,['1 MB','10 MB','100 MB','1 GB','10 GB','100 GB'][e-6],{size:14,color:C.muted,anchor:'end',width:80});}
 for(let e=NX[0];e<=NX[1];e+=2){const x=X(2**e);p.line(x,Y0,x,Y1,C.line,1);p.text(x,Y1+24,e<20?`${2**(e-10)}K`:'1M',{size:14,color:C.muted,anchor:'middle',width:50});}
 for(const [n,t] of [[N128,L('131,072','131,072')],[N1M,L('1,048,576','1,048,576')]] as [number,Label][]){p.line(X(n),Y0,X(n),Y1,C.slate,1.4,true);p.text(X(n),Y0-6,t,{size:13,color:C.slate,anchor:n===N1M?'end':'middle',width:120});}
 p.text((X0+X1)/2,Y1+54,L('문맥 길이 N (토큰, 로그 눈금, 1K = 1,024)','context length N (tokens, log scale, 1K = 1,024)'),{size:14,color:C.muted,anchor:'middle',width:W});
 const f=(m:typeof MODELS[number],n:number)=>n*m.g+m.S;
 for(const m of MODELS){
  if(m.key==='hy4')continue;
  const pts=(a:number,b:number)=>NS.filter(n=>n>=a&&n<=b).map(n=>`${X(n).toFixed(1)} ${Y(f(m,n)).toFixed(1)}`).join(' L');
  p.raw(`<path d="M${pts(0,m.maxCtx)}" stroke="${COL[m.key]}" stroke-width="2.8" fill="none"/>`);
  if(m.maxCtx<N1M)p.raw(`<path d="M${pts(m.maxCtx,N1M)}" stroke="${COL[m.key]}" stroke-width="2.8" stroke-opacity=".35" fill="none"/>`);
 }
 // End labels at 1M, nudged apart where lines end close together.
 const ends=MODELS.filter(m=>m.key!=='hy4').map(m=>({m,y:Y(f(m,N1M))})).sort((a,b)=>a.y-b.y);
 for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<34)ends[i].y=ends[i-1].y+34;
 for(const e of ends){
  const name=e.m.key==='glm'?'GLM-5.3 · Hy4-preview':tr(l,e.m.name),ext=e.m.maxCtx<N1M?(l==='en'?' (extrapolated)':' (외삽)'):'';
  p.text(X1+14,e.y-2,name,{size:15,weight:700,color:COL[e.m.key],width:W-X1-14});
  p.text(X1+14,e.y+16,bytes(f(e.m,N1M))+ext,{size:13,color:C.muted,width:W-X1-14});
 }
 p.text(X0,Y1+84,L('요청 하나 = 문맥 N × 토큰당 KV 캐시 + 고정 상태 · 배포 캐시 형식(SGLang 기본 레시피, H200) · 가중치·작업 버퍼 제외 · 옅은 선 = config 최대 문맥 너머 외삽','one request = N × KV cache per token + fixed state · deployed cache formats (SGLang default recipes, H200) · weights and work buffers excluded · faint = beyond the config maximum'),{size:13,color:C.muted,width:W-X0});
 p.height=Y1+100;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'14-request',number:'open-models-kv-cache-14-request',layout:'wide',eyebrow:numbered('open-models-kv-cache/14-request',L('여섯 모델 비교','Six models')),
 title:L('긴 문맥을 유지하는 요청 하나의 저장량','What one request stores to keep a long context'),
 subtitle:L('문맥 N × 토큰당 KV 캐시 + 고정 상태 · 로그-로그 눈금','N × KV cache per token + fixed state · log–log scales'),
 captionIn:'article',screens:['desktop'],
 caption:L('요청 하나가 문맥 N토큰을 유지하는 데 드는 저장량이다. 짧은 문맥에서는 고정 상태가 크게 보이고, 문맥이 길어지면 토큰당 KV 캐시의 차이가 그대로 벌어진다. 1,048,576토큰에서 GLM-5.3과 Hy4-preview는 97.1 GB, DeepSeek V4.1-Flash는 936 MB다.','Storage one request holds to keep N tokens of context. At short contexts the fixed state stands out; as the context grows, the gap in KV cache per token widens unchanged. At 1,048,576 tokens GLM-5.3 and Hy4-preview hold 97.1 GB and DeepSeek V4.1-Flash 936 MB.'),
 alt:L('로그-로그 선 그래프. 가로축은 문맥 4K에서 1M, 세로축은 1 MB에서 100 GB. 다섯 선(GLM-5.3과 Hy4-preview는 겹침)이 오른쪽으로 갈수록 올라간다. 1M에서 GLM-5.3·Hy4-preview 97.1 GB, MiMo-V2.6-Pro 53.7 GB, Kimi K3 29.4 GB, Qwen3.8-Flash-Next 26.6 GB(외삽), DeepSeek V4.1-Flash 936 MB. Kimi와 Qwen은 왼쪽에서 고정 상태 때문에 선이 평평하게 시작한다.','A log–log line chart from 4K to 1M tokens and 1 MB to 100 GB. Five lines (GLM-5.3 and Hy4-preview coincide) rise to the right. At 1M: GLM-5.3 and Hy4-preview 97.1 GB, MiMo-V2.6-Pro 53.7 GB, Kimi K3 29.4 GB, Qwen3.8-Flash-Next 26.6 GB (extrapolated), DeepSeek V4.1-Flash 936 MB. Kimi and Qwen start flat on the left because of their fixed state.'),
 sources:[],panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
