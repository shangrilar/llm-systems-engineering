import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"multi-gpu-execution",figureId:"02-three-goals",number:"02-three-goals",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["여러 GPU를 사용하는 세 가지 목적","Three reasons to use multiple GPUs"],
  subtitle:["모델을 담는 용량, 한 요청의 완료 시간, 전체 요청 처리량을 구분합니다.","Distinguish model capacity, time for one request, and total request throughput."],
  alt:["첫 패널은 모델 A와 B를 두 GPU에 분할 저장한다. 둘째는 같은 요청의 계산 A와 B를 동시에 처리하고 통신과 취합을 거쳐 완료한다. 셋째는 각 GPU에 같은 전체 모델을 복제하고 요청 A와 B를 따로 처리한다. 목적은 겹칠 수 있다.","Panel 1 stores model parts A and B across two GPUs. Panel 2 splits one request into concurrent computations A and B and communicates to combine results. Panel 3 replicates the full model on each GPU and serves requests A and B separately. Goals may overlap."],
  caption:["각 배치는 목적을 구분하기 위한 단순화된 예시입니다.","Each placement is a simplified example that separates the goals."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1164,1104,[48,206]);
    p.el("rect",{x:48,y:208,width:1104,height:328,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:251,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"start"},"01");
    p.el('text',{x:119,y:251,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["더 큰 모델 실행","Run a larger model"]);
    p.el('text',{x:1124,y:251,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"end"},["용량 확보","More capacity"]);
    p.el("rect",{x:48,y:562,width:1104,height:375,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:605,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"start"},"02");
    p.el('text',{x:119,y:605,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["한 요청을 더 빠르게","Finish one request sooner"]);
    p.el('text',{x:1124,y:605,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"end"},["응답 시간 단축","Lower latency"]);
    p.el("rect",{x:48,y:963,width:1104,height:344,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:1006,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"start"},"03");
    p.el('text',{x:119,y:1006,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["더 많은 요청 처리","Serve more requests"]);
    p.el('text',{x:1124,y:1006,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"end"},["처리량 증가","Higher throughput"]);
    p.el('text',{x:76,y:323,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["한 GPU에는","The whole model"]);
    p.el('text',{x:76,y:361,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["모델 전체가","does not fit"]);
    p.el('text',{x:76,y:399,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["들어가지 않음","on one GPU."]);
    p.el("rect",{x:423,y:289,width:329,height:151,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:445,y:326,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:445,y:348,width:285,height:65,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:587.5,y:388.5,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["모델 일부 A","Model part A"]);
    p.el("rect",{x:795,y:289,width:329,height:151,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:817,y:326,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:817,y:348,width:285,height:65,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:959.5,y:388.5,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["모델 일부 B","Model part B"]);
    p.el("path",{d:"M439,457 V470 H1108 V457",fill:"none",stroke:C.orange,"stroke-width":2});
    p.el('text',{x:773,y:505,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["두 GPU에 모델을 나누어 저장","Store the model across two GPUs"]);
    p.el('text',{x:76,y:684,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["한 요청의 계산을","Split computation"]);
    p.el('text',{x:76,y:722,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["나누어 수행하고","for one request,"]);
    p.el('text',{x:76,y:760,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["결과를 연결","then join results."]);
    p.el("rect",{x:423,y:641,width:329,height:120,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:445,y:676,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:445,y:696,width:285,height:45,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:587.5,y:726.5,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["계산 A","Compute A"]);
    p.el("rect",{x:795,y:641,width:329,height:120,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:817,y:676,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:817,y:696,width:285,height:45,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:959.5,y:726.5,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["계산 B","Compute B"]);
    p.el("path",{d:"M587,766 V786 H773 V804",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el("path",{d:"M959,766 V786 H773",fill:"none",stroke:C.purple,"stroke-width":2});
    p.el("rect",{x:581,y:809,width:385,height:44,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:773.5,y:839,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},["통신·결과 취합 → 완료","Communicate / combine → done"]);
    p.el('text',{x:773,y:899,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},["통신을 포함한 완료 시간이 줄어드는 경우","When the total time, including communication, falls"]);
    p.el('text',{x:76,y:1085,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["같은 모델을","Replicate the model"]);
    p.el('text',{x:76,y:1123,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["각 GPU에 복제하고","on each GPU; handle"]);
    p.el('text',{x:76,y:1161,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["서로 다른 요청 처리","different requests."]);
    p.el("rect",{x:423,y:1042,width:329,height:141,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:445,y:1078,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:445,y:1097,width:285,height:59,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:587.5,y:1134.5,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["같은 모델 전체","Same complete model"]);
    p.el("path",{d:"M588,1189 L588,1210",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:588,y:1250,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["요청 A 완료","Request A complete"]);
    p.el("rect",{x:795,y:1042,width:329,height:141,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:817,y:1078,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:817,y:1097,width:285,height:59,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:959.5,y:1134.5,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["같은 모델 전체","Same complete model"]);
    p.el("path",{d:"M960,1189 L960,1210",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:960,y:1250,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["요청 B 완료","Request B complete"]);
    p.el('text',{x:600,y:1354,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["세 목적은 함께 달성할 수도 있습니다. 목적에 따라 배치와 실행을 정합니다.","These goals can overlap. Placement and execution depend on the goal."]);
    return [p];
  },
} satisfies FigureSpec;
