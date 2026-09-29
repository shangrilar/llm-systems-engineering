import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'model-advanced-ced',figureId:'01-ed-and-ced-paths',number:'ced-01',
  eyebrow:['그림 1 · ED와 CED의 토큰 경로','Figure 1 · Token paths in ED and CED'],
  title:['새 생성 토큰이 Encoder도 통과할까요?','Does the next input token also pass through the encoder?'],
  subtitle:['T5형 ED와 DeepSeek CED · 파랑: 현재 계산 · 청록: 참조할 표현·KV','T5-style ED and DeepSeek CED · Blue: current computation · Teal: reusable representations/KV'],
  captionIn:'article',caption:['T5형 ED는 별도 입력열을 양방향 encoder로 처리한 뒤, 출력열을 decoder에서 이어 갑니다. CED는 하나로 이어지는 토큰열을 인과적으로 처리하며 생성한 토큰도 다음 입력이 되면 encoder와 decoder를 모두 통과합니다. 선택 직후의 토큰은 아직 다음 입력의 KV를 갖지 않습니다. 그림은 생성 단계의 경로이며 prefill의 생략 범위는 그림 6에서 비교합니다.','T5-style ED encodes a separate source bidirectionally and extends a target sequence in its decoder. CED processes one causal sequence: each generated token passes through both halves when used as the next input. A just-selected token has no KV of its own yet. These are decode paths; Figure 6 compares prefill work.'],
  alt:['ED는 x0 x1 x2의 고정 encoder 표현을 참조하며 y0가 decoder만 지나 y1을 선택한다. CED는 현재 x4가 causal encoder를 거쳐 e4와 global KV를 만든 뒤 decoder에서 x5를 선택한다.','ED reuses fixed encoder outputs for x0 x1 x2 while y0 passes only through the decoder to select y1. CED sends current x4 through its causal encoder, creates e4 and global KV, then selects x5 through the decoder.'],
  sources:[{label:'T5 §3.2',url:'https://jmlr.org/papers/volume21/20-074/20-074.pdf'},{label:'DeepSeek CED §2.2',url:'https://arxiv.org/html/2609.19969v1#S2.SS2'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. 전통 ED · 별도의 입력과 출력','A. Traditional ED · Source and target'],1110);
    for(let i=0;i<3;i++)a.token(30+165*i,115,`x${i}`,125,'teal',55);
    for(const x of [92,257,422])a.line(x,180,x,195,C.teal);
    a.line(92,195,422,195,C.teal);a.arrow(257,195,257,220,C.teal);
    a.box(90,230,340,110,['Encoder · 양방향','Encoder · Bidirectional'],['입력 x0, x1, x2 처리','Encode source x0, x1, x2'],'teal');
    a.arrow(260,350,260,395,C.teal);
    a.box(90,405,340,125,['고정된 표현 E → Cross KV','Fixed E → Cross KV'],['생성 중 Encoder 재실행 없음','No encoder rerun during generation'],'teal');
    a.path('M440 465 H490 V725 H440',C.teal,2.5,false,true);
    a.token(110,585,['y0 · 현재 입력','y0 · Current input'],300,'blue',60);
    a.arrow(260,655,260,685,C.blue);
    a.box(90,695,340,130,'Decoder',['Self + Cross Attention','Self + Cross Attention'],'blue');
    a.arrow(260,835,260,875,C.orange);
    a.token(110,885,['y1 · 다음 토큰 선택','y1 · Next token selected'],300,'orange',60);
    a.box(20,985,480,105,['출력열만 Decoder에서 확장','Only the target grows in decoder'],['입력 3개와 출력 길이는 독립적','Source: 3 tokens; target length can differ'],'gray');
    const b=new Panel(locale,['B. CED · 하나로 이어지는 토큰열','B. CED · One continuing sequence'],1110);
    for(let i=0;i<5;i++)b.token(10+102*i,115,`x${i}`,92,i===4?'blue':'gray',55);
    b.text(260,218,['x0…x3은 처리됨 · 현재 x4','x0…x3 cached · x4 is current'],{size:23,anchor:'middle',width:500});
    b.path('M464 180 V255 H205 V285',C.blue,2.5,false,true);
    b.box(35,295,340,135,'Causal encoder',['새 위치도 앞쪽 층을 통과','The new position traverses early layers'],'blue');
    b.arrow(205,440,205,480,C.blue);b.token(90,490,'e4',230,'blue',60);
    b.path('M330 520 H410 V565',C.teal,2.5,false,true);
    b.box(310,575,200,155,'Global KV',['e4에서 새 항목 준비','Prepare entries from e4'],'teal');
    b.arrow(205,560,205,750,C.blue);
    b.box(35,760,340,125,'Decoder',['Global + Local Attention','Global + Local Attention'],'blue');
    b.path('M410 740 V822 H385',C.teal,2.5,false,true);
    b.arrow(205,895,205,925,C.orange);b.token(55,935,['x5 · 다음 토큰 선택','x5 · Next token selected'],300,'orange',60);
    b.text(260,1060,['x5도 다음 반복에서 앞·뒤 층을 통과','x5 traverses both halves on the next step'],{size:23,anchor:'middle',width:500});
    return [a,b];
  },
} satisfies FigureSpec;
