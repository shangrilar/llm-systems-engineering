import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"attention-and-mlp",figureId:"01-token-information",number:"01-token-information",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["Attention과 MLP는 어느 토큰을 참조할까?","Which tokens do Attention and MLP use?"],
  subtitle:["토큰 사이에서 정보를 가져오는 계산과, 한 토큰 안의 계산을 구분합니다.","Distinguish information across token positions from computation within one token."],
  alt:["토큰 3의 출력을 강조한다. Attention은 토큰 1·2·3의 입력을 함께 참조하고, MLP는 토큰 3의 입력에만 계산을 적용한다. 변환 블록과 출력은 토큰 3의 열에 정렬되어 있으며 벡터와 같은 폭이다. 전체 입출력은 T × d이며 출력 벡터에도 d개 성분이 있다.","Output 3 is highlighted. Attention combines inputs from tokens 1, 2 and 3; MLP operates on input 3 alone. The transformation and output boxes align with token 3 and match the vector box width. The full input and output shapes remain T × d."],
  caption:["일반적인 dense Transformer 디코더의 순전파를 설명합니다. Attention 내부 연산은 생략했습니다.","A standard dense Transformer decoder forward pass. Attention internals are omitted."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,827,1104,[48,205]);
    p.el('text',{x:600,y:215,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},["토큰 3의 벡터를 바꿀 때, 어느 입력을 사용할까요?","Which inputs contribute when transforming token 3?"]);
    p.el("rect",{x:48,y:246,width:534,height:540,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:291,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},"Attention");
    p.el('text',{x:148,y:339,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 1","Token 1"]);
    p.el("rect",{x:83,y:358,width:130,height:58,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:148,y:395,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["d차원 벡터","Vector · d"]);
    p.el("path",{d:"M148,427 L432,510",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:315,y:339,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 2","Token 2"]);
    p.el("rect",{x:250,y:358,width:130,height:58,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:395,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["d차원 벡터","Vector · d"]);
    p.el("path",{d:"M315,427 L457,510",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:482,y:339,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 3","Token 3"]);
    p.el("rect",{x:417,y:358,width:130,height:58,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:482,y:395,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["d차원 벡터","Vector · d"]);
    p.el("path",{d:"M482,427 L482,510",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:417,y:524,width:130,height:60,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:482,y:561,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Attention");
    p.el("path",{d:"M482,595 L482,630",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:417,y:644,width:130,height:77,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:482,y:675,fill:C.blue,"font-size":18,"font-weight":600,"text-anchor":"middle"},["토큰 3 출력","Output · 3"]);
    p.el('text',{x:482,y:704,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["d차원 벡터","Vector · d"]);
    p.el('text',{x:315,y:757,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 1·2·3의 정보를 함께 반영합니다.","Combine information from tokens 1, 2 and 3."]);
    p.el("rect",{x:618,y:246,width:534,height:540,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:291,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},"MLP");
    p.el('text',{x:718,y:339,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 1","Token 1"]);
    p.el("rect",{x:653,y:358,width:130,height:58,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:718,y:395,fill:C.gray,"font-size":21,"font-weight":600,"text-anchor":"middle"},["d차원 벡터","Vector · d"]);
    p.el('text',{x:885,y:339,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 2","Token 2"]);
    p.el("rect",{x:820,y:358,width:130,height:58,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:885,y:395,fill:C.gray,"font-size":21,"font-weight":600,"text-anchor":"middle"},["d차원 벡터","Vector · d"]);
    p.el('text',{x:1052,y:339,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 3","Token 3"]);
    p.el("rect",{x:987,y:358,width:130,height:58,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1052,y:395,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["d차원 벡터","Vector · d"]);
    p.el("path",{d:"M1052,427 L1052,510",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:987,y:524,width:130,height:60,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1052,y:561,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},"MLP");
    p.el("path",{d:"M1052,595 L1052,630",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:987,y:644,width:130,height:77,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1052,y:675,fill:C.blue,"font-size":18,"font-weight":600,"text-anchor":"middle"},["토큰 3 출력","Output · 3"]);
    p.el('text',{x:1052,y:704,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["d차원 벡터","Vector · d"]);
    p.el('text',{x:885,y:757,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰 3의 벡터에만 계산을 적용합니다.","Apply the computation to token 3 alone."]);
    p.el('text',{x:600,y:829,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["전체 입출력은 T × d · 여기서는 토큰 3의 출력만 보여줍니다.","Both map T × d to T × d; only the output for token 3 is shown here."]);
    p.el("rect",{x:48,y:873,width:1104,height:151,rx:14,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1.5});
    p.el('text',{x:80,y:916,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"start"},["RMSNorm · Residual 덧셈 · MLP","RMSNorm · Residual addition · MLP"]);
    p.el('text',{x:80,y:956,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"start"},["각 토큰의 벡터에 독립적으로 적용됩니다.","Each operates independently on the vector at each token position."]);
    p.el('text',{x:80,y:996,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 MLP의 가중치가 모든 토큰에 동일하게 적용됩니다.","The same MLP weights are applied at every token position."]);
    return [p];
  },
} satisfies FigureSpec;
