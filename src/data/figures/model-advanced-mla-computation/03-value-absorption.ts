import {Panel,C,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mla-computation',figureId:'03-value-absorption',number:'ma-03-03',
 eyebrow:['그림 4 · Value 연산 재배치','Figure 4 · Reordering the value projection'],
 title:['잠재 벡터를 모은 뒤 한 번만 투영합니다','Sum the latents, then project once'],
 subtitle:['현재 위치 p₃ · 헤드 1 · 같은 Attention 가중치 a','Current position p₃ · Head 1 · Same attention weights a'],
 captionIn:'article',caption:['왼쪽은 네 위치의 Value를 각각 만든 뒤 같은 가중치 a로 모읍니다. 오른쪽은 캐시의 잠재 벡터를 먼저 가중합한 뒤 Uⱽ₁을 한 번 적용합니다. a(CUⱽ₁)=(aC)Uⱽ₁이므로 출력은 같습니다. 교육용 잠재 차원 3이 Value 차원 2보다 크므로 모든 중간 벡터가 작아진다는 뜻은 아닙니다.','Left: reconstruct a value at each of four positions, then combine them with weights a. Right: weight and sum cached latents first, then apply Uⱽ₁ once. Associativity gives the same output. The toy latent dimension 3 exceeds the value dimension 2; not every intermediate becomes smaller.'],
 alt:['왼쪽은 네 위치 p0에서 p3의 cⱼ 1×3에 같은 Uⱽ₁ 3×2를 적용해 네 Value 1×2를 만든 뒤 가중합한다. 오른쪽은 동일한 가중치로 네 잠재 벡터를 먼저 모아 z 1×3을 만든 뒤 Uⱽ₁을 한 번 적용한다. 양쪽 출력 o₃,₁ 1×2는 같다.','Left: project each of four cached latents from 1×3 into values of size 1×2, then take their weighted sum. Right: use the same weights to combine latents into z (1×3), then apply the same Uⱽ₁ once. Both yield the same o₃,₁ (1×2).'],
 sources:[{label:'DeepSeek-V2 §2.1.2',url:'https://arxiv.org/html/2405.04434v5#S2.SS1'}],
 panels(locale:Locale){
  return [false,true].map(after=>{
   const p=new Panel(locale,after?['B. 가중합 후 한 번 투영','B. Sum first, then project once']:['A. 각 위치에서 Value 투영','A. Project a value at each position'],1030);
   p.token(145,105,'a · 1×4',230,'blue',56);
   if(after){
    connector(p,[383,133],[418,559],{via:[[495,133],[495,559]],tone:'blue'});
    p.text(260,210,['캐시 C · 4×3','Cache C · 4×3'],{size:23,weight:600,anchor:'middle',width:350,color:C.teal});
    for(let j=0;j<4;j++){
     const y=240+j*62;
     p.text(110,y+33,['p₀','p₁','p₂','p₃'][j],{size:23,anchor:'middle',width:65});
     p.token(170,y,['c₀','c₁','c₂','c₃'][j]+' · 1×3',180,'teal',48);
     connector(p,[358,y+24],[260,519],{via:[[390,y+24],[390,500],[260,500]],tone:'teal'});
    }
    p.token(110,527,'a C = Σⱼ aⱼ cⱼ',300,'blue',64);
    connector(p,[260,599],[260,644],{tone:'blue'});
    p.token(145,652,'z · 1×3',230,'teal',56);
    connector(p,[260,716],[260,761],{tone:'teal'});
    p.box(145,769,230,106,'× Uⱽ₁','3×2','purple');
    connector(p,[260,883],[260,942],{tone:'purple'});
   }else{
    connector(p,[383,133],[418,847],{via:[[495,133],[495,847]],tone:'blue'});
    p.text(260,235,['같은 Uⱽ₁ · 4개 위치','Same Uⱽ₁ · Four positions'],{size:23,weight:600,anchor:'middle',width:430,color:C.purple});
    for(let j=0;j<4;j++){
     const y=295+j*115;
     p.text(18,y+34,['p₀','p₁','p₂','p₃'][j],{size:23,anchor:'middle',width:36});
     p.token(45,y,['c₀','c₁','c₂','c₃'][j],85,'teal',58);
     connector(p,[138,y+29],[162,y+29],{tone:'teal'});
     p.token(170,y,'× Uⱽ₁',130,'purple',58);
     connector(p,[308,y+29],[337,y+29],{tone:'purple'});
     p.token(345,y,['v₀,₁','v₁,₁','v₂,₁','v₃,₁'][j],105,'orange',58);
     connector(p,[458,y+29],[260,807],{via:[[472,y+29],[472,780],[260,780]],tone:'orange'});
    }
    p.text(87,741,'1×3',{size:22,anchor:'middle',width:100,color:C.teal});
    p.text(235,741,'3×2',{size:22,anchor:'middle',width:130,color:C.purple});
    p.text(397,741,'1×2',{size:22,anchor:'middle',width:100,color:C.orange});
    p.token(110,815,'a V = Σⱼ aⱼ vⱼ,₁',300,'blue',64);
    connector(p,[260,887],[260,942],{tone:'blue'});
   }
   p.token(80,950,['같은 출력 o₃,₁ · 1×2','Same output o₃,₁ · 1×2'],360,'orange',56);
   return p;
  });
 }
} satisfies FigureSpec;
