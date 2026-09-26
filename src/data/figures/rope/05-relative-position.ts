import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"rope",figureId:"05-relative-position",number:"05-relative-position",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["절대 위치로 회전하고, 상대 위치로 비교하기","Rotate by absolute position, compare by relative position"],
  subtitle:["한 성분 쌍의 회전 속도: 한 칸당 30°","Rotation rate for one component pair: 30° per position"],
  alt:["같은 q=[1,0],k=[1,1]을 위치 0/1과 위치 1/2로 각각 회전한다. 두 경우 위치 차이는 1, 벡터 사이각은 75도, 내적은 약 0.366이다.","Rotate the same q=[1,0] and k=[1,1] at positions 0/1 and 1/2. Both have position difference 1, angle 75 degrees and dot product approximately 0.366."],
  caption:["회전각은 설명용입니다. 실제 모델의 주파수 설정을 나타내지 않습니다.","Angles are illustrative, not a real model’s frequency settings."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,957,1104,[48,205]);
    p.el("rect",{x:48,y:205,width:1104,height:60,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:244,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"start"},["Head 1 · 한 성분 쌍 · 회전 전 q = [1, 0], k = [1, 1]로 고정","Head 1 · one component pair · fix q = [1, 0] and k = [1, 1] before rotation"]);
    p.el("rect",{x:58,y:305,width:516,height:624,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:352,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},["Q 위치 0 · K 위치 1","Q position 0 · K position 1"]);
    p.el("path",{d:"M146,573 L486,573",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M316,403 L316,743",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:316,cy:573,r:170,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M316,573 L424.0,573.0",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M316,573 L355.5307436087194,425.4692563912806",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M381.0,573.0 A65,65 0 0 0 332.82323793166387,510.21482129121057",fill:"none",stroke:"#8191A0","stroke-width":2,"marker-end":markerUrl("#8191A0")});
    p.el('text',{x:407.23563413349206,y:510.9924356639971,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},"75°");
    p.el('text',{x:236,y:392,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Q′");
    p.el('text',{x:396,y:392,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"K′");
    p.el('text',{x:316,y:803,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"middle"},["Q 회전 0° · K 회전 30°","Q rotates 0° · K rotates 30°"]);
    p.el('text',{x:316,y:854,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},["위치 차이 = 1","Position difference = 1"]);
    p.el('text',{x:316,y:900,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["내적 ≈ 0.366","Dot product ≈ 0.366"]);
    p.el("rect",{x:626,y:305,width:516,height:624,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:352,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},["Q 위치 1 · K 위치 2","Q position 1 · K position 2"]);
    p.el("path",{d:"M714,573 L1054,573",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M884,403 L884,743",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:884,cy:573,r:170,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M884,573 L977.5307436087194,519.0",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M884,573 L844.4692563912806,425.4692563912806",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M940.2916512459885,540.5 A65,65 0 0 0 867.1767620683362,510.21482129121057",fill:"none",stroke:"#8191A0","stroke-width":2,"marker-end":markerUrl("#8191A0")});
    p.el('text',{x:928.0085947219853,y:474.75385376120204,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},"75°");
    p.el('text',{x:804,y:392,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Q′");
    p.el('text',{x:964,y:392,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"K′");
    p.el('text',{x:884,y:803,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"middle"},["Q 회전 30° · K 회전 60°","Q rotates 30° · K rotates 60°"]);
    p.el('text',{x:884,y:854,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},["위치 차이 = 1","Position difference = 1"]);
    p.el('text',{x:884,y:900,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["내적 ≈ 0.366","Dot product ≈ 0.366"]);
    p.el('text',{x:600,y:986,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},["두 벡터를 함께 30° 더 돌려도, 사이각과 내적은 같습니다.","Rotating both vectors by another 30° preserves their angle and dot product."]);
    p.el("rect",{x:48,y:1034,width:1104,height:120,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1081,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["각 벡터는 자신의 위치로 회전합니다.","Each vector rotates according to its own position."]);
    p.el('text',{x:600,y:1124,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["비교할 때는 위치 차이(K 위치 − Q 위치)가 반영됩니다.","Their comparison reflects the position difference: K position − Q position."]);
    return [p];
  },
} satisfies FigureSpec;
