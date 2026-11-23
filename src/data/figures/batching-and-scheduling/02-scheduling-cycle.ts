import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"batching-and-scheduling",figureId:"02-scheduling-cycle",number:"02-scheduling-cycle",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["실행 사이에 다음 배치를 다시 구성하기","Rebuild the batch between executions"],
  subtitle:["대기 큐, 진행 중인 요청의 상태, 실제로 실행할 배치는 서로 구별합니다.","Distinguish the queue, admitted request state, and the next batch."],
  alt:["실행 결과 A가 완료되고 B는 계속 생성한다. A가 독점 소유한 GPU KV를 반환하고 B의 KV는 유지한다. GPU KV가 없는 새 요청 C·D를 도착 순서대로 검토해 자원이 충분한 C를 합류시킨다. 최대 두 요청을 실행하는 예시에서 다음 배치는 B의 Decode와 C의 Prefill이며 D는 기다린다. 실행 결과를 다시 반영하는 화살표가 반복을 나타낸다.","A completes and B continues. A’s exclusively owned GPU KV is released while B’s KV is retained. New requests C and D have no GPU KV and are considered in arrival order. C fits the available resources. With at most two requests per execution, the next batch is B Decode and C Prefill while D waits. The returning arrow feeds execution results into the next decision."],
  caption:["완료된 요청의 KV를 반환하고, 도착 순서대로 자원이 충분한 새 요청을 다음 배치에 합류시킵니다.","KV of finished requests is returned, and waiting requests join the next batch in arrival order when resources allow."],
  sources:[],
  defs:"<marker id=\"ported-batch-arrow\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"9\" markerHeight=\"9\" markerUnits=\"userSpaceOnUse\" orient=\"auto\"><path d=\"M2,1 L8,5 L2,9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.7\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,751,1104,[48,196]);
    p.el('text',{x:48,y:220,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["1. 실행 결과","1. Execution results"]);
    p.el("rect",{x:48,y:249,width:352,height:552,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:424,y:220,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["2. 상태 갱신과 자원 확인","2. Update and check"]);
    p.el("rect",{x:424,y:249,width:352,height:552,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:800,y:220,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["3. 다음 배치 실행","3. Execute next batch"]);
    p.el("rect",{x:800,y:249,width:352,height:552,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:294,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["진행 중인 요청","Admitted requests"]);
    p.el("rect",{x:72,y:314,width:304,height:52,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:224,y:348.16,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["A · 완료 ✓","A · complete ✓"]);
    p.el("rect",{x:72,y:380,width:304,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:224,y:414.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["B · 계속 생성","B · continue"]);
    p.el('text',{x:72,y:481,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["GPU에 보관 중인 KV","KV stored on the GPU"]);
    p.el("rect",{x:72,y:502,width:144,height:52,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:144,y:536.16,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},"A KV");
    p.el("rect",{x:232,y:502,width:144,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:304,y:536.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B KV");
    p.el("path",{d:"M72,590 H376",stroke:C.line});
    p.el('text',{x:72,y:630,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["대기 큐 · 도착 순서","Queue · arrival order"]);
    p.el("rect",{x:72,y:651,width:144,height:52,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:144,y:685.16,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"C");
    p.el("rect",{x:232,y:651,width:144,height:52,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:304,y:685.16,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},"D");
    p.el('text',{x:224,y:749,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["C·D는 GPU KV 없음","C and D have no GPU KV"]);
    p.el('text',{x:448,y:294,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["A 제거, B 유지","Remove A; retain B"]);
    p.el("rect",{x:448,y:314,width:304,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:600,y:348.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["B · 계속 생성","B · continue"]);
    p.el('text',{x:448,y:413,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"start"},["A의 KV 공간 반환","Release A’s KV allocation"]);
    p.el("rect",{x:448,y:437,width:144,height:52,rx:8,fill:"white",stroke:C.blue,"stroke-width":1.5,"stroke-dasharray":"5 5"});
    p.el('text',{x:520,y:471,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["반환됨","Freed"]);
    p.el("rect",{x:608,y:437,width:144,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:680,y:471.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B KV");
    p.el("rect",{x:448,y:537,width:304,height:218,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:600,y:577,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"middle"},["C부터 합류 검토","Check C first"]);
    p.el('text',{x:472,y:632,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},["✓ 실행 토큰 예산","✓ Step token budget"]);
    p.el('text',{x:472,y:674,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},["✓ 필요한 KV 공간","✓ Required KV space"]);
    p.el('text',{x:600,y:723,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["이 예시에서는 충분","Both fit in this example"]);
    p.el('text',{x:824,y:294,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["이번에 선택한 작업","Work selected now"]);
    p.el("rect",{x:824,y:314,width:304,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:976,y:348.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B · Decode");
    p.el("rect",{x:824,y:380,width:304,height:52,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:976,y:414.16,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"C · Prefill");
    p.el("path",{d:"M976,443 L976,474",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("rect",{x:824,y:489,width:304,height:91,rx:10,fill:C.indigoFill,stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:976,y:544,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["GPU 실행","GPU execution"]);
    p.el("path",{d:"M824,617 H1128",stroke:C.line});
    p.el('text',{x:824,y:657,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["대기 큐","Waiting queue"]);
    p.el("rect",{x:824,y:679,width:304,height:52,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:976,y:712.82,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},["D · 다음 기회 대기","D · still waiting"]);
    p.el('text',{x:976,y:774,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["동시에 최대 2개 요청","At most 2 requests at once"]);
    p.el("path",{d:"M403,340 L419,340",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("path",{d:"M779,340 L795,340",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("path",{d:"M1132,535 H1175 V872 H24 V340 H43",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el('text',{x:600,y:847,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["실행 결과를 반영하고, 다음 배치를 다시 구성","Use the execution results to build the next batch again"]);
    p.el('text',{x:48,y:932,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["완료된 요청이 없어도, 자원이 충분하면 새 요청을 추가할 수 있습니다.","A new request can join without a completion if sufficient resources are available."]);
    return [p];
  },
} satisfies FigureSpec;
