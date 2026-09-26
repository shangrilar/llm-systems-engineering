import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-ring-tree",figureId:"02-step-1",number:"02-step-1",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["Ring: 완성된 조각을 모두에게","Ring: distribute the completed chunks"],
  subtitle:["받은 결과로 빈 위치를 채웁니다. 화살표는 보내는 조각입니다.","Fill missing positions with received results. Arrows show sent chunks."],
  alt:["Ring: 완성된 조각을 모두에게 — 전달 1단계. 받은 결과로 빈 위치를 채웁니다. 화살표는 보내는 조각입니다.","Ring: distribute the completed chunks — Transfer step 1. Fill missing positions with received results. Arrows show sent chunks."],
  caption:["완성된 조각을 Ring 순서로 전달해 빈 위치를 채웁니다. 세 단계 뒤 모든 GPU가 전체 결과를 갖습니다.","Completed pieces travel around the ring to fill the empty positions. After three steps, every GPU holds the full result."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,533,1104,[48,196]);
    p.el('text',{x:48,y:237,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["1단계","Step 1"]);
    p.el("path",{d:"M758,355 L899,432",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:935,y:389,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"A");
    p.el("path",{d:"M899,558 L758,635",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:935,y:615,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"B");
    p.el("path",{d:"M442,635 L301,558",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:265,y:615,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"C");
    p.el("path",{d:"M301,432 L442,355",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:265,y:389,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"D");
    p.el("rect",{x:450,y:269,width:300,height:114,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:600,y:293,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el('text',{x:496,y:317,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"A");
    p.el("rect",{x:464,y:325,width:64,height:30,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:496,y:346,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"1111");
    p.el('text',{x:564,y:317,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"B");
    p.el("rect",{x:532,y:325,width:64,height:30,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:564,y:346,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:632,y:317,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"C");
    p.el("rect",{x:600,y:325,width:64,height:30,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:632,y:346,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:700,y:317,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"D");
    p.el("rect",{x:668,y:325,width:64,height:30,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:668,y:325,width:64,height:30,rx:8,fill:"none",stroke:C.blue,"stroke-width":3});
    p.el('text',{x:700,y:346,fill:C.ink,"font-size":18,"font-weight":700,"text-anchor":"middle"},"4444");
    p.el('text',{x:600,y:373,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},["새로 받은 값: D = 4444","Received: D = 4444"]);
    p.el("rect",{x:780,y:438,width:300,height:114,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:930,y:462,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el('text',{x:826,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"A");
    p.el("rect",{x:794,y:494,width:64,height:30,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:794,y:494,width:64,height:30,rx:8,fill:"none",stroke:C.teal,"stroke-width":3});
    p.el('text',{x:826,y:515,fill:C.ink,"font-size":18,"font-weight":700,"text-anchor":"middle"},"1111");
    p.el('text',{x:894,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"B");
    p.el("rect",{x:862,y:494,width:64,height:30,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:894,y:515,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"2222");
    p.el('text',{x:962,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"C");
    p.el("rect",{x:930,y:494,width:64,height:30,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:962,y:515,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:1030,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"D");
    p.el("rect",{x:998,y:494,width:64,height:30,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1030,y:515,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:930,y:542,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},["새로 받은 값: A = 1111","Received: A = 1111"]);
    p.el("rect",{x:450,y:607,width:300,height:114,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:600,y:631,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"middle"},"GPU 2");
    p.el('text',{x:496,y:655,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"A");
    p.el("rect",{x:464,y:663,width:64,height:30,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:496,y:684,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:564,y:655,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"B");
    p.el("rect",{x:532,y:663,width:64,height:30,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:532,y:663,width:64,height:30,rx:8,fill:"none",stroke:C.purple,"stroke-width":3});
    p.el('text',{x:564,y:684,fill:C.ink,"font-size":18,"font-weight":700,"text-anchor":"middle"},"2222");
    p.el('text',{x:632,y:655,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"C");
    p.el("rect",{x:600,y:663,width:64,height:30,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:632,y:684,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"3333");
    p.el('text',{x:700,y:655,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"D");
    p.el("rect",{x:668,y:663,width:64,height:30,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:700,y:684,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:600,y:711,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},["새로 받은 값: B = 2222","Received: B = 2222"]);
    p.el("rect",{x:120,y:438,width:300,height:114,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:270,y:462,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},"GPU 3");
    p.el('text',{x:166,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"A");
    p.el("rect",{x:134,y:494,width:64,height:30,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:166,y:515,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:234,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"B");
    p.el("rect",{x:202,y:494,width:64,height:30,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:234,y:515,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:302,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"C");
    p.el("rect",{x:270,y:494,width:64,height:30,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:270,y:494,width:64,height:30,rx:8,fill:"none",stroke:C.orange,"stroke-width":3});
    p.el('text',{x:302,y:515,fill:C.ink,"font-size":18,"font-weight":700,"text-anchor":"middle"},"3333");
    p.el('text',{x:370,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"D");
    p.el("rect",{x:338,y:494,width:64,height:30,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:515,fill:C.ink,"font-size":18,"font-weight":400,"text-anchor":"middle"},"4444");
    p.el('text',{x:270,y:542,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},["새로 받은 값: C = 3333","Received: C = 3333"]);
    p.el('text',{x:600,y:488,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["테두리: 새로 채운 위치","Outlined: newly filled slot"]);
    p.el('text',{x:600,y:514.6,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["—: 아직 받지 않은 결과","—: result not yet received"]);
    return [p];
  },
} satisfies FigureSpec;
