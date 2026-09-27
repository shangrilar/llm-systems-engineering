import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-08',figureId:'02-policy-engine-differences',number:'9-2',eyebrow:['그림 2','Figure 2'],captionIn:'article',layout:'wide',
 title:['엔진이 달라진 것과 모델이 바뀐 것을 구별한다','Separate engine differences from model updates'],
 subtitle:['같은 P·앞선 토큰에서, 같은 토큰 x의 확률을 비교한 교육용 예입니다.','An illustrative comparison of probabilities for the same token x, given the same P and preceding tokens.'],
 alt:['생성엔진v1 확률 .50과 학습엔진v1 .52의 차이는 엔진차이이다. 학습엔진v1 .52와 v2 .60의 차이는 가중치 업데이트이다. 현재학습 .60을 생성 .50으로 나눈 전체비율은1.2이다.','Generation v1 gives .50, training v1 .52: an engine difference. Training v1 gives .52 and v2 .60: a weight update. The overall ratio is .60/.50 = 1.2.'],caption:['',''],
 sources:[{label:'Miles v0.1 §3.4, §5.3',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale,mobile){
 const p=new Panel(locale,null,mobile?800:450,mobile?520:1120);
 const labels=[['생성 엔진 · v1','Generation · v1'],['학습 엔진 · v1','Training · v1'],['학습 엔진 · v2','Training · v2']] as const;
 const vals=['0.50','0.52','0.60'];
 for(let i=0;i<3;i++){
  const x=mobile?40:i*392,y=mobile?20+i*230:80,w=mobile?440:336;
  p.box(x,y,w,130,labels[i],['토큰 x의 확률: '+vals[i],'P(token x): '+vals[i]],i===0?'blue':'teal');
  if(i<2){if(mobile){p.arrow(260,y+144,260,y+209,i===0?C.orange:C.purple);p.text(282,y+178,i===0?['엔진 차이','Engine gap']:['가중치 업데이트','Weight update'],{size:20,width:220,color:i===0?C.orange:C.purple});}
  else{p.arrow(x+w+8,y+65,x+384,y+65,i===0?C.orange:C.purple);p.text(x+352,y+172,i===0?['엔진 차이','Engine gap']:['가중치 업데이트','Weight update'],{size:22,anchor:'middle',width:270,color:i===0?C.orange:C.purple});}}
 }
 p.box(mobile?16:200,mobile?705:330,mobile?488:720,85,['현재 학습 확률 / 생성 확률','Current training / generation probability'],'0.60 / 0.50 = 1.2','purple');return [p];
 }
} satisfies FigureSpec;
