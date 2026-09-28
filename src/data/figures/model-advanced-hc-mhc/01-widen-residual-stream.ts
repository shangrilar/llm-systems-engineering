import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-hc-mhc',figureId:'01-widen-residual-stream',number:'ma-13-01',
  eyebrow:['그림 2 · 한 단계의 연결','Figure 2 · One layer step'],
  title:['한 토큰의 Residual 경로를 여러 stream으로 넓힙니다','Widen one token’s residual path into multiple streams'],
  subtitle:['깊이 방향의 한 단계 · 같은 토큰 t · 파랑: 읽기 · 청록: 우회 혼합 · 주황: 쓰기','One step through depth · Same token t · Blue: read · Teal: residual mix · Orange: write'],
  captionIn:'article',caption:['A는 x에 F(x)를 더하는 일반 residual입니다. B의 두 stream x₁,x₂는 같은 토큰 t의 서로 다른 표현이며 shape는 2×d입니다. 읽기는 두 stream을 d차원 입력으로 모으고, 하나의 F가 만든 d차원 출력을 쓰기 계수로 두 stream에 나눠 더합니다. 별도의 residual 혼합은 우회 경로에서 두 stream을 섞습니다. F의 입출력 폭 d는 그대로이며 내부 normalization과 attention 또는 FFN 연산은 접었습니다. 여러 head, expert 또는 서로 다른 토큰으로 나눈 그림이 아닙니다.','A is the ordinary residual x+F(x). In B, x₁ and x₂ are distinct representations of the same token t, with total shape 2×d. Read combines them into one d-dimensional input. One F produces a d-dimensional output, which write distributes back to both streams. A separate residual mapping mixes streams on the bypass path. F keeps input and output width d; normalization and attention or FFN internals are folded into F. These streams are not heads, experts or different tokens.'],
  alt:['A에는 토큰 t의 d차원 x가 하나의 F와 우회 경로로 나뉘어 더해진다. B에는 같은 토큰 t의 x1,x2 두 stream이 있다. 파란 읽기가 두 stream을 하나의 d차원 F 입력으로 모으고, 주황 쓰기가 F 출력을 2×d로 분배한다. 청록 residual 혼합의 결과와 stream별로 더해 두 출력 stream을 얻는다.','A splits one d-dimensional x for token t between F and a bypass, then adds them. B has two streams x1,x2 for the same token t. Blue read combines them into one d-dimensional F input, orange write distributes its output to 2×d, and a separate teal residual mapping mixes the bypass. The two contributions are added per stream.'],
  sources:[{label:'mHC §1 and §3, residual and HC equations',url:'https://arxiv.org/html/2512.24880v1#S3'}],
  panels(locale:Locale,mobile?:boolean){
    const w=520,a=new Panel(locale,['A. 한 stream','A. One stream'],930,w);
    a.token(300,112,'t · x [d]',180,'teal',66);
    a.line(390,188,390,228,C.teal,4);
    a.circle(390,228,5,C.teal,C.teal);
    a.path('M390 228 H130 V380',C.blue,2.5,false,true);
    a.arrow(390,228,390,588,C.teal);
    a.box(20,390,220,115,'F',['입력 d → 출력 d','Input d → output d'],'blue');
    a.path('M130 515 V620 H356',C.orange,2.5,false,true);
    a.circle(390,620,24,C.paper,C.teal);a.text(390,628,'+',{size:32,anchor:'middle',width:45});
    a.arrow(390,655,390,721,C.teal);
    a.token(270,731,'t · x + F(x) [d]',240,'teal',68);
    a.text(20,855,['F를 거치지 않는 x가 그대로 더해집니다.','The bypass adds x unchanged.'],{size:25,weight:600,width:480});

    const b=new Panel(locale,['B. 두 stream · F는 하나','B. Two streams · One F'],1140,w);
    b.rect(270,104,240,136,C.grayFill,C.line,12);
    b.text(390,134,'X [2×d]',{size:24,weight:600,anchor:'middle',width:225});
    b.token(282,161,'t · x₁',104,'teal',62);b.token(397,161,'t · x₂',104,'teal',62);
    b.path('M260 176 H130 V280',C.blue,2.5,false,true);
    b.box(20,290,220,111,['읽기 · H_pre','Read · H_pre'],'2×d → d','blue');
    b.arrow(130,411,130,446,C.blue);
    b.box(20,456,220,108,['F · 변환 하나','F · Transform'],'d → d','blue');
    b.arrow(130,574,130,609,C.orange);
    b.box(20,619,220,111,['쓰기 · H_post','Write · H_post'],'d → 2×d','orange');
    b.arrow(334,250,334,380,C.teal);b.arrow(449,250,449,380,C.teal);
    b.box(270,390,240,140,['혼합 · H_res','Mix · H_res'],'2×d → 2×d','teal');
    b.arrow(334,540,334,755,C.teal);b.arrow(449,540,449,755,C.teal);
    b.path('M130 740 V815 H260',C.orange,2.5,false,true);
    b.box(270,765,240,107,['+ · stream별 덧셈','+ · Add per stream'],'[2×d] + [2×d]','teal');
    b.arrow(334,882,334,918,C.teal);b.arrow(449,882,449,918,C.teal);
    b.token(282,928,'t · x₁′',104,'teal',62);b.token(397,928,'t · x₂′',104,'teal',62);
    b.text(260,1052,['보관 2×d · F 입출력 d','Carry 2×d · F input/output d'],{size:24,weight:600,anchor:'middle',width:480}); b.text(260,1097,['F: Attention 또는 MLP (정규화 생략)','F: Attention or MLP (norm omitted)'],{size:22,anchor:'middle',width:490});
    return [a,b];
  },
} satisfies FigureSpec;
