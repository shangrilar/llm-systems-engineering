import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-preemption",figureId:"05-output-gap",number:"05-output-gap",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["중단과 복구가 늘리는 출력 간격","Pausing and recovery extend the output gap"],
  subtitle:["B의 KV를 반환하면 A가 진행할 수 있지만, B의 다음 출력은 대기와 복구를 거친 뒤에 나옵니다.","Releasing B’s KV lets A proceed, but B must wait and recover before delivering its next output."],
  alt:["같은 시간축에서 요청 A와 B, 블록 변화, B의 출력 이벤트를 비교한다. B가 x0와 x1을 전달한 뒤 중단해 두 블록을 반환하면 A는 한 블록을 추가하고 KV 9개에서 12개까지 진행한다. A가 완료해 세 블록을 반환하면 B가 세 블록을 배정받아 알려진 9개 토큰으로 KV를 재계산한다. 대기와 재계산 중에는 새 출력이 없으며, 이후 x2와 x3가 전달된다.","A and B, block changes, and B’s output events share one timeline. After delivering x0 and x1, B pauses and releases two blocks. A adds one block and grows from nine to twelve KV slots. When A completes and releases three blocks, B allocates three blocks and recomputes KV from nine known tokens. No new output is delivered while B waits or recomputes; x2 and x3 follow afterward."],
  caption:["B의 공간을 회수해 A를 진행시키는 동안, B의 다음 출력에는 대기와 복구 시간이 더해집니다.","Reclaiming B's space lets A progress, while waiting and recovery delay B's next output."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,798,1104,[48,196]);
    p.el('text',{x:72,y:216,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},["재계산 방식의 실행 예시","Example using recomputation"]);
    p.el("path",{d:"M220,262 L1124.0,262.0",stroke:C.muted,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M1134,262 L1124.0,266.5 L1124.0,257.5 Z",fill:C.muted});
    p.el('text',{x:1132,y:241,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"end"},["시간","Time"]);
    p.el('text',{x:405,y:311,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["B 중단","B pauses"]);
    p.el('text',{x:780,y:311,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["A 완료","A completes"]);
    p.el("path",{d:"M405,324 V908",stroke:C.line,"stroke-width":2,"stroke-dasharray":"5 6",fill:"none"});
    p.el("path",{d:"M780,324 V908",stroke:C.line,"stroke-width":2,"stroke-dasharray":"5 6",fill:"none"});
    p.el('text',{x:72,y:390,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"start"},["요청 A","Request A"]);
    p.el('text',{x:72,y:560,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"start"},["요청 B","Request B"]);
    p.el("rect",{x:220,y:346,width:185,height:72,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:411,y:346,width:369,height:72,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:312.5,y:390,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["생성","Generate"]);
    p.el('text',{x:592.5,y:390,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["생성 계속","Keep generating"]);
    p.el('text',{x:312.5,y:457,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"KV 7 → 8");
    p.el('text',{x:312.5,y:486.4,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["2블록","2 blocks"]);
    p.el('text',{x:592.5,y:457,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},["KV 9 → 12 · 3블록","KV 9 → 12 · 3 blocks"]);
    p.el('text',{x:966,y:390,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["완료 · 블록 반환","Done · blocks released"]);
    p.el("rect",{x:220,y:516,width:185,height:72,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:411,y:516,width:363,height:72,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:780,y:516,width:204,height:72,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5,"stroke-dasharray":"5 4"});
    p.el("rect",{x:990,y:516,width:144,height:72,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:312.5,y:560,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["생성","Generate"]);
    p.el('text',{x:592.5,y:560,fill:C.muted,"font-size":24,"font-weight":700,"text-anchor":"middle"},["대기","Wait"]);
    p.el('text',{x:885,y:560,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["KV 재계산","Recompute KV"]);
    p.el('text',{x:1062,y:560,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["생성","Generate"]);
    p.el('text',{x:312.5,y:629,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"KV 7 → 8");
    p.el('text',{x:312.5,y:658.4,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["2블록","2 blocks"]);
    p.el('text',{x:592.5,y:629,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["GPU KV 없음","No GPU KV"]);
    p.el('text',{x:885,y:629,fill:C.teal,"font-size":21,"font-weight":700,"text-anchor":"middle"},["완료 시 KV 9개","On completion: 9 KV"]);
    p.el('text',{x:885,y:658.4,fill:C.teal,"font-size":21,"font-weight":700,"text-anchor":"middle"},["3블록","3 blocks"]);
    p.el('text',{x:72,y:722,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["블록 변화","Block changes"]);
    p.el("rect",{x:309,y:677,width:192,height:111,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:405,y:715,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},["B: 2블록 반환","B: release 2"]);
    p.el('text',{x:405,y:752,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},["A: 1블록 추가","A: add 1"]);
    p.el("rect",{x:654,y:677,width:252,height:111,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:780,y:715,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},["A: 3블록 반환","A: release 3"]);
    p.el('text',{x:780,y:752,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},["B: 3블록 배정","B: allocate 3"]);
    p.el('text',{x:72,y:872,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"start"},["B의 출력","B’s output"]);
    p.el("path",{d:"M220,876 L1124.0,876.0",stroke:C.teal,"stroke-width":2.5,fill:"none"});
    p.el("path",{d:"M1134,876 L1124.0,880.5 L1124.0,871.5 Z",fill:C.teal});
    p.el("rect",{x:248,y:852,width:52,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:274,y:883,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"x0");
    p.el("rect",{x:344,y:852,width:52,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:370,y:883,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"x1");
    p.el("rect",{x:964,y:852,width:52,height:48,rx:5,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:990,y:883,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"x2");
    p.el("rect",{x:1059,y:852,width:52,height:48,rx:5,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1085,y:883,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"x3");
    p.el("path",{d:"M397,925 V936 H963 V925",stroke:C.teal,"stroke-width":2.5,fill:"none"});
    p.el('text',{x:680,y:978,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["대기 + KV 재계산 동안 새 출력 없음","No new output while waiting and recomputing KV"]);
    return [p];
  },
} satisfies FigureSpec;
