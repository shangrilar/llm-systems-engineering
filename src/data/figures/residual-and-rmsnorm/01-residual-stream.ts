import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"residual-and-rmsnorm",figureId:"01-residual-stream",number:"01-residual-stream",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["같은 디코더 블록을 두 가지 배치로 보기","Two layouts of the same decoder block"],
  subtitle:["왼쪽은 Attention·MLP를, 오른쪽은 Residual stream을 중심에 둡니다.","Center Attention and MLP on the left, and the residual stream on the right."],
  alt:["왼쪽은 RMSNorm, Attention, 덧셈, RMSNorm, MLP, 덧셈을 중앙에 놓고 Residual 경로가 바깥으로 우회한다. 오른쪽은 Residual stream을 중앙에 놓고 RMSNorm과 Attention 또는 MLP가 오른쪽으로 갈라져 다시 더해진다. 두 배치는 같은 계산이며 입출력은 T × d다.","Left: RMSNorm, Attention, addition, RMSNorm, MLP, addition run down the center, with residual paths outside. Right: the central residual stream has two side branches with RMSNorm and Attention or MLP. Both layouts compute the same function with T × d inputs and outputs."],
  caption:["입출력은 모두 T × d · RMSNorm은 토큰별 d개 성분에 적용합니다. 배치 축과 변환 내부는 생략했습니다.","Input and output are T × d. RMSNorm acts on each token’s d values. Batch axis and sublayer internals omitted."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,914,1104,[48,206]);
    p.raw("<g transform=\"translate(48 206) scale(1)\" data-panel=\"1\">");
    p.raw("<g transform=\"translate(-48 -206)\">");
    p.raw("<g transform=\"translate(48 206) scale(1)\" data-panel=\"1\">");
    p.raw("<g transform=\"translate(-48 -205)\">");
    p.el("rect",{x:48,y:195,width:534,height:865,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:618,y:195,width:534,height:865,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:238,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["Attention·MLP 중심","Attention / MLP centered"]);
    p.el('text',{x:885,y:238,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["Residual stream 중심","Residual stream centered"]);
    p.el("rect",{x:215,y:272,width:200,height:57,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:309,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["입력 · T × d","Input · T × d"]);
    p.el("rect",{x:215,y:973,width:200,height:57,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:1010,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["출력 · T × d","Output · T × d"]);
    p.el("rect",{x:640,y:272,width:200,height:57,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:740,y:309,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["입력 · T × d","Input · T × d"]);
    p.el("rect",{x:640,y:973,width:200,height:57,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:740,y:1010,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["출력 · T × d","Output · T × d"]);
    p.el("path",{d:"M315,329 L315,380",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("circle",{cx:315,cy:363,r:5,fill:C.blue});
    p.el("path",{d:"M315,363 H116 V600 H280",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:133,y:580,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"start"},"Residual");
    p.el("rect",{x:205,y:393,width:220,height:68,rx:14,fill:C.tealFill,stroke:"#9FC8C1","stroke-width":1.5});
    p.el('text',{x:315,y:422,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:315,y:446,fill:C.teal,"font-size":19,"font-weight":400,"text-anchor":"middle"},["토큰별 d개 성분","Per token: d values"]);
    p.el("path",{d:"M315,461 L315,483",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:205,y:495,width:220,height:50,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:529,fill:C.gray,"font-size":28,"font-weight":500,"text-anchor":"middle"},"Attention");
    p.el("path",{d:"M315,548 L315,568",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("circle",{cx:315,cy:600,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M306,600 L324,600",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M315,591 L315,609",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M315,623 L315,678",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("circle",{cx:315,cy:660,r:5,fill:C.blue});
    p.el("path",{d:"M315,660 H116 V898 H280",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:133,y:878,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"start"},"Residual");
    p.el("rect",{x:205,y:691,width:220,height:68,rx:14,fill:C.tealFill,stroke:"#9FC8C1","stroke-width":1.5});
    p.el('text',{x:315,y:720,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:315,y:744,fill:C.teal,"font-size":19,"font-weight":400,"text-anchor":"middle"},["토큰별 d개 성분","Per token: d values"]);
    p.el("path",{d:"M315,759 L315,781",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:205,y:793,width:220,height:50,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:827,fill:C.gray,"font-size":28,"font-weight":500,"text-anchor":"middle"},"MLP");
    p.el("path",{d:"M315,846 L315,866",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("circle",{cx:315,cy:898,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M306,898 L324,898",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M315,889 L315,907",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M315,921 L315,959",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M740,329 L740,565",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el("circle",{cx:740,cy:600,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M731,600 L749,600",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M740,591 L740,609",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M740,363 H1010 V380",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("circle",{cx:740,cy:363,r:5,fill:C.blue});
    p.el("rect",{x:917,y:393,width:186,height:68,rx:14,fill:C.tealFill,stroke:"#9FC8C1","stroke-width":1.5});
    p.el('text',{x:1010,y:422,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:1010,y:446,fill:C.teal,"font-size":19,"font-weight":400,"text-anchor":"middle"},["토큰별 d개 성분","Per token: d values"]);
    p.el("path",{d:"M1010,461 L1010,483",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:917,y:495,width:186,height:50,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1010,y:529,fill:C.gray,"font-size":28,"font-weight":500,"text-anchor":"middle"},"Attention");
    p.el("path",{d:"M1010,553 V600 H775",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M740,623 L740,863",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el("circle",{cx:740,cy:898,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M731,898 L749,898",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M740,889 L740,907",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M740,660 H1010 V678",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("circle",{cx:740,cy:660,r:5,fill:C.blue});
    p.el("rect",{x:917,y:691,width:186,height:68,rx:14,fill:C.tealFill,stroke:"#9FC8C1","stroke-width":1.5});
    p.el('text',{x:1010,y:720,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:1010,y:744,fill:C.teal,"font-size":19,"font-weight":400,"text-anchor":"middle"},["토큰별 d개 성분","Per token: d values"]);
    p.el("path",{d:"M1010,759 L1010,781",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:917,y:793,width:186,height:50,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1010,y:827,fill:C.gray,"font-size":28,"font-weight":500,"text-anchor":"middle"},"MLP");
    p.el("path",{d:"M1010,851 V898 H775",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M740,921 L740,959",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:934,y:960,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["변환 결과를 더하기","Add the branch result"]);
    p.el('text',{x:600,y:1103,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["같은 계산입니다. 경로의 배치를 바꾸면 Residual 흐름이 드러납니다.","The computation is the same. Rearranging the paths reveals the residual stream."]);
    p.raw('</g>');
    p.raw('</g>');
    p.raw('</g>');
    p.raw('</g>');
    return [p];
  },
} satisfies FigureSpec;
