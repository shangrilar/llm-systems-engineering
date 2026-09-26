import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"matmul-tiling-and-data-reuse",figureId:"01-shared-inputs",number:"01-shared-inputs",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["출력은 독립적이지만, 입력은 겹칩니다","Independent outputs, overlapping inputs"],
  subtitle:["여러 출력이 같은 입력을 사용한다는 점에서 행렬 곱의 재사용이 시작됩니다.","Reuse in matrix multiplication starts with outputs that need the same inputs."],
  alt:["A 4×8과 B 8×4를 곱해 C 4×4를 만든다. c00과 c01은 A의 0행을 공유하고 c00과 c10은 B의 0열을 공유한다. 각 출력은 길이 8인 두 벡터의 내적이다. 도형의 칸은 행렬 요소이며 스레드가 아니다. 출력은 독립적이지만 입력이 겹치므로 함께 계산할 때 데이터를 재사용할 수 있다.","A (4 × 8) times B (8 × 4) produces C (4 × 4). c00 and c01 share row 0 of A; c00 and c10 share column 0 of B. Each output is a dot product of two vectors of length 8. Cells are matrix elements, not threads. Independent outputs have overlapping inputs that can be reused when computing them together."],
  caption:["도형의 칸은 행렬 요소이며 스레드가 아닙니다.","Cells are matrix elements, not threads."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,783,1104,[48,206]);
    p.el('text',{x:600,y:217,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},"C = A × B     ·     A: 4 × 8     B: 8 × 4     C: 4 × 4");
    p.el('text',{x:240,y:278,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},["입력 A","Input A"]);
    p.el('text',{x:615,y:278,fill:C.purple,"font-size":28,"font-weight":700,"text-anchor":"middle"},["입력 B","Input B"]);
    p.el('text',{x:988,y:278,fill:C.teal,"font-size":28,"font-weight":700,"text-anchor":"middle"},["출력 C","Output C"]);
    p.el("rect",{x:96,y:347,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:132,y:347,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:168,y:347,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:204,y:347,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:240,y:347,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:276,y:347,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:312,y:347,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:348,y:347,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:96,y:383,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:132,y:383,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:168,y:383,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:204,y:383,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:240,y:383,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:276,y:383,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:312,y:383,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:348,y:383,width:33,height:33,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:96,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:132,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:168,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:204,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:240,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:276,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:312,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:348,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:96,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:132,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:168,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:204,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:240,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:276,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:312,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:348,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:435,y:425,fill:C.muted,"font-size":40,"font-weight":400,"text-anchor":"middle"},"×");
    p.el("rect",{x:544,y:311,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:580,y:311,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:616,y:311,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:652,y:311,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:544,y:347,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:580,y:347,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:616,y:347,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:652,y:347,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:544,y:383,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:580,y:383,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:616,y:383,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:652,y:383,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:544,y:419,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:580,y:419,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:616,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:652,y:419,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:544,y:455,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:580,y:455,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:616,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:652,y:455,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:544,y:491,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:580,y:491,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:616,y:491,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:652,y:491,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:544,y:527,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:580,y:527,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:616,y:527,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:652,y:527,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:544,y:563,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:580,y:563,width:33,height:33,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:616,y:563,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:652,y:563,width:33,height:33,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:783,y:425,fill:C.muted,"font-size":40,"font-weight":400,"text-anchor":"middle"},"=");
    p.el("rect",{x:876,y:329,width:53,height:53,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:902.5,y:363,fill:C.teal,"font-size":18,"font-weight":600,"text-anchor":"middle"},"c00");
    p.el("rect",{x:932,y:329,width:53,height:53,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:958.5,y:363,fill:C.teal,"font-size":18,"font-weight":600,"text-anchor":"middle"},"c01");
    p.el("rect",{x:988,y:329,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:1044,y:329,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:876,y:385,width:53,height:53,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:902.5,y:419,fill:C.teal,"font-size":18,"font-weight":600,"text-anchor":"middle"},"c10");
    p.el("rect",{x:932,y:385,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:988,y:385,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:1044,y:385,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:876,y:441,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:932,y:441,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:988,y:441,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:1044,y:441,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:876,y:497,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:932,y:497,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:988,y:497,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:1044,y:497,width:53,height:53,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:240,y:531,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["같은 행이 여러 출력에 쓰임","One row, multiple outputs"]);
    p.el('text',{x:615,y:631,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},["같은 열이 여러 출력에 쓰임","One column, multiple outputs"]);
    p.el('text',{x:988,y:599,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},["출력끼리는 독립적으로 계산","Independent outputs"]);
    p.el("rect",{x:48,y:676,width:536,height:235,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:76,y:723,fill:C.blue,"font-size":26,"font-weight":700,"text-anchor":"start"},["같은 출력 행을 계산할 때","Computing the same output row"]);
    p.el('text',{x:76,y:773,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"start"},["c00 = A의 0행 · B의 0열","c00 = A row 0 · B column 0"]);
    p.el('text',{x:76,y:815,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"start"},["c01 = A의 0행 · B의 1열","c01 = A row 0 · B column 1"]);
    p.el('text',{x:316,y:878,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},["A의 같은 행을 다시 사용","Reuse the same row of A"]);
    p.el("rect",{x:616,y:676,width:536,height:235,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:644,y:723,fill:C.purple,"font-size":26,"font-weight":700,"text-anchor":"start"},["같은 출력 열을 계산할 때","Computing the same output column"]);
    p.el('text',{x:644,y:773,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"start"},["c00 = A의 0행 · B의 0열","c00 = A row 0 · B column 0"]);
    p.el('text',{x:644,y:815,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"start"},["c10 = A의 1행 · B의 0열","c10 = A row 1 · B column 0"]);
    p.el('text',{x:884,y:878,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"middle"},["B의 같은 열을 다시 사용","Reuse the same column of B"]);
    p.el('text',{x:600,y:973,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"middle"},["출력을 묶어 계산하면, 함께 필요한 입력을 재사용할 수 있습니다.","Compute outputs together to reuse their common inputs."]);
    return [p];
  },
} satisfies FigureSpec;
