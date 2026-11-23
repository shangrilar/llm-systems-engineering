import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-metrics",figureId:"03-average-and-gaps",number:"03-average-and-gaps",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["평균이 같아도 출력 간격은 다릅니다","The same average can hide different gaps"],
  subtitle:["TPOT는 간격의 평균입니다. ITL은 각 간격을 드러냅니다.","TPOT averages the intervals. ITL exposes each individual gap."],
  alt:["두 출력열의 ITL은35·35ms와5·65ms. TPOT는둘다35ms/token이지만두번째에는65ms공백이있습니다.","Two streams have ITLs of 35/35ms and 5/65ms. Both have TPOT 35ms/token, but the second has a 65ms gap."],
  caption:["같은 TPOT라도 실제 토큰 간격을 보면 생성 중의 긴 멈춤이 드러납니다.","Even with the same TPOT, individual token intervals can reveal a long pause during generation."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,687,1104,[48,196]);
    p.el('text',{x:48,y:205,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["두 경우 모두 첫 토큰부터 마지막 토큰까지 70 ms","Both cases span 70 ms from the first to the last token"]);
    p.el('text',{x:48,y:245,fill:C.blue,"font-size":26,"font-weight":700,"text-anchor":"start"},["일정한 간격","Even intervals"]);
    p.el("path",{d:"M170,330 L940,330",stroke:C.muted,"stroke-width":2,fill:"none"});
    p.el("circle",{cx:170,cy:330,r:9,fill:C.blue,stroke:C.blue,"stroke-width":3});
    p.el('text',{x:170,y:369,fill:C.blue,"font-size":21,"font-weight":700,"text-anchor":"middle"},"x0");
    p.el("circle",{cx:555,cy:330,r:9,fill:C.blue,stroke:C.blue,"stroke-width":3});
    p.el('text',{x:555,y:369,fill:C.blue,"font-size":21,"font-weight":700,"text-anchor":"middle"},"x1");
    p.el("circle",{cx:940,cy:330,r:9,fill:C.blue,stroke:C.blue,"stroke-width":3});
    p.el('text',{x:940,y:369,fill:C.blue,"font-size":21,"font-weight":700,"text-anchor":"middle"},"x2");
    p.el("path",{d:"M170,310 L555,310",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M170,302 L170,318",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M555,302 L555,318",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el('text',{x:362.5,y:290,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},"35 ms");
    p.el("path",{d:"M555,310 L940,310",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M555,302 L555,318",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M940,302 L940,318",stroke:C.blue,"stroke-width":2,fill:"none"});
    p.el('text',{x:747.5,y:290,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},"35 ms");
    p.el('text',{x:990,y:337,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"TPOT");
    p.el('text',{x:980,y:377,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"start"},"35 ms/token");
    p.el('text',{x:48,y:505,fill:C.teal,"font-size":26,"font-weight":700,"text-anchor":"start"},["긴 출력 공백","A long output gap"]);
    p.el("path",{d:"M170,590 L940,590",stroke:C.muted,"stroke-width":2,fill:"none"});
    p.el("circle",{cx:170,cy:590,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el('text',{x:170,y:629,fill:C.teal,"font-size":21,"font-weight":700,"text-anchor":"middle"},"x0");
    p.el("circle",{cx:225,cy:590,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el('text',{x:225,y:629,fill:C.teal,"font-size":21,"font-weight":700,"text-anchor":"middle"},"x1");
    p.el("circle",{cx:940,cy:590,r:9,fill:C.teal,stroke:C.teal,"stroke-width":3});
    p.el('text',{x:940,y:629,fill:C.teal,"font-size":21,"font-weight":700,"text-anchor":"middle"},"x2");
    p.el("path",{d:"M170,570 L225,570",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M170,562 L170,578",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M225,562 L225,578",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el('text',{x:197.5,y:550,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"");
    p.el("path",{d:"M197.5,562 L270,525",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el('text',{x:280,y:523,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"start"},"5 ms");
    p.el("path",{d:"M225,570 L940,570",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M225,562 L225,578",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el("path",{d:"M940,562 L940,578",stroke:C.teal,"stroke-width":2,fill:"none"});
    p.el('text',{x:582.5,y:550,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},"65 ms");
    p.el('text',{x:990,y:597,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"TPOT");
    p.el('text',{x:980,y:637,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"start"},"35 ms/token");
    p.el("rect",{x:250,y:653,width:650,height:55,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:575,y:688,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},["65 ms 동안 다음 출력이 오지 않음","No next output for 65 ms"]);
    p.el("rect",{x:48,y:775,width:1104,height:100,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:80,y:816,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"start"},["같은 평균으로는 생성 도중의 멈춤을 알 수 없습니다.","The same average can hide a pause during generation."]);
    p.el('text',{x:80,y:852,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"(35 + 35) / 2 = (5 + 65) / 2 = 35 ms/token");
    return [p];
  },
} satisfies FigureSpec;
