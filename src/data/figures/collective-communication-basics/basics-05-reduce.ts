import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-communication-basics",figureId:"basics-05-reduce",number:"basics-05-reduce",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["Reduce: 같은 위치의 값을 합치기","Reduce: combine matching positions"],
  subtitle:["Gather와 같은 입력에서 시작해, 이번에는 위치별 합을 계산합니다.","Use the same inputs as Gather, but sum matching positions."],
  alt:["Gather와 동일한 네 입력 배열에서 첫째 원소끼리 더해 1111, 둘째 원소끼리 더해 2222를 만든다. Reduce sum 완료 후 root인 GPU 0만 결과 [1111,2222]를 출력 버퍼에 갖는다. 입력과 결과의 원소 수는 모두 두 개이며 입력 조각을 이어 붙인 Gather와 다르다. 다른 GPU의 입력도 유지된다.","Reduce sums corresponding elements of four two-element inputs, producing [1111,2222] at root GPU 0 only."],
  caption:["입력과 결과는 모두 두 원소이며, 입력 조각을 이어 붙이는 Gather와 다릅니다.","Inputs and the result each have two elements, unlike Gather, which concatenates the pieces."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,572,1104,[48,205]);
    p.el('text',{x:48,y:205,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 전 · 입력 버퍼","Before communication · input buffers"]);
    p.el("rect",{x:48,y:229,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:244,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:267,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:222,y:244,width:72,height:30,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:258,y:266,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"middle"},"root");
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
    p.el('text',{x:48,y:604,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 완료 후 · 출력 버퍼","After completion · output buffers"]);
    p.el("rect",{x:48,y:629,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:644,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:667,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:222,y:644,width:72,height:30,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:258,y:666,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"middle"},"root");
    p.el("rect",{x:72,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:124,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1111");
    p.el("rect",{x:184,y:693,width:104,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:236,y:724,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2222");
    p.el("rect",{x:328,y:629,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:644,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:667,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:460,y:726,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["출력 대상 아님","No result here"]);
    p.el("rect",{x:608,y:629,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:644,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:667,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el('text',{x:740,y:726,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["출력 대상 아님","No result here"]);
    p.el("rect",{x:888,y:629,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:644,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:667,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el('text',{x:1020,y:726,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["출력 대상 아님","No result here"]);
    return [p];
  },
} satisfies FigureSpec;
