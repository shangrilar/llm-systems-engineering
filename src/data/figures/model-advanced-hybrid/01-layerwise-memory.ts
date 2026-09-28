import {Panel,C,grid,type FigureSpec,type Locale,type Label} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hybrid',figureId:'01-layerwise-memory',number:'ma-12-02',layout:'wide',
 eyebrow:['그림 2 · 층의 구성','Figure 2 · Layer composition'],
 title:['일부 층은 상태를 갱신하고 일부 층은 KV를 읽습니다','Some layers update state; others read KV'],
 subtitle:['교육용 6층 · R: 상태 기반 층 · A: KV Attention · 저장소 아이콘은 크기 비교가 아님','Illustrative six-layer models · R: recurrent · A: KV attention · Icons are not memory sizes'],
 captionIn:'article',caption:['세 구성의 층 수는 같다. 혼합 예제는 R1,R2,A3,R4,R5,A6이며 실제 모델의 비율을 재현하지 않는다. 각 층은 별도 기억을 갖는다. FFN, residual과 내부 투영은 생략했다.','All three examples have six layers. The hybrid is R1,R2,A3,R4,R5,A6, not an actual model ratio. Each layer has its own memory. FFN, residual and internal projections are omitted.'],
 alt:['Attention 여섯 층은 모두 KV를, recurrent 여섯 층은 모두 상태를 갖는다. 혼합 구성은 네 상태와 두 KV를 갖는다. 각 구성에서 현재 토큰 표현이 아래에서 위로 흐른다.','Six attention layers each have KV; six recurrent layers each have state. The hybrid has four states and two KV stores. Current-token representations flow upward in each model.'],
 sources:[{label:'Mamba-2 hybrid architecture',url:'https://arxiv.org/html/2405.21060v1#S9.SS2.SSS3'}],
 panels(locale:Locale,mobile?:boolean){
  const names:Label[]=[['Attention만','Attention only'],['상태 기반 층만','Recurrent only'],['하이브리드','Hybrid']];
  const panels=mobile?names.map(n=>new Panel(locale,n,790,520)):[new Panel(locale,null,815,1104)];
  for(let model=0;model<3;model++){
   const p=panels[mobile?model:0],ox=mobile?75:30+model*365,lw=mobile?220:185,cx=ox+(mobile?272:235),mid=ox+lw/2;
   if(!mobile)p.text(ox+140,38,names[model],{size:26,weight:600,anchor:'middle',width:330});
   for(let l=1;l<=6;l++){
    const y=130+(6-l)*92,isA=model===0||(model===2&&l%3===0);
    p.token(ox,y,`${isA?'A':'R'}${l}`,lw,isA?'purple':'teal',62);
    p.line(ox+lw+8,y+31,cx-12,y+31,C.muted,2,true);
    if(isA){for(let r=0;r<4;r++)for(let c=0;c<2;c++)p.rect(cx+c*30,y+9+r*13,24,9,C.purpleFill,C.purple,2);}
    else grid(p,cx,y+7,2,2,{cell:22,gap:7,tone:()=> 'teal'});
    if(l<6)p.arrow(mid,y-8,mid,y-23,C.blue);
   }
   p.token(ox,710,'p₃',lw,'blue',52);p.arrow(mid,698,mid,661,C.blue);
   p.arrow(mid,120,mid,87,C.blue);
  }
  return panels;
 }
} satisfies FigureSpec;
