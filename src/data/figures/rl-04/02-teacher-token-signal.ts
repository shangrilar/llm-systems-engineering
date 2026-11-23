import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 captionIn:'article',
 articleId:'rl-04',figureId:'02-teacher-token-signal',number:'4-2',eyebrow:['그림 2','Figure 2'],
 title:['같은 문맥을 두 모델에 넣고 같은 토큰을 비교한다','Two models, the same context and selected token'],
 subtitle:['학생의 u → b → d 경로에서 b와 d를 봅니다. 두 모델은 각각 문맥 표현과 다음 토큰 분포를 계산합니다.','Follow b and d on the student path u → b → d. Each model computes its own context representation and next-token distribution.'],
 alt:['문맥 P+u에서 학생과 고정 교사가 같은 후보 분포를 계산하고 선택 토큰 b의 확률 0.2와 0.4를 비교해 양의 로그비 0.693을 만든다. 다음 문맥 P+u+b에서는 선택 토큰 d의 확률 0.4와 0.2를 비교해 음의 로그비 -0.693을 만든다.','At P+u, student and frozen teacher compute candidate distributions. Chosen token b has probabilities 0.2 and 0.4, giving log ratio +0.693. At P+u+b, chosen d has probabilities 0.4 and 0.2, giving -0.693.'],
 caption:['숫자와 토큰은 설명용입니다. 신호용 학생 확률 pS는 업데이트 전에 고정합니다. dₜ는 선택 토큰의 로그비이며 정확한 분포 KL이나 정답 판정이 아닙니다.','Tokens and numbers are illustrative. Signal-side student probabilities pS are fixed before the update. dₜ is a sampled-token log ratio, not an exact distribution KL or a correctness judgment.'],
 sources:[{label:'Miles v0.1.0 OPD',url:'https://github.com/radixark/miles/blob/v0.1.0/docs/advanced/on-policy-distillation.md'}],
 panels(locale:Locale){return [0,1].map(i=>{
 const tok=i===0?'b':'d',context=i===0?'P + u':'P + u + b';
 const s=i===0?[.3,.2,.1,.4]:[.1,.2,.4,.3],t=i===0?[.1,.4,.2,.3]:[.2,.2,.2,.4];
 const p=new Panel(locale,i===0?['위치 2 · 선택한 b','Position 2 · chosen b']:['위치 3 · 선택한 d','Position 3 · chosen d'],844);
 p.box(16,98,488,90,context,['두 모델에 동일한 입력','Identical input to both models'],'gray');
 [133,387].forEach(x=>p.arrow(x,200,x,230,C.muted));
 [false,true].forEach(teacher=>{
 const x=teacher?270:16,col=teacher?C.purple:C.blue,vals=teacher?t:s;
 p.box(x,242,234,150,teacher?['교사 · 고정','Teacher · frozen']:['학생 · 신호 평가','Student · scoring'],'Transformer → h\nLM head → softmax',teacher?'purple':'blue');
 p.arrow(x+117,402,x+117,428,col);
 vals.forEach((v,j)=>{const y=452+j*40,selected=j===(i===0?1:2);
 p.text(x,y+16,['u','b','d',locale==='ko'?'기타':'Other'][j],{size:18,width:50,color:selected?col:C.muted});
 p.rect(x+55,y,125,18,C.grayFill,C.line,2);p.rect(x+55,y,125*v/.5,18,selected?col:(teacher?C.purpleFill:C.blueFill),col,2);
 p.text(x+230,y+16,v.toFixed(1),{size:18,width:40,anchor:'end',color:col});
 });
 p.arrow(x+117,618,x+117,646,col);
 p.box(x,659,234,60,`p${teacher?'T':'S'}(${tok}) = ${vals[i===0?1:2]}`,'',teacher?'purple':'blue');
 });
 p.path('M133 731 V750 H387 V731',C.muted,2);p.arrow(260,750,260,770,C.teal);
 p.box(16,782,488,50,i===0?'d₂ = ln(0.4 / 0.2) ≈ +0.693':'d₃ = ln(0.2 / 0.4) ≈ −0.693','',i===0?'teal':'orange');
 return p;
 });},
} satisfies FigureSpec;
