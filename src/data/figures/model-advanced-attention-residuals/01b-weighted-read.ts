import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-attention-residuals',figureId:'01b-weighted-read',number:'ma-14-01b',eyebrow:['그림 2','Figure 2'],
 title:['어떤 출력에 비중을 두느냐에 따라 읽는 값이 달라집니다','Different source weights change the value read'],
 subtitle:['같은 세 source · d = 3 · 비중을 가정한 교육용 비교','Same three sources · d = 3 · Illustrative assumed weights'],captionIn:'article',
 caption:['e=[2,0,0],f1=[0,4,0],f2=[0,0,6]을 비중 [.25,.5,.25]로 합치면 [.5,2,1.5]다. [.5,.25,.25]로 바꾸면 [1,1,1.5]다. 두 비중은 같은 source에 대한 독립적인 설명용 대안이다. 다음 그림에서 첫 비중을 실제 score/softmax 계산으로 연결한다. 비중 벡터는 source 축, 결과는 특징 성분 축이다.','For e=[2,0,0],f1=[0,4,0],f2=[0,0,6], weights [.25,.5,.25] yield [.5,2,1.5], while [.5,.25,.25] yield [1,1,1.5]. These are independent illustrative alternatives for the same sources. The next figure derives the first set via scores and softmax. Weights index sources; outputs index features.'],
 alt:['비중 .25,.5,.25를 세 원본에 곱한 기여 [.5,0,0],[0,2,0],[0,0,1.5]를 더해 [.5,2,1.5]. 비중을 .5,.25,.25로 바꾸면 [1,1,1.5].','Weighted contributions [.5,0,0],[0,2,0],[0,0,1.5] sum to [.5,2,1.5]. Changing weights to [.5,.25,.25] changes the result to [1,1,1.5].'],
 sources:[{label:'Attention Residuals',url:'https://arxiv.org/abs/2603.15031'}],
 panels(locale:Locale){
 const a=new Panel(locale,['A. 비중 × 원본 source','A. Weight × original source'],830);
 const raw=[[2,0,0],[0,4,0],[0,0,6]],weights=[.25,.5,.25],products=['[0.5, 0, 0]','[0, 2, 0]','[0, 0, 1.5]'];
 for(let i=0;i<3;i++){
 const y=128+i*200;a.text(333,y-18,['e','f₁','f₂'][i],{size:23,color:C.teal,anchor:'middle',width:90});a.token(15,y,String(weights[i]),100,'purple',56);a.text(150,y+37,'×',{size:30,anchor:'middle',width:40});matrix(a,205,y,[raw[i]],{cellWidth:82,cellHeight:56,gap:10,size:27,tone:'teal'});
 a.arrow(260,y+69,260,y+94,C.orange);a.token(140,y+106,products[i],240,'orange',52);
 }
 a.text(260,802,['비중의 합 = 1','Sum of weights = 1'],{size:24,anchor:'middle',width:490});
 const b=new Panel(locale,['B. 기여를 더해 다음 입력으로','B. Sum into the next input'],760);
 b.box(30,112,460,140,['첫 비중: [0.25, 0.5, 0.25]','First weights: [0.25, 0.5, 0.25]'],'[0.5, 0, 0] + [0, 2, 0] + [0, 0, 1.5]','orange');b.arrow(260,262,260,305,C.blue);
 matrix(b,92,319,[[.5,2,1.5]],{cellWidth:104,cellHeight:65,gap:12,size:29,tone:'blue'});
 b.text(260,431,['h₃: 세 특징 성분의 값','h₃: values of three features'],{size:24,weight:600,color:C.blue,anchor:'middle',width:490});
 b.box(30,490,460,139,['다른 비중: [0.5, 0.25, 0.25]','Other weights: [0.5, 0.25, 0.25]'],'h₃ = [1, 1, 1.5]','gray');
 b.text(260,694,['비중은 source별 · 출력은 특징별','Weights index sources; output indexes features'],{size:22,anchor:'middle',width:490});
 return [a,b];
 }
} satisfies FigureSpec;
