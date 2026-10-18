import {Panel,C,L,spec,SZ,math,mat,mop,colW,nameGap,wire,hmat,hmul,type Sizes} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
import {connect,type Wire} from '@llm-systems/viz';
// Three groupings of one head's content score, all from Cᵠ and Cᴷⱽ. They are alternatives with the same result,
// not steps: ①→② moves Wᵁᴷ_h from the key side to the query side (the absorption); ②→③ pre-multiplies the two
// query-side weights. Each grouping is its own panel: a left-to-right row on desktop, a column on mobile, so the
// article can put each one's note right under it. Columns are shared so Q̂_h and the final product line up.
const titles=[L('① Key를 먼저 펼치기','① Expand the Key first'),L('② 흡수: W^{UK}_h를 Q 쪽으로','② Absorb: W^{UK}_h moves to Q'),L('③ 가중치 미리 합치기','③ Pre-merge the weights')];
const axes=[L('내적 축: d_k','dot product over d_k'),L('내적 축: r_{kv} · Key를 펼치지 않음','dot product over r_{kv} · the Key is never expanded'),L('내적 축: r_{kv}','dot product over r_{kv}')];
// Mobile: one grouping as a column. compact keeps only the rows that grouping uses (the mobile figure uses it).
export function phase(l:Locale,k:number,S:Sizes,W:number,compact=false){
 const p=new Panel(l,null,0,W),m=S===SZ.mob,gap=nameGap(S),ws:Wire[]=[];
 const xa=m?44:60,xb=m?276:300,xk=m?212:232,xf=m?140:166,y0=compact?70:110;
 const step=compact?172:0,y1=compact?y0+140:300,y2=compact?(k===2?y1:y1+step+46):536,y3=compact?(k===1?y2+step:y1+step):750;
 const below=(y:number)=>y+16+24+gap,down=(x:number,a:number,b:number)=>ws.push({from:[x,a],to:[x,b],start:'down',end:'down'});
 // A weight from the right of the junction at (x, y).
 const weigh=(x:number,y:number,name:string,r:string,c:string)=>{const w=colW(S,c),wx=x+40+w/2;mat(p,S,wx,y-24,name,r,c,{tone:'purple'});wire(p,[[wx-w/2,y],[x+18,y]],'purple');mop(p,S,x,y);};
 if(!compact)math(p,0,25,titles[k],{size:S.title,weight:600,width:W});
 // In ① Cᴷⱽ sits right above its product with Wᵁᴷ_h so the wire runs straight down.
 const cx=k===0?xk:xb,cq=mat(p,S,xa,y0,'C^Q','T','r_q',{dims:'right'}),c=mat(p,S,cx,y0,'C^{KV}','T','r_{kv}',{dims:'right'});
 let q,kc;
 if(k<2){
  weigh(xa,y1,'W^{UQ}_h','r_q','d_k');down(xa,cq.bottom,y1-17);
  q=mat(p,S,xa,below(y1),'Q^C_h','T','d_k',{dims:'right'});down(xa,y1+16,q.stop);
 }
 if(k===0){
  weigh(xk,y1,'W^{UK}_h','r_{kv}','d_k');down(xk,c.bottom,y1-17);
  kc=mat(p,S,xk,below(y1),'K^C_h','T','d_k',{dims:'right'});down(xk,y1+16,kc.stop);
 }else{
  weigh(xa,y2,k===1?'(W^{UK}_h)^T':'Ŵ^Q_h',k===1?'d_k':'r_q','r_{kv}');down(xa,k===1?q!.bottom:cq.bottom,y2-17);
  // ③'s title already says the weights are merged in advance.
  q=mat(p,S,xa,below(y2),'Q̂_h','T','r_{kv}',{dims:'right'});down(xa,y2+16,q.stop);
 }
 // The last product: the query side from the left (A), the key side from the right, transposed (Bᵀ).
 mop(p,S,xf,y3,'×',{a:'left',b:'right',t:true});
 ws.push({from:[xa,q!.bottom],to:[xf-16,y3],start:'down',end:'right'});
 ws.push(k===0?{from:[xk,kc!.bottom],to:[xf+16,y3],start:'down',end:'left'}:{from:[xb,c.bottom],to:[xf+16,y3],start:'down',end:'left'});
 const s=mat(p,S,xf,below(y3),'S^C_h','T','T',{w:m?64:80,h:m?64:80,dims:'right'});down(xf,y3+16,s.stop);
 math(p,W/2,s.bottom+(m?50:56),axes[k],{size:S.note-2,anchor:'middle',width:W,color:C.muted});
 connect(p,ws);p.height=s.bottom+(m?68:78);return p;
}
// Desktop: one grouping as a row. The query side runs along the top line into the final product (A); the key side
// runs along the lower line and enters that product from below (Bᵀ).
const X={in:80,m1:250,a:400,m2:560,b:700,j:860,s:990};
function row(l:Locale,k:number){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],qy=170,ky=k===0?360:300;
 math(p,0,30,titles[k],{size:S.title,weight:600,width:640});
 math(p,1104,30,axes[k],{size:S.note-2,anchor:'end',width:440,color:C.muted});
 const right=(m:{x:number;width:number},y:number,to:number)=>ws.push({from:[m.x+m.width,y],to:[to,y],start:'right',end:'right'});
 const cq=hmat(p,S,X.in,qy,'C^Q','T','r_q'),c=hmat(p,S,X.in,ky,'C^{KV}','T','r_{kv}');
 let q;
 if(k<2){
  right(cq,qy,X.m1-17);hmul(p,S,X.m1,qy,'W^{UQ}_h','r_q','d_k');
  q=hmat(p,S,X.a,qy,'Q^C_h','T','d_k');ws.push({from:[X.m1+16,qy],to:[q.x-6,qy],start:'right',end:'right'});
 }
 if(k===0){
  right(c,ky,X.m1-17);hmul(p,S,X.m1,ky,'W^{UK}_h','r_{kv}','d_k');
  const kc=hmat(p,S,X.a,ky,'K^C_h','T','d_k');ws.push({from:[X.m1+16,ky],to:[kc.x-6,ky],start:'right',end:'right'});
  right(q!,qy,X.j-17);ws.push({from:[kc.x+kc.width,ky],to:[X.j,qy+17],start:'right',end:'up'});
 }else{
  if(k===1){right(q!,qy,X.m2-17);hmul(p,S,X.m2,qy,'(W^{UK}_h)^T','d_k','r_{kv}');}
  else{right(cq,qy,X.m2-17);hmul(p,S,X.m2,qy,'Ŵ^Q_h','r_q','r_{kv}');}
  const qh=hmat(p,S,X.b,qy,'Q̂_h','T','r_{kv}');ws.push({from:[X.m2+16,qy],to:[qh.x-6,qy],start:'right',end:'right'});
  right(qh,qy,X.j-17);ws.push({from:[c.x+c.width,ky],to:[X.j,qy+17],start:'right',end:'up'});
 }
 mop(p,S,X.j,qy,'×',{a:'left',b:'bottom',t:true});
 const s=hmat(p,S,X.s,qy,'S^C_h','T','T',{w:80,h:80});ws.push({from:[X.j+16,qy],to:[s.x-6,qy],start:'right',end:'right'});
 connect(p,ws);p.height=ky+62;return p;
}
export default spec('03-key-absorption',L('Key를 펼치지 않고 같은 점수','The same score without expanding the Key'),L('한 head의 내용 점수 · 같은 결과를 내는 세 계산 순서','Content score of one head · three orders, one result'),L('세 장면 모두 C^Q와 Cᴷⱽ에서 시작한다. Key 확장 가중치를 Query 쪽으로 옮기면 Key를 펼치지 않고 같은 내용 점수를 얻는다. Query 쪽 두 가중치는 미리 하나로 합칠 수도 있다.','All three views start from C^Q and Cᴷⱽ. Moving the key expansion weight to the query side gives the same content score without expanding K. The two query-side weights can also be merged in advance.'),(l,m)=>m?[0,1,2].map(k=>phase(l,k,SZ.mob,328,true)):[0,1,2].map(k=>row(l,k)));
