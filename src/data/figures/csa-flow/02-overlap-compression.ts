import {Panel,C,L,math,spec,SZ,chain,mat,colW,type Item} from './drawing';
import {connect,flowMatrix,flowStep,junction,type Label,type Wire} from '@llm-systems/viz';
// One entry of the CSA compressor (m = 4, the real CSA value). It reads 2m = 8 tokens: the previous span through the
// "a" weights and its own span through the "b" weights, and one softmax per channel runs over all 8 rows (Z + B).
// The entry's RoPE position is the start of its own stride span, not of the first token it reads. Entry 0 has no
// previous span (a is padded with −inf scores and zero values). Source: Compressor.forward (overlap=True) and report eq. 9–12.
const M=4,N=2*M,RH=18,CH=N*RH;
const hl=(p:Panel,x:number,y:number,w:number,h:number)=>p.raw(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.orange}" fill-opacity=".45"/>`);
function block(p:Panel,S:typeof SZ.desk,cx:number,y:number,name:string,tone:'teal'|'purple',rows:string[]){
 const w=colW(S,'c'),m=flowMatrix(p,S,cx,y,name,String(N),'c',{w,h:CH,tone});
 p.raw(`<rect x="${m.x+1}" y="${y+1}" width="${w-2}" height="${CH/2-1}" fill="${C.gray}" fill-opacity=".14"/>`);
 for(let i=1;i<N;i++)p.line(m.x,y+i*RH,m.x+w,y+i*RH,i===M?C[tone]:C.line,i===M?2.5:1);
 hl(p,m.x+w*.35-5,y+1,10,CH-2);
 rows.forEach((r,i)=>math(p,m.x-10,y+i*RH+14,r,{size:S.note-5,color:C.muted,anchor:'end',width:80}));
 return m;
}
function desktop(l:'ko'|'en'){
 const S=SZ.desk,p=new Panel(l,null,1360,1104),ws:Wire[]=[],w=colW(S,'c');
 const tok=['t=0','t=1','t=2','t=3','t=4','t=5','t=6','t=7'],off=['a0','a1','a2','a3','b0','b1','b2','b3'];
 math(p,0,26,L('m = 4는 실제 값 · entry 하나는 이전 구간 4개 + 자기 구간 4개를 읽는다 (entry 0은 자기 구간만)','Real CSA value m = 4 · a regular entry reads 4 tokens of the previous span + 4 of its own (entry 0 only its own 4)'),{size:S.note-2,color:C.muted,width:1100});
 math(p,0,52,L('주황 열 = 같은 채널 · 위 절반 a = 이전 구간(0–3), 아래 절반 b = 자기 구간(4–7)','Orange column = one channel · upper half a = previous span (0–3), lower half b = its own span (4–7)'),{size:S.note-2,color:C.muted,width:1100});
 math(p,0,80,L('Z: 토큰 내용에 따른 점수 · B^a, B^b: 구간·오프셋별 학습 편향 (더해서 8개를 한 번에 softmax)','Z: score from token content · B^a, B^b: learned bias per span and offset (added, then one softmax over 8)'),{size:S.note-2,color:C.muted,width:1100});
 math(p,0,112,L('① 8개 점수를 토큰 방향으로 정규화','① Normalise 8 scores across tokens'),{size:S.note,weight:600,width:560});
 math(p,620,112,L('② 채널별로 합치기','② Weighted sum per channel'),{size:S.note,weight:600,width:460});
 const X=150,yC=150,yZ=380,yB=610,c=block(p,S,X,yC,'C',"teal" as const,tok),z=block(p,S,X,yZ,'Z','teal',tok),b=block(p,S,X,yB,'B','purple',off);
 const yj=(yZ+yB)/2+CH/2,J1=[280,yj],SM=[410,yj],SX=600;
 junction(p,S,J1[0],J1[1],'+');
 flowStep(p,S,SM[0],SM[1],'softmax',{w:112,tone:'gray'});
 const sM=block(p,S,SX,yj-CH/2,'S','teal',[]);
 const J2=[740,yj];junction(p,S,J2[0],J2[1],'⊙');
 flowStep(p,S,880,yj,L('Σ 8행','Σ 8 rows'),{w:112,tone:'gray'});
 ws.push({from:[z.x+w,yZ+CH/2],to:[J1[0],J1[1]-17],start:'right',end:'down'},
  {from:[b.x+w,yB+CH/2],to:[J1[0],J1[1]+17],start:'right',end:'up',tone:'purple',via:[[J1[0],yB+CH/2]]},
  {from:[J1[0]+16,yj],to:[SM[0]-56,yj],start:'right',end:'right'},{from:[SM[0]+56,yj],to:[sM.x-2,yj],start:'right',end:'right'},
  {from:[sM.x+w,yj],to:[J2[0]-17,yj],start:'right',end:'right'},{from:[c.x+w,yC+CH/2],to:[J2[0],yj-17],start:'right',end:'down',tone:'teal'},
  {from:[J2[0]+16,yj],to:[880-56,yj],start:'right',end:'right'});
 [[yC,L('entry 1 입력: [C^a(0–3) ; C^b(4–7)]','entry 1 input: [C^a(0–3) ; C^b(4–7)]')]].forEach(([yy,tt])=>math(p,X,(yy as number)+CH+44,tt as Label,{size:S.note-3,color:C.muted,anchor:'middle',width:300}));
 math(p,SM[0],yj+46,L('토큰 방향 8개 · 각 열의 합 = 1','8 tokens · column sums = 1'),{size:S.note-3,color:C.muted,anchor:'middle',width:260});
 math(p,880,yj-34,L('8개 행이 1행으로','8 rows become 1'),{size:S.note-3,color:C.muted,anchor:'middle',width:200});
 // ③ finish
 const y2=960;
 math(p,0,y2-62,L('③ entry 완성','③ Finish the entry'),{size:S.note,weight:600,width:400});
 [L('원본 0–7 · RoPE 위치 p = 4','source tokens 0–7 · RoPE position p = 4')].forEach((n,i)=>math(p,0,y2-22+i*26,n,{size:S.note-2,color:C.muted,width:380}));
 const X2=420,items:Item[]=[mat(S,'u','c',{row:'1',tone:'teal'}),{t:'step',label:'RMSNorm',w:128,tone:'gray',input:L('학습 scale','learned scale')},{t:'step',label:'RoPE',input:L('위치 p = 4','position p = 4')},mat(S,'C^{Comp}_1','c',{row:'1',tone:'teal'})];
 const r2=chain(p,S,'h',[X2,y2],items,ws,{tone:'teal'});
 hl(p,r2[0].left[0]+w*.35-5,y2-23,10,46);hl(p,r2[3].left[0]+w*.35-5,y2-23,10,46);
 ws.push({from:[880,yj+17],to:r2[0].top,start:'down',end:'down',tone:'teal',via:[[880,y2-110],[X2,y2-110]]});
 // overlap across neighbouring entries
 const y3=1190,x0=70,pitch=62,cw=56,ch=40;
 p.line(0,y3-110,1104,y3-110,C.line,1);
 math(p,0,y3-78,L('이웃한 entry는 구간을 절반씩 공유한다 (stride = 4)','Neighbouring entries share half their span (stride = 4)'),{size:S.note,weight:600,width:700});
 for(let i=0;i<12;i++){p.rect(x0+i*pitch,y3,cw,ch,C.grayFill,C.line,0);p.text(x0+i*pitch+cw/2,y3+ch/2+6,String(i),{size:S.dim,anchor:'middle',width:cw});}
 p.text(0,y3+ch/2+6,L('토큰','token'),{size:S.note-3,color:C.muted,width:60});
 const e=(a:number,b:number)=>[x0+a*pitch,x0+(b+1)*pitch-6] as const;
 const [e1a,e1b]=e(0,7),[e2a,e2b]=e(4,11);
 p.path(`M${e1a} ${y3-16} V${y3-28} H${e1b} V${y3-16}`,C.teal,3);
 math(p,(e1a+e1b)/2,y3-38,L('entry 1 = a(토큰 0–3) + b(토큰 4–7)','entry 1 = a (tokens 0–3) + b (tokens 4–7)'),{size:S.note-2,color:C.teal,weight:700,anchor:'middle',width:420});
 p.path(`M${e2a} ${y3+ch+16} V${y3+ch+28} H${e2b} V${y3+ch+16}`,C.muted,2,true);
 math(p,(e2a+e2b)/2,y3+ch+54,L('entry 2 (다음) = a(토큰 4–7) + b(토큰 8–11)','entry 2 (next) = a (tokens 4–7) + b (tokens 8–11)'),{size:S.note-2,color:C.muted,anchor:'middle',width:420});
 connect(p,ws);p.height=y3+ch+130;return p;
}
export default {...spec('02-overlap-compression',L('겹침 압축으로 entry 만들기','Building an entry with overlapping compression'),L('이전 구간 a + 자기 구간 b, 8개를 한 번에 softmax · m = 4','Previous span a + own span b, one softmax over 8 · m = 4'),L('CSA의 압축 entry 하나는 이전 구간 4개 토큰(a)과 자기 구간 4개 토큰(b), 모두 8개를 읽는다. 점수 Z에 구간·오프셋별 편향 B를 더한 8개를 토큰 방향으로 한 번에 softmax하여 후보 C와 곱하고 합친 뒤 RMSNorm과 RoPE(위치는 자기 stride 구간의 시작)를 적용한다. 이웃한 entry는 구간의 절반을 공유한다.','A CSA entry reads eight tokens: four of the previous span (a) and four of its own span (b). Scores Z plus the per-span, per-offset bias B are softmaxed once across the eight tokens, weight the candidates C, are summed, then get RMSNorm and RoPE (position = the start of its own stride span). Neighbouring entries share half their span.'),(l)=>[desktop(l as 'ko'|'en')]),screens:['desktop' as const]};
