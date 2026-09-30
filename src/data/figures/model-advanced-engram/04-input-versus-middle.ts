import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
"articleId":"model-advanced-engram",
"figureId":"04-input-versus-middle",
"number":"ma-20-05",
"eyebrow":["그림 5", "Figure 5"],
"title":["문맥을 얻은 뒤 결합하고, 조회는 미리 시작합니다", "Fuse after gaining context; start lookup in advance"],
"subtitle":["입력 결합도 가능한 대안 · 시간축은 정성적 예시", "Input fusion is a valid alternative · Timelines are qualitative"],
"captionIn":"article",
"caption":["입력에 N-gram 표현을 더해도 이후 Attention과 MoE가 활용법을 학습할 수 있습니다. 중간 삽입은 앞선 Attention으로 문맥을 얻은 hidden을 gate에 사용합니다. 조회 주소는 토큰 ID로 미리 정해져 CPU 조회와 전송을 앞선 GPU 계산과 겹칠 수 있습니다. 겹침 정도는 하드웨어와 워크로드에 달려 있습니다. 너무 늦게 넣으면 앞선 층이 해당 정보를 활용할 수 없습니다. 막대 길이는 측정 시간이 아닙니다.", "Input fusion allows subsequent attention and MoE to learn how to use N-gram features. Middle-layer insertion uses context from preceding attention to gate memory. Token IDs determine addresses early, allowing CPU retrieval and transfer to overlap preceding GPU computation. Achievable overlap depends on hardware and workload. Very late insertion prevents earlier layers from using the memory. Bar lengths are not measured times."],
"alt":["입력에 N-gram 표현을 더해도 이후 Attention과 MoE가 활용법을 학습할 수 있습니다. 중간 삽입은 앞선 Attention으로 문맥을 얻은 hidden을 gate에 사용합니다. 조회 주소는 토큰 ID로 미리 정해져 CPU 조회와 전송을 앞선 GPU 계산과 겹칠 수 있습니다. 겹침 정도는 하드웨어와 워크로드에 달려 있습니다. 너무 늦게 넣으면 앞선 층이 해당 정보를 활용할 수 없습니다. 막대 길이는 측정 시간이 아닙니다.", "Input fusion allows subsequent attention and MoE to learn how to use N-gram features. Middle-layer insertion uses context from preceding attention to gate memory. Token IDs determine addresses early, allowing CPU retrieval and transfer to overlap preceding GPU computation. Achievable overlap depends on hardware and workload. Very late insertion prevents earlier layers from using the memory. Bar lengths are not measured times."],
"sources":[{"label": "Engram §2, §4.1, §6.2", "url": "https://arxiv.org/html/2601.07372v1"}],
panels(locale:Locale,mobile?:boolean){

const a=new Panel(locale,['A. 입력에서 함께 결합','A. Fuse at the input'],700);
a.token(20,110,'e(B)',190,'blue',60);a.token(290,110,'g(A,B)',210,'teal',60);
a.path('M115 180 V220 H235',C.blue,3,false,true);a.path('M395 180 V220 H285',C.teal,3,false,true);
a.circle(260,220,22,C.orangeFill,C.orange);a.text(260,229,'+',{size:25,anchor:'middle',width:35});a.arrow(260,250,260,300,C.blue);
a.box(50,310,420,130,['첫 Attention → 이후 층','First attention → later layers'],['결합된 정보의 활용법을 학습','Learns to use the combined features'],'blue');
a.text(20,505,['실행 순서 →','Execution order →'],{size:23,width:480});
a.token(20,540,['조회·전송','Fetch'],180,'teal',65);a.arrow(210,572,265,572,C.gray);a.token(280,540,['첫 블록 계산','Block 1'],220,'blue',65);
const b=new Panel(locale,['B. 문맥을 얻은 뒤 결합','B. Fuse after gaining context'],700);
b.token(20,110,'e(B)',190,'blue',60);b.token(290,110,'g(A,B)',210,'teal',60);
b.arrow(115,180,115,220,C.blue);b.box(20,230,230,100,['첫 Attention','First attention'],'h: context','blue');
b.path('M395 180 V365 H390 V375',C.teal,3,false,true);b.arrow(135,340,135,375,C.blue);
b.box(20,385,480,80,['문맥 gate → 결합 → 이후 층','Context gate → fusion → later layers'],'','orange');
b.text(20,505,['시간 → 두 작업을 겹침','Time → overlap the two tasks'],{size:23,width:490});
b.token(20,540,['GPU · 첫 블록 계산','GPU · Block 1'],320,'blue',55);b.token(20,620,['CPU → GPU · 조회·전송','CPU → GPU · Fetch'],320,'teal',55);
b.path('M365 540 V675',C.orange,3);b.text(440,580,['합류','Join'],{size:24,anchor:'middle',width:130});
return [a,b];
}
} satisfies FigureSpec;
