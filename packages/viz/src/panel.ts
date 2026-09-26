import {C,markerId,type Tone} from './theme';
import {svgText,tr,wrap,type Label,type Locale} from './text';
// One panel in local coordinates. `compose` scales it into the figure's column width.
// A `null` title leaves the whole area to the drawing (e.g. one full-width panel of 1120 with `layout: 'wide'`).
export class Panel {
  parts:string[]=[];
  constructor(public locale:Locale,public title:Label|null,public height:number,public width=520){
    if(title===null)return;
    this.text(0,30,title,{size:25,weight:600,width});
    this.line(0,68,width,68,C.line,1);
  }
  text(x:number,y:number,value:Label,o:{size?:number;color?:string;weight?:number;width?:number;anchor?:string}={}){
    this.parts.push(svgText(x,y,tr(value,this.locale),o.size??22,o.color??C.ink,o.weight??400,o.width??this.width-x,o.anchor??'start'));
  }
  rect(x:number,y:number,w:number,h:number,fill=C.grayFill,stroke=C.line,r=10,dash=false){this.parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"${dash?' stroke-dasharray="7 5"':''}/>`);}
  line(x:number,y:number,x2:number,y2:number,color=C.muted,width=2,dash=false){this.parts.push(`<path d="M${x} ${y} L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none"${dash?' stroke-dasharray="7 5"':''}/>`);}
  path(d:string,color=C.muted,width=2,dash=false,arrow=false){this.parts.push(`<path d="${d}" stroke="${color}" stroke-width="${width}" fill="none"${dash?' stroke-dasharray="7 5"':''}${arrow?` marker-end="url(#${markerId(color)})"`:''}/>`);}
  arrow(x:number,y:number,x2:number,y2:number,color=C.muted,dash=false){this.path(`M${x} ${y} L${x2} ${y2}`,color,2.5,dash,true);}
  // The QA step checks that text inside a `data-container` group stays within its first rect.
  box(x:number,y:number,w:number,h:number,title:Label,body:Label='',tone:Tone='blue'){
    const color=C[tone],fill=C[`${tone}Fill` as keyof typeof C];
    this.parts.push(`<g data-container="true">`);
    this.rect(x,y,w,h,fill,color);
    const n=wrap(tr(title,this.locale),w-32,22).length;
    this.text(x+16,y+31,title,{size:22,weight:600,color,width:w-32});
    if(tr(body,this.locale))this.text(x+16,y+31+n*31+9,body,{size:20,width:w-32});
    this.parts.push('</g>');
  }
  token(x:number,y:number,label:Label,w=80,tone:Tone='blue',h=48){
    this.rect(x,y,w,h,C[`${tone}Fill` as keyof typeof C],C[tone],8);
    this.text(x+w/2,y+h/2+8,label,{size:22,color:C[tone],weight:600,anchor:'middle',width:w-12});
  }
  circle(x:number,y:number,r:number,fill:string,stroke=C.line){this.parts.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}"/>`);}
  raw(s:string){this.parts.push(s);}
  svg(){return this.parts.join('');}
}
