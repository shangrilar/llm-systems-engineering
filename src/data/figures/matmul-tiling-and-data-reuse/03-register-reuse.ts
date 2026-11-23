import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"matmul-tiling-and-data-reuse",figureId:"03-register-reuse",number:"03-register-reuse",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["레지스터에 읽어온 값도 여러 계산에 사용합니다","Reuse register values across computations"],
  subtitle:["출력 하나 대신 작은 출력 타일을 맡으면, 스레드 내부에서도 입력을 재사용할 수 있습니다.","A thread can reuse inputs by computing a small tile instead of a single output."],
  alt:["블록이 맡은 4×4 출력 중 2×2를 한 스레드가 맡는 예시다. 첫 번째 곱을 위해 공유 메모리의 A[0,0], A[1,0], B[0,0], B[0,1]을 레지스터로 읽는다. a0,b0로 c00, a0,b1로 c01, a1,b0로 c10, a1,b1로 c11에 곱을 누적한다. 각 입력은 두 곱셈에 사용된다. 부분합은 지금까지 계산한 곱을 더한 값이며 처음 0으로 시작한다. 입력 a,b 레지스터는 다음 곱을 계산할 때 새 값을 받지만 네 부분합은 모든 곱을 더할 때까지 유지된다. 레지스터는 이 스레드의 상태이며 다른 스레드와 공유하는 저장소가 아니다. CUDA 코어의 스칼라 곱셈과 누산으로 설명하는 개념도다.","One thread owns a 2 × 2 region within the block's 4 × 4 outputs. For the first products, it reads A[0,0], A[1,0], B[0,0] and B[0,1] from shared memory into registers. Products a0*b0, a0*b1, a1*b0 and a1*b1 accumulate into c00, c01, c10 and c11 respectively. Each input serves two multiplications. Partial sums add the products computed so far and start at 0. Input registers receive new values for the next products while the four partial sums persist until all products are added. Registers hold this thread's state and are not storage shared with other threads. This conceptual example uses scalar CUDA-core multiplication and accumulation."],
  caption:["레지스터는 이 스레드의 상태이며 다른 스레드와 공유하지 않습니다. CUDA 코어의 스칼라 곱셈·누산으로 설명한 개념도입니다.","Registers hold this thread’s own state and are not shared with other threads. The concept is shown with scalar multiply-accumulate on CUDA cores."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,925,1104,[48,206]);
    p.el("rect",{x:48,y:207,width:1104,height:99,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:76,y:246,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},["블록이 맡은 출력 중 2 × 2 영역을 한 스레드가 계산한다고 해봅시다.","Let one thread compute a 2 × 2 region within the block's outputs."]);
    p.el('text',{x:76,y:281,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"start"},["부분합은 지금까지 계산한 곱을 더한 값입니다. 출력 네 개의 부분합을 유지합니다.","A partial sum adds the products computed so far. Keep one for each of four outputs."]);
    p.el("rect",{x:48,y:337,width:1104,height:576,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:382,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["각 출력에 필요한 여러 곱 중, 첫 번째 곱을 계산하는 순간","Computing the first of the products needed for each output"]);
    p.el("rect",{x:421,y:431,width:280,height:66,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:561,y:472,fill:C.purple,"font-size":24,"font-weight":600,"text-anchor":"middle"},"b0 = B[0, 0]");
    p.el("rect",{x:757,y:431,width:280,height:66,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:897,y:472,fill:C.purple,"font-size":24,"font-weight":600,"text-anchor":"middle"},"b1 = B[0, 1]");
    p.el("rect",{x:77,y:552,width:278,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:216,y:593,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"a0 = A[0, 0]");
    p.el("rect",{x:77,y:711,width:278,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:216,y:752,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},"a1 = A[1, 0]");
    p.el("rect",{x:421,y:529,width:280,height:111,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:561,y:568,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"c00");
    p.el('text',{x:561,y:613,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},["a0 × b0 더하기","Add a0 × b0"]);
    p.el("rect",{x:757,y:529,width:280,height:111,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:897,y:568,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"c01");
    p.el('text',{x:897,y:613,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},["a0 × b1 더하기","Add a0 × b1"]);
    p.el("rect",{x:421,y:688,width:280,height:111,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:561,y:727,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"c10");
    p.el('text',{x:561,y:772,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},["a1 × b0 더하기","Add a1 × b0"]);
    p.el("rect",{x:757,y:688,width:280,height:111,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:897,y:727,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"c11");
    p.el('text',{x:897,y:772,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},["a1 × b1 더하기","Add a1 × b1"]);
    p.el("path",{d:"M366,585 L407,585",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M366,744 L407,744",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M561,502 L561,522",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el("path",{d:"M897,502 L897,522",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el('text',{x:600,y:864,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["입력 네 개를 읽어 네 곱셈에 사용 · 각 입력을 두 번씩 재사용","Read four inputs for four products · Use each input twice"]);
    p.el("rect",{x:48,y:950,width:1104,height:111,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:600,y:994,fill:C.orange,"font-size":26,"font-weight":700,"text-anchor":"middle"},["c00, c01, c10, c11은 레지스터에 유지","Keep c00, c01, c10, c11 in registers"]);
    p.el('text',{x:600,y:1034,fill:C.orange,"font-size":24,"font-weight":400,"text-anchor":"middle"},["두 번째, 세 번째 곱도 여기에 더합니다. 모든 곱을 더하면 출력이 완성됩니다.","Add the next products here. Each output is complete after all products are added."]);
    p.el('text',{x:600,y:1115,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"middle"},["공유 메모리에서 읽어온 값도, 여러 계산에 다시 사용할 수 있습니다.","Values read from shared memory can be reused across computations."]);
    return [p];
  },
} satisfies FigureSpec;
