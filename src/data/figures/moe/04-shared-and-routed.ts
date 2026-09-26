import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"moe",figureId:"04-shared-and-routed",number:"04-shared-and-routed",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Shared expert: 모든 토큰에 적용하는 변환","Shared expert: a transform for every token"],
  subtitle:["Shared expert 1개 + routed expert 4개 중 Top-2","1 shared expert + Top-2 of 4 routed experts"],
  alt:["같은 세 토큰의 입력을 shared와 routed 두 경로에 보낸다. Shared expert S는 모든 토큰에 독립적으로 적용하고, routed 경로는 토큰마다 네 expert 중 두 개를 선택해 가중합 R을 만든다. 같은 토큰의 S와 R 결과를 성분별로 더해 d차원 출력 y를 만든다.","The same three inputs enter shared and routed paths. Shared expert S processes every token independently. The routed path selects two of four experts per token and produces their weighted sum R. Adding S and R for each token gives its d-dimensional output y."],
  caption:["Shared expert S는 모든 토큰에 적용하고, routed 경로의 결과 R과 같은 토큰끼리 성분별로 더합니다.", "Shared expert S applies to every token; its output is added element-wise to the routed result R of the same token."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1281,1104,[48,205]);
    p.el("rect",{x:48,y:205,width:1104,height:110,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:251,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"start"},["입력 X (3 × d)","Input X (3 × d)"]);
    p.el('text',{x:80,y:288,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},"d = 8");
    p.el("rect",{x:430,y:236,width:190,height:54,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:525,y:260,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"x₁");
    p.el('text',{x:525,y:281,fill:C.blue,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("rect",{x:660,y:236,width:190,height:54,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:755,y:260,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"x₂");
    p.el('text',{x:755,y:281,fill:C.teal,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("rect",{x:890,y:236,width:190,height:54,rx:14,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:985,y:260,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},"x₃");
    p.el('text',{x:985,y:281,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("path",{d:"M600,327 V365 H312 V404",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M600,365 H888 V404",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:48,y:420,width:528,height:580,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:464,fill:C.ink,"font-size":31,"font-weight":600,"text-anchor":"middle"},"Shared expert");
    p.el('text',{x:312,y:508,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모든 토큰에 항상 적용","Always applied to every token"]);
    p.el("rect",{x:624,y:420,width:528,height:580,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:464,fill:C.ink,"font-size":31,"font-weight":600,"text-anchor":"middle"},"Routed experts");
    p.el('text',{x:888,y:508,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["토큰마다 4개 중 2개 선택","Select 2 of 4 experts for each token"]);
    p.el("rect",{x:82,y:550,width:140,height:54,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:152,y:574,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"x₁");
    p.el('text',{x:152,y:595,fill:C.blue,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("rect",{x:242,y:550,width:140,height:54,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:574,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"x₂");
    p.el('text',{x:312,y:595,fill:C.teal,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("rect",{x:402,y:550,width:140,height:54,rx:14,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:472,y:574,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},"x₃");
    p.el('text',{x:472,y:595,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("path",{d:"M312,615 L312,636",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:97,y:650,width:430,height:105,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:682,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Shared expert S");
    p.el('text',{x:312,y:710,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},"Gated MLP · d → m → d");
    p.el("path",{d:"M312,768 L312,788",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:312,y:822,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["세 토큰 각각에 같은 MLP 적용","Apply the same MLP to each token"]);
    p.el("path",{d:"M312,842 L312,886",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:683,y:550,width:410,height:75,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:582,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Router");
    p.el('text',{x:888,y:610,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["expert 선택 + 가중치","Expert selection + weights"]);
    p.el("path",{d:"M888,634 L888,649",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:683,y:665,width:410,height:75,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:697,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Routed experts");
    p.el('text',{x:888,y:725,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["선택된 expert 2개 계산","Compute the 2 selected experts"]);
    p.el("path",{d:"M888,750 L888,769",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:683,y:785,width:410,height:75,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:817,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Combine");
    p.el('text',{x:888,y:845,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["같은 토큰의 결과끼리 가중합","Weighted sum for each token"]);
    p.el("path",{d:"M888,872 L888,886",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:82,y:904,width:140,height:56,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:152,y:940,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"S(x₁)");
    p.el("rect",{x:658,y:904,width:140,height:56,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:728,y:940,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"R(x₁)");
    p.el("rect",{x:242,y:904,width:140,height:56,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:940,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"S(x₂)");
    p.el("rect",{x:818,y:904,width:140,height:56,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:940,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"R(x₂)");
    p.el("rect",{x:402,y:904,width:140,height:56,rx:14,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:472,y:940,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"S(x₃)");
    p.el("rect",{x:978,y:904,width:140,height:56,rx:14,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1048,y:940,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"R(x₃)");
    p.el("path",{d:"M312,1012 V1120 H568",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M888,1012 V1120 H632",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("circle",{cx:600,cy:1120,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M591,1120 L609,1120",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M600,1111 L600,1129",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el('text',{x:600,y:1185,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["같은 토큰의 두 결과를 성분별로 더합니다.","Add the two results elementwise for the same token."]);
    p.el("path",{d:"M600,1202 L600,1235",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:48,y:1250,width:1104,height:155,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:1300,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"start"},["출력 Y (3 × d)","Output Y (3 × d)"]);
    p.el('text',{x:80,y:1343,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["각 토큰 d차원","d dimensions per token"]);
    p.el("rect",{x:430,y:1272,width:190,height:110,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:525,y:1310,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"y₁");
    p.el('text',{x:525,y:1357,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"S(x₁) + R(x₁)");
    p.el("rect",{x:660,y:1272,width:190,height:110,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:755,y:1310,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"y₂");
    p.el('text',{x:755,y:1357,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"S(x₂) + R(x₂)");
    p.el("rect",{x:890,y:1272,width:190,height:110,rx:14,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:985,y:1310,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"y₃");
    p.el('text',{x:985,y:1357,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},"S(x₃) + R(x₃)");
    p.el('text',{x:600,y:1470,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["R(x)는 그림 3에서 계산한 routed expert 결과의 가중합입니다.","R(x) is the weighted sum of routed expert outputs from Figure 3."]);
    return [p];
  },
} satisfies FigureSpec;
