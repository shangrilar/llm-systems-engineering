import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-sparse-indexer',figureId:'01-index-selection',number:'ma-05-01',
 eyebrow:['그림 1 · 선택과 Attention','Figure 1 · Selection and attention'],
 title:['선택용 Q·K로 고르고, 본 Q·K·V로 읽습니다','Select with index Q·K; read with main Q·K·V'],
 subtitle:['현재 p₇ · Top-3 · 교육용 내적 예시','Current p₇ · Top-3 · Illustrative dot products'],
 captionIn:'article',caption:['선택 점수는 위치 선택에만 쓰고, 본 Attention은 별도의 Q·K·V로 계산한다.','Index scores select positions; main attention uses its own Q, K and V.'],
 alt:['현재 입력에서 별도 투영으로 선택용 Query와 본 Query를 만든다. 위치별 선택용 Key와의 내적으로 점수를 구하고 상위 위치 0,4,7을 고른다. 본 Attention은 해당 위치의 별도 Key와 Value만 읽는다.','Separate projections produce an index query and a main query. Dot products with per-position index keys select positions 0,4,7. Main attention reads its own keys and values at those positions.'],
 sources:[{label:'DeepSeek-V3.2 reference implementation',url:'https://huggingface.co/deepseek-ai/DeepSeek-V3.2/blob/main/inference/model.py'}],
 panels(locale:Locale){
 const a=new Panel(locale,['A. 위치 선택','A. Select positions'],1030);
 a.token(120,80,['현재 입력 h₇','Current input h₇'],280,'gray',50);
 a.arrow(260,138,260,180,C.purple);a.text(280,165,'W_Qⁱ',{size:23,color:C.purple,width:150});
 a.token(95,193,['선택용 q₇ⁱ = [1, 0]','Index q₇ⁱ = [1, 0]'],330,'purple',55);
 a.arrow(260,256,260,290,C.purple);
 a.text(260,326,'sⱼ = q₇ⁱ · kⱼⁱ',{size:27,anchor:'middle',width:480});
 a.text(125,377,['kⱼⁱ = hⱼ W_Kⁱ','kⱼⁱ = hⱼ W_Kⁱ'],{size:22,anchor:'middle',width:210});a.text(408,377,['선택 점수','Index score'],{size:22,anchor:'middle',width:190});
 const scores=[.9,.2,.3,.1,.8,.4,.5,.7];
 scores.forEach((s,i)=>{const y=399+i*48;const hit=[0,4,7].includes(i);a.text(12,y+29,`p${i}`,{size:23,width:42});a.token(62,y,`[${s.toFixed(1)}, ${[.2,.9,.1,.7,.3,.4,.8,.5][i]}]`,190,'purple',38);a.arrow(263,y+19,304,y+19,C.muted);a.token(325,y,s.toFixed(1),165,hit?'orange':'gray',38);});
 a.arrow(260,798,260,835,C.orange);a.text(285,826,'Top-3',{size:22,color:C.orange,width:155});
 a.token(75,856,['위치 [0, 4, 7]','Positions [0, 4, 7]'],370,'orange',60);
 const b=new Panel(locale,['B. 선택한 KV로 Attention','B. Attend to selected KV'],1030);
 b.token(120,80,['현재 입력 h₇','Current input h₇'],280,'gray',50);
 b.arrow(260,138,260,180,C.blue);b.text(280,165,'W_Q',{size:23,color:C.blue,width:150});
 b.token(130,193,['본 Query q₇','Main query q₇'],260,'blue',55);
 b.text(260,307,['본 KV 캐시 · 행 = 토큰 위치','Main KV cache · Rows = positions'],{size:23,anchor:'middle',width:500});
 b.text(80,363,['위치','Position'],{size:22,anchor:'middle',width:115});b.text(255,363,'K',{size:24,anchor:'middle',width:100});b.text(410,363,'V',{size:24,anchor:'middle',width:100});
 scores.forEach((_,i)=>{const y=389+i*48;const hit=[0,4,7].includes(i);b.text(80,y+28,`p${i}`,{size:23,anchor:'middle',width:100,color:hit?C.orange:C.muted});b.token(185,y,`k${i}`,130,hit?'teal':'gray',38);b.token(345,y,`v${i}`,130,hit?'teal':'gray',38);});
 b.arrow(330,780,330,799,C.teal);
 b.token(70,807,['읽을 KV: p₀, p₄, p₇','Read KV: p₀, p₄, p₇'],380,'orange',48);
 b.arrow(260,863,260,891,C.orange);
 b.token(120,904,'Attention',280,'teal',54);
 // Main query travels around the cache, without entering its rows.
 b.line(122,220,35,220,C.blue,2);b.line(35,220,35,931,C.blue,2);b.arrow(35,931,110,931,C.blue);
 b.arrow(260,966,260,995,C.teal);b.text(310,1018,['출력','Output'],{size:23,color:C.teal,width:140});
 return [a,b];
 },
} satisfies FigureSpec;
