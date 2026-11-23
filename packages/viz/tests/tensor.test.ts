import {describe,it,expect} from 'vitest';
import {axis,product,transpose,multiply,tensor,Panel,type TensorSpec} from '../src/index';
const a:TensorSpec={id:'a',name:'A',axes:[axis('token',2),axis('channel',3)]};
const b:TensorSpec={id:'b',name:'B',axes:[axis('channel',3),axis('out',2)]};
describe('tensor contracts',()=>{
 it('rejects equal lengths with unrelated contraction axes',()=>expect(()=>product(a,{...b,axes:[axis('head',3),b.axes[1]]},'c','C')).toThrow());
 it('keeps base identity while transposing display axes',()=>{const t=transpose(b);expect(t.baseId).toBe('b');expect(t.axes).toEqual([b.axes[1],b.axes[0]]);expect(product(a,b,'c','C').axes).toEqual([a.axes[0],b.axes[1]]);});
 it('verifies content-key absorption numerically',()=>{const c=[[1,2,3],[2,0,1]],u=[[1,0],[0,1],[1,1]],q=[[2,3]],t=(x:number[][])=>x[0].map((_,j)=>x.map(r=>r[j]));expect(multiply(q,t(multiply(c,u)))).toEqual(multiply(multiply(q,t(u)),t(c)));});
 it('rejects misleading numeric samples',()=>expect(()=>tensor(new Panel('ko',null,400),0,0,a,{sample:[1,3],values:[[1,2,3]]})).toThrow());
});
