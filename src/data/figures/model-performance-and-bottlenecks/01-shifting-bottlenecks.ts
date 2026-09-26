import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-performance-and-bottlenecks",figureId:"01-shifting-bottlenecks",number:"01-shifting-bottlenecks",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["최적화하면 다음 개선 대상이 보입니다","Optimization reveals the next target"],
  subtitle:["한 연산의 속도 개선을 전체 실행 시간의 변화로 연결합니다.","Connect a faster operation to the time saved across the whole run."],
  alt:["Attention, MLP, 나머지의 시간이 60·30·10ms에서 20·30·10ms, 20·15·10ms로 변한다. 전체 시간은 100, 60, 45ms이며 같은 시간 축을 사용한다. 측정, 개선, 재측정을 반복한다. 순차 실행을 가정한 설명용 수치다.","Attention, MLP, and other operations take 60/30/10, then 20/30/10, then 20/15/10 ms. Totals of 100, 60, and 45 ms use one time scale. Measure, improve, and measure again. Illustrative sequential execution."],
  caption:["연산 종류별로 시간을 모았고, 연산이 겹치지 않는 순차 실행을 가정한 설명용 수치입니다.","Times are grouped by operation type; values are illustrative and assume sequential execution without overlap."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,741,1104,[48,206]);
    p.el("rect",{x:48,y:198,width:22,height:22,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:82,y:216,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"start"},"Attention");
    p.el("rect",{x:258,y:198,width:22,height:22,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:292,y:216,fill:C.orange,"font-size":21,"font-weight":400,"text-anchor":"start"},"MLP");
    p.el("rect",{x:410,y:198,width:22,height:22,rx:4,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:444,y:216,fill:C.purple,"font-size":21,"font-weight":400,"text-anchor":"start"},["나머지","Other"]);
    p.el('text',{x:1152,y:216,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},["동일한 시간 축 · 단위: ms","Same time scale · Unit: ms"]);
    p.el("path",{d:"M282,280 V369 M282,446 V535 M282,612 V701",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:282,y:254,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("path",{d:"M422,280 V369 M422,446 V535 M422,612 V701",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:422,y:254,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"20");
    p.el("path",{d:"M562,280 V369 M562,446 V535 M562,612 V701",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:562,y:254,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"40");
    p.el("path",{d:"M702,280 V369 M702,446 V535 M702,612 V701",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:702,y:254,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"60");
    p.el("path",{d:"M842,280 V369 M842,446 V535 M842,612 V701",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:842,y:254,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"80");
    p.el("path",{d:"M982,280 V369 M982,446 V535 M982,612 V701",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:982,y:254,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"100");
    p.el('text',{x:48,y:317,fill:C.muted,"font-size":18,"font-weight":600,"text-anchor":"start"},"01");
    p.el('text',{x:48,y:353,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"start"},["처음 실행","Initial run"]);
    p.el("rect",{x:282,y:295,width:420,height:66,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:492,y:337,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"60");
    p.el("rect",{x:702,y:295,width:210,height:66,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:807,y:337,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"30");
    p.el("rect",{x:912,y:295,width:70,height:66,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:947,y:337,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},"10");
    p.el('text',{x:1004,y:337,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"100 ms");
    p.el('text',{x:282,y:399,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["Attention 비중이 가장 큼","Attention takes the most time"]);
    p.el('text',{x:48,y:483,fill:C.muted,"font-size":18,"font-weight":600,"text-anchor":"start"},"02");
    p.el('text',{x:48,y:519,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"start"},["Attention 개선","Optimize Attention"]);
    p.el("rect",{x:282,y:461,width:140,height:66,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:352,y:503,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"20");
    p.el("rect",{x:422,y:461,width:210,height:66,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:527,y:503,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"30");
    p.el("rect",{x:632,y:461,width:70,height:66,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:667,y:503,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},"10");
    p.el('text',{x:724,y:503,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"60 ms");
    p.el('text',{x:282,y:565,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["MLP가 다음 주요 개선 대상","MLP becomes the next main target"]);
    p.el('text',{x:48,y:649,fill:C.muted,"font-size":18,"font-weight":600,"text-anchor":"start"},"03");
    p.el('text',{x:48,y:685,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"start"},["MLP 개선","Optimize MLP"]);
    p.el("rect",{x:282,y:627,width:140,height:66,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:352,y:669,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"20");
    p.el("rect",{x:422,y:627,width:105,height:66,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:474.5,y:669,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"15");
    p.el("rect",{x:527,y:627,width:70,height:66,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:562,y:669,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},"10");
    p.el('text',{x:619,y:669,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"45 ms");
    p.el('text',{x:282,y:731,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["다시 전체 실행을 측정","Measure the whole run again"]);
    p.el("rect",{x:48,y:794,width:1104,height:145,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:837,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["측정 → 주요 병목 개선 → 다시 측정","Measure → Improve the main bottleneck → Measure again"]);
    p.el('text',{x:600,y:881,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["Attention은 3배 빨라져도, 전체 실행은 100 → 60 ms","Attention is 3× faster; the whole run goes from 100 to 60 ms"]);
    p.el('text',{x:600,y:915,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["목표는 전체 시간 단축이며, 병목은 개선 과정에서 달라질 수 있습니다.","The goal is a shorter whole run; the bottleneck can change along the way."]);
    return [p];
  },
} satisfies FigureSpec;
