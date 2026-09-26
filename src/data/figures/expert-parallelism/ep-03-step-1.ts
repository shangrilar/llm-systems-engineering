import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"expert-parallelism",figureId:"ep-03-step-1",number:"ep-03-step-1",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["여러 Expert의 결과도 같은 토큰으로 돌아오기","Return multiple expert results to the same token"],
  subtitle:["같은 A2 벡터를 두 Expert에 전달","Send the same A2 vector to both experts"],
  alt:["GPU0의 A2가 E0과 원격 GPU1의 E2를 선택한다. 두 결과 u0/u2를 GPU0에서 0.7/0.3으로 가중합해 y(A2)를 만든다.","A2 on GPU0 selects local E0 and remote E2 on GPU1. Their results u0/u2 return to GPU0 and are weighted 0.7/0.3 to produce y(A2)."],
  caption:["다른 토큰의 흐름은 생략했습니다. 두 Expert의 결과는 출발 GPU에서 가중합합니다.","Other tokens’ flows are omitted; the two expert outputs are combined on the source GPU."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1209,1104,[48,196]);
    p.el("rect",{x:48,y:205,width:480,height:1120,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:249,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el("rect",{x:672,y:205,width:480,height:1120,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:249,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el('text',{x:288,y:291,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["A2의 출발 GPU","Source GPU for A2"]);
    p.el("rect",{x:218,y:313,width:140,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:288,y:342,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A2");
    p.el('text',{x:912,y:314,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["다른 토큰의 흐름은 생략","Other tokens omitted"]);
    p.el("path",{d:"M288,365 L288,388",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:78,y:397,width:420,height:106,rx:10,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:431,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Router");
    p.el('text',{x:288,y:465,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"E0: 0.7     E2: 0.3");
    p.el("rect",{x:82,y:700,width:196,height:210,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:180,y:736,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E0");
    p.el("rect",{x:298,y:700,width:196,height:210,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:396,y:736,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E1");
    p.el("rect",{x:706,y:700,width:196,height:210,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:804,y:736,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E2");
    p.el("rect",{x:922,y:700,width:196,height:210,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1020,y:736,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E3");
    p.el('text',{x:396,y:817,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["A2는 선택 안 함","Not selected for A2"]);
    p.el('text',{x:1020,y:817,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["A2는 선택 안 함","Not selected for A2"]);
    p.el("path",{d:"M220,503 L180,560 L180,695",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M356,503 L356,602 L804,602 L804,695",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:110,y:770,width:140,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:180,y:799,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A2");
    p.el("rect",{x:734,y:770,width:140,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:804,y:799,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A2");
    p.el('text',{x:600,y:657,fill:C.ink,"font-size":22,"font-weight":700,"text-anchor":"middle"},["두 Expert에 같은 입력 벡터","Same input vector for both experts"]);
    p.el("rect",{x:68,y:1098,width:440,height:137,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:1132,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},["GPU0 · A2의 결과 결합","GPU0 · Combine results for A2"]);
    p.el('text',{x:288,y:1166,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["두 출력이 모두 필요","Both outputs are needed"]);
    p.el('text',{x:600,y:1390,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["다른 토큰끼리 합치지 않습니다. 같은 A2에서 나온 두 결과만 결합합니다.","Combine only the two results for A2, never results from different tokens."]);
    return [p];
  },
} satisfies FigureSpec;
