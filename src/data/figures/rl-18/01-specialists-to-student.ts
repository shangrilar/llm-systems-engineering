import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 captionIn:'article',
 articleId:'rl-18',figureId:'01-specialists-to-student',number:'5-1',eyebrow:['그림 1','Figure 1'],layout:'wide',
 title:['전문 모델을 키우고 OPD로 능력을 통합한다','Train specialists, then integrate capabilities with OPD'],
 subtitle:['DeepSeek V4: 분야별 SFT·RL로 교사를 준비하고, 교사의 확률로 하나의 학생을 학습합니다.','DeepSeek V4 prepares specialists with SFT and RL, then trains one student using teacher probabilities.'],
 alt:['사전학습 모델에서 분야 A B C의 SFT와 보상 기반 RL로 전문 교사를 만든다. 전문 교사들은 학생이 생성한 문맥의 확률을 제공하고 OPD가 학생을 업데이트한다. 교사의 가중치를 평균내는 연결은 없다.','A pretrained base branches into illustrative domains A, B and C, each with SFT and reward-based RL. Specialist teachers provide probabilities on student-generated contexts. OPD updates the student without averaging teacher weights.'],
 caption:['A·B·C는 설명용 분류이며 실제 교사 수가 아닙니다. 실선은 모델 학습 진행, 보라 점선은 교사 정보 전달입니다. 학생의 초기 체크포인트 선택은 표시하지 않았습니다.','A, B and C are illustrative domains, not the actual teacher count. Solid arrows show model training; purple dashed arrows carry teacher information. The student’s initial checkpoint is unspecified.'],
 sources:[{label:'DeepSeek V4 §5.1',url:'https://arxiv.org/html/2606.19348v1#S5.SS1'}],
 panels(locale:Locale,mobile=false){
 const w=mobile?520:1120;const p=new Panel(locale,null,1160,w);const mid=w/2;
 p.box(16,30,w-32,90,['사전학습 기반 모델','Pretrained base model'],['언어·지식·기본 생성 능력','Language, knowledge and generation'],'gray');
 if(mobile){
  p.path('M260 132 V157 H8 V601',C.blue,2);
  ['A','B','C'].forEach((d,i)=>{const y=188+i*165;p.arrow(8,y+42,25,y+42,C.blue);p.box(36,y,468,130,[`분야 ${d} · SFT → RL`,`Domain ${d} · SFT → RL`],[`분야 보상으로 학습 → 전문 교사 T${d}`,`Domain rewards → specialist teacher T${d}`],'blue');});
  ['A','B','C'].forEach((_,i)=>p.path(`M 508 ${255+i*165} H 517 V 695`,C.purple,2,true));
  p.path('M517 695 H260 V745',C.purple,2.5,true,true);
 }else{
  p.path('M560 132 V167 H184 M560 167 H936',C.blue,2);
  ['A','B','C'].forEach((d,i)=>{const x=16+i*376;p.arrow(x+168,167,x+168,207,C.blue);
   p.box(x,220,336,90,[`분야 ${d} · SFT`,`Domain ${d} · SFT`],['시범으로 출발점 준비','Prepare with demonstrations'],'blue');p.arrow(x+168,322,x+168,366,C.blue);
   p.box(x,378,336,120,['분야별 RL','Domain-specific RL'],['보상으로 정책 개선','Improve the policy with rewards'],'orange');p.arrow(x+168,510,x+168,552,C.blue);
   p.box(x,564,336,90,[`전문 교사 T${d}`,`Specialist teacher T${d}`],['증류 중 가중치 고정','Frozen for OPD'],'purple');
   p.path(`M${x+168} 666 V695 H560`,C.purple,2,true);
  });p.arrow(560,695,560,745,C.purple,true);
 }
 p.box(16,760,w-32,178,['학생의 OPD 학습 · 여러 교사 활용','Student OPD · multiple teachers'],['학생 응답 생성 → 같은 문맥의 교사 확률\n→ 학생 손실·역전파 → 학생 가중치 갱신','Student rollout → teacher probabilities on its contexts\n→ student loss and backpropagation → student update'],'teal');
 p.arrow(mid,950,mid,988,C.blue);
 p.box(16,1000,w-32,104,['여러 분야의 능력을 배운 학생','Student integrating multiple capabilities'],['통합은 학생 학습으로 수행','Integration through student training'],'blue');
 return [p];
 },
} satisfies FigureSpec;
