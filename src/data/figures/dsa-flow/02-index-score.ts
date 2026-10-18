import {Panel,C,L,math,spec,SZ,chain,type Item} from './drawing';
import {connect,type Label,type Wire} from '@llm-systems/viz';
// Index score for one indexer head j, summed over heads, then the per-row top-k selection (report eq. 1).
// The selection mask M is the same pattern that figure 3 applies to MLA's scores.
const items:Item[]=[
 {t:'mat',name:'q^I_j',col:'d^I'},
 {t:'mul',op:{name:'k^I',row:'T',col:'d^I',tone:'blue'},ports:{t:true}},
 {t:'sq',name:'q^I_j (k^I)^T',mode:'full'},
 {t:'step',label:'ReLU',w:80},
 {t:'mul',sym:'⊙',op:{name:'w^I_j',row:'T',col:'1',tone:'blue'}},
 {t:'step',label:'Σⱼ',w:64,tone:'gray',input:L('다른 head','other heads')},
 {t:'sq',name:'I',mode:'causal'},
 {t:'step',label:'top-k',w:84},
 {t:'sq',name:'M',mode:'mask'},
];
// Only the mask legend stays under the figure; the formula and the scaling are explained in the article.
const lines:{d:Label;m:Label[]}[]=[
 {d:L('M: 흰 칸 0 (선택) · 회색 −∞','M: white 0 (selected) · grey −∞'),m:[L('M: 흰 칸 0 (선택) · 회색 −∞','M: white 0 (selected) · grey −∞')]},
];
export default spec('02-index-score',L('어떤 토큰을 볼지 고르는 점수','A score that picks which tokens to read'),L('indexer head j의 점수 → 모든 head 합 → 행마다 top-k','Score of indexer head j → sum over heads → top-k per row'),L('indexer head j마다 query와 공유 key를 내적하고 ReLU를 거쳐 head 가중치를 곱한다. 모든 head를 더한 점수 I에서 행마다 상위 k개 위치를 골라 선택 마스크 M을 만든다.','For each indexer head j, the query is dotted with the shared key, passed through ReLU and scaled by the head weight. Summing over heads gives the score I; each row keeps its top-k positions as the selection mask M.'),(l,m)=>{
 const S=m?SZ.mob:SZ.desk,p=new Panel(l,null,0,m?328:1104),ws:Wire[]=[];
 const placed=chain(p,S,m?'v':'h',m?[100,40]:[60,170],items,ws);
 connect(p,ws);
 const bottom=Math.max(...placed.map(a=>a.bottom[1]))+(m?50:70);
 let y=bottom;
 lines.forEach((n,i)=>{for(const s of m?n.m:[n.d]){math(p,m?0:552,y,s,{size:S.note-(m?3:2),anchor:m?'start':'middle',color:C.muted,width:p.width});y+=m?24:36;}if(m)y+=8;});
 p.height=y;return[p];
});
