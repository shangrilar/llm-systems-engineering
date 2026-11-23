import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"expert-parallelism",figureId:"ep-02-step-5",number:"ep-02-step-5",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["토큰을 Expert로 보내고 원래 위치로 돌려받기","Send tokens to experts and return their results"],
  subtitle:["복구: 원래 순서로 다음 연산에 연결","Restore: original order for the next operation"],
  alt:["GPU0은 A1·A2, GPU1은 B1·B2의 결과를 원래 순서로 사용합니다.","GPU0 uses A1, A2 results; GPU1 uses B1, B2 results, in their original order."],
  caption:["토큰의 색과 이름, GPU와 Expert의 위치는 모든 단계에서 그대로 유지됩니다.","Token colors and names, and the positions of GPUs and experts, stay fixed across all steps."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1218,1104,[48,196]);
    p.el("rect",{x:48,y:205,width:480,height:1090,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:249,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el("rect",{x:672,y:205,width:480,height:1090,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:249,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el('text',{x:288,y:291,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["출발 위치: 시퀀스 A","Source: sequence A"]);
    p.el('text',{x:288,y:341,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"A1 · A2");
    p.el("rect",{x:78,y:398,width:420,height:112,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:432,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Router");
    p.el('text',{x:288,y:466,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["같은 가중치 · 자기 토큰으로 선택","Same weights; route local tokens"]);
    p.el('text',{x:288,y:497,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A1 → E0    A2 → E2");
    p.el('text',{x:912,y:291,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["출발 위치: 시퀀스 B","Source: sequence B"]);
    p.el('text',{x:912,y:341,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"B1 · B2");
    p.el("rect",{x:702,y:398,width:420,height:112,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:432,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Router");
    p.el('text',{x:912,y:466,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["같은 가중치 · 자기 토큰으로 선택","Same weights; route local tokens"]);
    p.el('text',{x:912,y:497,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B1 → E1    B2 → E2");
    p.el("rect",{x:82,y:704,width:196,height:240,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:180,y:740,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E0");
    p.el("rect",{x:298,y:704,width:196,height:240,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:396,y:740,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E1");
    p.el("rect",{x:706,y:704,width:196,height:240,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:804,y:740,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E2");
    p.el("rect",{x:922,y:704,width:196,height:240,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1020,y:740,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E3");
    p.el('text',{x:180,y:826,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["Expert 가중치 유지","Weights stay here"]);
    p.el('text',{x:396,y:826,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["Expert 가중치 유지","Weights stay here"]);
    p.el('text',{x:804,y:826,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["Expert 가중치 유지","Weights stay here"]);
    p.el('text',{x:1020,y:826,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["Expert 가중치 유지","Weights stay here"]);
    p.el("rect",{x:78,y:1056,width:420,height:106,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:1085,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["원래 토큰 순서의 출력","Output in original token order"]);
    p.el("rect",{x:97,y:1102,width:166,height:44,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:1131,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"y(A1)");
    p.el("rect",{x:313,y:1102,width:166,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:396,y:1131,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"y(A2)");
    p.el("path",{d:"M288,1169 L288,1190",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:78,y:1200,width:420,height:77,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:1234,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["다음 공통 연산","Next common operation"]);
    p.el('text',{x:288,y:1268,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"");
    p.el("rect",{x:702,y:1056,width:420,height:106,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:1085,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["원래 토큰 순서의 출력","Output in original token order"]);
    p.el("rect",{x:721,y:1102,width:166,height:44,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:804,y:1131,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"y(B1)");
    p.el("rect",{x:937,y:1102,width:166,height:44,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:1131,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"y(B2)");
    p.el("path",{d:"M912,1169 L912,1190",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:702,y:1200,width:420,height:77,rx:10,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:1234,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["다음 공통 연산","Next common operation"]);
    p.el('text',{x:912,y:1268,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"");
    p.el('text',{x:600,y:1354,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["GPU0은 A1·A2, GPU1은 B1·B2의 결과를 원래 순서로 사용합니다.","GPU0 uses A1, A2 results; GPU1 uses B1, B2 results, in their original order."]);
    p.el('text',{x:600,y:1400,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["Top-1 · 색과 이름은 토큰 식별 · u는 Expert 출력, y는 토큰별 최종 출력","Top-1 · Color/name identify tokens · u = expert output; y = final token output"]);
    return [p];
  },
} satisfies FigureSpec;
