import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"multi-gpu-execution",figureId:"01-gpus-and-interconnect",number:"01-gpus-and-interconnect",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["각 GPU에는 연산 장치와 메모리가 있습니다","Each GPU has its own compute and memory"],
  subtitle:["한 GPU 안의 데이터 이동에서 GPU 사이의 데이터 이동으로 범위를 넓힙니다.","Extend the view from data movement within one GPU to movement between GPUs."],
  alt:["GPU 0과 GPU 1 각각에 연산 장치와 HBM이 있다. 파란 왕복 화살표는 GPU 내부 메모리 이동, 보라 왕복 화살표는 두 GPU의 메모리 사이 통신을 나타낸다. 두 메모리는 하나의 자동 통합된 공간으로 그리지 않는다.","GPU 0 and GPU 1 each have compute units and HBM. Blue arrows show local memory traffic; purple arrows show communication between their memories. The memories are not depicted as one automatically pooled space."],
  caption:["두 GPU의 메모리는 자동으로 합쳐진 하나의 공간이 아닙니다. 보라 화살표는 GPU 사이의 통신입니다.","The two GPU memories are not automatically merged into one space; purple arrows show communication between GPUs."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,654,1104,[48,206]);
    p.el("rect",{x:48,y:216,width:476,height:474,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:262,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:92,y:299,width:388,height:116,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:286,y:365,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},["연산 장치","Compute units"]);
    p.el("path",{d:"M198,435 L198,511",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M236,511 L236,435",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:272,y:460,fill:C.blue,"font-size":22,"font-weight":400,"text-anchor":"start"},["GPU 내부","Local memory"]);
    p.el('text',{x:272,y:492,fill:C.blue,"font-size":22,"font-weight":400,"text-anchor":"start"},["메모리 이동","traffic"]);
    p.el("rect",{x:92,y:530,width:388,height:112,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:286,y:594,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},["자신의 메모리 · HBM","Own memory · HBM"]);
    p.el("rect",{x:676,y:216,width:476,height:474,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:704,y:262,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:720,y:299,width:388,height:116,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:914,y:365,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},["연산 장치","Compute units"]);
    p.el("path",{d:"M826,435 L826,511",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M864,511 L864,435",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:900,y:460,fill:C.blue,"font-size":22,"font-weight":400,"text-anchor":"start"},["GPU 내부","Local memory"]);
    p.el('text',{x:900,y:492,fill:C.blue,"font-size":22,"font-weight":400,"text-anchor":"start"},["메모리 이동","traffic"]);
    p.el("rect",{x:720,y:530,width:388,height:112,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:914,y:594,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},["자신의 메모리 · HBM","Own memory · HBM"]);
    p.el("path",{d:"M482,561 L718,561",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el("path",{d:"M718,610 L482,610",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el('text',{x:600,y:470,fill:C.purple,"font-size":20,"font-weight":400,"text-anchor":"middle"},["GPU 사이","Between GPUs"]);
    p.el('text',{x:600,y:500,fill:C.purple,"font-size":20,"font-weight":400,"text-anchor":"middle"},["데이터 전달","Data transfer"]);
    p.el('text',{x:600,y:593,fill:C.purple,"font-size":20,"font-weight":600,"text-anchor":"middle"},["연결 경로","Interconnect"]);
    p.el("rect",{x:48,y:727,width:1104,height:125,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:600,y:774,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"middle"},["연산과 메모리는 늘어나고, GPU 사이의 통신이 추가됩니다.","More compute and memory also introduce communication between GPUs."]);
    p.el('text',{x:600,y:817,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["다른 GPU의 데이터가 필요한 계산에는 전달과 준비 과정이 필요합니다.","A computation that needs another GPU’s data must arrange that transfer."]);
    return [p];
  },
} satisfies FigureSpec;
