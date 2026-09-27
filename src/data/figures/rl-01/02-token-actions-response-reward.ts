import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'rl-01',figureId:'02-token-actions-response-reward',number:'1-2',
  eyebrow:['그림 2','Figure 2'],
  title:['토큰을 여러 번 선택하고 응답을 평가한다','Choose tokens repeatedly, then evaluate the response'],
  subtitle:['선택한 토큰은 다음 문맥이 됩니다. 이 예의 보상은 응답을 끝낸 뒤 한 번 받습니다.','Each chosen token enters the next context. This example receives one reward at completion.'],
  alt:['같은 LLM이 질문에서 x1을 고르고, 질문에 x1을 붙인 문맥에서 x2를 고른다. 여러 토큰으로 완성한 응답 2+3=5를 정답 검증한 뒤 보상 +1을 받는다.','The same LLM chooses x1 from the prompt, then x2 from the prompt plus x1. The completed response 2+3=5 is checked for correctness and receives a reward of +1.'],
  caption:['x₁·x₂는 설명용 토큰 기호입니다. 행동의 단위는 토큰 선택이고, 여기서 평가하는 단위는 완성된 응답입니다.','x₁ and x₂ are illustrative token symbols. Actions select tokens; the evaluation unit here is the completed response.'],
  sources:[{label:'RLHF Book — Training Overview',url:'https://rlhfbook.com/c/03-training-overview'}],
  panels(locale:Locale){
    const p=new Panel(locale,['선택한 토큰을 다음 입력에 붙이기','Append each choice to the next input'],742);
    for(let i=0;i<2;i++){
      const y=104+i*282;
      p.box(16,y,488,102,[`문맥 ${i+1}`,`Context ${i+1}`],i===0?['질문: “2+3은?”','Prompt: “What is 2+3?”']:['질문: “2+3은?” + x₁','Prompt: “What is 2+3?” + x₁'],'gray');
      p.arrow(210,y+111,210,y+132);
      p.box(112,y+143,196,76,['같은 LLM','Same LLM'],'','blue');
      p.arrow(317,y+181,359,y+181);
      p.token(371,y+156,i===0?'x₁':'x₂',82,'blue');
      if(i===0)p.path('M412 318 V373',C.blue,2.5,false,true);
    }
    p.text(16,682,['같은 모델을 반복 호출','Repeated calls to the same model'],{size:22,weight:600,color:C.blue,width:488});
    p.text(16,718,['선택 → 문맥 확장 → 다음 선택 → …','Choose → extend context → choose again → …'],{size:20,width:488});
    const q=new Panel(locale,['응답 하나에 보상 하나 붙이기','Assign one reward to this response'],742);
    q.text(16,114,['선택이 이어져 하나의 응답을 구성','Successive choices form one response'],{size:21,width:488});
    ['x₁','x₂','…','xₜ'].forEach((t,i)=>q.token(31+i*122,148,t,90,'blue'));
    q.path('M31 210 V226 H487 V210',C.muted,1.5);
    q.text(260,261,['응답 전체','Whole response'],{size:22,anchor:'middle',weight:600,width:480});
    q.box(30,294,460,104,['완성된 응답','Completed response'],'“2+3=5”','blue');
    q.arrow(260,409,260,436,C.orange);
    q.box(30,447,460,116,['정답 검증','Check the answer'],['완성된 응답이 맞는지 확인','Check whether the completed answer is correct'],'orange');
    q.arrow(260,575,260,601,C.orange);
    q.box(130,612,260,76,['보상 +1','Reward +1'],'','orange');
    q.text(16,732,['이 예에서는 완료 후 한 번 평가','Evaluate once, after completion, in this example'],{size:20,width:488,color:C.muted});
    return [p,q];
  },
} satisfies FigureSpec;
