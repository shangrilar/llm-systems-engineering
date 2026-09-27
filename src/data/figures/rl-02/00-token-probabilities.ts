import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'rl-02',figureId:'00-token-probabilities',number:'2-1',eyebrow:['그림 1','Figure 1'],
 title:['각 토큰의 확률은 어느 문맥에서 나오는가','Which context produces each token probability?'],
 subtitle:['기록된 응답 u → b → d를 현재 모델로 다시 평가합니다. 세 열은 같은 모델의 서로 다른 예측 위치입니다.','Score the recorded response u → b → d with the current model. Each column is a prediction position in the same model.'],
 alt:['같은 모델에서 P는 u, P+u는 b, P+u+b는 d의 확률을 예측한다. 각 문맥은 Transformer, 문맥 표현, LM head와 softmax를 거쳐 후보 분포가 된다. 기록된 토큰의 확률만 선택하며 미래 토큰은 읽지 않는다.','The same model scores u from P, b from P+u, and d from P+u+b. Each context passes through Transformer layers, a context representation, and the LM head and softmax. Gather the recorded token probability without reading future tokens.'],
 caption:['P는 프롬프트입니다. 가상 토큰과 확률을 사용한 교육용 예시입니다. 기타는 나머지 후보의 합입니다. 학습 시 인과적 마스크로 여러 위치를 한 번의 forward에서 계산할 수 있습니다.','P denotes the prompt. Illustrative tokens and probabilities. Other sums the remaining candidates. A causal mask lets training compute multiple positions in one forward pass.'],
 sources:[{label:'PPO',url:'https://arxiv.org/abs/1707.06347'}],layout:'wide',
 panels(locale:Locale,mobile=false){
  const w=mobile?520:1120,cw=mobile?496:352,gap=32,step=834;
  const p=new Panel(locale,null,mobile?step*3:step,w);
  const contexts=['P','P + u','P + u + b'],tokens=['u','b','d'],probs=[[.5,.2,.1,.2],[.3,.2,.1,.4],[.1,.2,.4,.3]];
  for(let i=0;i<3;i++){
   const x=mobile?12:i*(cw+gap),y=mobile?i*step:0,c=x+cw/2;
   p.text(x,y+30,[`위치 ${i+1} · 기록된 토큰 ${tokens[i]}`,`Position ${i+1} · recorded ${tokens[i]}`],{size:23,weight:600,width:cw});
   p.box(x,y+56,cw,88,contexts[i],['이 시점에 읽는 문맥','Context available here'],'gray');
   p.arrow(c,y+150,c,y+174,C.blue);
   p.box(x,y+184,cw,92,['Transformer · 가중치 θ','Transformer · weights θ'],['앞 문맥의 관계를 계산','Compute contextual features'],'blue');
   p.arrow(c,y+284,c,y+310,C.blue);
   p.token(c-62,y+320,`h${['₁','₂','₃'][i]}`,124,'blue',48);
   p.arrow(c,y+376,c,y+400,C.blue);
   p.box(x,y+410,cw,56,'LM head → softmax','','blue');
   p.arrow(c,y+474,c,y+502,C.blue);
   p.text(x,y+532,['다음 토큰 후보의 확률','Next-token probabilities'],{size:22,weight:600,width:cw});
   for(let j=0;j<4;j++){
    const yy=y+558+j*40,v=probs[i][j],selected=j===i;
    p.text(x+2,yy+20,j===3?['기타','Other']:tokens[j],{size:20,width:64,color:selected?C.blue:C.muted});
    p.rect(x+76,yy+2,(cw-146)*v/.5,23,selected?C.blue:C.grayFill,selected?C.blue:C.line,3);
    p.text(x+cw-4,yy+21,v.toFixed(1),{size:20,anchor:'end',width:54,color:selected?C.blue:C.muted});
   }
   p.arrow(c,y+722,c,y+743,C.blue);
   p.box(x,y+754,cw,64,`pθ(${tokens[i]} | ${contexts[i]}) = ${probs[i][i]}`,'','purple');
  }
  return [p];
 }
} satisfies FigureSpec;
