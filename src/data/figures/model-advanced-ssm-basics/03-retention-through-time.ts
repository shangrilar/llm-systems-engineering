import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-ssm-basics',figureId:'03-retention-through-time',number:'ssm-03',eyebrow:['그림 3','Figure 3'],
 title:['한 입력의 영향이 서로 다른 속도로 남습니다','One input can persist at different rates'],
 subtitle:['p₀에서 u₀ = 2 · 이후 입력은 0 · 한 번 기록한 입력 추적','u₀ = 2 at p₀ · Later inputs are zero · Track a single written input'],captionIn:'article',
 caption:['대각 Abar의 두 계수가 만드는 감쇠를 비교하는 교육용 예시. 각 칸은 토큰이 아니라 동일 상태의 성분 하나다. 막대 길이는 성분값에 비례하며 실제 모델의 기억 시간을 측정한 그림이 아니다.','Illustrative decay under diagonal Abar. Each cell is one component of the same state, not a token. Bars are proportional to values, not measured memory lifetimes.'],
 alt:['두 상태 성분을 세로로 비교한다. 첫 성분은 매번0.5배로2,1,0.5가 되고 둘째는0.8배로1,0.8,0.64가 된다. ','The first state component halves:2,1,0.5. The second retains0.8 each step:1,0.8,0.64.'],
 sources:[{label:'Mamba §2 · illustrative diagonal SSM',url:'https://arxiv.org/html/2312.00752v2#S2'}],
 panels(locale:Locale){return [0,1].map(j=>{const p=new Panel(locale,j===0?['상태 성분 0 · 매번 × 0.5','State component 0 · × 0.5']:['상태 성분 1 · 매번 × 0.8','State component 1 · × 0.8'],620);const vals=j===0?[2,1,.5]:[1,.8,.64];vals.forEach((v,i)=>{const y=120+i*165;p.text(20,y+32,`h${['₁','₂','₃'][i]}`,{size:27,width:80,color:C.teal});p.rect(120,y,340,60,C.grayFill,C.line,4);p.rect(120,y,170*v,60,C.tealFill,C.teal,4);p.text(480,y+37,`${v}`,{size:25,anchor:'end',width:90,color:C.teal,weight:600});if(i<2){p.arrow(280,y+75,280,y+117,C.purple);p.text(315,y+104,`× ${j===0?.5:.8}`,{size:23,width:140,color:C.purple});}});return p;});}
} satisfies FigureSpec;
