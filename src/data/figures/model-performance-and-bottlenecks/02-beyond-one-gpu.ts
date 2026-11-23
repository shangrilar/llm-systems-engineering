import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-performance-and-bottlenecks",figureId:"02-beyond-one-gpu",number:"02-beyond-one-gpu",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["현재 자원에서 개선하고, 필요한 자원을 늘립니다","Improve execution and expand resources as needed"],
  subtitle:["실행 시간의 목표와 실행에 필요한 메모리 용량을 구분합니다.","Distinguish a target execution time from the memory capacity needed to run."],
  alt:["왼쪽 실행 시간은 100에서 60ms로 줄었지만 30ms 목표를 넘는다. 오른쪽은 12GB GPU 용량 경계를 16GB의 필요 메모리가 넘는다. 필요량을 줄이거나 자원을 늘리는 선택에서 여러 GPU로 연결한다. 수치는 설명용이다.","Time drops from 100 to 60 ms but remains above a 30 ms target. A 16 GB requirement exceeds a GPU capacity of 12 GB. Reducing requirements or increasing resources leads to the multi-GPU question. Illustrative values."],
  caption:["수치는 설명용이며 특정 모델이나 GPU의 값이 아닙니다.","Values are illustrative, not those of a specific model or GPU."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,752,1104,[48,206]);
    p.el("rect",{x:48,y:207,width:536,height:476,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:250,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["목표 시간에 도달하지 못한 경우","The target time has not been met"]);
    p.el('text',{x:76,y:287,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["현재 GPU에서 실행을 개선","Improve execution on the current GPU"]);
    p.el("rect",{x:616,y:207,width:536,height:476,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:644,y:250,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["메모리 용량이 부족한 경우","Memory capacity is insufficient"]);
    p.el('text',{x:644,y:287,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["선택한 실행에 필요한 저장 공간","Storage needed for the chosen execution"]);
    p.el('text',{x:156,y:349,fill:C.ink,"font-size":20,"font-weight":400,"text-anchor":"end"},["처음","Initial"]);
    p.el("rect",{x:170,y:316,width:360,height:49,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:350,y:348.5,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},"100 ms");
    p.el('text',{x:156,y:436,fill:C.ink,"font-size":20,"font-weight":400,"text-anchor":"end"},["개선 후","Improved"]);
    p.el("rect",{x:170,y:403,width:216,height:49,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:278,y:435.5,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},"60 ms");
    p.el("path",{d:"M278,384 V399 M278,457 V514",fill:"none",stroke:C.orange,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:278,y:550,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["목표 30 ms","Target: 30 ms"]);
    p.el('text',{x:76,y:606,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["실행 시간은 줄었지만,","Execution is faster, but meeting the target"]);
    p.el('text',{x:76,y:640,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["목표를 달성하려면 추가 개선이 필요","requires further improvement."]);
    p.el('text',{x:644,y:349,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"start"},["한 GPU의 용량: 12 GB","One GPU: 12 GB capacity"]);
    p.el("rect",{x:644,y:382,width:300,height:128,rx:5,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:644,y:420,width:400,height:54,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:844,y:455,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["필요한 메모리: 16 GB","Required memory: 16 GB"]);
    p.el("path",{d:"M944,365 V415 M944,479 V526",fill:"none",stroke:C.blue,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:944,y:550,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["용량 경계","Capacity limit"]);
    p.el('text',{x:644,y:606,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["선택한 실행을 그대로 담을 수 없음","This execution does not fit as configured."]);
    p.el('text',{x:644,y:640,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["필요량을 줄이거나 저장 자원을 늘림","Reduce its memory needs or add storage."]);
    p.el("path",{d:"M316,705 L316,750",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M884,705 L884,750",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:767,width:1104,height:183,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:76,y:813,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"start"},["더 많은 자원을 활용한다면?","What if we use more resources?"]);
    p.el('text',{x:76,y:858,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["더 빠른 응답 · 더 많은 요청 처리 · 부족한 메모리 용량 확보","Faster responses · More requests · More memory capacity"]);
    p.el('text',{x:76,y:897,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["GPU를 추가하면, 데이터와 계산을 어떻게 나눌까요?","With additional GPUs, how should we divide data and computation?"]);
    return [p];
  },
} satisfies FigureSpec;
