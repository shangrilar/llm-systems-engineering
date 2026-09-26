import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"rope",figureId:"01-why-position",number:"01-why-position",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["토큰별 계산에서 위치 정보까지","From token-wise computation to position information"],
  subtitle:["지금까지의 흐름을 좁혀 보며, 위치 차이를 묻습니다.","Follow the computation and ask how position differences enter it."],
  alt:["디코더 블록에서 Attention, 그 안의 Core Attention으로 범위를 좁힌다. QK 전치는 점수, mask는 참조 범위, PV는 정보 결합이다. 토큰 3에서 한 칸 전과 두 칸 전 모두 허용되지만 위치 차이는 다르다.","Narrow the decoder block down to Attention and Core Attention. QK transpose computes scores, the mask limits access, and PV combines information. Tokens one and two positions before token 3 are both allowed, with different distances."],
  caption:["Causal mask는 순서에 따라 참조 범위를 정합니다. 위치 차이를 점수에 직접 반영하는 연산은 아닙니다.","The causal mask defines an order-based range; it does not directly encode position differences in the scores."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1212,1104,[48,206]);
    p.raw("<g transform=\"translate(48 206) scale(1)\" data-panel=\"1\">");
    p.raw("<g transform=\"translate(-48 -205)\">");
    p.el("rect",{x:48,y:215,width:1104,height:188,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:250,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"start"},["디코더 블록","Decoder block"]);
    p.el("rect",{x:76,y:273,width:518,height:102,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:335,y:310,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"middle"},["RMSNorm · MLP · Residual 덧셈","RMSNorm · MLP · residual addition"]);
    p.el('text',{x:335,y:347,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["각 토큰의 벡터에 적용","Operate on each token"]);
    p.el("rect",{x:622,y:273,width:518,height:102,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:881,y:310,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"Attention");
    p.el('text',{x:881,y:347,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["토큰 사이의 정보 결합","Combine information across tokens"]);
    p.el("rect",{x:48,y:440,width:1104,height:188,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:475,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"start"},["Attention 내부","Inside Attention"]);
    p.el("rect",{x:76,y:498,width:518,height:102,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:335,y:535,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"middle"},["Q·K·V / 출력 projection","Q, K, V / output projections"]);
    p.el('text',{x:335,y:572,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["각 토큰의 벡터에 적용","Operate on each token"]);
    p.el("rect",{x:622,y:498,width:518,height:102,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:881,y:535,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"Core Attention");
    p.el('text',{x:881,y:572,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["토큰 사이의 계산","Compute across tokens"]);
    p.el("path",{d:"M600,410 L600,432",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M600,636 L600,658",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:668,width:1104,height:222,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:705,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"start"},["Core Attention 내부","Inside Core Attention"]);
    p.el("rect",{x:76,y:734,width:304,height:125,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:228,y:771,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"QKᵀ");
    p.el('text',{x:228,y:810,fill:C.ink,"font-size":21,"font-weight":400,"text-anchor":"middle"},["Q·K의 성분을 비교","Compare Q and K"]);
    p.el('text',{x:228,y:839,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["토큰 사이의 점수","Scores between tokens"]);
    p.el("rect",{x:448,y:734,width:304,height:125,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:771,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Causal mask");
    p.el('text',{x:600,y:810,fill:C.ink,"font-size":21,"font-weight":400,"text-anchor":"middle"},["참조 가능한 위치만 남김","Keep allowed positions"]);
    p.el('text',{x:600,y:839,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["자기 자신과 이전 토큰","Self and earlier tokens"]);
    p.el("rect",{x:820,y:734,width:304,height:125,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:972,y:771,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"PV");
    p.el('text',{x:972,y:810,fill:C.ink,"font-size":21,"font-weight":400,"text-anchor":"middle"},["Value를 가중합","Take a weighted sum of V"]);
    p.el('text',{x:972,y:839,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["토큰 사이의 정보 결합","Combine token information"]);
    p.el('text',{x:600,y:948,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["토큰 3은 토큰 1과 2를 모두 참조할 수 있습니다.","Token 3 can attend to both token 1 and token 2."]);
    p.el("rect",{x:106,y:988,width:236,height:98,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:224,y:1027,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["토큰 1","Token 1"]);
    p.el('text',{x:224,y:1063,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["위치 0","Position 0"]);
    p.el("rect",{x:482,y:988,width:236,height:98,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1027,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["토큰 2","Token 2"]);
    p.el('text',{x:600,y:1063,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["위치 1","Position 1"]);
    p.el("rect",{x:858,y:988,width:236,height:98,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:976,y:1027,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["토큰 3","Token 3"]);
    p.el('text',{x:976,y:1063,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["위치 2","Position 2"]);
    p.el("path",{d:"M976,1103 V1137 H600 V1103",fill:"none",stroke:C.blue,"stroke-width":2.5,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:788,y:1174,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["한 칸 전 · 참조 가능","1 position earlier · allowed"]);
    p.el("path",{d:"M1004,1103 V1223 H224 V1103",fill:"none",stroke:C.blue,"stroke-width":2.5,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:600,y:1264,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["두 칸 전 · 참조 가능","2 positions earlier · allowed"]);
    p.el("rect",{x:48,y:1316,width:1104,height:93,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1373,fill:C.teal,"font-size":29,"font-weight":600,"text-anchor":"middle"},["이 위치 차이를 Q·K의 비교에 어떻게 반영할까?","How can the Q–K comparison reflect this difference in position?"]);
    p.raw('</g>');
    p.raw('</g>');
    return [p];
  },
} satisfies FigureSpec;
