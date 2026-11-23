import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'model-advanced-yoco',figureId:'05-cache-growth',number:'yoco-05',
  eyebrow:['그림 5 · 문맥 길이와 저장량','Figure 5 · Context length and storage'],
  title:['Local KV는 두 위치씩, global KV는 문맥만큼','Two local positions per layer; global KV grows with context'],
  subtitle:['SWA 예시 · Self 2층 + Cross 2층 · Window = 2 · 모든 KV의 head 수·폭 동일','SWA example · 2 self + 2 cross layers · Window = 2 · Equal KV head counts and widths'],
  captionIn:'article',caption:['한 칸은 한 위치의 K와 V 벡터 쌍입니다. T4에서 local 4+global 4=8쌍, T8에서는 local 4+global 8=12쌍입니다. 일반 full attention 4층은 16→32쌍입니다. recurrent 상태가 아닌 SWA 예시이며, KV 데이터의 교육용 비교입니다.','Each cell is one position’s K/V vector pair. Local 4 + global 4 = 8 pairs at T4; local 4 + global 8 = 12 at T8. Four full-attention layers store 16 then 32 pairs. This is an illustrative SWA KV count, not a recurrent-state or measured-performance comparison.'],
  alt:['T4와 T8에서 self-decoder 두 층은 각각 최근 두 위치만 보관한다. 공유 global KV는 네 위치에서 여덟 위치로 증가해 YOCO 전체는 8쌍에서 12쌍이 된다. 일반 full attention 네 층은 16쌍에서 32쌍이 된다.','At T4 and T8, each of two self-decoder layers stores two recent positions. Shared global KV grows from four to eight positions, increasing YOCO totals from 8 to 12 pairs. Four full-attention layers grow from 16 to 32 pairs.'],
  sources:[{label:'YOCO §2.1–2.3 and §3.2',url:'https://arxiv.org/html/2405.05254v1#S2'}],
  panels(locale:Locale){
    return [4,8].map(t=>{
      const p=new Panel(locale,`T = ${t} · p0–p${t-1}`,1240);
      const row=(y:number,positions:number[],tone:'teal'|'gray'='teal')=>positions.forEach((pos,i)=>p.token(65+i*54,y,`p${pos}`,48,tone,44));
      p.text(20,122,['YOCO · Self의 local KV','YOCO · Self-layer local KV'],{size:25,weight:600,color:C.teal,width:490});
      for(let l=0;l<2;l++){
        const y=160+l*75;
        p.text(20,y+30,`L${l+1}`,{size:22,weight:600,width:45});row(y,[t-2,t-1]);
        p.text(310,y+30,['2쌍','2 pairs'],{size:23,color:C.teal,width:180});
      }
      p.text(260,345,['2층 × 2위치 = 4쌍','2 layers × 2 positions = 4 pairs'],{size:24,weight:600,color:C.teal,anchor:'middle',width:500});
      p.line(20,385,500,385,C.line);
      p.text(20,440,['YOCO · 공유 global KV','YOCO · Shared global KV'],{size:25,weight:600,color:C.teal,width:490});
      row(480,Array.from({length:t},(_,i)=>i));
      p.text(260,585,[`Cross 2층이 같은 ${t}쌍 읽기`,`Both cross layers read the same ${t} pairs`],{size:23,color:C.teal,anchor:'middle',width:500});
      p.token(90,640,[`합계 4 + ${t} = ${4+t}쌍`,`Total: 4 + ${t} = ${4+t} pairs`],340,'teal',66);
      p.line(20,754,500,754,C.line);
      p.text(20,813,['비교 · Full attention 4층','Reference · 4 full-attention layers'],{size:25,weight:600,color:C.gray,width:490});
      for(let l=0;l<4;l++){
        const y=855+l*65;p.text(20,y+30,`L${l+1}`,{size:22,weight:600,width:45});row(y,Array.from({length:t},(_,i)=>i),'gray');
      }
      p.text(260,1160,[`4층 × ${t}위치 = ${4*t}쌍`,`4 layers × ${t} positions = ${4*t} pairs`],{size:24,weight:600,color:C.gray,anchor:'middle',width:500});
      p.text(260,1220,['한 칸 = 한 위치의 K/V 벡터 쌍','One cell = one position’s K/V pair'],{size:22,anchor:'middle',width:500});
      return p;
    });
  },
} satisfies FigureSpec;
