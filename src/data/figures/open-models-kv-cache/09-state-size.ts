import {numbered} from './numbers';
import {Panel,C,grid,math,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L,MODELS,STATE,bytes,fmt,tr} from './data';
// How big the fixed state is: one head's matrix (d_k × d_v = 128 × 128, deployed precision) × heads × layers, plus the small
// conv and buffer states, and what one output token touches (matrix read + write). One panel per model.
// Values come from data.ts (the same terms as the opening figure); Kimi FP32 (SGLang default), Qwen BF16 (every SGLang
// cookbook recipe; its config says FP32).

function panel(l:Locale,key:'kimi'|'qwen'){
 const m=MODELS.find(x=>x.key===key)!,s=STATE[key],W=528,cx=150,HEAD=128*128*s.bytes;
 const kind=key==='kimi'?'KDA':'GDN';
 const p=new Panel(l,`${tr(l,m.name)} · ${kind} ${s.layers}${l==='en'?' layers':'층'}`,0,W);
 let y=100;
 const step=(icon:(y:number)=>number,label:Label,val:string,note:Label|null)=>{
  const h=icon(y);
  p.text(cx+40,y+h/2-4,label,{size:15,color:C.muted,width:W-cx-40});
  p.text(cx+40,y+h/2+20,val,{size:20,weight:700,color:C.purple,width:W-cx-40});
  y+=h+12;
  if(note){p.path(`M${cx-60} ${y} L${cx-60} ${y+30}`,C.muted,2,false,true);p.text(cx-48,y+21,note,{size:15,weight:700,color:C.muted,width:200});y+=42;}
 };
 step(yy=>{grid(p,cx-90,yy,4,4,{cell:14,gap:2,tone:()=>'purple'});math(p,cx-120,yy+36,'d_k',{size:13,color:C.muted,width:30});math(p,cx-60,yy+82,'d_v',{size:13,color:C.muted,anchor:'middle',width:30});return 86;},
  key==='kimi'?L('head 하나 · 128 × 128 · FP32 (SGLang 기본값)','one head · 128 × 128 · FP32 (SGLang default)'):L('head 하나 · 128 × 128 · BF16 (SGLang 레시피)','one head · 128 × 128 · BF16 (SGLang recipes)'),`${fmt(HEAD)} B`,L(`× ${s.heads} head`,`× ${s.heads} heads`));
 step(yy=>{for(let i=3;i>=0;i--)p.rect(cx-92+i*6,yy+i*6,56,56,C.purpleFill,C.purple,4);return 74;},
  L('층 하나','one layer'),bytes(HEAD*s.heads),L(`× ${s.layers}층`,`× ${s.layers} layers`));
 step(yy=>{for(let i=0;i<6;i++)p.rect(cx-92,yy+i*12,74,10,C.purple,C.purple,2);return 70;},
  L('상태 행렬 전체','all state matrices'),bytes(s.matrix),null);
 // Other small states, then the fixed-state total that the opening figure lists.
 y+=18;
 for(const o of s.other){p.text(cx-92,y,'+ '+tr(l,o.t),{size:14,color:C.muted,width:300});p.text(W-10,y,bytes(o.b),{size:14,color:C.muted,anchor:'end',width:120});y+=22;}
 p.line(cx-92,y-6,W-10,y-6,C.line,1);y+=18;
 p.text(cx-92,y,L('고정 상태 합계 (요청마다)','fixed state total (per request)'),{size:16,weight:700,width:300});p.text(W-10,y,bytes(m.S),{size:18,weight:700,color:C.purple,anchor:'end',width:140});
 y+=28;
 p.text(cx-92,y,m.key==='kimi'?L('= MLA KV로 환산하면','= in MLA KV'):L('= KV·검색용 key로 환산하면','= in KV and search keys'),{size:14,color:C.muted,width:300});p.text(W-10,y,l==='en'?`${fmt(m.S/m.g)} tokens`:`${fmt(m.S/m.g)}토큰분`,{size:14,color:C.muted,anchor:'end',width:160});
 y+=38;
 p.rect(cx-100,y-24,W-cx+92,52,C.purpleFill,C.purple,8);
 p.text(cx-88,y,L('출력 토큰마다 행렬 읽기+쓰기','matrix read + write per output token'),{size:15,weight:700,width:300});
 p.text(cx-88,y+20,l==='en'?`2 × ${bytes(s.matrix)} · logical: read once, write once`:`2 × ${bytes(s.matrix)} · 한 번 읽고 한 번 쓰는 논리량`,{size:13,color:C.muted,width:300});
 p.text(W-20,y+10,bytes(m.state),{size:20,weight:700,color:C.purple,anchor:'end',width:140});
 p.height=y+40;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'09-state-size',number:'open-models-kv-cache-09-state-size',eyebrow:numbered('open-models-kv-cache/09-state-size',L('linear attention','Linear attention')),
 title:L('고정 상태는 얼마나 큰가','How large is the fixed state'),
 subtitle:L('head 하나에서 모델 전체까지 · 문맥과 무관하지만 작지 않다','from one head to the whole model · independent of context, but not small'),
 captionIn:'article',screens:['desktop'],
 caption:L('head 하나의 상태 행렬(128 × 128)에 head 수와 층 수를 곱하면 상태 행렬 전체가 된다. 여기에 conv 등 작은 상태를 더한 것이 요청마다 드는 고정 상태이고, 출력 토큰마다 상태 행렬을 한 번 읽고 한 번 쓴다.','One head’s state matrix (128 × 128) times heads and layers gives all state matrices; adding small conv and buffer states gives the fixed state each request holds. Every output token reads and writes the matrices once.'),
 alt:L('두 패널. Kimi K3는 head 하나 65,536 B에 96 head를 곱해 층 하나 6.3 MB, 69층을 곱해 상태 행렬 434 MB, conv 15.3 MB를 더해 고정 상태 449 MB이고, 출력 토큰마다 행렬 읽기+쓰기 868 MB다. Qwen3.8-Flash-Next는 48 head, 36층으로 상태 행렬 56.6 MB(BF16), conv 등을 더해 59.0 MB, 읽기+쓰기 113 MB다.','Two panels. Kimi K3: 65,536 B per head × 96 heads = 6.3 MB per layer, × 69 layers = 434 MB of matrices, plus 15.3 MB of conv = 449 MB; each output token reads and writes 868 MB. Qwen3.8-Flash-Next: 48 heads, 36 layers, 56.6 MB of matrices (BF16), 59.0 MB with conv and buffers, 113 MB read + write.'),
 sources:[{label:'Kimi K3 report · §2.1',url:'https://arxiv.org/abs/2607.24653'},{label:'Qwen3.8-Flash-Next report · §2.1',url:'https://arxiv.org/abs/2608.30320'}],
 panels:(l:Locale)=>[panel(l,'kimi'),panel(l,'qwen')]} satisfies FigureSpec;
