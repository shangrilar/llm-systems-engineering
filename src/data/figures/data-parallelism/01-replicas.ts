import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"data-parallelism",figureId:"01-replicas",number:"01-replicas",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["DP: 같은 모델, 서로 다른 입력","DP: same model, different inputs"],
  subtitle:["고정 가중치의 일반적인 dense 모델 추론 예시입니다.","An example of ordinary dense-model inference with fixed weights."],
  alt:["네 GPU가 모델 W 전체를 각각 보관하며 요청 A부터 D까지 따로 계산합니다.","Each GPU stores full model W and independently processes one of requests A–D."],
  caption:["나누는 것은 모델이 아니라 입력이므로, 기본 DP만으로는 GPU당 가중치 메모리가 줄지 않습니다.","DP splits inputs, not the model, so basic DP alone does not reduce weight memory per GPU."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,622,1104,[48,196]);
    p.el('text',{x:48,y:212,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["같은 모델 W를 네 벌 보관","Four copies of the same model W"]);
    p.el("rect",{x:48,y:249,width:264,height:125,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:66,y:285,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},["요청 A","Request A"]);
    p.el('text',{x:66,y:335,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
    p.el("path",{d:"M180,386 L180,427",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:439,width:264,height:178,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:66,y:475,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:66,y:525,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["전체 모델 W","Full model W"]);
    p.el('text',{x:66,y:557.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["자기 요청 계산","Own request"]);
    p.el("path",{d:"M180,630 L180,673",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:685,width:264,height:125,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:66,y:721,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},["결과 A","Result A"]);
    p.el('text',{x:66,y:771,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
    p.el("rect",{x:328,y:249,width:264,height:125,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:346,y:285,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},["요청 B","Request B"]);
    p.el('text',{x:346,y:335,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
    p.el("path",{d:"M460,386 L460,427",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:328,y:439,width:264,height:178,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:346,y:475,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:346,y:525,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["전체 모델 W","Full model W"]);
    p.el('text',{x:346,y:557.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["자기 요청 계산","Own request"]);
    p.el("path",{d:"M460,630 L460,673",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:328,y:685,width:264,height:125,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:346,y:721,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},["결과 B","Result B"]);
    p.el('text',{x:346,y:771,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
    p.el("rect",{x:608,y:249,width:264,height:125,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:626,y:285,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},["요청 C","Request C"]);
    p.el('text',{x:626,y:335,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
    p.el("path",{d:"M740,386 L740,427",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:608,y:439,width:264,height:178,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:626,y:475,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el('text',{x:626,y:525,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["전체 모델 W","Full model W"]);
    p.el('text',{x:626,y:557.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["자기 요청 계산","Own request"]);
    p.el("path",{d:"M740,630 L740,673",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:608,y:685,width:264,height:125,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:626,y:721,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},["결과 C","Result C"]);
    p.el('text',{x:626,y:771,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
    p.el("rect",{x:888,y:249,width:264,height:125,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:906,y:285,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},["요청 D","Request D"]);
    p.el('text',{x:906,y:335,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
    p.el("path",{d:"M1020,386 L1020,427",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:888,y:439,width:264,height:178,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:906,y:475,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el('text',{x:906,y:525,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["전체 모델 W","Full model W"]);
    p.el('text',{x:906,y:557.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["자기 요청 계산","Own request"]);
    p.el("path",{d:"M1020,630 L1020,673",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:888,y:685,width:264,height:125,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:906,y:721,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},["결과 D","Result D"]);
    p.el('text',{x:906,y:771,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
    return [p];
  },
} satisfies FigureSpec;
