import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-metrics",figureId:"04-request-latency-distribution",number:"04-request-latency-distribution",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["일부 요청이 더 오래 기다립니다","Some requests wait much longer"],
  subtitle:["백분위수는 정렬한 지연 값에서 어느 위치를 보는지 나타냅니다.","A percentile identifies a position among sorted latency values."],
  alt:["정렬한20개요청의TTFT막대.10번째190ms가p50,19번째600ms가p95,20번째1000ms.순위올림방식을사용한예시.","Sorted TTFT bars for 20 requests. The 10th is 190ms (p50), the 19th 600ms (p95), and the 20th 1000ms, using nearest-rank percentiles."],
  caption:["요청별 지연을 정렬하면 대부분의 요청과 오래 기다린 요청을 구별할 수 있습니다.","Sorting request latencies distinguishes the majority of requests from those that waited longer."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,749,1104,[48,196]);
    p.el('text',{x:48,y:205,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["20개 요청의 TTFT · 짧은 순서로 정렬","TTFT for 20 requests · Sorted from shortest to longest"]);
    p.el("path",{d:"M100,650.0 L1130,650.0",stroke:C.line,"stroke-width":2,fill:"none"});
    p.el('text',{x:83,y:657,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},"0");
    p.el("path",{d:"M100,470.0 L1130,470.0",stroke:C.line,"stroke-width":2,fill:"none"});
    p.el('text',{x:83,y:477,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},"500");
    p.el("path",{d:"M100,290.0 L1130,290.0",stroke:C.line,"stroke-width":2,fill:"none"});
    p.el('text',{x:83,y:297,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},"1000");
    p.el('text',{x:48,y:253,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},"ms");
    p.el("rect",{x:120,y:614,width:32,height:36,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:136,y:681,fill:C.blue,"font-size":21,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:169,y:610.4,width:32,height:39.6,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:218,y:606.8,width:32,height:43.199999999999996,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:267,y:603.2,width:32,height:46.8,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:316,y:599.6,width:32,height:50.4,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:365,y:596,width:32,height:54,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:414,y:592.4,width:32,height:57.599999999999994,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:463,y:588.8,width:32,height:61.199999999999996,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:512,y:585.2,width:32,height:64.8,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:561,y:581.6,width:32,height:68.39999999999999,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:577,y:681,fill:C.blue,"font-size":21,"font-weight":700,"text-anchor":"middle"},"10");
    p.el('text',{x:577,y:566.6,fill:C.blue,"font-size":21,"font-weight":700,"text-anchor":"middle"},"190");
    p.el("rect",{x:610,y:578,width:32,height:72,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:659,y:574.4,width:32,height:75.6,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:708,y:570.8,width:32,height:79.2,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:757,y:567.2,width:32,height:82.8,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:806,y:563.6,width:32,height:86.39999999999999,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:855,y:560,width:32,height:90,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:904,y:556.4,width:32,height:93.6,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:953,y:552.8,width:32,height:97.2,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:1002,y:434,width:32,height:216,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:1018,y:681,fill:C.purple,"font-size":21,"font-weight":700,"text-anchor":"middle"},"19");
    p.el('text',{x:1018,y:419,fill:C.purple,"font-size":21,"font-weight":700,"text-anchor":"middle"},"600");
    p.el("rect",{x:1051,y:290,width:32,height:360,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1067,y:681,fill:C.orange,"font-size":21,"font-weight":700,"text-anchor":"middle"},"20");
    p.el('text',{x:1067,y:275,fill:C.orange,"font-size":21,"font-weight":700,"text-anchor":"middle"},"1000");
    p.el('text',{x:630,y:727,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["정렬한 요청의 순서 →","Rank of each sorted request →"]);
    p.el("rect",{x:48,y:770,width:525,height:110,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:68,y:804,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"start"},["p50 · 20개 중 10번째","p50 · 10th of 20 requests"]);
    p.el('text',{x:68,y:850,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"190 ms");
    p.el("rect",{x:605,y:770,width:547,height:110,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:625,y:804,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"start"},["p95 · 20개 중 19번째","p95 · 19th of 20 requests"]);
    p.el('text',{x:625,y:850,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"600 ms");
    p.el('text',{x:48,y:930,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["이 예시는 순위 = 올림(p × 20) 규칙입니다. 각 막대는 한 요청의 TTFT입니다.","Here, rank = ceil(p × 20). Each bar is one request’s TTFT."]);
    return [p];
  },
} satisfies FigureSpec;
