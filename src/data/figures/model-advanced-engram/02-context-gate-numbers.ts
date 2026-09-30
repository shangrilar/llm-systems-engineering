import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-engram',figureId:'02-context-gate-numbers',number:'ma-20-03',
  eyebrow:['그림 3 · Gate 계산 예시','Figure 3 · A numeric gate'],
  title:['같은 Value도 문맥에 따라 반영량이 달라집니다','Context changes how much of the same value is used'],
  subtitle:['교육용 d=2 · 같은 e에서 같은 k, v · RMSNorm: γ=1, ε 생략','Toy d=2 · Same e gives the same k and v · RMSNorm: γ=1, ε omitted'],
  captionIn:'article',caption:['서로 다른 prefix와 같은 끝 3토큰(N=3)을 가정한 교육용 hidden 값이며 실제 문장 측정값이 아닙니다. 두 경우 모두 k=[1,1], v=[2,−1]로 고정하고 h만 바꿉니다. 각 입력의 RMS는 1이므로 정규화 후 값은 그대로입니다. A의 내적은 2, B의 내적은 −2이며 √2로 나누고 sigmoid를 취하면 α_A≈0.8044, α_B≈0.1956입니다. 결과 벡터는 반올림 전 계수로 계산한 뒤 소수 넷째 자리까지 표시했습니다. Engram의 이 대표식은 scalar gate 하나로 Value 전체를 조절합니다. 07편의 성분별 output gate와 단위를 구별해야 하며 α는 사실의 정확도나 신뢰도 확률이 아닙니다.','Hidden values are illustrative, assuming different prefixes and the same three-token suffix (N=3), not measured sentence activations. Both cases use k=[1,1] and v=[2,−1], changing only h. Every input has RMS 1, so normalization leaves the values unchanged. The dot products are 2 in A and −2 in B. Dividing by √2 and applying sigmoid gives α_A≈0.8044 and α_B≈0.1956. Output vectors are computed with unrounded coefficients and then shown to four decimal places. This representative Engram equation uses one scalar gate for the entire value vector. Its granularity differs from the componentwise output gate in article 07; α is not a probability of factual accuracy or confidence.'],
  alt:['상황 A에서 h=[1,1], k=[1,1]을 정규화하고 내적/√2를 계산하면 √2이며 sigmoid는 약 0.8044다. v=[2,−1]을 곱해 [1.6089,−0.8044]가 된다. 상황 B의 h=[−1,−1]에서는 logit −√2, gate 0.1956, 결과 [0.3911,−0.1956]이다. 두 경우는 같은 Key와 Value를 쓰며 hidden만 다르다.','Case A normalizes h=[1,1] and k=[1,1], yielding a scaled dot product √2 and sigmoid about 0.8044. Multiplying v=[2,−1] gives [1.6089,−0.8044]. With h=[−1,−1], case B gives logit −√2, gate 0.1956 and result [0.3911,−0.1956]. Both cases keep the same key and value, changing only hidden state.'],
  sources:[{label:'Engram §2.3, Eqs. 3–4; independently calculated toy values',url:'https://arxiv.org/html/2601.07372v1#S2.SS3'}],
  panels(locale:Locale){
    return [0,1].map(i=>{
      const p=new Panel(locale,i===0?['A. h = [1, 1]','A. h = [1, 1]']:['B. h = [−1, −1]','B. h = [−1, −1]'],1420);
      p.token(10,90,i===0?'P … A B C':'Q … A B C',490,'blue',60);
      p.text(260,180,['다른 앞 문맥 · 같은 끝 3토큰 · N=3','Different prefix · Same last 3 tokens · N=3'],{size:23,anchor:'middle',width:490});
      p.arrow(120,225,120,295,C.blue);p.arrow(390,225,390,295,C.teal);
      p.raw('<g transform="translate(0 200)">');
      const h=i===0?'[1, 1]':'[−1, −1]';
      p.box(10,110,220,105,'h',h,'blue');p.box(280,110,220,105,'k','[1, 1]','teal');
      p.arrow(120,225,120,275,C.blue);p.arrow(390,225,390,275,C.teal);
      p.box(10,285,220,130,'RMSNorm(h)',h,'blue');p.box(280,285,220,130,'RMSNorm(k)','[1, 1]','teal');
      p.path('M120 425 V455 H180 V500',C.blue,2.5,false,true);p.path('M390 425 V455 H330 V500',C.teal,2.5,false,true);
      p.box(20,510,480,100,['내적 ÷ √2','Dot product ÷ √2'],i===0?'2 / √2 = √2':'−2 / √2 = −√2','orange');
      p.arrow(260,620,260,665,C.orange);
      p.box(20,675,480,110,'sigmoid',i===0?'α_A ≈ 0.8044':'α_B ≈ 0.1956','orange');
      p.arrow(130,795,130,980,C.orange);
      p.box(285,830,215,110,['같은 v','Same v'],'[2, −1]','teal');
      p.path('M392 950 V1010 H170',C.teal,2.5,false,true);
      p.circle(130,1010,30,C.orangeFill,C.orange);p.text(130,1019,'×',{size:29,color:C.orange,anchor:'middle',width:40});
      p.arrow(130,1050,130,1105,C.orange);
      p.box(20,1115,480,115,i===0?'α_A v':'α_B v',i===0?'[1.6089, −0.8044]':'[0.3911, −0.1956]','orange');
      p.raw('</g>');return p;
    });
  },
} satisfies FigureSpec;
