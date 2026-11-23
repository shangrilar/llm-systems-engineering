import {numbered} from './numbers';
import {Panel,C,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L,MODELS,fmt,tr} from './data';
// SWA in MiMo-V2.6-Pro. r0: the window moves with the current token; KV that leaves it is dropped in that
// layer (teaching window 4, real 128; the current position is inside the window). r1: why MiMo's 10 global
// layers add more per token than Kimi's 24: the per-layer width of what is stored (GQA 8 KV heads × (K 192 +
// V 128) × 2 B = 5,120 B vs MLA latent 512 + shared key 64 = 1,152 B). From the configs.
const W=1104,X0=250,CW=40,G=6;
const cx=(i:number)=>X0+i*(CW+G);
function panel(l:Locale){
 const p=new Panel(l,null,0,W);
 p.raw('<g data-path="r0">');
 p.text(0,30,L('window가 움직이는 방식','How the window moves'),{size:19,weight:700,width:W});
 p.text(0,56,L('SWA 층 하나 · 예시 window 4(실제 128) · 현재 위치를 포함','one SWA layer · example window 4 (real 128) · includes the current position'),{size:15,color:C.muted,width:W});
 [9,10].forEach((t,r)=>{
  const y=90+r*96;
  p.text(X0-14,y+23,l==='en'?`token ${t}`:`토큰 ${t}`,{size:16,weight:700,anchor:'end',width:200});
  for(let i=0;i<=11;i++){
   const inW=i>t-4&&i<=t,future=i>t,gone=i<=t-4;
   p.rect(cx(i),y,CW,34,inW?C.orange:C.paper,future?C.line:inW?C.orange:C.slate,5,gone||future);
   p.text(cx(i)+CW/2,y+23,String(i),{size:14,color:inW?C.paper:future?C.line:C.slate,anchor:'middle',width:CW});
  }
  p.text(cx(t)+CW/2,y+52,L('현재','current'),{size:12,weight:700,anchor:'middle',width:60});
  if(r===1){p.path(`M${cx(6)+CW/2} ${y-6} L${cx(6)+CW/2} ${y-34}`,C.slate,1.6,true,false);p.text(cx(6)+CW/2+10,y-22,L('이번에 window를 벗어남 → 이 층에서 삭제','leaves the window now → dropped in this layer'),{size:13,color:C.slate,width:400});}
 });
 const lx=cx(12)+20;
 p.text(lx,112,L('저장: 최근 4칸에서 멈춤','stored: stops at the last 4'),{size:15,width:W-lx});
 p.text(lx,138,L('읽기: window 안 4칸','read: the 4 in the window'),{size:15,width:W-lx});
 p.raw('</g>');
 // r1: global layer width.
 let y=290;
 p.raw('<g data-path="r1">');
 p.line(0,y,W,y,C.line,1);
 p.text(0,y+34,L('남긴 global 층의 KV 폭','Width of the global layers that remain'),{size:19,weight:700,width:W});
 p.text(0,y+60,L('global 층 수 × 층 하나가 토큰 하나에 남기는 KV = 토큰당 KV 캐시','global layers × KV one layer keeps per token = KV cache per token'),{size:15,color:C.muted,width:W});
 const S=1/80,BX=X0;
 const rows:[string,Label,number,number,Label][]=[
  ['mimo',L('GQA · KV 8 head × (K 192 + V 128) × 2 B','GQA · 8 KV heads × (K 192 + V 128) × 2 B'),10,5120,L('10층','10 layers')],
  ['kimi',L('MLA · (latent 512 + 공유 key 64) × 2 B','MLA · (latent 512 + shared key 64) × 2 B'),24,1152,L('24층','24 layers')]];
 rows.forEach(([k,form,n,b,lay],r)=>{
  const yy=y+100+r*110,m=MODELS.find(x=>x.key===k)!;
  p.text(X0-14,yy+24,tr(l,m.name),{size:16,weight:700,anchor:'end',width:230});
  p.text(X0-14,yy+46,lay,{size:14,color:C.muted,anchor:'end',width:230});
  // One bar whose length is proportional to bytes; thin white lines mark the layer boundaries.
  const end=BX+n*b*S;p.rect(BX,yy+6,end-BX,26,C.blue,C.blue,3);
  for(let i=1;i<n;i++)p.line(BX+i*b*S,yy+7,BX+i*b*S,yy+31,C.paper,1.5);
  p.text(end+10,yy+26,`= ${fmt(n*b)} B`,{size:18,weight:700,color:C.blue,width:200});
  p.text(BX,yy+56,l==='en'?`one segment = one layer: ${fmt(b)} B · `+tr(l,form):`칸 하나 = 층 하나: ${fmt(b)} B · `+tr(l,form),{size:14,color:C.muted,width:W-BX});
 });
 p.raw('</g>');
 p.height=y+300;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'11-swa',number:'open-models-kv-cache-11-swa',layout:'wide',eyebrow:numbered('open-models-kv-cache/11-swa',L('SWA','SWA')),
 title:L('SWA와 남긴 global 층','SWA and the global layers that remain'),
 subtitle:L('MiMo-V2.6-Pro · 70층 중 60층이 SWA','MiMo-V2.6-Pro · 60 of 70 layers are SWA'),
 captionIn:'article',screens:['desktop'],
 caption:L('SWA 층은 현재 위치를 포함한 최근 window의 KV만 남기고 읽는다. MiMo-V2.6-Pro는 global 층이 10개로 Kimi K3의 24개보다 적지만, 층 하나가 토큰 하나에 남기는 KV가 5,120 B로 1,152 B보다 넓어 토큰당 KV 캐시가 더 크다. 블록 폭은 bytes에 비례한다.','An SWA layer keeps and reads only the KV of the recent window, including the current position. MiMo-V2.6-Pro keeps 10 global layers, fewer than Kimi K3’s 24, but each stores 5,120 B per token against 1,152 B, so its KV cache per token is larger. Block widths are proportional to bytes.'),
 alt:L('두 줄. 첫 줄은 토큰 9와 10에서 window 4칸이 한 칸씩 움직이고, 위치 6이 window를 벗어나 그 층에서 삭제되는 모습이다. 둘째 줄은 MiMo-V2.6-Pro의 global 10층 × 5,120 B = 51,200 B와 Kimi K3의 MLA 24층 × 1,152 B = 27,648 B를 bytes에 비례한 블록으로 비교한다.','Two rows. First: at tokens 9 and 10 the 4-cell window moves by one, and position 6 leaves the window and is dropped in that layer. Second: MiMo-V2.6-Pro’s 10 global layers × 5,120 B = 51,200 B against Kimi K3’s 24 MLA layers × 1,152 B = 27,648 B, as blocks proportional to bytes.'),
 sources:[{label:'MiMo-V2.6 technical report · §2.1, Table 1',url:'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL/blob/main/MiMo_V2_6_technical_report.pdf'}],
 panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
