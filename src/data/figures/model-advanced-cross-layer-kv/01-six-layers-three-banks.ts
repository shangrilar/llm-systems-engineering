import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-cross-layer-kv',figureId:'01-six-layers-three-banks',number:'ma-16-01',
  eyebrow:['그림 1 · KV 생산층 줄이기','Figure 1 · Fewer KV producers'],
  title:['여섯 층의 Query가 세 KV 묶음을 나누어 읽습니다','Six layers keep their Queries and share three KV banks'],
  subtitle:['교육용 6층 · T = 4 · hkv = 1 · dh = 2 · 인접 두 층씩 공유','Six-layer example · T = 4 · hkv = 1 · dh = 2 · Share across adjacent pairs'],
  captionIn:'article',caption:['A는 각 층이 만든 KV를 따로 보관합니다. B는 L₁,L₃,L₅만 KV를 만들고, 다음 층이 각각 그 값을 재사용하도록 설계한 구조입니다. 모든 층은 자신의 Query와 attention 계산을 유지하며 파란 activation 경로를 따라 순서대로 실행됩니다. 작은 칸 하나는 한 성분입니다. 묶음 하나는 K[4×2]+V[4×2]=16성분이고, 같은 shape 조건에서 A는 96, B는 48성분입니다. 이 비율은 이 예시의 KV 저장량이며 전체 모델 메모리나 속도의 비율이 아닙니다. 임의의 기존 모델에서 캐시 절반을 삭제해도 된다는 뜻도 아닙니다. Norm, residual, FFN 등은 층 상자에 접었습니다.','A stores a separate KV bank produced by each layer. B is designed so that only L₁,L₃,L₅ produce KV and the following layer reuses those values. Every layer retains its own Query and attention computation; blue activations still flow sequentially. Each small cell is one component. A bank holds K[4×2]+V[4×2]=16 components, giving 96 versus 48 at equal shapes. This is a KV-storage ratio for the example, not total model memory or speed. It does not permit deleting half the caches of an arbitrary existing model. Norm, residual and FFN operations are folded into each layer box.'],
  alt:['A에서는 L1부터 L6까지 각 Query와 attention이 자기 KV-L1부터 KV-L6을 읽어 6묶음 96성분을 보관한다. B에서는 L1과 L2가 KV-L1, L3과 L4가 KV-L3, L5와 L6이 KV-L5를 읽어 3묶음 48성분을 보관한다. 두 구조 모두 6개의 Query와 순차 activation 경로를 유지한다.','A stores six banks, KV-L1 through KV-L6, with 96 components. B has L1/L2 read KV-L1, L3/L4 read KV-L3 and L5/L6 read KV-L5, totaling three banks and 48 components. Both retain six Queries and sequential activation flow.'],
  sources:[{label:'Cross-Layer Attention §2.2 and Figures 1–2',url:'https://arxiv.org/html/2405.12981v1#S2.SS2'}],
  panels(locale:Locale,mobile?:boolean){
    const w=520;
    return [false,true].map(shared=>{
      const p=new Panel(locale,shared?['B. 두 층마다 하나의 KV','B. One KV bank per pair']:['A. 층마다 별도의 KV','A. One KV bank per layer'],1490,w);
      const bank=(producer:number,y:number)=>{
        p.rect(330,y,180,138,C.tealFill,C.teal);
        p.text(420,y+28,`KV-L${producer}`,{size:24,weight:600,color:C.teal,anchor:'middle',width:170});
        p.text(377,y+56,'K',{size:22,weight:600,color:C.teal,anchor:'middle',width:60});
        p.text(447,y+56,'V',{size:22,weight:600,color:C.teal,anchor:'middle',width:60});
        for(let r=0;r<4;r++)for(let c=0;c<4;c++)p.rect(350+(c%2)*29+(c>=2?70:0),y+70+r*15,25,11,C.paper,C.teal,2);
      };
      for(let i=0;i<6;i++){
        const layer=i+1,y=140+160*i,producer=shared?2*Math.floor(i/2)+1:layer;
        p.box(30,y,220,106,`L${layer} · Q${layer}`,`Attn${layer} (KV-L${producer})`,'blue');
        if(i<5)p.arrow(140,y+116,140,y+150,C.blue);
        if(!shared){bank(layer,y-14);p.arrow(320,y+53,260,y+53,C.teal);}
        else if(i%2===0){
          bank(layer,y+55);
          p.line(320,y+124,288,y+124,C.teal,2.5);
          p.line(288,y+53,288,y+213,C.teal,2.5);
          p.arrow(288,y+53,260,y+53,C.teal);p.arrow(288,y+213,260,y+213,C.teal);
        }
      }
      p.arrow(140,1056,140,1100,C.blue);p.text(140,1140,'h₇',{size:27,weight:600,color:C.blue,anchor:'middle',width:180});
      p.text(370,1140,shared?'3 × 16 = 48':'6 × 16 = 96',{size:27,weight:600,color:C.teal,anchor:'middle',width:300});
      p.text(260,1215,'K[4×2] + V[4×2] = 16',{size:25,weight:600,anchor:'middle',width:500});
      p.box(20,1285,480,169,shared?['생산자는 L₁, L₃, L₅','Producers: L₁, L₃, L₅']:['생산자는 여섯 층 모두','All six layers produce KV'],shared?['각 층은 자기 Q로 공유 값을 읽습니다. 파란 경로는 activation입니다.','Each layer uses its own Q to read shared values. Blue paths carry activations.']:['Query와 attention은 여섯 개, KV도 여섯 묶음입니다.','Six Queries, six attention computations and six separate KV banks.'],'gray');
      return p;
    });
  },
} satisfies FigureSpec;
