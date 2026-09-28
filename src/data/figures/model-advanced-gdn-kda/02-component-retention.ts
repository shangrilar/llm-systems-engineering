import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-gdn-kda',figureId:'02-component-retention',number:'ma-10-02',eyebrow:['그림 3','Figure 3'],title:['같이 줄일까, 성분마다 다르게 남길까?','One retention rate or a rate per component?'],
 subtitle:['한 head · 같은 S₂ · 유지 직후 상태 비교','One head · Same S₂ · Compare states just after retention'],captionIn:'article',
 caption:['이 상태 convention에서 행은 Key 성분이며 KDA는 각 행에 다른 유지율을 곱한다. 이후 보정 과정은 앞 그림과 같다.','With Key components on rows, KDA applies a separate retention rate to each row. Correction follows as in Figure 1.'],
 alt:['두 방식 모두 S₂=[[2,0],[0,3]]에서 시작한다. GDN은 α=0.5 하나를 두 행에 적용해 [[1,0],[0,1.5]]를 만든다. KDA는 Key 성분0에0.9, 성분1에0.2를 적용해 [[1.8,0],[0,0.6]]을 만든다.','Both start from S₂=[[2,0],[0,3]]. GDN applies a shared α=0.5 to both rows, yielding [[1,0],[0,1.5]]. KDA applies0.9 to Key component0 and0.2 to component1, yielding [[1.8,0],[0,0.6]].'],
 sources:[{label:'Kimi Linear §3',url:'https://arxiv.org/html/2510.26692v1#S3'}],
 panels(locale:Locale){return [false,true].map(kda=>{const p=new Panel(locale,kda?['KDA · 성분별 α','KDA · α per component']:['GDN · 공유 α 하나','GDN · One shared α'],730);
 p.text(330,115,'S₂',{size:27,anchor:'middle',width:240,color:C.teal});matrix(p,235,150,[[2,0],[0,3]],{cellWidth:85,cellHeight:65,gap:15,size:29,tone:'teal'});
 for(let i=0;i<2;i++)p.text(30,195+i*80,[`Key 성분 ${i}`,`Key component ${i}`],{size:22,width:190});
 p.arrow(330,310,330,365,C.teal);p.text(330,412,['S̄ · 보정 전 상태','S̄ · Before correction'],{size:24,anchor:'middle',width:360,color:C.purple});
 const vals=kda?[[1.8,0],[0,.6]]:[[1,0],[0,1.5]];matrix(p,235,455,vals,{cellWidth:85,cellHeight:65,gap:15,size:29,tone:'purple'});
 if(kda){for(let i=0;i<2;i++){p.token(20,460+i*80,'α'+['₀','₁'][i]+' = '+[.9,.2][i],130,'purple',55);p.arrow(165,488+i*80,220,488+i*80,C.purple);}}
 else{p.token(20,500,'α = 0.5',130,'purple',55);p.line(160,527,180,527,C.purple,2);p.line(180,488,180,568,C.purple,2);p.arrow(180,488,220,488,C.purple);p.arrow(180,568,220,568,C.purple);}
 p.text(330,665,['열: Value 성분','Columns: Value components'],{size:22,anchor:'middle',width:350});return p;});}
} satisfies FigureSpec;
