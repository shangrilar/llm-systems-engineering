import {Panel,C,matrix,grid,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
articleId:'model-advanced-vision-language',figureId:'04-connector-training',number:'ma-22-05',
eyebrow:["그림 5 · 시각과 언어", "Figure 5 · Vision"],
title:["같은 예측 loss도 갱신 범위를 다르게 정할 수 있습니다", "The same prediction loss can train different modules"],
subtitle:["연결부만 학습 / 전체 공동 학습 · 필수 순서가 아닌 두 가지 구성", "Connector-only / joint training · Two configurations, not mandatory stages"],
caption:["두 구성 모두 이미지와 질문, 앞선 정답 토큰으로 다음 정답 토큰의 점수를 예측해 loss를 계산합니다. 왼쪽은 pretrained 시각 인코더와 LLM을 고정하고 projector만 갱신합니다. 고정 LLM도 projector로 전달할 입력 gradient를 계산합니다. 오른쪽은 시각 인코더·projector·LLM을 함께 갱신합니다. 공동 학습과 처음부터 초기화해 학습하는 것은 다른 선택이며 둘을 동일시하지 않습니다.", "Both configurations predict the next target token from an image, a question and previous target tokens. Left: pretrained vision encoder and LLM weights are fixed; only the projector updates. The fixed LLM still computes gradients to its inputs for the projector. Right: the vision encoder, projector and LLM update jointly. Joint training and training from scratch are separate choices."],
alt:["두 구성 모두 이미지와 질문, 앞선 정답 토큰으로 다음 정답 토큰의 점수를 예측해 loss를 계산합니다. 왼쪽은 pretrained 시각 인코더와 LLM을 고정하고 projector만 갱신합니다. 고정 LLM도 projector로 전달할 입력 gradient를 계산합니다. 오른쪽은 시각 인코더·projector·LLM을 함께 갱신합니다. 공동 학습과 처음부터 초기화해 학습하는 것은 다른 선택이며 둘을 동일시하지 않습니다.", "Both configurations predict the next target token from an image, a question and previous target tokens. Left: pretrained vision encoder and LLM weights are fixed; only the projector updates. The fixed LLM still computes gradients to its inputs for the projector. Right: the vision encoder, projector and LLM update jointly. Joint training and training from scratch are separate choices."],
captionIn:'article',sources:[{"label": "LLaVA", "url": "https://arxiv.org/abs/2304.08485"}, {"label": "Kimi K3", "url": "https://arxiv.org/html/2607.24653v1"}],
panels(locale:Locale){
const panels=[];
 for(let mode=0;mode<2;mode++){
 const p=new Panel(locale,mode===0?['A. 연결부만 갱신','A. Update only the connector']:['B. 전체 공동 학습','B. Train all modules jointly'],1420);
 p.token(50,110,['이미지','Image'],300,'teal',60);p.arrow(200,180,200,220,C.teal);
 const blocks=[['Vision encoder',mode===0?['고정','Fixed']:['갱신','Update']],['Projector',['갱신','Update']],['LLM + LM head',mode===0?['고정','Fixed']:['갱신','Update']]] as const;
 for(let i=0;i<3;i++){const y=230+i*245;const update=mode===1||i===1;
 p.box(20,y,390,125,blocks[i][0],update?['가중치 갱신','Update weights']:['가중치 고정','Fixed weights'],update?'teal':'gray');
 if(i<2)p.arrow(195,y+140,195,y+225,C.blue);

 }
 p.text(225,645,['질문·앞선 정답도 입력','Also input: question + prior targets'],{size:18,width:275,color:C.blue});
 p.arrow(195,865,195,910,C.blue);
 p.box(20,920,390,175,['다음 토큰 예측 loss','Next-token prediction loss'],['예측 점수와 정답 비교\n현재 정답을 입력에서 미리 읽지 않음','Compare scores with the target\nThe current target is not visible as input'],'orange');
 p.path('M420 1000 H490 V840 H420',C.orange,2.5,true,true);
 p.path('M420 750 H455 V555 H420',C.orange,2.5,true,true);
 if(mode===1)p.path('M420 505 H455 V305 H420',C.orange,2.5,true,true);
 p.text(260,1130,['실선: 순방향 · 점선: gradient','Solid: forward · Dashed: gradient'],{anchor:'middle',width:500,size:19,color:C.muted});
 p.box(20,1170,480,190,mode===0?['고정 ≠ 입력 gradient 차단','Fixed ≠ blocked input gradients']:['함께 학습 ≠ 반드시 from scratch','Joint training ≠ necessarily from scratch'],mode===0?['LLM 가중치는 유지해도 입력에 대한 미분은 projector로 전달','LLM weights stay fixed, but input derivatives reach the projector']:['pretrained 초기화 여부와 갱신 범위는 별개의 선택','Pretrained initialization and update scope are separate choices'],'gray');
 panels.push(p);
 }return panels;
},
} satisfies FigureSpec;
