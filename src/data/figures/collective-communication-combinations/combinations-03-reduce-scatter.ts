import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-communication-combinations",figureId:"combinations-03-reduce-scatter",number:"combinations-03-reduce-scatter",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["Reduce-Scatter: 합산한 결과를 나눠 갖기","Reduce-Scatter: partition the reduced result"],
  subtitle:["각 GPU가 네 위치의 값을 제공하고, 합산된 결과 중 한 원소씩 받습니다.","Each GPU provides four values and receives one element of the reduced result."],
  alt:["각 GPU의 입력은 각각 [1,2,3,4], [10,20,30,40], [100,200,300,400], [1000,2000,3000,4000]이다. 모든 GPU가 네 결과 위치 각각에 기여한다. 위치별 합은 [1111,2222,3333,4444]이며 완료 후 GPU 0,1,2,3이 각각 한 원소씩 받는다. 가운데 전체 합은 결과를 설명하기 위한 표현이며 특정 GPU의 중간 버퍼가 아니다. 이 출력들을 같은 rank 순서로 All-Gather하면 모든 GPU가 네 원소 합산 결과를 갖게 되어 동일 입력의 All-Reduce 결과와 같다.","Four four-element arrays are summed by position. GPUs 0–3 receive 1111,2222,3333,4444 respectively. The central full sum describes the result, not a required intermediate buffer."],
  caption:["가운데 전체 합은 결과를 설명하기 위한 표현이며, 특정 GPU의 중간 버퍼가 아닙니다.","The full sum in the middle explains the result; it is not an intermediate buffer on any GPU."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,752,1104,[48,205]);
    p.el('text',{x:48,y:205,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 전 · 입력 버퍼","Before communication · input buffers"]);
    p.el("rect",{x:48,y:229,width:264,height:190,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:244,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:267,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:72,y:293,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:124,y:324,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:184,y:293,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:236,y:324,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:72,y:347,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:124,y:378,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:184,y:347,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:236,y:378,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"4");
    p.el("path",{d:"M180,428 V457",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:328,y:229,width:264,height:190,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:244,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:267,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:293,width:104,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:404,y:324,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"10");
    p.el("rect",{x:464,y:293,width:104,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:516,y:324,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"20");
    p.el("rect",{x:352,y:347,width:104,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:404,y:378,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"30");
    p.el("rect",{x:464,y:347,width:104,height:44,rx:7,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:516,y:378,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"40");
    p.el("path",{d:"M460,428 V457",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:608,y:229,width:264,height:190,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:244,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:267,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:293,width:104,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:684,y:324,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"100");
    p.el("rect",{x:744,y:293,width:104,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:796,y:324,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"200");
    p.el("rect",{x:632,y:347,width:104,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:684,y:378,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"300");
    p.el("rect",{x:744,y:347,width:104,height:44,rx:7,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:796,y:378,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"400");
    p.el("path",{d:"M740,428 V457",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:888,y:229,width:264,height:190,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:244,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:267,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:293,width:104,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:964,y:324,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1000");
    p.el("rect",{x:1024,y:293,width:104,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1076,y:324,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2000");
    p.el("rect",{x:912,y:347,width:104,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:964,y:378,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3000");
    p.el("rect",{x:1024,y:347,width:104,height:44,rx:7,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1076,y:378,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"4000");
    p.el("path",{d:"M1020,428 V457",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:467,width:1104,height:106,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:506,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["같은 위치끼리 합산한 값: [1111, 2222, 3333, 4444]","Position-wise sums: [1111, 2222, 3333, 4444]"]);
    p.el('text',{x:600,y:543,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},["rank 순서로 나누어 GPU 0, 1, 2, 3에 한 원소씩 배분","Partition by rank: one element each for GPUs 0, 1, 2, and 3"]);
    p.el("path",{d:"M180,583 V618",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M460,583 V618",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M740,583 V618",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M1020,583 V618",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:48,y:654,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["통신 완료 후 · 출력 버퍼","After completion · output buffers"]);
    p.el("rect",{x:48,y:679,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:694,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:717,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:72,y:743,width:216,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:180,y:774,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1111");
    p.el("rect",{x:328,y:679,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:694,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:717,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:743,width:216,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:460,y:774,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2222");
    p.el("rect",{x:608,y:679,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:694,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:717,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:743,width:216,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:740,y:774,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3333");
    p.el("rect",{x:888,y:679,width:264,height:140,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:694,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:717,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:743,width:216,height:44,rx:7,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:1020,y:774,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},"4444");
    p.el("rect",{x:48,y:853,width:1104,height:96,rx:12,fill:C.indigoFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:893,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"middle"},["이 출력을 All-Gather하면","All-Gather these outputs:"]);
    p.el('text',{x:600,y:927,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["모든 GPU가 [1111, 2222, 3333, 4444]를 갖습니다.","Every GPU holds [1111, 2222, 3333, 4444]."]);
    return [p];
  },
} satisfies FigureSpec;
