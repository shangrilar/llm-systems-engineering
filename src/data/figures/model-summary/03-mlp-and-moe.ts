import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-summary",figureId:"03-mlp-and-moe",number:"03-mlp-and-moe",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["같은 자리에 놓이는 MLP와 MoE","MLP and MoE in the same position"],
  subtitle:["토큰 하나를 어떻게 변환할까요? 두 구조 모두 d차원으로 돌아옵니다.","How is one token transformed? Both structures return to d dimensions."],
  alt:["왼쪽 Gated MLP는 Gate projection과 SiLU, Up projection 결과의 성분별 곱, Down projection으로 이어진다. 오른쪽 MoE는 Router가 고른 두 Gated MLP expert의 결과를 가중합하며 선택적으로 shared expert 결과를 더한다. 둘 다 한 토큰의 d차원 입력에서 d차원 출력을 만든다.","A gated MLP uses Gate projection and SiLU, Up projection, their elementwise product, then Down projection. MoE takes a weighted sum of two selected gated MLP experts and optionally adds a shared expert output. Both map one d-dimensional token input to a d-dimensional output."],
  caption:["Gated MLP와 MoE 모두 한 토큰의 d차원 입력에서 d차원 출력을 만듭니다.", "Both the gated MLP and MoE turn one token’s d-dimensional input into a d-dimensional output."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1352,1104,[48,205]);
    p.el("rect",{x:48,y:285,width:528,height:1145,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:331,fill:C.ink,"font-size":31,"font-weight":600,"text-anchor":"middle"},"Gated MLP");
    p.el('text',{x:312,y:376,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["모든 토큰에 같은 MLP 적용","Apply the same MLP to every token"]);
    p.el("rect",{x:192,y:425,width:240,height:72,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:455,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"x");
    p.el('text',{x:312,y:482,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["한 토큰의 d차원 입력","One token, d dimensions"]);
    p.el("rect",{x:624,y:285,width:528,height:1145,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:331,fill:C.ink,"font-size":31,"font-weight":600,"text-anchor":"middle"},"MoE");
    p.el('text',{x:888,y:376,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["토큰마다 사용할 expert 선택","Select experts for each token"]);
    p.el("rect",{x:768,y:425,width:240,height:72,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:455,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"x");
    p.el('text',{x:888,y:482,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["한 토큰의 d차원 입력","One token, d dimensions"]);
    p.el("path",{d:"M312,510 V532 H182 V548",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M312,532 H442 V548",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:69.5,y:562,width:225,height:80,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:182,y:592,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"Gate projection");
    p.el('text',{x:182,y:619,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"d → m");
    p.el("rect",{x:329.5,y:562,width:225,height:80,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:442,y:592,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"Up projection");
    p.el('text',{x:442,y:619,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"d → m");
    p.el("path",{d:"M182,655 L182,688",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:69.5,y:702,width:225,height:80,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:182,y:732,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"SiLU");
    p.el('text',{x:182,y:759,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},["성분별 활성화","Elementwise activation"]);
    p.el("path",{d:"M182,795 V900 H278",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M442,655 V900 H346",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("circle",{cx:312,cy:900,r:24,fill:"white",stroke:C.teal,"stroke-width":3});
    p.el('text',{x:312,y:909,fill:C.teal,"font-size":29,"font-weight":600,"text-anchor":"middle"},"⊙");
    p.el('text',{x:312,y:960,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["같은 성분끼리 곱하기","Multiply matching components"]);
    p.el('text',{x:312,y:995,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["m차원","m dimensions"]);
    p.el("path",{d:"M312,1010 L312,1034",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:137,y:1048,width:350,height:85,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:1078,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Down projection");
    p.el('text',{x:312,y:1105,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"m → d");
    p.el("path",{d:"M312,1146 L312,1274",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:192,y:1290,width:240,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:1320,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"y");
    p.el('text',{x:312,y:1347,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["d차원 출력","d-dimensional output"]);
    p.el("path",{d:"M888,510 V532 H806 V548",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M888,532 H1060 V728",fill:"none",stroke:C.slate,"stroke-width":2.2,"stroke-dasharray":"7 6","marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M888,518 H645 V830 H655",fill:"none",stroke:C.blue,"stroke-width":2.2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:669,y:700,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"start"},["입력 x","Input x"]);
    p.el("rect",{x:661,y:562,width:290,height:80,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:806,y:592,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Router");
    p.el('text',{x:806,y:619,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},["선택 + 가중치","Selection + weights"]);
    p.el("path",{d:"M806,655 L806,727",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:661,y:742,width:290,height:180,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:806,y:781,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["선택된 experts","Selected experts"]);
    p.el("rect",{x:677,y:806,width:118,height:85,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:736,y:836,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"E1");
    p.el('text',{x:736,y:863,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"d → d");
    p.el("rect",{x:817,y:806,width:118,height:85,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:876,y:836,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"E3");
    p.el('text',{x:876,y:863,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"d → d");
    p.el("path",{d:"M806,937 L806,1027",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:661,y:1040,width:290,height:88,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:806,y:1070,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Combine");
    p.el('text',{x:806,y:1097,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},["Router 가중치로 가중합","Sum with Router weights"]);
    p.el("rect",{x:981,y:742,width:158,height:180,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5,"stroke-dasharray":"7 6"});
    p.el('text',{x:1060,y:784,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"middle"},"Shared");
    p.el('text',{x:1060,y:815,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"middle"},"expert");
    p.el('text',{x:1060,y:858,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["선택 구성","Optional"]);
    p.el('text',{x:1060,y:894,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"d → d");
    p.el("path",{d:"M806,1142 V1210 H854",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M1060,938 V1210 H922",fill:"none",stroke:C.slate,"stroke-width":2.2,"stroke-dasharray":"7 6","marker-end":markerUrl(C.slate)});
    p.el("circle",{cx:888,cy:1210,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M879,1210 L897,1210",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M888,1201 L888,1219",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M888,1244 L888,1274",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:768,y:1290,width:240,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:1320,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"y");
    p.el('text',{x:888,y:1347,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["d차원 출력","d-dimensional output"]);
    p.el('text',{x:600,y:1494,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["각 expert의 내부도 왼쪽과 같은 Gated MLP 구조입니다.","Each expert also has the gated MLP structure shown on the left."]);
    p.el('text',{x:600,y:1542,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["점선: 일부 모델이 추가하는 Shared expert 경로 · 모든 토큰에 적용","Dashed path: an optional shared expert, applied to every token"]);
    return [p];
  },
} satisfies FigureSpec;
