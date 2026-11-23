import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-metrics",figureId:"05-goodput-targets",number:"05-goodput-targets",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["지연 목표를 만족한 처리량 세기","Count throughput that meets latency targets"],
  subtitle:["Goodput을 계산하려면 먼저 통과 조건과 관측 시간을 정합니다.","Define the pass conditions and observation window before counting goodput."],
  alt:["10초간10개요청완료.8개는TTFT1초이하와TPOT50ms/token이하를함께만족.2개는하나의목표초과.처리량1request/s,goodput0.8requests/s,달성률80%.","Ten requests complete in ten seconds. Eight meet both TTFT ≤1s and TPOT ≤50ms/token; two miss one target. Throughput 1 request/s, goodput 0.8 requests/s, attainment 80%."],
  caption:["완료한 요청 중 지연 목표를 모두 충족한 요청만 세어 Goodput을 계산합니다.","Calculate goodput by counting only completed requests that meet every latency target."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,682,1104,[48,196]);
    p.el("rect",{x:48,y:194,width:1104,height:94,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:76,y:231,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},["통과 조건 · 각 요청이 두 목표를 모두 만족","Pass rule · Each request must meet both targets"]);
    p.el('text',{x:76,y:270,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"TTFT ≤ 1 s   AND   TPOT ≤ 50 ms/token");
    p.el('text',{x:48,y:340,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},["같은 10초 동안 성공 완료한 요청 10개","10 requests completed successfully within the same 10 seconds"]);
    p.el("rect",{x:48,y:380,width:208,height:86,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:66,y:413,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"A   ✓");
    p.el('text',{x:66,y:445,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["목표 모두 충족","Both targets met"]);
    p.el("rect",{x:272,y:380,width:208,height:86,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:290,y:413,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"B   ✓");
    p.el('text',{x:290,y:445,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["목표 모두 충족","Both targets met"]);
    p.el("rect",{x:496,y:380,width:208,height:86,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:514,y:413,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"C   ✓");
    p.el('text',{x:514,y:445,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["목표 모두 충족","Both targets met"]);
    p.el("rect",{x:720,y:380,width:208,height:86,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:738,y:413,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"D   ✓");
    p.el('text',{x:738,y:445,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["목표 모두 충족","Both targets met"]);
    p.el("rect",{x:944,y:380,width:208,height:86,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:962,y:413,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"E   ✓");
    p.el('text',{x:962,y:445,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["목표 모두 충족","Both targets met"]);
    p.el("rect",{x:48,y:492,width:208,height:86,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:66,y:525,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"F   ✓");
    p.el('text',{x:66,y:557,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["목표 모두 충족","Both targets met"]);
    p.el("rect",{x:272,y:492,width:208,height:86,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:290,y:525,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"G   ✓");
    p.el('text',{x:290,y:557,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["목표 모두 충족","Both targets met"]);
    p.el("rect",{x:496,y:492,width:208,height:86,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:514,y:525,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"H   ✓");
    p.el('text',{x:514,y:557,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["목표 모두 충족","Both targets met"]);
    p.el("rect",{x:720,y:492,width:208,height:86,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:738,y:525,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"I   ×");
    p.el('text',{x:738,y:557,fill:C.orange,"font-size":21,"font-weight":400,"text-anchor":"start"},["TTFT 초과","TTFT exceeded"]);
    p.el("rect",{x:944,y:492,width:208,height:86,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:962,y:525,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"J   ×");
    p.el('text',{x:962,y:557,fill:C.orange,"font-size":21,"font-weight":400,"text-anchor":"start"},["TPOT 초과","TPOT exceeded"]);
    p.el("rect",{x:48,y:635,width:525,height:110,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:68,y:669,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"start"},["전체 요청 처리량","Total request throughput"]);
    p.el('text',{x:68,y:715,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"10 / 10 = 1 request/s");
    p.el("rect",{x:605,y:635,width:547,height:110,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:625,y:669,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"start"},["목표 충족 요청 처리량 · Goodput","Request goodput"]);
    p.el('text',{x:625,y:715,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"8 / 10 = 0.8 requests/s");
    p.el('text',{x:48,y:800,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["목표 달성률은 8 / 10 = 80% · Goodput의 단위는 요청/초","Target attainment is 8 / 10 = 80% · Goodput is measured in requests/s"]);
    p.el('text',{x:48,y:862,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["완료한 양과 지연 목표를 지키며 완료한 양을 함께 봅니다.","Consider both total completions and completions within latency targets."]);
    return [p];
  },
} satisfies FigureSpec;
