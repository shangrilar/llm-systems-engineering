import {Panel,C,L,math,badge,spec,SZ,embed,type Sizes} from './drawing';
import {connect,flowMatrix,flowStep,type Label,type Locale,type Tone,type Wire} from '@llm-systems/viz';
// One CSA2 layer in three modes, drawn with the same rows so the modes can be compared row by row.
// Dashed = borrowed from an earlier layer · solid = computed in this layer · grey = not run.
// Every mode keeps its own main query Q, its own window KV E^{win} and its own core attention (§2.3).
// The top-k ids name rows of the main compressed KV (not the blocks of the hierarchical indexer, which is a separate figure).
// Teaching values: top-k = 2 (the layers use 512), window n_win (128). Ids are an example for one query and one KV bank.
type Mode='full'|'reindex'|'reuse';
const W=360,IDS:Record<Mode,string>={full:'0, 3',reindex:'1, 3',reuse:'1, 3'};
const TITLE:Record<Mode,Label>={full:L('Full','Full'),reindex:L('Reindex','Reindex'),reuse:L('Reuse','Reuse')};
const LEAD:Record<Mode,Label>={full:L('KV와 선택을 모두 새로 만든다','builds both the KV and the selection'),reindex:L('KV는 최근 Full 층 것, 선택은 다시 한다','KV from the latest Full layer, reselects'),reuse:L('KV: 최근 Full · 선택: 최근 Full/Reindex 것','KV: last Full · picks: last Full/Reindex')};
function borrowed(p:Panel,m:{x:number;y:number;width:number;height:number},tone:Tone){p.rect(m.x+1,m.y+1,m.width-2,m.height-2,C.paper,C.paper,0);p.rect(m.x,m.y,m.width,m.height,'none',C[tone],0,true);}
function column(l:Locale,S:Sizes,mode:Mode,height:number):{p:Panel;ws:Wire[]}{
 const p=new Panel(l,null,height,W),ws:Wire[]=[],cx=180,old=mode!=='full',skip=mode==='reuse';
 p.text(cx,34,TITLE[mode],{size:S.title+4,weight:700,anchor:'middle',width:W,color:C.ink});
 math(p,cx,62,LEAD[mode],{size:S.note-2,color:C.muted,anchor:'middle',width:W});
 // A: compressed main KV (and the indexer keys, which Reuse never reads)
 const kv=flowMatrix(p,S,44,110,'C^{Comp}','N_c','c',{w:64,tone:'teal',dims:'right'});
 if(old)borrowed(p,kv,'teal');
 let ki;
 if(!skip){ki=flowMatrix(p,S,250,110,'K^{IComp}','N_c','d_I',{w:48,tone:'red',dims:'right'});if(old)borrowed(p,ki,'red');}
 // B: indexer scoring with this layer's own indexer query
 flowStep(p,S,250,252,skip?L('Indexer 없는 층','no indexer here'):L('Indexer 점수','Indexer scores'),{w:160,tone:skip?'gray':'red'});
 if(skip)p.rect(250-80,252-17,160,34,'none',C.gray,8,true);
 if(!skip){
  const qi=flowMatrix(p,S,116,228,'q^I','n_I','d_I',{w:48,tone:'red',dims:'right'});
  ws.push({from:[qi.x+qi.width,252],to:[250-80-2,252],start:'right',end:'right',tone:'red'});
  ws.push({from:[250,ki!.bottom],to:[250,252-17-2],start:'down',end:'down',tone:'red'});
 }
 // C: ids of the selected main-KV rows
 const idx=flowMatrix(p,S,250,332,'top-k','1','k',{w:40,tone:'red',dims:'right'});
 if(skip)borrowed(p,idx,'red');
 p.text(250,332+30,IDS[mode],{size:S.dim-2,anchor:'middle',width:38,color:C.red,weight:600});
 if(!skip)ws.push({from:[250,252+17],to:[250,idx.stop],start:'down',end:'down',tone:'red'});
 badge(p,S,60,404,mode==='full'?L('새로 선택','new selection'):mode==='reindex'?L('다시 선택','reselected'):L('앞 층의 선택','earlier selection'),mode==='reuse'?'gray':'blue');
 // D: window KV (always computed here)
 const win=flowMatrix(p,S,140,470,'E^{win}','n_{win}','c',{w:64,tone:'orange',dims:'right'});
 // E: pick the k rows and join them with the window KV
 const gx=130;
 flowStep(p,S,gx,610,L('선택 k행 + 윈도','pick k rows + window'),{w:200,tone:'teal'});
 ws.push({from:[44,kv.bottom],to:[100,610-17-2],start:'down',end:'down',tone:'teal',via:[[44,560],[100,560]]});
 ws.push({from:[win.cx,win.bottom],to:[win.cx,610-17-2],start:'down',end:'down',tone:'orange'});
 ws.push({from:[250,idx.bottom],to:[200,610-17-2],start:'down',end:'down',tone:'red',via:[[250,560],[200,560]]});
 const E=flowMatrix(p,S,gx,690,'E^{attn}','k+n_{win}','c',{w:64,tone:'teal',dims:'right'});
 ws.push({from:[gx,610+17],to:[gx,E.stop],start:'down',end:'down',tone:'teal'});
 const Q=flowMatrix(p,S,285,690,'Q','n_h','c',{w:64,tone:'blue',dims:'right'});
 flowStep(p,S,cx,840,'Core attention',{w:220,tone:'blue'});
 ws.push({from:[gx,E.bottom],to:[gx,840-17-2],start:'down',end:'down',tone:'teal'});
 ws.push({from:[285,Q.bottom],to:[285,840-17-2],start:'down',end:'down',tone:'blue'});
 const O=flowMatrix(p,S,cx,920,'O','n_h','c',{w:64,tone:'blue',dims:'right'});
 ws.push({from:[cx,840+17],to:[cx,O.stop],start:'down',end:'down',tone:'blue'});
 return{p,ws};
}
const MODES:Mode[]=['full','reindex','reuse'];
const legend=(S:Sizes,mobile:boolean):Label[]=>mobile?[
 L('선택 수: 예시 2 / 실제 512 · 윈도 실제 128','top-k: example 2 / real 512 · window real 128'),
 L('점선 = 앞 층 것 · 실선 = 이 층이 계산','dashed = from an earlier layer · solid = computed here'),
 L('Full도 top-k만 읽는다','Full also reads only top-k')]:[
 L('선택 수·윈도: 예시 2·작게 / 실제 512·128','top-k, window: example 2, small / real 512, 128'),
 L('점선 = 앞 층에서 가져온 값 · 실선 = 이 층이 계산','dashed = borrowed · solid = computed here'),
 L('Full도 dense가 아니라 top-k만 읽는다','Full is not dense either: it reads only top-k')];
