import {Panel,C,L,math,badge,spec,SZ,embed,type Sizes} from './drawing';
import {connect,flowMatrix,flowStep,flowWire,type Label,type Locale,type Tone,type Wire} from '@llm-systems/viz';
// One CSA2 layer in three modes. Panel 1 compares what each mode builds and what it borrows: the compressed main KV,
// the indexer keys, the indexer and the top-k selection. Panel 2 draws once what every mode then does in its own
// layer: join the selected rows with its own window KV and run attention with its own query (§2.3).
// Dashed = borrowed from an earlier layer · solid = computed in this layer · grey = not run.
// The top-k ids name rows of the main compressed KV (not the blocks of the hierarchical indexer, a separate figure).
// Teaching values: top-k = 2 (the layers use 512), window n_win (128). Ids are an example for one query and one KV bank.
type Mode='full'|'reindex'|'reuse';
const MODES:Mode[]=['full','reindex','reuse'];
const IDS:Record<Mode,string>={full:'0, 3',reindex:'1, 3',reuse:'1, 3'};
const TITLE:Record<Mode,Label>={full:L('Full','Full'),reindex:L('Reindex','Reindex'),reuse:L('Reuse','Reuse')};
const LEAD:Record<Mode,Label>={full:L('이 층이 KV와 선택을 만든다','this layer builds the KV and the picks'),reindex:L('KV는 빌리고 선택은 다시 한다','borrows the KV, picks again'),reuse:L('KV와 선택을 모두 빌린다','borrows the KV and the picks')};
const PICK:Record<Mode,Label>={full:L('새로 선택','new selection'),reindex:L('다시 선택','reselected'),reuse:L('앞 층의 선택','earlier selection')};
function borrowed(p:Panel,m:{x:number;y:number;width:number;height:number},tone:Tone){p.rect(m.x+1,m.y+1,m.width-2,m.height-2,C.paper,C.paper,0);p.rect(m.x,m.y,m.width,m.height,'none',C[tone],0,true);}
const legend=(mobile:boolean):Label[]=>mobile?[
 L('선택 수: 예시 2 / 실제 512 · 윈도 실제 128','top-k: example 2 / real 512 · window real 128'),
 L('점선 = 앞 층 것 · 실선 = 이 층이 계산','dashed = from an earlier layer · solid = computed here')]:[
 L('선택 수·윈도: 예시 2·작게 / 실제 512·128 · Full도 dense가 아니라 top-k만 읽는다','top-k, window: example 2, small / real 512, 128 · Full is not dense either: it reads only top-k'),
 L('점선 = 앞 층에서 가져온 값 · 실선 = 이 층이 계산 · 회색 = 실행하지 않음','dashed = borrowed · solid = computed here · grey = not run')];
