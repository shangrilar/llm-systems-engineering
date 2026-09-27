import {Panel,C,grid,matrix,port,connector,type FigureSpec,type Locale,type Tone} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-local-sparse',figureId:'02-local-and-landmarks',number:'ma-04-02',
  eyebrow:['그림 2 · 먼 위치 보충하기','Figure 2 · Add distant reads'],
  title:['가까운 위치와 지정한 먼 위치를 함께 읽습니다','Read nearby and designated distant positions'],
  subtitle:['교육용 causal pattern · 모든 연결은 j ≤ i · window 3은 현재 위치 포함','Teaching causal patterns · Every connection has j ≤ i · Window 3 includes the current position'],
  caption:['초록은 local 범위, 보라는 추가로 읽는 먼 위치입니다. 겹친 위치는 한 번만 셉니다. 두 규칙 모두 미래를 읽지 않으며, 양방향 encoder의 global mask를 복제한 그림이 아닙니다. 내용으로 고르는 방식은 다음 편에서 다룹니다.','Teal marks local positions; purple marks additional distant reads. Overlapping positions count only once. Neither rule reads the future; these are not copies of a bidirectional encoder’s global mask. Content-based selection comes in the next article.'],
  alt:['8×8 causal 마스크 두 개. A는 현재 포함 local 3과 anchor 0을 결합한다. B는 local 3과 4의 배수 위치를 결합한다. 현재 행 7의 읽기 집합은 A={0,5,6,7}, B={0,4,5,6,7}이며, 중복은 한 번만 센다.','Two 8×8 causal masks. A combines local 3, including the current position, with anchor 0. B combines local 3 with positions divisible by 4. At row 7 the read sets are A={0,5,6,7} and B={0,4,5,6,7}, with overlaps counted once.'],
  sources:[{label:'Longformer §3.1, sparse/local/global background',url:'https://arxiv.org/html/2004.05150v2#S3.SS1'}],
  panels(locale:Locale){
    return [false,true].map(landmarks=>{
      const p=new Panel(locale,landmarks?['B. Local + 주기적 landmark','B. Local + periodic landmarks']:['A. Local + anchor p0','A. Local + anchor p0'],1090);
      p.text(260,118,landmarks?'local 3 ∪ {p0, p4, …}':'local 3 ∪ {p0}',{size:27,weight:600,anchor:'middle',width:500});
      p.text(8,169,'Query i',{size:22,color:C.muted,width:110});
      p.text(285,169,'Key j',{size:24,color:C.muted,anchor:'middle',width:360});
      const tone=(i:number,j:number):Tone|null=>j>i?null:j>=i-2?'teal':j===0||(landmarks&&j%4===0)?'purple':null;
      const g=grid(p,95,228,8,8,{cell:44,gap:4,tone,hatch:(i,j)=>j>i});
      for(let i=0;i<8;i++){
        p.text(g.cellX(i)+22,210,String(i),{size:23,color:C.muted,anchor:'middle',width:44});
        p.text(78,g.cellY(i)+30,String(i),{size:23,color:i===7?C.blue:C.muted,weight:i===7?600:400,anchor:'end',width:36});
      }
      p.arrow(35,225,35,602,C.muted);
      g.outline(7,0,7,7,'blue',4);
      p.text(285,660,landmarks?['지정 위치: j mod 4 = 0','Landmarks: j mod 4 = 0']:['지정 위치: j = 0','Anchor: j = 0'],{size:25,weight:600,color:C.purple,anchor:'middle',width:440});
      p.token(216,715,'q7',88,'blue',54);
      p.text(20,747,['읽기 연결','Read links'],{size:23,color:C.muted,width:170});
      const row=matrix(p,38,864,[Array.from({length:8},(_,i)=>i)],{cellWidth:48,cellHeight:56,gap:8,size:24,tone:(_,j)=>tone(7,j)});
      const chosen=Array.from({length:8},(_,i)=>i).filter(i=>tone(7,i));
      connector(p,[260,777],[260,813],{tone:'blue',arrow:false});
      p.line(port(row.cell(0,chosen[0]),'top')[0],813,port(row.cell(0,chosen.at(-1)!),'top')[0],813,C.blue,2.5);
      chosen.forEach(i=>{
        const to=port(row.cell(0,i),'top',.5,8);
        connector(p,[to[0],813],to,{tone:tone(7,i)!});
      });
      p.text(260,977,landmarks?'q7 → {0, 4, 5, 6, 7}':'q7 → {0, 5, 6, 7}',{size:26,weight:600,color:C.blue,anchor:'middle',width:480});
      p.text(260,1032,landmarks?['3 local + 2 먼 위치 = 5개','3 local + 2 distant = 5 reads']:['3 local + 1 먼 위치 = 4개','3 local + 1 distant = 4 reads'],{size:24,color:C.muted,anchor:'middle',width:480});
      return p;
    });
  },
} satisfies FigureSpec;
