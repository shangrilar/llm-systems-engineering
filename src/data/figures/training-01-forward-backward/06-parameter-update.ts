import {Panel,C,matrix,type FigureSpec} from '@llm-systems/viz';
import {data,fmt,sources} from './shared';
const t=data.tracked_parameter;
export default {
 articleId:'training-01-forward-backward',figureId:'06-parameter-update',number:'1-6',eyebrow:['그림 6','Figure 6'],
 title:['같은 가중치 칸에 새 값을 쓴다','Write a new value into the same weight cell'],
 subtitle:['W[0,1] ↔ gradient[0,1] ↔ m[0,1]·v[0,1]','W[0,1] ↔ gradient[0,1] ↔ m[0,1]·v[0,1]'],
 alt:['backward 후의 W 행렬과 gradient 행렬에서 같은 칸을 표시한다. Gradient가 해당 파라미터의 m과 v 상태 계산으로 이어지고 AdamW가 W 칸을 1.2에서 1.20988로 바꾼다.','The same cell is highlighted in W after backward and in its gradient matrix. The gradient feeds the parameter’s m and v states; AdamW changes that W cell from 1.2 to 1.20988.'],
 caption:['같은 CPU toy의 한 스텝. AdamW lr=0.01, weight decay=0.01. m/v는 이 스텝에 갱신되어 update에 사용된 값이며 계산식과 이전 상태의 역할은 4편에서 다룬다. 행렬은 3~4자리, 확대 값은 6자리로 표시했다.','One step of the same CPU toy. AdamW lr=0.01, weight decay=0.01. m/v are updated in this step and used for the update; their equations and previous-state roles belong to chapter 4. Matrices use 3–4 decimal places; the enlarged value uses 6.'],captionIn:'article',layout:'wide',sources,
 panels(locale,mobile){
  const p=new Panel(locale,null,mobile?1175:750,mobile?328:1104),cw=mobile?70:88,ch=mobile?43:58,gap=4,x=mobile?18:25,wy=mobile?80:92,gy=mobile?249:370;
  const read=(a:number[][],d:number)=>a.map(r=>r.map(v=>fmt(v,d)));
  p.text(x,wy-(mobile?39:52),['Backward 뒤 W','W after backward'],{size:mobile?22:28,color:C.blue,weight:600});
  const before=matrix(p,x,wy,read(data.weight_before,3),{cellWidth:cw,cellHeight:ch,gap,size:mobile?18:24,tone:(r,c)=>r===0&&c===1?'blue':null,columnLabels:['0','1','2','3']});
  const focused=before.cell(0,1);p.rect(focused.x-3,focused.y-3,cw+6,ch+6,'none',C.blue,4);
  p.text(x,gy-19,'gradient',{size:mobile?22:28,color:C.orange,weight:600});
  const grad=matrix(p,x,gy,read(data.dW,mobile?4:3),{cellWidth:cw,cellHeight:ch,gap,size:mobile?16:23,tone:(r,c)=>r===0&&c===1?'orange':null});
  const g=grad.cell(0,1);p.rect(g.x-3,g.y-3,cw+6,ch+6,'none',C.orange,4);

  // Stack compact states beside the gradient: inputs on the left, outputs on the right.
  const sx=mobile?120:480,my=mobile?440:355,vy=mobile?568:515,sr=mobile?52:58;
  const sourceX=g.x+cw/2;
  if(mobile){
   p.path(`M${sourceX} ${gy-9} V210 H320 V375 H35 V${vy}`,C.orange,2.5);
   [my,vy].forEach(y=>p.arrow(35,y,sx-sr-10,y,C.orange));
  }else{
   p.path(`M${sourceX} ${gy-9} V280 H402 V${vy}`,C.orange,2.5);
   [my,vy].forEach(y=>p.arrow(402,y,sx-sr-10,y,C.orange));
  }
  [my,vy].forEach(y=>p.circle(sx,y,sr,C.purpleFill,C.purple));
  p.text(sx,my-12,'m[0,1]',{size:mobile?18:20,color:C.purple,anchor:'middle',width:sr*2});
  p.text(sx,my+17,fmt(data.optimizer_state.m[0][1],6),{size:mobile?17:19,color:C.purple,anchor:'middle',width:sr*2});
  p.text(sx,vy-12,'v[0,1]',{size:mobile?18:20,color:C.purple,anchor:'middle',width:sr*2});
  p.text(sx,vy+17,data.optimizer_state.v[0][1].toExponential(3),{size:mobile?17:19,color:C.purple,anchor:'middle',width:sr*2});
  const ox=mobile?164:562,oy=mobile?671:132;
  p.circle(ox,oy,mobile?40:43,C.purpleFill,C.purple);p.text(ox,oy+7,'AdamW',{size:mobile?17:18,color:C.purple,anchor:'middle',width:80});
  if(mobile){
   [my,vy].forEach(y=>p.path(`M${sx+sr+8} ${y} H260`,C.purple,3));
   p.path('M260 440 V671 H216',C.purple,3,false,true);
   p.arrow(164,723,164,758,C.purple);p.path(`M18 ${wy+ch/2} H5 V671 H112`,C.blue,2.5,false,true);
  }else{
   p.arrow(416,132,506,132,C.blue);p.arrow(618,132,699,132,C.purple);
   [my,vy].forEach(y=>p.path(`M${sx+sr+8} ${y} H610`,C.purple,3));
   p.path('M610 515 V218 H562 V187',C.purple,3,false,true);
  }
  const ax=mobile?18:730,ay=mobile?823:92;
  p.text(ax,ay-(mobile?39:52),['Step 뒤 W','W after step'],{size:mobile?22:28,color:C.purple,weight:600});
  const after=matrix(p,ax,ay,read(data.weight_after,3),{cellWidth:cw,cellHeight:ch,gap,size:mobile?18:24,tone:(r,c)=>r===0&&c===1?'purple':null,columnLabels:['0','1','2','3']});
  const changed=after.cell(0,1);p.rect(changed.x-3,changed.y-3,cw+6,ch+6,'none',C.purple,4);
  const by=mobile?1076:679;
  p.text(mobile?24:117,by,fmt(t.before,6),{size:mobile?21:35,color:C.blue,weight:600,width:mobile?122:255});
  p.text(mobile?201:788,by,fmt(t.after_update,6),{size:mobile?21:35,color:C.purple,weight:600,width:mobile?128:305});
  p.arrow(mobile?153:375,by-9,mobile?194:763,by-9,C.purple);
  p.text(mobile?164:552,by-55,`ΔW = +${fmt(t.delta,6)}`,{size:mobile?23:29,color:C.purple,anchor:'middle',width:mobile?326:460});
  p.text(mobile?164:552,by+55,['gradient ≠ ΔW','gradient ≠ ΔW'],{size:mobile?21:25,color:C.orange,anchor:'middle',width:326});
  return [p];
 }
} satisfies FigureSpec;
