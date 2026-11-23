import {Panel,C,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mla-computation',figureId:'02-key-absorption',number:'ma-03-02',
 eyebrow:['그림 3 · Key 연산 재배치','Figure 3 · Reordering the key projection'],
 title:['토큰마다 Key를 펼치는 계산을 없앱니다','Avoid expanding a key for every token'],
 subtitle:['현재 위치 p₃ · 헤드 1 · q = q₃,₁ᶜ · 위치 점수는 그대로','Current p₃ · Head 1 · q = q₃,₁ᶜ · Position scores unchanged'],
 captionIn:'article',caption:['왼쪽은 캐시의 각 행에 동일한 Uᴷ₁을 적용합니다. 오른쪽은 현재 Query 하나에 (Uᴷ₁)ᵀ을 적용하고 캐시 C를 직접 읽습니다. q(CUᴷ₁)ᵀ=(q(Uᴷ₁)ᵀ)Cᵀ이므로 content 점수는 같습니다. 표시한 횟수는 벡터 투영의 수이며 커널 실행 횟수가 아닙니다.','Left: apply the same Uᴷ₁ to every cached row. Right: transform one current query with (Uᴷ₁)ᵀ and read cache C directly. Associativity gives identical content scores. Counts refer to vector projections, not kernel launches.'],
 alt:['헤드 1의 같은 Query와 네 위치 p0에서 p3까지를 비교한다. 왼쪽은 각 cⱼ 1×3을 같은 Uᴷ₁ 3×2로 투영해 네 content Key 1×2를 만들고 Query와 내적한다. 오른쪽은 Query 1×2를 (Uᴷ₁)ᵀ 2×3으로 한 번 변환해 q̃ 1×3을 얻고 네 캐시 행과 직접 내적한다. 네 content 점수는 같다.','For head 1 and positions p0 through p3, the left path projects four cached latents into content keys, then dots them with the current query. The right path projects the query once from 1×2 to 1×3, then dots it directly with the four cached latents. Both produce the same four content scores.'],
 sources:[{label:'DeepSeek-V2 §2.1.2',url:'https://arxiv.org/html/2405.04434v5#S2.SS1'}],
 panels(locale:Locale){
  return [false,true].map(after=>{
   const p=new Panel(locale,after?['B. 현재 Query에 한 번','B. Project one current query']:['A. 각 위치에서 Key 투영','A. Project a key at each position'],1010);
   p.token(145,105,'q · 1×2',230,'blue',56);
   if(after){
    connector(p,[260,169],[260,208],{tone:'blue'});
    p.box(145,216,230,106,'× (Uᴷ₁)ᵀ','2×3','purple');
    connector(p,[260,330],[260,368],{tone:'purple'});
    p.token(145,376,'q̃ · 1×3',230,'blue',56);
    connector(p,[383,404],[418,847],{via:[[495,404],[495,847]],tone:'blue'});
    p.text(260,484,['캐시 C · 4×3','Cache C · 4×3'],{size:23,weight:600,anchor:'middle',width:350,color:C.teal});
    for(let j=0;j<4;j++){
     const y=515+j*67;
     p.text(110,y+33,['p₀','p₁','p₂','p₃'][j],{size:23,anchor:'middle',width:65});
     p.token(170,y,['c₀','c₁','c₂','c₃'][j]+' · 1×3',180,'teal',48);
     connector(p,[358,y+24],[260,807],{via:[[390,y+24],[390,780],[260,780]],tone:'teal'});
    }
   }else{
    connector(p,[383,133],[418,847],{via:[[495,133],[495,847]],tone:'blue'});
    p.text(260,235,['같은 Uᴷ₁ · 4개 위치','Same Uᴷ₁ · Four positions'],{size:23,weight:600,anchor:'middle',width:430,color:C.purple});
    for(let j=0;j<4;j++){
     const y=295+j*115;
     p.text(18,y+34,['p₀','p₁','p₂','p₃'][j],{size:23,anchor:'middle',width:36});
     p.token(45,y,['c₀','c₁','c₂','c₃'][j],85,'teal',58);
     connector(p,[138,y+29],[162,y+29],{tone:'teal'});
     p.token(170,y,'× Uᴷ₁',130,'purple',58);
     connector(p,[308,y+29],[337,y+29],{tone:'purple'});
     p.token(345,y,['k₀,₁ᶜ','k₁,₁ᶜ','k₂,₁ᶜ','k₃,₁ᶜ'][j],105,'orange',58);
     connector(p,[458,y+29],[260,807],{via:[[472,y+29],[472,780],[260,780]],tone:'orange'});
    }
    p.text(87,741,'1×3',{size:22,anchor:'middle',width:100,color:C.teal});
    p.text(235,741,'3×2',{size:22,anchor:'middle',width:130,color:C.purple});
    p.text(397,741,'1×2',{size:22,anchor:'middle',width:100,color:C.orange});
   }
   p.token(110,815,after?'q̃ Cᵀ':'q Kᵀ',300,'blue',64);
   connector(p,[260,887],[260,922],{tone:'blue'});
   p.token(80,930,['같은 content 점수 · 1×4','Same content scores · 1×4'],360,'blue',56);
   return p;
  });
 }
} satisfies FigureSpec;
