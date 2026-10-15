import {C,FONT_FAMILY,MONO_FAMILY,markerDefs} from './theme';
import {esc,svgText,tr,wrap,type Label,type Locale} from './text';
import type {Panel} from './panel';
// One figure: shared bilingual text plus panels drawn per locale and screen.
export interface FigureSpec {
  articleId:string;figureId:string;number:string;
  title:Label;subtitle:Label;alt:Label;caption:Label;
  sources:{label:string;url:string}[];
  kind?:'original educational diagram'|'quoted source figure';
  layout?:'wide';
  // Short label above the title, e.g. "그림 2".
  eyebrow?:Label;
  // 'article' leaves the caption to the article's <figcaption> and omits it from the image.
  captionIn?:'figure'|'article';
  // Figures embedded as a single <img> only need the desktop screen.
  screens?:readonly Screen[];
  // Extra <defs> content such as patterns, shared by all panels.
  defs?:string;
  panels:(locale:Locale,mobile?:boolean)=>Panel[];
}
export type Screen='desktop'|'mobile';
// Standard frame: eyebrow, title, subtitle, rule, panels, rule, caption. Desktop places two panels per row
// unless `layout: 'wide'`; mobile stacks them. A wide panel of width 1104 is drawn at scale 1.
export const FRAME={desktop:{width:1200,pad:48,gap:48},mobile:{width:360,pad:16,gap:28}};
// Layout shared by compose and article components that crop a figure into regions (e.g. one panel per note).
// Coordinates are in SVG units of the composed figure; `header` ends at the rule under the subtitle.
export interface FigureLayout{width:number;height:number;header:number;panels:{x:number;y:number;w:number;h:number}[]}
function layout(spec:FigureSpec,locale:Locale,mobile:boolean,panels:Panel[]){
  const {width,pad,gap}=FRAME[mobile?'mobile':'desktop'],cols=mobile||spec.layout==='wide'?1:2;
  const pw=(width-pad*2-gap*(cols-1))/cols,inner=width-2*pad;
  const t=mobile?{eyebrow:15,title:24,sub:17,cap:16,top:36}:{eyebrow:18,title:36,sub:23,cap:21,top:49};
  const title=tr(spec.title,locale),subtitle=tr(spec.subtitle,locale);
  const at:{[k:string]:number}={};let y=t.top;
  at.eyebrow=y;
  if(spec.eyebrow)y+=mobile?34:50;else y+=mobile?6:11;
  at.title=y;
  y+=(wrap(title,inner,t.title).length-1)*t.title*1.4+(mobile?30:42);
  at.subtitle=y;
  y+=(wrap(subtitle,inner,t.sub).length-1)*t.sub*1.4+(mobile?20:29);
  at.rule=y;
  y+=mobile?24:36;
  const boxes:FigureLayout['panels']=[];
  for(let row=0;row<panels.length;row+=cols){
    const items=panels.slice(row,row+cols);
    items.forEach((p,j)=>boxes.push({x:pad+j*(pw+gap),y,w:pw,h:p.height*pw/p.width}));
    y+=Math.max(...items.map(p=>p.height*pw/p.width))+(row+cols<panels.length?gap:0);
  }
  at.afterPanels=y;
  if(spec.captionIn!=='article'){
    y+=mobile?24:36;at.capRule=y;
    y+=mobile?27:38;at.caption=y;
    y+=(wrap(tr(spec.caption,locale),inner,t.cap).length-1)*t.cap*1.4;
  }
  y+=mobile?24:40;
  return {width,pad,pw,inner,t,title,subtitle,at,boxes,height:Math.ceil(y)};
}
export function layoutBoxes(spec:FigureSpec,locale:Locale,mobile=false):FigureLayout{
  const L=layout(spec,locale,mobile,spec.panels(locale,mobile));
  return {width:L.width,height:L.height,header:L.at.rule,panels:L.boxes};
}
export function compose(spec:FigureSpec,locale:Locale,mobile=false){
  const panels=spec.panels(locale,mobile),L=layout(spec,locale,mobile,panels);
  const {width,pad,pw,inner,t,title,subtitle,at}=L;
  let body='';
  if(spec.eyebrow)body+=svgText(pad,at.eyebrow,tr(spec.eyebrow,locale),t.eyebrow,C.blue,600,inner);
  body+=svgText(pad,at.title,title,t.title,C.ink,700,inner);
  body+=svgText(pad,at.subtitle,subtitle,t.sub,C.muted,400,inner);
  body+=`<path d="M${pad},${at.rule} H${width-pad}" stroke="${C.line}" stroke-width="2"/>`;
  panels.forEach((p,i)=>{const b=L.boxes[i];body+=`<g transform="translate(${b.x} ${b.y}) scale(${pw/p.width})" data-panel="${i+1}">${p.svg()}</g>`;});
  if(spec.captionIn!=='article'){
    body+=`<path d="M${pad},${at.capRule} H${width-pad}" stroke="${C.line}" stroke-width="2"/>`;
    body+=svgText(pad,at.caption,tr(spec.caption,locale),t.cap,C.muted,400,inner);
  }
  const y=L.height;
  return {width,height:y,svg:`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${y}" viewBox="0 0 ${width} ${y}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(tr(spec.alt,locale))}</desc><metadata>${esc(JSON.stringify({id:spec.number,locale,kind:spec.kind??'original educational diagram',sources:spec.sources}))}</metadata><defs>${markerDefs()}${spec.defs??''}</defs><style>text{font-family:${FONT_FAMILY}}text[font-family]{font-family:${MONO_FAMILY}}path{stroke-linecap:round;stroke-linejoin:round}</style><rect width="100%" height="100%" fill="white"/>${body}</svg>`};
}
