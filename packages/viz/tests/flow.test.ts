import {describe,it,expect} from 'vitest';
import {Panel} from '../src/panel';
import {FLOW,math,flowMatrix,fanOut} from '../src/flow';
import {route} from '../src/route';
describe('flow diagrams',()=>{
 it('renders sub- and superscripts as tspans and stacks opposite scripts',()=>{
  const p=new Panel('ko',null,100,300);math(p,0,20,'Q^C_h',{size:20});
  const svg=p.svg();
  expect(svg).toContain('>Q</tspan>');expect(svg).toMatch(/dy="-7.6" font-size="14">C<\/tspan>/);
  expect(svg).toMatch(/dx="-[\d.]+" font-size="14">h<\/tspan>/);
 });
 it('routes around a box between two points',()=>{
  const p=new Panel('ko',null,400,400);flowMatrix(p,FLOW.desk,200,180,'X','T','D',{w:120});
  const pts=route(p,{from:[200,40],to:[200,360],start:'down',end:'down'});
  expect(pts[0]).toEqual([200,40]);expect(pts.at(-1)).toEqual([200,360]);
  for(let i=1;i<pts.length;i++){
   const [a,b]=[pts[i-1],pts[i]];expect(a[0]===b[0]||a[1]===b[1]).toBe(true);
   // No segment may pass through the plane (x 140–260, y 180–228).
   const crosses=Math.max(a[0],b[0])>140&&Math.min(a[0],b[0])<260&&Math.max(a[1],b[1])>180&&Math.min(a[1],b[1])<228;
   expect(crosses).toBe(false);
  }
 });
 it('keeps a straight run when nothing is in the way',()=>{
  const p=new Panel('ko',null,200,200);
  expect(route(p,{from:[10,50],to:[150,50],start:'right',end:'right'})).toEqual([[10,50],[150,50]]);
 });
});

describe('fanOut',()=>{
  it('draws one trunk to the last row and one arrowed branch per tap from the trunk',()=>{
    const p=new Panel('ko',null,400,400);
    fanOut(p,[80,114],[{to:[273,270]},{to:[273,455],tone:'red',group:'data-path="i"'}]);
    const svg=p.parts.join('');
    expect(svg).toContain('<path d="M80 114 L80 455"');
    expect(svg).toContain('d="M80 270 L273 270"');
    expect(svg).toMatch(/<g data-path="i"><path d="M80 455 L273 455" stroke="#B34242"[^>]*marker-end/);
    expect(svg.match(/data-source="80,114"/g)).toHaveLength(3);
  });
  it('rejects taps above or left of the source',()=>{
    expect(()=>fanOut(new Panel('ko',null,100,100),[80,114],[{to:[60,200]}])).toThrow();
  });
});
