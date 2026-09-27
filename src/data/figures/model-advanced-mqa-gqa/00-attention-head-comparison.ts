import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

// The three diagrams share query count, coordinates, and KV-bank size.
// Arrows indicate which stored KV each query reads, rather than a projection.
function method(locale:Locale,name:string,groups:readonly (readonly number[])[],kvNames:readonly string[]){
  const p=new Panel(locale,null,465,352);
  p.text(176,36,name,{size:30,weight:700,anchor:'middle',width:352});
  p.text(176,81,[`${4/groups.length}개 Query : 1개 KV head`,`${4/groups.length} ${groups.length===4?'query':'queries'} : 1 KV head`],{size:21,weight:600,anchor:'middle',width:352});
  const xs=[50,134,218,302];
  xs.forEach((x,i)=>p.token(x-30,118,`q${i+1}`,60,'blue',46));
  groups.forEach((group,g)=>{
    const cx=group.reduce((sum,h)=>sum+xs[h],0)/group.length;
    // Separate landing points make sharing visible without overlapping arrowheads.
    group.forEach((head,i)=>p.arrow(xs[head],172,cx+(i-(group.length-1)/2)*15,267,C.blue));
    p.rect(cx-34,278,68,116,C.tealFill,C.teal,10);
    p.text(cx,319,`K${kvNames[g]}`,{size:22,weight:600,color:C.teal,anchor:'middle',width:64});
    p.line(cx-22,335,cx+22,335,C.teal,1);
    p.text(cx,371,`V${kvNames[g]}`,{size:22,weight:600,color:C.teal,anchor:'middle',width:64});
  });
  p.text(176,446,[`KV head ${groups.length}개`,`KV heads: ${groups.length}`],{size:24,weight:600,color:C.teal,anchor:'middle',width:352});
  return p;
}

export default {
  articleId:'model-advanced-mqa-gqa',figureId:'00-attention-head-comparison',number:'ma-01-00',
  eyebrow:['도입 비교 · MHA / GQA / MQA','Overview · MHA / GQA / MQA'],
  title:['Query는 네 개, 공유하는 KV는 다릅니다','Four queries, different KV sharing'],
  subtitle:['한 층 · 현재 위치 토큰 · 모든 방식에서 Query head는 4개','One layer · Current token · Four query heads in every method'],
  caption:['MHA는 Query마다 하나, 이 GQA 예시는 Query 두 개마다 하나, MQA는 Query 네 개가 하나의 KV head를 읽습니다. 각 KV head는 p0~p3의 Key와 Value를 모두 저장합니다. GQA 논문 그림 2를 바탕으로 이 글의 head 수에 맞춰 다시 그렸습니다.','MHA uses one KV head per query; this GQA example shares one per two queries; MQA shares one across all four. Each KV head stores keys and values for p0–p3. Redrawn from GQA Figure 2 with this article’s head counts.'],
  alt:['MHA, GQA, MQA를 나란히 비교한다. 세 방식 모두 현재 위치 p3의 q1, q2, q3, q4가 있다. MHA는 q1부터 q4가 각각 K1/V1부터 K4/V4를 읽는다. GQA는 q1과 q2가 KA/VA를, q3과 q4가 KB/VB를 읽는다. MQA는 네 Query 모두 하나의 K/V를 읽는다. 각 KV 묶음은 p0부터 p3까지의 캐시를 뜻한다.','Side-by-side MHA, GQA, and MQA share four queries at position p3. In MHA each query reads its own numbered KV head. In GQA q1 and q2 share KA/VA, while q3 and q4 share KB/VB. In MQA all four queries share one K/V set. Each set represents cached positions p0 through p3.'],
  sources:[{label:'GQA, Figure 2',url:'https://arxiv.org/html/2305.13245v3#S2.F2'}],
  layout:'wide',captionIn:'article',
  panels(locale:Locale,mobile?:boolean){
    const panels=[method(locale,'MHA',[[0],[1],[2],[3]],['1','2','3','4']),method(locale,'GQA',[[0,1],[2,3]],['A','B']),method(locale,'MQA',[[0,1,2,3]],[''])];
    if(mobile)return panels;
    const all=new Panel(locale,null,465,1120);
    panels.forEach((p,i)=>all.raw(`<g transform="translate(${i*384},0)">${p.svg()}</g>`));
    [368,752].forEach(x=>all.line(x,0,x,460,C.line,1));
    return [all];
  },
} satisfies FigureSpec;
