import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-ring-tree",figureId:"01-step-3",number:"01-step-3",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["Ring: 조각을 전달하며 합산하기","Ring: pass chunks and accumulate"],
  subtitle:["전체 벡터에서 합산되는 위치를 강조합니다. 화살표는 보내는 조각입니다.","The updated position is highlighted in each full vector. Arrows show sent chunks."],
  alt:["Ring: 조각을 전달하며 합산하기 — 전달 3단계. 전체 벡터에서 합산되는 위치를 강조합니다. 화살표는 보내는 조각입니다.","Ring: pass chunks and accumulate — Transfer step 3. The updated position is highlighted in each full vector. Arrows show sent chunks."],
  caption:["조각을 Ring 순서로 전달하며 같은 위치끼리 더합니다. 세 단계 뒤 GPU마다 완성된 결과 한 칸이 남습니다.","Pieces travel around the ring and are summed position by position. After three steps, each GPU holds one completed result."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,606,1104,[48,196]);
    p.el('text',{x:48,y:237,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["3단계","Step 3"]);
    p.el("path",{d:"M758,355 L899,432",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:935,y:389,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"B: 2202");
    p.el("path",{d:"M899,558 L758,635",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:935,y:615,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"C: 3033");
    p.el("path",{d:"M442,635 L301,558",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:265,y:615,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"D: 444");
    p.el("path",{d:"M301,432 L442,355",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:265,y:389,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"A: 1110");
    p.el("rect",{x:450,y:269,width:300,height:114,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:600,y:293,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el('text',{x:496,y:317,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"A");
    p.el("rect",{x:464,y:325,width:64,height:30,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:464,y:325,width:64,height:30,rx:8,fill:"none",stroke:C.blue,"stroke-width":3});
    p.el('text',{x:496,y:346,fill:C.ink,"font-size":18,"font-weight":700,"text-anchor":"middle"},"1111");
    p.el('text',{x:564,y:317,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"B");
    p.el("rect",{x:532,y:325,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:564,y:346,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"2202");
    p.el('text',{x:632,y:317,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"C");
    p.el("rect",{x:600,y:325,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:632,y:346,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"3003");
    p.el('text',{x:700,y:317,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"D");
    p.el("rect",{x:668,y:325,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:700,y:346,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"4");
    p.el('text',{x:600,y:373,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"A: 1 + 1110 = 1111");
    p.el("rect",{x:780,y:438,width:300,height:114,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:930,y:462,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el('text',{x:826,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"A");
    p.el("rect",{x:794,y:494,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:826,y:515,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"10");
    p.el('text',{x:894,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"B");
    p.el("rect",{x:862,y:494,width:64,height:30,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:862,y:494,width:64,height:30,rx:8,fill:"none",stroke:C.teal,"stroke-width":3});
    p.el('text',{x:894,y:515,fill:C.ink,"font-size":18,"font-weight":700,"text-anchor":"middle"},"2222");
    p.el('text',{x:962,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"C");
    p.el("rect",{x:930,y:494,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:962,y:515,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"3033");
    p.el('text',{x:1030,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"D");
    p.el("rect",{x:998,y:494,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1030,y:515,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"44");
    p.el('text',{x:930,y:542,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"B: 20 + 2202 = 2222");
    p.el("rect",{x:450,y:607,width:300,height:114,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:600,y:631,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"middle"},"GPU 2");
    p.el('text',{x:496,y:655,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"A");
    p.el("rect",{x:464,y:663,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:496,y:684,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"110");
    p.el('text',{x:564,y:655,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"B");
    p.el("rect",{x:532,y:663,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:564,y:684,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"200");
    p.el('text',{x:632,y:655,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"C");
    p.el("rect",{x:600,y:663,width:64,height:30,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:600,y:663,width:64,height:30,rx:8,fill:"none",stroke:C.purple,"stroke-width":3});
    p.el('text',{x:632,y:684,fill:C.ink,"font-size":18,"font-weight":700,"text-anchor":"middle"},"3333");
    p.el('text',{x:700,y:655,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"D");
    p.el("rect",{x:668,y:663,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:700,y:684,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"444");
    p.el('text',{x:600,y:711,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"C: 300 + 3033 = 3333");
    p.el("rect",{x:120,y:438,width:300,height:114,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:270,y:462,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},"GPU 3");
    p.el('text',{x:166,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"A");
    p.el("rect",{x:134,y:494,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:166,y:515,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"1110");
    p.el('text',{x:234,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"B");
    p.el("rect",{x:202,y:494,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:234,y:515,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"2200");
    p.el('text',{x:302,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"C");
    p.el("rect",{x:270,y:494,width:64,height:30,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:302,y:515,fill:C.slate,"font-size":18,"font-weight":400,"text-anchor":"middle"},"3000");
    p.el('text',{x:370,y:486,fill:C.muted,"font-size":16,"font-weight":400,"text-anchor":"middle"},"D");
    p.el("rect",{x:338,y:494,width:64,height:30,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:338,y:494,width:64,height:30,rx:8,fill:"none",stroke:C.orange,"stroke-width":3});
    p.el('text',{x:370,y:515,fill:C.ink,"font-size":18,"font-weight":700,"text-anchor":"middle"},"4444");
    p.el('text',{x:270,y:542,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"D: 4000 + 444 = 4444");
    p.el('text',{x:600,y:488,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["진한 칸: 완성된 결과 조각","Dark: completed result chunk"]);
    p.el('text',{x:600,y:514.6,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["옅은 칸: 결과가 아닌 중간값","Faded: intermediate values"]);
    p.el('text',{x:48,y:786,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},["합산 완료: GPU마다 결과 조각 하나씩 보관","Reduction complete: each GPU holds one result chunk"]);
    return [p];
  },
} satisfies FigureSpec;
