import {Panel,C,matrix,connector,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-token-compression',figureId:'03-causal-summary-and-local',number:'ma-06-03',
  eyebrow:['그림 3 · 요약을 읽을 시점','Figure 3 · Summary timing'],
  title:['완성된 과거 요약과 최근 원본을 함께 읽습니다','Read completed past summaries alongside recent original entries'],
  subtitle:['Block 크기 2 · 현재 포함 window 3 · 완성된 요약은 모두 읽는 교육용 예','Block size 2 · Window 3 includes the current position · All completed summaries are read in this example'],
  captionIn:'article',caption:['p6에서는 b0…b2만 완성되어 있으며 p7을 포함하는 b3는 읽지 않습니다. p8에서는 b3도 완료되어 사용할 수 있습니다. 현재 block의 정보는 최근 원본 경로가 보완합니다. 예를 들어 p6의 p4,p5는 b2에도 반영되어 있지만 원본과 요약은 별개의 읽기 항목입니다.','At p6, only b0–b2 are complete; b3, which would include p7, is not read. At p8, b3 is complete and available. Recent original entries supply information from the current block. For example, p4,p5 at p6 also contribute to b2, but original entries and summaries are separate read items.'],
  alt:['왼쪽 현재 p6에서 0…5는 완료된 block b0,b1,b2에 속하고, 6,7의 b3는 p7이 미래라 미완성이다. q6는 summary bank b0…b2와 최근 위치별 KV 4,5,6을 읽는다. 오른쪽 현재 p8에서는 b0…b3가 완료되고 8,9의 b4가 미완성이다. q8은 b0…b3와 최근 위치별 KV 6,7,8을 읽으며 미래 p9는 읽지 않는다.','At current position p6, positions 0–5 form completed blocks b0,b1,b2. Block b3={6,7} is incomplete because p7 is in the future. Query q6 reads summaries b0–b2 and local entries 4,5,6. At p8, blocks b0–b3 are complete while b4={8,9} is incomplete. Query q8 reads summaries b0–b3 and local entries 6,7,8; future p9 is excluded.'],
  sources:[{label:'DeepSeek-V4 §2.3, preceding compressed blocks and sliding-window branch',url:'https://arxiv.org/html/2606.19348v1'}],
  panels(locale:Locale){
    return [6,8].map(t=>{
      const completed=t/2,n=t+2,start=(520-(n*42+(n-1)*8))/2;
      const p=new Panel(locale,t===6?['A. 현재 위치 p6','A. Current position p6']:['B. 현재 위치 p8','B. Current position p8'],1210);
      p.text(260,118,['현재까지 도착한 입력과 다음 위치','Inputs seen so far and the next position'],{size:24,weight:600,anchor:'middle',width:510});
      for(let i=0;i<n;i++){
        const x=start+i*50;
        if(i>t){p.rect(x,170,42,54,C.paper,C.muted,7,true);p.text(x+21,205,String(i),{size:24,color:C.muted,anchor:'middle',width:35});}
        else p.token(x,170,String(i),42,i===t?'blue':'teal',54);
      }
      for(let b=0;b<n/2;b++){
        const x=start+b*100,color=b<completed?C.purple:C.muted;
        p.path(`M${x} 238 V252 H${x+92} V238`,color,2.5,b===completed);
        p.text(x+46,295,`b${b}`,{size:25,weight:600,color,anchor:'middle',width:88});
      }
      p.rect(22,346,476,152,C.grayFill,C.muted,12,true);
      p.text(41,383,[`미완성 b${completed} = {${t}, ${t+1}}`,`Incomplete b${completed} = {${t}, ${t+1}}`],{size:25,weight:600,color:C.muted,width:438});
      p.text(41,436,[`미래 p${t+1}이 포함될 요약은 읽지 않습니다.`,`Do not read a summary that would include future p${t+1}.`],{size:23,width:438});

      p.rect(190,558,310,247,C.purpleFill,C.purple,12);
      p.text(210,600,'Summary bank',{size:25,weight:600,color:C.purple,width:270});
      p.text(210,644,['완료된 과거 요약','Completed past summaries'],{size:23,color:C.purple,width:270});
      matrix(p,214,700,[Array.from({length:completed},(_,i)=>`b${i}`)],{cellWidth:58,cellHeight:57,gap:10,size:23,tone:'purple'});

      p.token(17,828,`q${t}`,110,'blue',62);
      p.text(73,945,['모두 읽기','Read all'],{size:24,weight:600,color:C.blue,anchor:'middle',width:135});
      connector(p,[137,859],[180,716],{via:[[158,859],[158,716]],tone:'blue'});
      connector(p,[158,859],[180,1065],{via:[[158,1065]],tone:'blue'});

      p.rect(190,981,310,211,C.tealFill,C.teal,12);
      p.text(210,1015,['최근 위치별 KV','Recent per-token KV'],{size:25,weight:600,color:C.teal,width:270});
      matrix(p,214,1090,[[t-2,t-1,t]],{cellWidth:76,cellHeight:58,gap:12,size:27,tone:'teal'});
      return p;
    });
  },
} satisfies FigureSpec;
