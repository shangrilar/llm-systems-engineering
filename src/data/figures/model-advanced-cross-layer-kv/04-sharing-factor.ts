import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'model-advanced-cross-layer-kv',figureId:'04-sharing-factor',number:'cla-04',
  eyebrow:['그림 4 · 공유하는 층 수','Figure 4 · Layers per shared bank'],
  title:['CLA2와 CLA3: 같은 여섯 층, 다른 KV 묶음 수','CLA2 and CLA3: six layers, fewer KV banks'],
  subtitle:['교육용 6층 · T = 4 · hkv = 1 · dh = 2 · 파란 선: 순차 hidden 경로','Six-layer example · T = 4 · hkv = 1 · dh = 2 · Blue: sequential hidden flow'],
  captionIn:'article',caption:['공유 인자는 같은 KV를 읽는 층 수입니다. CLA2는 L1/L3/L5, CLA3는 L1/L4가 생산자입니다. 각 bank의 네 토큰 위치는 그대로이며, 모든 층의 Q와 attention도 유지됩니다. 같은 KV 폭을 가정한 교육용 저장량입니다.','The sharing factor counts layers reading one bank. Producers are L1/L3/L5 for CLA2 and L1/L4 for CLA3. Every bank retains all four token positions, and all six layers retain Q and attention. Storage counts assume equal KV widths.'],
  alt:['CLA2는 두 층씩 공유해 세 KV 묶음 48성분, CLA3는 세 층씩 공유해 두 묶음 32성분이다. 두 구조 모두 여섯 Query와 attention을 순서대로 계산하고 각 묶음의 토큰 수는 네 개다.','CLA2 shares across pairs: three banks, 48 components. CLA3 shares across triples: two banks, 32 components. Both compute six Queries and attention operations in sequence, with four positions per bank.'],
  sources:[{label:'CLA Figure 2 and §2.2',url:'https://arxiv.org/html/2405.12981v1#S2.F2'}],
  panels(locale:Locale){
    return [2,3].map(factor=>{
      const p=new Panel(locale,[`CLA${factor} · ${factor}개 층이 한 묶음 읽기`,`CLA${factor} · ${factor} layers read one bank`],1320);
      for(let i=0;i<6;i++){
        const y=130+i*160,producer=Math.floor(i/factor)*factor+1;
        p.box(20,y,225,106,`L${i+1} · Q${i+1}`,`Attn${i+1} (KV-L${producer})`,'blue');
        if(i<5)p.arrow(132,y+116,132,y+150,C.blue);
        if(i%factor===0){
          const first=y+53,last=first+(factor-1)*160,center=(first+last)/2,by=center-90;
          p.rect(330,by,180,180,C.tealFill,C.teal);
          p.text(420,by+30,`KV-L${producer}`,{size:24,weight:600,color:C.teal,anchor:'middle',width:170});
          p.text(420,by+62,'K + V',{size:22,color:C.teal,anchor:'middle',width:170});
          for(let r=0;r<4;r++){
            p.text(355,by+89+r*22,`p${r}`,{size:18,color:C.teal,anchor:'middle',width:40});
            for(let c=0;c<4;c++)p.rect(380+c*28,by+75+r*22,22,16,C.paper,C.teal,2);
          }
          p.line(320,center,285,center,C.teal,2.5);p.line(285,first,285,last,C.teal,2.5);
          for(let j=0;j<factor;j++)p.arrow(285,first+j*160,255,first+j*160,C.teal);
        }
      }
      p.arrow(132,1046,132,1090,C.blue);p.text(132,1130,'h₇',{size:27,weight:600,color:C.blue,anchor:'middle',width:160});
      p.text(370,1130,`${6/factor} × 16 = ${96/factor}`,{size:27,weight:600,color:C.teal,anchor:'middle',width:290});
      p.text(260,1210,'K[4×2] + V[4×2] = 16',{size:25,weight:600,anchor:'middle',width:500});
      p.text(260,1270,['한 칸 = 한 성분 · 한 묶음 = 네 위치','One cell = one component · Four positions per bank'],{size:22,anchor:'middle',width:500});
      return p;
    });
  },
} satisfies FigureSpec;
