import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"paged-kv-cache",figureId:"01-needed-blocks",number:"01-needed-blocks",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["예약 공간을 필요한 블록으로 바꾸기","Replace a large reservation with needed blocks"],
  subtitle:["같은 24칸에서도, B가 미리 차지하는 공간을 줄이면 C를 받을 수 있습니다.","The same 24-position KV pool can admit C when B reserves less space in advance."],
  alt:["24칸 KV 풀에서 B의 실제 KV는 6칸이다. 20칸을 예약하면 미사용 예약이 14칸이고 가용 공간은 4칸이어서 입력 6토큰의 C가 기다린다. 블록당 4칸으로 B에 2블록, C에 2블록을 배정하면 2블록이 남는다. C의 블록은 배정만 되었고 아직 KV를 계산하지 않아 비어 있다.","B has 6 KV positions in a 24-position pool. Reserving 20 leaves 14 unused reserved positions and only 4 free, so C with 6 input tokens waits. With 4 positions per block, assigning 2 blocks to B and 2 to C leaves 2 free blocks. C’s assigned blocks are still empty because its inputs have not yet been processed."],
  caption:["큰 예약 공간을 필요한 블록으로 바꾸면 같은 용량에서 C를 받아들일 수 있습니다.","Replacing a large reservation with the blocks currently needed allows C to join within the same capacity."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,687,1104,[48,196]);
    p.el('text',{x:48,y:207,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"start"},["B의 현재 KV 6칸","B currently holds 6 KV positions"]);
    p.el('text',{x:1152,y:207,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"end"},["새 요청 C · 입력 6토큰","New request C · 6 input tokens"]);
    p.el('text',{x:48,y:278,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["큰 공간을 미리 예약","Reserve a large region in advance"]);
    p.el('text',{x:1152,y:278,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"end"},["C 대기","C waits"]);
    p.el('text',{x:68,y:335,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"start"},["B 예약 20칸","20 positions reserved for B"]);
    p.el('text',{x:1060,y:335,fill:C.muted,"font-size":24,"font-weight":700,"text-anchor":"middle"},["가용 4칸","4 free"]);
    p.el("rect",{x:58,y:354,width:900,height:90,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:978,y:354,width:164,height:90,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:66,y:375,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:83,y:406,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("rect",{x:104,y:375,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:121,y:406,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:142,y:375,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:159,y:406,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"2");
    p.el("rect",{x:180,y:375,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:197,y:406,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"3");
    p.el("rect",{x:250,y:375,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:267,y:406,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"4");
    p.el("rect",{x:288,y:375,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:305,y:406,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"5");
    p.el("rect",{x:326,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:364,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:434,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:472,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:510,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:548,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:618,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:656,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:694,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:732,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:802,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:840,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:878,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:916,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:986,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:1024,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:1062,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:1100,y:375,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:191,y:485,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실제 KV 6","6 actual KV"]);
    p.el('text',{x:638,y:485,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["미사용 예약 14","14 reserved, unused"]);
    p.el('text',{x:1060,y:485,fill:C.purple,"font-size":22,"font-weight":400,"text-anchor":"middle"},["4 < C의 입력 6","4 < C’s 6 inputs"]);
    p.el("path",{d:"M48,531 H1152",stroke:C.line});
    p.el('text',{x:48,y:587,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["필요한 블록만 배정","Allocate only the blocks needed"]);
    p.el('text',{x:1152,y:587,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"end"},["C 합류 가능","C can join"]);
    p.el('text',{x:232,y:644,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["B · 2블록 = 8칸","B · 2 blocks = 8 slots"]);
    p.el('text',{x:600,y:644,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},["C · 2블록 = 8칸","C · 2 blocks = 8 slots"]);
    p.el('text',{x:968,y:644,fill:C.muted,"font-size":24,"font-weight":700,"text-anchor":"middle"},["가용 · 2블록 = 8칸","Free · 2 blocks = 8 slots"]);
    p.el("rect",{x:58,y:666,width:164,height:90,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:66,y:687,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:83,y:718,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("rect",{x:104,y:687,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:121,y:718,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:142,y:687,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:159,y:718,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"2");
    p.el("rect",{x:180,y:687,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:197,y:718,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"3");
    p.el("rect",{x:242,y:666,width:164,height:90,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:250,y:687,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:267,y:718,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"4");
    p.el("rect",{x:288,y:687,width:34,height:48,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:305,y:718,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},"5");
    p.el("rect",{x:326,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:364,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:426,y:666,width:164,height:90,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"7 5"});
    p.el("rect",{x:434,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:472,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:510,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:548,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:610,y:666,width:164,height:90,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"7 5"});
    p.el("rect",{x:618,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:656,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:694,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:732,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.purple,"stroke-width":1.5,"stroke-dasharray":"4 4"});
    p.el("rect",{x:794,y:666,width:164,height:90,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:802,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:840,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:878,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:916,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:978,y:666,width:164,height:90,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:986,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:1024,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:1062,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:1100,y:687,width:34,height:48,rx:5,fill:"white",stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:232,y:799,fill:C.teal,"font-size":22,"font-weight":400,"text-anchor":"middle"},["B의 다음 KV 7칸도 수용","B can grow to 7 KV positions"]);
    p.el('text',{x:600,y:799,fill:C.purple,"font-size":22,"font-weight":400,"text-anchor":"middle"},["C 배정 · 아직 계산 전","Allocated to C · still empty"]);
    p.el('text',{x:968,y:799,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["남은 블록 2개","2 blocks remain free"]);
    p.el('text',{x:48,y:868,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["1블록 = KV 4칸 · 채운 칸은 이미 계산된 KV · 빈칸은 아직 KV 없음","1 block = 4 KV positions · Filled cells hold KV; empty cells do not."]);
    return [p];
  },
} satisfies FigureSpec;
