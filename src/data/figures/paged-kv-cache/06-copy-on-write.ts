import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"paged-kv-cache",figureId:"06-copy-on-write",number:"06-copy-on-write",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 6","Figure 6"],
  title:["쓰기가 필요할 때 공유 블록 분리하기","Splitting a shared block when a write is needed"],
  subtitle:["공유 중인 마지막 블록에 새 KV를 써야 할 때, 그 블록만 복사합니다.","When new KV must be written to a shared tail block, only that block is copied."],
  alt:["첫 상태에서 두 응답은 p0부터 p3까지 든 P0와 p4, p5가 든 부분 블록 P1을 공유한다. 응답 1의 새 입력 a0를 처리하면서 공유 꼬리 블록에 KV를 써야 하므로 P2를 배정해 p4와 p5만 복사하고 a0의 KV를 추가한다. 응답 2는 이제 혼자 참조하는 원래 P1에 b0의 KV를 추가한다. P0는 계속 공유되고 총 세 물리 블록을 쓴다.","Initially, both responses share full block P0 with p0 through p3 and partial tail P1 with p4 and p5. Processing a0 for response 1 requires a write to the shared tail, so P2 is allocated, p4 and p5 are copied, and the KV for a0 is appended. Response 2 then appends the KV for b0 to the original P1, which it now references exclusively. P0 stays shared and only three physical blocks are used."],
  caption:["새 KV를 쓸 마지막 공유 블록만 분리하고, 가득 찬 첫 블록은 계속 공유합니다.","Only the last shared block that needs new KV is split; the full first block remains shared."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,844,1104,[48,196]);
    p.el("rect",{x:48,y:198,width:344,height:777,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:68,y:239,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["1. 공통 입력 처리 후","1. Prompt processed"]);
    p.el('text',{x:118,y:337,fill:C.muted,"font-size":22,"font-weight":700,"text-anchor":"start"},"P0");
    p.el('text',{x:322,y:337,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"end"},["두 응답 공유","Shared by both"]);
    p.el("rect",{x:118,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:142,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("rect",{x:170,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:194,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("rect",{x:222,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:246,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("rect",{x:274,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:298,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p3");
    p.el('text',{x:220,y:936,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["물리 블록 2개","2 physical blocks"]);
    p.el("rect",{x:428,y:198,width:344,height:777,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:448,y:239,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["2. 응답 1: a0 처리","2. Response 1: a0"]);
    p.el('text',{x:498,y:337,fill:C.muted,"font-size":22,"font-weight":700,"text-anchor":"start"},"P0");
    p.el('text',{x:702,y:337,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"end"},["두 응답 공유","Shared by both"]);
    p.el("rect",{x:498,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:522,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("rect",{x:550,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:574,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("rect",{x:602,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:626,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("rect",{x:654,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:678,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p3");
    p.el('text',{x:600,y:936,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["물리 블록 3개","3 physical blocks"]);
    p.el("rect",{x:808,y:198,width:344,height:777,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:828,y:239,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["3. 응답 2: b0 처리","3. Response 2: b0"]);
    p.el('text',{x:878,y:337,fill:C.muted,"font-size":22,"font-weight":700,"text-anchor":"start"},"P0");
    p.el('text',{x:1082,y:337,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"end"},["두 응답 공유","Shared by both"]);
    p.el("rect",{x:878,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:902,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("rect",{x:930,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:954,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("rect",{x:982,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1006,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("rect",{x:1034,y:353,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1058,y:384,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p3");
    p.el('text',{x:980,y:936,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["물리 블록 3개","3 physical blocks"]);
    p.el("path",{d:"M398,450 L408.0,450.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M418,450 L408.0,454.5 L408.0,445.5 Z",fill:C.muted});
    p.el("path",{d:"M778,450 L788.0,450.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M798,450 L788.0,454.5 L788.0,445.5 Z",fill:C.muted});
    p.el('text',{x:118,y:539,fill:C.muted,"font-size":22,"font-weight":700,"text-anchor":"start"},"P1");
    p.el('text',{x:322,y:635,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"end"},["두 응답 공유","Shared by both"]);
    p.el("rect",{x:118,y:555,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:142,y:586,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p4");
    p.el("rect",{x:170,y:555,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:194,y:586,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p5");
    p.el("rect",{x:222,y:555,width:48,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:274,y:555,width:48,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:220,y:689,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["다음 KV를 쓰기 전","Before writing the next KV"]);
    p.el('text',{x:600,y:285,fill:C.purple,"font-size":20,"font-weight":400,"text-anchor":"middle"},["공유 블록에 쓰기 → 복사","Shared block → copy"]);
    p.el('text',{x:498,y:539,fill:C.muted,"font-size":22,"font-weight":700,"text-anchor":"start"},"P1");
    p.el('text',{x:702,y:635,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"end"},["응답 2만","Response 2 only"]);
    p.el("rect",{x:498,y:555,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:522,y:586,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p4");
    p.el("rect",{x:550,y:555,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:574,y:586,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p5");
    p.el("rect",{x:602,y:555,width:48,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:654,y:555,width:48,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:498,y:777,fill:C.muted,"font-size":22,"font-weight":700,"text-anchor":"start"},"P2");
    p.el('text',{x:702,y:873,fill:C.purple,"font-size":21,"font-weight":400,"text-anchor":"end"},["응답 1만","Response 1 only"]);
    p.el("rect",{x:498,y:793,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:522,y:824,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p4");
    p.el("rect",{x:550,y:793,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:574,y:824,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p5");
    p.el("rect",{x:602,y:793,width:48,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:626,y:824,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"a0");
    p.el("rect",{x:654,y:793,width:48,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M490,579 H464 V817",stroke:C.teal,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M464,817 L480.0,817.0",stroke:C.teal,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M490,817 L480.0,821.5 L480.0,812.5 Z",fill:C.teal});
    p.el('text',{x:600,y:665,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["p4·p5 복사","Copy p4 and p5"]);
    p.el("rect",{x:594,y:693,width:64,height:45,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:626,y:723,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"middle"},"a0");
    p.el("path",{d:"M626,743 L626.0,774.0",stroke:C.purple,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M626,784 L621.5,774.0 L630.5,774.0 Z",fill:C.purple});
    p.el('text',{x:980,y:285,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"middle"},["독점 블록에 바로 쓰기","Own block → write"]);
    p.el('text',{x:878,y:539,fill:C.muted,"font-size":22,"font-weight":700,"text-anchor":"start"},"P1");
    p.el('text',{x:1082,y:635,fill:C.orange,"font-size":21,"font-weight":400,"text-anchor":"end"},["응답 2만","Response 2 only"]);
    p.el("rect",{x:878,y:555,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:902,y:586,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p4");
    p.el("rect",{x:930,y:555,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:954,y:586,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p5");
    p.el("rect",{x:982,y:555,width:48,height:48,rx:5,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1006,y:586,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"b0");
    p.el("rect",{x:1034,y:555,width:48,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:974,y:448,width:64,height:45,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1006,y:478,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},"b0");
    p.el("path",{d:"M1006,498 L1006.0,536.0",stroke:C.orange,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M1006,546 L1001.5,536.0 L1010.5,536.0 Z",fill:C.orange});
    p.el('text',{x:878,y:777,fill:C.muted,"font-size":22,"font-weight":700,"text-anchor":"start"},"P2");
    p.el('text',{x:1082,y:873,fill:C.purple,"font-size":21,"font-weight":400,"text-anchor":"end"},["응답 1만","Response 1 only"]);
    p.el("rect",{x:878,y:793,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:902,y:824,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p4");
    p.el("rect",{x:930,y:793,width:48,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:954,y:824,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p5");
    p.el("rect",{x:982,y:793,width:48,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:1006,y:824,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"a0");
    p.el("rect",{x:1034,y:793,width:48,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:600,y:1025,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["가득 찬 첫 블록은 계속 공유하고, 쓰기가 필요한 마지막 블록만 분리합니다.","The full first block stays shared; only the tail that needs a write is split."]);
    return [p];
  },
} satisfies FigureSpec;
