import {numbered} from './numbers';
import {Panel,C,math,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L} from './data';
import {LW as W,X0,cx,stack,type Role} from './drawing';
// Fewer stored rows and fewer stores. r0: DeepSeek V4.1-Flash compresses along tokens in its four KV-making
// layers (compress_ratios: 2 in encoder layers 2, 8, 14; 1 in decoder layer 20). r1: DeepSeek shares the KV
// itself (kv_source_layer_ids [2, 8, 14, 20], index_source_layer_ids adds 24, 28, 32, 36; candidate_source_layer_id
// 20). Layers 20–27 are the real arrangement; other layers repeat the pattern. GLM-5.3's selection reuse, which
// shares no KV, is drawn in 16-select-reuse.
function panel(l:Locale){
 const p=new Panel(l,null,0,W);
 let y=0;
 // r0: compression along tokens.
 p.raw('<g data-path="r0">');
 p.text(0,30,L('저장 행 줄이기','Fewer stored rows'),{size:19,weight:700,width:W});
 p.text(0,56,L('DeepSeek V4.1-Flash · global KV를 만드는 네 층의 압축률','DeepSeek V4.1-Flash · compression ratio of the four layers that make global KV'),{size:15,color:C.muted,width:W});
 const tx=(i:number)=>X0+i*58;
 p.text(X0-14,112,L('토큰','tokens'),{size:14,color:C.muted,anchor:'end',width:200});
 for(let i=0;i<8;i++){p.rect(tx(i),90,50,30,C.grayFill,C.gray,5);p.text(tx(i)+25,110,String(i),{size:13,color:C.gray,anchor:'middle',width:50});}
 p.text(X0-14,162,L('층 2·8·14 (encoder)','layers 2, 8, 14 (encoder)'),{size:14,anchor:'end',width:240});
 // An entry is drawn as one cell, centred under the two tokens it merges (width is not bytes).
 for(let e=0;e<4;e++){const m=(tx(2*e)+tx(2*e+1)+50)/2;p.rect(m-25,140,50,30,C.blue,C.blue,5);p.text(m,160,`${2*e}–${2*e+1}`,{size:12,color:C.paper,anchor:'middle',width:50});}
 p.text(X0-14,212,L('층 20 (decoder)','layer 20 (decoder)'),{size:14,anchor:'end',width:240});
 for(let i=0;i<8;i++){p.rect(tx(i),190,50,30,C.blue,C.blue,5);p.text(tx(i)+25,210,String(i),{size:13,color:C.paper,anchor:'middle',width:50});}
 const rx=tx(8)+30;
 p.text(rx,162,L('토큰 2개 → entry 1개 (m = 2)','2 tokens → 1 entry (m = 2)'),{size:15,width:W-rx});
 p.text(rx,212,L('토큰마다 entry 1개 (m = 1)','1 entry per token (m = 1)'),{size:15,width:W-rx});
 math(p,0,262,L('토큰당 entry 3 × 1/2 + 1 = 2.5개 · entry 하나 = main KV 512 + 검색용 key 128 (BF16 1,280 B) → 3,200 B','entries per token 3 × 1/2 + 1 = 2.5 · one entry = main KV 512 + search key 128 (1,280 B in BF16) → 3,200 B'),{size:15,width:W});
 p.raw('</g>');
 y=290;
 // r1: DeepSeek shares the KV.
 p.raw('<g data-path="r1">');
 p.line(0,y,W,y,C.line,1);
 p.text(0,y+34,L('KV 자체 공유','Shared KV'),{size:19,weight:700,width:W});
 p.text(0,y+60,L('DeepSeek V4.1-Flash · 층 20–27 (실제 배치)','DeepSeek V4.1-Flash · layers 20–27 (real arrangement)'),{size:15,color:C.muted,width:W});
 const ds:Role[]=[20,21,22,23,24,25,26,27].map(i=>i===20?{name:l==='en'?'layer 20':'층 20',role:'Full',kv:'make',key:true,search:'full',sel:'make'}
  :i===24?{name:l==='en'?'layer 24':'층 24',role:'Reindex',kv:'read',key:false,search:'pool',sel:'make'}
  :{name:l==='en'?`layer ${i}`:`층 ${i}`,role:'Reuse',kv:'read',key:false,search:'none',sel:'reuse'});
 const y2=stack(p,y+76,ds,i=>i>=1&&i<=3?0:i>=5?4:null,0);
 // Reindex reads layer 20's search keys with its own query, inside layer 20's candidate pool.
 const ky=y+76+109,b=y+76;
 // Layer 20's search keys go down into layer 24's search (with layer 24's own search query).
 p.path(`M${cx(0)+40} ${ky} L${cx(4)} ${ky} L${cx(4)} ${b+141}`,C.red,1.6,false,true);
 p.text(cx(0)+52,ky-6,L('층 20의 검색용 key','layer 20’s search keys'),{size:12,color:C.red,width:200});
 p.text(cx(4)+14,b+168,L('자기 검색 query로','with its own search query'),{size:12,color:C.red,width:150});
 // Layer 20 makes two different things: its own top-512 selection and a candidate pool for the Reindex layers.
 p.rect(cx(1)-40,b+139,cx(3)-cx(1)+80,22,C.redFill,C.red,11);
 p.text((cx(1)+cx(3))/2,b+154,L('층 20이 만든 후보 pool · 최대 16,384위치','candidate pool from layer 20 · up to 16,384'),{size:12,color:C.red,anchor:'middle',width:cx(3)-cx(1)+80});
 p.path(`M${cx(0)+8} ${b+150} L${cx(1)-40} ${b+150}`,C.red,1.4,false,true);
 p.path(`M${cx(3)+40} ${b+150} L${cx(4)-8} ${b+150}`,C.red,1.4,false,true);
 p.text(cx(0)+14,b+214,'top-512',{size:12,color:C.red,width:80});p.text(cx(4)+14,b+214,'top-512',{size:12,color:C.red,width:80});
 p.raw('</g>');
 p.height=y2;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'13-sharing',number:'open-models-kv-cache-13-sharing',layout:'wide',eyebrow:numbered('open-models-kv-cache/13-sharing',L('토큰 압축과 KV 공유','Token compression and KV sharing')),
 title:L('저장 행과 저장소 수 줄이기','Fewer stored rows, fewer stores'),
 subtitle:L('묶어 저장하기 · KV 자체 나누기','store entries · share the KV itself'),
 captionIn:'article',screens:['desktop'],
 caption:L('DeepSeek V4.1-Flash는 global KV를 만드는 네 층 중 앞 세 층에서 토큰 2개씩을 묶고, 층 20은 압축 없이 토큰마다 entry를 만든다. DeepSeek은 층 20이 만든 global KV를 뒤 층이 그대로 읽고, Reindex 층은 층 20이 만든 후보 pool 안에서 자기 query로 다시 고른다. local KV는 모든 층이 따로 만든다. 실선은 저장소를 읽는 흐름, 점선은 고른 위치의 전달이다.','DeepSeek V4.1-Flash merges pairs of tokens in layers 2, 8, and 14, while layer 20 stores one entry per token without compression. In DeepSeek later layers read the KV made by layer 20. Solid lines read a store; dashed lines pass selected positions.'),
 alt:L('두 줄. 첫 줄은 토큰 8개가 층 2·8·14에서 entry 4개로, 층 20에서 entry 8개로 저장되고 토큰당 entry 2.5개, 3,200 B가 되는 계산이다. 둘째 줄은 DeepSeek 층 20–27로, 층 20만 해당 global KV와 검색용 key를 저장하고 나머지 층은 그 KV를 읽으며, 층 24는 층 20의 후보 안에서 다시 검색하고 나머지는 선택을 재사용한다.','Two rows. First: 8 tokens stored as 4 entries in layers 2, 8, 14 and 8 entries in layer 20, giving 2.5 entries and 3,200 B per token. Second: DeepSeek layers 20–27, where only layer 20 stores KV and search keys and the others read that KV; layer 24 re-searches within layer 20’s candidates and the rest reuse selections.'),
 sources:[{label:'DeepSeek-V4.1-Flash report · §2.3, §4.2.1',url:'https://arxiv.org/abs/2609.19969'}],
 panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
