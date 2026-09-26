import {C,FONT_FAMILY,MONO_FAMILY,markerDefs} from './theme';
import {esc,svgText,tr,wrap,type Label,type Locale} from './text';
import type {Panel} from './panel';
// One figure: shared bilingual text plus panels drawn per locale and screen.
export interface FigureSpec {
  articleId:string;figureId:string;number:string;
  title:Label;subtitle:Label;alt:Label;caption:Label;
  sources:{label:string;url:string}[];
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
export function compose(spec:FigureSpec,locale:Locale,mobile=false){
  const {width,pad,gap}=FRAME[mobile?'mobile':'desktop'],cols=mobile||spec.layout==='wide'?1:2;
  const pw=(width-pad*2-gap*(cols-1))/cols,inner=width-2*pad;
  const t=mobile?{eyebrow:15,title:24,sub:17,cap:16,top:36}:{eyebrow:18,title:36,sub:23,cap:21,top:49};
  const title=tr(spec.title,locale),subtitle=tr(spec.subtitle,locale);
  let y=t.top,body='';
  if(spec.eyebrow){
    body+=svgText(pad,y,tr(spec.eyebrow,locale),t.eyebrow,C.blue,600,inner);
    y+=mobile?34:50;
  }else y+=mobile?6:11;
  body+=svgText(pad,y,title,t.title,C.ink,700,inner);
  y+=(wrap(title,inner,t.title).length-1)*t.title*1.4+(mobile?30:42);
  body+=svgText(pad,y,subtitle,t.sub,C.muted,400,inner);
  y+=(wrap(subtitle,inner,t.sub).length-1)*t.sub*1.4+(mobile?20:29);
  body+=`<path d="M${pad},${y} H${width-pad}" stroke="${C.line}" stroke-width="2"/>`;
  y+=mobile?24:36;
  const panels=spec.panels(locale,mobile);
  for(let row=0;row<panels.length;row+=cols){
    const items=panels.slice(row,row+cols);
    items.forEach((p,j)=>body+=`<g transform="translate(${pad+j*(pw+gap)} ${y}) scale(${pw/p.width})" data-panel="${row+j+1}">${p.svg()}</g>`);
    y+=Math.max(...items.map(p=>p.height*pw/p.width))+(row+cols<panels.length?gap:0);
  }
  if(spec.captionIn!=='article'){
    y+=mobile?24:36;
    body+=`<path d="M${pad},${y} H${width-pad}" stroke="${C.line}" stroke-width="2"/>`;
    y+=mobile?27:38;
    const cap=tr(spec.caption,locale);
    body+=svgText(pad,y,cap,t.cap,C.muted,400,inner);
    y+=(wrap(cap,inner,t.cap).length-1)*t.cap*1.4;
  }
  y+=mobile?24:40;
  return {width,height:Math.ceil(y),svg:`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${Math.ceil(y)}" viewBox="0 0 ${width} ${Math.ceil(y)}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(tr(spec.alt,locale))}</desc><metadata>${esc(JSON.stringify({id:spec.number,locale,kind:'original educational diagram',sources:spec.sources}))}</metadata><defs>${markerDefs()}${spec.defs??''}</defs><style>text{font-family:${FONT_FAMILY}}text[font-family]{font-family:${MONO_FAMILY}}path{stroke-linecap:round;stroke-linejoin:round}</style><rect width="100%" height="100%" fill="white"/>${body}</svg>`};
}
