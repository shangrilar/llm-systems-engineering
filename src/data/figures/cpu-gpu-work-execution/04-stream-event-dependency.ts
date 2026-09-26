import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"cpu-gpu-work-execution",figureId:"04-stream-event-dependency",number:"04-stream-event-dependency",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["다른 스트림의 결과는 어떻게 기다릴까?","How do we wait for another stream?"],
  subtitle:["이벤트 E로 A의 완료를 표시하고, B가 그 완료를 기다리도록 지정합니다.","Mark completion of A with event E, and make B wait for that completion."],
  alt:["위쪽은 CPU가 등록하는 순서이며 시간축이 아니다. 프로그램이 같은 GPU에 두 스트림을 만든다. S0에 계산 A와 이벤트 E 기록을, S1에 계산 C와 이벤트 E 완료 대기와 계산 B를 순서대로 등록한다. CPU는 이벤트 E 완료까지 기다리지 않고 다음 작업을 계속한다. 아래쪽 GPU 시간축에서는 독립적인 A와 C가 겹쳐 실행된다. C가 끝나도 이벤트 E가 완료되지 않았다면 B는 기다린다. A가 끝나고 이벤트 E가 완료된 뒤 B가 실행된다. 동시 실행은 자원이 허용하는 경우다.","The top shows CPU submission order, not a timeline. The program creates two streams on the same GPU. It submits A and recording event E in S0, then C, a wait for E to complete, and B in S1. The CPU continues without waiting for E. In the GPU timeline below, independent A and C overlap. If E is not complete when C finishes, B waits. B executes after A finishes and E completes. Concurrent execution depends on available resources."],
  caption:["위쪽은 등록 순서이며 시간축이 아닙니다. 아래쪽만 GPU의 실행 시간을 나타냅니다.","The top shows submission order, not time; only the bottom shows GPU execution over time."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1018,1104,[48,208]);
    p.el("rect",{x:48,y:205,width:1104,height:70,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:250,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"start"},"A → u → B");
    p.el('text',{x:436,y:250,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"start"},["C는 별도 데이터를 사용하는 독립적인 계산","C is independent and uses separate data"]);
    p.el('text',{x:48,y:326,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["CPU: 두 스트림에 작업과 순서를 등록","CPU: Submit work and ordering to two streams"]);
    p.el('text',{x:48,y:363,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["프로그램이 스트림을 만들고, 각 작업을 어느 스트림에 넣을지 지정합니다.","The program creates streams and chooses a stream for each operation."]);
    p.el("rect",{x:48,y:389,width:1104,height:223,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:447,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["스트림 S₀","Stream S₀"]);
    p.el("rect",{x:250,y:412,width:200,height:64,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:350,y:453,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["계산 A","Compute A"]);
    p.el("path",{d:"M461,444 H485",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:496,y:412,width:280,height:64,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:636,y:453,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},["이벤트 E 기록","Record event E"]);
    p.el('text',{x:800,y:452,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["A 뒤에 완료 지점 표시","Mark completion after A"]);
    p.el('text',{x:76,y:553,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["스트림 S₁","Stream S₁"]);
    p.el("rect",{x:250,y:518,width:200,height:64,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:350,y:559,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},["계산 C","Compute C"]);
    p.el("path",{d:"M461,550 H485",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:496,y:518,width:280,height:64,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:636,y:559,fill:C.orange,"font-size":(locale==='ko'?24:23),"font-weight":600,"text-anchor":"middle"},["이벤트 E 완료 대기","Wait for E to complete"]);
    p.el("path",{d:"M787,550 H811",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:822,y:518,width:280,height:64,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:962,y:559,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["계산 B","Compute B"]);
    p.el('text',{x:600,y:654,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["CPU는 이벤트 E 완료를 기다리지 않고 다음 CPU 작업을 계속합니다.","The CPU continues with other work without waiting for E to complete."]);
    p.el('text',{x:48,y:732,fill:C.ink,"font-size":(locale==='ko'?28:27),"font-weight":700,"text-anchor":"start"},["GPU: 등록된 순서와 조건에 따라 실행","GPU: Execute in the specified order and conditions"]);
    p.el('text',{x:48,y:769,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 GPU의 두 스트림","Two streams on the same GPU"]);
    p.el("path",{d:"M250,807 H1142",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1148,y:792,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간 →","Time →"]);
    p.el('text',{x:48,y:884,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["스트림 S₀","Stream S₀"]);
    p.el("rect",{x:250,y:844,width:500,height:76,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:500,y:891,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},["계산 A","Compute A"]);
    p.el("path",{d:"M751,882 H770",fill:"none",stroke:C.blue,"stroke-width":2});
    p.el("circle",{cx:780,cy:882,r:9,fill:C.orange});
    p.el('text',{x:810,y:872,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"start"},["이벤트 E 완료","Event E completes"]);
    p.el('text',{x:810,y:909,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["A의 결과 u 준비","A’s result u is ready"]);
    p.el('text',{x:48,y:1020,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["스트림 S₁","Stream S₁"]);
    p.el("rect",{x:250,y:980,width:210,height:76,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:355,y:1027,fill:C.purple,"font-size":29,"font-weight":600,"text-anchor":"middle"},["계산 C","Compute C"]);
    p.el("rect",{x:460,y:980,width:320,height:76,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:620,y:1027,fill:C.orange,"font-size":(locale==='ko'?25:23),"font-weight":600,"text-anchor":"middle"},["이벤트 E 완료 대기","Wait for E to complete"]);
    p.el("rect",{x:780,y:980,width:350,height:76,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:955,y:1027,fill:C.teal,"font-size":29,"font-weight":600,"text-anchor":"middle"},["계산 B","Compute B"]);
    p.el("path",{d:"M780,894 V969",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange)});
    p.el("rect",{x:48,y:1104,width:1104,height:114,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1149,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["B는 이벤트 E 완료 뒤에 실행됩니다.","B executes after event E completes."]);
    p.el('text',{x:600,y:1188,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["A와 C는 자원이 허용하면 겹쳐 실행될 수 있습니다.","A and C can overlap when resources allow."]);
    return [p];
  },
} satisfies FigureSpec;
