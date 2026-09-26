import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"flash-attention",figureId:"01-value-before-normalization",number:"01-value-before-normalization",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["Value 가중합을 먼저 계산하기","Computing the Value Weighted Sum First"],
  subtitle:["Attention의 공통 분모를 마지막으로 옮기면, 누적할 대상이 보입니다.","Move attention’s shared denominator to the end to reveal what we can accumulate."],
  alt:["점수 1,2와 Value 벡터 2,0 및 0,2의 예시. 확률을 먼저 구해 Value를 가중합하거나, exp 값으로 Value를 가중합한 다음 지수합으로 나누면 같은 출력 약 0.538,1.462를 얻는다. 정규화 전 가중합 a는 약 0.736,2이다. 표시 수치는 반올림했다.","Example with scores 1,2 and Value vectors 2,0 and 0,2. Computing probabilities before the Value weighted sum or weighting Values with exponentials and then dividing by the exponential sum yields the same output, about 0.538,1.462. The unnormalized weighted sum a is about 0.736,2. Displayed values are rounded."],
  caption:["정규화 전 가중합 a를 지수합 ℓ로 나누면, 확률로 먼저 가중합한 결과와 같습니다.","Dividing the unnormalized weighted sum a by the exponential sum ℓ gives the same result as weighting by probabilities first."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1082,1104,[48,206]);
    p.el("rect",{x:48,y:206,width:1104,height:145,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:249,fill:C.ink,"font-size":(locale==='ko'?27:25),"font-weight":700,"text-anchor":"start"},["한 쿼리의 점수 [1, 2] · 최댓값 m = 2","One query: scores [1, 2] · maximum m = 2"]);
    p.el('text',{x:76,y:303,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"start"},["exp 값 ≈ [0.368, 1]    지수합 ℓ ≈ 1.368","Exponentials ≈ [0.368, 1]    sum ℓ ≈ 1.368"]);
    p.el('text',{x:770,y:249,fill:C.teal,"font-size":(locale==='ko'?23:22),"font-weight":600,"text-anchor":"start"},["대응하는 Value 벡터","Corresponding Value vectors"]);
    p.el("rect",{x:760,y:268,width:172,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:846,y:308,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"[2, 0]");
    p.el("rect",{x:940,y:268,width:172,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1026,y:308,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"[0, 2]");
    p.el("rect",{x:48,y:386,width:536,height:672,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:433,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},["먼저 확률을 구하기","Compute probabilities first"]);
    p.el('text',{x:76,y:491,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["① exp 값","① Exponentials"]);
    p.el("rect",{x:94,y:512,width:217,height:64,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:202.5,y:552,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0.368");
    p.el("rect",{x:319,y:512,width:217,height:64,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:427.5,y:552,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("path",{d:"M316,590 L316,643",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:336,y:623,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"start"},["각각 ÷ ℓ","Each ÷ ℓ"]);
    p.el('text',{x:76,y:681,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["② 확률","② Probabilities"]);
    p.el("rect",{x:94,y:702,width:217,height:64,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:202.5,y:742,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0.269");
    p.el("rect",{x:319,y:702,width:217,height:64,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:427.5,y:742,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0.731");
    p.el("path",{d:"M316,779 L316,833",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:336,y:812,fill:C.blue,"font-size":(locale==='ko'?21:19),"font-weight":400,"text-anchor":"start"},["V와 곱해 더하기","Multiply by V, sum"]);
    p.el('text',{x:76,y:873,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["③ 최종 출력 벡터","③ Final output vector"]);
    p.el("rect",{x:94,y:894,width:442,height:73,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:315,y:938.5,fill:C.teal,"font-size":31,"font-weight":600,"text-anchor":"middle"},"[0.538, 1.462]");
    p.el('text',{x:316,y:1019,fill:C.blue,"font-size":23,"font-weight":500,"text-anchor":"middle"},"0.269 × [2, 0] + 0.731 × [0, 2]");
    p.el("rect",{x:616,y:386,width:536,height:672,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:433,fill:C.teal,"font-size":28,"font-weight":700,"text-anchor":"middle"},["마지막에 한 번 나누기","Divide once at the end"]);
    p.el('text',{x:644,y:491,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["① exp 값","① Exponentials"]);
    p.el("rect",{x:662,y:512,width:217,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:770.5,y:552,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0.368");
    p.el("rect",{x:887,y:512,width:217,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:995.5,y:552,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("path",{d:"M884,590 L884,643",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:904,y:623,fill:C.teal,"font-size":(locale==='ko'?21:19),"font-weight":400,"text-anchor":"start"},["V와 곱해 더하기","Multiply by V, sum"]);
    p.el('text',{x:644,y:681,fill:C.muted,"font-size":(locale==='ko'?23:22),"font-weight":400,"text-anchor":"start"},["② 정규화 전 가중합 a","② Unnormalized weighted sum a"]);
    p.el("rect",{x:662,y:702,width:442,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:883,y:742,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"[0.736, 2]");
    p.el("path",{d:"M884,779 L884,833",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:904,y:812,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"start"},["a 전체를 ÷ ℓ","All of a ÷ ℓ"]);
    p.el('text',{x:644,y:873,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["③ 최종 출력 벡터","③ Final output vector"]);
    p.el("rect",{x:662,y:894,width:442,height:73,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:883,y:938.5,fill:C.teal,"font-size":31,"font-weight":600,"text-anchor":"middle"},"[0.538, 1.462]");
    p.el('text',{x:884,y:1019,fill:C.teal,"font-size":23,"font-weight":500,"text-anchor":"middle"},"(0.368 × [2, 0] + 1 × [0, 2]) ÷ ℓ");
    p.el("rect",{x:48,y:1093,width:1104,height:142,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:600,y:1142,fill:C.teal,"font-size":28,"font-weight":700,"text-anchor":"middle"},["출력 = Σ ((exp 값 ÷ ℓ) × V) = (Σ exp 값 × V) ÷ ℓ","Output = Σ ((exp value ÷ ℓ) × V) = (Σ exp value × V) ÷ ℓ"]);
    p.el('text',{x:600,y:1192,fill:C.teal,"font-size":25,"font-weight":400,"text-anchor":"middle"},["같은 지수합으로 나누므로, 가중합을 구한 뒤 마지막에 나눌 수 있습니다.","A shared denominator lets us compute the weighted sum before dividing."]);
    p.el('text',{x:600,y:1273,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["exp 값은 exp(점수 − m) · 소수는 정확한 계산 후 반올림","exp value = exp(score − m) · Decimals rounded after full-precision calculation"]);
    return [p];
  },
} satisfies FigureSpec;
