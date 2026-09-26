import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-architecture",figureId:"01-gpu-and-sm",number:"01-gpu-and-sm",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["GPU 전체에서 SM 내부로","From the GPU to the Inside of an SM"],
  subtitle:["여러 SM 안에 연산 장치와 가까운 저장 공간이 있습니다.","Each SM contains compute units and nearby storage."],
  alt:["GPU 칩 안에 여러 SM과 L2 캐시가 있고 HBM은 칩 바깥에 있다. SM 하나를 확대해 명령 제어, CUDA Core, Tensor Core, register, L1 캐시와 shared memory를 보여준다. CUDA Core는 숫자 연산, Tensor Core는 행렬 곱과 누적의 예로 구분한다.","The GPU chip contains multiple SMs and an L2 cache, with HBM outside the chip. An enlarged SM shows instruction control, CUDA Cores, Tensor Cores, registers, L1 cache, and shared memory. CUDA Cores are illustrated with scalar arithmetic and Tensor Cores with matrix multiplication and accumulation."],
  caption:["구성 요소를 단순화한 개념도입니다. 실제 SM 수와 배치, 면적 비율을 나타내지 않습니다.","A simplified concept view; it does not show actual SM counts, layout, or area ratios."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,817,1104,[48,206]);
    p.el("rect",{x:48,y:218,width:430,height:600,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:262,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["GPU 칩","GPU chip"]);
    p.el("rect",{x:74,y:292,width:176,height:90,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:162,y:329,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},"SM");
    p.el("rect",{x:96,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:123,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:150,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:177,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:204,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:276,y:292,width:176,height:90,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:364,y:329,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"SM");
    p.el("rect",{x:298,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:325,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:352,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:379,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:406,y:348,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:74,y:404,width:176,height:90,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:162,y:441,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},"SM");
    p.el("rect",{x:96,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:123,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:150,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:177,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:204,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:276,y:404,width:176,height:90,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:364,y:441,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},"SM");
    p.el("rect",{x:298,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:325,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:352,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:379,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:406,y:460,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:74,y:516,width:176,height:90,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:162,y:553,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},"SM");
    p.el("rect",{x:96,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:123,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:150,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:177,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:204,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:276,y:516,width:176,height:90,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:364,y:553,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},"SM");
    p.el("rect",{x:298,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:325,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:352,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:379,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:406,y:572,width:22,height:14,rx:2,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("path",{d:"M162,606 V660 H364 V606",fill:"none",stroke:C.blue,"stroke-width":2});
    p.el("path",{d:"M263,660 V697",fill:"none",stroke:C.blue,"stroke-width":2});
    p.el("rect",{x:74,y:699,width:378,height:74,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:263,y:744,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["L2 캐시","L2 cache"]);
    p.el("path",{d:"M263,773 V878",fill:"none",stroke:C.blue,"stroke-width":3});
    p.el("rect",{x:74,y:878,width:378,height:100,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:263,y:936,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"HBM");
    p.el('text',{x:263,y:1008,fill:C.muted,"font-size":(locale==='ko'?21:20),"font-weight":400,"text-anchor":"middle"},["GPU 칩 바깥의 메모리","Memory outside the GPU chip"]);
    p.el("path",{d:"M454,337 H574",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue),"stroke-dasharray":"7 7"});
    p.el('text',{x:516,y:317,fill:C.blue,"font-size":19,"font-weight":600,"text-anchor":"middle"},["확대","Zoom in"]);
    p.el("rect",{x:594,y:218,width:558,height:760,rx:12,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:618,y:262,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"start"},["SM 내부","Inside an SM"]);
    p.el("rect",{x:618,y:285,width:510,height:60,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:873,y:323,fill:C.muted,"font-size":(locale==='ko'?23:22),"font-weight":600,"text-anchor":"middle"},["명령 스케줄링 · 실행 제어","Instruction scheduling · Execution control"]);
    p.el("rect",{x:618,y:369,width:243,height:205,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:739.5,y:410,fill:C.orange,"font-size":26,"font-weight":700,"text-anchor":"middle"},"CUDA Core");
    p.el("rect",{x:885,y:369,width:243,height:205,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1006.5,y:410,fill:C.orange,"font-size":26,"font-weight":700,"text-anchor":"middle"},"Tensor Core");
    p.el('text',{x:739.5,y:450,fill:C.orange,"font-size":21,"font-weight":400,"text-anchor":"middle"},["개별 값의 산술 연산","Arithmetic on values"]);
    p.el('text',{x:739.5,y:506,fill:C.orange,"font-size":30,"font-weight":600,"text-anchor":"middle"},"a × b + c");
    p.el('text',{x:1006.5,y:450,fill:C.orange,"font-size":(locale==='ko'?21:18),"font-weight":400,"text-anchor":"middle"},["행렬 곱 · 누적","Matrix multiply-accumulate"]);
    p.el("rect",{x:906,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:919,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:932,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:906,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:919,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:932,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:906,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:919,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:932,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:924.5,y:543,fill:C.orange,"font-size":20,"font-weight":600,"text-anchor":"middle"},"A");
    p.el("rect",{x:981,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:994,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1007,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:981,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:994,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1007,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:981,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:994,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1007,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:999.5,y:543,fill:C.orange,"font-size":20,"font-weight":600,"text-anchor":"middle"},"B");
    p.el("rect",{x:1056,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1069,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1082,y:477,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1056,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1069,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1082,y:490,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1056,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1069,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1082,y:503,width:11,height:11,rx:1,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1074.5,y:543,fill:C.orange,"font-size":20,"font-weight":600,"text-anchor":"middle"},"C");
    p.el('text',{x:957,y:504,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},"×");
    p.el('text',{x:1031,y:504,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},"+");
    p.el("rect",{x:618,y:606,width:510,height:68,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:873,y:648,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},["Register · 레지스터","Registers"]);
    p.el("rect",{x:618,y:705,width:510,height:176,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:642,y:740,fill:C.muted,"font-size":20,"font-weight":600,"text-anchor":"start"},["온칩 저장 공간","On-chip storage"]);
    p.el("rect",{x:640,y:761,width:205,height:80,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:742.5,y:809,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["L1 캐시","L1 cache"]);
    p.el("rect",{x:861,y:761,width:245,height:80,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:983.5,y:809,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Shared memory");
    p.el('text',{x:873,y:916,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["연산 장치와 가까운 곳에","Data is stored close"]);
    p.el('text',{x:873,y:947,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["데이터를 보관합니다.","to the compute units."]);
    return [p];
  },
} satisfies FigureSpec;
