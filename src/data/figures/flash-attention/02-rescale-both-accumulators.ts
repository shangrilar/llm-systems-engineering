import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"flash-attention",figureId:"02-rescale-both-accumulators",number:"02-rescale-both-accumulators",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["지수합과 가중합을 함께 갱신하기","Updating Both Sums Together"],
  subtitle:["최댓값이 커지면, 기존 지수합뿐 아니라 기존 Value 가중합도 같은 배율로 보정합니다.","When the maximum rises, rescale both the exponential sum and Value weighted sum."],
  alt:["점수 묶음 1,2 다음 0,1 다음 3,2에 대응하는 Value를 연결한다. 최댓값이 유지되면 지수합과 가중합에 새 기여를 더한다. 최댓값이 2에서 3으로 증가하면 이전 지수합과 가중합 모두에 exp(-1)을 곱한 뒤 새 타일의 기여를 더한다. 최종 지수합 약2.056, 가중합 약0.959,3.153이며 출력은 약0.466,1.534다.","Pair score chunks 1,2 then 0,1 then 3,2 with their Values. With the same maximum, add new contributions to both sums. When the maximum rises from 2 to 3, multiply both previous sums by exp(-1) before adding the new contributions. Final exponential sum is about 2.056, weighted sum about 0.959,3.153, and output about 0.466,1.534."],
  caption:["최댓값이 커지면 같은 보정 배율을 지수합 ℓ과 가중합 a에 함께 곱한 뒤 새 기여를 더합니다.","When the maximum grows, the same correction factor scales both ℓ and a before the new contributions are added."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1534,1104,[48,206]);
    p.el("rect",{x:48,y:207,width:1104,height:204,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:253,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["시작 · 첫 점수 묶음 [1, 2]와 대응하는 Value를 처리합니다.","Start · Process the first scores [1, 2] and their Values."]);
    p.el('text',{x:76,y:305,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"start"},"V = [2, 0], [0, 2]");
    p.el("rect",{x:76,y:331,width:341.3333333333333,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:246.66666666666666,y:371,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"m = 2");
    p.el("rect",{x:425.3333333333333,y:331,width:341.3333333333333,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:596,y:371,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"ℓ ≈ 1.368");
    p.el("rect",{x:774.6666666666666,y:331,width:341.3333333333333,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:945.3333333333333,y:371,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"a ≈ [0.736, 2]");
    p.el("rect",{x:48,y:447,width:1104,height:444,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:494,fill:C.purple,"font-size":29,"font-weight":700,"text-anchor":"start"},["① 최댓값 유지 · 보정 배율 1","① Same maximum · Scale factor 1"]);
    p.el('text',{x:76,y:541,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"start"},["새 점수 [0, 1]    대응하는 V: [1, 1], [2, 0]","New scores [0, 1]    Corresponding V: [1, 1], [2, 0]"]);
    p.el('text',{x:76,y:586,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"start"},["m: 2 → 2     보정 배율 α = exp(2 − 2) ≈ 1","m: 2 → 2     Scale factor α = exp(2 − 2) ≈ 1"]);
    p.el('text',{x:360,y:633,fill:C.orange,"font-size":(locale==='ko'?23:21),"font-weight":600,"text-anchor":"middle"},["이전 누적값 × α","Previous accumulator × α"]);
    p.el('text',{x:770,y:633,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["새 타일의 기여","New tile contribution"]);
    p.el('text',{x:100,y:688,fill:C.teal,"font-size":(locale==='ko'?25:23),"font-weight":700,"text-anchor":"start"},["지수합 ℓ","Exp sum ℓ"]);
    p.el("rect",{x:241,y:652,width:295,height:57,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:388.5,y:688.5,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1.368");
    p.el('text',{x:568,y:691,fill:C.muted,"font-size":31,"font-weight":400,"text-anchor":"middle"},"+");
    p.el("rect",{x:601,y:652,width:295,height:57,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:748.5,y:688.5,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"0.503");
    p.el('text',{x:925,y:691,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"start"},"= 1.871");
    p.el('text',{x:100,y:769,fill:C.teal,"font-size":(locale==='ko'?25:23),"font-weight":700,"text-anchor":"start"},["가중합 a","Weighted a"]);
    p.el("rect",{x:241,y:733,width:295,height:57,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:388.5,y:769.5,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[0.736, 2]");
    p.el('text',{x:568,y:772,fill:C.muted,"font-size":31,"font-weight":400,"text-anchor":"middle"},"+");
    p.el("rect",{x:601,y:733,width:295,height:57,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:748.5,y:769.5,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[0.871, 0.135]");
    p.el('text',{x:926,y:769,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"start"},["벡터끼리 더함","Add vectors"]);
    p.el('text',{x:600,y:851,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"middle"},["갱신 후: m = 2    ℓ ≈ 1.871    a ≈ [1.607, 2.135]","Updated: m = 2    ℓ ≈ 1.871    a ≈ [1.607, 2.135]"]);
    p.el("rect",{x:48,y:927,width:1104,height:444,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:974,fill:C.purple,"font-size":29,"font-weight":700,"text-anchor":"start"},["② 최댓값 증가 · 두 누적값을 함께 보정","② Higher maximum · Rescale both accumulators"]);
    p.el('text',{x:76,y:1021,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"start"},["새 점수 [3, 2]    대응하는 V: [0, 2], [1, 1]","New scores [3, 2]    Corresponding V: [0, 2], [1, 1]"]);
    p.el('text',{x:76,y:1066,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"start"},["m: 2 → 3     보정 배율 α = exp(2 − 3) ≈ 0.368","m: 2 → 3     Scale factor α = exp(2 − 3) ≈ 0.368"]);
    p.el('text',{x:360,y:1113,fill:C.orange,"font-size":(locale==='ko'?23:21),"font-weight":600,"text-anchor":"middle"},["이전 누적값 × α","Previous accumulator × α"]);
    p.el('text',{x:770,y:1113,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["새 타일의 기여","New tile contribution"]);
    p.el('text',{x:100,y:1168,fill:C.teal,"font-size":(locale==='ko'?25:23),"font-weight":700,"text-anchor":"start"},["지수합 ℓ","Exp sum ℓ"]);
    p.el("rect",{x:241,y:1132,width:295,height:57,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:388.5,y:1168.5,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"0.688");
    p.el('text',{x:568,y:1171,fill:C.muted,"font-size":31,"font-weight":400,"text-anchor":"middle"},"+");
    p.el("rect",{x:601,y:1132,width:295,height:57,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:748.5,y:1168.5,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1.368");
    p.el('text',{x:925,y:1171,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"start"},"= 2.056");
    p.el('text',{x:100,y:1249,fill:C.teal,"font-size":(locale==='ko'?25:23),"font-weight":700,"text-anchor":"start"},["가중합 a","Weighted a"]);
    p.el("rect",{x:241,y:1213,width:295,height:57,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:388.5,y:1249.5,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[0.591, 0.786]");
    p.el('text',{x:568,y:1252,fill:C.muted,"font-size":31,"font-weight":400,"text-anchor":"middle"},"+");
    p.el("rect",{x:601,y:1213,width:295,height:57,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:748.5,y:1249.5,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},"[0.368, 2.368]");
    p.el('text',{x:926,y:1249,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"start"},["벡터끼리 더함","Add vectors"]);
    p.el('text',{x:600,y:1331,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"middle"},["갱신 후: m = 3    ℓ ≈ 2.056    a ≈ [0.959, 3.153]","Updated: m = 3    ℓ ≈ 2.056    a ≈ [0.959, 3.153]"]);
    p.el("rect",{x:48,y:1410,width:1104,height:210,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:600,y:1458,fill:C.teal,"font-size":28,"font-weight":700,"text-anchor":"middle"},["같은 기준의 지수합과 가중합을 함께 유지합니다.","Keep both sums using the same reference."]);
    p.el('text',{x:600,y:1510,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["새 ℓ = 이전 ℓ × α + Σ exp(새 점수 − 새 m)","New ℓ = previous ℓ × α + Σ exp(new score − new m)"]);
    p.el('text',{x:600,y:1559,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["새 a = 이전 a × α + Σ exp(새 점수 − 새 m) × V","New a = previous a × α + Σ exp(new score − new m) × V"]);
    p.el('text',{x:600,y:1600,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},["α = exp(이전 m − 새 m)","α = exp(previous m − new m)"]);
    p.el('text',{x:600,y:1676,fill:C.teal,"font-size":28,"font-weight":700,"text-anchor":"middle"},["모든 묶음 처리 후: 출력 = a ÷ ℓ ≈ [0.466, 1.534]","After all chunks: output = a ÷ ℓ ≈ [0.466, 1.534]"]);
    p.el('text',{x:600,y:1725,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["a는 벡터 · 보정 배율은 a의 모든 원소에 동일하게 적용 · 표시 수치는 반올림","a is a vector · The same factor scales every element of a · Displayed values are rounded"]);
    return [p];
  },
} satisfies FigureSpec;
