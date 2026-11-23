import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"matmul-tiling-and-data-reuse",figureId:"05-pipelined-tiles",number:"05-pipelined-tiles",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 5","Figure 5"],
  title:["계산하는 동안 다음 입력을 준비합니다","Prepare the next inputs while computing"],
  subtitle:["현재 계산에 사용하는 입력과 다음 입력을 서로 다른 공간에 보관합니다.","Keep the current and next inputs in separate storage areas."],
  alt:["각 출력 하나는 여덟 곱의 합이다. 두 곱씩 묶어 계산 1부터 계산 4로 이름 붙인다. 입력 1은 계산 1에 필요한 A와 B의 값들이며 입력 2부터 4도 각각 대응하는 계산에 필요한 값들이다. 시간선의 각 계산은 블록이 맡은 모든 출력에서 해당 두 곱을 처리한다. 현재까지 더한 부분합은 계속 유지한다. 버퍼는 데이터를 잠시 보관할 공간이라는 설명을 시간선보다 먼저 배치한다. 순차 진행 바로 위에는 버퍼 0 한 개를 보여주고, 동시 진행 바로 위에는 버퍼 0과 버퍼 1 두 개를 보여준다. 순차 진행은 같은 버퍼를 채우고 계산한 뒤 다시 채운다. 동시 진행은 두 버퍼를 교대로 사용한다. 입력1은 버퍼0, 입력2는 버퍼1, 입력3은 버퍼0, 입력4는 버퍼1에 들어간다. 이동은 두 단위, 계산은 세 단위인 개념적 시간선이다. 각 계산은 자기 입력이 준비된 뒤 시작한다. 계산1이 끝난 뒤 버퍼0을 입력3으로 채우고 계산2가 끝난 뒤 버퍼1을 입력4로 채운다. 동일한 네 단계의 이동과 계산을 순차 실행 및 동시 진행으로 비교하며 총 이동량과 계산량은 같다. 실제 시간이나 성능 측정이 아니다. 각 보관 공간에는 A와 B의 값들이 함께 들어가며 출력 부분합의 저장 공간이 아니다.","Each output sums eight products. Pairs are labeled Compute 1 through Compute 4, and Input 1 through Input 4 hold the corresponding A and B values. Each timeline computation processes that pair of products for every output owned by the block. Partial sums persist. A buffer is temporary storage, introduced before the timelines. One Buffer 0 appears above sequential execution; Buffer 0 and Buffer 1 appear above overlapped execution. Sequential execution fills, computes, then refills the same buffer. Overlapped execution alternates buffers: Inputs 1 and 3 use Buffer 0; Inputs 2 and 4 use Buffer 1. Transfers take two conceptual units and computations three. Each computation starts after its inputs are ready. Buffer 0 is refilled with Input 3 after Compute 1 finishes, and Buffer 1 with Input 4 after Compute 2 finishes. Both timelines have the same four transfers and computations, with equal total work and traffic. These are not measured times or performance. Each buffer holds A and B inputs, not output partial sums."],
  caption:["각 계산은 블록이 맡은 모든 출력에서 두 곱씩 처리하며, 지금까지 더한 부분합은 계속 유지합니다.","Each computation step processes two products for every output of the block, keeping the partial sums accumulated so far."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1455,1104,[48,206]);
    p.el('text',{x:48,y:218,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["각 출력에 필요한 여덟 곱을, 두 개씩 나누어 계산해봅니다.","Split each output's eight products into groups of two."]);
    p.el('text',{x:76,y:284,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"start"},["출력 하나 =","One output ="]);
    p.el("rect",{x:249,y:249,width:193,height:62,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:345.5,y:288,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["곱 1 + 곱 2","Product 1 + 2"]);
    p.el('text',{x:456,y:289,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"+");
    p.el('text',{x:345,y:351,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},["계산 1","Compute 1"]);
    p.el("rect",{x:471,y:249,width:193,height:62,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:567.5,y:288,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["곱 3 + 곱 4","Product 3 + 4"]);
    p.el('text',{x:678,y:289,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"+");
    p.el('text',{x:567,y:351,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},["계산 2","Compute 2"]);
    p.el("rect",{x:693,y:249,width:193,height:62,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:789.5,y:288,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["곱 5 + 곱 6","Product 5 + 6"]);
    p.el('text',{x:900,y:289,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"+");
    p.el('text',{x:789,y:351,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},["계산 3","Compute 3"]);
    p.el("rect",{x:915,y:249,width:193,height:62,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1011.5,y:288,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["곱 7 + 곱 8","Product 7 + 8"]);
    p.el('text',{x:1011,y:351,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},["계산 4","Compute 4"]);
    p.el('text',{x:600,y:395,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["입력 1은 계산 1에 필요한 A와 B의 값들입니다. 입력 2–4도 같은 방식입니다.","Input 1 holds A and B values for Compute 1. Inputs 2–4 follow the same pattern."]);
    p.el('text',{x:48,y:454,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["입력을 잠시 보관할 공간(버퍼)을 공유 메모리에 마련합니다.","Reserve temporary input storage (a buffer) in shared memory."]);
    p.el("rect",{x:48,y:482,width:270,height:74,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:183,y:527,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["버퍼 0","Buffer 0"]);
    p.el('text',{x:358,y:510,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["순차 진행에서는 버퍼 한 개를 사용합니다.","Sequential execution uses one buffer."]);
    p.el('text',{x:358,y:549,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["입력을 채우고 계산한 뒤, 같은 버퍼를 다시 채웁니다.","Fill it, compute, then refill the same buffer."]);
    p.el("rect",{x:48,y:607,width:1104,height:269,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:652,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["순차 진행 · 입력을 가져온 뒤 계산","Sequential · Load inputs, then compute"]);
    p.el('text',{x:76,y:708,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"start"},["버퍼 0에 채움","Fill Buffer 0"]);
    p.el('text',{x:76,y:781,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"start"},["계산","Compute"]);
    p.el("rect",{x:270,y:676,width:76,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:308,y:710,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["입력 1","Input 1"]);
    p.el("rect",{x:350,y:749,width:116,height:52,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:408,y:783,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["계산 1","Compute 1"]);
    p.el("path",{d:"M346,732 L346,744",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:470,y:676,width:76,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:508,y:710,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["입력 2","Input 2"]);
    p.el("rect",{x:550,y:749,width:116,height:52,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:608,y:783,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["계산 2","Compute 2"]);
    p.el("path",{d:"M546,732 L546,744",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:670,y:676,width:76,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:708,y:710,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["입력 3","Input 3"]);
    p.el("rect",{x:750,y:749,width:116,height:52,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:808,y:783,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["계산 3","Compute 3"]);
    p.el("path",{d:"M746,732 L746,744",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:870,y:676,width:76,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:908,y:710,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["입력 4","Input 4"]);
    p.el("rect",{x:950,y:749,width:116,height:52,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1008,y:783,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["계산 4","Compute 4"]);
    p.el("path",{d:"M946,732 L946,744",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M1070,668 V816",fill:"none",stroke:C.muted,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:1070,y:849,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},["완료","Done"]);
    p.el('text',{x:48,y:932,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["동시 진행에서는 버퍼 두 개를 번갈아 사용합니다.","Overlapped execution alternates between two buffers."]);
    p.el("rect",{x:48,y:958,width:270,height:74,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:183,y:1003,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["버퍼 0","Buffer 0"]);
    p.el("rect",{x:358,y:958,width:270,height:74,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:493,y:1003,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},["버퍼 1","Buffer 1"]);
    p.el("rect",{x:48,y:1100,width:1104,height:375,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:1147,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["동시 진행 · 계산하는 동안 다음 입력을 가져옴","Overlapped · Load the next inputs while computing"]);
    p.el('text',{x:76,y:1205,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"start"},["버퍼 0에 채움","Fill Buffer 0"]);
    p.el('text',{x:76,y:1286,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"start"},["버퍼 1에 채움","Fill Buffer 1"]);
    p.el('text',{x:76,y:1367,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"start"},["계산","Compute"]);
    p.el("rect",{x:270,y:1173,width:76,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:308,y:1207,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["입력 1","Input 1"]);
    p.el("rect",{x:470,y:1173,width:76,height:52,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:508,y:1207,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},["입력 3","Input 3"]);
    p.el("rect",{x:350,y:1254,width:76,height:52,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:388,y:1288,fill:C.purple,"font-size":21,"font-weight":600,"text-anchor":"middle"},["입력 2","Input 2"]);
    p.el("rect",{x:590,y:1254,width:76,height:52,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:628,y:1288,fill:C.purple,"font-size":21,"font-weight":600,"text-anchor":"middle"},["입력 4","Input 4"]);
    p.el("rect",{x:350,y:1335,width:116,height:52,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:408,y:1369,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["계산 1","Compute 1"]);
    p.el("rect",{x:470,y:1335,width:116,height:52,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:528,y:1369,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["계산 2","Compute 2"]);
    p.el("rect",{x:590,y:1335,width:116,height:52,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:648,y:1369,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["계산 3","Compute 3"]);
    p.el("rect",{x:710,y:1335,width:116,height:52,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:768,y:1369,fill:C.orange,"font-size":21,"font-weight":600,"text-anchor":"middle"},["계산 4","Compute 4"]);
    p.el("path",{d:"M830,1170 V1399",fill:"none",stroke:C.muted,"stroke-width":2,"stroke-dasharray":"7 7"});
    p.el('text',{x:830,y:1444,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},["완료","Done"]);
    p.el("path",{d:"M270,1505 L1110,1505",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1110,y:1539,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간","Time"]);
    p.el('text',{x:600,y:1600,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["계산 중인 입력을 유지하면서, 다른 버퍼에 다음 입력을 준비합니다.","Keep current inputs in use while preparing the next inputs in the other buffer."]);
    p.el('text',{x:600,y:1645,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["입력이 준비되면 계산을 시작하고, 사용이 끝난 버퍼를 다시 채웁니다.","Start when inputs are ready; refill a buffer only after its inputs are no longer in use."]);
    return [p];
  },
} satisfies FigureSpec;
