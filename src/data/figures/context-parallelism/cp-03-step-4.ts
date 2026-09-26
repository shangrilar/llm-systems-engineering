import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"context-parallelism",figureId:"cp-03-step-4",number:"cp-03-step-4",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["Ring: Q는 두고, K·V 블록을 차례로 가져옵니다","Ring: keep Q in place and bring in K·V blocks"],
  subtitle:["한 헤드의 토큰 8개를 GPU 4개에 분할 · 모든 토큰을 참조하는 예시","One head, 8 tokens across 4 GPUs · Each query attends to all tokens"],
  alt:["단계 5. GPU 0은 Q(t0,t1)을 유지하며 KV0, KV3, KV2, KV1 블록의 기여를 정규화 통계와 함께 누적한다.","Step 5. GPU 0 keeps Q(t0,t1) and accumulates contributions from KV0, KV3, KV2, KV1 with normalization statistics."],
  caption:["Q는 각 GPU에 남고, K·V 블록이 차례로 도착할 때마다 기여를 정규화 통계와 함께 누적합니다.","Q stays on each GPU; as each K/V block arrives, its contribution is accumulated with the normalization statistics."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M1 1 L9 5 L1 9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.5\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,1177,1104,[48,148]);
    p.el("rect",{x:442,y:155,width:316,height:198,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:460,y:188,"font-size":24,fill:C.blue,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:498,y:228,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["Q0 고정","Q0 fixed"]);
    p.el("rect",{x:472,y:243,width:26,height:26,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:498,y:243,width:26,height:26,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:472,y:269,width:26,height:26,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:498,y:269,width:26,height:26,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("path",{d:"M562,266 L619,266",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:685,y:228,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["출력 O0","Output O0"]);
    p.el("rect",{x:659,y:243,width:26,height:26,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:685,y:243,width:26,height:26,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:659,y:269,width:26,height:26,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:685,y:269,width:26,height:26,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:600,y:331,"font-size":18,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["내 토큰 t0·t1의 출력 완성","Output for t0·t1 complete"]);
    p.el("rect",{x:827,y:410,width:316,height:198,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:845,y:443,"font-size":24,fill:C.orange,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:883,y:483,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["Q1 고정","Q1 fixed"]);
    p.el("rect",{x:857,y:498,width:26,height:26,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:883,y:498,width:26,height:26,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:857,y:524,width:26,height:26,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:883,y:524,width:26,height:26,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("path",{d:"M947,521 L1004,521",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:1070,y:483,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["출력 O1","Output O1"]);
    p.el("rect",{x:1044,y:498,width:26,height:26,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:1070,y:498,width:26,height:26,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:1044,y:524,width:26,height:26,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:1070,y:524,width:26,height:26,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:985,y:586,"font-size":18,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["내 토큰 t2·t3의 출력 완성","Output for t2·t3 complete"]);
    p.el("rect",{x:442,y:671,width:316,height:198,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:460,y:704,"font-size":24,fill:C.teal,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el('text',{x:498,y:744,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["Q2 고정","Q2 fixed"]);
    p.el("rect",{x:472,y:759,width:26,height:26,fill:C.tealFill,stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:498,y:759,width:26,height:26,fill:C.tealFill,stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:472,y:785,width:26,height:26,fill:C.tealFill,stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:498,y:785,width:26,height:26,fill:C.tealFill,stroke:C.teal,"stroke-width":1});
    p.el("path",{d:"M562,782 L619,782",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:685,y:744,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["출력 O2","Output O2"]);
    p.el("rect",{x:659,y:759,width:26,height:26,fill:C.tealFill,stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:685,y:759,width:26,height:26,fill:C.tealFill,stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:659,y:785,width:26,height:26,fill:C.tealFill,stroke:C.teal,"stroke-width":1});
    p.el("rect",{x:685,y:785,width:26,height:26,fill:C.tealFill,stroke:C.teal,"stroke-width":1});
    p.el('text',{x:600,y:847,"font-size":18,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["내 토큰 t4·t5의 출력 완성","Output for t4·t5 complete"]);
    p.el("rect",{x:57,y:410,width:316,height:198,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:75,y:443,"font-size":24,fill:C.purple,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el('text',{x:113,y:483,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["Q3 고정","Q3 fixed"]);
    p.el("rect",{x:87,y:498,width:26,height:26,fill:C.purpleFill,stroke:C.purple,"stroke-width":1});
    p.el("rect",{x:113,y:498,width:26,height:26,fill:C.purpleFill,stroke:C.purple,"stroke-width":1});
    p.el("rect",{x:87,y:524,width:26,height:26,fill:C.purpleFill,stroke:C.purple,"stroke-width":1});
    p.el("rect",{x:113,y:524,width:26,height:26,fill:C.purpleFill,stroke:C.purple,"stroke-width":1});
    p.el("path",{d:"M177,521 L234,521",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":"url(#ported-arrow)"});
    p.el('text',{x:300,y:483,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["출력 O3","Output O3"]);
    p.el("rect",{x:274,y:498,width:26,height:26,fill:C.purpleFill,stroke:C.purple,"stroke-width":1});
    p.el("rect",{x:300,y:498,width:26,height:26,fill:C.purpleFill,stroke:C.purple,"stroke-width":1});
    p.el("rect",{x:274,y:524,width:26,height:26,fill:C.purpleFill,stroke:C.purple,"stroke-width":1});
    p.el("rect",{x:300,y:524,width:26,height:26,fill:C.purpleFill,stroke:C.purple,"stroke-width":1});
    p.el('text',{x:215,y:586,"font-size":18,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["내 토큰 t6·t7의 출력 완성","Output for t6·t7 complete"]);
    p.el('text',{x:600,y:438,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["내 토큰의 어텐션 완성","My tokens’ attention is complete"]);
    p.el('text',{x:600,y:480,"font-size":25,fill:C.teal,"font-weight":700,"text-anchor":"middle"},["다음 연산으로 전달","Pass to the next operation"]);
    p.el("rect",{x:417,y:521,width:366,height:44,rx:10,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el('text',{x:600,y:550,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},["4개 블록 계산 완료","All 4 blocks processed"]);
    p.el('text',{x:600,y:606,"font-size":20,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["GPU 0을 아래에서 따라갑니다","Follow GPU 0 below"]);
    p.el("rect",{x:48,y:920,width:1104,height:337,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:960,"font-size":25,fill:C.blue,"font-weight":700,"text-anchor":"start"},["GPU 0: Q0가 참조한 K·V 블록","GPU 0: K·V blocks used by Q0"]);
    p.el('text',{x:130,y:1007,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"t0");
    p.el("rect",{x:100,y:1022,width:60,height:46,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:130,y:1053,"font-size":23,fill:C.blue,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:100,y:1070,width:60,height:46,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:130,y:1101,"font-size":23,fill:C.blue,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:192,y:1007,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"t1");
    p.el("rect",{x:162,y:1022,width:60,height:46,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:192,y:1053,"font-size":23,fill:C.blue,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:162,y:1070,width:60,height:46,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:192,y:1101,"font-size":23,fill:C.blue,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:254,y:1007,"font-size":20,fill:C.orange,"font-weight":700,"text-anchor":"middle"},"t2");
    p.el("rect",{x:224,y:1022,width:60,height:46,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:254,y:1053,"font-size":23,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:224,y:1070,width:60,height:46,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:254,y:1101,"font-size":23,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:316,y:1007,"font-size":20,fill:C.orange,"font-weight":700,"text-anchor":"middle"},"t3");
    p.el("rect",{x:286,y:1022,width:60,height:46,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:316,y:1053,"font-size":23,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:286,y:1070,width:60,height:46,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:316,y:1101,"font-size":23,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:378,y:1007,"font-size":20,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"t4");
    p.el("rect",{x:348,y:1022,width:60,height:46,rx:0,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:378,y:1053,"font-size":23,fill:C.teal,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:348,y:1070,width:60,height:46,rx:0,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:378,y:1101,"font-size":23,fill:C.teal,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:440,y:1007,"font-size":20,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"t5");
    p.el("rect",{x:410,y:1022,width:60,height:46,rx:0,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:440,y:1053,"font-size":23,fill:C.teal,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:410,y:1070,width:60,height:46,rx:0,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:440,y:1101,"font-size":23,fill:C.teal,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:502,y:1007,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},"t6");
    p.el("rect",{x:472,y:1022,width:60,height:46,rx:0,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:502,y:1053,"font-size":23,fill:C.purple,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:472,y:1070,width:60,height:46,rx:0,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:502,y:1101,"font-size":23,fill:C.purple,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:564,y:1007,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},"t7");
    p.el("rect",{x:534,y:1022,width:60,height:46,rx:0,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:564,y:1053,"font-size":23,fill:C.purple,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:534,y:1070,width:60,height:46,rx:0,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:564,y:1101,"font-size":23,fill:C.purple,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:89,y:1053,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"end"},"t0");
    p.el('text',{x:89,y:1101,"font-size":20,fill:C.blue,"font-weight":700,"text-anchor":"end"},"t1");
    p.el('text',{x:720,y:1015,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"start"},["방문 순서: KV0 → KV3 → KV2 → KV1","Visited: KV0 → KV3 → KV2 → KV1"]);
    p.el('text',{x:720,y:1059,"font-size":20,fill:C.ink,"font-weight":400,"text-anchor":"start"},["Q0 × Kᵀ → 점수","Q0 × Kᵀ → Scores"]);
    p.el('text',{x:720,y:1094,"font-size":20,fill:C.ink,"font-weight":400,"text-anchor":"start"},["현재 V → 누적 출력에 반영","Current V → Running output"]);
    p.el('text',{x:76,y:1159,"font-size":23,fill:C.purple,"font-weight":700,"text-anchor":"start"},["누적하는 것: 가중합 + 정규화에 필요한 최댓값·분모","Accumulate: weighted sum + maximum and denominator for normalization"]);
    p.el('text',{x:76,y:1208,"font-size":22,fill:C.ink,"font-weight":700,"text-anchor":"start"},["전체 참조 범위에 맞춘 출력 O0 완성","Output O0 is complete over the full context"]);
    p.el('text',{x:600,y:1310,"font-size":23,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["모든 GPU가 자기 Q에 대해 같은 과정을 동시에 진행합니다.","Every GPU follows the same process for its own Q in parallel."]);
    return [p];
  },
} satisfies FigureSpec;
