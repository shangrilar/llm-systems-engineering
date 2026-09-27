import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'rl-03',figureId:'03-compute-and-group-readiness',number:'3-3',eyebrow:['그림 3','Figure 3'],
 title:['어떤 응답의 완료를 기다려야 할까?','Which responses must finish first?'],
 subtitle:['같은 시점의 완료 상태를 놓고, 그룹 비교에 필요한 결과와 개별 rollout 수집을 비교합니다.','A snapshot compares the outcomes needed for a prompt group with individual rollout collection.'],
 alt:['그룹 방식에서는 같은 P의 세 응답이 완료되어도 네 번째 응답의 보상을 기다려야 그룹 기준을 구한다. Single-rollout에서는 서로 다른 P₁,P₂,P₃의 완료 경험을 버퍼에 모으고 P₄는 계속 실행한다. 배치 구성과 업데이트는 뒤의 별도 단계이다.','A group baseline waits for the fourth response to P even after three finish. Single-rollout collection puts completed experience from P₁,P₂,P₃ in a buffer while P₄ keeps running. Batching and updating are later steps.'],
 caption:['설명용 상태이며 속도 측정이 아닙니다. 두 방식 모두 끝난 생성 슬롯은 재사용할 수 있습니다. 준비 버퍼에 들어갔다고 즉시 가중치를 갱신하는 것은 아닙니다.','Illustrative state, not a speed measurement. Both methods can reuse finished generation slots. Entering the buffer does not mean an immediate weight update.'],
 sources:[{label:'SAO §3.2',url:'https://arxiv.org/html/2607.07508v1#S3.SS2'}],
 panels(locale:Locale){return [true,false].map(group=>{
  const p=new Panel(locale,group?['그룹 비교: 같은 P의 응답 4개','Group: four responses to the same P']:['Single-rollout: 질문마다 응답 1개','Single-rollout: one response per prompt'],805);
  p.text(16,113,group?['같은 프롬프트 P','Same prompt P']:['서로 다른 프롬프트 P₁…P₄','Different prompts P₁…P₄'],{size:22,width:488,weight:600});
  for(let i=0;i<4;i++){
   const y=150+i*77;
   p.token(16,y,group?[`응답 ${i+1}`,`Response ${i+1}`]:`P${['₁','₂','₃','₄'][i]}`,162,'gray');
   p.arrow(188,y+25,218,y+25,i===3?C.muted:C.teal);
   p.token(230,y,i<3?['완료 · 보상 있음','Done · reward ready']:['실행 중 · 보상 없음','Running · no reward'],266,i<3?'teal':'gray');
   if(i<3)p.line(496,y+25,514,y+25,C.teal,1.5);
  }
  p.path('M514 175 V445 H260 V472',C.teal,2,false,true);
  p.box(16,486,488,126,group?['그룹 기준 계산 대기','Group baseline waits']:['준비 버퍼: 완료 경험 3개','Ready buffer: three completed runs'],group?['응답 4의 보상도 필요','Response 4’s reward is still needed']:['P₄의 완료를 함께 기다릴 필요 없음','No need to wait for P₄'],'orange');
  p.arrow(260,623,260,662,group?C.gray:C.teal);
  p.box(16,676,488,106,group?['그룹이 준비된 뒤 배치 구성·학습','Batch and learn when the group is ready']:['배치 구성 → A 계산 → 업데이트','Batch → compute A → update'],group?['다른 그룹은 계속 처리할 수 있음','Other groups can keep progressing']:['채점·가치 계산 등도 충족해야 함','Required scoring and value work still apply'],'gray');
  return p;
 });}
} satisfies FigureSpec;
