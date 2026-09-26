import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-communication-basics",figureId:"01-peers-and-buffers",number:"01-peers-and-buffers",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["통신할 상대와 받을 공간 준비하기","Preparing Peers and Receive Space"],
  subtitle:["CPU는 통신 그룹과 버퍼를 준비하고, 데이터는 GPU 메모리에 놓입니다.","The CPU prepares the group and buffers; the data lives in GPU memory."],
  alt:["같은 서버의 프로세스 0과 1이 GPU 0과 1을 각각 맡는다. 두 CPU 코드가 같은 통신 그룹의 rank 0과 1로 통신 객체를 준비하고 GPU 버퍼 확보를 요청한다. GPU 0의 A가 만든 [1,2,3,4]를 GPU 1 수신 버퍼로 전달한다. 수신 전에는 공간만 있고 수신 완료 뒤 값이 유효하다. GPU 0 원본은 유지된다. 상대 rank, 원소 수 4, 자료형 float32를 맞춘다. 점선은 공간 확보 요청이고 실선은 논리적인 데이터 전달이다.","Two processes on the same server handle GPUs 0 and 1. CPU code prepares communicators as ranks 0 and 1 in the same group and requests GPU buffers. A produces [1,2,3,4] on GPU 0 and the data is transferred into GPU 1 receive memory. Before receiving, only space exists; after completion, the input is ready for B. The original stays on GPU 0. The peers match four float32 elements. Dashed arrows are allocation requests and the solid arrow is logical data transfer."],
  caption:["점선은 공간 확보 요청, 실선은 논리적인 데이터 전달입니다. 송신 뒤에도 GPU 0의 원본은 유지됩니다.","Dashed lines request buffer space; solid lines show logical data transfer. GPU 0 keeps its original after sending."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,934,1104,[48,208]);
    p.el("rect",{x:48,y:205,width:1104,height:54,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:241,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["한 서버의 GPU 두 개를 두 프로세스가 하나씩 담당합니다","Two processes each handle one GPU on the same server"]);
    p.el("rect",{x:48,y:282,width:520,height:210,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:323,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["프로세스 0 · CPU 코드","Process 0 · CPU code"]);
    p.el('text',{x:76,y:367,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},["GPU 0 담당 · 그룹 안 번호 rank 0","GPU 0 · Rank 0 in this group"]);
    p.el('text',{x:76,y:411,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 그룹의 통신 객체 준비: comm₀","Prepare communicator: comm₀"]);
    p.el('text',{x:76,y:454,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"start"},["GPU 버퍼 확보 요청","Request GPU buffer allocation"]);
    p.el("path",{d:"M308,501 V559",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el('text',{x:328,y:540,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["공간 확보 요청","Allocate space"]);
    p.el("rect",{x:632,y:282,width:520,height:210,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:660,y:323,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["프로세스 1 · CPU 코드","Process 1 · CPU code"]);
    p.el('text',{x:660,y:367,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},["GPU 1 담당 · 그룹 안 번호 rank 1","GPU 1 · Rank 1 in this group"]);
    p.el('text',{x:660,y:411,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 그룹의 통신 객체 준비: comm₁","Prepare communicator: comm₁"]);
    p.el('text',{x:660,y:454,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"start"},["GPU 버퍼 확보 요청","Request GPU buffer allocation"]);
    p.el("path",{d:"M892,501 V559",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el('text',{x:912,y:540,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["공간 확보 요청","Allocate space"]);
    p.el("rect",{x:48,y:576,width:520,height:420,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:620,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["GPU 0 · 송신 버퍼","GPU 0 · Send buffer"]);
    p.el("rect",{x:632,y:576,width:520,height:420,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:660,y:620,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["GPU 1 · 수신 버퍼","GPU 1 · Receive buffer"]);
    p.el('text',{x:112,y:668,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"start"},["계산 A가 만든 x","x produced by A"]);
    p.el("rect",{x:112,y:686,width:76,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:150,y:727,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:200,y:686,width:76,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:238,y:727,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:288,y:686,width:76,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:326,y:727,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:376,y:686,width:76,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:414,y:727,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"4");
    p.el('text',{x:672,y:668,fill:C.muted,"font-size":(locale==='ko'?25:24),"font-weight":600,"text-anchor":"start"},["수신 전: 공간만 확보","Before receive: space only"]);
    p.el("rect",{x:672,y:686,width:76,height:62,rx:12,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:760,y:686,width:76,height:62,rx:12,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:848,y:686,width:76,height:62,rx:12,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el("rect",{x:936,y:686,width:76,height:62,rx:12,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:112,y:825,fill:C.blue,"font-size":(locale==='ko'?25:24),"font-weight":600,"text-anchor":"start"},["전달 뒤에도 원본 유지","Original stays after transfer"]);
    p.el("rect",{x:112,y:845,width:76,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:150,y:886,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:200,y:845,width:76,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:238,y:886,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:288,y:845,width:76,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:326,y:886,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:376,y:845,width:76,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:414,y:886,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"4");
    p.el('text',{x:672,y:825,fill:C.indigo,"font-size":(locale==='ko'?25:24),"font-weight":600,"text-anchor":"start"},["수신 완료: x 도착","Receive complete: x arrives"]);
    p.el("rect",{x:672,y:845,width:76,height:62,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:710,y:886,fill:C.indigo,"font-size":29,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:760,y:845,width:76,height:62,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:798,y:886,fill:C.indigo,"font-size":29,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:848,y:845,width:76,height:62,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:886,y:886,fill:C.indigo,"font-size":29,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:936,y:845,width:76,height:62,rx:12,fill:C.indigoFill,stroke:C.indigo,"stroke-width":1.5});
    p.el('text',{x:974,y:886,fill:C.indigo,"font-size":29,"font-weight":600,"text-anchor":"middle"},"4");
    p.el("path",{d:"M458,749 H596 V876 H664",fill:"none",stroke:C.indigo,"stroke-width":2.5,"marker-end":markerUrl(C.indigo)});
    p.el('text',{x:892,y:956,fill:C.indigo,"font-size":24,"font-weight":600,"text-anchor":"middle"},["B가 읽을 입력 준비","Input ready for B to read"]);
    p.el("rect",{x:48,y:1032,width:1104,height:102,rx:12,fill:C.indigoFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1073,fill:C.indigo,"font-size":25,"font-weight":600,"text-anchor":"middle"},["송신 상대: rank 1  ·  수신 상대: rank 0","Send to rank 1  ·  Receive from rank 0"]);
    p.el('text',{x:600,y:1110,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["양쪽이 맞추는 내용: 원소 4개 · 자료형 float32","Both sides match: 4 elements · float32"]);
    return [p];
  },
} satisfies FigureSpec;
