import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 captionIn:'article',
 articleId:'rl-18',figureId:'02-starting-policy-and-feedback',number:'5-2',eyebrow:['그림 2','Figure 2'],
 title:['출발 정책이 학습할 경험을 바꾼다','The starting policy changes the experience available to learn from'],
 subtitle:['같은 질문에 응답 8개를 생성하는 예: 좋은 응답을 만날 수 있어야 보상 차이로 배울 기회가 생깁니다.','Eight responses to the same prompt: encountering successful responses creates opportunities to learn from reward differences.'],
 alt:['두 가상 정책이 같은 질문에 응답 8개씩 생성한다. 왼쪽은 보상 0 여덟 개로 그룹 상대 신호가 0이다. 오른쪽은 보상 0과 1이 섞여 상대 신호가 생긴다.','Two hypothetical policies each generate eight responses to one prompt. All eight rewards are zero on the left, yielding zero group-relative signal. Mixed zero and one rewards on the right provide reward contrast.'],
 caption:['실측이나 PT·SFT의 효과 보장이 아닌 설명용 예입니다. 기본 outcome-only GRPO의 과제 어드밴티지만 비교하며, KL·교사 신호 등 다른 손실은 별개입니다.','Illustrative, not a measurement or guaranteed effect of PT/SFT. This compares only task advantages in basic outcome-only GRPO; KL, teacher signals and other losses are separate.'],
 sources:[{label:'Daniel Han · RL intuition, 2:05:26',url:'https://www.youtube.com/watch?v=uIiA6DquRiE&t=7526s'},{label:'DeepSeekMath §4.1',url:'https://arxiv.org/html/2402.03300v3#S4.SS1'}],
 panels(locale:Locale){return [false,true].map(mixed=>{
  const p=new Panel(locale,mixed?['성공과 실패를 모두 만난 경우','Encountering both success and failure']:['이번 8회는 모두 실패한 경우','All eight attempts fail this time'],890);
  p.box(16,105,488,104,mixed?['출발 정책 B','Starting policy B']:['출발 정책 A','Starting policy A'],['같은 질문 Q · 생성 예산 8회','Same prompt Q · budget: 8 responses'],'blue');
  p.arrow(260,221,260,264,C.blue);
  const rewards=mixed?[0,1,0,0,1,0,0,1]:Array(8).fill(0);
  rewards.forEach((r,i)=>{const x=16+(i%2)*252,y=282+Math.floor(i/2)*91;p.box(x,y,236,74,[`응답 ${i+1} · 보상 ${r}`,`Response ${i+1} · R = ${r}`],'',r?'teal':'gray');});
  p.arrow(260,645,260,685,C.orange);
  p.box(16,700,488,160,mixed?['그룹 안에 보상 차이가 있다','Rewards differ within the group']:['그룹 안에 보상 차이가 없다','No reward contrast within the group'],mixed?['성공은 평균보다 높게, 실패는 낮게\n→ 생성 토큰 확률을 조절할 신호','Success above average; failure below\n→ signal to adjust token probabilities']:['각 보상 − 그룹 평균 = 0\n→ 이번 그룹의 과제 어드밴티지 0','Each reward − group mean = 0\n→ zero task advantage for this group'],mixed?'teal':'gray');
  return p;
 });},
} satisfies FigureSpec;
