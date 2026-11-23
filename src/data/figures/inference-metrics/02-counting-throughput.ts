import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-metrics",figureId:"02-counting-throughput",number:"02-counting-throughput",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["같은 시간 동안 처리한 양 세기","Count work over the same time window"],
  subtitle:["완료한 요청을 셀 수도 있고, 전달한 출력 토큰을 셀 수도 있습니다.","Count completed requests or delivered output tokens."],
  alt:["10초 안에서 A·B·C가 중첩 실행해 모두 완료하며 출력은 각각3·5·2개. 요청 처리량0.3requests/s, 출력 처리량1token/s.","A, B and C overlap and complete within 10 seconds with 3, 5 and 2 outputs. Request throughput is 0.3 requests/s and output throughput is 1 token/s."],
  caption:["여러 요청의 완료 수와 출력 토큰 수를 같은 관측 시간으로 나눕니다.","Divide completed requests and output tokens across requests by the same observation time."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,741,1104,[48,196]);
    p.el('text',{x:48,y:205,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["모든 요청과 출력이 들어 있는 10초 관측 창","A 10-second window containing all requests and outputs"]);
    p.el("path",{d:"M190,258 L1010,258",stroke:C.ink,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M190,250 L190,266",stroke:C.ink,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M1010,250 L1010,266",stroke:C.ink,"stroke-width":2,fill:"none"});
    p.el('text',{x:600,y:238,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["관측 시간 10초","Observation time: 10 s"]);
    p.el("path",{d:"M190,290 L190,610",stroke:C.line,"stroke-width":2,fill:"none","stroke-dasharray":"6 5"});
    p.el('text',{x:190,y:638,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"0 s");
    p.el("path",{d:"M354,290 L354,610",stroke:C.line,"stroke-width":2,fill:"none","stroke-dasharray":"6 5"});
    p.el('text',{x:354,y:638,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"2 s");
    p.el("path",{d:"M518,290 L518,610",stroke:C.line,"stroke-width":2,fill:"none","stroke-dasharray":"6 5"});
    p.el('text',{x:518,y:638,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"4 s");
    p.el("path",{d:"M682,290 L682,610",stroke:C.line,"stroke-width":2,fill:"none","stroke-dasharray":"6 5"});
    p.el('text',{x:682,y:638,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"6 s");
    p.el("path",{d:"M846,290 L846,610",stroke:C.line,"stroke-width":2,fill:"none","stroke-dasharray":"6 5"});
    p.el('text',{x:846,y:638,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"8 s");
    p.el("path",{d:"M1010,290 L1010,610",stroke:C.line,"stroke-width":2,fill:"none","stroke-dasharray":"6 5"});
    p.el('text',{x:1010,y:638,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"10 s");
    p.el('text',{x:48,y:342,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"start"},"A");
    p.el("path",{d:"M272,335 L632.8,335",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el("circle",{cx:272,cy:335,r:9,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("circle",{cx:436,cy:335,r:9,fill:C.blue,stroke:C.blue,"stroke-width":3});
    p.el("circle",{cx:518,cy:335,r:9,fill:C.blue,stroke:C.blue,"stroke-width":3});
    p.el("circle",{cx:600,cy:335,r:9,fill:C.blue,stroke:C.blue,"stroke-width":3});
    p.el("rect",{x:620.8,y:319,width:30,height:32,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:635.8,y:342,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"✓");
    p.el('text',{x:1100,y:342,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"middle"},["3토큰","3 tokens"]);
    p.el('text',{x:48,y:457,fill:C.teal,"font-size":28,"font-weight":700,"text-anchor":"start"},"B");
    p.el("path",{d:"M354,450 L878.8000000000001,450",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("circle",{cx:354,cy:450,r:9,fill:"white",stroke:C.teal,"stroke-width":3});
    p.el("circle",{cx:518,cy:450,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el("circle",{cx:600,cy:450,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el("circle",{cx:682,cy:450,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el("circle",{cx:764,cy:450,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el("circle",{cx:846,cy:450,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el("rect",{x:866.8000000000001,y:434,width:30,height:32,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:881.8000000000001,y:457,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"✓");
    p.el('text',{x:1100,y:457,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["5토큰","5 tokens"]);
    p.el('text',{x:48,y:572,fill:C.purple,"font-size":28,"font-weight":700,"text-anchor":"start"},"C");
    p.el("path",{d:"M436,565 L928,565",stroke:C.purple,"stroke-width":2,fill:"none"});
    p.el("circle",{cx:436,cy:565,r:9,fill:"white",stroke:C.purple,"stroke-width":3});
    p.el("circle",{cx:764,cy:565,r:9,fill:C.purple,stroke:C.purple,"stroke-width":3});
    p.el("circle",{cx:887,cy:565,r:9,fill:C.purple,stroke:C.purple,"stroke-width":3});
    p.el("rect",{x:916,y:549,width:30,height:32,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:931,y:572,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"✓");
    p.el('text',{x:1100,y:572,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"middle"},["2토큰","2 tokens"]);
    p.el("circle",{cx:90,cy:697,r:9,fill:"white",stroke:C.ink,"stroke-width":3});
    p.el('text',{x:112,y:705,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},["요청 제출","Submit"]);
    p.el("circle",{cx:360,cy:697,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el('text',{x:382,y:705,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},["출력 토큰 수신","Output token received"]);
    p.el('text',{x:795,y:705,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"✓");
    p.el('text',{x:828,y:705,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},["요청 완료","Completed"]);
    p.el("rect",{x:48,y:758,width:525,height:110,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:68,y:792,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"start"},["완료 요청 3개","3 completed requests"]);
    p.el('text',{x:68,y:838,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"3 / 10 = 0.3 requests/s");
    p.el("rect",{x:605,y:758,width:547,height:110,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:625,y:792,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"start"},["출력 토큰 3 + 5 + 2 = 10개","3 + 5 + 2 = 10 output tokens"]);
    p.el('text',{x:625,y:838,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"10 / 10 = 1 token/s");
    p.el('text',{x:48,y:922,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["여러 요청의 결과를 같은 시간으로 나눕니다. 입력 토큰은 세지 않았습니다.","Count results across requests over the same time. Input tokens are not counted."]);
    return [p];
  },
} satisfies FigureSpec;
