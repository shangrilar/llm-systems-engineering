import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-06',figureId:'02-routing-replay',number:'7-2',eyebrow:['그림 2','Figure 2'],layout:'wide',captionIn:'article',
 title:['생성 때 고른 전문가를 학습에서도 사용한다','Use the same selected experts in training'],
 subtitle:['한 토큰 위치 · 한 MoE 층의 예','One token position at one MoE layer'],
 alt:['추론 router가 E1과 E2를 선택한다. 전문가 ID 1,2를 경험과 함께 전달하고 학습에서도 E1과 E2를 실행한다. E3는 선택되지 않는다.','The inference router selects E1 and E2. Expert IDs 1,2 travel with the experience, and training executes E1 and E2 as well. E3 is not selected.'],
 caption:['',''],sources:[{label:'Rollout Routing Replay §4',url:'https://arxiv.org/abs/2510.11370'}],
 panels(locale,mobile=false){
  const w=mobile?520:1280,p=new Panel(locale,null,mobile?1130:450,w);
  for(const training of [false,true]){
   const x=mobile?60:(training?870:10),y=mobile?(training?710:0):0;
   p.rect(x,y,400,400,C.paper,training?C.teal:C.blue,14);
   p.text(x+20,y+42,training?['학습 엔진','Training engine']:['추론 엔진','Inference engine'],{size:28,weight:600,width:360,color:training?C.teal:C.blue});
   p.box(x+20,y+78,360,94,training?['전달받은 ID 사용','Use the received IDs']:['Router가 선택','Router selects'],['E1 + E2','E1 + E2'],training?'teal':'blue');
   const color=training?C.teal:C.blue;
   p.path(`M${x+200} ${y+180} V${y+208} H${x+82} V${y+233}`,color,2,false,true);
   p.path(`M${x+200} ${y+208} V${y+233}`,color,2,false,true);
   ['E1','E2','E3'].forEach((e,i)=>p.box(x+28+i*118,y+248,108,92,e,'',i<2?(training?'teal':'blue'):'gray'));
  }
  if(mobile){
   p.arrow(260,416,260,478,C.purple);
   p.box(60,493,400,124,['전문가 ID 전달','Transfer expert IDs'],['[1, 2] · 경험과 함께','[1, 2] · with experience'],'purple');
   p.arrow(260,633,260,694,C.purple);
  }else{
   p.arrow(425,125,475,125,C.purple);
   p.box(490,72,300,126,['전문가 ID 전달','Transfer expert IDs'],['[1, 2] · 경험과 함께','[1, 2] · with experience'],'purple');
   p.arrow(805,125,855,125,C.purple);
  }
  return [p];
 }
} satisfies FigureSpec;
