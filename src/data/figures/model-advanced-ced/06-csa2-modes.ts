import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-ced',figureId:'06-csa2-modes',number:'ced-06',layout:'wide',
 eyebrow:['그림 5 · 세 모드 비교','Figure 5 · Three modes'],
 title:['KV를 공유해도 각 층의 Attention은 다시 계산합니다','Shared KV, fresh attention in every layer'],
 subtitle:['같은 배치로 비교 · 실선: 새 계산 · 점선: 재사용 · 교육용 Top-2','Matched layouts · Solid: fresh · Dashed: reused · Illustrative Top-2'],
 captionIn:'article',caption:['Full은 global KV와 선택 목록을 만들고, Reindex는 KV를 재사용하며 공유 후보 pool 안에서 다시 고릅니다. Reuse는 KV와 최근 선택 목록을 재사용합니다. 모든 모드에서 Main Q, local KV와 attention 출력은 새로 계산합니다.','Full creates global KV and selections. Reindex reuses KV and selects within the shared candidate pool. Reuse reuses KV and the latest selections. All modes compute fresh main Q, local KV and attention output.'],
 alt:['Full, Reindex, Reuse를 동일 배치로 비교한다. Full에서 만든 global main KV와 indexer K를 뒤층이 공유한다. Reindex는 자신의 indexer Q로 후보 pool 안에서 다시 선택하고, Reuse는 최근 Full 또는 Reindex의 선택 목록까지 재사용한다. 세 모드 모두 자신의 main Q와 local KV로 attention을 계산한다.','Matched Full, Reindex and Reuse diagrams. Later layers share global main KV and indexer K from Full. Reindex uses its own indexer Q within a shared candidate pool; Reuse also reuses the latest Full or Reindex selection. Every mode computes attention with its own main Q and local KV.'],
 sources:[{label:'DeepSeek Figures 4–5',url:'https://arxiv.org/html/2609.19969v1#S2.F4'}],
 panels(locale:Locale,mobile=false){
  const panels=['Full','Reindex','Reuse'].map((mode,i)=>{
   const p=new Panel(locale,mode,1170);
   const status=(y:number,title:string,body:readonly [string,string],reused:boolean,tone:'teal'|'purple')=>{
    p.box(20,y,480,120,title,body,tone);
    if(reused)p.rect(20,y,480,120,'none',C[tone],10,true);
   };
   status(100,'Global main KV + Indexer K',i===0?['새 생성 · E → Main KV → Indexer K','NEW · E → Main KV → Indexer K']:['재사용 · 앞 Full 층에서','REUSE · From the Full layer'],i>0,'teal');
   if(i<2)p.arrow(260,230,260,270,C.teal,i>0);
   p.box(20,280,480,125,i===2?['Indexer 계산 생략','Skip indexer computation']:['층별 h → Indexer Q → 점수','Layer h → Indexer Q → Scores'],i===0?['전체 인과적 범위에서 선택','Search the full causal range']:i===1?['공유 후보 pool 안에서 재선택','Reselect within the shared candidate pool']:['Indexer Q · 점수 · Top-K 생략','No indexer Q, scoring or Top-K'],i===2?'gray':'purple');
   if(i<2)p.arrow(260,415,260,455,C.purple);
   status(465,i===0?'Top-2 [p0, p3]':'Top-2 [p1, p3]',i===2?['재사용 · 최근 Full / Reindex 목록','REUSE · Latest Full / Reindex list']:['새 선택 목록 · KV 값이 아닌 위치','NEW position IDs, not KV values'],i===2,'purple');
   p.path('M260 595 V620 H385 V635',C.purple,2.5,i===2,true);
   p.box(270,645,230,115,'Selection',['Main KV 항목 읽기','Gather main KV entries'],'teal');
   p.path('M500 160 H515 V690 H510',C.teal,2.5,i>0,true);
   p.arrow(385,770,385,790,C.teal);
   p.box(20,800,480,95,'Concatenation',['선택된 Global + Local KV','Selected global + Local KV'],'teal');
   p.box(20,1050,480,100,['Attention 출력 · 새 계산','Attention output · NEW'],'','blue');
   p.box(20,920,480,95,'Core Attention',['층별 Main Q · 새 계산','Layer main Q · NEW'],'blue');
   p.arrow(310,905,310,910,C.teal);p.arrow(260,1025,260,1040,C.blue);
   // Local KV has a separate input path in every mode.
   p.box(20,645,210,115,'Local KV',['층별 h · 새 계산','Layer h · NEW'],'orange');
   p.arrow(125,770,125,790,C.orange);
   return p;
  });
  const out=new Panel(locale,null,mobile?3570:1170,mobile?520:1620);
  panels.forEach((p,i)=>out.raw(`<g transform="translate(${mobile?0:i*550} ${mobile?i*1200:0})">${p.svg()}</g>`));
  return [out];
 }
} satisfies FigureSpec;
