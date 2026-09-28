import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-linear-attention',figureId:'01-outer-product',number:'ma-08-01',layout:'wide',
  eyebrow:['그림 3','Figure 3'],
  title:['외적은 모든 성분 조합을 행렬로 만듭니다','An outer product makes a matrix of all component pairs'],
  subtitle:['p₂의 Key와 Value · 작은 수치 예시','Key and Value at p₂ · Illustrative values'],
  captionIn:'article',caption:['현재 토큰의 Key와 Value로 상태에 더할 외적을 만든다.','Form an outer product from the current token Key and Value.'],
  alt:['p₂에서 나온 Key [1,0]과 Value [1,1]의 외적으로 [[1,1],[0,0]]을 만든다. 행은 Key 성분, 열은 Value 성분이다.','Key [1,0] and Value [1,1] from p₂ form the outer product [[1,1],[0,0]]. Rows are Key components and columns are Value components.'],
  sources:[{label:'Transformers are RNNs §3.3, accumulated outer products',url:'https://arxiv.org/html/2006.16236v3#S3.SS3'}],
  panels(locale:Locale){
    const a=new Panel(locale,null,680);
    a.token(190,15,'p₂',140,'blue',50);
    a.text(260,103,['투영 · Key feature map','Projections · Key feature map'],{size:22,anchor:'middle',width:480});
    a.line(260,120,260,140,C.blue,2);a.line(100,140,360,140,C.blue,2);a.arrow(100,140,100,290,C.blue);a.arrow(360,140,360,165,C.teal);
    a.text(360,203,'v₂ᵀ · 1×2',{size:25,color:C.teal,anchor:'middle',width:280});
    matrix(a,245,232,[[1,1]],{cellWidth:100,cellHeight:65,gap:16,size:30,tone:'teal'});
    a.text(100,327,'k₂ · 2×1',{size:25,color:C.blue,anchor:'middle',width:190});
    matrix(a, 60,365,[[1],[0]],{cellWidth:80,cellHeight: 70,gap:16,size:30,tone:'blue'});
    matrix(a,245,365,[[1,1],[0,0]],{cellWidth:100,cellHeight:70,gap:16,size:30,tone:'orange'});
    for(let i=0;i<2;i++){a.line(150,400+i*86,235,400+i*86,C.blue,2,true);a.line(295+i*116,307,295+i*116,355,C.teal,2,true);}
    a.text(350,575,'k₂v₂ᵀ · 2×2',{size:27,weight:600,anchor:'middle',width:300,color:C.orange});
    a.text(260,642,['행: Key 성분 · 열: Value 성분','Rows: Key components · Columns: Value components'],{size:22,anchor:'middle',width:500});
    return [a];
  },
} satisfies FigureSpec;
