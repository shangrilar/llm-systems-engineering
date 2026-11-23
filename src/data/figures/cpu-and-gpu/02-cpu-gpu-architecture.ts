import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"cpu-and-gpu",figureId:"02-cpu-gpu-architecture",number:"02-cpu-gpu-architecture",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["CPU와 GPU는 자원을 다르게 구성합니다","CPU and GPU designs prioritize different work"],
  subtitle:["제어·연산·메모리를 배치하는 설계 방향을 비교합니다.","Compare how control, compute, and memory are organized."],
  alt:["CPU는 두 코어 내부에 제어, 연산, 캐시를 표시하고 GPU는 제어와 가까운 메모리를 갖는 여러 연산 묶음을 표시한다. 물리적 수량 비교가 아닌 개념도다.","CPU cores contain control, compute and cache. GPU groups contain many compute units, control and local storage. This is a conceptual comparison."],
  caption:["개념도 · 실제 개수·면적·성능 비율이 아닙니다. CPU 코어와 GPU 연산 유닛은 같은 단위가 아닙니다.","Conceptual only: not actual counts, areas, or performance ratios. CPU cores ≠ GPU compute units."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,712,1104,[48,206]);
    p.el("rect",{x:48,y:204,width:528,height:590,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:254,fill:C.ink,"font-size":36,"font-weight":700,"text-anchor":"middle"},"CPU");
    p.el('text',{x:312,y:294,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["복잡한 작업의 지연을 줄이는 데 초점","Focus on latency for complex tasks"]);
    p.el("rect",{x:624,y:204,width:528,height:590,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:254,fill:C.ink,"font-size":36,"font-weight":700,"text-anchor":"middle"},"GPU");
    p.el('text',{x:888,y:294,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["많은 계산의 전체 처리량에 초점","Focus on throughput across many tasks"]);
    p.el("rect",{x:76,y:334,width:220,height:270,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:186,y:373,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},["CPU 코어","CPU core"]);
    p.el("rect",{x:92,y:395,width:188,height:67,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:186,y:436.5,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"middle"},["제어","Control"]);
    p.el("rect",{x:92,y:478,width:188,height:53,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:186,y:512.5,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["연산","Compute"]);
    p.el("rect",{x:92,y:545,width:188,height:42,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:186,y:574,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["캐시","Cache"]);
    p.el("rect",{x:316,y:334,width:220,height:270,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:426,y:373,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},["CPU 코어","CPU core"]);
    p.el("rect",{x:332,y:395,width:188,height:67,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:426,y:436.5,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"middle"},["제어","Control"]);
    p.el("rect",{x:332,y:478,width:188,height:53,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:426,y:512.5,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["연산","Compute"]);
    p.el("rect",{x:332,y:545,width:188,height:42,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:426,y:574,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["캐시","Cache"]);
    p.el("rect",{x:76,y:628,width:460,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:306,y:669,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["공유 캐시","Shared cache"]);
    p.el('text',{x:312,y:752,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["각 코어도 병렬 연산을 수행합니다.","Each core also performs parallel work."]);
    p.el("rect",{x:648,y:334,width:152,height:138,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:656,y:342,width:136,height:28,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:724,y:364,fill:C.muted,"font-size":16,"font-weight":600,"text-anchor":"middle"},["제어","Control"]);
    p.el("rect",{x:657,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:691,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:725,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:759,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:657,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:691,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:725,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:759,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:656,y:440,width:136,height:24,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:724,y:460,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["가까운 메모리","Local storage"]);
    p.el("rect",{x:812,y:334,width:152,height:138,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:820,y:342,width:136,height:28,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:364,fill:C.muted,"font-size":16,"font-weight":600,"text-anchor":"middle"},["제어","Control"]);
    p.el("rect",{x:821,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:855,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:889,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:923,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:821,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:855,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:889,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:923,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:820,y:440,width:136,height:24,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:460,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["가까운 메모리","Local storage"]);
    p.el("rect",{x:976,y:334,width:152,height:138,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:984,y:342,width:136,height:28,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1052,y:364,fill:C.muted,"font-size":16,"font-weight":600,"text-anchor":"middle"},["제어","Control"]);
    p.el("rect",{x:985,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1019,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1053,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1087,y:380,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:985,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1019,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1053,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1087,y:408,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:984,y:440,width:136,height:24,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1052,y:460,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["가까운 메모리","Local storage"]);
    p.el("rect",{x:648,y:486,width:152,height:138,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:656,y:494,width:136,height:28,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:724,y:516,fill:C.muted,"font-size":16,"font-weight":600,"text-anchor":"middle"},["제어","Control"]);
    p.el("rect",{x:657,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:691,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:725,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:759,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:657,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:691,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:725,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:759,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:656,y:592,width:136,height:24,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:724,y:612,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["가까운 메모리","Local storage"]);
    p.el("rect",{x:812,y:486,width:152,height:138,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:820,y:494,width:136,height:28,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:516,fill:C.muted,"font-size":16,"font-weight":600,"text-anchor":"middle"},["제어","Control"]);
    p.el("rect",{x:821,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:855,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:889,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:923,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:821,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:855,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:889,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:923,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:820,y:592,width:136,height:24,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:612,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["가까운 메모리","Local storage"]);
    p.el("rect",{x:976,y:486,width:152,height:138,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:984,y:494,width:136,height:28,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1052,y:516,fill:C.muted,"font-size":16,"font-weight":600,"text-anchor":"middle"},["제어","Control"]);
    p.el("rect",{x:985,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1019,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1053,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1087,y:532,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:985,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1019,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1053,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:1087,y:560,width:30,height:22,rx:3,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1.5});
    p.el("rect",{x:984,y:592,width:136,height:24,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1052,y:612,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["가까운 메모리","Local storage"]);
    p.el("rect",{x:648,y:658,width:480,height:42,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:687,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["공유 캐시","Shared cache"]);
    p.el('text',{x:888,y:752,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["연산 장치를 포함한 묶음이 반복됩니다.","Groups of compute units repeat."]);
    p.el("rect",{x:48,y:822,width:1104,height:88,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:858,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["GPU는 많은 연산 장치에 작업을 나누어 처리합니다.","A GPU distributes work across many compute units."]);
    p.el('text',{x:600,y:891,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["독립적인 계산이 충분할 때 이 구조를 활용할 수 있습니다.","This design benefits from enough independent work."]);
    return [p];
  },
} satisfies FigureSpec;
