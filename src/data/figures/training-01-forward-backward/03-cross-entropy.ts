import {Panel,C,type FigureSpec} from '@llm-systems/viz';
import {data,fmt,sources} from './shared';
export default {
 articleId:'training-01-forward-backward',figureId:'03-cross-entropy',number:'1-3',eyebrow:['그림 3','Figure 3'],
 title:['정답 확률을 loss로 바꾸고 평균을 낸다','Turn target probabilities into loss, then average'],
 subtitle:['정답에 준 확률이 작을수록 −ln p가 커진다','Lower target probability gives a larger −ln p'],
 alt:['정답 확률 세 개를 음의 자연로그 곡선 위 점으로 표시하고 각각의 loss 높이 막대로 변환한다. 세 막대가 평균 CE loss 1.076으로 모인다.','Three target probabilities appear as points on the negative-log curve and as corresponding loss bars. They converge into mean CE loss 1.076.'],
 caption:['−ln은 자연로그다. 구현은 logits로 안정적으로 CE를 계산한다. 유효한 정답 세 개만 합과 분모에 포함하며 정답 없는 마지막 위치와 padding은 제외한다.','ln is the natural log. The implementation computes CE stably from logits. Only three valid targets enter the sum and denominator; the last position without a target and any padding are excluded.'],captionIn:'article',layout:'wide',sources,
 panels(locale,mobile){
  const p=new Panel(locale,null,mobile?960:635,mobile?328:1104),x0=mobile?44:65,plot=mobile?260:495,base=mobile?332:358,scale=mobile?105:125;
  p.text(x0,28,'−ln p',{color:C.orange,size:mobile?24:30,weight:600});
  p.arrow(x0,base,x0+plot+6,base,C.muted);p.arrow(x0,base,x0,49,C.muted);
  [0,1,2].forEach(t=>{const yy=base-t*scale;p.line(x0-4,yy,x0+plot,yy,C.line,1);p.text(x0-13,yy+6,String(t),{size:mobile?15:20,color:C.muted,anchor:'end',width:28});});
  [0,.5,1].forEach(t=>p.text(x0+t*plot,base+28,String(t),{size:mobile?15:20,anchor:'middle',width:45,color:C.muted}));
  p.text(x0+plot,base+60,'p',{color:C.teal,size:23,anchor:'end',width:30});
  const pts=Array.from({length:100},(_,i)=>{const q=.105+i*(.895/99);return [x0+q*plot,base+Math.log(q)*scale];});
  p.path(pts.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' '),C.orange,3);
  data.target_probabilities.forEach((v,i)=>{
   const x=x0+v*plot,y=base-data.token_losses[i]*scale;
   p.line(x,y,x,base,C.teal,1.5,true);p.circle(x,y,mobile?5:7,C.teal,C.teal);
   p.text(x+12,y-15,`${i}: ${fmt(v)}`,{size:mobile?15:20,color:C.teal,width:120});
  });
  const barsBase=mobile?660:358,barX=mobile?35:726,step=mobile?97:112,bw=mobile?54:76,barScale=mobile?126:125;
  if(mobile)p.text(0,458,['토큰별 loss','Loss per token'],{size:23,color:C.orange,weight:600});
  else {p.arrow(586,240,658,240,C.orange);p.text(704,28,['토큰별 loss','Loss per token'],{size:28,color:C.orange,weight:600});}
  p.line(barX-10,barsBase,barX+step*2+bw+10,barsBase,C.line,2);
  data.token_losses.forEach((v,i)=>{
   const x=barX+i*step,h=v*barScale;
   p.rect(x,barsBase-h,bw,h,C.orangeFill,C.orange,2);p.text(x+bw/2,barsBase-h-17,fmt(v),{size:mobile?19:25,color:C.orange,anchor:'middle',width:90,weight:600});
   p.text(x+bw/2,barsBase+30,`${i}`,{size:mobile?19:23,color:C.muted,anchor:'middle',width:50});
   p.text(x+bw/2,barsBase+63,data.vocabulary[data.target_ids[i]],{size:mobile?18:22,color:C.teal,anchor:'middle',width:90});
   const cx=mobile?164:876,cy=mobile?832:550;
   p.path(`M${x+bw/2} ${barsBase+83} Q${x+bw/2} ${cy-82} ${cx} ${cy-82}`,C.orange,2);
  });
  const cx=mobile?164:876,cy=mobile?832:550;
  p.arrow(cx,cy-78,cx,cy-59,C.orange);p.circle(cx,cy,51,C.orangeFill,C.orange);
  p.text(cx,cy-5,'CE loss',{size:mobile?20:22,color:C.orange,anchor:'middle',width:120});p.text(cx,cy+29,fmt(data.loss),{size:mobile?29:34,color:C.orange,weight:600,anchor:'middle',width:120});
  p.text(mobile?164:210,mobile?933:534,`(${data.token_losses.map(v=>fmt(v)).join(' + ')}) / 3`,{size:mobile?17:23,color:C.orange,anchor:mobile?'middle':'start',width:mobile?326:505});
  return [p];
 }
} satisfies FigureSpec;
