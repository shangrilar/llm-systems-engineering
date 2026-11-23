import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"attention-and-mlp",figureId:"04-gated-mlp",number:"04-gated-mlp",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Gated MLP: 두 갈래로 계산한 뒤 곱하기","Gated MLP: two branches, then multiply"],
  subtitle:["SwiGLU에서는 같은 입력에서 Gate 값과 Up 값을 각각 계산합니다.","In SwiGLU, both the Gate and Up values are computed from the same input."],
  alt:["동일한 4차원 토큰 입력이 두 경로로 갈라진다. Gate projection과 SiLU를 거쳐 8차원 g를, Up projection으로 8차원 u를 만든다. g와 u를 성분별로 곱한 뒤 Down projection으로 4차원 출력으로 바꾼다. 세 선형 변환을 순서대로 통과하는 구조가 아니다.","The same d=4 input branches into Gate projection followed by SiLU, producing g with m=8, and Up projection, producing u with m=8. Their component-wise product goes through Down projection to d=4. The three linear transformations are not a sequential stack."],
  caption:["Gate와 Up은 서로 다른 가중치를 사용합니다. 그림의 크기는 설명용이며 bias는 생략했습니다.","Gate and Up use different weights. Dimensions are illustrative; biases are omitted."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1049,1104,[48,205]);
    p.el('text',{x:600,y:224,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["같은 토큰의 입력 x · d = 4","The same token input x · d = 4"]);
    p.el("rect",{x:400,y:250,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"450.0\" y=\"287.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">x<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan></text>");
    p.el("rect",{x:500,y:250,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"550.0\" y=\"287.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">x<tspan baseline-shift=\"sub\" font-size=\"70%\">2</tspan></text>");
    p.el("rect",{x:600,y:250,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"650.0\" y=\"287.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">x<tspan baseline-shift=\"sub\" font-size=\"70%\">3</tspan></text>");
    p.el("rect",{x:700,y:250,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"750.0\" y=\"287.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">x<tspan baseline-shift=\"sub\" font-size=\"70%\">4</tspan></text>");
    p.el("path",{d:"M600,306 L600,360",fill:"none",stroke:C.blue,"stroke-width":3});
    p.el("circle",{cx:600,cy:360,r:5,fill:C.blue});
    p.el("path",{d:"M600,360 H320 V404",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M600,360 H880 V404",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:120,y:420,width:400,height:76,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:320,y:452,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Gate projection");
    p.el('text',{x:320,y:480,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → m  ·  4 → 8");
    p.el("rect",{x:680,y:420,width:400,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:880,y:452,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Up projection");
    p.el('text',{x:880,y:480,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → m  ·  4 → 8");
    p.el("path",{d:"M320,508 L320,548",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:120,y:562,width:400,height:70,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:320,y:594,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"SiLU");
    p.el('text',{x:320,y:622,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["성분별 활성화","Component-wise activation"]);
    p.el("path",{d:"M320,644 L320,682",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M880,508 L880,682",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:320,y:721,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},["Gate 값 g · m = 8","Gate values g · m = 8"]);
    p.el('text',{x:880,y:721,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["Up 값 u · m = 8","Up values u · m = 8"]);
    p.el("rect",{x:96,y:743,width:56,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"124.0\" y=\"780.0\" fill=\"#287D78\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">g<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan></text>");
    p.el("rect",{x:152,y:743,width:56,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"180.0\" y=\"780.0\" fill=\"#287D78\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">g<tspan baseline-shift=\"sub\" font-size=\"70%\">2</tspan></text>");
    p.el("rect",{x:208,y:743,width:56,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"236.0\" y=\"780.0\" fill=\"#287D78\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">g<tspan baseline-shift=\"sub\" font-size=\"70%\">3</tspan></text>");
    p.el("rect",{x:264,y:743,width:56,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"292.0\" y=\"780.0\" fill=\"#287D78\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">g<tspan baseline-shift=\"sub\" font-size=\"70%\">4</tspan></text>");
    p.el("rect",{x:320,y:743,width:56,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"348.0\" y=\"780.0\" fill=\"#287D78\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">g<tspan baseline-shift=\"sub\" font-size=\"70%\">5</tspan></text>");
    p.el("rect",{x:376,y:743,width:56,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"404.0\" y=\"780.0\" fill=\"#287D78\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">g<tspan baseline-shift=\"sub\" font-size=\"70%\">6</tspan></text>");
    p.el("rect",{x:432,y:743,width:56,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"460.0\" y=\"780.0\" fill=\"#287D78\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">g<tspan baseline-shift=\"sub\" font-size=\"70%\">7</tspan></text>");
    p.el("rect",{x:488,y:743,width:56,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.raw("<text x=\"516.0\" y=\"780.0\" fill=\"#287D78\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">g<tspan baseline-shift=\"sub\" font-size=\"70%\">8</tspan></text>");
    p.el("rect",{x:656,y:743,width:56,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"684.0\" y=\"780.0\" fill=\"#2470BB\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">u<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan></text>");
    p.el("rect",{x:712,y:743,width:56,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"740.0\" y=\"780.0\" fill=\"#2470BB\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">u<tspan baseline-shift=\"sub\" font-size=\"70%\">2</tspan></text>");
    p.el("rect",{x:768,y:743,width:56,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"796.0\" y=\"780.0\" fill=\"#2470BB\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">u<tspan baseline-shift=\"sub\" font-size=\"70%\">3</tspan></text>");
    p.el("rect",{x:824,y:743,width:56,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"852.0\" y=\"780.0\" fill=\"#2470BB\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">u<tspan baseline-shift=\"sub\" font-size=\"70%\">4</tspan></text>");
    p.el("rect",{x:880,y:743,width:56,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"908.0\" y=\"780.0\" fill=\"#2470BB\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">u<tspan baseline-shift=\"sub\" font-size=\"70%\">5</tspan></text>");
    p.el("rect",{x:936,y:743,width:56,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"964.0\" y=\"780.0\" fill=\"#2470BB\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">u<tspan baseline-shift=\"sub\" font-size=\"70%\">6</tspan></text>");
    p.el("rect",{x:992,y:743,width:56,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"1020.0\" y=\"780.0\" fill=\"#2470BB\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">u<tspan baseline-shift=\"sub\" font-size=\"70%\">7</tspan></text>");
    p.el("rect",{x:1048,y:743,width:56,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"1076.0\" y=\"780.0\" fill=\"#2470BB\" font-size=\"22\" font-weight=\"400\" text-anchor=\"middle\">u<tspan baseline-shift=\"sub\" font-size=\"70%\">8</tspan></text>");
    p.el("path",{d:"M320,810 V862 H565",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M880,810 V862 H635",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("circle",{cx:600,cy:862,r:24,fill:"white",stroke:C.teal,"stroke-width":2.5});
    p.el('text',{x:600,y:871,fill:C.teal,"font-size":29,"font-weight":600,"text-anchor":"middle"},"⊙");
    p.el('text',{x:600,y:922,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},["같은 위치의 성분끼리 곱하기 · m차원 유지","Multiply matching components · retain m dimensions"]);
    p.el("path",{d:"M600,943 L600,983",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:410,y:998,width:380,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Down projection");
    p.el('text',{x:600,y:1058,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"m → d  ·  8 → 4");
    p.el("path",{d:"M600,1086 L600,1126",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:400,y:1140,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"450.0\" y=\"1177.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan></text>");
    p.el("rect",{x:500,y:1140,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"550.0\" y=\"1177.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">2</tspan></text>");
    p.el("rect",{x:600,y:1140,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"650.0\" y=\"1177.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">3</tspan></text>");
    p.el("rect",{x:700,y:1140,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"750.0\" y=\"1177.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">4</tspan></text>");
    p.el('text',{x:600,y:1238,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["출력도 d = 4 · 세 선형 변환은 Gate, Up, Down입니다.","Output: d = 4 · the three linear transformations are Gate, Up and Down."]);
    return [p];
  },
} satisfies FigureSpec;
