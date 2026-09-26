import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"context-parallelism",figureId:"cp-04-step-4",number:"cp-04-step-4",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Ulysses: 토큰 분할을 헤드 분할로 바꿔 계산합니다","Ulysses: switch from token shards to head shards"],
  subtitle:["가중치 분할이 아니라 Q·K·V와 출력의 재배치 · 이 방식도 원문에서는 Sequence Parallelism으로 부릅니다.","Rearrange Q·K·V and outputs, not weights · The original work also calls this Sequence Parallelism."],
  alt:["각 GPU가 담당 토큰의 모든 헤드 출력을 갖고 로컬 Output Projection과 FFN으로 이어간다.","Each GPU has all head outputs for its tokens and continues with local Output Projection and FFN."],
  caption:["순전파에서는 어텐션 앞뒤로 All-to-All이 한 번씩, 모두 두 번 필요합니다.","The forward pass needs two All-to-All operations, one before and one after attention."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M1 1 L9 5 L1 9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.5\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,892,1104,[48,148]);
    p.el("rect",{x:40,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:150,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["토큰 분할","Token shards"]);
    p.el("rect",{x:273,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:383,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},"All-to-All");
    p.el("rect",{x:506,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:616,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["헤드별 어텐션","Attention per head"]);
    p.el("rect",{x:739,y:137,width:220,height:44,rx:10,fill:C.grayFill,stroke:C.grayFill,"stroke-width":1.5});
    p.el('text',{x:849,y:166,"font-size":20,fill:C.muted,"font-weight":700,"text-anchor":"middle"},["역 All-to-All","Reverse All-to-All"]);
    p.el("rect",{x:972,y:137,width:220,height:44,rx:10,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el('text',{x:1082,y:166,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},["토큰 분할 복원","Restore token shards"]);
    p.el("rect",{x:48,y:213,width:528,height:621,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:70,y:247,"font-size":24,fill:C.blue,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:624,y:213,width:528,height:621,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:646,y:247,"font-size":24,fill:C.orange,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:312,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"O = Attention(Q,K,V)");
    p.el("rect",{x:252,y:365,width:60,height:60,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:282,y:406.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:312,y:365,width:60,height:60,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:342,y:406.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:252,y:425,width:60,height:60,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:282,y:466.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:312,y:425,width:60,height:60,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:342,y:466.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el('text',{x:242,y:407,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:242,y:467,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:312,y:753,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["내 토큰 / 모든 헤드","My tokens / All heads"]);
    p.el('text',{x:888,y:350,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"O = Attention(Q,K,V)");
    p.el("rect",{x:828,y:365,width:60,height:60,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:858,y:406.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:888,y:365,width:60,height:60,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:918,y:406.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el("rect",{x:828,y:425,width:60,height:60,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:858,y:466.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h0");
    p.el("rect",{x:888,y:425,width:60,height:60,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:918,y:466.4,"font-size":21,fill:C.ink,"font-weight":400,"text-anchor":"middle"},"h1");
    p.el('text',{x:818,y:407,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:818,y:467,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:888,y:753,"font-size":23,fill:C.orange,"font-weight":700,"text-anchor":"middle"},["내 토큰 / 모든 헤드","My tokens / All heads"]);
    p.el("rect",{x:216,y:864,width:768,height:44,rx:10,fill:C.tealFill,stroke:C.tealFill,"stroke-width":1.5});
    p.el('text',{x:600,y:893,"font-size":20,fill:C.teal,"font-weight":700,"text-anchor":"middle"},["내 토큰의 모든 헤드가 모임 → Output Projection → FFN","All heads for my tokens → Output Projection → FFN"]);
    p.el('text',{x:600,y:949,"font-size":22,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["모델 가중치는 복제한 채, 활성값의 토큰·헤드 배치를 바꿨습니다.","Weights stay replicated; the token/head layout of activations changes."]);
    p.el('text',{x:600,y:1025,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["예: 토큰 4개 · 헤드 2개 · GPU 2개 / 기본 멀티헤드 어텐션","Example: 4 tokens · 2 heads · 2 GPUs / Basic multi-head attention"]);
    return [p];
  },
} satisfies FigureSpec;
