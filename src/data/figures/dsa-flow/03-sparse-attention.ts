import {Panel,C,L,math,spec,SZ,chain,square,badge,type Item,type Placed,type Sizes} from './drawing';
import {connect,junction,type Label,type Wire} from '@llm-systems/viz';
// MLA's attention for one head in its absorbed (MQA) form, with the indexer's selection mask M from figure 2.
// Content and rotary scores are formed as in the MLA figures, then M keeps only the selected key positions.
// The figure shows the mask on full matrices; it does not claim how a kernel reads the selected entries.
const content:Item[]=[{t:'mat',name:'Q̂_h',col:'r_{kv}'},{t:'mul',op:{name:'C^{KV}',row:'T',col:'r_{kv}',tone:'blue'},ports:{t:true}}];
const rotary:Item[]=[{t:'mat',name:'Q^R_h',col:'d_r',tone:'teal'},{t:'mul',op:{name:'K^R',row:'T',col:'d_r',tone:'teal'},ports:{t:true}}];
const rest:Item[]=[
 {t:'sq',name:'S_h',mode:'full'},
 {t:'step',label:'+ M',w:70},
 {t:'step',label:'softmax',w:100},
 {t:'sq',name:'P_h',mode:'prob',tone:'teal'},
 {t:'mul',op:{name:'C^{KV}',row:'T',col:'r_{kv}',tone:'blue'}},
 {t:'mat',name:'U_h',col:'r_{kv}'},
];
// Desktop labels M beside it; mobile keeps the same legend under the figure.
const notes:{d:Label;m:Label[]}[]=[
 {d:'',m:[L('M: 흰 칸 0 (선택) · 회색 −∞','M: white 0 (selected) · grey −∞')]},
];
const cached=L('캐시','cached'),white=L('흰 칸 0 (선택)','white 0 (selected)'),grey=L('회색 −∞','grey −∞');
function join(p:Panel,S:Sizes,ws:Wire[],a:Placed,b:Placed,x:number,y:number){
 junction(p,S,x,y,'+');
 ws.push({from:a.right,to:[x,y-17],start:'right',end:'down'},{from:b.right,to:[x,y+17],start:'right',end:'up',tone:'teal'});
}
export default spec('03-sparse-attention',L('고른 위치에만 확률을 남기는 MLA','MLA that keeps probability only at picked positions'),L('흡수된 MLA 점수 + 선택 마스크 M · 한 head','Absorbed MLA scores + selection mask M · one head'),L('흡수된 MLA의 내용 점수와 위치 점수를 더한 S_h에 indexer의 선택 마스크 M을 더한 뒤 softmax를 취한다. 확률 P_h는 행마다 선택된 위치에만 값이 있고, 이것으로 Cᴷⱽ를 가중합해 U_h를 만든다.','Add the indexer’s selection mask M to the absorbed MLA score S_h, the sum of content and rotary scores, then apply softmax. P_h is nonzero only at the selected positions per row and weights Cᴷⱽ into U_h.'),(l,m)=>{
 const S=m?SZ.mob:SZ.desk,p=new Panel(l,null,0,m?328:1104),ws:Wire[]=[];
 let last:Placed[];
 if(!m){
  const a=chain(p,S,'h',[60,190],content,ws),b=chain(p,S,'h',[60,430],rotary,ws,{tone:'teal'});
  const x=Math.max(a[1].x,b[1].x)+100,y=310;join(p,S,ws,a[1],b[1],x,y);
  last=chain(p,S,'h',[x,y],[{t:'from'},...rest],ws).slice(1);
  // Which operands are read from the cache.
  badge(p,S,a[1].x+50,190-70,cached);badge(p,S,b[1].x+29,430-70,cached);
  // The mask M enters + M from below.
  const st=last[1],mk=square(p,S,st.x,y+170,'M','mask');
  ws.push({from:[st.x,mk.stop],to:[st.x,y+19],start:'up',end:'up',tone:'gray'});
  math(p,st.x+50,y+164,white,{size:S.note-3,color:C.muted,width:200});math(p,st.x+50,y+190,grey,{size:S.note-3,color:C.muted,width:200});
  last=[...last,{x:st.x,y:y+170,left:[mk.x,y+170],right:[mk.x+mk.width,y+170],top:[st.x,mk.stop],bottom:[st.x,mk.bottom+24]}];
 }else{
  // Mobile: the two score products side by side, then the rest of the chain downwards.
  const a=chain(p,S,'v',[56,40],content,ws),b=chain(p,S,'v',[214,40],rotary,ws,{tone:'teal'});
  const x=164,y=Math.max(a[1].y,b[1].y)+110;
  junction(p,S,x,y,'+');
  ws.push({from:a[1].bottom,to:[x-17,y],start:'down',end:'right'},{from:b[1].bottom,to:[x+17,y],start:'down',end:'left',tone:'teal'});
  last=chain(p,S,'v',[x,y],[{t:'from'},...rest],ws).slice(1);
  // The mask M enters + M from the right.
  const st=last[1],mk=square(p,S,268,st.y,'M','mask');
  ws.push({from:[mk.x,st.y],to:[st.x+37,st.y],start:'left',end:'left',tone:'gray'});
 }
 connect(p,ws);
 let yy=Math.max(...last.map(a=>a.bottom[1]))+(m?54:40);
 notes.forEach((n,i)=>{for(const s of m?n.m:[]){math(p,m?0:552,yy,s,{size:S.note-3,anchor:'start',color:C.muted,width:p.width});yy+=m?24:36;}if(m)yy+=8;});
 p.height=yy;return[p];
});
