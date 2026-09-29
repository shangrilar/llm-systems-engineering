import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mamba-selective',figureId:'06-delta-retention',number:'mamba-06',eyebrow:['그림 2','Figure 2'],
 title:['Δ는 유지와 기록을 함께 조절합니다','Δ controls both retention and writing'],
 subtitle:['한 채널의 상태 성분 하나 · A = ln(0.5) < 0 · B = 1 · u = 2','One state component in one channel · A = ln(0.5) < 0 · B = 1 · u = 2'],captionIn:'article',
 caption:['다른 값은 고정하고 Δ만 바꾼 교육용 예시. 막대의 길이는 같은 척도를 사용한다.','Illustrative example varying only Δ. All bars use the same scale.'],
 alt:['이전 상태2에서 Δ1은1을 남기고2를 기록한다. Δ2는0.5를 남기고4를 기록한다. A,B,u는 같고 Δ만 다르다.','From old state 2, Δ=1 retains 1 and writes 2; Δ=2 retains 0.5 and writes 4. A, B and u are held fixed.'],
 sources:[{label:'Mamba-1 step',url:'https://github.com/state-spaces/mamba/blob/v2.2.2/mamba_ssm/modules/mamba_simple.py#L219-L226'}],
 panels(locale:Locale){return [1,2].map(delta=>{const p=new Panel(locale,`Δ = ${delta}`,650);
 p.text(20,115,['이전 상태 = 2','Old state = 2'],{weight:600});p.rect(20,140,160,44,C.tealFill,C.teal,4);
 p.arrow(100,195,100,237,C.teal);
 p.text(20,270,delta===1?['유지 계수 0.5 → 남는 값 1','Retention 0.5 → retained 1']:['유지 계수 0.25 → 남는 값 0.5','Retention 0.25 → retained 0.5'],{size:21,width:480});
 p.rect(20,305,160,44,C.paper,C.line,4,true);p.rect(20,305,delta===1?80:40,44,C.tealFill,C.teal,4);
 p.line(20,395,500,395,C.line,1);
 p.text(20,445,['새 입력의 기록: Δ × B × u','New input write: Δ × B × u'],{weight:600,size:21});
 p.text(20,490,`${delta} × 1 × 2 = ${delta*2}`,{size:26,color:C.orange,weight:600});
 p.rect(20,520,delta*160,44,C.orangeFill,C.orange,4);
 p.text(20,620,['막대 길이: 상태 값 · 같은 척도','Bar length: state value · same scale'],{size:18,color:C.muted});return p;});}
} satisfies FigureSpec;
