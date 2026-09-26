import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"cpu-gpu-work-execution",figureId:"02-enqueue-and-execute",number:"02-enqueue-and-execute",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["등록한 작업은 언제 실행될까?","When does submitted work execute?"],
  subtitle:["CPU가 작업을 등록하는 시점과 GPU가 실행을 마치는 시점은 다릅니다.","CPU submission and GPU completion happen at different times."],
  alt:["같은 시간축의 CPU 행에는 A 등록과 B 등록 후 다른 CPU 작업이 있다. GPU 스트림 S에서는 A 후 B가 실행된다. 세로 표시 시점에 CPU는 B 등록까지 마쳤지만 GPU는 A를 실행 중이다. 입력 복사는 미리 완료된 상태다.","On a shared time axis, the CPU submits A and B and then performs other work. In GPU stream S, A executes before B. At the marked instant, the CPU has submitted B, but the GPU is still executing A. The input copy has already completed."],
  caption:["입력 복사가 끝난 뒤부터 보여 줍니다. 막대 길이는 실제 실행 시간의 비율이 아닙니다.","Shown after input copies finish. Bar lengths are not actual execution-time ratios."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,571,1104,[48,208]);
    p.el('text',{x:48,y:222,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["입력 x는 이미 GPU에 준비된 상태","Input x is already ready on the GPU"]);
    p.el("path",{d:"M240,254 H1142",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1148,y:239,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간 →","Time →"]);
    p.el('text',{x:48,y:327,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"CPU");
    p.el('text',{x:48,y:363,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["작업 등록","Submit work"]);
    p.el("rect",{x:240,y:292,width:126,height:70,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:303,y:336,fill:C.blue,"font-size":(locale==='ko'?25:22),"font-weight":600,"text-anchor":"middle"},["A 등록","Submit A"]);
    p.el("rect",{x:410,y:292,width:126,height:70,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:473,y:336,fill:C.teal,"font-size":(locale==='ko'?25:22),"font-weight":600,"text-anchor":"middle"},["B 등록","Submit B"]);
    p.el("rect",{x:650,y:292,width:488,height:70,rx:12,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:894,y:336,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["다른 CPU 작업","Other CPU work"]);
    p.el('text',{x:48,y:506,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"GPU");
    p.el('text',{x:48,y:542,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["스트림 S","Stream S"]);
    p.el("rect",{x:376,y:474,width:404,height:86,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:578,y:526,fill:C.blue,"font-size":(locale==='ko'?29:27),"font-weight":600,"text-anchor":"middle"},["계산 A  ·  x → u","Compute A  ·  x → u"]);
    p.el("rect",{x:780,y:474,width:358,height:86,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:959,y:526,fill:C.teal,"font-size":(locale==='ko'?29:27),"font-weight":600,"text-anchor":"middle"},["계산 B  ·  u → y","Compute B  ·  u → y"]);
    p.el("path",{d:"M366,373 L376,464",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue),"stroke-dasharray":"7 7"});
    p.el("path",{d:"M536,373 L780,464",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal),"stroke-dasharray":"7 7"});
    p.el("path",{d:"M608,275 V490 M608,545 V585",fill:"none",stroke:C.orange,"stroke-width":2.5,"stroke-dasharray":"7 7"});
    p.el('text',{x:608,y:619,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["이 시점","At this instant"]);
    p.el("rect",{x:48,y:657,width:1104,height:114,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:702,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["CPU는 B까지 등록했지만, GPU는 아직 A를 실행 중입니다.","The CPU has submitted B, but the GPU is still executing A."]);
    p.el('text',{x:600,y:741,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["같은 스트림에서는 A가 끝난 뒤 B가 실행됩니다.","In the same stream, B executes after A finishes."]);
    return [p];
  },
} satisfies FigureSpec;
