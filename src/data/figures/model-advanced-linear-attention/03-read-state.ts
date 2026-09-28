import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-linear-attention',figureId:'03-read-state',number:'ma-08-03',eyebrow:['그림 5','Figure 5'],
 title:['Query로 상태 읽기','Read the state with a Query'],subtitle:['q₂ = [1, 0] · 정규화 전 · q와 k는 feature map 적용 후','q₂ = [1, 0] · Before normalization · Feature-mapped q and k'],captionIn:'article',
 caption:['토큰별 가중합과 누적 상태 읽기는 같은 분자를 계산한다.','Per-token weighted values and state readout compute the same numerator.'],
 alt:['왼쪽은 S₃의 첫 행 [3,1]에 Query 성분1, 둘째 행[0,3]에0을 곱해 [3,1]을 읽는다. 오른쪽은 p₀,p₁,p₂의 Key와 Query의 내적1,0,1을 Value에 곱해 [2,0],[0,0],[1,1]을 더하고 같은 [3,1]을 얻는다.','Left: Query weights 1 and 0 combine state rows [3,1] and [0,3] to give [3,1]. Right: per-token scores 1,0,1 weight Values into [2,0],[0,0],[1,1], summing to the same [3,1].'],
 sources:[{label:'Linear Attention §3',url:'https://arxiv.org/html/2006.16236v3#S3'}],
 panels(locale:Locale){const a=new Panel(locale,['상태에서 읽기','Read the state'],610);
 a.text(80,120,'q₂',{size:26,color:C.blue,anchor:'middle',width:100});a.text(330,120,['S₃ · 열: Value 성분','S₃ · Columns: Value'],{size:24,color:C.teal,anchor:'middle',width:320});
 matrix(a,45,165,[[1],[0]],{cellWidth:70,cellHeight:65,gap:18,size:30,tone:'blue'});matrix(a,230,165,[[3,1],[0,3]],{cellWidth:95,cellHeight:65,gap:18,size:30,tone:'teal'});
 for(let i=0;i<2;i++)a.text(170,207+i*83,'×',{size:30,anchor:'middle',width:50});
 a.text(330,345,['행: Key 성분','Rows: Key components'],{size:22,anchor:'middle',width:330});
 a.text(260,410,'1×[3, 1] + 0×[0, 3]',{size:26,anchor:'middle',width:480});a.arrow(260,433,260,471,C.teal);matrix(a,162,490,[[3,1]],{cellWidth:90,cellHeight:65,gap:16,size:30,tone:'teal'});
 const b=new Panel(locale,['토큰별 기여','Per-token contributions'],610);
 b.text(150,120,'q₂ᵀkⱼ',{size:25,anchor:'middle',width:125,color:C.blue});b.text(355,120,'(q₂ᵀkⱼ)vⱼᵀ',{size:25,anchor:'middle',width:270,color:C.teal});
 for(let i=0;i<3;i++){const y=165+i*83;b.text(35,y+40,'p'+['₀','₁','₂'][i],{size:24,width:70});matrix(b,115,y,[[[1,0,1][i]]],{cellWidth:70,cellHeight:65,size:30,tone:'blue'});b.arrow(197,y+32,245,y+32,C.blue);matrix(b,260,y,[[[2,0],[0,0],[1,1]][i]],{cellWidth:85,cellHeight:65,gap:12,size:30,tone:'teal'});}
 b.text(260,445,'[2, 0] + [0, 0] + [1, 1]',{size:25,anchor:'middle',width:495});b.arrow(260,460,260,477,C.teal);matrix(b,162,490,[[3,1]],{cellWidth:90,cellHeight:65,gap:16,size:30,tone:'teal'});return[a,b];}
} satisfies FigureSpec;
