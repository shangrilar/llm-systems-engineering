import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"cpu-and-gpu",figureId:"04-feeding-compute",number:"04-feeding-compute",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["연산 장치가 일하려면 데이터가 필요합니다","Compute units need a supply of data"],
  subtitle:["같은 연산 장치도 데이터 공급에 따라 일하거나 기다립니다.","The same compute units may work or wait, depending on data supply."],
  alt:["같은 네 연산 장치를 비교한다. 데이터 공급이 충분한 쪽은 모두 계산하고 공급이 부족한 쪽은 하나만 계산하고 셋은 기다린다.","Two identical sets of four compute units: all work with data available; three wait when supply falls short."],
  caption:["연산 장치의 수가 같아도, 데이터를 충분히 공급하지 못하면 일부 장치는 계산하지 못하고 기다립니다.","With the same number of compute units, an insufficient data supply leaves some of them waiting instead of computing."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,710,1104,[48,206]);
    p.el("rect",{x:48,y:208,width:528,height:624,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:255,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["데이터가 공급될 때","When data is available"]);
    p.el("rect",{x:94,y:289,width:436,height:68,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:331,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["GPU 메모리","GPU memory"]);
    p.el("path",{d:"M312,362 L312,428",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:332,y:397,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"start"},["데이터 공급","Data supply"]);
    p.el("path",{d:"M142,430 H482",fill:"none",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M138,430 L138,477",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:92,y:489,width:92,height:100,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:138,y:547,fill:C.orange,"font-size":19,"font-weight":600,"text-anchor":"middle"},["연산","Compute"]);
    p.el("path",{d:"M138,595 L138,647",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M254,430 L254,477",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:208,y:489,width:92,height:100,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:254,y:547,fill:C.orange,"font-size":19,"font-weight":600,"text-anchor":"middle"},["연산","Compute"]);
    p.el("path",{d:"M254,595 L254,647",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M370,430 L370,477",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:324,y:489,width:92,height:100,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:547,fill:C.orange,"font-size":19,"font-weight":600,"text-anchor":"middle"},["연산","Compute"]);
    p.el("path",{d:"M370,595 L370,647",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M486,430 L486,477",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:440,y:489,width:92,height:100,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:486,y:547,fill:C.orange,"font-size":19,"font-weight":600,"text-anchor":"middle"},["연산","Compute"]);
    p.el("path",{d:"M486,595 L486,647",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:94,y:665,width:436,height:68,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:312,y:707,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["결과 저장","Store results"]);
    p.el('text',{x:312,y:786,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["여러 장치가 계산 중","Multiple units computing"]);
    p.el("rect",{x:624,y:208,width:528,height:624,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:255,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["데이터 공급이 부족할 때","When data supply falls short"]);
    p.el("rect",{x:670,y:289,width:436,height:68,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:331,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["GPU 메모리","GPU memory"]);
    p.el("path",{d:"M888,362 L888,428",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:908,y:397,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"start"},["데이터 공급","Data supply"]);
    p.el("path",{d:"M718,430 H1058",fill:"none",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M714,430 L714,477",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:668,y:489,width:92,height:100,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:714,y:547,fill:C.orange,"font-size":19,"font-weight":600,"text-anchor":"middle"},["연산","Compute"]);
    p.el("path",{d:"M714,595 L714,647",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M830,430 L830,477",fill:"none",stroke:C.muted,"stroke-width":1.5,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el("rect",{x:784,y:489,width:92,height:100,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:830,y:547,fill:C.muted,"font-size":19,"font-weight":600,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("path",{d:"M946,430 L946,477",fill:"none",stroke:C.muted,"stroke-width":1.5,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el("rect",{x:900,y:489,width:92,height:100,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:946,y:547,fill:C.muted,"font-size":19,"font-weight":600,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("path",{d:"M1062,430 L1062,477",fill:"none",stroke:C.muted,"stroke-width":1.5,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el("rect",{x:1016,y:489,width:92,height:100,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1062,y:547,fill:C.muted,"font-size":19,"font-weight":600,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("rect",{x:670,y:665,width:436,height:68,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:707,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["결과 저장","Store results"]);
    p.el('text',{x:888,y:786,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},["일부 장치는 데이터를 기다림","Some units wait for data"]);
    p.el('text',{x:600,y:899,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},["많은 연산 장치에 데이터를 어떻게 공급할까요?","How do we keep many compute units supplied with data?"]);
    return [p];
  },
} satisfies FigureSpec;
