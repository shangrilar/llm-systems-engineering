import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"rope",figureId:"03-pair-rotation",number:"03-pair-rotation",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["두 성분을 회전한다는 의미","What it means to rotate two components"],
  subtitle:["두 수를 평면 위 벡터의 좌표로 봅니다.","View two numbers as the coordinates of a vector in a plane."],
  alt:["한 쌍 [1,1]을 평면에 그리고 30도 회전하면 약 [0.366,1.366]이 된다. 회전 전후 길이 제곱은 모두 2다. 회전은 cos와 sin을 곱해 두 성분을 조합하는 계산이다.","Rotate the pair [1,1] by 30 degrees to obtain approximately [0.366,1.366]. Squared length stays 2. The two components are combined using cosine and sine."],
  caption:["회전각은 설명용입니다. 실제 모델의 주파수 설정을 나타내지 않습니다.","Angles are illustrative, not a real model’s frequency settings."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,959,1104,[48,205]);
    p.el("rect",{x:48,y:205,width:1104,height:60,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:244,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"start"},["Head 1 · 네 성분 중 한 쌍 [a, b]를 확대합니다.","Head 1 · focus on one pair [a, b] of the four components."]);
    p.el('text',{x:320,y:337,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},["회전 전","Before rotation"]);
    p.el("path",{d:"M144,536 L496,536",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M320,360 L320,712",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:320,cy:536,r:176,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:880,y:337,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},["30° 회전 후","After a 30° rotation"]);
    p.el("path",{d:"M704,536 L1056,536",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M880,360 L880,712",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:880,cy:536,r:176,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M320,536 L430,426",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M880,536 L990,426",fill:"none",stroke:C.slate,"stroke-width":2,"marker-end":markerUrl(C.slate)});
    p.el("path",{d:"M880,536 L920.2627944162882,385.7372055837118",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M938.6898628384835,477.31013716151654 A83,83 0 0 0 901.4819807435092,455.8281564180073",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:981,y:477,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"start"},"30°");
    p.el('text',{x:320,y:772,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"[a, b] = [1, 1]");
    p.el('text',{x:880,y:772,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"[a′, b′] ≈ [0.366, 1.366]");
    p.el("path",{d:"M552,536 L648,536",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:48,y:819,width:1104,height:78,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:869,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["두 성분의 값은 달라지고, 벡터의 길이는 유지됩니다.","The two values change, while the vector’s length stays the same."]);
    p.el('text',{x:600,y:956,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["회전각 α에 따른 두 성분의 계산","Computing the two components for rotation angle α"]);
    p.el('text',{x:600,y:1018,fill:C.ink,"font-size":32,"font-weight":600,"text-anchor":"middle"},"a′ = a cos α − b sin α");
    p.el('text',{x:600,y:1076,fill:C.ink,"font-size":32,"font-weight":600,"text-anchor":"middle"},"b′ = a sin α + b cos α");
    p.el('text',{x:600,y:1147,fill:C.muted,"font-size":27,"font-weight":400,"text-anchor":"middle"},"a′² + b′² = a² + b² = 2");
    return [p];
  },
} satisfies FigureSpec;
