import {describe,expect,it} from 'vitest';
import {C,Panel,cells,compose,curve,grid,timeline,type FigureSpec} from '../src/index';

const panel=()=>new Panel('ko',null,400,1120);

describe('frame options',()=>{
  const base:FigureSpec={articleId:'t',figureId:'f',number:'0',title:'T',subtitle:'S',alt:'A',caption:'Caption text',sources:[],layout:'wide',panels:l=>[new Panel(l,null,100,1120)]};
  it('omits the caption when the article shows it',()=>{
    expect(compose(base,'ko').svg).toContain('Caption text');
    const article=compose({...base,captionIn:'article'},'ko');
    expect(article.svg).not.toContain('Caption text');
    expect(article.height).toBeLessThan(compose(base,'ko').height);
  });
  it('places an eyebrow above the title',()=>{
    const {svg}=compose({...base,eyebrow:['그림 2','Figure 2']},'en');
    expect(svg.indexOf('Figure 2</text>')).toBeLessThan(svg.indexOf('>T</text>'));
  });
  it('draws no header for an untitled panel',()=>{
    expect(panel().svg()).toBe('');
  });
});

describe('primitives',()=>{
  it('lays out cells and leaves null cells empty',()=>{
    const p=panel(),row=cells(p,10,20,['a',null],{tone:'teal',w:40,gap:4});
    expect(row.width).toBe(84);
    expect(row.center(1)).toBe(74);
    expect(p.svg().match(/<rect/g)).toHaveLength(2);
    expect(p.svg()).toContain(`fill="${C.paper}" stroke="${C.teal}"`);
    expect(p.svg().match(/<text/g)).toHaveLength(1);
  });
  it('colors grid cells and frames a block of them',()=>{
    const p=panel(),g=grid(p,0,0,2,3,{cell:10,gap:2,tone:(r,c)=>r===0&&c<2?'orange':null});
    expect([g.width,g.height]).toEqual([34,22]);
    expect(p.svg().match(new RegExp(`fill="${C.orangeFill}"`,'g'))).toHaveLength(2);
    expect(g.outline(0,0,0,1,'blue',3)).toEqual({x:-3,y:-3,right:25,bottom:13});
  });
  it('cases only the bend of a curve',()=>{
    const p=panel();
    curve(p,[0,0],[200,100],{tone:'purple',tail:50});
    const [casing,line]=p.parts;
    expect(casing).toContain('stroke="white"');
    expect(casing).not.toContain('H200');
    expect(line).toContain('H200');
    expect(line).toContain('url(#arrow-purple)');
  });
  it('maps time to x and stacks lanes',()=>{
    const p=panel(),t=timeline(p,{x:0,y:0,width:1000,span:10,labelWidth:200,lanes:[{label:'a',bars:[{from:0,to:5}]},{label:'b',bars:[]}]});
    expect(t.at(0)).toBe(200);
    expect(t.at(10)).toBe(1000);
    expect(t.laneY(1)-t.laneY(0)).toBe(112);
    expect(p.svg()).toContain('x="200" y="0" width="400"');
  });
});

describe('ported elements',()=>{
  it('writes literal elements with escaped bilingual text',()=>{
    const p=new Panel('en',null,100,1104);
    p.el('rect',{x:1,y:2,width:3,height:4,fill:C.blueFill});
    p.el('text',{x:5,y:6,'font-size':20},['가 & 나','A & B']);
    expect(p.svg()).toBe(`<rect x="1" y="2" width="3" height="4" fill="${C.blueFill}"/><text x="5" y="6" font-size="20">A &amp; B</text>`);
  });
  it('adds figure-level defs and keeps the eyebrow, title, subtitle and rule positions',()=>{
    const {svg}=compose({articleId:'t',figureId:'f',number:'0',eyebrow:'그림 1',title:'T',subtitle:'S',alt:'A',caption:'C',sources:[],layout:'wide',defs:'<pattern id="hatch"/>',panels:l=>[new Panel(l,null,10,1104)]},'ko');
    expect(svg).toContain('<pattern id="hatch"/></defs>');
    expect(svg).toContain('y="49" fill="#2470BB" font-size="18"');
    expect(svg).toContain('y="99" fill="#182C40" font-size="36" font-weight="700"');
    expect(svg).toContain('y="141" fill="#5C6C7C" font-size="23"');
    expect(svg).toContain('<path d="M48,170 H1152"');
    expect(svg).toContain('translate(48 206)');
  });
});
