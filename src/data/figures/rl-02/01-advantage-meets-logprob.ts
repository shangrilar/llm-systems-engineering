import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
  articleId:'rl-02',figureId:'01-advantage-meets-logprob',number:'2-2',
  eyebrow:['그림 2','Figure 2'],
  title:['손실의 기울기는 모델 가중치로 돌아간다','Loss gradients flow back to model weights'],
  subtitle:['그림 1의 첫 토큰 u를 따라갑니다. 파랑은 확률 계산, 초록 점선은 역전파입니다.','Follow token u from Figure 1. Blue shows probability computation; dashed green arrows show backpropagation.'],
  alt:['보상에서 구한 return 1과 기준값 0.4로 어드밴티지 +0.6을 구한다. 생성 당시 문맥과 선택 토큰을 현재 모델에 넣어 계산한 로그확률과 고정된 어드밴티지가 손실 -A log p에서 만난다. 역전파는 모델의 학습 가능한 파라미터로 흐른다.','Return 1 minus baseline 0.4 gives advantage +0.6. The recorded context and chosen token produce a current log probability. Fixed advantage and log probability form loss -A log p. Backpropagation reaches trainable model parameters.'],
  caption:['기본 정책 그래디언트의 교육용 예입니다. A는 이 정책 업데이트에서 고정합니다. 여러 샘플이 파라미터를 공유하므로 실제 개별 확률의 변화까지 보장하지는 않습니다.','An educational example of basic policy gradient. A is fixed for this policy update. Shared parameters and other samples can affect each token’s actual probability change.'],
  sources:[{label:'PPO §2',url:'https://arxiv.org/abs/1707.06347'},{label:'RLHF Book — Policy gradients',url:'https://rlhfbook.com/c/06-policy-gradients'}],
  panels(locale:Locale){
    const p=new Panel(locale,['순전파 · 첫 토큰 u를 다시 평가','Forward · score the first token u'],888);
    p.box(16,98,488,90,['입력 P · 기록된 선택 u','Input P · recorded choice u'],['토큰 ID는 고정된 학습 데이터','Token IDs are fixed training data'],'gray');
    p.arrow(260,198,260,224,C.blue);
    p.box(16,234,488, 90,['Transformer → h₁','Transformer → h₁'],['학습 중인 가중치로 문맥 표현 계산','Compute trainable context features'],'blue');
    p.arrow(260,334,260,360,C.blue);
    p.box(16,370,488,90,'LM head → softmax',['후보 분포에서 u의 확률 조회','Gather the probability of u'],'blue');
    p.arrow(260,470,260,496,C.blue);
    p.box(16,506,488, 90,'pθ(u | P) = 0.5','log pθ(u | P) ≈ −0.693','blue');
    p.box(16,628,488, 90,['평가에서 얻은 고정 신호','Fixed signal from evaluation'],'A₁ = 1 − 0.4 = +0.6','orange');
    p.path('M 510 554 H 516 V 826 H 506',C.blue,2.5,false,true);
    p.arrow(260,728,260,754,C.orange);
    p.box(16,764,488,106,'L₁ = −A₁ log pθ(u | P)','−0.6 × (−0.693) ≈ 0.416','purple');
    const q=new Panel(locale,['역전파 · 같은 손실에서 가중치로','Backward · from that loss to weights'],958);
    q.box(16,98,488,160,['로그확률 z에 대한 기울기','Gradient with respect to log probability z'],'z = log pθ(u | P)\nL₁ = −0.6z → ∂L₁/∂z = −0.6','purple');
    q.arrow(260,268,260,294,C.teal,true);
    q.box(16,304,488,90,['softmax · LM head','softmax · LM head'],['로그확률에서 출력 계산으로 미분 전달','Differentiate through the LM output'],'teal');
    q.arrow(260,404,260,430,C.teal,true);
    q.box(16,440,488,90,['h₁ → Transformer','h₁ → Transformer'],['문맥 표현을 만든 학습 가능한 층으로','Continue into the trainable context layers'],'teal');
    q.arrow(260,540,260,566,C.teal,true);
    q.box(16,576,488,90,['파라미터별 gradient를 모음','Accumulate parameter gradients'],['다른 학습 토큰의 기여도 함께 합산','Include other token contributions'],'teal');
    q.arrow(260,676,260,698,C.teal);
    q.box(16,708,488,90,['Optimizer → 새 가중치 θ′','Optimizer → new weights θ′'],['확률표가 아닌 모델 파라미터를 갱신','Update model parameters'],'teal');
    q.arrow(260,808,260,834,C.blue);
    q.box(16,844,488,96,['다음 forward에서 확률 재계산','Next forward: new probabilities'],['같은 P에서도 분포가 달라질 수 있음','The distribution for P can now change'],'blue');
    return [p,q];
  },
} satisfies FigureSpec;
