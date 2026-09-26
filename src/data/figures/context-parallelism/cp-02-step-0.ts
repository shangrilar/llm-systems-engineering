import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"context-parallelism",figureId:"cp-02-step-0",number:"cp-02-step-0",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["토큰을 나눠도 어텐션의 연결은 끊을 수 없습니다","Token partitioning must preserve attention connections"],
  subtitle:["인과적 어텐션 예시 · 행 = 질의 Q의 토큰 / 열 = 참조할 K의 토큰","Causal attention · Rows = query Q tokens / Columns = key K tokens"],
  alt:["GPU 1의 Q(t3)는 GPU 0에 있는 토큰 t0,t1의 K,V도 필요하다. 하삼각형 행렬에서 GPU 경계를 넘는 참조를 보여준다.","Q(t3) on GPU 1 also needs K,V for t0,t1 on GPU 0. The lower-triangular matrix shows references across the GPU boundary."],
  caption:["하삼각 행렬은 인과적 어텐션의 참조 범위를 나타냅니다.","The lower-triangular matrix shows the reference range of causal attention."],
  sources:[],
  defs:"<marker id=\"ported-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M1 1 L9 5 L1 9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.5\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,872,1104,[48,148]);
    p.el("rect",{x:48,y:147,width:528,height:252,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:70,y:181,"font-size":24,fill:C.blue,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:624,y:147,width:528,height:252,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:646,y:181,"font-size":24,fill:C.orange,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:158,y:223,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"Q");
    p.el("rect",{x:122,y:238,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:158,y:238,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:122,y:274,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:158,y:274,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:112,y:263.2,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t0");
    p.el('text',{x:112,y:299.2,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t1");
    p.el('text',{x:322,y:223,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"K");
    p.el("rect",{x:286,y:238,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:322,y:238,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:286,y:274,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:322,y:274,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:486,y:223,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"V");
    p.el("rect",{x:450,y:238,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:486,y:238,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:450,y:274,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el("rect",{x:486,y:274,width:36,height:36,fill:C.blueFill,stroke:C.blue,"stroke-width":1});
    p.el('text',{x:312,y:365,"font-size":22,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["내 토큰에서 Q·K·V를 계산","Compute Q·K·V from my tokens"]);
    p.el('text',{x:734,y:223,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"Q");
    p.el("rect",{x:698,y:238,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:734,y:238,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:698,y:274,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:734,y:274,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:688,y:263.2,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t2");
    p.el('text',{x:688,y:299.2,"font-size":19,fill:C.muted,"font-weight":400,"text-anchor":"end"},"t3");
    p.el('text',{x:898,y:223,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"K");
    p.el("rect",{x:862,y:238,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:898,y:238,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:862,y:274,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:898,y:274,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:1062,y:223,"font-size":20,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"V");
    p.el("rect",{x:1026,y:238,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:1062,y:238,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:1026,y:274,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el("rect",{x:1062,y:274,width:36,height:36,fill:C.orangeFill,stroke:C.orange,"stroke-width":1});
    p.el('text',{x:888,y:365,"font-size":22,fill:C.orange,"font-weight":700,"text-anchor":"middle"},["내 토큰에서 Q·K·V를 계산","Compute Q·K·V from my tokens"]);
    p.el('text',{x:600,y:453,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["Q 한 행은 참조 가능한 모든 K·V에 연결됩니다.","One Q row connects to every allowed K·V position."]);
    p.el("rect",{x:238,y:548,width:82,height:82,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:279,y:599.66,"font-size":26,fill:C.blue,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:320,y:548,width:82,height:82,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:361,y:599.66,"font-size":26,fill:"#c3cbd2","font-weight":400,"text-anchor":"middle"},"—");
    p.el("rect",{x:402,y:548,width:82,height:82,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:443,y:599.66,"font-size":26,fill:"#c3cbd2","font-weight":400,"text-anchor":"middle"},"—");
    p.el("rect",{x:484,y:548,width:82,height:82,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:525,y:599.66,"font-size":26,fill:"#c3cbd2","font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:218,y:600.48,"font-size":22,fill:C.blue,"font-weight":700,"text-anchor":"end"},"Q(t0)");
    p.el('text',{x:279,y:526,"font-size":21,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"K(t0)");
    p.el("rect",{x:238,y:630,width:82,height:82,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:279,y:681.66,"font-size":26,fill:C.blue,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:320,y:630,width:82,height:82,rx:0,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:361,y:681.66,"font-size":26,fill:C.blue,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:402,y:630,width:82,height:82,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:443,y:681.66,"font-size":26,fill:"#c3cbd2","font-weight":400,"text-anchor":"middle"},"—");
    p.el("rect",{x:484,y:630,width:82,height:82,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:525,y:681.66,"font-size":26,fill:"#c3cbd2","font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:218,y:682.48,"font-size":22,fill:C.blue,"font-weight":700,"text-anchor":"end"},"Q(t1)");
    p.el('text',{x:361,y:526,"font-size":21,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"K(t1)");
    p.el("rect",{x:238,y:712,width:82,height:82,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:279,y:763.66,"font-size":26,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:320,y:712,width:82,height:82,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:361,y:763.66,"font-size":26,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:402,y:712,width:82,height:82,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:443,y:763.66,"font-size":26,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:484,y:712,width:82,height:82,rx:0,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:525,y:763.66,"font-size":26,fill:"#c3cbd2","font-weight":400,"text-anchor":"middle"},"—");
    p.el('text',{x:218,y:764.48,"font-size":22,fill:C.orange,"font-weight":700,"text-anchor":"end"},"Q(t2)");
    p.el('text',{x:443,y:526,"font-size":21,fill:C.orange,"font-weight":700,"text-anchor":"middle"},"K(t2)");
    p.el("rect",{x:238,y:794,width:82,height:82,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:279,y:845.66,"font-size":26,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:320,y:794,width:82,height:82,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:361,y:845.66,"font-size":26,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:402,y:794,width:82,height:82,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:443,y:845.66,"font-size":26,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el("rect",{x:484,y:794,width:82,height:82,rx:0,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:525,y:845.66,"font-size":26,fill:C.orange,"font-weight":400,"text-anchor":"middle"},"●");
    p.el('text',{x:218,y:846.48,"font-size":22,fill:C.orange,"font-weight":700,"text-anchor":"end"},"Q(t3)");
    p.el('text',{x:525,y:526,"font-size":21,fill:C.orange,"font-weight":700,"text-anchor":"middle"},"K(t3)");
    p.el("rect",{x:238,y:794,width:328,height:82,rx:2,fill:"none",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:670,y:583,"font-size":25,fill:C.orange,"font-weight":700,"text-anchor":"start"},["예: GPU 1의 Q(t3)","Example: Q(t3) on GPU 1"]);
    p.el('text',{x:670,y:629,"font-size":22,fill:C.blue,"font-weight":700,"text-anchor":"start"},["t0·t1의 K·V → GPU 0에 있음","K·V for t0·t1 → On GPU 0"]);
    p.el('text',{x:670,y:671,"font-size":22,fill:C.orange,"font-weight":700,"text-anchor":"start"},["t2·t3의 K·V → GPU 1에 있음","K·V for t2·t3 → On GPU 1"]);
    p.el('text',{x:670,y:746,"font-size":23,fill:C.ink,"font-weight":700,"text-anchor":"start"},["로컬 토큰만 계산하면","Using only local tokens"]);
    p.el('text',{x:670,y:783,"font-size":23,fill:C.ink,"font-weight":700,"text-anchor":"start"},["앞선 문맥 t0·t1을 빠뜨립니다.","leaves out earlier context t0·t1."]);
    p.el('text',{x:402,y:922,"font-size":21,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["● 계산하는 토큰 쌍   — 미래 토큰: 마스킹","● Token pair computed   — Future token: masked"]);
    p.el("rect",{x:186,y:968,width:828,height:44,rx:10,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el('text',{x:600,y:997,"font-size":20,fill:C.purple,"font-weight":700,"text-anchor":"middle"},["Ring: K·V 블록을 순환  /  Ulysses: 전체 문맥을 헤드별로 재배치","Ring: circulate K·V blocks / Ulysses: rearrange full context by head"]);
    return [p];
  },
} satisfies FigureSpec;
