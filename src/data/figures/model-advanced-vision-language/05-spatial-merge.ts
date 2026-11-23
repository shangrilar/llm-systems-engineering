import {Panel,C,matrix,grid,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
articleId:'model-advanced-vision-language',figureId:'05-spatial-merge',number:'ma-22-01',
eyebrow:["그림 1 · 시각과 언어", "Figure 1 · Vision"],
title:["이웃한 네 벡터를 하나의 긴 벡터로 묶습니다", "Pack four neighboring vectors into one longer vector"],
subtitle:["교육용: 16개 패치로 확장 · [16,4] → [4,16] · 공간에서 성분 축으로", "Toy example expanded to 16 patches · [16,4] → [4,16] · Space to channels"],
caption:["첫 글의 네 패치 예시를 16개로 확장했습니다. 각 2×2 공간 그룹의 hidden state 네 개를 정해진 순서로 이어 붙입니다. [16,4]가 [4,16]이 되어 벡터 개수는 4분의 1, 폭은 4배이며 총 64개 값은 보존됩니다. 이 재배열 자체는 평균이나 값 삭제가 아닙니다. 실제 연결에서는 pooling이나 query resampler 등 다른 축소 방법도 사용하며 재배열과 projector를 하나의 모듈로 구현할 수도 있습니다.", "The four-patch example is expanded to 16 patches. Concatenate four hidden states in each spatial 2×2 group in a fixed order. [16,4] becomes [4,16]: one quarter as many vectors, four times the width, and the same 64 values. Rearrangement alone is neither averaging nor deletion. Other connectors use pooling or query resamplers; rearrangement and projection may be implemented in one module."],
alt:["첫 글의 네 패치 예시를 16개로 확장했습니다. 각 2×2 공간 그룹의 hidden state 네 개를 정해진 순서로 이어 붙입니다. [16,4]가 [4,16]이 되어 벡터 개수는 4분의 1, 폭은 4배이며 총 64개 값은 보존됩니다. 이 재배열 자체는 평균이나 값 삭제가 아닙니다. 실제 연결에서는 pooling이나 query resampler 등 다른 축소 방법도 사용하며 재배열과 projector를 하나의 모듈로 구현할 수도 있습니다.", "The four-patch example is expanded to 16 patches. Concatenate four hidden states in each spatial 2×2 group in a fixed order. [16,4] becomes [4,16]: one quarter as many vectors, four times the width, and the same 64 values. Rearrangement alone is neither averaging nor deletion. Other connectors use pooling or query resamplers; rearrangement and projection may be implemented in one module."],
captionIn:'article',sources:[{"label": "DeepSeek V4.1 multimodal architecture", "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"}],
panels(locale:Locale,mobile=false){
const a=new Panel(locale,['A. 공간에서 이웃끼리 묶기','A. Group spatial neighbors'],1100);
 a.text(260,125,['4×4 패치 위치 · 각 벡터 4성분','4×4 patch positions · 4 values each'],{anchor:'middle',width:500,weight:600});
 const tones=['teal','blue','orange','purple'] as const;
 for(let r=0;r<4;r++)for(let c=0;c<4;c++){const g=Math.floor(r/2)*2+Math.floor(c/2);a.token(35+c*120,175+r*95,`z${r*4+c+1}`,105,tones[g],75);}
 a.text(260,620,'Z [16,4] · 16 × 4 = 64',{anchor:'middle',width:500,weight:600});a.arrow(260,645,260,705,C.teal);
 for(let g=0;g<4;g++)a.token(45,730+g*72,`G${g+1}  ·  16`,430,tones[g],55);
 const b=new Panel(locale,['B. 첫 2×2 그룹 확대','B. Expand the first 2×2 group'],mobile?1340:1100);
 for(let r=0;r<4;r++){b.text(55,151+r*75,['z1','z2','z5','z6'][r],{anchor:'end',width:50});for(let c=0;c<4;c++)b.token(80+c*100,115+r*75,`${r*4+c+1}`,90,'teal',55);}
 b.text(260,460,['숫자는 값의 위치를 추적하는 표식','Numbers track positions, not actual values'],{anchor:'middle',width:480,size:20,color:C.muted});
 b.arrow(260,495,260,555,C.teal);
 if(mobile){
  b.text(260,590,['G1 · 하나의 벡터를 두 줄로 표시','G1 · One vector wrapped onto two lines'],{anchor:'middle',width:500,size:22,weight:600});
  for(let row=0;row<2;row++){
   const y=660+row*135;
   b.text(142,y-25,row===0?'z1':'z5',{anchor:'middle',width:210,size:24,weight:600});
   b.text(374,y-25,row===0?'z2':'z6',{anchor:'middle',width:210,size:24,weight:600});
   for(let col=0;col<8;col++){b.rect(30+col*58,y,50,65,C.tealFill,C.teal,3);b.text(55+col*58,y+42,String(row*8+col+1),{anchor:'middle',width:46,size:24});}
  }
  b.path('M22 650 H12 V870 H22',C.teal,2);b.path('M500 650 H510 V870 H500',C.teal,2);
 }else{
  for(let i=0;i<16;i++){b.rect(18+i*31,585,28,65,C.tealFill,C.teal,3);b.text(32+i*31,625,String(i+1),{anchor:'middle',width:27,size:16});}
 }
 const dy=mobile?230:0;
 b.text(260,700+dy,'G1 = concat(z1, z2, z5, z6)',{anchor:'middle',width:510,weight:600});
 b.box(20,770+dy,480,150,['개수 감소 · 값은 재배열','Fewer vectors · values rearranged'],['[16,4] → [4,16]\n총 64개 값은 그대로','[16,4] → [4,16]\nAll 64 values are retained'],'orange');
 b.box(20,955+dy,480,120,['다음: projector','Next: projector'],['묶인 벡터를 언어 모델의 폭으로 변환','Map grouped vectors to the LM width'],'blue');return [a,b];
},
} satisfies FigureSpec;
