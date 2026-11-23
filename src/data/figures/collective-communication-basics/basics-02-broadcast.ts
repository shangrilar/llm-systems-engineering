import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-communication-basics",figureId:"basics-02-broadcast",number:"basics-02-broadcast",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["Broadcast: 같은 데이터를 모두에게","Broadcast: the same data for everyone"],
  subtitle:["root는 기준 데이터를 제공하는 참여자입니다. 여기서는 GPU 0이 맡습니다.","The root supplies the source data. Here, GPU 0 is the root."],
  alt:["root인 GPU 0의 입력은 [1,2]이다. 나머지 GPU는 이 동작의 입력을 제공하지 않지만 수신에 참여한다. Broadcast 완료 후 네 GPU의 출력 버퍼에 같은 [1,2]가 있다. root는 고정된 물리 장치 종류가 아니라 통신 그룹 안의 역할이며 이 예시에서는 GPU 번호와 rank를 같게 두었다.","GPU 0 supplies [1,2]. All four participants, including root 0, receive [1,2] in their output buffers."],
  caption:["root는 장치의 종류가 아니라 통신 그룹 안의 역할입니다. 이 예시에서는 GPU 번호와 rank를 같게 두었습니다.","The root is a role within the communication group, not a device type. Here GPU numbers match ranks."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,538,1104,[48,205]);
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
    p.el('text',{x:460,y:326,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 제공 없음","No source input"]);
    p.el("rect",{x:608,y:229,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:244,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:267,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el('text',{x:740,y:326,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 제공 없음","No source input"]);
    p.el("rect",{x:888,y:229,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:244,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:267,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el('text',{x:1020,y:326,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 제공 없음","No source input"]);
    p.el("rect",{x:48,y:417,width:1104,height:72,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:463,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 0의 배열 전체를 모든 참여자의 출력 버퍼에 복사","Copy GPU 0’s entire array to every participant’s output buffer"]);
    p.el("path",{d:"M180,499 V534",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M460,499 V534",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M740,499 V534",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M1020,499 V534",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:48,y:570,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 완료 후 · 출력 버퍼","After completion · output buffers"]);
    p.el("rect",{x:48,y:595,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:610,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:633,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:222,y:610,width:72,height:30,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:258,y:632,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"middle"},"root");
    p.el("rect",{x:72,y:659,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:124,y:690,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:184,y:659,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:236,y:690,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:328,y:595,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:610,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:633,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:659,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:404,y:690,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:464,y:659,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:516,y:690,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:608,y:595,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:610,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:633,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:659,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:684,y:690,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:744,y:659,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:796,y:690,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:888,y:595,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:610,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:633,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:659,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:964,y:690,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:1024,y:659,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:1076,y:690,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    return [p];
  },
} satisfies FigureSpec;
