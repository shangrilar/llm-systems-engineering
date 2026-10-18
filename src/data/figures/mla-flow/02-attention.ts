import {Panel,C,L,wire,spec,SZ,math,mat,mop,nameGap,colW,type Sizes} from './drawing';
import type {Label} from '@llm-systems/viz';
import {connect,type Wire} from '@llm-systems/viz';
// Two operands meet side by side at a product. Ports are labeled only when the right operand is transposed.
function join(p:Panel,S:Sizes,ws:Wire[],a:[number,number],b:[number,number],cx:number,y:number,ta:'blue'|'teal',tb:'blue'|'teal',t:boolean){
 ws.push({from:a,to:[cx-16,y],start:'down',end:'right',tone:ta},{from:b,to:[cx+16,y],start:'down',end:'left',tone:tb});
 mop(p,S,cx,y,'×',t?{a:'left',b:'right',t:true}:undefined);
}
// Causal probabilities: keys after the query row are masked to 0, so only the lower triangle is filled.
function causal(p:Panel,S:Sizes,cx:number,y:number,w:number){
 const x=cx-w/2;
 p.raw(`<path d="M${x} ${y} L${x+w} ${y} L${x+w} ${y+w} Z" fill="${C.paper}" stroke="${C.line}" stroke-width="1.5"/>`);
 p.line(x,y,x+w,y+w,C.teal,1.5,true);
 p.text(x+w*.7,y+w*.38,'0',{size:S.dim,anchor:'middle',width:24,color:C.muted});
}
function lines(p:Panel,S:Sizes,x:number,y:number,a:readonly Label[],o:{anchor?:string;size?:number;color?:string;width:number}){
 a.forEach((s,i)=>math(p,x,y+i*(o.size??S.note)*1.35,s,{size:o.size??S.note,anchor:o.anchor,color:o.color??C.muted,width:o.width}));
}
export default spec('02-attention',L('두 점수를 더해 Attention','Add two scores for attention'),L('대표 head h · 내용 점수 + 위치 점수','One head h · content score + rotary score'),L('head h의 내용 성분끼리, 위치 성분끼리 곱한 두 점수를 더한다. 이어 붙인 Q·K의 내적과 같다. scale, causal mask, softmax 뒤 확률로 V를 가중합하고, 모든 head 결과를 이어 붙여 출력 투영한다. 상자 폭은 열 차원의 크기 순서를 따른다.','For head h, multiply content parts and rotary parts separately and add the two scores, which equals the dot product of the concatenated Q and K. After scaling, causal masking and softmax, the probabilities weight V. All head outputs are concatenated and projected. Box widths follow the order of column sizes.'),(l,m)=>{
 const S=m?SZ.mob:SZ.desk,gap=nameGap(S),W=m?328:1104,cx=W/2,p=new Panel(l,null,0,W);
 // The plane whose name sits just below an arrow that leaves a junction at y.
 // Flow connectors are declared while drawing and routed once every node is in place.
 const ws:Wire[]=[],to=(a:[number,number],b:[number,number],start:'down',end:'down'|'left'|'right',tone:'blue'|'teal'='blue')=>ws.push({from:a,to:b,start,end,tone});
 const after=(y:number)=>y+16+24+gap,down=(x:number,from:number,y:number,tone:'blue'|'teal'='blue')=>to([x,from],[x,y-gap],'down','down',tone);
 const bridge=[L('투영 출력에서 head h 열을 고름','Take the head-h columns of the projections'),L('K^R는 모든 head가 공유','every head shares K^R')];
 if(m)lines(p,S,0,20,bridge,{width:W});else math(p,cx,26,L('투영 출력에서 head h 열을 고름 · K^R는 모든 head가 공유','Take the head-h columns of the projections · every head shares K^R'),{size:S.note,anchor:'middle',color:C.muted,width:W});
 // Content and rotary pairs, each with its own product; the two scores meet at +.
 const g=m?{c:80,r:248,qc:36,kc:124,qr:204,kr:292,y:170,j:262,s:320}:{c:310,r:794,qc:220,kc:400,qr:704,kr:884,y:150,j:250,s:310};
 math(p,g.c,m?86:62,L('내용','content'),{size:S.title,weight:600,anchor:'middle',width:160,color:C.blue});
 math(p,g.r,m?86:62,L('위치','rotary'),{size:S.title,weight:600,anchor:'middle',width:160,color:C.teal});
 const dims='right' as const;
 mat(p,S,g.qc,g.y,'Q^C_h','T','d_k',{dims});mat(p,S,g.kc,g.y,'K^C_h','T','d_k',{dims});
 mat(p,S,g.qr,g.y,'Q^R_h','T','d_r',{tone:'teal',dims});mat(p,S,g.kr,g.y,'K^R','T','d_r',{tone:'teal',dims});
 join(p,S,ws,[g.qc,g.y+48],[g.kc,g.y+48],g.c,g.j,'blue','blue',true);join(p,S,ws,[g.qr,g.y+48],[g.kr,g.y+48],g.r,g.j,'teal','teal',true);
 to([g.c,g.j+16],[cx-16,g.s],'down','right');to([g.r,g.j+16],[cx+16,g.s],'down','left','teal');mop(p,S,cx,g.s,'+');
 const tz=m?13:S.dim;
 math(p,m?g.c-6:g.c+14,m?g.s+24:g.s-10,'Q^C_h (K^C_h)^T',{size:tz,color:C.blue,width:m?110:200});
 math(p,m?g.r+6:g.r-14,m?g.s+24:g.s-10,'Q^R_h (K^R)^T',{size:tz,color:C.teal,anchor:'end',width:m?110:200});
 const sw=m?80:96,sy=after(g.s)+(m?14:0);down(cx,g.s+16,sy);mat(p,S,cx,sy,'S_h','T','T',{w:sw,h:sw,dims});
 lines(p,S,cx+sw/2+(m?16:28),sy+(m?30:42),m?['= [Q^C_h | Q^R_h]','· [K^C_h | K^R]^T']:['= [Q^C_h | Q^R_h] · [K^C_h | K^R]^T'],{size:m?13:S.dim,width:m?110:400});
 // Scale, mask and softmax act on S in one teal step.
 const by=sy+sw+(m?42:50),bw=m?260:300,bh=m?66:74;to([cx,sy+sw],[cx,by],'down','down');
 p.rect(cx-bw/2,by,bw,bh,C.tealFill,C.teal,10);
 math(p,cx,by+(m?27:30),'÷ √(d_k + d_r)',{size:S.dim,anchor:'middle',color:C.teal,width:bw-16,weight:600});
 p.text(cx,by+(m?54:60),'causal mask → softmax',{size:S.dim,anchor:'middle',color:C.teal,width:bw-16,weight:600});
 const pc=m?90:420,vc=m?254:700,py=by+bh+44+gap+(m?44:60);
 to([cx,by+bh],[pc,py-gap],'down','down','teal');
 mat(p,S,pc,py,'P_h','T','T',{w:sw,h:sw,tone:'teal',dims});causal(p,S,pc,py,sw);
 mat(p,S,vc,py,'V_h','T','d_v',{dims});
 lines(p,S,vc,py-gap-(m?36:40),[L('위치 성분 없음','no rotary part')],{anchor:'middle',size:S.note-2,width:m?150:240});
 const j=py+sw+44;join(p,S,ws,[pc,py+sw],[vc,py+48],cx,j,'teal','blue',false);
 const zy=after(j);down(cx,j+16,zy);mat(p,S,cx,zy,'Z_h','T','d_v',{dims});
 const cy=zy+48+90+gap;down(cx,zy+48,cy);
 math(p,cx+12,zy+48+58,L('모든 head를 열로 이어 붙임','join all heads by columns'),{size:S.note-2,color:C.muted,width:m?150:300});
 mat(p,S,cx,cy,'Z_{cat}','T','H·d_v',{heads:true,dims});
 // Output projection; on mobile the junction moves left to leave room for W^O.
 const ox=m?110:cx,wy=cy+48+(m?100:86),ww=colW(S,'D'),wx=ox+(m?40:60)+ww/2;
 to([cx,cy+48],[ox,wy-17],'down','down');
 mat(p,S,wx,wy-24,'W^O','H·d_v','D',{tone:'purple'});wire(p,[[wx-ww/2,wy],[ox+18,wy]],'purple');mop(p,S,ox,wy);
 const yy=after(wy);down(ox,wy+16,yy);mat(p,S,ox,yy,'Y','T','D',{dims});
 connect(p,ws);p.height=yy+48+(m?34:40);return[p];
});
