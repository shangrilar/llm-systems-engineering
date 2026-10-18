import {Panel,C,L,wire,embed,spec,SZ,math,mat,mop,rope,badge,colW,nameGap,type Sizes} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
import {connect,fanOut,type FanTap,type Wire} from '@llm-systems/viz';
const titles=[L('Query 경로','Query path'),L('공유 KV 경로','Shared KV path'),L('공유 위치 Key','Shared rotary key')];
const cached=L('캐시','cached'),rowsNote=L('활성값: 행 = 토큰 · 열 = 특징 / 가중치: [입력, 출력]','activations: rows = tokens · columns = features / weights: [in, out]');
const rowsNoteM=L('행 = 토큰 · 열 = 특징 / 가중치 [입력, 출력]','rows = tokens · cols = features / weights [in, out]');
const widthNote=L('상자 폭은 실제 크기에 비례하지 않음','box widths are not to scale');
const kr=L('모든 head가 같은 K^R','every head uses this K^R'),qr=L('head마다 다른 Q^R','a different Q^R per head');
// Per path: latent column, weight names and the two consumers' columns.
const paths=[{r:'r_q',down:'W^{DQ}',lat:'C^Q',up:['W^{UQ}','Q^C','H·d_k'],side:['W^{QR}','Q^R','H·d_r']},{r:'r_{kv}',down:'W^{DKV}',lat:'C^{KV}',up:['W^{UK}','K^C','H·d_k'],side:['W^{UV}','V','H·d_v']}] as const;
const small=(p:Panel,S:Sizes,x:number,y:number,s:Label,width:number,anchor='start')=>math(p,x,y,s,{size:S.note-2,color:C.muted,width,anchor});

// Desktop: X on the left; three paths run right. Inputs arrive from the left, weights from above.
function desktop(l:Locale){
 const S=SZ.desk,p=new Panel(l,null,1080,1104),bus=80,x1=290,xl=440,x2=630,xo=840,xr=1010;
 const rows=[260,440,620,800,980];
 const weigh=(x:number,cy:number,name:string,r:string,c:string)=>{mat(p,S,x,cy-94,name,r,c,{tone:'purple',dims:'right'});wire(p,[[x,cy-46],[x,cy-17]],'purple');mop(p,S,x,cy);};
 const plane=(x:number,cy:number,name:string,c:string,heads=false)=>mat(p,S,x,cy-24,name,'T',c,{heads});
 // Flow connectors are only declared here and routed after every node is drawn.
 const ws:Wire[]=[],g=(k:number)=>`data-path="${k}"`;
 const to=(a:number,x:number,c:string,cy:number,tone:'blue'|'teal'='blue',k=0)=>ws.push({from:[a,cy],to:[x-colW(S,c)/2-6,cy],start:'right',end:'right',tone,group:g(k)});
 mat(p,S,bus,66,'X','T','D',{dims:'right'});
 small(p,S,170,84,rowsNote,500);small(p,S,170,110,widthNote,600);
 const fan:FanTap[]=[];
 [rows[0],rows[2],rows[4]].forEach((cy,i)=>{fan.push({to:[x1-17,cy],group:g(i)});p.text(bus+20,cy-40,titles[i],{size:S.note,weight:600,width:125});});
 paths.forEach((a,k)=>{
  const cy=rows[k*2],sub=rows[k*2+1];p.raw(`<g data-path="${k}">`);
  weigh(x1,cy,a.down,'D',a.r);to(x1+16,xl,a.r,cy,'blue',k);
  plane(xl,cy,a.lat,a.r);if(k)badge(p,S,xl-36,cy+76,cached);
  const lr=xl+colW(S,a.r)/2;
  ws.push({from:[lr,cy],to:[x2-17,cy],start:'right',end:'right',group:g(k)});
  weigh(x2,cy,a.up[0],a.r,a.up[2]);to(x2+16,xo,a.up[2],cy,'blue',k);plane(xo,cy,a.up[1],a.up[2],true);
  // The latent's second consumer is on the row below; the router picks where the branch turns.
  ws.push({from:[lr,cy],to:[x2-17,sub],start:'right',end:'right',group:g(k)});
  weigh(x2,sub,a.side[0],a.r,a.side[2]);
  if(k){to(x2+16,xo,a.side[2],sub,'blue',k);plane(xo,sub,a.side[1],a.side[2],true);}
  else{
   ws.push({from:[x2+16,sub],to:[xo-48,sub],start:'right',end:'right',group:g(k)});rope(p,S,xo,sub,'below');to(xo+48,xr,a.side[2],sub,'teal',k);
   plane(xr,sub,a.side[1],a.side[2],true);small(p,S,xr,sub+76,qr,240,'middle');
  }
  p.raw('</g>');
 });
 const cy=rows[4],xk=600;p.raw('<g data-path="2">');
 weigh(x1,cy,'W^{KR}','D','d_r');ws.push({from:[x1+16,cy],to:[xl-48,cy],start:'right',end:'right',group:g(2)});rope(p,S,xl,cy,'below');to(xl+48,xk,'d_r',cy,'teal',2);
 plane(xk,cy,'K^R','d_r');badge(p,S,xk+28,cy-44,cached);math(p,xk+50,cy+7,kr,{size:S.note,color:C.muted,width:300});
 p.raw('</g>');fanOut(p,[bus,114],fan);connect(p,ws);return p;
}

