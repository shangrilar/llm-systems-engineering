import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-engram',figureId:'02-context-gate-numbers',number:'ma-20-03',
  eyebrow:['그림 3 · Gate 계산 예시','Figure 3 · A numeric gate'],
  title:['같은 기억, 다른 반영량','Same memory, different amounts'],
  subtitle:['교육용 d=2 · 같은 e에서 같은 k, v · RMSNorm: γ=1, ε 생략','Toy d=2 · Same e gives the same k and v · RMSNorm: γ=1, ε omitted'],
  captionIn:'article',caption:['서로 다른 prefix와 같은 끝 3토큰(N=3)을 가정한 교육용 hidden 값이며 실제 문장 측정값이 아닙니다. 두 경우 모두 k=[1,1], v=[2,−1]로 고정하고 h만 바꿉니다. h와 k의 RMS는 1이므로 정규화 후 값은 그대로입니다. P의 내적은 2, Q의 내적은 −2이며 √2로 나누고 sigmoid를 취하면 α_P≈0.8044, α_Q≈0.1956입니다. 결과 벡터는 반올림 전 계수로 계산한 뒤 소수 넷째 자리까지 표시했습니다. Engram의 이 대표식은 scalar gate 하나로 Value 전체를 조절합니다. 07편의 성분별 output gate와 단위를 구별해야 하며 α는 사실의 정확도나 신뢰도 확률이 아닙니다.','Hidden values are illustrative, assuming different prefixes and the same three-token suffix (N=3), not measured sentence activations. Both cases use k=[1,1] and v=[2,−1], changing only h. Both h and k have RMS 1, so normalization leaves the values unchanged. The dot products are 2 in P and −2 in Q. Dividing by √2 and applying sigmoid gives α_P≈0.8044 and α_Q≈0.1956. Output vectors are computed with unrounded coefficients and then shown to four decimal places. This representative Engram equation uses one scalar gate for the entire value vector. Its granularity differs from the componentwise output gate in article 07; α is not a probability of factual accuracy or confidence.'],
  alt:['문맥 P에서 h=[1,1], k=[1,1]을 정규화하고 내적/√2를 계산하면 √2이며 sigmoid는 약 0.8044다. v=[2,−1]을 곱해 [1.6089,−0.8044]가 된다. 문맥 Q의 h=[−1,−1]에서는 logit −√2, gate 0.1956, 결과 [0.3911,−0.1956]이다. 두 경우는 같은 Key와 Value를 쓰며 hidden만 다르다.','Context P normalizes h=[1,1] and k=[1,1], yielding a scaled dot product √2 and sigmoid about 0.8044. Multiplying v=[2,−1] gives [1.6089,−0.8044]. With h=[−1,−1], context Q gives logit −√2, gate 0.1956 and result [0.3911,−0.1956]. Both cases keep the same key and value, changing only hidden state.'],
  sources:[{label:'Engram §2.3, Eqs. 3–4; independently calculated toy values',url:'https://arxiv.org/html/2601.07372v1#S2.SS3'}],
  layout:'wide',
  panels(locale:Locale,mobile?:boolean){
    const width=mobile?520:1000;
    const p=new Panel(locale,null,720,width);
    const centers=mobile?[245,425]:[475,825];
    const size=mobile?21:27, barWidth=mobile?135:230;
    p.box(10,20,width-20,125,['공통: 끝 토큰 A B C · N=3','Shared: suffix A B C · N=3'],'k = [1, 1] · v = [2, −1]','teal');
    p.text(10,205,['비교 항목','Compare'],{size,width:mobile?140:270,weight:600});
    centers.forEach((x,i)=>p.text(x,205,i===0?['문맥 P','Context P']:['문맥 Q','Context Q'],{size,anchor:'middle',width:mobile?175:300,weight:600,color:C.blue}));
    p.line(10,230,width-10,230,C.line);
    const rows=[
      {y:285,label:['문맥 h','Context h'] as const,values:['[1, 1]','[−1, −1]']},
      {y:385,label:['정규화 내적 ÷ √2','Normalized dot ÷ √2'] as const,values:['+√2','−√2']},
    ];
    for(const row of rows){
      p.text(10,row.y,row.label,{size,width:mobile?140:285});
      centers.forEach((x,i)=>p.text(x,row.y,row.values[i],{size,anchor:'middle',width:mobile?170:300}));
      p.line(10,row.y+55,width-10,row.y+55,C.line,1);
    }
    p.text(10,490,['반영 계수 α','Gate α'],{size,width:mobile?140:285,weight:600,color:C.orange});
    centers.forEach((x,i)=>{
      const alpha=1/(1+Math.exp(i===0?-Math.sqrt(2):Math.sqrt(2)));
      p.text(x,490,alpha.toFixed(4),{size:size+3,weight:700,anchor:'middle',width:mobile?170:300,color:C.orange});
      p.rect(x-barWidth/2,525,barWidth,20,C.grayFill,C.line,3);
      p.rect(x-barWidth/2,525,barWidth*alpha,20,C.orange,C.orange,3);
      p.text(x-barWidth/2,575,'0',{size:18,width:30});p.text(x+barWidth/2,575,'1',{size:18,anchor:'end',width:30});
    });
    p.line(10,605,width-10,605,C.line);
    p.text(10,660,['출력 αv','Output αv'],{size,width:mobile?140:285,weight:600});
    centers.forEach((x,i)=>p.text(x,660,i===0?'[1.6089, −0.8044]':'[0.3911, −0.1956]',{size:mobile?18:26,anchor:'middle',width:mobile?185:320,weight:600,color:C.orange}));
    return [p];
  },
} satisfies FigureSpec;
