import {Panel,C,matrix,port,connector,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-mqa-gqa',figureId:'03-gqa-groups',number:'ma-01-03',
  eyebrow:['그림 3 · GQA','Figure 3 · GQA'],
  title:['두 Query씩 묶어 KV를 공유합니다','Two queries share each KV group'],
  subtitle:['Query와 출력은 네 개 · 두 묶음의 Key와 Value를 그룹별로 공유','Four queries and outputs · Two KV sets, one per query group'],
  caption:['q1·q2는 KV A를, q3·q4는 KV B를 읽습니다. 네 Query와 출력의 배치는 MQA 그림과 같습니다.','q1 and q2 read KV A; q3 and q4 read KV B. Query and output positions match the MQA figure.'],
  alt:['q1과 q2는 KA/VA를, q3과 q4는 KB/VB를 공유한다. 각 K와 V는 4×2다. 각 Query는 별도의 Attention을 거쳐 o1부터 o4까지 네 출력을 만든다.','q1 and q2 share KA/VA; q3 and q4 share KB/VB. Each K and V is 4×2. Each query runs its own attention computation, producing outputs o1 through o4.'],
  layout:'wide',captionIn:'article',
  sources:[{label:'GQA',url:'https://arxiv.org/abs/2305.13245'}],
  panels(locale:Locale,mobile?:boolean){
    const a=new Panel(locale,null,787,520,[0,68]);
    a.text(12,109,'T = 4 · hkv = 2',{size:24,weight:600,width:255});
    for(let g=0;g<2;g++){
      const y=160+g*300,id=g===0?'A':'B',tone=g===0?'teal':'purple';
      a.rect(14,y,174,290,g===0?C.tealFill:C.purpleFill,C[tone],12);
      a.text(32,y+32,`KV ${id}`,{size:24,weight:600,color:C[tone],width:144});
      a.text(32,y+66,`K${id} [4×2]`,{size:21,weight:600,color:C[tone],width:154});
      matrix(a,67,y+78,Array.from({length:4},()=>[null,null]),{cellWidth:40,cellHeight:18,rowLabels:['p0','p1','p2','p3'],rowLabelWidth:30,size:17,tone});
      a.text(32,y+184,`V${id} [4×2]`,{size:21,weight:600,color:C[tone],width:154});
      matrix(a,67,y+196,Array.from({length:4},()=>[null,null]),{cellWidth:40,cellHeight:18,rowLabels:['p0','p1','p2','p3'],rowLabelWidth:30,size:17,tone});
      a.line(196,y+145,250,y+145,C[tone],2.5);
      a.line(250,207+g*300,250,357+g*300,C[tone],2.5);
    }
    for(let i=0;i<4;i++){
      const y=184+i*150,query={x:326,y:y-80,width:80,height:46},attention={x:288,y,width:156,height:46},output={x:474,y,width:42,height:46};
      a.token(query.x,query.y,`q${i+1}`,80,'blue',46);
      a.box(attention.x,attention.y,attention.width,attention.height,'Attention','','blue');
      a.token(output.x,output.y,`o${i+1}`,42,'orange',46);
      connector(a,port(query,'bottom',.5,6),port(attention,'top',.5,8),{tone:'blue'});
      connector(a,[250,y+23],port(attention,'left',.5,8),{tone:i<2?'teal':'purple'});
      connector(a,port(attention,'right',.5,6),port(output,'left',.5,8),{tone:'orange'});
      a.circle(250,y+23,3.5,i<2?C.teal:C.purple,i<2?C.teal:C.purple);
    }
    a.text(16,795,['2 × (K 4×2 + V 4×2) = 32성분','2 × (K 4×2 + V 4×2) = 32 components'],{size:24,weight:600,width:490});
    if(mobile)return [a];
    const frame=new Panel(locale,null,787,760);
    frame.raw(`<g transform="translate(120,0)">${a.svg()}</g>`);
    return [frame];
  },
} satisfies FigureSpec;
