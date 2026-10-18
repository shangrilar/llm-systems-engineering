import {Panel,C,L,math,spec,SZ} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
// Hierarchical Sparse Indexer (report §2.3.2, Fig. 5): used only in the decoder. For one query the first Full layer scores every causally visible
// main-KV position, takes its own top-k, and also builds a candidate pool from the blocks with the largest block-max scores. Later Reindex layers
// score only the pool and take their own top-k inside it; Reuse layers do no indexing. The pool is larger than the final top-k and differs per query.
// Teaching size: 32 positions, blocks of 4 (real 8), 3 blocks (real 2,048), top-k 3 (real 512). Scores are made up for teaching.
const N=32,B=4,NB=3,K=3;
const s1=(i:number)=>((i*11+8)%19)/18,s2=(i:number)=>((i*7+6)%23)/22;
const top=(idx:number[],f:(i:number)=>number,k:number)=>[...idx].sort((a,b)=>f(b)-f(a)||a-b).slice(0,k);
const all=Array.from({length:N},(_,i)=>i);
const blocks=Array.from({length:N/B},(_,b)=>b);
const blockMax=(b:number)=>Math.max(...all.slice(b*B,b*B+B).map(s1));
const lastBlock=blocks.length-1; // the block holding the query's newest position is always kept (reference code select_candidate_blocks)
const pickedBlocks=[lastBlock,...top(blocks.filter(b=>b!==lastBlock),blockMax,NB-1)].sort((a,b)=>a-b);
const pool=all.filter(i=>pickedBlocks.includes(Math.floor(i/B)));
const topFull=top(all,s1,K),topRe=top(pool,s2,K);
type Mode='scored'|'pool'|'none';
function grid(p:Panel,x:number,y:number,cols:number,cw:number,mode:Mode,f:(i:number)=>number,sel:number[],showBlocks:boolean){
 const st=cw+3,rows=Math.ceil(N/cols),at=(i:number)=>[x+(i%cols)*st,y+Math.floor(i/cols)*(cw+10)] as const;
 all.forEach(i=>{
  const [cx,cy]=at(i),inPool=pool.includes(i),on=mode==='scored'||(mode==='pool'&&inPool);
  if(on)p.raw(`<rect x="${cx}" y="${cy}" width="${cw}" height="${cw}" rx="4" fill="${C.red}" fill-opacity="${(.1+.55*f(i)).toFixed(2)}" stroke="${C.red}" stroke-opacity=".35"/>`);
  else p.rect(cx,cy,cw,cw,mode==='none'?C.grayFill:C.paper,C.gray,4,true);
  if(sel.includes(i))p.rect(cx-1.5,cy-1.5,cw+3,cw+3,'none',C.teal,5);
 });
 if(showBlocks)pickedBlocks.forEach(b=>{const first=b*B,[cx,cy]=at(first),w=B*st-3;p.rect(cx-4,cy-5,w+8,cw+10,'none',C.blue,6);p.text(cx-4,cy-9,b===lastBlock?L('최신 · 고정','newest · pinned'):L('점수로 선택','by score'),{size:13,color:C.blue,width:w+24});});
 return rows*(cw+10);
}
function build(l:Locale,mobile:boolean){
 const S=mobile?SZ.mob:SZ.desk,W=mobile?328:1104,cols=mobile?16:32,cw=mobile?17:30,x=mobile?4:0;
 const p=new Panel(l,null,0,W);let y=0;
 const head=(t:Label,sub:Label)=>{math(p,x,y+22,t,{size:S.title,weight:700,color:C.ink,width:W});math(p,x,y+(mobile?46:48),sub,{size:S.note-2,color:C.muted,width:W});y+=mobile?66:72;};
 const lg:Label[]=[L('빨강 농도 = 점수(교육용) · 청록 테두리 = 최종 top-3 · 파란 상자 = 고른 블록 · 점선 회색 = 점수 안 매김','red shade = score (made up) · teal outline = final top-3 · blue box = chosen block · dashed grey = not scored'),
  L('예시: 한 query가 볼 수 있는 32위치 · 블록당 위치·선택 블록·최종 선택: 예시 4·3·3 / 실제 8·최대 2,048·512','Example: 32 positions visible to one query · per-block positions, blocks chosen, final picks: example 4, 3, 3 / real 8, up to 2,048, 512')];
 if(mobile){const m:Label[]=[L('빨강 농도 = 점수 (교육용)','red shade = score (made up)'),L('청록 테두리 = 최종 top-3','teal outline = final top-3'),L('파란 상자 = 고른 블록','blue box = chosen block'),L('점선 = 점수를 매기지 않음','dashed = not scored'),L('윗줄 위치 0–15 · 아랫줄 16–31','top line 0–15 · bottom line 16–31'),L('블록당 4위치 · 3블록 · top-3 (실제 8 · 2,048 · 512)','4 per block · 3 blocks · top-3 (real 8 · 2,048 · 512)')];m.forEach((t,j)=>p.text(8,22+j*22,t,{size:S.note-2,color:C.muted,width:316}));y=164;}
 else{lg.forEach((t,j)=>math(p,0,22+j*26,t,{size:S.note-2,color:C.muted,width:1100}));y=84;}
 head(L('① 첫 Full 층 · 전체를 점수 매김','① First Full layer · scores everything'),L('자기 top-3 + 블록 최댓값으로 후보 블록','own top-3 + candidate blocks by block-max'));
 const h1=grid(p,x,y+8,cols,cw,'scored',s1,topFull,true);y+=h1+34;
 math(p,x,y,L(`후보 pool: ${NB}블록 × ${B} = ${pool.length}위치 (> top-${K})`,`pool: ${NB} blocks × ${B} = ${pool.length} positions (> top-${K})`),{size:S.note-1,weight:600,color:C.blue,width:W});y+=mobile?40:44;
 head(L('② Reindex 층 · pool만 점수 매김','② Reindex layer · scores the pool'),L('pool 안에서 자기 top-3 (①과 다를 수 있다)','own top-3 inside the pool (may differ from ①)'));
 const h2=grid(p,x,y+8,cols,cw,'pool',s2,topRe,false);y+=h2+34;
 head(L('③ Reuse 층 · 새 indexer 점수 없음','③ Reuse layer · no new scoring'),L('②의 선택 재사용','reuses ②’s selection'));
 const h3=grid(p,x,y+8,cols,cw,'none',s2,topRe,false);y+=h3+34;
 const notes:Label[]=[L('후보 pool은 최종 top-k가 아니다 · pool은 query마다 다르다','the candidate pool is not the final top-k · the pool differs per query')];
 if(mobile){const m:Label[]=[L('후보 pool ≠ 최종 top-k','pool ≠ final top-k'),L('pool은 query마다 다르다','the pool differs per query')];m.forEach((t,j)=>p.text(8,y+j*22,t,{size:S.note-2,color:C.muted,width:316}));}
 else notes.forEach((t,j)=>math(p,0,y+j*26,t,{size:S.note-2,color:C.muted,width:1100}));
 p.height=y+(mobile?70:40);return p;
}
export default spec('05-hierarchical-indexer',L('계층형 sparse indexer','Hierarchical sparse indexer'),L('decoder 전용 · 첫 Full 층이 후보 pool을 만들고 뒤의 Reindex가 그 안에서만 점수를 매긴다','decoder only · the first Full layer builds a candidate pool and later Reindex layers score only inside it'),L('계층형 sparse indexer는 decoder에서만 쓰인다. 한 query에 대해 첫 Full 층이 인과적으로 볼 수 있는 모든 main KV 위치를 점수 매기고 자기 top-k를 고르며, 블록별 최댓값이 큰 블록들을 골라 후보 pool을 만든다. 뒤의 Reindex 층은 pool 안의 위치만 점수 매겨 자기 top-k를 고르고, Reuse 층은 점수를 매기지 않고 최근의 선택을 그대로 쓴다. 후보 pool은 최종 top-k보다 크다.','The hierarchical sparse indexer is used only in the decoder. For one query the first Full layer scores every causally visible main-KV position, picks its own top-k, and builds a candidate pool from the blocks with the largest block-max scores. Later Reindex layers score only positions in the pool and pick their own top-k; Reuse layers score nothing and reuse the latest selection. The pool is larger than the final top-k.'),(l,m)=>[build(l,!!m)]);
