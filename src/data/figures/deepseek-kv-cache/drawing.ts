import {Panel,C,wrap,type Label,type Locale,type FigureSpec} from '@llm-systems/viz';
export const L=(ko:string,en:string):Label=>[ko,en];

// Long-context KV cache growth per original token, g = lim M(N)/N, for one copy of the model body.
// "packed" is the cache format of public serving code: FlashMLA (V3.2, commit ba89a34) and SGLang's DeepSeek-V4
// kernels (kv_layout.py: v4 = 448 FP8 + 64 BF16 + 7 UE8M0 scales + 1 pad = 584 B; v41_fp4 = 256 + 32 E4M3 scales
// = 288 B; v41 = 512 FP8 + 16 UE8M0 = 528 B; FP4 indexer key 64 + 4 UE8M0 = 68 B). V4 includes SGLang's page
// padding (256-token pages: 64 CSA entries → 37,440 B, 2 HCA entries → 1,728 B). "bf16" is kept for the text only.
// The article works out each value in its calculation sections and lists these sources.
export interface Row {key:string;name:Label;layers:number;format:Label;bf16:{main:number;index:number};packed:{main:number;index:number;assumed?:boolean};swa?:{bf16:number;packed:number}}
export const ROWS:Row[]=[
 {key:'mha',name:L('가상 MHA','Hypothetical MHA'),layers:60,format:L('BF16 가정 · 비교 기준','assumed BF16 · reference'),bf16:{main:60*128*256*2,index:0},packed:{main:60*128*256*2,index:0}},
 {key:'v2',name:'V2',layers:60,format:'BF16',bf16:{main:60*576*2,index:0},packed:{main:60*576*2,index:0}},
 {key:'v32',name:'V3.2',layers:61,format:L('KV FP8·RoPE BF16: 656 B · 검색용 key FP8: 132 B','KV FP8, RoPE BF16: 656 B · search key FP8: 132 B'),bf16:{main:61*576*2,index:61*128*2},packed:{main:61*656,index:61*132}},
 {key:'v4',name:'V4-Flash',layers:43,format:L('KV FP8·RoPE BF16: 584 B · 검색용 key FP4: 68 B · 페이지 패딩 포함','KV FP8, RoPE BF16: 584 B · search key FP4: 68 B · page padding included'),bf16:{main:21*1024/4+20*1024/128,index:21*256/4},packed:{main:21*37440/256+20*1728/256,index:21*4352/256},
  swa:{bf16:43*128*1024,packed:43*128*584}},
 {key:'v41',name:'V4.1-Flash',layers:40,format:L('KV FP4: 288 B · 검색용 key FP4: 68 B','KV FP4: 288 B · search key FP4: 68 B'),bf16:{main:2.5*1024,index:2.5*256},packed:{main:2.5*288,index:2.5*68},swa:{bf16:40*128*1024,packed:40*128*528}},
];
export type Mode='bf16'|'packed';
const total=(r:Row,m:Mode)=>r[m].main+r[m].index;
const fmt=(v:number)=>Math.round(v).toLocaleString('en-US');
const mb=(v:number)=>(v/1e6).toFixed(1)+' MB';
// Logical bytes read by one decode step at N = 131,072 visible positions, all layers, BF16 (2 B per element).
// Each layer's required cache entries are counted once; shared caches are counted again for every layer that reads
// them. Assumes an implementation that reads only the selected entries; V3.2's reference main attention and V4.1's
// reference Reindex score all entries and then mask, so these are not their actual accesses. Not measured on a GPU.
const N=131072;
export const READS:{key:string;name:Label;kv:number;index:number;kvExpr:string;indexExpr:string}[]=[
 {key:'mha',name:L('가상 MHA','Hypothetical MHA'),kv:N*60*128*256*2,index:0,kvExpr:'N × 3,932,160',indexExpr:''},
 {key:'v2',name:'V2',kv:60*N*576*2,index:0,kvExpr:'60 × N × 1,152',indexExpr:''},
 {key:'v32',name:'V3.2',kv:61*2048*576*2,index:61*N*128*2,kvExpr:'61 × 2,048 × 1,152',indexExpr:'61 × N × 256'},
 {key:'v4',name:'V4-Flash',kv:(21*512+20*N/128+43*128)*1024,index:21*(N/4)*256,kvExpr:'(21 × 512 + 20 × N/128 + 43 × 128) × 1,024',indexExpr:'21 × N/4 × 256'},
 {key:'v41',name:'V4.1-Flash',kv:(38*512+40*128)*1024,index:(3*N/2+N+4*16384)*256,kvExpr:'(38 × 512 + 40 × 128) × 1,024',indexExpr:'(3 × N/2 + N + 4 × 16,384) × 256'},
];
const gb=(v:number)=>v>=1e9?(v/1e9).toFixed(v>=1e11?0:v>=1e10?1:2)+' GB':(v/1e6).toFixed(v>=1e8?0:1)+' MB';

