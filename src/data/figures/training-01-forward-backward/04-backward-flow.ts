import {Panel,C,matrix,type FigureSpec} from '@llm-systems/viz';
import {data,fmt,sources} from './shared';
const e=data.chain_example;
const values=(rows:number[][])=>rows.map(r=>r.map(n=>fmt(n,2).replace(/\.?0+$/,'')));
export default {
 articleId:'training-01-forward-backward',figureId:'04-backward-flow',number:'1-4',eyebrow:['그림 4','Figure 4'],
 title:['돌아온 gradient가 두 경로로 갈라진다','The returning gradient takes two paths'],
 subtitle:['dX₂ = 이전 층의 dY₁ · dW는 optimizer로','dX₂ = the earlier layer’s dY₁ · dW goes to the optimizer'],
 alt:['두 선형층의 forward는 X0에서 X1, Y를 만든다. 역방향의 dY2는 dX2와 dW2로 갈라지고 dX2가 이전 층의 dY1이 되어 dX1과 dW1을 만든다. 저장 X0와 X1은 dW 계산에 재사용된다.','Two linear layers produce X1 and Y from X0. dY2 branches into dX2 and dW2; dX2 becomes dY1 and branches again. Saved X0 and X1 are reused to compute dW.'],
 caption:['별도 두 선형층 예제를 autograd와 대조했다. 출력 쪽 dY₂는 예제에서 주어진 값이다. X₀·X₁·W₁·W₂는 backward 동안 그대로이며 dX는 값을 덮어쓰지 않는다.','This separate two-linear-layer example was checked against autograd. dY₂ is supplied from the output side. X₀, X₁, W₁ and W₂ stay unchanged during backward; dX does not overwrite X.'],captionIn:'article',layout:'wide',sources,
 panels(locale,mobile){
  const p=new Panel(locale,null,mobile?1260:870,mobile?328:1104);
  const m=(x:number,y:number,rows:number[][],name:string,tone:'teal'|'blue'|'orange',cw=mobile?41:55,ch=mobile?33:42)=>{
   p.text(x,y-13,name,{size:mobile?18:24,color:C[tone],weight:600,width:230});return matrix(p,x,y,values(rows),{cellWidth:cw,cellHeight:ch,gap:3,size:mobile?13:18,tone});
  };
  if(mobile){
   m(24,40,e.X0,'X₀','teal');m(210,40,e.W1,'W₁','blue');p.text(148,66,'×',{size:28});
   p.arrow(66,87,66,153,C.blue);m(24,190,e.X1,'X₁','teal');m(210,190,e.W2,'W₂','blue');p.text(148,216,'×',{size:28});
   p.arrow(66,237,66,303,C.blue);m(24,340,e.Y,'Y','blue');
   p.path('M66 386 V412 H252 V440',C.orange,3,false,true);
   m(24,476,e.X1,locale==='ko'?'X₁ 재사용':'Reuse X₁','teal');
   m(210,476,e.dY2,'dY₂','orange');p.text(142,505,'⊗',{size:30,anchor:'middle',width:40});
   p.path('M142 522 V616 H66 V640',C.orange,3,false,true);
   p.circle(252,589,26,C.blueFill,C.blue);p.text(252,600,'×',{size:30,anchor:'middle',width:52});
   p.text(174,555,'W₂ᵀ',{size:20,color:C.blue,width:65});
   p.arrow(252,522,252,555,C.orange);p.arrow(252,623,252,640,C.orange);
   m(24,671,e.dW2,'dW₂','orange');m(210,671,e.dX2,'dX₂ = dY₁','orange');
   p.arrow(252,718,252,785,C.orange);
   m(24,821,e.X0,locale==='ko'?'X₀ 재사용':'Reuse X₀','teal');
   m(210,821,e.dX2,'dY₁','orange');p.text(142,850,'⊗',{size:30,anchor:'middle',width:40});
   p.path('M142 867 V961 H66 V985',C.orange,3,false,true);
   p.circle(252,934,26,C.blueFill,C.blue);p.text(252,945,'×',{size:30,anchor:'middle',width:52});
   p.text(174,900,'W₁ᵀ',{size:20,color:C.blue,width:65});
   p.arrow(252,867,252,900,C.orange);p.arrow(252,968,252,985,C.orange);
   m(24,1016,e.dW1,'dW₁','orange');m(210,1016,e.dX1,'dX₁','orange');
   p.text(196,1112,['X는 그대로','X stays unchanged'],{size:18,color:C.teal,width:132});
   p.path('M66 752 V768 H5 V1160 H23',C.purple,2.5,false,true);p.arrow(66,1097,66,1117,C.purple);
   p.circle(66,1160,35,C.purpleFill,C.purple);p.text(66,1168,'step',{size:20,color:C.purple,anchor:'middle',width:88});
   p.text(66,1231,['W에 사용','Used for W'],{size:18,color:C.purple,anchor:'middle',width:128});
  }else{
   m(34,190,e.X0,'X₀','teal');m(425,190,e.X1,'X₁','teal');m(816,190,e.Y,'Y','blue');
   m(215,39,e.W1,'W₁','blue');m(606,39,e.W2,'W₂','blue');
   [271,662].forEach(x=>{p.circle(x,212,27,C.blueFill,C.blue);p.text(x,223,'×',{size:32,anchor:'middle',width:58});p.arrow(x,135,x,177,C.blue);});
   p.arrow(158,211,231,211,C.blue);p.arrow(309,211,410,211,C.blue);p.arrow(549,211,622,211,C.blue);p.arrow(701,211,801,211,C.blue);
   p.path('M940 211 H1002 V341 H884 V369',C.orange,3,false,true);p.text(1020,269,['출력 쪽','Output side'],{size:20,color:C.orange,width:84});
   m(816,412,e.dY2,'dY₂','orange');m(425,412,e.dX2,'dX₂ = dY₁','orange');m(34,412,e.dX1,'dX₁','orange');
   [271,662].forEach(x=>{p.circle(x,433,27,C.blueFill,C.blue);p.text(x,444,'×',{size:32,anchor:'middle',width:58});p.text(x-26,386,x===271?'W₁ᵀ':'W₂ᵀ',{size:23,color:C.blue,width:85});});
   p.arrow(804,433,700,433,C.orange);p.arrow(623,433,550,433,C.orange);p.arrow(413,433,310,433,C.orange);p.arrow(231,433,159,433,C.orange);
   p.text(34,496,['X₀는 바뀌지 않는다','X₀ is not overwritten'],{size:20,color:C.teal,width:265});
   m(34,639,e.X0,locale==='ko'?'X₀ 재사용':'Reuse X₀','teal');m(200,639,e.dX2,'dY₁','orange');p.text(174,670,'⊗',{size:31,anchor:'middle',width:40});p.arrow(334,660,383,660,C.orange);m(395,617,e.dW1,'dW₁','orange');
   m(621,639,e.X1,locale==='ko'?'X₁ 재사용':'Reuse X₁','teal');m(787,639,e.dY2,'dY₂','orange');p.text(761,670,'⊗',{size:31,anchor:'middle',width:40});p.arrow(921,660,957,660,C.orange);m(969,617,e.dW2,'dW₂','orange',52);
   p.path('M482 463 V552 H255 V598',C.orange,2,false,true);p.path('M873 463 V573 H842 V598',C.orange,2,false,true);
   p.path('M452 716 V790 H789',C.purple,3,false,true);p.path('M1024 716 V790 H875',C.purple,3,false,true);
   p.circle(832,790,35,C.purpleFill,C.purple);p.text(832,798,'step',{size:22,color:C.purple,anchor:'middle',width:90});
   p.text(28,823,['⊗: 각 성분의 곱 → dW의 각 칸','⊗: pairwise products → individual dW cells'],{size:20,color:C.teal,width:680});
  }
  return [p];
 }
} satisfies FigureSpec;
