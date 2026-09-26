import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"choosing-parallelism",figureId:"01-make-it-fit",number:"01-make-it-fit",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["먼저 작업을 실행할 메모리 확보하기","First, make room to run the workload"],
  subtitle:["모델 가중치뿐 아니라 요청 상태·활성값·버퍼도 들어가야 합니다.","Weights, request state, activations, and buffers must all fit."],
  alt:["24GiB 메모리 한 GPU에 가중치24와 실행공간8은 들어가지 않는다. TP2에서는 W1/W2와 W3/W4를 나누어 각 GPU가 가중치12와 실행공간8을 보관하고 여유4를 확보한다.","One 24 GiB GPU cannot hold 24 GiB of weights plus 8 GiB for execution. TP2 places W1/W2 and W3/W4 on separate GPUs; each uses 12+8 GiB with 4 GiB free."],
  caption:["GPU를 더 연결해도 메모리가 하나로 합쳐지지 않으므로, 가중치나 실행 중 데이터를 실제로 나눠야 합니다. 수치는 설명용입니다.","Connecting more GPUs does not merge their memory, so weights or runtime data must actually be split. Values are illustrative."],
  sources:[],
  defs:"<marker id=\"ported-arrow-start\" viewBox=\"0 0 10 10\" refX=\"1\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M9 1 L1 5 L9 9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.5\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,822,1104,[48,194]);
    p.el("rect",{x:48,y:206,width:342,height:662,rx:12,fill:C.surface,stroke:C.line,"stroke-width":2});
    p.el("rect",{x:438,y:206,width:714,height:662,rx:12,fill:C.surface,stroke:C.blue,"stroke-width":2});
    p.el('text',{x:219,y:249,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["GPU 하나에 전체 모델","Whole model on one GPU"]);
    p.el('text',{x:795,y:249,"font-size":26,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["TP 2 · 두 GPU로 나눈 모델 한 벌","TP 2 · One model across two GPUs"]);
    p.el('text',{x:795,y:301,"font-size":23,fill:C.blue,"font-weight":400,"text-anchor":"middle"},["같은 요청의 계산에 함께 참여","Both GPUs compute the same request"]);
    p.el("rect",{x:70,y:350,width:298,height:328,rx:12,fill:"white",stroke:C.line,"stroke-width":2});
    p.el('text',{x:219,y:391,"font-size":26,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el('text',{x:219,y:445,"font-size":25,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["가중치 24 GiB","Weights: 24 GiB"]);
    p.el("rect",{x:87,y:522,width:192,height:60,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":2});
    p.el("rect",{x:87,y:522,width:48,height:60,rx:0,fill:C.line,stroke:C.blue,"stroke-width":2});
    p.el('text',{x:111,y:560,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W1");
    p.el("rect",{x:135,y:522,width:48,height:60,rx:0,fill:"#bbdaf7",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:159,y:560,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W2");
    p.el("rect",{x:183,y:522,width:48,height:60,rx:0,fill:"#9bc9f1",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:207,y:560,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W3");
    p.el("rect",{x:231,y:522,width:48,height:60,rx:0,fill:"#79b4e5",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:255,y:560,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W4");
    p.el("rect",{x:279,y:522,width:64,height:60,rx:0,fill:"#ffe3b5",stroke:"#b8701e","stroke-width":2});
    p.el('text',{x:311,y:560,"font-size":23,fill:"#b8701e","font-weight":700,"text-anchor":"middle"},"8");
    p.el('text',{x:183,y:500,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["사용 가능 24 GiB","24 GiB available"]);
    p.el("path",{d:"M279,494 V601",stroke:C.red,"stroke-width":3,"stroke-dasharray":"6 5"});
    p.el('text',{x:219,y:636,"font-size":20,fill:C.red,"font-weight":700,"text-anchor":"middle"},["실행 공간 8 GiB가 초과","Extra 8 GiB does not fit"]);
    p.el("rect",{x:460,y:350,width:324,height:328,rx:12,fill:"white",stroke:C.line,"stroke-width":2});
    p.el('text',{x:622,y:391,"font-size":26,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el('text',{x:622,y:445,"font-size":25,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["가중치 12 GiB","Weights: 12 GiB"]);
    p.el("rect",{x:526,y:522,width:192,height:60,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":2});
    p.el("rect",{x:526,y:522,width:48,height:60,rx:0,fill:C.line,stroke:C.blue,"stroke-width":2});
    p.el('text',{x:550,y:560,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W1");
    p.el("rect",{x:574,y:522,width:48,height:60,rx:0,fill:"#bbdaf7",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:598,y:560,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W2");
    p.el("rect",{x:622,y:522,width:64,height:60,rx:0,fill:"#ffe3b5",stroke:"#b8701e","stroke-width":2});
    p.el('text',{x:654,y:560,"font-size":23,fill:"#b8701e","font-weight":700,"text-anchor":"middle"},"8");
    p.el('text',{x:622,y:500,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["사용 가능 24 GiB","24 GiB available"]);
    p.el('text',{x:622,y:636,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["실행 공간 8 + 여유 4 GiB","Execution: 8 + free: 4 GiB"]);
    p.el("rect",{x:806,y:350,width:324,height:328,rx:12,fill:"white",stroke:C.line,"stroke-width":2});
    p.el('text',{x:968,y:391,"font-size":26,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el('text',{x:968,y:445,"font-size":25,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["가중치 12 GiB","Weights: 12 GiB"]);
    p.el("rect",{x:872,y:522,width:192,height:60,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":2});
    p.el("rect",{x:872,y:522,width:48,height:60,rx:0,fill:"#9bc9f1",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:896,y:560,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W3");
    p.el("rect",{x:920,y:522,width:48,height:60,rx:0,fill:"#79b4e5",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:944,y:560,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W4");
    p.el("rect",{x:968,y:522,width:64,height:60,rx:0,fill:"#ffe3b5",stroke:"#b8701e","stroke-width":2});
    p.el('text',{x:1000,y:560,"font-size":23,fill:"#b8701e","font-weight":700,"text-anchor":"middle"},"8");
    p.el('text',{x:968,y:500,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["사용 가능 24 GiB","24 GiB available"]);
    p.el('text',{x:968,y:636,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["실행 공간 8 + 여유 4 GiB","Execution: 8 + free: 4 GiB"]);
    p.el('text',{x:219,y:733,"font-size":26,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"24 + 8 = 32 GiB");
    p.el('text',{x:219,y:788,"font-size":25,fill:C.red,"font-weight":700,"text-anchor":"middle"},["실행 공간 부족","Insufficient memory"]);
    p.el('text',{x:795,y:733,"font-size":27,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["GPU당 12 + 8 = 20 GiB","Per GPU: 12 + 8 = 20 GiB"]);
    p.el('text',{x:795,y:788,"font-size":27,fill:C.teal,"font-weight":700,"text-anchor":"middle"},["요청을 실행할 수 있는 그룹","A group that can run requests"]);
    p.el("rect",{x:100,y:918,width:30,height:25,rx:0,fill:C.line,stroke:C.blue,"stroke-width":2});
    p.el('text',{x:144,y:940,"font-size":22,fill:C.ink,"font-weight":400,"text-anchor":"start"},["W1–W4: 가중치 조각","W1–W4: weight shards"]);
    p.el("rect",{x:490,y:918,width:30,height:25,rx:0,fill:"#ffe3b5",stroke:"#b8701e","stroke-width":2});
    p.el('text',{x:534,y:940,"font-size":22,fill:C.ink,"font-weight":400,"text-anchor":"start"},["실행 공간","Execution memory"]);
    p.el("rect",{x:866,y:918,width:30,height:25,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":2});
    p.el('text',{x:910,y:940,"font-size":22,fill:C.ink,"font-weight":400,"text-anchor":"start"},["여유 공간","Free memory"]);
    p.el('text',{x:600,y:1001,"font-size":22,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["계산 예시: 각 GPU의 실행 공간은 8 GiB로 가정","Capacity example: assume 8 GiB of execution memory per GPU"]);
    return [p];
  },
} satisfies FigureSpec;
