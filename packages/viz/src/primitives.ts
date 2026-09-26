import {C,markerId,type Tone} from './theme';
import type {Label} from './text';
import type {Panel} from './panel';
// Shapes that recur across articles. Each draws into a Panel and returns the geometry callers need to connect to it.
const fillOf=(tone:Tone)=>C[`${tone}Fill` as keyof typeof C];

// A row of equal cells: tokens, KV slots, memory words. `null` leaves a cell empty.
export function cells(p:Panel,x:number,y:number,labels:readonly (Label|null)[],o:{tone?:Tone;w?:number;h?:number;gap?:number;size?:number;dashed?:boolean}={}){
  const tone=o.tone??'blue',w=o.w??40,h=o.h??48,gap=o.gap??4,size=o.size??22;
  labels.forEach((label,i)=>{
    const cx=x+i*(w+gap);
    p.rect(cx,y,w,h,label===null?C.paper:fillOf(tone),C[tone],5,o.dashed);
    if(label!==null)p.text(cx+w/2,y+h/2+size*.32,label,{size,color:C[tone],weight:600,anchor:'middle',width:w});
  });
  return {x,y,w,h,gap,width:labels.length*(w+gap)-gap,center:(i:number)=>x+i*(w+gap)+w/2};
}

// A matrix of small cells. `tone(r, c)` colors active cells; inactive cells stay white with a light border.
// `outline` then frames a block of cells, e.g. a tile or the rows an output needs.
export function grid(p:Panel,x:number,y:number,rows:number,cols:number,o:{cell?:number;gap?:number;tone?:(r:number,c:number)=>Tone|null}={}){
  const cell=o.cell??25,gap=o.gap??3,step=cell+gap;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    const tone=o.tone?.(r,c)??null;
    p.rect(x+c*step,y+r*step,cell,cell,tone?fillOf(tone):C.paper,tone?C[tone]:C.line,3);
  }
  const g={x,y,rows,cols,cell,gap,width:cols*step-gap,height:rows*step-gap,
    cellX:(c:number)=>x+c*step,cellY:(r:number)=>y+r*step,
    outline(r0:number,c0:number,r1:number,c1:number,tone:Tone,pad=3){
      const ox=x+c0*step-pad,oy=y+r0*step-pad;
      p.parts.push(`<rect x="${ox}" y="${oy}" width="${(c1-c0+1)*step-gap+pad*2}" height="${(r1-r0+1)*step-gap+pad*2}" rx="6" fill="none" stroke="${C[tone]}" stroke-width="3"/>`);
      return {x:ox,y:oy,right:ox+(c1-c0+1)*step-gap+pad*2,bottom:oy+(r1-r0+1)*step-gap+pad*2};
    }};
  return g;
}

// Horizontal S-curve between two points, optionally ending in a straight `tail` into the target.
// The white casing keeps crossing connectors readable.
export function curve(p:Panel,from:readonly [number,number],to:readonly [number,number],o:{tone?:Tone|'muted';arrow?:boolean;casing?:boolean;bend?:number;tail?:number}={}){
  const color=o.tone&&o.tone!=='muted'?C[o.tone]:C.muted;
  const [x1,y1]=from,[x2,y2]=to,tail=o.tail??0,xe=x2-tail,bend=o.bend??(xe-x1)*.45;
  const bendPath=`M${x1} ${y1} C${x1+bend} ${y1} ${xe-bend} ${y2} ${xe} ${y2}`,d=bendPath+(tail?` H${x2}`:'');
  // Only the bend is cased: the tail usually runs into the target shape and must not erase its border.
  if(o.casing??true)p.parts.push(`<path d="${bendPath}" stroke="white" stroke-width="9" fill="none"/>`);
  p.parts.push(`<path d="${d}" stroke="${color}" stroke-width="2.5" fill="none"${o.arrow??true?` marker-end="url(#${markerId(color)})"`:''}/>`);
}

// Lanes that share one time axis. Time is in arbitrary units; `at(t)` maps it to x for extra annotations.
export interface Bar {from:number;to:number;label?:Label;tone?:Tone}
export interface Lane {label:Label;bars:readonly Bar[]}
export function timeline(p:Panel,o:{x:number;y:number;width:number;span:number;lanes:readonly Lane[];labelWidth?:number;laneHeight?:number;barHeight?:number;axis?:Label}){
  const labelWidth=o.labelWidth??200,laneHeight=o.laneHeight??112,barHeight=o.barHeight??58;
  const x0=o.x+labelWidth,plot=o.width-labelWidth;
  const at=(t:number)=>x0+plot*t/o.span;
  if(o.axis){
    p.arrow(x0,o.y,o.x+o.width,o.y);
    p.text(o.x+o.width,o.y-15,o.axis,{size:21,color:C.muted,anchor:'end',width:200});
  }
  const top=o.y+(o.axis?25:0);
  const laneY=(i:number)=>top+i*laneHeight;
  o.lanes.forEach((lane,i)=>{
    const y=laneY(i);
    p.text(o.x,y+barHeight/2+9,lane.label,{size:25,weight:600,width:labelWidth-16});
    for(const bar of lane.bars){
      const tone=bar.tone??'blue',bx=at(bar.from),bw=at(bar.to)-bx;
      p.rect(bx,y,bw,barHeight,fillOf(tone),C[tone],12);
      if(bar.label)p.text(bx+bw/2,y+barHeight/2+9,bar.label,{size:24,color:C[tone],weight:600,anchor:'middle',width:bw-16});
    }
  });
  // Dashed tick below a lane with a label, for "done" or "deadline" moments.
  const mark=(t:number,lane:number,label:Label,tone:Tone='teal',align:'start'|'middle'='middle')=>{
    const x=at(t),y=laneY(lane)+barHeight+10;
    p.line(x,y,x,y+(align==='middle'?18:12),C[tone],2,true);
    p.text(align==='middle'?x:x+20,align==='middle'?y+48:y+19,label,{size:align==='middle'?24:22,color:C[tone],weight:600,anchor:align,width:260});
  };
  return {at,laneY,barHeight,bottom:laneY(o.lanes.length-1)+barHeight,mark};
}
