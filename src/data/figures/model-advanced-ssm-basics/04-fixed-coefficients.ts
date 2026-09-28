import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-ssm-basics',figureId:'04-fixed-coefficients',number:'ssm-04',eyebrow:['그림 4','Figure 4'],
 title:['입력이 달라도 같은 계수로 갱신합니다','Different inputs, the same update coefficients'],
 subtitle:['고정 계수 SSM · 같은 이전 상태 [2, 1]에서 비교','Fixed-coefficient SSM · Same old state [2, 1]'],captionIn:'article',
 caption:['고정은 추론 중 입력마다 계수를 새로 만들지 않는다는 뜻이다. 학습 중 계수가 변하지 않는다는 뜻이 아니다. 입력값과 새 상태는 달라지지만 Abar,Bbar,C는 동일하다.','Fixed means coefficients are not regenerated per input during inference, not that training cannot change them. Inputs and states differ; Abar,Bbar,C remain the same.'],
 alt:['입력2와 입력-2를 비교한다. 두 경우 모두 Abar의0.5,0.8로 이전 상태를1,0.8로 남기고 Bbar의1,0.5를 쓴다. 기록값은2,1과-2,-1로 달라지며 새 상태는3,1.8과-1,-0.2다. 같은 C로 읽으면4.8과-1.2다.','Inputs2 and−2 both retain [1,0.8] using rates [0.5,0.8]. The same writing coefficients [1,0.5] yield [2,1] or [−2,−1]. New states are [3,1.8] or [−1,−0.2], read by the same C as4.8 or−1.2.'],
 sources:[{label:'Mamba §2 · linear time invariance',url:'https://arxiv.org/html/2312.00752v2#S2'}],
 panels(locale:Locale){return [false,true].map(negative=>{const p=new Panel(locale,negative?['다른 입력 · u = −2','Other input · u = −2']:['한 입력 · u = 2','One input · u = 2'],740);
 p.box(20,105,480,90,['이전 상태 [2, 1]','Old state [2, 1]'],'','teal');p.arrow(260,205,260,240,C.purple);p.box(20,250,480,100,'Ā · × [0.5, 0.8]', '[1, 0.8]','purple');p.arrow(260,360,260,395,C.orange);p.box(20,405,480,100,'＋ B̄u',negative?'−2 × [1, 0.5] = [−2, −1]':'2 × [1, 0.5] = [2, 1]','orange');p.arrow(260,515,260,550,C.teal);p.token(100,565,negative?'[−1, −0.2]':'[3, 1.8]',320,'teal',60);p.arrow(260,635,260,665,C.purple);p.token(20,680,negative?'C · [1, 1] → y = −1.2':'C · [1, 1] → y = 4.8',480,'blue',55);return p;});}
} satisfies FigureSpec;
