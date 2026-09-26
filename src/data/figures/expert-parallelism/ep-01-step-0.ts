import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"expert-parallelism",figureId:"ep-01-step-0",number:"ep-01-step-0",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["어텐션은 복제하고, Expert는 나누어 배치하기","Replicate attention and partition experts"],
  subtitle:["두 GPU가 서로 다른 시퀀스를 맡고, MoE 구간에서 토큰과 결과를 교환합니다.","Two GPUs handle different sequences and exchange tokens and results in the MoE block."],
  alt:["GPU0과 GPU1의 어텐션 및 Router 가중치는 복제한다. GPU0에는 E0/E1, GPU1에는 E2/E3를 둔다. 토큰은 Expert로 전달되고 결과는 출발 GPU의 원래 토큰으로 돌아가 다음 공통 연산에 사용된다.","Attention and router weights are replicated on GPU0 and GPU1. E0/E1 reside on GPU0; E2/E3 on GPU1. Tokens travel to experts; results return to the source GPU and original token for the next common operation."],
  caption:["어텐션과 Router 가중치는 복제하므로, Expert를 반씩 나누어도 전체 메모리가 반으로 줄지는 않습니다.","Attention and Router weights are replicated, so splitting the experts in half does not halve total memory."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1346,1104,[48,196]);
    p.el("rect",{x:48,y:205,width:480,height:1275,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:249,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el("rect",{x:672,y:205,width:480,height:1275,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:249,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el('text',{x:288,y:289,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["입력 시퀀스 A","Input sequence A"]);
    p.el("rect",{x:110,y:310,width:140,height:44,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:339,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A1");
    p.el("rect",{x:326,y:310,width:140,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:396,y:339,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A2");
    p.el("path",{d:"M288,361 L288,393",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:78,y:401,width:420,height:101,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:435,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["어텐션 등 공통 부분 · DP","Attention / common layers · DP"]);
    p.el('text',{x:288,y:469,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["같은 가중치의 복제본","Replicas of the same weights"]);
    p.el("path",{d:"M288,509 L288,541",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:125,y:548,width:326,height:84,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:582,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Router");
    p.el('text',{x:288,y:616,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["자기 토큰의 Expert 선택","Select experts for local tokens"]);
    p.el('text',{x:912,y:289,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["입력 시퀀스 B","Input sequence B"]);
    p.el("rect",{x:734,y:310,width:140,height:44,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:804,y:339,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B1");
    p.el("rect",{x:950,y:310,width:140,height:44,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:339,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B2");
    p.el("path",{d:"M912,361 L912,393",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:702,y:401,width:420,height:101,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:435,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["어텐션 등 공통 부분 · DP","Attention / common layers · DP"]);
    p.el('text',{x:912,y:469,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["같은 가중치의 복제본","Replicas of the same weights"]);
    p.el("path",{d:"M912,509 L912,541",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:749,y:548,width:326,height:84,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:582,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Router");
    p.el('text',{x:912,y:616,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["자기 토큰의 Expert 선택","Select experts for local tokens"]);
    p.el('text',{x:600,y:670,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["선택한 Expert 쪽으로 토큰 전달","Dispatch tokens to selected experts"]);
    p.el("path",{d:"M220,632 L220,793",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M356,632 L356,702 L804,702 L804,793",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M844,632 L844,747 L396,747 L396,793",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M980,632 L980,776 L864,776 L864,793",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:82,y:800,width:196,height:126,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:180,y:836,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E0");
    p.el("rect",{x:298,y:800,width:196,height:126,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:396,y:836,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E1");
    p.el("rect",{x:706,y:800,width:196,height:126,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:804,y:836,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E2");
    p.el("rect",{x:922,y:800,width:196,height:126,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1020,y:836,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E3");
    p.el('text',{x:180,y:877,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["서로 다른 가중치","Distinct weights"]);
    p.el('text',{x:396,y:877,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["서로 다른 가중치","Distinct weights"]);
    p.el('text',{x:804,y:877,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["서로 다른 가중치","Distinct weights"]);
    p.el('text',{x:1020,y:877,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["서로 다른 가중치","Distinct weights"]);
    p.el('text',{x:600,y:841,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"EP");
    p.el('text',{x:600,y:879,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["분할 보관","Sharded"]);
    p.el("path",{d:"M180,926 L180,1139",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M804,926 L804,1010 L356,1010 L356,1139",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M396,926 L396,1060 L844,1060 L844,1139",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M864,926 L864,1139",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:600,y:1106,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["출발 GPU로 결과 회수","Return results to the source GPU"]);
    p.el("rect",{x:78,y:1147,width:420,height:94,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:1181,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["원래 토큰별 결과","Results for original tokens"]);
    p.el('text',{x:288,y:1215,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"A1 · A2");
    p.el("path",{d:"M288,1249 L288,1281",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:78,y:1289,width:420,height:110,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:1323,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["다음 공통 연산 · DP","Next common operation · DP"]);
    p.el('text',{x:288,y:1357,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["자기 입력의 계산을 이어감","Continue each local input"]);
    p.el("rect",{x:702,y:1147,width:420,height:94,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:1181,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["원래 토큰별 결과","Results for original tokens"]);
    p.el('text',{x:912,y:1215,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"B1 · B2");
    p.el("path",{d:"M912,1249 L912,1281",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:702,y:1289,width:420,height:110,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:1323,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["다음 공통 연산 · DP","Next common operation · DP"]);
    p.el('text',{x:912,y:1357,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["자기 입력의 계산을 이어감","Continue each local input"]);
    p.el('text',{x:600,y:1444,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["GPU는 그대로 · 연산 부분에 따라 DP와 EP를 적용","Same GPUs · Different parallelism for different model parts"]);
    p.el('text',{x:600,y:1527,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["예시: 공통 가중치와 Router는 복제 · Expert 가중치는 분할 · 순전파","Example: replicate common weights and router; partition experts. Forward pass."]);
    return [p];
  },
} satisfies FigureSpec;
