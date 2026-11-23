import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-communication-combinations",figureId:"combinations-02-all-reduce",number:"combinations-02-all-reduce",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["All-Reduce: 합친 결과를 모두에게","All-Reduce: reduce and share"],
  subtitle:["같은 위치끼리 합산한 배열을 모든 GPU가 갖습니다.","Every GPU receives the array of position-wise sums."],
  alt:["네 GPU의 두 원소 입력 배열을 위치별로 더해 [1111,2222]를 만든다. All-Reduce sum 완료 후 모든 GPU가 같은 두 원소 결과를 갖는다. Reduce 뒤 Broadcast와 같은 결과를 설명하는 조합 관계이며 실제 알고리즘이나 경로를 지정하지 않는다.","All-Reduce sums corresponding elements of the four inputs; every GPU receives [1111,2222]."],
  caption:["Reduce 뒤 Broadcast와 같은 결과를 설명하는 관계이며, 실제 알고리즘이나 전달 경로를 지정하지 않습니다.","This describes the same result as Reduce followed by Broadcast; it does not specify the actual algorithm or path."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,672,1104,[48,205]);
    p.el('text',{x:48,y:205,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 전 · 입력 버퍼","Before communication · input buffers"]);
    p.el("rect",{x:48,y:229,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:244,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:267,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:72,y:293,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:124,y:324,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:184,y:293,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:236,y:324,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("path",{d:"M180,378 V407",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:328,y:229,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:244,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:267,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:293,width:104,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:404,y:324,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"10");
    p.el("rect",{x:464,y:293,width:104,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:516,y:324,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"20");
    p.el("path",{d:"M460,378 V407",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:608,y:229,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:244,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:267,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:293,width:104,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:684,y:324,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"100");
    p.el("rect",{x:744,y:293,width:104,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:796,y:324,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"200");
    p.el("path",{d:"M740,378 V407",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:888,y:229,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:244,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:267,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:293,width:104,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:964,y:324,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1000");
    p.el("rect",{x:1024,y:293,width:104,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1076,y:324,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2000");
    p.el("path",{d:"M1020,378 V407",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:417,width:1104,height:106,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:456,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["첫째 원소: 1 + 10 + 100 + 1000 = 1111","First element: 1 + 10 + 100 + 1000 = 1111"]);
    p.el('text',{x:600,y:493,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},["둘째 원소: 2 + 20 + 200 + 2000 = 2222","Second element: 2 + 20 + 200 + 2000 = 2222"]);
    p.el("path",{d:"M180,533 V568",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M460,533 V568",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M740,533 V568",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M1020,533 V568",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:48,y:604,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 완료 후 · 출력 버퍼","After completion · output buffers"]);
    p.el("rect",{x:48,y:629,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:644,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:667,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:72,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:124,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1111");
    p.el("rect",{x:184,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:236,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2222");
    p.el("rect",{x:328,y:629,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:644,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:667,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:404,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1111");
    p.el("rect",{x:464,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:516,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2222");
    p.el("rect",{x:608,y:629,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:644,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:667,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:684,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1111");
    p.el("rect",{x:744,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:796,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2222");
    p.el("rect",{x:888,y:629,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:644,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:667,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:964,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1111");
    p.el("rect",{x:1024,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:1076,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2222");
    p.el("rect",{x:48,y:803,width:1104,height:66,rx:12,fill:C.indigoFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:843,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"middle"},["같은 결과로 이해하기: Reduce → Broadcast","Same result as: Reduce → Broadcast"]);
    return [p];
  },
} satisfies FigureSpec;
