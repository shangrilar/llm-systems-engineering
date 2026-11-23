import {Panel,C,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-ssm-basics',figureId:'01-state-through-time',number:'ssm-01',eyebrow:['그림 1','Figure 1'],
 title:['같은 상태 갱신 흐름, 다른 기록과 읽기','The same state-update flow, different writes and reads'],
 subtitle:['기본 Linear Attention ↔ 고정 계수 SSM','Basic linear attention ↔ Fixed-coefficient SSM'],captionIn:'article',
 caption:['개념 대응 그림이며 상태의 차원이나 저장량을 비교하지 않는다. Linear Attention은 특징 변환한 Key와 Query를 사용하며 분모 정규화를 생략했다. SSM의 직접 출력 항도 생략했다. 고정 계수는 추론 시점 간 고정이라는 뜻이다.','A conceptual correspondence, not a comparison of state shapes or storage sizes. Linear attention uses feature-mapped keys and queries; denominator normalization is omitted. The SSM direct output term is omitted. Fixed coefficients are fixed across inference steps.'],
 alt:['두 패널 모두 이전 상태 처리, 이번 정보 더하기, 새 상태, 출력 읽기의 같은 순서다. 기본 Linear Attention은 이전 상태를 그대로 두고 Key와 Value의 외적을 더한 뒤 현재 Query로 읽는다. 고정 계수 SSM은 Abar로 이전 상태를 변화시키고 Bbar로 변환한 입력을 더한 뒤 고정 C로 읽는다.','Both panels process the old state, add current information, form the new state and read an output. Basic linear attention retains the old state, adds a key-value outer product and reads with the current query. A fixed SSM transforms the old state with Abar, adds Bbar times input, and reads with fixed C.'],
 sources:[{label:'Linear Attention §3.2',url:'https://arxiv.org/abs/2006.16236'},{label:'Mamba §2',url:'https://arxiv.org/html/2312.00752v2#S2'}],
 panels(locale:Locale){return [false,true].map(ssm=>{const p=new Panel(locale,ssm?['고정 계수 SSM','Fixed-coefficient SSM']:['기본 Linear Attention','Basic linear attention'],920);
 p.token(110,100,['이전 상태','Old state'],300,'teal',60);p.arrow(260,170,260,205,C.teal);
 p.box(60,220,400,105,ssm?['Ā로 변화시키기','Transform with Ā']:['그대로 유지','Keep unchanged'],'','purple');p.arrow(260,335,260,365,C.purple);
 p.box(60,380,400,135,['이번 정보 더하기','Add current information'],ssm?['＋ B̄ × 현재 입력','＋ B̄ × current input']:['＋ Key × Value의 외적','＋ Key–Value outer product'],'orange');p.arrow(260,525,260,565,C.orange);
 p.token(110,580,['새 상태','New state'],300,'teal',65);p.arrow(260,655,260,695,C.teal);
 p.box(60,710,400,100,ssm?['고정된 C로 읽기','Read with fixed C']:['현재 Query로 읽기','Read with the current Query'],'','purple');p.arrow(260,820,260,850,C.purple);p.token(110,865,['출력','Output'],300,'blue',50);return p;});}
} satisfies FigureSpec;
