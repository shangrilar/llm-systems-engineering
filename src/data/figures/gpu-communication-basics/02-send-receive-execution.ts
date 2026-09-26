import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-communication-basics",figureId:"02-send-receive-execution",number:"02-send-receive-execution",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["계산 A의 결과가 계산 B에 도착하기까지","From the Result of A to Computation B"],
  subtitle:["CPU의 등록 순서와 두 GPU에서 실제로 진행되는 작업을 구별합니다.","Distinguish CPU submission order from actual work on the two GPUs."],
  alt:["상단 CPU 프로세스 0은 GPU 0의 스트림 S0에 A와 송신을, 프로세스 1은 GPU 1의 스트림 S1에 수신과 B를 등록한다. 상단은 시간축이 아니다. 하단 공통 시간축에서 GPU 1은 수신 작업을 먼저 시작해 기다린다. GPU 0의 A가 끝난 뒤 송신과 데이터 수신이 함께 진행된다. 수신 완료 뒤 B가 실행된다. 송신과 수신은 같은 데이터 전달에 참여한다. CPU 호출 반환은 GPU 수신 완료나 B 완료와 다르다.","The top shows CPU submission order, not a timeline. Process 0 submits A and send in GPU 0 stream S0; process 1 submits receive and B in GPU 1 stream S1. Below, GPU 1 receive starts early and waits until A produces x. Send and receive then transfer the data, and B starts after receive completion. CPU return does not guarantee GPU completion. Each GPU stream and matching NCCL operations connect the execution order."],
  caption:["아래 시간축은 GPU 1의 수신 작업이 먼저 시작된 경우입니다. 송신과 수신은 같은 데이터 전달에 함께 참여합니다.","The lower timeline shows GPU 1’s receive starting first. The send and receive take part in the same data transfer."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1104,1104,[48,208]);
    p.el('text',{x:48,y:228,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["CPU: 각 프로세스가 맡은 GPU에 작업 등록","CPU: Each process submits work to its GPU"]);
    p.el('text',{x:48,y:268,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["위쪽은 등록 순서이며, 두 CPU 호출이 같은 시각일 필요는 없습니다.","Submission order above; the two CPU calls need not happen at the same time."]);
    p.el("rect",{x:48,y:298,width:1104,height:270,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:356,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"start"},["프로세스 0","Process 0"]);
    p.el('text',{x:76,y:392,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},"GPU 0 · S₀");
    p.el('text',{x:76,y:490,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"start"},["프로세스 1","Process 1"]);
    p.el('text',{x:76,y:526,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},"GPU 1 · S₁");
    p.el("rect",{x:292,y:318,width:324,height:94,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:454,y:374,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["계산 A 등록","Submit A"]);
    p.el("path",{d:"M626,365 H662",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:674,y:318,width:430,height:94,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:889,y:359,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},["송신 등록","Submit send"]);
    p.el('text',{x:889,y:394,fill:C.indigo,"font-size":25,"font-weight":400,"text-anchor":"middle"},"ncclSend(...)");
    p.el("rect",{x:292,y:452,width:324,height:94,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:454,y:493,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},["수신 등록","Submit receive"]);
    p.el('text',{x:454,y:528,fill:C.indigo,"font-size":25,"font-weight":400,"text-anchor":"middle"},"ncclRecv(...)");
    p.el("path",{d:"M626,499 H662",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:674,y:452,width:430,height:94,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:889,y:508,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["계산 B 등록","Submit B"]);
    p.el('text',{x:600,y:615,fill:C.ink,"font-size":(locale==='ko'?25:24),"font-weight":600,"text-anchor":"middle"},["호출이 반환되어도 GPU의 수신이나 계산이 끝난 것은 아닙니다.","A returned call does not mean the GPU receive or computation has finished."]);
    p.el('text',{x:48,y:697,fill:C.ink,"font-size":(locale==='ko'?28:27),"font-weight":700,"text-anchor":"start"},["GPU: 각 스트림의 순서와 송수신을 연결해 실행","GPU: Connect stream order with send and receive"]);
    p.el("path",{d:"M250,747 H1142",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1148,y:732,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간 →","Time →"]);
    p.el('text',{x:48,y:838,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:48,y:875,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["스트림 S₀","Stream S₀"]);
    p.el("rect",{x:250,y:803,width:320,height:88,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:410,y:856,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},["계산 A","Compute A"]);
    p.el("rect",{x:570,y:803,width:305,height:88,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:722.5,y:856,fill:C.indigo,"font-size":29,"font-weight":600,"text-anchor":"middle"},["송신","Send"]);
    p.el('text',{x:570,y:784,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["A 완료","A completes"]);
    p.el('text',{x:875,y:784,fill:C.indigo,"font-size":22,"font-weight":600,"text-anchor":"middle"},["송신 완료","Send completes"]);
    p.el("path",{d:"M600,902 V965",fill:"none",stroke:C.indigo,"stroke-width":2.5,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:632,y:942,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"start"},["NCCL로 데이터 전달","Data transfer via NCCL"]);
    p.el('text',{x:48,y:1025,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:48,y:1062,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["스트림 S₁","Stream S₁"]);
    p.el("rect",{x:250,y:985,width:320,height:88,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:410,y:1038,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},["수신에서 대기","Wait in receive"]);
    p.el("rect",{x:570,y:985,width:305,height:88,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:722.5,y:1038,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},["데이터 수신","Receive data"]);
    p.el("rect",{x:875,y:985,width:255,height:88,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1002.5,y:1038,fill:C.teal,"font-size":(locale==='ko'?29:25),"font-weight":600,"text-anchor":"middle"},["계산 B","Compute B"]);
    p.el("path",{d:"M250,1086 v10 H875 v-10",fill:"none",stroke:C.indigo,"stroke-width":2});
    p.el('text',{x:562.5,y:1132,fill:C.indigo,"font-size":23,"font-weight":600,"text-anchor":"middle"},["하나의 수신 작업","One receive operation"]);
    p.el("path",{d:"M875,1084 V1145",fill:"none",stroke:C.indigo,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:888,y:(locale==='ko'?1125:1168),fill:C.indigo,"font-size":22,"font-weight":600,"text-anchor":"start"},["수신 완료","Receive completes"]);
    p.el('text',{x:1130,y:1125,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"end"},["B 완료","B completes"]);
    p.el("rect",{x:48,y:1190,width:1104,height:114,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1235,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["GPU 0의 순서 → NCCL 송수신 → GPU 1의 순서","GPU 0 order → NCCL send/receive → GPU 1 order"]);
    p.el('text',{x:600,y:1274,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["수신 완료 뒤에 B가 실행됩니다.","B executes after the receive completes."]);
    return [p];
  },
} satisfies FigureSpec;
