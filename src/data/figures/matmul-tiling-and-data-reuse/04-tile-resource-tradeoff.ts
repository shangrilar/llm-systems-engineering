import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"matmul-tiling-and-data-reuse",figureId:"04-tile-resource-tradeoff",number:"04-tile-resource-tradeoff",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["타일을 크게 잡으면 항상 유리할까요?","Are larger tiles always better?"],
  subtitle:["데이터 재사용의 이점과 공유 메모리·레지스터 사용량을 함께 봅니다.","Consider both data reuse and shared memory and register usage."],
  alt:["작은 출력 타일은 입력 하나를 재사용하는 출력 수가 적고 큰 타일은 더 많다. 블록 타일의 확대는 공유 메모리의 입력 저장량을 늘릴 수 있고 스레드 타일의 확대는 레지스터의 입력과 부분합 저장량을 늘릴 수 있다. SM의 자원이 유한하므로 블록당 사용량이 커지면 동시에 상주 가능한 블록과 워프가 줄 수 있다. 네 개와 두 개의 블록 그림은 개념적인 자원 점유 비교이며 특정 타일 크기에 따른 실제 상주 수를 계산한 것이 아니다. 공유 메모리와 레지스터는 각각 별도의 자원 제한이다. 상주량이 높다고 항상 빠른 것도 아니며 타일 선택에는 행렬 모양과 작업량도 영향을 준다.","A small output tile uses an input for fewer outputs; a large tile uses it for more. Larger block tiles can increase shared memory input storage, and larger thread tiles can increase register storage for inputs and partial sums. Limited SM resources mean more resources per block may reduce resident blocks and warps. Four versus two blocks is a conceptual resource comparison, not a calculated residency for particular tile sizes. Shared memory and registers have separate resource limits. Higher residency is not always faster; matrix shape and workload also affect tile choice."],
  caption:["블록 그림은 개념적인 자원 점유 비교이며, 특정 타일 크기에서의 실제 상주 수가 아닙니다.","The block drawings compare resource occupancy conceptually; they are not actual residency counts for a specific tile size."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,918,1104,[48,206]);
    p.el('text',{x:600,y:219,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["재사용을 늘리려면, 더 많은 입력과 부분합을 가까이 보관해야 합니다.","More reuse requires keeping more inputs and partial sums nearby."]);
    p.el("rect",{x:48,y:254,width:536,height:791,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:303,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},["작은 타일","Small tile"]);
    p.el("rect",{x:266,y:336,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:316,y:336,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:266,y:386,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:316,y:386,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:316,y:578,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["입력 하나를 쓰는 출력이 적음","Fewer outputs per input"]);
    p.el('text',{x:316,y:624,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["보관할 입력·부분합이 적음","Fewer inputs and partial sums to keep"]);
    p.el("path",{d:"M316,649 L316,687",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:76,y:710,width:480,height:223,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:753,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["SM의 한정된 자원","Limited resources per SM"]);
    p.el('text',{x:316,y:790,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["공유 메모리 · 레지스터","Shared memory · Registers"]);
    p.el("rect",{x:95,y:819,width:101,height:76,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:145.5,y:865,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["블록","Block"]);
    p.el("rect",{x:206,y:819,width:101,height:76,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:256.5,y:865,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["블록","Block"]);
    p.el("rect",{x:317,y:819,width:101,height:76,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:367.5,y:865,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["블록","Block"]);
    p.el("rect",{x:428,y:819,width:101,height:76,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:478.5,y:865,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["블록","Block"]);
    p.el('text',{x:316,y:980,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["블록당 자원 사용이 작아","Fewer resources per block"]);
    p.el('text',{x:316,y:1015,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["여러 블록이 상주할 여지가 있음","leave room for more resident blocks"]);
    p.el("rect",{x:616,y:254,width:536,height:791,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:303,fill:C.ink,"font-size":29,"font-weight":700,"text-anchor":"middle"},["큰 타일","Large tile"]);
    p.el("rect",{x:784,y:336,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:834,y:336,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:884,y:336,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:934,y:336,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:784,y:386,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:834,y:386,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:884,y:386,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:934,y:386,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:784,y:436,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:834,y:436,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:884,y:436,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:934,y:436,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:784,y:486,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:834,y:486,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:884,y:486,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:934,y:486,width:47,height:47,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:884,y:578,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["입력 하나를 더 많은 출력에 사용","More outputs per input"]);
    p.el('text',{x:884,y:624,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["보관할 입력·부분합이 많음","More inputs and partial sums to keep"]);
    p.el("path",{d:"M884,649 L884,687",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:644,y:710,width:480,height:223,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:753,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["SM의 한정된 자원","Limited resources per SM"]);
    p.el('text',{x:884,y:790,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["공유 메모리 · 레지스터","Shared memory · Registers"]);
    p.el("rect",{x:663,y:819,width:212,height:76,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:769,y:865,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["블록","Block"]);
    p.el("rect",{x:885,y:819,width:212,height:76,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:991,y:865,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["블록","Block"]);
    p.el('text',{x:884,y:980,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["블록당 자원 사용이 커져","More resources per block"]);
    p.el('text',{x:884,y:1015,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["상주할 블록·워프가 줄 수 있음","may reduce resident blocks and warps"]);
    p.el('text',{x:600,y:1107,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["입력 재사용과 동시에 실행할 작업의 양을 함께 고려합니다.","Balance input reuse with the amount of concurrent work."]);
    return [p];
  },
} satisfies FigureSpec;
