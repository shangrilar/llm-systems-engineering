import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
  articleId:'rl-02',figureId:'03-old-current-reference',number:'2-4',
  eyebrow:['그림 4','Figure 4'],
  title:['현재 모델을 누구와, 무엇으로 비교하는가','Who do we compare the current model with, and how?'],
  subtitle:['같은 입력 P에서, old와는 선택 토큰의 확률비를 구하고 reference와는 분포의 차이를 구합니다.','For the same input P, compare a selected-token probability with old and a distribution with the reference.'],
  alt:['왼쪽은 같은 P를 current와 old 모델에 넣고 토큰 u의 확률 0.6과 0.5로 확률비 1.2를 구한다. 오른쪽은 같은 P를 current와 reference에 넣고 후보 u b d e 전체 확률분포를 KL로 비교한다. 두 current는 같은 현재 모델이며 reference는 고정한다.','Left: the same P enters current and old models; probabilities 0.6 and 0.5 for token u give ratio 1.2. Right: the same P enters current and reference models; KL compares their distributions over u, b, d and e. Both current boxes denote the same model; the reference is fixed.'],
  caption:['네 후보만 있는 가상 어휘의 예입니다. 두 current는 같은 현재 모델입니다. old는 데이터를 만든 정책이고, reference는 유지하려는 고정 기준입니다.','An illustrative four-token vocabulary. Both current boxes denote the same model. Old produced the data; the reference is a fixed anchor.'],
  sources:[{label:'PPO',url:'https://arxiv.org/abs/1707.06347'},{label:'RLHF Book — Regularization',url:'https://rlhfbook.com/c/15-regularization'}],
  panels(locale:Locale){return [false,true].map(kl=>{
    const p=new Panel(locale,kl?['기준과의 거리 · 선택적 KL','Optional KL · distance from an anchor']:['데이터 생성 이후의 변화 · 확률비','Ratio · change since generation'],864);
    p.box(16,104,488,86,['같은 입력 P','Same input P'],['첫 토큰을 예측할 문맥','Context for the first token'],'gray');
    p.path('M260 202 V224 H127 V244',C.muted,2,false,true);
    p.path('M260 224 H393 V244',C.muted,2,false,true);
    const tones=['blue',kl?'purple':'orange'] as const;
    [16,282].forEach((x,i)=>{
      const tone=tones[i];
      p.box(x,257,222,108,i===0?'current':kl?'reference':'old',i===0?['학습 중 모델','Trainable model']:kl?['고정 기준 모델','Fixed anchor']:['생성 당시 모델','Generation model'],tone);
      p.arrow(x+111,377,x+111,410,C[tone]);
      if(!kl){
        p.box(x,432,222,128,['선택 토큰 u','Selected token u'],`p(u | P) = ${i===0?'0.6':'0.5'}`,tone);
      }else{
        p.text(x,439,['다음 토큰 분포','Token distribution'],{size:20,width:222,weight:600,color:C[tone]});
        const probs=i===0?[.6,.2,.1,.1]:[.4,.3,.2,.1];
        probs.forEach((v,j)=>{const y=465+j*38;
          p.text(x,y+19,['u','b','d','e'][j],{size:20,width:24});
          p.rect(x+34,y,128*v/.6,23,C[tone],C[tone],3);
          p.text(x+218,y+20,v.toFixed(1),{size:20,width:43,anchor:'end',color:C[tone]});
        });
      }
      const start=kl?619:572;
      p.path(`M${x+111} ${start} V650 H${i===0?226:294} V679`,C[tone],2.5,false,true);
    });
    p.box(16,692,488,144,kl?'KL(current ∥ reference)':'r = p_current(u | P) / p_old(u | P)',kl?['전체 분포가 기준에서 얼마나 달라졌는가?','How far does the full distribution differ from the anchor?']:['0.6 / 0.5 = 1.2\n이 선택의 확률이 얼마나 달라졌는가?','0.6 / 0.5 = 1.2\nHow much has this choice’s probability changed?'],kl?'purple':'orange');
    return p;
  });},
} satisfies FigureSpec;
