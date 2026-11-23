import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"residual-and-rmsnorm",figureId:"04-final-rmsnorm",number:"04-final-rmsnorm",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["전체 구조에 마지막 RMSNorm 더하기","Add the final RMSNorm to the full model"],
  subtitle:["지난 편의 전체 구조에, 마지막 디코더 블록과 LM Head 사이의 RMSNorm을 표시합니다.","Extend the previous overview with RMSNorm between the final decoder block and LM Head."],
  alt:["지난 편과 같은 두 패널이다. 왼쪽은 Embedding, Decoder block × N, RMSNorm, LM Head 순서다. 오른쪽은 블록 1, 2, 생략, N을 펼쳐 보여주고 마지막 블록 뒤에 RMSNorm과 LM Head가 이어진다. 최종 RMSNorm 전후는 T × d이고 LM Head 출력은 T × V다.","Two panels extend the previous article. Left: Embedding, Decoder block × N, RMSNorm, LM Head. Right: blocks 1, 2, ellipsis, N, followed by RMSNorm and LM Head. Final RMSNorm preserves T × d, then the LM Head outputs T × V."],
  caption:["RMSNorm은 T × d를 유지하고, LM Head는 T × V로 바꿉니다. 블록 내부의 RMSNorm은 생략했습니다.","RMSNorm preserves T × d; the LM Head maps it to T × V. RMSNorm inside each block is not shown."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,829,1104,[48,205]);
    p.el("rect",{x:48,y:195,width:534,height:770,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:618,y:195,width:534,height:770,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:236,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["압축해서 보기","Compact view"]);
    p.el('text',{x:885,y:236,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["펼쳐서 보기","Expanded view"]);
    p.el("rect",{x:165,y:265,width:300,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:306,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Embedding");
    p.el("rect",{x:165,y:705,width:300,height:68,rx:14,fill:C.tealFill,stroke:"#9FC8C1","stroke-width":1.5});
    p.el('text',{x:315,y:734,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:315,y:758,fill:C.teal,"font-size":19,"font-weight":400,"text-anchor":"middle"},["토큰별 d개 성분","Per token: d values"]);
    p.el("rect",{x:165,y:824,width:300,height:64,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:865,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"LM Head");
    p.el("path",{d:"M315,785 L315,812",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:347,y:800,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},"T × d");
    p.el('text',{x:315,y:928,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},"T × V");
    p.el("rect",{x:735,y:265,width:300,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:306,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Embedding");
    p.el("rect",{x:735,y:705,width:300,height:68,rx:14,fill:C.tealFill,stroke:"#9FC8C1","stroke-width":1.5});
    p.el('text',{x:885,y:734,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:885,y:758,fill:C.teal,"font-size":19,"font-weight":400,"text-anchor":"middle"},["토큰별 d개 성분","Per token: d values"]);
    p.el("rect",{x:735,y:824,width:300,height:64,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:865,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"LM Head");
    p.el("path",{d:"M885,785 L885,812",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:917,y:800,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},"T × d");
    p.el('text',{x:885,y:928,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},"T × V");
    p.el("rect",{x:165,y:424,width:300,height:105,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:476.5,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block");
    p.el('text',{x:315,y:507.5,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"× N");
    p.el("path",{d:"M315,341 L315,410",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M315,542 L315,690",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:347,y:674,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"start"},"T × d");
    p.el("rect",{x:735,y:360,width:300,height:64,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:401,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block 1");
    p.el("path",{d:"M885,337 L885,348",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:735,y:465,width:300,height:64,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:506,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block 2");
    p.el("path",{d:"M885,432 L885,453",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:885,y:565,fill:C.muted,"font-size":31,"font-weight":400,"text-anchor":"middle"},"⋮");
    p.el("rect",{x:735,y:594,width:300,height:64,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:635,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block N");
    p.el("path",{d:"M885,669 L885,690",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:917,y:690,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"start"},"T × d");
    p.el("path",{d:"M1080,360 H1090 V658 H1080",fill:"none",stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:1114,y:520,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"N");
    p.el('text',{x:600,y:1017,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},["마지막 디코더 블록 → RMSNorm → LM Head","Final decoder block → RMSNorm → LM Head"]);
    return [p];
  },
} satisfies FigureSpec;
