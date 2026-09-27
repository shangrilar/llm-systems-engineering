import {Panel,C,grid,cells,connector,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-local-sparse',figureId:'01-read-window',number:'ma-04-01',
  eyebrow:['그림 1 · 읽을 위치의 지도','Figure 1 · Read positions'],
  title:['현재 위치에서 읽을 범위를 제한합니다','Limit which positions the current query reads'],
  subtitle:['한 층 · p0…p7 · 이 예의 window 3 = 현재 위치 + 직전 두 위치','One layer · p0…p7 · Here window 3 = current position + two previous positions'],
  caption:['칠한 칸은 읽을 연결, 빗금은 미래 위치, 빈칸은 읽지 않는 과거 위치입니다. 파란 테두리는 현재 Query 행 i=7입니다. Full causal은 8개, window 3은 5·6·7의 3개 위치를 읽습니다. 이 그림은 접근 규칙이며 KV 삭제를 뜻하지 않습니다.','Filled cells are read connections; hatching marks future positions; blank cells are unread past positions. The blue outline marks current query row i=7. Full causal reads 8 positions, while window 3 reads 3 positions: 5,6,7. This is an access rule, not a KV deletion diagram.'],
  alt:['Query 위치 i를 행, Key 위치 j를 열로 한 두 8×8 행렬. Full causal은 j≤i인 36칸, 현재 포함 window 3은 max(0,i−2)≤j≤i인 21칸이 활성이다. 마지막 행의 읽기 연결은 각각 0부터 7 전체와 5,6,7이다.','Two 8×8 matrices have query position i as rows and key position j as columns. Full causal activates 36 cells with j≤i. Window3, including the current position, activates 21 cells with max(0,i−2)≤j≤i. The final-row reads are all positions 0–7 and positions 5,6,7 respectively.'],
  sources:[{label:'Mistral 7B §2, sliding-window background',url:'https://arxiv.org/html/2310.06825v1#S2'}],
  panels(locale:Locale){
    return [false,true].map(local=>{
      const p=new Panel(locale,local?['B. Sliding window','B. Sliding window']:['A. Full causal','A. Full causal'],1040);
      p.text(260,118,local?'max(0, i − 2) ≤ j ≤ i':'j ≤ i',{size:27,weight:600,anchor:'middle',width:500});
      p.text(8,169,'Query i',{size:22,color:C.muted,width:110});
      p.text(285,169,'Key j',{size:24,color:C.muted,anchor:'middle',width:360});
      const g=grid(p,95,228,8,8,{cell:44,gap:4,tone:(i,j)=>j<=i&&(!local||j>=i-2)?'teal':null,hatch:(i,j)=>j>i});
      for(let i=0;i<8;i++){
        p.text(g.cellX(i)+22,210,String(i),{size:23,color:C.muted,anchor:'middle',width:44});
        p.text(78,g.cellY(i)+30,String(i),{size:23,color:i===7?C.blue:C.muted,weight:i===7?600:400,anchor:'end',width:36});

      }
      p.arrow(35,225,35,602,C.muted);
      g.outline(7,0,7,7,'blue',4);
      p.text(285,664,local?['전체 활성 연결: 21개','Active connections: 21']:['전체 활성 연결: 36개','Active connections: 36'],{size:25,weight:600,color:C.teal,anchor:'middle',width:440});
      p.token(216,715,'q7',88,'blue',54);
      p.text(20,747,['읽기 연결','Read links'],{size:23,color:C.muted,width:170});
      const row=cells(p,38,864,Array.from({length:8},(_,i)=>local&&i<5?null:String(i)),{tone:'teal',w:48,h:56,gap:8,size:24});
      if(local)for(let i=0;i<5;i++){
        p.rect(38+i*56,864,48,56,C.paper,C.line,5);
        p.text(row.center(i),899,String(i),{size:24,color:C.muted,anchor:'middle',width:44});
      }
      const chosen=Array.from({length:local?3:8},(_,i)=>i+(local?5:0));
      connector(p,[260,777],[260,813],{tone:'blue',arrow:false});
      p.line(Math.min(260,row.center(chosen[0])),813,Math.max(260,row.center(chosen.at(-1)!)),813,C.blue,2.5);
      chosen.forEach(i=>connector(p,[row.center(i),813],[row.center(i),856],{tone:'blue'}));
      p.text(260,967,local?['q7은 3개 위치를 읽습니다.','q7 reads 3 positions.']:['q7은 8개 위치를 읽습니다.','q7 reads 8 positions.'],{size:26,weight:600,color:C.blue,anchor:'middle',width:480});
      return p;
    });
  },
} satisfies FigureSpec;
