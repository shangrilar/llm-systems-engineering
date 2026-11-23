import {Panel,C,matrix,type FigureSpec} from '@llm-systems/viz';
import {data,fmt,sources,linearFormulas,labels} from './shared';
const e=data.linear_example,wt=e.W[0].map((_,j)=>e.W.map(row=>row[j])),n=(v:number)=>fmt(v,3).replace(/\.?0+$/,'');
export default {
 articleId:'training-01-forward-backward',figureId:'05-wgrad-xgrad',number:'1-5',eyebrow:['그림 5','Figure 5'],
 title:labels.localTitle,
 subtitle:['dW: 저장한 Xᵀ × dY · dX: dY × Wᵀ','dW: saved Xᵀ × dY · dX: dY × Wᵀ'],
 alt:['dW는 세로 벡터 Xᵀ와 가로 벡터 dY의 각 성분을 곱한 격자로 채워진다. dX는 왼쪽의 dY와 오른쪽의 Wᵀ 각 열을 곱하고 더하여 0.3과 -0.35를 만든다.','dW is filled by pairwise products of column vector Xᵀ and row vector dY. dX multiplies dY on the left by each column of Wᵀ on the right, summing to 0.3 and -0.35.'],
 caption:['Y=XW인 별도 선형층 예제다. W는 I×O이며 PyTorch Linear.weight 저장은 O×I다. dW는 optimizer로, dX는 이전 층으로 전달한다. X와 W 자체는 backward에서 바뀌지 않는다.','A separate linear example uses Y=XW. W is I×O; PyTorch stores Linear.weight as O×I. dW goes to the optimizer, dX to the earlier layer. Backward does not change X or W.'],captionIn:'article',sources,
 panels(locale,mobile){
  const w=mobile?328:520,p=new Panel(locale,null,mobile?570:540,w),q=new Panel(locale,null,mobile?760:540,w),cw=mobile?85:126,gap=5,x=mobile?130:180,y=171,rh=108;
  p.text(0,28,linearFormulas.wgrad,{size:mobile?25:31,color:C.orange,weight:600});
  p.text(x,68,'dY',{size:22,color:C.orange});matrix(p,x,89,e.dY.map(r=>r.map(n)),{cellWidth:cw,cellHeight:47,gap,size:mobile?22:25,tone:'orange'});
  p.text(0,156,labels.saveXT,{size:mobile?20:24,color:C.teal,width:120});
  e.X[0].forEach((v,r)=>{
   const yy=y+r*rh;p.rect(25,yy,60,rh-9,C.tealFill,C.teal,4);p.text(55,yy+60,n(v),{size:28,color:C.teal,anchor:'middle',width:60});p.arrow(93,yy+51,x-9,yy+51,C.teal);
   e.dY[0].forEach((g,c)=>{
    const xx=x+c*(cw+gap);p.rect(xx,yy,cw,rh-9,C.orangeFill,C.orange,4);
    p.text(xx+cw/2,yy+34,`${n(v)} × ${n(g)}`,{size:mobile?14:19,anchor:'middle',width:cw-4,color:C.muted});
    p.text(xx+cw/2,yy+76,n(e.dW[r][c]),{size:mobile?26:32,color:C.orange,weight:600,anchor:'middle',width:cw-8});
   });
  });
  [0,1].forEach(c=>p.arrow(x+cw/2+c*(cw+gap),143,x+cw/2+c*(cw+gap),159,C.orange));
  p.text(x,434,'dW · 2×2',{size:25,color:C.orange});p.arrow(x+cw,451,x+cw,480,C.purple);p.text(x+cw,520,'optimizer',{size:mobile?22:25,color:C.purple,anchor:'middle',width:220});
  q.text(0,28,linearFormulas.xgrad,{size:mobile?25:31,color:C.orange,weight:600});
  q.text(0,69,'dY',{size:23,color:C.orange});matrix(q,0,89,e.dY.map(r=>r.map(n)),{cellWidth:mobile?61:79,cellHeight:38,gap:3,size:mobile?21:23,tone:'orange'});
  q.text(mobile?193:290,69,'Wᵀ',{size:23,color:C.blue});matrix(q,mobile?193:290,89,wt.map(r=>r.map(n)),{cellWidth:mobile?46:68,cellHeight:38,gap:3,size:mobile?20:23,tone:'blue'});
  e.W.forEach((row,i)=>{
   const yy=mobile?223+i*273:233+i*154,bw=mobile?132:139,left=mobile?8:0,right=mobile?184:161;
   q.text(0,yy-17,`dY · Wᵀ[:, ${i}]`,{size:mobile?18:22,color:C.blue,width:300});
   row.forEach((v,j)=>{
    const xx=j?right:left;q.rect(xx,yy,bw,92,C.paper,C.line,4);
    q.text(xx+30,yy+30,n(e.dY[0][j]),{size:mobile?18:22,color:C.orange,width:66,anchor:'middle'});q.text(xx+63,yy+30,'×',{size:21,width:30,anchor:'middle'});q.text(xx+99,yy+30,n(v),{size:mobile?18:22,color:C.blue,width:40,anchor:'middle'});
    q.text(xx+bw/2,yy+72,n(v*e.dY[0][j]),{size:mobile?27:29,color:C.orange,anchor:'middle',width:bw,weight:600});
   });
   const cx=mobile?164:451,cy=mobile?yy+155:yy+46;
   q.text(mobile?164:324,mobile?yy+57:yy+57,'+',{size:30,anchor:'middle',width:45,color:C.orange});
   if(mobile){q.path(`M74 ${yy+101} Q74 ${cy} 112 ${cy}`,C.orange,2,false,true);q.path(`M250 ${yy+101} Q250 ${cy} 216 ${cy}`,C.orange,2,false,true);}
   else q.arrow(352,cy,403,cy,C.orange);
   q.circle(cx,cy,40,C.orangeFill,C.orange);q.text(cx,cy+9,n(e.dX[0][i]),{size:mobile?27:29,color:C.orange,anchor:'middle',width:90,weight:600});
  });
  q.text(mobile?164:451,mobile?746:526,['dX → 이전 층','dX → earlier layer'],{size:mobile?22:23,color:C.orange,anchor:'middle',width:mobile?326:210});
  return [p,q];
 }
} satisfies FigureSpec;
