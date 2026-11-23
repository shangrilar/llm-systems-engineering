import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"batching-and-scheduling",figureId:"01-batch-composition",number:"01-batch-composition",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["정적 배칭과 연속 배칭","Static and continuous batching"],
  subtitle:["같은 요청이라도, 다음 실행에 넣는 요청을 바꾸면 빈자리를 활용할 수 있습니다.","Changing which requests enter the next execution lets new work fill vacant slots."],
  alt:["각 카드는 한 번의 실행에 선택한 배치다. A·B는 Decode 중이고 실행 1에서 A가 완료된 뒤 C가 도착한다. 정적 배칭은 실행 3에서 B가 끝난 뒤 실행 4에 C의 Prefill을 넣는다. 연속 배칭은 실행 2의 배치를 B의 Decode와 C의 Prefill로 구성하고 실행 3에서 B·C가 완료된다.","Each card is the batch selected for one execution. A and B are decoding. A completes at execution 1, then C arrives. Static batching waits for B to finish at execution 3 and prefills C at execution 4. Continuous batching selects B Decode and C Prefill for execution 2; B and C complete at execution 3."],
  caption:["각 카드는 한 번의 실행에 선택한 배치입니다. 연속 배칭은 실행마다 배치를 다시 구성해 빈자리에 새 요청을 넣습니다.","Each card is the batch chosen for one run. Continuous batching rebuilds the batch every run and fills free slots with new requests."],
  sources:[],
  defs:"<marker id=\"ported-batch-arrow\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"9\" markerHeight=\"9\" markerUnits=\"userSpaceOnUse\" orient=\"auto\"><path d=\"M2,1 L8,5 L2,9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.7\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,787,1104,[48,196]);
    p.el('text',{x:48,y:205,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["P = Prefill · D = Decode · ✓ = 완료","P = Prefill · D = Decode · ✓ = complete"]);
    p.el('text',{x:1152,y:205,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"end"},["동시에 최대 2개 요청","At most 2 requests per execution"]);
    p.el('text',{x:48,y:262,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["정적 배칭","Static batching"]);
    p.el('text',{x:1152,y:262,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"end"},["묶음 전체가 끝난 뒤 새 요청 합류","Admit new requests after the whole batch finishes"]);
    p.el("rect",{x:148,y:286,width:188,height:188,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:242,y:319,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실행 1","Execution 1"]);
    p.el("rect",{x:161,y:334,width:162,height:52,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:242,y:368.16,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},"A · D ✓");
    p.el("rect",{x:161,y:400,width:162,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:242,y:434.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B · D");
    p.el("path",{d:"M338,380 L348,380",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("rect",{x:352,y:286,width:188,height:188,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:446,y:319,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실행 2","Execution 2"]);
    p.el("rect",{x:365,y:334,width:162,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:446,y:368.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B · D");
    p.el("rect",{x:365,y:400,width:162,height:52,rx:8,fill:C.surface,stroke:C.line,"stroke-width":1.5,"stroke-dasharray":"5 5"});
    p.el('text',{x:446,y:434,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["빈자리","Idle slot"]);
    p.el("path",{d:"M542,380 L552,380",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("rect",{x:556,y:286,width:188,height:188,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:650,y:319,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실행 3","Execution 3"]);
    p.el("rect",{x:569,y:334,width:162,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:650,y:368.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B · D ✓");
    p.el("rect",{x:569,y:400,width:162,height:52,rx:8,fill:C.surface,stroke:C.line,"stroke-width":1.5,"stroke-dasharray":"5 5"});
    p.el('text',{x:650,y:434,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["빈자리","Idle slot"]);
    p.el("path",{d:"M746,380 L756,380",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("rect",{x:760,y:286,width:188,height:188,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:854,y:319,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실행 4","Execution 4"]);
    p.el("rect",{x:773,y:334,width:162,height:52,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:854,y:368.16,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"C · P");
    p.el("rect",{x:773,y:400,width:162,height:52,rx:8,fill:C.surface,stroke:C.line,"stroke-width":1.5,"stroke-dasharray":"5 5"});
    p.el('text',{x:854,y:434,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["빈자리","Idle slot"]);
    p.el("path",{d:"M950,380 L960,380",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("rect",{x:964,y:286,width:188,height:188,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1058,y:319,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실행 5","Execution 5"]);
    p.el("rect",{x:977,y:334,width:162,height:52,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:1058,y:368.16,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"C · D ✓");
    p.el("rect",{x:977,y:400,width:162,height:52,rx:8,fill:C.surface,stroke:C.line,"stroke-width":1.5,"stroke-dasharray":"5 5"});
    p.el('text',{x:1058,y:434,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["빈자리","Idle slot"]);
    p.el('text',{x:48,y:512,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},["대기 큐","Queue"]);
    p.el("rect",{x:352,y:484,width:392,height:49,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:548,y:516.66,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},["C 대기","C waiting"]);
    p.el('text',{x:242,y:562,fill:C.purple,"font-size":22,"font-weight":400,"text-anchor":"middle"},["실행 1 뒤 C 도착","C arrives after 1"]);
    p.el('text',{x:650,y:562,fill:C.teal,"font-size":22,"font-weight":400,"text-anchor":"middle"},["B 완료","B completes"]);
    p.el('text',{x:854,y:562,fill:C.purple,"font-size":22,"font-weight":400,"text-anchor":"middle"},["C 합류","C admitted"]);
    p.el("path",{d:"M48,601 H1152",stroke:C.line});
    p.el('text',{x:48,y:653,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["연속 배칭","Continuous batching"]);
    p.el('text',{x:1152,y:653,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"end"},["매 실행 사이에 배치 갱신","Update the batch between executions"]);
    p.el("rect",{x:148,y:677,width:188,height:188,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:242,y:710,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실행 1","Execution 1"]);
    p.el("rect",{x:161,y:725,width:162,height:52,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:242,y:759.16,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},"A · D ✓");
    p.el("rect",{x:161,y:791,width:162,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:242,y:825.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B · D");
    p.el("path",{d:"M338,771 L348,771",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("rect",{x:352,y:677,width:188,height:188,rx:10,fill:C.surface,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:446,y:710,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실행 2","Execution 2"]);
    p.el("rect",{x:365,y:725,width:162,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:446,y:759.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B · D");
    p.el("rect",{x:365,y:791,width:162,height:52,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:446,y:825.16,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"C · P");
    p.el("path",{d:"M542,771 L552,771",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":"url(#ported-batch-arrow)"});
    p.el("rect",{x:556,y:677,width:188,height:188,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:650,y:710,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실행 3","Execution 3"]);
    p.el("rect",{x:569,y:725,width:162,height:52,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:650,y:759.16,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"B · D ✓");
    p.el("rect",{x:569,y:791,width:162,height:52,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:650,y:825.16,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"C · D ✓");
    p.el('text',{x:950,y:762,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["세 요청 모두 완료","All three requests complete"]);
    p.el('text',{x:950,y:808,fill:C.purple,"font-size":23,"font-weight":400,"text-anchor":"middle"},["C도 먼저 Prefill 수행","C also starts with Prefill"]);
    p.el('text',{x:242,y:906,fill:C.purple,"font-size":22,"font-weight":400,"text-anchor":"middle"},["실행 1 뒤 C 도착","C arrives after 1"]);
    p.el('text',{x:446,y:906,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"[A, B] → [B, C]");
    p.el('text',{x:48,y:968,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["가로 방향은 실행 순서입니다. A·B는 이미 Decode 중이며, C는 새 요청입니다.","Columns show execution order. A and B are already decoding; C is new."]);
    return [p];
  },
} satisfies FigureSpec;
