import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  captionIn:'article',
  articleId:'rl-12',figureId:'03-inference-tool-resources',number:'12-3',
  eyebrow:['그림 3','Figure 3'],layout:'wide',
  title:['추론과 도구 실행을 함께 보기','Connect inference and tool execution'],
  subtitle:['코딩 에이전트의 예: 추론 GPU와 도구용 CPU 서버는 요청과 결과를 주고받습니다.','A coding-agent example: inference GPUs and CPU tool servers exchange calls and results.'],
  alt:['하나의 에이전트 프로그램이 GPU 추론 영역과 CPU 도구 환경 영역을 사용한다. GPU에서는 모델 실행과 KV 관리가 이루어진다. CPU 영역은 환경 준비, 실행 대기와 도구 실행, 파일과 환경 보존, 종료 후 회수를 담당한다. GPU에서 도구 호출을 보내고 결과를 받아 다음 추론을 이어 간다.','One agent program uses GPU inference and a CPU tool environment. GPUs execute the model and manage KV. The CPU side prepares environments, queues and executes tools, retains files and environments, and reclaims resources at termination. Tool calls go to the CPU side and results return for the next inference turn.'],
  caption:['도구 환경을 별도 CPU 서버에 둔 개념도입니다. 환경은 여러 호출에 걸쳐 유지될 수 있습니다. 모든 도구가 CPU에서 실행되거나 특정 제품끼리 연동된다는 뜻은 아닙니다.','A conceptual deployment with tool environments on separate CPU servers. Environments can persist across calls. This does not imply that every tool runs on CPUs or that particular products are integrated.'],
  sources:[
    {label:'ThunderAgent §4.4 and §5.1',url:'https://arxiv.org/html/2602.13692v1'},
    {label:'DeepSeek Elastic Compute (DSec)',url:'https://arxiv.org/abs/2609.22978'},
  ],
  panels(locale:Locale,mobile=false){
    const w=mobile?520:1120;
    const p=new Panel(locale,null,mobile?1310:730,w);
    p.box(0,0,w,114,['하나의 에이전트 프로그램','One agent program'],['추론과 도구 실행을 반복하며 작업을 이어갑니다.','The task continues across inference and tool execution.'],'gray');

    const gpu={x:0,y:154,w:mobile?520:368,h:mobile?334:438};
    const cpu={x:mobile?0:752,y:mobile?660:154,w:mobile?520:368,h:438};
    p.rect(gpu.x,gpu.y,gpu.w,gpu.h,C.blueFill,C.blue,14);
    p.text(gpu.x+24,gpu.y+40,['GPU 추론','GPU inference'],{size:27,weight:600,color:C.blue,width:gpu.w-48});
    p.text(gpu.x+24,gpu.y+74,['모델과 KV 캐시','Model and KV cache'],{size:21,color:C.muted,width:gpu.w-48});
    p.box(gpu.x+24,gpu.y+102,gpu.w-48,112,['모델 실행','Model execution'],['코드·도구 호출 생성','Generate code and tool calls'],'blue');
    p.box(gpu.x+24,gpu.y+(mobile?232:270),gpu.w-48,86+(mobile?0:32),['추론 자원 관리','Inference resources'],['요청 배치 · KV 관리','Batching · KV management'],'blue');

    p.rect(cpu.x,cpu.y,cpu.w,cpu.h,C.orangeFill,C.orange,14);
    p.text(cpu.x+24,cpu.y+40,['CPU 도구 환경','CPU tool environment'],{size:27,weight:600,color:C.orange,width:cpu.w-48});
    p.text(cpu.x+24,cpu.y+74,['별도 서버에 둔 예','Example: separate servers'],{size:21,color:C.muted,width:cpu.w-48});
    const stages=[
      ['환경 준비','Prepare environment'],
      ['실행 대기 · 도구 실행','Queue and run tools'],
      ['파일 · 환경 보존','Keep files and environment'],
      ['종료 후 자원 회수','Reclaim at termination'],
    ] as const;
    const offsets=[102,180,258,360];
    stages.forEach((label,i)=>p.box(cpu.x+24,cpu.y+offsets[i],cpu.w-48,i===2?90:60,label,'','orange'));

    if(mobile){
      p.arrow(178,gpu.y+gpu.h+12,178,cpu.y-12,C.orange);
      p.text(18,563,['도구 호출','Tool call'],{size:23,weight:600,color:C.orange,width:140});
      p.arrow(340,cpu.y-12,340,gpu.y+gpu.h+12,C.blue);
      p.text(362,553,['결과 → 다음 추론','Result → next turn'],{size:23,weight:600,color:C.blue,width:140});
    }else{
      p.arrow(gpu.w+12,294,cpu.x-12,294,C.orange);
      p.text(560,267,['도구 호출','Tool call'],{size:24,weight:600,color:C.orange,width:320,anchor:'middle'});
      p.text(560,367,['요청과 결과로 연결','Connected by calls and results'],{size:22,color:C.muted,width:320,anchor:'middle'});
      p.arrow(cpu.x-12,462,gpu.w+12,462,C.blue);
      p.text(560,433,['결과 → 다음 추론','Result → next turn'],{size:24,weight:600,color:C.blue,width:340,anchor:'middle'});
    }
    p.text(12,mobile?1150:651,['다음 추론은 도구 결과를 기다립니다.','The next inference turn waits for tool results.'],{size:26,weight:600,width:w-24});
    p.text(12,mobile?1237:694,['추론 속도와 환경의 대기를 함께 살펴봅니다.','Consider both inference speed and environment waits.'],{size:23,color:C.muted,width:w-24});
    return [p];
  },
} satisfies FigureSpec;
