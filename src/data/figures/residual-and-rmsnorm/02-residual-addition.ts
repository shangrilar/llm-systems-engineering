import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"residual-and-rmsnorm",figureId:"02-residual-addition",number:"02-residual-addition",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["입력 벡터에 변환 결과 더하기","Add an update to the input vector"],
  subtitle:["d차원 입력은 그대로 전달되고, d차원 변환 결과가 성분별로 더해집니다.","The d-dimensional input passes through unchanged; a d-dimensional update is added."],
  alt:["한 토큰의 4차원 입력 [1,2,−1,0]이 중앙 경로로 그대로 전달된다. 옆 경로의 설명용 변환 결과 [0.2,−0.5,0.3,0.1]을 더하면 [1.2,1.5,−0.7,0.1]이 된다. 네 성분은 위치별로 더해지고 출력도 4차원이다.","The input [1,2,−1,0] passes unchanged down the main path. Adding the illustrative update [0.2,−0.5,0.3,0.1] yields [1.2,1.5,−0.7,0.1]. Addition matches components, preserving d = 4."],
  caption:["d = 4와 수치는 설명용 예시입니다. Attention은 이 토큰 외의 다른 토큰도 참조할 수 있습니다.","d = 4 and values are illustrative. Attention can also reference other tokens."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,787,1104,[48,205]);
    p.el('text',{x:80,y:221,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["토큰 하나의 벡터를 확대합니다.","Zoom in on one token vector."]);
    p.el('text',{x:420,y:270,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["입력 x","Input x"]);
    p.el("path",{d:"M260,318 V310 H580 V318",fill:"none",stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:420,y:297,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모델 차원 d = 4","Model dimension d = 4"]);
    p.el("rect",{x:260,y:327,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:300,y:366,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:340,y:327,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:380,y:366,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:420,y:327,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:460,y:366,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−1");
    p.el("rect",{x:500,y:327,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:540,y:366,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("path",{d:"M420,387 L420,562",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M420,424 H930 V461",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("circle",{cx:420,cy:424,r:5,fill:C.blue});
    p.el("rect",{x:770,y:474,width:320,height:125,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:930,y:513,fill:C.gray,"font-size":27,"font-weight":600,"text-anchor":"middle"},["변환 경로","Transformation branch"]);
    p.el('text',{x:930,y:549,fill:C.gray,"font-size":22,"font-weight":400,"text-anchor":"middle"},"RMSNorm →");
    p.el('text',{x:930,y:580,fill:C.gray,"font-size":22,"font-weight":400,"text-anchor":"middle"},["Attention 또는 MLP","Attention or MLP"]);
    p.el('text',{x:150,y:478,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"start"},["그대로","Unchanged"]);
    p.el('text',{x:150,y:513,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"start"},["전달","input"]);
    p.el('text',{x:420,y:598,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["덧셈 직전에도 같은 x","The same x before addition"]);
    p.el("rect",{x:260,y:619,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:300,y:658,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:340,y:619,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:380,y:658,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:420,y:619,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:460,y:658,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−1");
    p.el("rect",{x:500,y:619,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:540,y:658,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("path",{d:"M930,599 L930,635",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:930,y:670,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"middle"},["변환 결과 Δ · d = 4","Update Δ · d = 4"]);
    p.el("rect",{x:770,y:690,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:810,y:729,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:850,y:690,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:890,y:729,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−0.5");
    p.el("rect",{x:930,y:690,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:970,y:729,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0.3");
    p.el("rect",{x:1010,y:690,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1050,y:729,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el("path",{d:"M930,760 V802 H455",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M420,679 L420,768",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el("circle",{cx:420,cy:802,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M411,802 L429,802",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M420,793 L420,811",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el('text',{x:150,y:811,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"start"},"x + Δ");
    p.el("path",{d:"M420,825 L420,864",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:260,y:878,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:300,y:917,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1.2");
    p.el("rect",{x:340,y:878,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:380,y:917,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1.5");
    p.el("rect",{x:420,y:878,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:460,y:917,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−0.7");
    p.el("rect",{x:500,y:878,width:80,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:540,y:917,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el('text',{x:420,y:976,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["출력도 d = 4","Output: d = 4"]);
    p.el("rect",{x:690,y:875,width:450,height:104,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:915,y:916,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["같은 위치의 성분끼리 더합니다.","Add matching components."]);
    p.el('text',{x:915,y:953,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["예: 두 번째 성분  2 + (−0.5) = 1.5","Example: component 2 → 2 + (−0.5) = 1.5"]);
    return [p];
  },
} satisfies FigureSpec;
