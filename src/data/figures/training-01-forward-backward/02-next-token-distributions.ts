import {Panel,C,type FigureSpec} from '@llm-systems/viz';
import {data,fmt,sources} from './shared';
export default {
 articleId:'training-01-forward-backward',figureId:'02-next-token-distributions',number:'1-2',eyebrow:['그림 2','Figure 2'],
 title:['각 위치의 분포에서 다음 정답을 찾는다','Find the next target in each distribution'],
 subtitle:['열 = 입력 위치 · 행 = 어휘','Columns = input positions · rows = vocabulary'],
 alt:['다음 위치의 입력 토큰이 현재 위치의 정답으로 이동한다. 확률 행렬에서 정답 칸은 청록색이며 위치 2는 가장 큰 확률의 AI와 정답 eos가 다르다.','The next input token becomes the current position’s target. Teal cells select target probabilities. At position 2 the argmax AI differs from the target eos.'],
 caption:['CPU toy 확률이며 문맥 attention은 생략했다. 입력의 마지막 위치에는 다음 정답이 없다. Loss는 argmax가 아니라 정답 칸의 확률을 사용한다.','CPU toy probabilities with contextual attention omitted. The last input position has no next target. Loss uses the target cell probability, not the argmax.'],captionIn:'article',layout:'wide',sources,
 panels(locale,mobile){
  const p=new Panel(locale,null,mobile?970:670,mobile?328:1104),x=mobile?58:112,cw=mobile?62:120,gap=mobile?4:24,step=cw+gap,top=mobile?264:260,rh=mobile?56:70;
  p.text(0,23,['입력','Input'],{size:mobile?17:22,color:C.teal});
  const centers=data.vocabulary.map((_,i)=>x+i*step+cw/2);
  data.vocabulary.forEach((token,i)=>{
   p.text(centers[i],52,String(i),{size:mobile?15:19,color:C.muted,anchor:'middle',width:cw});
   p.token(x+i*step,66,token,cw,'teal',mobile?38:44);
   if(i>0)p.arrow(centers[i]-4,mobile?115:120,centers[i-1]+4,mobile?160:163,C.teal);
   p.token(x+i*step,mobile?177:181,i<3?data.vocabulary[data.target_ids[i]]:'∅',cw,i<3?'teal':'gray',mobile?38:44);
   if(i<3)p.arrow(centers[i],mobile?226:235,centers[i],top-9,C.teal);
  });
  p.text(0,mobile?160:171,['정답','Target'],{size:mobile?17:22,color:C.teal,width:85});
  data.vocabulary.forEach((v,r)=>{
   p.text(x-10,top+r*rh+28,v,{size:mobile?15:23,anchor:'end',width:mobile?52:80,color:C.muted});
   data.probabilities.forEach((row,c)=>{
    const value=row[r],xx=x+c*step,yy=top+r*rh,chosen=data.target_ids[c]===r;
    p.rect(xx,yy,cw,rh-9,C.paper,chosen?C.teal:C.line,4);
    p.rect(xx+5,yy+8,(cw-10)*value,7,chosen?C.teal:C.blue,chosen?C.teal:C.blue,2);
    p.text(xx+cw/2,yy+rh-19,`${fmt(value*100,1)}%`,{size:mobile?14:21,color:chosen?C.teal:C.blue,weight:chosen?700:400,anchor:'middle',width:cw-2});
   });
  });
  const zoomX=mobile?0:761,zoomY=mobile?556:114,bw=mobile?207:232;
  p.text(zoomX,zoomY,['위치 2 · 입력 AI','Position 2 · input AI'],{size:mobile?22:25,weight:600,color:C.blue,width:mobile?328:340});
  if(!mobile){p.path(`M${centers[2]} 539 V586 H726 V272 H749`,C.blue,2,false,true);}
  else p.path(`M${centers[2]} 498 V515 H164 V527`,C.blue,2,false,true);
  data.probabilities[2].forEach((v,j)=>{
   const yy=zoomY+42+j*65,color=j===3?C.teal:C.blue;
   p.text(zoomX,yy+24,data.vocabulary[j],{size:mobile?18:22,color,width:70});
   p.rect(zoomX+73,yy,bw,31,C.grayFill,C.line,3);p.rect(zoomX+73,yy,bw*v,31,color,color,3);
   p.text(zoomX+73+bw,yy+53,`${fmt(v*100,1)}%`,{size:mobile?18:22,color,anchor:'end',width:90});
   if(j===2)p.text(zoomX+73,yy+53,'argmax',{size:mobile?15:18,color:C.blue,width:100});
   if(j===3)p.text(zoomX+73,yy+53,['정답 → loss','Target → loss'],{size:mobile?15:18,color:C.teal,width:160});
  });
  p.text(zoomX,zoomY+362,['AI ≠ <eos>','AI ≠ <eos>'],{size:mobile?24:30,color:C.ink,weight:600,width:328});
  return [p];
 }
} satisfies FigureSpec;
