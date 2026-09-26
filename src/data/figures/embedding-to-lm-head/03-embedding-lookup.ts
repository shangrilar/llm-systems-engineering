import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"embedding-to-lm-head",figureId:"03-embedding-lookup",number:"03-embedding-lookup",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["ID에 해당하는 벡터를 가져오기","Look up a vector for each ID"],
  subtitle:["전체 테이블에서 필요한 행을 선택하고, 입력 토큰의 순서대로 출력합니다.","Select the required rows from the full table and return them in input order."],
  alt:["입력 ID는 9707, 1879, 0 순서다. 가운데 임베딩 테이블은 0, 1, 생략, 1879, 생략, 9707, 생략, V−1의 행을 ID 순서로 보여주고 선택된 세 행만 강조한다. 조회 순서 표시 ①, ②, ③이 입력과 선택된 행과 출력에 대응한다. 출력 벡터는 입력 순서인 9707, 1879, 0으로 쌓인다. 전체 테이블은 V × d, 출력은 3 × d이며 벡터 값은 설명용이다.","Input IDs are 9707, 1879, and 0. The table shows rows 0, 1, an ellipsis, 1879, an ellipsis, 9707, an ellipsis, and V−1 in ID order. Only the three selected rows are highlighted. Markers ①, ②, and ③ link each input to its table row and output. Output vectors are stacked in input order: 9707, 1879, 0. The full table is V × d and the output is 3 × d. Vector values are illustrative."],
  caption:["ID는 실제 토크나이저 결과이며, d = 4와 벡터 값은 설명용 예시입니다. V는 어휘 크기입니다.","Real token IDs; d = 4 and vector values are illustrative. V denotes vocabulary size."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M 1 1 L 9 5 L 1 9\" fill=\"none\" stroke=\"#8191A0\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,698,1104,[48,205]);
    p.el('text',{x:140,y:243,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 ID","Token IDs"]);
    p.el('text',{x:534,y:243,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["임베딩 테이블 E","Embedding table E"]);
    p.el('text',{x:993,y:243,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["출력 임베딩","Output embeddings"]);
    p.el("line",{"x1":410,"y1":312,"x2":410,"y2":304,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":410,"y1":304,"x2":658,"y2":304,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":658,"y1":304,"x2":658,"y2":312,stroke:C.muted,"stroke-width":2});
    p.el('text',{x:534,y:291,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모델 차원 d","Model dimension d"]);
    p.el("line",{"x1":845,"y1":312,"x2":845,"y2":304,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":845,"y1":304,"x2":1141,"y2":304,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":1141,"y1":304,"x2":1141,"y2":312,stroke:C.muted,"stroke-width":2});
    p.el('text',{x:993,y:291,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모델 차원 d","Model dimension d"]);
    p.el('text',{x:140,y:385,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["조회 순서","Lookup order"]);
    p.el('text',{x:57,y:457,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"①");
    p.el("rect",{x:86,y:420,width:112,height:54,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:142,y:456,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},"9707");
    p.el('text',{x:793,y:457,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"①");
    p.el('text',{x:993,y:410,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"ID 9707");
    p.el("rect",{x:845,y:420,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:882,y:455,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:919,y:420,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:956,y:455,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.4");
    p.el("rect",{x:993,y:420,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1030,y:455,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.8");
    p.el("rect",{x:1067,y:420,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1104,y:455,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el('text',{x:57,y:547,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"②");
    p.el("rect",{x:86,y:510,width:112,height:54,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:142,y:546,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1879");
    p.el('text',{x:793,y:547,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"②");
    p.el('text',{x:993,y:500,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"ID 1879");
    p.el("rect",{x:845,y:510,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:882,y:545,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.6");
    p.el("rect",{x:919,y:510,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:956,y:545,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.3");
    p.el("rect",{x:993,y:510,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1030,y:545,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.2");
    p.el("rect",{x:1067,y:510,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1104,y:545,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el('text',{x:57,y:637,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"③");
    p.el("rect",{x:86,y:600,width:112,height:54,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:142,y:636,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},"0");
    p.el('text',{x:793,y:637,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"③");
    p.el('text',{x:993,y:590,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"ID 0");
    p.el("rect",{x:845,y:600,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:882,y:635,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.1");
    p.el("rect",{x:919,y:600,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:956,y:635,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.7");
    p.el("rect",{x:993,y:600,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1030,y:635,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el("rect",{x:1067,y:600,width:74,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1104,y:635,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.3");
    p.el('text',{x:388,y:365,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},"0");
    p.el("rect",{x:410,y:330,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:441,y:365,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.1");
    p.el("rect",{x:472,y:330,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:503,y:365,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.7");
    p.el("rect",{x:534,y:330,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:565,y:365,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el("rect",{x:596,y:330,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:627,y:365,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.3");
    p.el("rect",{x:410,y:330,width:248,height:54,rx:0,fill:"none",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:291,y:367,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"③");
    p.el('text',{x:388,y:419,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},"1");
    p.el("rect",{x:410,y:384,width:62,height:54,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:441,y:419,fill:"#94A1AD","font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el("rect",{x:472,y:384,width:62,height:54,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:503,y:419,fill:"#94A1AD","font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.6");
    p.el("rect",{x:534,y:384,width:62,height:54,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:565,y:419,fill:"#94A1AD","font-size":23,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:596,y:384,width:62,height:54,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:627,y:419,fill:"#94A1AD","font-size":23,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el('text',{x:388,y:473,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},"…");
    p.el("rect",{x:410,y:438,width:248,height:54,rx:0,fill:C.surface,stroke:C.line,"stroke-width":1});
    p.el('text',{x:534,y:473,fill:C.muted,"font-size":26,"font-weight":400,"text-anchor":"middle"},"⋮");
    p.el('text',{x:388,y:527,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},"1879");
    p.el("rect",{x:410,y:492,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:441,y:527,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.6");
    p.el("rect",{x:472,y:492,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:503,y:527,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.3");
    p.el("rect",{x:534,y:492,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:565,y:527,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.2");
    p.el("rect",{x:596,y:492,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:627,y:527,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el("rect",{x:410,y:492,width:248,height:54,rx:0,fill:"none",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:291,y:529,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"②");
    p.el('text',{x:388,y:581,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},"…");
    p.el("rect",{x:410,y:546,width:248,height:54,rx:0,fill:C.surface,stroke:C.line,"stroke-width":1});
    p.el('text',{x:534,y:581,fill:C.muted,"font-size":26,"font-weight":400,"text-anchor":"middle"},"⋮");
    p.el('text',{x:388,y:635,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},"9707");
    p.el("rect",{x:410,y:600,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:441,y:635,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:472,y:600,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:503,y:635,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.4");
    p.el("rect",{x:534,y:600,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:565,y:635,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.8");
    p.el("rect",{x:596,y:600,width:62,height:54,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:627,y:635,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el("rect",{x:410,y:600,width:248,height:54,rx:0,fill:"none",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:291,y:637,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"①");
    p.el('text',{x:388,y:689,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},"…");
    p.el("rect",{x:410,y:654,width:248,height:54,rx:0,fill:C.surface,stroke:C.line,"stroke-width":1});
    p.el('text',{x:534,y:689,fill:C.muted,"font-size":26,"font-weight":400,"text-anchor":"middle"},"⋮");
    p.el('text',{x:388,y:743,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},"V−1");
    p.el("rect",{x:410,y:708,width:62,height:54,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:441,y:743,fill:"#94A1AD","font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.2");
    p.el("rect",{x:472,y:708,width:62,height:54,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:503,y:743,fill:"#94A1AD","font-size":23,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el("rect",{x:534,y:708,width:62,height:54,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:565,y:743,fill:"#94A1AD","font-size":23,"font-weight":400,"text-anchor":"middle"},"0.6");
    p.el("rect",{x:596,y:708,width:62,height:54,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:627,y:743,fill:"#94A1AD","font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.4");
    p.el("path",{d:"M218,537 L259,537",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el("path",{d:"M689,537 L748,537",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:534,y:811,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["전체 크기 V × d","Full table: V × d"]);
    p.el('text',{x:534,y:843,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["일부 행 생략","Some rows omitted"]);
    p.el('text',{x:993,y:731,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 순서대로","In input order"]);
    p.el('text',{x:993,y:776,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 3개 × d","3 tokens × d"]);
    p.el('text',{x:600,y:887,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["① ② ③은 입력 토큰의 순서입니다.","① ② ③ mark the input token order."]);
    return [p];
  },
} satisfies FigureSpec;
