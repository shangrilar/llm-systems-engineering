import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-delta-rule',figureId:'04-other-queries',number:'ma-09-04',eyebrow:['그림 5','Figure 5'],title:['다른 Query로 읽으면','Read with another Query'],
 subtitle:['같은 보정: k₂=[1,0], β=1 · Query 성분으로 행을 가중합','Same correction: k₂=[1,0], β=1 · Weight rows with Query components'],captionIn:'article',
 caption:['첫 행을 바꾸면 그 행을 읽는 Query의 결과도 달라진다.','Changing the first row also changes readouts that use that row.'],
 alt:['보정 전후 상태의 첫 행은 [2,0]에서[1,1]로 바뀌고 둘째 행[0,3]은 같다. q=[0,1]은 둘째 행만 읽어 결과[0,3]이 같고 q=[1,1]은 두 행을 더해[2,3]에서[1,4]로 바뀐다.','The correction changes the first row from [2,0] to [1,1], leaving [0,3] unchanged. Query [0,1] still reads [0,3]; Query [1,1] sums both rows and changes from [2,3] to [1,4].'],
 sources:[{label:'Delta rule readout',url:'https://arxiv.org/html/2406.06484v1#S2.SS2'}],
 panels(locale:Locale){return [false,true].map(both=>{const p=new Panel(locale,both?['두 행을 함께 읽기','Read both rows']:['둘째 행만 읽기','Read only the second row'],610);
 p.text(260,115,both?'qᵀ = [1, 1]':'qᵀ = [0, 1]',{size:28,anchor:'middle',width:480,color:C.blue});
 for(let i=0;i<2;i++){const x=5+i*270;
 p.text(x+130,185,i===0?['보정 전 S₂','Before: S₂']:['보정 후 S₃','After: S₃'],{size:24,anchor:'middle',width:230,color:C.teal});
 matrix(p,x,225,[[both?1:0],[1]],{cellWidth:38,cellHeight:60,gap:12,size:25,tone:'blue'});
 for(let r=0;r<2;r++)p.text(x+60,264+r*72,'×',{size:25,anchor:'middle',width:32,color:C.blue});
 const m=matrix(p,x+82,225,i===0?[[2,0],[0,3]]:[[1,1],[0,3]],{cellWidth:62,cellHeight:60,gap:12,size:27,tone:r=>both||r===1?'teal':'gray'});
 p.rect(x+79,222,m.width+6,66,'none',C.orange,7);
 p.arrow(x+150,380,x+150,420,C.teal);
 matrix(p,x+82,450,[both?(i===0?[2,3]:[1,4]):[0,3]],{cellWidth:62,cellHeight:60,gap:12,size:27,tone:'teal'});
 }
 p.text(260,488,both?'≠':'=',{size:32,anchor:'middle',width:40,color:both?C.orange:C.teal});return p;});}
} satisfies FigureSpec;
