import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-communication-basics",figureId:"basics-03-scatter",number:"basics-03-scatter",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["Scatter: 서로 다른 조각을 나눠 갖기","Scatter: distribute different chunks"],
  subtitle:["root의 배열을 rank 순서로 나누어, 각 GPU가 두 원소씩 받습니다.","Split the root’s array by rank; each GPU receives two elements."],
  alt:["GPU 0의 입력 배열 [1,2,10,20,100,200,1000,2000]을 두 원소씩 네 조각으로 나눈다. 위에서 아래로 각 조각의 목적지가 GPU 0,1,2,3으로 표시되어 있다. 완료 후 GPU 0은 [1,2], GPU 1은 [10,20], GPU 2는 [100,200], GPU 3은 [1000,2000]을 별도의 출력 버퍼에 갖는다. 입력이 자동으로 지워지거나 이동하여 소멸하는 뜻이 아니다.","GPU 0 supplies [1,2,10,20,100,200,1000,2000]. Scatter distributes consecutive two-element chunks to GPUs 0–3 in rank order."],
  caption:["입력은 한 배열을 여러 줄로 접어 그렸습니다. 전달 후에도 root의 입력은 지워지지 않습니다.","The input is one array folded into rows. The root’s input is not erased after the transfer."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,696,1104,[48,205]);
    p.el('text',{x:48,y:205,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 전 · 입력 버퍼","Before communication · input buffers"]);
    p.el("rect",{x:48,y:229,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:244,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:267,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:222,y:244,width:72,height:30,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:258,y:266,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"middle"},"root");
    p.el("rect",{x:64,y:293,width:76,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:102,y:324,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:146,y:293,width:76,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:184,y:324,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el('text',{x:237,y:323,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:64,y:347,width:76,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:102,y:378,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"10");
    p.el("rect",{x:146,y:347,width:76,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:184,y:378,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"20");
    p.el('text',{x:237,y:377,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:64,y:401,width:76,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:102,y:432,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"100");
    p.el("rect",{x:146,y:401,width:76,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:184,y:432,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"200");
    p.el('text',{x:237,y:431,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:64,y:455,width:76,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:102,y:486,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1000");
    p.el("rect",{x:146,y:455,width:76,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:184,y:486,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2000");
    p.el('text',{x:237,y:485,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"start"},"GPU 3");
    p.el("path",{d:"M180,536 V565",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:328,y:229,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:244,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:267,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:460,y:405,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 제공 없음","No source input"]);
    p.el("rect",{x:608,y:229,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:244,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:267,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el('text',{x:740,y:405,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 제공 없음","No source input"]);
    p.el("rect",{x:888,y:229,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:244,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:267,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el('text',{x:1020,y:405,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 제공 없음","No source input"]);
    p.el("rect",{x:48,y:575,width:1104,height:72,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:621,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 0의 입력 8개 원소 → 각 GPU의 출력 2개 원소","GPU 0: 8 input elements → each GPU: 2 output elements"]);
    p.el("path",{d:"M180,657 V692",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M460,657 V692",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M740,657 V692",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M1020,657 V692",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:48,y:728,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 완료 후 · 출력 버퍼","After completion · output buffers"]);
    p.el("rect",{x:48,y:753,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:768,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:791,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:222,y:768,width:72,height:30,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:258,y:790,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"middle"},"root");
    p.el("rect",{x:72,y:817,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:124,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:184,y:817,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:236,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:328,y:753,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:768,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:791,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:817,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:404,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"10");
    p.el("rect",{x:464,y:817,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:516,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"20");
    p.el("rect",{x:608,y:753,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:768,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:791,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:817,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:684,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"100");
    p.el("rect",{x:744,y:817,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:796,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"200");
    p.el("rect",{x:888,y:753,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:768,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:791,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:817,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:964,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1000");
    p.el("rect",{x:1024,y:817,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:1076,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2000");
    return [p];
  },
} satisfies FigureSpec;
