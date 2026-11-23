import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"batching-and-scheduling",figureId:"04-reserved-memory",number:"04-reserved-memory",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["미사용 예약 공간이 새 요청을 막습니다","Unused reservations keep new requests waiting"],
  subtitle:["앞선 그림과 같은 B·C, 같은 KV 저장 용량 24개입니다.","The same B and C, with the same KV capacity of 24 positions."],
  alt:["KV 용량 24개 중 B가 20개를 예약했지만 현재 실제 KV는 6개뿐입니다. 나머지 14개는 B에 예약되어 다른 요청에 줄 수 없고, 배정 가능한 빈 공간은 4개입니다. C는 Prefill을 위해 6개가 필요해 대기합니다. B의 다음 KV 7개와 C의 KV 6개는 합계 13개이지만 현재 예약 방식이 C의 진입을 막습니다.","B reserves 20 of 24 KV positions but currently uses only 6. The other 14 remain reserved for B, leaving just 4 positions available for allocation. C requires 6 for prefill and must wait. B would need 7 and C 6 after the next execution, only 13 total, but the reservation prevents C from entering."],
  caption:["실제 KV 요구량이 용량보다 작아도, 예약 공간 때문에 새 요청이 기다립니다.","A request waits because of reserved space even though actual KV requirements fit within capacity."],
  sources:[],
  defs:"<pattern id=\"bs-reserved\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"><rect width=\"10\" height=\"10\" fill=\"#EDF7F5\" /><path d=\"M-2,2 L2,-2 M0,10 L10,0 M8,12 L12,8\" stroke=\"#8DBCB8\" stroke-width=\"1.5\" /></pattern>",
  panels(locale:Locale){
    const p=new Panel(locale,null,804,1104,[48,196]);
    p.el('text',{x:48,y:219,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"start"},["B에 20개 위치를 미리 예약한 경우","If 20 KV positions are reserved for B"]);
    p.el('text',{x:48,y:261,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["현재 실제 KV는 6개입니다.","B currently holds only 6 KV positions."]);
    p.el('text',{x:220,y:316,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["실제 KV 6","Actual KV: 6"]);
    p.el('text',{x:640,y:316,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["아직 쓰지 않은 예약 14","Reserved, unused: 14"]);
    p.el('text',{x:1018,y:316,fill:C.muted,"font-size":23,"font-weight":700,"text-anchor":"middle"},["빈 공간 4","Free: 4"]);
    p.el("rect",{x:96,y:340,width:38,height:65,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:138,y:340,width:38,height:65,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:180,y:340,width:38,height:65,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:222,y:340,width:38,height:65,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:264,y:340,width:38,height:65,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:306,y:340,width:38,height:65,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:348,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:390,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:432,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:474,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:516,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:558,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:600,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:642,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:684,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:726,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:768,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:810,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:852,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:894,y:340,width:38,height:65,rx:5,fill:"url(#bs-reserved)",stroke:C.teal,"stroke-width":1.6});
    p.el("rect",{x:936,y:340,width:38,height:65,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:978,y:340,width:38,height:65,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:1020,y:340,width:38,height:65,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:1062,y:340,width:38,height:65,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("path",{d:"M96,419 v9 h836 v-9",stroke:C.teal,"stroke-width":1.5,fill:"none"});
    p.el('text',{x:514,y:461,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},["B에 배정: 20","Allocated to B: 20"]);
    p.el("path",{d:"M936,419 v9 h164 v-9",stroke:C.muted,"stroke-width":1.5,fill:"none"});
    p.el('text',{x:1018,y:461,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["배정 가능: 4","Available: 4"]);
    p.el('text',{x:48,y:526,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["빗금 영역은 비어 있어도 C에 배정할 수 없습니다.","The hatched space is unused, but unavailable to C."]);
    p.el("path",{d:"M48,577 H1152",stroke:C.line});
    p.el('text',{x:48,y:633,fill:C.purple,"font-size":26,"font-weight":700,"text-anchor":"start"},["새 요청 C가 필요한 공간","Space required by new request C"]);
    p.el('text',{x:671,y:633,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["실제로 배정할 수 있는 공간","Space available for allocation"]);
    p.el("rect",{x:48,y:664,width:48,height:56,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:100,y:664,width:48,height:56,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:152,y:664,width:48,height:56,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:204,y:664,width:48,height:56,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:256,y:664,width:48,height:56,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:308,y:664,width:48,height:56,rx:5,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.6});
    p.el("rect",{x:671,y:664,width:48,height:56,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:723,y:664,width:48,height:56,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:775,y:664,width:48,height:56,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el("rect",{x:827,y:664,width:48,height:56,rx:5,fill:"white",stroke:C.line,"stroke-width":1.6});
    p.el('text',{x:48,y:765,fill:C.purple,"font-size":23,"font-weight":400,"text-anchor":"start"},["입력 6개 → KV 공간 6개","6 prompt inputs → 6 KV positions"]);
    p.el('text',{x:671,y:765,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["빈 공간 4개 < 필요한 6개","4 free < 6 required"]);
    p.el("path",{d:"M975,693 L1044,693",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:1059,y:661,width:93,height:63,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:1105,y:703,fill:C.purple,"font-size":29,"font-weight":700,"text-anchor":"middle"},"C");
    p.el('text',{x:1105,y:772,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},["대기","Wait"]);
    p.el("path",{d:"M48,824 H1152",stroke:C.line});
    p.el('text',{x:48,y:878,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["필요한 실제 KV는 13개지만 C는 들어오지 못합니다.","Only 13 KV positions are needed, yet C cannot enter."]);
    p.el('text',{x:48,y:924,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["다음 실행의 B 7개 + C 6개 / 전체 용량 24개","Next execution: B 7 + C 6 / total capacity 24"]);
    p.el('text',{x:48,y:983,fill:C.orange,"font-size":28,"font-weight":700,"text-anchor":"start"},["KV 공간을 필요한 만큼 늘려 배정할 수 있다면?","What if KV storage could grow only as needed?"]);
    return [p];
  },
} satisfies FigureSpec;
