import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
"articleId":"model-advanced-engram",
"figureId":"00-layer-map",
"number":"ma-20-01",
"eyebrow":["그림 1", "Figure 1"],
"title":["Engram은 선택한 층의 Attention 앞에 정보를 더합니다", "Engram adds memory before attention at selected layers"],
"subtitle":["원 논문 주요 실험: 30층 중 2·15층 · 1부터 센 층 번호", "Main paper experiment: layers 2 and 15 of 30 · One-based numbering"],
"captionIn":"article",
"caption":["전체 지도에서 입력 임베딩은 유지되고 Engram 모듈은 2층과 15층 앞에 표시됩니다. 각 삽입 위치는 해당 층의 hidden으로 gate를 계산하며 같은 출력을 모든 층에 복사하지 않습니다. 확대도에서는 모듈 출력 y를 h에 더한 뒤 Attention과 MoE로 진행합니다. 이 층 번호는 실험 설정이지 필수 배치 규칙이 아닙니다. 단일 residual stream으로 단순화했으며 mHC 확장은 그림 4에 표시합니다.", "The full map preserves input embeddings and places Engram at layers 2 and 15. Each module gates memory using the hidden state at its own insertion point; one output is not copied to every layer. The enlargement adds module output y to h before attention and MoE. Layer numbers describe the experiment, not a mandatory placement rule. A single residual stream is shown; Figure 4 expands mHC integration."],
"alt":["전체 지도에서 입력 임베딩은 유지되고 Engram 모듈은 2층과 15층 앞에 표시됩니다. 각 삽입 위치는 해당 층의 hidden으로 gate를 계산하며 같은 출력을 모든 층에 복사하지 않습니다. 확대도에서는 모듈 출력 y를 h에 더한 뒤 Attention과 MoE로 진행합니다. 이 층 번호는 실험 설정이지 필수 배치 규칙이 아닙니다. 단일 residual stream으로 단순화했으며 mHC 확장은 그림 4에 표시합니다.", "The full map preserves input embeddings and places Engram at layers 2 and 15. Each module gates memory using the hidden state at its own insertion point; one output is not copied to every layer. The enlargement adds module output y to h before attention and MoE. Layer numbers describe the experiment, not a mandatory placement rule. A single residual stream is shown; Figure 4 expands mHC integration."],
"sources":[{"label": "Engram §2, §4.1, §6.2", "url": "https://arxiv.org/html/2601.07372v1"}],
panels(locale:Locale,mobile?:boolean){

const p=new Panel(locale,['A. 전체 30층 지도','A. Map of 30 layers'],960);
p.token(140,110,['입력 임베딩','Input embedding'],350,'blue',70);
const ys=[235,390,545,700,855],labels=['Block 1','Block 2','Blocks 3–14','Block 15','Blocks 16–30'];
ys.forEach((y,i)=>{
 p.arrow(315,i?ys[i-1]+80:190,315,y-10,C.blue);
 p.token(140,y,labels[i],350,'blue',70);
 if(i===1||i===3){p.token(5,y-60,'Engram',115,'teal',60);p.path(`M65 ${y+10} V${y+35} H130`,C.teal,3,false,true);}
});
const q=new Panel(locale,['B. 삽입 지점을 확대','B. Expand an insertion point'],1050);
q.token(20,110,'h',150,'blue',65);q.box(280,110,220,110,['토큰 묶음','Token group'],'N-gram IDs','teal');
q.arrow(390,230,390,280,C.teal);q.box(240,290,260,130,'Engram',['조회 · gate · conv','Lookup · gate · conv'],'teal');
q.path('M95 185 V250 H210 V350 H230',C.blue,2,false,true);q.line(95,250,95,525,C.blue,3);
q.arrow(370,430,370,470,C.teal);q.token(300,480,'y',140,'teal',60);
q.path('M370 550 V590 H130',C.teal,3,false,true);q.arrow(95,525,95,560,C.blue);
q.circle(95,590,25,C.orangeFill,C.orange);q.text(95,599,'+',{size:26,anchor:'middle',width:40});
q.arrow(95,625,95,670,C.blue);q.box(20,680,480,110,'Attention',['residual 연결 포함','Includes residual connection'],'blue');
q.arrow(260,800,260,845,C.blue);q.box(20,855,480,110,'MoE',['residual 연결 포함','Includes residual connection'],'blue');
return [p,q];
}
} satisfies FigureSpec;
