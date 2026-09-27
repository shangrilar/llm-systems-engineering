import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

function comparison(locale:Locale,name:string,heads:number){
 const p=new Panel(locale,null,790,352),mla=name==='MLA',perToken=mla?5:heads*4;
 p.text(176,36,name,{size:30,weight:700,anchor:'middle',width:352});
 p.text(176,82,mla?['잠재 3 + 위치 2성분','3 latent + 2 positional']: [`KV 헤드 ${heads}개 · K 2 + V 2`,`KV heads: ${heads} · K 2 + V 2`],{size:21,anchor:'middle',width:350,color:C.muted});
 for(let stage=0;stage<2;stage++){
  const T=4+stage,top=stage*350,y=top+214;
  p.text(176,top+128,`T = ${T}`,{size:26,weight:600,anchor:'middle',width:300});
  if(mla){
   p.text(62,top+190,'cₜ',{size:23,anchor:'middle',width:45,color:C.teal});p.text(115,top+190,'kₜᴿ',{size:23,anchor:'middle',width:52,color:C.purple});
   matrix(p,42,y,Array.from({length:T},()=>Array(3).fill(null)),{cellWidth:12,cellHeight:22,gap:3,size:18,tone:'teal',rowLabels:['p₀','p₁','p₂','p₃','p₄'].slice(0,T),rowLabelWidth:30});
   matrix(p,100,y,Array.from({length:T},()=>[null,null]),{cellWidth:12,cellHeight:22,gap:3,size:18,tone:'purple'});
  }else for(let h=0;h<heads;h++){
   const x=42+h*76;p.text(x+30,top+162,`h${h+1}`,{size:21,weight:600,anchor:'middle',width:66,color:C.teal});
   for(let kv=0;kv<2;kv++){
    p.text(x+kv*34+13,top+190,kv===0?'K':'V',{size:19,anchor:'middle',width:30,color:C.teal});
    matrix(p,x+kv*34,y,Array.from({length:T},()=>[null,null]),{cellWidth:12,cellHeight:22,gap:3,size:18,tone:'teal',...(h===0&&kv===0?{rowLabels:['p₀','p₁','p₂','p₃','p₄'].slice(0,T),rowLabelWidth:30}:{})});
   }
  }
  if(stage)p.rect(38,y+100-4,(mla?85:(heads-1)*76+61)+8,30,'none',C.orange,5);
  p.text(176,top+365+(stage?20:0),[`${T*perToken}성분`,`${T*perToken} components`],{size:28,weight:700,anchor:'middle',width:352,color:stage?C.orange:C.ink});
 }
 p.arrow(176,388,176,450,C.muted);p.text(210,424,`+${perToken}`,{size:25,weight:700,color:C.orange,width:130});
 return p;
}
export default {
 articleId:'model-advanced-mla-storage',figureId:'04-cache-growth',number:'ma-02-04',layout:'wide',
 eyebrow:['그림 4 · 토큰 증가와 저장량','Figure 4 · Cache growth comparison'],
 title:['같은 한 토큰, 서로 다른 추가 저장량','One more token, different storage increments'],
 subtitle:['한 요청 · 한 층 · 교육용 설정 · 칸 하나 = 1성분','One request · One layer · Teaching configurations · One cell = one component'],
 captionIn:'article',caption:['MHA와 GQA는 1편의 설정, MLA는 2편의 설정이다. 구조별 저장 대상과 추가량을 비교하며 모델 품질이나 속도를 비교하는 실험은 아니다.','MHA and GQA use Article 1 settings; MLA uses Article 2 settings. This compares stored representations and increments, not measured quality or speed.'],
 alt:['가로로 MHA, GQA, MLA를 비교하고 각 구조에서 위쪽 T=4가 아래쪽 T=5로 이어진다. MHA는 KV 헤드 4개에 K와 V 각 2성분으로 64에서 80성분, GQA는 KV 헤드 2개로 32에서 40성분, MLA는 잠재 3성분과 공유 위치 Key 2성분으로 20에서 25성분이다. 모든 성분 칸은 같은 크기이며 새 p4 행에만 주황 테두리를 표시한다. 추가량은 각각 16,8,5다. 모바일에서는 구조별 비교를 차례로 쌓는다.','MHA, GQA and MLA appear in columns, each progressing vertically from T=4 to T=5. MHA has four KV heads with two K and two V components, growing from 64 to 80; GQA has two KV heads, growing from 32 to 40; MLA stores three latent and two shared positional-key components, growing from 20 to 25. Equal-size cells represent components; only the new p4 row has an orange outline. Increments are 16,8,5. Mobile stacks the three comparisons.'],
 sources:[{label:'GQA',url:'https://arxiv.org/abs/2305.13245'},{label:'DeepSeek-V2 §2.1',url:'https://arxiv.org/html/2405.04434v5#S2.SS1'}],
 panels(locale:Locale,mobile?:boolean){const panels=[comparison(locale,'MHA',4),comparison(locale,'GQA',2),comparison(locale,'MLA',0)];if(mobile)return panels;const p=new Panel(locale,null,790,1120);panels.forEach((item,i)=>p.raw(`<g transform="translate(${i*384},0)">${item.svg()}</g>`));[368,752].forEach(x=>p.line(x,0,x,770,C.line,1));return[p];}
} satisfies FigureSpec;
