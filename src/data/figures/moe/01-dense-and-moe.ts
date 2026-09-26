import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"moe",figureId:"01-dense-and-moe",number:"01-dense-and-moe",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["Dense MLP와 MoE","Dense MLP and MoE"],
  subtitle:["같은 토큰의 입력으로 두 구조를 비교합니다.","Compare the two structures using the same token input."],
  alt:["왼쪽은 하나의 Gated MLP, 오른쪽은 Router와 네 expert다. 토큰 1은 E1과 E3을 선택하고 가중합한다. 두 구조 모두 d차원 입력과 출력을 유지한다.","A single gated MLP on the left; a router and four experts on the right. Token 1 selects E1 and E3 and combines their outputs with weights. Both structures preserve the d-dimensional input and output."],
  caption:["예시: expert 4개 중 Top-2 선택 · E1~E4는 서로 다른 가중치를 가진 Gated MLP입니다.","Example: Top-2 of four experts. E1–E4 are gated MLPs with different weights."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1165,1104,[48,205]);
    p.el("rect",{x:48,y:205,width:1104,height:64,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:247,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["디코더 블록의 MLP 자리를 비교합니다.","Compare the MLP part of a decoder block."]);
    p.el("rect",{x:48,y:302,width:528,height:940,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:350,fill:C.ink,"font-size":32,"font-weight":600,"text-anchor":"middle"},"Dense MLP");
    p.el('text',{x:312,y:394,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모든 토큰에 같은 MLP 적용","Apply the same MLP to every token"]);
    p.el("rect",{x:624,y:302,width:528,height:940,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:350,fill:C.ink,"font-size":32,"font-weight":600,"text-anchor":"middle"},"Sparse MoE");
    p.el('text',{x:888,y:394,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["토큰마다 일부 expert 선택","Select a subset of experts for each token"]);
    p.el("rect",{x:230,y:440,width:165,height:54,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312.5,y:464,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"x₁");
    p.el('text',{x:312.5,y:485,fill:C.blue,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("rect",{x:806,y:440,width:165,height:54,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888.5,y:464,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"x₁");
    p.el('text',{x:888.5,y:485,fill:C.blue,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("path",{d:"M312,504 L312,680",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:132,y:698,width:360,height:90,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:730,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Gated MLP");
    p.el('text',{x:312,y:758,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → m → d");
    p.el("path",{d:"M312,801 L312,1128",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:230,y:1145,width:165,height:54,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312.5,y:1169,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"y₁");
    p.el('text',{x:312.5,y:1190,fill:C.blue,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("path",{d:"M888,505 L888,537",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:758,y:553,width:260,height:80,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:585,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Router");
    p.el('text',{x:888,y:613,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["expert 선택 + 가중치","Expert selection + weights"]);
    p.el("rect",{x:647,y:760,width:108,height:125,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:701,y:807,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"E1");
    p.el('text',{x:701,y:849,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → d");
    p.el("path",{d:"M888,640 V715 H701 V750",fill:"none",stroke:C.blue,"stroke-width":2.3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M701,895 V985 H888 V1005",fill:"none",stroke:C.blue,"stroke-width":2.3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:770,y:760,width:108,height:125,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:824,y:807,fill:C.gray,"font-size":27,"font-weight":600,"text-anchor":"middle"},"E2");
    p.el('text',{x:824,y:849,fill:C.gray,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → d");
    p.el("rect",{x:893,y:760,width:108,height:125,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:947,y:807,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"E3");
    p.el('text',{x:947,y:849,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → d");
    p.el("path",{d:"M888,640 V715 H947 V750",fill:"none",stroke:C.blue,"stroke-width":2.3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M947,895 V985 H888 V1005",fill:"none",stroke:C.blue,"stroke-width":2.3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:1016,y:760,width:108,height:125,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1070,y:807,fill:C.gray,"font-size":27,"font-weight":600,"text-anchor":"middle"},"E4");
    p.el('text',{x:1070,y:849,fill:C.gray,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → d");
    p.el('text',{x:720,y:940,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"start"},"× 0.27");
    p.el('text',{x:966,y:940,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"start"},"× 0.73");
    p.el("rect",{x:718,y:1020,width:340,height:80,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:1052,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["가중합","Weighted sum"]);
    p.el('text',{x:888,y:1080,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["가중치를 곱한 결과를 더함","Add the two weighted results"]);
    p.el("path",{d:"M888,1108 L888,1133",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:806,y:1145,width:165,height:54,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888.5,y:1169,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"y₁");
    p.el('text',{x:888.5,y:1190,fill:C.blue,"font-size":18,"font-weight":400,"text-anchor":"middle"},["d차원","d dimensions"]);
    p.el("rect",{x:48,y:1290,width:1104,height:72,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1336,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["MLP 하나를 쓰거나 여러 expert를 선택해도, 입력과 출력은 d차원입니다.","With one MLP or selected experts, both input and output have d components."]);
    return [p];
  },
} satisfies FigureSpec;
