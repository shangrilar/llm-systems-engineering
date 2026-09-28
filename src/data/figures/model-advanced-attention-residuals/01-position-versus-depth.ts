import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-attention-residuals',figureId:'01-position-versus-depth',number:'ma-14-01',eyebrow:['그림 1','Figure 1'],
 title:['앞선 출력을 누적하는 대신, 비중을 정해 읽습니다','Read earlier outputs with selected weights'],
 subtitle:['같은 토큰 · fᵢ는 각 sublayer의 새 출력 · e는 embedding','Same token · fᵢ is a fresh sublayer output · e is the embedding'],captionIn:'article',
 caption:['기본 residual은 e에 f1,f2를 더해 하나의 누적 표현을 만든다. Full AttnRes는 e와 각 새 출력 f1,f2를 source로 두고 목적지 sublayer의 가중합 입력을 만든다. 누적 hidden state들의 합이 아니다. F3가 실행된 뒤에야 f3가 새 source가 된다. 기본 누적 계수1이 각 층의 의미적 영향력이 같다는 뜻은 아니다. 정규화와 계수 계산의 상세는 생략한다.','Standard residual adds f1 and f2 to e. Full AttnRes retains e and fresh f1,f2 as sources and forms a weighted input for the destination sublayer. Sources are not cumulative hidden states. Only after F3 runs does f3 become a new source. Unit accumulation coefficients do not imply equal semantic influence. Normalization and scoring details are omitted.'],
 alt:['왼쪽 e에 f1,f2를 차례로 더한 누적값을 F3가 읽는다. 오른쪽 e,f1,f2 각각에 alpha를 곱한 합을 F3가 읽는다. f3는 F3 실행 뒤에 생긴다.','Left: F3 reads the cumulative e+f1+f2. Right: F3 reads a separately weighted sum of e,f1,f2. f3 is produced only after F3 executes.'],
 sources:[{label:'Attention Residuals',url:'https://arxiv.org/abs/2603.15031'}],
 panels(locale:Locale){
 const a=new Panel(locale,['A. 기본 Residual · 한곳에 합산','A. Standard residual · Accumulate'],825);
 for(let i=0;i<3;i++){
  const y=120+i*155;a.token(160,y,['e','e + f₁','e + f₁ + f₂'][i],270,'teal',60);
  if(i<2){a.arrow(295,y+70,295,y+90,C.teal);a.circle(295,y+117,19,C.paper,C.teal);a.text(295,y+124,'+',{size:26,anchor:'middle',width:35});a.token(20,y+93,`f${i===0?'₁':'₂'}`,110,'orange',48);a.arrow(140,y+117,267,y+117,C.orange);a.arrow(295,y+143,295,y+148,C.teal);}
 }
 a.arrow(295,500,295,542,C.blue);a.box(160,554,270,102,['F₃ · 다음 계산','F₃ · Next step'],['누적 표현을 읽음','Read the sum'],'blue');a.arrow(295,666,295,705,C.orange);a.token(190,717,'f₃',210,'orange',58);
 const b=new Panel(locale,['B. AttnRes · 출력별로 선택','B. AttnRes · Select by source'],825);
 for(let i=0;i<3;i++){
  const y=120+i*110;b.token(50,y,['e','f₁','f₂'][i],230,'teal',60);b.text(320,y+39,`× α${['₀','₁','₂'][i]}`,{size:27,color:C.purple,width:170});b.path(`M165 ${y+70} V${y+75} H460`,C.purple);
 }
 b.line(460,195,460,458,C.purple);b.path('M460 458 H260 V488',C.purple,2.5,false,true);
 b.box(55,500,410,92,['현재 층이 읽을 가중합','Weighted input for this sublayer'],'h₃ = α₀e + α₁f₁ + α₂f₂','blue');
 b.arrow(260,602,260,640,C.blue);b.token(155,652,'F₃ → f₃',210,'orange',62);
 b.text(260,760,['계산 후 f₃를 새 source로 추가','After computing, add f₃ as a new source'],{size:22,anchor:'middle',width:490});
 b.text(260,803,['선택하는 축: 토큰 위치 → 깊이','Selection axis: token position → depth'],{size:22,anchor:'middle',width:490});
 return [a,b];
 }
} satisfies FigureSpec;
