import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"paged-kv-cache",figureId:"05-shared-prefix",number:"05-shared-prefix",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["여러 응답이 공통 KV를 공유하기","Sharing common KV across responses"],
  subtitle:["같은 입력 6토큰에서 응답 2개를 만듭니다. 블록 하나에는 4위치의 KV가 들어갑니다.","Two responses start from the same 6-token prompt. Each block holds KV for 4 positions."],
  alt:["위쪽은 두 응답이 같은 프롬프트 p0부터 p5까지의 KV를 각자 복사하여 물리 블록 네 개를 쓰는 장면이다. 아래쪽은 두 개의 별도 블록 테이블이 같은 P0와 P1을 가리켜 물리 블록 두 개만 쓰는 장면이다. P0에는 p0부터 p3, P1에는 p4와 p5가 있고 마지막 두 칸은 비어 있다.","The top duplicates the KV for prompt positions p0 through p5 for two responses, using four physical blocks. Below, two separate block tables both reference P0 and P1, using only two physical blocks. P0 holds p0 through p3; P1 holds p4 and p5 with two unused slots."],
  caption:["두 응답의 블록 테이블은 각각 유지하되, 공통 입력의 KV는 한 벌만 저장합니다.","Each response keeps its own block table, while the common input's KV is stored only once."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,783,1104,[48,196]);
    p.el('text',{x:48,y:210,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["응답마다 KV 복사","A copy for each response"]);
    p.el('text',{x:1152,y:210,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"end"},["물리 블록 4개","4 physical blocks"]);
    p.el("rect",{x:48,y:237,width:1104,height:316,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:273,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["블록 테이블","Block table"]);
    p.el("rect",{x:76,y:293,width:172,height:156,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:162,y:326,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["응답 1","Response 1"]);
    p.el("path",{d:"M90,342 H234",stroke:C.line});
    p.el('text',{x:162,y:376,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"L0 → P0");
    p.el('text',{x:162,y:425,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"L1 → P1");
    p.el('text',{x:352,y:330,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"P0");
    p.el("rect",{x:352,y:346,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:374,y:377,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("rect",{x:400,y:346,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:422,y:377,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("rect",{x:448,y:346,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:470,y:377,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("rect",{x:496,y:346,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:518,y:377,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p3");
    p.el('text',{x:352,y:436,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"P1");
    p.el("rect",{x:352,y:452,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:374,y:483,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p4");
    p.el("rect",{x:400,y:452,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:422,y:483,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p5");
    p.el("rect",{x:448,y:452,width:44,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:496,y:452,width:44,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M256,370 L330.0,370.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M340,370 L330.0,374.5 L330.0,365.5 Z",fill:C.muted});
    p.el("path",{d:"M256,419 H302 V476",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M302,476 L330.0,476.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M340,476 L330.0,480.5 L330.0,471.5 Z",fill:C.muted});
    p.el('text',{x:652,y:273,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["블록 테이블","Block table"]);
    p.el("rect",{x:652,y:293,width:172,height:156,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:738,y:326,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["응답 2","Response 2"]);
    p.el("path",{d:"M666,342 H810",stroke:C.line});
    p.el('text',{x:738,y:376,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"L0 → P2");
    p.el('text',{x:738,y:425,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"L1 → P3");
    p.el('text',{x:928,y:330,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"P2");
    p.el("rect",{x:928,y:346,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:950,y:377,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("rect",{x:976,y:346,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:998,y:377,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("rect",{x:1024,y:346,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1046,y:377,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("rect",{x:1072,y:346,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1094,y:377,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p3");
    p.el('text',{x:928,y:436,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"P3");
    p.el("rect",{x:928,y:452,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:950,y:483,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p4");
    p.el("rect",{x:976,y:452,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:998,y:483,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p5");
    p.el("rect",{x:1024,y:452,width:44,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:1072,y:452,width:44,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M832,370 L906.0,370.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M916,370 L906.0,374.5 L906.0,365.5 Z",fill:C.muted});
    p.el("path",{d:"M832,419 H878 V476",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M878,476 L906.0,476.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M916,476 L906.0,480.5 L906.0,471.5 Z",fill:C.muted});
    p.el('text',{x:48,y:611,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["공통 KV 블록 공유","Share the common KV blocks"]);
    p.el('text',{x:1152,y:611,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"end"},["물리 블록 2개","2 physical blocks"]);
    p.el("rect",{x:48,y:638,width:1104,height:333,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:675,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["블록 테이블","Block table"]);
    p.el('text',{x:952,y:675,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["블록 테이블","Block table"]);
    p.el("rect",{x:76,y:695,width:172,height:156,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:162,y:728,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["응답 1","Response 1"]);
    p.el("path",{d:"M90,744 H234",stroke:C.line});
    p.el('text',{x:162,y:778,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"L0 → P0");
    p.el('text',{x:162,y:827,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"L1 → P1");
    p.el("rect",{x:952,y:695,width:172,height:156,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1038,y:728,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["응답 2","Response 2"]);
    p.el("path",{d:"M966,744 H1110",stroke:C.line});
    p.el('text',{x:1038,y:778,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"L0 → P0");
    p.el('text',{x:1038,y:827,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"L1 → P1");
    p.el('text',{x:504,y:732,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"P0");
    p.el("rect",{x:504,y:748,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:526,y:779,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("rect",{x:552,y:748,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:574,y:779,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("rect",{x:600,y:748,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:622,y:779,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("rect",{x:648,y:748,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:670,y:779,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p3");
    p.el('text',{x:504,y:850,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"P1");
    p.el("rect",{x:504,y:866,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:526,y:897,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p4");
    p.el("rect",{x:552,y:866,width:44,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:574,y:897,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"p5");
    p.el("rect",{x:600,y:866,width:44,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:648,y:866,width:44,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M256,772 L482.0,772.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M492,772 L482.0,776.5 L482.0,767.5 Z",fill:C.muted});
    p.el("path",{d:"M944,772 L714.0,772.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M704,772 L714.0,767.5 L714.0,776.5 Z",fill:C.muted});
    p.el("path",{d:"M256,821 H368 V890",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M368,890 L482.0,890.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M492,890 L482.0,894.5 L482.0,885.5 Z",fill:C.muted});
    p.el("path",{d:"M944,821 H824 V890",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M824,890 L714.0,890.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M704,890 L714.0,885.5 L714.0,894.5 Z",fill:C.muted});
    p.el('text',{x:600,y:949,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["테이블은 각각, 공통 KV는 한 벌","Separate tables, one shared copy of the KV"]);
    return [p];
  },
} satisfies FigureSpec;
