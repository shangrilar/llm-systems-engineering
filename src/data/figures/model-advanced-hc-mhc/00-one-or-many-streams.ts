import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hc-mhc',figureId:'00-one-or-many-streams',number:'ma-13-00',eyebrow:['그림 1','Figure 1'],
 title:['층의 결과를 담는 경로를 넓힐 수 있을까요?','Can we widen the path carrying layer results?'],
 subtitle:['같은 토큰의 깊이 방향 흐름 · 표현 하나는 d차원 벡터','Depth flow for one token · Each representation is a d-dimensional vector'],captionIn:'article',
 caption:['기본 residual은 각 sublayer의 새 출력을 한 stream에 더한다. 다중 stream은 같은 토큰의 여러 d차원 표현을 유지한다. 오른쪽은 보관 구조의 개요이며 읽기·혼합·쓰기는 다음 그림에서 펼친다. stream별 의미 역할이 미리 정해진다는 뜻은 아니다.','A standard residual adds each fresh sublayer output to one stream. Multiple streams retain several d-dimensional representations of the same token. The right panel shows storage only; the next figure expands read, mix and write. Streams have no prescribed semantic roles.'],
 alt:['왼쪽에서 e에 f1과 f2가 차례로 더해져 e+f1+f2가 된다. 오른쪽은 각 깊이에서 같은 토큰의 두 표현을 함께 유지하며 층별 연결 상자를 통해 갱신한다.','Left: f1 and f2 are added to e, yielding e+f1+f2. Right: two representations of the same token persist at each depth and update through layer connection boxes.'],
 sources:[{label:'mHC §1, residual and expanded stream',url:'https://arxiv.org/html/2512.24880v1'}],
 panels(locale:Locale){
  const a=new Panel(locale,['A. 한 stream에 누적','A. Accumulate in one stream'],660);
  for(let i=0;i<3;i++){
   const y=115+i*170;a.token(110,y,['e','e + f₁','e + f₁ + f₂'][i],300,'teal',64);
   if(i<2){a.arrow(260,y+74,260,y+107,C.teal);a.circle(260,y+135,20,C.paper,C.teal);a.text(260,y+142,'+',{size:27,anchor:'middle',width:35});a.token(20,y+111,`f${i===0?'₁':'₂'}`,100,'orange',48);a.arrow(130,y+135,230,y+135,C.orange);a.arrow(260,y+158,260,y+163,C.teal);}
  }
  a.text(260,615,['각 층의 새 결과를 같은 벡터에 더함','Each fresh result joins the same vector'],{size:23,anchor:'middle',width:480});
  const b=new Panel(locale,['B. 여러 stream을 유지','B. Retain multiple streams'],660);
  for(let i=0;i<3;i++){
   const y=115+i*170;b.token(65,y,`x₁${['','′','″'][i]}`,165,'teal',64);b.token(290,y,`x₂${['','′','″'][i]}`,165,'teal',64);
   if(i<2){b.arrow(148,y+74,148,y+94,C.teal);b.arrow(373,y+74,373,y+94,C.teal);b.box(65,y+103,390,48,['층별 연결과 갱신','Layer connections and update'],'','blue');b.arrow(148,y+158,148,y+163,C.teal);b.arrow(373,y+158,373,y+163,C.teal);}
  }
  b.text(260,590,['보관하는 표현: d → 2×d','Representations carried: d → 2×d'],{size:24,weight:600,anchor:'middle',width:480});
  b.text(260,631,['어떻게 읽고 갱신할까요?','How do we read and update them?'],{size:23,anchor:'middle',width:480});
  return [a,b];
 }
} satisfies FigureSpec;
