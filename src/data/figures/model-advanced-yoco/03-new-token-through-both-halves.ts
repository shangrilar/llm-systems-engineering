import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-yoco',figureId:'03-new-token-through-both-halves',number:'yoco-03',layout:'wide',
  eyebrow:['그림 3 · 새 토큰 한 개','Figure 3 · One new token'],
  title:['새 토큰도 앞부분을 거쳐 기억에 추가됩니다','A new token still passes through the memory-producing layers'],
  subtitle:['YOCO의 recurrent self-decoder 예시 · 현재 p4 · 이전 위치 p0부터 p3까지','Illustrative YOCO with recurrent self-decoder · Current p4 · Prior positions p0–p3'],
  captionIn:'article',caption:['현재 입력 x₄는 self-decoder 1, 2를 순서대로 지나며 각 층의 recurrent state를 갱신합니다. 최종 표현 m₄에서 현재 위치의 K/V를 만들고 global bank에 추가한 다음, cross-decoder 3, 4가 자신의 Query로 p0부터 p4까지를 읽습니다. 그림의 S₁,S₂는 각각 별개의 2×2 예시 상태이고 global K/V 칸 하나는 벡터입니다. 선택한 x₅는 다음 step의 입력이며 아직 KV가 없습니다.','Input x₄ traverses self-decoder layers 1 and 2, updating each recurrent state. Final output m₄ produces the current K/V pair, appended to the global bank. Cross-decoder layers 3 and 4 then use their own Queries to read p0–p4. S₁ and S₂ are distinct illustrative 2×2 states; each global K/V cell is a vector. Selected x₅ is the next step’s input and has no KV yet.'],
  alt:['x4가 self-decoder1과2를 통과하며 각기 S1과S2를 읽고 갱신한다. 출력 m4에서 k4,v4를 만들어 이전 네 행이 남아 있는 global bank에 주황 p4 행을 추가한다. Cross-decoder3과4가 각각 q3,q4로 같은 다섯 행을 읽고 LM head가 x5를 선택한다.','x4 passes through self-decoder 1 and 2, reading and updating distinct S1 and S2. Output m4 produces k4,v4, appended as orange p4 while the four older rows remain. Cross-decoder 3 and 4 read those five rows with q3 and q4; the LM head selects x5.'],
  sources:[{label:'YOCO §2 and §3.1, recurrent state and global KV',url:'https://arxiv.org/html/2405.05254v1#S2'},{label:'DeepSeek-V4.1-Flash report §2.2–2.3',url:'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/main/DeepSeek_V41_Tech_Report.pdf'}],
  panels(locale:Locale,mobile?:boolean){
    const p=new Panel(locale,['p4: 계산 → 기록 → 읽기','p4: Compute → append → read'],mobile?2240:1960,mobile?520:1104);
    p.token(60,125,'x₄ · p4',170,'blue',68);p.arrow(145,203,145,265,C.blue);
    for(let i=0;i<2;i++){
      const y=275+i*240;
      p.box(10,y,250,146,`Self-decoder ${i+1}`,['현재 p4 처리','Process current p4'],'blue');
      p.arrow(145,y+156,145,y+225,C.blue);
      p.rect(335,y,175,170,C.grayFill,C.gray);
      p.text(422,y+31,`S${i===0?'₁':'₂'}`,{size:26,weight:600,color:C.gray,anchor:'middle',width:145});
      matrix(p,375,y+69,[[null,null],[null,null]],{cellWidth:43,cellHeight:36,gap:8,tone:'gray'});
      p.arrow(325,y+40,270,y+40,C.teal);p.arrow(270,y+115,325,y+115,C.orange);
    }
    p.token(50,755,'m₄',190,'blue',70);p.arrow(250,790,300,790,C.orange);
    p.box(310,720,200,140,'KV projection','k4, v4','orange');
    p.arrow(410,870,410,935,C.orange);
    p.rect(310,945,200,385,C.tealFill,C.teal);
    p.text(410,980,'Global KV',{size:24,weight:600,color:C.teal,anchor:'middle',width:180});
    p.text(380,1026,'K',{size:23,weight:600,color:C.teal,anchor:'middle',width:60});
    p.text(460,1026,'V',{size:23,weight:600,color:C.teal,anchor:'middle',width:60});
    for(let r=0;r<5;r++){
      const y=1048+r*52,tone=r===4?'orange':'teal';
      p.text(336,y+29,`p${r}`,{size:21,anchor:'middle',width:38,color:C[tone]});
      p.token(353,y,`k${r}`,56,tone,42);p.token(433,y,`v${r}`,56,tone,42);
    }
    p.arrow(145,835,145,985,C.blue);
    p.box(10,995,250,145,'Cross-decoder 3','q₃ → p0…p4','blue');
    p.arrow(300,1070,270,1070,C.teal);p.arrow(145,1150,145,1385,C.blue);
    p.box(10,1395,250,145,'Cross-decoder 4','q₄ → p0…p4','blue');
    p.path('M410 1340 V1470 H270',C.teal,2.5,false,true);
    p.arrow(145,1550,145,1610,C.blue);p.token(45,1620,'LM head',200,'orange',80);
    p.arrow(145,1710,145,1770,C.orange);p.token(65,1780,'x₅',160,'orange',65);
    p.text(145,1903,['다음 입력 · KV 없음','Next input · No KV yet'],{size:24,weight:600,color:C.orange,anchor:'middle',width:290});
    p.box(mobile?20:600,mobile?2000:380,480,207,['앞 층도 매 토큰 계산합니다','Early layers run for every token'],['청록: 기존 값 읽기\n주황: 현재 상태·행 쓰기\n파랑: 층을 지나는 hidden','Teal: read stored values\nOrange: update state or append a row\nBlue: hidden flow through layers'],'gray');
    return [p];
  },
} satisfies FigureSpec;
