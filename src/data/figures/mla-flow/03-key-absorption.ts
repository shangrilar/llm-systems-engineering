import {Panel,C,L,embed,spec,SZ,math,mat,mop,colW,nameGap,wire,type Sizes} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
import {connect,type Wire} from '@llm-systems/viz';
// Three groupings of one head's content score, all from Cᵠ (top left) and Cᴷⱽ (top right).
// ①→② moves Wᵁᴷ_h from the key side to the query side (the absorption); ②→③ pre-multiplies the two query-side
// weights. Step rows are shared so ②'s second product and ③'s merged product line up.
const titles=[L('① K를 먼저 펼치기','① Expand K first'),L('② 흡수: W^{UK}_h를 Q 쪽으로','② Absorb: W^{UK}_h moves to Q'),L('③ 가중치 미리 합치기','③ Pre-merge the weights')];
const forms=['(C^Q W^{UQ}_h) (C^{KV} W^{UK}_h)^T','((C^Q W^{UQ}_h) (W^{UK}_h)^T) (C^{KV})^T','(C^Q Ŵ^Q_h) (C^{KV})^T'];
const axes=[L('내적 축: d_k','dot product over d_k'),L('내적 축: r_{kv} · K를 펼치지 않음','dot product over r_{kv} · K is never expanded'),L('Ŵ^Q_h = W^{UQ}_h (W^{UK}_h)^T','Ŵ^Q_h = W^{UQ}_h (W^{UK}_h)^T')];
// compact: a scene drawn on its own (mobile pilot). Rows are not shared with the other scenes, so each scene
// keeps only the rows it uses and the long empty wires disappear.
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
 math(p,W/2,s.bottom+(m?50:56),forms[k],{size:m?13:S.dim-1,anchor:'middle',width:W,color:C.ink});
 math(p,W/2,s.bottom+(m?78:88),axes[k],{size:S.note-2,anchor:'middle',width:W,color:k===2?C.purple:C.muted});
 connect(p,ws);p.height=s.bottom+(m?96:110);return p;
}
export default spec('03-key-absorption',L('K를 펼치지 않고 같은 점수','The same score without expanded K'),L('Key absorption · 한 head의 내용 점수','Key absorption · content score of one head'),L('세 장면 모두 C^Q와 Cᴷⱽ에서 시작한다. Key 확장 가중치를 Query 쪽으로 옮기면 K를 펼치지 않고 같은 내용 점수를 얻는다. Query 쪽 두 가중치는 미리 하나로 합칠 수도 있다.','All three views start from C^Q and Cᴷⱽ. Moving the key expansion weight to the query side gives the same content score without expanding K. The two query-side weights can also be merged in advance.'),(l,m)=>{
 const S=m?SZ.mob:SZ.desk,W=m?328:368,phases=[0,1,2].map(k=>phase(l,k,S,W));
 const p=new Panel(l,null,0,m?328:1104);let y=0;
 phases.forEach((a,k)=>{if(m){if(k){y+=24;p.line(0,y-12,328,y-12,C.line,1);}embed(p,a,0,y,`data-phase="${k}"`);y+=a.height;}else embed(p,a,k*368,0,`data-phase="${k}"`);});
 if(!m)y=Math.max(...phases.map(a=>a.height));
 y+=m?8:10;
 p.height=y;return[p];
});
