import {Panel,C,L,wire,spec,SZ,math,mat,mop,nameGap,colW,hmat,type Sizes} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
import {connect,flowMatrix,flowWire,junction,type Wire} from '@llm-systems/viz';
// One head's attention in two panels, so the article can put a note under each: ① the two scores, their sum and the
// softmax up to the probabilities P_h, ② P_h weighting V_h, the concatenation of heads and the output projection.
// Desktop draws each as a left-to-right row; ② starts again from P_h instead of a long wire back to the left.
// Mobile keeps the same two parts as columns.
function causal(p:Panel,S:Sizes,cx:number,y:number,w:number){
 const x=cx-w/2;
 p.raw(`<path d="M${x} ${y} L${x+w} ${y} L${x+w} ${y+w} Z" fill="${C.paper}" stroke="${C.line}" stroke-width="1.5"/>`);
 p.line(x,y,x+w,y+w,C.teal,1.5,true);
 p.text(x+w*.7,y+w*.38,'0',{size:S.dim,anchor:'middle',width:24,color:C.muted});
}
// Scale, mask and softmax act on S in one teal box (two lines).
function softmaxBox(p:Panel,S:Sizes,cx:number,y:number,w:number,h:number){
 p.rect(cx-w/2,y,w,h,C.tealFill,C.teal,10);
 math(p,cx,y+h*.4,'÷ √(d_k + d_r)',{size:S.dim,anchor:'middle',color:C.teal,width:w-16,weight:600});
 p.text(cx,y+h*.8,'causal mask → softmax',{size:S.dim,anchor:'middle',color:C.teal,width:w-16,weight:600});
}
const TITLE:Label[]=[L('① 두 점수를 더해 확률까지','① Two scores to probabilities'),L('② 확률로 Value를 가중합하고 출력 투영','② Weight the Value, then project')];
// A second operand that enters a product from above (an activation, so not purple).
function above(p:Panel,S:Sizes,cx:number,cy:number,name:string,col:string,tone:'blue'|'teal'){
 flowMatrix(p,S,cx,cy-94,name,'T',col,{w:colW(S,col),tone,dims:'right'});flowWire(p,[[cx,cy-46],[cx,cy-17]],tone);
}
function scores(l:Locale){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],y1=170,y2=380,ym=(y1+y2)/2;
 math(p,0,30,TITLE[0],{size:S.title,weight:600,width:620});
 math(p,1104,30,L('투영 출력에서 head h 열을 고름','take the head-h columns of the projections'),{size:S.note-2,anchor:'end',width:460,color:C.muted});
 const go=(a:[number,number],b:[number,number],start:'right'|'down'|'up',end:'right'|'down'|'up',tone:'blue'|'teal'='blue')=>ws.push({from:a,to:b,start,end,tone});
 math(p,0,y1+6,L('내용','content'),{size:S.note,weight:600,width:80,color:C.blue});
 math(p,0,y2+6,L('위치','rotary'),{size:S.note,weight:600,width:80,color:C.teal});
 const qc=hmat(p,S,140,y1,'Q^C_h','T','d_k'),qr=hmat(p,S,140,y2,'Q^R_h','T','d_r',{tone:'teal'});
 above(p,S,280,y1,'K^C_h','d_k','blue');junction(p,S,280,y1,'×',{a:'left',b:'top',t:true});
 above(p,S,280,y2,'K^R','d_r','teal');junction(p,S,280,y2,'×',{a:'left',b:'top',t:true});
 math(p,280,y2+64,L('K^R는 모든 head가 공유','every head shares K^R'),{size:S.note-2,anchor:'middle',width:260,color:C.teal});
 go([qc.x+qc.width,y1],[263,y1],'right','right');go([qr.x+qr.width,y2],[263,y2],'right','right','teal');
 const px=480;mop(p,S,px,ym,'+');
 go([296,y1],[px,ym-17],'right','down');go([296,y2],[px,ym+17],'right','up','teal');
 const s=hmat(p,S,600,ym,'S_h','T','T',{w:80,h:80});go([px+16,ym],[s.x-6,ym],'right','right');
 const bw=240,bh=74,bx=815;softmaxBox(p,S,bx,ym-bh/2,bw,bh);go([s.x+s.width,ym],[bx-bw/2-2,ym],'right','right');
 const P=hmat(p,S,1030,ym,'P_h','T','T',{w:80,h:80,tone:'teal'});causal(p,S,1030,ym-40,80);
 go([bx+bw/2,ym],[P.x-6,ym],'right','right','teal');
 connect(p,ws);p.height=y2+84;return p;
}
function output(l:Locale){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],y=180;
 math(p,0,30,TITLE[1],{size:S.title,weight:600,width:620});
 const go=(a:number,b:number,tone:'blue'|'teal'='blue')=>ws.push({from:[a,y],to:[b,y],start:'right',end:'right',tone});
 const P=hmat(p,S,80,y,'P_h','T','T',{w:80,h:80,tone:'teal'});causal(p,S,80,y-40,80);
 math(p,80,y+96,L('①의 P_h','P_h from ①'),{size:S.note-2,anchor:'middle',width:140,color:C.muted});
 above(p,S,260,y,'V_h','d_v','blue');junction(p,S,260,y,'×',{a:'left',b:'top'});
 math(p,296,y-94+28,L('위치 성분 없음','no rotary part'),{size:S.note-2,width:200,color:C.muted});
 go(P.x+P.width,243,'teal');
 const z=hmat(p,S,400,y,'Z_h','T','d_v');go(276,z.x-6);
 [L('모든 head를','join'),L('이어 붙임','all heads')].forEach((t,i)=>math(p,511,y-40+i*22,t,{size:S.note-2,anchor:'middle',width:150,color:C.muted}));
 const zc=hmat(p,S,700,y,'Z_{cat}','T','H·d_v',{heads:true});go(z.x+z.width,zc.x-6);
 const ww=colW(S,'D');flowMatrix(p,S,880,y-94,'W^O','H·d_v','D',{w:ww,tone:'purple',dims:'right'});wire(p,[[880,y-46],[880,y-17]],'purple');mop(p,S,880,y);
 go(zc.x+zc.width,863);
 const out=hmat(p,S,1052,y,'Y','T','D',{w:100});go(896,out.x-6);
 connect(p,ws);p.height=y+110;return p;
}
// Mobile: the same two parts as columns (content on the left, rotary on the right, then down).
function mobile(l:Locale,part:0|1){
 const S=SZ.mob,gap=nameGap(S),W=328,cx=W/2,p=new Panel(l,null,0,W),ws:Wire[]=[];
 const to=(a:[number,number],b:[number,number],start:'down',end:'down'|'left'|'right',tone:'blue'|'teal'='blue')=>ws.push({from:a,to:b,start,end,tone});
 const after=(y:number)=>y+16+24+gap,down=(x:number,from:number,y:number,tone:'blue'|'teal'='blue')=>to([x,from],[x,y-gap],'down','down',tone);
 const join=(a:[number,number],b:[number,number],x:number,y:number,ta:'blue'|'teal',tb:'blue'|'teal',t:boolean)=>{
  ws.push({from:a,to:[x-16,y],start:'down',end:'right',tone:ta},{from:b,to:[x+16,y],start:'down',end:'left',tone:tb});mop(p,S,x,y,'×',t?{a:'left',b:'right',t:true}:undefined);};
 math(p,0,24,TITLE[part],{size:S.title,weight:600,width:W});
 const sw=80,dims='right' as const;
 if(part===0){
  math(p,0,52,L('투영 출력에서 head h 열을 고름','take the head-h columns of the projections'),{size:S.note-2,width:W,color:C.muted});
  const g={c:80,r:248,qc:36,kc:124,qr:204,kr:292,y:150,j:242,s:300};
  math(p,g.c,96,L('내용','content'),{size:S.title,weight:600,anchor:'middle',width:160,color:C.blue});
  math(p,g.r,96,L('위치','rotary'),{size:S.title,weight:600,anchor:'middle',width:160,color:C.teal});
  mat(p,S,g.qc,g.y,'Q^C_h','T','d_k',{dims});mat(p,S,g.kc,g.y,'K^C_h','T','d_k',{dims});
  mat(p,S,g.qr,g.y,'Q^R_h','T','d_r',{tone:'teal',dims});mat(p,S,g.kr,g.y,'K^R','T','d_r',{tone:'teal',dims});
  join([g.qc,g.y+48],[g.kc,g.y+48],g.c,g.j,'blue','blue',true);join([g.qr,g.y+48],[g.kr,g.y+48],g.r,g.j,'teal','teal',true);
  to([g.c,g.j+16],[cx-16,g.s],'down','right');to([g.r,g.j+16],[cx+16,g.s],'down','left','teal');mop(p,S,cx,g.s,'+');
  const sy=after(g.s);down(cx,g.s+16,sy);mat(p,S,cx,sy,'S_h','T','T',{w:sw,h:sw,dims});
  const by=sy+sw+42,bw=260,bh=66;to([cx,sy+sw],[cx,by],'down','down');softmaxBox(p,S,cx,by,bw,bh);
  const py=by+bh+44+gap;to([cx,by+bh],[cx,py-gap],'down','down','teal');
  mat(p,S,cx,py,'P_h','T','T',{w:sw,h:sw,tone:'teal',dims});causal(p,S,cx,py,sw);
  connect(p,ws);p.height=py+sw+34;return p;
 }
 const pc=90,vc=254,py=110;
 mat(p,S,pc,py,'P_h','T','T',{w:sw,h:sw,tone:'teal',dims});causal(p,S,pc,py,sw);
 math(p,pc,py-gap-30,L('①의 P_h','P_h from ①'),{size:S.note-2,anchor:'middle',width:140,color:C.muted});
 mat(p,S,vc,py,'V_h','T','d_v',{dims});
 math(p,vc,py-gap-30,L('위치 성분 없음','no rotary part'),{size:S.note-2,anchor:'middle',width:150,color:C.muted});
 const j=py+sw+44;join([pc,py+sw],[vc,py+48],cx,j,'teal','blue',false);
 const zy=after(j);down(cx,j+16,zy);mat(p,S,cx,zy,'Z_h','T','d_v',{dims});
 const cy=zy+48+90+gap;down(cx,zy+48,cy);
 math(p,cx+12,zy+48+58,L('모든 head를 이어 붙임','join all heads'),{size:S.note-2,color:C.muted,width:150});
 mat(p,S,cx,cy,'Z_{cat}','T','H·d_v',{heads:true,dims});
 const ox=110,wy=cy+48+100,ww=colW(S,'D'),wx=ox+40+ww/2;
 to([cx,cy+48],[ox,wy-17],'down','down');
 mat(p,S,wx,wy-24,'W^O','H·d_v','D',{tone:'purple'});wire(p,[[wx-ww/2,wy],[ox+18,wy]],'purple');mop(p,S,ox,wy);
 const yy=after(wy);down(ox,wy+16,yy);mat(p,S,ox,yy,'Y','T','D',{dims});
 connect(p,ws);p.height=yy+48+34;return p;
}
export default spec('02-attention',L('두 점수를 더해 Attention','Add two scores for attention'),L('대표 head h · 내용 점수 + 위치 점수','One head h · content score + rotary score'),L('head h의 내용 성분끼리, 위치 성분끼리 곱한 두 점수를 더한다. 이어 붙인 Query·Key의 내적과 같다. scale, causal mask, softmax 뒤 확률로 Value를 가중합하고, 모든 head 결과를 이어 붙여 출력 투영한다. 상자 폭은 열 차원의 크기 순서를 따른다.','For head h, multiply content parts and rotary parts separately and add the two scores, which equals the dot product of the concatenated Q and K. After scaling, causal masking and softmax, the probabilities weight V. All head outputs are concatenated and projected. Box widths follow the order of column sizes.'),(l,m)=>m?[mobile(l,0),mobile(l,1)]:[scores(l),output(l)]);
