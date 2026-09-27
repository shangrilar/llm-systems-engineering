import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-11',figureId:'03-draft-verify-mtp',number:'11-3',
  eyebrow:['그림 3','Figure 3'],
 title:['여러 토큰을 제안하고 생성 정책으로 검증한다','Propose several tokens and verify with the generation policy'],
 subtitle:['후보 4개 중 앞의 2개가 채택되는 한 번의 반복을 확대했습니다. MTP는 후보를 제안하는 방식 중 하나입니다.','One iteration where two of four proposed tokens are accepted. MTP is one possible way to propose candidates.'],
 alt:['draft가 x1,x2,x3,x4를 제안한다. target 검증에서 x1,x2를 채택하고 x3에서 거절하여 보정샘플 z를 뽑는다. x4는 폐기하며 다음 문맥은 x1,x2,z다. target 갱신 뒤 draft 적합성과 상태를 확인한다.','Draft proposes x1,x2,x3,x4. Target verification accepts x1 and x2, rejects x3 and draws correction token z. Discard x4; continue from x1,x2,z. Check draft suitability and state after target updates.'],
 caption:['분포 보존에는 유효한 확률적 검증·보정 절차와 일관된 target 버전이 필요합니다. 채택률과 제안 길이만으로 가속을 단정하지 않습니다. MTP 탑재가 RL 중 draft 동시 학습 지원을 뜻하지는 않습니다.','Distribution preservation requires a valid probabilistic verification/correction procedure and a consistent target version. Acceptance rate and proposal length alone do not establish speedup. Having MTP does not imply support for joint draft training during RL.'],
 sources:[{label:'Fast Inference from Transformers via Speculative Decoding',url:'https://arxiv.org/abs/2211.17192'},{label:'NeMo RL speculative decoding',url:'https://research.nvidia.com/labs/nemotron/rl-speculative-decoding/'}],
 panels(locale:Locale){
 const p=new Panel(locale,['제안 → 검증 → 확정','Propose → verify → commit'],1024);
 p.box(16,102,488,130,['Draft · 후보 생성','Draft · generate candidates'],['예: 작은 모델 / EAGLE / MTP','Examples: small model / EAGLE / MTP'],'purple');
 ['x₁','x₂','x₃','x₄'].forEach((t,i)=>p.token(28+i*123,269,t,99,'purple'));
 p.arrow(260,323,260,376,C.purple);
 p.box(16,386,488,146,['Target · 후보 위치를 함께 계산','Target · score candidate positions together'],['현재 생성 정책으로 검증 · 보상 채점기가 아님','Verify with the generation policy, not a reward scorer'],'blue');
 p.arrow(260,538,260,591,C.blue);
 ['x₁ ✓','x₂ ✓','x₃ ×','x₄ ×'].forEach((t,i)=>p.token(28+i*123,601,t,99,i<2?'teal':i===2?'red':'gray'));
 p.text(16,699,['앞 2개 채택 · 3번째 거절 · 나머지 폐기','Accept first two · reject third · discard the rest'],{size:22,width:488,weight:600});
 p.box(16,789,488,124,['거절 지점에서 보정 샘플 z','Draw correction token z at rejection'],['검증 절차가 정한 보정 분포 사용','Use the correction distribution of the verifier'],'orange');
 p.text(16,971,['다음 문맥: … x₁ x₂ z → 다음 반복','Next context: … x₁ x₂ z → next iteration'],{size:23,width:488,weight:600});
 const q=new Panel(locale,['정책 갱신과 draft의 수명','Policy updates and draft lifetime'],1024);
 q.box(16,102,488,132,['Target v10 + draft','Target v10 + draft'],['한 검증 반복은 일관된 정책 버전으로','Use a consistent target version within an iteration'],'blue');
 q.arrow(260,240,260,300,C.blue);
 q.box(16,310,488,111,['Target 가중치 갱신 → v11','Update target weights → v11'],'','orange');
 q.arrow(260,427,260,486,C.orange);
 q.box(16,496,488,151,['Draft 적합성·내부 상태 확인','Check draft fit and internal state'],['후보 품질, 유효한 KV·특징 상태, 갱신 방식을 확인','Check candidate quality, valid KV/features and update handling'],'purple');
 q.box(16,704,488,244,['두 질문을 구분','Ask two separate questions'],['정확성: 검증·보정 조건이 성립하는가? 속도: 순차 실행의 시간 절약이 추가 비용보다 큰가?','Correctness: are verification and correction valid? Speed: does reduced sequential time outweigh added overhead?'],'gray');
 return [p,q];
 }
} satisfies FigureSpec;
