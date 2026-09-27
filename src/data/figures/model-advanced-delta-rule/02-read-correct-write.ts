import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-delta-rule',figureId:'02-read-correct-write',number:'ma-09-02',eyebrow:['그림 3','Figure 3'],title:['읽고, 차이만큼 고쳐 쓰기','Read, then write the correction'],
 subtitle:['같은 S₂에서 출발 · k₂=[1,0] · β=1','Start from the same S₂ · k₂=[1,0] · β=1'],captionIn:'article',
 caption:['단위 Key와 β=1인 교육용 예시다. 모델 parameter가 아닌 요청 상태를 갱신한다.','Illustrative unit Key and β=1. This updates request state, not model parameters.'],
 alt:['S₂에서 k₂로 [2,0]을 읽고 v₂=[1,1]에서 빼면 e=[−1,1]이다. 같은 Key와 e의 외적으로 ΔS=[[-1,1],[0,0]]을 만들고 S₂에 더해 S₃=[[1,1],[0,3]]으로 갱신한다.','Read [2,0] from S₂ with k₂, subtract from v₂=[1,1] to get e=[−1,1], form ΔS=[[-1,1],[0,0]] with the same Key, then add to S₂ to obtain S₃=[[1,1],[0,3]].'],
 sources:[{label:'DeltaNet §2.2',url:'https://arxiv.org/html/2406.06484v1#S2.SS2'}],
 panels(locale:Locale){
 const a=new Panel(locale,['1. 이번 Key에 연결된 값 읽기','1. Read the current association'],520);
 a.token(125,95,'k₂ = [1, 0]',270,'blue',60);
 a.text(75,245,'S₂',{size:27,width:70,color:C.teal});matrix(a,180,200,[[2,0],[0,3]],{cellWidth:85,cellHeight:60,gap:10,size:28,tone:'teal'});
 a.arrow(260,340,260,375,C.blue);matrix(a,165,400,[[2,0]],{cellWidth:85,cellHeight:60,gap:10,size:28,tone:'teal'});
 const b=new Panel(locale,['2. 새 Value와의 차이 구하기','2. Find the difference'],520);
 b.text(260,115,['새 Value','New Value'],{size:24,anchor:'middle',width:480,color:C.orange});matrix(b,165,140,[[1,1]],{cellWidth:85,cellHeight:60,gap:10,size:28,tone:'orange'});
 b.text(260,240,['− 읽은 값','− Read value'],{size:24,anchor:'middle',width:480,color:C.teal});matrix(b,165,265,[[2,0]],{cellWidth:85,cellHeight:60,gap:10,size:28,tone:'teal'});
 b.arrow(260,340,260,375,C.orange);matrix(b,165,400,[[-1,1]],{cellWidth:85,cellHeight:60,gap:10,size:28,tone:'orange'});
 const c=new Panel(locale,['3. 같은 Key로 차이 기록하기','3. Write through the same Key'],610);
 c.token(125,95,'k₂ = [1, 0]',270,'blue',60);
 c.text(330,210,['차이','Difference'],{size:24,anchor:'middle',width:200,color:C.orange});matrix(c,245,235,[[-1,1]],{cellWidth:80,cellHeight:60,gap:10,size:28,tone:'orange'});
 c.text(80,310,'k₂',{size:26,anchor:'middle',width:100,color:C.blue});matrix(c,45,340,[[1],[0]],{cellWidth:70,cellHeight:60,gap:10,size:28,tone:'blue'});
 matrix(c,245,340,[[-1,1],[0,0]],{cellWidth:80,cellHeight:60,gap:10,size:28,tone:'orange'});
 for(let i=0;i<2;i++)c.line(125,370+i*70,230,370+i*70,C.blue,2,true);
 c.arrow(330,300,330,327,C.orange);c.text(330,540,['상태에 더할 보정량','Correction to add'],{size:23,anchor:'middle',width:330,color:C.orange});
 const d=new Panel(locale,['4. 같은 Key로 기록 확인','4. Check with the same Key'],610);
 const xs=[5,200,395],vals=[[[2,0],[0,3]],[[-1,1],[0,0]],[[1,1],[0,3]]];
 for(let i=0;i<3;i++){d.text(xs[i]+54,130,['S₂','ΔS','S₃'][i],{size:25,anchor:'middle',width:115,color:i===1?C.orange:C.teal});matrix(d,xs[i],160,vals[i],{cellWidth:50,cellHeight:55,gap:6,size:24,tone:i===1?'orange':'teal'});}
 d.text(163,218,'+',{size:30,anchor:'middle',width:35});d.text(357,218,'=',{size:30,anchor:'middle',width:35});
 d.token(125,330,'k₂ = [1, 0]',270,'blue',60);d.arrow(260,405,260,440,C.blue);matrix(d,165,465,[[1,1]],{cellWidth:85,cellHeight:60,gap:10,size:28,tone:'teal'});
 d.text(260,578,['새 Value와 일치','Matches the new Value'],{size:24,anchor:'middle',width:490,color:C.teal});
 return[a,b,c,d];}
} satisfies FigureSpec;
