import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-ring-tree",figureId:"03-step-0",number:"03-step-0",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["Tree: 모아서 더하고 다시 펼치기","Tree: reduce, then broadcast"],
  subtitle:["색과 위치는 GPU를 구별합니다. 다음 단계에서도 같은 위치를 유지합니다.","Colors and positions identify GPUs and remain fixed across steps."],
  alt:["Tree: 모아서 더하고 다시 펼치기 — 시작 상태. 색과 위치는 GPU를 구별합니다. 다음 단계에서도 같은 위치를 유지합니다.","Tree: reduce, then broadcast — Starting state. Colors and positions identify GPUs and remain fixed across steps."],
  caption:["두 단계로 GPU 0에 합산하고, 화살표를 뒤집어 두 단계로 모든 GPU에 배포합니다.","Two steps sum into GPU 0; with the arrows reversed, two more steps distribute the result to every GPU."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,517,1104,[48,196]);
    p.el('text',{x:48,y:234,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["시작 · 각 GPU의 입력","Start · input on each GPU"]);
    p.el("path",{d:"M450,370 L330,424",stroke:C.line,"stroke-width":2.5});
    p.el("path",{d:"M750,370 L870,424",stroke:C.line,"stroke-width":2.5});
    p.el("path",{d:"M910,548 L910,591",stroke:C.line,"stroke-width":2.5});
    p.el("rect",{x:426,y:258,width:348,height:106,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:600,y:292,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},"GPU 0 · root");
    p.el('text',{x:600,y:334,fill:C.ink,"font-size":21,"font-weight":700,"text-anchor":"middle"},"[1, 2, 3, 4]");
    p.el("rect",{x:116,y:431,width:348,height:106,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:290,y:465,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el('text',{x:290,y:507,fill:C.ink,"font-size":21,"font-weight":700,"text-anchor":"middle"},"[10, 20, 30, 40]");
    p.el("rect",{x:736,y:431,width:348,height:106,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:910,y:465,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"GPU 2");
    p.el('text',{x:910,y:507,fill:C.ink,"font-size":21,"font-weight":700,"text-anchor":"middle"},"[100, 200, 300, 400]");
    p.el("rect",{x:736,y:599,width:348,height:106,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:910,y:633,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},"GPU 3");
    p.el('text',{x:910,y:675,fill:C.ink,"font-size":21,"font-weight":700,"text-anchor":"middle"},"[1000, 2000, 3000, 4000]");
    p.el('text',{x:80,y:626,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 위치끼리 합산할 네 배열","Four arrays to sum position by position"]);
    return [p];
  },
} satisfies FigureSpec;
