import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"embedding-to-lm-head",figureId:"01-model-overview",number:"01-model-overview",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["LLM의 전체 구조","The overall structure of an LLM"],
  subtitle:["디코더 블록의 내부는 잠시 닫아 두고, 입력부터 출력까지의 경로를 봅니다.","Follow the path from input to output, keeping decoder internals hidden for now."],
  alt:["왼쪽은 Embedding, Decoder block × N, LM Head의 압축 표현이다. 오른쪽은 같은 구조의 Decoder block 1, 2, 생략 기호, N을 펼쳐 보여준다. 블록들은 구조가 반복되며 내부는 표시하지 않는다.","The left panel shows Embedding, Decoder block times N, and LM Head. The right panel expands the same structure into decoder blocks 1, 2, an ellipsis, and N. The architecture repeats; block internals are hidden."],
  caption:["구조를 단순화한 그림입니다. 최종 정규화 등 세부 단계는 생략했습니다.","Simplified architecture. Details such as the final normalization are omitted."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M 1 1 L 9 5 L 1 9\" fill=\"none\" stroke=\"#8191A0\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,597,1104,[48,205]);
    p.el("rect",{x:48,y:195,width:534,height:555,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:618,y:195,width:534,height:555,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:236,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["압축해서 보기","Compact view"]);
    p.el('text',{x:885,y:236,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["펼쳐서 보기","Expanded view"]);
    p.el("rect",{x:165,y:265,width:300,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:306,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Embedding");
    p.el("rect",{x:165,y:648,width:300,height:64,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:689,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"LM Head");
    p.el("rect",{x:735,y:265,width:300,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:306,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Embedding");
    p.el("rect",{x:735,y:648,width:300,height:64,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:689,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"LM Head");
    p.el('text',{x:600,y:786,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["같은 구조를 압축하거나 펼쳐서 표현한 것입니다.","Two views of the same architecture."]);
    p.el("rect",{x:165,y:424,width:300,height:105,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:476.5,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block");
    p.el('text',{x:315,y:507.5,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"× N");
    p.el("path",{d:"M315,340 L315,410",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el("path",{d:"M315,542 L315,634",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el("rect",{x:735,y:360,width:300,height:64,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:401,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block 1");
    p.el("path",{d:"M885,337 L885,350",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el("rect",{x:735,y:449,width:300,height:64,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:490,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block 2");
    p.el("path",{d:"M885,429 L885,440",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:885,y:545,fill:C.muted,"font-size":31,"font-weight":400,"text-anchor":"middle"},"⋮");
    p.el("rect",{x:735,y:564,width:300,height:64,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:605,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block N");
    p.el("path",{d:"M885,634 L885,641",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el("line",{"x1":1080,"y1":360,"x2":1090,"y2":360,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":1090,"y1":360,"x2":1090,"y2":628,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":1080,"y1":628,"x2":1090,"y2":628,stroke:C.muted,"stroke-width":2});
    p.el('text',{x:1112,y:504,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle",transform:"rotate(90 1112 504)"},["N개","N blocks"]);
    return [p];
  },
} satisfies FigureSpec;
