import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"attention-and-mlp",figureId:"05-gate-effect",number:"05-gate-effect",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["Gate: 입력에 따라 성분별 값 조절하기","Gate: adjust components based on the input"],
  subtitle:["한 경로는 중간 값을, 다른 경로는 각 성분에 곱할 조절값을 만듭니다.","One branch produces intermediate values; the other produces their multipliers."],
  alt:["중간 벡터 중 4개 성분을 확대한다. Up 값 [2,−1,3,0.5]에 SiLU 적용 후 Gate 값 [0.1,1.5,0,2]를 성분별로 곱하면 [0.2,−1.5,0,1]이다. 첫 성분은 작아지고, 둘째와 넷째는 크기가 커지며 셋째는 0이다. 막대는 동일 눈금이며 음수는 아래로 향한다. SwiGLU의 Gate 값은 0~1로 제한되지 않으며 음수도 가능하다.","Four components are shown: Up [2,-1,3,0.5] times post-SiLU Gate [0.1,1.5,0,2] gives [0.2,-1.5,0,1]. Component 1 shrinks, 2 and 4 grow in magnitude, and 3 becomes zero. Bars share a scale and negatives extend downward. SwiGLU Gate values can exceed 1 or be negative."],
  caption:["수치는 곱셈 효과를 보여주는 설명용 예시입니다. 두 경로 모두 같은 토큰의 입력을 사용합니다.","Illustrative values showing the product. Both branches use the same token input."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1064,1104,[48,205]);
    p.el('text',{x:600,y:224,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["중간 벡터의 4개 성분을 확대합니다. Gate 값은 SiLU를 거친 값입니다.","Zoom in on four intermediate components. Gate values are after SiLU."]);
    p.el('text',{x:350,y:278,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["성분 1","Component 1"]);
    p.el('text',{x:570,y:278,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["성분 2","Component 2"]);
    p.el('text',{x:790,y:278,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["성분 3","Component 3"]);
    p.el('text',{x:1010,y:278,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["성분 4","Component 4"]);
    p.el('text',{x:70,y:351,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"start"},["Up 값 u","Up values u"]);
    p.el("rect",{x:240,y:310,width:220,height:66,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:350,y:352,fill:C.blue,"font-size":30,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:460,y:310,width:220,height:66,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:570,y:352,fill:C.blue,"font-size":30,"font-weight":400,"text-anchor":"middle"},"−1");
    p.el("rect",{x:680,y:310,width:220,height:66,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:790,y:352,fill:C.blue,"font-size":30,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:900,y:310,width:220,height:66,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:1010,y:352,fill:C.blue,"font-size":30,"font-weight":400,"text-anchor":"middle"},"0.5");
    p.el('text',{x:70,y:473,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"start"},["Gate 값 g","Gate values g"]);
    p.el("rect",{x:240,y:432,width:220,height:66,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:350,y:474,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"middle"},"0.1");
    p.el("rect",{x:460,y:432,width:220,height:66,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:570,y:474,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"middle"},"1.5");
    p.el("rect",{x:680,y:432,width:220,height:66,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:790,y:474,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:900,y:432,width:220,height:66,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:1010,y:474,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"middle"},"2");
    p.el('text',{x:70,y:615,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"start"},"u ⊙ g");
    p.el("rect",{x:240,y:574,width:220,height:66,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:350,y:616,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"middle"},"0.2");
    p.el("rect",{x:460,y:574,width:220,height:66,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:570,y:616,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"middle"},"−1.5");
    p.el("rect",{x:680,y:574,width:220,height:66,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:790,y:616,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:900,y:574,width:220,height:66,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:1010,y:616,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("path",{d:"M240,540 L1120,540",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:600,y:694,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},["입력에 따라 계산한 Gate 값이 각 성분에 곱해집니다.","Input-dependent Gate values multiply the corresponding Up values."]);
    p.el("rect",{x:48,y:737,width:1104,height:415,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:355,y:769,width:18,height:18,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:385,y:785,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"start"},["Up 값","Up value"]);
    p.el("rect",{x:655,y:769,width:18,height:18,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:685,y:785,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["곱셈 결과","Product"]);
    p.el('text',{x:350,y:842,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},["크기 감소","Smaller magnitude"]);
    p.el("path",{d:"M268,1044 L432,1044",fill:"none",stroke:C.slate,"stroke-width":1.5});
    p.el('text',{x:259,y:1050,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"end"},"0");
    p.el("rect",{x:301,y:936,width:36,height:108,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:363,y:1033.2,width:36,height:10.8,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:350,y:1131,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},"1");
    p.el('text',{x:570,y:842,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},["크기 증가","Larger magnitude"]);
    p.el("path",{d:"M488,1044 L652,1044",fill:"none",stroke:C.slate,"stroke-width":1.5});
    p.el('text',{x:479,y:1050,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"end"},"0");
    p.el("rect",{x:521,y:1044,width:36,height:54,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:583,y:1044,width:36,height:81,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:570,y:1131,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},"2");
    p.el('text',{x:790,y:842,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},["0이 됨","Zero"]);
    p.el("path",{d:"M708,1044 L872,1044",fill:"none",stroke:C.slate,"stroke-width":1.5});
    p.el('text',{x:699,y:1050,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"end"},"0");
    p.el("rect",{x:741,y:882,width:36,height:162,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("path",{d:"M803,1044 L839,1044",fill:"none",stroke:C.teal,"stroke-width":4});
    p.el('text',{x:790,y:1131,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},"3");
    p.el('text',{x:1010,y:842,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},["크기 증가","Larger magnitude"]);
    p.el("path",{d:"M928,1044 L1092,1044",fill:"none",stroke:C.slate,"stroke-width":1.5});
    p.el('text',{x:919,y:1050,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"end"},"0");
    p.el("rect",{x:961,y:1017,width:36,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:1023,y:990,width:36,height:54,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1010,y:1131,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},"4");
    p.el('text',{x:600,y:1200,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모든 막대는 같은 눈금입니다. 음수는 0 아래로 그렸습니다.","All bars share one scale. Negative values extend below zero."]);
    p.el('text',{x:600,y:1253,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},["SwiGLU의 Gate 값은 0~1로 제한되지 않으며, 음수도 가능합니다.","SwiGLU Gate values are not restricted to 0–1; they can also be negative."]);
    return [p];
  },
} satisfies FigureSpec;
