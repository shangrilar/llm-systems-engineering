import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"attention-memory-and-softmax",figureId:"01-attention-flow",number:"01-attention-flow",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["Attention의 전체 계산 흐름","The Attention Computation Flow"],
  subtitle:["점수 계산 → 스케일링·마스크 → Softmax → Value 가중합","Scores → Scaling and masking → Softmax → Weighted sum of Values"],
  alt:["배치와 헤드 축을 제외한 causal self-attention 한 헤드의 계산이다. Q(T×dh)와 K의 전치(dh×T)를 곱해 점수 S(T×T)를 만든다. 스케일링과 미래 토큰 마스크를 적용하고 행별 Softmax로 확률 P(T×T)를 구한다. P와 V(T×dh)의 곱은 출력 O(T×dh)다. 도형은 T=4, dh=2일 때의 모양이다. P의 미래 토큰 위치는 0이며 유효한 행의 합은 1이다. 번호는 수학적 설명 단계이며 별도 커널 개수를 의미하지 않는다.","Causal self-attention for one head, excluding batch and head axes. Q (T × dh) times the transpose of K (dh × T) produces scores S (T × T). Scaling and a future-token mask are followed by row-wise Softmax to produce probabilities P (T × T). P times V (T × dh) produces O (T × dh). The shapes use T=4 and dh=2. Future-token entries in P are zero, and each valid row sums to one. The numbers label mathematical explanation stages, not separate kernel counts."],
  caption:["배치와 헤드 축은 생략했습니다. 번호는 수학적 설명 단계이며 별도 커널의 개수를 뜻하지 않습니다.","Batch and head axes are omitted. Numbers are explanatory steps, not the number of separate kernels."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1110,1104,[48,206]);
    p.el('text',{x:600,y:213,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["헤드 하나 기준 · T: 토큰 수 · dₕ: 헤드 차원","One head · T: token count · dₕ: head dimension"]);
    p.el("rect",{x:48,y:248,width:1104,height:301,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:290,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["1. Q와 K로 토큰 사이의 점수를 계산합니다.","1. Compute scores between tokens using Q and K."]);
    p.el('text',{x:178,y:325,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"middle"},"Q");
    p.el("rect",{x:144,y:353,width:31,height:31,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:178,y:353,width:31,height:31,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:144,y:387,width:31,height:31,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:178,y:387,width:31,height:31,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:144,y:421,width:31,height:31,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:178,y:421,width:31,height:31,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:144,y:455,width:31,height:31,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:178,y:455,width:31,height:31,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:178,y:520,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"T × dₕ");
    p.el('text',{x:316,y:428,fill:C.muted,"font-size":36,"font-weight":400,"text-anchor":"middle"},"×");
    p.el('text',{x:478,y:359,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"middle"},"Kᵀ");
    p.el("rect",{x:410,y:387,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:444,y:387,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:478,y:387,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:512,y:387,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:410,y:421,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:444,y:421,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:478,y:421,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:512,y:421,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:478,y:486,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"dₕ × T");
    p.el("path",{d:"M627,420 L763,420",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:961,y:325,fill:C.orange,"font-size":27,"font-weight":700,"text-anchor":"middle"},["점수 S","Scores S"]);
    p.el("rect",{x:893,y:353,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:927,y:353,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:961,y:353,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:995,y:353,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:893,y:387,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:927,y:387,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:961,y:387,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:995,y:387,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:893,y:421,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:927,y:421,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:961,y:421,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:995,y:421,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:893,y:455,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:927,y:455,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:961,y:455,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:995,y:455,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:961,y:520,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"T × T");
    p.el("path",{d:"M600,562 L600,595",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:613,width:1104,height:246,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:655,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["2. 점수를 조정하고, 행별 확률로 바꿉니다.","2. Adjust scores and convert each row to probabilities."]);
    p.el("rect",{x:76,y:701,width:167,height:91,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:159.5,y:754.5,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},["점수 S","Scores S"]);
    p.el("path",{d:"M257,747 L300,747",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:314,y:701,width:275,height:91,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:451,y:737,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"middle"},["스케일링 · 마스크","Scale · Mask"]);
    p.el('text',{x:451,y:770,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"middle"},["미래 토큰 제외","Exclude future tokens"]);
    p.el("path",{d:"M604,747 L647,747",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:660,y:701,width:198,height:91,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:759,y:754.5,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},"Softmax");
    p.el("path",{d:"M872,747 L915,747",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:930,y:701,width:192,height:91,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1026,y:754.5,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},["확률 P","Probabilities P"]);
    p.el('text',{x:758,y:831,fill:C.purple,"font-size":21,"font-weight":400,"text-anchor":"middle"},["한 행의 확률 합 = 1","Probabilities in each row sum to 1"]);
    p.el("path",{d:"M600,873 L600,907",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:925,width:1104,height:314,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:967,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["3. 확률로 V를 가중합해 토큰별 출력을 만듭니다.","3. Weight and sum V to produce an output for each token."]);
    p.el('text',{x:179,y:1002,fill:C.orange,"font-size":27,"font-weight":700,"text-anchor":"middle"},"P");
    p.el("rect",{x:111,y:1030,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:145,y:1030,width:31,height:31,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:179,y:1030,width:31,height:31,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:213,y:1030,width:31,height:31,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:111,y:1064,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:145,y:1064,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:179,y:1064,width:31,height:31,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:213,y:1064,width:31,height:31,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:111,y:1098,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:145,y:1098,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:179,y:1098,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:213,y:1098,width:31,height:31,rx:3,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:111,y:1132,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:145,y:1132,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:179,y:1132,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:213,y:1132,width:31,height:31,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:160.5,y:1052,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"0");
    p.el('text',{x:194.5,y:1052,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"0");
    p.el('text',{x:228.5,y:1052,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"0");
    p.el('text',{x:194.5,y:1086,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"0");
    p.el('text',{x:228.5,y:1086,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"0");
    p.el('text',{x:228.5,y:1120,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"0");
    p.el('text',{x:179,y:1197,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"T × T");
    p.el('text',{x:316,y:1106,fill:C.muted,"font-size":36,"font-weight":400,"text-anchor":"middle"},"×");
    p.el('text',{x:478,y:1002,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"middle"},"V");
    p.el("rect",{x:444,y:1030,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:478,y:1030,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:444,y:1064,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:478,y:1064,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:444,y:1098,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:478,y:1098,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:444,y:1132,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:478,y:1132,width:31,height:31,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:478,y:1197,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"T × dₕ");
    p.el("path",{d:"M627,1100 L763,1100",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:961,y:1002,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"middle"},["출력 O","Output O"]);
    p.el("rect",{x:927,y:1030,width:31,height:31,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:961,y:1030,width:31,height:31,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:927,y:1064,width:31,height:31,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:961,y:1064,width:31,height:31,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:927,y:1098,width:31,height:31,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:961,y:1098,width:31,height:31,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:927,y:1132,width:31,height:31,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:961,y:1132,width:31,height:31,rx:3,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:961,y:1197,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"T × dₕ");
    p.el('text',{x:600,y:1300,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"middle"},["두 행렬 곱 사이에서, 점수를 확률로 바꾸는 과정이 필요합니다.","Between the two matrix multiplications, scores must become probabilities."]);
    return [p];
  },
} satisfies FigureSpec;
