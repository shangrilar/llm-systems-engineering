import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-09',figureId:'01-precision-placements',number:'8-1',eyebrow:['그림 1','Figure 1'],captionIn:'article',
 title:['같은 가중치도 계산에 쓰는 값은 달라질 수 있다','The same weights can lead to different computation values'],
 subtitle:['숫자는 단순 반올림 예시이며, 확률 막대는 개념도입니다. 실제 FP8 변환이나 측정 결과가 아닙니다.','Numbers illustrate simple rounding; probability bars are schematic. Neither shows an actual FP8 conversion or measurement.'],
 alt:['같은 입력과 가중치 버전에서 학습은 원래 값으로, 추론은 양자화한 근삿값으로 계산한다. 두 경로의 다음 토큰 확률이 달라질 수 있다.','With the same input and weight version, training computes with original values and inference with quantized approximations. Next-token probabilities may differ.'],
 caption:['',''],sources:[{label:'Miles v0.1 §3.1',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale){return [false,true].map(low=>{
  const p=new Panel(locale,low?['추론 · FP8','Inference · FP8']:['학습 순전파 · BF16','Training forward · BF16'],830);
  p.box(16,95,488,92,['같은 입력','Same input'],['P + 앞선 토큰','P + preceding tokens'],'gray');
  p.arrow(260,199,260,230,C.muted);
  p.box(16,245,488,102,['같은 가중치 버전','Same weight version'],['가중치 하나의 예: 0.26','Example weight: 0.26'],'gray');
  p.arrow(260,360,260,400,low?C.orange:C.teal);
  p.box(16,418,488,125,low?['양자화한 근삿값으로 계산','Compute with quantized values']:['원래 값으로 계산','Compute with original values'],low?['0.26 → 0.30','0.26 → 0.30']:['0.26','0.26'],low?'orange':'teal');
  if(low)p.text(24,578,['메모리·계산 비용 감소 가능','Potential memory and compute savings'],{size:21,width:472,color:C.orange});
  p.arrow(260,610,260,648,low?C.orange:C.teal);
  p.text(16,686,['다음 토큰의 확률','Next-token probabilities'],{size:23,weight:600,width:488});
  const vals=low?[48,72,40]:[64,56,40];
  p.line(80,788,440,788,C.muted);
  vals.forEach((h,i)=>{p.rect(105+i*125,788-h,65,h,low?C.orange:C.teal);p.text(137+i*125,818,['A','B','C'][i],{size:20,anchor:'middle'});});
  return p;
 });}
} satisfies FigureSpec;
