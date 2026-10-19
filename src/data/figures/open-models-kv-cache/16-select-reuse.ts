import {numbered} from './numbers';
import {Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
import {L} from './data';
import {LW as W,stack,type Role} from './drawing';
// GLM-5.3 reuses the selection across layers (indexer_types: search at 0, 1, 2, 6, …). Only the search layers
// keep search keys; every layer stores its own MLA KV, so no KV is shared. Layers 0–7 are the real arrangement.
function panel(l:Locale){
 const p=new Panel(l,null,0,W);
 const sr=L('검색층','search'),rr=L('위치 재사용','reuse');
 const glm:Role[]=[0,1,2,3,4,5,6,7].map(i=>{const s=[0,1,2,6].includes(i);return {name:l==='en'?`layer ${i}`:`층 ${i}`,role:s?sr:rr,kv:'own',key:s,search:s?'full':'none',sel:s?'make':'reuse'};});
 p.height=stack(p,0,glm,i=>i>=3&&i<=5?2:i===7?6:null,null,'MLA KV')-20;
 return p;
}
export default {articleId:'open-models-kv-cache',figureId:'16-select-reuse',number:'open-models-kv-cache-16-select-reuse',layout:'wide',eyebrow:numbered('open-models-kv-cache/16-select-reuse',L('sparse attention','sparse attention')),
 title:L('검색하는 층 줄이기','Fewer layers that search'),
 subtitle:L('GLM-5.3 · 층 0–7의 실제 배치 · 선택 위치만 전달하고 KV는 층마다 저장','GLM-5.3 · real arrangement of layers 0–7 · only the selection is passed on; every layer stores its own KV'),
 captionIn:'article',screens:['desktop'],
 caption:L('GLM-5.3의 층 0–7에서는 층 0·1·2·6이 검색용 key로 위치를 고르고, 나머지 층은 그 위치를 재사용한다. 모든 층이 자기 MLA KV를 저장하므로 층 사이에서 나누는 것은 KV가 아니라 선택 결과다. 점선은 고른 위치의 전달이다.','In layers 0–7 of GLM-5.3, layers 0, 1, 2, 6 pick positions with search keys and the other layers reuse those positions. Every layer stores its own MLA KV, so what is shared is the selection, not the KV. Dashed lines pass selected positions.'),
 alt:L('GLM-5.3 층 0–7. 모든 층에 자기 KV가 있고, 층 0·1·2·6만 검색용 key로 검색해 선택 위치를 만들며, 나머지 층은 앞 검색층의 선택 위치를 점선으로 넘겨받아 재사용한다.','GLM-5.3 layers 0–7. Every layer has its own KV; only layers 0, 1, 2, 6 search with search keys and make a selection, and the other layers reuse the earlier selection passed along dashed arrows.'),
 sources:[{label:'GLM-5.3 config (indexer_types)',url:'https://huggingface.co/zai-org/GLM-5.3'},{label:'IndexCache',url:'https://arxiv.org/abs/2603.12201'}],
 panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
