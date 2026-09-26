import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Redrawn with the shared module; the earlier image had no editable source.
export default {
  articleId:'llm-systems-engineering-introduction',figureId:'model-hardware-workload-venn',number:'model-hardware-workload-venn',
  layout:'wide',screens:['desktop'],
  eyebrow:['그림 1','Figure 1'],
  title:['세 관점이 만나는 실행 시스템','Execution systems where three perspectives meet'],
  subtitle:['모델, 하드웨어, 워크로드를 함께 볼 때 실행 방식의 선택이 보입니다.','Execution choices become clear when models, hardware, and workloads are viewed together.'],
  alt:['모델, 하드웨어, 워크로드를 나타내는 세 원이 겹치고, 세 원의 공통 영역에 실행 시스템이 놓인 벤 다이어그램.','A Venn diagram with three overlapping circles labeled Model, Hardware, and Workload, and Execution System at their shared intersection.'],
  caption:['이 시리즈는 모델, 하드웨어, 워크로드의 세 관점으로 실행 시스템을 살펴봅니다.','This series examines execution systems through three perspectives: models, hardware, and workloads.'],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,700,1104);
    const circles=[[552,230,'blue',['모델','Model'],552,150],[417,465,'teal',['하드웨어','Hardware'],345,555],[687,465,'orange',['워크로드','Workload'],759,555]] as const;
    // Fills multiply so overlaps darken toward the shared center; outlines go on top so none is hidden.
    for(const [cx,cy,tone] of circles)p.el('circle',{cx,cy,r:215,fill:C[`${tone}Fill`],style:'mix-blend-mode:multiply'});
    for(const [cx,cy,tone] of circles)p.el('circle',{cx,cy,r:215,fill:'none',stroke:C[tone],'stroke-width':3});
    for(const [,,tone,label,x,y] of circles)p.text(x,y,label,{size:36,weight:700,color:C[tone],anchor:'middle',width:260});
    // The shared region is narrow, so the English label takes two lines.
    p.text(552,locale==='ko'?398:382,['실행 시스템','Execution\nsystem'],{size:28,weight:700,anchor:'middle',width:300});
    return [p];
  },
} satisfies FigureSpec;
