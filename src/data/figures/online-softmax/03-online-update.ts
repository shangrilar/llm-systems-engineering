import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"online-softmax",figureId:"03-online-update",number:"03-online-update",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["새 점수를 반영해 max와 지수합 갱신하기","Updating the Maximum and Sum with New Scores"],
  subtitle:["점수 묶음을 순서대로 읽으며, 지금까지 처리한 점수의 두 값을 유지합니다.","Read chunks in order, keeping two values for all scores processed so far."],
  alt:["점수 묶음 1,2 다음 0,1 다음 3,2를 순서대로 처리한다. 첫 상태는 m=2와 l 약 1.368이다. 0,1은 기존 최대보다 작으므로 m=2를 유지하고 exp(0-2)+exp(1-2) 약 0.503을 더해 l 약 1.871을 얻는다. 다음 3,2에서 m은 3으로 커진다. 이전 l 전체에 exp(2-3)을 곱해 약 0.688로 보정하고 새 묶음의 exp(3-3)+exp(2-3) 약 1.368을 더한다. 최종 m=3, l 약 2.056이다. 이전 점수들을 다시 읽지 않고 누적 지수합 한 값에 보정 배율을 곱한다. 이 그림은 정규화 통계의 계산만 다룬다. 모든 확률의 출력에는 각 점수를 최종 m,l로 정규화하는 과정이 추가로 필요하다. 그림 수치는 정확한 계산 후 반올림했다.","Process chunks 1,2 then 0,1 then 3,2 in order. Start with m=2 and l about 1.368. Since 0,1 are below the previous maximum, keep m=2 and add exp(0-2)+exp(1-2), about 0.503, to obtain l about 1.871. The next chunk 3,2 raises m to 3. Multiply the entire previous l by exp(2-3), giving about 0.688, then add exp(3-3)+exp(2-3), about 1.368. The final m is 3 and l is about 2.056. Rescale the single accumulated sum without rereading earlier scores. This figure covers only normalization statistics. Outputting all probabilities additionally requires normalizing each score with the final m and l. Values are rounded after calculation at full precision."],
  caption:["이 그림은 정규화 통계의 계산만 다룹니다. 확률을 출력하려면 각 점수를 최종 m과 ℓ로 정규화하는 과정이 더 필요합니다.","This figure covers only the normalization statistics; outputting probabilities also requires normalizing each score with the final m and ℓ."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1471,1104,[48,206]);
    p.el("rect",{x:48,y:205,width:1104,height:185,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:251,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["시작 · 첫 묶음 [1, 2]를 처리한 상태","Start · After processing the first chunk [1, 2]"]);
    p.el("rect",{x:85,y:284,width:110,height:66,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:140,y:325,fill:C.muted,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:205,y:284,width:110,height:66,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:260,y:325,fill:C.muted,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("path",{d:"M356,318 L672,318",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:511,y:298,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["두 값 유지","Keep two values"]);
    p.el("rect",{x:709,y:284,width:169,height:66,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:793.5,y:325,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"m = 2");
    p.el("rect",{x:897,y:284,width:227,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1010.5,y:325,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"ℓ ≈ 1.368");
    p.el("rect",{x:48,y:429,width:1104,height:422,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:475,fill:C.purple,"font-size":29,"font-weight":700,"text-anchor":"start"},["① 새 묶음 [0, 1] · max 유지","① New chunk [0, 1] · Keep the maximum"]);
    p.el("rect",{x:83,y:506,width:110,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:138,y:547,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:203,y:506,width:110,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:258,y:547,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:386,y:547,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"start"},["max(기존 max 2, 묶음 max 1) = 2","max(previous max 2, chunk max 1) = 2"]);
    p.el("rect",{x:83,y:615,width:362,height:73,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:264,y:659.5,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},["기존 합 ≈ 1.368","Previous sum ≈ 1.368"]);
    p.el('text',{x:480,y:661,fill:C.teal,"font-size":35,"font-weight":700,"text-anchor":"middle"},"+");
    p.el("rect",{x:515,y:615,width:609,height:73,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:819.5,y:659.5,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"exp(0 − 2) + exp(1 − 2) ≈ 0.503");
    p.el('text',{x:264,y:726,fill:C.teal,"font-size":23,"font-weight":400,"text-anchor":"middle"},["같은 기준이므로 그대로","Same reference: keep the sum"]);
    p.el('text',{x:819,y:726,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["새 점수도 max 2 기준으로 계산","New scores also use max 2"]);
    p.el('text',{x:84,y:801,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["두 묶음을 반영한 상태","After two chunks"]);
    p.el("rect",{x:709,y:759,width:169,height:66,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:793.5,y:800,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"m = 2");
    p.el("rect",{x:897,y:759,width:227,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1010.5,y:800,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"ℓ ≈ 1.871");
    p.el("path",{d:"M980,864 L980,902",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:48,y:921,width:1104,height:485,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:968,fill:C.purple,"font-size":29,"font-weight":700,"text-anchor":"start"},["② 새 묶음 [3, 2] · max 갱신","② New chunk [3, 2] · Update the maximum"]);
    p.el("rect",{x:83,y:999,width:110,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:138,y:1040,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:203,y:999,width:110,height:66,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:258,y:1040,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"2");
    p.el('text',{x:386,y:1040,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"start"},["max(기존 max 2, 묶음 max 3) = 3","max(previous max 2, chunk max 3) = 3"]);
    p.el("rect",{x:83,y:1107,width:450,height:73,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:308,y:1151.5,fill:C.orange,"font-size":28,"font-weight":600,"text-anchor":"middle"},["기존 합 × exp(2 − 3)","Previous sum × exp(2 − 3)"]);
    p.el('text',{x:574,y:1153,fill:C.teal,"font-size":35,"font-weight":700,"text-anchor":"middle"},"+");
    p.el("rect",{x:615,y:1107,width:509,height:73,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:869.5,y:1151.5,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},"exp(3 − 3) + exp(2 − 3)");
    p.el('text',{x:308,y:1220,fill:C.orange,"font-size":27,"font-weight":700,"text-anchor":"middle"},"≈ 1.871 × 0.368 ≈ 0.688");
    p.el('text',{x:869,y:1220,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"middle"},"≈ 1.368");
    p.el('text',{x:308,y:1262,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"middle"},["이전 합을 max 3 기준으로 보정","Rescale the previous sum to max 3"]);
    p.el('text',{x:869,y:1262,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["새 점수도 max 3 기준으로 계산","New scores also use max 3"]);
    p.el('text',{x:84,y:1355,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"start"},["모든 묶음을 반영한 상태","After all chunks"]);
    p.el("rect",{x:709,y:1312,width:169,height:66,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:793.5,y:1353,fill:C.purple,"font-size":27,"font-weight":600,"text-anchor":"middle"},"m = 3");
    p.el("rect",{x:897,y:1312,width:227,height:66,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1010.5,y:1353,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"ℓ ≈ 2.056");
    p.el("rect",{x:48,y:1450,width:1104,height:170,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:600,y:1499,fill:C.teal,"font-size":29,"font-weight":700,"text-anchor":"middle"},["max를 먼저 정하고, 같은 max 기준의 합끼리 더합니다.","Choose the max first, then add sums using that same max."]);
    p.el('text',{x:600,y:1550,fill:C.teal,"font-size":28,"font-weight":600,"text-anchor":"middle"},["새 지수합 = 기존 지수합 × exp(기존 max − 새 max)","New sum = previous sum × exp(previous max − new max)"]);
    p.el('text',{x:600,y:1591,fill:C.teal,"font-size":28,"font-weight":600,"text-anchor":"middle"},["+ 새 점수들의 exp(점수 − 새 max) 합","+ sum of exp(score − new max) for the new scores"]);
    p.el('text',{x:600,y:1662,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["max가 같으면 보정 배율은 exp(0) = 1 · 소수는 반올림한 값","Same max: the scale factor is exp(0) = 1 · Decimals are rounded"]);
    return [p];
  },
} satisfies FigureSpec;
