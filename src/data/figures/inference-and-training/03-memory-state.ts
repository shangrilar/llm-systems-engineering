import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-and-training",figureId:"03-memory-state",number:"03-memory-state",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["학습과 추론에서 사용하는 GPU 메모리","GPU memory in training and inference"],
  subtitle:["둘 다 모델 가중치를 사용하지만, 다음 계산을 위해 보관하는 상태는 다릅니다.","Both use model weights, but retain different state for the computations that follow."],
  alt:["학습과 추론 모두 모델 가중치를 GPU 메모리에 둡니다. 학습은 역전파용 활성값, 그레디언트, 옵티마이저 상태를 유지하고 추론은 이후 생성에 재사용할 KV 캐시를 유지합니다. 두 실행 모두 중간값과 작업 공간이 필요합니다. 카드는 저장 목적을 비교하며 사용량과 비율을 나타내지 않습니다.","Both training and inference store model weights in GPU memory. Training retains activations for backpropagation, gradients, and optimizer state; inference retains KV for later generation. Both also need intermediate values and workspace. Cards compare storage roles, not memory amounts or proportions."],
  caption:["학습은 역전파와 갱신에 쓸 상태를, 추론은 이후 생성에 쓸 KV 캐시를 유지합니다.","Training keeps state for the backward pass and updates; inference keeps the KV cache for later generation."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1044,1104,[48,206]);
    if(locale==='ko'){
      p.el('text',{x:48,y:219,fill:C.teal,"font-size":29,"font-weight":700,"text-anchor":"start"},"학습");
      p.el('text',{x:642,y:219,fill:C.blue,"font-size":29,"font-weight":700,"text-anchor":"start"},"추론");
      p.raw("<g data-box=\"48,255,510,126\">");
      p.el("rect",{x:48,y:255,width:510,height:126,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:290,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"모델 가중치 W");
      p.el('text',{x:68,y:333,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"한 배치의 입력들이 함께 사용");
      p.el('text',{x:68,y:363.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"가중치 갱신의 대상");
      p.raw('</g>');
      p.raw("<g data-box=\"642,255,510,126\">");
      p.el("rect",{x:642,y:255,width:510,height:126,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:662,y:290,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"모델 가중치 W");
      p.el('text',{x:662,y:333,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"여러 요청이 함께 사용");
      p.el('text',{x:662,y:363.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"생성 동안 가중치 유지");
      p.raw('</g>');
      p.el('text',{x:48,y:433,fill:C.teal,"font-size":26,"font-weight":700,"text-anchor":"start"},"가중치 갱신을 위해 유지");
      p.el('text',{x:642,y:433,fill:C.orange,"font-size":26,"font-weight":700,"text-anchor":"start"},"이후 생성을 위해 유지");
      p.raw("<g data-box=\"48,470,510,132\">");
      p.el("rect",{x:48,y:470,width:510,height:132,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:68,y:505,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"저장 활성값");
      p.el('text',{x:68,y:548,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"순전파에서 만든 중간값");
      p.el('text',{x:68,y:578.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"역전파의 기울기 계산에 사용");
      p.raw('</g>');
      p.raw("<g data-box=\"48,622,510,132\">");
      p.el("rect",{x:48,y:622,width:510,height:132,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:68,y:657,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"그레디언트");
      p.el('text',{x:68,y:700,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"역전파로 계산한 기울기");
      p.el('text',{x:68,y:730.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"가중치 갱신에 사용");
      p.raw('</g>');
      p.raw("<g data-box=\"48,774,510,132\">");
      p.el("rect",{x:48,y:774,width:510,height:132,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:68,y:809,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"옵티마이저 상태");
      p.el('text',{x:68,y:852,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"업데이트에 쓰는 누적 통계 등");
      p.el('text',{x:68,y:882.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"옵티마이저에 따라 구성이 달라짐");
      p.raw('</g>');
      p.raw("<g data-box=\"642,470,510,132\">");
      p.el("rect",{x:642,y:470,width:510,height:132,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:662,y:505,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"KV 캐시");
      p.el('text',{x:662,y:548,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"처리한 토큰에서 계산한 K와 V");
      p.el('text',{x:662,y:578.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"이후 생성에서 다시 읽기 위해 보관");
      p.raw('</g>');
      p.el('text',{x:642,y:661,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"요청의 문맥을 이어 가는 상태");
      p.el('text',{x:642,y:714,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},"더 많은 요청을 동시에 유지하거나");
      p.el('text',{x:642,y:747.6,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},"더 긴 문맥을 보관하면");
      p.el('text',{x:642,y:781.2,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},"KV에 필요한 저장 공간이 늘어납니다.");
      p.raw("<g data-box=\"48,955,1104,142\">");
      p.el("rect",{x:48,y:955,width:1104,height:142,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
      p.el('text',{x:70,y:990,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"양쪽 모두 실행 중 중간값과 작업 공간이 필요합니다");
      p.el('text',{x:70,y:1032,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"추론도 실행 중 활성값을 만듭니다. 역전파를 위해 보관하지 않는다는 점이 다릅니다.");
      p.raw('</g>');
      p.el('text',{x:48,y:1141,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"카드는 저장 역할을 설명하며, 독립된 메모리 영역의 분할이나 실제 사용량·비율을 나타내지 않습니다.");
      p.el('text',{x:48,y:1204,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"전체 가중치 학습과 KV 캐시 생성의 GPU 내 기본 구성입니다. 세부 저장 방식은 달라질 수 있습니다.");
    }else{
      p.el('text',{x:48,y:219,fill:C.teal,"font-size":29,"font-weight":700,"text-anchor":"start"},"Training");
      p.el('text',{x:642,y:219,fill:C.blue,"font-size":29,"font-weight":700,"text-anchor":"start"},"Inference");
      p.raw("<g data-box=\"48,255,510,126\">");
      p.el("rect",{x:48,y:255,width:510,height:126,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:68,y:290,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Model weights W");
      p.el('text',{x:68,y:333,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Shared by inputs in a batch");
      p.el('text',{x:68,y:363.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Updated during training");
      p.raw('</g>');
      p.raw("<g data-box=\"642,255,510,126\">");
      p.el("rect",{x:642,y:255,width:510,height:126,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:662,y:290,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"Model weights W");
      p.el('text',{x:662,y:333,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Shared by multiple requests");
      p.el('text',{x:662,y:363.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Kept fixed during generation");
      p.raw('</g>');
      p.el('text',{x:48,y:433,fill:C.teal,"font-size":26,"font-weight":700,"text-anchor":"start"},"Retained for weight updates");
      p.el('text',{x:642,y:433,fill:C.orange,"font-size":26,"font-weight":700,"text-anchor":"start"},"Retained for later generation");
      p.raw("<g data-box=\"48,470,510,132\">");
      p.el("rect",{x:48,y:470,width:510,height:132,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:68,y:505,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"Saved activations");
      p.el('text',{x:68,y:548,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Forward-pass intermediate values");
      p.el('text',{x:68,y:578.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Retained for backward");
      p.raw('</g>');
      p.raw("<g data-box=\"48,622,510,132\">");
      p.el("rect",{x:48,y:622,width:510,height:132,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:68,y:657,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"Gradients");
      p.el('text',{x:68,y:700,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Computed by backpropagation");
      p.el('text',{x:68,y:730.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Used to update the weights");
      p.raw('</g>');
      p.raw("<g data-box=\"48,774,510,132\">");
      p.el("rect",{x:48,y:774,width:510,height:132,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
      p.el('text',{x:68,y:809,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"start"},"Optimizer state");
      p.el('text',{x:68,y:852,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Running statistics, for example");
      p.el('text',{x:68,y:882.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Contents depend on the optimizer");
      p.raw('</g>');
      p.raw("<g data-box=\"642,470,510,132\">");
      p.el("rect",{x:642,y:470,width:510,height:132,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:662,y:505,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"KV cache");
      p.el('text',{x:662,y:548,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"K and V from processed tokens");
      p.el('text',{x:662,y:578.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Reused in later generation");
      p.raw('</g>');
      p.el('text',{x:642,y:661,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"State for a request’s context");
      p.el('text',{x:642,y:714,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},"Keeping more requests active");
      p.el('text',{x:642,y:747.6,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},"or retaining longer contexts");
      p.el('text',{x:642,y:781.2,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},"increases the space needed for KV.");
      p.raw("<g data-box=\"48,955,1104,142\">");
      p.el("rect",{x:48,y:955,width:1104,height:142,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
      p.el('text',{x:70,y:990,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"Both also need intermediate values and workspace");
      p.el('text',{x:70,y:1032,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"Inference also creates activations during execution, without retaining them for");
      p.el('text',{x:70,y:1062.8,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},"backpropagation.");
      p.raw('</g>');
      p.el('text',{x:48,y:1141,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"Cards explain storage roles, not a partition into separate memory regions or actual");
      p.el('text',{x:48,y:1171.8,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"amounts and proportions.");
      p.el('text',{x:48,y:1204,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"Typical full-parameter training and generation with KV caching, with state on the GPU.");
      p.el('text',{x:48,y:1234.8,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"Storage choices can vary.");
    }
    return [p];
  },
} satisfies FigureSpec;
