import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-communication-engines",figureId:"02-sm-and-copy-engine",number:"02-sm-and-copy-engine",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["같은 연결을 사용하는 SM과 복사 엔진","SMs and Copy Engines on the Same Link"],
  subtitle:["GPU 0에서 독립 계산 C를 함께 실행하며, 같은 NVLink 연결로 전달합니다.","Transfer over the same NVLink while independent computation C runs on GPU 0."],
  alt:["NVLink 연결과 전달 데이터를 동일하게 둔 두 복사 방식의 비교다. 위에서는 SM의 통신 커널이 GPU 0 메모리를 읽고 NVLink를 통해 상대 GPU 메모리에 쓴다. 계산 C도 SM을 사용한다. 아래에서는 지원되는 복사를 CE가 수행하고 C는 SM에서 실행한다. SM과 CE는 실행 장치이고 NVLink는 연결이다. 이 도식은 임의의 NCCL Send/Recv가 CE로 전환된다는 뜻이 아니다.","Two supported copy methods use the same data and NVLink connection. At the top, an SM communication kernel reads GPU 0 memory and writes to GPU 1 memory while C also uses SMs. Below, CE performs a supported copy while C runs on SMs. SM and CE are execution devices; NVLink is the connection. This does not imply arbitrary NCCL Send/Recv calls can switch to CE."],
  caption:["SM과 CE는 실행 장치이고 NVLink는 연결입니다. 모든 NCCL Send/Recv가 CE로 바뀐다는 뜻은 아닙니다.","SMs and CEs are execution units; NVLink is the connection. This does not mean every NCCL Send/Recv moves to a CE."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1058,1104,[48,208]);
    p.el("rect",{x:48,y:207,width:1104,height:60,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:246,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["NVLink로 복사할 수 있는 환경 · CE가 지원하는 복사 작업","NVLink copies available · Copy operation supported by CE"]);
    p.el('text',{x:48,y:300,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["SM의 통신 커널로 전달","Transfer with an SM communication kernel"]);
    p.el("rect",{x:72,y:328,width:456,height:416,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:776,y:328,width:352,height:416,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:100,y:371,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:804,y:371,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:100,y:396,width:400,height:150,rx:12,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:120,y:431,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},"SM");
    p.el("rect",{x:120,y:449,width:166,height:70,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:203,y:493,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},["계산 C","Compute C"]);
    p.el("rect",{x:302,y:449,width:178,height:70,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:391,y:493,fill:C.indigo,"font-size":(locale==='ko'?25:23),"font-weight":600,"text-anchor":"middle"},["통신 커널","Comm. kernel"]);
    p.el("rect",{x:120,y:626,width:380,height:86,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:310,y:663,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["GPU 메모리","GPU memory"]);
    p.el('text',{x:310,y:698,fill:C.blue,"font-size":24,"font-weight":400,"text-anchor":"middle"},["전달할 x","x to send"]);
    p.el("path",{d:"M400,616 V556",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:310,y:593,fill:C.indigo,"font-size":23,"font-weight":400,"text-anchor":"end"},["읽기","Read"]);
    p.el("rect",{x:800,y:443,width:304,height:86,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:952,y:480,fill:C.indigo,"font-size":26,"font-weight":600,"text-anchor":"middle"},["GPU 메모리","GPU memory"]);
    p.el('text',{x:952,y:515,fill:C.indigo,"font-size":24,"font-weight":400,"text-anchor":"middle"},["전달받은 x","Received x"]);
    p.el("path",{d:"M500,486 H789",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:650,y:456,fill:C.indigo,"font-size":26,"font-weight":600,"text-anchor":"middle"},"NVLink");
    p.el('text',{x:650,y:529,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["같은 연결","Same link"]);
    p.el('text',{x:952,y:631,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"middle"},["상대 GPU에 쓰기","Write to peer GPU"]);
    p.el('text',{x:48,y:814,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["복사 엔진 CE로 전달","Transfer with a copy engine (CE)"]);
    p.el("rect",{x:72,y:842,width:456,height:416,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:776,y:842,width:352,height:416,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:100,y:885,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:804,y:885,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:100,y:910,width:186,height:150,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:193,y:979,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},"SM");
    p.el('text',{x:193,y:1014,fill:C.purple,"font-size":24,"font-weight":400,"text-anchor":"middle"},["계산 C","Compute C"]);
    p.el("rect",{x:302,y:910,width:198,height:150,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:401,y:979,fill:C.indigo,"font-size":(locale==='ko'?24:23),"font-weight":600,"text-anchor":"middle"},["복사 엔진 CE","Copy engine CE"]);
    p.el('text',{x:401,y:1014,fill:C.indigo,"font-size":22,"font-weight":400,"text-anchor":"middle"},["복사 수행","Perform copy"]);
    p.el("rect",{x:120,y:1140,width:380,height:86,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:310,y:1177,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["GPU 메모리","GPU memory"]);
    p.el('text',{x:310,y:1212,fill:C.blue,"font-size":24,"font-weight":400,"text-anchor":"middle"},["전달할 x","x to send"]);
    p.el("path",{d:"M400,1130 V1070",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:310,y:1107,fill:C.indigo,"font-size":23,"font-weight":400,"text-anchor":"end"},["읽기","Read"]);
    p.el("rect",{x:800,y:957,width:304,height:86,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:952,y:994,fill:C.indigo,"font-size":26,"font-weight":600,"text-anchor":"middle"},["GPU 메모리","GPU memory"]);
    p.el('text',{x:952,y:1029,fill:C.indigo,"font-size":24,"font-weight":400,"text-anchor":"middle"},["전달받은 x","Received x"]);
    p.el("path",{d:"M500,1000 H789",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:650,y:970,fill:C.indigo,"font-size":26,"font-weight":600,"text-anchor":"middle"},"NVLink");
    p.el('text',{x:650,y:1043,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["같은 연결","Same link"]);
    p.el('text',{x:952,y:1145,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"middle"},["상대 GPU에 쓰기","Write to peer GPU"]);
    return [p];
  },
} satisfies FigureSpec;
