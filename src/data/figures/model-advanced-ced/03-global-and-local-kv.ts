import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-ced',figureId:'03-global-and-local-kv',number:'ced-03',
 eyebrow:['그림 3 · 실제 Decoder의 공유 구조','Figure 3 · Actual decoder sharing'],
 title:['Global KV는 한 번 만들고, Local KV는 층마다 만듭니다','One global KV bank; local KV in every layer'],
 subtitle:['DeepSeek-V4.1-Flash · Decoder 20층 · 시퀀스 압축률 m = 1','DeepSeek-V4.1-Flash · 20 decoder layers · Sequence compression m = 1'],
 captionIn:'article',caption:['첫 Full 층이 encoder 최종 표현에서 만든 global KV를 나머지 decoder 층이 재사용합니다. Local KV는 각 층의 현재 표현에서 만듭니다.','The first Full layer builds global KV from final encoder states; later decoder layers reuse it. Every layer builds local KV from its own current states.'],
 alt:['Encoder 최종 표현 E가 첫 Full 층의 global KV 생성으로 연결된다. Full 1개, Reindex 4개, Reuse 15개가 동일 global bank를 사용하고 모든 층은 자신의 local KV를 만든다.','Final encoder states E supply global KV generation in the first Full layer. One Full, four Reindex and fifteen Reuse layers use the same global bank, with layer-local KV in every layer.'],
 sources:[{label:'DeepSeek Figure 3 and §4.2.1',url:'https://arxiv.org/html/2609.19969v1#S1.F3'}],
 panels(locale:Locale){
 const a=new Panel(locale,['A. 공통 Global KV','A. Shared global KV'],990);
 a.box(30,110,460,110,['Encoder 최종 표현 E','Final encoder states E'],'','teal');
 a.arrow(260,230,260,270,C.teal);
 a.box(30,280,460,130,['첫 Full 층의 KV 투영','KV projection of the first Full layer'],['E에서 생성 · 시퀀스 압축 없음','Built from E · No sequence compression'],'teal');
 a.arrow(260,420,260,460,C.teal);
 a.box(30,470,460,140,['하나의 Global main KV','One global main KV bank'],['Indexer K도 여기서 생성','Indexer K is derived from this bank'],'teal');
 a.arrow(260,620,260,680,C.teal);
 a.box(30,690,460,150,['Decoder 20층이 함께 사용','Shared across all 20 decoder layers'],['Full 1 · Reindex 4 · Reuse 15','1 Full · 4 Reindex · 15 Reuse'],'blue');
 a.text(30,910,['각 층의 Main Q와 Local KV는 별도','Each layer keeps its own main Q and local KV'],{width:460,size:23,weight:600});
 const b=new Panel(locale,['B. 층별 처리와 실제 배치','B. Layer-local work and placement'],990);
 b.token(30,110,'hₗ',130,'blue',60);
 b.arrow(170,140,220,140,C.orange);b.box(230,110,260,115,'Local SWA KV',['현재 층에서 생성','Built in this layer'],'orange');
 b.arrow(95,180,95,260,C.blue);b.token(30,270,'Main Qₗ',180,'blue',60);
 b.arrow(120,340,120,400,C.blue);b.path('M360 235 V435 H320',C.orange,2.5,false,true);
 b.box(30,410,280,120,'Attention',['선택된 global도 함께 읽기','Local + selected global'],'blue');
 b.arrow(170,540,170,580,C.blue);b.token(30,590,['Attention 출력','Attention output'],280,'blue',60);
 b.box(30,720,460,100,'Full → Reuse ×3','','teal');
 b.arrow(260,830,260,860,C.blue);
 b.box(30,870,460,100,'[Reindex → Reuse ×3] ×4','','blue');
 return [a,b];
 }
} satisfies FigureSpec;
