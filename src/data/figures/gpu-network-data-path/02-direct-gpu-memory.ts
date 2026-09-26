import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-network-data-path",figureId:"02-direct-gpu-memory",number:"02-direct-gpu-memory",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["중간 복사를 줄이는 GPUDirect RDMA","Reducing Copies with GPUDirect RDMA"],
  subtitle:["NIC가 GPU 메모리에 직접 접근해 CPU 메모리의 중간 버퍼를 거치지 않습니다.","The NIC directly accesses GPU memory, bypassing intermediate CPU buffers."],
  alt:["GPUDirect RDMA가 지원되는 경로에서 서버 0의 GPU 메모리에 A가 만든 x가 있다. 송신 NIC가 PCIe를 통해 x를 읽고 네트워크로 전달한다. 서버 1의 수신 NIC는 PCIe를 통해 GPU 메모리에 x를 쓴다. 수신 완료 뒤 B가 실행된다. NIC는 네트워크 송수신 장치이며 실제 데이터는 CPU 메모리를 중간 버퍼로 거치지 않는다. 이 그림은 CPU의 제어 참여 여부를 나타내지 않는다.","With GPUDirect RDMA support, the sending NIC reads x produced by A directly from GPU 0 memory through PCIe and sends it across the network. The receiving NIC writes x into GPU 1 memory through PCIe. B runs after receive completion. The data does not use intermediate CPU-memory buffers. The figure does not specify whether the CPU participates in transfer control."],
  caption:["GPUDirect RDMA를 지원하는 경로입니다. 이 그림은 CPU가 제어에 참여하는지 여부를 나타내지 않습니다.","This is a path that supports GPUDirect RDMA; the figure does not show whether the CPU takes part in control."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,876,1104,[48,208]);
    p.el("rect",{x:48,y:210,width:1104,height:60,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:250,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPUDirect RDMA가 지원되는 환경","Environment with GPUDirect RDMA support"]);
    p.el("rect",{x:48,y:296,width:520,height:780,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:332,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["서버 0","Server 0"]);
    p.el("rect",{x:632,y:296,width:520,height:780,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:660,y:332,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["서버 1","Server 1"]);
    p.el("rect",{x:96,y:365,width:424,height:82,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:308,y:400,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 0 · 계산 A","GPU 0 · Compute A"]);
    p.el('text',{x:308,y:435,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["전달할 x 만들기","Produce x to send"]);
    p.el("rect",{x:680,y:365,width:424,height:82,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:892,y:400,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 1 · 계산 B","GPU 1 · Compute B"]);
    p.el('text',{x:892,y:435,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},["수신이 끝난 뒤 실행","Run after receive completes"]);
    p.el("rect",{x:96,y:520,width:424,height:106,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:308,y:567,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 0 메모리","GPU 0 memory"]);
    p.el('text',{x:308,y:602,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["A가 만든 x = [1, 2, 3, 4]","A produced x = [1, 2, 3, 4]"]);
    p.el("rect",{x:680,y:520,width:424,height:106,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:892,y:567,fill:C.indigo,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 1 메모리","GPU 1 memory"]);
    p.el('text',{x:892,y:602,fill:C.indigo,"font-size":23,"font-weight":400,"text-anchor":"middle"},["수신 버퍼에 x 도착","x arrives in receive buffer"]);
    p.el("path",{d:"M308,456 V510",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M892,510 V457",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:176,y:900,width:264,height:116,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:308,y:952,fill:C.indigo,"font-size":26,"font-weight":600,"text-anchor":"middle"},"NIC");
    p.el('text',{x:308,y:987,fill:C.indigo,"font-size":(locale==='ko'?24:23),"font-weight":400,"text-anchor":"middle"},["네트워크 송수신","Network send/receive"]);
    p.el("rect",{x:760,y:900,width:264,height:116,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:892,y:952,fill:C.indigo,"font-size":26,"font-weight":600,"text-anchor":"middle"},"NIC");
    p.el('text',{x:892,y:987,fill:C.indigo,"font-size":(locale==='ko'?24:23),"font-weight":400,"text-anchor":"middle"},["네트워크 송수신","Network send/receive"]);
    p.el("path",{d:"M308,637 V889",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:342,y:698,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"start"},"PCIe");
    p.el('text',{x:342,y:738,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["NIC가","NIC"]);
    p.el('text',{x:342,y:774,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["x 읽기","reads x"]);
    p.el("path",{d:"M892,889 V637",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:926,y:698,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"start"},"PCIe");
    p.el('text',{x:926,y:738,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["NIC가","NIC"]);
    p.el('text',{x:926,y:774,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["x 쓰기","writes x"]);
    p.el("path",{d:"M440,958 H749",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:600,y:924,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},["네트워크","Network"]);
    p.el('text',{x:600,y:998,fill:C.indigo,"font-size":23,"font-weight":400,"text-anchor":"middle"},["x 전달","Transfer x"]);
    return [p];
  },
} satisfies FigureSpec;
