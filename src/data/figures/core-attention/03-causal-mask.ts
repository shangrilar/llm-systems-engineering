import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"core-attention",figureId:"03-causal-mask",number:"03-causal-mask",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["마스크: 참조할 수 있는 토큰 구분","Mask: which tokens can be attended to"],
  subtitle:["Softmax 전에 미래 위치의 점수를 −∞로 바꿉니다.","Set future-position scores to −∞ before Softmax."],
  alt:["3×3 점수 행렬의 대각선 위쪽을 −∞로 만든다. 토큰 1은 토큰 1만, 토큰 2는 토큰 1과 2, 토큰 3은 토큰 1과 2와 3을 참조한다. 각 행의 참조 가능한 토큰과 차단된 미래 토큰을 따로 표시한다.","The upper triangle of the 3×3 score matrix becomes −∞. Token 1 attends only to itself; token 2 to tokens 1 and 2; token 3 to tokens 1, 2 and 3. Separate rows show allowed and blocked tokens."],
  caption:["Head 1 · T = 3 · dh = 4 · 실제 모델의 값이 아닌 설명용 수치입니다.","Head 1 · T = 3 · dh = 4 · Illustrative values, not actual model outputs."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1168,1104,[48,205]);
    p.el("rect",{x:48,y:197,width:1104,height:62,rx:14,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1.5});
    p.el('text',{x:80,y:237,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"start"},["Head 1 확대 · Head 2도 같은 순서로 독립적으로 계산합니다.","Inside Head 1 · Head 2 follows the same steps independently."]);
    p.el('text',{x:600,y:315,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},["각 토큰은 자기 자신과 이전 토큰만 참조합니다.","Each token can attend to itself and earlier tokens."]);
    p.el('text',{x:300,y:377,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["스케일링한 점수","Scaled scores"]);
    p.el("rect",{x:165,y:435,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:210,y:478,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"-1");
    p.el("rect",{x:255,y:435,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:300,y:478,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:345,y:435,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:390,y:478,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"1.5");
    p.el("rect",{x:165,y:503,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:210,y:546,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:255,y:503,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:300,y:546,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"1.5");
    p.el("rect",{x:345,y:503,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:390,y:546,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"-1");
    p.el("rect",{x:165,y:571,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:210,y:614,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:255,y:571,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:300,y:614,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:345,y:571,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:390,y:614,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"3");
    p.el('text',{x:210,y:416,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"1");
    p.el('text',{x:300,y:416,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"2");
    p.el('text',{x:390,y:416,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"3");
    p.el('text',{x:148,y:477,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"1");
    p.el('text',{x:148,y:545,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"2");
    p.el('text',{x:148,y:613,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"3");
    p.el("path",{d:"M492,537 L699,537",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:600,y:496,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Causal mask");
    p.el('text',{x:890,y:377,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["마스크 적용 후","After masking"]);
    p.el("rect",{x:755,y:435,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:800,y:478,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"-1");
    p.el("rect",{x:845,y:435,width:90,height:68,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:890,y:478,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},"−∞");
    p.el("rect",{x:935,y:435,width:90,height:68,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:980,y:478,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},"−∞");
    p.el("rect",{x:755,y:503,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:800,y:546,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:845,y:503,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:890,y:546,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"1.5");
    p.el("rect",{x:935,y:503,width:90,height:68,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:980,y:546,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},"−∞");
    p.el("rect",{x:755,y:571,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:800,y:614,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:845,y:571,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:890,y:614,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:935,y:571,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:980,y:614,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"3");
    p.el('text',{x:800,y:416,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"1");
    p.el('text',{x:890,y:416,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"2");
    p.el('text',{x:980,y:416,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"3");
    p.el('text',{x:738,y:477,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"1");
    p.el('text',{x:738,y:545,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"2");
    p.el('text',{x:738,y:613,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"3");
    p.el('text',{x:600,y:695,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["행 = Query 토큰 · 열 = Key 토큰 · 미래 위치의 점수는 −∞","Rows = Query tokens · columns = Key tokens · future scores = −∞"]);
    p.el("path",{d:"M48,741 L1152,741",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:90,y:832,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"start"},["토큰 1","Token 1"]);
    p.el('text',{x:90,y:872,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["참조 범위","can attend to"]);
    p.el("rect",{x:335,y:793,width:205,height:95,rx:14,fill:C.blueFill,stroke:"#AFCDE8","stroke-width":1.5});
    p.el('text',{x:437.5,y:832,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 1","Token 1"]);
    p.el('text',{x:437.5,y:869,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["참조 가능","Allowed"]);
    p.el("rect",{x:590,y:793,width:205,height:95,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:692.5,y:832,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 2","Token 2"]);
    p.el('text',{x:692.5,y:869,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["미래 · 제외","Future · blocked"]);
    p.el("rect",{x:845,y:793,width:205,height:95,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:947.5,y:832,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 3","Token 3"]);
    p.el('text',{x:947.5,y:869,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["미래 · 제외","Future · blocked"]);
    p.el('text',{x:335,y:930,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["자기 자신만 참조합니다.","Only token 1."]);
    p.el('text',{x:90,y:1017,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"start"},["토큰 2","Token 2"]);
    p.el('text',{x:90,y:1057,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["참조 범위","can attend to"]);
    p.el("rect",{x:335,y:978,width:205,height:95,rx:14,fill:C.blueFill,stroke:"#AFCDE8","stroke-width":1.5});
    p.el('text',{x:437.5,y:1017,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 1","Token 1"]);
    p.el('text',{x:437.5,y:1054,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["참조 가능","Allowed"]);
    p.el("rect",{x:590,y:978,width:205,height:95,rx:14,fill:C.blueFill,stroke:"#AFCDE8","stroke-width":1.5});
    p.el('text',{x:692.5,y:1017,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 2","Token 2"]);
    p.el('text',{x:692.5,y:1054,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["참조 가능","Allowed"]);
    p.el("rect",{x:845,y:978,width:205,height:95,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:947.5,y:1017,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 3","Token 3"]);
    p.el('text',{x:947.5,y:1054,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["미래 · 제외","Future · blocked"]);
    p.el('text',{x:335,y:1115,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["토큰 1과 2를 참조합니다.","Tokens 1 and 2."]);
    p.el('text',{x:90,y:1202,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"start"},["토큰 3","Token 3"]);
    p.el('text',{x:90,y:1242,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["참조 범위","can attend to"]);
    p.el("rect",{x:335,y:1163,width:205,height:95,rx:14,fill:C.blueFill,stroke:"#AFCDE8","stroke-width":1.5});
    p.el('text',{x:437.5,y:1202,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 1","Token 1"]);
    p.el('text',{x:437.5,y:1239,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["참조 가능","Allowed"]);
    p.el("rect",{x:590,y:1163,width:205,height:95,rx:14,fill:C.blueFill,stroke:"#AFCDE8","stroke-width":1.5});
    p.el('text',{x:692.5,y:1202,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 2","Token 2"]);
    p.el('text',{x:692.5,y:1239,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["참조 가능","Allowed"]);
    p.el("rect",{x:845,y:1163,width:205,height:95,rx:14,fill:C.blueFill,stroke:"#AFCDE8","stroke-width":1.5});
    p.el('text',{x:947.5,y:1202,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 3","Token 3"]);
    p.el('text',{x:947.5,y:1239,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["참조 가능","Allowed"]);
    p.el('text',{x:335,y:1300,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["토큰 1, 2, 3을 참조합니다.","Tokens 1, 2 and 3."]);
    p.el('text',{x:600,y:1358,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["마스크 M의 값: 참조 가능 위치는 0, 제외할 위치는 −∞","Mask M values: 0 for allowed positions, −∞ for blocked positions"]);
    return [p];
  },
} satisfies FigureSpec;
