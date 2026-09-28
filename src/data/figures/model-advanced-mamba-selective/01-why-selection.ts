import {Panel,C,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mamba-selective',figureId:'01-why-selection',number:'mamba-01',eyebrow:['그림 1','Figure 1'],
 title:['Mamba는 입력에서 계수도 계산합니다','Mamba also computes coefficients from the input'],
 subtitle:['고정 계수 SSM → 입력에 따라 선택하는 SSM','Fixed-coefficient SSM → Input-dependent selective SSM'],captionIn:'article',
 caption:['양쪽 모두 현재 입력으로 상태를 갱신한다. Mamba에는 현재 입력에서 계수를 계산하는 경로가 추가된다. 학습된 가중치 자체를 매 입력마다 학습하거나 교체한다는 뜻이 아니다.','Both update state with the current input. Mamba adds a path that computes coefficients from that input; the learned weights themselves are not retrained or replaced for each input.'],
 alt:['고정 계수 SSM은 입력과 별도로 정해진 계수로 상태를 갱신하고 읽는다. Mamba는 입력이 학습된 가중치로 계수를 만드는 경로에도 들어간다. 두 방식의 입력 경로와 상태 처리 순서는 같고 입력에서 계수로 이어지는 연결이 다르다.','A fixed SSM updates and reads state with coefficients fixed independently of the current input. Mamba also routes the input through learned weights to generate coefficients. Both share the input path and state-processing order; the input-to-coefficient connection differs.'],
 sources:[{label:'Mamba §3.2',url:'https://arxiv.org/html/2312.00752v2#S3.SS2'}],
 panels(locale:Locale){return [false,true].map(selective=>{const p=new Panel(locale,selective?'Mamba':['고정 계수 SSM','Fixed-coefficient SSM'],900);
 p.token(120,100,['현재 입력 특징 xₜ','Current input features xₜ'],340,'blue',65);
 if(selective)p.arrow(260,175,260,225,C.blue);
 p.box(70,240,360,120,selective?['학습한 가중치로 계산','Compute with learned weights']:['학습된 고정 계수','Learned, fixed coefficients'],selective?'':['입력과 별도로 정해짐','Independent of this input'],selective?'blue':'gray');p.arrow(250,370,250,410,selective?C.blue:C.gray);
 p.box(70,425,360,120,selective?['입력에 따라 달라지는 계수','Input-dependent coefficients']:['매 시점 같은 계수','Same coefficients each step'],['유지 · 기록 · 읽기','Retain · Write · Read'],'purple');
 p.box(20,610,205,100,['이전 상태','Old state'],'','teal');p.box(300,610,200,120,['갱신 · 읽기','Update · Read'],'','teal');p.arrow(235,660,288,660,C.teal);connector(p,[250,555],[395,600],{via:[[250,580],[395,580]],tone:'purple'});
 connector(p,[470,132],[480,600],{via:[[510,132],[510,582],[480,582]],tone:'blue'});p.arrow(395,740,395,780,C.teal);p.box(285,795,220,95,['새 상태 · 출력','New state · Output'],'','teal');return p;});}
} satisfies FigureSpec;
