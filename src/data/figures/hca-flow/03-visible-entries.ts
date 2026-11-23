import {Panel,C,L,math,spec,SZ} from './drawing';
import type {Label} from '@llm-systems/viz';
// Which entries one query token can read, with the teaching sizes m′=4 and n_win=4 (the real layer uses 128).
// Completed compressed blocks are ⌊(t+1)/m′⌋; the window is the last n_win tokens and includes the current one.
// A compressed entry's RoPE position is its block's first token; a window entry's is its own token. The two
// groups may cover the same original tokens. The row order is a logical arrangement, not a storage order.
const M=4,W=4,PITCH=62,CW=56,CH=44,X0=70;
function drawCase(p:Panel,S:typeof SZ.desk,y0:number,t:number){
 const done=Math.floor((t+1)/M),rows=done+W,top=y0+142-rows*12,cy=y0+120;
 math(p,0,y0+30,L(`t = ${t} · 현재 토큰 ${t}`,`t = ${t} · current token ${t}`),{size:S.name-2,weight:700,width:400});
 p.text(0,cy+CH/2+6,L('토큰','token'),{size:S.note-3,color:C.muted,width:60});
 // tokens
 for(let i=0;i<8;i++){
  const x=X0+i*PITCH,future=i>t,cur=i===t;
  p.raw(`<rect x="${x}" y="${cy}" width="${CW}" height="${CH}" fill="${future?C.paper:C.grayFill}" stroke="${cur?C.blue:C.line}" stroke-width="${cur?3:1.5}"${future?' stroke-dasharray="6 4"':''}/>`);
  p.text(x+CW/2,cy+CH/2+7,String(i),{size:S.dim,anchor:'middle',width:CW,color:future?C.muted:C.ink,weight:cur?700:400});
 }
 // completed / incomplete compression blocks above the tokens
 for(let k=0;k<2;k++){
  const x0=X0+k*M*PITCH,x1=X0+(k*M+M)*PITCH-6,ok=k<done,yb=y0+98,fresh=ok&&k===done-1&&t%M===M-1;
  p.path(`M${x0} ${yb+12} V${yb} H${x1} V${yb+12}`,ok?C.teal:C.muted,fresh?3.5:2,!ok);
  math(p,(x0+x1)/2,yb-10,ok?L(`블록 ${k} · 완성${fresh?` (t=${t})`:''}`,`block ${k} · complete${fresh?` (t=${t})`:''}`):L(`블록 ${k} · 미완성`,`block ${k} · incomplete`),{size:S.note-2,color:ok?C.teal:C.muted,weight:fresh?700:400,anchor:'middle',width:230});
 }
 // window below the tokens
 const wx0=X0+(t-W+1)*PITCH,wx1=X0+(t+1)*PITCH-6,yw=cy+CH+18;
 p.path(`M${wx0} ${yw-12} V${yw} H${wx1} V${yw-12}`,C.orange,2);
 math(p,(wx0+wx1)/2,yw+24,L(`window ${W}개 (현재 포함)`,`window of ${W} (incl. current)`),{size:S.note-2,color:C.orange,anchor:'middle',width:240});
 // gather → E
 p.arrow(X0+8*PITCH+4,cy+CH/2,668,cy+CH/2,C.muted);
 math(p,X0+8*PITCH+34,cy+CH/2-14,L('이어 붙임','concat'),{size:S.note-3,color:C.muted,anchor:'middle',width:90});
 // E rows: compressed entries first, then window entries
 const ex=690,ew=60,rh=24;
 math(p,ex+ew/2,top-12,'E',{size:S.name,weight:600,anchor:'middle',width:60});
 const labels:Label[]=[];
 for(let k=0;k<done;k++){
  const fresh=k===done-1&&t%M===M-1;
  p.rect(ex,top+k*rh,ew,rh,C.tealFill,C.teal,0);
  labels.push(L(`C^{Comp}_${k} · 원본 ${k*M}–${k*M+M-1} · p = ${k*M}${fresh?' · 방금 완성':''}`,`C^{Comp}_${k} · tokens ${k*M}–${k*M+M-1} · p = ${k*M}${fresh?' · just completed':''}`));
 }
 for(let j=0;j<W;j++){
  const tok=t-W+1+j;p.rect(ex,top+(done+j)*rh,ew,rh,C.orangeFill,C.orange,0);
  labels.push(L(`E^{win}_${tok} · 원본 ${tok} · p = ${tok}`,`E^{win}_${tok} · token ${tok} · p = ${tok}`));
 }
 labels.forEach((lb,i)=>math(p,ex+ew+18,top+i*rh+17,lb,{size:S.note-3,color:i<done?C.teal:C.orange,width:360}));
 math(p,ex+ew/2+8,top+rows*rh+S.dim+4,`[${rows}, c]`,{size:S.dim-1,anchor:'middle',color:C.muted,width:120});
}
function desktop(l:'ko'|'en'){
 const S=SZ.desk,p=new Panel(l,null,780,1104);
 math(p,0,26,L('블록 m′·window n_{win}: 예시 각각 4 / 실제 각각 128 · p = RoPE 위치','block m′, window n_{win}: example 4 each / real 128 each · p = RoPE position'),{size:S.note-2,color:C.muted,width:1100});
 drawCase(p,S,80,6);
 p.line(0,380,1104,380,C.line,1);
 drawCase(p,S,400,7);
 math(p,0,712,L('t=7의 블록 1(토큰 4–7)과 window(토큰 4–7)는 같은 원본 토큰이지만 서로 다른 entry로 읽는다','At t=7, block 1 (tokens 4–7) and the window (tokens 4–7) cover the same tokens but are read as different entries'),{size:S.note-2,color:C.muted,width:1100});
 return p;
}
export default {...spec('03-visible-entries',L('지금 읽을 수 있는 entry','Entries readable right now'),L('완성된 압축 블록과 최근 window · t=6과 t=7 비교','Completed compressed blocks plus the recent window · t=6 vs t=7'),L('토큰 t가 읽는 entry는 완성된 압축 블록과 현재 토큰을 포함한 최근 window이다. t=6에서는 블록 0만 완성되어 5행, t=7에서는 블록 1이 완성되어 6행이 되며, 압축 entry와 window entry는 같은 원본 토큰을 서로 다른 entry로 포함할 수 있다.','Token t reads the completed compressed blocks plus the recent window including itself. At t=6 only block 0 is complete (5 rows); at t=7 block 1 completes (6 rows), and a compressed entry and a window entry may cover the same source tokens.'),(l)=>[desktop(l as 'ko'|'en')]),screens:['desktop' as const]};
