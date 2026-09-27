import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'rl-01',figureId:'01-role-mapping',number:'1-1',
  eyebrow:['그림 1','Figure 1'],
  title:['상황을 보고 행동을 고르는 정책','A policy chooses an action from the current state'],
  subtitle:['미로의 이동과 LLM의 토큰 선택은 같은 강화학습 틀로 읽을 수 있습니다.','Maze moves and LLM token choices fit the same reinforcement-learning loop.'],
  alt:['미로 예는 현재 위치에서 이동을 선택해 위치를 바꾸는 순환이다. LLM 예는 질문과 생성 이력을 읽고 다음 토큰을 선택해 문맥을 늘리는 순환이다. 각 예는 완료 후 결과를 평가하고 경험과 보상으로 정책을 학습한다.','A maze policy reads the current position, selects a move, and observes the new position. An LLM reads the prompt and generated history, selects a token, and extends the context. Both examples evaluate the completed outcome and later train the policy from experience and reward.'],
  caption:['실선은 행동과 상태 변화, 점선은 경험·보상을 사용하는 학습입니다. 이 예에서는 완료 후 보상을 주며, 매 행동마다 가중치를 갱신하지 않습니다.','Solid arrows show actions and state changes; dashed arrows show learning from experience and reward. In these examples, rewards are given at completion; weights are not updated after every action.'],
  sources:[{label:'RLHF Book — Training Overview',url:'https://rlhfbook.com/c/03-training-overview'}],
  panels(locale:Locale){
    const a=new Panel(locale,['미로에서 이동하기','Moving through a maze'],804);
    const b=new Panel(locale,['LLM으로 다음 토큰 고르기','Choosing the next token with an LLM'],804);
    const configs=[{p:a,state:['현재 위치 + 미로 지도','Current position + maze map'],policy:['이동을 고르는 정책','Policy choosing a move'],action:['한 칸 이동 선택','Choose one move'],detail:['위 · 아래 · 왼쪽 · 오른쪽','Up · down · left · right'],next:['이동한 뒤의 위치','Position after the move'],reward:['목표에 도달했는지 확인','Check whether the goal was reached']},{p:b,state:['질문 + 지금까지 생성한 토큰','Prompt + tokens generated so far'],policy:['언어 모델 정책','Language-model policy'],action:['다음 토큰 하나 선택','Choose one next token'],detail:['문맥을 보고 후보 중에서 선택','Choose among candidates given the context'],next:['선택한 토큰이 추가된 문맥','Context with the selected token appended'],reward:['완성된 응답 평가','Evaluate the completed response']}];
    for(const c of configs){
      const p=c.p;
      if(p===a){
        p.rect(44,96,422,82,C.grayFill,C.gray);
        p.text(60,128,['현재 위치 + 미로 지도','Position + maze map'],{size:22,weight:600,width:300});
        p.text(60,161,['● 현재 위치  ■ 목표','● Position  ■ Goal'],{size:20,color:C.muted,width:310});
        for(let r=0;r<3;r++)for(let col=0;col<3;col++)p.rect(393+col*20,106+r*20,18,18,r===1&&col===1?C.ink:C.paper,C.line,0);
        p.circle(402,115,6,C.blue,C.blue);p.rect(435,148,14,14,C.orange,C.orange,0);
      }else p.box(44,96,422,82,['질문 + 생성한 토큰','Prompt + generated tokens'],['예: “2+3은?” + x₁ …','e.g. “2+3?” + x₁ …'],'gray');
      p.arrow(255,187,255,207);
      p.box(44,216,422,76,c.policy as [string,string],'','blue');
      p.arrow(255,302,255,322);
      p.box(44,332,422,114,c.action as [string,string],c.detail as [string,string],'blue');
      p.arrow(255,455,255,475);
      p.box(44,485,422,90,c.next as [string,string],'','gray');
      p.path('M477 530 H504 V136 H477',C.muted,2,false,true);
      p.text(280,606,['완료 후','At completion'],{size:20,color:C.muted,width:220});
      p.arrow(255,584,255,614,C.orange);
      p.box(44,625,422,126,c.reward as [string,string],p===b?['보상 모델 / 정답·테스트 검증 등','Reward model / answer or test verifier']:['이 예에서는 마지막에 보상','This example gives a terminal reward'],'orange');
      p.path('M35 680 H12 V254 H35',C.teal,2,true,true);
      p.text(55,788,['경험 + 보상 → 이후 정책 학습','Experience + reward → later policy learning'],{size:20,color:C.teal,width:453});
    }
    return [a,b];
  },
} satisfies FigureSpec;
