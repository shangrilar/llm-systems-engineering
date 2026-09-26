import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-and-training",figureId:"02-request-lifecycle",number:"02-request-lifecycle",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["요청 도착에서 종료까지","From request arrival to completion"],
  subtitle:["개념적 실행 지도입니다. 선택·공간 확보·출력 전달의 세부 순서는 엔진마다 다릅니다.","A conceptual map; engines differ in how they order selection, allocation, and delivery."],
  alt:["요청은 입력 준비와 대기를 거쳐 자원에 맞게 선택되어 실행되고 상태와 출력을 갱신합니다. 미완료 요청은 반복하고 KV 부족 시 진입 지연이나 중단과 회수로 처리합니다.","Requests wait after input preparation, are selected within resource limits, execute, and update state and output. Unfinished requests repeat; KV pressure can delay admission or trigger preemption and reclamation."],
  caption:["여러 요청의 작업을 묶어 실행하는 단위가 배치이고, 이번 실행에 포함할 작업을 고르는 일이 스케줄링입니다.","A batch is the unit that runs several requests’ work together; scheduling chooses which work joins each run."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,935,1104,[48,206]);
    if(locale==='ko'){
      p.raw("<g data-box=\"48,208,692,121\">");
      p.el("rect",{x:48,y:208,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:243,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"요청 도착 · 입력 준비");
      p.el('text',{x:68,y:286,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"텍스트를 토큰으로 바꾸고 요청 상태 생성");
      p.raw('</g>');
      p.el("path",{d:"M394,331 L394,347",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,359,692,121\">");
      p.el("rect",{x:48,y:359,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:394,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"대기 큐");
      p.el('text',{x:68,y:437,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"도착한 요청이 실행 기회를 기다림");
      p.raw('</g>');
      p.el("path",{d:"M394,482 L394,498",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,510,692,121\">");
      p.el("rect",{x:48,y:510,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:545,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"실행 대상 선택 · 자원 확인");
      p.el('text',{x:68,y:588,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"이번 단계의 토큰 예산과 KV 공간을 함께 고려");
      p.raw('</g>');
      p.el("path",{d:"M394,633 L394,649",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,661,692,121\">");
      p.el("rect",{x:48,y:661,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:696,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"선택한 토큰을 배치로 실행");
      p.el('text',{x:68,y:739,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"요청별 문맥을 유지하며 모델 계산");
      p.raw('</g>');
      p.el("path",{d:"M394,784 L394,800",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,812,692,121\">");
      p.el("rect",{x:48,y:812,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:847,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"다음 토큰 선택 · 상태 갱신");
      p.el('text',{x:68,y:890,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"계산된 KV, 토큰 이력, 종료 조건을 갱신");
      p.raw('</g>');
      p.el("path",{d:"M394,935 L394,951",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,963,692,121\">");
      p.el("rect",{x:48,y:963,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:998,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"출력 전달 · 완료/취소 정리");
      p.el('text',{x:68,y:1041,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"완료·취소 시 더 이상 필요 없는 자원 회수");
      p.raw('</g>');
      p.raw("<g data-box=\"816,208,336,162\">");
      p.el("rect",{x:816,y:208,width:336,height:162,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:836,y:243,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"실행 전");
      p.el('text',{x:836,y:286,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"대기 요청 ≠ 진행 중 요청");
      p.el('text',{x:836,y:316.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"≠ 이번 배치의 요청");
      p.raw('</g>');
      p.raw("<g data-box=\"816,420,336,238\">");
      p.el("rect",{x:816,y:420,width:336,height:238,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:836,y:455,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"KV 공간 부족");
      p.el('text',{x:836,y:498,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"새 요청 진입을 늦추거나");
      p.el('text',{x:836,y:528.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"진행 요청 중단");
      p.el('text',{x:836,y:559.6,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"→ KV 회수 → 재개 대기");
      p.raw('</g>');
      p.el("path",{d:"M751,556 L802,556",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:816,y:714,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"자원 확보와 선택은 함께 조정");
      p.raw("<g data-box=\"816,814,336,187\">");
      p.el("rect",{x:816,y:814,width:336,height:187,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
      p.el('text',{x:836,y:849,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"미완료 요청");
      p.el('text',{x:836,y:892,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"다음 단계의 선택으로 반복");
      p.el('text',{x:836,y:922.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"출력 전달은 계산과");
      p.el('text',{x:836,y:953.6,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"겹쳐 진행될 수도 있음");
      p.raw('</g>');
      p.el("path",{d:"M740,1019 H778 V510 H751",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:48,y:1126,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"단계 사이의 요청 관리입니다. GPU 커널을 중간에 끊는 흐름을 뜻하지 않습니다.");
    }else{
      p.raw("<g data-box=\"48,208,692,121\">");
      p.el("rect",{x:48,y:208,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:243,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Request arrives · prepare input");
      p.el('text',{x:68,y:286,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Tokenize text and create request state");
      p.raw('</g>');
      p.el("path",{d:"M394,331 L394,347",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,359,692,121\">");
      p.el("rect",{x:48,y:359,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:394,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Waiting queue");
      p.el('text',{x:68,y:437,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Arriving requests wait for an execution opportunity");
      p.raw('</g>');
      p.el("path",{d:"M394,482 L394,498",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,510,692,121\">");
      p.el("rect",{x:48,y:510,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:545,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Select work · check resources");
      p.el('text',{x:68,y:588,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Consider both the step token budget and KV capacity");
      p.raw('</g>');
      p.el("path",{d:"M394,633 L394,649",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,661,692,121\">");
      p.el("rect",{x:48,y:661,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:696,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Execute selected tokens as a batch");
      p.el('text',{x:68,y:739,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Compute while preserving each request’s context");
      p.raw('</g>');
      p.el("path",{d:"M394,784 L394,800",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,812,692,121\">");
      p.el("rect",{x:48,y:812,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:847,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Select next tokens · update state");
      p.el('text',{x:68,y:890,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Update KV, token history, and stop conditions");
      p.raw('</g>');
      p.el("path",{d:"M394,935 L394,951",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.raw("<g data-box=\"48,963,692,121\">");
      p.el("rect",{x:48,y:963,width:692,height:121,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:998,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Deliver output · clean up ended requests");
      p.el('text',{x:68,y:1041,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Free unused resources after finish or cancellation");
      p.raw('</g>');
      p.raw("<g data-box=\"816,208,336,162\">");
      p.el("rect",{x:816,y:208,width:336,height:162,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:836,y:243,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"Before execution");
      p.el('text',{x:836,y:286,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Waiting ≠ in progress");
      p.el('text',{x:836,y:316.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"≠ selected in this");
      p.el('text',{x:836,y:347.6,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"batch");
      p.raw('</g>');
      p.raw("<g data-box=\"816,420,336,238\">");
      p.el("rect",{x:816,y:420,width:336,height:238,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:836,y:455,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"KV space shortage");
      p.el('text',{x:836,y:498,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Delay admission, or");
      p.el('text',{x:836,y:528.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"preempt a request");
      p.el('text',{x:836,y:559.6,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"→ free KV → wait");
      p.raw('</g>');
      p.el("path",{d:"M751,556 L802,556",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:816,y:714,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"Selection and allocation");
      p.el('text',{x:816,y:744.8,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"interact");
      p.raw("<g data-box=\"816,814,336,187\">");
      p.el("rect",{x:816,y:814,width:336,height:187,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
      p.el('text',{x:836,y:849,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"start"},"Unfinished requests");
      p.el('text',{x:836,y:892,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Return to selection");
      p.el('text',{x:836,y:922.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Output delivery may");
      p.el('text',{x:836,y:953.6,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"overlap with execution");
      p.raw('</g>');
      p.el("path",{d:"M740,1019 H778 V510 H751",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:48,y:1126,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"These are request-management steps, not interruptions of a running GPU kernel.");
    }
    return [p];
  },
} satisfies FigureSpec;
