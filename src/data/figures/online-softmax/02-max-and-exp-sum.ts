import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"online-softmax",figureId:"02-max-and-exp-sum",number:"02-max-and-exp-sum",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["소프트맥스의 기준과 분모를 구하는 두 값","Two Values for the Softmax Reference and Denominator"],
  subtitle:["m은 exp 계산의 기준 · ℓ은 같은 기준으로 계산한 exp 값의 합","m: the reference for exp · ℓ: the sum of exponentials using that reference"],
  alt:["한 행의 점수 1,2에서 최댓값 m=2를 구한다. exp(1-2)는 약 0.368, exp(2-2)는 1이고 지수합 l은 약 1.368이다. 각 exp 값을 같은 l로 나누면 확률은 약 26.9%,73.1%이다. 지수합은 원래 점수에 exp를 적용한 합이 아니라 현재 최댓값을 뺀 점수에 exp를 적용한 합이다. 전체 확률 출력에는 각 점수도 필요하다. 표시 수치는 반올림했다.","For the row of scores 1,2, the maximum m is 2. exp(1-2) is about 0.368 and exp(2-2) is 1, giving exponential sum l about 1.368. Dividing each exponential by the same l gives probabilities of about 26.9%,73.1%. The sum contains exponentials after subtracting the current maximum, not exponentials of the original scores. Outputting all probabilities also requires each score. Displayed values are rounded."],
  caption:["지수합은 원래 점수가 아니라 최댓값을 뺀 점수에 exp를 적용한 합입니다. 소수는 반올림한 값입니다.","The exponential sum uses scores after subtracting the maximum, not the original scores. Decimals are rounded."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,951,1104,[48,206]);
    p.el('text',{x:84,y:250,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"start"},["점수 x","Scores x"]);
    p.el("rect",{x:330,y:211,width:190,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:425,y:252,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:530,y:211,width:190,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:625,y:252,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("path",{d:"M743,244 L831,244",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el("rect",{x:853,y:211,width:271,height:66,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:988.5,y:252,fill:C.purple,"font-size":(locale==='ko'?27:26),"font-weight":600,"text-anchor":"middle"},["최댓값 m = 2","Maximum m = 2"]);
    p.el("rect",{x:48,y:328,width:1104,height:228,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:374,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["1. 모든 점수에서 같은 m을 빼고 exp를 계산합니다.","1. Subtract the same m from all scores, then apply exp."]);
    p.el("rect",{x:330,y:401,width:340,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:500,y:442,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"exp(1 − 2)");
    p.el("rect",{x:680,y:401,width:340,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:850,y:442,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"exp(2 − 2)");
    p.el('text',{x:120,y:447,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"start"},"exp(x − m)");
    p.el('text',{x:500,y:517,fill:C.blue,"font-size":29,"font-weight":700,"text-anchor":"middle"},"≈ 0.368");
    p.el('text',{x:850,y:517,fill:C.blue,"font-size":29,"font-weight":700,"text-anchor":"middle"},"= 1");
    p.el("path",{d:"M500,565 L500,611",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M850,565 L850,611",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:48,y:632,width:1104,height:177,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:76,y:679,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"start"},["2. exp 값을 더해 공통 분모를 만듭니다.","2. Sum the exponentials to form a shared denominator."]);
    p.el('text',{x:600,y:756,fill:C.teal,"font-size":31,"font-weight":700,"text-anchor":"middle"},["지수합 ℓ = exp(1 − 2) + exp(2 − 2) ≈ 1.368","Sum ℓ = exp(1 − 2) + exp(2 − 2) ≈ 1.368"]);
    p.el("path",{d:"M600,823 L600,866",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:48,y:887,width:1104,height:192,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:933,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["3. 각 exp 값을 같은 ℓ로 나누면 확률이 됩니다.","3. Divide each exponential by the same ℓ to get probabilities."]);
    p.el("rect",{x:150,y:971,width:422,height:67,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:361,y:1012.5,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0.368 ÷ 1.368 ≈ 26.9%");
    p.el("rect",{x:626,y:971,width:422,height:67,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:837,y:1012.5,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1 ÷ 1.368 ≈ 73.1%");
    p.el('text',{x:600,y:1140,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["함께 기억할 두 값: 최댓값 m과, 그 m을 기준으로 구한 지수합 ℓ","Keep the pair: maximum m and exponential sum ℓ using that m."]);
    return [p];
  },
} satisfies FigureSpec;
