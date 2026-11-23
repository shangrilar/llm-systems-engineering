import {Panel,C,grid,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-vision-language',figureId:'02-mixed-input-sequence',number:'ma-22-03',layout:'wide',
  eyebrow:['그림 3 · 하나의 입력열','Figure 3 · One input sequence'],
  title:['시각 벡터와 질문이 함께 입력 위치를 차지합니다','Visual vectors and the question occupy one input sequence'],
  subtitle:['삽입형 구조의 예시 · Visual 4행 + Text 3행 = H_input[7×8]','An embedding-insertion example · 4 visual rows + 3 text rows = H_input[7×8]'],
  captionIn:'article',caption:['앞 그림에서 만든 V의 네 행을 먼저, 질문 embedding E의 세 행을 뒤에 이어 H_input[7×8]을 만듭니다. 녹청색 행은 vision encoder와 projector에서 나온 연속 벡터이며, 파란색 행은 정수 text ID로 embedding table을 조회한 결과입니다. Visual 행을 LM head나 argmax로 어휘 ID로 바꾸는 과정은 없습니다. Pos 0~6은 이 합쳐진 입력열에서 사용하는 단순한 위치 ID 예시이며 vision encoder의 공간 위치 표현과는 별개입니다. 실제 special marker, 역할 구분, 복수 이미지와 위치 규칙은 모델마다 달라 이 일곱 행 예시에서는 생략했습니다. 빈 색 칸은 성분 자리이지 값 0이 아닙니다.','The four rows of V from the previous figure precede the three question-embedding rows E, forming H_input[7×8]. Teal rows are continuous vectors from the vision encoder and projector; blue rows come from embedding-table lookup with integer text IDs. No LM head or argmax converts visual rows into vocabulary IDs. Pos 0–6 illustrate simple position IDs for the combined sequence, distinct from spatial position encoding in the vision encoder. Actual special markers, roles, multiple images and position rules depend on the model and are omitted from this seven-row example. Empty colored cells indicate component positions, not zero values.'],
  alt:['Projector에서 나온 V[4×8]와 ID lookup에서 나온 E[3×8]가 합쳐진다. 입력 행 순서는 V_G1,V_G2,V_G3,V_G4,E_1,E_2,E_3이고 위치 ID는 0~6이다. 앞 네 행은 녹청색, 뒤 세 행은 파란색이며 모두 여덟 성분을 가진다. 전체 입력열이 language backbone으로 들어간다.','Projector output V[4×8] joins E[3×8] from ID lookup. Input rows are V_G1,V_G2,V_G3,V_G4,E_1,E_2,E_3 at position IDs 0–6. The first four rows are teal and the last three blue, all with eight components. The full sequence enters the language backbone.'],
  sources:[{label:'LLaVA §4.1–4.2, visual embeddings and multimodal input sequences',url:'https://arxiv.org/html/2304.08485v2#S4.SS2'}],
  panels(locale:Locale,mobile?:boolean){
    const w=mobile?520:1104,p=new Panel(locale,['A. 서로 다른 출처 · 같은 입력 폭','A. Different sources · Same input width'],mobile?1180:1240,w);
    const vx=mobile?10:20,ex=mobile?280:650,bw=mobile?230:420;
    p.box(vx,110,bw,165,'Visual V [4×8]',['Projector의 연속 벡터','Continuous vectors from projector'],'teal');
    p.box(ex,110,bw,165,'Text E [3×8]',['질문 ID → lookup','Question IDs → lookup'],'blue');
    const gx=mobile?165:320,gy=440,cell=mobile?34:47,gap=mobile?5:6,step=cell+gap;
    const g=grid(p,gx,gy,7,8,{cell,gap,tone:r=>r<4?'teal':'blue'});
    g.outline(0,0,3,7,'teal',3);g.outline(4,0,6,7,'blue',3);
    const center=gx+g.width/2;
    p.path(`M${vx+bw/2} 285 V350 H${center} V430`,C.teal,2.5,false,true);
    const ey=gy+4*step+(3*step-gap)/2;
    p.path(`M${ex+bw/2} 285 V320 H${mobile?500:900} V${ey} H${gx+g.width+10}`,C.blue,2.5,false,true);
    p.text(mobile?35:195,390,'Pos',{size:23,weight:600,anchor:'middle',width:70,color:C.muted});
    const rows=['V_G1','V_G2','V_G3','V_G4','E_1','E_2','E_3'];
    rows.forEach((label,r)=>{
      p.text(mobile?35:195,g.cellY(r)+cell/2+8,String(r),{size:23,anchor:'middle',width:70,color:C.muted});
      p.text(gx-20,g.cellY(r)+cell/2+8,label,{size:24,weight:600,anchor:'end',width:90,color:r<4?C.teal:C.blue});
    });
    const bottom=gy+g.height;
    p.arrow(center,bottom+15,center,bottom+85,C.blue);
    p.box(mobile?60:260,bottom+95,mobile?430:570,125,'Language backbone','H_input [7×8]','blue');
    p.text(w/2,bottom+300,['Pos는 합쳐진 입력열의 위치 ID 예시입니다.','Pos illustrates IDs in the combined sequence.'],{size:24,weight:600,anchor:'middle',width:w-40});
    return [p];
  },
} satisfies FigureSpec;
