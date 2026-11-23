import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-execution-and-warp-scheduling",figureId:"04-blocks-on-sms",number:"04-blocks-on-sms",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Block을 SM에 배정하고 자원을 사용합니다","Assign Blocks to SMs and Use Their Resources"],
  subtitle:["아직 배정되지 않은 작업과, SM에 상주하는 작업을 구분합니다.","Distinguish unassigned work from work resident on an SM."],
  alt:["Block ID 4부터 7은 SM 배정을 기다리고 있다. SM 1에는 block 0과 1, SM 2에는 block 2와 3가 상주한다. 각 block 안에서 스레드별 register 값과 block별 shared memory를 논리적으로 구분하고 SM 공통 L1 캐시를 표시한다. Register는 SM의 물리적 자원이며 스레드가 개별 값을 사용한다. Shared memory는 이를 사용하는 작업의 예시이고 벡터 덧셈에 반드시 필요하다는 뜻은 아니다. 이 배치와 block 수는 예시이며 실제 상주 수는 자원 사용량과 장치 한도에 따라 달라진다.","Blocks 4 through 7 wait for SM assignment. Blocks 0 and 1 reside on SM 1, while blocks 2 and 3 reside on SM 2. Per-thread register values and per-block shared memory are distinguished logically, with an L1 cache common to each SM. Registers are physical SM resources used for individual thread values. Shared memory illustrates work that uses it; it is not required for vector addition. The layout and block counts are examples. Actual residency depends on resource use and device limits."],
  caption:["배치와 block 수는 예시입니다. 실제로 상주하는 block 수는 자원 사용량과 장치 한도에 따라 달라집니다.","The placement and block counts are an example; how many blocks stay resident depends on resource use and device limits."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,910,1104,[48,206]);
    p.el("rect",{x:48,y:214,width:1104,height:119,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:74,y:255,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["SM 배정을 기다리는 block","Blocks awaiting SM assignment"]);
    p.el("rect",{x:491,y:241,width:142,height:61,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:562,y:279.5,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Block ID 4");
    p.el("rect",{x:650,y:241,width:142,height:61,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:721,y:279.5,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Block ID 5");
    p.el("rect",{x:809,y:241,width:142,height:61,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:880,y:279.5,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Block ID 6");
    p.el("rect",{x:968,y:241,width:142,height:61,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1039,y:279.5,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Block ID 7");
    p.el("path",{d:"M316,334 V427",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el("path",{d:"M884,334 V427",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el('text',{x:600,y:390,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},["SM에 자원이 확보되면 배정","Assign when SM resources are available"]);
    p.el("rect",{x:48,y:441,width:536,height:515,rx:12,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:72,y:486,fill:C.blue,"font-size":30,"font-weight":700,"text-anchor":"start"},"SM 1");
    p.el("rect",{x:72,y:510,width:232,height:338,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:188,y:548,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"Block ID 0");
    p.el('text',{x:188,y:593,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["스레드별 register","Per-thread registers"]);
    p.el("rect",{x:89,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:120,y:642,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:98,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:114,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:130,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:156,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:187,y:642,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:165,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:181,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:197,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:223,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:254,y:642,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:232,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:248,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:264,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:188,y:714,fill:C.blue,"font-size":(locale==='ko'?18:13),"font-weight":400,"text-anchor":"middle"},["각자의 값과 중간 결과","Own values and intermediate results"]);
    p.el("rect",{x:89,y:740,width:198,height:57,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:188,y:776.5,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"Shared memory");
    p.el('text',{x:188,y:828,fill:C.blue,"font-size":(locale==='ko'?20:18),"font-weight":400,"text-anchor":"middle"},["이 block 안에서 공유","Shared within this block"]);
    p.el("rect",{x:328,y:510,width:232,height:338,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:444,y:548,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"middle"},"Block ID 1");
    p.el('text',{x:444,y:593,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},["스레드별 register","Per-thread registers"]);
    p.el("rect",{x:345,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:376,y:642,fill:C.teal,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:354,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:370,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:386,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:412,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:443,y:642,fill:C.teal,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:421,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:437,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:453,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:479,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:510,y:642,fill:C.teal,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:488,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:504,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:520,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:444,y:714,fill:C.teal,"font-size":(locale==='ko'?18:13),"font-weight":400,"text-anchor":"middle"},["각자의 값과 중간 결과","Own values and intermediate results"]);
    p.el("rect",{x:345,y:740,width:198,height:57,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:444,y:776.5,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"Shared memory");
    p.el('text',{x:444,y:828,fill:C.teal,"font-size":(locale==='ko'?20:18),"font-weight":400,"text-anchor":"middle"},["이 block 안에서 공유","Shared within this block"]);
    p.el("rect",{x:72,y:877,width:488,height:53,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:911.5,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},["L1 캐시 · SM 안의 여러 block이 활용","L1 cache · used by blocks on the SM"]);
    p.el("rect",{x:616,y:441,width:536,height:515,rx:12,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:640,y:486,fill:C.blue,"font-size":30,"font-weight":700,"text-anchor":"start"},"SM 2");
    p.el("rect",{x:640,y:510,width:232,height:338,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:756,y:548,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"Block ID 2");
    p.el('text',{x:756,y:593,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["스레드별 register","Per-thread registers"]);
    p.el("rect",{x:657,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:688,y:642,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:666,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:682,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:698,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:724,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:755,y:642,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:733,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:749,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:765,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:791,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:822,y:642,fill:C.blue,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:800,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:816,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:832,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:756,y:714,fill:C.blue,"font-size":(locale==='ko'?18:13),"font-weight":400,"text-anchor":"middle"},["각자의 값과 중간 결과","Own values and intermediate results"]);
    p.el("rect",{x:657,y:740,width:198,height:57,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:756,y:776.5,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"Shared memory");
    p.el('text',{x:756,y:828,fill:C.blue,"font-size":(locale==='ko'?20:18),"font-weight":400,"text-anchor":"middle"},["이 block 안에서 공유","Shared within this block"]);
    p.el("rect",{x:896,y:510,width:232,height:338,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1012,y:548,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"middle"},"Block ID 3");
    p.el('text',{x:1012,y:593,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},["스레드별 register","Per-thread registers"]);
    p.el("rect",{x:913,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:944,y:642,fill:C.teal,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:922,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:938,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:954,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:980,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1011,y:642,fill:C.teal,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:989,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:1005,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:1021,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:1047,y:615,width:62,height:69,rx:6,fill:C.paper,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1078,y:642,fill:C.teal,"font-size":15,"font-weight":600,"text-anchor":"middle"},["스레드","thread"]);
    p.el("rect",{x:1056,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:1072,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:1088,y:657,width:11,height:14,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:1012,y:714,fill:C.teal,"font-size":(locale==='ko'?18:13),"font-weight":400,"text-anchor":"middle"},["각자의 값과 중간 결과","Own values and intermediate results"]);
    p.el("rect",{x:913,y:740,width:198,height:57,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1012,y:776.5,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"Shared memory");
    p.el('text',{x:1012,y:828,fill:C.teal,"font-size":(locale==='ko'?20:18),"font-weight":400,"text-anchor":"middle"},["이 block 안에서 공유","Shared within this block"]);
    p.el("rect",{x:640,y:877,width:488,height:53,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:911.5,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},["L1 캐시 · SM 안의 여러 block이 활용","L1 cache · used by blocks on the SM"]);
    p.el('text',{x:600,y:1010,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"middle"},["Block 하나는 SM 하나에서 실행됩니다.","One block executes on one SM."]);
    p.el('text',{x:600,y:1055,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["한 SM에는 자원이 허용하는 만큼 여러 block이 상주할 수 있습니다.","Multiple blocks can reside on an SM, as resources allow."]);
    p.el('text',{x:600,y:1101,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["상주: 작업이 SM에 배정되어 실행에 필요한 자원을 차지한 상태","Resident: assigned to an SM and occupying resources for execution"]);
    return [p];
  },
} satisfies FigureSpec;
