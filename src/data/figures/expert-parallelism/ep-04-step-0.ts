import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"expert-parallelism",figureId:"ep-04-step-0",number:"ep-04-step-0",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Expert가 같은 개수여도 처리할 토큰 수는 다릅니다","Equal expert counts can receive different token counts"],
  subtitle:["처음에는 GPU마다 토큰 4개 · 라우팅 후에는 GPU0에 2개, GPU1에 6개","Four tokens per GPU initially; routing assigns two to GPU0 and six to GPU1."],
  alt:["같은 수의 토큰에서 출발해도 라우팅 뒤 E0/E1/E2/E3는 각각 1/1/6/0개를 처리한다. 같은 Expert 수를 가진 GPU0과 GPU1의 토큰 계산량은 2/6개로 달라진다.","Equal initial token counts become 1/1/6/0 across E0/E1/E2/E3 after routing. GPU0 and GPU1 each hold two experts but process two and six tokens."],
  caption:["공통 구간에서 입력을 고르게 나누어도, Expert 구간의 작업량까지 고르게 나뉘지는 않습니다.","Splitting inputs evenly in the shared layers does not split the expert workload evenly."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1011,1104,[48,196]);
    p.el("rect",{x:48,y:205,width:480,height:925,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:249,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el("rect",{x:672,y:205,width:480,height:925,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:249,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el('text',{x:288,y:297,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["출발: 토큰 4개","Start: four tokens"]);
    p.el("rect",{x:105,y:320,width:150,height:44,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:349,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A1");
    p.el("rect",{x:321,y:320,width:150,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:396,y:349,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A2");
    p.el("rect",{x:105,y:378,width:150,height:44,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:180,y:407,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A3");
    p.el("rect",{x:321,y:378,width:150,height:44,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:396,y:407,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A4");
    p.el("path",{d:"M288,428 L288,465",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:78,y:474,width:420,height:82,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:288,y:508,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Router");
    p.el('text',{x:288,y:542,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰마다 Expert 하나 선택","Select one expert per token"]);
    p.el('text',{x:912,y:297,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["출발: 토큰 4개","Start: four tokens"]);
    p.el("rect",{x:729,y:320,width:150,height:44,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:804,y:349,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B1");
    p.el("rect",{x:945,y:320,width:150,height:44,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:349,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B2");
    p.el("rect",{x:729,y:378,width:150,height:44,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:804,y:407,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B3");
    p.el("rect",{x:945,y:378,width:150,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1020,y:407,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B4");
    p.el("path",{d:"M912,428 L912,465",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:702,y:474,width:420,height:82,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:912,y:508,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"middle"},"Router");
    p.el('text',{x:912,y:542,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["토큰마다 Expert 하나 선택","Select one expert per token"]);
    p.el("path",{d:"M356,556 L356,595 L804,595 L804,714",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:600,y:580,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"A2 · A3 · A4");
    p.el("path",{d:"M844,556 L844,658 L396,658 L396,714",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:600,y:646,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"B1");
    p.el("path",{d:"M180,556 L180,714",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M1020,556 L1020,688 L875,688 L875,714",fill:"none",stroke:C.muted,"stroke-width":3,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:82,y:722,width:196,height:256,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:180,y:758,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E0");
    p.el("rect",{x:298,y:722,width:196,height:256,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:396,y:758,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E1");
    p.el("rect",{x:706,y:722,width:196,height:256,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:804,y:758,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E2");
    p.el("rect",{x:922,y:722,width:196,height:256,rx:10,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1020,y:758,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},"E3");
    p.el("rect",{x:96,y:783,width:78,height:44,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:135,y:812,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A1");
    p.el('text',{x:180,y:953,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["1개","1 token"]);
    p.el("rect",{x:312,y:783,width:78,height:44,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:351,y:812,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B1");
    p.el('text',{x:396,y:953,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["1개","1 token"]);
    p.el("rect",{x:720,y:783,width:78,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:759,y:812,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A2");
    p.el("rect",{x:810,y:783,width:78,height:44,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:849,y:812,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A3");
    p.el("rect",{x:720,y:836,width:78,height:44,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:759,y:865,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"A4");
    p.el("rect",{x:810,y:836,width:78,height:44,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:849,y:865,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B2");
    p.el("rect",{x:720,y:889,width:78,height:44,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:759,y:918,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B3");
    p.el("rect",{x:810,y:889,width:78,height:44,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:849,y:918,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B4");
    p.el('text',{x:804,y:953,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["6개","6 tokens"]);
    p.el('text',{x:1020,y:816,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["입력 없음","No inputs"]);
    p.el('text',{x:1020,y:953,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["0개","0 tokens"]);
    p.el('text',{x:288,y:1028,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["Expert 2개 · 처리할 토큰 2개","2 experts · 2 tokens to process"]);
    p.el('text',{x:288,y:1080,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["Expert 수는 같아도, 라우팅 결과는 다름","Same expert count; different routed load"]);
    p.el('text',{x:912,y:1028,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["Expert 2개 · 처리할 토큰 6개","2 experts · 6 tokens to process"]);
    p.el('text',{x:912,y:1080,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["Expert 수는 같아도, 라우팅 결과는 다름","Same expert count; different routed load"]);
    p.el('text',{x:600,y:1192,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["같은 크기의 Expert 4개 · Top-1 · 토큰 수 비교이며 실행 시간의 비율은 아닙니다.","Four equally sized experts · Top-1 · Token counts do not imply a runtime ratio."]);
    return [p];
  },
} satisfies FigureSpec;
