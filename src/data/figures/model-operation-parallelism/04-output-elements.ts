import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-operation-parallelism",figureId:"04-output-elements",number:"04-output-elements",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["결과 요소는 독립적이지만, 만드는 과정은 다릅니다","Independent Output Elements, Different Computations"],
  subtitle:["연산마다 출력 하나에 필요한 입력의 범위와 연산량이 다릅니다.","Each operation needs a different range of inputs and amount of work per output."],
  alt:["원소별 덧셈, 행별 합계 reduction, 행렬 곱을 세 열로 비교한다. 각 연산의 결과 두 개는 독립적으로 계산할 수 있다. 첫 번째 결과를 확대해 원소별 덧셈은 1+10=11, 행별 합계는 1부터 8까지의 합 36, 행렬 곱은 1×1+2×0+3×2=7로 나타낸다. 행렬 곱의 X 행과 W 열은 같은 K 위치의 값을 맞춰 보기 위해 가로로 나열한다. 출력 하나에 필요한 입력 범위와 계산량이 다르며, reduction은 행별로 여러 결과가 있는 경우이다.","Three columns compare element-wise addition, row-sum reduction, and matrix multiplication. Each shows two independently computed results. Expanding the first gives 1+10=11, the sum of 1 through 8 equal to 36, and 1×1+2×0+3×2=7. The row of X and column of W are displayed horizontally to align their K positions. Input range and work per output differ. Reduction here produces one result per row."],
  caption:["출력 하나에 필요한 입력의 범위와 연산량은 연산마다 다릅니다.","The range of inputs and the amount of work behind one output differ by operation."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,965,1104,[48,206]);
    p.el("rect",{x:48,y:211,width:352,height:838,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:224,y:259,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"middle"},["원소별 덧셈","Element-wise addition"]);
    p.el('text',{x:224,y:299,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["두 결과는 독립적으로 계산","Compute both independently"]);
    p.el('text',{x:136,y:339,fill:C.blue,"font-size":20,"font-weight":600,"text-anchor":"middle"},["결과 1","Result 1"]);
    p.el("rect",{x:91,y:359,width:90,height:61,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:136,y:397.5,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"11");
    p.el('text',{x:310,y:339,fill:C.muted,"font-size":20,"font-weight":600,"text-anchor":"middle"},["결과 2","Result 2"]);
    p.el("rect",{x:265,y:359,width:90,height:61,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:310,y:397.5,fill:C.muted,"font-size":29,"font-weight":600,"text-anchor":"middle"},"22");
    p.el("path",{d:"M136,425 V449 H224 V477",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue),"stroke-dasharray":"7 7"});
    p.el('text',{x:224,y:518,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"middle"},["결과 1을 만드는 과정","Computing result 1"]);
    p.el('text',{x:224,y:558,fill:C.muted,"font-size":(locale==='ko'?20:18),"font-weight":400,"text-anchor":"middle"},["같은 위치의 입력 두 요소","Two inputs at matching positions"]);
    p.el("rect",{x:86,y:591,width:98,height:61,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:135,y:629.5,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:224,y:632,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"+");
    p.el("rect",{x:264,y:591,width:98,height:61,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:313,y:629.5,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},"10");
    p.el('text',{x:224,y:751,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"1 + 10");
    p.el("path",{d:"M224,790 L224,822",fill:"none",stroke:C.blue,"stroke-width":2.5,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:164,y:838,width:120,height:60,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:224,y:876,fill:C.blue,"font-size":30,"font-weight":600,"text-anchor":"middle"},"11");
    p.el("path",{d:"M72,929 H376",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:224,y:977,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["이 예시는 출력 하나에","In this example, each output"]);
    p.el('text',{x:224,y:1011,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["덧셈 한 번이 필요합니다.","requires one addition."]);
    p.el("rect",{x:424,y:211,width:352,height:838,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:259,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"middle"},["행별 합계 · Reduction","Row-sum reduction"]);
    p.el('text',{x:600,y:299,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["두 결과는 독립적으로 계산","Compute both independently"]);
    p.el('text',{x:512,y:339,fill:C.teal,"font-size":20,"font-weight":600,"text-anchor":"middle"},["결과 1","Result 1"]);
    p.el("rect",{x:467,y:359,width:90,height:61,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:512,y:397.5,fill:C.teal,"font-size":29,"font-weight":600,"text-anchor":"middle"},"36");
    p.el('text',{x:686,y:339,fill:C.muted,"font-size":20,"font-weight":600,"text-anchor":"middle"},["결과 2","Result 2"]);
    p.el("rect",{x:641,y:359,width:90,height:61,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:686,y:397.5,fill:C.muted,"font-size":29,"font-weight":600,"text-anchor":"middle"},"12");
    p.el("path",{d:"M512,425 V449 H600 V477",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal),"stroke-dasharray":"7 7"});
    p.el('text',{x:600,y:518,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["결과 1을 만드는 과정","Computing result 1"]);
    p.el('text',{x:600,y:558,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["각 행의 모든 입력 요소","All input elements in a row"]);
    p.el("rect",{x:455,y:606,width:32,height:39,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:471,y:633.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:491,y:606,width:32,height:39,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:507,y:633.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:527,y:606,width:32,height:39,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:543,y:633.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:563,y:606,width:32,height:39,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:579,y:633.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"4");
    p.el("rect",{x:599,y:606,width:32,height:39,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:615,y:633.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"5");
    p.el("rect",{x:635,y:606,width:32,height:39,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:651,y:633.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"6");
    p.el("rect",{x:671,y:606,width:32,height:39,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:687,y:633.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"7");
    p.el("rect",{x:707,y:606,width:32,height:39,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:723,y:633.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"8");
    p.el('text',{x:600,y:751,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 + 2 + ⋯ + 8");
    p.el("path",{d:"M600,790 L600,822",fill:"none",stroke:C.teal,"stroke-width":2.5,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:540,y:838,width:120,height:60,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:876,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"36");
    p.el("path",{d:"M448,929 H752",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:600,y:977,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["한 행의 여러 값을","Add the values in one row"]);
    p.el('text',{x:600,y:1011,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["더해 출력 하나를 만듭니다.","to produce one output."]);
    p.el("rect",{x:800,y:211,width:352,height:838,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:976,y:259,fill:C.orange,"font-size":27,"font-weight":700,"text-anchor":"middle"},["행렬 곱","Matrix multiplication"]);
    p.el('text',{x:976,y:299,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["두 결과는 독립적으로 계산","Compute both independently"]);
    p.el('text',{x:888,y:339,fill:C.orange,"font-size":20,"font-weight":600,"text-anchor":"middle"},["결과 1","Result 1"]);
    p.el("rect",{x:843,y:359,width:90,height:61,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:888,y:397.5,fill:C.orange,"font-size":29,"font-weight":600,"text-anchor":"middle"},"7");
    p.el('text',{x:1062,y:339,fill:C.muted,"font-size":20,"font-weight":600,"text-anchor":"middle"},["결과 2","Result 2"]);
    p.el("rect",{x:1017,y:359,width:90,height:61,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1062,y:397.5,fill:C.muted,"font-size":29,"font-weight":600,"text-anchor":"middle"},"4");
    p.el("path",{d:"M888,425 V449 H976 V477",fill:"none",stroke:C.orange,"stroke-width":2,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el('text',{x:976,y:518,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},["결과 1을 만드는 과정","Computing result 1"]);
    p.el('text',{x:976,y:558,fill:C.muted,"font-size":(locale==='ko'?20:17),"font-weight":400,"text-anchor":"middle"},["한 행과 한 열의 입력 요소","Inputs from one row and one column"]);
    p.el('text',{x:824,y:610,fill:C.orange,"font-size":(locale==='ko'?20:18),"font-weight":600,"text-anchor":"start"},["X의 행","Row of X"]);
    p.el("rect",{x:929,y:581,width:55,height:39,rx:5,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:956.5,y:608.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:988,y:581,width:55,height:39,rx:5,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1015.5,y:608.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:1047,y:581,width:55,height:39,rx:5,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1074.5,y:608.5,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"3");
    p.el('text',{x:824,y:675,fill:C.orange,"font-size":(locale==='ko'?20:18),"font-weight":600,"text-anchor":"start"},["W의 열","Col. of W"]);
    p.el("rect",{x:929,y:646,width:55,height:39,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:956.5,y:673.5,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:988,y:646,width:55,height:39,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1015.5,y:673.5,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:1047,y:646,width:55,height:39,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1074.5,y:673.5,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},"2");
    p.el('text',{x:976,y:732,fill:C.orange,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1 × 1 + 2 × 0 + 3 × 2");
    p.el('text',{x:976,y:774,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"= 1 + 0 + 6");
    p.el("path",{d:"M976,790 L976,822",fill:"none",stroke:C.orange,"stroke-width":2.5,"marker-end":markerUrl(C.orange)});
    p.el("rect",{x:916,y:838,width:120,height:60,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:976,y:876,fill:C.orange,"font-size":30,"font-weight":600,"text-anchor":"middle"},"7");
    p.el("path",{d:"M824,929 H1128",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:976,y:977,fill:C.ink,"font-size":(locale==='ko'?22:21),"font-weight":400,"text-anchor":"middle"},["K개의 곱을 구하고","Compute and sum K products"]);
    p.el('text',{x:976,y:1011,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"middle"},["더해 출력 하나를 만듭니다.","to produce one output."]);
    p.el('text',{x:600,y:1108,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"middle"},["독립적인 결과 요소의 개수와","Consider both the number of independent outputs"]);
    p.el('text',{x:600,y:1154,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"middle"},["결과 하나를 만드는 데 필요한 계산을 함께 살펴봅니다.","and the computation needed to produce each one."]);
    return [p];
  },
} satisfies FigureSpec;
