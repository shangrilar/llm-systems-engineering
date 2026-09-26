import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"rope",figureId:"04-position-and-pairs",number:"04-position-and-pairs",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["위치별 회전각, 성분 쌍별 회전 속도","Position sets the angle; each component pair has its own rate"],
  subtitle:["α = 위치 p × 회전 속도 θ · 각 성분 쌍에 적용","α = position p × rate θ · applied to each component pair"],
  alt:["같은 4차원 입력 [1,1,1,-1]을 위치 0,1,2에서 회전한다. 첫 쌍은 한 칸당 30도, 둘째 쌍은 한 칸당 10도로 회전한다. 색은 head가 아닌 성분 쌍을 구분한다.","Rotate the same four-component input [1,1,1,-1] at positions 0,1,2. The first pair rotates 30 degrees per position and the second 10. Colors distinguish component pairs, not heads."],
  caption:["회전각은 설명용입니다. 실제 모델의 주파수 설정을 나타내지 않습니다.","Angles are illustrative, not a real model’s frequency settings."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1218,1104,[48,206]);
    p.raw("<g transform=\"translate(48 206) scale(1)\" data-panel=\"1\">");
    p.raw("<g transform=\"translate(-48 -205)\">");
    p.el("rect",{x:48,y:205,width:1104,height:60,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:244,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"start"},["Head 1 · dh = 4 · 같은 입력을 고정해 위치에 따른 변화만 비교합니다.","Head 1 · dh = 4 · keep the input fixed to isolate the effect of position."]);
    p.el('text',{x:110,y:321,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["회전 전","Before rotation"]);
    p.el("rect",{x:340,y:282,width:125,height:57,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:402.5,y:319.5,fill:C.blue,"font-size":27,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:465,y:282,width:125,height:57,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:527.5,y:319.5,fill:C.blue,"font-size":27,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:590,y:282,width:125,height:57,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:652.5,y:319.5,fill:C.teal,"font-size":27,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:715,y:282,width:125,height:57,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:777.5,y:319.5,fill:C.teal,"font-size":27,"font-weight":400,"text-anchor":"middle"},"-1");
    p.el('text',{x:600,y:381,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["회색: 회전 전 · 색상: 회전 후 · 색은 성분 쌍을 구분합니다.","Gray: before rotation · color: after rotation · colors identify component pairs."]);
    p.el('text',{x:235,y:437,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 1 · 위치 0","Token 1 · position 0"]);
    p.el('text',{x:600,y:437,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 2 · 위치 1","Token 2 · position 1"]);
    p.el('text',{x:965,y:437,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 3 · 위치 2","Token 3 · position 2"]);
    p.el("rect",{x:48,y:453,width:1104,height:53,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:75,y:490,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"start"},["성분 쌍 1 · 한 칸당 30°","Component pair 1 · 30° per position"]);
    p.el("path",{d:"M115,643 L355,643",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M235,523 L235,763",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:235,cy:643,r:120,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M235,643 L307,571",fill:"none",stroke:C.slate,"stroke-width":1.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M235,643 L307.0,571.0",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:235,y:805,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"α = 0°");
    p.el('text',{x:235,y:849,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[1, 1]");
    p.el("path",{d:"M480,643 L720,643",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M600,523 L600,763",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:600,cy:643,r:120,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M600,643 L672,571",fill:"none",stroke:C.slate,"stroke-width":1.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M600,643 L626.3538290724796,544.6461709275204",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:600,y:805,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"α = 30°");
    p.el('text',{x:600,y:849,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[0.366, 1.366]");
    p.el("path",{d:"M845,643 L1085,643",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M965,523 L965,763",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:965,cy:643,r:120,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M965,643 L1037,571",fill:"none",stroke:C.slate,"stroke-width":1.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M965,643 L938.6461709275204,544.6461709275204",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:965,y:805,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"α = 60°");
    p.el('text',{x:965,y:849,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[-0.366, 1.366]");
    p.el("rect",{x:48,y:877,width:1104,height:53,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:75,y:914,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"start"},["성분 쌍 2 · 한 칸당 10°","Component pair 2 · 10° per position"]);
    p.el("path",{d:"M115,1067 L355,1067",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M235,947 L235,1187",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:235,cy:1067,r:120,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M235,1067 L307,1139",fill:"none",stroke:C.slate,"stroke-width":1.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M235,1067 L307.0,1139.0",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:235,y:1229,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"α = 0°");
    p.el('text',{x:235,y:1273,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[1, -1]");
    p.el("path",{d:"M480,1067 L720,1067",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M600,947 L600,1187",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:600,cy:1067,r:120,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M600,1067 L672,1139",fill:"none",stroke:C.slate,"stroke-width":1.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M600,1067 L683.408827008898,1125.40348942486",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:600,y:1229,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"α = 10°");
    p.el('text',{x:600,y:1273,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[1.158, -0.811]");
    p.el("path",{d:"M845,1067 L1085,1067",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M965,947 L965,1187",fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("circle",{cx:965,cy:1067,r:120,fill:"none",stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M965,1067 L1037,1139",fill:"none",stroke:C.slate,"stroke-width":1.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M965,1067 L1057.2833190160336,1110.0324183771372",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:965,y:1229,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"middle"},"α = 20°");
    p.el('text',{x:965,y:1273,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[1.282, -0.598]");
    p.el("rect",{x:48,y:1345,width:1104,height:70,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1389,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},["두 쌍을 다시 놓으면 네 성분 · 입출력 차원 dh = 4 유지","Place both pairs together: four components in, four components out"]);
    p.raw('</g>');
    p.raw('</g>');
    return [p];
  },
} satisfies FigureSpec;
