import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'rl-02',figureId:'02-ratio-clipping',number:'2-3',
  eyebrow:['그림 3','Figure 3'],
  title:['확률비가 커져도 계속 밀어붙이지 않도록','Avoid pushing indefinitely as the ratio changes'],
  subtitle:['J = min(rA, clip(r, 0.8, 1.2) × A)를 최대화합니다. 최소화하는 손실은 −J입니다.','Maximize J = min(rA, clip(r, 0.8, 1.2) × A). The loss to minimize is −J.'],
  alt:['생성 확률은 0.5로 고정한다. A=+1이면 현재 확률 증가를, A=-1이면 감소를 비교한다. 오른쪽 clip 결과 0.8에 A=-1을 곱하면 -0.8이 된다. A가 양수면 목적함수는 r이 1.2를 넘을 때, A가 음수면 r이 0.8보다 작을 때 평평해진다.','Recorded probability stays at 0.5. Positive A illustrates increasing probabilities; negative A illustrates decreasing probabilities. On the right, multiplying the clipped ratio 0.8 by A=-1 gives -0.8. The objective is flat above r=1.2 for positive A and below r=0.8 for negative A.'],
  caption:['세로축은 A를 곱한 목적함수 J입니다. Clipping은 이 샘플 항의 기울기를 바꿉니다. 확률비를 강제로 가두지는 않으며, 다른 샘플과 보조 손실은 여전히 파라미터를 바꿀 수 있습니다.','The vertical axis is objective J, including A. Clipping changes this sample term’s slope. It does not constrain the ratio itself; other samples and auxiliary losses can still change the parameters.'],
  sources:[{label:'PPO §3, Figure 1',url:'https://arxiv.org/abs/1707.06347'}],
  panels(locale:Locale){return [1,-1].map(sign=>{
    const p=new Panel(locale,sign>0?['좋았던 선택: A = +1','A good choice: A = +1']:['나빴던 선택: A = −1','A poor choice: A = −1'],1096);
    p.box(16,100,488,104,['생성 당시 확률은 고정','The recorded probability stays fixed'],'p_old = 0.5 · r = p_current / p_old','gray');
    p.text(16,243,sign>0?'p_current:  0.5 → 0.6 → 0.7':'p_current:  0.5 → 0.4 → 0.3',{size:22,width:488});
    p.text(16,280,sign>0?'r:  1 → 1.2 → 1.4':'r:  1 → 0.8 → 0.6',{size:22,width:488,color:C.blue});
    p.box(16,307,488,142,sign>0?'clip(1.4, 0.8, 1.2) = 1.2':'clip(0.6, 0.8, 1.2) = 0.8',sign>0?'1.2 × (+1) = +1.2\nJ = min(+1.4, +1.2) = +1.2':'0.8 × (−1) = −0.8\nJ = min(−0.6, −0.8) = −0.8','purple');
    p.raw('<g transform="translate(0,180)">');
    const X=(r:number)=>80+(r-.4)/1.2*400;
    const Y=(j:number)=>sign>0?650-j*170:350-j*170;
    const flat=sign>0?[1.2,1.6]:[.4,.8];
    p.rect(X(flat[0]),332,X(flat[1])-X(flat[0]),324,C.tealFill,C.tealFill,0);
    p.text(16,326,['목적함수 J','Objective J'],{size:22,weight:600,width:488});
    [.4,.8,1.2,1.6].forEach(v=>{
      const y=Y(sign*v);p.line(80,y,480,y,C.line,1);
      p.text(65,y+7,`${sign<0?'−':''}${v}`,{size:20,anchor:'end',width:58});
    });
    p.line(80,332,80,657,C.muted,1.5);p.line(80,657,487,657,C.muted,1.5);
    [.4,.8,1,1.2,1.6].forEach(r=>{
      p.line(X(r),658,X(r),665,C.muted,1.5);
      p.text(X(r),695,String(r),{size:20,anchor:'middle',width:60});
    });
    p.text(503,695,'r',{size:21,width:17});
    [.8,1.2].forEach(r=>p.line(X(r),332,X(r),657,C.muted,1.3,true));
    p.line(X(.4),Y(sign*.4),X(1.6),Y(sign*1.6),C.gray,3,true);
    const points=[.4,.8,1.2,1.6].map(r=>`${X(r)} ${Y(Math.min(r*sign,Math.max(.8,Math.min(1.2,r))*sign))}`);
    p.path('M'+points.join(' L'),C.blue,4);
    const kink=sign>0?1.2:.8;p.circle(X(kink),Y(kink*sign),5,C.blue,C.blue);
    p.line(16,734,62,734,C.gray,3,true);p.text(75,741,'rA',{size:20,width:55});
    p.line(176,734,222,734,C.blue,4);p.text(235,741,['clip 적용 후 J','J after clipping'],{size:20,width:269,color:C.blue});
    p.box(16,780,488,118,sign>0?['r > 1.2에서 기울기 0','Zero slope when r > 1.2']:['r < 0.8에서 기울기 0','Zero slope when r < 0.8'],sign>0?['이미 확률이 충분히 커진 선택을 더 밀지 않음','No further push from this term once probability has increased enough']:['이미 확률이 충분히 작아진 선택을 더 누르지 않음','No further push from this term once probability has decreased enough'],'teal');
    p.raw('</g>');
    return p;
  });},
} satisfies FigureSpec;
