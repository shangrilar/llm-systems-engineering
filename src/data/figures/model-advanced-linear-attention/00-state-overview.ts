import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-linear-attention',figureId:'00-state-overview',number:'ma-08-00',
 eyebrow:['그림 1','Figure 1'],title:['KV 목록에서 고정 크기 상태로','From a KV list to a fixed-size state'],
 subtitle:['한 층 · 한 head · 시점별 저장 모습','One layer · One head · Storage at successive steps'],
 captionIn:'article',caption:['각 열은 다른 저장 방식이고 각 행은 시간에 따른 모습입니다. 오른쪽은 상태 하나를 덮어 갱신합니다.','Columns compare storage schemes; rows show successive times. The right scheme updates one state in place.'],
 alt:['왼쪽은 p₀,p₁,p₂를 처리할 때 토큰별 KV가 1,2,3행으로 증가한다. 오른쪽은 같은 입력마다 2×2 상태가 바뀌며 이전 상태가 다음 상태로 연결된다. 상태의 행은 Key 성분이고 열은 Value 성분이다.','At p₀,p₁,p₂ the KV list grows from one to three rows. A fixed 2×2 state instead changes in place, linked across time. State rows are Key components and columns are Value components.'],
 sources:[{label:'Linear Attention §3.3',url:'https://arxiv.org/html/2006.16236v3#S3.SS3'}],
 panels(locale:Locale){return [false,true].map(state=>{const p=new Panel(locale,state?['상태 하나 갱신','Update one state']:['토큰별 KV 보관','Store KV per token'],790);
 for(let t=0;t<3;t++){const y=100+t*215;p.token(15,y+30,'p'+['₀','₁','₂'][t],65,'blue',50);p.arrow(90,y+55,145,y+55,C.blue);
 if(state){p.text(302,y-8,'S'+['₁','₂','₃'][t],{size:25,anchor:'middle',width:260,color:C.teal});matrix(p,220,y+15,[ [[2,0],[0,0]],[[2,0],[0,3]],[[3,1],[0,3]] ][t],{cellWidth: 70,cellHeight:48,gap:8,tone:'teal',size:25});if(t<2)p.arrow(294,y+130,294,y+184,C.teal);}
 else{for(let j=0;j<=t;j++){p.text(175,y+26+j*50,'p'+['₀','₁','₂'][j],{size:21,width:50});p.token(220,y+j*50,'k'+['₀','₁','₂'][j],105,'blue',42);p.token(340,y+j*50,'v'+['₀','₁','₂'][j],105,'teal',42);}}}
 p.text(260,765,state?['2×2 · 행: Key 성분 / 열: Value 성분','2×2 · Rows: Key / Columns: Value']:['행: 토큰 위치','Rows: token positions'],{size:22,anchor:'middle',width:500,color:C.muted});return p;});}
} satisfies FigureSpec;
