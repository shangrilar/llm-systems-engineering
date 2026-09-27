import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-10',figureId:'03-staleness-lifecycle',number:'10-3',eyebrow:['그림 3','Figure 3'],captionIn:'article',
 title:['경험은 생성 중에도, 버퍼에서도 오래된다','Experience ages during generation and in the buffer'],
 subtitle:['한 경험의 생성 버전과 현재 배포 버전을 따라가는 교육용 예입니다.','An illustrative trace of generation versions and the current published rollout version.'],
 alt:['v3으로 생성을 시작하고 sync 후 v4로 이어 생성한다. 완료할 때 가장 오래된 생성 버전 v3과 현재 v4의 차이는 1이다. 버퍼 대기 중 v5가 배포되면 꺼낼 때 차이는 2가 된다.','Generation starts with v3 and resumes with v4 after synchronization. At completion the oldest generation version v3 lags current v4 by one. After v5 is published during buffer waiting, the gap at dequeue is two.'],caption:['',''],
 sources:[{label:'Miles v0.1 §2.2',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale){
 const p=new Panel(locale,['① 생성이 길어지는 동안','① While generation is running'],730);
 p.box(16,110,488,90,['생성 시작 · v3','Start generation · v3'],['앞부분 토큰을 생성','Generate the initial tokens'],'blue');
 p.arrow(260,207,260,242,C.blue);
 p.box(16,252,488,92,['weight sync · v3 → v4','Weight sync · v3 → v4'],['생성을 잠시 멈추고 새 가중치 반영','Pause generation and apply new weights'],'orange');
 p.arrow(260,351,260,386,C.orange);
 p.box(16,396,488,90,['이어 생성 · v4','Resume generation · v4'],['앞부분 기록 유지 + 새 토큰 생성','Keep the prefix and generate new tokens'],'blue');
 p.arrow(260,493,260,528,C.blue);
 p.rect(16,538,488,166,C.purpleFill,C.purple,12);
 p.text(32,572,['생성 완료','Generation complete'],{size:24,weight:600,color:C.purple,width:450});
 p.text(32,618,['가장 오래된 생성 버전: v3','Oldest generation version: v3'],{size:22,width:450});
 p.text(32,668,['현재 v4 − 가장 오래된 v3 = 1','Current v4 − oldest v3 = 1'],{size:25,weight:600,width:450,color:C.purple});
 const q=new Panel(locale,['② 버퍼에서 기다리는 동안','② While waiting in the buffer'],730);
 q.rect(16,110,488,206,C.grayFill,C.line,12);
 q.text(32,146,['완료 경험 · 버퍼 대기','Completed experience · queued'],{size:24,weight:600,width:450});
 q.box(36,171,448,120,['생성 기록: v3 + v4','Generation history: v3 + v4'],['가장 오래된 버전 v3 유지','Oldest version stays v3'],'blue');
 q.arrow(260,323,260,358,C.gray);
 q.box(16,368,488,94,['weight sync · v4 → v5','Weight sync · v4 → v5'],['버퍼의 생성 기록은 바뀌지 않음','Stored generation history is unchanged'],'orange');
 q.arrow(260,469,260,528,C.orange);
 q.rect(16,538,488,166,C.purpleFill,C.purple,12);
 q.text(32,572,['학습용으로 꺼낼 때','When dequeuing for training'],{size:24,weight:600,color:C.purple,width:450});
 q.text(32,618,['가장 오래된 생성 버전: v3','Oldest generation version: v3'],{size:22,width:450});
 q.text(32,668,['현재 v5 − 가장 오래된 v3 = 2','Current v5 − oldest v3 = 2'],{size:25,weight:600,width:450,color:C.purple});
 return [p,q];}
} satisfies FigureSpec;
