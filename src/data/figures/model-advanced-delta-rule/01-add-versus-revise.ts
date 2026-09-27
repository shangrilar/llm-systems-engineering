import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-delta-rule',figureId:'01-add-versus-revise',number:'ma-09-01',eyebrow:['그림 2','Figure 2'],
 title:['더해 둘까, 연결을 고칠까?','Add a contribution or revise the association?'],
 subtitle:['같은 S₂와 새 KV · 단위 Key k₂=[1,0] · 델타 β=1','Same S₂ and new KV · Unit Key k₂=[1,0] · Delta β=1'],captionIn:'article',
 caption:['같은 상태에서 출발하는 두 저장 규칙을 비교한다. 같은 Key로 읽은 값은 누적에서 [3,1], 델타 규칙에서 [1,1]이다. 이는 기록 결과의 확인이며 실제 Query로 계산하는 출력과 구별한다.','Compare two write rules from the same state. The same Key reads [3,1] after accumulation and [1,1] after the delta update. These readouts check the association; they are distinct from the output computed with the actual Query.'],
 alt:['두 패널 모두 기존 S₂에서 같은 Key로 [2,0]을 읽고 새 Value [1,1]을 받는다. 왼쪽은 새 기여를 더해 같은 Key로 [3,1]을 읽는다. 오른쪽은 새 내용 쪽으로 연결을 수정해 같은 Key로 [1,1]을 읽는다.','Both panels start with readout [2,0] from S₂ under the same Key and receive new Value [1,1]. Accumulation adds the contribution and reads [3,1]. Delta revises the association toward the new content and reads [1,1].'],
 sources:[{label:'DeltaNet §2.2',url:'https://arxiv.org/html/2406.06484v1#S2.SS2'}],
 panels(locale:Locale){return [false,true].map(delta=>{const p=new Panel(locale,delta?['델타 규칙','Delta rule']:['단순 누적','Additive rule'],800);
 p.text(260,120,['기존 상태에서 Key로 읽은 값','Read with the Key before update'],{size:24,anchor:'middle',width:500,color:C.teal});matrix(p,165,155,[[2,0]],{cellWidth:85,cellHeight:65,gap:10,size:30,tone:'teal'});
 p.text(260,280,['새로 기록할 Value','New Value to write'],{size:24,anchor:'middle',width:500,color:C.orange});matrix(p,165,315,[[1,1]],{cellWidth:85,cellHeight:65,gap:10,size:30,tone:'orange'});
 p.arrow(260,400,260,435,C.orange);
 p.token(60,450,delta?['새 내용 쪽으로 연결 수정','Revise toward new content']:['새 기여를 더하기','Add the new contribution'],400,'purple',70);
 p.arrow(260,535,260,565,C.purple);
 p.text(260,615,['같은 Key로 기록 결과 확인','Check the write with the same Key'],{size:23,anchor:'middle',width:500,color:C.blue});matrix(p,165,650,[delta?[1,1]:[3,1]],{cellWidth:85,cellHeight:65,gap:10,size:30,tone:'teal'});
 return p;});}
} satisfies FigureSpec;
