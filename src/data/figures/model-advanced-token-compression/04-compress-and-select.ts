import {Panel,C,matrix,connector,port,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-token-compression',figureId:'04-compress-and-select',number:'ma-06-04',
  eyebrow:['그림 4 · 압축과 선택의 조합','Figure 4 · Compress and select'],
  title:['압축한 뒤 일부 요약만 선택할 수도 있습니다','Compression can be followed by selecting only some summaries'],
  subtitle:['현재 q16 · 완료된 과거 p0…p15 · 두 경로 모두 최근 원본 3개를 함께 읽음','Current q16 · Completed past positions p0…p15 · Both paths also read 3 recent original entries'],
  captionIn:'article',caption:['A는 과거 16개 위치를 8개 요약으로 만들고 b1,b5만 읽습니다. B는 더 큰 묶음으로 4개 요약을 만들어 모두 읽습니다. 두 경로 모두 별도 local 원본 p14,p15,p16을 읽습니다. 압축 정도와 선택 예산은 독립적인 설계 선택이며, 이 그림은 출력 토큰 수나 속도·품질 비교를 나타내지 않습니다. 실제 CSA/HCA의 비율은 34편에서 다룹니다.','A turns 16 past positions into 8 summaries and reads only b1,b5. B uses larger groups to create 4 summaries and reads all of them. Both also read separate local original entries p14,p15,p16. Compression level and selection budget are distinct design choices. This is not a comparison of output-token counts, speed, or quality. Actual CSA/HCA ratios are covered in Article 34.'],
  alt:['A의 과거0…15를두개씩묶어 b0…b7을 만든다. 주황 테두리 b1과b5만 top2로선택해읽고 local14,15,16을함께읽는다. B는같은16위치를네개씩묶어 c0…c3을만들고네요약모두와같은local14,15,16을읽는다.','A groups past positions 0–15 in pairs into b0–b7. Orange outlines select b1,b5 as the top two; local originals 14,15,16 are also read. B groups the same 16 positions in fours into c0–c3 and reads all four summaries with the same local originals 14,15,16.'],
  sources:[{label:'DeepSeek-V4 §2.3, compression plus sparse selection versus heavier dense compression',url:'https://arxiv.org/html/2606.19348v1'}],
  panels(locale:Locale){
    return [false,true].map(heavy=>{
      const p=new Panel(locale,heavy?['B. 더 압축하고 모두 읽기','B. Compress more, read all']:['A. 덜 압축하고 일부 선택','A. Compress less, select some'],1360);
      p.text(260,114,heavy?['4개 위치 → 요약 1개','4 positions → 1 summary']:['2개 위치 → 요약 1개','2 positions → 1 summary'],{size:26,weight:600,color:C.purple,anchor:'middle',width:490});
      const groupSize=heavy?4:2;
      for(let row=0;row<2;row++){
        const y=174+row*301;
        const originals=matrix(p,40,y,[Array.from({length:8},(_,i)=>row*8+i)],{cellWidth:48,cellHeight:52,gap:8,size:24,tone:'teal'});
        const ids=Array.from({length:8/groupSize},(_,i)=>(heavy?'c':'b')+(row*(8/groupSize)+i));
        const summaries=matrix(p,heavy?98:42,y+143,[ids],{cellWidth:100,cellHeight:59,gap:heavy?124:12,size:26,tone:'purple'});
        for(let g=0;g<8/groupSize;g++){
          const first=port(originals.cell(0,g*groupSize),'bottom',.5,8),last=port(originals.cell(0,g*groupSize+groupSize-1),'bottom',.5,8),dest=port(summaries.cell(0,g),'top',.5,8);
          // The bracket denotes source range; the arrow denotes creation of one summary.
          p.path(`M${first[0]-24} ${first[1]} V${y+88} H${last[0]+24} V${last[1]}`,C.purple,2.5);
          connector(p,[dest[0],y+88],dest,{tone:'purple'});
          if(!heavy&&g===1){const b=summaries.cell(0,g);p.rect(b.x-3,b.y-3,b.width+6,b.height+6,'none',C.orange,10);}
        }
        p.text(260,y+250,[`과거 위치 ${row*8}…${row*8+7}의 요약`,`Summaries of past positions ${row*8}…${row*8+7}`],{size:23,color:C.muted,anchor:'middle',width:490});
      }
      p.arrow(260,750,260,789,heavy?C.purple:C.orange);
      p.box(25,808,470,116,heavy?['요약 4개 → 4개 모두 읽기','4 summaries → read all 4']:['요약 8개 → top-2 선택','8 summaries → select top 2'],heavy?['q16은 c0…c3 모두 사용','q16 uses c0…c3']:['q16의 선택: b1, b5 · 주황 테두리','q16 selects b1,b5 · Orange outlines'],heavy?'purple':'orange');
      p.arrow(260,941,260,982,heavy?C.purple:C.orange);
      matrix(p,heavy?46:155,1000,[heavy?['c0','c1','c2','c3']:['b1','b5']],{cellWidth:100,cellHeight:61,gap:10,size:27,tone:'purple'});
      p.text(260,1131,['＋ 최근 위치별 KV','＋ Recent per-token KV'],{size:25,weight:600,color:C.teal,anchor:'middle',width:490});
      matrix(p,129,1174,[[14,15,16]],{cellWidth:78,cellHeight:60,gap:14,size:27,tone:'teal'});
      p.text(260,1286,['최근 3개 · 현재 p16 포함','Latest 3 · Includes current p16'],{size:24,weight:600,color:C.teal,anchor:'middle',width:490});
      return p;
    });
  },
} satisfies FigureSpec;
