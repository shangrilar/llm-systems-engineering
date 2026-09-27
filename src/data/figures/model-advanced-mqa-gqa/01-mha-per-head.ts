import {Panel,C,matrix,port,connector,type Bounds,type FigureSpec,type Locale} from '@llm-systems/viz';

const box=(p:Panel,b:Bounds,label:readonly [string,string]|string,tone:'blue'|'teal'|'gray'|'orange'='blue')=>{
  p.box(b.x,b.y,b.width,b.height,label,'',tone);return b;
};
export default {
  articleId:'model-advanced-mqa-gqa',figureId:'01-mha-per-head',number:'ma-01-01',
  eyebrow:['그림 1 · MHA','Figure 1 · MHA'],
  title:['네 Query가 각자의 KV를 읽습니다','Four queries read their own KV heads'],
  subtitle:['한 층 · 현재 위치 p3 · 과거와 현재 4개 위치 · Query 4개, head당 2성분','One layer · Current position p3 · Four positions · Four queries, two components each'],
  captionIn:'article',
  caption:['MHA는 Query head마다 별도의 KV head를 읽습니다. 네 출력은 합산하지 않고 이어 붙입니다. 이 예의 한 층 KV 캐시는 64성분입니다.','In MHA, each query head reads a separate KV head. The four outputs are concatenated, not added. This layer’s KV cache holds 64 components in this example.'],
  alt:['위에는 토큰 위치 p0부터 p3까지 각 입력 벡터를 하나의 블록으로 나란히 표시한다. 현재 위치 p3의 전체 벡터를 WQ, WK, WV에 각각 곱한다. 아래에는 head 1부터 4까지 행을 나누어 p3의 q1부터 q4, k1부터 k4, v1부터 v4를 각각 2성분으로 표시한다. 현재 Key와 Value는 각 head의 캐시에 추가되며, 각 Query는 자기 head의 p0부터 p3까지 KV를 읽는다. Head 1의 계산과 네 출력의 이어 붙이기를 보여 준다.','The top shows input vectors at token positions p0 through p3, as one unsplit block each. The full vector at current position p3 is multiplied by WQ, WK, and WV. Below, rows are heads 1 through 4, showing their two-component queries, keys, and values at p3. Current keys and values join each head’s cache. Queries read their own cached positions p0 through p3. The remaining panels show head 1 attention and output concatenation.'],
  sources:[{label:'GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints',url:'https://arxiv.org/abs/2305.13245'}],
  panels(locale:Locale){
    const a=new Panel(locale,['1. 토큰에서 head로','1. From tokens to heads'],700);
    for(let i=0;i<4;i++)a.token(24+i*124,120,`p${i}`,100,i===3?'orange':'gray',64);
    a.line(446,192,446,236,C.orange,2.5);
    a.line(175,236,465,236,C.orange,2.5);
    const centers=[175,320,465];
    centers.forEach((cx,j)=>{
      const tone=j===0?'blue':'teal';
      const projection=box(a,{x:cx-49,y:261,width:98,height:50},['× WQ','× WK','× WV'][j],tone);
      connector(a,[cx,236],port(projection,'top',.5,8),{tone:'orange'});
      a.circle(cx,236,3,C.orange,C.orange);
      connector(a,port(projection,'bottom',.5,8),[cx,360],{tone});
    });
    for(let i=0;i<4;i++){
      const y=378+i*75;
      a.text(12,y+27,`Head ${i+1}`,{size:21,weight:600,width:85});
      centers.forEach((cx,j)=>matrix(a,cx-32,y,[[null,null]],{cellWidth:30,cellHeight:36,gap:4,rowLabels:[`${['q','k','v'][j]}${i+1}`],rowLabelWidth:35,size:22,tone:j===0?'blue':'teal'}));
    }

    const b=new Panel(locale,['2. Head마다 별도 KV','2. A separate cache per head'],790);
    b.text(10,100,['K, V: 4 × 2','K, V: 4 × 2'],{size:23,color:C.muted,width:500});
    for(let i=0;i<4;i++){
      const y=200+i*145,tone=i===0?'blue':'gray';
      const qb={x:8,y,width:70,height:46},at={x:202,y,width:154,height:46},ob={x:442,y,width:70,height:46};
      b.token(qb.x,qb.y,`q${i+1}`,70,tone,46);
      const bank=box(b,{x:202,y:y-80,width:154,height:46},`K${i+1} / V${i+1}`,'teal');
      box(b,at,'Attention',tone);b.token(ob.x,ob.y,`o${i+1}`,70,tone,46);
      connector(b,port(qb,'right',.5,7),port(at,'left',.5,8),{tone});
      connector(b,port(bank,'bottom',.5,5),port(at,'top',.5,8),{tone:'teal'});
      connector(b,port(at,'right',.5,7),port(ob,'left',.5,8),{tone});
    }
    b.text(12,737,['4 × (K 4×2 + V 4×2) = 64성분','4 × (K 4×2 + V 4×2) = 64 components'],{size:23,weight:600,width:500});

    const c=new Panel(locale,['3. Head 1의 계산','3. Inside head 1'],710);
    const query=box(c,{x:195,y:102,width:130,height:46},'q1 [2]');
    c.text(70,190,'K1 [4×2]',{size:24,weight:600,color:C.teal,width:185});
    c.text(328,190,'V1 [4×2]',{size:24,weight:600,color:C.teal,width:190});
    const k=matrix(c,70,219,Array.from({length:4},()=>[null,null]),{cellWidth:57,cellHeight:36,rowLabels:['p0','p1','p2','p3'],size:21,tone:r=>r===3?'orange':'teal'});
    const v=matrix(c,330,219,Array.from({length:4},()=>[null,null]),{cellWidth:57,cellHeight:36,size:21,tone:r=>r===3?'orange':'teal'});
    const weights=box(c,{x:70,y:430,width:180,height:86},['점수 → softmax','Scores → softmax']);
    c.text(86,554,['가중치 4개','4 weights'],{size:22,color:C.blue,width:150});
    const sum=box(c,{x:324,y:430,width:178,height:86},['Value 가중합','Weighted values'],'teal');
    const qOut=port(query,'left',.5,8),wIn=port(weights,'left',.3,8);
    connector(c,qOut,wIn,{via:[[18,qOut[1]],[18,wIn[1]]],tone:'blue'});
    const kOut=port(k,'bottom',.5,8);
    connector(c,kOut,[kOut[0],weights.y-8],{tone:'teal'});
    const vOut=port(v,'bottom',.5,8);
    connector(c,vOut,[vOut[0],sum.y-8],{tone:'teal'});
    connector(c,port(weights,'right',.6,8),port(sum,'left',.6,8),{tone:'blue'});
    const output=box(c,{x:324,y:580,width:178,height:46},'o1 [2]','orange');
    connector(c,port(sum,'bottom',.5,8),port(output,'top',.5,8),{tone:'orange'});

    const d=new Panel(locale,['4. 네 출력을 이어 붙이기','4. Concatenate four outputs'],710);
    const outputs=matrix(d,174,150,[['a1','b1'],['a2','b2'],['a3','b3'],['a4','b4']],{cellWidth:78,cellHeight:44,size:23,rowLabels:['o1','o2','o3','o4'],tone:r=>r===0?'blue':r===1?'teal':r===2?'purple':'orange'});
    const concat=box(d,{x:150,y:402,width:208,height:46},'concat','gray');
    connector(d,port(outputs,'bottom',.5,8),port(concat,'top',.5,8),{tone:'gray'});
    const labels=['a1','b1','a2','b2','a3','b3','a4','b4'];
    labels.forEach((s,i)=>d.token(24+i*58,496,s,54,['blue','teal','purple','orange'][Math.floor(i/2)] as 'blue'|'teal'|'purple'|'orange',44));
    connector(d,port(concat,'bottom',.5,8),[254,487],{tone:'gray'});
    const projection=box(d,{x:79,y:600,width:350,height:46},['출력 투영 WO','Output projection WO'],'gray');
    connector(d,[254,548],port(projection,'top',.5,8),{tone:'gray'});
    d.text(24,685,['2+2+2+2 = 8성분','2+2+2+2 = 8 components'],{size:23,weight:600,width:480});
    return [a,b,c,d];
  },
} satisfies FigureSpec;
