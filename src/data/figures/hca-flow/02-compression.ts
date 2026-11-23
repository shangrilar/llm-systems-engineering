import {Panel,C,L,math,spec,SZ,chain,mat,colW,type Item} from './drawing';
import {connect,flowMatrix,flowStep,junction,type Label,type Wire} from '@llm-systems/viz';
// One compression block of the HCA compressor, drawn with the teaching size m′=4 (the real HCA layer uses 128).
// Per channel, the four scores Z+B are normalised across the block's tokens and weight the four candidate rows C;
// the weighted rows add up to one row, which then gets RMSNorm and RoPE. The window path below is the separate
// wkv → kv_norm → RoPE projection of figure 1. Source: Compressor.forward in the official inference code.
const M=4,ROW=24,CH=96;
const hl=(p:Panel,x:number,y:number,w:number,h:number)=>p.raw(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.orange}" fill-opacity=".45"/>`);
// A [m′, c] block: four rows (dividers) with a highlighted channel column. `rows` labels the rows on the left.
function block(p:Panel,S:typeof SZ.desk,cx:number,y:number,name:string,tone:'teal'|'purple',rows:Label[],colFrac=.35){
 const w=colW(S,'c'),m=flowMatrix(p,S,cx,y,name,'m′','c',{w,h:CH,tone});
 for(let i=1;i<M;i++)p.line(m.x,y+i*ROW,m.x+w,y+i*ROW,C.line,1);
 hl(p,m.x+w*colFrac-5,y+1,10,CH-2);
 rows.forEach((r,i)=>math(p,m.x-10,y+i*ROW+17,r,{size:S.note-3,color:C.muted,anchor:'end',width:90}));
 return m;
}
function desktop(l:'ko'|'en'){
 const S=SZ.desk,p=new Panel(l,null,1100,1104),ws:Wire[]=[];
 const w=colW(S,'c'),pos=[L('t=4','t=4'),L('t=5','t=5'),L('t=6','t=6'),L('t=7','t=7')],inb=[L('위치 0','pos 0'),L('위치 1','pos 1'),L('위치 2','pos 2'),L('위치 3','pos 3')];
 math(p,0,26,L('블록 크기 m′: 예시 4 / 실제 128','block size m′: example 4 / real 128'),{size:S.note-2,color:C.muted,width:1100});
 math(p,0,52,L('주황 열 = 같은 채널 · 토큰 방향으로 가중합하며, 채널 간 값은 섞지 않는다','orange column = one channel · weighted across tokens; channels are never mixed'),{size:S.note-2,color:C.muted,width:1100});
 math(p,0,80,L('Z: 토큰 내용에 따른 점수 · B: 블록 안 오프셋에 따른 학습 편향 (더해서 softmax)','Z: score from token content · B: learned bias by offset in the block (added, then softmax)'),{size:S.note-2,color:C.muted,width:1100});
 math(p,0,112,L('① 점수를 토큰 방향으로 정규화','① Normalise scores across tokens'),{size:S.note,weight:600,width:560});
 math(p,620,112,L('② 채널별로 합치기','② Weighted sum per channel'),{size:S.note,weight:600,width:460});
 const X=150,c=block(p,S,X,150,'C_b','teal',pos),z=block(p,S,X,330,'Z_b','teal',pos),b=block(p,S,X,520,'B','purple',inb);
 // Z_b + B → softmax → S_b ; C_b ⊙ S_b → Σ over tokens
 const yj=(330+CH/2+520+CH/2)/2+0,J1=[280,yj],SM=[410,yj],SX=600;
 junction(p,S,J1[0],J1[1],'+');
 flowStep(p,S,SM[0],SM[1],'softmax',{w:112,tone:'gray'});
 const sM=block(p,S,SX,yj-CH/2,'S_b','teal',[]);
 const J2=[740,yj];junction(p,S,J2[0],J2[1],'⊙');
 flowStep(p,S,880,yj,L('Σ 토큰','Σ tokens'),{w:112,tone:'gray'});
 ws.push({from:[z.x+w,330+CH/2],to:[J1[0],J1[1]-17],start:'right',end:'down'},{from:[b.x+w,520+CH/2],to:[J1[0],J1[1]+17],start:'right',end:'up',tone:'purple',via:[[J1[0],520+CH/2]]},
  {from:[J1[0]+16,J1[1]],to:[SM[0]-56,J1[1]],start:'right',end:'right'},{from:[SM[0]+56,J1[1]],to:[sM.x-2,J1[1]],start:'right',end:'right'},
  {from:[sM.x+w,J1[1]],to:[J2[0]-17,J2[1]],start:'right',end:'right'},{from:[c.x+w,150+CH/2],to:[J2[0],J2[1]-17],start:'right',end:'down',tone:'teal'},
  {from:[J2[0]+16,J2[1]],to:[880-56,J2[1]],start:'right',end:'right'});
 math(p,SM[0],yj+46,L('토큰 방향 · 각 열의 합 = 1','column sums = 1'),{size:S.note-3,color:C.muted,anchor:'middle',width:230});
 math(p,880,yj-34,L('4개 행이 1행으로','4 rows become 1'),{size:S.note-3,color:C.muted,anchor:'middle',width:200});
 // ③ entry
 const y2=740;
 math(p,0,y2-62,L('③ entry 완성','③ Finish the entry'),{size:S.note,weight:600,width:400});
 const items:Item[]=[mat(S,'u_b','c',{row:'1',tone:'teal'}),
  {t:'step',label:'RMSNorm',w:128,tone:'gray',input:L('학습 scale','learned scale')},
  {t:'step',label:'RoPE',input:L('위치 p_b','position p_b')},
  mat(S,'C^{Comp}_b','c',{row:'1',tone:'teal'})];
 const X2=420,r2=chain(p,S,'h',[X2,y2],items,ws,{tone:'teal'});
 hl(p,r2[0].left[0]+w*.35-5,y2-23,10,46);hl(p,r2[3].left[0]+w*.35-5,y2-23,10,46);
 ws.push({from:[880,yj+17],to:r2[0].top,start:'down',end:'down',tone:'teal'});
 [L('RoPE 위치 p_b = 블록 첫 토큰 (4)','RoPE position p_b = first token of block (4)'),L('t=7에 완성되어 읽기 가능','complete and readable from t=7')].forEach((n,i)=>math(p,0,y2-22+i*26,n,{size:S.note-2,color:C.muted,width:360}));
  // window path for comparison (figure 1)
 const y3=1050;
 p.line(0,y3-172,1104,y3-172,C.line,1);
 math(p,0,y3-140,L('비교 · local KV는 따로 만든다 (압축 없음)','Compare · the local KV is built separately (no compression)'),{size:S.note,weight:600,width:700});
 const r3=chain(p,S,'h',[X,y3],[mat(S,'x_t','D',{row:'1',tone:'blue'}),{t:'mul',op:{name:'W^{KV}_{win}',row:'D',col:'c',w:colW(S,'c')}},
  {t:'step',label:'RMSNorm',w:128,tone:'gray',input:L('학습 scale','learned scale')},{t:'step',label:'RoPE',input:L('위치 p_t','position p_t')},mat(S,'E^{win}_t','c',{row:'1',tone:'orange'})],ws,{tone:'orange'});
 math(p,r3[4].right[0]+34,y3-4,L('토큰마다 1개 · 위치는 그 토큰 자신','one per token · position is the token’s own'),{size:S.note-2,color:C.muted,width:520});
 connect(p,ws);p.height=y3+110;return p;
}
export default {...spec('02-compression',L('압축 entry 만들기','Building a compressed entry'),L('블록 안 토큰들의 채널별 가중합 · m′ = 4 예시','Per-channel weighted sum over a block · m′ = 4 example'),L('압축 entry 하나는 블록 안 토큰 4개의 후보 C를 채널마다 가중합한 것이다. 점수 Z에 위치 편향 B를 더해 토큰 방향으로 softmax한 S가 비중이 되고, C와 곱해 토큰 방향으로 합친 한 행에 RMSNorm과 RoPE를 적용하면 entry가 된다. 최근 토큰의 KV는 별도 가중치로 압축 없이 만든다.','A compressed entry is a per-channel weighted sum of the block’s four candidate rows C. Scores Z plus position bias B are softmaxed across tokens into S, which weights C; the sum over tokens is passed through RMSNorm and RoPE to give the entry. Recent-token KV is built with a separate weight and no compression.'),(l)=>[desktop(l as 'ko'|'en')]),screens:['desktop' as const]};
