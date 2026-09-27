import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-sparse-indexer',figureId:'03-indexer-window',number:'ma-05-03',
 eyebrow:['그림 3 · Indexer + Window','Figure 3 · Indexer + window'],
 title:['최근 위치는 포함하고, 선택한 위치를 더합니다','Keep recent positions and add selected positions'],
 subtitle:['현재 p₇ · Window 3 + Top-3 · 압축 없는 교육용 예시','Current p₇ · Window 3 + Top-3 · Uncompressed teaching example'],
 captionIn:'article',caption:['window의5,6,7과 indexer의0,4,7을 합쳐0,4,5,6,7의 KV를 한 번씩 읽는다. DeepSeek-V4 CSA의 압축된 선택 대상은 다음 편에서 구분한다.','Union window5,6,7 with indexer0,4,7 to read KV0,4,5,6,7 once each. DeepSeek-V4 CSA selects compressed entries, covered separately in the next article.'],
 alt:['현재 위치7에서 window는5,6,7을 항상 포함하고 indexer는0,4,7을 선택한다. 겹치는7을 한 번만 포함한0,4,5,6,7의 원래 KV를 본 Query와 Attention에 사용한다.','At position7, the window includes5,6,7 and the indexer selects0,4,7. Original KV at0,4,5,6,7 enters main attention with the query, counting overlapping7 once.'],
 sources:[{label:'DeepSeek-V4 reference, window plus selected compressed entries; this figure omits compression',url:'https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/blob/main/inference/model.py'}],
 panels(locale:Locale){
 const a=new Panel(locale,['A. 두 규칙으로 위치 선택','A. Two rules select positions'],730);
 a.token(100,90,'Window 3',320,'blue',58);
 a.arrow(260,157,260,200,C.blue);
 matrix(a,30,235,[Array.from({length:8},(_,i)=>`p${i}`)],{cellWidth:50,cellHeight:54,gap:8,size:22,tone:(_,i)=>i>=5?'blue':'gray'});
 a.text(260,343,['최근 위치 {5, 6, 7}','Recent positions {5, 6, 7}'],{size:24,color:C.blue,anchor:'middle',width:490});
 a.token(100,423,'Indexer · Top-3',320,'orange',58);a.arrow(260,490,260,531,C.orange);
 matrix(a,30,566,[Array.from({length:8},(_,i)=>`p${i}`)],{cellWidth:50,cellHeight:54,gap:8,size:22,tone:(_,i)=>[0,4,7].includes(i)?'orange':'gray'});
 a.text(260,676,['선택 위치 {0, 4, 7}','Selected positions {0, 4, 7}'],{size:24,color:C.orange,anchor:'middle',width:490});
 const b=new Panel(locale,['B. 합친 위치의 KV 읽기','B. Read KV from the union'],730);
 b.token(85,90,['합집합 · 중복은 한 번','Union · Count overlaps once'],350,'gray',65);
 b.arrow(260,165,260,211,C.teal);
 matrix(b,30,235,[Array.from({length:8},(_,i)=>`p${i}`)],{cellWidth:50,cellHeight:54,gap:8,size:22,tone:(_,i)=>[0,4,5,6,7].includes(i)?'teal':'gray'});
 b.text(260,343,['읽을 KV: {0, 4, 5, 6, 7}','Read KV: {0, 4, 5, 6, 7}'],{size:24,color:C.teal,anchor:'middle',width:500});
 b.arrow(260,363,260,425,C.teal);b.token(145,440,'Attention',340,'teal',65);
 b.token(15,450,'q₇',90,'blue',45);b.arrow(112,473,135,473,C.blue);
 b.arrow(315,515,315,579,C.teal);b.token(175,594,['출력','Output'],280,'teal',55);
 return [a,b];
 },
} satisfies FigureSpec;
