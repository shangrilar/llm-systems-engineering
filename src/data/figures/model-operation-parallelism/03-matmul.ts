import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-operation-parallelism",figureId:"03-matmul",number:"03-matmul",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["행렬 곱: 독립적인 출력, 출력 안의 누적","Matrix Multiplication: Independent Outputs, Accumulation Within"],
  subtitle:["M·N은 출력의 모양이고, K는 곱을 더해 나가는 축의 길이입니다.","M and N define the output shape; K is the length of the axis along which products are summed."],
  alt:["2행 3열 X와 3행 4열 W를 곱해 2행 4열 Y를 만든다. Y는 첫 행 7,4,7,6 및 둘째 행 16,13,16,15이다. 첫 출력 7을 1×1+2×0+3×2로 확대해 곱과 reduction을 보여준다. 같은 X 행과 W 열을 여러 출력에서 재사용할 수 있다.","X, a 2-by-3 matrix, times W, a 3-by-4 matrix, produces Y, a 2-by-4 matrix. The rows of Y are 7,4,7,6 and 16,13,16,15. The first output is expanded as 1×1+2×0+3×2=7, showing multiplication and reduction. Multiple outputs can reuse a row of X or a column of W."],
  caption:["출력 요소 8개는 독립적으로 계산할 수 있고, 각 출력 안에서는 K축을 따라 곱을 더합니다.","The eight output elements can be computed independently; within each output, products are summed along K."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,859,1104,[48,206]);
    p.el('text',{x:600,y:219,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},"X (M × K) × W (K × N) = Y (M × N)");
    p.el('text',{x:85,y:272,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"X · 2 × 3");
    p.el('text',{x:398,y:272,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"W · 3 × 4");
    p.el('text',{x:806,y:272,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},"Y · 2 × 4");
    p.el("rect",{x:85,y:304,width:58,height:58,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:114,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:147,y:304,width:58,height:58,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:176,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:209,y:304,width:58,height:58,rx:5,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:238,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:85,y:366,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:114,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"4");
    p.el("rect",{x:147,y:366,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:176,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"5");
    p.el("rect",{x:209,y:366,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:238,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"6");
    p.el('text',{x:314,y:379,fill:C.muted,"font-size":34,"font-weight":600,"text-anchor":"middle"},"×");
    p.el("rect",{x:398,y:304,width:58,height:58,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:427,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:460,y:304,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:489,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:522,y:304,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:551,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:584,y:304,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:613,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:398,y:366,width:58,height:58,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:427,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:460,y:366,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:489,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:522,y:366,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:551,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:584,y:366,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:613,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:398,y:428,width:58,height:58,rx:5,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:427,y:465,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:460,y:428,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:489,y:465,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:522,y:428,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:551,y:465,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:584,y:428,width:58,height:58,rx:5,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:613,y:465,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:720,y:379,fill:C.muted,"font-size":34,"font-weight":600,"text-anchor":"middle"},"=");
    p.el("rect",{x:806,y:304,width:58,height:58,rx:5,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:835,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"7");
    p.el("rect",{x:868,y:304,width:58,height:58,rx:5,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:897,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"4");
    p.el("rect",{x:930,y:304,width:58,height:58,rx:5,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:959,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"7");
    p.el("rect",{x:992,y:304,width:58,height:58,rx:5,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1021,y:341,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"6");
    p.el("rect",{x:806,y:366,width:58,height:58,rx:5,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:835,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"16");
    p.el("rect",{x:868,y:366,width:58,height:58,rx:5,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:897,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"13");
    p.el("rect",{x:930,y:366,width:58,height:58,rx:5,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:959,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"16");
    p.el("rect",{x:992,y:366,width:58,height:58,rx:5,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1021,y:403,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},"15");
    p.el('text',{x:930,y:471,fill:C.orange,"font-size":22,"font-weight":600,"text-anchor":"middle"},["8개 출력은 서로 독립적","8 independent outputs"]);
    p.el("path",{d:"M800,333 H767 V515 H600 V548",fill:"none",stroke:C.orange,"stroke-width":2,"marker-end":markerUrl(C.orange),"stroke-dasharray":"7 7"});
    p.el("rect",{x:48,y:560,width:1104,height:278,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:78,y:605,fill:C.orange,"font-size":26,"font-weight":700,"text-anchor":"start"},["출력 한 칸 확대: Y의 첫 번째 원소","One output, expanded: the first element of Y"]);
    p.el("rect",{x:140,y:633,width:192,height:58,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:236,y:670,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 × 1");
    p.el("path",{d:"M236,699 L236,727",fill:"none",stroke:C.orange,"stroke-width":2,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:236,y:760,fill:C.orange,"font-size":28,"font-weight":700,"text-anchor":"middle"},"1");
    p.el("rect",{x:504,y:633,width:192,height:58,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:670,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2 × 0");
    p.el("path",{d:"M600,699 L600,727",fill:"none",stroke:C.orange,"stroke-width":2,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:600,y:760,fill:C.orange,"font-size":28,"font-weight":700,"text-anchor":"middle"},"0");
    p.el("rect",{x:868,y:633,width:192,height:58,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:964,y:670,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3 × 2");
    p.el("path",{d:"M964,699 L964,727",fill:"none",stroke:C.orange,"stroke-width":2,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:964,y:760,fill:C.orange,"font-size":28,"font-weight":700,"text-anchor":"middle"},"6");
    p.el('text',{x:600,y:810,fill:C.orange,"font-size":28,"font-weight":700,"text-anchor":"middle"},"1 + 0 + 6 = 7");
    p.el('text',{x:600,y:892,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["K 방향의 곱들을 더해 출력 하나를 만듭니다.","Sum the products along K to produce one output."]);
    p.el("rect",{x:48,y:926,width:1104,height:131,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:78,y:969,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},["같은 입력을 여러 출력에서 사용","Multiple outputs use the same inputs"]);
    p.el('text',{x:78,y:1013,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"start"},["X의 같은 행 → Y의 같은 행     ·     W의 같은 열 → Y의 같은 열","Same row of X → same row of Y     ·     Same column of W → same column of Y"]);
    return [p];
  },
} satisfies FigureSpec;
