import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hybrid',figureId:'03-fixed-state-growing-kv',number:'ma-12-04',layout:'wide',
 eyebrow:['그림 4 · 문맥 길이와 저장량','Figure 4 · Context length and storage'],
 title:['KV를 갖는 층은 줄어도 캐시 증가는 남습니다','Fewer KV layers still leave a growing cache'],
 subtitle:['교육용 6층 · 한 칸 = 1성분 · 상태: 2×2 · KV: 행 = 토큰, K 2칸 + V 2칸','Six-layer example · Cell = component · State: 2×2 · KV: row = token, 2 K + 2 V cells'],
 captionIn:'article',caption:['한 recurrent 층의 상태는2×2=4성분이며 한 Attention 층의 토큰별 K,V는 각각2성분이다. 모두 Attention이면24T, 혼합이면16+8T성분이다. T4에서96 대48, T8에서192 대80. 모델 가중치,conv buffer,activation,workspace는 제외하며 실제 모델 메모리 측정이 아니다.','Each recurrent state has 2×2=4 components. Each attention layer stores two K and two V components per token. Attention-only storage is 24T; hybrid storage is 16+8T: 96 vs48 at T4,192 vs80 at T8. Weights,conv buffers,activations and workspace are excluded. This is not measured model memory.'],
 alt:['T4와 T8에서 여섯 Attention층과 네 recurrent층 두 Attention층의 저장량을 비교한다. 고정2×2 상태는 그대로이며 토큰별KV행은4개에서8개로 증가한다.','Compare six attention layers with four recurrent and two attention layers at T4 and T8. Fixed 2×2 states stay the same while KV rows grow from four to eight.'],
 sources:[{label:'Layerwise hybrid memory',url:'https://arxiv.org/html/2510.26692v1#S4'}],
 panels(locale:Locale,mobile?:boolean){return [4,8].map(T=>{
  const p=new Panel(locale,`T = ${T}`,mobile?780:425,mobile?520:1104);
  for(let hybrid=0;hybrid<2;hybrid++){
   const ox=mobile?12:12+hybrid*570,oy=mobile?135+hybrid*325:135;
   p.text(ox,oy,hybrid?['하이브리드','Hybrid']:['Attention만','Attention only'],{size:25,weight:600,width:490});
   for(let l=1;l<=6;l++){
    const x=ox+(l-1)*83,isA=!hybrid||l%3===0;
    p.text(x+31,oy+49,`${isA?'A':'R'}${l}`,{size:22,anchor:'middle',width:70,color:isA?C.purple:C.teal});
    matrix(p,x+(isA?0:17),oy+69,Array.from({length:isA?T:2},()=>Array.from({length:isA?4:2},()=>null)),{cellWidth:14,cellHeight:14,gap:3,tone:isA?'purple':'teal'});
   }
   p.text(ox+246,oy+256,hybrid?`16 + ${8*T} = ${16+8*T}`:`24 × ${T} = ${24*T}`,{size:31,weight:600,anchor:'middle',width:495,color:hybrid?C.teal:C.purple});
  }
  return p;
 });}
} satisfies FigureSpec;
