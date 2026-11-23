import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-08',figureId:'03-correction-and-alignment',number:'9-3',eyebrow:['그림 3','Figure 3'],captionIn:'article',
 title:['확률비로 학습에 반영할 비중을 조절한다','Use probability ratios to weight learning'],
 subtitle:['학습기에 도착한 생성 기록을 이용해, 토큰별 정책 손실의 기여를 보정합니다.','Recorded generation probabilities help correct each token’s contribution to the policy loss.'],
 alt:['생성 확률 q와 학습 측 비교 확률 p로 비율 p/q를 계산하고, TIS 상한을 적용한 고정 가중치를 토큰 정책 손실에 곱한 뒤 역전파한다. 비율3을 상한2로 제한하는 예.','Compute p/q from generation and training-side probabilities, cap it for TIS, and multiply the fixed weight into token policy loss before backpropagation. Example: cap ratio 3 at 2.'],caption:['',''],
 sources:[{label:'Miles v0.1 §3.4',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale){
 const p=new Panel(locale,['보정 가중치 계산','Compute the correction weight'],710);
 p.box(8,80,504,105,['생성 기록의 확률 q','Recorded generation probability q'],['생성 시점의 값을 보존','Preserve the generation-time value'],'blue');
 p.box(8,212,504,105,['학습 측 비교 확률 p','Training-side comparison probability p'],['어느 버전에서 평가했는지 확인','Identify the evaluated model version'],'teal');
 p.arrow(260,333,260,375,C.purple);
 p.box(8,390,504,105,['확률비 p / q','Probability ratio p / q'],['예: 0.60 / 0.20 = 3','Example: 0.60 / 0.20 = 3'],'purple');
 p.arrow(260,510,260,545,C.purple);
 p.box(8,560,504,115,['TIS · 큰 가중치를 제한','TIS · cap large weights'],['상한 2의 예: 3 → 2','Example cap of 2: 3 → 2'],'orange');
 const q=new Panel(locale,['정책 손실에 반영','Apply it to the policy loss'],710);
 q.box(8,80,504,135,['토큰별 정책 손실','Token policy loss'],['현재 log p · 어드밴티지 등으로 계산','Computed from current log p, advantage, etc.'],'teal');
 q.arrow(260,232,260,273,C.teal);
 q.box(8,290,504,140,['보정 가중치 × 정책 손실','Correction weight × policy loss'],['보정 가중치는 고정해 사용','Treat the correction weight as fixed'],'purple');
 q.arrow(260,447,260,490,C.purple);
 q.box(8,507,504,168,['역전파 → 모델 가중치 갱신','Backpropagate → update model weights'],['확률을 직접 고치는 것이 아니라\n이번 학습의 기여를 조절','Adjust this learning contribution,\nrather than editing probabilities directly'],'teal');
 return [p,q];
 }
} satisfies FigureSpec;
