import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"model-summary",figureId:"01-model-and-block",number:"01-model-and-block",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["모델 전체에서 디코더 블록으로","From the whole model to a decoder block"],
  subtitle:["Embedding부터 LM Head까지, 블록 하나의 내부와 연결합니다.","Connect Embedding and LM Head with the structure inside a block."],
  alt:["왼쪽 전체 모델은 토큰 ID, Embedding, 디코더 블록 N개, 최종 RMSNorm, LM Head와 logits 순서이다. 오른쪽에서는 블록 하나의 Residual stream을 중심으로 RMSNorm과 Attention, RMSNorm과 MLP 또는 MoE의 결과를 두 번 더한다. 블록 안은 T 곱하기 d, logits는 T 곱하기 Vocab size다.","The model runs from token IDs through Embedding, N decoder blocks, final RMSNorm and LM Head to logits. One block is expanded around its residual stream, with RMSNorm plus Attention and RMSNorm plus MLP or MoE as two additive branches. Block states have shape T by d, and logits have shape T by Vocab size."],
  caption:["블록 안에서는 Residual stream이 T × d를 유지하고, Attention과 MLP·MoE의 결과를 두 번 더합니다.", "Inside a block, the residual stream keeps T × d and adds the results of Attention and the MLP or MoE twice."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1261,1104,[48,205]);
    p.el('text',{x:248,y:239,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},["모델 전체","Whole model"]);
    p.el('text',{x:843,y:239,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},["디코더 블록 하나","One decoder block"]);
    p.el("rect",{x:48,y:275,width:400,height:1110,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:535,y:275,width:617,height:1110,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:108,y:310,width:280,height:62,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:248,y:349,fill:C.muted,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰 ID (T개)","Token IDs (T tokens)"]);
    p.el("path",{d:"M248,385 L248,435",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:108,y:450,width:280,height:75,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:248,y:495.5,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Embedding");
    p.el("path",{d:"M248,538 L248,602",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:280,y:581,fill:C.blue,"font-size":22,"font-weight":400,"text-anchor":"start"},"T × d");
    p.el("rect",{x:108,y:615,width:280,height:130,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:248,y:645,fill:C.ink,"font-size":29,"font-weight":600,"text-anchor":"middle"},"Decoder block");
    p.el('text',{x:248,y:672,fill:C.ink,"font-size":20,"font-weight":400,"text-anchor":"middle"},"× N");
    p.el("path",{d:"M400,680 H522",fill:"none",stroke:C.slate,"stroke-width":2.2,"stroke-dasharray":"7 6"});
    p.el('text',{x:467,y:656,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"middle"},["확대","Zoom"]);
    p.el("path",{d:"M248,760 L248,890",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:280,y:837,fill:C.blue,"font-size":22,"font-weight":400,"text-anchor":"start"},"T × d");
    p.el("rect",{x:108,y:905,width:280,height:75,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:248,y:935,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:248,y:962,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},["마지막 정규화","Final normalization"]);
    p.el("path",{d:"M248,994 L248,1064",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:280,y:1036,fill:C.blue,"font-size":22,"font-weight":400,"text-anchor":"start"},"T × d");
    p.el("rect",{x:108,y:1080,width:280,height:80,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:248,y:1128,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"LM Head");
    p.el("path",{d:"M248,1175 L248,1240",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:93,y:1255,width:310,height:85,rx:14,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:248,y:1285,fill:C.orange,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Logits");
    p.el('text',{x:248,y:1312,fill:C.orange,"font-size":20,"font-weight":400,"text-anchor":"middle"},"T × Vocab size");
    p.el("rect",{x:557.5,y:320,width:245,height:72,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:680,y:350,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["블록 입력","Block input"]);
    p.el('text',{x:680,y:377,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"T × d");
    p.el('text',{x:680,y:429,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Residual stream");
    p.el("path",{d:"M680,445 L680,458",fill:"none",stroke:C.blue,"stroke-width":3});
    p.el("circle",{cx:680,cy:458,r:5,fill:C.blue});
    p.el("path",{d:"M680,458 L680,761",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M680,458 H940 V487",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:790,y:500,width:300,height:75,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:940,y:530,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:940,y:557,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},["토큰별 정규화","Normalize each token"]);
    p.el("path",{d:"M940,587 L940,617",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:790,y:630,width:300,height:75,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:940,y:660,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Attention");
    p.el('text',{x:940,y:687,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["그림 2에서 확대","Expanded in Figure 2"]);
    p.el("path",{d:"M940,718 V790 H715",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("circle",{cx:680,cy:790,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M671,790 L689,790",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M680,781 L680,799",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M680,815 L680,850",fill:"none",stroke:C.blue,"stroke-width":3});
    p.el("circle",{cx:680,cy:850,r:5,fill:C.blue});
    p.el("path",{d:"M680,850 L680,1161",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("path",{d:"M680,850 H940 V882",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:790,y:895,width:300,height:75,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:940,y:925,fill:C.teal,"font-size":26,"font-weight":600,"text-anchor":"middle"},"RMSNorm");
    p.el('text',{x:940,y:952,fill:C.teal,"font-size":20,"font-weight":400,"text-anchor":"middle"},["토큰별 정규화","Normalize each token"]);
    p.el("path",{d:"M940,982 L940,1012",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("rect",{x:790,y:1025,width:300,height:75,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:940,y:1055,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["MLP 또는 MoE","MLP or MoE"]);
    p.el('text',{x:940,y:1082,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},["그림 3에서 확대","Expanded in Figure 3"]);
    p.el("path",{d:"M940,1113 V1190 H715",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el("circle",{cx:680,cy:1190,r:23,fill:"white",stroke:C.blue,"stroke-width":3});
    p.el("path",{d:"M671,1190 L689,1190",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M680,1181 L680,1199",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M680,1215 L680,1276",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:557.5,y:1290,width:245,height:72,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:680,y:1320,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["블록 출력","Block output"]);
    p.el('text',{x:680,y:1347,fill:C.blue,"font-size":20,"font-weight":400,"text-anchor":"middle"},"T × d");
    p.el('text',{x:600,y:1450,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["블록에서는 d차원 흐름을 유지하고, 변환 결과를 Residual stream에 더합니다.","The block preserves d dimensions and adds transformations to the residual stream."]);
    return [p];
  },
} satisfies FigureSpec;
