import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-network-data-path",figureId:"03-cpu-proxy",number:"03-cpu-proxy",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["CPU 프록시가 전송의 진행을 돕는 과정","How a CPU Proxy Helps Transfers Progress"],
  subtitle:["데이터는 직접 전달하면서, CPU가 전송 요청과 완료 확인을 도울 수 있습니다.","Data moves directly while the CPU helps request transfers and check completion."],
  alt:["이 그림은 GPUDirect RDMA와 CPU 프록시를 사용하는 경우의 송신 측 제어를 확대한다. 앞 그림과 GPU 메모리, NIC, 네트워크 위치 및 데이터 경로는 같다. CPU 사용자 코드는 NCCL을 호출하고 보조 스레드인 CPU 프록시는 데이터 버퍼와 구별된 GPU 진행 상태를 통한 데이터 준비 확인, NIC 전송 요청, 완료 확인과 GPU 진행 상태 반영을 담당한다. 주황 점선은 요청과 상태, 파란 실선은 GPU 메모리와 NIC 및 네트워크 사이 데이터 이동이다. 수신 측 제어는 생략하며 모든 NIC 경로가 CPU 프록시를 요구한다는 뜻이 아니다.","A sending-side CPU proxy used together with GPUDirect RDMA. The GPU memory, NIC and network positions and data path match the preceding figure. User CPU code calls NCCL. A CPU helper thread checks readiness through GPU progress state separate from x, requests the NIC transfer, checks completion and updates GPU-side state. Orange dashed arrows are requests and state; blue solid arrows are data movement. Receive-side control is omitted. Not every NIC path requires a CPU proxy."],
  caption:["송신 측 제어만 확대했으며, 모든 NIC 경로에 CPU 프록시가 필요한 것은 아닙니다.","Only send-side control is shown; not every NIC path needs a CPU proxy."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1247,1104,[48,208]);
    p.el("rect",{x:48,y:210,width:1104,height:60,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:250,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["송신 측 CPU 프록시 확대 · GPUDirect RDMA 경로","Send-side CPU proxy detail · GPUDirect RDMA path"]);
    p.el("rect",{x:48,y:296,width:520,height:780,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:332,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["서버 0","Server 0"]);
    p.el("rect",{x:632,y:296,width:520,height:780,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:660,y:332,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["서버 1","Server 1"]);
    p.el("rect",{x:96,y:365,width:424,height:82,rx:12,fill:C.grayFill,stroke:C.ink,"stroke-width":1.5});
    p.el('text',{x:308,y:400,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["CPU · 사용자 코드","CPU · User code"]);
    p.el('text',{x:308,y:435,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"middle"},["NCCL 통신 호출","Call NCCL communication"]);
    p.el("rect",{x:680,y:365,width:424,height:82,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:892,y:400,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 1 · 계산 B","GPU 1 · Compute B"]);
    p.el('text',{x:892,y:435,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},["수신이 끝난 뒤 실행","Run after receive completes"]);
    p.el("rect",{x:96,y:520,width:424,height:106,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:308,y:567,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 0 메모리","GPU 0 memory"]);
    p.el('text',{x:308,y:602,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["A가 만든 x = [1, 2, 3, 4]","A produced x = [1, 2, 3, 4]"]);
    p.el("rect",{x:680,y:520,width:424,height:106,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:892,y:567,fill:C.indigo,"font-size":25,"font-weight":600,"text-anchor":"middle"},["GPU 1 메모리","GPU 1 memory"]);
    p.el('text',{x:892,y:602,fill:C.indigo,"font-size":23,"font-weight":400,"text-anchor":"middle"},["수신 버퍼에 x 도착","x arrives in receive buffer"]);
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
    p.el("rect",{x:104,y:650,width:188,height:44,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:198,y:681,fill:C.orange,"font-size":(locale==='ko'?22:19),"font-weight":600,"text-anchor":"middle"},["GPU 진행 상태","GPU progress state"]);
    p.el("rect",{x:96,y:730,width:200,height:104,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:196,y:776,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["CPU 프록시","CPU proxy"]);
    p.el('text',{x:196,y:811,fill:C.orange,"font-size":22,"font-weight":400,"text-anchor":"middle"},["보조 스레드","Helper thread"]);
    p.el("path",{d:"M96,406 H64 V782 H86",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el("path",{d:"M166,695 V719",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el("path",{d:"M246,729 V705",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el("path",{d:"M236,835 V870 H210 V889",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el("path",{d:"M176,978 H120 V845",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el('text',{x:137,y:716,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"start"},"①");
    p.el('text',{x:250,y:716,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"start"},"③");
    p.el('text',{x:246,y:882,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"start"},"②");
    p.el('text',{x:82,y:936,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"start"},"③");
    p.el("path",{d:"M70,1125 H150",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el('text',{x:170,y:1133,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},["요청·상태","Requests / state"]);
    p.el("path",{d:"M400,1125 H480",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:500,y:1133,fill:C.indigo,"font-size":23,"font-weight":400,"text-anchor":"start"},["데이터 이동","Data movement"]);
    p.el('text',{x:48,y:1197,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"start"},["① 데이터 준비 확인","① Check data readiness"]);
    p.el('text',{x:48,y:1239,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["GPU 쪽에서 송신할 데이터가 준비되었는지 확인","Check whether the GPU-side data is ready to send"]);
    p.el('text',{x:48,y:1297,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"start"},["② 전송 요청","② Request transfer"]);
    p.el('text',{x:48,y:1339,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["NIC가 데이터를 읽어 보내도록 요청","Ask the NIC to read and send the data"]);
    p.el('text',{x:48,y:1397,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"start"},["③ 완료 확인과 상태 반영","③ Check completion and update state"]);
    p.el('text',{x:48,y:1439,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["NIC의 전송 완료를 확인하고 GPU 쪽 진행 상태에 반영","Check NIC transfer completion and update GPU-side progress state"]);
    return [p];
  },
} satisfies FigureSpec;
