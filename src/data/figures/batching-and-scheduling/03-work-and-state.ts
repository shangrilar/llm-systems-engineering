import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"batching-and-scheduling",figureId:"03-work-and-state",number:"03-work-and-state",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["이번 계산과 누적 KV를 따로 셉니다","Count new work and retained KV separately"],
  subtitle:["새 토큰 계산은 기존 KV를 없애지 않습니다.","Computing new tokens does not remove the KV already retained."],
  alt:["B는 KV 6개를 보유하고 새 입력 1개를 처리해 7개로 늘립니다. C는 입력 6개를 처리해 KV 6개를 만듭니다. 이번 계산 7토큰은 예산 8개 이내이고, 실행 뒤 실제 KV 13개는 저장 용량 24개 이내입니다. 실선은 기존 KV, 점선은 이번 실행에서 추가할 KV입니다.","B retains 6 KV positions and processes 1 new input to reach 7. C processes 6 prompt inputs to create 6 KV positions. The 7 input tokens fit a step budget of 8, and the 13 resulting KV positions fit capacity 24. Solid outlines denote existing KV; dashed outlines denote KV to add."],
  caption:["이번 계산 7토큰은 예산 8개 이내이고, 실행 뒤 실제 KV 13개는 용량 24개 이내입니다.","This run computes 7 tokens, within the budget of 8; after it, the 13 actual KV entries fit within the capacity of 24."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,910,1104,[48,196]);
    p.el('text',{x:48,y:219,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["다음 실행의 후보","Candidates for the next execution"]);
    p.el("rect",{x:48,y:246,width:520,height:160,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:600,y:246,width:552,height:160,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:72,y:283,fill:C.teal,"font-size":28,"font-weight":700,"text-anchor":"start"},"B · Decode");
    p.el('text',{x:72,y:326,fill:C.teal,"font-size":24,"font-weight":400,"text-anchor":"start"},["기존 KV 6개","6 KV positions retained"]);
    p.el('text',{x:72,y:373,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"start"},["새 입력 1개 → KV 7개","1 new input → 7 KV positions"]);
    p.el('text',{x:624,y:283,fill:C.purple,"font-size":28,"font-weight":700,"text-anchor":"start"},"C · Prefill");
    p.el('text',{x:624,y:326,fill:C.purple,"font-size":24,"font-weight":400,"text-anchor":"start"},["아직 KV 없음","No KV yet"]);
    p.el('text',{x:624,y:373,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"start"},["입력 6개 → KV 6개","6 inputs → 6 KV positions"]);
    p.el('text',{x:48,y:471,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["이번에 계산할 토큰","Tokens to compute now"]);
    p.el('text',{x:115,y:510,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"B");
    p.el('text',{x:262,y:510,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},"C");
    p.el("rect",{x:96,y:529,width:38,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:138,y:529,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:180,y:529,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:222,y:529,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:264,y:529,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:306,y:529,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:348,y:529,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:390,y:529,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("path",{d:"M96,590 v9 h332 v-9",stroke:C.muted,"stroke-width":1.5,fill:"none"});
    p.el('text',{x:262,y:632,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["실행 토큰 예산 8개","Step token budget: 8"]);
    p.el('text',{x:650,y:564,fill:C.ink,"font-size":34,"font-weight":700,"text-anchor":"start"},"1 + 6 = 7");
    p.el('text',{x:650,y:609,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["예산 8개 안에 들어갑니다","Fits the budget of 8"]);
    p.el("path",{d:"M48,679 H1152",stroke:C.line});
    p.el('text',{x:48,y:731,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["이 실행 뒤 보관할 실제 KV","Actual KV to retain after this execution"]);
    p.el('text',{x:241,y:776,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},"B · 7");
    p.el('text',{x:514,y:776,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"middle"},"C · 6");
    p.el("rect",{x:96,y:798,width:38,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:138,y:798,width:38,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:180,y:798,width:38,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:222,y:798,width:38,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:264,y:798,width:38,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:306,y:798,width:38,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:348,y:798,width:38,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6,"stroke-dasharray":"5 4"});
    p.el("rect",{x:390,y:798,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6,"stroke-dasharray":"5 4"});
    p.el("rect",{x:432,y:798,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6,"stroke-dasharray":"5 4"});
    p.el("rect",{x:474,y:798,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6,"stroke-dasharray":"5 4"});
    p.el("rect",{x:516,y:798,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6,"stroke-dasharray":"5 4"});
    p.el("rect",{x:558,y:798,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6,"stroke-dasharray":"5 4"});
    p.el("rect",{x:600,y:798,width:38,height:48,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6,"stroke-dasharray":"5 4"});
    p.el("rect",{x:642,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:684,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:726,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:768,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:810,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:852,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:894,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:936,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:978,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:1020,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:1062,y:798,width:38,height:48,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("path",{d:"M96,858 v9 h1004 v-9",stroke:C.muted,"stroke-width":1.5,fill:"none"});
    p.el('text',{x:598,y:900,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["KV 저장 용량: 24개 위치 분량","KV capacity: 24 token positions"]);
    p.el('text',{x:48,y:951,fill:C.ink,"font-size":34,"font-weight":700,"text-anchor":"start"},"7 + 6 = 13");
    p.el('text',{x:364,y:951,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["용량 24개 안에 들어갑니다","Fits within capacity 24"]);
    p.el("rect",{x:48,y:987,width:26,height:28,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el('text',{x:89,y:1010,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["기존 KV","Existing KV"]);
    p.el("rect",{x:319,y:987,width:26,height:28,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6,"stroke-dasharray":"5 4"});
    p.el('text',{x:360,y:1010,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["이번 실행에서 추가할 KV","KV to add in this execution"]);
    p.el('text',{x:48,y:1090,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["이 공간을 실제로 배정할 수 있는지도 확인해야 합니다.","Can the engine actually allocate this space?"]);
    return [p];
  },
} satisfies FigureSpec;
