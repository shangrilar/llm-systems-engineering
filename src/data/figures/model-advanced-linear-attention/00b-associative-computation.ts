import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-linear-attention',figureId:'00b-associative-computation',number:'ma-08-00b',eyebrow:['그림 2','Figure 2'],
 title:['KV를 먼저 곱하면 무엇이 달라질까?','What changes when KV comes first?'],
 subtitle:['한 head · 전체 위치를 읽는 예 · 정규화 전 비교','One head · All positions visible · Comparison before normalization'],captionIn:'article',
 caption:['변환된 Query와 Key의 내적을 점수로 사용한다. 아래 비교는 정규화 전이며 모든 위치를 읽는 경우다. 인과적 생성에서는 현재까지의 KV만 상태에 누적한다. 특징 차원을 고정하면 계산량은 토큰 수에 선형이다.','Use a dot product of transformed Queries and Keys as the score. The lower comparison is before normalization and allows all positions. Causal generation accumulates only the prefix. With fixed feature dimensions, computation is linear in token count.'],
 alt:['위에서는 softmax의 지수 점수를 특징 벡터 내적으로 바꾼다. 아래에서는 같은 변환된 Q,K,V로 토큰 점수 행렬 3×3을 먼저 만드는 순서와 Key 성분×Value 성분 상태2×2를 먼저 만드는 순서를 비교한다. 상태값은 3,1;0,3이며 두 계산의 정규화 전 결과는 같다.','Top: replace the exponential softmax score with a feature-vector dot product. Bottom: compare building a 3×3 token score matrix first with building a 2×2 Key-component by Value-component state first. State values are 3,1;0,3. Both orders yield the same unnormalized result.'],
 sources:[{label:'Linear Attention §3.2–3.3',url:'https://arxiv.org/html/2006.16236v3#S3.SS2'}],
 panels(locale:Locale){
 const a=new Panel(locale,['1. Softmax 어텐션','1. Softmax attention'],490);
 a.token(145,85,'QKᵀ / √dₖ',230,'blue',65);
 a.arrow(260,160,260,180,C.blue);
 a.token(145,190,'softmax',230,'purple',65);
 a.text(260,287,['양수 가중치 · 합은 1','Positive weights · Sum = 1'],{size:23,anchor:'middle',width:490,color:C.purple});
 a.arrow(260,310,260,338,C.purple);
 a.token(145,350,['V와 곱하기','Multiply by V'],230,'teal',65);
 const b=new Panel(locale,['2. 점수 함수를 바꾸기','2. Change the score function'],490);
 for(let i=0;i<2;i++){
  const y=100+i*120;
  b.token(0,y,i===0?'Query q':'Key k',130,'blue',60);
  b.arrow(140,y+30,163,y+30,C.blue);
  b.token(175,y,['양수로 변환','Positive map'],175,'purple',60);
  b.arrow(360,y+30,383,y+30,C.purple);
  b.token(395,y,i===0?'q̃':'k̃',120,'blue',60);
 }
 b.text(260,355,['내적 → 양수 점수','Dot product → Positive scores'],{size:23,anchor:'middle',width:500,color:C.blue});
 b.text(260,425,['점수 합으로 나누기 → 합은 1','Divide by score sum → Sum = 1'],{size:23,anchor:'middle',width:500,color:C.purple});
 const c=new Panel(locale,['3. 토큰별 점수를 먼저 계산','3. Compute token scores first'],590);
 c.text(255,111,'(Q̃K̃ᵀ)',{size:32,anchor:'middle',width:170,color:C.blue});
 c.text(365,111,'V',{size:32,anchor:'middle',width:60,color:C.muted});
 c.text(260,170,['열: Key의 토큰 위치','Columns: Key token positions'],{size:23,anchor:'middle',width:490,color:C.blue});
 for(let i=0;i<3;i++)c.text(205+i*78,214,'p'+['₀','₁','₂'][i],{size:24,anchor:'middle',width:65});
 matrix(c,170,237,[[1,0,1],[0,1,0],[1,0,1]],{cellWidth:68,cellHeight:60,gap:10,tone:'blue',size:26});
 for(let i=0;i<3;i++)c.text(122,277+i*70,'p'+['₀','₁','₂'][i],{size:24,anchor:'middle',width:65});
 c.text(260,490,['행: Query의 토큰 위치','Rows: Query token positions'],{size:23,anchor:'middle',width:490,color:C.blue});
 c.text(260,554,'T × T',{size:30,anchor:'middle',width:480,color:C.blue});
 const d=new Panel(locale,['4. KV를 먼저 누적','4. Accumulate KV first'],590);
 d.text(165,111,'Q̃',{size:32,anchor:'middle',width:60,color:C.muted});
 d.text(280,111,'(K̃ᵀV)',{size:32,anchor:'middle',width:170,color:C.teal});
 d.text(260,170,['열: Value 성분','Columns: Value components'],{size:23,anchor:'middle',width:490,color:C.teal});
 for(let i=0;i<2;i++)d.text(230+i*100,214,String(i),{size:24,anchor:'middle',width:75});
 matrix(d,185,237,[[3,1],[0,3]],{cellWidth:90,cellHeight:90,gap:10,tone:'teal',size:30});
 for(let i=0;i<2;i++)d.text(137,291+i*100,String(i),{size:24,anchor:'middle',width:65});
 d.text(260,490,['행: Key 성분','Rows: Key components'],{size:23,anchor:'middle',width:490,color:C.teal});
 d.text(260,554,'S · dₖ × dᵥ',{size:28,anchor:'middle',width:500,color:C.teal});
 return[a,b,c,d];}
} satisfies FigureSpec;