// Two graphs share the model rows: storage on the left (B per token, deployed formats) and reads on the right
// (B per decode step, BF16). Their units differ, so each has its own log axis. A read bar's length is the total;
// inside it, KV and search keys split the length in proportion (not on the log scale). On mobile the read graph
// sits under the storage graph.
const AX={store:{lo:2,hi:7,ticks:['100 B','1 kB','10 kB','100 kB','1 MB','10 MB']},read:{lo:7,hi:12,ticks:['10 MB','100 MB','1 GB','10 GB','100 GB','1 TB']}};
type Opt={upTo?:number;focus?:number};
const isFocus=(o:Opt,i:number)=>o.focus===undefined||o.focus===i;
// Text lines under each bar; storage and read rows get the same height so the two graphs line up.
function rowLines(l:Locale,o:Opt){
 const tr=(s:Label)=>typeof s==='string'?s:s[l==='en'?1:0],base=total(ROWS[0],'packed');
 return ROWS.map((r,i)=>{
  const v=total(r,'packed'),f=isFocus(o,i),rd=READS[i],t=rd.kv+rd.index;
  const store=[`${fmt(v)} B · ${i===0?tr(L('기준','baseline')):tr(L(`MHA의 약 1/${fmt(base/v)}`,`≈1/${fmt(base/v)} of MHA`))}`];
  const extra:{t:string;c:string}[]=f?[{t:tr(r.format),c:C.muted},...(r.swa?[{t:tr(L(`+ 별도: local KV (SWA, 최근 128위치) 약 ${mb(r.swa.packed)}`,`+ separately: local KV (SWA, last 128 positions), about ${mb(r.swa.packed)}`)),c:C.orange}]:[])]:[];
  const read=rd.index?`${gb(t)} · KV ${gb(rd.kv)} + ${tr(L('검색용 key','search keys'))} ${gb(rd.index)}`:`${gb(t)} · KV`;
  return {r,i,v,f,store,extra,read,kv:rd.kv,key:rd.index};
 });
}
function graph(l:Locale,m:boolean,kind:'store'|'read',o:Opt){
 const W=m?328:528,tr=(s:Label)=>typeof s==='string'?s:s[l==='en'?1:0],ax=AX[kind];
 const title=kind==='store'?L('저장: 토큰당 증가량','Stored: added per token'):L('읽기: 토큰 하나 생성','Read: per generated token');
 const p=new Panel(l,title,0,W),x1=W-(m?14:24),span=x1,X=(v:number)=>span*(Math.log10(v)-ax.lo)/(ax.hi-ax.lo),bh=m?14:18,lh=m?18:22;
 const upTo=o.upTo??ROWS.length-1,rows=rowLines(l,o);
 const sub=kind==='store'?L('긴 문맥 평균 · 배포 캐시 형식','long-context average · deployed cache formats'):L('문맥 131,072토큰 · 모든 층 · BF16 환산','131,072-token context · all layers · BF16');
 p.text(0,96,sub,{size:m?12:15,color:C.muted,width:W});
 let y=m?120:128;
 if(kind==='read'){
  ([[C.blue,L('attention이 읽는 KV','KV read by attention')],[C.red,L('위치를 고르려고 읽는 검색용 key','search keys read to pick positions')]] as const).forEach(([c,t],j)=>{
   p.raw(`<rect x="0" y="${y+j*24-12}" width="22" height="14" rx="3" fill="${c}" fill-opacity=".85"/>`);p.text(30,y+j*24,t,{size:m?12:15,width:W-30});});
 }
 // Desktop keeps the legend's space in both graphs so their rows line up; mobile stacks them, so only reads need it.
 y+=m?(kind==='read'?52:4):56;
 const gridAt=p.parts.length,top=y-8;
 for(const row of rows){
  if(row.i>upTo)continue;
  const ink=row.f?C.ink:C.muted,op=row.f?.9:.45;
  p.text(0,y+14,`${tr(row.r.name)} · ${row.r.layers}${l==='en'?' layers':'층'}`,{size:m?14:17,weight:row.f?700:400,color:ink,width:W});
  const by=y+24;
  if(kind==='store'){
   p.raw(`<rect x="0" y="${by}" width="${X(row.v).toFixed(1)}" height="${bh}" rx="3" fill="${row.r.key==='mha'?C.gray:C.blue}" fill-opacity="${op}"/>`);
  }else{
   const w=X(row.kv+row.key),kw=w*row.kv/(row.kv+row.key);
   p.raw(`<rect x="0" y="${by}" width="${kw.toFixed(1)}" height="${bh}" fill="${C.blue}" fill-opacity="${op}"/>`);
   if(row.key)p.raw(`<rect x="${kw.toFixed(1)}" y="${by}" width="${(w-kw).toFixed(1)}" height="${bh}" fill="${C.red}" fill-opacity="${op}"/>`);
  }
  let ty=by+bh+lh-4;
  const main=kind==='store'?row.store[0]:row.read;
  p.text(0,ty,main,{size:m?13:16,weight:row.f?700:400,color:ink,width:W});ty+=wrap(main,W,m?13:16).length*lh;
  // Storage-only lines; the read graph keeps the same row height so rows stay aligned.
  const ex=row.extra.reduce((n,e)=>n+wrap(e.t,W,m?12:15).length,0);
  if(kind==='store')for(const e of row.extra){p.text(0,ty,e.t,{size:m?12:15,color:e.c,width:W});ty+=wrap(e.t,W,m?12:15).length*lh;}
  const readLines=wrap(row.read,W,m?13:16).length,storeLines=wrap(row.store[0],W,m?13:16).length;
  y=by+bh+(Math.max(readLines,storeLines)+ (m&&kind==='read'?0:ex))*lh+(m?(kind==='read'?0:0):0)+ (m?16:20);
  if(m&&kind==='read')y=by+bh+readLines*lh+16;
  if(m&&kind==='store')y=by+bh+(storeLines+ex)*lh+16;
 }
 // Axis under the last visible row; grid lines go under the bars.
 ax.ticks.forEach((t,i)=>{const x=span*i/(ax.hi-ax.lo);
  p.parts.splice(gridAt,0,`<path d="M${x} ${top} L${x} ${y}" stroke="${C.line}" stroke-width="1" fill="none"/>`);
  p.text(x,y+(m?18:22),t,{size:m?11:14,color:C.muted,anchor:i===0?'start':i===ax.ticks.length-1?'end':'middle',width:80});});
 y+=m?44:52;
 const notes:Label[]=kind==='store'?[L('로그 눈금: 한 칸에 10배, 왼쪽 끝은 100 B입니다.','Log scale: each step is 10×; the left edge is 100 B.'),L('형식 줄의 bytes는 캐시 항목 하나의 크기이며 scale을 포함합니다.','Bytes in the format lines are per cache entry, scales included.')]
  :[L('로그 눈금: 막대 길이는 합계, 막대 안의 칸은 KV와 검색용 key의 비율입니다.','Log scale: bar length is the total; the parts inside show the KV/search-key ratio.'),L('층마다 필요한 KV와 검색 후보 key를 한 번씩 센 양 · 실측 아님','KV and candidate search keys each layer needs, counted once · not measured')];
 for(const n of notes){p.text(0,y,n,{size:m?12:14,color:C.muted,width:W});y+=wrap(tr(n),W,m?12:14).length*(m?12:14)*1.4+6;}
 p.height=y;return p;
}
export function spec(id:string,title:Label,sub:Label,alt:Label,o:Opt={}):FigureSpec{
 return{articleId:'deepseek-kv-cache',figureId:id,number:'deepseek-kv-cache-'+id,eyebrow:L('KV 캐시 비교','KV cache comparison'),title,subtitle:sub,captionIn:'article',caption:alt,alt,
  sources:[{label:'DeepSeek-V2 report · §2.1, Table 1',url:'https://arxiv.org/abs/2405.04434'},
   {label:'FlashMLA FP8 KV cache (V3.2)',url:'https://github.com/deepseek-ai/FlashMLA/blob/ba89a3466e9470ad08ab39738d4e7bb66989e1e7/README.md#fp8-kv-cache'},
   {label:'SGLang DeepSeek-V4 KV layout',url:'https://github.com/sgl-project/sglang/blob/main/python/sglang/kernels/ops/attention/dsv4/kv_layout.py'},
   {label:'DeepSeek-V4.1-Flash report · §2.3, §2.4.4',url:'https://arxiv.org/abs/2609.19969'}],
  panels:(l,m)=>[graph(l,!!m,'store',o),graph(l,!!m,'read',o)]};
}
