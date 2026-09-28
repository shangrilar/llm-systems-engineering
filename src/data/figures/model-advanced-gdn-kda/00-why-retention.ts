import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-gdn-kda',figureId:'00-why-retention',number:'ma-10-00',eyebrow:['그림 1','Figure 1'],
 title:['연결 수정과 기존 상태 유지는 다른 조절','Correcting an association and retaining state'],
 subtitle:['같은 S₂ · k₂=[1,0], v₂=[1,1] · β=1','Same S₂ · k₂=[1,0], v₂=[1,1] · β=1'],captionIn:'article',
 caption:['델타 보정이 건드리지 않는 둘째 행도 유지율로 줄일 수 있다.','Retention can also reduce the second row, which this delta correction leaves unchanged.'],
 alt:['같은 상태 [[2,0],[0,3]]에서 델타만 적용하면 [[1,1],[0,3]]이다. GDN은 α=0.5로 [[1,0],[0,1.5]]를 만든 뒤 같은 Key와 Value로 보정해 [[1,1],[0,1.5]]를 만든다. 둘째 행의 차이를 강조한다.','Starting from [[2,0],[0,3]], delta alone gives [[1,1],[0,3]]. GDN first retains half, producing [[1,0],[0,1.5]], then corrects to [[1,1],[0,1.5]]. The second-row difference is highlighted.'],
 sources:[{label:'Gated DeltaNet §3.1',url:'https://arxiv.org/html/2412.06464v1#S3.SS1'}],
 panels(locale:Locale){return [false,true].map(gated=>{const p=new Panel(locale,gated?['GDN · 남긴 뒤 수정','GDN · Retain, then correct']:['DeltaNet · 연결 수정','DeltaNet · Correct the association'],850);
 p.text(260,105,'S₂',{size:26,anchor:'middle',width:300,color:C.teal});matrix(p,165,135,[[2,0],[0,3]],{cellWidth:90,cellHeight:60,gap:10,size:29,tone:'teal'});
 p.arrow(260,280,260,315,C.purple);p.token(105,330,gated?['기존 상태 × 0.5','Old state × 0.5']:['기존 상태 그대로','Keep the old state'],310,'purple',55);p.arrow(260,400,260,435,C.purple);
 matrix(p,165,450,gated?[[1,0],[0,1.5]]:[[2,0],[0,3]],{cellWidth:90,cellHeight:60,gap:10,size:29,tone:'teal'});
 p.arrow(260,595,260,620,C.orange);p.text(260,661,['델타 보정 · β=1','Delta correction · β=1'],{size:25,anchor:'middle',width:490,color:C.orange});p.arrow(260,675,260,700,C.orange);
 matrix(p,165,715,gated?[[1,1],[0,1.5]]:[[1,1],[0,3]],{cellWidth:90,cellHeight:55,gap:10,size:29,tone:'teal'});p.rect(160,775,200,65,'none',C.purple,2);return p;});}
} satisfies FigureSpec;
