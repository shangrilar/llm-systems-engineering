import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"context-parallelism",figureId:"cp-04-step-1",number:"cp-04-step-1",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Ulysses: 토큰 분할을 헤드 분할로 바꿔 계산합니다","Ulysses: switch from token shards to head shards"],
  subtitle:["가중치 분할이 아니라 Q·K·V와 출력의 재배치 · 이 방식도 원문에서는 Sequence Parallelism으로 부릅니다.","Rearrange Q·K·V and outputs, not weights · The original work also calls this Sequence Parallelism."],
  alt:["GPU 0은 모든 토큰의 h0, GPU 1은 모든 토큰의 h1의 Q,K,V를 갖는다.","GPU 0 has h0 and GPU 1 has h1 for every token, for Q,K,V."],
  caption:["순전파에서는 어텐션 앞뒤로 All-to-All이 한 번씩, 모두 두 번 필요합니다.","The forward pass needs two All-to-All operations, one before and one after attention."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M1 1 L9 5 L1 9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.5\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,892,1104,[48,148]);
    p.el("rect",{x:40,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:150,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["토큰 분할","Token shards"]);
    p.el("rect",{x:273,y:137,width:220,height:44,rx:10,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el('text',{x:383,y:166,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},"All-to-All");
    p.el("rect",{x:506,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:616,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["헤드별 어텐션","Attention per head"]);
    p.el("rect",{x:739,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:849,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["역 All-to-All","Reverse All-to-All"]);
    p.el("rect",{x:972,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:1082,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["토큰 분할 복원","Restore token shards"]);
    p.el("rect",{x:48,y:213,width:528,height:621,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:70,y:247,"font-size":24,fill:C.blue,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:624,y:213,width:528,height:621,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:646,y:247,"font-size":24,fill:C.orange,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:142.5,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"Q");
    p.el("rect",{x:118,y:365,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:142.5,y:398.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:118,y:414,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:142.5,y:447.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:118,y:463,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:142.5,y:496.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:118,y:512,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:142.5,y:545.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el('text',{x:108,y:399.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:108,y:448.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:108,y:497.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:108,y:546.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:301.5,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"K");
    p.el("rect",{x:277,y:365,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:301.5,y:398.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:277,y:414,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:301.5,y:447.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:277,y:463,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:301.5,y:496.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:277,y:512,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:301.5,y:545.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el('text',{x:267,y:399.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:267,y:448.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:267,y:497.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:267,y:546.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:460.5,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"V");
    p.el("rect",{x:436,y:365,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:460.5,y:398.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:436,y:414,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:460.5,y:447.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:436,y:463,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:460.5,y:496.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:436,y:512,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:460.5,y:545.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el('text',{x:426,y:399.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:426,y:448.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:426,y:497.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:426,y:546.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:312,y:753,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["모든 토큰 / 내 헤드","All tokens / My head"]);
    p.el('text',{x:718.5,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"Q");
    p.el("rect",{x:694,y:365,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:718.5,y:398.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:694,y:414,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:718.5,y:447.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:694,y:463,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:718.5,y:496.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:694,y:512,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:718.5,y:545.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el('text',{x:684,y:399.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:684,y:448.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:684,y:497.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:684,y:546.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:877.5,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"K");
    p.el("rect",{x:853,y:365,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:877.5,y:398.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:853,y:414,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:877.5,y:447.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:853,y:463,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:877.5,y:496.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:853,y:512,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:877.5,y:545.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el('text',{x:843,y:399.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:843,y:448.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:843,y:497.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:843,y:546.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:1036.5,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"V");
    p.el("rect",{x:1012,y:365,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:1036.5,y:398.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:1012,y:414,width:49,height:49,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:1036.5,y:447.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:1012,y:463,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:1036.5,y:496.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:1012,y:512,width:49,height:49,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:1036.5,y:545.81,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el('text',{x:1002,y:399.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:1002,y:448.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:1002,y:497.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:1002,y:546.3,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:888,y:753,"font-size":23,fill:C.orange,"font-weight":700,"text-anchor":"middle"},["모든 토큰 / 내 헤드","All tokens / My head"]);
    p.el("path",{d:"M365,637 L834,637",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:600,y:621,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},["t0·t1의 h1 → GPU 1","h1 of t0·t1 → GPU 1"]);
    p.el("path",{d:"M834,701 L365,701",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:600,y:683,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},["t2·t3의 h0 → GPU 0","h0 of t2·t3 → GPU 0"]);
    p.el("rect",{x:193,y:864,width:814,height:44,rx:10,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el('text',{x:600,y:893,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},["All-to-All: h0 데이터는 GPU 0으로, h1 데이터는 GPU 1로","All-to-All: h0 data → GPU 0, h1 data → GPU 1"]);
    p.el('text',{x:600,y:949,"font-size":22,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["Q·K·V 모두 재배치: 각 GPU는 자기 헤드의 전체 문맥을 갖습니다.","Rearrange Q·K·V together: each GPU gets its head’s full context."]);
    p.el('text',{x:600,y:1025,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["예: 토큰 4개 · 헤드 2개 · GPU 2개 / 기본 멀티헤드 어텐션","Example: 4 tokens · 2 heads · 2 GPUs / Basic multi-head attention"]);
    return [p];
  },
} satisfies FigureSpec;
