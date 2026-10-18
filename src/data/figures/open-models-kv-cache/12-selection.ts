import {numbered} from './numbers';
import {Panel,C,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L} from './data';
// Two ways to pick what to read, on the same 15 earlier positions (0–14, the current query is at 14).
// r0 DSA (GLM-5.3, Hy4-preview): score every position's search key, keep the top tokens.
// r1 QSA (Qwen3.8-Flash-Next): average the raw keys of each completed 4-token block, score blocks, keep the
// top blocks; the unfinished tail block (12–14) is not scored and its main KV is always read.
// Teaching budgets differ (DSA top-4 tokens, QSA top-1 block + tail). Scores are made-up values; the QSA block
// scores are set separately because QSA scores the averaged key, not the average of token scores.
// Qwen3.8-Flash-Next report §2.1.2; DSA arXiv 2512.02556; configs (index_topk).
const N=15,CW=46,GAP=6,X0=250,W=1104;
const cx=(i:number)=>X0+i*(CW+GAP),END=cx(N-1)+CW;
const TOK=[.1,.9,.2,.3,.2,.1,1.4,.3,.8,.7,.6,.85,.2,.4,.3],DSA=[1,6,8,11],QB=[.4,.5,.7],QPICK=2;
function rowLabel(p:Panel,y:number,t:Label){p.text(X0-14,y,t,{size:14,color:C.muted,anchor:'end',width:200});}
function kv(p:Panel,y:number,read:(i:number)=>boolean){
 p.text(cx(N-1)+CW/2,y+46,L('현재','current'),{size:12,weight:700,anchor:'middle',width:CW+10});
 for(let i=0;i<N;i++){const r=read(i);p.rect(cx(i),y,CW,30,r?C.blue:C.blueFill,C.blue,5);
  p.text(cx(i)+CW/2,y+20,String(i),{size:13,color:r?C.paper:C.blue,anchor:'middle',width:CW});}
}
function panel(l:Locale){
 const p=new Panel(l,null,0,W);
 // Shared position axis with block brackets.
 p.text(X0-14,22,L('위치','position'),{size:14,color:C.muted,anchor:'end',width:120});
 for(let i=0;i<N;i++)p.text(cx(i)+CW/2,22,String(i),{size:15,weight:i===N-1?700:400,anchor:'middle',width:CW});
 p.text(END+12,22,L('← 현재 query','← current query'),{size:14,weight:700,width:200});
 for(let b=0;b<4;b++){const a=cx(4*b),z=b<3?cx(4*b+3)+CW:END;
  p.path(`M${a} 40 L${a} 34 L${z} 34 L${z} 40`,b<3?C.muted:C.slate,1.4,b===3);
  p.text((a+z)/2,58,b<3?(l==='en'?`block ${b}`:`블록 ${b}`):(l==='en'?'block 3 (unfinished)':'블록 3 (미완성)'),{size:13,color:b<3?C.muted:C.slate,anchor:'middle',width:z-a+20});}
 let y=86;
 // r0: DSA.
 p.raw('<g data-path="r0">');
 p.line(0,y,W,y,C.line,1);
 p.text(0,y+32,'DSA',{size:20,weight:700,width:200});p.text(0,y+56,'GLM-5.3',{size:14,color:C.muted,width:120});p.text(0,y+76,'Hy4-preview',{size:14,color:C.muted,width:120});p.text(0,y+108,L('예시: 상위 4토큰','example: top 4 tokens'),{size:14,weight:700,color:C.red,width:200});
 rowLabel(p,y+40,L('검색용 key','search key'));
 for(let i=0;i<N;i++)p.rect(cx(i)+6,y+26,CW-12,18,C.redFill,C.red,4);
 rowLabel(p,y+84,L('점수','score'));
 for(let i=0;i<N;i++){const s=DSA.includes(i);
  if(s)p.rect(cx(i)+3,y+64,CW-6,28,C.paper,C.red,6);
  p.text(cx(i)+CW/2,y+84,String(TOK[i]),{size:14,weight:s?700:400,color:s?C.red:C.muted,anchor:'middle',width:CW});}
 rowLabel(p,y+128,L('읽는 main KV','main KV read'));
 kv(p,y+108,i=>DSA.includes(i));
 p.raw('</g>');
 y+=164;
 // r1: QSA.
 p.raw('<g data-path="r1">');
 p.line(0,y,W,y,C.line,1);
 p.text(0,y+32,'QSA',{size:20,weight:700,width:200});p.text(0,y+56,'Qwen3.8-Flash-Next',{size:14,color:C.muted,width:200});p.text(0,y+88,L('예시: 상위 1블록','example: top block'),{size:14,weight:700,color:C.red,width:200});p.text(0,y+110,L('+ 꼬리 블록','+ tail block'),{size:14,weight:700,color:C.red,width:200});
 rowLabel(p,y+40,L('블록 평균 key','block-mean key'));
 for(let b=0;b<4;b++){const a=cx(4*b),z=b<3?cx(4*b+3)+CW:END;p.text((a+z)/2,y+18,b<3?(l==='en'?`block ${b} (${4*b}–${4*b+3})`:`블록 ${b} (${4*b}–${4*b+3})`):(l==='en'?'tail 12–14':'꼬리 12–14'),{size:12,color:b<3?C.muted:C.slate,anchor:'middle',width:z-a});}
 for(let b=0;b<3;b++)p.rect(cx(4*b)+6,y+26,cx(4*b+3)+CW-cx(4*b)-12,18,C.redFill,C.red,4);
 for(let i=12;i<N;i++)p.rect(cx(i)+6,y+26,CW-12,18,C.paper,C.slate,4,true);
 rowLabel(p,y+84,L('블록 점수','block score'));
 for(let b=0;b<3;b++){const a=cx(4*b),z=cx(4*b+3)+CW,s=b===QPICK;
  if(s)p.rect(a+3,y+64,z-a-6,28,C.paper,C.red,6);
  p.text((a+z)/2,y+84,String(QB[b]),{size:14,weight:s?700:400,color:s?C.red:C.muted,anchor:'middle',width:z-a});}
 p.text((cx(12)+END)/2,y+84,L('채점 안 함','not scored'),{size:13,color:C.slate,anchor:'middle',width:END-cx(12)});
 rowLabel(p,y+128,L('읽는 main KV','main KV read'));
 kv(p,y+108,i=>i>=8);
 p.text(cx(0),y+168,L('raw key 4개 평균 → RMSNorm → 블록 첫 위치의 RoPE → 채점 · 점선 = 블록이 찰 때까지 보관하는 꼬리 raw key','mean of 4 raw keys → RMSNorm → RoPE at the block start → score · dashed = tail raw keys kept until the block fills'),{size:13,color:C.muted,width:END-cx(0)});
 p.raw('</g>');
 y+=186;
 p.text(0,y+8,L('예시의 선택 예산은 서로 다름(실제 DSA 최대 2,048위치, QSA 최대 512블록 + 꼬리) · 점수는 교육용 값 · QSA 블록 점수는 토큰 점수의 평균이 아니라 따로 정한 값','teaching budgets differ (real: DSA up to 2,048 positions, QSA up to 512 blocks + tail) · scores are made up · QSA block scores are set separately, not averages of token scores'),{size:13,color:C.muted,width:W});
 p.height=y+22;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'12-selection',number:'open-models-kv-cache-12-selection',layout:'wide',eyebrow:numbered('open-models-kv-cache/12-selection',L('sparse attention','Sparse attention')),
 title:L('무엇을 단위로 고르나: 토큰과 블록','What is picked: tokens or blocks'),
 subtitle:L('현재 위치를 포함한 가시 위치 15개(0–14) · 현재 query는 위치 14','15 visible positions 0–14, including the current one at 14'),
 captionIn:'article',screens:['desktop'],
 caption:L('DSA는 위치마다 검색용 key를 채점해 상위 토큰을 고른다. QSA는 완성된 4토큰 블록마다 raw key를 평균한 key 하나를 채점해 상위 블록을 고르고, 아직 차지 않은 꼬리 블록은 채점 없이 항상 읽는다. 두 방식 모두 main KV는 모든 위치에 남긴다.','DSA scores each position’s search key and picks the top tokens. QSA scores one averaged key per completed 4-token block and picks the top blocks; the unfinished tail block is always read without scoring. Both keep main KV for every position.'),
 alt:L('위치 0부터 14까지 15칸과 4토큰 블록 네 개. DSA 줄은 위치마다 검색용 key와 점수가 있고 점수 상위 4개인 위치 1, 6, 8, 11의 main KV를 읽는다. QSA 줄은 완성 블록 0–2에 평균 key 하나씩, 블록 점수 0.4, 0.5, 0.7이 있고 블록 2(위치 8–11)와 꼬리 12–14의 main KV를 읽는다.','Fifteen positions 0–14 in four 4-token blocks. DSA has a search key and score per position and reads the main KV at the top-4 positions 1, 6, 8, 11. QSA has one averaged key per completed block 0–2 with block scores 0.4, 0.5, 0.7 and reads block 2 (positions 8–11) and the tail 12–14.'),
 sources:[{label:'Qwen3.8-Flash-Next report · §2.1.2',url:'https://arxiv.org/abs/2608.30320'},{label:'DeepSeek-V3.2 DSA',url:'https://arxiv.org/abs/2512.02556'}],
 panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
