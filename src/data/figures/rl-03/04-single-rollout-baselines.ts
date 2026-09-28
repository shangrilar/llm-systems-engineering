import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-03',figureId:'04-single-rollout-baselines',number:'3-4',eyebrow:['그림 4','Figure 4'],
 title:['그룹 없이도 비교 기준은 다를 수 있다','Single-rollout learning can use different baselines'],
 subtitle:['같은 완료 경험에서 SAO는 문맥별 가치 예측을, FlashREINFORCE는 배치 보상 평균을 사용합니다.','From the same completed experience, SAO uses context values; FlashREINFORCE uses the batch reward mean.'],
 alt:['서로 다른 P₁,P₂,P₃의 완료 rollout 보상은 1,1,0이다. SAO는 문맥별 critic 예측과 실제 보상을 GAE에 넣어 토큰별 A를 구한다. FlashREINFORCE는 배치 평균 2/3을 빼서 1/3,1/3,−2/3을 구하고 각 응답의 생성 토큰에 공유한다. 두 방식 모두 A를 정책 손실에 사용한다.','Completed rollouts for distinct P₁,P₂,P₃ have rewards 1,1,0. SAO combines context-specific critic predictions and rewards through GAE for token advantages. FlashREINFORCE subtracts the batch mean 2/3, sharing 1/3,1/3,−2/3 across each response’s generated tokens. Both feed A into policy losses.'],
 caption:['어드밴티지 계산 경로를 비교한 설명용 그림입니다. 확률비 보정·마스킹·손실 집계 등 각 알고리즘의 전체 업데이트 절차는 생략했습니다.','Illustrative advantage paths. Importance correction, masking, loss reduction and other parts of the full update are omitted.'],
 sources:[{label:'SAO §3.2',url:'https://arxiv.org/html/2607.07508v1#S3.SS2'},{label:'FlashREINFORCE — One-Batch REINFORCE',url:'https://github.com/yifanzhang-pro/FlashREINFORCE#1-one-batch-reinforce'}],
 panels(locale:Locale){return [true,false].map(critic=>{
  const p=new Panel(locale,critic?['SAO: Critic의 문맥별 예상','SAO: context-specific critic predictions']:['FlashREINFORCE: 배치 평균','FlashREINFORCE: batch mean'],920);
  p.text(16,111,['완료된 세 rollout · 서로 다른 질문','Three completed rollouts · different prompts'],{size:21,width:488,weight:600});
  ['P₁: R = 1','P₂: R = 1','P₃: R = 0'].forEach((s,i)=>p.token(16+i*167,146,s,153,'orange'));
  if(critic){
   p.path('M260 207 V222 H128 V233',C.muted,2,false,true);
   p.box(16,247,225,106,['각 토큰 직전 문맥','Token context'],['Pᵢ + 앞선 토큰','Pᵢ + prior tokens'],'gray');
   p.arrow(128,364,128,392,C.blue);
   p.token(16,405,'Critic → V(sₜ)',225,'blue');
   p.path('M260 207 H390 V476',C.orange,2,false,true);
   p.arrow(128,466,128,476,C.blue);
   p.box(16,490,488,93,['보상 + V → GAE → 토큰별 A','Rewards + V → GAE → token advantages'],'','teal');
  }else{
   p.arrow(260,207,260,232,C.orange);
   p.box(16,247,488,106,['배치 평균 = (1 + 1 + 0) / 3','Batch mean = (1 + 1 + 0) / 3'],['이 배치의 비교 기준: 2/3','Baseline for this batch: 2/3'],'orange');
   p.arrow(260,364,260,391,C.orange);
   p.box(16,405,488,178,['각 응답의 R에서 평균을 뺀다','Subtract the mean from each R'],['P₁: 1 − 2/3 = +1/3\nP₂: 1 − 2/3 = +1/3\nP₃: 0 − 2/3 = −2/3','P₁: 1 − 2/3 = +1/3\nP₂: 1 − 2/3 = +1/3\nP₃: 0 − 2/3 = −2/3'],'teal');
  }
  p.arrow(260,594,260,620,C.teal);
  ['P₁','P₂','P₃'].forEach((s,i)=>{
   const y=636+i*59;
   p.text(16,y+30,s,{size:22,width:60,weight:600});
   for(let j=0;j<3;j++)p.token(94+j*138,y,critic?`A${['₁','₂','₃'][i]}${['₁','₂','₃'][j]}`:(i<2?'+1/3':'−2/3'),120,critic||i<2?'teal':'orange');
  });
  p.text(94,827,critic?['칸마다 해당 토큰의 A','Each cell has its token’s A']:['같은 응답의 생성 토큰에 공유','Shared within each response'],{size:19,width:410,color:C.muted});
  p.box(16,854,488,62,['A → 각 토큰의 정책 손실','A → each token’s policy loss'],'','teal');
  return p;
 });}
} satisfies FigureSpec;
