import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"data-parallelism",figureId:"02-gradients",number:"02-gradients",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["학습 DP: 기울기를 맞추고 같은 갱신","Training DP: synchronize gradients and updates"],
  subtitle:["동일 크기의 입력 묶음, 묶음별 평균 손실, 단순 SGD 갱신을 가정합니다.","Assume equal local batch sizes, mean local losses, and a simple SGD update."],
  alt:["기울기 2와 6을 평균내어 4를 얻고 두 GPU 모두 가중치 10을 9.6으로 갱신합니다.","Average gradients 2 and 6 to get 4; both GPUs update weight 10 to 9.6."],
  caption:["두 GPU가 같은 가중치에서 같은 값으로 갱신하므로, 갱신 뒤에도 복제본이 일치합니다.","Both GPUs start from the same weight and apply the same update, so the replicas stay identical."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,594,1104,[48,196]);
    p.el("rect",{x:48,y:207,width:510,height:160,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:66,y:243,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:66,y:293,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 가중치 w = 10","Same weight w = 10"]);
    p.el('text',{x:66,y:325.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["입력 A → 기울기 g₀ = 2","Input A → gradient g₀ = 2"]);
    p.el("rect",{x:642,y:207,width:510,height:160,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:660,y:243,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:660,y:293,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 가중치 w = 10","Same weight w = 10"]);
    p.el('text',{x:660,y:325.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["입력 B → 기울기 g₁ = 6","Input B → gradient g₁ = 6"]);
    p.el("path",{d:"M303,378 L303,431",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M897,378 L897,431",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:446,width:1104,height:100,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:482,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["All-Reduce로 합산한 뒤 참여자 수로 나누기","All-Reduce the sum, then divide by the number of participants"]);
    p.el('text',{x:72,y:522,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"g = (2 + 6) / 2 = 4");
    p.el("path",{d:"M303,562 L303,601",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:615,width:510,height:167,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:66,y:651,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:66,y:701,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["학습률 η = 0.1","Learning rate η = 0.1"]);
    p.el('text',{x:66,y:733.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 갱신: 10 − 0.1 × 4 = 9.6","Same update: 10 − 0.1 × 4 = 9.6"]);
    p.el("path",{d:"M897,562 L897,601",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:642,y:615,width:510,height:167,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:660,y:651,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:660,y:701,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["학습률 η = 0.1","Learning rate η = 0.1"]);
    p.el('text',{x:660,y:733.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 갱신: 10 − 0.1 × 4 = 9.6","Same update: 10 − 0.1 × 4 = 9.6"]);
    return [p];
  },
} satisfies FigureSpec;
