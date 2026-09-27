import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-06',figureId:'01-token-identity',number:'7-1',eyebrow:['그림 1','Figure 1'],captionIn:'article',
 title:['문자열 대신 토큰 ID를 전달한다','Pass token IDs instead of reconstructing them'],
 subtitle:['같은 문자열도 다시 토큰화하면 다른 ID 배열이 될 수 있습니다. 숫자는 설명용 예입니다.','Re-tokenizing the same text can produce different token IDs. The IDs below are illustrative.'],
 alt:['문자열 왕복 경로는 토큰 101,202를 문자열 AB로 바꾼 뒤 토큰 303으로 다시 인코딩한다. TITO 경로는 토큰 101,202를 그대로 학습기에 전달한다.','The text round trip decodes IDs 101,202 into AB, then encodes it as ID 303. TITO passes IDs 101,202 unchanged to training.'],
 caption:['',''],sources:[{label:'Miles v0.1 §2.4',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale){
  return [false,true].map(tito=>{
   const p=new Panel(locale,tito?['TITO · 토큰 그대로','TITO · preserve tokens']:['문자열 왕복','Text round trip'],620);
   p.text(16,115,['추론 엔진의 토큰 ID','Token IDs from inference'],{size:23,weight:600,width:488});
   p.token(120,144,'101',120);p.token(276,144,'202',120);
   p.arrow(260,208,260,265,tito?C.teal:C.orange);
   p.box(48,280,424,106,tito?['토큰 ID 그대로 전달','Pass the original IDs']:['문자열로 변환: “AB”','Decode to text: “AB”'],'',tito?'teal':'orange');
   p.arrow(260,400,260,470,tito?C.teal:C.orange);
   if(!tito)p.text(290,438,['다시 토큰화','Tokenize again'],{size:20,width:210,color:C.orange});
   p.text(16,503,['학습 엔진의 토큰 ID','Token IDs used in training'],{size:23,weight:600,width:488});
   if(tito){p.token(120,535,'101',120,'teal');p.token(276,535,'202',120,'teal');}
   else p.token(198,535,'303',120,'orange');
   return p;
  });
 }
} satisfies FigureSpec;
