import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-yoco',figureId:'01-producers-and-readers',number:'yoco-01',layout:'wide',
  eyebrow:['그림 1 · 깊이에 따른 역할','Figure 1 · Roles across depth'],
  title:['앞부분이 만든 공통 KV를 뒷부분 전체가 읽습니다','The later layers read one global KV bank'],
  subtitle:['같은 causal token 열 p0부터 p3까지 · 교육용 2 + 2층 · 파란 선: hidden 전달','One causal token sequence p0–p3 · Illustrative 2 + 2 layers · Blue: hidden flow'],
  captionIn:'article',caption:['앞부분의 최종 표현 M을 K와 V로 투영해 하나의 global KV를 만듭니다. 뒤쪽 각 층은 자신의 Q로 같은 KV를 읽으며, hidden 표현은 파란 경로를 따라 계속 바뀝니다. 앞쪽 층의 recurrent/local 상태는 별도로 남습니다. Norm·residual·FFN은 층 상자에 포함한 교육용 축소 구조입니다.','The final early representation M is projected into one global KV bank. Each later layer reads it with its own Q while hidden states continue along the blue path. Early recurrent/local state remains separate. This reduced example folds norm, residual and FFN into layer boxes.'],
  alt:['같은 토큰열이 self-decoder 두 층을 거쳐 M을 만든다. M은 공통 K와 V 생성 및 cross-decoder 입력에 사용된다. 두 self-decoder는 별도의 recurrent/local 상태를 읽고 갱신한다. 두 cross-decoder는 각각 자신의 Q로 같은 global KV를 읽는다.','One token sequence passes through two self-decoder layers to M. M supplies global K/V and the cross-decoder input. Each self-decoder reads and updates its own recurrent/local state. Two cross-decoder layers read the same KV bank with their own Queries.'],
  sources:[{label:'YOCO §2, self-decoder and cross-decoder',url:'https://arxiv.org/html/2405.05254v1#S2'}],
  panels(locale:Locale,mobile?:boolean){
    return [0].map(kind=>{
      const p=new Panel(locale,kind===0?'YOCO':['B. CED · 재사용 그룹 하나','B. CED · One reuse group'],mobile?1900:1440,mobile?520:1104);
      for(let i=0;i<4;i++)p.token(20+i*126,120,`p${i}`,100,'blue',58);
      p.text(260,223,['하나의 생성열 · 인과적 처리','One generation sequence · Causal'],{size:24,weight:600,color:C.blue,anchor:'middle',width:510});
      p.arrow(135,240,135,285,C.blue);
      p.text(410,270,['층별 상태','Local state'],{size:23,weight:600,color:C.teal,anchor:'middle',width:200});
      for(let l=0;l<2;l++){
        const y=295+l*190;
        p.box(10,y,250,125,kind===0?`Self-decoder ${l+1}`:`Causal encoder ${l+1}`,kind===0?['효율적 Self-attention','Efficient self-attention']:['앞 층의 표현 갱신','Update representations'],'blue');
        p.box(310,y,200,125,`State ${l+1}`,['recurrent / local','recurrent / local'],'teal');
        p.arrow(300,y+40,270,y+40,C.teal);
        p.arrow(270,y+95,300,y+95,C.orange);
        p.arrow(135,y+135,135,y+180,C.blue);
      }
      p.token(45,675,kind===0?'M':'E',180,'blue',65);
      p.text(135,790,['앞부분의 최종 표현','Early output'],{size:23,anchor:'middle',width:260,color:C.blue});
      p.arrow(235,707,300,707,C.teal);
      p.box(310,650,200,130,kind===0?'KV projection':['Global KV 생성','Global KV build'],kind===0?'M → K, V':['E에서 생성','From E'],'teal');
      p.arrow(410,790,410,875,C.teal);
      p.rect(310,885,200,245,C.tealFill,C.teal);
      p.text(410,925,'Global KV',{size:24,weight:600,color:C.teal,anchor:'middle',width:182});
      p.text(410,976,kind===0?['공유 bank','Shared bank']:['한 공유 그룹','Shared group'],{size:23,color:C.teal,anchor:'middle',width:174});
      for(let j=0;j<4;j++)p.rect(335,1012+j*28,150,16,C.paper,C.teal,4);
      p.arrow(135,819,135,895,C.blue);
      p.box(10,905,250,135,kind===0?'Cross-decoder 3':'Decoder 3',['층 hidden → q₃ → 읽기','Layer hidden → q₃ → read'],'blue');
      p.arrow(300,972,270,972,C.teal);
      p.arrow(135,1050,135,1165,C.blue);
      p.box(10,1175,250,135,kind===0?'Cross-decoder 4':'Decoder 4',['층 hidden → q₄ → 읽기','Layer hidden → q₄ → read'],'blue');
      p.path('M410 1140 V1242 H270',C.teal,2.5,false,true);
      p.arrow(135,1320,135,1360,C.blue);p.text(135,1400,['출력 표현','Output representation'],{size:24,weight:600,color:C.blue,anchor:'middle',width:260});
      p.box(mobile?20:600,mobile?1510:560,480,250,kind===0?['하나의 global KV를 재사용','Reuse one global KV bank']:['그림은 global KV 경로만 표시','Only the global KV path is shown'],kind===0?['층별 상태: 고정 크기¹\nGlobal KV: 문맥 길이 T에 따라 증가\n청록: 읽기 · 주황: 갱신','Layer-local state: fixed size¹\nGlobal KV: grows with context T\nTeal: read · Orange: update']:['Encoder global KV와 각 층의 local KV도 남습니다. 세부 상태는 그림 3에서 구별합니다.','Encoder global KV and layer-local KV also remain. Figure 3 separates these states.'],'gray');
      p.text(mobile?30:610,mobile?1830:875,['¹ 모델 크기와 local window 고정','¹ At fixed model size and local window'],{size:21,color:C.muted,width:460});
      return p;
    });
  },
} satisfies FigureSpec;
