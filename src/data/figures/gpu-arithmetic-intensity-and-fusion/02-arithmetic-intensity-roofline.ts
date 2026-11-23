import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-arithmetic-intensity-and-fusion",figureId:"02-arithmetic-intensity-roofline",number:"02-arithmetic-intensity-roofline",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["산술 강도는 메모리와 연산의 한계를 연결합니다","Arithmetic Intensity Connects Memory and Compute Limits"],
  subtitle:["HBM과 주고받는 데이터에 비해 얼마나 많은 계산을 수행하는지 봅니다.","Compare the amount of computation with the data read from and written to HBM."],
  alt:["왼쪽의 계산 A는 HBM 읽기와 쓰기 총64byte에128FLOP, 산술 강도2이고 B는64byte에512FLOP, 산술 강도8이다. 오른쪽은 설명용 대역폭8GB/s, 계산 상한32GFLOPS의 선형 축 Roofline이다. 산술 강도4에서 두 상한이 만난다. A에서 처리량 상한16GFLOPS, B에서32GFLOPS다. 회색 점은 상한 아래에 있을 수 있는 실제 성능의 개념적 위치이며 실측 결과가 아니다. 수치는 특정 GPU 사양이 아니며 같은 연산 경로와 자료형을 가정한 단순 모델이다.","On the left, computation A performs 128 FLOP for 64 total HBM bytes read and written, giving intensity 2; B performs 512 FLOP for 64 bytes, giving intensity 8. The right uses linear axes with illustrative bandwidth 8 GB/s and compute ceiling 32 GFLOPS. The ceilings meet at intensity 4 FLOP/byte. A has ceiling 16 GFLOPS and B has ceiling 32 GFLOPS. The gray point illustrates a possible performance position below the ceiling and is not a measurement. These are not specifications for a particular GPU; the model assumes the same compute path and data type."],
  caption:["수치는 특정 GPU 사양이 아닌 설명용 값입니다. 회색 점은 실측 결과가 아닙니다.","Values are illustrative, not a specific GPU’s specifications. Gray dots are not measurements."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,720,1104,[48,206]);
    p.el("rect",{x:48,y:213,width:420,height:565,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:74,y:255,fill:C.ink,"font-size":(locale==='ko'?27:24),"font-weight":700,"text-anchor":"start"},["1. 이동량 대비 계산량","1. Computation per Byte Moved"]);
    p.el("rect",{x:72,y:284,width:372,height:183,rx:12,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:94,y:322,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},["계산 A","Computation A"]);
    p.el('text',{x:94,y:366,fill:C.ink,"font-size":(locale==='ko'?24:23),"font-weight":400,"text-anchor":"start"},["HBM 이동 64 byte","64 bytes moved to/from HBM"]);
    p.el('text',{x:94,y:403,fill:C.ink,"font-size":(locale==='ko'?24:21),"font-weight":400,"text-anchor":"start"},["필요한 계산 128 FLOP","128 FLOP of required computation"]);
    p.el('text',{x:94,y:442,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"start"},"128 ÷ 64 = 2 FLOP/byte");
    p.el("rect",{x:72,y:493,width:372,height:183,rx:12,fill:C.paper,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:94,y:531,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},["계산 B","Computation B"]);
    p.el('text',{x:94,y:575,fill:C.ink,"font-size":(locale==='ko'?24:23),"font-weight":400,"text-anchor":"start"},["HBM 이동 64 byte","64 bytes moved to/from HBM"]);
    p.el('text',{x:94,y:612,fill:C.ink,"font-size":(locale==='ko'?24:21),"font-weight":400,"text-anchor":"start"},["필요한 계산 512 FLOP","512 FLOP of required computation"]);
    p.el('text',{x:94,y:651,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"start"},"512 ÷ 64 = 8 FLOP/byte");
    p.el('text',{x:258,y:724,fill:C.ink,"font-size":(locale==='ko'?23:21),"font-weight":700,"text-anchor":"middle"},["산술 강도 = 연산량 ÷ 이동량","Intensity = Operations ÷ Bytes moved"]);
    p.el('text',{x:258,y:758,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["이동량에는 읽기와 쓰기를 모두 포함","Count both reads and writes"]);
    p.el('text',{x:506,y:255,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["2. Roofline: 처리량의 상한","2. Roofline: Throughput Ceiling"]);
    p.el('text',{x:582,y:294,fill:C.muted,"font-size":(locale==='ko'?21:20),"font-weight":400,"text-anchor":"start"},["연산 처리량 (GFLOPS)","Compute throughput (GFLOPS)"]);
    p.el("path",{d:"M592,642 H1100",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:577,y:649,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"end"},"0");
    p.el("path",{d:"M592,514 H1100",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:577,y:521,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"end"},"16");
    p.el("path",{d:"M592,386 H1100",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:577,y:393,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"end"},"32");
    p.el("path",{d:"M592,642 L592,318",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M592,642 L1125,642",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M592,642 v7",fill:"none",stroke:C.muted,"stroke-width":2});
    p.el('text',{x:592,y:675,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("path",{d:"M712,642 v7",fill:"none",stroke:C.muted,"stroke-width":2});
    p.el('text',{x:712,y:675,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"2");
    p.el("path",{d:"M832,642 v7",fill:"none",stroke:C.muted,"stroke-width":2});
    p.el('text',{x:832,y:675,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"4");
    p.el("path",{d:"M1072,642 v7",fill:"none",stroke:C.muted,"stroke-width":2});
    p.el('text',{x:1072,y:675,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},"8");
    p.el("path",{d:"M592,642 L832,386",fill:"none",stroke:C.blue,"stroke-width":5});
    p.el("path",{d:"M832,386 H1100",fill:"none",stroke:C.orange,"stroke-width":5});
    p.el("path",{d:"M832,386 V642",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:968,y:355,fill:C.orange,"font-size":22,"font-weight":600,"text-anchor":"middle"},["GPU 연산 처리량 상한","GPU compute ceiling"]);
    p.el('text',{x:609,y:416,fill:C.blue,"font-size":(locale==='ko'?21:18),"font-weight":600,"text-anchor":"start"},["대역폭 × 산술 강도","Bandwidth × intensity"]);
    p.el("path",{d:"M703,434 L739,477",fill:"none",stroke:C.blue,"stroke-width":2});
    p.el("circle",{cx:712,cy:514,r:7,fill:C.blue,stroke:"white","stroke-width":2});
    p.el('text',{x:728,y:539,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"start"},["A: 상한 16","A: ceiling 16"]);
    p.el("circle",{cx:1072,cy:386,r:7,fill:C.orange,stroke:"white","stroke-width":2});
    p.el('text',{x:1072,y:431,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["B: 상한 32","B: ceiling 32"]);
    p.el("circle",{cx:952,cy:534,r:7,fill:C.muted,stroke:"white","stroke-width":2});
    p.el('text',{x:970,y:560,fill:C.muted,"font-size":(locale==='ko'?20:16),"font-weight":400,"text-anchor":"start"},["성능 위치 예시","Example performance point"]);
    p.el('text',{x:928,y:595,fill:C.muted,"font-size":(locale==='ko'?18:16),"font-weight":400,"text-anchor":"middle"},["실제 성능은 상한 아래에 놓일 수 있음","Actual performance may fall below the ceiling"]);
    p.el('text',{x:851,y:717,fill:C.ink,"font-size":23,"font-weight":600,"text-anchor":"middle"},["산술 강도 (FLOP/byte)","Arithmetic intensity (FLOP/byte)"]);
    p.el('text',{x:704,y:761,fill:C.blue,"font-size":(locale==='ko'?20:19),"font-weight":600,"text-anchor":"middle"},["대역폭이 정하는 상한","Bandwidth-limited ceiling"]);
    p.el('text',{x:978,y:761,fill:C.orange,"font-size":(locale==='ko'?20:19),"font-weight":600,"text-anchor":"middle"},["연산 능력이 정하는 상한","Compute-limited ceiling"]);
    p.el("rect",{x:48,y:816,width:1104,height:102,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:857,fill:C.blue,"font-size":(locale==='ko'?27:25),"font-weight":700,"text-anchor":"middle"},["처리량 상한 = min(연산 처리량 상한, 대역폭 × 산술 강도)","Throughput ceiling = min(Compute ceiling, Bandwidth × Arithmetic intensity)"]);
    p.el('text',{x:600,y:897,fill:C.blue,"font-size":22,"font-weight":400,"text-anchor":"middle"},["단위 시간에 데이터를 공급하는 양 × 데이터당 계산량","Data supplied per unit time × Computation per byte"]);
    return [p];
  },
} satisfies FigureSpec;
