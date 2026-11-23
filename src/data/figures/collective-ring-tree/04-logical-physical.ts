import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"collective-ring-tree",figureId:"04-logical-physical",number:"04-logical-physical",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["전달 순서와 실제 연결을 구별하기","Separate transfer order from physical links"],
  subtitle:["위는 알고리즘의 관계, 아래는 가능한 물리 연결의 한 예입니다.","Top: algorithmic relationship. Bottom: one possible physical topology."],
  alt:["논리적으로 Ring 순서로 전달해도 네 GPU가 공유 스위치를 거칠 수 있습니다.","A logical ring can run over a physical shared-switch topology."],
  caption:["같은 물리 링크를 공유하는 전송은 대역폭을 나눠 씁니다. GPU의 순서를 바꾸면 공유 링크를 지나는 트래픽도 달라질 수 있습니다.","Transfers that share a physical link split its bandwidth; changing the GPU order can change the traffic on shared links."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,648,1104,[48,196]);
    if(locale==='ko'){
      p.el("rect",{x:48,y:198,width:1104,height:100,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
      p.el('text',{x:72,y:234,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"논리적 Ring: 통신 상대와 순서");
      p.el('text',{x:72,y:274,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"GPU 0 → GPU 1 → GPU 2 → GPU 3 → GPU 0");
      p.el('text',{x:48,y:360,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},"실제 하드웨어: GPU들이 스위치를 통해 연결된 예");
      p.el("rect",{x:48,y:407,width:240,height:120,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:66,y:443,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
      p.el('text',{x:66,y:493,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
      p.el("path",{d:"M168,536 L426,637",stroke:C.muted,"stroke-width":2.5});
      p.el("rect",{x:336,y:407,width:240,height:120,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:354,y:443,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
      p.el('text',{x:354,y:493,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
      p.el("path",{d:"M456,536 L542,637",stroke:C.muted,"stroke-width":2.5});
      p.el("rect",{x:624,y:407,width:240,height:120,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
      p.el('text',{x:642,y:443,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
      p.el('text',{x:642,y:493,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
      p.el("path",{d:"M744,536 L658,637",stroke:C.muted,"stroke-width":2.5});
      p.el("rect",{x:912,y:407,width:240,height:120,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:930,y:443,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
      p.el('text',{x:930,y:493,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
      p.el("path",{d:"M1032,536 L774,637",stroke:C.muted,"stroke-width":2.5});
      p.el("rect",{x:375,y:637,width:450,height:125,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:393,y:673,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"공유 스위치");
      p.el('text',{x:393,y:723,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"같은 경로에서 대역폭 경쟁 가능");
      p.el('text',{x:48,y:828,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"Ring의 이웃이라고 전용 케이블로 직접 연결된 것은 아닙니다.");
    }else{
      p.el("rect",{x:48,y:198,width:1104,height:100,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
      p.el('text',{x:72,y:234,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"Logical ring: peers and order");
      p.el('text',{x:72,y:274,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"GPU 0 → GPU 1 → GPU 2 → GPU 3 → GPU 0");
      p.el('text',{x:48,y:360,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},"Physical hardware: GPUs connected through a switch");
      p.el("rect",{x:48,y:407,width:240,height:120,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:66,y:443,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 0");
      p.el('text',{x:66,y:493,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
      p.el("path",{d:"M168,536 L426,637",stroke:C.muted,"stroke-width":2.5});
      p.el("rect",{x:336,y:407,width:240,height:120,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:354,y:443,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 1");
      p.el('text',{x:354,y:493,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
      p.el("path",{d:"M456,536 L542,637",stroke:C.muted,"stroke-width":2.5});
      p.el("rect",{x:624,y:407,width:240,height:120,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
      p.el('text',{x:642,y:443,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 2");
      p.el('text',{x:642,y:493,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
      p.el("path",{d:"M744,536 L658,637",stroke:C.muted,"stroke-width":2.5});
      p.el("rect",{x:912,y:407,width:240,height:120,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:930,y:443,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"GPU 3");
      p.el('text',{x:930,y:493,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"");
      p.el("path",{d:"M1032,536 L774,637",stroke:C.muted,"stroke-width":2.5});
      p.el("rect",{x:375,y:637,width:450,height:125,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:393,y:673,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Shared switch");
      p.el('text',{x:393,y:723,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"Transfers may contend for");
      p.el('text',{x:393,y:755.2,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},"bandwidth");
      p.el('text',{x:48,y:828,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"Logical neighbors need not have a dedicated direct cable.");
    }
    return [p];
  },
} satisfies FigureSpec;
