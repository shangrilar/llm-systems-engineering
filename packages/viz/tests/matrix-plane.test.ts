import {describe,it,expect} from 'vitest';
import {Panel} from '../src/panel';
import {matrixPlane} from '../src/matrix-plane';
import {multiply} from '../src/tensor';
describe('matrix planes',()=>{
 it('rejects values that cannot form a finite rectangular matrix',()=>{
  for(const values of [[],[[]],[[1],[2,3]],[[NaN]]])expect(()=>matrixPlane(new Panel('ko',null,300),50,50,'X','X',values,{row:'tokens',col:'features'})).toThrow('Invalid matrix plane');
 });
 it('preserves content scores when moving the expansion to the query',()=>{
  const C=[[1,0,1],[0,1,1],[1,1,0],[2,0,1]],U=[[1,0],[0,1],[1,1]],T=(a:number[][])=>a[0].map((_,j)=>a.map(r=>r[j]));
  for(let v=0;v<=3;v++){
   const q=[[v,2]],expanded=multiply(q,T(multiply(C,U))),absorbed=multiply(multiply(q,T(U)),T(C));
   expect(expanded).toEqual(absorbed);expect(expanded).toEqual([[2*v+2,v+4,v+2,3*v+2]]);
  }
 });
});
