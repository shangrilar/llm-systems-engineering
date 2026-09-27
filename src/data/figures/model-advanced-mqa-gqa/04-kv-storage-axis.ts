import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

function mode(locale:Locale,name:string,heads:number){
  const p=new Panel(locale,null,380,352);
  p.text(176,36,name,{size:30,weight:700,anchor:'middle',width:352});
  p.text(176,83,[`KV head ${heads}개`,`KV heads: ${heads}`],{size:23,weight:600,anchor:'middle',width:352});
  for(let h=0;h<heads;h++){
    const x=42+h*76;
    p.text(x+30,135,`h${h+1}`,{size:21,weight:600,anchor:'middle',width:66,color:C.teal});
    for(let kv=0;kv<2;kv++){
      p.text(x+kv*34+13,170,kv===0?'K':'V',{size:19,anchor:'middle',width:30,color:C.teal});
      matrix(p,x+kv*34,194,Array.from({length:4},()=>[null,null]),{cellWidth:12,cellHeight:22,gap:3,tone:'teal',size:18,...(h===0&&kv===0?{rowLabels:['p0','p1','p2','p3'],rowLabelWidth:30}:{})});
    }
  }
  p.text(176,347,[`${heads*16}성분`,`${heads*16} components`],{size:28,weight:700,color:C.teal,anchor:'middle',width:352});
  return p;
}
export default {
  articleId:'model-advanced-mqa-gqa',figureId:'04-kv-storage-axis',number:'ma-01-04',layout:'wide',
  eyebrow:['그림 4 · 저장량 비교','Figure 4 · KV storage'],
  title:['줄어드는 것은 KV head 축입니다','The KV-head axis gets smaller'],
  subtitle:['한 층 · T = 4 · head당 2성분','One layer · T = 4 · Two components per head'],
  captionIn:'article',
  caption:['같은 네 토큰 위치를 저장할 때 KV head 수에 따라 MHA는 64, GQA는 32, MQA는 16성분을 저장합니다.','For the same four token positions, MHA stores 64 components, GQA 32, and MQA 16, according to the number of KV heads.'],
  alt:['T=4에서 MHA, GQA, MQA의 KV 캐시를 동일 크기 칸으로 비교한다. 각 KV head에는 p0부터 p3까지 네 행과 K 두 성분, V 두 성분이 있다. MHA는 4개 head 64성분, GQA는 2개 head 32성분, MQA는 1개 head 16성분이다.','Equal-size cells compare KV caches at T=4. Each KV head has four rows, p0 through p3, with two key and two value components each. MHA has four heads and 64 components; GQA two heads and 32; MQA one head and 16.'],
  sources:[{label:'GQA',url:'https://arxiv.org/abs/2305.13245'}],
  panels(locale:Locale,mobile?:boolean){
    const panels=[mode(locale,'MHA',4),mode(locale,'GQA',2),mode(locale,'MQA',1)];
    if(mobile)return panels;
    const p=new Panel(locale,null,380,1120);
    panels.forEach((item,i)=>p.raw(`<g transform="translate(${i*384},0)">${item.svg()}</g>`));
    [368,752].forEach(x=>p.line(x,0,x,365,C.line,1));
    return [p];
  },
} satisfies FigureSpec;
