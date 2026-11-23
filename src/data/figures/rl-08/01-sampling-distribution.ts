import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-08',figureId:'01-sampling-distribution',number:'9-1',eyebrow:['그림 1','Figure 1'],captionIn:'article',
 title:['같은 숫자도 더하는 순서에 따라 결과가 달라진다','Addition order can change the result'],
 subtitle:['매 덧셈 결과를 소수 첫째 자리로 반올림하는 교육용 예입니다. 실제 GPU 포맷은 아닙니다.','A teaching example: round each addition result to one decimal place. This is not an actual GPU format.'],
 alt:['1과 .04를 먼저 더하면 반올림하여1, 다시 .04를 더해도1이다. 두 .04를 먼저 더하면 .08을 .1로 반올림하여 최종1.1이다. 두 엔진의 계산순서와 반올림규칙을 맞춰 차이를 줄인다.','Adding .04 to 1 twice yields 1 after rounding each time. Adding .04 and .04 first rounds .08 to .1, giving 1.1. Align operation order and rounding rules to reduce engine differences.'],
 caption:['',''],sources:[{label:'Miles v0.1 §5.3',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale){return [false,true].map(right=>{
 const p=new Panel(locale,right?['작은 값끼리 먼저 더하기','Add the small values first']:['큰 값에 하나씩 더하기','Add each small value to the large one'],650);
 p.box(16,100,488,90,right?'1.0 + (0.04 + 0.04)':'(1.0 + 0.04) + 0.04','','gray');
 p.arrow(260,205,260,244,C.orange);
 p.box(16,260,488,105,right?'0.04 + 0.04 = 0.08':'1.0 + 0.04 = 1.04',right?['반올림 → 0.1','Round → 0.1']:['반올림 → 1.0','Round → 1.0'],'orange');
 p.arrow(260,380,260,419,C.orange);
 p.box(16,435,488,105,right?'1.0 + 0.1 = 1.1':'1.0 + 0.04 = 1.04',right?['최종 결과: 1.1','Final result: 1.1']:['반올림 → 최종 결과: 1.0','Round → final result: 1.0'],'teal');
 p.box(16,580,488,60,['정렬: 같은 순서·같은 반올림 규칙','Align: same order and rounding rules'],'','purple');
 return p;
 });}
} satisfies FigureSpec;
