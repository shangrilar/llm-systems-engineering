import {Panel,C,L,math,spec,SZ,chain,mat,mul,colW,type Item} from './drawing';
import {connect,flowWire,type Wire} from '@llm-systems/viz';
// One query token t reads the visible entries E (figure 3) as both key and value, then the heads' outputs are
// merged by the grouped output projection. Teaching sizes: n_h = 4 heads, g = 2 groups. Source: Attention.forward and
// sparse_attn in the official inference code. S and P are mathematical intermediates, not claims about materialised matrices.
// The query path before this figure (c^Q → W^{UQ}) is figure 1.
function desktop(l:'ko'|'en'){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[];
 math(p,0,26,L('한 토큰 t의 계산 · 예시: 4 head · 2 그룹','Computation for one token t · example: 4 heads · 2 groups'),{size:S.note-2,color:C.muted,width:1100});
 const ys=[250,520,790],X=150;
 const step=(label:string,w=92,tone?:'gray'|'blue'|'teal'|'purple'|'orange',input?:ReturnType<typeof L>):Item=>({t:'step',label,w,tone,input});
 const E=(name='E')=>mul(S,name,'N_t','c','blue');
 // ① scores
 math(p,0,ys[0]-124,L('① 점수','① Scores'),{size:S.note,weight:600,width:300});
 const r1=chain(p,S,'h',[X,ys[0]],[mat(S,'Q','c',{row:'n_h',tone:'blue'}),step('head RMS',110,'gray'),step('RoPE',92,'blue',L('위치 t','position t')),
  {...E('E'),ports:{t:true}} as Item,step('÷ √c',80,'gray'),mat(S,'S','N_t',{row:'n_h',tone:'teal'})],ws,{tone:'blue'});
 math(p,r1[3].x+40,ys[0]-72,L('K 역할','as K'),{size:S.note-3,color:C.blue,width:100});
 // ② weighted sum
 math(p,0,ys[1]-124,L('② 가중합','② Weighting'),{size:S.note,weight:600,width:300});
 const r2=chain(p,S,'h',[X,ys[1]],[step('softmax',110,'teal'),mat(S,'P','N_t',{row:'n_h',tone:'teal'}),E('E'),mat(S,'O','c',{row:'n_h',tone:'teal'}),step(l==='ko'?'역 RoPE (t)':'inv. RoPE (t)',150,'blue')],ws,{tone:'teal'});
 math(p,r2[2].x+40,ys[1]-72,L('V 역할','as V'),{size:S.note-3,color:C.blue,width:100});
 flowWire(p,[[r2[0].x,ys[1]+64],[r2[0].x,ys[1]+21]],'purple');
 math(p,r2[0].x,ys[1]+64+S.note+4,L('sink: 분모에 exp(z′_h)','sink: exp(z′_h) in the denominator'),{size:S.note,anchor:'middle',color:C.purple,width:220});
 ws.push({from:r1[5].right,to:r2[0].top,start:'right',end:'down',tone:'blue'});
 // ③ output transform
 math(p,0,ys[2]-100,L('③ 출력 변환','③ Output'),{size:S.note,weight:600,width:300});
 const r3=chain(p,S,'h',[X,ys[2]],[mat(S,'O_g','c_g',{row:'g',tone:'teal'}),mul(S,'W^{O,a}','c_g','r_o'),mat(S,'o′','r_o',{row:'g',tone:'teal'}),
  step(l==='ko'?'이어 붙임':'concat',116,'gray'),mul(S,'W^{O,b}','g·r_o','D'),mat(S,'y','D',{row:'1',tone:'teal'})],ws,{tone:'teal'});
 ws.push({from:r2[4].bottom,to:r3[0].top,start:'down',end:'down',tone:'teal',via:[[r2[4].bottom[0],ys[1]+130],[r3[0].top[0],ys[1]+130]]});
 math(p,330,ys[1]+88,L('sink가 분모에 더해져 P의 행 합은 1보다 작다','with the sink, rows of P sum below 1'),{size:S.note-2,color:C.muted,width:700});
 connect(p,ws);p.height=ys[2]+130;return p;
}
export default {...spec('04-attention',L('공유 K=V를 읽는 Attention','Attention over a shared K = V'),L('저랭크 Query로 가시 entry E를 읽고 그룹별로 출력 변환','Low-rank query reads the visible entries E, then a grouped output projection'),L('Query의 head별 정규화와 RoPE 뒤, 가시 entry E가 K와 V로 함께 쓰인다. 점수 S = Q·Eᵀ/√c에 sink를 분모에 더한 softmax로 P를 만들고 P·E로 head 출력 O를 얻은 뒤 역 RoPE를 적용한다. head를 그룹으로 묶어 그룹별 W^{O,a}와 공통 W^{O,b}로 hidden 차원으로 되돌린다.','After per-head normalisation and RoPE of the query, the visible entries E serve as both K and V. S = Q·Eᵀ/√c goes through a softmax with the sink added to the denominator to give P, P·E gives the head outputs O, which get an inverse RoPE. Heads are grouped, each group uses its own W^{O,a}, and a shared W^{O,b} maps back to the hidden size.'),(l)=>[desktop(l as 'ko'|'en')]),screens:['desktop' as const]};
