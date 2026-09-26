import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-network-data-path",figureId:"01-host-memory-staging",number:"01-host-memory-staging",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["CPU 메모리를 거쳐 서버 밖으로 전달하기","Sending Across Servers via CPU Memory"],
  subtitle:["NIC는 서버의 네트워크 송수신 장치입니다. 중간 버퍼를 사용하는 경로부터 봅니다.","A NIC sends and receives network data. Start with an intermediate-buffer path."],
  alt:["CPU 메모리를 중간 버퍼로 사용하는 경로의 예시다. 서버 0에서 GPU 0의 A가 만든 x를 CPU 메모리에 복사하고 NIC가 그 버퍼를 읽어 네트워크로 전송한다. 서버 1의 NIC가 받은 x를 CPU 메모리에 쓰고 GPU 1 메모리로 복사한다. 수신이 완료되어 값을 사용할 수 있게 되면 B가 실행된다. CPU 메모리를 사용한다는 것은 CPU의 스레드가 x를 직접 한 원소씩 복사한다는 뜻이 아니다. 다음 그림과 GPU 메모리, NIC, 네트워크 위치를 맞춰 중간 복사가 빠지는 부분을 비교한다.","An example path using intermediate CPU-memory buffers. On server 0, x produced by A on GPU 0 is copied to CPU memory and read by the NIC for network transfer. On server 1 the NIC writes x to CPU memory, then it is copied to GPU 1 memory. B runs once the receive completes and x is usable. CPU memory does not mean CPU threads copy each element. GPU memory, NICs and the network have the same positions in the next figure."],
  caption:["CPU 메모리를 거친다는 것이 CPU 스레드가 x를 한 원소씩 복사한다는 뜻은 아닙니다. 다음 그림과 위치를 맞춰 비교합니다.","Going through CPU memory does not mean CPU threads copy x element by element. Positions match the next figure for comparison."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,876,1104,[48,208]);
    p.el("rect",{x:48,y:210,width:1104,height:60,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:250,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["CPU 메모리를 중간 버퍼로 사용하는 경로","Path using CPU memory as an intermediate buffer"]);
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
    p.el("rect",{x:96,y:722,width:424,height:108,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:308,y:770,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},["CPU 메모리","CPU memory"]);
    p.el('text',{x:308,y:805,fill:C.purple,"font-size":23,"font-weight":400,"text-anchor":"middle"},["중간 버퍼의 x","x in intermediate buffer"]);
    p.el("rect",{x:680,y:722,width:424,height:108,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:892,y:770,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},["CPU 메모리","CPU memory"]);
    p.el('text',{x:892,y:805,fill:C.purple,"font-size":23,"font-weight":400,"text-anchor":"middle"},["중간 버퍼의 x","x in intermediate buffer"]);
    p.el("path",{d:"M308,637 V711",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el("path",{d:"M308,841 V889",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el("path",{d:"M892,711 V637",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el("path",{d:"M892,889 V841",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:342,y:663,fill:C.indigo,"font-size":23,"font-weight":600,"text-anchor":"start"},["중간 복사","Staging copy"]);
    p.el('text',{x:342,y:699,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"PCIe");
    p.el('text',{x:926,y:663,fill:C.indigo,"font-size":23,"font-weight":600,"text-anchor":"start"},["중간 복사","Staging copy"]);
    p.el('text',{x:926,y:699,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"PCIe");
    p.el('text',{x:342,y:874,fill:C.indigo,"font-size":22,"font-weight":400,"text-anchor":"start"},["NIC가 읽기","NIC reads"]);
    p.el('text',{x:926,y:874,fill:C.indigo,"font-size":22,"font-weight":400,"text-anchor":"start"},["NIC가 쓰기","NIC writes"]);
    p.el("path",{d:"M440,958 H749",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:600,y:924,fill:C.indigo,"font-size":27,"font-weight":600,"text-anchor":"middle"},["네트워크","Network"]);
    p.el('text',{x:600,y:998,fill:C.indigo,"font-size":23,"font-weight":400,"text-anchor":"middle"},["x 전달","Transfer x"]);
    return [p];
  },
} satisfies FigureSpec;
