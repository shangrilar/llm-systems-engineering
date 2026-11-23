import {C,FONT_FAMILY,type Label,type Locale} from '@llm-systems/viz';
import record from './step-record.json';

// One source for SVG, Motion Canvas, and the exported Manim contract.
export const data=record;
export const linearFormulas={forward:'Y = XW',wgrad:'dW = XᵀdY',xgrad:'dX = dYWᵀ'};
export const style={colors:C,fontFamily:FONT_FAMILY,fontLatin:'Arial',fontKorean:'Apple SD Gothic Neo'};
export const labels={
  input:['입력 토큰','Input tokens'],
  forward:['Forward · 예측','Forward · predict'],
  loss:['Loss · 정답 확률 평가','Loss · score targets'],
  backward:['Backward · gradient 계산','Backward · gradients'],
  update:['Update · 파라미터 변경','Update · parameters'],
  activation:['저장한 activation X','Saved activation X'],
  saveX:['저장 X','Saved X'],
  saveXT:['저장 Xᵀ','Saved Xᵀ'],
  xUnchanged:['X는 그대로','X stays unchanged'],
  currentWeight:['현재 가중치 W','Current weight W'],
  wgrad:['wgrad · 현재 W로','wgrad · for this W'],
  xgrad:['xgrad · 이전 층으로','xgrad · to previous layer'],
  target:['다음 정답','Next target'],
  layer1:['층 1','Layer 1'],
  layer2:['층 2','Layer 2'],
  logits:['출력 logits','Output logits'],
  localTitle:['어떤 성분끼리 곱하는가?','Which components multiply?'],
  localSteps:[
    ['Forward에서 X와 W로 Y를 계산','Forward computes Y from X and W'],
    ['출력 쪽에서 dY가 도착','dY arrives from the output side'],
    ['저장한 X를 다시 읽어 dW 계산','Read saved X to compute dW'],
    ['현재 W를 읽어 dX 계산','Read current W to compute dX'],
  ],
  backwardSteps:[
    ['Forward · X₀에서 Y로','Forward · X₀ to Y'],
    ['Forward 때의 값을 저장','Save values needed by backward'],
    ['출력 쪽에서 dY₂ 전달','Receive dY₂ from the output side'],
    ['현재 층: dW₂ 계산, dX₂ 전달','Current layer: compute dW₂, pass dX₂'],
    ['이전 층: dW₁ 계산, dX₁ 전달','Earlier layer: compute dW₁, pass dX₁'],
    ['모인 gradient를 optimizer로','Pass parameter gradients to optimizer'],
  ],
} satisfies Record<string,Label|Label[]>;
export const text=(label:Label,locale:Locale)=>typeof label==='string'?label:label[locale==='ko'?0:1];
export const fmt=(n:number,d=3)=>n.toFixed(d).replace('-','−');
export const sources=[
  {label:'PyTorch autograd',url:'https://docs.pytorch.org/docs/stable/notes/autograd.html'},
  {label:'PyTorch cross_entropy',url:'https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.cross_entropy.html'},
];
