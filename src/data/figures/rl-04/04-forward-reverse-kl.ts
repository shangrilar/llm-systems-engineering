import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'rl-04',figureId:'04-forward-reverse-kl',number:'4-3',
  captionIn:'article',
  eyebrow:['그림 3','Figure 3'],
  title:['누구의 확률로 차이를 가중하는가','Whose probabilities weight the difference?'],
  subtitle:['같은 문맥 P + v, 같은 두 분포. 평균을 내는 기준을 바꿉니다.','Same context P + v, same two distributions. Change the weighting.'],
  alt:['세 후보 a,b,c의 교사 확률은 49%,49%,2%, 학생 확률은 78%,2%,20%이다. Forward KL은 교사 확률로 가중하며 학생이 놓친 b를, reverse KL은 학생 확률로 가중하며 학생이 과하게 선택하는 c를 강조한다. 양쪽 모두 모든 후보를 합산한다. 식, 패널티 요약, mode-covering 또는 mode-seeking 성향 순서로 설명한다.','Teacher probabilities for a,b,c are 49%,49%,2%; student probabilities are 78%,2%,20%. Forward KL weights by the teacher and highlights the underrepresented b; reverse KL weights by the student and highlights the overrepresented c. Both sum over every candidate. Each panel presents the formula, penalty summary, then its mode-covering or mode-seeking tendency.'],
  caption:['교육용 분포이며 모든 후보를 합산합니다. Mode-covering/seeking은 학생의 표현 능력이 제한될 때 나타날 수 있는 성향입니다.','Illustrative distributions; both KLs sum over all candidates. Mode-covering/seeking are tendencies that can arise when the student’s representational capacity is limited.'],
  sources:[{label:'GKD §2–3',url:'https://arxiv.org/html/2306.13649v3'}],
  panels(locale:Locale){
    return [false,true].map(reverse=>{
      const p=new Panel(locale,reverse?'Reverse KL · KL(S ‖ T)':'Forward KL · KL(T ‖ S)',882);
      p.text(16,110,reverse?['학생 확률로 가중','Weight by student probabilities']:['교사 확률로 가중','Weight by teacher probabilities'],{size:24,weight:600,color:reverse?C.blue:C.purple,width:488});
      p.rect(16,137,16,12,C.purple,C.purple,2);p.text(42,151,['교사 T','Teacher T'],{size:19,width:185,color:C.purple});
      p.rect(255,137,16,12,C.blue,C.blue,2);p.text(281,151,['학생 S','Student S'],{size:19,width:220,color:C.blue});
      const teacher=[49,49,2],student=[78,2,20];
      const left=86,scale=3.9;
      [0,1,2].forEach(i=>{
        const y=205+i*108;
        if(i===(reverse?2:1))p.rect(8,y-23,504,100,C.grayFill,C.ink,10);
        p.text(31,y+29,['a','b','c'][i],{size:26,weight:600,width:44});
        p.rect(left,y,teacher[i]*scale,22,C.purple,C.purple,0);
        p.text(left+teacher[i]*scale+9,y+19,`${teacher[i]}%`,{size:20,width:70,color:C.purple});
        p.rect(left,y+34,student[i]*scale,22,C.blue,C.blue,0);
        p.text(left+student[i]*scale+9,y+53,`${student[i]}%`,{size:20,width:70,color:C.blue});
      });
      const y=511;p.line(left,y,left+390,y,C.muted,1);
      [0,50,100].forEach(v=>{const x=left+v*scale;p.line(x,y,x,y+7,C.muted,1);p.text(x,y+30,`${v}%`,{size:18,anchor:'middle',width:74});});
      p.text(16,597,reverse?'Σ pS × ln(pS / pT)':'Σ pT × ln(pT / pS)',{size:26,weight:600,color:reverse?C.blue:C.purple,width:488});
      p.text(16,652,reverse?['교사가 낮은 확률을 준 토큰에\n학생이 높은 확률을 주면 크게 패널티','Large penalty when the student assigns\nhigh probability to a token the teacher\nassigns low probability.']:['교사가 높은 확률을 준 토큰에\n학생이 낮은 확률을 주면 크게 패널티','Large penalty when the student assigns\nlow probability to a token the teacher\nassigns high probability.'],{size:21,width:488});
      p.text(16,773,reverse?'Mode-seeking':'Mode-covering',{size:25,weight:600,color:reverse?C.blue:C.purple,width:488});
      p.text(16,815,reverse?['교사가 선호하는 선택에 집중','Concentrate on teacher-preferred choices']:['교사의 여러 선택지를 넓게 포괄','Cover the teacher’s range of choices'],{size:21,width:488});
      return p;
    });
  },
} satisfies FigureSpec;
