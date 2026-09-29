import {Panel,C,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mamba-selective',figureId:'02-input-coefficients',number:'mamba-02',eyebrow:['그림 4','Figure 4'],
 title:['학습한 가중치로 매 입력의 계수를 만듭니다','Learned weights generate coefficients for each input'],
 subtitle:['Mamba-1 · 한 채널의 상태 갱신 · 상태 크기 N','Mamba-1 · One channel’s state update · State size N'],captionIn:'article',
 caption:['SSM 입력 특징 x에서 B,C와 Delta를 계산한다. Delta는 추가 투영과 softplus를 거쳐 양수가 된다. A는 학습된 파라미터이며 입력마다 생성하지 않는다. 오른쪽은 공식 step 구현의 Abar=exp(Delta A),Bbar=Delta B 경로다. B,C는 N성분, Delta는 채널별스칼라다.','SSM input features generate B,C and Delta; Delta uses a further projection and softplus. A is learned but not generated per input. The right panel follows official step: Abar=exp(Delta A), Bbar=Delta B. B,C have N components; Delta is scalar per channel.'],
 alt:['입력 특징에서 학습된 가중치로 투영해 B와C를 얻고 Delta경로에는 추가 투영과softplus를 적용한다. 고정된A와Delta는 유지계수를 만들고 Delta와B는 기록계수를 만든다. C는 읽기에 쓰인다.','Project input features with learned weights to B,C,and a Delta path with further projection and softplus. Fixed A and Delta produce retention; Delta and B produce writing; C is used for reading.'],
 sources:[{label:'Official Mamba-1 step v2.2.2',url:'https://github.com/state-spaces/mamba/blob/v2.2.2/mamba_ssm/modules/mamba_simple.py'}],
 panels(locale:Locale){const a=new Panel(locale,['1. 입력에서 계산','1. Compute from the input'],760),b=new Panel(locale,['2. 상태 연산에 연결','2. Connect to state operations'],760);
 a.box(20,105,480,90,['SSM 입력 특징 xₜ','SSM input features xₜ'],'','blue');a.arrow(260,205,260,245,C.blue);a.box(20,260,480,90,['학습한 가중치로 투영','Project with learned weights'],'','blue');
 connector(a,[260,360],[100,400],{via:[[260,380],[100,380]],tone:'orange'});a.arrow(260,360,260,565,C.orange);connector(a,[260,360],[425,565],{via:[[260,380],[425,380]],tone:'purple'});
 a.box(20,410,160,145,['추가 투영','Projection'],'softplus','orange');a.arrow(100,565,100,595,C.orange);a.box(20,605,160,125,'Δₜ > 0',['채널별 1개','1 per channel'],'orange');a.box(190,575,145,155,'Bₜ',['N성분','N components'],'orange');a.box(355,575,145,155,'Cₜ',['N성분','N components'],'purple');
 b.box(20,105,480,95,['A · 학습된 고정 파라미터','A · Learned, fixed parameter'],['모든 성분 < 0','All components < 0'],'gray');
 b.box(20,255,220,95,'A, Δₜ',['이산화에 사용','Discretize'],'purple');b.arrow(250,303,285,303,C.purple);b.box(300,255,200,95,'Āₜ',['기존 상태 유지','Retain old state'],'purple');
 b.box(20,425,220,95,'Δₜ, Bₜ',['이산화에 사용','Discretize'],'orange');b.arrow(250,473,285,473,C.orange);b.box(300,425,200,95,'B̄ₜ',['현재 입력 기록','Write this input'],'orange');
 b.box(20,595,220,95,'Cₜ','','purple');b.arrow(250,643,285,643,C.purple);b.box(300,595,200,95,['출력 읽기','Read output'],'','purple');return[a,b];}
} satisfies FigureSpec;
