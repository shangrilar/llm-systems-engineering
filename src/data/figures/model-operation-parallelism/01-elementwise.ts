import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-operation-parallelism",figureId:"01-elementwise",number:"01-elementwise",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["원소별 연산: 각 출력을 독립적으로","Element-wise Operations: Independent Outputs"],
  subtitle:["각 위치의 입력만 준비되면 서로 독립적으로 계산할 수 있습니다.","Once the inputs at each position are ready, the computations are independent."],
  alt:["Residual 덧셈을 네 개의 독립적인 세로 경로로 표현한다. 1+10=11, 2+20=22, 3+30=33, 4+40=44이며 다른 위치 사이의 의존성은 없다.","Four independent paths illustrate residual addition: 1+10=11, 2+20=22, 3+30=33, and 4+40=44. There are no dependencies on results at other positions."],
  caption:["각 위치의 결과는 같은 위치의 입력만 사용하므로, 다른 위치의 결과를 기다리지 않습니다.","Each result uses only the inputs at its own position, so it never waits for results at other positions."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,650,1104,[48,206]);
    p.el('text',{x:600,y:221,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},["Residual 덧셈: 같은 위치의 두 값을 더합니다.","Residual addition: add two values at matching positions."]);
    p.el("rect",{x:188,y:252,width:196,height:473,rx:12,fill:C.blueFill,stroke:C.blueFill,"stroke-width":1.5});
    p.el('text',{x:286,y:289,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["위치 1","Position 1"]);
    p.el("rect",{x:234,y:314,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:286,y:356,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:286,y:421,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:234,y:452,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:286,y:494,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"10");
    p.el("path",{d:"M286,535 L286,609",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:234,y:627,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:286,y:669,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"11");
    p.el("rect",{x:417,y:252,width:196,height:473,rx:12,fill:C.tealFill,stroke:C.tealFill,"stroke-width":1.5});
    p.el('text',{x:515,y:289,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},["위치 2","Position 2"]);
    p.el("rect",{x:463,y:314,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:515,y:356,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"2");
    p.el('text',{x:515,y:421,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:463,y:452,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:515,y:494,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"20");
    p.el("path",{d:"M515,535 L515,609",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:463,y:627,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:515,y:669,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"22");
    p.el("rect",{x:646,y:252,width:196,height:473,rx:12,fill:C.orangeFill,stroke:C.orangeFill,"stroke-width":1.5});
    p.el('text',{x:744,y:289,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["위치 3","Position 3"]);
    p.el("rect",{x:692,y:314,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:744,y:356,fill:C.orange,"font-size":30,"font-weight":600,"text-anchor":"middle"},"3");
    p.el('text',{x:744,y:421,fill:C.orange,"font-size":30,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:692,y:452,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:744,y:494,fill:C.orange,"font-size":30,"font-weight":600,"text-anchor":"middle"},"30");
    p.el("path",{d:"M744,535 L744,609",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el("rect",{x:692,y:627,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:744,y:669,fill:C.orange,"font-size":30,"font-weight":600,"text-anchor":"middle"},"33");
    p.el("rect",{x:875,y:252,width:196,height:473,rx:12,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el('text',{x:973,y:289,fill:C.purple,"font-size":21,"font-weight":600,"text-anchor":"middle"},["위치 4","Position 4"]);
    p.el("rect",{x:921,y:314,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:973,y:356,fill:C.purple,"font-size":30,"font-weight":600,"text-anchor":"middle"},"4");
    p.el('text',{x:973,y:421,fill:C.purple,"font-size":30,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:921,y:452,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:973,y:494,fill:C.purple,"font-size":30,"font-weight":600,"text-anchor":"middle"},"40");
    p.el("path",{d:"M973,535 L973,609",fill:"none",stroke:C.purple,"stroke-width":3,"marker-end":markerUrl(C.purple)});
    p.el("rect",{x:921,y:627,width:104,height:68,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:973,y:669,fill:C.purple,"font-size":30,"font-weight":600,"text-anchor":"middle"},"44");
    p.el('text',{x:75,y:357,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"start"},["입력 A","Input A"]);
    p.el('text',{x:75,y:495,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"start"},["입력 B","Input B"]);
    p.el('text',{x:75,y:670,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"start"},["출력 C","Output C"]);
    p.el('text',{x:600,y:786,fill:C.ink,"font-size":(locale==='ko'?25:24),"font-weight":600,"text-anchor":"middle"},["C의 각 원소 = 같은 위치의 A 원소 + B 원소","Each element of C = the matching element of A + the matching element of B"]);
    p.el('text',{x:600,y:840,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},["다른 위치의 출력이 완성되기를 기다릴 필요가 없습니다.","No need to wait for outputs at other positions."]);
    return [p];
  },
} satisfies FigureSpec;
