import {Panel,C,grid,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-token-compression',figureId:'01-compression-axes',number:'ma-06-01',
  eyebrow:['그림 1 · 줄어드는 축','Figure 1 · Compression axes'],
  title:['벡터 폭과 읽을 항목 수는 서로 다른 축입니다','Vector width and entry count are different axes'],
  subtitle:['행 = 위치별 항목 · 열 = 벡터 성분 · 같은 8 × 4 격자에서 출발하는 개념도','Rows = position entries · Columns = vector components · Two conceptual views starting from the same 8 × 4 grid'],
  captionIn:'article',caption:['A는 각 위치의 표현을 좁혀 8×2로, B는 인접한 두 위치를 요약해 4×4로 만듭니다. Token-axis 압축은 본 attention이 읽을 항목 수를 줄입니다. 칸 수가 같아도 두 구조의 정보와 계산은 같지 않습니다. 이는 축 비교이며 임의 KV의 무손실 압축이나 실제 모델의 cache 크기를 나타내지 않습니다.','A narrows each position’s representation to produce 8×2. B summarizes each pair of positions to produce 4×4. Token-axis compression reduces the number of entries read by core attention. Equal cell counts do not imply equal information or computation. This compares axes, not lossless compression of arbitrary KV or actual model cache sizes.'],
  alt:['A와 B 위에 같은 8행4열 격자를 반복한다. A 아래는 p0…p7을 유지한8행2열로 성분 수4→2를 주황 강조한다. B 아래는4행4열이며 b0={p0,p1},b1={p2,p3},b2={p4,p5},b3={p6,p7}로 행이 바뀐다. B의 주황 강조는 행 수8→4이다.','Both panels start with an8-row,4-column grid. A keeps positions p0–p7 in an8×2 grid, highlighting components4→2 in orange. B produces a4×4 grid with rows b0={p0,p1},b1={p2,p3},b2={p4,p5},b3={p6,p7}, highlighting rows8→4.'],
  sources:[{label:'DeepSeek-V4 §2.3, sequence-axis KV compression',url:'https://arxiv.org/html/2606.19348v1'},{label:'DeepSeek-V2 §2.1.1, latent KV representation',url:'https://arxiv.org/abs/2405.04434'}],
  panels(locale:Locale){
    return [false,true].map(token=>{
      const p=new Panel(locale,token?['B. 토큰 축: 행 수 축소','B. Token axis: fewer rows']:['A. 표현 축: 벡터 폭 축소','A. Feature axis: narrower vectors'],1210);
      p.text(260,115,['같은 출발점: 8행 × 4성분','Same start: 8 rows × 4 components'],{size:25,weight:600,anchor:'middle',width:510});
      const original=grid(p,270,182,8,4,{cell:40,gap:4,tone:()=> 'teal'});
      for(let i=0;i<8;i++)p.text(244,original.cellY(i)+28,`p${i}`,{size:24,color:C.teal,anchor:'end',width:100});
      for(let j=0;j<4;j++)p.text(original.cellX(j)+20,166,String(j),{size:22,color:C.muted,anchor:'middle',width:35});
      const widthColor=token?C.muted:C.orange,rowColor=token?C.orange:C.muted;
      p.path(`M270 542 V554 H442 V542`,widthColor,2.5);
      p.text(356,592,['4성분','4 components'],{size:24,weight:600,color:widthColor,anchor:'middle',width:230});
      p.path('M461 182 H473 V530 H461',rowColor,2.5);
      p.text(496,362,'8',{size:26,weight:600,color:rowColor,anchor:'middle',width:37});
      p.arrow(356,619,356,667,C.purple);
      p.text(260,713,token?['두 위치 → 한 요약','Two positions → one summary']:['위치마다 더 작은 표현','A smaller vector per position'],{size:25,weight:600,color:C.purple,anchor:'middle',width:510});
      const result=grid(p,token?270:314,763,token?4:8,token?4:2,{cell:40,gap:4,tone:()=> 'purple'});
      for(let i=0;i<(token?4:8);i++)p.text(token?248:288,result.cellY(i)+28,token?`b${i} = {p${2*i}, p${2*i+1}}`:`p${i}`,{size:23,color:C.purple,anchor:'end',width:token?226:100});
      for(let j=0;j<(token?4:2);j++)p.text(result.cellX(j)+20,747,String(j),{size:22,color:C.muted,anchor:'middle',width:35});
      if(token){
        p.path('M461 763 H473 V935 H461',C.orange,2.5);
        p.text(496,855,'4',{size:26,weight:600,color:C.orange,anchor:'middle',width:37});
        p.text(356,1001,['각 요약은 4성분','4 components per summary'],{size:24,color:C.muted,anchor:'middle',width:300});
      }else{
        p.path('M314 1123 V1135 H398 V1123',C.orange,2.5);
        p.text(356,1174,['2성분','2 components'],{size:24,weight:600,color:C.orange,anchor:'middle',width:230});
      }
      p.text(125,1165,token?['행 8 → 4','Rows 8 → 4']:['폭 4 → 2','Width 4 → 2'],{size:27,weight:600,color:C.orange,anchor:'middle',width:225});
      return p;
    });
  },
} satisfies FigureSpec;
