import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"online-softmax",figureId:"01-stable-softmax",number:"01-stable-softmax",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["최댓값을 빼서 안정적으로 계산하기","Subtracting the Maximum for Stable Computation"],
  subtitle:["소프트맥스 복습: 점수에 exp 적용 → 모두 더하기 → 각 값을 합으로 나누기","Softmax recap: Apply exp → Sum all values → Divide each value by the sum"],
  alt:["점수 1000,1001,1002의 소프트맥스를 비교한다. 직접 exp를 계산하면 FP32와 FP64 범위를 넘어서 유효한 확률을 계산할 수 없다. 모든 점수에서 최댓값 1002를 빼면 -2,-1,0이고 exp 값은 약 0.135,0.368,1이다. 합 약 1.503으로 나누면 약 9.0%,24.5%,66.5%이다. 분자와 분모에 같은 양수 exp(-max)를 곱하므로 실수 연산에서 확률은 동일하다. 부동소수점의 비트 단위 동일성을 뜻하지 않는다. 유한한 점수 예시이며 반올림한 수치다.","Compare softmax for scores 1000,1001,1002. Direct exponentiation exceeds the FP32 and FP64 ranges and cannot yield valid probabilities. Subtracting the maximum 1002 gives -2,-1,0, whose exponentials are about 0.135,0.368,1. Dividing by their sum, about 1.503, gives about 9.0%,24.5%,66.5%. Scaling the numerator and denominator by the same positive factor exp(-max) preserves the probabilities in real arithmetic. This does not mean bitwise identical floating-point results. The example uses finite scores and rounded values."],
  caption:["실수 연산 기준으로 같은 확률이며, 부동소수점 결과가 비트 단위로 같다는 뜻은 아닙니다. 소수는 반올림한 값입니다.","The probabilities are equal in exact arithmetic; this does not mean bit-identical floating-point results. Decimals are rounded."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1016,1104,[48,206]);
    p.el("rect",{x:48,y:207,width:536,height:853,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:253,fill:C.orange,"font-size":29,"font-weight":700,"text-anchor":"middle"},["원래 점수로 계산","Use the original scores"]);
    p.el('text',{x:76,y:299,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["점수","Scores"]);
    p.el("rect",{x:96,y:317,width:136.66666666666666,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:164.33333333333331,y:358,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1000");
    p.el("rect",{x:242.66666666666666,y:317,width:136.66666666666666,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:311,y:358,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1001");
    p.el("rect",{x:389.3333333333333,y:317,width:136.66666666666666,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:457.66666666666663,y:358,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1002");
    p.el("path",{d:"M316,439 L316,459",fill:"none",stroke:C.orange,"stroke-width":2,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:316,y:426,fill:C.orange,"font-size":22,"font-weight":600,"text-anchor":"middle"},["점수를 그대로 사용","Keep scores unchanged"]);
    p.el("rect",{x:96,y:474,width:136.66666666666666,height:66,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:164.33333333333331,y:515,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1000");
    p.el("rect",{x:242.66666666666666,y:474,width:136.66666666666666,height:66,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:311,y:515,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1001");
    p.el("rect",{x:389.3333333333333,y:474,width:136.66666666666666,height:66,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:457.66666666666663,y:515,fill:C.orange,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1002");
    p.el("path",{d:"M316,553 L316,601",fill:"none",stroke:C.orange,"stroke-width":2,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:76,y:590,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["exp 적용","Apply exp"]);
    p.el("rect",{x:96,y:622,width:136.66666666666666,height:66,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:164.33333333333331,y:663,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},"exp(1000)");
    p.el("rect",{x:242.66666666666666,y:622,width:136.66666666666666,height:66,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:311,y:663,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},"exp(1001)");
    p.el("rect",{x:389.3333333333333,y:622,width:136.66666666666666,height:66,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:457.66666666666663,y:663,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},"exp(1002)");
    p.el('text',{x:316,y:727,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"middle"},["FP32·FP64에서 표현 범위를 넘음","Exceeds the FP32 / FP64 range"]);
    p.el("path",{d:"M316,745 L316,786",fill:"none",stroke:C.orange,"stroke-width":2,"marker-end":markerUrl(C.orange)});
    p.el("rect",{x:96,y:806,width:430,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:311,y:846,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},["exp 값의 합도 표현 불가","The sum is also out of range"]);
    p.el('text',{x:316,y:909,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["각 exp 값을 합으로 나누기","Divide each exponential by the sum"]);
    p.el("rect",{x:96,y:938,width:430,height:66,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:311,y:979,fill:C.orange,"font-size":(locale==='ko'?23:22),"font-weight":600,"text-anchor":"middle"},["유효한 확률을 계산할 수 없음","Cannot compute valid probabilities"]);
    p.el("rect",{x:616,y:207,width:536,height:853,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:253,fill:C.teal,"font-size":29,"font-weight":700,"text-anchor":"middle"},["max를 빼고 계산","Subtract the maximum"]);
    p.el('text',{x:644,y:299,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["점수","Scores"]);
    p.el("rect",{x:664,y:317,width:136.66666666666666,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:732.3333333333334,y:358,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1000");
    p.el("rect",{x:810.6666666666666,y:317,width:136.66666666666666,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:879,y:358,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1001");
    p.el("rect",{x:957.3333333333333,y:317,width:136.66666666666666,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1025.6666666666665,y:358,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1002");
    p.el("path",{d:"M884,439 L884,459",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:884,y:426,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},["모든 점수에서 max = 1002 빼기","Subtract max = 1002 from all scores"]);
    p.el("rect",{x:664,y:474,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:732.3333333333334,y:515,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"-2");
    p.el("rect",{x:810.6666666666666,y:474,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:879,y:515,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"-1");
    p.el("rect",{x:957.3333333333333,y:474,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1025.6666666666665,y:515,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("path",{d:"M884,553 L884,601",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:644,y:590,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["exp 적용","Apply exp"]);
    p.el("rect",{x:664,y:622,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:732.3333333333334,y:663,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},"0.135");
    p.el("rect",{x:810.6666666666666,y:622,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:879,y:663,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},"0.368");
    p.el("rect",{x:957.3333333333333,y:622,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1025.6666666666665,y:663,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:884,y:727,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["가장 큰 exp 값은 1","The largest exponential is 1"]);
    p.el("path",{d:"M884,745 L884,786",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:664,y:806,width:430,height:64,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:879,y:846,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["합 ≈ 1.503","Sum ≈ 1.503"]);
    p.el('text',{x:884,y:909,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["각 exp 값을 합으로 나누기","Divide each exponential by the sum"]);
    p.el("rect",{x:664,y:938,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:732.3333333333334,y:979,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"9.0%");
    p.el("rect",{x:810.6666666666666,y:938,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:879,y:979,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"24.5%");
    p.el("rect",{x:957.3333333333333,y:938,width:136.66666666666666,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1025.6666666666665,y:979,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},"66.5%");
    p.el("rect",{x:48,y:1093,width:1104,height:121,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:600,y:1139,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"middle"},["분자와 분모에 같은 배율 exp(−max)가 적용됩니다.","The same factor exp(−max) scales the numerator and denominator."]);
    p.el('text',{x:600,y:1184,fill:C.teal,"font-size":25,"font-weight":400,"text-anchor":"middle"},["수학적으로 같은 확률을, 크기가 제한된 exp 값으로 계산합니다.","Mathematically identical probabilities, computed with bounded exponentials."]);
    return [p];
  },
} satisfies FigureSpec;
