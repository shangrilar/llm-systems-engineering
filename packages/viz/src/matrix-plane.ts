import {Panel} from './panel';
import {C,type Tone} from './theme';
import {esc,type Label} from './text';
// A value plane with a stable name/shape label and named axes.
export function matrixPlane(p:Panel,x:number,y:number,id:string,name:string,values:number[][],o:{cell?:number;tone?:Tone;row:Label;col:Label;selectRow?:number;selectCol?:number;focus?:[number,number];fontSize?:number;format?:(value:number,row:number,col:number)=>string}){
 if(!values.length||!values[0].length||values.some(row=>row.length!==values[0].length||row.some(v=>!Number.isFinite(v)))||(o.cell!==undefined&&(!Number.isFinite(o.cell)||o.cell<=0)))throw Error('Invalid matrix plane');
 const rows=values.length,cols=values[0].length,s=o.cell??56,w=cols*s,h=rows*s,t=o.tone??'blue',top=y+52;
 p.raw(`<g data-tensor="${esc(id)}">`);
 p.text(x,y+20,`${name} · [${rows}, ${cols}]`,{size:23,weight:600,width:310,color:C[t]});
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
  const selected=o.focus?r===o.focus[0]&&c===o.focus[1]:r===o.selectRow||c===o.selectCol;
  p.el('rect',{x:x+c*s,y:top+r*s,width:s,height:s,fill:selected?C.orangeFill:C.paper,stroke:C.line,'stroke-width':.6,'data-r':r,'data-c':c,'data-cell':id});
  p.text(x+(c+.5)*s,top+(r+.5)*s+8,(o.format?o.format(values[r][c],r,c):String(values[r][c])),{size:o.fontSize??25,anchor:'middle',width:s-4,color:C.ink});
 }
 p.path(`M${x-5} ${top} h-7 v${h} h7 M${x+w+5} ${top} h7 v${h} h-7`,C[t],2);
 p.text(x,top+h+34,o.col,{size:18,width:300,color:C.muted});
 p.el('text',{x:x-28,y:top+h/2,'font-size':17,fill:C.muted,'text-anchor':'middle',transform:`rotate(-90 ${x-28} ${top+h/2})`},o.row);
 p.raw('</g>');return {x,y:top,width:w,height:h};
}
