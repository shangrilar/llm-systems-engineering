import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"attention-projections",figureId:"03-head-segments",number:"03-head-segments",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["멀티 헤드: 한 벡터 안의 여러 묶음","Multi-head: groups within each vector"],
  subtitle:["d는 모델 차원, h는 head 수, dh는 head 하나의 차원입니다.","d: model dimension · h: number of heads · dh: dimension per head"],
  alt:["토큰 하나의 Q, K, V 각각에 8개 성분이 있다. 앞의 네 성분은 head 1, 뒤의 네 성분은 head 2다. 3×8을 3×2×4로 보는 것은 추가 행렬 곱 없는 형태 변경이다.","Each token’s Q, K and V has eight components: the first four form head 1, the last four head 2. Viewing 3×8 as 3×2×4 requires no additional matrix multiplication."],
  caption:["각 head의 값은 입력 d개 성분 전체에서 계산됩니다. dh = d/h인 MHA 예시입니다.","Each head uses all d input components in its projection. Here, dh = d/h."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,897,1104,[48,205]);
    p.el('text',{x:600,y:227,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["Projection으로 만든 토큰 하나의 벡터를 확대합니다.","Zoom in on one token’s projected vectors."]);
    p.el('text',{x:600,y:272,fill:C.ink,"font-size":30,"font-weight":600,"text-anchor":"middle"},"d = 8 = h × dh = 2 × 4");
    p.el('text',{x:93,y:422,fill:C.ink,"font-size":32,"font-weight":600,"text-anchor":"middle"},"Q");
    p.el("path",{d:"M168,363 V355 H624 V363",fill:"none",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:396,y:342,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"Head 1 · dh = 4");
    p.el("path",{d:"M624,363 V355 H1080 V363",fill:"none",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:852,y:342,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},"Head 2 · dh = 4");
    p.el("rect",{x:168,y:377,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"225.0\" y=\"421.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">q<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan></text>");
    p.el("rect",{x:282,y:377,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"339.0\" y=\"421.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">q<tspan baseline-shift=\"sub\" font-size=\"70%\">2</tspan></text>");
    p.el("rect",{x:396,y:377,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"453.0\" y=\"421.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">q<tspan baseline-shift=\"sub\" font-size=\"70%\">3</tspan></text>");
    p.el("rect",{x:510,y:377,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"567.0\" y=\"421.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">q<tspan baseline-shift=\"sub\" font-size=\"70%\">4</tspan></text>");
    p.el("rect",{x:624,y:377,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"681.0\" y=\"421.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">q<tspan baseline-shift=\"sub\" font-size=\"70%\">5</tspan></text>");
    p.el("rect",{x:738,y:377,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"795.0\" y=\"421.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">q<tspan baseline-shift=\"sub\" font-size=\"70%\">6</tspan></text>");
    p.el("rect",{x:852,y:377,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"909.0\" y=\"421.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">q<tspan baseline-shift=\"sub\" font-size=\"70%\">7</tspan></text>");
    p.el("rect",{x:966,y:377,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"1023.0\" y=\"421.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">q<tspan baseline-shift=\"sub\" font-size=\"70%\">8</tspan></text>");
    p.el("path",{d:"M624,377 L624,447",fill:"none",stroke:C.teal,"stroke-width":3});
    p.el('text',{x:624,y:489,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["총 8개 성분 · d차원 유지","All 8 components · still d dimensions"]);
    p.el('text',{x:93,y:642,fill:C.ink,"font-size":32,"font-weight":600,"text-anchor":"middle"},"K");
    p.el("path",{d:"M168,583 V575 H624 V583",fill:"none",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:396,y:562,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"Head 1 · dh = 4");
    p.el("path",{d:"M624,583 V575 H1080 V583",fill:"none",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:852,y:562,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},"Head 2 · dh = 4");
    p.el("rect",{x:168,y:597,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"225.0\" y=\"641.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">k<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan></text>");
    p.el("rect",{x:282,y:597,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"339.0\" y=\"641.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">k<tspan baseline-shift=\"sub\" font-size=\"70%\">2</tspan></text>");
    p.el("rect",{x:396,y:597,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"453.0\" y=\"641.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">k<tspan baseline-shift=\"sub\" font-size=\"70%\">3</tspan></text>");
    p.el("rect",{x:510,y:597,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"567.0\" y=\"641.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">k<tspan baseline-shift=\"sub\" font-size=\"70%\">4</tspan></text>");
    p.el("rect",{x:624,y:597,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"681.0\" y=\"641.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">k<tspan baseline-shift=\"sub\" font-size=\"70%\">5</tspan></text>");
    p.el("rect",{x:738,y:597,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"795.0\" y=\"641.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">k<tspan baseline-shift=\"sub\" font-size=\"70%\">6</tspan></text>");
    p.el("rect",{x:852,y:597,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"909.0\" y=\"641.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">k<tspan baseline-shift=\"sub\" font-size=\"70%\">7</tspan></text>");
    p.el("rect",{x:966,y:597,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"1023.0\" y=\"641.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">k<tspan baseline-shift=\"sub\" font-size=\"70%\">8</tspan></text>");
    p.el("path",{d:"M624,597 L624,667",fill:"none",stroke:C.teal,"stroke-width":3});
    p.el('text',{x:624,y:709,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["총 8개 성분 · d차원 유지","All 8 components · still d dimensions"]);
    p.el('text',{x:93,y:862,fill:C.ink,"font-size":32,"font-weight":600,"text-anchor":"middle"},"V");
    p.el("path",{d:"M168,803 V795 H624 V803",fill:"none",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:396,y:782,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"Head 1 · dh = 4");
    p.el("path",{d:"M624,803 V795 H1080 V803",fill:"none",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:852,y:782,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},"Head 2 · dh = 4");
    p.el("rect",{x:168,y:817,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"225.0\" y=\"861.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">v<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan></text>");
    p.el("rect",{x:282,y:817,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"339.0\" y=\"861.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">v<tspan baseline-shift=\"sub\" font-size=\"70%\">2</tspan></text>");
    p.el("rect",{x:396,y:817,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"453.0\" y=\"861.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">v<tspan baseline-shift=\"sub\" font-size=\"70%\">3</tspan></text>");
    p.el("rect",{x:510,y:817,width:114,height:70,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"567.0\" y=\"861.0\" fill=\"#2470BB\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">v<tspan baseline-shift=\"sub\" font-size=\"70%\">4</tspan></text>");
    p.el("rect",{x:624,y:817,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"681.0\" y=\"861.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">v<tspan baseline-shift=\"sub\" font-size=\"70%\">5</tspan></text>");
    p.el("rect",{x:738,y:817,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"795.0\" y=\"861.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">v<tspan baseline-shift=\"sub\" font-size=\"70%\">6</tspan></text>");
    p.el("rect",{x:852,y:817,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"909.0\" y=\"861.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">v<tspan baseline-shift=\"sub\" font-size=\"70%\">7</tspan></text>");
    p.el("rect",{x:966,y:817,width:114,height:70,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"1023.0\" y=\"861.0\" fill=\"#287D78\" font-size=\"29\" font-weight=\"400\" text-anchor=\"middle\">v<tspan baseline-shift=\"sub\" font-size=\"70%\">8</tspan></text>");
    p.el("path",{d:"M624,817 L624,887",fill:"none",stroke:C.teal,"stroke-width":3});
    p.el('text',{x:624,y:929,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["총 8개 성분 · d차원 유지","All 8 components · still d dimensions"]);
    p.el('text',{x:600,y:1042,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},"T × d = 3 × 8   ↔   T × h × dh = 3 × 2 × 4");
    p.el('text',{x:600,y:1087,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["같은 값을 다른 형태로 보는 것입니다. 추가 행렬 곱은 없습니다.","These are two views of the same values; no extra matrix multiplication."]);
    return [p];
  },
} satisfies FigureSpec;
