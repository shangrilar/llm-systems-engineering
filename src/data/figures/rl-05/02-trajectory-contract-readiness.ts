import {Panel,C,type FigureSpec,type Label} from '@llm-systems/viz';
export default {
  articleId:'rl-05',figureId:'02-trajectory-contract-readiness',number:'5-2',
  eyebrow:['그림 2','Figure 2'],layout:'wide',captionIn:'article',
  title:['추론에서 버퍼로, 경험에 담아 보내는 정보','From inference to the buffer: what travels with experience'],
  subtitle:['그림 1의 trajectory 전달 경로를 펼쳐 봅니다.','A closer look at the trajectory path in Figure 1.'],
  alt:['추론 엔진에서 data buffer로 trajectory를 전달한다. 경험 기록에는 입력과 생성 토큰, 생성 로그확률, 손실 마스크, 보상, 정책 버전, 작업과 그룹 ID가 연결된다. 추론뿐 아니라 환경 기록, 평가와 실행 관리에서 정보를 모은다.','A trajectory travels from the inference engine to the data buffer. The record links input and generated tokens, generation log probabilities, loss masks, rewards, policy versions, and task/group IDs, assembled from inference, environment records, evaluation, and execution management.'],
  caption:['정보를 모으는 위치와 버퍼에 넣는 시점은 구현에 따라 다릅니다.','Where information is assembled and when it enters the buffer depend on the implementation.'],
  sources:[{label:'Miles v0.1.0 architecture',url:'https://github.com/radixark/miles/blob/v0.1.0/docs/developer/architecture.md'}],
  panels(locale,mobile=false){
    const w=mobile?520:1120,p=new Panel(locale,null,mobile?1370:740,w);
    const bw=mobile?192:300;
    p.box(8,12,bw,116,['추론 엔진','Inference engine'],['SGLang 등','e.g. SGLang'],'orange');
    p.box(w-bw-8,12,bw,116,['경험 버퍼','Data buffer'],'','purple');
    p.arrow(bw+20,70,w-bw-20,70,C.purple);
    p.text(w/2,mobile?164:45,['trajectory','trajectory'],{size:22,width:230,anchor:'middle',color:C.purple,weight:600});
    const y=mobile?220:205;
    p.path(`M${w/2} ${mobile?178:84} V${y-16}`,C.purple,2,true,false);
    p.rect(8,y,w-16,mobile?1120:518,C.paper,C.purple,14);
    p.text(30,y+40,['경험 기록에 연결되는 정보','Information linked to the experience'],{size:25,width:w-60,color:C.purple,weight:600});
    const rows:{name:Label;detail:Label;tone:'orange'|'blue'|'teal'|'gray'}[]=[
      {name:['입력·생성 토큰 ID','Input / generated token IDs'],detail:['추론·환경 기록 → 실제 문맥과 행동','Inference / environment → context and actions'],tone:'orange'},
      {name:['생성 로그확률','Generation log probabilities'],detail:['추론 엔진 → 생성 당시의 선택 확률','Inference → probabilities at generation time'],tone:'orange'},
      {name:['손실 마스크','Loss mask'],detail:['대화·환경 기록 → 학습할 토큰 위치','Conversation / environment → tokens to train on'],tone:'blue'},
      {name:['보상','Reward'],detail:['평가·검증 → 과제 수행 점수','Evaluation / verification → task score'],tone:'teal'},
      {name:['정책 버전','Policy version'],detail:['실행 관리·추론 → 경험을 만든 가중치','Manager / inference → weights used to generate'],tone:'gray'},
      {name:['작업 / 그룹 ID','Task / group ID'],detail:['실행 관리 → 과제와 비교 그룹','Execution manager → task and comparison group'],tone:'gray'},
    ];
    rows.forEach((r,i)=>{
      const cw=mobile?w-60:(w-84)/2,x=30+(mobile?0:i%2*(cw+24)),yy=y+82+(mobile?i:Math.floor(i/2))*(mobile?166:140);
      p.box(x,yy,cw,mobile?146:124,r.name,r.detail,r.tone);
    });
    return [p];
  },
} satisfies FigureSpec;
