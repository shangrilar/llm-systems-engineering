import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-10',figureId:'04-buffer-fifo-filters',number:'10-4',eyebrow:['그림 4','Figure 4'],captionIn:'article',
 title:['넣을 때 두 조건, 꺼낼 때 staleness를 확인한다','Check entry conditions, then staleness at dequeue'],
 subtitle:['Miles v0.1의 세 가지 제외 사유와 기본 FIFO 버퍼를 단순화한 예입니다.','A simplified example of Miles v0.1’s three exclusion reasons and default FIFO buffer.'],
 alt:['버퍼에 넣기 전 중단·실패와 사용자 필터를 검사한다. 통과한 완료 그룹은 B,C,A 순으로 들어왔으면 같은 순서로 꺼낸다. 현재 v5이고 허용 간격이 1이면 가장 오래된 버전 v3인 B는 제외하고 C를 검사한다.','Before insertion, reject aborted or failed groups and user-filter rejections. Accepted groups admitted in B,C,A order are dequeued in that order. With current v5 and maximum lag 1, B with oldest version v3 is excluded, then C is checked.'],caption:['',''],
 sources:[{label:'Miles v0.1 §2.2',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale){
 const p=new Panel(locale,['입구 · 완료 그룹을 받기','Entry · accept completed groups'],790);
 p.box(16,112,488,90,['그룹의 생성·평가 결과','Group generation and scoring'],['필요한 샘플 결과를 모음','Collect the required sample results'],'blue');
 p.arrow(168,210,168,252,C.blue);
 p.box(16,262,298,125,['중단·실패 확인','Check abort / failure'],['정상 완료했는가?','Completed successfully?'],'purple');
 p.arrow(319,323,359,323,C.orange);
 p.box(369,262,135,125,['① 제외','① Reject'],'','orange');
 p.arrow(168,395,168,455,C.teal);p.text(185,429,['통과','Pass'],{size:20,color:C.teal,width:125});
 p.box(16,465,298,125,['사용자 필터','User filter'],['학습에 사용할 그룹인가?','Keep this group for training?'],'purple');
 p.arrow(319,526,359,526,C.orange);
 p.box(369,465,135,125,['② 제외','② Reject'],'','orange');
 p.arrow(168,598,168,652,C.teal);p.text(185,628,['통과','Pass'],{size:20,color:C.teal,width:125});
 p.box(16,662,488,98,['완료 그룹 버퍼에 추가','Append to the completed-group buffer'],'','blue');
 const q=new Panel(locale,['출구 · 들어온 순서대로','Exit · first in, first out'],790);
 q.text(16,120,['입고 순서: B → C → A','Admission order: B → C → A'],{size:23,weight:600,width:488});
 q.text(16,160,['각 버전 = 그룹에서 가장 오래된 생성 버전','Each version is the oldest within its group'],{size:20,width:488,color:C.muted});
 [['B · v3','orange'],['C · v4','blue'],['A · v4','blue']].forEach(([label,tone],i)=>q.box(16+i*168,203,152,83,label,'',tone as 'orange'|'blue'));
 q.text(16,322,['B부터 꺼내 검사 → 다음은 C','Check B first → then C'],{size:22,width:488,color:C.blue});
 q.arrow(260,338,260,381,C.blue);
 q.box(16,391,488,131,['staleness 검사','Check staleness'],['현재 v5 · 허용 간격 1','Current v5 · maximum lag 1'],'purple');
 q.arrow(135,530,135,574,C.orange);q.arrow(385,530,385,574,C.teal);
 q.box(16,584,236,152,['B: 5 − 3 = 2','B: 5 − 3 = 2'],['③ 초과 → 제외','③ Too stale → exclude'],'orange');
 q.box(268,584,236,152,['C: 5 − 4 = 1','C: 5 − 4 = 1'],['통과 → 학습 배치','Pass → training batch'],'teal');
 return [p,q];}
} satisfies FigureSpec;
