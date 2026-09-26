import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-communication-engines",figureId:"01-call-and-transfer",number:"01-call-and-transfer",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["CPU의 요청에서 실제 데이터 전달로","From CPU Requests to Data Transfer"],
  subtitle:["CPU가 통신 작업을 구성해 등록하면, 그 작업이 GPU의 데이터를 전달합니다.","The CPU builds and submits communication work, which then transfers GPU data."],
  alt:["CPU 프로세스 0과 1의 사용자 코드가 NCCL 송신과 수신을 요청한다. NCCL은 요청을 확인하고 실행할 작업을 구성한다. 주황 점선은 각 GPU에서 실행할 작업의 등록이며 파란 실선은 GPU 0 메모리의 x가 GPU 1 메모리로 전달되는 관계다. 하나의 호출이 하나의 커널과 일대일 대응한다는 의미는 아니다.","CPU processes 0 and 1 request a send and a receive from NCCL. NCCL checks the requests, builds the work and submits it. Orange dashed arrows show submission; the blue solid arrow shows transfer of x from GPU 0 memory to GPU 1 memory. One CPU call does not necessarily correspond to one GPU kernel."],
  caption:["주황 점선은 작업 등록, 파란 실선은 데이터 전달입니다. 호출 하나가 커널 하나와 일대일로 대응한다는 뜻은 아닙니다.","Orange dashed lines are work submission; blue solid lines are data transfer. One call does not necessarily map to one kernel."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,676,1104,[48,208]);
    p.el("path",{d:"M70,216 H150",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el('text',{x:170,y:224,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},["요청·상태","Requests / state"]);
    p.el("path",{d:"M400,216 H480",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:500,y:224,fill:C.indigo,"font-size":23,"font-weight":400,"text-anchor":"start"},["데이터 이동","Data movement"]);
    p.el("rect",{x:48,y:266,width:520,height:298,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:307,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["프로세스 0 · CPU 코드","Process 0 · CPU code"]);
    p.el("rect",{x:76,y:330,width:464,height:86,rx:12,fill:C.paper,stroke:C.ink,"stroke-width":1.5});
    p.el('text',{x:308,y:367,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["사용자 코드: 송신 요청","User code: request a send"]);
    p.el('text',{x:308,y:402,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"middle"},"ncclSend(...)");
    p.el("path",{d:"M308,425 V449",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:76,y:462,width:464,height:76,rx:12,fill:C.paper,stroke:C.ink,"stroke-width":1.5});
    p.el('text',{x:308,y:509,fill:C.ink,"font-size":(locale==='ko'?25:24),"font-weight":600,"text-anchor":"middle"},["NCCL: 요청 확인 · 작업 구성","NCCL: check request, build work"]);
    p.el("rect",{x:48,y:678,width:520,height:198,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:718,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:96,y:750,width:424,height:100,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:308,y:794,fill:C.indigo,"font-size":26,"font-weight":600,"text-anchor":"middle"},["통신 작업 · 송신","Communication · Send"]);
    p.el('text',{x:308,y:829,fill:C.indigo,"font-size":24,"font-weight":400,"text-anchor":"middle"},["GPU 메모리의 x 보내기","Send x from GPU memory"]);
    p.el("path",{d:"M308,549 V739",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el('text',{x:328,y:625,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"start"},["작업 등록","Submit work"]);
    p.el("rect",{x:632,y:266,width:520,height:298,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:660,y:307,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["프로세스 1 · CPU 코드","Process 1 · CPU code"]);
    p.el("rect",{x:660,y:330,width:464,height:86,rx:12,fill:C.paper,stroke:C.ink,"stroke-width":1.5});
    p.el('text',{x:892,y:367,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["사용자 코드: 수신 요청","User code: request a receive"]);
    p.el('text',{x:892,y:402,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"middle"},"ncclRecv(...)");
    p.el("path",{d:"M892,425 V449",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:660,y:462,width:464,height:76,rx:12,fill:C.paper,stroke:C.ink,"stroke-width":1.5});
    p.el('text',{x:892,y:509,fill:C.ink,"font-size":(locale==='ko'?25:24),"font-weight":600,"text-anchor":"middle"},["NCCL: 요청 확인 · 작업 구성","NCCL: check request, build work"]);
    p.el("rect",{x:632,y:678,width:520,height:198,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:660,y:718,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:680,y:750,width:424,height:100,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:892,y:794,fill:C.indigo,"font-size":26,"font-weight":600,"text-anchor":"middle"},["통신 작업 · 수신","Communication · Receive"]);
    p.el('text',{x:892,y:829,fill:C.indigo,"font-size":24,"font-weight":400,"text-anchor":"middle"},["GPU 메모리에 x 받기","Receive x into GPU memory"]);
    p.el("path",{d:"M892,549 V739",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el('text',{x:912,y:625,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"start"},["작업 등록","Submit work"]);
    p.el("path",{d:"M520,800 H668",fill:"none",stroke:C.indigo,"stroke-width":4,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:600,y:775,fill:C.indigo,"font-size":23,"font-weight":600,"text-anchor":"middle"},["x 전달","Transfer x"]);
    return [p];
  },
} satisfies FigureSpec;
