import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"attention-and-mlp",figureId:"03-basic-mlp",number:"03-basic-mlp",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["기본 MLP: 확장 → 활성화 → 축소","Basic MLP: expand, activate, project back"],
  subtitle:["두 선형 변환 사이에 활성화 함수를 적용합니다. 전체 토큰 수 T는 바뀌지 않습니다.","An activation sits between two linear transformations. The token count T stays fixed."],
  alt:["한 토큰의 4차원 입력을 첫 선형 변환으로 8차원으로 확장한다. 예시 중간 값 [−2,1,0.5,−1,3,0,−0.5,2]에 ReLU를 적용하면 [0,1,0.5,0,3,0,0,2]다. 두 번째 선형 변환은 다시 4차원으로 바꾼다. 다른 토큰을 섞지 않으며 선형 변환은 한 토큰 내 성분을 조합한다.","One token goes from d=4 to m=8. ReLU maps the illustrative intermediate values [-2,1,0.5,-1,3,0,-0.5,2] to [0,1,0.5,0,3,0,0,2]. The second linear transformation returns to d=4. Components combine within one token, without mixing token positions."],
  caption:["d = 4, m = 8과 중간 값은 설명용입니다. 선형 변환의 가중치와 bias는 생략했습니다.","Dimensions and intermediate values are illustrative. Linear weights and biases are omitted."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1023,1104,[48,205]);
    p.el('text',{x:600,y:225,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 하나를 확대 · 입력 d = 4","Zoom in on one token · input d = 4"]);
    p.el("rect",{x:400,y:250,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:450,y:287,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:500,y:250,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:550,y:287,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:600,y:250,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:650,y:287,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−1");
    p.el("rect",{x:700,y:250,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:750,y:287,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("path",{d:"M600,318 L600,350",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:410,y:365,width:380,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:397,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["선형 변환 1","Linear transformation 1"]);
    p.el('text',{x:600,y:425,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → m  ·  4 → 8");
    p.el("path",{d:"M600,453 L600,495",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:600,y:530,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["중간 벡터 · m = 8","Intermediate vector · m = 8"]);
    p.el("rect",{x:200,y:550,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:250,y:587,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−2");
    p.el("rect",{x:300,y:550,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:350,y:587,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:400,y:550,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:450,y:587,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el("rect",{x:500,y:550,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:550,y:587,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−1");
    p.el("rect",{x:600,y:550,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:650,y:587,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:700,y:550,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:750,y:587,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:800,y:550,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:850,y:587,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−0.5");
    p.el("rect",{x:900,y:550,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:950,y:587,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("path",{d:"M600,618 L600,650",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:340,y:664,width:520,height:76,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:696,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"ReLU");
    p.el('text',{x:600,y:724,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["각 성분에 max(0, 값) 적용","Apply max(0, value) to each component"]);
    p.el("path",{d:"M600,752 L600,789",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:200,y:804,width:100,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:250,y:841,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:300,y:804,width:100,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:350,y:841,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:400,y:804,width:100,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:450,y:841,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el("rect",{x:500,y:804,width:100,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:550,y:841,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:600,y:804,width:100,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:650,y:841,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:700,y:804,width:100,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:750,y:841,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:800,y:804,width:100,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:850,y:841,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:900,y:804,width:100,height:56,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:950,y:841,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("path",{d:"M600,872 L600,909",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:410,y:923,width:380,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:955,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["선형 변환 2","Linear transformation 2"]);
    p.el('text',{x:600,y:983,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"m → d  ·  8 → 4");
    p.el("path",{d:"M600,1011 L600,1043",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:400,y:1058,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"450.0\" y=\"1095.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan></text>");
    p.el("rect",{x:500,y:1058,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"550.0\" y=\"1095.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">2</tspan></text>");
    p.el("rect",{x:600,y:1058,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"650.0\" y=\"1095.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">3</tspan></text>");
    p.el("rect",{x:700,y:1058,width:100,height:56,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.raw("<text x=\"750.0\" y=\"1095.0\" fill=\"#2470BB\" font-size=\"28\" font-weight=\"400\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">4</tspan></text>");
    p.el('text',{x:600,y:1157,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["출력도 d = 4","Output: d = 4"]);
    p.el('text',{x:600,y:1212,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["선형 변환은 한 토큰 안의 성분들을 조합합니다.","Linear transformations combine components within one token."]);
    return [p];
  },
} satisfies FigureSpec;
