import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 captionIn:'article',
 articleId:'rl-18',figureId:'04-multiple-teachers-and-prefixes',number:'5-4',eyebrow:['그림 4','Figure 4'],
 title:['교사와 학생이 시작할 문맥을 함께 고른다','Choose both the teacher and the student’s starting context'],
 subtitle:['MiMo MOPD²는 전체 학생 rollout과, 준비된 대화 이력에서 시작하는 한 턴 생성을 함께 사용합니다.','MiMo MOPD² uses both full student rollouts and single turns starting from prepared conversation histories.'],
 alt:['왼쪽은 질문부터 학생이 전체 rollout을 만들고 mixRL 교사가 지도하는 Standard MOPD이다. 오른쪽은 교사 rollout 또는 SFT 데이터에서 만든 h1은 P와 원본 2턴, h2는 P와 원본 3턴을 포함한다. 학생은 각각 새 3턴 y1과 새 4턴 y2를 독립적으로 생성하고 지정된 교사로부터 지도받는다. 두 경로 모두 학생을 업데이트한다.','Standard MOPD on the left generates a full student rollout from the prompt and uses a mixRL teacher. On the right, h1 contains P and two source turns, while h2 contains P and three source turns from teacher rollouts or SFT data. They independently start fresh student turns y1 (turn 3) and y2 (turn 4), supervised by an assigned teacher. Both paths update the student.'],
 caption:['회색은 주어진 문맥, 파랑은 학생이 새로 생성한 구간입니다. h₁·h₂는 서로 다른 시점까지의 전체 이력이며 독립된 시작점입니다. 주어진 답의 뒷부분을 그대로 따라 쓰는 SFT가 아닙니다.','Gray denotes supplied context; blue denotes fresh student generation. h₁ and h₂ are complete histories up to different points, used as separate starting contexts. The student does not copy a fixed demonstration continuation.'],
 sources:[{label:'MiMo V2.6 §5.6 · Figure 13',url:'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL/blob/main/MiMo_V2_6_technical_report.pdf'}],
 panels(locale:Locale){
 const p=new Panel(locale,['전체를 학생이 생성','Full student rollout'],1080);
 p.box(16,112,488,106,['검증 가능한 분야','Verifiable domains'],['적합한 mixRL 교사 활용','Use a suitable mixRL teacher'],'purple');
 p.box(16,286,488,90,['프롬프트 P','Task prompt P'],['주어진 시작 문맥','Supplied starting context'],'gray');
 p.arrow(260,388,260,448,C.blue);
 p.box(16,461,488,164,['학생의 전체 rollout','Full student rollout'],['y₁ → y₂ → … → yT\n이후 대화도 학생이 이어서 생성','y₁ → y₂ → … → yT\nThe student continues later interactions'],'blue');
 p.arrow(260,637,260,755,C.blue);
 p.path('M508 165 H518 V807 H508',C.purple,2,true,true);
 p.box(16,768,488,145,['같은 문맥에서 교사가 평가','Teacher scores the same contexts'],['학생의 앞선 토큰을 조건으로\n토큰별 확률 정보 제공','Condition on preceding student tokens\nProvide token-level probability information'],'purple');
 p.arrow(260,925,260,964,C.purple,true);
 p.box(16,977,488,76,['학생 손실 → 학생 가중치 갱신','Student loss → student weight update'],'','teal');
 const q=new Panel(locale,['준비된 이력에서 한 턴 생성','One turn from a prepared history'],1080);
 q.box(16,112,488,130,['이력의 출처','Source of histories'],['교사가 만든 rollout 또는 SFT 데이터\n각 assistant 턴 직전까지 잘라 준비','Teacher rollout or SFT data\nCut just before each assistant turn'],'gray');
 [2,3].forEach((turns,i)=>{
  const y=350+i*195;
  q.text(16,y-28,[`h${i?'₂':'₁'} · P + 원본 ${turns}턴`,`h${i?'₂':'₁'} · P + ${turns} source turns`],{size:23,weight:600,width:488,color:C.muted});
  q.box(16,y,48,104,'P','','gray');
  for(let t=1;t<=turns;t++){
   const x=72+(t-1)*86;
   q.rect(x,y,78,104,C.grayFill,C.muted);
   q.text(x+39,y+32,['원본','Source'],{size:18,weight:600,anchor:'middle',width:66,color:C.muted});
   q.text(x+39,y+72,[`${t}턴`,`Turn ${t}`],{size:18,anchor:'middle',width:66});
  }
  const end=72+(turns-1)*86+78;
  q.arrow(end+10,y+52,366,y+52,C.blue);
  q.rect(378,y,126,104,C.blueFill,C.blue);
  q.text(441,y+32,`y${i?'₂':'₁'}`,{size:23,weight:600,anchor:'middle',width:106,color:C.blue});
  q.text(441,y+72,[`새 ${turns+1}턴`,`New turn ${turns+1}`],{size:18,anchor:'middle',width:112});
  q.path(`M508 ${y+52} H518 V720`,C.blue,2);
 });
 q.path('M518 720 H260 V755',C.blue,2,false,true);
 q.box(16,768,488,145,['지정된 분야 교사가 평가','Assigned domain teacher scores'],['mixRL 교사 또는 SFT 교사\n조건: 같은 hᵢ + 학생의 앞선 토큰','mixRL teacher or SFT teacher\nContext: same hᵢ + preceding student tokens'],'purple');
 q.arrow(260,925,260,964,C.purple,true);
 q.box(16,977,488,76,['학생 손실 → 학생 가중치 갱신','Student loss → student weight update'],'','teal');
 return [p,q];
 },
} satisfies FigureSpec;
