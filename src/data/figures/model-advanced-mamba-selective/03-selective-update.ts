import {Panel,C,matrix,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mamba-selective',figureId:'03-selective-update',number:'mamba-03',eyebrow:['그림 5','Figure 5'],
 title:['계수가 바뀌면 남는 상태와 읽는 값도 달라집니다','Different coefficients change the state and its readout'],
 subtitle:['같은 이전 상태 [2, 1] · 한 채널의 입력 u = 2 · 교육용 비교','Same old state [2, 1] · Channel input u = 2 · Illustrative comparison'],captionIn:'article',
 caption:['서로 다른 전체 특징 벡터가 한 채널에서는 같은 입력2를 가지되 다른 계수를 생성한 예시다. A=diag(ln0.5,ln0.8)는 양쪽에서 같다. 공식 Mamba-1 step의 Abar=exp(Delta A),Bbar=Delta B를 사용했다. 직접항 D u와출력gate는 생략한다.','Different full feature vectors share scalar2 in the illustrated channel but generate different coefficients. Both use A=diag(ln0.5,ln0.8). Abar=exp(Delta A),Bbar=Delta B follow official Mamba-1 step. Direct D u and output gate are omitted.'],
 alt:['경우A는 Delta1,B1,0.5,C1,1에서 남긴상태1,0.8과 기록2,1을 더해3,1.8을 만들고4.8을 읽는다. 경우B는 Delta2,B0.25,0.5,C1,0에서0.5,0.64와1,2를 더해1.5,2.64를 만들고1.5를 읽는다.','CaseA uses Delta1,B=[1,0.5],C=[1,1]: retained [1,0.8] plus write [2,1] gives [3,1.8], readout4.8. CaseB uses Delta2,B=[0.25,0.5],C=[1,0]: retained [0.5,0.64] plus write [1,2] gives [1.5,2.64], readout1.5.'],
 sources:[{label:'Official Mamba-1 step · teaching values',url:'https://github.com/state-spaces/mamba/blob/v2.2.2/mamba_ssm/modules/mamba_simple.py'}],
 panels(locale:Locale){return [false,true].map(other=>{const p=new Panel(locale,other?['입력 B가 만든 계수','Coefficients from input B']:['입력 A가 만든 계수','Coefficients from input A'],1070);
 p.box(20,105,480,115,other?'Δ = 2 · B = [0.25, 0.5]':'Δ = 1 · B = [1, 0.5]',other?'C = [1, 0]':'C = [1, 1]','blue');
 p.box(20,270,230,105,['이전 상태','Old state'],'[2, 1]','teal');p.box(290,270,210,105,['현재 입력','Current input'],'u = 2','blue');p.arrow(135,385,135,420,C.purple);p.arrow(395,385,395,420,C.orange);
 p.box(20,435,230,115,'Ā',other?'× [0.25, 0.64]':'× [0.5, 0.8]','purple');p.box(290,435,210,115,'B̄ = ΔB',other?'× [0.5, 1]':'× [1, 0.5]','orange');p.arrow(135,560,135,600,C.purple);p.arrow(395,560,395,600,C.orange);
 matrix(p,20,615,[other?[.5,.64]:[1,.8]],{cellWidth:105,cellHeight:60,gap:10,tone:'purple'});matrix(p,290,615,[other?[1,2]:[2,1]],{cellWidth:100,cellHeight:60,gap:10,tone:'orange'});
 connector(p,[135,685],[230,735],{via:[[135,735]],tone:'purple'});connector(p,[395,685],[290,735],{via:[[395,735]],tone:'orange'});p.circle(260,735,22,C.paper,C.teal);p.text(260,743,'+',{size:28,anchor:'middle',width:40});p.arrow(260,770,260,805,C.teal);p.box(100,820,320,95,['새 상태','New state'],other?'[1.5, 2.64]':'[3, 1.8]','teal');p.arrow(260,925,260,955,C.purple);p.box(20,970,480,90,other?'C · [1, 0] → y = 1.5':'C · [1, 1] → y = 4.8','','blue');return p;});}
} satisfies FigureSpec;
