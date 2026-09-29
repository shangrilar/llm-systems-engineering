import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-cross-layer-kv',figureId:'02-producer-then-consumer',number:'ma-16-02',layout:'wide',
  eyebrow:['그림 2 · 생산 후 두 층이 읽기','Figure 2 · Produce, then reuse'],
  title:['L₁이 현재 토큰의 KV를 만든 뒤 L₂도 읽습니다','L₁ creates the current token’s KV before L₂ reads it'],
  subtitle:['현재 위치 p4 · 생산자 L₁ · 소비자 L₁/L₂ · 같은 KV-L1','Current position p4 · Producer L₁ · Consumers L₁/L₂ · One KV-L1 bank'],
  captionIn:'article',caption:['L₁에 p4의 h₁이 들어오면 q₁,k4,v4을 만듭니다. k4,v4은 KV-L1의 p4 행에 추가되고 L₁의 q₁이 p0부터 p4까지를 읽습니다. 이후 h₂가 있어야 L₂의 q₂를 만들 수 있습니다. L₂는 새 KV를 쓰지 않고 같은 p0부터 p4까지 값을 읽습니다. 오른쪽 두 상자는 하나의 bank가 4행에서 5행으로 바뀌는 전후 snapshot입니다. 각 K/V 칸은 폭 dh=2인 벡터이며 숫자는 위치 ID입니다. p4를 읽는 것은 현재 위치 읽기이고 미래 p5는 없습니다. Attention 출력 o와 다음 층 입력 h 사이에는 출력 투영·잔차·FFN·정규화의 묶음을 표시했습니다. Q/K/V 앞의 정규화는 투영 상자에 포함합니다. 공유하는 것은 생성된 KV 값이며 서로 다른 층의 KV projection weight를 같게 묶는 것과 구별됩니다.','L₁ takes h₁ at p4 and produces q₁,k4,v4. Appending k4,v4 creates row p4 in KV-L1, then q₁ reads positions p0–p4. Only after h₂ exists can L₂ form q₂. L₂ writes no new KV and reads those same p0–p4 values. The two right-hand boxes are before/after snapshots of one bank growing from four to five rows. Each K/V cell is a dh=2 vector; numerals identify positions. Reading p4 is causal current-position access; no future p5 row exists. Grouped output projection, residual, FFN and normalization operations separate attention output o from the next hidden state h. Pre-projection normalization is folded into Q/K/V boxes. Reusing produced KV values differs from tying KV projection weights across layers.'],
  alt:['입력 p4의 h1에서 L1이 q1,k4,v4을 만든다. 이전 p0부터 p3까지의 네 행에 현재 p4 행을 추가해 KV-L1이 다섯 행이 된다. L1의 q1이 이를 읽고 h2를 만든 다음 L2가 h2에서 q2를 만들고 같은 bank를 읽어 h3를 만든다. 미래행은 없으며 L2가 쓰는 선도 없다.','L1 produces q1,k4,v4 from h1 at p4. Appending row p4 to the previous p0–p3 rows makes KV-L1 five rows long. L1 reads it with q1, yielding h2. L2 then forms q2 from h2, reads the same bank and yields h3. There is no future row and no L2 write.'],
  sources:[{label:'Cross-Layer Attention §2.2 and Figure 1',url:'https://arxiv.org/html/2405.12981v1#S2.SS2'}],
  panels(locale:Locale,mobile?:boolean){
    const p=new Panel(locale,['p4가 두 층을 지나는 순서','p4 passes through two layers'],mobile?2140:1880,mobile?520:1104);
    const bank=(y:number,rows:number)=>{
      p.rect(310,y,200,90+rows*50,C.tealFill,C.teal);
      p.text(410,y+30,`KV-L1 · T=${rows}`,{size:22,weight:600,color:C.teal,anchor:'middle',width:194});
      p.text(380,y+65,'K',{size:22,weight:600,color:C.teal,anchor:'middle',width:65});
      p.text(460,y+65,'V',{size:22,weight:600,color:C.teal,anchor:'middle',width:65});
      for(let r=0;r<rows;r++){
        const yy=y+86+r*50,tone=r===4?'orange':'teal';
        p.text(329,yy+28,`p${r}`,{size:21,anchor:'middle',width:36,color:C[tone]});
        p.token(350,yy,`k${r}`,60,tone,40);p.token(430,yy,`v${r}`,60,tone,40);
      }
    };
    bank(120,4);bank(560,5);
    p.token(60,140,'h₁ · p4',140,'blue',65);p.arrow(130,215,130,260,C.blue);
    p.box(10,270,230,110,['L₁ · Q/K/V 계산','L₁ · Q/K/V'],'q₁, k4, v4','blue');
    p.path('M250 325 H275 V490 H415 V550',C.orange,2.5,false,true);
    p.text(335,457,['① p4 쓰기','① Write p4'],{size:23,weight:600,color:C.orange,width:185});
    p.arrow(130,390,130,480,C.blue);p.token(80,490,'q₁',100,'blue',60);p.arrow(130,560,130,650,C.blue);
    p.box(10,660,230,110,['② L₁ · Attention','② L₁ · Attention'],'q₁ → o₁','blue');
    p.arrow(300,715,250,715,C.teal);
    p.arrow(130,780,130,805,C.blue);
    p.box(10,815,230,125,['출력 투영·잔차·FFN','OutProj · residual · FFN'],['정규화 포함','Includes norm'],'gray');
    p.arrow(130,950,130,980,C.blue);p.token(80,990,'h₂',100,'blue',60);p.arrow(130,1060,130,1130,C.blue);
    p.box(10,1140,230,110,['③ L₂ · Q 계산','③ L₂ · Q'],'q₂ = W_Q² h₂','blue');
    p.arrow(130,1260,130,1360,C.blue);p.text(150,1315,'q₂',{size:25,weight:600,color:C.blue,width:100});
    p.box(10,1370,230,110,['④ L₂ · Attention','④ L₂ · Attention'],'q₂ → o₂','blue');
    p.path('M410 910 V1000 H280 V1425 H250',C.teal,2.5,false,true);
    p.arrow(130,1490,130,1515,C.blue);
    p.box(10,1525,230,125,['출력 투영·잔차·FFN','OutProj · residual · FFN'],['정규화 포함','Includes norm'],'gray');
    p.arrow(130,1660,130,1740,C.blue);p.token(80,1750,'h₃',100,'blue',60);
    p.box(mobile?20:600,mobile?1895:650,480,211,['같은 KV · 서로 다른 Query','Same KV · Different Queries'],['L₂의 Query는 h₂가 나온 뒤 만듭니다. p4는 현재 위치이고 p5는 아직 없습니다.','L₂ forms its Query only after h₂ exists. p4 is current; p5 does not exist yet.'],'gray');
    return [p];
  },
} satisfies FigureSpec;
