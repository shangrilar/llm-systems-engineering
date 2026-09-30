import {Panel,C,matrix,grid,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-vision-language',figureId:'01-projector-width',number:'ma-22-02',
  eyebrow:['그림 2 · 표현의 폭 연결','Figure 2 · Connecting widths'],
  title:['시각 표현을 언어 모델의 입력 폭으로 연결합니다','Project visual features to the language model’s input width'],
  subtitle:['교육용 묶인 폭=16, d_lm=8 · 행 하나 = 입력 위치 하나 · V = MLP(G)','Toy grouped width=16, d_lm=8 · One row per input position · V = MLP(G)'],
  captionIn:'article',caption:['앞 그림에서 묶은 G[4,16]의 각 행에 같은 MLP를 적용해 V[4,8]로 바꿉니다. 위 행렬의 한 칸은 네 성분 구간을 축약한 표시입니다. 개수는 네 개로 유지하고 성분 폭과 표현을 변환합니다. 텍스트는 ID 조회로 E[3,8]이 됩니다. 같은 폭이 의미 정렬을 자동으로 보장하지는 않으며 MLP는 학습됩니다.','Apply the same MLP to each grouped row of G[4,16] to obtain V[4,8]. Each upper matrix cell abbreviates four components. The count stays at four while the width and representation change. Text IDs retrieve E[3,8]. Equal widths do not guarantee semantic alignment; the MLP is learned.'],
  alt:['묶인 시각 벡터 네 개는 각각 16성분이며 MLP를 거쳐 각각 8성분이 된다. 텍스트 세 벡터도 각각 8성분이다.','Four grouped visual vectors each have 16 components. An MLP maps each to 8 components. Three text vectors also have 8 components.'],
  sources:[{label:'LLaVA §4.1–4.2, trainable projection and feature alignment',url:'https://arxiv.org/html/2304.08485v2#S4.SS1'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. 시각 표현: 네 행 유지','A. Visual features: keep four rows'],1430);
    a.text(280,120,'G [4×16]',{size:26,weight:600,anchor:'middle',width:400,color:C.teal});
    matrix(a,105,180,Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>`${c*4+1}–${c*4+4}`)),{cellWidth:86,cellHeight:55,gap:6,size:17,tone:'teal',rowLabels:['G1','G2','G3','G4']});
    a.text(280,450,['각 칸: 4성분 구간','Each cell: 4 components'],{anchor:'middle',width:450,size:18,color:C.muted});a.arrow(280,465,280,475,C.teal);a.box(20,485,480,140,'Projector MLP','V = MLP(G)','orange');a.arrow(280,635,280,745,C.orange);
    const b=new Panel(locale,['B. 텍스트: 세 ID로 조회','B. Text: retrieve with three IDs'],1430);
    b.text(260,120,['세 정수 Token ID','Three integer token IDs'],{size:25,weight:600,anchor:'middle',width:480,color:C.blue});
    for(let i=0;i<3;i++){b.token(35+i*160,180,`id${i+1}`,130,'blue',70);b.arrow(100+i*160,260,100+i*160,475,C.blue);}
    b.box(20,485,480,140,'Embedding table',['ID마다 한 행 조회','Retrieve one row per ID'],'blue');b.arrow(280,635,280,745,C.blue);
    for(const [p,n,tone] of [[a,4,'teal'],[b,3,'blue']] as const){
      p.text(280,800,n===4?'V [4×8]':'E [3×8]',{size:26,weight:600,anchor:'middle',width:400,color:C[tone]});
      p.path('M85 855 V845 H504 V855',C.muted,2);
      p.text(294,835,['폭 8','Width 8'],{size:22,anchor:'middle',width:200,color:C.muted});
      const g=grid(p,85,880,n,8,{cell:47,gap:6,tone:()=>tone});
      for(let r=0;r<n;r++)p.text(65,g.cellY(r)+31,n===4?`V_G${r+1}`:`E_${r+1}`,{size:23,weight:600,anchor:'end',width:70,color:C[tone]});
    }
    a.box(20,1195,480,170,['① 차원 일치','① Match dimensions'],['모든 visual 행도 8성분\n언어 모델이 받는 폭으로 변환','Every visual row also has 8 components\nMatch the input width expected by the LM'],'orange');
    b.box(20,1195,480,170,['② 의미 연결은 학습','② Learn the semantic connection'],['폭을 맞춘 뒤에도 이미지와 언어가 유용하게 연결되도록 학습해야 합니다.','Even with matching widths, learning is needed to make vision useful to language.'],'gray');
    return [a,b];
  },
} satisfies FigureSpec;
