import {Panel,C,L,math,spec,SZ} from './drawing';
import type {Label} from '@llm-systems/viz';
// Which entries one query token reads in a CSA layer. Teaching sizes: m = 4 (the real CSA value), window = 4, top-k = 2
// (real: 128 and 1024). Completed entries are ⌊(t+1)/m⌋; entry i covers tokens 4(i−1)…4i+3 and is RoPE'd at position 4i.
// The indexer scores the completed entries and the top-k are read together with the recent window (current token included).
// The scores are the teaching values of figure 3. The row order of E is logical, not a storage order; "not selected" only
// means this token does not read the entry, not that anything is dropped from the cache.
const M=4,W=4,K=2,PITCH=52,CW=48,CH=44,X0=70,CHIPW=150,CHIPH=58;
const SCORE=[0.6,0.8,0.3];
const range=(i:number)=>i===0?'0–3':`${(i-1)*M}–${i*M+M-1}`;
function drawCase(p:Panel,S:typeof SZ.desk,y0:number,t:number){
 const done=Math.floor((t+1)/M),pick=SCORE.slice(0,done).map((v,i)=>[v,i] as const).sort((a,b)=>b[0]-a[0]).slice(0,K).map(a=>a[1]).sort((a,b)=>a-b);
 const rows=pick.length+W,cy=y0+176,ex=780,ew=60,rh=24,top=cy+CH/2-rows*rh/2;
 math(p,0,y0+30,L(`t = ${t} · 현재 토큰 ${t} · 완성된 entry ${done}개`,`t = ${t} · current token ${t} · ${done} completed entries`),{size:S.name-2,weight:700,width:700});
 // candidate chips (completed entries) with indexer scores
 p.text(0,y0+88,L('후보','candidates'),{size:S.note-3,color:C.muted,width:60});
 for(let i=0;i<done;i++){
  const x=X0+i*(CHIPW+10),sel=pick.includes(i),y=y0+56;
  p.rect(x,y,CHIPW,CHIPH,sel?C.tealFill:C.paper,sel?C.teal:C.line,6,!sel);
  math(p,x+CHIPW/2,y+25,`C^{Comp}_${i}`,{size:S.dim,weight:700,anchor:'middle',width:CHIPW,color:sel?C.teal:C.muted});
  math(p,x+CHIPW/2,y+48,L(`원본 ${range(i)} · I = ${SCORE[i]}`,`tokens ${range(i)} · I = ${SCORE[i]}`),{size:S.note-4,anchor:'middle',width:CHIPW,color:sel?C.teal:C.muted});
 if(!sel)p.text(x+CHIPW/2,y+CHIPH+20,L('미선택','not chosen'),{size:S.note-3,anchor:'middle',width:CHIPW,color:C.muted});
 }
 // tokens and the recent window
 p.text(0,cy+CH/2+6,L('토큰','token'),{size:S.note-3,color:C.muted,width:60});
 for(let i=0;i<12;i++){
  const x=X0+i*PITCH,future=i>t,cur=i===t;
  p.raw(`<rect x="${x}" y="${cy}" width="${CW}" height="${CH}" fill="${future?C.paper:C.grayFill}" stroke="${cur?C.blue:C.line}" stroke-width="${cur?3:1.5}"${future?' stroke-dasharray="6 4"':''}/>`);
  p.text(x+CW/2,cy+CH/2+7,String(i),{size:S.dim,anchor:'middle',width:CW,color:future?C.muted:C.ink,weight:cur?700:400});
 }
 const wx0=X0+(t-W+1)*PITCH,wx1=X0+(t+1)*PITCH-4,yw=cy+CH+16;
 p.path(`M${wx0} ${yw-12} V${yw} H${wx1} V${yw-12}`,C.orange,2);
 math(p,(wx0+wx1)/2,yw+24,L(`window ${W}개 (현재 포함)`,`window of ${W} (incl. current)`),{size:S.note-2,color:C.orange,anchor:'middle',width:240});
 p.arrow(X0+12*PITCH+4,cy+CH/2,ex-12,cy+CH/2,C.muted);
 math(p,(X0+12*PITCH+ex)/2,cy+CH/2-14,L('이어 붙임','concat'),{size:S.note-3,color:C.muted,anchor:'middle',width:80});
 // E: selected compressed entries first, then the window entries
 math(p,ex+ew/2,top-12,'E',{size:S.name,weight:600,anchor:'middle',width:60});
 const labels:Label[]=[];
 pick.forEach((i,k)=>{p.rect(ex,top+k*rh,ew,rh,C.tealFill,C.teal,0);labels.push(L(`C^{Comp}_${i} · 원본 ${range(i)} · p = ${i*M}`,`C^{Comp}_${i} · tokens ${range(i)} · p = ${i*M}`));});
 for(let j=0;j<W;j++){const tok=t-W+1+j;p.rect(ex,top+(pick.length+j)*rh,ew,rh,C.orangeFill,C.orange,0);labels.push(L(`E^{win}_{${tok}} · 원본 ${tok} · p = ${tok}`,`E^{win}_{${tok}} · token ${tok} · p = ${tok}`));}
 labels.forEach((lb,i)=>math(p,ex+ew+14,top+i*rh+17,lb,{size:S.note-4,color:i<pick.length?C.teal:C.orange,width:250}));
 math(p,ex+ew/2+8,top+rows*rh+S.dim+4,`[${rows}, c]`,{size:S.dim-1,anchor:'middle',color:C.muted,width:120});
}
function desktop(l:'ko'|'en'){
 const S=SZ.desk,p=new Panel(l,null,520,1104);
 math(p,0,26,L(`m = 4는 실제 값 · window·top-k: 예시 ${W}·${K} / V4-Flash 128·512`,`m = 4 is the real value · window, top-k: example ${W}, ${K} / V4-Flash 128, 512`),{size:S.note-2,color:C.muted,width:1100});
 math(p,0,52,L('I는 교육용 점수 · p = RoPE 위치(entry i는 4i, window는 자기 토큰)','I = teaching scores · p = RoPE position (4i for entry i, the token itself for window)'),{size:S.note-2,color:C.muted,width:1100});
 drawCase(p,S,80,11);
 return p;
}
export default {...spec('04-visible-entries',L('실제로 읽는 entry','Entries actually read'),L('indexer가 고른 압축 entry + 최근 window · t = 11','Compressed entries picked by the indexer + the recent window · t = 11'),L('토큰 t가 읽는 entry는 완성된 압축 entry 중 indexer 점수가 높은 k개와 현재 토큰을 포함한 최근 window이다. t = 11에는 완성된 후보가 3개이고 그중 점수가 높은 2개만 읽는다. 새로 완성된 entry가 항상 선택되는 것은 아니다.','Token t reads the k highest-scoring completed compressed entries plus the recent window including itself. At t = 11 three candidates are complete and only the best two are read, so the newly completed entry is not necessarily chosen.'),(l)=>[desktop(l as 'ko'|'en')]),screens:['desktop' as const]};
