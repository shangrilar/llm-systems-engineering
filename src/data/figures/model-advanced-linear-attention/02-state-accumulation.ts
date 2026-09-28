import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-linear-attention',figureId:'02-state-accumulation',number:'ma-08-02',layout:'wide',eyebrow:['그림 4','Figure 4'],
 title:['같은 상태에 차례로 더하기','Accumulate into the same state'],
 subtitle:['S의 행: Key 성분 · 열: Value 성분','State rows: Key components · Columns: Value components'],captionIn:'article',
 caption:['S₀는 영행렬이며 p₀,p₁,p₂를 처리한 뒤 S₁,S₂,S₃가 된다.','S₀ is zero; processing p₀,p₁,p₂ yields S₁,S₂,S₃.'],
 alt:['영 상태 S₀에 p₀의 외적 [[2,0],[0,0]], p₁의 외적 [[0,0],[0,3]], p₂의 외적 [[1,1],[0,0]]을 차례로 더한다. 최종 S₃는 [[3,1],[0,3]]이며 같은 2×2 상태가 시간에 따라 이어진다.','Starting from zero, add outer products [[2,0],[0,0]], [[0,0],[0,3]], [[1,1],[0,0]] in sequence. The final state is [[3,1],[0,3]], with the same 2×2 shape throughout.'],
 sources:[{label:'Linear Attention §3.3',url:'https://arxiv.org/html/2006.16236v3#S3.SS3'}],
 panels(locale:Locale){const p=new Panel(locale,null,1120);const states=[[[0,0],[0,0]],[[2,0],[0,0]],[[2,0],[0,3]],[[3,1],[0,3]]];
 for(let i=0;i<4;i++){const y=60+i*270;p.text(405,y-18,'S'+['₀','₁','₂','₃'][i],{size:25,width:150,anchor:'middle',color:C.teal});matrix(p,338,y,states[i],{cellWidth: 60,cellHeight:52,gap:8,size:27,tone:'teal'});
 if(i<3){const dy=y+155;p.arrow(402,y+122,402,dy-12,C.teal);p.circle(402,dy+10,18,'white',C.teal);p.text(402,dy+19,'+',{size:29,anchor:'middle',width:35});p.arrow(402,dy+37,402,y+212,C.teal);
 p.token(15,dy-45,'p'+['₀','₁','₂'][i], 60,'blue',46);p.text(15,dy+38,['k=[1,0]','k=[0,1]','k=[1,0]'][i],{size:21,width:155,color:C.blue});p.text(15,dy+ 70,['v=[2,0]','v=[0,3]','v=[1,1]'][i],{size:21,width:155,color:C.teal});
 p.text(245,dy-58,'k'+['₀','₁','₂'][i]+'v'+['₀','₁','₂'][i]+'ᵀ',{size:24,anchor:'middle',width:170,color:C.orange});matrix(p,184,dy-30,[ [[2,0],[0,0]],[[0,0],[0,3]],[[1,1],[0,0]] ][i],{cellWidth: 50,cellHeight:44,gap:8,size:25,tone:'orange'});p.arrow(303,dy+10,373,dy+10,C.orange);
 }}return[p];}
} satisfies FigureSpec;
