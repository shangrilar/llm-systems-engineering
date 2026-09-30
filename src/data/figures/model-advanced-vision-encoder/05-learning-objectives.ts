import {Panel,C,matrix,grid,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
articleId:'model-advanced-vision-encoder',figureId:'05-learning-objectives',number:'ma-21-05',
eyebrow:["그림 5 · 시각 인코더", "Figure 5 · Vision"],
title:["시각 인코더는 서로 다른 정답으로 학습할 수 있습니다", "Different targets can train a vision encoder"],
subtitle:["ViT는 구조 · 목적 함수는 학습할 문제의 선택", "ViT is an architecture · The objective defines the learning task"],
caption:["분류는 클래스, 이미지–텍스트 정렬은 올바른 짝, 복원은 가려진 픽셀, 언어 생성은 다음 텍스트 토큰을 학습 목표로 삼을 수 있습니다. 네 가지는 선택 가능한 예시이며 필수 연속 단계가 아닙니다. 정렬의 텍스트 인코더는 답변을 생성하는 LLM과 역할이 다릅니다.", "Targets may be a class, matching image–text pairs, masked pixels, or the next text token. These are alternative examples, not four required stages. The text encoder used for alignment has a different role from an answer-generating LLM."],
alt:["분류는 클래스, 이미지–텍스트 정렬은 올바른 짝, 복원은 가려진 픽셀, 언어 생성은 다음 텍스트 토큰을 학습 목표로 삼을 수 있습니다. 네 가지는 선택 가능한 예시이며 필수 연속 단계가 아닙니다. 정렬의 텍스트 인코더는 답변을 생성하는 LLM과 역할이 다릅니다.", "Targets may be a class, matching image–text pairs, masked pixels, or the next text token. These are alternative examples, not four required stages. The text encoder used for alignment has a different role from an answer-generating LLM."],
captionIn:'article',sources:[{"label": "ViT", "url": "https://arxiv.org/abs/2010.11929"}, {"label": "CLIP", "url": "https://arxiv.org/abs/2103.00020"}, {"label": "MAE", "url": "https://arxiv.org/abs/2111.06377"}],
panels(locale:Locale){
const a=new Panel(locale,['A. 이미지와 설명의 짝','A. Match images and captions'],1240);
 a.box(20,110,220,140,['이미지 인코더','Image encoder'],['사진 → 요약 벡터','Image → summary'],'teal');
 a.box(280,110,220,140,['텍스트 인코더','Text encoder'],['설명 → 문장 벡터','Caption → vector'],'blue');
 a.arrow(130,260,200,310,C.teal);a.arrow(390,260,320,310,C.blue);
 a.text(260,350,['이미지 × 설명의 유사도','Image × caption similarity'],{anchor:'middle',width:480,weight:600});
 matrix(a,140,390,[['✓','·','·'],['·','✓','·'],['·','·','✓']],{cellWidth:75,cellHeight:65,gap:8,size:25,tone:'teal',rowLabels:['I₁','I₂','I₃']});
 for(let i=0;i<3;i++)a.text(177+i*83,380,`T${i+1}`,{anchor:'middle',width:70});
 a.box(20,650,480,145,['정답: 대응하는 이미지–문장 쌍','Target: matching image–text pairs'],['맞는 짝의 유사도는 높이고 다른 짝과 구별','Raise similarity for matches; distinguish other pairs'],'orange');
 a.box(20,900,480,230,['다른 예: 이미지 분류','Another objective: classification'],['이미지 → encoder → 분류 head\n예측 클래스와 정답 클래스 비교\n예: 고양이 / 개','Image → encoder → classification head\nCompare predicted and labeled classes\nExample: cat / dog'],'gray');
 const b=new Panel(locale,['B. 이미지를 보고 텍스트 예측','B. Predict text from an image'],1240);
 b.box(20,110,480,130,['이미지 → 시각 인코더','Image → vision encoder'],['패치별 hidden state','Hidden states for patches'],'teal');b.arrow(260,250,260,285,C.teal);
 b.box(20,295,480,145,['연결 모듈 → 언어 모델','Connector → language model'],['질문 + 앞선 정답 토큰을 함께 입력','Also receives the question and prior target tokens'],'blue');b.arrow(260,450,260,490,C.blue);
 b.box(20,500,480,115,['다음 텍스트 토큰 예측','Predict the next text token'],['어휘별 점수 → 정답과 비교','Vocabulary scores → compare with target'],'orange');
 b.box(20,650,480,145,['정답: 다음 텍스트 토큰','Target: the next text token'],['loss가 시각 인코더까지 전달될 수 있음\n갱신 범위는 다음 편에서','Loss can train the vision encoder too\nUpdate scopes: next article'],'orange');
 b.box(20,900,480,230,['다른 예: 가려진 패치 복원','Another objective: masked reconstruction'],['일부 패치를 가림 → 보이는 패치로 인코딩\n복원 decoder → 가린 위치의 픽셀 예측\n원래 픽셀과 비교','Mask patches → encode visible patches\nReconstruction decoder predicts masked pixels\nCompare with original pixels'],'gray');return [a,b];
},
} satisfies FigureSpec;
