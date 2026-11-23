import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"cpu-and-gpu",figureId:"03-host-device-flow",number:"03-host-device-flow",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["CPU가 작업을 요청하고 GPU가 계산합니다","The CPU requests work; the GPU computes"],
  subtitle:["입력 준비부터 필요한 결과를 가져오기까지의 흐름입니다.","Follow an input from preparation to result retrieval."],
  alt:["CPU에서 입력을 준비해 GPU 메모리로 복사하고 별도의 실행 요청을 보낸다. GPU의 두 연산 사이 중간 결과는 GPU에 유지한다. 완료 후 필요한 결과를 호스트로 복사한다.","The host copies inputs and requests execution. Two GPU operations keep intermediate data on the device. Needed results are copied back after completion."],
  caption:["CPU와 GPU가 각각의 메모리를 사용하는 경우입니다. 가중치는 미리 GPU 메모리에 준비해 둡니다.","CPU and GPU use separate memories here. Weights are already stored in GPU memory."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,932,1104,[48,206]);
    p.el("rect",{x:48,y:208,width:410,height:804,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:710,y:208,width:442,height:804,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:253,y:252,fill:C.ink,"font-size":32,"font-weight":700,"text-anchor":"middle"},"Host");
    p.el('text',{x:253,y:286,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["CPU + 호스트 메모리","CPU + host memory"]);
    p.el('text',{x:931,y:252,fill:C.blue,"font-size":32,"font-weight":700,"text-anchor":"middle"},"Device");
    p.el('text',{x:931,y:286,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["GPU + GPU 메모리","GPU + GPU memory"]);
    p.el("rect",{x:80,y:328,width:346,height:70,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:253,y:371,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["① CPU에서 입력 준비","① CPU prepares input"]);
    p.el("rect",{x:750,y:328,width:362,height:70,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:931,y:371,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["GPU 메모리","GPU memory"]);
    p.el("path",{d:"M427,365 L742,365",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:584,y:341,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["② 데이터 전달","② Copy data"]);
    p.el("path",{d:"M253,403 L253,452",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:80,y:466,width:346,height:76,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:253,y:512,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["③ GPU 실행 요청","③ Request GPU work"]);
    p.el("path",{d:"M427,503 L741,503",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el('text',{x:584,y:479,fill:C.muted,"font-size":21,"font-weight":600,"text-anchor":"middle"},["실행 요청","Execution request"]);
    p.el("path",{d:"M931,403 L931,456",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:750,y:466,width:362,height:354,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:931,y:506,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},["④ GPU에서 계산","④ Compute on GPU"]);
    p.el("rect",{x:798,y:534,width:266,height:56,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:931,y:570,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["연산 A","Operation A"]);
    p.el("path",{d:"M931,594 L931,623",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:798,y:634,width:266,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:931,y:666,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["중간 데이터","Intermediate data"]);
    p.el("path",{d:"M931,686 L931,715",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:798,y:726,width:266,height:56,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:931,y:762,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["연산 B","Operation B"]);
    p.el('text',{x:253,y:665,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["필요한 시점에","When needed,"]);
    p.el('text',{x:253,y:702,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["완료를 확인합니다.","wait for completion."]);
    p.el("path",{d:"M931,825 L931,882",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:750,y:899,width:362,height:66,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:931,y:940,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["결과 데이터","Result data"]);
    p.el("rect",{x:80,y:899,width:346,height:66,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:253,y:940,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},["필요한 결과 사용","Use the needed results"]);
    p.el("path",{d:"M747,932 L433,932",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:584,y:905,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["⑤ 결과 회수","⑤ Copy results"]);
    p.el("path",{d:"M70,1060 L136,1060",fill:"none",stroke:C.blue,"stroke-width":4,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:151,y:1068,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"start"},["데이터 이동","Data transfer"]);
    p.el("path",{d:"M449,1060 L515,1060",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el('text',{x:532,y:1068,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["실행 요청","Execution request"]);
    p.el('text',{x:48,y:1122,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["중간 결과는 GPU에 유지한 채 다음 연산에 사용할 수 있습니다.","Intermediate results can stay on the GPU for the next operation."]);
    return [p];
  },
} satisfies FigureSpec;
