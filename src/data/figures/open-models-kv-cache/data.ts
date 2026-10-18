import type {Label} from '@llm-systems/viz';
export const L=(ko:string,en:string):Label=>[ko,en];

// Long-context cost of the six models, computed from public configs and reports with one accounting:
// KV and search keys in BF16 (2 B per element), recurrent state matrices in FP32, conv states in BF16.
// One request, the model body only (no MTP/draft/vision), non-speculative decode, one copy of the state.
// "Access" counts the logical bytes of earlier-context state touched while making one output token:
// KV read, search-key read, recurrent matrix read + write. New KV writes and conv/PLE/ring updates are excluded.
// N is the number of visible positions. Formulas are long-context forms; N >= 4,096 in every figure.
// DeepSeek V4.1-Flash uses the same structure counts as the first feature (deepseek-kv-cache/drawing.ts READS) in BF16;
// its deployed format (FP4 main KV, 890 B per token) is discussed in the text.

export type Key='kimi'|'qwen'|'mimo'|'glm'|'hy4'|'ds';
export interface Model{
 key:Key;name:Label;layers:number;
 g:number;                        // B per token added for long context
 S:number;                        // B held regardless of context length (recurrent/local state)
 sKind:Label|null;                // what S is
 kv:(n:number)=>number;           // KV read per output token
 index:(n:number)=>number;        // search-key read per output token
 state:number;                    // recurrent matrix read + write per output token
 maxCtx:number;                   // config maximum context
}
const MLA=(512+64)*2;            // 1,152 B: latent 512 + shared RoPE key 64 per layer and token
const MIMO=8*(192+128)*2;         // 5,120 B: 8 KV heads × (K 192 + V 128)
const QSA_KV=2*2*256*2;           // 2,048 B: K+V × 2 KV heads × 256
const qsaTokens=(n:number)=>Math.min(2048,4*Math.floor(n/4))+n%4;   // 512 blocks + unfinished tail
const kdaMatrix=69*96*128*128*4,gdnMatrix=36*48*128*128*4;
// Fixed-state breakdown used by the state-size figure (same terms as S below).
export const STATE={
 kimi:{heads:96,layers:69,matrix:kdaMatrix,other:[{t:L('short conv (Q·K·V, 직전 3개)','short conv (Q, K, V; last 3)'),b:69*3*3*96*128*2}]},
 qwen:{heads:48,layers:36,matrix:gdnMatrix,other:[{t:L('short conv (Q·K·V, 직전 3개)','short conv (Q, K, V; last 3)'),b:36*3*(2*16*128+48*128)*2},
  {t:L('n-gram 임베딩 conv','n-gram embedding conv'),b:2560*4*9*2},{t:L('QSA 블록 버퍼·좌표','QSA block buffer and coordinates'),b:12*4*128*2+96}]}} as const;

// Fixed model order for every comparison figure: KV cache per token, largest first (GLM-5.3 and Hy4-preview tie).
export const MODELS:Model[]=[
 {key:'glm',name:'GLM-5.3',layers:78,
  g:78*MLA+21*128*2,S:0,sKind:null,
  kv:n=>78*Math.min(n,2048)*MLA,index:n=>21*n*128*2,state:0,maxCtx:1048576},
 {key:'hy4',name:'Hy4-preview',layers:78,
  g:78*MLA+21*128*2,S:0,sKind:null,
  kv:n=>78*Math.min(n,2048)*MLA,index:n=>21*n*128*2,state:0,maxCtx:1048576},
 {key:'mimo',name:'MiMo-V2.6-Pro',layers:70,
  g:10*MIMO,S:60*128*MIMO,sKind:L('SWA 60층 KV','SWA KV, 60 layers'),
  kv:n=>(10*n+60*Math.min(n,128))*MIMO,index:()=>0,state:0,maxCtx:1048576},
 {key:'kimi',name:'Kimi K3',layers:93,
  g:24*MLA,S:kdaMatrix+69*3*3*96*128*2,sKind:L('KDA 상태 행렬(FP32)·conv','KDA state matrices (FP32) and conv'),
  kv:n=>24*n*MLA,index:()=>0,state:2*kdaMatrix,maxCtx:1048576},
 {key:'qwen',name:'Qwen3.8-Flash-Next',layers:48,
  g:12*QSA_KV+12*128*2/4,S:gdnMatrix+36*3*(2*16*128+48*128)*2+2560*4*9*2+(12*4*128*2+96),sKind:L('GDN 상태 행렬(FP32)·conv 등','GDN state matrices (FP32), conv, etc.'),
  kv:n=>12*qsaTokens(n)*QSA_KV,index:n=>12*Math.floor(n/4)*128*2,state:2*gdnMatrix,maxCtx:262144},
 {key:'ds',name:'DeepSeek V4.1-Flash',layers:40,
  g:(3/2+1)*(512+128)*2,S:40*128*512*2,sKind:L('local KV','local KV'),
  kv:n=>(18*Math.min(512,Math.floor(n/2))+20*Math.min(512,n)+40*Math.min(n,128))*512*2,
  index:n=>(3*Math.floor(n/2)+n+4*Math.min(n,16384))*128*2,state:0,maxCtx:1048576},
];
export const N128=131072,N1M=1048576;
export const access=(m:Model,n:number)=>m.kv(n)+m.index(n)+m.state;
export const tr=(l:'ko'|'en',s:Label)=>typeof s==='string'?s:s[l==='en'?1:0];
// Decimal units, like the first feature.
export const bytes=(v:number)=>v>=1e9?(v/1e9).toFixed(v>=1e10?1:2)+' GB':v>=1e6?(v/1e6).toFixed(v>=1e8?0:1)+' MB':v>=1e3?(v/1e3).toFixed(1)+' kB':Math.round(v)+' B';
export const fmt=(v:number)=>Math.round(v).toLocaleString('en-US');
