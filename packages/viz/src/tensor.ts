import {C,type Tone} from './theme';
import {Panel} from './panel';
import {tr,type Label} from './text';
import {type Bounds,type Point,port,connector} from './diagram';
export interface Axis {id:string;size:number|string;label?:Label}
export interface TensorSpec {id:string;name:Label;axes:readonly [Axis,Axis];role?:'activation'|'weight'|'cache'|'ids';baseId?:string}
export interface TensorDrawing extends Bounds {body:Bounds;spec:TensorSpec;cell:(r:number,c:number)=>Bounds;rows:number;cols:number}
const roleTone={activation:'blue',weight:'purple',cache:'teal',ids:'orange'} as const;
export const axis=(id:string,size:number|string,label?:Label):Axis=>({id,size,label});
export function transpose(t:TensorSpec):TensorSpec{return {...t,id:t.id+'^T',baseId:t.baseId??t.id,name:[tr(t.name,'ko')+'ᵀ',tr(t.name,'en')+'ᵀ'],axes:[t.axes[1],t.axes[0]]};}
export function product(a:TensorSpec,b:TensorSpec,id:string,name:Label):TensorSpec{
 if(a.axes[1].size!==b.axes[0].size||a.axes[1].id!==b.axes[0].id)throw Error('Matmul contraction mismatch: '+a.id+' × '+b.id);
 return {id,name,axes:[a.axes[0],b.axes[1]],role:'activation'};
}
export function multiply(a:readonly (readonly number[])[],b:readonly (readonly number[])[]):number[][]{
 const k=a[0]?.length,n=b[0]?.length;
 if(!a.length||!b.length||!k||!n||k!==b.length||a.some(r=>r.length!==k)||b.some(r=>r.length!==n)||[...a.flat(),...b.flat()].some(v=>!Number.isFinite(v)))throw Error('Invalid numeric matmul');
 return a.map(r=>Array.from({length:n},(_,j)=>r.reduce((sum,v,i)=>sum+v*b[i][j],0)));
}
export function tensor(p:Panel,x:number,y:number,s:TensorSpec,o:{width?:number;height?:number;labelWidth?:number;sample?:readonly [number,number];values?:readonly (readonly number[])[];tone?:Tone;selectedRows?:readonly number[];focus?:readonly [number,number];axes?:boolean;segments?:readonly {end:number;tone:Tone}[]}={}):TensorDrawing{
 for(const a of s.axes)if(typeof a.size==='number'?(!Number.isInteger(a.size)||a.size<1):!a.size.trim())throw Error('Invalid tensor axis');
 const w=o.width??150,h=o.height??84;
 const rows=o.sample?.[0]??(typeof s.axes[0].size==='number'?Math.min(s.axes[0].size,4):4);
 const cols=o.sample?.[1]??(typeof s.axes[1].size==='number'?Math.min(s.axes[1].size,6):5);
 if(!Number.isInteger(rows)||!Number.isInteger(cols)||rows<1||cols<1||w<=0||h<=0)throw Error('Invalid tensor display');
 if(o.values&&(o.values.length!==s.axes[0].size||o.values.some(r=>r.length!==s.axes[1].size)||rows!==s.axes[0].size||cols!==s.axes[1].size))throw Error('Numeric cells must match logical axes');
 const tone=o.tone??roleTone[s.role??'activation'],body={x,y:y+38,width:w,height:h};
 p.text(x,y+21,s.name,{size:22,weight:600,color:C[tone],width:o.labelWidth??w});
 const cell=(r:number,c:number):Bounds=>{if(r<0||c<0||r>=rows||c>=cols)throw Error('Cell outside display');return{x:x+c*w/cols,y:body.y+r*h/rows,width:w/cols,height:h/rows};};
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
  const b=cell(r,c),sel=!o.selectedRows||o.selectedRows.includes(r),seg=o.segments?.find(v=>c<v.end),t=sel?(seg?.tone??tone):'gray';
  p.rect(b.x+1,b.y+1,b.width-2,b.height-2,C[`${t}Fill`],C[t],2);
  if(o.values)p.text(b.x+b.width/2,b.y+b.height/2+7,String(Math.round(o.values[r][c]*100)/100),{size:20,anchor:'middle',width:b.width-2,color:C[t]});
 }
 if(o.focus){const b=cell(...o.focus);p.el('rect',{x:b.x,y:b.y,width:b.width,height:b.height,fill:'none',stroke:C.orange,'stroke-width':3,rx:3});}
 const abbrev=s.axes[0].size!==rows||s.axes[1].size!==cols;
 p.text(x,y+38+h+27,`${s.axes[0].size} × ${s.axes[1].size}${abbrev?'  ⋯':''}`,{size:20,color:C.muted,width:w+8});
 if(o.axes)p.text(x,y+38+h+59,[`${tr(s.axes[0].label??s.axes[0].id,'ko')} × ${tr(s.axes[1].label??s.axes[1].id,'ko')}`,`${tr(s.axes[0].label??s.axes[0].id,'en')} × ${tr(s.axes[1].label??s.axes[1].id,'en')}`],{size:18,color:C.muted,width:w});
 return{x,y,width:w,height:h+(o.axes?112:78),body,spec:s,cell,rows,cols};
}
export function matmul(p:Panel,x:number,y:number,a:TensorSpec,b:TensorSpec,o:{id:string;name:Label;width?:number;values?:readonly [readonly (readonly number[])[],readonly (readonly number[])[]]} ){
 const out=product(a,b,o.id,o.name),w=o.width??520,tw=(w-68)/3,gap=34;
 const specs=[a,b,out],vals=o.values?[o.values[0],o.values[1],multiply(...o.values)]:undefined;
 const drawings=specs.map((s,i)=>{const rows=typeof s.axes[0].size==='number'?Math.min(s.axes[0].size,4):4;const h=rows===1?34:96;return tensor(p,x+i*(tw+gap),y+(96-h)/2,s,{width:tw,height:h,values:vals?.[i],sample:vals?[vals[i].length,vals[i][0].length]:undefined});});
 for(const [i,sign] of [[0,'×'],[1,'=']] as const)p.text(x+(i+1)*tw+i*gap+gap/2,y+99,sign,{size:25,anchor:'middle',width:gap,color:C.muted});
 return{a:drawings[0],b:drawings[1],out:drawings[2],spec:out,bottom:y+190};
}
export function operation(p:Panel,x:number,y:number,width:number,label:Label,tone:Tone='gray'):Bounds{
 const b={x,y,width,height:48};p.rect(x,y,width,48,C[`${tone}Fill`],C[tone],24);p.text(x+width/2,y+31,label,{size:20,anchor:'middle',width:width-20,color:C[tone],weight:500});return b;
}
export function link(p:Panel,a:Bounds,b:Bounds,o:{tone?:Tone;via?:readonly Point[];from?:'bottom'|'right';to?:'top'|'left';dashed?:boolean}={}){
 return connector(p,port(a,o.from??'bottom',.5,6),port(b,o.to??'top',.5,8),{tone:o.tone??'gray',via:o.via,dashed:o.dashed});
}
// A persistent cache drawn once; callers attach readers to its returned body/bounds.
export function cacheBank(p:Panel,x:number,y:number,s:TensorSpec,width=180,height=132,selectedRows?:number[]){
 if(s.role!=='cache')throw Error('cacheBank requires an explicit cache role');
 const b=tensor(p,x,y,s,{width,height,sample:[typeof s.axes[0].size==='number'?Math.min(s.axes[0].size,8):6,typeof s.axes[1].size==='number'?Math.min(s.axes[1].size,5):4],tone:'teal',selectedRows});
 p.el('rect',{x:x-8,y:y-10,width:width+16,height:b.height+12,rx:8,fill:'none',stroke:C.teal,'stroke-width':2});return b;
}
