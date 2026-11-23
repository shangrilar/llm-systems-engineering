import {Panel,C,L,math,spec} from './drawing';
import type {Label,Locale} from '@llm-systems/viz';
// The same 12 tokens and m = 4, compressed by CSA (overlapping, with B) and by CSA2 (no overlap, no B). Report §2.3 and the V4.1 reference Compressor:
// wkv, wgate [D, c]; softmax over the m tokens of a group; weighted sum; RMSNorm; RoPE afterwards at the group's first token. CSA fig. 2 (csa-flow) shows the CSA side in detail.
// Teaching m = 4 for both so the entries line up (the CSA2 encoder layers use m = 2; a layer with compression 1 skips pooling).
const X=24,ST=40,CW=36,Y=100;
function tokens(p:Panel,hot:(i:number)=>boolean){
 for(let i=0;i<12;i++){p.rect(X+i*ST,Y,CW,40,hot(i)?C.tealFill:C.grayFill,hot(i)?C.teal:C.line,6);p.text(X+i*ST+CW/2,Y+27,String(i),{size:18,anchor:'middle',width:CW-4,color:hot(i)?C.teal:C.muted,weight:hot(i)?700:400});}
 p.text(X,Y-12,['토큰','tokens'],{size:17,color:C.muted,width:100});
}
function span(p:Panel,from:number,to:number,y:number,color:string,label:Label,dash=false,bold=false){
 const x0=X+from*ST,x1=X+to*ST+CW;
 p.path(`M${x0} ${y} V${y+9} H${x1} V${y}`,color,bold?3:2,dash);
 math(p,(x0+x1)/2,y+32,label,{size:17,anchor:'middle',color,width:x1-x0+30,weight:bold?700:400});
}
function csa(l:Locale){
 const p=new Panel(l,L('A. CSA · 겹침 압축','A. CSA · overlapping compression'),520);
 tokens(p,i=>i<8);
 span(p,0,3,152,C.orange,L('a: 이전 구간','a: previous span'));span(p,4,7,152,C.teal,L('b: 자기 구간','b: own span'));
 span(p,0,7,214,C.teal,L('entry 1 = 토큰 8개','entry 1 = 8 tokens'),false,true);
 span(p,4,11,278,C.muted,L('entry 2 = 토큰 4–11 (일부 공유)','entry 2 = tokens 4–11 (half shared)'),true);
 math(p,X,372,L('채널마다 S = softmax([Z^a+B^a ; Z^b+B^b]) · 8개','per channel S = softmax([Z^a+B^a ; Z^b+B^b]) · 8 tokens'),{size:17,color:C.ink,width:470});
 math(p,X,428,L('압축 가중치는 [D, 2c] (a | b 절반)','compression weights are [D, 2c] (a | b halves)'),{size:17,color:C.muted,width:470});
 return p;
}
function csa2(l:Locale){
 const p=new Panel(l,L('B. CSA2 · 겹침 없음','B. CSA2 · no overlap'),520);
 tokens(p,i=>i>=4&&i<8);
 span(p,0,3,152,C.muted,L('entry 0','entry 0'),true);span(p,4,7,152,C.teal,L('entry 1 = 토큰 4개','entry 1 = 4 tokens'),false,true);span(p,8,11,152,C.muted,L('entry 2','entry 2'),true);
 math(p,X,290,L('구간이 겹치지 않는다 · 각 토큰은 한 entry에만','spans do not overlap · each token feeds one entry'),{size:17,color:C.teal,width:470,weight:600});
 math(p,X,372,L('채널마다 S = softmax(Z) · m개','per channel S = softmax(Z) · m tokens'),{size:17,color:C.ink,width:470});
 math(p,X,400,L('B 없음','no B'),{size:17,color:C.muted,width:470});
 math(p,X,428,L('압축 가중치는 [D, c] (겹침 없음)','compression weights are [D, c] (no overlap)'),{size:17,color:C.muted,width:470});
 return p;
}
export default spec('07-compression-span',L('CSA2는 겹치지 않고 압축한다','CSA2 compresses without overlap'),L('비교용 m = 4 (실제 CSA2 encoder m = 2, decoder m = 1) · entry 1을 만드는 토큰과 softmax 크기','Comparison m = 4 (real CSA2: encoder m = 2, decoder m = 1) · tokens behind entry 1 and the softmax size'),L('CSA는 한 entry를 이전 구간 a와 자기 구간 b, 모두 8개 토큰에서 만들고 이웃 entry가 구간 절반을 공유한다. 압축기 안에는 구간 내 절대 위치 편향 B가 있고 softmax는 8개에 걸친다. CSA2는 겹침과 B를 없애 한 entry를 자기 구간 토큰 m개에서만 만들고 softmax는 m개에 걸친다.','CSA builds an entry from 8 tokens, the previous span a and its own span b, so neighbouring entries share half their span; the compressor has an absolute in-span position bias B and one softmax over 8. CSA2 removes the overlap and B: an entry comes from the m tokens of its own span only, with one softmax over m.'),(l:Locale)=>[csa(l),csa2(l)],false);
