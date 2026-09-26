import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"rope",figureId:"02-rope-location",number:"02-rope-location",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["RoPE: Q·K를 비교하기 전에 위치 반영","RoPE: add position information before comparing Q and K"],
  subtitle:"MHA · T = 3 · d = 8 · h = 2 · dh = 4",
  alt:["projection 뒤에 head를 구분한다. 각 head의 Q와 K를 위치에 따라 회전한 뒤 core attention으로 보낸다. V에는 RoPE를 적용하지 않는다. head 출력은 이어 붙인 뒤 출력 projection을 거친다.","After projection and grouping by head, rotate Q and K by position before Core Attention. V does not receive RoPE. Concatenate the head outputs and apply the output projection."],
  caption:["RoPE는 각 토큰에 독립적으로 적용합니다. Q′K′ᵀ에서 서로 다른 토큰을 비교합니다.","RoPE operates on each token independently; Q′K′ᵀ compares different tokens."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1287,1104,[48,206]);
    p.raw("<g transform=\"translate(48 206) scale(1)\" data-panel=\"1\">");
    p.raw("<g transform=\"translate(-48 -205)\">");
    p.el("rect",{x:275,y:213,width:650,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:245,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"X · T × d = 3 × 8");
    p.el('text',{x:600,y:273,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["각 토큰의 입력 벡터","Input vector for each token"]);
    p.el("path",{d:"M600,302 L600,338",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:275,y:354,width:650,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:386,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Q·K·V projection");
    p.el('text',{x:600,y:414,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["각 토큰에서 Q·K·V 계산","Compute Q, K and V for each token"]);
    p.el("path",{d:"M600,444 L600,478",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:600,y:520,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["head별로 구분 · 아래에서는 Head 1만 표시","Group by head · only Head 1 is shown below"]);
    p.el("rect",{x:48,y:557,width:1104,height:780,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:105,y:592,width:290,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:250,y:624,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Q · 3 × 4");
    p.el('text',{x:250,y:652,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["Head 1의 세 토큰","Three tokens in Head 1"]);
    p.el("path",{d:"M250,681 L250,720",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:105,y:738,width:290,height:76,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:250,y:770,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"RoPE");
    p.el('text',{x:250,y:798,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 위치 0 · 1 · 2","Token positions 0 · 1 · 2"]);
    p.el("path",{d:"M250,832 L250,906",fill:"none",stroke:C.teal,"stroke-width":2.5,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:105,y:925,width:290,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:250,y:957,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"Q′ · 3 × 4");
    p.el('text',{x:250,y:985,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["위치에 따라 회전","Rotated by position"]);
    p.el("path",{d:"M250,1017 L250,1060",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:455,y:592,width:290,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:624,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"K · 3 × 4");
    p.el('text',{x:600,y:652,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["Head 1의 세 토큰","Three tokens in Head 1"]);
    p.el("path",{d:"M600,681 L600,720",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:455,y:738,width:290,height:76,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:770,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"RoPE");
    p.el('text',{x:600,y:798,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 위치 0 · 1 · 2","Token positions 0 · 1 · 2"]);
    p.el("path",{d:"M600,832 L600,906",fill:"none",stroke:C.teal,"stroke-width":2.5,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:455,y:925,width:290,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:957,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"K′ · 3 × 4");
    p.el('text',{x:600,y:985,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["위치에 따라 회전","Rotated by position"]);
    p.el("path",{d:"M600,1017 L600,1060",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:805,y:592,width:290,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:950,y:624,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"V · 3 × 4");
    p.el('text',{x:950,y:652,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["Head 1의 세 토큰","Three tokens in Head 1"]);
    p.el("path",{d:"M950,681 L950,720",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M950,738 L950,906",fill:"none",stroke:C.slate,"stroke-width":2});
    p.el("rect",{x:805,y:925,width:290,height:76,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:950,y:957,fill:C.gray,"font-size":27,"font-weight":600,"text-anchor":"middle"},"V · 3 × 4");
    p.el('text',{x:950,y:985,fill:C.gray,"font-size":21,"font-weight":400,"text-anchor":"middle"},["Value는 그대로","Value is unchanged"]);
    p.el("path",{d:"M950,1017 L950,1060",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:103,y:1079,width:994,height:114,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1120,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"Core Attention");
    p.el('text',{x:600,y:1162,fill:C.ink,"font-size":26,"font-weight":400,"text-anchor":"middle"},"Q′K′ᵀ / √dh → Mask → Softmax → PV");
    p.el("path",{d:"M600,1205 L600,1238",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:600,y:1282,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["Head 1 출력 O1 · 3 × 4","Head 1 output O1 · 3 × 4"]);
    p.el("path",{d:"M600,1352 L600,1390",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:85,y:1408,width:1030,height:76,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1440,fill:C.gray,"font-size":27,"font-weight":600,"text-anchor":"middle"},["각 head 결과 Concat → 출력 projection","Concat head results → output projection"]);
    p.el('text',{x:600,y:1468,fill:C.gray,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰마다 d차원 출력 · T × d = 3 × 8","d output components per token · T × d = 3 × 8"]);
    p.raw('</g>');
    p.raw('</g>');
    return [p];
  },
} satisfies FigureSpec;