// The indexer of one mode: its keys from the left, its own query from above, the selection to the right.
function selection(p:Panel,S:Sizes,mode:Mode,g:{kv:[number,number];key:[number,number];ix:[number,number];q:[number,number];top:[number,number]},ws:Wire[],h:boolean){
 const old=mode!=='full',skip=mode==='reuse';
 const kv=flowMatrix(p,S,g.kv[0],g.kv[1],'C^{Comp}','N_c','c',{w:64,tone:'teal',dims:'right'});if(old)borrowed(p,kv,'teal');
 let ki;
 if(!skip){ki=flowMatrix(p,S,g.key[0],g.key[1],'K^{IComp}','N_c','d_I',{w:48,tone:'red',dims:'right'});if(old)borrowed(p,ki,'red');}
 const [ix,iy]=g.ix;
 flowStep(p,S,ix,iy,skip?L('Indexer 없는 층','no indexer here'):L('Indexer 점수','Indexer scores'),{w:160,tone:skip?'gray':'red'});
 if(skip)p.rect(ix-80,iy-17,160,34,'none',C.gray,8,true);
 if(!skip){
  const qi=flowMatrix(p,S,g.q[0],g.q[1],'q^I','n_I','d_I',{w:48,tone:'red',dims:'right'});
  if(h){flowWire(p,[[ix,qi.y+qi.height],[ix,iy-19]],'red');ws.push({from:[ki!.x+ki!.width,iy],to:[ix-82,iy],start:'right',end:'right',tone:'red'});}
  else{ws.push({from:[qi.x+qi.width,iy],to:[ix-82,iy],start:'right',end:'right',tone:'red'});ws.push({from:[ix,ki!.y+ki!.height],to:[ix,iy-19],start:'down',end:'down',tone:'red'});}
 }
 const idx=flowMatrix(p,S,g.top[0],g.top[1],'top-k','1','k',{w:40,tone:'red',dims:'right'});if(skip)borrowed(p,idx,'red');
 p.text(g.top[0],g.top[1]+30,IDS[mode],{size:S.dim-2,anchor:'middle',width:38,color:C.red,weight:600});
 if(!skip)ws.push(h?{from:[ix+80,iy],to:[idx.x-6,iy],start:'right',end:'right',tone:'red'}:{from:[ix,iy+17],to:[ix,idx.stop],start:'down',end:'down',tone:'red'});
 return idx;
}
function modesDesktop(l:Locale){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],lg=legend(false);
 lg.forEach((t,i)=>math(p,0,26+i*26,t,{size:S.note-2,color:C.muted,width:1104}));
 MODES.forEach((mode,i)=>{
  const y=200+i*190;
  if(i)p.line(0,y-132,1104,y-132,C.line,1);
  math(p,0,y-6,TITLE[mode],{size:S.title+2,weight:700,width:200,color:C.ink});
  math(p,0,y+22,LEAD[mode],{size:S.note-3,width:220,color:C.muted});
  selection(p,S,mode,{kv:[300,y-24],key:[440,y-24],ix:[640,y],q:[640,y-94],top:[820,y-24]},ws,true);
  badge(p,S,880,y,PICK[mode],mode==='reuse'?'gray':'blue');
 });
 connect(p,ws);p.height=200+2*190+70;return p;
}
function modeMobile(l:Locale,mode:Mode,first:boolean){
 const S=SZ.mob,W=360,p=new Panel(l,null,0,W),ws:Wire[]=[],cx=180;let top=0;
 if(first){legend(true).forEach((t,i)=>math(p,8,22+i*22,t,{size:S.note-2,color:C.muted,width:W-12}));top=60;}
 p.text(cx,top+34,TITLE[mode],{size:S.title+4,weight:700,anchor:'middle',width:W,color:C.ink});
 math(p,cx,top+62,LEAD[mode],{size:S.note-2,color:C.muted,anchor:'middle',width:W});
 const t=top;
 selection(p,S,mode,{kv:[44,t+110],key:[250,t+110],ix:[250,t+252],q:[116,t+228],top:[250,t+332]},ws,false);
 badge(p,S,60,t+404,PICK[mode],mode==='reuse'?'gray':'blue');
 connect(p,ws);p.height=t+440;return p;
}
function modesMobile(l:Locale){
 const W=360,p=new Panel(l,null,0,W);let y=0;
 MODES.forEach((m,i)=>{if(i){p.line(0,y+6,W,y+6,C.line,1);y+=16;}const c=modeMobile(l,m,i===0);embed(p,c,0,y,`data-mode="${m}"`);y+=c.height;});
 p.height=y;return p;
}
// Panel 2: the attention every mode runs in its own layer, drawn once.
const COMMON:Label=L('세 모드 공통 · 각 층이 자기 Query로 attention을 따로 계산','all three modes · each layer runs its own attention with its own query');
function commonDesktop(l:Locale){
 const S=SZ.desk,p=new Panel(l,null,0,1104),ws:Wire[]=[],y=190;
 math(p,0,30,COMMON,{size:S.title,weight:600,width:1104});
 const kv=flowMatrix(p,S,90,y-24,'C^{Comp}','N_c','c',{w:64,tone:'teal',dims:'center'});
 const gx=360,gw=220;
 // The selection and this layer's own window KV both enter the join from above.
 const idx=flowMatrix(p,S,gx-60,y-94,'top-k','1','k',{w:40,tone:'red',dims:'right'});
 flowWire(p,[[gx-60,idx.y+idx.height],[gx-60,y-19]],'red');
 const win=flowMatrix(p,S,gx+60,y-94,'E^{win}','n_{win}','c',{w:64,tone:'orange',dims:'right'});
 flowWire(p,[[gx+60,win.y+win.height],[gx+60,y-19]],'orange');
 math(p,gx+100,y-110,L('이 층의 local KV','this layer’s local KV'),{size:S.note-3,width:200,color:C.orange});
 flowStep(p,S,gx,y,L('선택 k행 + 윈도','pick k rows + window'),{w:gw,tone:'teal'});
 ws.push({from:[kv.x+kv.width,y],to:[gx-gw/2-2,y],start:'right',end:'right',tone:'teal'});
 const E=flowMatrix(p,S,590,y-24,'E^{attn}','k+n_{win}','c',{w:64,tone:'teal',dims:'center'});
 ws.push({from:[gx+gw/2,y],to:[E.x-6,y],start:'right',end:'right',tone:'teal'});
 const cx=810,cw=220;
 const Q=flowMatrix(p,S,cx,y-94,'Q','n_h','c',{w:64,tone:'blue',dims:'right'});
 flowWire(p,[[cx,Q.y+Q.height],[cx,y-19]],'blue');
 flowStep(p,S,cx,y,'Core attention',{w:cw,tone:'blue'});
 ws.push({from:[E.x+E.width,y],to:[cx-cw/2-2,y],start:'right',end:'right',tone:'teal'});
 const O=flowMatrix(p,S,1030,y-24,'O','n_h','c',{w:64,tone:'blue',dims:'center'});
 ws.push({from:[cx+cw/2,y],to:[O.x-6,y],start:'right',end:'right',tone:'blue'});
 connect(p,ws);p.height=y+80;return p;
}
function commonMobile(l:Locale){
 const S=SZ.mob,W=360,p=new Panel(l,null,0,W),ws:Wire[]=[];
 math(p,8,24,L('세 모드 공통','all three modes'),{size:S.title,weight:600,width:W-12});
 math(p,8,50,L('각 층이 자기 Query로 attention을 따로 계산','each layer runs its own attention with its own query'),{size:S.note-2,width:W-12,color:C.muted});
 const kv=flowMatrix(p,S,44,110,'C^{Comp}','N_c','c',{w:64,tone:'teal',dims:'right'});
 const idx=flowMatrix(p,S,250,110,'top-k','1','k',{w:40,tone:'red',dims:'right'});
 const win=flowMatrix(p,S,150,110,'E^{win}','n_{win}','c',{w:64,tone:'orange',dims:'right'});
 const gx=150,gy=250;
 flowStep(p,S,gx,gy,L('선택 k행 + 윈도','pick k rows + window'),{w:200,tone:'teal'});
 ws.push({from:[44,kv.y+kv.height],to:[100,gy-19],start:'down',end:'down',tone:'teal',via:[[44,200],[100,200]]});
 ws.push({from:[win.cx,win.y+win.height],to:[win.cx,gy-19],start:'down',end:'down',tone:'orange'});
 ws.push({from:[250,idx.y+idx.height],to:[200,gy-19],start:'down',end:'down',tone:'red',via:[[250,200],[200,200]]});
 const E=flowMatrix(p,S,gx,340,'E^{attn}','k+n_{win}','c',{w:64,tone:'teal',dims:'right'});
 ws.push({from:[gx,gy+17],to:[gx,E.stop],start:'down',end:'down',tone:'teal'});
 const Q=flowMatrix(p,S,290,340,'Q','n_h','c',{w:64,tone:'blue',dims:'right'});
 flowStep(p,S,180,480,'Core attention',{w:220,tone:'blue'});
 ws.push({from:[gx,E.y+E.height],to:[gx,480-19],start:'down',end:'down',tone:'teal'});
 ws.push({from:[290,Q.y+Q.height],to:[290,480-19],start:'down',end:'down',tone:'blue'});
 const O=flowMatrix(p,S,180,560,'O','n_h','c',{w:64,tone:'blue',dims:'right'});
 ws.push({from:[180,480+17],to:[180,O.stop],start:'down',end:'down',tone:'blue'});
 connect(p,ws);p.height=640;return p;
}
export default spec('01-three-modes',L('CSA2 층의 세 모드','Three modes of a CSA2 layer'),L('무엇을 새로 만들고 무엇을 가져오는가','What a layer builds and what it borrows'),L('CSA2의 한 층은 Full, Reindex, Reuse 중 하나다. Full은 압축 KV와 검색용 key를 만들고 자기 indexer query로 top-k KV 행을 새로 고른다. Reindex는 최근 Full 층의 KV와 검색용 key를 빌리고 자기 indexer query로 다시 고른다. Reuse 층에는 indexer가 없어서 KV와 최근 Full 또는 Reindex 층의 선택 목록을 빌린다. 세 모드 모두 선택한 k행과 자기 윈도 KV를 이어 붙이고, 자기 Query로 attention을 새로 계산한다.','A CSA2 layer is Full, Reindex or Reuse. Full builds the compressed KV and the indexer keys and selects the top-k KV rows with its own indexer query. Reindex borrows the KV and indexer keys from the latest Full layer and reselects with its own indexer query. A Reuse layer has no indexer: it borrows the KV and the latest Full or Reindex selection. All three join the k selected rows with their own window KV and compute attention with their own query.'),(l,m)=>m?[modesMobile(l),commonMobile(l)]:[modesDesktop(l),commonDesktop(l)]);
