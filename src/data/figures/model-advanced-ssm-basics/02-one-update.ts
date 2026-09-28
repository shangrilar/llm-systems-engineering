import {Panel,C,matrix,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-ssm-basics',figureId:'02-one-update',number:'ssm-02',eyebrow:['그림 2','Figure 2'],
 title:['남기고, 기록하고, 읽는 연산을 나눠 봅니다','Separate retention, writing, and reading'],
 subtitle:['한 채널의 계산 예시 · 이전 상태 [2, 1] · 이번 입력 u = 2','One-channel example · Old state [2, 1] · Current input u = 2'],captionIn:'article',
 caption:['이전 상태에 새 입력2를 기록하는 한 단계 예시. Ā=diag(0.5,0.8), B̄=[1,0.5]ᵀ, C=[1,1]. 두 상태 성분을 가로로 표시하되 실제 상태는 열벡터다. 직접 출력 항은 생략한다.','One illustrative update that writes new input2 into an existing state. Ā=diag(0.5,0.8), B̄=[1,0.5]ᵀ, C=[1,1]. State components are displayed horizontally; the state is a column vector. Direct output is omitted.'],
 alt:['이전 상태2,1에 각각0.5,0.8을 곱해1,0.8을 남긴다. 입력2에 Bbar의1,0.5를 곱해2,1을 기록한다. 합친 새 상태3,1.8에 C의1,1을 곱해 더하면 출력4.8이다.','Retaining [2,1] at rates [0.5,0.8] gives [1,0.8]. Writing input2 with [1,0.5] gives [2,1]. Add them to get [3,1.8], then read with [1,1] for output4.8.'],
 sources:[{label:'Mamba §2 · teaching values',url:'https://arxiv.org/html/2312.00752v2#S2'}],
 panels(locale:Locale){const a=new Panel(locale,['1. 이전 상태 + 새 입력','1. Old state + new input'],740),b=new Panel(locale,['2. 새 상태에서 출력 읽기','2. Read the new state'],740);
 a.box(20,105,230,100,['이전 상태','Old state'],'[2, 1]','teal');a.box(290,105,210,100,['현재 입력','Current input'],'u = 2','blue');a.arrow(135,215,135,250,C.purple);a.arrow(395,215,395,250,C.orange);
 a.box(20,260,230,110,['Ā · 유지·변환','Ā · Retention'],'× [0.5, 0.8]','purple');a.box(290,260,210,110,['B̄ · 입력 기록','B̄ · Writing'],'× [1, 0.5]','orange');a.arrow(135,380,135,415,C.purple);a.arrow(395,380,395,415,C.orange);
 matrix(a,20,430,[[1,.8]],{cellWidth:105,cellHeight:65,gap:10,tone:'purple'});matrix(a,290,430,[[2,1]],{cellWidth:100,cellHeight:65,gap:10,tone:'orange'});
 connector(a,[135,505],[230,555],{via:[[135,555]],tone:'purple'});connector(a,[395,505],[290,555],{via:[[395,555]],tone:'orange'});a.circle(260,555,22,C.paper,C.teal);a.text(260,563,'+',{anchor:'middle',width:40,size:28});a.arrow(260,590,260,620,C.teal);a.box(100,635,320,90,['새 상태','New state'],'[3, 1.8]','teal');
 b.text(260,127,['새 상태의 성분','New state components'],{anchor:'middle',width:450,color:C.teal});matrix(b,130,155,[[3,1.8]],{cellWidth:120,cellHeight:70,gap:20,tone:'teal'});b.arrow(190,235,190,290,C.purple);b.arrow(330,235,330,290,C.purple);b.text(50,339,'C',{size:27,color:C.purple,width:50});matrix(b,130,310,[[1,1]],{cellWidth:120,cellHeight:65,gap:20,tone:'purple'});b.text(260,416,['성분별로 곱한 뒤 더하기','Multiply each pair, then sum'],{anchor:'middle',width:490,size:24});b.token(60,450,'3 × 1 + 1.8 × 1',400,'purple',75);b.arrow(260,535,260,605,C.purple);b.box(100,620,320,105,['출력 y = 4.8','Output y = 4.8'],['상태를 읽은 결과','Readout from the state'],'blue');return[a,b];}
} satisfies FigureSpec;
