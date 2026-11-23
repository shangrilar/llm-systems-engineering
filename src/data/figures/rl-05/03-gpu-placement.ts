import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
  articleId:'rl-05',figureId:'03-gpu-placement',number:'5-3',
  eyebrow:['그림 3','Figure 3'],
  title:['두 엔진을 같은 GPU에 둘 수도, 나눠 둘 수도 있다','Two engines can share GPUs or use separate pools'],
  subtitle:['같은 전체 GPU 자원에서 배치 방식만 비교합니다. GPU 수와 분할 비율은 교육용 예시입니다.','The same total GPU resources are shown in two placements. The GPU count and split are illustrative.'],
  alt:['공유 배치에서는 GPU 네 개를 생성과 학습이 번갈아 쓰고 분리 배치에서는 같은 네 개를 추론 두 개와 학습 두 개로 나눈다. 공유 시 전환 비용과 메모리 조정, 분리 시 자원 배분과 가중치 전달을 고려한다.','Shared placement: generation and training alternate on four GPUs. Separate placement: the same four GPUs are split into two inference and two training GPUs. Sharing involves switching and memory management; separation involves allocation and weight transfer.'],
  caption:['어디에 배치할지와 언제 실행할지는 다른 선택입니다. GPU를 분리해도 동기 실행할 수 있습니다. 역할·모델 복사본·프로세스·GPU의 수는 일대일로 대응하지 않습니다.','Placement and execution timing are separate choices. Separate GPU pools can still run synchronously. Roles, model copies, processes and GPUs do not have a one-to-one count.'],
  sources:[{label:'Miles v0.1.0 architecture',url:'https://github.com/radixark/miles/blob/v0.1.0/docs/developer/architecture.md'},{label:'Slime',url:'https://github.com/THUDM/slime'},{label:'NeMo RL',url:'https://github.com/NVIDIA-NeMo/RL'}],
  panels(locale:Locale){
    const p=new Panel(locale,['공유 배치','Shared placement'],790);
    const q=new Panel(locale,['분리 배치','Separate placement'],790);
    for(const s of [p,q]){s.rect(8,104,504,347,C.paper,C.line,14);s.text(28,143,['전체 GPU 자원','Total GPU resources'],{weight:600});}
    for(let i=0;i<4;i++)p.token(28+i*119,178,`GPU ${i+1}`,105,'gray',64);
    p.box(28,320,195,85,['생성','Generation'],'','blue');
    p.box(297,320,195,85,['학습','Training'],'','teal');
    p.arrow(231,348,289,348,C.muted);p.arrow(289,380,231,380,C.muted);
    p.text(28,285,['동일한 GPU 집합을 번갈아 사용','Alternate on the same GPU pool'],{size:21,width:455,color:C.muted});
    q.rect(24,170,225,249,C.blueFill,C.blue,10);q.rect(271,170,225,249,C.tealFill,C.teal,10);
    q.text(42,209,['추론용','Inference'],{weight:600,color:C.blue,width:186});
    q.text(289,209,['학습용','Training'],{weight:600,color:C.teal,width:186});
    q.token(42,240,'GPU 1',188,'blue',58);q.token(42,326,'GPU 2',188,'blue',58);
    q.token(289,240,'GPU 3',188,'teal',58);q.token(289,326,'GPU 4',188,'teal',58);
    p.box(8,487,504,112,['전환 비용','Switching cost'],['생성 ↔ 학습으로 실행 상태 전환','Switch execution state between generation and training'],'gray');
    p.box(8,623,504,137,['메모리 조정','Memory management'],['다음 단계가 쓸 메모리 확보','Make memory available for the next phase'],'gray');
    q.box(8,487,504,112,['자원 배분','Resource allocation'],['두 풀의 크기를 워크로드에 맞게 배분','Size the two pools for the workload'],'gray');
    q.box(8,623,504,137,['가중치 전달','Weight transfer'],['학습한 가중치를 추론 풀에 반영','Send updated weights to the inference pool'],'gray');
    return [p,q];
  },
} satisfies FigureSpec;
