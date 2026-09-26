import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-execution-and-warp-scheduling",figureId:"07-latency-hiding",number:"07-latency-hiding",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 7","Figure 7"],
  title:["한 워프가 기다리는 동안 다른 워프를 실행합니다","Run Other Warps While One Waits"],
  subtitle:["메모리 접근을 빠르게 만드는 대신, 그동안 진행할 수 있는 작업을 실행합니다.","Execute other ready work during the wait, rather than shortening memory access."],
  alt:["한 스케줄러의 명령 발행을 두 경우로 비교한다. 워프 A가 읽기를 요청하고 다음 덧셈에 필요한 입력을 기다리는 동안, 준비된 B와 D가 있으면 그 명령들을 발행한다. A의 입력이 준비되면 A의 덧셈을 선택할 수 있다. 아래쪽은 다른 워프들도 모두 기다려 A의 입력 대기 중 명령 발행이 비는 경우이다. 두 경우의 데이터 대기 시간은 같다고 가정한다. 칸은 실제 사이클이나 명령 소요 시간을 뜻하지 않고 B와 D를 번갈아 고르는 정책을 의미하지 않는다. A가 다시 선택되는 시점도 항상 즉시라고 보장하지 않는다. 발행이 비었다고 이미 진행 중인 모든 하드웨어 연산이 멈추는 것은 아니다.","Two cases compare instruction issue by one scheduler. Warp A requests a read and waits for inputs to its next addition. If B and D are ready, their instructions can be issued. Once A has its inputs, its addition can be selected. Below, all other warps are also waiting, leaving instruction issue empty during A's wait. The data wait is assumed equal in both cases. Cells do not represent actual cycles or instruction durations, or a policy of alternating B and D. A is not guaranteed to be selected immediately when ready. An empty issue slot does not stop all previously issued operations in the hardware."],
  caption:["칸은 실제 사이클이나 명령 소요 시간을 뜻하지 않으며, B와 D를 번갈아 고르는 정책을 나타내지도 않습니다.","Cells are not actual cycles or instruction durations, and they do not imply a policy of alternating between B and D."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1015,1104,[48,206]);
    p.el('text',{x:48,y:218,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["한 워프 스케줄러의 명령 발행 흐름","Instruction issue by one warp scheduler"]);
    p.el("path",{d:"M699,211 L1140,211",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:921,y:194,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["시간 흐름","Time"]);
    p.el("rect",{x:48,y:250,width:1104,height:343,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:75,y:296,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["실행 가능한 다른 워프가 있을 때","When other warps are eligible"]);
    p.el('text',{x:77,y:365,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["워프 A","Warp A"]);
    p.el('text',{x:77,y:400,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["입력 상태","Input state"]);
    p.el("rect",{x:292,y:337,width:124,height:67,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:354,y:378.5,fill:C.blue,"font-size":(locale==='ko'?22:18),"font-weight":600,"text-anchor":"middle"},["읽기 요청","Read request"]);
    p.el("rect",{x:430,y:337,width:538,height:67,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:699,y:378.5,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},["다음 계산에 필요한 값을 기다림","Waiting for inputs to the next computation"]);
    p.el("rect",{x:982,y:337,width:124,height:67,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1044,y:378.5,fill:C.teal,"font-size":(locale==='ko'?22:20),"font-weight":600,"text-anchor":"middle"},["입력 준비","Input ready"]);
    p.el('text',{x:77,y:482,fill:C.ink,"font-size":(locale==='ko'?23:21),"font-weight":600,"text-anchor":"start"},["발행한 명령","Issued instructions"]);
    p.el("rect",{x:292,y:440,width:124,height:70,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:354,y:483,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["A 읽기","A read"]);
    p.el("rect",{x:430,y:440,width:124,height:70,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:492,y:483,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["B 명령","B instr."]);
    p.el("rect",{x:568,y:440,width:124,height:70,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:630,y:483,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["D 명령","D instr."]);
    p.el("rect",{x:706,y:440,width:124,height:70,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:768,y:483,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["B 명령","B instr."]);
    p.el("rect",{x:844,y:440,width:124,height:70,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:906,y:483,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["D 명령","D instr."]);
    p.el("rect",{x:982,y:440,width:124,height:70,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1044,y:483,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["A 덧셈","A add"]);
    p.el('text',{x:600,y:560,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["A가 기다리는 동안 B와 D의 명령을 실행할 수 있습니다.","Instructions from B and D can execute while A waits."]);
    p.el("rect",{x:48,y:629,width:1104,height:343,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:75,y:675,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["다른 워프도 모두 기다릴 때","When all other warps are also waiting"]);
    p.el('text',{x:77,y:744,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["워프 A","Warp A"]);
    p.el('text',{x:77,y:779,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["입력 상태","Input state"]);
    p.el("rect",{x:292,y:716,width:124,height:67,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:354,y:757.5,fill:C.blue,"font-size":(locale==='ko'?22:18),"font-weight":600,"text-anchor":"middle"},["읽기 요청","Read request"]);
    p.el("rect",{x:430,y:716,width:538,height:67,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:699,y:757.5,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},["다음 계산에 필요한 값을 기다림","Waiting for inputs to the next computation"]);
    p.el("rect",{x:982,y:716,width:124,height:67,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1044,y:757.5,fill:C.teal,"font-size":(locale==='ko'?22:20),"font-weight":600,"text-anchor":"middle"},["입력 준비","Input ready"]);
    p.el('text',{x:77,y:861,fill:C.ink,"font-size":(locale==='ko'?23:21),"font-weight":600,"text-anchor":"start"},["발행한 명령","Issued instructions"]);
    p.el("rect",{x:292,y:819,width:124,height:70,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:354,y:862,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["A 읽기","A read"]);
    p.el("rect",{x:430,y:819,width:538,height:70,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:699,y:861,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["명령 발행 없음","No instruction issued"]);
    p.el("rect",{x:982,y:819,width:124,height:70,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1044,y:862,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["A 덧셈","A add"]);
    p.el('text',{x:600,y:939,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["실행 가능한 워프가 없으면 이 스케줄러는 명령을 발행하지 못합니다.","With no eligible warp, this scheduler cannot issue an instruction."]);
    p.el("rect",{x:48,y:1007,width:1104,height:150,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1057,fill:C.blue,"font-size":29,"font-weight":700,"text-anchor":"middle"},["지연 숨기기 · Latency hiding","Latency hiding"]);
    p.el('text',{x:600,y:1109,fill:C.blue,"font-size":25,"font-weight":400,"text-anchor":"middle"},["기다리는 동안 다른 작업을 진행해 연산 장치가 쉬는 시간을 줄입니다.","Make progress on other work during waits to reduce idle time for compute units."]);
    p.el('text',{x:600,y:1207,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["두 경우에서 A가 데이터를 기다리는 시간은 같습니다.","A waits for its data for the same duration in both cases."]);
    return [p];
  },
} satisfies FigureSpec;
