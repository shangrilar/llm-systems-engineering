import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"prefill-and-decode",figureId:"03-weight-reuse",number:"03-weight-reuse",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["같은 가중치로 더 많은 토큰 계산하기","Compute more tokens with the same weights"],
  subtitle:["가중치의 크기는 같고, 함께 계산하는 입력과 출력 행이 늘어납니다.","The weight matrix stays the same size while more input and output rows are computed."],
  alt:["동일한 W를 입력 토큰 하나와 네 개에 사용하는 두 경우를 비교합니다. 출력 행과 선형 연산량은 하나에서 네 개로 늘지만 가중치 데이터량은 같습니다. 각 비교 막대는 해당 항목의 한 토큰 값을 기준으로 합니다.","Two cases use the same W with one and four input tokens. Output rows and linear-operation FLOPs increase fourfold while weight bytes stay the same. Each bar is relative to that metric’s one-token value."],
  caption:["출력 행과 선형 연산량은 네 배로 늘지만, 읽을 가중치 데이터량은 같습니다.","Output rows and linear-operation work grow fourfold, while the weight data to read stays the same."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,863,1104,[48,206]);
    p.el('text',{x:306,y:221,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},["입력 토큰 1개","One input token"]);
    p.el("rect",{x:211,y:265,width:190,height:132,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("path",{d:"M249,265 V397 M211, 291.4 H401",stroke:C.purple,opacity:".18"});
    p.el("path",{d:"M287,265 V397 M211, 317.8 H401",stroke:C.purple,opacity:".18"});
    p.el("path",{d:"M325,265 V397 M211, 344.2 H401",stroke:C.purple,opacity:".18"});
    p.el("path",{d:"M363,265 V397 M211, 370.6 H401",stroke:C.purple,opacity:".18"});
    p.el("rect",{x:271,y:301,width:70,height:56,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:306,y:339,fill:C.purple,"font-size":33,"font-weight":700,"text-anchor":"middle"},"W");
    p.el("path",{d:"M306,412 L306,489",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:263,y:504,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:306,y:541,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"t0");
    p.el("path",{d:"M306,575 L306,610",stroke:C.blue,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:263,y:626,width:86,height:18,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:306,y:691,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["출력 1행","One output row"]);
    p.el('text',{x:48,y:771,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"start"},["가중치 데이터량","Weight bytes"]);
    p.el("rect",{x:48,y:790,width:240,height:38,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:306,y:818,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"1×");
    p.el('text',{x:48,y:884,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"start"},["선형 연산량","Linear-operation FLOPs"]);
    p.el("rect",{x:48,y:903,width:56,height:38,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:124,y:931,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"1×");
    p.el('text',{x:894,y:221,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},["입력 토큰 4개","Four input tokens"]);
    p.el("rect",{x:799,y:265,width:190,height:132,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("path",{d:"M837,265 V397 M799, 291.4 H989",stroke:C.purple,opacity:".18"});
    p.el("path",{d:"M875,265 V397 M799, 317.8 H989",stroke:C.purple,opacity:".18"});
    p.el("path",{d:"M913,265 V397 M799, 344.2 H989",stroke:C.purple,opacity:".18"});
    p.el("path",{d:"M951,265 V397 M799, 370.6 H989",stroke:C.purple,opacity:".18"});
    p.el("rect",{x:859,y:301,width:70,height:56,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:894,y:339,fill:C.purple,"font-size":33,"font-weight":700,"text-anchor":"middle"},"W");
    p.el("path",{d:"M894,412 L703,489",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:660,y:504,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:703,y:541,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"t0");
    p.el("path",{d:"M703,575 L703,610",stroke:C.blue,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:660,y:626,width:86,height:18,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("path",{d:"M894,412 L823,489",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:780,y:504,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:823,y:541,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"t1");
    p.el("path",{d:"M823,575 L823,610",stroke:C.blue,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:780,y:626,width:86,height:18,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("path",{d:"M894,412 L943,489",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:900,y:504,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:943,y:541,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"t2");
    p.el("path",{d:"M943,575 L943,610",stroke:C.blue,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:900,y:626,width:86,height:18,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("path",{d:"M894,412 L1063,489",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:1020,y:504,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1063,y:541,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"t3");
    p.el("path",{d:"M1063,575 L1063,610",stroke:C.blue,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:1020,y:626,width:86,height:18,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:894,y:691,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["출력 4행","Four output rows"]);
    p.el('text',{x:636,y:771,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"start"},["가중치 데이터량","Weight bytes"]);
    p.el("rect",{x:636,y:790,width:240,height:38,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:894,y:818,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"1×");
    p.el('text',{x:636,y:884,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"start"},["선형 연산량","Linear-operation FLOPs"]);
    p.el("rect",{x:636,y:903,width:56,height:38,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:696,y:903,width:56,height:38,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:756,y:903,width:56,height:38,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:816,y:903,width:56,height:38,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:892,y:931,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"4×");
    p.el('text',{x:48,y:1001,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["각 항목의 1토큰 값을 기준으로 비교 · 가중치 한 벌을 읽는 근사","Each metric is relative to its one-token value · One read of the weights assumed"]);
    p.el('text',{x:48,y:1054,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["여러 토큰: 한 요청의 Prefill 또는 여러 요청의 Decode","Multiple tokens: prefill of one request, or decode across requests"]);
    return [p];
  },
} satisfies FigureSpec;
