import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"multi-gpu-execution",figureId:"03-communication-and-waiting",number:"03-communication-and-waiting",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["GPU가 늘어도 속도가 비례하지는 않습니다","More GPUs do not guarantee proportional speedup"],
  subtitle:["한 GPU의 시간 축을 여러 GPU의 실행과 통신·대기로 확장합니다.","Extend one GPU’s timeline to include multiple GPUs, communication, and waiting."],
  alt:["같은 작업을 한 GPU에서는 100ms에 처리한다. 균등 분할은 GPU별 계산 50ms 후 통신과 취합 10ms로 60ms에 완료한다. 불균형 분할은 GPU 0이 30ms 계산 후 40ms 기다리고 GPU 1이 70ms 계산한 뒤, 10ms 통신과 취합으로 80ms에 완료한다. 시간 축은 같으며 대기 40ms를 전체에 다시 더하지 않는다. 설명용이며 계산과 통신은 겹치지 않는다.","The same workload takes 100 ms on one GPU. Balanced: 50 ms compute per GPU and 10 ms communication/combine finish at 60 ms. Uneven: GPU 0 computes for 30 and waits 40 ms while GPU 1 computes for 70, then 10 ms communication/combine finishes at 80 ms. The 40 ms wait is not added again. Illustrative, with no compute/communication overlap."],
  caption:["설명용 수치이며, 이 예시에서 계산과 통신은 겹치지 않는다고 가정합니다.","Values are illustrative; this example assumes computation and communication do not overlap."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,988,1104,[48,206]);
    p.el("rect",{x:48,y:198,width:22,height:22,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:82,y:216,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"start"},["연산","Compute"]);
    p.el("rect",{x:239,y:198,width:22,height:22,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:273,y:216,fill:C.purple,"font-size":21,"font-weight":400,"text-anchor":"start"},["통신·취합","Transfer / combine"]);
    p.el("rect",{x:555,y:198,width:22,height:22,rx:3,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:589,y:216,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["대기","Wait"]);
    p.el('text',{x:1152,y:216,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"end"},["동일한 작업 · 단위: ms","Same workload · Unit: ms"]);
    p.el('text',{x:281,y:264,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"0");
    p.el("path",{d:"M281,320 V385 M281,477 V627 M281,778 V928",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:421,y:264,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"20");
    p.el("path",{d:"M421,320 V385 M421,477 V627 M421,778 V928",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:561,y:264,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"40");
    p.el("path",{d:"M561,320 V385 M561,477 V627 M561,778 V928",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:701,y:264,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"60");
    p.el("path",{d:"M701,320 V385 M701,477 V627 M701,778 V928",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:841,y:264,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"80");
    p.el("path",{d:"M841,320 V385 M841,477 V627 M841,778 V928",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:981,y:264,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},"100");
    p.el("path",{d:"M981,320 V385 M981,477 V627 M981,778 V928",fill:"none",stroke:C.line,"stroke-width":2,"stroke-dasharray":"7 6"});
    p.el('text',{x:48,y:311,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["한 GPU","One GPU"]);
    p.el('text',{x:48,y:363,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:281,y:331,width:700,height:48,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:631,y:363,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["전체 계산 100","Full computation: 100"]);
    p.el('text',{x:1010,y:363,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"100 ms");
    p.el('text',{x:48,y:463,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["고른 분할","Balanced split"]);
    p.el('text',{x:48,y:520,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:281,y:488,width:350,height:48,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:456,y:520,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["계산 50","Compute: 50"]);
    p.el("rect",{x:631,y:488,width:70,height:48,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:666,y:520,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},"10");
    p.el('text',{x:48,y:600,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:281,y:568,width:350,height:48,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:456,y:600,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["계산 50","Compute: 50"]);
    p.el("rect",{x:631,y:568,width:70,height:48,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:666,y:600,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},"10");
    p.el("path",{d:"M666,541 L666,561",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el('text',{x:725,y:601,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"60 ms");
    p.el('text',{x:281,y:659,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["50 ms 계산 + 10 ms 통신·취합 = 60 ms","50 ms compute + 10 ms transfer / combine = 60 ms"]);
    p.el('text',{x:48,y:765,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["불균형한 분할","Uneven split"]);
    p.el('text',{x:48,y:821,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},"GPU 0");
    p.el("rect",{x:281,y:789,width:210,height:48,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:386,y:821,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["계산 30","Compute: 30"]);
    p.el("rect",{x:491,y:789,width:280,height:48,rx:12,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:631,y:821,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},["대기 40","Wait: 40"]);
    p.el("rect",{x:771,y:789,width:70,height:48,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:806,y:821,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},"10");
    p.el('text',{x:48,y:901,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},"GPU 1");
    p.el("rect",{x:281,y:869,width:490,height:48,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:526,y:901,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["계산 70","Compute: 70"]);
    p.el("rect",{x:771,y:869,width:70,height:48,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:806,y:901,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},"10");
    p.el("path",{d:"M806,842 L806,862",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el('text',{x:865,y:901,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"80 ms");
    p.el('text',{x:281,y:959,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["늦게 끝나는 계산 70 ms + 통신·취합 10 ms = 80 ms","70 ms for the slower computation + 10 ms transfer / combine = 80 ms"]);
    p.el("rect",{x:48,y:1049,width:1104,height:137,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1095,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"middle"},["계산을 줄여도, 통신과 기다리는 시간이 추가될 수 있습니다.","Less computation per GPU can come with communication and waiting."]);
    p.el('text',{x:600,y:1137,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["전체 완료 시간은 GPU별 시간을 더한 값이 아니라 실행 경로로 결정됩니다.","Elapsed time follows the execution path; it is not the sum of GPU times."]);
    return [p];
  },
} satisfies FigureSpec;
