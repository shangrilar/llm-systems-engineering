import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"flash-attention",figureId:"03-step-07",number:"03-step-07",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["타일을 순회하며 출력 완성하기","Completing the Output Tile by Tile"],
  subtitle:["Q 왼쪽 · K 위쪽 · V 아래쪽 · 출력 오른쪽 — 같은 화면에서 계산을 따라갑니다.","Q left · K top · V bottom · Output right — follow the computation in one view."],
  alt:["왼쪽 Q 두 행, 위쪽 K 네 벡터, 아래쪽 V 네 벡터, 오른쪽 출력 누적 벡터를 배치한다. K와 V는 토큰을 가로로 나열한 전치 배치다. 중앙에는 현재 2×2 타일의 점수 또는 정규화 전 exp 값만 표시한다. Q와 출력 위치를 고정하고 두 K/V 타일을 순회한다. 중앙의 전체 격자는 처리 위치 지도이며 전체 점수 행렬을 저장하지 않는다. 스케일링과 마스크를 생략한 교육용 계산이다. 현재 단계: 다음 타일 · 새 exp 값과 지수합","Two Q rows on the left, four K vectors above, four V vectors below, and output accumulator vectors on the right. K and V are transposed to arrange tokens horizontally. The center shows only the current 2×2 tile of scores or unnormalized exponentials. Q and output positions stay fixed while traversing two K/V tiles. The full grid maps processing positions and does not store the full score matrix. This educational example omits scaling and masking. Current step: Next tile · New exponentials and sum."],
  caption:["Q와 출력 위치를 고정하고 두 K/V 타일을 순회하며 m, ℓ, a를 갱신합니다.","With Q and the output fixed, the two K/V tiles are visited in turn while m, ℓ, and a are updated."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1038,1104,[48,206]);
    p.el("rect",{x:48,y:195,width:1104,height:94,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:76,y:233,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"start"},["7 / 9    다음 타일 · 새 exp 값과 지수합","7 / 9    Next tile · New exponentials and sum"]);
    p.el('text',{x:76,y:269,fill:C.ink,"font-size":22,"font-weight":400,"text-anchor":"start"},["새 기준으로 exp를 계산하고, 보정한 지수합에 새 기여를 더합니다.","Apply exp using the new reference; add the new sum to the rescaled sum."]);
    p.el('text',{x:550,y:332,fill:C.purple,"font-size":25,"font-weight":700,"text-anchor":"middle"},["키 Kᵀ · 토큰마다 세로 벡터","Keys Kᵀ · One column vector per token"]);
    p.el('text',{x:370,y:369,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"K0");
    p.el("rect",{x:336,y:384,width:68,height:42,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:413,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:336,y:429,width:68,height:42,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:458,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el('text',{x:490,y:369,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"K1");
    p.el("rect",{x:456,y:384,width:68,height:42,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:490,y:413,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:456,y:429,width:68,height:42,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:490,y:458,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:610,y:369,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},"K2");
    p.el("rect",{x:576,y:384,width:68,height:42,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:610,y:413,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},"3");
    p.el("rect",{x:576,y:429,width:68,height:42,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:610,y:458,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0");
    p.el('text',{x:730,y:369,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},"K3");
    p.el("rect",{x:696,y:384,width:68,height:42,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:730,y:413,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:696,y:429,width:68,height:42,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:730,y:458,fill:C.purple,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:151,y:549,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},["쿼리 Q","Queries Q"]);
    p.el('text',{x:1036,y:549,fill:C.teal,"font-size":(locale==='ko'?24:20),"font-weight":700,"text-anchor":"middle"},["출력 누적값 a","Output accumulator a"]);
    p.el('text',{x:550,y:549,fill:C.teal,"font-size":24,"font-weight":700,"text-anchor":"middle"},["exp(점수 − m) 타일","exp(score − m) tile"]);
    p.el('text',{x:63,y:570,fill:C.blue,"font-size":20,"font-weight":600,"text-anchor":"start"},"Q0");
    p.el("rect",{x:62,y:582,width:84,height:54,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:104,y:617,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:149,y:582,width:84,height:54,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:191,y:617,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:311,y:573,width:114,height:73,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:368,y:617.5,fill:C.muted,"font-size":27,"font-weight":600,"text-anchor":"middle"},"");
    p.el('text',{x:368,y:617,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},["소비됨","Consumed"]);
    p.el("rect",{x:431,y:573,width:114,height:73,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:488,y:617.5,fill:C.muted,"font-size":27,"font-weight":600,"text-anchor":"middle"},"");
    p.el('text',{x:488,y:617,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},["소비됨","Consumed"]);
    p.el("rect",{x:551,y:573,width:114,height:73,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:608,y:617.5,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:671,y:573,width:114,height:73,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:728,y:617.5,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0.368");
    p.el("rect",{x:940,y:582,width:91,height:54,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:985.5,y:617,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0.271");
    p.el("rect",{x:1034,y:582,width:91,height:54,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1079.5,y:617,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0.736");
    p.el('text',{x:1033,y:671,fill:C.purple,"font-size":19,"font-weight":600,"text-anchor":"middle"},"m = 3 · ℓ ≈ 1.871");
    p.el('text',{x:63,y:674,fill:C.blue,"font-size":20,"font-weight":600,"text-anchor":"start"},"Q1");
    p.el("rect",{x:62,y:686,width:84,height:54,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:104,y:721,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:149,y:686,width:84,height:54,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:191,y:721,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:311,y:677,width:114,height:73,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:368,y:721.5,fill:C.muted,"font-size":27,"font-weight":600,"text-anchor":"middle"},"");
    p.el('text',{x:368,y:721,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},["소비됨","Consumed"]);
    p.el("rect",{x:431,y:677,width:114,height:73,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:488,y:721.5,fill:C.muted,"font-size":27,"font-weight":600,"text-anchor":"middle"},"");
    p.el('text',{x:488,y:721,fill:C.muted,"font-size":18,"font-weight":400,"text-anchor":"middle"},["소비됨","Consumed"]);
    p.el("rect",{x:551,y:677,width:114,height:73,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:608,y:721.5,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0.135");
    p.el("rect",{x:671,y:677,width:114,height:73,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:728,y:721.5,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"0.368");
    p.el("rect",{x:940,y:686,width:91,height:54,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:985.5,y:721,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:1034,y:686,width:91,height:54,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1079.5,y:721,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0.736");
    p.el('text',{x:1033,y:775,fill:C.purple,"font-size":19,"font-weight":600,"text-anchor":"middle"},"m = 2 · ℓ ≈ 1.871");
    p.el('text',{x:151,y:807,fill:C.blue,"font-size":20,"font-weight":600,"text-anchor":"middle"},["Q 타일 유지","Keep the Q tile"]);
    p.el('text',{x:1036,y:807,fill:C.teal,"font-size":20,"font-weight":600,"text-anchor":"middle"},["같은 행에 계속 누적","Accumulate per row"]);
    p.el("rect",{x:336,y:864,width:68,height:42,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:893,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:336,y:909,width:68,height:42,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:370,y:938,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0");
    p.el('text',{x:370,y:984,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"V0");
    p.el("rect",{x:456,y:864,width:68,height:42,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:490,y:893,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:456,y:909,width:68,height:42,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:490,y:938,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el('text',{x:490,y:984,fill:C.muted,"font-size":22,"font-weight":600,"text-anchor":"middle"},"V1");
    p.el("rect",{x:576,y:864,width:68,height:42,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:610,y:893,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:576,y:909,width:68,height:42,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:610,y:938,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"2");
    p.el('text',{x:610,y:984,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"V2");
    p.el("rect",{x:696,y:864,width:68,height:42,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:730,y:893,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:696,y:909,width:68,height:42,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:730,y:938,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"1");
    p.el('text',{x:730,y:984,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"V3");
    p.el('text',{x:550,y:1020,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"middle"},["Value Vᵀ · 위쪽 K와 같은 토큰 순서","Values Vᵀ · Same token order as K above"]);
    p.el('text',{x:952,y:358,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"start"},["타일 1: 토큰 0·1","Tile 1: tokens 0, 1"]);
    p.el('text',{x:952,y:390,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"start"},["타일 2: 토큰 2·3","Tile 2: tokens 2, 3"]);
    p.el('text',{x:952,y:440,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"start"},["벡터 원소 2개","2 vector elements"]);
    p.el('text',{x:952,y:472,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"start"},["쿼리 행 2개","2 query rows"]);
    p.el("rect",{x:48,y:1051,width:1104,height:140,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:77,y:1098,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"start"},"Q₀: ℓ ≈ 0.503 + 1.368 = 1.871");
    p.el('text',{x:77,y:1145,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"start"},"Q₁: ℓ ≈ 1.368 + 0.503 = 1.871");
    p.el('text',{x:600,y:1230,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["교육용: 스케일링·마스크 생략 · 수치는 반올림 · 중앙 전체 격자는 저장 공간이 아닌 처리 지도","Illustrative: no scaling or mask · Rounded values · The full grid maps work, not storage"]);
    return [p];
  },
} satisfies FigureSpec;
