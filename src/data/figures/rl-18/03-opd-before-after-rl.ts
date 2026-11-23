import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 captionIn:'article',
 articleId:'rl-18',figureId:'03-opd-before-after-rl',number:'5-3',eyebrow:['그림 3','Figure 3'],
 title:['OPD의 위치는 학습 목적에 따라 달라진다','Where OPD belongs depends on the training goal'],
 subtitle:['교사의 능력을 학생에게 통합할 수도 있고, 학생의 후속 RL을 준비할 수도 있습니다.','OPD can integrate teacher capabilities or prepare a student for further RL.'],
 alt:['왼쪽은 교사 RL로 전문 교사를 만든 후 확률 정보를 학생 OPD에 전달하고 학생을 평가한다. 오른쪽은 준비된 학생이 외부 교사의 정보로 OPD를 학습한 뒤 과제 보상으로 RL을 수행한다.','On the left, teacher RL produces specialists whose probabilities guide student OPD, followed by student evaluation. On the right, a prepared student learns through OPD from an external teacher, then task-reward RL.'],
 caption:['왼쪽 RL의 학습 대상은 교사, 오른쪽 RL의 학습 대상은 학생입니다. 두 연구의 경로를 비교한 개념도이며, 같은 실험의 성능 비교가 아닙니다.','RL trains teachers on the left and the student on the right. These paths summarize different studies, not a controlled performance comparison.'],
 sources:[{label:'DeepSeek V4 §5.1',url:'https://arxiv.org/html/2606.19348v1#S5.SS1'},{label:'RL Starts before RL',url:'https://arxiv.org/abs/2609.28145'}],
 panels(locale:Locale){
 const p=new Panel(locale,['능력 전달과 통합','Transfer and integrate capabilities'],945);
 p.box(16,108,488,112,['교사의 분야별 RL','Domain-specific teacher RL'],['각 분야 보상으로 전문 능력 학습','Learn specialist skills from domain rewards'],'orange');
 p.arrow(260,232,260,269,C.blue);
 p.box(16,282,488,100,['준비된 전문 교사들','Prepared specialist teachers'],['학생 증류 중 교사는 고정','Teachers stay frozen during distillation'],'purple');
 p.arrow(260,394,260,482,C.purple,true);
 p.text(282,440,['확률 정보','Probabilities'],{size:19,width:215,color:C.purple});
 p.box(16,495,488,152,['학생의 OPD','Student OPD'],['학생 문맥에서 교사의 분포를 읽고\n학생의 가중치 갱신','Read teacher distributions on student contexts\nUpdate student weights'],'teal');
 p.arrow(260,659,260,762,C.blue);
 p.box(16,776,488,130,['통합된 학생 평가','Evaluate the integrated student'],['여러 분야 능력이 전달되었는가?','Were capabilities transferred across domains?'],'blue');
 const q=new Panel(locale,['후속 RL의 출발점 준비','Prepare a starting point for further RL'],735);
 q.box(16,108,488,100,['준비된 학생','Prepared student'],['출발 모델 체크포인트','Starting model checkpoint'],'blue');
 q.arrow(260,220,260,382,C.blue);
 q.box(282,238,222,103,['외부 교사','External teacher'],['학습 신호 제공','Provides guidance'],'purple');
 q.path('M393 353 V369 H445 V382',C.purple,2,true,true);
 q.box(16,395,488,112,['학생의 OPD','Student OPD'],['교사 정보로 학생을 먼저 학습','First train the student with teacher guidance'],'teal');
 q.arrow(260,519,260,557,C.blue);
 q.box(16,570,488,130,['같은 학생의 후속 RL','Further RL on the same student'],['과제 보상으로 계속 개선','Continue improving with task rewards'],'orange');
 return [p,q];
 },
} satisfies FigureSpec;
