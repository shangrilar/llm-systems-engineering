import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-communication-basics",figureId:"04-buffer-reuse",number:"04-buffer-reuse",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["송수신 버퍼는 언제 다시 써도 될까?","When Can Send and Receive Buffers Be Reused?"],
  subtitle:["통신이 끝난 시점과 받은 데이터를 사용하는 계산이 끝난 시점은 다릅니다.","Communication and computation using the received data finish at different times."],
  alt:["공통 시간축에서 GPU 0 송신 버퍼는 A의 값 작성과 송신의 읽기가 끝나면 다음 값으로 덮어쓸 수 있다. GPU 1 수신 버퍼는 수신이 값을 쓰고 B가 그 값을 읽는 동안 유지해야 하며 B 완료 뒤 재사용할 수 있다. GPU 0 송신 완료 뒤에도 GPU 1의 B가 진행 중일 수 있다. B는 수신 버퍼 x를 읽고 별도 y에 [2,4,6,8]을 출력한다. 표시한 완료는 CPU API 반환이 아닌 GPU 작업 완료다.","On a shared time axis GPU 0 send memory is written by A and read by the send. It can be overwritten after send completion. GPU 1 receive memory must remain available while receive writes it and B reads it, and can be reused after B finishes. Send completion does not imply peer B completion. B reads x and writes [2,4,6,8] into a separate y buffer. Completion markers refer to GPU work, not CPU API return."],
  caption:["송신 버퍼는 송신 완료 뒤, 수신 버퍼는 B가 값을 모두 읽은 뒤 다시 쓸 수 있습니다.","The send buffer can be reused after the send completes; the receive buffer, after B has finished reading it."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,949,1104,[48,208]);
    p.el('text',{x:48,y:225,fill:C.ink,"font-size":(locale==='ko'?26:25),"font-weight":600,"text-anchor":"start"},["각 버퍼를 마지막으로 사용하는 작업이 끝난 뒤 다음 값을 씁니다.","Write the next values after the last operation using each buffer finishes."]);
    p.el("path",{d:"M250,292 H1142",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1148,y:277,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간 →","Time →"]);
    p.el('text',{x:48,y:409,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:48,y:447,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["송신 버퍼","Send buffer"]);
    p.el("rect",{x:250,y:372,width:200,height:104,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:350,y:418,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["계산 A","Compute A"]);
    p.el('text',{x:350,y:453,fill:C.blue,"font-size":25,"font-weight":400,"text-anchor":"middle"},["값 작성","Write values"]);
    p.el("rect",{x:450,y:372,width:210,height:104,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:555,y:418,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},["송신","Send"]);
    p.el('text',{x:555,y:453,fill:C.indigo,"font-size":25,"font-weight":400,"text-anchor":"middle"},["값 읽기","Read values"]);
    p.el("rect",{x:660,y:372,width:480,height:104,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:900,y:433,fill:C.teal,"font-size":(locale==='ko'?27:25),"font-weight":600,"text-anchor":"middle"},["다음 값으로 덮어쓰기 가능","Can overwrite with next values"]);
    p.el("path",{d:"M660,332 V361",fill:"none",stroke:C.indigo,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:660,y:320,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"middle"},["송신 완료","Send completes"]);
    p.el("path",{d:"M250,499 v10 H660 v-10",fill:"none",stroke:C.muted,"stroke-width":2});
    p.el('text',{x:455,y:545,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},["사용 중 · 재사용 불가","In use · Cannot reuse"]);
    p.el("path",{d:"M660,499 v10 H1140 v-10",fill:"none",stroke:C.teal,"stroke-width":2});
    p.el('text',{x:900,y:545,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["송신 버퍼 재사용 가능","Send buffer reusable"]);
    p.el('text',{x:48,y:682,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:48,y:720,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["수신 버퍼","Receive buffer"]);
    p.el("rect",{x:250,y:648,width:200,height:104,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:350,y:694,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},["수신에서","In receive"]);
    p.el('text',{x:350,y:729,fill:C.orange,"font-size":24,"font-weight":400,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("rect",{x:450,y:648,width:230,height:104,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:565,y:694,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},["수신","Receive"]);
    p.el('text',{x:565,y:729,fill:C.indigo,"font-size":25,"font-weight":400,"text-anchor":"middle"},["값 쓰기","Write values"]);
    p.el("rect",{x:680,y:648,width:240,height:104,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:800,y:694,fill:C.teal,"font-size":(locale==='ko'?27:25),"font-weight":600,"text-anchor":"middle"},["계산 B","Compute B"]);
    p.el('text',{x:800,y:729,fill:C.teal,"font-size":(locale==='ko'?25:22),"font-weight":400,"text-anchor":"middle"},["수신값 읽기","Read received values"]);
    p.el("rect",{x:920,y:648,width:220,height:104,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1030,y:694,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["다음 값으로","Next values"]);
    p.el('text',{x:1030,y:729,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},["덮어쓰기 가능","Can overwrite"]);
    p.el("path",{d:"M680,608 V637",fill:"none",stroke:C.indigo,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:680,y:596,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"middle"},["수신 완료","Receive completes"]);
    p.el("path",{d:"M920,608 V637",fill:"none",stroke:C.teal,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:920,y:596,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},["B 완료","B completes"]);
    p.el("path",{d:"M250,776 v10 H920 v-10",fill:"none",stroke:C.muted,"stroke-width":2});
    p.el('text',{x:585,y:822,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},["수신과 계산 B가 사용 중 · 재사용 불가","In use by receive and B · Cannot reuse"]);
    p.el("path",{d:"M920,776 v10 H1140 v-10",fill:"none",stroke:C.teal,"stroke-width":2});
    p.el('text',{x:1030,y:822,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["재사용 가능","Reusable"]);
    p.el("rect",{x:48,y:875,width:1104,height:118,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:920,fill:C.ink,"font-size":(locale==='ko'?26:25),"font-weight":600,"text-anchor":"middle"},["B는 수신 버퍼를 읽고, 별도 결과 버퍼 y에 씁니다.","B reads the receive buffer and writes to a separate result buffer y."]);
    p.el('text',{x:600,y:963,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["x = [1, 2, 3, 4]  →  B: 두 배로 계산  →  y = [2, 4, 6, 8]","x = [1, 2, 3, 4]  →  B: double each value  →  y = [2, 4, 6, 8]"]);
    p.el("rect",{x:48,y:1035,width:1104,height:114,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1080,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["송신이 끝나도 상대 GPU의 계산 B는 진행 중일 수 있습니다.","The peer GPU's B may still be running after the send finishes."]);
    p.el('text',{x:600,y:1119,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["호출 반환이 아니라, GPU에서 해당 작업이 끝난 시점을 봅니다.","Check when GPU work finishes, not when the CPU call returns."]);
    return [p];
  },
} satisfies FigureSpec;
