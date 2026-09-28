import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
  articleId:'rl-03',figureId:'02-group-relative-advantage',number:'3-1',
  eyebrow:['그림 1','Figure 1'],
  title:['같은 질문의 다른 응답이 비교 기준이 된다','Other responses to the same prompt provide the baseline'],
  subtitle:['기본 outcome-only GRPO: 응답 보상을 그룹 안에서 비교하고, 그 값을 생성 토큰에 공통으로 사용합니다.','Basic outcome-only GRPO compares response rewards within a group and shares that signal across generated tokens.'],
  alt:['같은 질문에서 나온 응답 4개의 보상 1,1,0,0을 평균 .5와 모집단 표준편차 .5로 정규화해 어드밴티지 +1,+1,-1,-1을 구한다. 각 응답의 생성 토큰에는 같은 값이 붙는다.','Four responses to one prompt receive rewards 1,1,0,0. Normalizing by mean .5 and population standard deviation .5 gives advantages +1,+1,-1,-1. Each response shares its advantage across its generated tokens.'],
  caption:['설명용 예: 모집단 표준편차, 안정화 ε 생략. 같은 A를 쓴다고 각 토큰의 기여도가 같다는 뜻은 아닙니다. 다른 질문의 응답은 이 그룹 평균에 섞지 않습니다.','Illustrative example: population standard deviation, stabilization ε omitted. Shared A does not imply equal token contributions. Responses to other prompts are excluded from this group mean.'],
  sources:[{label:'DeepSeekMath §4.1',url:'https://arxiv.org/html/2402.03300v3#S4.SS1'}],
  panels(locale:Locale){
    const p=new Panel(locale,['질문 하나 → 응답 네 개 → 보상','One prompt → four responses → rewards'],846);
    p.box(16,100,488,86,['같은 질문 P','The same prompt P'],'','gray');
    p.path('M54 198 V605',C.muted,2);
    const rewards=[1,1,0,0];
    rewards.forEach((r,i)=>{
      const y=235+i*110;
      p.arrow(54,y+25,91,y+25,C.blue);
      p.token(106,y,[`응답 ${i+1}`,`Response ${i+1}`],208,'blue');
      p.arrow(326,y+25,366,y+25,C.orange);
      p.token(380,y,`r = ${r}`,116,'orange');
      p.line(501,y+25,516,y+25,C.orange,1.5);
    });
    p.path('M516 260 V650 H260 V671',C.orange,2.5,false,true);
    p.box(16,684,488,133,['이 질문의 네 점수로 기준 계산','Compute the baseline from these four rewards'],['평균 μ = 0.5 · 표준편차 σ = 0.5','Mean μ = 0.5 · standard deviation σ = 0.5'],'orange');
    const q=new Panel(locale,['상대 점수를 생성 토큰에 할당','Share A across generated tokens'],846);
    q.box(16,100,488,86,'Aᵢ = (rᵢ − 0.5) / 0.5','','teal');
    const lens=[4,3,4,3];
    rewards.forEach((r,i)=>{
      const y=235+i*110,tone=r===1?'teal':'orange';
      q.text(16,y+30,[`응답 ${i+1}`,`Response ${i+1}`],{size:21,width:128,weight:600});
      for(let j=0;j<lens[i];j++)q.token(148+j*87,y,r===1?'+1':'−1',76,tone);
    });
    q.text(148,641,['칸 하나 = 생성 토큰 하나','One cell = one generated token'],{size:20,width:356,color:C.muted});
    q.box(16,684,488,133,['모두 같은 보상이면 상대 신호 0','Equal rewards give zero relative signal'],['전부 성공·전부 실패한 그룹에는 보상 차이가 없음','All-success or all-failure groups provide no reward contrast'],'gray');
    return [p,q];
  },
} satisfies FigureSpec;
