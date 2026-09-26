import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"sequence-parallelism",figureId:"sp-03-step-0",number:"sp-03-step-0",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["SP와 TP의 경계에서 데이터 배치를 바꾸기","Change layouts at the SP–TP boundary"],
  subtitle:["4개 토큰 · 입력/중간/출력 특징 각 4개 · 숫자는 작은 FFN 예시","4 tokens · 4 input, hidden, and output features · A small FFN example"],
  alt:["토큰 조각 X; t2·t3의 전체 특징; SP: 토큰 조각","Each GPU holds two token rows of X."],
  caption:["All-Gather로 토큰 조각을 모아 TP 구간에 넣고, Reduce-Scatter로 다시 토큰 조각으로 돌려놓습니다.","All-Gather collects the token pieces for the TP region; Reduce-Scatter returns the result to token pieces."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M1 1 L9 5 L1 9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.5\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,861,1104,[48,148]);
    p.el("rect",{x:40,y:136,width:220,height:44,rx:10,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el('text',{x:150,y:165,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},"SP");
    p.el("rect",{x:273,y:136,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:383,y:165,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},"All-Gather");
    p.el("rect",{x:506,y:136,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:616,y:165,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["열 분할","Column split"]);
    p.el("rect",{x:739,y:136,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:849,y:165,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["행 분할","Row split"]);
    p.el("rect",{x:972,y:136,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:1082,y:165,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},"Reduce-Scatter");
    p.el("rect",{x:48,y:206,width:528,height:598,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:70,y:240,"font-size":24,fill:C.blue,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:624,y:206,width:528,height:598,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:646,y:240,"font-size":24,fill:C.orange,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:312,y:365,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["토큰 조각 X","Token shard of X"]);
    p.el("rect",{x:228,y:380,width:42,height:42,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:249,y:408.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:270,y:380,width:42,height:42,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:291,y:408.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:312,y:380,width:42,height:42,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:333,y:408.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:354,y:380,width:42,height:42,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:375,y:408.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"4");
    p.el("rect",{x:228,y:422,width:42,height:42,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:249,y:450.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:270,y:422,width:42,height:42,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:291,y:450.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:312,y:422,width:42,height:42,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:333,y:450.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:354,y:422,width:42,height:42,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:375,y:450.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"1");
    p.el('text',{x:218,y:409.4,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:218,y:451.4,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:312,y:737,"font-size":21,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["t0·t1의 전체 특징","All features of t0·t1"]);
    p.el('text',{x:888,y:365,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["토큰 조각 X","Token shard of X"]);
    p.el("rect",{x:804,y:380,width:42,height:42,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:825,y:408.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:846,y:380,width:42,height:42,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:867,y:408.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:888,y:380,width:42,height:42,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:909,y:408.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"1");
    p.el("rect",{x:930,y:380,width:42,height:42,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:951,y:408.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"3");
    p.el("rect",{x:804,y:422,width:42,height:42,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:825,y:450.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"4");
    p.el("rect",{x:846,y:422,width:42,height:42,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:867,y:450.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:888,y:422,width:42,height:42,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:909,y:450.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("rect",{x:930,y:422,width:42,height:42,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:951,y:450.98,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"4");
    p.el('text',{x:794,y:409.4,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:794,y:451.4,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:888,y:737,"font-size":21,fill:C.orange,"font-weight":700,"text-anchor":"middle"},["t2·t3의 전체 특징","All features of t2·t3"]);
    p.el('text',{x:600,y:866,"font-size":24,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["정규화를 마친 입력을 토큰별로 나눠 가진 상태","Normalized inputs, partitioned by token"]);
    p.el('text',{x:600,y:909,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["다음 TP Linear에서는 두 GPU가 같은 X의 서로 다른 출력 특징을 계산합니다.","The next TP Linear computes different output features from the same X."]);
    p.el('text',{x:600,y:994,"font-size":22,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["같은 두 GPU가 SP 구간에서는 토큰을, TP 구간에서는 중간 특징을 나눕니다.","The same two GPUs split tokens in SP and hidden features inside TP."]);
    return [p];
  },
} satisfies FigureSpec;
