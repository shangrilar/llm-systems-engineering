import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-15',figureId:'03-policy-version-transition',number:'15-3',
  eyebrow:['그림 3','Figure 3'],
 title:['복사가 끝나도 새 정책을 바로 쓰는 것은 아니다','Transfer completion is not permission to use the new policy'],
 subtitle:['재양자화가 필요한 모델의 예시입니다. 기존 생성을 멈춘 뒤, 같은 추론 실행에 참여하는 GPU A/B를 갱신합니다. 막대 길이는 실측이 아닙니다.','Example for a model requiring requantization. Generation is paused before updating GPUs A/B in the same inference execution. Bar lengths are illustrative.'],
 alt:['Trainer가 v21을 준비해 전송한다. 같은 복사 완료 시점 이후 worker A는 먼저 적용을 마치고 B는 재양자화를 계속한다. B까지 준비되었음을 확인한 뒤 새 v21 요청을 허용한다. 전환 전에 진행 중인 요청과 KV의 처리 정책을 정해야 한다.','The trainer prepares and transfers v21. After copying completes, worker A finishes requantizing before B. New v21 requests are admitted only after the transition confirms readiness. In-flight request and KV policies must be defined beforehand.'],
 caption:['이 그림은 전체를 멈췄다가 재개하는 한 가지 계약입니다. Rolling 전환도 가능하지만 worker·요청별 버전을 추적해야 합니다. 순수 전송 시간과 후처리·확인·재개 시간을 구분해 측정합니다.','This is one stop-and-resume contract. Rolling transitions are also possible with worker- and request-level version tracking. Measure transfer separately from post-processing, confirmation and resumption.'],
 sources:[{label:'Miles P2P v0.1.0',url:'https://github.com/radixark/miles/blob/v0.1.0/docs/advanced/p2p-weight-transfer.md'}],
 panels(locale:Locale){
 const p=new Panel(locale,['같은 시간축에서 본 전환','A transition on one time axis'],1140);
 p.arrow(0,108,506,108,C.muted);p.text(418,96,['시간','Time'],{size:19,width:96});
 [[170,270],[314,415],[459,560],[604,704]].forEach(([a,b])=>{p.line(260,a,260,b,C.muted,1.5,true);p.line(450,a,450,b,C.teal,1.5,true);});
 p.text(0,156,['Trainer · v21 준비와 전송','Trainer · prepare and transfer v21'],{size:22,weight:600});
 p.token(0,179,['준비 v21','Prep v21'],114,'purple',58);p.token(122,179,['전송','Transfer'],138,'blue',58);
 p.text(0,301,['GPU A · 재양자화 먼저 완료','GPU A · requantization finishes first'],{size:22,weight:600});
 p.token(122,324,['복사','Copy'],138,'blue',58);p.rect(266,324,120,58,C.orangeFill,C.orange,8);p.text(326,361,['재양자화','Requantize'],{size:19,weight:600,anchor:'middle',width:112,color:C.orange});p.token(392,324,'✓',48,'teal',58);p.arrow(392,398,440,398,C.teal,true);
 p.text(0,446,['GPU B · 재양자화 진행 중','GPU B · still requantizing'],{size:22,weight:600});
 p.token(122,469,['복사','Copy'],138,'blue',58);p.token(266,469,['재양자화','Requantize'],174,'orange',58);
 p.text(0,591,['새 요청 허용 상태','Admission of new requests'],{size:22,weight:600});
 p.token(0,614,['대기 · 중간 상태를 사용하지 않음','Wait for consistent weights'],440,'gray',58);p.token(450,614,'✓',58,'teal',58);
 p.circle(260,718,19,C.grayFill,C.muted);p.text(260,725,'1',{size:21,anchor:'middle',width:32});
 p.circle(450,718,19,C.tealFill,C.teal);p.text(450,725,'2',{size:21,anchor:'middle',width:32,color:C.teal});
 p.box(0,779,508,113,['① 복사 완료','① Copying complete'],['숫자는 도착했지만 추론용 표현은 준비 중','Values have arrived; the inference representation is not ready yet'],'blue');
 p.box(0,919,508,150,['② 전환 확인 후 v21 새 요청 허용','② Admit v21 after confirming readiness'],['갱신에 참여한 A/B 모두 준비됐는지 확인. A만 완료됐다고 재개하지 않음','Confirm both participating workers are ready. A finishing early alone does not allow resumption'],'teal');
 const q=new Panel(locale,['가중치 변환과 별개인 전환 작업','Switching tasks beyond weight conversion'],880);
 q.box(16,111,488,180,['기존 요청 정리','Handle existing requests'],['가중치를 바꾸기 전에 완료까지 기다리거나 중단. 이어가기는 엔진의 지원 방식에 따름','Before changing weights, drain or pause generation. Continuation depends on engine support.'],'blue');
 q.arrow(260,311,260,349,C.blue);
 q.box(16,370,488,180,['이전 가중치의 KV 처리','Handle KV from the old weights'],['이전 KV의 사용 조건을 확인하고, 필요한 캐시를 비우거나 문맥을 다시 계산','Check old-KV compatibility; invalidate caches or recompute context as needed.'],'purple');
 q.arrow(260,570,260,608,C.purple);
 q.box(16,629,488,180,['모두 준비되면 v21으로 재개','Resume with v21 when all are ready'],['A/B의 가중치 준비와 요청·캐시 처리를 확인한 뒤 함께 생성 재개','Resume together after weight preparation and request/cache handling are complete.'],'teal');
 return [p,q];
 }
} satisfies FigureSpec;
