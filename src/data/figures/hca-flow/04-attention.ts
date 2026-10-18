import {Panel,C,L,math,spec,SZ,chain,mat,mul,colW,type Item} from './drawing';
import {connect,flowWire,type Wire} from '@llm-systems/viz';
// One query token t reads the visible entries E (figure 3) as both key and value, then the heads' outputs are
// merged by the grouped output projection. Teaching sizes: n_h = 4 heads, g = 2 groups. Source: Attention.forward and
// sparse_attn in the official inference code. S and P are mathematical intermediates, not claims about materialised matrices.
// The query path before this figure (c^Q → W^{UQ}) is figure 1.
// Four panels, one step each, so the article can put a note under every step. Each panel after the first starts
// from the previous step's result (S, P, O_g) instead of a long wire back to the left. E appears twice on purpose:
// as K in ① and as V in ③.
type Tone='gray'|'blue'|'teal'|'purple'|'orange';
const TITLE=[L('① Query 준비와 점수','① Prepare the query, score'),L('② sink를 더한 softmax','② Softmax with a sink'),L('③ 가중합과 역회전','③ Weighted sum, inverse rotation'),L('④ 그룹별 출력 변환','④ Grouped output projection')];
function desktop(l:'ko'|'en',k:0|1|2|3){
 // ② has no operand above its row, so its row sits higher.
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],y=k===1?110:180,X=110;
 const step=(label:string,w=92,tone?:Tone,input?:ReturnType<typeof L>):Item=>({t:'step',label,w,tone,input});
 const E=()=>mul(S,'E','N_t','c','blue');
 const from=(x:number,t:ReturnType<typeof L>)=>math(p,x,y+76,t,{size:S.note-2,color:C.muted,anchor:'middle',width:200});
 math(p,0,30,TITLE[k],{size:S.title,weight:600,width:640});
 if(k===0){
  math(p,1104,30,L('한 토큰 t의 계산 · 예시: 4 head','computation for one token t · example: 4 heads'),{size:S.note-2,anchor:'end',color:C.muted,width:460});
  const r=chain(p,S,'h',[X,y],[mat(S,'Q','c',{row:'n_h',tone:'blue'}),step('head RMS',110,'gray'),step('RoPE',92,'blue',L('위치 t','position t')),
   {...E(),ports:{t:true}} as Item,step('÷ √c',80,'gray'),mat(S,'S','N_t',{row:'n_h',tone:'teal'})],ws,{tone:'blue'});
  math(p,r[3].x+40,y-72,L('Key 역할','as the Key'),{size:S.note-2,color:C.blue,width:100});
  connect(p,ws);p.height=y+120;return p;
 }
 if(k===1){
  const r=chain(p,S,'h',[X,y],[mat(S,'S','N_t',{row:'n_h',tone:'teal'}),step('softmax',110,'teal'),mat(S,'P','N_t',{row:'n_h',tone:'teal'})],ws,{tone:'teal'});
  from(r[0].x,L('①의 S','S from ①'));
  flowWire(p,[[r[1].x,y+64],[r[1].x,y+21]],'purple');
  math(p,r[1].x-50,y+64+S.note+4,L('sink: 분모에 exp(z′_h)','sink: exp(z′_h) in the denominator'),{size:S.note,color:C.purple,width:360});
  math(p,r[2].right[0]+40,y+7,L('P의 행 합은 1보다 작을 수 있다','rows of P can sum below 1'),{size:S.note-2,color:C.muted,width:420});
  connect(p,ws);p.height=y+120;return p;
 }
 if(k===2){
  const r=chain(p,S,'h',[X,y],[mat(S,'P','N_t',{row:'n_h',tone:'teal'}),E(),mat(S,'O','c',{row:'n_h',tone:'teal'}),step(l==='ko'?'역 RoPE (t)':'inv. RoPE (t)',150,'blue')],ws,{tone:'teal'});
  from(r[0].x,L('②의 P','P from ②'));
  math(p,r[1].x+40,y-72,L('Value 역할 · ①과 같은 E','as the Value · the same E as in ①'),{size:S.note-2,color:C.blue,width:260});
  connect(p,ws);p.height=y+110;return p;
 }
 const r=chain(p,S,'h',[X,y],[mat(S,'O_g','c_g',{row:'g',tone:'teal'}),mul(S,'W^{O,a}_g','c_g','r_o'),mat(S,'o′','r_o',{row:'g',tone:'teal'}),
  step(l==='ko'?'이어 붙임':'concat',116,'gray'),mul(S,'W^{O,b}','g·r_o','D'),mat(S,'y','D',{row:'1',tone:'teal'})],ws,{tone:'teal'});
 from(r[0].x,L('③에서 역회전한 O를 g개 그룹으로','③’s rotated-back O in g groups'));
 math(p,1104,30,L('예시: 2 그룹 · W^{O,a}_g는 그룹마다 다른 가중치','example: 2 groups · W^{O,a}_g differs per group'),{size:S.note-2,anchor:'end',color:C.muted,width:300});
 connect(p,ws);p.height=y+110;return p;
}
export default {...spec('04-attention',L('공유 K=V를 읽는 Attention','Attention over a shared K = V'),L('지금 읽을 수 있는 entry E를 Key와 Value로 함께 쓰고 그룹별로 출력 변환','The readable entries E serve as Key and Value, then a grouped output projection'),L('Query의 head별 정규화와 RoPE 뒤, 가시 entry E가 Key와 Value로 함께 쓰인다. 점수 S = Q·Eᵀ/√c에 sink를 분모에 더한 softmax로 P를 만들고 P·E로 head 출력 O를 얻은 뒤 역 RoPE를 적용한다. head를 그룹으로 묶어 그룹별 W^{O,a}와 공통 W^{O,b}로 hidden 차원으로 되돌린다.','After per-head normalisation and RoPE of the query, the visible entries E serve as both K and V. S = Q·Eᵀ/√c goes through a softmax with the sink added to the denominator to give P, P·E gives the head outputs O, which get an inverse RoPE. Heads are grouped, each group uses its own W^{O,a}, and a shared W^{O,b} maps back to the hidden size.'),(l)=>([0,1,2,3] as const).map(k=>desktop(l as 'ko'|'en',k))),screens:['desktop' as const]};
