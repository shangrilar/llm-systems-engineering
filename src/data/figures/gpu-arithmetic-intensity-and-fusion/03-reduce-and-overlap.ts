import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-arithmetic-intensity-and-fusion",figureId:"03-reduce-and-overlap",number:"03-reduce-and-overlap",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["이동을 줄이거나, 대기 중에 다른 계산을 합니다","Move Less Data or Compute While Waiting"],
  subtitle:["데이터 이동량을 줄이는 것과 데이터 대기를 가리는 것은 다른 방법입니다.","Reducing data movement and hiding data waits are different approaches."],
  alt:["세 경우 모두 같은 A와 B 계산을 완료한다. B는 A의 새 입력과 독립적이며 입력이 이미 준비되어 있다고 가정한다. 기준은 A입력 준비4칸 뒤 A계산2칸과 B계산2칸이다. 이동 감소는 재사용이나 중간값 이동 생략으로 A입력 준비를2칸으로 줄이고 계산은 유지한다. 동시 진행은 A입력 준비4칸 동안 B계산2칸을 먼저 진행한 뒤 A입력이 준비되면 A계산을 한다. 계산 A는 자기 입력 준비가 끝난 뒤에만 시작한다. 시간선은 상대적인 실행 순서 설명이며 실제 속도 향상 측정이 아니다. 이전 워프 스케줄링 편과 연결되는 개념도이며 구체적인 비동기 복사 API를 뜻하지 않는다.","All three cases complete the same computations A and B. B is independent of the new inputs for A and already has its inputs. The baseline prepares inputs for A for four slots, then computes A for two and B for two. Reducing movement through reuse or omitting intermediate transfers shortens preparation to two slots with unchanged computation. Concurrent progress computes B for two slots during the four-slot preparation for A, then computes A after its inputs are ready. A always starts after its own inputs are ready. The timelines illustrate relative execution order, not measured speedups. They connect to the preceding warp-scheduling article and do not specify an asynchronous-copy API."],
  caption:["시간선은 상대적인 실행 순서이며, 실제 속도 향상을 측정한 결과가 아닙니다.","Timelines show relative execution order, not measured speedups."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,984,1104,[48,206]);
    p.el('text',{x:48,y:218,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["A의 입력을 준비하는 동안 실행할 수 있는 독립적인 계산 B가 있습니다.","Independent computation B can run while the inputs for A are being prepared."]);
    p.el("rect",{x:48,y:250,width:1104,height:234,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:75,y:292,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["기준 · 입력을 기다린 뒤 계산","Baseline · Wait for Inputs, Then Compute"]);
    p.el('text',{x:75,y:352,fill:C.blue,"font-size":(locale==='ko'?22:21),"font-weight":600,"text-anchor":"start"},["A의 입력 준비","Prepare A’s inputs"]);
    p.el('text',{x:75,y:414,fill:C.orange,"font-size":22,"font-weight":600,"text-anchor":"start"},["연산 장치","Compute units"]);
    p.el("rect",{x:276,y:315,width:376,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:464,y:347,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["데이터 이동","Data movement"]);
    p.el("rect",{x:276,y:380,width:376,height:48,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:464,y:412,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("rect",{x:652,y:380,width:188,height:48,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:746,y:412,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["A 계산","Compute A"]);
    p.el("rect",{x:840,y:380,width:188,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:934,y:412,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["B 계산","Compute B"]);
    p.el("path",{d:"M652,365 L652,375",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M1028,311 V437",fill:"none",stroke:C.muted,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:1028,y:468,fill:C.muted,"font-size":21,"font-weight":600,"text-anchor":"middle"},["전체 완료","All work done"]);
    p.el("rect",{x:48,y:510,width:1104,height:234,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:75,y:552,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["이동 감소 · 필요한 데이터 이동 자체를 줄임","Less Movement · Reduce the Required Data Transfers"]);
    p.el('text',{x:75,y:612,fill:C.blue,"font-size":(locale==='ko'?22:21),"font-weight":600,"text-anchor":"start"},["A의 입력 준비","Prepare A’s inputs"]);
    p.el('text',{x:75,y:674,fill:C.orange,"font-size":22,"font-weight":600,"text-anchor":"start"},["연산 장치","Compute units"]);
    p.el("rect",{x:276,y:575,width:188,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:607,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["데이터 이동","Data movement"]);
    p.el("rect",{x:276,y:640,width:188,height:48,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:672,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("rect",{x:464,y:640,width:188,height:48,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:558,y:672,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["A 계산","Compute A"]);
    p.el("rect",{x:652,y:640,width:188,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:746,y:672,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["B 계산","Compute B"]);
    p.el("path",{d:"M464,625 L464,635",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M840,571 V697",fill:"none",stroke:C.muted,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:840,y:728,fill:C.muted,"font-size":21,"font-weight":600,"text-anchor":"middle"},["전체 완료","All work done"]);
    p.el("rect",{x:48,y:770,width:1104,height:234,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:75,y:812,fill:C.ink,"font-size":(locale==='ko'?26:25),"font-weight":700,"text-anchor":"start"},["동시 진행 · 데이터 이동 중 독립적인 계산을 진행","Concurrent Progress · Compute Independently During Data Movement"]);
    p.el('text',{x:75,y:872,fill:C.blue,"font-size":(locale==='ko'?22:21),"font-weight":600,"text-anchor":"start"},["A의 입력 준비","Prepare A’s inputs"]);
    p.el('text',{x:75,y:934,fill:C.orange,"font-size":22,"font-weight":600,"text-anchor":"start"},["연산 장치","Compute units"]);
    p.el("rect",{x:276,y:835,width:376,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:464,y:867,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["데이터 이동","Data movement"]);
    p.el("rect",{x:464,y:900,width:188,height:48,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:558,y:932,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("rect",{x:276,y:900,width:188,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:932,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["B 계산","Compute B"]);
    p.el("rect",{x:652,y:900,width:188,height:48,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:746,y:932,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["A 계산","Compute A"]);
    p.el("path",{d:"M652,885 L652,895",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M840,831 V957",fill:"none",stroke:C.muted,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:840,y:988,fill:C.muted,"font-size":21,"font-weight":600,"text-anchor":"middle"},["전체 완료","All work done"]);
    p.el('text',{x:1030,y:872,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["이동 시간은 동일","Same transfer time"]);
    p.el("path",{d:"M278,1050 L1100,1050",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1110,y:1083,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간","Time"]);
    p.el('text',{x:600,y:1130,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"middle"},["세 경우 모두 A와 B의 계산량은 같습니다.","All three cases perform the same computation for A and B."]);
    p.el('text',{x:600,y:1174,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["옮길 데이터를 줄이거나, 데이터가 준비되는 동안 다른 계산을 진행합니다.","Move less data, or do other computation while the data is being prepared."]);
    return [p];
  },
} satisfies FigureSpec;
