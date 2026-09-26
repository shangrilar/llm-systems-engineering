// Shared palette for the site's educational diagrams. Each tone has a line color and a matching fill.
export const C = {
  ink:'#182C40', muted:'#526577', line:'#DCE4EC', paper:'#FFFFFF',
  blue:'#2470BB', blueFill:'#EDF5FD', teal:'#287D78', tealFill:'#EDF7F5',
  orange:'#B55B22', orangeFill:'#FFF2E6', purple:'#7954A3', purpleFill:'#F3EEF8',
  gray:'#657789', grayFill:'#F3F6F9', red:'#B34242', redFill:'#FFF0EE',
};
export type Tone = 'blue'|'teal'|'orange'|'purple'|'gray'|'red';
// PNGs are reviewed on macOS (Arial + Apple SD Gothic Neo); other systems fall back to Noto Sans KR.
export const FONT_FAMILY = 'Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif';
// Arrow markers are named after the color key so `Panel.path` can reference them by color.
export function markerId(color:string){return `arrow-${Object.keys(C).find(k=>C[k as keyof typeof C]===color)??'muted'}`;}
export function markerDefs(){
  return Object.entries(C).filter(([k])=>!k.endsWith('Fill')).map(([k,color])=>`<marker id="arrow-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="${color}" stroke-width="1.6"/></marker>`).join('');
}
