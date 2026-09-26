import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"data-parallelism",figureId:"03-throughput",number:"03-throughput",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["실행 시간과 처리량을 구별하기","Distinguish execution time from throughput"],
  subtitle:["네 요청이 동시에 도착하고, 요청 간 간섭과 분산 비용은 생략한 일정입니다.","All four requests arrive together; interference and dispatch costs are omitted."],
  alt:["GPU 하나는 네 요청을 네 슬롯에 처리하고 두 GPU는 두 슬롯에 처리하지만 개별 요청의 실행은 한 슬롯입니다.","One GPU finishes in four slots; two GPUs finish in two, while each request executes for one slot."],
  caption:["칸은 설명용 시간 단위이며 실제 실행 시간이 아닙니다.","Slots are illustrative time units, not actual execution times."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,574,1104,[48,196]);
    p.el('text',{x:48,y:211,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["한 요청의 실행에 1칸이 걸린다고 가정","Assume each request takes one time slot"]);
    p.el("rect",{x:48,y:254,width:214.8,height:58,rx:10,fill:C.indigoFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:62,y:291,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["배치","Deployment"]);
    p.el("rect",{x:268.8,y:254,width:214.8,height:58,rx:10,fill:C.indigoFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:282.8,y:291,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["시간 1","Slot 1"]);
    p.el("rect",{x:489.6,y:254,width:214.8,height:58,rx:10,fill:C.indigoFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:503.6,y:291,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["시간 2","Slot 2"]);
    p.el("rect",{x:710.4000000000001,y:254,width:214.8,height:58,rx:10,fill:C.indigoFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:724.4000000000001,y:291,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["시간 3","Slot 3"]);
    p.el("rect",{x:931.2,y:254,width:214.8,height:58,rx:10,fill:C.indigoFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:945.2,y:291,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["시간 4","Slot 4"]);
    p.el("rect",{x:48,y:320,width:214.8,height:92,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:62,y:354,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"1 GPU");
    p.el("rect",{x:268.8,y:320,width:214.8,height:92,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:282.8,y:354,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"A");
    p.el("rect",{x:489.6,y:320,width:214.8,height:92,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:503.6,y:354,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"B");
    p.el("rect",{x:710.4000000000001,y:320,width:214.8,height:92,rx:10,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:724.4000000000001,y:354,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"C");
    p.el("rect",{x:931.2,y:320,width:214.8,height:92,rx:10,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:945.2,y:354,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"D");
    p.el("rect",{x:48,y:420,width:214.8,height:92,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:62,y:454,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"2 GPUs · GPU 0");
    p.el("rect",{x:268.8,y:420,width:214.8,height:92,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:282.8,y:454,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"A");
    p.el("rect",{x:489.6,y:420,width:214.8,height:92,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:503.6,y:454,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"C");
    p.el("rect",{x:710.4000000000001,y:420,width:214.8,height:92,rx:10,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:724.4000000000001,y:454,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"—");
    p.el("rect",{x:931.2,y:420,width:214.8,height:92,rx:10,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:945.2,y:454,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"—");
    p.el("rect",{x:48,y:520,width:214.8,height:92,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:62,y:554,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"2 GPUs · GPU 1");
    p.el("rect",{x:268.8,y:520,width:214.8,height:92,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:282.8,y:554,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"B");
    p.el("rect",{x:489.6,y:520,width:214.8,height:92,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:503.6,y:554,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"D");
    p.el("rect",{x:710.4000000000001,y:520,width:214.8,height:92,rx:10,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:724.4000000000001,y:554,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"—");
    p.el("rect",{x:931.2,y:520,width:214.8,height:92,rx:10,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:945.2,y:554,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"—");
    p.el("rect",{x:48,y:662,width:1104,height:100,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:698,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["전체 네 요청의 완료: 4칸 → 2칸","Completion of all four requests: 4 slots → 2 slots"]);
    p.el('text',{x:72,y:738,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["요청 하나의 실행은 여전히 1칸입니다. 대기 시간은 줄어들 수 있습니다.","Each request still executes for one slot; time spent in the queue can shrink."]);
    return [p];
  },
} satisfies FigureSpec;
