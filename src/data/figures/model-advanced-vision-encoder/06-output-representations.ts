import {Panel,C,matrix,grid,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
articleId:'model-advanced-vision-encoder',figureId:'06-output-representations',number:'ma-21-06',
eyebrow:["그림 6 · 시각 인코더", "Figure 6 · Vision"],
title:["이미지 하나의 요약과 패치별 표현은 쓰임이 다릅니다", "Image summaries and patch features serve different roles"],
subtitle:["학습에 쓰는 요약 벡터와 VLM에 넘기는 벡터열을 구별", "Distinguish a training summary from the sequence sent to a VLM"],
caption:["이미지 전체의 분류나 이미지–문장 비교에는 CLS 또는 pooling 등의 요약을 사용할 수 있습니다. VLM 연결에는 여러 공간 위치의 hidden state를 전달할 수 있습니다. 이미지 수준 loss도 인코더를 통해 패치 표현을 학습시키며 패치별 정답 라벨이 반드시 필요한 것은 아닙니다. 실제로 선택하는 출력 층과 요약 방식은 모델마다 다릅니다.", "Classification and image–text comparison may use a summary from CLS or pooling. A VLM can instead receive hidden states at multiple spatial positions. An image-level loss can train patch representations through the encoder without explicit labels for every patch. The selected layer and summary method vary by model."],
alt:["이미지 전체의 분류나 이미지–문장 비교에는 CLS 또는 pooling 등의 요약을 사용할 수 있습니다. VLM 연결에는 여러 공간 위치의 hidden state를 전달할 수 있습니다. 이미지 수준 loss도 인코더를 통해 패치 표현을 학습시키며 패치별 정답 라벨이 반드시 필요한 것은 아닙니다. 실제로 선택하는 출력 층과 요약 방식은 모델마다 다릅니다.", "Classification and image–text comparison may use a summary from CLS or pooling. A VLM can instead receive hidden states at multiple spatial positions. An image-level loss can train patch representations through the encoder without explicit labels for every patch. The selected layer and summary method vary by model."],
captionIn:'article',sources:[{"label": "ViT", "url": "https://arxiv.org/abs/2010.11929"}],
panels(locale:Locale){
const a=new Panel(locale,['A. 이미지 전체를 요약','A. Summarize the whole image'],980);
 const b=new Panel(locale,['B. 공간별 표현을 전달','B. Pass spatial features'],980);
 for(const p of [a,b]){p.box(20,110,480,120,['시각 인코더의 표현','Vision encoder representations'],['여러 패치 위치의 정보를 반영','Informed by multiple patch positions'],'teal');}
 a.arrow(135,240,135,290,C.teal);a.arrow(385,240,385,290,C.teal);
 b.arrow(260,240,260,290,C.teal);
 a.box(20,300,230,170,['CLS 출력 선택','Select CLS output'],['CLS는 입력부터 패치와 함께 처리','CLS is processed with patches from input'],'gray');
 a.box(270,300,230,170,['패치 출력 pooling','Pool patch outputs'],['여러 패치 행을 집계','Aggregate patch rows'],'gray');
 a.arrow(135,480,215,525,C.muted);a.arrow(385,480,305,525,C.muted);
 a.token(100,540,['이미지 벡터 하나','One image vector'],320,'teal',70);a.arrow(260,620,260,660,C.teal);
 a.box(20,670,480,155,['분류 / 이미지–문장 비교','Classification / image–text comparison'],['이미지 수준 정답으로 loss 계산','Compute loss with image-level supervision'],'orange');
 b.text(260,335,'Z [4, dᵥ]',{anchor:'middle',width:400,weight:600});
 for(let i=0;i<4;i++)b.token(60,375+i*65,`z_${'ABCD'[i]}  ·  dᵥ`,400,'teal',50);
 b.arrow(260,650,260,700,C.teal);b.box(20,715,480,140,['언어 모델 연결: 다음 편','Connect to the LM: next article'],['벡터 수 축소 → projector → 입력열','Reduce count → projector → input sequence'],'blue');
 return [a,b];
},
} satisfies FigureSpec;
