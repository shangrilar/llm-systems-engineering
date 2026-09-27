import {C,type Tone} from './theme';
import type {Label} from './text';
import type {Panel} from './panel';

export type Point=readonly [number,number];
export interface Bounds {x:number;y:number;width:number;height:number}
export type Side='top'|'right'|'bottom'|'left';

// Attach a connector to a shape's edge, optionally leaving room for its border/arrowhead.
export function port(b:Bounds,side:Side,fraction=.5,gap=0):Point {
  if(![b.x,b.y,b.width,b.height,fraction,gap].every(Number.isFinite)||b.width<0||b.height<0||fraction<0||fraction>1||gap<0)
    throw new Error('Invalid bounds or port position');
  switch(side){
    case 'top':return [b.x+b.width*fraction,b.y-gap];
    case 'bottom':return [b.x+b.width*fraction,b.y+b.height+gap];
    case 'left':return [b.x-gap,b.y+b.height*fraction];
    case 'right':return [b.x+b.width+gap,b.y+b.height*fraction];
  }
}

// Waypoints are explicit: authors choose the clear lane; this is not obstacle routing.
export function connector(p:Panel,from:Point,to:Point,o:{via?:readonly Point[];tone?:Tone|'muted';width?:number;dashed?:boolean;arrow?:boolean}={}){
  const points=[from,...(o.via??[]),to].filter((a,i,list)=>i===0||a[0]!==list[i-1][0]||a[1]!==list[i-1][1]);
  if(points.length<2||points.some(a=>!a.every(Number.isFinite)))throw new Error('A connector needs distinct finite endpoints');
  for(let i=1;i<points.length;i++)if(points[i][0]!==points[i-1][0]&&points[i][1]!==points[i-1][1])
    throw new Error('Connector segments must be horizontal or vertical; add a waypoint or use curve');
  const d=points.map(([x,y],i)=>`${i?'L':'M'}${x} ${y}`).join(' ');
  p.path(d,C[o.tone??'muted'],o.width??2.5,o.dashed??false,o.arrow??true);
  return {points,d};
}

export type MatrixValue=Label|number|null;
export interface MatrixOptions {
  cellWidth?:number;cellHeight?:number;gap?:number;size?:number;
  tone?:Tone|((row:number,col:number)=>Tone|null);
  rowLabels?:readonly Label[];columnLabels?:readonly Label[];
  rowLabelWidth?:number;
}

// A table of explicit values. Shape and cell coordinates are returned for aligned reads/writes.
export function matrix(p:Panel,x:number,y:number,values:readonly (readonly MatrixValue[])[],o:MatrixOptions={}){
  const rows=values.length,cols=values[0]?.length??0;
  if(!rows||!cols||values.some(row=>row.length!==cols))throw new Error('Matrix must be nonempty and rectangular');
  if(o.rowLabels&&o.rowLabels.length!==rows||o.columnLabels&&o.columnLabels.length!==cols)
    throw new Error('Matrix labels must match its axes');
  const w=o.cellWidth??56,h=o.cellHeight??44,gap=o.gap??4,size=o.size??20;
  if(![x,y,w,h,gap,size].every(Number.isFinite)||w<=0||h<=0||gap<0||size<=0)throw new Error('Invalid matrix geometry');
  const bounds:Bounds={x,y,width:cols*(w+gap)-gap,height:rows*(h+gap)-gap};
  const cell=(r:number,c:number):Bounds=>{
    if(!Number.isInteger(r)||!Number.isInteger(c)||r<0||r>=rows||c<0||c>=cols)throw new Error('Cell outside matrix');
    return {x:x+c*(w+gap),y:y+r*(h+gap),width:w,height:h};
  };
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    const b=cell(r,c),tone=typeof o.tone==='function'?o.tone(r,c):o.tone??'teal',value=values[r][c];
    const fill=tone?C[`${tone}Fill` as keyof typeof C]:C.paper;
    p.parts.push('<g data-container="true">');
    p.rect(b.x,b.y,w,h,fill,tone?C[tone]:C.line,4);
    if(value!==null)p.text(b.x+w/2,b.y+h/2+size*.32,typeof value==='number'?String(value):value,
      {size,anchor:'middle',width:w-12,color:tone?C[tone]:C.muted,weight:500});
    p.parts.push('</g>');
  }
  o.rowLabels?.forEach((label,r)=>p.text(x-12,y+r*(h+gap)+h/2+size*.32,label,{size,anchor:'end',width:o.rowLabelWidth??64,color:C.muted}));
  o.columnLabels?.forEach((label,c)=>p.text(x+c*(w+gap)+w/2,y-14,label,{size,anchor:'middle',width:w,color:C.muted}));
  return {...bounds,rows,cols,cell,row:(r:number):Bounds=>({...cell(r,0),width:bounds.width})};
}