// Mobile: the same paths stacked; each starts from X, restated by a small chip after the first.
function lane(l:Locale,kind:number){
 const S=SZ.mob,p=new Panel(l,null,0,328),cx=100,y0=160;
 const weigh=(cy:number,name:string,r:string,c:string)=>{const w=colW(S,c),wx=cx+40+w/2;mat(p,S,wx,cy-24,name,r,c,{tone:'purple'});wire(p,[[cx+40,cy],[cx+18,cy]],'purple');mop(p,S,cx,cy);};
 // Output of the junction at cy: an arrow down to just above the name.
 const ws:Wire[]=[],down=(a:number,b:number,tone:'blue'|'teal'='blue')=>ws.push({from:[cx,a],to:[cx,b],start:'down',end:'down',tone});
 const out=(cy:number,name:string,c:string,o:{heads?:boolean;from?:number;tone?:'blue'|'teal'}={})=>{const y=(o.from??cy+16)+24+nameGap(S);down(o.from??cy+16,y-nameGap(S),o.tone);return mat(p,S,cx,y,name,'T',c,{heads:o.heads,dims:'right'});};
 math(p,cx+16,24,titles[kind],{size:S.title,weight:600,width:212});
 if(kind>0){p.rect(cx-22,44,44,30,C.blueFill,C.blue,6);math(p,cx,65,'X',{size:S.dim,weight:600,anchor:'middle',width:40,color:C.blue});p.text(cx+32,65,L('위와 같은 입력','same input as above'),{size:S.note-2,color:C.muted,width:200});down(74,y0-17);}
 if(kind===2){
  weigh(y0,'W^{KR}','D','d_r');down(y0+16,y0+60);rope(p,S,cx,y0+77,'right');
  const k=out(y0,'K^R','d_r',{from:y0+94,tone:'teal'});badge(p,S,cx+colW(S,'d_r')/2+14,k.y+24,cached);
  small(p,S,cx-40,k.bottom+46,kr,260);connect(p,ws);p.height=k.bottom+60;return p;
 }
 const a=paths[kind];
 weigh(y0,a.down,'D',a.r);const lat=out(y0,a.lat,a.r);if(kind)badge(p,S,cx+colW(S,a.r)/2+14,lat.y+24,cached);
 const y2=lat.bottom+81;down(lat.bottom,y2-17);
 weigh(y2,a.up[0],a.r,a.up[2]);const up=out(y2,a.up[1],a.up[2],{heads:true});
 const y3=up.bottom+81;down(lat.bottom,y3-17);
 weigh(y3,a.side[0],a.r,a.side[2]);
 if(kind){const v=out(y3,a.side[1],a.side[2],{heads:true});connect(p,ws);p.height=v.bottom+34;return p;}
 down(y3+16,y3+60);rope(p,S,cx,y3+77,'right');
 const q=out(y3,a.side[1],a.side[2],{heads:true,from:y3+94,tone:'teal'});small(p,S,cx-60,q.bottom+46,qr,260);
 connect(p,ws);p.height=q.bottom+60;return p;
}
function mobile(l:Locale){
 const S=SZ.mob,p=new Panel(l,null,0,328),lanes=[0,1,2].map(k=>lane(l,k));
 mat(p,S,100,60,"X","T","D",{dims:"right"});
 p.text(164,48,rowsNoteM,{size:S.note-2,color:C.muted,width:164});p.text(164,116,widthNote,{size:S.note-2,color:C.muted,width:164});
 let y=150;wire(p,[[100,108],[100,y+160-17]]);
 lanes.forEach((a,i)=>{if(i){y+=34;p.line(0,y-17,328,y-17,C.line,1);}embed(p,a,0,y,`data-path="${i}"`);y+=a.height;});
 p.height=y;return p;
}
export default spec('01-projections',L('같은 입력에서 갈라지는 MLA','MLA branches from one input'),L('X → 세 갈래 투영 → Q · K · V','X → three projections → Q · K · V'),L('공유 X를 Query latent, KV latent, 위치 Key로 투영한다. 각 latent는 두 가중치로 이어진다. 상자 폭은 열 차원의 크기 순서를 따른다. Cᴷⱽ와 Kᴿ가 캐시에 남고, Kᴿ는 모든 head가 공유한다.','Shared X is projected to a query latent, a KV latent and a rotary key. Each latent feeds two weights. Box widths follow the order of column sizes. Cᴷⱽ and Kᴿ are cached, and every head shares Kᴿ.'),(l,m)=>[m?mobile(l):desktop(l)]);
