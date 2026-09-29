import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-ced',figureId:'05-select-and-attend',number:'ced-05',
 eyebrow:['그림 4 · 한 층의 선택과 읽기','Figure 4 · Select and read'],
 title:['고른 Global KV와 최근 Local KV를 함께 읽습니다','Read selected global KV together with recent local KV'],
 subtitle:['Full 층 · 현재 p5 · 교육용 Top-2 / local window 2 · Main Q ≠ Indexer Q','Full layer · Current p5 · Toy Top-2 / local window 2 · Main Q ≠ Indexer Q'],
 captionIn:'article',caption:['Indexer는 위치를 고르고 main attention은 선택된 global KV와 local KV를 함께 읽습니다. 실제 decoder는 Top-512와 SWA window 128을 사용합니다.','The indexer selects positions; main attention reads selected global KV together with local KV. The actual decoder uses Top-512 and an SWA window of 128.'],
 alt:['Global main KV의 indexer K와 현재 hidden의 indexer Q로 p0,p3을 선택한다. 해당 global KV와 p4,p5의 local KV를 연결하고 별도의 main Q로 attention을 계산한다.','Indexer K from global main KV and indexer Q from current hidden states select p0 and p3. Their global KV entries join local KV at p4 and p5 for attention with a separate main Q.'],
 sources:[{label:'DeepSeek Figure 4 and §2.3',url:'https://arxiv.org/html/2609.19969v1#S2.F4'}],
 panels(locale:Locale){
 const a=new Panel(locale,['A. Indexer · 읽을 위치 선택','A. Indexer · Choose positions'],1090);
 a.text(20,115,['Global main KV · E에서 생성','Global main KV · Built from E'],{size:23,weight:600,width:480,color:C.teal});
 for(let i=0;i<6;i++)a.token(20+i*80,145,`p${i}`,68,'teal',55);
 for(let i=0;i<6;i++)a.line(54+i*80,205,54+i*80,230,C.teal);
 a.line(54,230,510,230,C.teal);a.arrow(130,230,130,270,C.teal);
 a.box(20,280,220,120,'Indexer K',['Main KV에서 투영','Projected from main KV'],'teal');
 a.box(280,280,220,120,'Indexer Q',['현재 층 h에서 투영','Projected from layer h'],'blue');
 a.path('M130 410 V440 H190 V470',C.teal,2.5,false,true);a.path('M390 410 V440 H330 V470',C.blue,2.5,false,true);
 a.box(100,480,320,100,['Indexer 점수 → Top-2','Indexer scores → Top-2'],'','purple');
 a.arrow(260,590,260,630,C.purple);
 a.box(100,640,320,115,['선택 목록 [p0, p3]','Selected IDs [p0, p3]'],['위치 ID · KV 값이 아님','Position IDs, not KV values'],'purple');
 a.arrow(260,765,260,815,C.purple);
 a.box(100,825,320,110,'Selection',['Main KV에서 두 항목 읽기','Gather two main KV entries'],'teal');
 a.path('M510 230 V880 H430',C.teal,2.5,false,true);
 a.arrow(260,945,260,975,C.teal);a.token(100,985,'Global p0',150,'teal',65);a.token(270,985,'Global p3',150,'teal',65);
 const b=new Panel(locale,['B. Main attention · 값 읽기','B. Main attention · Read values'],1090);
 b.box(20,110,225,150,['선택된 Main KV','Selected main KV'],['Global p0, p3','Global p0, p3'],'teal');
 b.box(275,110,225,150,'Local SWA KV',['층별 h에서 · p4, p5','From layer h · p4, p5'],'orange');
 b.path('M130 270 V350',C.teal,2.5,false,true);b.path('M390 270 V350',C.orange,2.5,false,true);
 b.box(30,360,460,105,['Concatenation · 읽을 항목 연결','Concatenation · Join entries'],'','gray');
 const labs=['G:p0','G:p3','L:p4','L:p5'];for(let i=0;i<4;i++)b.token(30+i*120,500,labs[i],100,i<2?'teal':'orange',60);
 b.arrow(270,475,270,490,C.muted);
 for(let i=0;i<4;i++)b.line(80+i*120,565,80+i*120,580,C.teal);
 b.line(80,580,440,580,C.teal);b.arrow(330,580,330,700,C.teal);
 b.box(20,600,215,105,'Main Q',['현재 층 h에서','From layer h'],'blue');
 b.path('M125 715 V750 H230',C.blue,2.5,false,true);
 b.box(240,710,260,145,'Core Attention',['점수 · Value 가중합','Scores · Weighted values'],'blue');
 b.arrow(370,865,370,915,C.blue);b.box(130,925,370,110,['Attention 출력','Attention output'],'','blue');
 return [a,b];
 }
} satisfies FigureSpec;
