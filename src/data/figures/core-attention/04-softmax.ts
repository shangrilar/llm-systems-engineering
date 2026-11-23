import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"core-attention",figureId:"04-softmax",number:"04-softmax",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Softmax: 점수를 가중치로 바꾸기","Softmax: turn scores into weights"],
  subtitle:["P = softmax(S / √dh + M) · 각 행에 적용","P = softmax(S / √dh + M) · applied to each row"],
  alt:["마스크 적용 점수 각 행에 Softmax를 적용한다. P의 행은 [1,0,0], [0.818,0.182,0], [0.114,0.042,0.844]다. 토큰 3 행에서 점수 1,0,3를 지수화하고 합으로 나누는 과정과 가중치 막대를 보여준다.","Apply Softmax to each masked score row. Rows of P are [1,0,0], [0.818,0.182,0], [0.114,0.042,0.844]. The token-3 example exponentiates scores 1,0,3 and divides by their sum, then compares the weights with bars."],
  caption:["Head 1 · P는 소수점 셋째 자리까지 반올림했습니다.","Head 1 · P is rounded to three decimal places."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1091,1104,[48,205]);
    p.el("rect",{x:48,y:197,width:1104,height:62,rx:14,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1.5});
    p.el('text',{x:80,y:237,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"start"},["Head 1 확대 · Head 2도 같은 순서로 독립적으로 계산합니다.","Inside Head 1 · Head 2 follows the same steps independently."]);
    p.el('text',{x:600,y:315,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},["Query 토큰 하나마다, 한 행 안에서 가중치를 계산합니다.","Compute weights within each row, one Query token at a time."]);
    p.el('text',{x:285,y:383,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["마스크 적용 점수","Masked scores"]);
    p.el("rect",{x:150,y:440,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:195,y:483,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"-1");
    p.el("rect",{x:240,y:440,width:90,height:68,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:285,y:483,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},"−∞");
    p.el("rect",{x:330,y:440,width:90,height:68,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:375,y:483,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},"−∞");
    p.el("rect",{x:150,y:508,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:195,y:551,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:240,y:508,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:285,y:551,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"1.5");
    p.el("rect",{x:330,y:508,width:90,height:68,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:375,y:551,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},"−∞");
    p.el("rect",{x:150,y:576,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:195,y:619,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:240,y:576,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:285,y:619,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:330,y:576,width:90,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:375,y:619,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"3");
    p.el('text',{x:132,y:482,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"1");
    p.el('text',{x:132,y:550,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"2");
    p.el('text',{x:132,y:618,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"3");
    p.el('text',{x:195,y:420,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"1");
    p.el('text',{x:285,y:420,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"2");
    p.el('text',{x:375,y:420,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("path",{d:"M473,540 L682,540",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:578,y:497,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"Softmax");
    p.el('text',{x:885,y:383,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["Attention 가중치 P","Attention weights P"]);
    p.el("rect",{x:750,y:440,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:800,y:483,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:850,y:440,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:900,y:483,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:950,y:440,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:1000,y:483,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:750,y:508,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:800,y:551,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0.818");
    p.el("rect",{x:850,y:508,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:900,y:551,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0.182");
    p.el("rect",{x:950,y:508,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:1000,y:551,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("rect",{x:750,y:576,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:800,y:619,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0.114");
    p.el("rect",{x:850,y:576,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:900,y:619,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0.042");
    p.el("rect",{x:950,y:576,width:100,height:68,rx:0,fill:C.blueFill,stroke:C.line,"stroke-width":1});
    p.el('text',{x:1000,y:619,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"0.844");
    p.el('text',{x:731,y:482,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"1");
    p.el('text',{x:731,y:550,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"2");
    p.el('text',{x:731,y:618,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},"3");
    p.el('text',{x:800,y:420,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"1");
    p.el('text',{x:900,y:420,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"2");
    p.el('text',{x:1000,y:420,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"3");
    p.el('text',{x:600,y:709,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["각 행의 합 = 1 · 마스크로 제외한 위치 = 0","Each row sums to 1 · masked positions have weight 0"]);
    p.el("path",{d:"M48,760 L1152,760",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:600,y:819,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["토큰 3의 행에 집중해서 보면,","Focusing on the row for token 3,"]);
    p.el('text',{x:600,y:875,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},"[1, 0, 3] → [e¹, e⁰, e³] ÷ (e¹ + e⁰ + e³)");
    p.el('text',{x:280,y:950,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["토큰 1","Token 1"]);
    p.el("rect",{x:190,y:990,width:180,height:175,rx:0,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:190,y:1145.015840107696,width:180,height:19.984159892304035,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:280,y:1208,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0.114");
    p.el('text',{x:600,y:950,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["토큰 2","Token 2"]);
    p.el("rect",{x:510,y:990,width:180,height:175,rx:0,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:510,y:1157.6482384265385,width:180,height:7.351761573461559,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:600,y:1208,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0.042");
    p.el('text',{x:920,y:950,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["토큰 3","Token 3"]);
    p.el("rect",{x:830,y:990,width:180,height:175,rx:0,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:830,y:1017.3359214657656,width:180,height:147.6640785342344,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:920,y:1208,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0.844");
    p.el('text',{x:600,y:1280,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["점수가 클수록 해당 토큰의 Value에 더 큰 가중치를 줍니다.","A higher score gives that token’s Value a larger weight."]);
    return [p];
  },
} satisfies FigureSpec;
