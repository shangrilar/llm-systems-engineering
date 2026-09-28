import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-linear-attention',figureId:'04-normalization-and-memory',number:'ma-08-04',eyebrow:['그림 6','Figure 6'],
 title:['점수의 합으로 나누기','Divide by the sum of scores'],
 subtitle:['그림 5와 같은 입력 · q₂ = [1, 0]','Same inputs as Figure 5 · q₂ = [1, 0]'],captionIn:'article',
 caption:['S로 가중합을 계산하고 z로 점수의 합을 계산한다. 분모는 토큰 개수가 아니라 현재 Query에 대한 점수의 합이다.','S supplies the weighted sum, while z supplies the sum of scores for the current Query, not the number of tokens.'],
 alt:['왼쪽에서 p₀,p₁,p₂의 점수1,0,1을 더해 분모2를 얻고 Value 기여[2,0],[0,0],[1,1]을 더해 분자[3,1]을 얻는다. [3,1]을2로 나누면[1.5,0.5]다. 오른쪽에서 Key [1,0],[0,1],[1,0]을 더한 z₃=[2,1]을 q₂=[1,0]으로 읽어 같은 점수 합2를 계산한다.','Left: scores1,0,1 sum to denominator2; Value contributions[2,0],[0,0],[1,1] sum to numerator[3,1]. Dividing by2 gives[1.5,0.5]. Right: Keys[1,0],[0,1],[1,0] sum to z₃=[2,1]. Query[1,0] reads this to compute the same score sum2.'],
 sources:[{label:'Linear Attention normalization',url:'https://arxiv.org/html/2006.16236v3#S3.SS3'}],
 panels(locale:Locale){
 const a=new Panel(locale,['1. 가중합을 점수 합으로 나누기','1. Normalize the weighted sum'],850);
 a.text(150,120,['점수','Score'],{size:23,anchor:'middle',width:120,color:C.blue});
 a.text(355,120,['점수 × Value','Score × Value'],{size:23,anchor:'middle',width:270,color:C.teal});
 for(let i=0;i<3;i++){const y=155+i*90;
 a.text(25,y+38,'p'+['₀','₁','₂'][i],{size:24,width:60});
 matrix(a,115,y,[[[1,0,1][i]]],{cellWidth:70,cellHeight:60,size:28,tone:'blue'});
 matrix(a,255,y,[[[2,0],[0,0],[1,1]][i]],{cellWidth:85,cellHeight:60,gap:12,size:28,tone:'teal'});
 }
 a.arrow(150,415,150,448,C.purple);a.arrow(346,415,346,448,C.teal);
 a.text(150,490,'1 + 0 + 1',{size:24,anchor:'middle',width:200,color:C.purple});
 a.text(346,490,['가중합','Weighted sum'],{size:24,anchor:'middle',width:210,color:C.teal});
 matrix(a,115,520,[[2]],{cellWidth:70,cellHeight:60,size:30,tone:'purple'});
 matrix(a,255,520,[[3,1]],{cellWidth:85,cellHeight:60,gap:12,size:30,tone:'teal'});
 a.text(260,660,'[3, 1] ÷ 2',{size:30,anchor:'middle',width:480});
 a.arrow(260,680,260,710,C.teal);matrix(a,153,735,[[1.5,.5]],{cellWidth:100,cellHeight:60,gap:14,size:30,tone:'teal'});
 const b=new Panel(locale,['2. 같은 점수 합을 z로 계산하기','2. Compute the same sum with z'],850);
 b.text(325,120,['Key · 각 칸은 성분','Key · Cells are components'],{size:23,anchor:'middle',width:360,color:C.blue});
 for(let i=0;i<3;i++){const y=155+i*90;b.text(85,y+38,'p'+['₀','₁','₂'][i],{size:24,width:70});matrix(b,220,y,[[[1,0],[0,1],[1,0]][i]],{cellWidth:85,cellHeight:60,gap:12,size:28,tone:'blue'});if(i<2)b.text(310,y+83,'+',{size:25,anchor:'middle',width:50});}
 b.arrow(310,415,310,448,C.purple);b.text(120,525,'z₃ =',{size:27,width:85,color:C.purple});matrix(b,220,485,[[2,1]],{cellWidth:85,cellHeight:60,gap:12,size:30,tone:'purple'});
 b.text(260,615,'q₂ᵀz₃ = 1×2 + 0×1',{size:26,anchor:'middle',width:500,color:C.purple});b.arrow(260,638,260,668,C.purple);
 matrix(b,220,695,[[2]],{cellWidth:80,cellHeight:60,size:30,tone:'purple'});
 b.text(260,805,['점수의 합','Sum of scores'],{size:24,anchor:'middle',width:480,color:C.purple});
 return[a,b];}
} satisfies FigureSpec;
