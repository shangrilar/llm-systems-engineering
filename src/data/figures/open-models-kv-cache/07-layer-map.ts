import {numbered} from './numbers';
import {Panel,C,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L,tr,MODELS} from './data';
import {LAYERS} from './layers';
// Layer map of the six models: one cell per layer, the same pitch for every model so depth is comparable.
// The cell says what the layer keeps from earlier context (fixed state / SWA window / own global KV / reads a
// shared global KV); the mark above says how it picks positions (searches itself / reuses an earlier pick).
// Every DeepSeek V4.1-Flash layer uses SWA (the first two only SWA): a thin orange strip under its row.
const W=1104,X0=230,PITCH=7.4,CW=5.8,CH=24,ROW=62,TOP=74;
const FILL:Record<string,{f:string;s:string;dash?:boolean}>={
 S:{f:C.purple,s:C.purple},F:{f:C.blue,s:C.blue},W:{f:C.orange,s:C.orange},X:{f:C.blue,s:C.blue},R:{f:C.blue,s:C.blue},
 K:{f:C.blue,s:C.blue},I:{f:C.paper,s:C.blue,dash:true},U:{f:C.paper,s:C.blue,dash:true}};
const MARK:Record<string,'dot'|'ring'|null>={S:null,F:null,W:null,X:'dot',R:'ring',K:'dot',I:'dot',U:'ring'};
const STORES:Record<string,Label>={kimi:L('24개','24'),qwen:L('12개','12'),mimo:L('10개','10'),glm:L('78개','78'),hy4:L('78개','78'),ds:L('4개','4')};
function panel(l:Locale){
 const p=new Panel(l,null,0,W);
 p.text(X0,24,L('층 번호 (0부터) →','layer (from 0) →'),{size:14,color:C.muted,width:300});
 for(let i=0;i<=90;i+=10){const x=X0+i*PITCH+CW/2;p.line(x,TOP-20,x,TOP-14,C.muted,1);p.text(x,TOP-24,String(i),{size:13,color:C.muted,anchor:'middle',width:30});}
 const RX=X0+93*PITCH+18;
 p.text(RX,24,L('문맥 비례','global KV stores'),{size:14,color:C.muted,width:W-RX});
 p.text(RX,44,L('global KV 저장소','(grow with context)'),{size:14,color:C.muted,width:W-RX});
 MODELS.forEach((m,r)=>{
  const s=LAYERS[m.key],y=TOP+r*ROW+14;
  p.raw(`<g data-path="${m.key}">`);
  p.text(X0-14,y+CH-6,tr(l,m.name),{size:16,weight:700,anchor:'end',width:X0-14});
  [...s].forEach((c,i)=>{const x=X0+i*PITCH,st=FILL[c];
   p.raw(`<rect x="${x.toFixed(1)}" y="${y}" width="${CW}" height="${CH}" rx="1.5" fill="${st.f}" stroke="${st.s}" stroke-width="1"${st.dash?' stroke-dasharray="2 1.5"':''}/>`);
   const mk=MARK[c];if(mk)p.raw(`<circle cx="${(x+CW/2).toFixed(1)}" cy="${y-6}" r="2.4" fill="${mk==='dot'?C.red:C.paper}" stroke="${C.red}" stroke-width="1"/>`);});
  if(m.key==='ds')p.raw(`<rect x="${X0}" y="${y+CH+4}" width="${(s.length*PITCH-(PITCH-CW)).toFixed(1)}" height="4" fill="${C.orange}"/>`);
  p.text(RX,y+CH-6,STORES[m.key],{size:16,weight:700,color:C.blue,width:W-RX});
  if(m.key==='ds')p.text(RX+40,y+CH-6,L('· 추가 34층이 읽음','· read by 34 more'),{size:14,color:C.muted,width:W-RX-40});
  p.raw('</g>');
 });
 let y=TOP+MODELS.length*ROW+20;
 p.line(0,y,W,y,C.line,1);y+=34;
 const key=(x:number,draw:(x:number)=>void,t:Label,w=230)=>{draw(x);p.text(x+22,y,t,{size:14,width:w});};
 p.text(0,y,L('칸: 남기는 것','cell: what is kept'),{size:14,weight:700,width:X0-20});
 key(X0,x=>p.rect(x,y-14,12,16,C.orange,C.orange,2),L('최근 window만 (SWA)','recent window (SWA)'),160);
 key(X0+170,x=>p.rect(x,y-14,12,16,C.purple,C.purple,2),L('고정 크기 상태','fixed-size state'),200);
 key(X0+390,x=>p.rect(x,y-14,12,16,C.blue,C.blue,2),L('문맥 전체 KV를 직접 저장','stores full-context KV itself'),210);
 key(X0+610,x=>p.raw(`<rect x="${x}" y="${y-14}" width="12" height="16" rx="2" fill="${C.paper}" stroke="${C.blue}" stroke-dasharray="2 1.5"/>`),L('다른 층이 저장한 KV를 읽음','reads KV another layer stored'),240);
 y+=30;
 p.text(0,y,L('위 표식: 고르는 법','mark: how positions are picked'),{size:14,weight:700,width:X0-20});
 key(X0,x=>p.raw(`<circle cx="${x+6}" cy="${y-5}" r="4" fill="${C.red}" stroke="${C.red}"/>`),L('직접 검색해 고름','searches itself'),160);
 key(X0+170,x=>p.raw(`<circle cx="${x+6}" cy="${y-5}" r="4" fill="${C.paper}" stroke="${C.red}"/>`),L('앞 층이 고른 위치를 재사용','reuses an earlier pick'),220);
 p.rect(X0+390,y-7,30,4,C.orange,C.orange,0);p.text(X0+430,y,L('모든 층이 SWA 사용 (DeepSeek)','every layer uses SWA (DeepSeek)'),{size:14,width:300});
 y+=30;
 p.text(0,y,L('표식 없음 = 남긴 범위 전체를 읽음(full attention, SWA window, 상태 전체) · config 기준 · Kimi config의 층 번호(1부터)는 0부터로 바꿈','no mark = reads all it keeps (full attention, the SWA window, the whole state) · from configs · Kimi’s 1-based config indices shifted to 0-based'),{size:13,color:C.muted,width:W});
 p.height=y+14;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'07-layer-map',number:'open-models-kv-cache-07-layer-map',layout:'wide',eyebrow:numbered('open-models-kv-cache/07-layer-map',L('모델 구성','Model makeup')),
 title:L('여섯 모델의 층 지도','Layer maps of the six models'),
 subtitle:L('칸 하나가 층 하나 · 칸은 남기는 것, 위 표식은 고르는 법','one cell per layer · the cell is what is kept, the mark is how positions are picked'),
 captionIn:'article',screens:['desktop'],
 caption:L('모든 모델에서 칸 폭이 같아 층 수의 차이가 그대로 보인다. 오른쪽 숫자는 문맥에 비례해 커지는 독립 global KV 저장소 수다.','Every model uses the same cell width, so depth is comparable. The number on the right counts independent global KV stores that grow with context.'),
 alt:L('여섯 줄의 층 지도(토큰당 KV 캐시가 큰 순). GLM-5.3과 Hy4-preview 78층은 모든 층이 자기 global KV를 두고 21층이 직접 검색, 나머지가 위치를 재사용한다(78개). MiMo-V2.6-Pro 70층은 SWA 사이에 global 10층(10개). Kimi K3 93층은 linear attention 3층 뒤에 global KV 1층이 반복되고 마지막 두 층이 global이다(저장소 24개). Qwen3.8-Flash-Next 48층은 linear attention 3층 뒤에 직접 검색하는 global KV 1층(저장소 12개). DeepSeek V4.1-Flash 40층은 처음 2층이 SWA만, 층 2·8·14·20이 global KV를 만들고 나머지 34층이 그것을 읽으며, 모든 층이 SWA를 사용한다(4개).','Six rows, largest KV cache per token first. GLM-5.3 and Hy4-preview (78 layers): every layer keeps its own global KV, 21 search and the rest reuse positions (78 stores). MiMo-V2.6-Pro (70): 10 global layers among SWA layers (10). Kimi K3 (93): three fixed-state layers then one global-KV layer, repeated, the last two global (24). Qwen3.8-Flash-Next (48): three fixed-state layers then one global layer that searches (12). DeepSeek V4.1-Flash (40): the first two SWA only; layers 2, 8, 14, 20 make the global KV that the other 34 read; every layer also runs SWA (4).'),
 sources:[{label:'Model configs (layer_types, hybrid_layer_pattern, indexer_types, kv_source_layer_ids)',url:'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash'}],
 panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
