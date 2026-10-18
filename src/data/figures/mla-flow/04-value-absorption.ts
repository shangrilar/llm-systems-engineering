import {Panel,C,L,embed,spec,SZ,math,mat,mop,colW,nameGap,wire,type Sizes} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
import {connect,type Wire} from '@llm-systems/viz';
// Three groupings of one head's output contribution, all from the same P_h (top left) and Cᴷⱽ (top right).
// ①→② applies Wᵁⱽ_h after the weighting (the absorption); ②→③ pre-multiplies the two output-side weights.
// Step rows are shared so Y_h lines up; weights enter from the right.
const titles=[L('① V를 먼저 펼치기','① Expand V first'),L('② 흡수: W^{UV}_h를 가중합 뒤로','② Absorb: W^{UV}_h after weighting'),L('③ 가중치 미리 합치기','③ Pre-merge the weights')];
const forms=['(P_h (C^{KV} W^{UV}_h)) W^O_h','((P_h C^{KV}) W^{UV}_h) W^O_h','(P_h C^{KV}) Ŵ^O_h'];
const axes=[L('V_h를 [T, d_v]로 만든 뒤 가중합','build V_h as [T, d_v], then weight it'),L('[T, r_{kv}]에서 가중합 · V를 펼치지 않음','weight in [T, r_{kv}] · V is never expanded'),L('Ŵ^O_h = W^{UV}_h W^O_h','Ŵ^O_h = W^{UV}_h W^O_h')];
function phase(l:Locale,k:number,S:Sizes,W:number){
 const p=new Panel(l,null,0,W),m=S===SZ.mob,gap=nameGap(S),ws:Wire[]=[];
 const xa=m?44:60,xb=m?276:300,xf=m?140:166,y0=110,y1=300,y2=536,y3=750;
 const sq=m?56:64,below=(y:number)=>y+16+24+gap;
 // A weight from the right of the junction at (x, y).
 const weigh=(x:number,y:number,name:string,r:string,c:string)=>{const w=colW(S,c),wx=x+40+w/2;mat(p,S,wx,y-24,name,r,c,{tone:'purple'});wire(p,[[wx-w/2,y],[x+18,y]],'purple');mop(p,S,x,y);};
 const down=(x:number,a:number,b:number)=>ws.push({from:[x,a],to:[x,b],start:'down',end:'down'});
 math(p,0,25,titles[k],{size:S.title,weight:600,width:W});
 // In ① Cᴷⱽ, V_h and the product with P_h share one column so V comes straight down; only P_h turns in.
 const cx=k===0?xf:xb,P=mat(p,S,xa,y0,'P_h','T','T',{w:sq,h:sq,tone:'teal',dims:'right'}),c=mat(p,S,cx,y0,'C^{KV}','T','r_{kv}',{dims:'right'});
 let z;
 if(k===0){
  // V is expanded above the product, then meets P_h. It arrives from above, so the ports are labeled.
  weigh(xf,y1,'W^{UV}_h','r_{kv}','d_v');const v=mat(p,S,xf,below(y1),'V_h','T','d_v',{dims:'right'});
  down(xf,c.bottom,y1-17);down(xf,y1+16,v.stop);
  mop(p,S,xf,y2,'×',{a:'left',b:'top'});
  ws.push({from:[xa,P.bottom],to:[xf-16,y2],start:'down',end:'right',tone:'teal'},{from:[xf,v.bottom],to:[xf,y2-17],start:'down',end:'down'});
  z=mat(p,S,xf,below(y2),'Z_h','T','d_v',{dims:'right'});down(xf,y2+16,z.stop);
 }else{
  mop(p,S,xf,y1);
  ws.push({from:[xa,P.bottom],to:[xf-16,y1],start:'down',end:'right',tone:'teal'},{from:[xb,c.bottom],to:[xf+16,y1],start:'down',end:'left'});
  z=mat(p,S,xf,below(y1),'U_h','T','r_{kv}',{dims:'right'});down(xf,y1+16,z.stop);
  if(k===1){weigh(xf,y2,'W^{UV}_h','r_{kv}','d_v');down(xf,z.bottom,y2-17);z=mat(p,S,xf,below(y2),'Z_h','T','d_v',{dims:'right'});down(xf,y2+16,z.stop);}

 }
 weigh(xf,y3,k===2?'Ŵ^O_h':'W^O_h',k===2?'r_{kv}':'d_v','D');down(xf,z.bottom,y3-17);
 const y=mat(p,S,xf,below(y3),'Y_h','T','D',{dims:'right'});down(xf,y3+16,y.stop);
 math(p,W/2,y.bottom+(m?50:56),forms[k],{size:m?13:S.dim-1,anchor:'middle',width:W,color:C.ink});
 math(p,W/2,y.bottom+(m?78:88),axes[k],{size:S.note-2,anchor:'middle',width:W,color:k===2?C.purple:C.muted});
 connect(p,ws);p.height=y.bottom+(m?96:110);return p;
}
export default spec('04-value-absorption',L('V를 펼치지 않고 같은 출력','The same output without expanded V'),L('Value + Output absorption · 같은 확률 P','Value + Output absorption · same probabilities P'),L('Value를 복원하기 전에 latent를 가중합한다. Value 확장과 head별 출력 가중치를 합쳐 같은 출력 기여분을 만든다. 모든 head 기여분을 더하면 최종 출력이다.','Weight the latent before expanding V. Merge the value expansion and the per-head output weight to produce the same contribution. Sum the contributions across heads.'),(l,m)=>{
 const S=m?SZ.mob:SZ.desk,W=m?328:368,phases=[0,1,2].map(k=>phase(l,k,S,W));
 const p=new Panel(l,null,0,m?328:1104);let y=0;
 phases.forEach((a,k)=>{if(m){if(k){y+=24;p.line(0,y-12,328,y-12,C.line,1);}embed(p,a,0,y,`data-phase="${k}"`);y+=a.height;}else embed(p,a,k*368,0,`data-phase="${k}"`);});
 if(!m)y=Math.max(...phases.map(a=>a.height));
 y+=m?8:10;
 p.height=y;return[p];
});
