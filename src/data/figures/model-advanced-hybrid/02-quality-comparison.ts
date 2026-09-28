import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hybrid',figureId:'02-quality-comparison',number:'ma-12-03',layout:'wide',
 eyebrow:['그림 3 · 논문의 품질 비교','Figure 3 · Reported quality comparison'],
 title:['같은 학습 조건에서 혼합 모델의 Perplexity가 더 낮았습니다','The hybrid achieved lower perplexity in a controlled comparison'],
 subtitle:['Mamba-2 Table 2 · 350M parameters · Pile 7B tokens · GPT-2 tokenizer','Mamba-2 Table 2 · 350M parameters · Pile 7B tokens · GPT-2 tokenizer'],
 captionIn:'article',caption:['Mamba-2 논문의 동일 파라미터 수, 하이퍼파라미터, 학습·검증 데이터 비교에서 발췌했다. 세 구성의 perplexity이며 모든 모델 규모에서의 우위나 특정 정보 처리 역할의 인과 증명이 아니다.','Excerpted from Mamba-2 Table 2, matching parameter count, hyperparameters, training and validation data. These perplexities do not establish universal superiority or a causal division of information-processing roles.'],
 alt:['Transformer++의 perplexity는8.68, Mamba-2는8.60, Attention6층을 포함한 혼합은8.26이다. 낮을수록 좋다.','Perplexity is 8.68 for Transformer++, 8.60 for Mamba-2, and 8.26 for the hybrid with six attention layers. Lower is better.'],
 sources:[{label:'Mamba-2 §9.2.3, Table 2',url:'https://arxiv.org/html/2405.21060v1#S9.SS2.SSS3'}],
 panels(locale:Locale,mobile?:boolean){
  const w=mobile?520:1104,p=new Panel(locale,null,600,w),right=w-24;
  p.text(22,53,['모델 구성','Architecture'],{size:24,weight:600,width:250});
  p.text(right,53,'Perplexity ↓',{size:24,weight:600,anchor:'end',width:220});
  p.text(right,90,['낮을수록 좋음','Lower is better'],{size:20,anchor:'end',width:220,color:C.muted});
  const names=['Transformer++','Mamba-2',locale==='ko'?'Mamba-2 + Attention':'Mamba-2 + Attention'];
  [8.68,8.60,8.26].forEach((v,i)=>{
   const y=134+i*137;
   p.rect(0,y,w,113,i===2?C.tealFill:C.grayFill,i===2?C.teal:C.line,10);
   p.text(22,y+44,names[i],{size:mobile?24:29,weight:600,width:w-150,color:i===2?C.teal:C.ink});
   if(i===2)p.text(22,y+86,['48층 중 Attention 6층','6 attention layers out of 48'],{size:20,width:w-145,color:C.teal});
   p.text(right,y+62,v.toFixed(2),{size:34,weight:600,anchor:'end',width:115,color:i===2?C.teal:C.ink});
  });
  return [p];
 }
} satisfies FigureSpec;
