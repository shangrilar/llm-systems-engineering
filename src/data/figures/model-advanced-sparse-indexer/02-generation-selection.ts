import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-sparse-indexer',figureId:'02-generation-selection',number:'ma-05-02',
 eyebrow:['그림 2 · 생성에 따른 변화','Figure 2 · Across generation steps'],
 title:['다음 토큰에서는 읽을 위치도 달라질 수 있습니다','The next token can read different positions'],
 subtitle:['p₆ → p₇ · 같은 층의 캐시에 새 위치 추가','p₆ → p₇ · Append one position to the same layer cache'],
 captionIn:'article',caption:['기존 Key와 KV를 유지하고 새 위치를 추가한다. Query가 바뀌면서 선택 점수와 선택 위치가 달라진다.','Existing keys and KV are retained; one new position is appended. A new query changes scores and selected positions.'],
 alt:['p6에서는 후보0…6을 q6=[0,1]로 평가해1,3,6을 선택한다. p7의 Key와 KV를 추가한 뒤 q7=[1,0]으로 후보0…7을 평가하면0,4,7을 선택한다. p6의 미래 위치7은 후보에 없다.','At p6, q6=[0,1] scores positions0–6 and selects1,3,6. After adding p7 keys and KV, q7=[1,0] scores positions0–7 and selects0,4,7. Future position7 is absent from p6 candidates.'],sources:[],
 panels(locale:Locale){return [6,7].map(t=>{
 const p=new Panel(locale,t===6?['1. p₆ 처리','1. Process p₆']:['2. p₇ 처리','2. Process p₇'],800);
 p.token(100,90,t===6?'q₆ⁱ = [0, 1]':'q₇ⁱ = [1, 0]',320,'purple',60);
 p.arrow(260,160,260,211,C.purple);
 p.text(260,252,['위치별 선택 점수','Index scores by position'],{size:24,anchor:'middle',width:480});
 const scores=t===6?[.2,.9,.1,.7,.3,.4,.8]:[.9,.2,.3,.1,.8,.4,.5,.7];const ids=t===6?[1,3,6]:[0,4,7];
 matrix(p,30,312,[scores.map(x=>x.toFixed(1))],{cellWidth:50,cellHeight:52,gap:8,size:22,tone:(_,j)=>ids.includes(j)?'orange':'gray',columnLabels:scores.map((_,i)=>`p${i}`)});
 p.arrow(260,376,260,415,C.orange);p.text(280,401,'Top-3',{size:22,color:C.orange,width:180});
 p.token(95,430,ids.join(' · '),330,'orange',56);
 const row=matrix(p,30,623,[scores.map((_,i)=>`p${i}`)],{cellWidth:50,cellHeight:52,gap:8,size:22,tone:(_,j)=>ids.includes(j)?'teal':'gray'});
 p.line(260,496,260,555,C.orange,2);const xs=ids.map(i=>55+i*58);p.line(Math.min(260,...xs),555,Math.max(260,...xs),555,C.orange,2);xs.forEach(x=>p.arrow(x,555,x,613,C.orange));
 p.text(260,736,['본 KV 캐시 · 한 칸 = 한 위치','Main KV cache · One cell per position'],{size:23,anchor:'middle',width:500});
 if(t===7){p.rect(30+7*58-4,619,58,60,'none',C.blue,5);p.text(460,790,['새 KV','New KV'],{size:22,color:C.blue,anchor:'middle',width:110});}
 return p;
 });},
} satisfies FigureSpec;
