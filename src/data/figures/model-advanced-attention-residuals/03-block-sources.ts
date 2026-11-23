import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-attention-residuals',figureId:'03-block-sources',number:'ma-14-03',
  eyebrow:['그림 4 · 깊이를 묶어 저장하기','Figure 4 · Group depth sources'],
  title:['Block 안은 합으로 묶고, Block 사이는 선택해서 읽습니다','Sum within blocks; select among block sources'],
  subtitle:['같은 토큰 t · B₁ = {f₁, f₂} · 현재 B₂ = {f₃, f₄} · 각 source는 [d]','Same token t · B₁ = {f₁, f₂} · Current B₂ = {f₃, f₄} · Each source is [d]'],
  captionIn:'article',caption:['f₃까지 계산한 같은 시점에 Full은 e,f₁,f₂,f₃ 네 source를 각각 보관하고, Block은 e,f₁+f₂,f₃ 세 source를 보관합니다. 각 source의 폭은 d입니다. 저장량은 줄지만 묶인 f₁과 f₂를 서로 다른 비중으로 고를 수 없습니다. 읽기가 끝나고 F₄가 f₄를 만든 뒤에만 현재 block 합을 f₃+f₄로 갱신합니다. Block은 토큰 구간이 아닌 깊이 방향 sublayer 묶음입니다.','At the same instant after f₃, Full stores four sources e,f₁,f₂,f₃; Block stores three: e,f₁+f₂,f₃. Every source has width d. Grouping saves storage but prevents weighting f₁ and f₂ separately. Only after reading and producing f₄ does the current sum become f₃+f₄. Blocks group sublayers along depth, not token ranges.'],
  alt:['Full은 네 source를 따로 선택한다. Block은 세 source로 줄이지만 f1과 f2가 같은 비중을 공유한다. f4 생성 후 현재 합만 f3+f4로 바뀐다.','Full selects four sources separately. Block reduces the count to three but f1 and f2 share a weight. After f4 is produced, only the current sum changes to f3+f4.'],
  sources:[{label:'Kimi K3 §2.2, Block Attention Residuals equations 10–11',url:'https://arxiv.org/html/2607.24653v1#S2.SS2'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. Full · 각각 보관','A. Full · Separate sources'],810);
    const b=new Panel(locale,['B. Block · 합으로 보관','B. Block · Store sums'],810);
    for(const p of [a,b])p.text(260,123,['f₃까지 계산한 같은 시점','Same instant: f₃ already exists'],{size:23,anchor:'middle',width:480});
    ['e','f₁','f₂','f₃'].forEach((v,i)=>{
      const y=157+84*i;a.token(100,y,v+' [d]',250,'teal',58);a.line(360,y+29,450,y+29,C.teal,2.5);
    });
    a.path('M450 186 V535 H260 V567',C.teal,2.5,false,true);
    a.box(30,577,460,118,['4개를 따로 선택','4 separate choices'],'h₄ = α₀e + α₁f₁ + α₂f₂ + α₃f₃','teal');
    a.text(260,750,['f₁과 f₂에 서로 다른 비중 가능','f₁ and f₂ can have different weights'],{size:23,anchor:'middle',width:480});
    ['e [d]','f₁ + f₂ [d]','f₃ [d]'].forEach((v,i)=>{
      const y=157+112*i;b.token(100,y,v,250,i===2?'orange':'teal',58);b.line(360,y+29,450,y+29,C.teal,2.5);
    });
    b.path('M450 186 V488 H260 V517',C.teal,2.5,false,true);
    b.box(30,527,460,118,['3개 source를 선택','3 source choices'],'h₄ = β₀e + β₁(f₁ + f₂) + β₂f₃','teal');
    b.text(260,687,['f₁과 f₂는 같은 β₁을 공유','f₁ and f₂ share the same β₁'],{size:23,anchor:'middle',width:480,color:C.orange});
    b.box(30,716,460,80,['F₄가 f₄를 만든 뒤 현재 합만 갱신','After F₄: update only the current sum'],'','gray');
    const c=new Panel(locale,['C. 새 출력은 현재 block에 더하기','C. Add output to the current block'],260);
    c.token(30,120,'f₃',95,'orange',62);c.text(155,160,'+',{size:30,anchor:'middle',width:40});c.token(185,120,'f₄',95,'blue',62);c.arrow(295,151,345,151,C.orange);c.token(360,120,'f₃ + f₄',140,'orange',62);
    c.text(260,230,['e와 완료된 f₁ + f₂는 그대로','e and completed f₁ + f₂ stay unchanged'],{size:22,anchor:'middle',width:490});
    return [a,b,c];
  },
} satisfies FigureSpec;
