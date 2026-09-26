import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"attention-memory-and-softmax",figureId:"03-tile-dependency",number:"03-tile-dependency",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["타일별로 다음 계산까지 이어갈 수 있을까요?","Can We Continue to the Next Stage Tile by Tile?"],
  subtitle:["점수 계산과 마스크 적용에서, 행 전체의 정보가 필요한 Softmax로 넘어갑니다.","From scores and masking to Softmax, which needs information from the full row."],
  alt:["T=4, dh=2 예시에서 쿼리 토큰 2와 3, 키 토큰 0과 1에 해당하는 2×2 점수 타일을 계산한다. 타일 내부의 입력 성분 방향 합은 완료된 점수이며 내적 부분합을 뜻하지 않는다. 계산된 점수에 스케일링과 causal mask를 적용할 수 있다. 쿼리 2행은 키 2의 점수가 남고 키 3은 미래 위치라 제외된다. 쿼리 3행은 키 2와 3의 점수가 남는다. 따라서 현재 타일만으로 각 행의 지수합과 최종 확률을 확정할 수 없다. 전체 Attention을 타일별로 진행하려면 이 정규화 의존성을 다뤄야 한다. 온라인 가중합의 해결법은 여기서 설명하지 않는다. 마스크 자체나 타일 단위 Attention의 구현이 불가능하다는 뜻이 아니다.","With T=4 and dh=2, compute a 2 × 2 score tile for query tokens 2 and 3 against key tokens 0 and 1. Each score has completed its sum over input components; it is not a partial dot product. Scaling and a causal mask can be applied to the computed scores. Query row 2 still needs the score for key 2; key 3 is a future position and is excluded. Query row 3 still needs the scores for keys 2 and 3. The current tile alone therefore cannot determine each row's exponential sum and final probabilities. Continuing Attention tile by tile requires handling this normalization dependency. The online weighted-sum solution is not explained here. Neither masking nor tiled Attention is claimed to be impossible."],
  caption:["타일 안의 합은 완료된 점수이며 내적의 부분합이 아닙니다. 온라인 가중합의 해결법은 다음 편에서 다룹니다.","Sums inside the tile are completed scores, not partial dot products. The online weighted-sum solution comes in the next article."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1043,1104,[48,206]);
    p.el("rect",{x:48,y:207,width:1104,height:373,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:252,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["1. 필요한 점수 일부를 먼저 계산합니다.","1. Compute a subset of scores first."]);
    p.el('text',{x:179,y:315,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"middle"},["Q의 일부","Part of Q"]);
    p.el("rect",{x:130,y:343,width:46,height:46,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:179,y:343,width:46,height:46,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:130,y:392,width:46,height:46,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:179,y:392,width:46,height:46,rx:3,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:179,y:472,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["쿼리 토큰 2·3","Query tokens 2, 3"]);
    p.el('text',{x:319,y:405,fill:C.muted,"font-size":36,"font-weight":400,"text-anchor":"middle"},"×");
    p.el('text',{x:491,y:315,fill:C.purple,"font-size":27,"font-weight":700,"text-anchor":"middle"},["Kᵀ의 일부","Part of Kᵀ"]);
    p.el("rect",{x:442,y:343,width:46,height:46,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:491,y:343,width:46,height:46,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:442,y:392,width:46,height:46,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:491,y:392,width:46,height:46,rx:3,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:491,y:472,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["키 토큰 0·1","Key tokens 0, 1"]);
    p.el("path",{d:"M619,392 L745,392",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:923,y:315,fill:C.orange,"font-size":27,"font-weight":700,"text-anchor":"middle"},["점수 타일","Score tile"]);
    p.el("rect",{x:874,y:343,width:46,height:46,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:923,y:343,width:46,height:46,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:874,y:392,width:46,height:46,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:923,y:392,width:46,height:46,rx:3,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:923,y:472,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["2 × 2 점수","2 × 2 scores"]);
    p.el('text',{x:600,y:531,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["계산한 점수에는 스케일링과 마스크를 바로 적용할 수 있습니다.","We can immediately scale and mask the computed scores."]);
    p.el("rect",{x:48,y:616,width:1104,height:370,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:661,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["2. Softmax에는 같은 행의 나머지 점수도 필요합니다.","2. Softmax also needs the remaining scores in the same row."]);
    p.el('text',{x:432,y:719,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["키 토큰 0","Key token 0"]);
    p.el('text',{x:602,y:719,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["키 토큰 1","Key token 1"]);
    p.el('text',{x:772,y:719,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["키 토큰 2","Key token 2"]);
    p.el('text',{x:942,y:719,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["키 토큰 3","Key token 3"]);
    p.el('text',{x:101,y:796,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},["쿼리 토큰 2","Query token 2"]);
    p.el("rect",{x:354,y:749,width:155,height:72,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:431.5,y:793,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["계산됨","Computed"]);
    p.el("rect",{x:524,y:749,width:155,height:72,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:601.5,y:793,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["계산됨","Computed"]);
    p.el("rect",{x:694,y:749,width:155,height:72,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:771.5,y:793,fill:C.purple,"font-size":(locale==='ko'?23:20),"font-weight":600,"text-anchor":"middle"},["미계산","Not computed"]);
    p.el("rect",{x:864,y:749,width:155,height:72,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:941.5,y:793,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},["−∞ · 제외","−∞ · Masked"]);
    p.el('text',{x:101,y:888,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},["쿼리 토큰 3","Query token 3"]);
    p.el("rect",{x:354,y:841,width:155,height:72,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:431.5,y:885,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["계산됨","Computed"]);
    p.el("rect",{x:524,y:841,width:155,height:72,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:601.5,y:885,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},["계산됨","Computed"]);
    p.el("rect",{x:694,y:841,width:155,height:72,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:771.5,y:885,fill:C.purple,"font-size":(locale==='ko'?23:20),"font-weight":600,"text-anchor":"middle"},["미계산","Not computed"]);
    p.el("rect",{x:864,y:841,width:155,height:72,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:941.5,y:885,fill:C.purple,"font-size":(locale==='ko'?23:20),"font-weight":600,"text-anchor":"middle"},["미계산","Not computed"]);
    p.el('text',{x:600,y:957,fill:C.purple,"font-size":24,"font-weight":600,"text-anchor":"middle"},["마스크로 제외되지 않은 점수를 모두 반영해야 행의 지수합을 알 수 있습니다.","The row's exponential sum must include every unmasked score."]);
    p.el("path",{d:"M600,1000 L600,1040",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el("rect",{x:117,y:1064,width:438,height:94,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:336,y:1119,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"middle"},["Softmax의 최종 확률은 아직 미정","Final probabilities still unknown"]);
    p.el("path",{d:"M573,1111 L647,1111",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:666,y:1064,width:418,height:94,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:875,y:1119,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["그 확률로 V를 가중합하려면?","How can we weight and sum V?"]);
    p.el('text',{x:600,y:1233,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["타일 하나의 점수만으로는, 그 타일의 최종 확률을 확정하기 어렵습니다.","A tile's scores alone cannot determine its final probabilities."]);
    return [p];
  },
} satisfies FigureSpec;
