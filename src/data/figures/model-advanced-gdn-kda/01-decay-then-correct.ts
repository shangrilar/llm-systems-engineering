import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-gdn-kda',figureId:'01-decay-then-correct',number:'ma-10-01',eyebrow:['그림 2','Figure 2'],title:['남긴 상태를 읽고 차이만큼 보정하기','Read the retained state, then correct'],
 subtitle:['k₂=[1,0], v₂=[1,1] · α=0.5, β=1','k₂=[1,0], v₂=[1,1] · α=0.5, β=1'],captionIn:'article',
 caption:['유지율을 적용한 상태에서 읽은 값을 기준으로 차이를 계산한다.','Compute the difference from the readout of the retained state.'],
 alt:['1: S₂=[[2,0],[0,3]]를 α=0.5만큼 남겨 S̄=[[1,0],[0,1.5]]로 만든다. 2: 현재 Key로 S̄를 읽으면 [1,0]이다. 3: 새 Value [1,1]과의 차이는 [0,1]이다. 4: β=1로 보정량 [[0,1],[0,0]]을 S̄에 더해 S₃=[[1,1],[0,1.5]]를 만든다.','1: Retain half of S₂=[[2,0],[0,3]] to obtain S̄=[[1,0],[0,1.5]]. 2: The current Key reads [1,0] from S̄. 3: Subtract this from the new Value [1,1] to get [0,1]. 4: With β=1, add [[0,1],[0,0]] to S̄, yielding S₃=[[1,1],[0,1.5]].'],
 sources:[{label:'Gated DeltaNet §3.1',url:'https://arxiv.org/html/2412.06464v1#S3.SS1'}],
 panels(locale:Locale){
 const a=new Panel(locale,['1. 기존 상태를 남기기','1. Retain the old state'],470);
 a.text(115,125,'S₂',{size:26,anchor:'middle',width:160,color:C.teal});a.text(405,125,'S̄',{size:26,anchor:'middle',width:160,color:C.purple});
 matrix(a,35,160,[[2,0],[0,3]],{cellWidth:70,cellHeight:60,gap:10,size:29,tone:'teal'});matrix(a,325,160,[[1,0],[0,1.5]],{cellWidth:70,cellHeight:60,gap:10,size:29,tone:'purple'});
 a.text(255,195,'× α',{size:26,anchor:'middle',width:120,color:C.purple});a.text(255,237,'0.5',{size:26,anchor:'middle',width:120,color:C.purple});a.arrow(200,275,310,275,C.purple);a.text(405,345,['보정 전 상태','Before correction'],{size:22,anchor:'middle',width:210,color:C.purple});
 const b=new Panel(locale,['2. 남긴 상태를 Key로 읽기','2. Read retained state with the Key'],470);
 b.token(130,110,'k₂ᵀ = [1, 0]',260,'blue',50);b.text(90,220,'S̄',{size:26,width:100,color:C.purple});matrix(b,180,195,[[1,0],[0,1.5]],{cellWidth:70,cellHeight:55,gap:10,size:28,tone:'purple'});b.arrow(260,330,260,360,C.blue);matrix(b,180,380,[[1,0]],{cellWidth:70,cellHeight:55,gap:10,size:28,tone:'teal'});
 const c=new Panel(locale,['3. 새 Value와 차이 구하기','3. Find the difference from the new Value'],490);
 c.text(120,125,['새 Value','New Value'],{size:25,anchor:'middle',width:210,color:C.orange});c.text(400,125,['읽은 값','Read value'],{size:25,anchor:'middle',width:210,color:C.teal});matrix(c,40,160,[[1,1]],{cellWidth:70,cellHeight:60,gap:10,size:29,tone:'orange'});matrix(c,320,160,[[1,0]],{cellWidth:70,cellHeight:60,gap:10,size:29,tone:'teal'});c.text(255,202,'−',{size:32,anchor:'middle',width:60});c.arrow(260,245,260,290,C.orange);c.text(260,333,['차이 eᵀ','Difference eᵀ'],{size:25,anchor:'middle',width:250,color:C.orange});matrix(c,180,365,[[0,1]],{cellWidth:70,cellHeight:60,gap:10,size:29,tone:'orange'});
 const d=new Panel(locale,['4. 차이를 β만큼 반영하기','4. Apply β of the correction'],490);
 d.text(260,128,'ΔS = β k₂eᵀ · β=1',{size:26,anchor:'middle',width:500,color:C.orange});
 const xs=[5,195,385],vals=[[[1,0],[0,1.5]],[[0,1],[0,0]],[[1,1],[0,1.5]]];for(let i=0;i<3;i++){d.text(xs[i]+60,215,['S̄','ΔS','S₃'][i],{size:26,anchor:'middle',width:120,color:i===1?C.orange:C.teal});matrix(d,xs[i],245,vals[i],{cellWidth:55,cellHeight:60,gap:10,size:27,tone:i===1?'orange':'teal'});}d.text(160,313,'+',{size:30,anchor:'middle',width:40});d.text(350,313,'=',{size:30,anchor:'middle',width:40});return[a,b,c,d];}
} satisfies FigureSpec;
