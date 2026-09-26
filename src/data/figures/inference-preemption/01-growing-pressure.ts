import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-preemption",figureId:"01-growing-pressure",number:"01-growing-pressure",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["생성 중 부족해지는 KV 공간","Running out of KV space during generation"],
  subtitle:["남은 칸까지 채운 뒤에는, 다음 입력을 처리할 새 블록이 필요합니다.","Once the remaining positions fill, the next input requires another block."],
  alt:["네 블록에 A와 B의 KV가 각각 7칸씩 들어 있다. 각 마지막 블록의 한 칸을 채워 8칸이 되면 모든 칸이 찬다. 다음 위치 8의 KV를 쓰려면 새 블록이 필요하지만 가용 블록은 없다.","A and B each hold seven KV positions in a four-block pool. Each fills its final empty slot, reaching eight positions. Processing position eight then requires a new block, but none is free."],
  caption:["기존 블록의 남은 칸까지 채우면, 다음 입력을 처리할 새 블록이 필요합니다.","Once the remaining slots in existing blocks are filled, the next input needs a new block."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,834,1104,[48,196]);
    p.el('text',{x:48,y:205,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["KV 풀 4블록 · 블록당 4칸 · 공유 없음","KV pool: 4 blocks · 4 positions per block · No sharing"]);
    p.el('text',{x:48,y:265,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["1. 마지막 블록에 한 칸씩 남아 있음","1. One position remains in each tail block"]);
    p.el("rect",{x:48,y:294,width:260,height:112,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:60,y:324,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"start"},"P0 · A");
    p.el("rect",{x:60,y:340,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:88,y:371,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("rect",{x:120,y:340,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:148,y:371,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:180,y:340,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:208,y:371,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"2");
    p.el("rect",{x:240,y:340,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:268,y:371,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"3");
    p.el("rect",{x:328,y:294,width:260,height:112,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:340,y:324,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"start"},"P1 · A");
    p.el("rect",{x:340,y:340,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:368,y:371,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"4");
    p.el("rect",{x:400,y:340,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:428,y:371,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"5");
    p.el("rect",{x:460,y:340,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:488,y:371,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"6");
    p.el("rect",{x:520,y:340,width:56,height:48,rx:5,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:608,y:294,width:260,height:112,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:620,y:324,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"start"},"P2 · B");
    p.el("rect",{x:620,y:340,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:648,y:371,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("rect",{x:680,y:340,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:708,y:371,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:740,y:340,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:768,y:371,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"2");
    p.el("rect",{x:800,y:340,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:828,y:371,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"3");
    p.el("rect",{x:888,y:294,width:260,height:112,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:900,y:324,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"start"},"P3 · B");
    p.el("rect",{x:900,y:340,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:928,y:371,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"4");
    p.el("rect",{x:960,y:340,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:988,y:371,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"5");
    p.el("rect",{x:1020,y:340,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1048,y:371,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"6");
    p.el("rect",{x:1080,y:340,width:56,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:312,y:448,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["A · KV 7칸","A · 7 KV positions"]);
    p.el('text',{x:872,y:448,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["B · KV 7칸","B · 7 KV positions"]);
    p.el("path",{d:"M600,470 L600.0,515.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M600,525 L595.5,515.0 L604.5,515.0 Z",fill:C.muted});
    p.el('text',{x:635,y:508,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["각 요청의 다음 입력 처리","Process each request’s next input"]);
    p.el('text',{x:48,y:575,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["2. 새 KV를 쓰면 기존 블록이 모두 참","2. The new KV fills both tail blocks"]);
    p.el("rect",{x:48,y:604,width:260,height:112,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:60,y:634,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"start"},"P0 · A");
    p.el("rect",{x:60,y:650,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:88,y:681,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("rect",{x:120,y:650,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:148,y:681,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:180,y:650,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:208,y:681,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"2");
    p.el("rect",{x:240,y:650,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:268,y:681,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"3");
    p.el("rect",{x:328,y:604,width:260,height:112,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:340,y:634,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"start"},"P1 · A");
    p.el("rect",{x:340,y:650,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:368,y:681,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"4");
    p.el("rect",{x:400,y:650,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:428,y:681,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"5");
    p.el("rect",{x:460,y:650,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:488,y:681,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"6");
    p.el("rect",{x:520,y:650,width:56,height:48,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:548,y:681,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"7");
    p.el("rect",{x:608,y:604,width:260,height:112,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:620,y:634,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"start"},"P2 · B");
    p.el("rect",{x:620,y:650,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:648,y:681,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("rect",{x:680,y:650,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:708,y:681,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:740,y:650,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:768,y:681,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"2");
    p.el("rect",{x:800,y:650,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:828,y:681,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"3");
    p.el("rect",{x:888,y:604,width:260,height:112,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:900,y:634,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"start"},"P3 · B");
    p.el("rect",{x:900,y:650,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:928,y:681,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"4");
    p.el("rect",{x:960,y:650,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:988,y:681,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"5");
    p.el("rect",{x:1020,y:650,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1048,y:681,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"6");
    p.el("rect",{x:1080,y:650,width:56,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1108,y:681,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"7");
    p.el('text',{x:312,y:758,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["A · KV 8칸","A · 8 KV positions"]);
    p.el('text',{x:872,y:758,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["B · KV 8칸","B · 8 KV positions"]);
    p.el('text',{x:48,y:828,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["3. 그다음 입력에는 새 블록이 필요","3. The next input needs a new block"]);
    p.el("rect",{x:48,y:858,width:222,height:98,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:159,y:895,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"middle"},["A의 다음 입력","A’s next input"]);
    p.el('text',{x:159,y:931,fill:C.blue,"font-size":24,"font-weight":400,"text-anchor":"middle"},["위치 8","Position 8"]);
    p.el("path",{d:"M284,907 L325.0,907.0",stroke:C.blue,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M335,907 L325.0,911.5 L325.0,902.5 Z",fill:C.blue});
    p.el("rect",{x:352,y:858,width:264,height:98,rx:10,fill:"white",stroke:C.orange,"stroke-width":2,"stroke-dasharray":"7 5"});
    p.el("rect",{x:364,y:883,width:56,height:48,rx:5,fill:"white",stroke:C.orange,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:424,y:883,width:56,height:48,rx:5,fill:"white",stroke:C.orange,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:484,y:883,width:56,height:48,rx:5,fill:"white",stroke:C.orange,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:544,y:883,width:56,height:48,rx:5,fill:"white",stroke:C.orange,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el('text',{x:653,y:895,fill:C.orange,"font-size":27,"font-weight":700,"text-anchor":"start"},["빈 블록 0개","0 free blocks"]);
    p.el('text',{x:653,y:934,fill:C.orange,"font-size":24,"font-weight":400,"text-anchor":"start"},["새 블록을 배정할 수 없음","No block available to allocate"]);
    p.el('text',{x:48,y:1015,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["숫자 = 요청 안의 KV 위치 · 기존 블록의 빈칸과 가용 블록은 다릅니다.","Numbers = KV positions within each request · An empty slot is not a free block."]);
    return [p];
  },
} satisfies FigureSpec;
