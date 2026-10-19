import {Panel,C,L,spec,SZ,math,mat,mop,colW,nameGap,wire,hmat,hmul,type Sizes} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
import {connect,type Wire} from '@llm-systems/viz';
// Three groupings of one head's output contribution, all from the same P_h (top left) and Cᴷⱽ (top right).
// ①→② applies Wᵁⱽ_h after the weighting (the absorption); ②→③ pre-multiplies the two output-side weights.
// The three are alternatives with the same result, not steps. Each is its own panel: a left-to-right row on desktop
// (P_h on the top line, Cᴷⱽ on the lower line entering the weighting from below), a column on mobile.
const titles=[L('① Value를 먼저 펼치기','① Expand the Value first'),L('② 흡수: W^{UV}_h를 가중합 뒤로','② Absorb: W^{UV}_h after weighting'),L('③ 가중치 미리 합치기','③ Pre-merge the weights')];
const axes=[L('V_h를 [T, d_v]로 만든 뒤 가중합','build V_h as [T, d_v], then weight it'),L('Value를 펼치지 않음 · decode에서는 U_h가 한 행','the Value is never expanded · in decode U_h is one row'),L('decode에서는 U_h가 한 행','in decode U_h is one row')];
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
 math(p,W/2,y.bottom+(m?50:56),axes[k],{size:S.note-2,anchor:'middle',width:W,color:C.muted});
 connect(p,ws);p.height=y.bottom+(m?68:78);return p;
}
const X={in:80,m1:250,a:400,m2:560,b:700,m3:860,y:1000};
function row(l:Locale,k:number){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],py=170,cy=k===0?360:300;
 math(p,0,30,titles[k],{size:S.title,weight:600,width:640});
 math(p,1104,30,axes[k],{size:S.note-2,anchor:'end',width:440,color:C.muted});
 const go=(a:number,b:number,y:number,tone?:'teal')=>ws.push({from:[a,y],to:[b,y],start:'right',end:'right',tone});
 const P=hmat(p,S,X.in,py,'P_h','T','T',{w:64,h:64,tone:'teal'}),c=hmat(p,S,X.in,cy,'C^{KV}','T','r_{kv}');
 // The weighting by P_h: P_h from the left (A), the value side from below (B).
 const wj=k===0?X.m2:X.m1;
 go(P.x+P.width,wj-17,py,'teal');mop(p,S,wj,py,'×',{a:'left',b:'bottom'});
 let z;
 if(k===0){
  go(c.x+c.width,X.m1-17,cy);hmul(p,S,X.m1,cy,'W^{UV}_h','r_{kv}','d_v');
  const v=hmat(p,S,X.a,cy,'V_h','T','d_v');go(X.m1+16,v.x-6,cy);
  ws.push({from:[v.x+v.width,cy],to:[wj,py+17],start:'right',end:'up'});
  z=hmat(p,S,X.b,py,'Z_h','T','d_v');go(wj+16,z.x-6,py);
 }else{
  ws.push({from:[c.x+c.width,cy],to:[wj,py+17],start:'right',end:'up'});
  z=hmat(p,S,X.a,py,'U_h','T','r_{kv}');go(wj+16,z.x-6,py);
  if(k===1){go(z.x+z.width,X.m2-17,py);hmul(p,S,X.m2,py,'W^{UV}_h','r_{kv}','d_v');const zz=hmat(p,S,X.b,py,'Z_h','T','d_v');go(X.m2+16,zz.x-6,py);z=zz;}
 }
 go(z.x+z.width,X.m3-17,py);hmul(p,S,X.m3,py,k===2?'Ŵ^O_h':'W^O_h',k===2?'r_{kv}':'d_v','D');
 const y=hmat(p,S,X.y,py,'Y_h','T','D');go(X.m3+16,y.x-6,py);
 connect(p,ws);p.height=cy+62;return p;
}
export default spec('04-value-absorption',L('Value를 펼치지 않고 같은 출력','The same output without expanding the Value'),L('같은 확률 P_h · 같은 결과를 내는 세 계산 순서','Same probabilities P_h · three orders, one result'),L('Value를 복원하기 전에 latent를 가중합한다. Value 확장과 head별 출력 가중치를 합쳐 같은 출력 기여분을 만든다. 모든 head 기여분을 더하면 최종 출력이다.','Weight the latent before expanding V. Merge the value expansion and the per-head output weight to produce the same contribution. Sum the contributions across heads.'),(l,m)=>m?[0,1,2].map(k=>phase(l,k,SZ.mob,328)):[0,1,2].map(k=>row(l,k)));
