import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-summary",figureId:"02-attention-connected",number:"02-attention-connected",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["Attention의 연산을 하나로 연결하기","Connecting the computations inside Attention"],
  subtitle:"MHA · T = 3 · d = 8 · h = 2 · dₕ = 4",
  alt:["Projection으로 만든 Q K V를 두 head로 구분한다. 각 head의 Q와 K에만 RoPE를 적용하고, Q K 내적과 스케일링, 마스크, Softmax, PV 순서로 계산한다. 각 head의 3 곱하기 4 결과를 같은 토큰 위치끼리 이어붙여 3 곱하기 8로 만들고 출력 projection을 적용한다.","Projected Q K V are separated into two heads. RoPE rotates Q and K only. Each head computes Q K scores, scaling, masking, Softmax and PV. Its 3 by 4 output is concatenated with the other head at the same token positions, then output projection produces 3 by 8."],
  caption:["각 head는 3 × 4 형태로 계산합니다. RoPE는 Q와 K에만 적용하고, V는 그대로 전달합니다.","Each head computes with 3 × 4 shapes. RoPE applies only to Q and K; V passes through unchanged."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1601,1104,[48,205]);
    p.el("rect",{x:270,y:205,width:660,height:75,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:235,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"X (3 × 8)");
    p.el('text',{x:600,y:262,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["Attention에 들어오는 토큰 벡터","Token vectors entering Attention"]);
    p.el("path",{d:"M600,294 L600,319",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:270,y:335,width:660,height:75,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:365,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Q · K · V projection");
    p.el('text',{x:600,y:392,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["같은 토큰의 성분을 변환","Transform components of the same token"]);
    p.el("path",{d:"M600,423 L600,446",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M600,433 H240 V446",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M600,433 H960 V446",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:105,y:460,width:270,height:62,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:240,y:499,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Q (3 × 8)");
    p.el("rect",{x:465,y:460,width:270,height:62,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:499,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"K (3 × 8)");
    p.el("rect",{x:825,y:460,width:270,height:62,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:960,y:499,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"V (3 × 8)");
    p.el('text',{x:600,y:577,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["각 벡터의 성분을 head별로 구분합니다.","Separate each vector’s components into heads."]);
    p.el("path",{d:"M600,592 V612 H312 V635",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M600,612 H888 V635",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:48,y:650,width:528,height:740,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:694,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},"Head 1");
    p.el("rect",{x:66,y:960,width:492,height:410,rx:14,fill:C.orangeFill,stroke:"#E7BC9F","stroke-width":1.5});
    p.el("rect",{x:66,y:720,width:140,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:136,y:750,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"Q");
    p.el('text',{x:136,y:777,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3 × 4");
    p.el("rect",{x:242,y:720,width:140,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:750,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"K");
    p.el('text',{x:312,y:777,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3 × 4");
    p.el("rect",{x:418,y:720,width:140,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:488,y:750,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"V");
    p.el('text',{x:488,y:777,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3 × 4");
    p.el("path",{d:"M136,794 L136,818",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:66,y:832,width:140,height:72,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:136,y:862,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"RoPE");
    p.el('text',{x:136,y:889,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},"Q → Q′");
    p.el("path",{d:"M312,794 L312,818",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:242,y:832,width:140,height:72,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:862,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"RoPE");
    p.el('text',{x:312,y:889,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},"K → K′");
    p.el("path",{d:"M136,916 V930 H183 V989",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M312,916 V930 H218 V989",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:340,y:985,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},"Core Attention");
    p.el("rect",{x:83,y:1002,width:318,height:80,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:242,y:1032,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Q′K′ᵀ / √dₕ");
    p.el('text',{x:242,y:1059,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3 × 3");
    p.el("path",{d:"M242,1094 L242,1111",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:83,y:1124,width:318,height:80,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:242,y:1154,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},"Mask → Softmax");
    p.el('text',{x:242,y:1181,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"middle"},"P (3 × 3)");
    p.el("path",{d:"M242,1216 V1236 H312 V1255",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:177,y:1268,width:270,height:80,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:1298,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"PV");
    p.el('text',{x:312,y:1325,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"middle"},"O₁ (3 × 4)");
    p.el("path",{d:"M488,798 V1308 H459",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:624,y:650,width:528,height:740,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:694,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},"Head 2");
    p.el("rect",{x:642,y:960,width:492,height:410,rx:14,fill:C.orangeFill,stroke:"#E7BC9F","stroke-width":1.5});
    p.el("rect",{x:642,y:720,width:140,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:712,y:750,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"Q");
    p.el('text',{x:712,y:777,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3 × 4");
    p.el("rect",{x:818,y:720,width:140,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:750,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"K");
    p.el('text',{x:888,y:777,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3 × 4");
    p.el("rect",{x:994,y:720,width:140,height:64,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1064,y:750,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"V");
    p.el('text',{x:1064,y:777,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3 × 4");
    p.el("path",{d:"M712,794 L712,818",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:642,y:832,width:140,height:72,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:712,y:862,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"RoPE");
    p.el('text',{x:712,y:889,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},"Q → Q′");
    p.el("path",{d:"M888,794 L888,818",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:818,y:832,width:140,height:72,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:862,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"RoPE");
    p.el('text',{x:888,y:889,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},"K → K′");
    p.el("path",{d:"M712,916 V930 H759 V989",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M888,916 V930 H794 V989",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:916,y:985,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},"Core Attention");
    p.el("rect",{x:659,y:1002,width:318,height:80,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:818,y:1032,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Q′K′ᵀ / √dₕ");
    p.el('text',{x:818,y:1059,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3 × 3");
    p.el("path",{d:"M818,1094 L818,1111",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:659,y:1124,width:318,height:80,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:818,y:1154,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},"Mask → Softmax");
    p.el('text',{x:818,y:1181,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"middle"},"P (3 × 3)");
    p.el("path",{d:"M818,1216 V1236 H888 V1255",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:753,y:1268,width:270,height:80,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:1298,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"PV");
    p.el('text',{x:888,y:1325,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"middle"},"O₂ (3 × 4)");
    p.el("path",{d:"M1064,798 V1308 H1035",fill:"none",stroke:C.slate,"stroke-width":2.2,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M312,1403 V1445 H570 V1476",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M888,1403 V1445 H630 V1476",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:175,y:1490,width:850,height:90,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1520,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Concat");
    p.el('text',{x:600,y:1547,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["같은 토큰 위치의 head 결과 → H (3 × 8)","Head results at the same token position → H (3 × 8)"]);
    p.el("path",{d:"M600,1594 L600,1626",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:175,y:1640,width:850,height:90,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1670,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Output projection");
    p.el('text',{x:600,y:1697,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["같은 토큰의 head 정보를 조합 → Y (3 × 8)","Combine head information within each token → Y (3 × 8)"]);
    p.el('text',{x:600,y:1790,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 간 비교와 정보 결합은 Core Attention에서 이루어집니다.","Core Attention compares tokens and combines their information."]);
    return [p];
  },
} satisfies FigureSpec;
