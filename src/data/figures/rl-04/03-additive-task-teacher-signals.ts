import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'rl-04',figureId:'03-additive-task-teacher-signals',number:'4-4',
  eyebrow:['그림 4','Figure 4'],layout:'wide',captionIn:'article',
  title:['교사 신호가 과제 어드밴티지를 조정한다','Teacher signals adjust task advantages'],
  subtitle:['A_total = A_task + λdₜ · 교사 신호 비중 λ = 0.2','A_total = A_task + λdₜ · Teacher-signal weight λ = 0.2'],
  alt:['두 토큰 모두 과제 어드밴티지 0.5에서 출발한다. b는 교사 항 +0.139만큼 오른쪽으로 이동해 0.639, d는 -0.139만큼 왼쪽으로 이동해 0.361이 된다. 두 결과는 모두 양수이다. 고정한 합산 신호와 현재 학생의 로그확률로 손실을 만들고 학생 가중치를 업데이트한다.','Both tokens start at task advantage 0.5. Token b moves right by +0.139 to 0.639; token d moves left by -0.139 to 0.361. Both results remain positive. The fixed combined signal and current student log-probability form the loss used to update student weights.'],
  caption:['교육용 수치이며 추가 정규화 전 값입니다. 이동 화살표는 신호의 덧셈을 뜻하며, 학습 중 확률의 변화량이 아닙니다.','Illustrative values before further normalization. Arrows show addition of signals, not probability changes during training.'],
  sources:[{label:'Miles v0.1.0 OPD',url:'https://github.com/radixark/miles/blob/v0.1.0/miles/backends/training_utils/loss_hub/opd.py'}],
  panels(locale:Locale,mobile?:boolean){
    const w=mobile?520:1120;
    const p=new Panel(locale,null,mobile?920:850,w);
    const left=mobile?58:158,right=w-(mobile?42:90),at=(v:number)=>left+(right-left)*v/.8;
    p.circle(24,30,7,C.orange,C.orange);p.text(42,37,['과제 신호','Task signal'],{size:21,width:mobile?160:240,color:C.orange});
    p.circle(mobile?273:385,30,7,C.teal,C.teal);p.text(mobile?291:403,37,['합산 결과','Combined signal'],{size:21,width:200,color:C.teal});
    [0,1].forEach(i=>{
      const y=mobile?214+i*238:208+i*222;
      const total=.5+(i===0?1:-1)*.2*Math.log(2),x0=at(.5),x1=at(total);
      p.text(16,y-64,i===0?['토큰 b','Token b']:['토큰 d','Token d'],{size:25,weight:600,width:160});
      p.line(left,y,right,y,C.muted,2);
      [0,.2,.4,.6,.8].forEach(v=>{p.line(at(v),y+7,at(v),y-7,C.muted,1);p.text(at(v),y+36,v===0?'0':v.toFixed(1),{size:19,anchor:'middle',width:58});});
      p.line(x0,y-8,x0,y-42,C.orange,2,true);p.line(x1,y-8,x1,y-42,C.teal,2,true);
      p.arrow(x0+(i===0?8:-8),y-48,x1+(i===0?-8:8),y-48,C.purple);
      p.circle(x0,y,7,C.orange,C.orange);p.circle(x1,y,7,C.teal,C.teal);
      p.text(x0,y+76,'0.5',{size:22,anchor:'middle',width:76,color:C.orange,weight:600});
      p.text(x1,y-82,i===0?'0.639':'0.361',{size:25,anchor:'middle',width:100,color:C.teal,weight:600});
      p.text((x0+x1)/2,y-120,i===0?'λd₂ ≈ +0.139':'λd₃ ≈ −0.139',{size:22,anchor:'middle',width:220,color:C.purple,weight:600});
    });
    const y=mobile?586:552;
    p.text(w/2,y,['두 결과 모두 0보다 크다','Both results remain above zero'],{size:24,anchor:'middle',width:w-32,weight:600,color:C.teal});
    const boxW=mobile?488:790,boxX=(w-boxW)/2;
    p.box(boxX,y+47,boxW,104,['고정 A_total · 현재 학생 log pθ','Fixed A_total · current student log pθ'],'Lₜ = −A_total × log pθ(xₜ | sₜ)','blue');
    p.arrow(w/2,y+163,w/2,y+192,C.teal);
    p.box(boxX,y+204,boxW,70,['역전파 → 학생 가중치 업데이트','Backpropagation → weight update'],'','teal');
    return [p];
  },
} satisfies FigureSpec;
