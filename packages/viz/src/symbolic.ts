import {Panel} from './panel';
import {C,type Tone} from './theme';
export type SymbolicPlaneOptions={name:string;row:string;col:string;w:number;h:number;tone?:Tone;partition?:'cols'|'rows';view?:boolean;contract?:'row'|'col';};
// Diagram-specific symbolic planes. No sample cells imply a numeric shape or head count.
export function symbolicPlane(p:Panel,cx:number,y:number,a:SymbolicPlaneOptions,small=false){
 const x=cx-a.w/2,t=a.tone??'blue',size=small?15:19;
 p.raw(`<g data-matrix="${a.name}">`);
 p.text(cx,y-35,a.name,{size:size+3,weight:600,anchor:'middle',width:small?102:180,color:C[t]});
 p.text(cx,y-13,`[${a.row}, ${a.col}]`,{size:small?13:16,anchor:'middle',width:small?104:185,color:C.muted});
 p.rect(x,y,a.w,a.h,a.partition?C.paper:C[`${t}Fill`],C.line,0,a.view);
 if(a.partition==='cols'){
  p.rect(x,y,a.w*.26,a.h,C.blueFill,C.line,0);p.text(x+a.w*.13,y+a.h/2+5,'h',{size:small?12:16,width:26,anchor:'middle',color:C.blue});p.line(x+a.w*.26,y,x+a.w*.26,y+a.h,C.blue,1.5);p.text(x+a.w*.65,y+a.h/2+5,'⋯',{size:20,width:30,anchor:'middle',color:C.muted});
 }else if(a.partition==='rows'){
  p.rect(x,y,a.w,a.h*.26,C.blueFill,C.line,0);p.text(x+a.w*.75,y+a.h*.13+5,'h',{size:small?10:14,width:26,anchor:'middle',color:C.blue});p.line(x,y+a.h*.26,x+a.w,y+a.h*.26,C.blue,1.5);p.text(cx,y+a.h*.7+5,'⋮',{size:20,width:30,anchor:'middle',color:C.muted});
 }
 p.path(`M${x-4} ${y} h-5 v${a.h} h5 M${x+a.w+4} ${y} h5 v${a.h} h-5`,C[t],1.7,a.view);
 if(a.contract){p.raw('<g data-contract="true">');if(a.contract==='col'){p.line(x,y+a.h+7,x+a.w,y+a.h+7,C.orange,3);p.text(cx,y+a.h+27,a.col,{size:small?13:16,width:120,anchor:'middle',color:C.orange});}else{p.line(x-15,y,x-15,y+a.h,C.orange,3);p.el('text',{x:x+13,y:y+a.h/2,'font-size':small?12:15,fill:C.orange,'text-anchor':'middle',transform:`rotate(-90 ${x+13} ${y+a.h/2})`},a.row);}p.raw('</g>');}
 p.raw('</g>');return{x,y,w:a.w,h:a.h,cx};
}
