import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"flash-attention",figureId:"04-memory-traffic",number:"04-memory-traffic",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["중간 행렬의 저장과 재읽기 줄이기","Reducing Intermediate Matrix Traffic"],
  subtitle:["큰 행렬을 단계 사이에 옮기는 대신, 작은 타일 안에서 두 행렬 곱과 소프트맥스를 연결합니다.","Connect both matrix multiplies and softmax in small tiles, avoiding large intermediates."],
  alt:["왼쪽은 점수 행렬 S와 확률 행렬 P를 HBM에 저장하고 다음 단계에서 다시 읽는 구현이다. 오른쪽 FlashAttention은 입력을 타일로 읽고 온칩에서 점수, exp, Value 가중합을 계산한다. Q를 기준으로 K/V 타일을 순회하며 m,l,a를 유지하고 최종 출력을 쓴다. 캐시와 역전파용 통계 저장을 생략한 순전파 개념도다. 모든 전역 접근이 실제 HBM 전송이라는 뜻이 아니다. 이차 연산량을 선형으로 바꾸는 방법은 아니다.","On the left, score matrix S and probability matrix P are stored in HBM and reread in subsequent stages. FlashAttention on the right reads input tiles and computes scores, exponentials, and Value weighted sums on chip. For each Q tile it traverses K/V tiles, keeps m,l,a, and writes the final output. This conceptual forward path omits caches and saved backward statistics. Not all global-memory accesses imply HBM transfers. Quadratic operation count does not become linear."],
  caption:["큰 S·P 행렬을 저장하지 않고, 타일 안에서 점수·exp·가중합을 이어서 계산합니다.","Instead of storing the large S and P matrices, scores, exponentials, and weighted sums are computed together within each tile."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1246,1104,[48,206]);
    p.el("rect",{x:48,y:209,width:536,height:959,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:245,fill:C.orange,"font-size":27,"font-weight":700,"text-anchor":"middle"},["기본 어텐션","Basic attention"]);
    p.el('text',{x:316,y:277,fill:C.orange,"font-size":20,"font-weight":500,"text-anchor":"middle"},["중간 행렬 저장·읽기","Store and read intermediate matrices"]);
    p.el("rect",{x:78,y:292,width:476,height:70,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:335,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["HBM · 입력 Q / K / V","HBM · Inputs Q / K / V"]);
    p.el("path",{d:"M316,376 L316,423",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:333,y:404,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"start"},["입력 읽기","Read inputs"]);
    p.el("rect",{x:98,y:443,width:436,height:65,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:483.5,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["QKᵀ · 점수 계산","QKᵀ · Compute scores"]);
    p.el("rect",{x:98,y:673,width:436,height:65,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:713.5,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["소프트맥스","Softmax"]);
    p.el("rect",{x:98,y:903,width:436,height:65,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:943.5,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["PV · 출력 계산","PV · Compute output"]);
    p.el("path",{d:"M316,518 L316,541",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el("rect",{x:78,y:550,width:476,height:67,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:591.5,fill:C.orange,"font-size":24,"font-weight":600,"text-anchor":"middle"},["HBM · 큰 점수 행렬 S","HBM · Large score matrix S"]);
    p.el("path",{d:"M316,627 L316,660",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:344,y:653,fill:C.orange,"font-size":19,"font-weight":400,"text-anchor":"start"},["다시 읽기","Read again"]);
    p.el("path",{d:"M316,748 L316,771",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el("rect",{x:78,y:780,width:476,height:67,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:821.5,fill:C.orange,"font-size":(locale==='ko'?24:23),"font-weight":600,"text-anchor":"middle"},["HBM · 큰 확률 행렬 P","HBM · Large probability matrix P"]);
    p.el("path",{d:"M316,857 L316,890",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:344,y:883,fill:C.orange,"font-size":19,"font-weight":400,"text-anchor":"start"},["다시 읽기","Read again"]);
    p.el("path",{d:"M316,980 L316,1064",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:78,y:1080,width:476,height:62,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:316,y:1119,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["HBM · 최종 출력 O","HBM · Final output O"]);
    p.el("rect",{x:616,y:209,width:536,height:959,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:245,fill:C.teal,"font-size":27,"font-weight":700,"text-anchor":"middle"},"FlashAttention");
    p.el('text',{x:884,y:277,fill:C.teal,"font-size":20,"font-weight":500,"text-anchor":"middle"},["타일 단위 계산·누적","Compute and accumulate in tiles"]);
    p.el("rect",{x:646,y:292,width:476,height:70,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:335,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["HBM · 입력 Q / K / V","HBM · Inputs Q / K / V"]);
    p.el("path",{d:"M884,376 L884,423",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:901,y:404,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"start"},["타일로 읽기","Read tiles"]);
    p.el("rect",{x:646,y:443,width:476,height:530,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:884,y:489,fill:C.teal,"font-size":(locale==='ko'?25:23),"font-weight":700,"text-anchor":"middle"},["온칩 메모리 · 타일 단위 실행","On-chip memory · Tile execution"]);
    p.el("rect",{x:674,y:519,width:420,height:62,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:558,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["QKᵀ → 스케일링·마스크","QKᵀ → Scale and mask"]);
    p.el("path",{d:"M884,592 L884,619",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:674,y:637,width:420,height:62,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:676,fill:C.purple,"font-size":(locale==='ko'?24:23),"font-weight":600,"text-anchor":"middle"},["m 갱신 · exp 계산 · ℓ 갱신","Update m · Apply exp · Update ℓ"]);
    p.el("path",{d:"M884,710 L884,737",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:674,y:755,width:420,height:62,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:794,fill:C.teal,"font-size":(locale==='ko'?22:23),"font-weight":600,"text-anchor":"middle"},["a 보정 + exp 값과 V의 곱 누적","Rescale a + accumulate exp × V"]);
    p.el('text',{x:884,y:863,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"middle"},["m · ℓ · a 유지 → 다음 K/V 타일","Keep m, ℓ, a → Next K/V tile"]);
    p.el('text',{x:884,y:925,fill:C.teal,"font-size":25,"font-weight":700,"text-anchor":"middle"},["모든 타일 처리 후 O = a ÷ ℓ","After all tiles: O = a ÷ ℓ"]);
    p.el("path",{d:"M884,985 L884,1064",fill:"none",stroke:C.teal,"stroke-width":3,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:902,y:1032,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"start"},["최종 출력 쓰기","Write final output"]);
    p.el("rect",{x:646,y:1080,width:476,height:62,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:884,y:1119,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["HBM · 최종 출력 O","HBM · Final output O"]);
    p.el("rect",{x:48,y:1206,width:1104,height:149,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:600,y:1256,fill:C.teal,"font-size":30,"font-weight":700,"text-anchor":"middle"},["큰 S·P 행렬의 저장과 재읽기를 피합니다.","Avoid storing and rereading large S and P matrices."]);
    p.el('text',{x:600,y:1307,fill:C.teal,"font-size":24,"font-weight":400,"text-anchor":"middle"},["점수 타일은 계산하고 바로 소비합니다. 타일을 넘어 유지하는 것은 m·ℓ·a입니다.","Compute and consume each score tile. Keep m, ℓ, and a across tiles."]);
    p.el('text',{x:600,y:1404,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["순전파 핵심 경로의 개념도 · 온칩은 공유 메모리와 레지스터 등을 포함","Conceptual forward path · On-chip storage includes shared memory and registers"]);
    p.el('text',{x:600,y:1438,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"middle"},["캐시·역전파용 통계 저장은 생략 · 일반적인 dense Attention의 이차 연산량은 유지","Caches and saved backward statistics omitted · Dense attention remains quadratic"]);
    return [p];
  },
} satisfies FigureSpec;
