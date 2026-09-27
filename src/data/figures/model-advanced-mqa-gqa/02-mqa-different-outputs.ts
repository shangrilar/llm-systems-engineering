import {Panel,C,matrix,port,connector,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-mqa-gqa',figureId:'02-mqa-different-outputs',number:'ma-01-02',
  eyebrow:['그림 2 · MQA','Figure 2 · MQA'],
  title:['같은 KV를 읽어도 출력은 다릅니다','Shared KV, different outputs'],
  subtitle:['Query와 출력은 네 개 · 공유하는 것은 한 묶음의 Key와 Value','Four queries and outputs · One shared set of keys and values'],
  caption:['네 Query는 한 묶음의 KV를 공유하며 각자의 출력을 만듭니다.','Four queries share one KV set and produce their own outputs.'],
  alt:['네 Query가 하나의 K 4×2와 V 4×2를 공유한다. 각 Query는 별도의 Attention을 거쳐 o1부터 o4까지 네 출력을 만든다.','Four queries share one 4×2 K and V set. Each query runs its own attention computation, producing outputs o1 through o4.'],
  layout:'wide',captionIn:'article',
  sources:[{label:'GQA',url:'https://arxiv.org/abs/2305.13245'}],
  panels(locale:Locale,mobile?:boolean){
    const a=new Panel(locale,null,742,520,[0,68]);
    a.text(12,109,'T = 4 · hkv = 1',{size:24,weight:600,width:255});
    const bank={x:14,y:160,width:174,height:568};
    a.rect(bank.x,bank.y,bank.width,bank.height,C.tealFill,C.teal,12);
    a.text(32,198,['공유 KV','Shared KV'],{size:24,weight:600,color:C.teal,width:144});
    a.text(43,245,'K [4×2]',{size:23,weight:600,color:C.teal,width:140});
    matrix(a,67,267,Array.from({length:4},()=>[null,null]),{cellWidth:40,cellHeight:36,rowLabels:['p0','p1','p2','p3'],rowLabelWidth:30,size:21});
    a.text(43,483,'V [4×2]',{size:23,weight:600,color:C.teal,width:140});
    matrix(a,67,505,Array.from({length:4},()=>[null,null]),{cellWidth:40,cellHeight:36,rowLabels:['p0','p1','p2','p3'],rowLabelWidth:30,size:21});
    a.line(196,444,250,444,C.teal,2.5);
    a.line(250,207,250,657,C.teal,2.5);
    for(let i=0;i<4;i++){
      const y=184+i*150,query={x:326,y:y-80,width:80,height:46},attention={x:288,y,width:156,height:46},output={x:474,y,width:42,height:46};
      a.token(query.x,query.y,`q${i+1}`,80,'blue',46);
      a.box(attention.x,attention.y,attention.width,attention.height,'Attention','','blue');
      a.token(output.x,output.y,`o${i+1}`,42,'orange',46);
      connector(a,port(query,'bottom',.5,6),port(attention,'top',.5,8),{tone:'blue'});
      connector(a,[250,y+23],port(attention,'left',.5,8),{tone:'teal'});
      connector(a,port(attention,'right',.5,6),port(output,'left',.5,8),{tone:'orange'});
      a.circle(250,y+23,3.5,C.teal,C.teal);
    }
    a.text(16,777,['K 4×2 + V 4×2 = 16성분','K 4×2 + V 4×2 = 16 components'],{size:24,weight:600,width:490});
    if(mobile)return [a];
    const frame=new Panel(locale,null,742,760);
    frame.raw(`<g transform="translate(120,0)">${a.svg()}</g>`);
    return [frame];
  },
} satisfies FigureSpec;
