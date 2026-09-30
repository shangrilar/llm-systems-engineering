import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-engram',figureId:'01-lookup-and-context',number:'ma-20-02',
  eyebrow:['그림 2 · 조회와 문맥','Figure 2 · Lookup and context'],
  title:['주소는 Token ID에서, 반영량은 Hidden에서 정합니다','Token IDs set the address; hidden state sets the gate'],
  subtitle:['Engram의 한 위치 t · A에서 두 입력 준비 → C에서 문맥 gate로 합류','One position t in Engram · A prepares two inputs → C joins them with a context gate'],
  captionIn:'article',caption:['Engram용 canonical ID는 정규화된 텍스트의 동일성에 따라 미리 정하는 조회용 ID입니다. 언어 모델의 원래 token ID와 embedding을 대체하지 않습니다. Suffix n-gram마다 여러 hash로 학습된 표의 행을 읽고 concat하여 e_t[d_mem]을 만듭니다. C는 A의 h_t와 e_t가 만나는 계산을 펼칩니다. W_K,W_V[d×d_mem]는 e_t를 k_t,v_t[d]로 변환하고, 정규화된 h_t와 k_t의 내적을 √d로 나눈 뒤 sigmoid를 적용해 scalar α_t를 만듭니다. α_t는 v_t의 모든 성분에 같은 계수로 곱해집니다. 고정 모델 추론에서 표는 읽기만 하며, convolution과 residual 복귀는 그림 4에서 이어집니다. B는 길이별로 head 2개씩만 그린 교육용 축소 예시입니다. 다중 residual branch 확장은 그림 4에서 다룹니다.','Canonical IDs are precomputed lookup IDs based on normalized textual equivalence. They do not replace the language model’s original token IDs or embeddings. Multiple hashes per suffix n-gram retrieve learned table rows, concatenated into e_t[d_mem]. C expands the computation joining h_t and e_t from A. W_K and W_V[d×d_mem] project e_t into k_t and v_t[d]. The dot product of normalized h_t and k_t is divided by √d and passed through sigmoid to produce scalar α_t. This same coefficient scales every component of v_t. Tables are read-only during frozen-model inference. Figure 4 continues with convolution and residual integration. B is a reduced illustration with two heads per N-gram order. Figure 4 covers the multi-branch extension.'],
  alt:['원래 token ID가 두 경로로 갈라진다. 기존 embedding과 앞선 backbone에서 h_t를 만들며, 별도 canonical ID 변환 뒤 suffix와 hash로 학습 표를 조회해 e_t를 만든다. 확대도에서 e_t를 W_K,W_V로 투영한다. h_t와 k_t는 RMSNorm 후 내적, √d 나눗셈, sigmoid로 scalar α_t를 만들고 α_t가 v_t를 곱해 gated value를 낸다.','Original token IDs split into two paths: standard embedding and preceding backbone produce h_t; separate canonicalization, suffix hashing and learned table lookup produce e_t. The enlargement projects e_t through W_K and W_V. RMS-normalized h_t and k_t feed a dot product divided by √d and sigmoid, producing scalar α_t, which multiplies v_t to form the gated value.'],
  sources:[{label:'Engram §2.2–2.4, Eqs. 1–4',url:'https://arxiv.org/html/2601.07372v1#S2.SS3'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. 같은 ID에서 두 경로로','A. Two paths from the same IDs'],1130);
    a.box(20,110,480,105,['원래 Token ID','Original token IDs'],'x_1, …, x_t','blue');
    a.line(260,225,260,260,C.blue,2.5);a.path('M260 260 H120 V305',C.blue,2.5,false,true);a.path('M260 260 H385 V305',C.teal,2.5,false,true);
    a.box(10,315,220,105,'Embedding','','blue');
    a.arrow(120,430,120,485,C.blue);a.box(10,495,220,150,['앞선 Backbone','Preceding backbone'],['현재 문맥 반영','Includes context'],'blue');
    a.arrow(120,655,120,930,C.blue);
    a.box(270,315,230,145,'Canonical IDs',['조회용 변환만','Lookup path only'],'teal');
    a.arrow(385,470,385,520,C.teal);a.box(270,530,230,140,'Suffix + Hash',['여러 주소 계산','Compute several addresses'],'teal');
    a.arrow(385,680,385,735,C.teal);a.box(270,745,230,140,['학습된 Table','Learned tables'],['행 조회 → concat','Read rows → concat'],'teal');
    a.arrow(385,895,385,930,C.teal);
    a.token(20,940,'h_t [d]',200,'blue',70);a.token(270,940,'e_t [d_mem]',230,'teal',70);
    const b=new Panel(locale,['C. 문맥으로 Value 조절','C. Context gates the value'],1330);
    b.token(205,110,'e_t [d_mem]',295,'teal',70);
    b.line(352,190,352,220,C.teal,2.5);b.path('M352 220 H260 V270',C.teal,2.5,false,true);b.path('M352 220 H440 V270',C.teal,2.5,false,true);
    b.box(185,280,150,100,'W_K',['비교용','Compare'],'teal');b.box(365,280,150,100,'W_V',['반영용','Apply'],'teal');
    b.arrow(260,390,260,435,C.teal);b.arrow(440,390,440,435,C.teal);
    b.token(10,445,'h_t [d]',145,'blue',65);b.token(185,445,'k_t [d]',150,'teal',65);b.token(365,445,'v_t [d]',150,'teal',65);
    b.arrow(82,520,82,570,C.blue);b.arrow(260,520,260,570,C.teal);
    b.box(10,580,145,95,'RMSNorm','','blue');b.box(185,580,150,95,'RMSNorm','','teal');
    b.path('M82 685 V735 H130 V780',C.blue,2.5,false,true);b.path('M260 685 V735 H240 V780',C.teal,2.5,false,true);
    b.box(20,790,315,95,['내적 ÷ √d','Dot product ÷ √d'],'','orange');
    b.arrow(177,895,177,935,C.orange);b.token(20,945,'sigmoid → α_t',315,'orange',65);
    b.arrow(177,1020,177,1090,C.orange);b.path('M440 520 V1120 H215',C.teal,2.5,false,true);
    b.circle(177,1120,30,C.orangeFill,C.orange);b.text(177,1129,'×',{size:29,color:C.orange,anchor:'middle',width:40});
    b.arrow(177,1160,177,1210,C.orange);b.token(20,1220,'ṽ_t [d] = α_t v_t',315,'orange',65);

    const c=new Panel(locale,['B. 길이 × head마다 별도 표','B. A table per order × head'],870);
    c.token(20,110,'… A B C',480,'blue',65);
    ['2-gram (B,C)','3-gram (A,B,C)'].forEach((label,i)=>{
      const y=235+i*290;c.token(20,y,label,480,'teal',55);
      for(let j=0;j<2;j++){
        const x=25+j*260;c.arrow(x+110,y+65,x+110,y+95,C.teal);
        c.box(x,y+105,220,105,`Table ${i+2},${j+1}`,`hash ${j+1} → v${i*2+j+1}`,'teal');
      }
    });
    c.token(20,790,'Concat [v1 | v2 | v3 | v4]',480,'orange',60);
    c.path('M25 455 H8 V775 H125 V780',C.teal,2,false,true);c.path('M505 455 H515 V775 H395 V780',C.teal,2,false,true);
    c.path('M135 735 V760 H255 V780',C.teal,2,false,true);c.path('M395 735 V760 H265 V780',C.teal,2,false,true);
    return [a,c,b];
  },
} satisfies FigureSpec;
