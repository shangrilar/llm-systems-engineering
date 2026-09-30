import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
"articleId":"model-advanced-ngram-embedding",
"figureId":"04-lookup-meets-context",
"number":"ma-19-02",
"eyebrow":["그림 2", "Figure 2"],
"title":["두 임베딩을 함께 사용하고 함께 학습합니다", "Use and train both embedding paths"],
"subtitle":["입력 결합의 교육용 예시 · 실선은 순방향, 주황 선은 역전파", "Illustrative input fusion · Forward flow and orange backward flow"],
"captionIn":"article",
"caption":["B의 기본 임베딩과 (A,B)의 추가 임베딩은 함께 예측에 기여합니다. 다음 토큰 예측 loss의 gradient는 두 경로의 조회된 행으로 전달됩니다. 반복된 (A,B)는 같은 행을 다시 사용하고 학습합니다. 해시 주소는 고정 계산이며 미분하거나 학습하지 않습니다. 추론에서는 테이블을 읽습니다.", "The ordinary B embedding and additional (A,B) embedding jointly contribute to prediction. Gradients from next-token loss reach the retrieved rows along both paths. Repeated (A,B) reuses and trains the same row. Hash addresses are fixed computations, not differentiated or learned. Inference reads the tables."],
"alt":["B의 기본 임베딩과 (A,B)의 추가 임베딩은 함께 예측에 기여합니다. 다음 토큰 예측 loss의 gradient는 두 경로의 조회된 행으로 전달됩니다. 반복된 (A,B)는 같은 행을 다시 사용하고 학습합니다. 해시 주소는 고정 계산이며 미분하거나 학습하지 않습니다. 추론에서는 테이블을 읽습니다.", "The ordinary B embedding and additional (A,B) embedding jointly contribute to prediction. Gradients from next-token loss reach the retrieved rows along both paths. Repeated (A,B) reuses and trains the same row. Hash addresses are fixed computations, not differentiated or learned. Inference reads the tables."],
"sources":[{"label": "Engram §2, §4.1, §6.2", "url": "https://arxiv.org/html/2601.07372v1"}],
panels(locale:Locale,mobile?:boolean){

return [false,true].map(back=>{
const p=new Panel(locale,back?['B. 예측 오차가 두 경로로','B. Loss reaches both paths']:['A. 두 표현이 함께 예측에','A. Both features feed prediction'],790);
p.box(15,110,230,150,['기본 토큰 표','Token table'],'E[B]','blue');p.box(275,110,230,150,['N-gram 표','N-gram table'],'G[hash(A,B)]','teal');
p.token(35,300,'e(B)',190,'blue',60);p.token(295,300,'g(A,B)',190,'teal',60);
if(!back){p.arrow(130,270,130,290,C.blue);p.arrow(390,270,390,290,C.teal);p.path('M130 370 V420 H235',C.blue,3,false,true);p.path('M390 370 V420 H285',C.teal,3,false,true);}
else{p.arrow(130,290,130,270,C.orange);p.arrow(390,290,390,270,C.orange);p.path('M235 420 H130 V370',C.orange,3,false,true);p.path('M285 420 H390 V370',C.orange,3,false,true);}
p.circle(260,420,22,C.orangeFill,C.orange);p.text(260,429,'+',{size:25,anchor:'middle',width:35});
p.box(70,510,380,110,['이후 모델 계산','Remaining model'],['Attention · FFN / MoE','Attention · FFN / MoE'],'blue');
p.token(70,695,['다음 토큰 예측 → loss','Next-token prediction → loss'],380,'orange',75);
if(!back){p.arrow(260,455,260,500,C.blue);p.arrow(260,630,260,685,C.blue);}else{p.arrow(260,685,260,630,C.orange);p.arrow(260,500,260,455,C.orange);}
return p;});
}
} satisfies FigureSpec;
