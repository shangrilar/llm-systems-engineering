import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-communication-basics",figureId:"03-communication-and-independent-work",number:"03-communication-and-independent-work",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["수신을 기다리는 동안 독립적인 계산하기","Independent Work While Waiting for Data"],
  subtitle:["필요한 데이터는 기다리되, 그 데이터와 무관한 계산은 함께 진행할 수 있습니다.","Wait for required data while independent computation can proceed alongside it."],
  alt:["A 완료 이후 GPU 1의 두 실행을 같은 시간 척도로 비교한다. 순차 실행은 수신, C, B 순이다. 동시 진행에서는 통신 스트림의 수신과 계산 스트림의 독립적인 C가 겹친다. 수신 뒤 이벤트 E를 기록하고 계산 스트림은 C 뒤 E 완료를 기다린 후 B를 실행한다. 두 그림의 수신, C, B 길이는 각각 같으며 전체 완료는 모든 B와 C가 끝난 때다. 하드웨어와 자원이 동시 실행을 허용하는 경우를 보여준다.","Two GPU 1 executions after A completes are compared on the same time scale. In one stream receive, C and B run sequentially. In two streams the receive and independent C overlap. Event E is recorded after the receive. The compute stream waits for E after C, then executes B. Each transfer and computation has the same length in both cases. Overall completion includes both B and C. This example assumes hardware and resources allow overlap."],
  caption:["두 경우의 수신·C·B 길이는 같습니다. 하드웨어와 자원이 동시 실행을 허용하는 경우입니다.","Receive, C, and B have the same lengths in both cases; this assumes the hardware and resources allow concurrent execution."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1102,1104,[48,208]);
    p.el("rect",{x:48,y:205,width:1104,height:108,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:247,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},["A 완료 이후 · 같은 데이터 전달과 같은 계산 B·C","After A completes · Same transfer and computations B and C"]);
    p.el('text',{x:600,y:287,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["C는 x와 무관한 계산 · 두 스트림이 함께 실행될 자원이 있는 경우","C is independent of x · Resources allow both streams to run concurrently"]);
    p.el('text',{x:48,y:369,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["한 스트림에 순서대로 배치","Sequential operations in one stream"]);
    p.el("path",{d:"M250,415 H1142",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1148,y:400,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간 →","Time →"]);
    p.el('text',{x:48,y:492,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:48,y:528,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["스트림 S","Stream S"]);
    p.el("rect",{x:250,y:457,width:350,height:90,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:425,y:511,fill:C.indigo,"font-size":28,"font-weight":600,"text-anchor":"middle"},["수신","Receive"]);
    p.el("rect",{x:600,y:457,width:190,height:90,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:695,y:511,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},["계산 C","Compute C"]);
    p.el("rect",{x:790,y:457,width:250,height:90,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:915,y:511,fill:C.teal,"font-size":(locale==='ko'?27:25),"font-weight":600,"text-anchor":"middle"},["계산 B","Compute B"]);
    p.el("path",{d:"M1040,558 V584",fill:"none",stroke:C.teal,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:1040,y:616,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},["B·C 완료","B and C complete"]);
    p.el('text',{x:48,y:689,fill:C.ink,"font-size":(locale==='ko'?28:27),"font-weight":700,"text-anchor":"start"},["통신과 독립 계산을 다른 스트림에 배치","Communication and independent work in separate streams"]);
    p.el('text',{x:48,y:729,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["GPU 1의 통신 스트림은 수신 뒤에 이벤트 E를 기록합니다.","GPU 1's communication stream records event E after the receive."]);
    p.el("path",{d:"M250,778 H1142",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1148,y:763,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간 →","Time →"]);
    p.el('text',{x:48,y:858,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:48,y:894,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["통신 스트림","Comm. stream"]);
    p.el("rect",{x:250,y:822,width:350,height:88,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:425,y:875,fill:C.indigo,"font-size":28,"font-weight":600,"text-anchor":"middle"},["수신","Receive"]);
    p.el("path",{d:"M600,910 V933",fill:"none",stroke:C.indigo,"stroke-width":2});
    p.el("circle",{cx:600,cy:943,r:8,fill:C.orange});
    p.el('text',{x:629,y:952,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"start"},["이벤트 E 완료","Event E completes"]);
    p.el("path",{d:"M600,956 V1001",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:48,y:1059,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:48,y:1095,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["계산 스트림","Compute stream"]);
    p.el("rect",{x:250,y:1016,width:190,height:90,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:345,y:1070,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},["계산 C","Compute C"]);
    p.el("rect",{x:440,y:1016,width:160,height:90,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:520,y:1055,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["이벤트 E","Event E"]);
    p.el('text',{x:520,y:1090,fill:C.orange,"font-size":22,"font-weight":400,"text-anchor":"middle"},["완료 대기","Wait to finish"]);
    p.el("rect",{x:600,y:1016,width:250,height:90,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:725,y:1070,fill:C.teal,"font-size":(locale==='ko'?27:25),"font-weight":600,"text-anchor":"middle"},["계산 B","Compute B"]);
    p.el("path",{d:"M850,1117 V1144",fill:"none",stroke:C.teal,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:850,y:1176,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},["B·C 완료","B and C complete"]);
    p.el("rect",{x:48,y:1220,width:1104,height:82,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1265,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["B는 수신 완료와 C 완료 뒤에 실행됩니다.","B executes after both the receive and C complete."]);
    return [p];
  },
} satisfies FigureSpec;
