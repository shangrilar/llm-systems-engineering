import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hc-mhc',figureId:'03-repeated-residual-mixing',number:'ma-13-03',eyebrow:['그림 4','Figure 4'],
 title:['우회 경로의 혼합도 깊이를 따라 반복됩니다','Bypass mixing also repeats through depth'],
 subtitle:['같은 입력 [2, 0]ᵀ · F 출력 = 0 · 두 stream의 한 성분','Same input [2, 0]ᵀ · F output = 0 · One feature across two streams'],captionIn:'article',
 caption:['기본 identity 우회는 입력 [2,0]을 유지한다. 교육용 2I를 세 번 적용하면 [16,0]으로 증폭된다. 비음수 행·열 합 1 행렬을 반복 적용하면 값은 섞이지만 합은 2로 유지된다. 실제 학습값이나 모든 HC의 필연적인 발산을 나타내지 않는다. F와 쓰기 기여는 0으로 두었다.','An identity bypass preserves [2,0]. Applying illustrative 2I three times amplifies it to [16,0]. Repeated nonnegative doubly stochastic mixing changes individual values while preserving their sum of 2. These are not measured weights or inevitable HC divergence. F and write contributions are zero.'],
 alt:['기본 I는 [2,0] 유지. 왼쪽 2I는 [2,0],[4,0],[8,0],[16,0]. 오른쪽 H=[[.8,.2],[.2,.8]]는 [2,0],[1.6,.4],[1.36,.64],[1.216,.784]로 바뀌며 합 2 유지.','Identity keeps [2,0]. Left 2I yields [2,0], [4,0], [8,0], [16,0]. Right H=[[.8,.2],[.2,.8]] yields [2,0], [1.6,.4], [1.36,.64], [1.216,.784], retaining sum 2.'],
 sources:[{label:'mHC §3.1 and §4.1',url:'https://arxiv.org/html/2512.24880v1'}],
 panels(locale:Locale){return [0,1].map(i=>{
  const p=new Panel(locale,i===0?['A. 제약 없는 혼합의 한 예','A. An unconstrained example']:['B. 제약된 혼합의 한 예','B. A constrained example'],690);
  p.text(260,115,['기준 I: [2, 0] → [2, 0]','Baseline I: [2, 0] → [2, 0]'],{size:23,anchor:'middle',width:490});
  p.text(260,176,i===0?'H = 2I':'H',{size:25,weight:600,anchor:'middle',width:490});
  matrix(p,162,205,i===0?[[2,0],[0,2]]:[[.8,.2],[.2,.8]],{cellWidth:92,cellHeight:54,gap:12,size:26,tone:i===0?'orange':'teal'});
  p.text(260,372,['깊이 → · 매번 H 적용','Depth → · Apply H at each step'],{size:23,anchor:'middle',width:490});
  const vals=i===0?[[2,0],[4,0],[8,0],[16,0]]:[[2,0],[1.6,.4],[1.36,.64],[1.216,.784]];
  for(let j=0;j<4;j++){
   const x=25+j*130;p.text(x+40,430,`ℓ = ${j}`,{size:22,anchor:'middle',width:100});
   matrix(p,x,459,[[vals[j][0]],[vals[j][1]]],{cellWidth:80,cellHeight:54,gap:8,size:23,tone:j===0?'gray':i===0?'orange':'teal'});
   if(j<3)p.arrow(x+88,515,x+119,515,i===0?C.orange:C.teal);
  }
  p.text(260,629,i===0?['합: 2 → 4 → 8 → 16','Sum: 2 → 4 → 8 → 16']:['값은 섞임 · 합은 계속 2','Values mix · Sum stays 2'],{size:24,weight:600,anchor:'middle',width:490});
  return p;
 });}
} satisfies FigureSpec;
