import {describe,it,expect} from 'vitest';
import {Panel,C,matrix,port,connector} from '../src/index';

describe('annotated matrices and explicit connectors',()=>{
  it('keeps values, axes, and connection coordinates aligned',()=>{
    const p=new Panel('en',null,500);
    const m=matrix(p,100,80,[[1,['둘','two']],[null,-.5]],{cellWidth:60,cellHeight:40,gap:5,rowLabels:['p0','p1'],columnLabels:['k0','k1'],tone:r=>r===1?'orange':'teal'});
    expect([m.width,m.height]).toEqual([125,85]);
    expect(m.cell(1,1)).toEqual({x:165,y:125,width:60,height:40});
    expect(m.row(1)).toEqual({x:100,y:125,width:125,height:40});
    expect(port(m.row(1),'right',.5,8)).toEqual([233,145]);
    expect(p.svg()).toContain('>two</text>');
    expect(p.svg()).not.toContain('>둘</text>');
    expect(p.svg().match(/data-container/g)).toHaveLength(4);
    expect(p.svg().match(new RegExp(`fill="${C.orangeFill}"`,'g'))).toHaveLength(2);
  });
  it('rejects mismatched axes and invalid cells instead of silently dropping labels',()=>{
    const p=new Panel('ko',null,300);
    expect(()=>matrix(p,0,0,[[1,2],[3]])).toThrow('rectangular');
    expect(()=>matrix(p,0,0,[[1]],{rowLabels:['a','b']})).toThrow('axes');
    expect(()=>matrix(p,0,0,[[1]],{cellWidth:0})).toThrow('geometry');
    expect(()=>matrix(p,0,0,[[1]]).cell(0,1)).toThrow('outside');
  });
  it('keeps arrowheads outside borders and follows the specified clear lane',()=>{
    const p=new Panel('ko',null,300),a={x:20,y:30,width:100,height:40},b={x:240,y:140,width:100,height:40};
    const route=connector(p,port(a,'right',.5,6),port(b,'left',.5,8),{via:[[180,50],[180,160]],tone:'blue'});
    expect(route.d).toBe('M126 50 L180 50 L180 160 L232 160');
    expect(p.svg()).toContain('marker-end="url(#arrow-blue)"');
    expect(()=>connector(p,[0,0],[10,10])).toThrow('horizontal or vertical');
    expect(()=>connector(p,[0,0],[0,0])).toThrow('distinct');
    expect(()=>port(a,'top',1.2)).toThrow('port');
  });
});
