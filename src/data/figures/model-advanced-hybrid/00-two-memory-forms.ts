import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hybrid',figureId:'00-two-memory-forms',number:'ma-12-01',
 eyebrow:['그림 1 · 기억하는 방식','Figure 1 · Two forms of memory'],
 title:['같은 토큰을 받아도 기억을 남기는 방식은 다릅니다','The same tokens leave different forms of memory'],
 subtitle:['p₀ → p₃ · 블록 하나 = 토큰 벡터 · 상태의 칸 = 성분','p₀ → p₃ · One token block = one vector · State cells = components'],
 captionIn:'article',caption:['상태 쪽은 동일한 저장소의 시간별 모습입니다. KV 쪽은 p₃까지 처리한 후의 토큰별 기록입니다. 상태에 기록된 정보가 모두 소실되거나 개별 KV를 그대로 복원할 수 있다는 뜻은 아닙니다.','The state column shows snapshots of one store over time. The KV column shows token records retained after p₃. Neither total information loss nor exact recovery of individual KV from the state is implied.'],
 alt:['p0부터 p3까지 입력할 때 2×2 상태는 크기를 유지하며 내용이 바뀐다. KV Attention은 각 입력의 K,V 벡터를 별도 행으로 남겨 네 행을 보관한다.','From p0 through p3, a 2×2 state changes contents without changing size. KV attention retains a separate row of K and V vectors for every token.'],
 sources:[{label:'Linear attention recurrent state',url:'https://arxiv.org/abs/2006.16236'}],
 panels(locale:Locale){return [false,true].map(kv=>{
  const p=new Panel(locale,kv?['B. 토큰별 KV','B. Per-token KV']:['A. 고정 크기 상태','A. Fixed-size state'],870);
  p.text(85,120,['입력','Input'],{anchor:'middle',width:150,weight:600});
  p.text(352,120,kv?['처리 후 보관한 KV','KV retained after p₃']:['같은 상태의 시간별 모습','One state over time'],{anchor:'middle',width:270,weight:600,color:kv?C.purple:C.teal});
  if(kv){p.rect(246,156,218,645,C.purpleFill,C.purple);p.text(300,193,'K',{anchor:'middle',width:80,color:C.purple});p.text(405,193,'V',{anchor:'middle',width:80,color:C.purple});}
  for(let i=0;i<4;i++){
   const y=226+i*150;
   p.token(30,y,`p${['₀','₁','₂','₃'][i]}`,110,'blue',54);
   p.arrow(151,y+27,kv?258:293,y+27,kv?C.purple:C.teal);
   if(kv){p.token(269,y,`k${['₀','₁','₂','₃'][i]}`,66,'purple',54);p.token(369,y,`v${['₀','₁','₂','₃'][i]}`,66,'purple',54);}
   else{
    matrix(p,304,y-12,[[`a${['₁','₂','₃','₄'][i]}`,`b${['₁','₂','₃','₄'][i]}`],[`c${['₁','₂','₃','₄'][i]}`,`d${['₁','₂','₃','₄'][i]}`]],{cellWidth:48,cellHeight:35,gap:6,size:21,tone:'teal'});
    p.text(430,y+28,`S${['₁','₂','₃','₄'][i]}`,{size:23,width:65,color:C.teal});
    if(i<3)p.arrow(355,y+72,355,y+125,C.teal);
   }
  }
  return p;
 });}
} satisfies FigureSpec;
