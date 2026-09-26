import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-communication-combinations",figureId:"combinations-04-all-to-all",number:"combinations-04-all-to-all",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["All-to-All: 목적지별로 조각 교환하기","All-to-All: exchange destination chunks"],
  subtitle:["각 칸은 데이터 조각 하나입니다. 칸 안의 표기는 보내는 GPU → 받는 GPU입니다.","Each box is a chunk. Its label means source GPU → destination GPU."],
  alt:["위 입력에서 GPU i의 네 조각은 i에서 GPU 0,1,2,3으로 향하는 조각이다. 아래 출력에서 GPU j는 GPU 0,1,2,3이 자신에게 보낸 조각을 출발 rank 순서로 갖는다. 조각 안의 두 숫자는 실제 데이터 값이 아닌 출발 GPU와 목적지 GPU를 표시한 표식이다. 색상은 원래 출발 GPU를 유지한다. 모든 GPU가 같은 전체 배열을 갖는 All-Gather와 달리 GPU마다 받는 조각이 다르다. 자기 자신을 목적지로 하는 조각도 결과에 포함된다.","Each GPU sends one chunk for each destination and receives its own destination chunks from all source GPUs in rank order. Labels indicate source to destination; colors follow the source."],
  caption:["두 숫자는 실제 값이 아니라 출발과 목적지 GPU를 나타내며, 색은 출발 GPU를 따릅니다.","The two numbers mark source and destination GPUs, not data values; colors follow the source GPU."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,854,1104,[48,205]);
    p.el('text',{x:48,y:205,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 전 · 입력 버퍼","Before communication · input buffers"]);
    p.el("rect",{x:48,y:229,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:244,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:267,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:72,y:293,width:216,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:324,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0 → 0");
    p.el("rect",{x:72,y:347,width:216,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:378,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0 → 1");
    p.el("rect",{x:72,y:401,width:216,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:432,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0 → 2");
    p.el("rect",{x:72,y:455,width:216,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:486,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0 → 3");
    p.el("path",{d:"M180,536 V565",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:328,y:229,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:244,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:267,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:293,width:216,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:460,y:324,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 → 0");
    p.el("rect",{x:352,y:347,width:216,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:460,y:378,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 → 1");
    p.el("rect",{x:352,y:401,width:216,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:460,y:432,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 → 2");
    p.el("rect",{x:352,y:455,width:216,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:460,y:486,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 → 3");
    p.el("path",{d:"M460,536 V565",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:608,y:229,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:244,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:267,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:293,width:216,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:740,y:324,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 → 0");
    p.el("rect",{x:632,y:347,width:216,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:740,y:378,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 → 1");
    p.el("rect",{x:632,y:401,width:216,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:740,y:432,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 → 2");
    p.el("rect",{x:632,y:455,width:216,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:740,y:486,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 → 3");
    p.el("path",{d:"M740,536 V565",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:888,y:229,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:244,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:267,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:293,width:216,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:324,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 → 0");
    p.el("rect",{x:912,y:347,width:216,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:378,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 → 1");
    p.el("rect",{x:912,y:401,width:216,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:432,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 → 2");
    p.el("rect",{x:912,y:455,width:216,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:486,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 → 3");
    p.el("path",{d:"M1020,536 V565",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:575,width:1104,height:72,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:621,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["각 GPU가 목적지별 조각을 보내고, 출발 GPU 순서로 받기","Send destination-specific chunks; receive them in source-rank order"]);
    p.el("path",{d:"M180,657 V692",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M460,657 V692",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M740,657 V692",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M1020,657 V692",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:48,y:728,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 완료 후 · 출력 버퍼","After completion · output buffers"]);
    p.el("rect",{x:48,y:753,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:768,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:791,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:72,y:817,width:216,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0 → 0");
    p.el("rect",{x:72,y:871,width:216,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:180,y:902,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 → 0");
    p.el("rect",{x:72,y:925,width:216,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:180,y:956,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 → 0");
    p.el("rect",{x:72,y:979,width:216,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:180,y:1010,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 → 0");
    p.el("rect",{x:328,y:753,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:768,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:791,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:817,width:216,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:460,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0 → 1");
    p.el("rect",{x:352,y:871,width:216,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:460,y:902,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 → 1");
    p.el("rect",{x:352,y:925,width:216,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:460,y:956,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 → 1");
    p.el("rect",{x:352,y:979,width:216,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:460,y:1010,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 → 1");
    p.el("rect",{x:608,y:753,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:768,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:791,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:817,width:216,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:740,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0 → 2");
    p.el("rect",{x:632,y:871,width:216,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:740,y:902,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 → 2");
    p.el("rect",{x:632,y:925,width:216,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:740,y:956,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 → 2");
    p.el("rect",{x:632,y:979,width:216,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:740,y:1010,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 → 2");
    p.el("rect",{x:888,y:753,width:264,height:298,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:768,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:791,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:817,width:216,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:1020,y:848,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0 → 3");
    p.el("rect",{x:912,y:871,width:216,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1020,y:902,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 → 3");
    p.el("rect",{x:912,y:925,width:216,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:1020,y:956,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 → 3");
    p.el("rect",{x:912,y:979,width:216,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:1010,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 → 3");
    return [p];
  },
} satisfies FigureSpec;
