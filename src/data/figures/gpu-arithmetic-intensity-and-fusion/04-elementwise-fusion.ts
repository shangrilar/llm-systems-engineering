import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-arithmetic-intensity-and-fusion",figureId:"04-elementwise-fusion",number:"04-elementwise-fusion",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["Fusion은 중간값의 저장과 재읽기를 줄입니다","Fusion Reduces Intermediate Stores and Rereads"],
  subtitle:["한번 읽어온 값으로 연속된 계산을 수행하고 최종 결과를 저장합니다.","Read values once, perform consecutive operations, and store the final results."],
  alt:["동일한 입력에 대해 u=x+bias, y=ReLU(u)를 두 커널과 한 커널로 수행한다. 분리 실행은 커널 1에서 u를 계산해 전역 메모리의 중간 텐서에 저장한다. 커널 1이 끝난 뒤 커널 2가 이 텐서에서 u를 읽어 ReLU를 적용한다. 전역 메모리 접근에는 캐시가 관여하므로 모든 읽기와 쓰기가 HBM까지 이어지는 것은 아니다. Fusion은 커널 내부에서 중간값을 이어 사용해 최종결과만 저장한다. ReLU는 max(0,u)다. 중간 텐서u의 출력N개에 대해 논리적 쓰기N개와읽기N개,FP32이면8Nbyte 접근을 줄인다. 입력과 최종출력의 접근은 공통이다. 실제HBM바이트나속도향상은캐시,레지스터스필등구현의영향을받는다.","Compute u=x+bias and y=ReLU(u) from identical inputs using two kernels or one. Separate execution computes u in kernel 1 and stores it in an intermediate tensor in global memory. After kernel 1 finishes, kernel 2 reads u and applies ReLU. Caches participate in global-memory accesses, so not every read and write reaches HBM. Fusion uses intermediate values within the kernel and stores only final results. ReLU is max(0,u). For N intermediate values, it removes N logical writes and N reads, or 8N bytes for FP32. Input and final-output accesses are common to both cases. Actual HBM bytes and speedups depend on implementation details such as caches and register spills."],
  caption:["줄어드는 접근은 논리적 기준입니다. 실제 HBM 바이트와 속도 향상은 캐시 등 구현에 따라 달라집니다.","Saved accesses are counted logically; actual HBM bytes and speedups depend on caches and the implementation."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,957,1104,[48,206]);
    p.el("rect",{x:180,y:211,width:840,height:72,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:255,fill:C.ink,"font-size":30,"font-weight":600,"text-anchor":"middle"},"u = x + bias    →    y = ReLU(u)");
    p.el("rect",{x:48,y:319,width:536,height:770,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:365,fill:C.ink,"font-size":(locale==='ko'?28:27),"font-weight":700,"text-anchor":"middle"},["분리 실행 · 커널 두 개","Separate Execution · Two Kernels"]);
    p.el("rect",{x:76,y:397,width:480,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:438,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["입력 x와 bias 읽기","Read inputs x and bias"]);
    p.el("path",{d:"M316,474 L316,504",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:76,y:516,width:480,height:115,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:316,y:551,fill:C.orange,"font-size":20,"font-weight":600,"text-anchor":"middle"},["커널 1","Kernel 1"]);
    p.el('text',{x:316,y:598,fill:C.orange,"font-size":30,"font-weight":700,"text-anchor":"middle"},"u = x + bias");
    p.el("path",{d:"M316,643 L316,673",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:76,y:687,width:480,height:135,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:316,y:719,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},["중간 텐서 u","Intermediate tensor u"]);
    p.el('text',{x:316,y:750,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["전역 메모리에 저장","Store in global memory"]);
    p.el('text',{x:316,y:781,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["→ 다음 커널에서 읽기","→ Read in the next kernel"]);
    p.el('text',{x:316,y:810,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["출력 N개: 쓰기 N개 + 읽기 N개","N outputs: N writes + N reads"]);
    p.el("path",{d:"M316,833 L316,861",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:76,y:873,width:480,height:112,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:316,y:908,fill:C.orange,"font-size":20,"font-weight":600,"text-anchor":"middle"},["커널 2","Kernel 2"]);
    p.el('text',{x:316,y:953,fill:C.orange,"font-size":30,"font-weight":700,"text-anchor":"middle"},"y = ReLU(u)");
    p.el("path",{d:"M316,993 L316,1012",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:76,y:1025,width:480,height:43,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:1054.5,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["최종 결과 y 저장","Store final result y"]);
    p.el("rect",{x:616,y:319,width:536,height:770,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:365,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"middle"},["Fusion · 커널 하나","Fusion · One Kernel"]);
    p.el("rect",{x:644,y:397,width:480,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:438,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["입력 x와 bias 읽기","Read inputs x and bias"]);
    p.el("path",{d:"M884,474 L884,504",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:644,y:516,width:480,height:469,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:884,y:554,fill:C.orange,"font-size":(locale==='ko'?23:22),"font-weight":700,"text-anchor":"middle"},["커널 안에서 계산을 이어감","Continue computing within the kernel"]);
    p.el('text',{x:884,y:621,fill:C.orange,"font-size":32,"font-weight":700,"text-anchor":"middle"},"u = x + bias");
    p.el("path",{d:"M884,649 L884,694",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:884,y:735,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},["중간값 u를 바로 사용","Use intermediate u directly"]);
    p.el('text',{x:884,y:778,fill:C.muted,"font-size":(locale==='ko'?23:22),"font-weight":400,"text-anchor":"middle"},["중간 텐서의 저장·재읽기 없음","No intermediate tensor stores or rereads"]);
    p.el("path",{d:"M884,816 L884,872",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:884,y:947,fill:C.orange,"font-size":32,"font-weight":700,"text-anchor":"middle"},"y = ReLU(u)");
    p.el("path",{d:"M884,993 L884,1012",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:644,y:1025,width:480,height:43,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:1054.5,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["최종 결과 y 저장","Store final result y"]);
    p.el('text',{x:600,y:1147,fill:C.ink,"font-size":(locale==='ko'?26:25),"font-weight":700,"text-anchor":"middle"},["계산과 결과는 같고, 중간값을 쓰고 다시 읽는 과정이 사라집니다.","Same computation and results, without writing and rereading intermediate values."]);
    return [p];
  },
} satisfies FigureSpec;
