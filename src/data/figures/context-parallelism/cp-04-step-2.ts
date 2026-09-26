import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"context-parallelism",figureId:"cp-04-step-2",number:"cp-04-step-2",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Ulysses: 토큰 분할을 헤드 분할로 바꿔 계산합니다","Ulysses: switch from token shards to head shards"],
  subtitle:["가중치 분할이 아니라 Q·K·V와 출력의 재배치 · 이 방식도 원문에서는 Sequence Parallelism으로 부릅니다.","Rearrange Q·K·V and outputs, not weights · The original work also calls this Sequence Parallelism."],
  alt:["각 GPU가 담당 헤드의 전체 문맥 어텐션을 계산한다.","Each GPU computes full-context attention for its assigned head."],
  caption:["순전파에서는 어텐션 앞뒤로 All-to-All이 한 번씩, 모두 두 번 필요합니다.","The forward pass needs two All-to-All operations, one before and one after attention."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M1 1 L9 5 L1 9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.5\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,892,1104,[48,148]);
    p.el("rect",{x:40,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:150,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["토큰 분할","Token shards"]);
    p.el("rect",{x:273,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:383,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},"All-to-All");
    p.el("rect",{x:506,y:137,width:220,height:44,rx:10,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el('text',{x:616,y:166,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},["헤드별 어텐션","Attention per head"]);
    p.el("rect",{x:739,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:849,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["역 All-to-All","Reverse All-to-All"]);
    p.el("rect",{x:972,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:1082,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["토큰 분할 복원","Restore token shards"]);
    p.el("rect",{x:48,y:213,width:528,height:621,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:70,y:247,"font-size":24,fill:C.blue,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:624,y:213,width:528,height:621,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:646,y:247,"font-size":24,fill:C.orange,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:312,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"O = Attention(Q,K,V)");
    p.el("rect",{x:282,y:365,width:60,height:60,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:312,y:406.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:282,y:425,width:60,height:60,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:312,y:466.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:282,y:485,width:60,height:60,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:312,y:526.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:282,y:545,width:60,height:60,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:312,y:586.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el('text',{x:272,y:407,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:272,y:467,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:272,y:527,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:272,y:587,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:312,y:753,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["헤드 h0: Q의 모든 토큰 × K의 모든 토큰","Head h0: All Q tokens × All K tokens"]);
    p.el('text',{x:888,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"O = Attention(Q,K,V)");
    p.el("rect",{x:858,y:365,width:60,height:60,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:888,y:406.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:858,y:425,width:60,height:60,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:888,y:466.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:858,y:485,width:60,height:60,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:888,y:526.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:858,y:545,width:60,height:60,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:888,y:586.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el('text',{x:848,y:407,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:848,y:467,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:848,y:527,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:848,y:587,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:888,y:753,"font-size":20,fill:C.orange,"font-weight":700,"text-anchor":"middle"},["헤드 h1: Q의 모든 토큰 × K의 모든 토큰","Head h1: All Q tokens × All K tokens"]);
    p.el("rect",{x:276,y:864,width:648,height:44,rx:10,fill:C.tealFill,stroke:C.tealFill,"stroke-width":1.5});
    p.el('text',{x:600,y:893,"font-size":20,fill:C.teal,"font-weight":700,"text-anchor":"middle"},["각 헤드의 전체 문맥이 한 GPU에 모여 있습니다.","Each head’s full context is now on one GPU."]);
    p.el('text',{x:600,y:949,"font-size":24,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["담당 헤드의 어텐션을 로컬에서 완성합니다.","Complete attention locally for the assigned head."]);
    p.el('text',{x:600,y:1025,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["예: 토큰 4개 · 헤드 2개 · GPU 2개 / 기본 멀티헤드 어텐션","Example: 4 tokens · 2 heads · 2 GPUs / Basic multi-head attention"]);
    return [p];
  },
} satisfies FigureSpec;
