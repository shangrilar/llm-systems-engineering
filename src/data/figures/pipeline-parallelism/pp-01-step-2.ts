import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"pipeline-parallelism",figureId:"pp-01-step-2",number:"pp-01-step-2",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["모델의 레이어를 나누고, 계산의 앞뒤를 연결하기","Partition layers and connect forward and backward passes"],
  subtitle:["블록 하나 = Transformer 레이어 하나 · 화살표 = 한 입력의 계산 방향","One block = one Transformer layer · Arrows = computation direction for one input"],
  alt:["손실에서 출발해 레이어 7부터 0으로 역전파한다. 활성값 기울기를 앞 단계로 보내며 가중치 기울기는 각 GPU에서 계산한다.","Backpropagate from the loss through layers 7 to 0. Send activation gradients to the previous stage and compute weight gradients locally."],
  caption:["순전파는 GPU 0에서 GPU 3으로, 역전파는 반대 방향으로 진행합니다.","The forward pass runs from GPU 0 to GPU 3; the backward pass runs in reverse."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,592,1104,[48,196]);
    p.el('text',{x:600,y:211,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["하나의 모델 · Transformer 레이어 8개","One model · Eight Transformer layers"]);
    p.el("rect",{x:40,y:247,width:264,height:281,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:172,y:285,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el("rect",{x:60,y:326,width:94,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:107,y:385,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["층 0","Layer 0"]);
    p.el("rect",{x:190,y:326,width:94,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:237,y:385,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["층 1","Layer 1"]);
    p.el('text',{x:172,y:477,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["단계 0 · 레이어 2개","Stage 0 · Two layers"]);
    p.el("rect",{x:320,y:247,width:264,height:281,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:452,y:285,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el("rect",{x:340,y:326,width:94,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:387,y:385,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["층 2","Layer 2"]);
    p.el("rect",{x:470,y:326,width:94,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:517,y:385,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["층 3","Layer 3"]);
    p.el('text',{x:452,y:477,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["단계 1 · 레이어 2개","Stage 1 · Two layers"]);
    p.el("rect",{x:600,y:247,width:264,height:281,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:732,y:285,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},"GPU 2");
    p.el("rect",{x:620,y:326,width:94,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:667,y:385,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["층 4","Layer 4"]);
    p.el("rect",{x:750,y:326,width:94,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:797,y:385,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["층 5","Layer 5"]);
    p.el('text',{x:732,y:477,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["단계 2 · 레이어 2개","Stage 2 · Two layers"]);
    p.el("rect",{x:880,y:247,width:264,height:281,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1012,y:285,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},"GPU 3");
    p.el("rect",{x:900,y:326,width:94,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:947,y:385,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["층 6","Layer 6"]);
    p.el("rect",{x:1030,y:326,width:94,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:1077,y:385,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["층 7","Layer 7"]);
    p.el('text',{x:1012,y:477,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["단계 3 · 레이어 2개","Stage 3 · Two layers"]);
    p.el("path",{d:"M185,379 L159,379",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M335,379 L289,379",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M465,379 L439,379",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M615,379 L569,379",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M745,379 L719,379",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M895,379 L849,379",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M1025,379 L999,379",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:600,y:567,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["역전파: 손실 → GPU 3 → GPU 2 → GPU 1 → GPU 0","Backward: loss → GPU 3 → GPU 2 → GPU 1 → GPU 0"]);
    p.el("rect",{x:48,y:607,width:1104,height:100,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:643,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["GPU 경계에서는 활성값에 대한 기울기를 반대 방향으로 전달","Send gradients of activations back across GPU boundaries"]);
    p.el('text',{x:72,y:683,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["각 GPU는 자기 레이어의 가중치 기울기도 계산해 보관합니다.","Each GPU also computes and retains gradients for its own weights."]);
    p.el('text',{x:600,y:773,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["역전파 계산에는 순전파에서 얻은 값도 필요합니다.","Backward computation also needs values obtained during the forward pass."]);
    return [p];
  },
} satisfies FigureSpec;
