import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"residual-and-rmsnorm",figureId:"03-rmsnorm",number:"03-rmsnorm",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["토큰 하나의 d개 성분에 RMSNorm 적용하기","Apply RMSNorm across a token’s d components"],
  subtitle:["d개 성분에서 RMS를 구한 뒤, 각 성분을 같은 RMS로 나눕니다.","Compute the RMS across d components, then divide each component by it."],
  alt:["한 토큰의 d=4 입력 [1,−1,3,3]의 제곱 평균은 5, RMS는 √5다. γ=1이고 ε를 생략한 예시에서 출력은 약 [0.45,−0.45,1.34,1.34]다. 막대는 같은 눈금으로 부호와 크기를 비교한다. 모든 d개 성분이 RMS 계산에 참여하며, 정규화는 토큰마다 따로 적용된다. 일반 식은 ε와 성분별 학습 가중치 γ를 포함한다.","For [1,−1,3,3], the mean square is 5 and the RMS is √5. With γ=1 and ε omitted, output is approximately [0.45,−0.45,1.34,1.34]. Bars share a scale. All d components contribute to a single RMS per token. The general formula includes ε and the learned per-component weights γ."],
  caption:["d = 4와 값은 설명용입니다. 출력은 소수 둘째 자리로 반올림했으며, 막대는 반올림 전 값입니다.","Illustrative d = 4. Output labels are rounded to two decimals; bars use unrounded values."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,821,1104,[48,206]);
    p.raw("<g transform=\"translate(48 206) scale(1)\" data-panel=\"1\">");
    p.raw("<g transform=\"translate(-48 -206)\">");
    p.raw("<g transform=\"translate(48 206) scale(1)\" data-panel=\"1\">");
    p.raw("<g transform=\"translate(-48 -205)\">");
    p.el('text',{x:250,y:223,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["입력 벡터 x","Input vector x"]);
    p.el('text',{x:950,y:223,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["RMSNorm 출력","RMSNorm output"]);
    p.el("path",{d:"M70,274 V266 H430 V274",fill:"none",stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:250,y:253,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"d = 4");
    p.el("path",{d:"M770,274 V266 H1130 V274",fill:"none",stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:950,y:253,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"d = 4");
    p.el("rect",{x:70,y:284,width:90,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:115,y:323,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:160,y:284,width:90,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:205,y:323,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−1");
    p.el("rect",{x:250,y:284,width:90,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:295,y:323,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:340,y:284,width:90,height:60,rx:0,fill:C.blueFill,stroke:"#C8DCEE","stroke-width":1});
    p.el('text',{x:385,y:323,fill:C.blue,"font-size":28,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:770,y:284,width:90,height:60,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:815,y:323,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"0.45");
    p.el("rect",{x:860,y:284,width:90,height:60,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:905,y:323,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"−0.45");
    p.el("rect",{x:950,y:284,width:90,height:60,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:995,y:323,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1.34");
    p.el("rect",{x:1040,y:284,width:90,height:60,rx:0,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1});
    p.el('text',{x:1085,y:323,fill:C.teal,"font-size":28,"font-weight":400,"text-anchor":"middle"},"1.34");
    p.el('text',{x:600,y:272,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"÷ √5");
    p.el("path",{d:"M464,314 L736,314",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:600,y:360,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},"√5 ≈ 2.24");
    p.el('text',{x:600,y:393,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["같은 값으로 나누기","One divisor for all d values"]);
    p.el("path",{d:"M70,532 L430,532",fill:"none",stroke:C.slate,"stroke-width":1.5});
    p.el('text',{x:58,y:539,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"end"},"0");
    p.el("rect",{x:92,y:497,width:46,height:35,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:115,y:605,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:182,y:532,width:46,height:35,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:205,y:605,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:272,y:427,width:46,height:105,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:295,y:605,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:362,y:427,width:46,height:105,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:385,y:605,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"4");
    p.el("path",{d:"M770,532 L1130,532",fill:"none",stroke:C.slate,"stroke-width":1.5});
    p.el('text',{x:758,y:539,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"end"},"0");
    p.el("rect",{x:792,y:516.3475241575014,width:46,height:15.652475842498527,rx:4,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:815,y:605,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:882,y:532,width:46,height:15.652475842498527,rx:4,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:905,y:605,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:972,y:485.0425724725044,width:46,height:46.95742752749558,rx:4,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:995,y:605,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:1062,y:485.0425724725044,width:46,height:46.95742752749558,rx:4,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1085,y:605,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"4");
    p.el('text',{x:600,y:640,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["가로축: d개의 성분 위치 · 좌우 막대는 같은 눈금입니다.","Horizontal axis: the d component positions. Both charts use the same scale."]);
    p.el("rect",{x:48,y:660,width:1104,height:132,rx:14,fill:C.tealFill,stroke:"#C8DFDA","stroke-width":1.5});
    p.el('text',{x:80,y:700,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"start"},["d개 성분으로 RMS 하나를 구합니다.","Compute one RMS from all d components."]);
    p.el('text',{x:80,y:752,fill:C.teal,"font-size":30,"font-weight":400,"text-anchor":"start"},"√((1² + (−1)² + 3² + 3²) / d) = √(20 / 4) = √5");
    p.el('text',{x:80,y:833,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["γ(감마)는 학습 가능한 가중치 벡터이며, 성분별로 곱합니다.","γ (gamma) is a learned weight vector, multiplied component by component."]);
    p.el('text',{x:80,y:870,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["위 예시는 나누기의 효과를 보이기 위해 γ = [1, 1, 1, 1]로 설정했습니다.","Above, γ = [1, 1, 1, 1] to show the effect of dividing by the RMS."]);
    p.el('text',{x:80,y:907,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["분모가 0이 되지 않도록 더하는 작은 값 ε는 이 예시에서 생략했습니다.","The small ε term that prevents a zero denominator is omitted in this example."]);
    p.raw("<text x=\"600\" y=\"962\" fill=\"#287D78\" font-size=\"30\" font-weight=\"600\" text-anchor=\"middle\">y<tspan baseline-shift=\"sub\" font-size=\"70%\">i</tspan> = x<tspan baseline-shift=\"sub\" font-size=\"70%\">i</tspan> / √((x<tspan baseline-shift=\"sub\" font-size=\"70%\">1</tspan>² + … + x<tspan baseline-shift=\"sub\" font-size=\"70%\">d</tspan>²) / d + ε) × γ<tspan baseline-shift=\"sub\" font-size=\"70%\">i</tspan></text>");
    p.el('text',{x:600,y:1010,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["토큰마다 따로 적용 · 입력과 출력 모두 d차원","Applied separately to each token · d dimensions in and out"]);
    p.raw('</g>');
    p.raw('</g>');
    p.raw('</g>');
    p.raw('</g>');
    return [p];
  },
} satisfies FigureSpec;