const COLH=1010;
function desktop(l:Locale){
 const S=SZ.desk,p=new Panel(l,null,0,1104),lg=legend(S,false);
 lg.forEach((t,i)=>math(p,0,26+i*26,t,{size:S.note-2,color:C.muted,width:1100}));
 const top=26+lg.length*26+14;
 MODES.forEach((m,i)=>{const {p:c,ws}=column(l,S,m,COLH);connect(c,ws);embed(p,c,i*372,top,`data-mode="${m}"`);});
 p.height=top+COLH;return p;
}
function mobile(l:Locale){
 const S=SZ.mob,p=new Panel(l,null,0,W),lg=legend(S,true);
 lg.forEach((t,i)=>math(p,8,22+i*22,t,{size:S.note-2,color:C.muted,width:W-12}));
 let y=22+lg.length*22+16;
 MODES.forEach((m,i)=>{if(i){p.line(0,y,W,y,C.line,1);y+=10;}const {p:c,ws}=column(l,S,m,COLH);connect(c,ws);embed(p,c,0,y,`data-mode="${m}"`);y+=COLH;});
 p.height=y;return p;
}
export default spec('01-three-modes',L('CSA2 층의 세 모드','Three modes of a CSA2 layer'),L('무엇을 새로 만들고 무엇을 가져오는가','What a layer builds and what it borrows'),L('CSA2의 한 층은 Full, Reindex, Reuse 중 하나다. Full은 압축 KV와 검색용 key를 만들고 자기 indexer query로 top-k KV 행을 새로 고른다. Reindex는 최근 Full 층의 KV와 검색용 key를 빌리고 자기 indexer query로 다시 고른다. Reuse 층에는 indexer가 없어서 KV와 최근 Full 또는 Reindex 층의 선택 목록을 빌린다. 세 모드 모두 선택한 k행과 자기 윈도 KV를 이어 붙이고, 자기 Query로 attention을 새로 계산한다.','A CSA2 layer is Full, Reindex or Reuse. Full builds the compressed KV and the indexer keys and selects the top-k KV rows with its own indexer query. Reindex borrows the KV and indexer keys from the latest Full layer and reselects with its own indexer query. A Reuse layer has no indexer: it borrows the KV and the latest Full or Reindex selection. All three join the k selected rows with their own window KV and compute attention with their own query.'),(l,m)=>[m?mobile(l):desktop(l)]);
