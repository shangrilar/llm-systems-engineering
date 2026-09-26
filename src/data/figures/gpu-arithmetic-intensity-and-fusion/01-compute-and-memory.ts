import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-arithmetic-intensity-and-fusion",figureId:"01-compute-and-memory",number:"01-compute-and-memory",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["무엇이 처리 속도를 제한할까요?","What Limits Processing Speed?"],
  subtitle:["메모리의 데이터 공급과 연산 장치의 계산을 함께 봅니다.","Consider both data supply from memory and work in the compute units."],
  alt:["같은 GPU에서 메모리 데이터 공급이 제한인 경우와 계산 처리량이 제한인 경우를 비교한다. 위쪽은 입력이 부족해 연산 장치 일부가 기다리고, 아래쪽은 입력당 계산량이 많아 계산이 한계이다. 작은 칸은 데이터와 연산 활동을 나타내며 코어 수나 실제 이용률을 나타내지 않는다. 아래쪽이 위쪽보다 같은 계산을 더 빨리 실행한다는 비교가 아니라 서로 다른 작업의 병목 비교다.","Compare data-supply and compute-throughput bottlenecks on the same GPU. Above, limited inputs leave some compute units waiting. Below, more computation per input makes compute throughput the limit. Small boxes represent data and compute activity, not core counts or measured utilization. These are different workloads with different bottlenecks, not a speed comparison of the same computation."],
  caption:["서로 다른 작업의 병목을 비교한 개념도입니다. 작은 칸은 코어 수나 실제 이용률을 나타내지 않습니다.","A conceptual comparison of bottlenecks in different workloads; small cells do not represent core counts or actual utilization."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,801,1104,[48,206]);
    p.el("rect",{x:48,y:215,width:1104,height:344,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:261,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["데이터를 공급하는 속도가 병목일 때","When Data Supply Is the Bottleneck"]);
    p.el("rect",{x:76,y:313,width:170,height:127,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:161,y:384.5,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"HBM");
    p.el("path",{d:"M268,330 H501 M268,425 H501",fill:"none",stroke:C.line,"stroke-width":2});
    p.el("rect",{x:280,y:364,width:23,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:310,y:364,width:23,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("path",{d:"M468,377 L514,377",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:536,y:303,width:370,height:151,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:721,y:337,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},["연산 장치","Compute units"]);
    p.el("rect",{x:560,y:366,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:601,y:366,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:642,y:366,width:31,height:40,rx:4,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:683,y:366,width:31,height:40,rx:4,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:724,y:366,width:31,height:40,rx:4,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:765,y:366,width:31,height:40,rx:4,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:806,y:366,width:31,height:40,rx:4,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:847,y:366,width:31,height:40,rx:4,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("path",{d:"M919,377 L960,377",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:979,y:333,width:145,height:91,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1051.5,y:386.5,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["결과","Results"]);
    p.el('text',{x:381,y:483,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["필요한 입력 전달","Supply required inputs"]);
    p.el('text',{x:721,y:483,fill:C.muted,"font-size":(locale==='ko'?22:21),"font-weight":400,"text-anchor":"middle"},["입력이 부족해 계산이 뜸함","Limited inputs leave compute idle"]);
    p.el('text',{x:600,y:530,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["연산 능력이 남아도, 데이터 공급이 계산의 진행을 제한합니다.","Data supply limits progress even when compute capacity remains."]);
    p.el("rect",{x:48,y:596,width:1104,height:344,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:642,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["계산을 처리하는 속도가 병목일 때","When Compute Throughput Is the Bottleneck"]);
    p.el("rect",{x:76,y:694,width:170,height:127,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:161,y:765.5,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"HBM");
    p.el("path",{d:"M268,711 H501 M268,806 H501",fill:"none",stroke:C.line,"stroke-width":2});
    p.el("rect",{x:280,y:745,width:23,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:310,y:745,width:23,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:340,y:745,width:23,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:370,y:745,width:23,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:400,y:745,width:23,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:430,y:745,width:23,height:27,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("path",{d:"M468,758 L514,758",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:536,y:684,width:370,height:151,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:721,y:718,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},["연산 장치","Compute units"]);
    p.el("rect",{x:560,y:747,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:601,y:747,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:642,y:747,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:683,y:747,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:724,y:747,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:765,y:747,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:806,y:747,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:847,y:747,width:31,height:40,rx:4,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("path",{d:"M919,758 L960,758",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:979,y:714,width:145,height:91,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1051.5,y:767.5,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["결과","Results"]);
    p.el('text',{x:381,y:864,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["필요한 입력 전달","Supply required inputs"]);
    p.el('text',{x:721,y:864,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["입력당 필요한 계산이 많음","More computation per input"]);
    p.el('text',{x:600,y:911,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["데이터 공급이 충분해도, 계산을 끝내는 데 시간이 걸립니다.","Even with enough data, completing the computation takes time."]);
    p.el('text',{x:600,y:991,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["같은 GPU에서도 계산량과 데이터 이동량에 따라 병목이 달라집니다.","On the same GPU, computation and data movement determine the bottleneck."]);
    return [p];
  },
} satisfies FigureSpec;
