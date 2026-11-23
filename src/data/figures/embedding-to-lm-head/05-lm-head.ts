import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"embedding-to-lm-head",figureId:"05-lm-head",number:"05-lm-head",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["벡터를 어휘별 점수로 바꾸기","From vectors to vocabulary scores"],
  subtitle:["각 위치의 d차원 표현에서, 어휘의 각 토큰에 대한 점수 V개를 계산합니다.","At each position, map a d-dimensional vector to V scores, one per vocabulary token."],
  alt:["세 토큰의 모델 차원 표현 T 곱하기 d를 LM Head가 어휘별 점수 T 곱하기 V로 변환한다. 출력의 열은 토큰 ID 0, 1, 중간 생략, V 빼기 1에 대응한다. 표시된 수치는 설명용 logits이며 확률이 아니다. 마지막 위치의 점수가 다음 토큰 선택에 쓰인다. 입력 벡터 예시는 이전 그림과 연속성을 위한 도식으로 최종 정규화 계산은 생략했다.","The LM Head maps token representations of shape T by d to vocabulary scores of shape T by V. The displayed output columns correspond to token IDs 0, 1, an ellipsis, and V minus 1. Values are illustrative logits, not probabilities. The last position's scores are used to select the next token. Input vectors continue the previous illustration; the final normalization calculation is omitted."],
  caption:["수치는 설명용 예시 · logits는 확률이 아닙니다. 생성 시 마지막 위치의 점수로 다음 토큰을 선택합니다.","Illustrative scores, not probabilities. The last position’s logits are used to select the next token."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M 1 1 L 9 5 L 1 9\" fill=\"none\" stroke=\"#8191A0\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,537,1104,[48,205]);
    p.el('text',{x:284,y:248,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["마지막 층의 토큰 표현","Final token representations"]);
    p.el('text',{x:982,y:248,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["어휘별 점수","Vocabulary scores"]);
    p.el("line",{"x1":154,"y1":314,"x2":154,"y2":306,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":154,"y1":306,"x2":414,"y2":306,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":414,"y1":306,"x2":414,"y2":314,stroke:C.muted,"stroke-width":2});
    p.el('text',{x:284,y:293,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모델 차원 d","Model dimension d"]);
    p.el("line",{"x1":817,"y1":314,"x2":817,"y2":306,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":817,"y1":306,"x2":1153,"y2":306,stroke:C.muted,"stroke-width":2});
    p.el("line",{"x1":1153,"y1":306,"x2":1153,"y2":314,stroke:C.muted,"stroke-width":2});
    p.el('text',{x:985,y:293,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["어휘 크기 V","Vocabulary size V"]);
    p.el('text',{x:859,y:345,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"0");
    p.el('text',{x:943,y:345,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"1");
    p.el('text',{x:1027,y:345,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"…");
    p.el('text',{x:1111,y:345,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"V−1");
    p.el('text',{x:805,y:345,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"end"},"ID");
    p.el('text',{x:140,y:409,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},["위치 1","Pos. 1"]);
    p.el("rect",{x:154,y:367,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:186.5,y:409,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el("rect",{x:219,y:367,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:251.5,y:409,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.1");
    p.el("rect",{x:284,y:367,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:316.5,y:409,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.7");
    p.el("rect",{x:349,y:367,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:381.5,y:409,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el('text',{x:140,y:477,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},["위치 2","Pos. 2"]);
    p.el("rect",{x:154,y:435,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:186.5,y:477,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:219,y:435,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:251.5,y:477,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.6");
    p.el("rect",{x:284,y:435,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:316.5,y:477,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el("rect",{x:349,y:435,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:381.5,y:477,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.8");
    p.el('text',{x:140,y:545,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},["위치 3","Pos. 3"]);
    p.el("rect",{x:154,y:503,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:186.5,y:545,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el("rect",{x:219,y:503,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:251.5,y:545,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.3");
    p.el("rect",{x:284,y:503,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:316.5,y:545,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.9");
    p.el("rect",{x:349,y:503,width:65,height:68,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:381.5,y:545,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.2");
    p.el("rect",{x:817,y:367,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:859,y:409,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.3");
    p.el("rect",{x:901,y:367,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:943,y:409,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"1.2");
    p.el("rect",{x:985,y:367,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:1027,y:409,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"…");
    p.el("rect",{x:1069,y:367,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:1111,y:409,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.4");
    p.el("rect",{x:817,y:435,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:859,y:477,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.6");
    p.el("rect",{x:901,y:435,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:943,y:477,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.1");
    p.el("rect",{x:985,y:435,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:1027,y:477,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"…");
    p.el("rect",{x:1069,y:435,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:1111,y:477,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"1.8");
    p.el("rect",{x:817,y:503,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:859,y:545,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"1.4");
    p.el("rect",{x:901,y:503,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:943,y:545,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:985,y:503,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:1027,y:545,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"…");
    p.el("rect",{x:1069,y:503,width:84,height:68,rx:0,fill:C.orangeFill,stroke:"#EDD3BC","stroke-width":1});
    p.el('text',{x:1111,y:545,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},"−0.5");
    p.el("path",{d:"M434,468 L482,468",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el("rect",{x:506,y:404,width:204,height:128,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:608,y:477,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"LM Head");
    p.el("path",{d:"M731,468 L791,468",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:284,y:625,fill:C.blue,"font-size":31,"font-weight":600,"text-anchor":"middle"},"T × d");
    p.el('text',{x:982,y:625,fill:C.orange,"font-size":31,"font-weight":600,"text-anchor":"middle"},"T × V");
    p.el('text',{x:982,y:663,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},["각 칸 = 어휘 하나의 logit","One logit per vocabulary token"]);
    p.el('text',{x:600,y:725,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},["토큰 수 T는 유지되고, 가로축의 의미가 바뀝니다.","Token count T stays the same; the columns now represent vocabulary tokens."]);
    return [p];
  },
} satisfies FigureSpec;
