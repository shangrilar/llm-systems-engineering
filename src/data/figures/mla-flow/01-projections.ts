import {Panel,C,L,wire,spec,SZ,math,mat,mop,rope,badge,colW,nameGap,type Sizes} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
import {connect,type Wire} from '@llm-systems/viz';
const titles=[L('Query 경로','Query path'),L('공유 KV 경로','Shared KV path'),L('공유 위치 Key','Shared rotary key')];
const cached=L('캐시','cached');
const kr=L('모든 head가 같은 K^R','every head uses this K^R'),qr=L('head마다 다른 Q^R','a different Q^R per head');
// Per path: latent column, weight names and the two consumers' columns.
const paths=[{r:'r_q',down:'W^{DQ}',lat:'C^Q',up:['W^{UQ}','Q^C','H·d_k'],side:['W^{QR}','Q^R','H·d_r']},{r:'r_{kv}',down:'W^{DKV}',lat:'C^{KV}',up:['W^{UK}','K^C','H·d_k'],side:['W^{UV}','V','H·d_v']}] as const;
const small=(p:Panel,S:Sizes,x:number,y:number,s:Label,width:number,anchor='start')=>math(p,x,y,s,{size:S.note-2,color:C.muted,width,anchor});

// Desktop: one panel per path, each starting from its own copy of X on the left, so the article can put a note
// under each path without cutting through a shared trunk. Inputs arrive from the left, weights from above.
const same=L('위와 같은 입력','same input as above');
function desktop(l:Locale,k:0|1|2){
 const S=SZ.desk,p=new Panel(l,null,0,1104),x0=80,x1=290,xl=440,x2=630,xo=840,xr=1010,cy=170,sub=350;
 const weigh=(x:number,cy:number,name:string,r:string,c:string)=>{mat(p,S,x,cy-94,name,r,c,{tone:'purple',dims:'right'});wire(p,[[x,cy-46],[x,cy-17]],'purple');mop(p,S,x,cy);};
 const plane=(x:number,cy:number,name:string,c:string,heads=false)=>mat(p,S,x,cy-24,name,'T',c,{heads});
 // Flow connectors are only declared here and routed after every node is drawn.
 const ws:Wire[]=[];
 const to=(a:number,x:number,c:string,cy:number,tone:'blue'|'teal'='blue')=>ws.push({from:[a,cy],to:[x-colW(S,c)/2-6,cy],start:'right',end:'right',tone});
 math(p,0,30,titles[k],{size:S.title,weight:600,width:600});
 const X=mat(p,S,x0,cy-24,'X','T','D',{dims:'center'});
 if(k)small(p,S,x0,cy+76,same,200,'middle');
 ws.push({from:[X.x+X.width,cy],to:[x1-17,cy],start:'right',end:'right'});
 if(k===2){
  const xk=600;
  weigh(x1,cy,'W^{KR}','D','d_r');ws.push({from:[x1+16,cy],to:[xl-48,cy],start:'right',end:'right'});rope(p,S,xl,cy,'below');to(xl+48,xk,'d_r',cy,'teal');
  plane(xk,cy,'K^R','d_r');badge(p,S,xk+28,cy-44,cached);math(p,xk+50,cy+7,kr,{size:S.note,color:C.muted,width:300});
  connect(p,ws);p.height=cy+110;return p;
 }
 const a=paths[k];
 weigh(x1,cy,a.down,'D',a.r);to(x1+16,xl,a.r,cy);
 plane(xl,cy,a.lat,a.r);if(k)badge(p,S,xl-36,cy+76,cached);
 const lr=xl+colW(S,a.r)/2;
 ws.push({from:[lr,cy],to:[x2-17,cy],start:'right',end:'right'});
 weigh(x2,cy,a.up[0],a.r,a.up[2]);to(x2+16,xo,a.up[2],cy);plane(xo,cy,a.up[1],a.up[2],true);
 // The latent's second consumer is on the row below; the router picks where the branch turns.
 ws.push({from:[lr,cy],to:[x2-17,sub],start:'right',end:'right'});
 weigh(x2,sub,a.side[0],a.r,a.side[2]);
 if(k){to(x2+16,xo,a.side[2],sub);plane(xo,sub,a.side[1],a.side[2],true);connect(p,ws);p.height=sub+70;return p;}
 ws.push({from:[x2+16,sub],to:[xo-48,sub],start:'right',end:'right'});rope(p,S,xo,sub,'below');to(xo+48,xr,a.side[2],sub,'teal');
 plane(xr,sub,a.side[1],a.side[2],true);small(p,S,xr,sub+76,qr,240,'middle');
 connect(p,ws);p.height=sub+100;return p;
}

// Mobile: the same paths as columns, one panel each; each starts from a small X chip.
function lane(l:Locale,kind:number){
 const S=SZ.mob,p=new Panel(l,null,0,328),cx=100,y0=160;
 const weigh=(cy:number,name:string,r:string,c:string)=>{const w=colW(S,c),wx=cx+40+w/2;mat(p,S,wx,cy-24,name,r,c,{tone:'purple'});wire(p,[[cx+40,cy],[cx+18,cy]],'purple');mop(p,S,cx,cy);};
 // Output of the junction at cy: an arrow down to just above the name.
 const ws:Wire[]=[],down=(a:number,b:number,tone:'blue'|'teal'='blue')=>ws.push({from:[cx,a],to:[cx,b],start:'down',end:'down',tone});
 const out=(cy:number,name:string,c:string,o:{heads?:boolean;from?:number;tone?:'blue'|'teal'}={})=>{const y=(o.from??cy+16)+24+nameGap(S);down(o.from??cy+16,y-nameGap(S),o.tone);return mat(p,S,cx,y,name,'T',c,{heads:o.heads,dims:'right'});};
 math(p,cx+16,24,titles[kind],{size:S.title,weight:600,width:212});
 p.rect(cx-22,44,44,30,C.blueFill,C.blue,6);math(p,cx,65,'X',{size:S.dim,weight:600,anchor:'middle',width:40,color:C.blue});if(kind>0)p.text(cx+32,65,same,{size:S.note-2,color:C.muted,width:200});down(74,y0-17);
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
export default spec('01-projections',L('같은 입력에서 갈라지는 MLA','MLA branches from one input'),L('X에서 Query, 공유 KV latent, 위치 Key를 만드는 세 경로','Three paths from X: the query, the shared KV latent, the rotary key'),L('공유 X를 Query latent, KV latent, 위치 Key로 투영한다. 각 latent는 두 가중치로 이어진다. 상자 폭은 열 차원의 크기 순서를 따른다. Cᴷⱽ와 Kᴿ가 캐시에 남고, Kᴿ는 모든 head가 공유한다.','Shared X is projected to a query latent, a KV latent and a rotary key. Each latent feeds two weights. Box widths follow the order of column sizes. Cᴷⱽ and Kᴿ are cached, and every head shares Kᴿ.'),(l,m)=>m?[0,1,2].map(k=>lane(l,k)):([0,1,2] as const).map(k=>desktop(l,k)));
