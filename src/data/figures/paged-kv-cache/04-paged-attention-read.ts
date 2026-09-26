import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"paged-kv-cache",figureId:"04-paged-attention-read",number:"04-paged-attention-read",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["흩어진 KV로 Attention 계산하기","Compute attention over scattered KV"],
  subtitle:["블록 테이블로 저장 위치를 찾고, 현재 Q와 같은 요청의 KV를 함께 사용합니다.","The block table locates storage; the current Q uses the KV of its own request."],
  alt:["B의 블록 테이블은 L0를 P3, L1을 P0, L2를 P5에 연결합니다. 현재 입력 위치 8의 Q는 P3의 4개, P0의 4개, P5의 1개 KV로 하나의 Attention 결과를 계산합니다. C의 KV, 빈 P2, P5의 미사용 칸은 제외합니다.","B maps L0 to P3, L1 to P0 and L2 to P5. Q at input position 8 uses 4 KV positions in P3, 4 in P0 and 1 in P5 to compute one attention result. C’s KV, free P2 and unused P5 slots are excluded."],
  caption:["현재 Q는 같은 요청의 유효한 KV 9개를 사용하며, 다른 요청과 미사용 칸은 제외합니다.","The current Q uses the same request's 9 valid KV positions, excluding other requests and unused slots."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,813,1104,[48,196]);
    p.el("rect",{x:48,y:203,width:1104,height:116,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:72,y:242,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},["B의 블록 테이블","B’s block table"]);
    p.el('text',{x:72,y:286,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"start"},"L0 → P3  ·  L1 → P0  ·  L2 → P5");
    p.el('text',{x:48,y:368,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["물리 블록 풀에서 B의 유효한 KV 9개를 참조","Read B’s 9 valid KV positions in the physical pool"]);
    p.el('text',{x:48,y:409,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["색이 있는 칸 = 읽는 KV · 회색 = 읽지 않는 공간","Colored cells = KV being read · gray = not read"]);
    p.el('text',{x:48,y:465,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"start"},"P0 · B");
    p.el("rect",{x:48,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:65,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"4");
    p.el("rect",{x:86,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:103,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"5");
    p.el("rect",{x:124,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:141,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"6");
    p.el("rect",{x:162,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:179,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"7");
    p.el('text',{x:232,y:465,fill:C.slate,"font-size":24,"font-weight":700,"text-anchor":"start"},"P1 · C");
    p.el("rect",{x:232,y:489,width:34,height:52,rx:5,fill:C.grayFill,stroke:"#B7C0C8","stroke-width":1.5});
    p.el('text',{x:249,y:522,fill:"#B7C0C8","font-size":22,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("path",{d:"M237,536 L261,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:270,y:489,width:34,height:52,rx:5,fill:C.grayFill,stroke:"#B7C0C8","stroke-width":1.5});
    p.el('text',{x:287,y:522,fill:"#B7C0C8","font-size":22,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("path",{d:"M275,536 L299,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:308,y:489,width:34,height:52,rx:5,fill:C.grayFill,stroke:"#B7C0C8","stroke-width":1.5});
    p.el('text',{x:325,y:522,fill:"#B7C0C8","font-size":22,"font-weight":700,"text-anchor":"middle"},"2");
    p.el("path",{d:"M313,536 L337,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:346,y:489,width:34,height:52,rx:5,fill:C.grayFill,stroke:"#B7C0C8","stroke-width":1.5});
    p.el('text',{x:363,y:522,fill:"#B7C0C8","font-size":22,"font-weight":700,"text-anchor":"middle"},"3");
    p.el("path",{d:"M351,536 L375,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el('text',{x:416,y:465,fill:C.slate,"font-size":24,"font-weight":700,"text-anchor":"start"},"P2");
    p.el("rect",{x:416,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M421,536 L445,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:454,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M459,536 L483,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:492,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M497,536 L521,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:530,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M535,536 L559,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el('text',{x:600,y:465,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"start"},"P3 · B");
    p.el("rect",{x:600,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:617,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("rect",{x:638,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:655,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:676,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:693,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"2");
    p.el("rect",{x:714,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:731,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"3");
    p.el('text',{x:784,y:465,fill:C.slate,"font-size":24,"font-weight":700,"text-anchor":"start"},"P4 · C");
    p.el("rect",{x:784,y:489,width:34,height:52,rx:5,fill:C.grayFill,stroke:"#B7C0C8","stroke-width":1.5});
    p.el('text',{x:801,y:522,fill:"#B7C0C8","font-size":22,"font-weight":700,"text-anchor":"middle"},"4");
    p.el("path",{d:"M789,536 L813,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:822,y:489,width:34,height:52,rx:5,fill:C.grayFill,stroke:"#B7C0C8","stroke-width":1.5});
    p.el('text',{x:839,y:522,fill:"#B7C0C8","font-size":22,"font-weight":700,"text-anchor":"middle"},"5");
    p.el("path",{d:"M827,536 L851,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:860,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M865,536 L889,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:898,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M903,536 L927,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el('text',{x:968,y:465,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"start"},"P5 · B");
    p.el("rect",{x:968,y:489,width:34,height:52,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:985,y:522,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"8");
    p.el("rect",{x:1006,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M1011,536 L1035,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:1044,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M1049,536 L1073,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("rect",{x:1082,y:489,width:34,height:52,rx:5,fill:"white",stroke:"#B7C0C8","stroke-width":1.5});
    p.el("path",{d:"M1087,536 L1111,494",stroke:"#A9B3BC","stroke-width":1.4});
    p.el("path",{d:"M48,552 V566 H196 V552 M122.0,566 V650",fill:"none",stroke:C.teal,"stroke-width":2.5});
    p.el("path",{d:"M600,552 V566 H748 V552 M674.0,566 V650",fill:"none",stroke:C.teal,"stroke-width":2.5});
    p.el("path",{d:"M968,552 V566 H1002 V552 M985.0,566 V650",fill:"none",stroke:C.teal,"stroke-width":2.5});
    p.el("path",{d:"M122,650 H985",stroke:C.teal,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M590,650 L590.0,727.0",stroke:C.teal,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M590,737 L585.5,727.0 L594.5,727.0 Z",fill:C.teal});
    p.el('text',{x:625,y:704,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},["KV 9개","9 KV positions"]);
    p.el("rect",{x:48,y:753,width:248,height:124,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:172,y:801,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},["현재 Q","Current Q"]);
    p.el('text',{x:172,y:846,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 위치 8","Input position 8"]);
    p.el("path",{d:"M306,815 L397.0,815.0",stroke:C.blue,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M407,815 L397.0,819.5 L397.0,810.5 Z",fill:C.blue});
    p.raw("<g data-panel=\"true\">");
    p.el("rect",{x:420,y:753,width:340,height:124,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:590,y:805,fill:C.ink,"font-size":30,"font-weight":700,"text-anchor":"middle"},"Attention");
    p.el('text',{x:590,y:848,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["유효한 KV 전체로 계산","Over all valid KV"]);
    p.raw('</g>');
    p.el("path",{d:"M773,815 L895.0,815.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M905,815 L895.0,819.5 L895.0,810.5 Z",fill:C.muted});
    p.el("rect",{x:918,y:753,width:234,height:124,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1035,y:821,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["하나의 결과","One result"]);
    p.el('text',{x:48,y:949,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["KV는 각자의 블록에 둔 채로 읽습니다.","KV stays in its own physical blocks while being read."]);
    p.el('text',{x:48,y:994,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["C의 KV와 P5의 미사용 3칸은 계산 대상에서 제외합니다.","C’s KV and the 3 unused slots in P5 are excluded."]);
    return [p];
  },
} satisfies FigureSpec;
