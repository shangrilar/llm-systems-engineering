import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"embedding-to-lm-head",figureId:"04-decoder-shape",number:"04-decoder-shape",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["차원은 유지되고, 벡터 값은 달라집니다","Same dimensions, different vector values"],
  subtitle:["토큰 수와 모델 차원은 유지되지만, 블록을 지나면서 각 토큰의 벡터 값이 바뀝니다.","Token count and model dimension stay the same; vector values change through the block."],
  alt:["3개 토큰의 4차원 벡터가 하나의 내부 비공개 디코더 블록에 들어간다. 출력도 3행 4열이지만 모든 행의 숫자가 바뀐다. 행별로 별도 블록에 들어가는 그림이 아니며, 이 그림은 토큰별 독립 처리를 의미하지 않는다.","Three four-dimensional token vectors enter a single decoder block with hidden internals. The output still has three rows and four columns, but the values change. Rows do not enter separate blocks; the figure does not imply independent processing of each token."],
  caption:["배치 축 생략 · T는 토큰 수입니다. T = 3, d = 4와 모든 벡터 값은 설명용 예시입니다.","Batch axis omitted. T is token count; T = 3, d = 4, and all vector values are illustrative."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M 1 1 L 9 5 L 1 9\" fill=\"none\" stroke=\"#8191A0\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,474,1104,[48,205]);
    p.el('text',{x:285,y:248,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["입력 벡터","Input vectors"]);
    p.el('text',{x:958,y:248,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["출력 벡터","Output vectors"]);
    p.el("line",{"x1":165,"y1":314,"x2":165,"y2":306,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":165,"y1":306,"x2":405,"y2":306,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":405,"y1":306,"x2":405,"y2":314,stroke:C.muted,"stroke-width":2});
    p.el('text',{x:285,y:293,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모델 차원 d = 4","Model dimension d = 4"]);
    p.el("line",{"x1":838,"y1":314,"x2":838,"y2":306,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":838,"y1":306,"x2":1078,"y2":306,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":1078,"y1":306,"x2":1078,"y2":314,stroke:C.muted,"stroke-width":2});
    p.el('text',{x:958,y:293,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모델 차원 d = 4","Model dimension d = 4"]);
    p.el('text',{x:151,y:379,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},["위치 1","Pos. 1"]);
    p.el("rect",{x:165,y:337,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:195,y:379,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:225,y:337,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:255,y:379,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.4");
    p.el("rect",{x:285,y:337,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:315,y:379,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.8");
    p.el("rect",{x:345,y:337,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:375,y:379,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el('text',{x:151,y:447,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},["위치 2","Pos. 2"]);
    p.el("rect",{x:165,y:405,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:195,y:447,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.6");
    p.el("rect",{x:225,y:405,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:255,y:447,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.3");
    p.el("rect",{x:285,y:405,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:315,y:447,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.2");
    p.el("rect",{x:345,y:405,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:375,y:447,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el('text',{x:151,y:515,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},["위치 3","Pos. 3"]);
    p.el("rect",{x:165,y:473,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:195,y:515,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.1");
    p.el("rect",{x:225,y:473,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:255,y:515,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.7");
    p.el("rect",{x:285,y:473,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:315,y:515,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el("rect",{x:345,y:473,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:375,y:515,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.3");
    p.el("rect",{x:838,y:337,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:868,y:379,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el("rect",{x:898,y:337,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:928,y:379,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.1");
    p.el("rect",{x:958,y:337,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:988,y:379,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.7");
    p.el("rect",{x:1018,y:337,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1048,y:379,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el("rect",{x:838,y:405,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:868,y:447,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:898,y:405,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:928,y:447,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.6");
    p.el("rect",{x:958,y:405,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:988,y:447,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el("rect",{x:1018,y:405,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1048,y:447,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.8");
    p.el("rect",{x:838,y:473,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:868,y:515,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el("rect",{x:898,y:473,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:928,y:515,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.3");
    p.el("rect",{x:958,y:473,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:988,y:515,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.9");
    p.el("rect",{x:1018,y:473,width:60,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1048,y:515,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.2");
    p.el("path",{d:"M429,438 L478,438",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el("rect",{x:502,y:354,width:230,height:168,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:617,y:438,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Decoder block");
    p.el('text',{x:617,y:469,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["내부는 다음 편에서","Inside: next article"]);
    p.el("path",{d:"M750,438 L786,438",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:285,y:596,fill:C.blue,"font-size":31,"font-weight":600,"text-anchor":"middle"},"T × d");
    p.el('text',{x:958,y:596,fill:C.blue,"font-size":31,"font-weight":600,"text-anchor":"middle"},"T × d");
    p.el('text',{x:600,y:662,fill:C.ink,"font-size":30,"font-weight":600,"text-anchor":"middle"},["칸 수는 같고, 안의 숫자는 달라집니다.","Same number of cells, different values."]);
    return [p];
  },
} satisfies FigureSpec;
