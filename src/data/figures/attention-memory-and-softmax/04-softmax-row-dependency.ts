import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"attention-memory-and-softmax",figureId:"04-softmax-row-dependency",number:"04-softmax-row-dependency",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["아직 읽지 않은 점수가 확률을 바꿉니다","Unread Scores Change the Probabilities"],
  subtitle:["같은 앞쪽 점수에 서로 다른 나머지 점수를 이어 붙여 비교합니다.","Compare identical initial scores followed by different remaining scores."],
  alt:["causal self-attention의 마지막 쿼리 토큰 행처럼 네 점수 모두 유효한 경우를 비교한다. 스케일링을 마친 앞의 두 점수는 0,0으로 같다. 나머지가 0,0이면 모든 지수값이 1이고 합은 4, 첫 확률은 25%이다. 나머지가 2,2이면 지수값이 1,1,exp(2),exp(2)이며 합은 약 16.78, 첫 확률은 약 5.96%로 그림에서는 6%로 표시한다. 소수는 반올림한 값이다. 최댓값을 빼는 수치 안정화와 온라인 갱신은 다음 편의 범위다. 아직 보지 않은 점수도 현재 점수의 최종 확률에 영향을 미친다는 의존성을 보여준다.","Compare a row with four unmasked scores, as in the last query row of causal self-attention. The first two scaled scores are both 0 in both cases. If the remaining scores are 0,0, all exponentials are 1, their sum is 4, and the first probability is 25%. If the remaining scores are 2,2, the exponentials are 1,1,exp(2),exp(2), their sum is about 16.78, and the first probability is about 5.96%, shown as 6%. Decimals are rounded. Numerical stability by subtracting a maximum and online updates belong to the next article. Unread scores affect the final probabilities of already computed scores."],
  caption:["소수는 반올림한 값입니다. 최댓값을 빼는 수치 안정화와 온라인 갱신은 다음 편에서 다룹니다.","Decimals are rounded. Numerical stabilization by subtracting the maximum and online updates come in the next article."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1050,1104,[48,206]);
    p.el('text',{x:600,y:216,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["네 점수 모두 유효한 한 행 · 앞의 두 점수만 계산한 상태","One row, four unmasked scores · Only the first two computed"]);
    p.el("rect",{x:390,y:256,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:438,y:296,fill:C.orange,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:495,y:256,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:543,y:296,fill:C.orange,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:600,y:256,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:648,y:296,fill:C.purple,"font-size":28,"font-weight":600,"text-anchor":"middle"},"?");
    p.el("rect",{x:705,y:256,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:753,y:296,fill:C.purple,"font-size":28,"font-weight":600,"text-anchor":"middle"},"?");
    p.el('text',{x:600,y:364,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"middle"},["확률 = 해당 점수의 지수값 ÷ 행 전체 지수값의 합","Probability = exponential of the score ÷ sum of exponentials across the row"]);
    p.el("path",{d:"M600,391 V427 H316 V458",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M600,427 H884 V458",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:478,width:536,height:529,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:524,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["나머지 점수가 0, 0이면","If the remaining scores are 0, 0"]);
    p.el('text',{x:79,y:568,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["점수","Scores"]);
    p.el("rect",{x:109,y:589,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:157,y:629,fill:C.orange,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:214,y:589,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:262,y:629,fill:C.orange,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:319,y:589,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:367,y:629,fill:C.purple,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:424,y:589,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:472,y:629,fill:C.purple,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0");
    p.el('text',{x:79,y:696,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["지수값","Exponentials"]);
    p.el("rect",{x:109,y:717,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:157,y:757,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:214,y:717,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:262,y:757,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:319,y:717,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:367,y:757,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:424,y:717,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:472,y:757,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:316,y:829,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"middle"},["행 전체의 합 = 4","Sum across the row = 4"]);
    p.el("rect",{x:78,y:862,width:476,height:105,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:316,y:901,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["첫 번째 점수 0의 확률","Probability for the first score, 0"]);
    p.el('text',{x:316,y:946,fill:C.orange,"font-size":29,"font-weight":700,"text-anchor":"middle"},"1 ÷ 4 = 25%");
    p.el("rect",{x:616,y:478,width:536,height:529,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:524,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["나머지 점수가 2, 2이면","If the remaining scores are 2, 2"]);
    p.el('text',{x:647,y:568,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["점수","Scores"]);
    p.el("rect",{x:677,y:589,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:725,y:629,fill:C.orange,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:782,y:589,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:830,y:629,fill:C.orange,"font-size":28,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:887,y:589,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:935,y:629,fill:C.purple,"font-size":28,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:992,y:589,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1040,y:629,fill:C.purple,"font-size":28,"font-weight":600,"text-anchor":"middle"},"2");
    p.el('text',{x:647,y:696,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["지수값","Exponentials"]);
    p.el("rect",{x:677,y:717,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:725,y:757,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:782,y:717,width:96,height:64,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:830,y:757,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:887,y:717,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:935,y:757,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},"7.39");
    p.el("rect",{x:992,y:717,width:96,height:64,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1040,y:757,fill:C.purple,"font-size":26,"font-weight":600,"text-anchor":"middle"},"7.39");
    p.el('text',{x:884,y:829,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"middle"},["행 전체의 합 ≈ 16.78","Sum across the row ≈ 16.78"]);
    p.el("rect",{x:646,y:862,width:476,height:105,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:884,y:901,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["첫 번째 점수 0의 확률","Probability for the first score, 0"]);
    p.el('text',{x:884,y:946,fill:C.orange,"font-size":29,"font-weight":700,"text-anchor":"middle"},"1 ÷ 16.78 ≈ 6%");
    p.el('text',{x:600,y:1061,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"middle"},["앞의 점수는 같아도, 뒤의 점수에 따라 앞의 확률이 달라집니다.","The same initial scores get different probabilities as later scores change."]);
    p.el("rect",{x:48,y:1110,width:1104,height:138,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:600,y:1161,fill:C.purple,"font-size":28,"font-weight":400,"text-anchor":"middle"},["전체 점수를 저장하지 않고, 일부씩 읽으면서","Can we read scores a few at a time, without storing them all,"]);
    p.el('text',{x:600,y:1205,fill:C.purple,"font-size":28,"font-weight":400,"text-anchor":"middle"},["정규화에 필요한 정보를 구할 수 있을까요?","and obtain the information needed for normalization?"]);
    return [p];
  },
} satisfies FigureSpec;
