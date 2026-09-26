import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"moe",figureId:"02-router",number:"02-router",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["Router: expert 선택과 가중치 계산","Router: select experts and compute weights"],
  subtitle:["토큰 1 · d = 8 · expert 수 = 4 · Top-2","Token 1 · d = 8 · 4 experts · Top-2"],
  alt:["토큰 1의 d차원 벡터에 8 곱하기 4 라우터 가중치를 곱해 네 점수 [1,0,2,-1]을 얻는다. E1과 E3을 선택하고 Softmax로 약 0.269와 0.731의 가중치를 구한다.","An 8-by-4 router projection gives token 1 four scores [1,0,2,-1]. E1 and E3 are selected, then Softmax assigns weights of approximately 0.269 and 0.731."],
  caption:["설명용 점수입니다. 이 예시에서는 Top-2로 선택한 점수에 Softmax를 적용합니다.","Illustrative scores. This example applies Softmax to the Top-2 selected scores."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1193,1104,[48,205]);
    p.el('text',{x:48,y:238,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"start"},["1. expert별 점수 계산","1. Compute a score for each expert"]);
    p.el("rect",{x:48,y:270,width:1104,height:120,rx:14,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:313,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},"Router projection");
    p.el('text',{x:600,y:358,fill:C.ink,"font-size":30,"font-weight":600,"text-anchor":"middle"},"x₁ (1 × 8)  ×  Wᵣ (8 × 4)  =  r₁ (1 × 4)");
    p.el("rect",{x:48,y:435,width:240,height:110,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:168,y:470,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Expert 1");
    p.el('text',{x:168,y:522,fill:C.ink,"font-size":34,"font-weight":600,"text-anchor":"middle"},"1");
    p.el("rect",{x:336,y:435,width:240,height:110,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:456,y:470,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Expert 2");
    p.el('text',{x:456,y:522,fill:C.ink,"font-size":34,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:624,y:435,width:240,height:110,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:744,y:470,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Expert 3");
    p.el('text',{x:744,y:522,fill:C.ink,"font-size":34,"font-weight":600,"text-anchor":"middle"},"2");
    p.el("rect",{x:912,y:435,width:240,height:110,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1032,y:470,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Expert 4");
    p.el('text',{x:1032,y:522,fill:C.ink,"font-size":34,"font-weight":600,"text-anchor":"middle"},"-1");
    p.el('text',{x:48,y:630,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"start"},["2. Top-2: 큰 점수 두 개 선택","2. Top-2: select the two highest scores"]);
    p.el("rect",{x:180,y:680,width:350,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:355,y:726,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},["Expert 1 (점수 1)","Expert 1 (score 1)"]);
    p.el("rect",{x:670,y:680,width:350,height:76,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:845,y:726,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},["Expert 3 (점수 2)","Expert 3 (score 2)"]);
    p.el("path",{d:"M600,781 L600,820",fill:"none",stroke:C.slate,"stroke-width":2.5,"marker-end":markerUrl(C.slate)});
    p.el('text',{x:48,y:875,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"start"},["3. 선택한 점수에 Softmax 적용","3. Apply Softmax to the selected scores"]);
    p.el("rect",{x:70,y:920,width:495,height:97,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:317.5,y:978,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"E1: e¹ / (e¹ + e²) ≈ 0.269");
    p.el("rect",{x:635,y:920,width:495,height:97,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:882.5,y:978,fill:C.teal,"font-size":27,"font-weight":600,"text-anchor":"middle"},"E3: e² / (e¹ + e²) ≈ 0.731");
    p.el('text',{x:600,y:1090,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["expert별 가중치","Weights for each expert"]);
    p.el("rect",{x:48,y:1120,width:240,height:110,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:168,y:1155,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Expert 1");
    p.el('text',{x:168,y:1202,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"0.269");
    p.el("rect",{x:336,y:1120,width:240,height:110,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:456,y:1155,fill:C.gray,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Expert 2");
    p.el('text',{x:456,y:1202,fill:C.gray,"font-size":30,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:624,y:1120,width:240,height:110,rx:14,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:744,y:1155,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Expert 3");
    p.el('text',{x:744,y:1202,fill:C.teal,"font-size":30,"font-weight":600,"text-anchor":"middle"},"0.731");
    p.el("rect",{x:912,y:1120,width:240,height:110,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1032,y:1155,fill:C.gray,"font-size":22,"font-weight":600,"text-anchor":"middle"},"Expert 4");
    p.el('text',{x:1032,y:1202,fill:C.gray,"font-size":30,"font-weight":600,"text-anchor":"middle"},"0");
    p.el("rect",{x:48,y:1290,width:1104,height:100,rx:14,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:1331,fill:C.blue,"font-size":26,"font-weight":600,"text-anchor":"middle"},["선택한 expert에 이 토큰의 입력을 전달합니다.","Send this token’s input to the selected experts."]);
    p.el('text',{x:600,y:1369,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"middle"},["계산 결과는 위 가중치로 가중합합니다.","Combine their outputs using the weights above."]);
    return [p];
  },
} satisfies FigureSpec;
