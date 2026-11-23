import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"prefill-and-decode",figureId:"04-prefill-decode-roofline",number:"04-prefill-decode-roofline",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["처리 토큰 수가 선형 연산의 병목을 바꿉니다","Token count changes the bottleneck of linear operations"],
  subtitle:["가중치를 사용하는 선형 연산에 Roofline을 적용합니다.","Apply the Roofline model to linear operations that use model weights."],
  alt:["Roofline의 기울어진 대역폭 상한 아래는 memory-bound, 수평 연산 성능 상한 아래는 compute-bound 영역입니다. 작은 배치 Decode의 적은 새 토큰과 충분한 입력 Prefill의 많은 토큰을 각각 낮은 산술 강도와 높은 산술 강도의 예로 표시합니다.","The sloped bandwidth ceiling marks the memory-bound region, and the flat compute ceiling marks the compute-bound region. Few new tokens in small-batch decode and many tokens in sufficiently large prefill illustrate low and high arithmetic intensity respectively."],
  caption:["작은 배치의 Decode는 낮은 산술 강도, 입력이 충분한 Prefill은 높은 산술 강도의 예입니다.","Small-batch Decode is an example of low arithmetic intensity; Prefill with enough input, of high intensity."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,853,1104,[48,206]);
    p.el('text',{x:48,y:220,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["연산 처리량","Compute throughput"]);
    p.el("path",{d:"M145,765 L145,265",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M145,765 L1145,765",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M145,765 L705,355",fill:"none",stroke:C.blue,"stroke-width":6});
    p.el("path",{d:"M705,355 H1110",fill:"none",stroke:C.orange,"stroke-width":6});
    p.el("path",{d:"M145,355 H705 V765",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:460,y:306,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["대역폭 × 산술 강도","Bandwidth × arithmetic intensity"]);
    p.el('text',{x:920,y:306,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},["GPU 연산 성능 상한","GPU compute ceiling"]);
    p.el("circle",{cx:330,cy:629.5535714285714,r:10,fill:"white",stroke:C.ink,"stroke-width":3});
    p.el("circle",{cx:955,cy:355,r:10,fill:"white",stroke:C.ink,"stroke-width":3});
    p.el('text',{x:190,y:466,fill:C.blue,"font-size":26,"font-weight":700,"text-anchor":"start"},["작은 배치의 Decode","Small-batch decode"]);
    p.el('text',{x:190,y:505,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["적은 새 입력 토큰","Few new input tokens"]);
    p.el("path",{d:"M330,526 L330,589",stroke:C.blue,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:810,y:448,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},["충분한 입력의 Prefill","Prefill with enough input"]);
    p.el('text',{x:810,y:488,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["많은 입력 토큰","Many input tokens"]);
    p.el("path",{d:"M955,418 L955,374",stroke:C.orange,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:330,y:817,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["낮음","Low"]);
    p.el('text',{x:955,y:817,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["높음","High"]);
    p.el('text',{x:665,y:867,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["산술 강도 · FLOP/byte","Arithmetic intensity · FLOP/byte"]);
    p.el('text',{x:350,y:708,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Memory-bound");
    p.el('text',{x:917,y:708,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Compute-bound");
    p.el("path",{d:"M226,929 L1080,929",stroke:C.purple,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:654,y:975,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"middle"},["처리 토큰 수 ↑ → 가중치 재사용 ↑ → 산술 강도 ↑","More tokens → more weight reuse → higher arithmetic intensity"]);
    p.el('text',{x:48,y:1044,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["선은 처리량의 상한 · 위치는 실행 조건의 예시이며 실측값이 아닙니다.","The line is a throughput ceiling; positions illustrate conditions, not measurements."]);
    return [p];
  },
} satisfies FigureSpec;
