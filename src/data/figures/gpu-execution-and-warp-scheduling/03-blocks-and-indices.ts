import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-execution-and-warp-scheduling",figureId:"03-blocks-and-indices",number:"03-blocks-and-indices",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["Block과 스레드의 ID로 담당 위치를 정합니다","Find Data Positions with Block and Thread IDs"],
  subtitle:["출력 1,024개를 스레드 128개씩 묶어, block 8개로 처리합니다.","Process 1,024 outputs using 8 blocks of 128 threads each."],
  alt:["출력 1024개에 스레드 하나씩을 배정하고 128개씩 묶어 grid 안에 block 8개를 구성한다. Block ID 0의 스레드 ID 0,1,127은 i=0,1,127을, block ID 1의 같은 스레드 ID는 i=128,129,255를 담당한다. i=block ID×128+block 안의 스레드 ID라는 대응을 보여준다. Block 1의 스레드 0은 A[128]과 B[128]을 더해 C[128]에 저장한다. 나머지 block ID 2~7도 각각 스레드 128개이다.","Assign one thread to each of 1,024 outputs and group 128 threads per block, forming eight blocks in a grid. Thread IDs 0, 1, and 127 in block 0 handle i=0, 1, and 127; the same thread IDs in block 1 handle i=128, 129, and 255. The mapping is i=block ID times 128 plus thread ID within the block. Thread 0 in block 1 adds A[128] and B[128] and stores the result in C[128]. Blocks 2 through 7 also contain 128 threads each."],
  caption:["각 스레드는 block의 시작 위치에 block 안의 스레드 ID를 더해 담당 위치를 구합니다.","Each thread finds its position by adding its thread ID within the block to the block’s starting position."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1022,1104,[48,206]);
    p.el("rect",{x:48,y:211,width:1104,height:565,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:255,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["Grid · 한 번의 커널 실행에 속한 block 전체","Grid · all blocks in one kernel execution"]);
    p.el("rect",{x:72,y:283,width:516,height:261,rx:12,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:330,y:326,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"middle"},["Block ID 0 · 스레드 128개","Block ID 0 · 128 threads"]);
    p.el('text',{x:330,y:369,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["Block 안에서의 스레드 ID","Thread ID within the block"]);
    p.el("rect",{x:96,y:394,width:120,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:156,y:428,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("path",{d:"M156,454 L156,476",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:156,y:510,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"i = 0");
    p.el("rect",{x:270,y:394,width:120,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:330,y:428,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("path",{d:"M330,454 L330,476",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:330,y:510,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"i = 1");
    p.el("rect",{x:444,y:394,width:120,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:504,y:428,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"127");
    p.el("path",{d:"M504,454 L504,476",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:504,y:510,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"i = 127");
    p.el('text',{x:405,y:433,fill:C.muted,"font-size":26,"font-weight":400,"text-anchor":"middle"},"⋯");
    p.el('text',{x:330,y:582,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["담당 위치 0~127","Assigned positions 0–127"]);
    p.el("rect",{x:612,y:283,width:516,height:261,rx:12,fill:C.paper,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:870,y:326,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"middle"},["Block ID 1 · 스레드 128개","Block ID 1 · 128 threads"]);
    p.el('text',{x:870,y:369,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["Block 안에서의 스레드 ID","Thread ID within the block"]);
    p.el("rect",{x:636,y:394,width:120,height:52,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:696,y:428,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("path",{d:"M696,454 L696,476",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:696,y:510,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"i = 128");
    p.el("rect",{x:810,y:394,width:120,height:52,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:870,y:428,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("path",{d:"M870,454 L870,476",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:870,y:510,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"i = 129");
    p.el("rect",{x:984,y:394,width:120,height:52,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1044,y:428,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"127");
    p.el("path",{d:"M1044,454 L1044,476",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:1044,y:510,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"i = 255");
    p.el('text',{x:945,y:433,fill:C.muted,"font-size":26,"font-weight":400,"text-anchor":"middle"},"⋯");
    p.el('text',{x:870,y:582,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},["담당 위치 128~255","Assigned positions 128–255"]);
    p.el("rect",{x:68,y:615,width:164,height:108,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:150,y:655,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Block ID 2");
    p.el('text',{x:150,y:696,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["스레드 128개","128 threads"]);
    p.el("rect",{x:248,y:615,width:164,height:108,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:330,y:655,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Block ID 3");
    p.el('text',{x:330,y:696,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["스레드 128개","128 threads"]);
    p.el("rect",{x:428,y:615,width:164,height:108,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:510,y:655,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Block ID 4");
    p.el('text',{x:510,y:696,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["스레드 128개","128 threads"]);
    p.el("rect",{x:608,y:615,width:164,height:108,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:690,y:655,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Block ID 5");
    p.el('text',{x:690,y:696,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["스레드 128개","128 threads"]);
    p.el("rect",{x:788,y:615,width:164,height:108,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:870,y:655,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Block ID 6");
    p.el('text',{x:870,y:696,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["스레드 128개","128 threads"]);
    p.el("rect",{x:968,y:615,width:164,height:108,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1050,y:655,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Block ID 7");
    p.el('text',{x:1050,y:696,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["스레드 128개","128 threads"]);
    p.el('text',{x:600,y:753,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["개발자가 정한 묶음 크기: block당 스레드 128개 · 총 block 8개","Developer-chosen group size: 128 threads per block · 8 blocks total"]);
    p.el('text',{x:600,y:825,fill:C.ink,"font-size":(locale==='ko'?29:28),"font-weight":700,"text-anchor":"middle"},["담당 위치 i = block ID × 128 + block 안의 스레드 ID","Assigned position i = block ID × 128 + thread ID within the block"]);
    p.el("rect",{x:48,y:865,width:258,height:177,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:177,y:905,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Block ID 0");
    p.el('text',{x:177,y:946,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["스레드 ID 0","Thread ID 0"]);
    p.el('text',{x:177,y:1003,fill:C.blue,"font-size":31,"font-weight":700,"text-anchor":"middle"},"i = 0");
    p.el("rect",{x:330,y:865,width:258,height:177,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:459,y:905,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Block ID 0");
    p.el('text',{x:459,y:946,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["스레드 ID 1","Thread ID 1"]);
    p.el('text',{x:459,y:1003,fill:C.blue,"font-size":31,"font-weight":700,"text-anchor":"middle"},"i = 1");
    p.el("rect",{x:612,y:865,width:258,height:177,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:741,y:905,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Block ID 1");
    p.el('text',{x:741,y:946,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["스레드 ID 0","Thread ID 0"]);
    p.el('text',{x:741,y:1003,fill:C.teal,"font-size":31,"font-weight":700,"text-anchor":"middle"},"i = 128");
    p.el("rect",{x:894,y:865,width:258,height:177,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1023,y:905,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Block ID 1");
    p.el('text',{x:1023,y:946,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["스레드 ID 1","Thread ID 1"]);
    p.el('text',{x:1023,y:1003,fill:C.teal,"font-size":31,"font-weight":700,"text-anchor":"middle"},"i = 129");
    p.el("path",{d:"M741,1055 L741,1101",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:48,y:1117,width:1104,height:103,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1155,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},["Block ID 1 · 스레드 ID 0이 수행할 계산","The computation performed by block 1, thread 0"]);
    p.el('text',{x:600,y:1198,fill:C.teal,"font-size":31,"font-weight":700,"text-anchor":"middle"},"A[128] + B[128] → C[128]");
    return [p];
  },
} satisfies FigureSpec;
