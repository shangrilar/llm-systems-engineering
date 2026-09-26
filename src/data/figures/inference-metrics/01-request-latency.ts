import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-metrics",figureId:"01-request-latency",number:"01-request-latency",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["한 요청에서 지연 시간 읽기","Read latency on one request timeline"],
  subtitle:["어디서부터 어디까지 재는지 보면, 지표의 차이가 보입니다.","Each metric measures a different span on the same timeline."],
  alt:["제출 0ms, 토큰 수신 100·130·170ms, 종료 180ms. TTFT 100ms, ITL 30·40ms, TPOT 35ms/token, E2E 180ms.","Submit at 0ms, tokens at 100, 130 and 170ms, end at 180ms. TTFT 100ms, ITLs 30 and 40ms, TPOT 35ms/token, E2E 180ms."],
  caption:["같은 요청에서도 시간을 재는 시작과 끝에 따라 서로 다른 지연 지표가 됩니다.","Different starting and ending points on the same request produce different latency metrics."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,631,1104,[48,196]);
    p.el('text',{x:48,y:205,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["클라이언트 수신 기준 · 예시에서는 한 청크에 한 토큰","Client receipt times · One token per chunk in this example"]);
    p.el("path",{d:"M120,325 L1020,325",stroke:C.muted,"stroke-width":2,fill:"none"});
    p.el("circle",{cx:120,cy:325,r:9,fill:C.ink,stroke:C.ink,"stroke-width":3});
    p.el('text',{x:120,y:270,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["제출","Submit"]);
    p.el('text',{x:120,y:302,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"0 ms");
    p.el("circle",{cx:620,cy:325,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el('text',{x:620,y:270,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["첫 토큰 x0","First token x0"]);
    p.el('text',{x:620,y:302,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"100 ms");
    p.el("circle",{cx:770,cy:325,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el('text',{x:770,y:270,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["토큰 x1","Token x1"]);
    p.el('text',{x:770,y:302,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"130 ms");
    p.el("circle",{cx:970,cy:325,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el('text',{x:970,y:270,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["토큰 x2","Token x2"]);
    p.el('text',{x:970,y:302,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"170 ms");
    p.el("path",{d:"M1020,240 L1020,340",stroke:C.orange,"stroke-width":2,fill:"none"});
    p.el('text',{x:1020,y:239,fill:C.orange,"font-size":21,"font-weight":700,"text-anchor":"middle"},["종료 180 ms","End 180 ms"]);
    p.el("path",{d:"M120,410 L620,410",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M120,402 L120,418",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M620,402 L620,418",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el('text',{x:370,y:390,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},"TTFT · 100 ms");
    p.el("path",{d:"M620,480 L770,480",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M620,472 L620,488",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M770,472 L770,488",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el('text',{x:695,y:460,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"ITL · 30 ms");
    p.el("path",{d:"M770,480 L970,480",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M770,472 L770,488",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M970,472 L970,488",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el('text',{x:870,y:460,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"ITL · 40 ms");
    p.el("rect",{x:500,y:535,width:620,height:120,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:530,y:574,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"start"},["TPOT · 첫 토큰 이후 간격의 평균","TPOT · Average interval after the first token"]);
    p.el('text',{x:530,y:621,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"(30 + 40) / 2 = 35 ms/token");
    p.el("path",{d:"M120,740 L1020,740",stroke:C.ink,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M120,732 L120,748",stroke:C.ink,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M1020,732 L1020,748",stroke:C.ink,"stroke-width":2,fill:"none"});
    p.el('text',{x:570,y:720,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["전체 요청 시간 · E2E = 180 ms","Full request time · E2E = 180 ms"]);
    p.el('text',{x:48,y:812,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["출력 3개 → 간격 2개 · 마지막 토큰 수신과 요청 종료는 구별합니다.","3 output tokens → 2 intervals · Last-token receipt and request end are distinct."]);
    return [p];
  },
} satisfies FigureSpec;
