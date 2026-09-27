import {Panel,C,type FigureSpec,type Locale,type Label} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-12',figureId:'01-program-resource-lifetimes',number:'12-1',
  eyebrow:['그림 1','Figure 1'],layout:'wide',
 title:['모델 호출이 끝나도 에이전트 작업은 계속된다','An agent program outlives each model call'],
 subtitle:['같은 코딩 프로그램 P가 작성·테스트·수정·재시험을 이어 갑니다. 도구를 기다리는 동안 연산과 메모리의 수명은 다릅니다.','The same coding program P writes, tests, revises and retests. While tools run, computation and memory have different lifetimes.'],
 alt:['프로그램 P가 Reasoning,Acting,Reasoning,Acting을 순서대로 거친다. GPU 계산은 Reasoning에서, 도구 실행은 Acting에서 진행된다. 이 예에서 KV와 도구 환경은 호출 사이에도 유지되고 끝에서 회수된다.','Program P alternates Reasoning, Acting, Reasoning and Acting. GPU computation occurs during Reasoning and tool execution during Acting. In this example KV and the tool environment persist between calls and are released at termination.'],
 caption:['시간 비율을 나타내지 않는 개념도입니다. 이 예는 도구 실행 중 KV를 보유한 경우이며 항상 GPU에 남겨야 한다는 뜻은 아닙니다. Reasoning/Acting은 실행 단계, Active/Paused/Terminated는 스케줄 상태입니다.','A conceptual diagram, not relative timings. This example retains KV during tool execution; retention on GPU is not mandatory. Reasoning/Acting are execution phases; Active/Paused/Terminated are scheduling states.'],
 sources:[{label:'ThunderAgent §4',url:'https://arxiv.org/html/2602.13692v1#S4'}],
 panels(locale:Locale,mobile=false){
 const w=mobile?520:1120,p=new Panel(locale,['Program P · 호출을 잇는 하나의 작업','Program P · one job across calls'],1070,w),left=mobile?122:190,cw=(w-left-18)/4;
 p.text(16,118,['실행 순서 →','Execution order →'],{size:22,width:w-32,color:C.muted});
 const actions:Label[]=[['작성','Write'],['시험','Test'],['수정','Edit'],['재시험','Retest']];
 actions.forEach((a,i)=>{const x=left+i*cw;p.rect(x+2,149,cw-4,78,i%2?C.orangeFill:C.blueFill,i%2?C.orange:C.blue,8);p.text(x+cw/2,181,a,{size:22,weight:600,anchor:'middle',width:cw-8});p.text(x+cw/2,212,i%2?'A':'R',{size:20,anchor:'middle',width:cw-8,color:i%2?C.orange:C.blue});});
 const row=(y:number,label:Label)=>{p.text(16,y+34,label,{size:21,width:left-30,weight:600});p.line(left,y+70,w-18,y+70,C.line,1);};
 row(266,['GPU 연산','GPU work']);row(382,['KV 보유','KV held']);row(498,['도구 환경','Tool env.']);row(614,['도구 실행','Tool work']);
 for(let i=0;i<4;i++){const x=left+i*cw;p.token(x+5,275,i%2?'—':['계산','Run'],cw-10,i%2?'gray':'blue',48);p.token(x+5,624,i%2?['실행','Run']:'—',cw-10,i%2?'orange':'gray',48);}
 p.rect(left+5,391,4*cw-10,49,C.tealFill,C.teal,8);p.text(left+2*cw,422,['KV 유지 · 이 예의 선택','Keep KV · choice in this example'],{size:22,anchor:'middle',width:4*cw-24,color:C.teal});
 p.rect(left+5,507,4*cw-10,49,C.purpleFill,C.purple,8);p.text(left+2*cw,538,['파일·실행 환경 유지','Keep files and environment'],{size:22,anchor:'middle',width:4*cw-24,color:C.purple});
 p.text(16,741,['R: Reasoning · 모델 생성 | A: Acting · 도구 실행','R: Reasoning · model generation | A: Acting · tool execution'],{size:22,width:w-32});
 p.box(16,815,w-32,108,['작업 종료 → 자원 회수','Program terminates → release resources'],['호출 종료와 프로그램 종료는 다릅니다.','Call completion ≠ program termination.'],'gray');
 p.text(16,976,['별도 축: 스케줄 상태 Active / Paused / Terminated','Separate axis: scheduling state Active / Paused / Terminated'],{size:23,weight:600,width:w-32,color:C.muted});
 return [p];
 }
} satisfies FigureSpec;
