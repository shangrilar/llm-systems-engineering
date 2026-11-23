import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"prefill-and-decode",figureId:"05-request-kv-reads",number:"05-request-kv-reads",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["요청이 늘면 읽을 KV도 늘어납니다","More requests add more KV reads"],
  subtitle:["한 번의 Decode에서 요청마다 새 입력 하나와 자기 문맥을 사용합니다.","In one decode step, each request uses one new input and its own context."],
  alt:["동일한 문맥 길이의 요청 하나와 세 개를 비교합니다. W는 모든 요청이 공통으로 사용하지만, A B C의 이번 토큰 계산은 각각 KV(A), KV(B), KV(C)를 읽습니다. 읽기 대상은 W와 KV 하나에서 W와 서로 다른 KV 세 개로 늘어납니다.","Compare one and three requests with equal context lengths. All requests share W, while their current-token computations read KV(A), KV(B), and KV(C) separately. The read set grows from W plus one KV cache to W plus three independent KV caches."],
  caption:["가중치 W는 모든 요청이 함께 쓰지만, KV는 요청마다 따로 읽습니다.","All requests share the weights W, but each reads its own KV."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,867,1104,[48,206]);
    p.el('text',{x:306,y:222,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},["요청 1개","One request"]);
    p.el("rect",{x:216,y:260,width:180,height:82,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:306,y:313,fill:C.purple,"font-size":32,"font-weight":700,"text-anchor":"middle"},"W");
    p.el("path",{d:"M306,357 L306,422",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:231,y:438,width:150,height:68,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:306,y:481,fill:C.blue,"font-size":20,"font-weight":700,"text-anchor":"middle"},["A: 새 토큰 1개","A: 1 new token"]);
    p.el("path",{d:"M306,589 L306,520",stroke:C.teal,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:306,y:703,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"middle"},"KV(A)");
    p.el("rect",{x:234,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M234,630 H260",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:263,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M263,630 H289",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:292,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M292,630 H318",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:321,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M321,630 H347",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:350,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M350,630 H376",stroke:C.teal,"stroke-width":1});
    p.el('text',{x:306,y:754,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["5개 위치","5 positions"]);
    p.el('text',{x:48,y:840,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["한 단계에서 읽는 대상","Reads in one decode step"]);
    p.el("rect",{x:48,y:873,width:92,height:70,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:94,y:917,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"middle"},"W");
    p.el('text',{x:156,y:917,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},"+");
    p.el("rect",{x:173,y:873,width:106,height:70,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:226,y:915,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"KV(A)");
    p.el('text',{x:894,y:222,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},["요청 3개","Three requests"]);
    p.el("rect",{x:804,y:260,width:180,height:82,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:894,y:313,fill:C.purple,"font-size":32,"font-weight":700,"text-anchor":"middle"},"W");
    p.el("path",{d:"M894,357 L716,422",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:641,y:438,width:150,height:68,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:716,y:481,fill:C.blue,"font-size":20,"font-weight":700,"text-anchor":"middle"},["A: 새 토큰 1개","A: 1 new token"]);
    p.el("path",{d:"M716,589 L716,520",stroke:C.teal,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:716,y:703,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"middle"},"KV(A)");
    p.el("rect",{x:644,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M644,630 H670",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:673,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M673,630 H699",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:702,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M702,630 H728",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:731,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M731,630 H757",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:760,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M760,630 H786",stroke:C.teal,"stroke-width":1});
    p.el('text',{x:716,y:754,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["5개 위치","5 positions"]);
    p.el("path",{d:"M894,357 L889,422",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:814,y:438,width:150,height:68,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:889,y:481,fill:C.blue,"font-size":20,"font-weight":700,"text-anchor":"middle"},["B: 새 토큰 1개","B: 1 new token"]);
    p.el("path",{d:"M889,589 L889,520",stroke:C.teal,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:889,y:703,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"middle"},"KV(B)");
    p.el("rect",{x:817,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M817,630 H843",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:846,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M846,630 H872",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:875,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M875,630 H901",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:904,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M904,630 H930",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:933,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M933,630 H959",stroke:C.teal,"stroke-width":1});
    p.el('text',{x:889,y:754,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["5개 위치","5 positions"]);
    p.el("path",{d:"M894,357 L1062,422",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:987,y:438,width:150,height:68,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:1062,y:481,fill:C.blue,"font-size":20,"font-weight":700,"text-anchor":"middle"},["C: 새 토큰 1개","C: 1 new token"]);
    p.el("path",{d:"M1062,589 L1062,520",stroke:C.teal,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:1062,y:703,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"middle"},"KV(C)");
    p.el("rect",{x:990,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M990,630 H1016",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:1019,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M1019,630 H1045",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:1048,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M1048,630 H1074",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:1077,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M1077,630 H1103",stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:1106,y:603,width:26,height:54,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("path",{d:"M1106,630 H1132",stroke:C.teal,"stroke-width":1});
    p.el('text',{x:1062,y:754,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["5개 위치","5 positions"]);
    p.el('text',{x:636,y:840,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["한 단계에서 읽는 대상","Reads in one decode step"]);
    p.el("rect",{x:636,y:873,width:92,height:70,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:682,y:917,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"middle"},"W");
    p.el('text',{x:744,y:917,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},"+");
    p.el("rect",{x:761,y:873,width:106,height:70,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:814,y:915,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"KV(A)");
    p.el('text',{x:879,y:917,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},"+");
    p.el("rect",{x:891,y:873,width:106,height:70,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:944,y:915,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"KV(B)");
    p.el('text',{x:1009,y:917,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},"+");
    p.el("rect",{x:1021,y:873,width:106,height:70,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1074,y:915,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"KV(C)");
    p.el('text',{x:48,y:1003,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["가중치는 공통으로 사용 · 읽을 KV는 요청마다 추가","Weights are shared · Each request adds its own KV reads"]);
    p.el('text',{x:48,y:1058,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["동일한 모델·문맥 길이, 독립 KV의 예 · 칸 크기는 데이터량의 비율이 아닙니다.","Same model and context length, independent KV · Cell sizes do not represent byte ratios."]);
    return [p];
  },
} satisfies FigureSpec;
