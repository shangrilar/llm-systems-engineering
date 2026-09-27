import {Panel,C,port,connector,esc,type FigureSpec,type Locale} from '@llm-systems/viz';

// Q has no matching Unicode superscript; use real SVG typography.
function qLabel(p:Panel,x:number,y:number,before:string,after:string,color:string,size=22){
 p.raw(`<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="${size}" font-weight="600">${esc(before)}<tspan baseline-shift="super" font-size="75%">Q</tspan>${esc(after)}</text>`);
}
export default {
 articleId:'model-advanced-mla-computation',figureId:'00-query-path',number:'ma-03-00',layout:'wide',
 eyebrow:['그림 1 · 현재 토큰의 Query','Figure 1 · Queries for the current token'],
 title:['Query도 content와 위치 부분으로 나눕니다','Queries have content and position parts'],
 subtitle:['행벡터 · 교육용 차원 · 헤드 1·2 확대','Row vectors · Illustrative dimensions · Heads 1–2 shown'],
 captionIn:'article',
 caption:['Query 잠재 벡터 c^Q는 KV 캐시의 c와 별개의 표현입니다. 실제 MLA의 Query 저차원 경로를 교육용 차원으로 표시했습니다. 헤드별 투영은 전체 투영 행렬의 해당 출력 부분입니다.','The query latent c^Q is distinct from the cached KV latent c. This shows MLA’s low-rank query path with illustrative dimensions. Each head projection is its output slice of the full projection matrix.'],
 alt:['현재 위치 p3의 입력 벡터 1×8을 Wᴰ^Q 8×3으로 곱해 Query 잠재 벡터 c^Q 1×3을 만든다. 이를 각 헤드의 U^Q 3×2와 W^Qᴿ 3×2로 투영한다. 전자는 content Query, 후자는 RoPE(p3)를 거친 위치 Query가 된다. 두 Query 부분은 각각 1×2이며 모두 헤드별이다. 위치 Key는 2편처럼 헤드 간 공유한다.','The current p3 input vector (1×8) is multiplied by Wᴰ^Q (8×3) to produce a query latent c^Q (1×3). Each head projects it through U^Q (3×2) for the content query and W^Qᴿ (3×2), followed by RoPE(p3), for the position query. Both parts are 1×2 and head-specific. The position key remains shared across heads, as in Article 2.'],
 sources:[{label:'DeepSeek-V2 equations 12–17',url:'https://arxiv.org/html/2405.04434v5#S2.SS1'}],
 panels(locale:Locale,mobile?:boolean){
  const width=mobile?520:1120,mid=width/2;
  const p=new Panel(locale,null,mobile?1475:950,width);
  p.text(mid,28,['토큰별 입력 벡터 · 1×8','Input vectors · 1×8 each'],{size:23,anchor:'middle',width:width-20,color:C.muted});
  const start=mid-245;
  for(let i=0;i<4;i++)p.token(start+i*130,55,['p₀','p₁','p₂','p₃'][i],100,i===3?'blue':'gray',52);
  const down={x:mid-110,y:175,width:220,height:54};
  p.rect(down.x,down.y,down.width,down.height,C.purpleFill,C.purple,8);
  qLabel(p,mid,down.y+35,'Wᴰ',' · 8×3',C.purple);
  connector(p,[start+440,115],port(down,'top',.5,8),{via:[[start+440,143],[mid,143]],tone:'blue'});
  const c={x:mid-140,y:290,width:280,height:94};
  p.rect(c.x,c.y,c.width,c.height,C.blueFill,C.blue,10);
  qLabel(p,mid,c.y+32,'c',' · 1×3',C.blue);
  p.text(mid,c.y+73,['Query 잠재 벡터','Query latent'],{size:22,anchor:'middle',width:260});
  connector(p,port(down,'bottom',.5,8),port(c,'top',.5,8),{tone:'purple'});
  for(let i=0;i<2;i++){
   const x=mobile?0:20+i*560,y=mobile?460+i*525:460,cx=x+260,idx=i===0?'₁':'₂';
   p.rect(x+20,y,480,460,C.paper,C.line,12);
   p.text(cx,y+38,[`헤드 ${i+1}`,`Head ${i+1}`],{size:26,weight:600,anchor:'middle',width:250});
   const from=port(c,'bottom',.5,8);
   connector(p,from,[cx,y-8],{via:mobile&&i===1?[[mid,421],[8,421],[8,y-24],[cx,y-24]]:[[mid,421],[cx,421]],tone:'blue'});
   qLabel(p,cx,y+82,'c','',C.blue,23);
   const uq={x:x+45,y:y+125,width:185,height:55},qr={x:x+290,y:y+125,width:185,height:55};
   p.rect(uq.x,uq.y,uq.width,uq.height,C.purpleFill,C.purple,8);
   qLabel(p,uq.x+uq.width/2,uq.y+35,'U',`${idx} · 3×2`,C.purple);
   p.rect(qr.x,qr.y,qr.width,qr.height,C.purpleFill,C.purple,8);
   qLabel(p,qr.x+qr.width/2,qr.y+35,'W',`ᴿ${idx} · 3×2`,C.purple);
   for(const b of [uq,qr])connector(p,[cx,y+93],port(b,'top',.5,8),{via:[[cx,y+104],[b.x+b.width/2,y+104]],tone:'blue'});
   const rope={x:qr.x,y:y+220,width:185,height:50};
   p.token(rope.x,rope.y,'RoPE(p₃)',rope.width,'purple',rope.height);
   connector(p,port(qr,'bottom',.5,8),port(rope,'top',.5,8),{tone:'purple'});
   const qc={x:uq.x,y:y+325,width:185,height:94},qR={x:qr.x,y:y+325,width:185,height:94};
   p.box(qc.x,qc.y,qc.width,qc.height,`q${idx}ᶜ · 1×2`,'content','blue');
   p.box(qR.x,qR.y,qR.width,qR.height,`q${idx}ᴿ · 1×2`,['위치','Position'],'blue');
   connector(p,port(uq,'bottom',.5,8),port(qc,'top',.5,8),{tone:'purple'});
   connector(p,port(rope,'bottom',.5,8),port(qR,'top',.5,8),{tone:'purple'});
  }
  return [p];
 }
} satisfies FigureSpec;
