import {Panel,C,connector,math,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L} from './drawing';
import {numbered} from './numbers';
// CED prefill as described in the V4.1 report (§2.2, §3.2.2): the encoder runs on every prompt position; the
// decoder's global KV is built from the encoder output, so the decoder layers only run the most recent window to
// prepare their local KV. Teaching size: 8 positions, 2 + 2 layers, window 2 (real: 20 + 20 layers, 128).
// The official reference code has no separate CED path, so this follows the report's execution description.
const N=8,WIN=2,CW=60,CH=44,GX=8,X0=210;
const col=(i:number)=>X0+i*(CW+GX);
function cell(p:Panel,i:number,y:number,kind:'enc'|'dec'|'skip'){
 const x=col(i);
 if(kind==='skip'){p.rect(x,y,CW,CH,C.paper,C.slate,6,true);p.text(x+CW/2,y+CH/2+7,'–',{size:18,color:C.slate,anchor:'middle',width:CW});return;}
 const tone=kind==='enc'?C.blue:C.orange,fill=kind==='enc'?C.blueFill:C.orangeFill;
 p.rect(x,y,CW,CH,fill,tone,6);p.circle(x+CW/2,y+CH/2,5,tone,tone);
}
function panel(l:Locale){
 const p=new Panel(l,null,0,1104),tr=(s:Label)=>typeof s==='string'?s:s[l==='en'?1:0];
 // Rows from the top: decoder 2, decoder 1, encoder output, encoder 2, encoder 1 (computation flows upwards).
 const yD2=40,yD1=120,yOut=212,yE2=270,yE1=350,yPos=430;
 const rowLabel=(y:number,t:Label,c=C.ink)=>p.text(X0-16,y+CH/2+7,t,{size:17,weight:600,color:c,anchor:'end',width:180});
 rowLabel(yD2,L('decoder 층 2','decoder layer 2'));rowLabel(yD1,L('decoder 층 1','decoder layer 1'));
 rowLabel(yE2,L('encoder 층 2','encoder layer 2'));rowLabel(yE1,L('encoder 층 1','encoder layer 1'));
 for(let i=0;i<N;i++){
  cell(p,i,yE1,'enc');cell(p,i,yE2,'enc');
  const run=i>=N-WIN;cell(p,i,yD1,run?'dec':'skip');cell(p,i,yD2,run?'dec':'skip');
  p.text(col(i)+CW/2,yPos+18,`p${i}`,{size:15,color:C.muted,anchor:'middle',width:CW});
  connector(p,[col(i)+CW/2,yE1],[col(i)+CW/2,yE2+CH],{tone:'blue',width:1.6});
 }
 // Encoder output: one row across all positions; it feeds the global KV and, for the last window, decoder layer 1.
 const xr=col(N-1)+CW;
 p.rect(X0,yOut,xr-X0,26,C.tealFill,C.teal,6);
 p.text(X0-16,yOut+19,L('encoder 최종 출력','encoder output'),{size:15,color:C.teal,weight:600,anchor:'end',width:180});
 for(let i=0;i<N;i++)connector(p,[col(i)+CW/2,yE2],[col(i)+CW/2,yOut+26],{tone:'blue',width:1.6});
 for(let i=N-WIN;i<N;i++){connector(p,[col(i)+CW/2,yOut],[col(i)+CW/2,yD1+CH],{tone:'orange',width:1.6});connector(p,[col(i)+CW/2,yD1],[col(i)+CW/2,yD2+CH],{tone:'orange',width:1.6});}
 // Global KV store built from the encoder output for every position; the running decoder cells read from it.
 const sx=xr+90,sw=1104-sx-8;
 connector(p,[xr,yOut+13],[sx,yOut+13],{tone:'teal',width:1.8});
 p.rect(sx,yOut-30,sw,86,C.tealFill,C.teal,10);
 p.text(sx+sw/2,yOut-4,L('global KV · 모든 위치','global KV · every position'),{size:18,weight:700,color:C.teal,anchor:'middle',width:sw-10});
 p.text(sx+sw/2,yOut+22,L('encoder 출력에서 생성·공유','built from the encoder output, shared'),{size:15,color:C.teal,anchor:'middle',width:sw-10});
 // Both decoder layers read the same global KV: one trunk up from the store, one arrow into each running row.
 const tx=sx+sw/2;
 p.raw(`<path d="M${tx} ${yOut-30} L${tx} ${yD2+CH/2}" stroke="${C.teal}" stroke-width="1.8" fill="none" data-wire="trunk" data-source="${tx},${yOut-30}"/>`);
 for(const yy of [yD1,yD2])connector(p,[tx,yy+CH/2],[xr+4,yy+CH/2],{tone:'teal',width:1.8});
 p.text(tx+12,(yD1+yD2+CH)/2+6,L('각 층이 선택한 항목 읽기','each layer reads its selected entries'),{size:15,color:C.teal,width:sw/2});
 // Legend; the reason is explained beside the figure in the article.
 let y=yPos+70;
 const key=(x:number,kind:'enc'|'dec'|'skip',t:Label)=>{
  const tone=kind==='enc'?C.blue:kind==='dec'?C.orange:C.slate;
  p.rect(x,y-18,28,22,kind==='skip'?C.paper:kind==='enc'?C.blueFill:C.orangeFill,tone,4,kind==='skip');
  p.text(x+38,y,t,{size:15,width:300});
 };
 key(X0,'enc',L('실행','run'));key(X0+150,'dec',L('실행 · 이 층 local KV 준비','run · prepares this layer’s local KV'));key(X0+520,'skip',L('층 실행 생략','layer not run'));
 y+=44;
 math(p,0,y,L('최근 구간 밖의 SWA 참조를 자르는 근사 · 예시 8위치·2+2층·window 2 / 실제 20+20층·128','approximation: SWA references outside the window are cut · example 8 positions, 2 + 2 layers, window 2 / real 20 + 20 layers, 128'),{size:15,color:C.muted,width:1100});
 p.height=y+24;return p;
}
export default {articleId:'deepseek-kv-cache',figureId:'07-ced-prefill',number:'deepseek-kv-cache-07-ced-prefill',layout:'wide',eyebrow:numbered('deepseek-kv-cache/07-ced-prefill','CED'),
 title:L('CED prefill: decoder는 최근 구간만 실행','CED prefill: the decoder runs only the recent window'),
 subtitle:L('캐시 재사용 없이 prompt를 처리할 때 · 아래에서 위로 실행 · 보고서의 bounded replay 방식','a prompt without cache reuse · runs upwards · bounded replay per the report'),
 captionIn:'article',screens:['desktop'],
 caption:L('encoder 층은 prompt의 모든 위치를 실행하고, 그 출력에서 decoder가 읽을 global KV를 모든 위치에 대해 만든다. decoder 층은 최근 window의 위치만 실행해 각 층의 local KV를 준비하고, 이때 global KV에서 선택한 항목을 읽는다.','The encoder layers run on every prompt position, and their output yields the decoder’s global KV for every position. The decoder layers run only the recent window to prepare each layer’s local KV, reading selected global KV entries.'),
 alt:L('위치 8개와 층 4개의 격자. encoder 층 1·2는 모든 위치가 실행된다. encoder 최종 출력에서 모든 위치의 global KV가 만들어진다. decoder 층 1·2는 마지막 두 위치만 실행되어 local KV를 준비하고 나머지 여섯 위치는 실행이 생략된다. 실행되는 decoder 칸은 global KV에서 선택한 항목을 읽는다.','A grid of 8 positions and 4 layers. Encoder layers 1 and 2 run on every position. The encoder output builds the global KV for every position. Decoder layers 1 and 2 run only the last two positions to prepare local KV; the other six are skipped. The running decoder cells read selected global KV entries.'),
 sources:[{label:'DeepSeek-V4.1-Flash report · §2.2, §3.2.2',url:'https://arxiv.org/abs/2609.19969'}],
 panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
