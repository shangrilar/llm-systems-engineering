import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-03',figureId:'01-critic-return',number:'3-2',eyebrow:['그림 2','Figure 2'],
 title:['실제 결과에서 Critic의 예상을 뺀다','Subtract the critic’s prediction from the outcome'],
 subtitle:['같은 결과를 얻어도 문맥별 예상이 다르면, 각 토큰에 전달할 어드밴티지 A도 달라집니다.','The same outcome can give different advantages A when predictions differ across contexts.'],
 alt:['문맥 P, P+u, P+u+b에서 critic은 0.2,0.6,0.4을 예상한다. 실제 누적 보상은 모두 1이므로 토큰 u,b,d의 어드밴티지는 0.8,0.4,0.6이다. 이 값은 각 토큰의 정책 손실로 전달된다.','For contexts P, P+u and P+u+b, the critic predicts 0.2,0.6,0.4. Actual returns are all 1, giving advantages 0.8,0.4,0.6 for tokens u,b,d. These values enter the token policy losses.'],
 caption:['설명용 예: 중간 보상 0, 마지막 보상 1, 할인 없이 끝까지 관측한 return을 사용합니다. 일반적인 GAE 계산은 본문의 추가 설명에서 다룹니다.','Illustrative example: intermediate rewards 0, final reward 1, and fully observed undiscounted returns. The expandable text explains general GAE.'],
 sources:[{label:'Generalized Advantage Estimation',url:'https://arxiv.org/abs/1506.02438'}],
 panels(locale:Locale){
  const p=new Panel(locale,['각 토큰을 고르기 직전의 예상','Predictions before choosing each token'],730);
  p.text(16,117,['입력 문맥','Input context'],{size:21,width:178,weight:600});
  p.text(385,117,['예상 V','Predicted V'],{size:21,width:125,weight:600});
  ['P','P + u','P + u + b'].forEach((s,i)=>{
   const y=156+i*145;
   p.token(16,y,s,180,'gray');p.arrow(204,y+25,235,y+25,C.blue);
   p.token(246,y,'Critic',120,'blue');p.arrow(376,y+25,403,y+25,C.blue);
   p.token(414,y,['0.2','0.6','0.4'][i],90,'blue');
   p.text(16,y+84,[`다음 선택: ${['u','b','d'][i]}`,`Next choice: ${['u','b','d'][i]}`],{size:20,width:300,color:C.muted});
  });
  p.box(16,614,488,94,['V = 앞으로 받을 보상의 예상','V = predicted future return'],['각 위치는 앞선 문맥만 읽습니다.','Only preceding context is visible.'],'blue');
  const q=new Panel(locale,['실제 결과와 비교해 A 계산','Compare with the actual outcome'],730);
  q.token(16,100,'u → b → d',177,'gray');q.arrow(202,125,228,125,C.orange);
  q.token(240,100,['채점: 1','Reward: 1'],264,'orange');
  q.arrow(260,159,260,186,C.orange);
  q.box(16,200,488,111,['실제 Return = 이후 받은 보상의 합','Actual return = sum of future rewards'],['이 예에서는 세 위치 모두 1','Here, all three positions have return 1'],'orange');
  q.text(16,357,['실제 Return − 예상 V = 어드밴티지 A','Actual return − predicted V = advantage A'],{size:21,width:488,weight:600});
  ['u','b','d'].forEach((s,i)=>{
   const y=397+i*63;
   q.token(16,y,s,62,'gray');
   q.text(100,y+31,`1 − ${['0.2','0.6','0.4'][i]} =`,{size:25,width:200});
   q.token(313,y,['+0.8','+0.4','+0.6'][i],118,'teal');
  });
  q.arrow(260,580,260,608,C.teal);
  q.box(16,620,488,88,['각 토큰의 정책 손실에 A 전달','Feed A into each token’s policy loss'],'','teal');
  return [p,q];
 }
} satisfies FigureSpec;
