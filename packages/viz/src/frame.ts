import {C,FONT_FAMILY,markerDefs} from './theme';
import {esc,svgText,tr,wrap,type Label,type Locale} from './text';
import type {Panel} from './panel';
// One figure: shared bilingual text plus panels drawn per locale and screen.
export interface FigureSpec {
  articleId:string;figureId:string;number:string;
  title:Label;subtitle:Label;alt:Label;caption:Label;
  sources:{label:string;url:string}[];
  layout?:'wide';
  panels:(locale:Locale,mobile?:boolean)=>Panel[];
}
// Title, subtitle, panels, caption. Desktop places two panels per row unless `layout: 'wide'`; mobile stacks them.
export function compose(spec:FigureSpec,locale:Locale,mobile=false){
  const width=mobile?360:1200,pad=mobile?16:40,gap=mobile?28:48,cols=mobile||spec.layout==='wide'?1:2;
  const pw=(width-pad*2-gap*(cols-1))/cols;
  const titleSize=mobile?24:32,subSize=mobile?17:22;
  const title=tr(spec.title,locale),subtitle=tr(spec.subtitle,locale);
  let y=mobile?38:52;
  let body=svgText(pad,y,title,titleSize,C.ink,600,width-2*pad);
  y+=wrap(title,width-2*pad,titleSize).length*titleSize*1.4+14;
  body+=svgText(pad,y,subtitle,subSize,C.muted,400,width-2*pad);
  y+=wrap(subtitle,width-2*pad,subSize).length*subSize*1.4+32;
  const panels=spec.panels(locale,mobile);
  for(let row=0;row<panels.length;row+=cols){
    const items=panels.slice(row,row+cols);
    items.forEach((p,j)=>body+=`<g transform="translate(${pad+j*(pw+gap)} ${y}) scale(${pw/p.width})" data-panel="${row+j+1}">${p.svg()}</g>`);
    y+=Math.max(...items.map(p=>p.height*pw/p.width))+gap;
  }
  body+=`<path d="M${pad} ${y} H${width-pad}" stroke="${C.line}"/>`;
  y+=mobile?27:36;
  const cap=tr(spec.caption,locale),capSize=mobile?16:21;
  body+=svgText(pad,y,cap,capSize,C.muted,400,width-pad*2);
  y+=wrap(cap,width-pad*2,capSize).length*capSize*1.4+(mobile?24:34);
  return {width,height:Math.ceil(y),svg:`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${Math.ceil(y)}" viewBox="0 0 ${width} ${Math.ceil(y)}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(tr(spec.alt,locale))}</desc><metadata>${esc(JSON.stringify({id:spec.number,locale,kind:'original educational diagram',sources:spec.sources}))}</metadata><defs>${markerDefs()}</defs><style>text{font-family:${FONT_FAMILY}}path{stroke-linecap:round;stroke-linejoin:round}</style><rect width="100%" height="100%" fill="white"/>${body}</svg>`};
}
