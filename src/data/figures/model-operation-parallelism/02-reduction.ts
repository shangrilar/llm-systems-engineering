import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-operation-parallelism",figureId:"02-reduction",number:"02-reduction",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["Reduction: 나누어 계산하고 결과 모으기","Reduction: Compute Parts and Combine Results"],
  subtitle:["합 계산도 병렬화할 수 있지만, 다음 단계에는 앞선 결과가 필요합니다.","Summation can be parallelized, but later stages need earlier results."],
  alt:["두 행의 합을 별개의 트리로 보여준다. 첫 행은 1부터 8까지 더해 부분합 3,7,11,15에서 10,26을 거쳐 36이 된다. 두 번째 행은 2,1을 네 번 반복해 3,3,3,3에서 6,6을 거쳐 12가 된다. 같은 단계의 덧셈과 서로 다른 행은 독립적이며 다음 단계는 이전 부분합에 의존한다.","Two separate trees compute row sums. The first adds 1 through 8, forming 3,7,11,15, then 10,26, and finally 36. The second adds four repetitions of 2,1, forming 3,3,3,3, then 6,6, and finally 12. Additions at the same stage and sums of different rows are independent; later stages depend on earlier partial sums."],
  caption:["같은 단계의 덧셈과 서로 다른 행의 합은 독립적이지만, 다음 단계는 앞선 부분합이 필요합니다.","Additions within a stage and sums of different rows are independent, but each later stage needs the earlier partial sums."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,717,1104,[48,206]);
    p.el("rect",{x:48,y:216,width:536,height:589,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:260,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"middle"},["첫 번째 행","First row"]);
    p.el("rect",{x:85,y:292,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:110,y:324,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:144,y:292,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:169,y:324,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:203,y:292,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:228,y:324,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:262,y:292,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:287,y:324,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"4");
    p.el("rect",{x:321,y:292,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:346,y:324,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"5");
    p.el("rect",{x:380,y:292,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:405,y:324,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"6");
    p.el("rect",{x:439,y:292,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:464,y:324,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"7");
    p.el("rect",{x:498,y:292,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:523,y:324,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"8");
    p.el("path",{d:"M110,343 L139.5,403",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M169,343 L139.5,403",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:139.5,y:382,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("path",{d:"M228,343 L257.5,403",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M287,343 L257.5,403",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:257.5,y:382,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("path",{d:"M346,343 L375.5,403",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M405,343 L375.5,403",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:375.5,y:382,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("path",{d:"M464,343 L493.5,403",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M523,343 L493.5,403",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:493.5,y:382,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:114.5,y:412,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:139.5,y:444,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:232.5,y:412,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:257.5,y:444,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"7");
    p.el("rect",{x:350.5,y:412,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:375.5,y:444,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"11");
    p.el("rect",{x:468.5,y:412,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:493.5,y:444,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"15");
    p.el("path",{d:"M139.5,463 L198.5,523",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M257.5,463 L198.5,523",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:198.5,y:502,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("path",{d:"M375.5,463 L434.5,523",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M493.5,463 L434.5,523",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:434.5,y:502,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:173.5,y:532,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:198.5,y:564,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"10");
    p.el("rect",{x:409.5,y:532,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:434.5,y:564,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"26");
    p.el("path",{d:"M198.5,583 L316.5,643",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M434.5,583 L316.5,643",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:316.5,y:622,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:291.5,y:652,width:50,height:48,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316.5,y:684,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"36");
    p.el('text',{x:316,y:759,fill:C.blue,"font-size":(locale==='ko'?23:22),"font-weight":600,"text-anchor":"middle"},["같은 단계의 덧셈은 독립적","Additions within a stage are independent"]);
    p.el("rect",{x:616,y:216,width:536,height:589,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:260,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"middle"},["두 번째 행","Second row"]);
    p.el("rect",{x:653,y:292,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:678,y:324,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:712,y:292,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:737,y:324,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:771,y:292,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:796,y:324,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:830,y:292,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:855,y:324,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:889,y:292,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:914,y:324,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:948,y:292,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:973,y:324,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:1007,y:292,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1032,y:324,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:1066,y:292,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1091,y:324,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("path",{d:"M678,343 L707.5,403",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M737,343 L707.5,403",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:707.5,y:382,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("path",{d:"M796,343 L825.5,403",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M855,343 L825.5,403",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:825.5,y:382,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("path",{d:"M914,343 L943.5,403",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M973,343 L943.5,403",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:943.5,y:382,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("path",{d:"M1032,343 L1061.5,403",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M1091,343 L1061.5,403",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:1061.5,y:382,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:682.5,y:412,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:707.5,y:444,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:800.5,y:412,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:825.5,y:444,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:918.5,y:412,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:943.5,y:444,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:1036.5,y:412,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1061.5,y:444,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("path",{d:"M707.5,463 L766.5,523",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M825.5,463 L766.5,523",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:766.5,y:502,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("path",{d:"M943.5,463 L1002.5,523",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M1061.5,463 L1002.5,523",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:1002.5,y:502,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:741.5,y:532,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:766.5,y:564,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"6");
    p.el("rect",{x:977.5,y:532,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1002.5,y:564,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"6");
    p.el("path",{d:"M766.5,583 L884.5,643",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M1002.5,583 L884.5,643",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:884.5,y:622,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:859.5,y:652,width:50,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884.5,y:684,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"12");
    p.el('text',{x:884,y:759,fill:C.teal,"font-size":(locale==='ko'?23:22),"font-weight":600,"text-anchor":"middle"},["같은 단계의 덧셈은 독립적","Additions within a stage are independent"]);
    p.el('text',{x:600,y:861,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["한 행 안에서는 부분합을 만들고, 그 결과를 다시 모읍니다.","Within a row, compute partial sums and then combine them."]);
    p.el('text',{x:600,y:907,fill:C.muted,"font-size":25,"font-weight":400,"text-anchor":"middle"},["서로 다른 행의 합은 독립적으로 구할 수 있습니다.","Sums of different rows can be computed independently."]);
    return [p];
  },
} satisfies FigureSpec;
