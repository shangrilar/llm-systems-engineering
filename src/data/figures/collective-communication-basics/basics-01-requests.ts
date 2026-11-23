import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-communication-basics",figureId:"basics-01-requests",number:"basics-01-requests",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["개별 전달 요청에서 그룹의 동작으로","From individual transfers to a group operation"],
  subtitle:["통신 상대를 하나씩 지정하거나, 그룹 전체가 수행할 동작을 요청합니다.","Specify individual peers, or request an operation for the whole group."],
  alt:["네 GPU가 모두 GPU 0의 배열 [1,2]를 갖게 하는 동일한 목표를 비교한다. 왼쪽은 GPU 0을 담당하는 CPU 코드가 GPU 1,2,3에 각각 Send를 요청하고 나머지 CPU 코드가 GPU 0을 상대방으로 Recv를 요청한다. GPU 0은 자신의 입력을 유지한다. 오른쪽은 각 GPU를 담당하는 CPU 코드가 root 0인 Broadcast에 참여하며 root는 입력을 제공하고 다른 GPU는 받는다. 두 방식 모두 최종적으로 네 GPU가 [1,2]를 갖는다. 행 배치는 실행 시각이나 실제 전달 경로를 뜻하지 않으며 코드 문법은 생략했다.","Four GPUs acquire GPU 0’s array [1,2]. Left: individual Send/Recv requests. Right: all participants request Broadcast with root 0. Both produce the same data result."],
  caption:["행 배치는 실행 시각이나 실제 전달 경로를 뜻하지 않으며, 코드 문법은 생략했습니다.","Row layout does not indicate execution time or actual transfer paths; code syntax is omitted."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,880,1104,[48,205]);
    p.el("rect",{x:48,y:198,width:1104,height:64,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:239,fill:C.ink,"font-size":26,"font-weight":600,"text-anchor":"middle"},["같은 목표: GPU 0의 [1, 2]를 네 GPU가 모두 갖게 하기","Same goal: all four GPUs hold GPU 0’s [1, 2]"]);
    p.el('text',{x:48,y:308,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"start"},["각 GPU를 담당하는 CPU 코드의 요청","Requests from the CPU code responsible for each GPU"]);
    p.el('text',{x:48,y:363,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"Send / Recv");
    p.el('text',{x:48,y:402,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"start"},["상대별로 송수신을 지정","Specify each send and receive"]);
    p.el("rect",{x:48,y:426,width:528,height:429,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:624,y:363,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"start"},"Broadcast");
    p.el('text',{x:624,y:402,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"start"},["그룹의 같은 동작에 참여","Join the same group operation"]);
    p.el("rect",{x:624,y:426,width:528,height:429,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:460,fill:C.indigo,"font-size":22,"font-weight":600,"text-anchor":"middle"},["하나의 통신 그룹 · root = GPU 0","One group · root = GPU 0"]);
    p.el("rect",{x:64,y:473,width:496,height:77,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:506,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:182,y:496,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"start"},"Send → GPU 1, 2, 3");
    p.el('text',{x:182,y:530,fill:C.muted,"font-size":(locale==='ko'?21:19),"font-weight":400,"text-anchor":"start"},["각 상대에 같은 배열을 전달","Same array to each peer"]);
    p.el("rect",{x:640,y:473,width:496,height:77,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:656,y:506,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:758,y:496,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"start"},"Broadcast · root = 0");
    p.el('text',{x:758,y:530,fill:C.muted,"font-size":(locale==='ko'?21:19),"font-weight":400,"text-anchor":"start"},["기준 데이터를 제공","Provide source data"]);
    p.el("rect",{x:64,y:564,width:496,height:77,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:597,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:182,y:604,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"start"},"Recv ← GPU 0");
    p.el("rect",{x:640,y:564,width:496,height:77,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:656,y:597,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:758,y:587,fill:C.teal,"font-size":24,"font-weight":600,"text-anchor":"start"},"Broadcast · root = 0");
    p.el('text',{x:758,y:621,fill:C.muted,"font-size":(locale==='ko'?21:19),"font-weight":400,"text-anchor":"start"},["기준 데이터를 받기","Receive source data"]);
    p.el("rect",{x:64,y:655,width:496,height:77,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:688,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el('text',{x:182,y:695,fill:C.purple,"font-size":24,"font-weight":600,"text-anchor":"start"},"Recv ← GPU 0");
    p.el("rect",{x:640,y:655,width:496,height:77,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:656,y:688,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el('text',{x:758,y:678,fill:C.purple,"font-size":24,"font-weight":600,"text-anchor":"start"},"Broadcast · root = 0");
    p.el('text',{x:758,y:712,fill:C.muted,"font-size":(locale==='ko'?21:19),"font-weight":400,"text-anchor":"start"},["기준 데이터를 받기","Receive source data"]);
    p.el("rect",{x:64,y:746,width:496,height:77,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:80,y:779,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el('text',{x:182,y:786,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"start"},"Recv ← GPU 0");
    p.el("rect",{x:640,y:746,width:496,height:77,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:656,y:779,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el('text',{x:758,y:769,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"start"},"Broadcast · root = 0");
    p.el('text',{x:758,y:803,fill:C.muted,"font-size":(locale==='ko'?21:19),"font-weight":400,"text-anchor":"start"},["기준 데이터를 받기","Receive source data"]);
    p.el('text',{x:48,y:909,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["두 방식이 만드는 데이터 결과","The data result produced by both approaches"]);
    p.el("rect",{x:48,y:935,width:264,height:142,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:64,y:950,width:8,height:27,rx:3,fill:C.blue,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:84,y:973,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:72,y:999,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:124,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:184,y:999,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:236,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:328,y:935,width:264,height:142,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:344,y:950,width:8,height:27,rx:3,fill:C.teal,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:364,y:973,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:352,y:999,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:404,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:464,y:999,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:516,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:608,y:935,width:264,height:142,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:624,y:950,width:8,height:27,rx:3,fill:C.purple,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:973,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el("rect",{x:632,y:999,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:684,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:744,y:999,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:796,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:888,y:935,width:264,height:142,rx:12,fill:"white",stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:904,y:950,width:8,height:27,rx:3,fill:C.orange,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924,y:973,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el("rect",{x:912,y:999,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:964,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:1024,y:999,width:104,height:44,rx:7,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:1076,y:1030,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    return [p];
  },
} satisfies FigureSpec;
