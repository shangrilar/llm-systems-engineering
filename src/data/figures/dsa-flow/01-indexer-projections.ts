import {Panel,C,L,math,spec,SZ,chain,colW,type Item} from './drawing';
import {connect,flowMatrix,type Label,type Locale,type Wire} from '@llm-systems/viz';
// The indexer adds three projections next to MLA. Its query starts from MLA's query latent Cᵠ; its key and
// per-head weights come straight from X. MLA's own paths are unchanged and not repeated here.
const rope=L('위치 p_t','position p_t'),cached=L('FP8 캐시','FP8 cache');
// Notes are one or more lines.
const paths:{title:Label;items:Item[];note?:Label[]}[]=[
 {title:L('indexer query','indexer query'),items:[
  {t:'mul',op:{name:'W^{DQ}',row:'D',col:'r_q'}},{t:'mat',name:'C^Q',col:'r_q',badge:L('MLA와 공유','shared with MLA')},
  {t:'mul',op:{name:'W^{IQ}',row:'r_q',col:'H^I·d^I'}},{t:'step',label:'RoPE',input:rope},{t:'mat',name:'q^I',col:'H^I·d^I',heads:'j'}],
  note:[]},
 {title:L('검색용 key','indexer key'),items:[
  {t:'mul',op:{name:'W^{IK}',row:'D',col:'d^I'}},{t:'step',label:'LayerNorm',w:128,tone:'gray'},{t:'step',label:'RoPE',input:rope},{t:'mat',name:'k^I',col:'d^I',badge:cached}],
  note:[L('모든 indexer head가 같은 k^I','every indexer head uses this k^I')]},
 {title:L('head 가중치','head weights'),items:[{t:'mul',op:{name:'W^{Iw}',row:'D',col:'H^I'}},{t:'mat',name:'w^I',col:'H^I'}],
  note:[L('w^I_j: head j의 판단을 얼마나 반영할지','w^I_j: how much head j’s judgment counts')]},
];
// Desktop: one panel per path, each starting from its own copy of X, so a note can follow each path.
const same=L('위와 같은 입력','same input as above');
function desktop(l:Locale,i:number){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],y=170,a=paths[i];
 math(p,0,30,a.title,{size:S.title,weight:600,width:600});
 const X=flowMatrix(p,S,80,y-24,'X','T','D',{w:colW(S,'D'),dims:'center'});
 if(i)math(p,80,y+76,same,{size:S.note-2,color:C.muted,anchor:'middle',width:200});
 const placed=chain(p,S,'h',[290,y],a.items,ws);
 ws.push({from:[X.x+X.width,y],to:[273,y],start:'right',end:'right'});
 const last=placed.at(-1)!;
 a.note?.forEach((n,k)=>math(p,i===0?last.x:last.right[0]+24,(i===0?last.bottom[1]+104:y+7-(a.note!.length-1)*13)+k*26,n,{size:S.note-2,color:C.muted,anchor:i===0?'middle':'start',width:400}));
 connect(p,ws);p.height=y+110;return p;
}
function lane(l:Locale,i:number){
 const S=SZ.mob,p=new Panel(l,null,0,328),ws:Wire[]=[],cx=100,a=paths[i];
 math(p,cx+16,24,a.title,{size:S.title,weight:600,width:212});
 p.rect(cx-22,44,44,30,C.blueFill,C.blue,6);math(p,cx,65,'X',{size:S.dim,weight:600,anchor:'middle',width:40,color:C.blue});if(i>0)p.text(cx+32,65,same,{size:S.note-2,color:C.muted,width:200});ws.push({from:[cx,74],to:[cx,143],start:'down',end:'down'});
 const placed=chain(p,S,'v',[cx,160],a.items,ws);
 const last=placed.at(-1)!;
 a.note?.forEach((n,k)=>math(p,8,last.bottom[1]+48+k*22,n,{size:S.note-2,color:C.muted,width:320}));
 connect(p,ws);p.height=last.bottom[1]+(a.note?62+(a.note.length-1)*22:34);return p;
}
export default spec('01-indexer-projections',L('indexer가 만드는 세 가지','Three things the indexer builds'),L('MLA의 Query latent와 X에서 · query, key, head 가중치','From MLA’s query latent and X · query, key, head weights'),L('Lightning indexer는 MLA의 Query latent Cᵠ에서 head별 indexer query를, X에서 모든 head가 공유하는 검색용 key와 head별 가중치를 만든다. 검색용 key는 FP8로 캐시된다. 상자 폭은 열 차원의 크기 순서를 따른다.','The lightning indexer builds per-head queries from MLA’s query latent Cᵠ, and from X a key shared by all indexer heads plus one weight per head. The indexer key is cached in FP8. Box widths follow the order of column sizes.'),(l,m)=>[0,1,2].map(i=>m?lane(l,i):desktop(l,i)));
