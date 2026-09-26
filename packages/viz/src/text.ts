import {C} from './theme';
// A bilingual label is either shared text or a [ko, en] pair.
export type Label = string | readonly [string, string];
export type Locale = 'ko' | 'en';
export const esc=(s:unknown)=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const tr=(s:Label,l:Locale)=>typeof s==='string'?s:s[l==='en'?1:0];
// Approximate advance width in ems, tuned for Arial and Apple SD Gothic Neo. The browser QA checks the real layout.
export function units(s:string){return [...s].reduce((n,c)=>n+(/[⺀-꓏가-힯]/.test(c)?1:/[ilI.,:;'| ]/.test(c)?.3:/[MW@]/.test(c)?.9:.57),0);}
export function wrap(s:string,width:number,size:number){
  const lines:string[]=[];
  for(const paragraph of s.split('\n')){
    let line='';
    for(const word of paragraph.split(' ')){
      const next=line?line+' '+word:word;
      if(line&&units(next)*size>width){lines.push(line);line=word;}else line=next;
    }
    lines.push(line);
  }
  return lines;
}
export function svgText(x:number,y:number,s:string,size=22,color=C.ink,weight=400,width=500,anchor='start'){
  return wrap(s,width,size).map((line,i)=>`<text x="${x}" y="${y+i*size*1.4}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" data-max-width="${width}">${esc(line)}</text>`).join('');
}
