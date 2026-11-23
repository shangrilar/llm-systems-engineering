// Obstacle-aware orthogonal routing for flow diagrams.
// Callers give only the endpoints and the directions of the first and last segment. Obstacles are read from what
// the panel has already drawn (rects, circles, estimated text boxes), so connectors are routed after all nodes.
import {connector} from './diagram';
import {units} from './text';
import type {Panel} from './panel';
import type {Tone} from './theme';
export type Dir='up'|'down'|'left'|'right';
type Pt=readonly [number,number];
type Box={x0:number;y0:number;x1:number;y1:number;m:number};
type Seg={a:Pt;b:Pt;from:Pt};
export interface Wire {from:Pt;to:Pt;start:Dir;end:Dir;tone?:Tone;via?:readonly Pt[];group?:string}
const STEP:Record<Dir,Pt>={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
const BEND=40,CROSS=60,OVERLAP=5000,RECT_M=8,TEXT_M=3,FIRST=10,LAST=24,SHARE=.5;
const num=(s:string,k:string)=>{const m=s.match(new RegExp(` ${k}="(-?[\\d.]+)"`));return m?+m[1]:NaN;};
// Reads drawn parts into obstacles. Child panels embedded with a transform are skipped (route inside them).
function obstacles(p:Panel){
 const boxes:Box[]=[],wires:Seg[]=[];
 for(const part of p.parts){
  if(part.includes('transform='))continue;
  for(const r of part.match(/<rect [^>]*>/g)??[])boxes.push({x0:num(r,'x'),y0:num(r,'y'),x1:num(r,'x')+num(r,'width'),y1:num(r,'y')+num(r,'height'),m:RECT_M});
  for(const c of part.match(/<circle [^>]*>/g)??[]){const x=num(c,'cx'),y=num(c,'cy'),r=num(c,'r');boxes.push({x0:x-r,y0:y-r,x1:x+r,y1:y+r,m:RECT_M});}
  for(const t of part.match(/<text [^>]*>.*?<\/text>/g)??[]){
   const x=num(t,'x'),y=num(t,'y'),z=num(t,'font-size'),anchor=t.match(/text-anchor="(\w+)"/)?.[1]??'start';
   const w=units(t.replace(/<[^>]+>/g,'').replace(/&\w+;/g,'x'))*z,x0=anchor==='middle'?x-w/2:anchor==='end'?x-w:x;
   boxes.push({x0,y0:y-z*.8,x1:x0+w,y1:y+z*.25,m:TEXT_M});
  }
  // Arrowed connectors and fanOut trunks/branches; a fanOut part keeps its logical source in data-source.
  for(const tag of part.match(/<path [^>]*>/g)??[]){
   if(!/marker-end|data-wire/.test(tag))continue;
   const pts=[...(tag.match(/ d="([^"]+)"/)?.[1]??'').matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map(m=>[+m[1],+m[2]] as Pt);
   const src=tag.match(/data-source="(-?[\d.]+),(-?[\d.]+)"/),from:Pt=src?[+src[1],+src[2]]:pts[0];
   for(let i=1;i<pts.length;i++)wires.push({a:pts[i-1],b:pts[i],from});
  }
 }
 return {boxes,wires};
}
const inside=(b:Box,x:number,y:number,m:number)=>x>b.x0-m&&x<b.x1+m&&y>b.y0-m&&y<b.y1+m;
// Does the axis-aligned segment a→b pass through the box grown by m?
function hits(b:Box,a:Pt,c:Pt,m:number){
 const [x0,x1]=[Math.min(a[0],c[0]),Math.max(a[0],c[0])],[y0,y1]=[Math.min(a[1],c[1]),Math.max(a[1],c[1])];
 return x1>b.x0-m&&x0<b.x1+m&&y1>b.y0-m&&y0<b.y1+m;
}
function wireCost(ws:Seg[],a:Pt,b:Pt,from:Pt){
 let cost=0;const h=a[1]===b[1];
 for(const w of ws){
  const wh=w.a[1]===w.b[1],shared=w.from[0]===from[0]&&w.from[1]===from[1];
  if(h===wh){
   const same=h?a[1]===w.a[1]:a[0]===w.a[0],k=h?0:1;
   const lo=Math.max(Math.min(a[k],b[k]),Math.min(w.a[k],w.b[k])),hi=Math.min(Math.max(a[k],b[k]),Math.max(w.a[k],w.b[k]));
   // Wires from the same source may share a trunk, but split as early as possible.
   if(same&&hi-lo>1)cost+=shared?(hi-lo)*SHARE:OVERLAP;
  }else{
   const [hs,vs]=h?[[a,b],[w.a,w.b]]:[[w.a,w.b],[a,b]];
   const y=hs[0][1],x=vs[0][0];
   if(x>Math.min(hs[0][0],hs[1][0])&&x<Math.max(hs[0][0],hs[1][0])&&y>Math.min(vs[0][1],vs[1][1])&&y<Math.max(vs[0][1],vs[1][1])&&!shared)cost+=CROSS;
  }
 }
 return cost;
}
// Dijkstra over an orthogonal visibility grid: candidate lines run along obstacle edges plus margin.
export function route(p:Panel,w:Wire):Pt[]{
 const {boxes,wires}=obstacles(p);
 const live=boxes.map(b=>({...b,m:inside(b,...w.from,b.m)||inside(b,...w.to,b.m)?0:b.m}));
 const free=(a:Pt,c:Pt)=>!live.some(b=>hits(b,a,c,b.m===0?-.5:b.m-.5));
 // A straight run in the required direction needs no search.
 const [sx,sy]=STEP[w.start],[ex,ey]=STEP[w.end];
 if(w.start===w.end&&(w.to[0]-w.from[0])*sy===(w.to[1]-w.from[1])*sx&&(w.to[0]-w.from[0])*sx+(w.to[1]-w.from[1])*sy>0&&free(w.from,w.to))return [w.from,w.to];
 // Search between stubs, so the first segment is at least FIRST long and the arrowed last one at least LAST.
 const a0:Pt=[w.from[0]+sx*FIRST,w.from[1]+sy*FIRST],z0:Pt=[w.to[0]-ex*LAST,w.to[1]-ey*LAST];
 const xs=new Set([a0[0],z0[0]]),ys=new Set([a0[1],z0[1]]);
 for(const b of live){xs.add(b.x0-b.m-4);xs.add(b.x1+b.m+4);ys.add(b.y0-b.m-4);ys.add(b.y1+b.m+4);}
 const X=[...xs].filter(Number.isFinite).sort((a,b)=>a-b),Y=[...ys].filter(Number.isFinite).sort((a,b)=>a-b);
 const key=(i:number,j:number,d:number)=>(i*Y.length+j)*4+d,dirs:Dir[]=['up','down','left','right'];
 const si=X.indexOf(a0[0]),sj=Y.indexOf(a0[1]),ti=X.indexOf(z0[0]),tj=Y.indexOf(z0[1]),end=dirs.indexOf(w.end);
 const dist=new Map<number,number>(),prev=new Map<number,number>(),open:[number,number,number,number][]=[];
 const s0=dirs.indexOf(w.start);dist.set(key(si,sj,s0),0);open.push([0,si,sj,s0]);
 while(open.length){
  open.sort((a,b)=>a[0]-b[0]);const [c,i,j,d]=open.shift()!;
  if(c>(dist.get(key(i,j,d))??Infinity))continue;
  // Arriving at the last stub from the side turns there into the final direction.
  if(i===ti&&j===tj&&d!==end&&d!==(end^1)){
   const k=key(i,j,end),nc=c+BEND;
   if(nc<(dist.get(k)??Infinity)){dist.set(k,nc);prev.set(k,key(i,j,d));open.push([nc,i,j,end]);}
   continue;
  }
  if(i===ti&&j===tj&&d===end){
   const pts:Pt[]=[w.to];let k:number|undefined=key(i,j,d);
   while(k!==undefined){const n=Math.floor(k/4);pts.unshift([X[Math.floor(n/Y.length)],Y[n%Y.length]]);k=prev.get(k);}
   pts.unshift(w.from);
   const u=pts.filter((a,n)=>n===0||a[0]!==pts[n-1][0]||a[1]!==pts[n-1][1]);
   return u.filter((a,n,l)=>n===0||n===l.length-1||!((l[n-1][0]===a[0]&&a[0]===l[n+1][0])||(l[n-1][1]===a[1]&&a[1]===l[n+1][1])));
  }
  dirs.forEach((nd,di)=>{
   // No U-turns.
   if((d===0&&di===1)||(d===1&&di===0)||(d===2&&di===3)||(d===3&&di===2))return;
   const [dx,dy]=STEP[nd],ni=i+dx,nj=j+dy;
   if(ni<0||nj<0||ni>=X.length||nj>=Y.length)return;
   const a:Pt=[X[i],Y[j]],b:Pt=[X[ni],Y[nj]];
   if(!free(a,b))return;
   const nc=c+Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1])+(di===d?0:BEND)+wireCost(wires,a,b,w.from),k=key(ni,nj,di);
   if(nc<(dist.get(k)??Infinity)){dist.set(k,nc);prev.set(k,key(i,j,d));open.push([nc,ni,nj,di]);}
  });
 }
 throw new Error(`No route from ${w.from} to ${w.to}`);
}
// Draws connectors in order, each avoiding nodes and the connectors drawn before it.
export function connect(p:Panel,ws:readonly Wire[]){
 for(const w of ws){
  const pts=w.via?[w.from,...w.via,w.to]:route(p,w);
  if(w.group)p.raw(`<g ${w.group}>`);
  connector(p,pts[0],pts[pts.length-1],{via:pts.slice(1,-1),tone:w.tone??'blue',width:1.8});
  if(w.group)p.raw('</g>');
 }
}
