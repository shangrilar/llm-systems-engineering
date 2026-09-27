import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-delta-rule',figureId:'00-write-and-read',number:'ma-09-00',eyebrow:['그림 1','Figure 1'],
 title:['KV로 기록하고 Query로 읽기','Write with KV, read with a Query'],
 subtitle:['한 층 · 한 head · 현재 토큰 p₂','One layer · One head · Current token p₂'],captionIn:'article',
 caption:['Key와 Value는 상태에 기록할 관계를 정한다. Query는 갱신된 상태에서 출력에 쓸 정보를 읽는다. 같은 Key로 기록을 확인하는 것과 실제 Query로 출력을 만드는 것은 다른 역할이다.','Key and Value define the association to write. The Query reads the updated state for the output. Checking an association with its Key and computing the output with the Query serve different roles.'],
 alt:['왼쪽 현재 토큰 p₂에서 Key와 Value를 만들고 기존 상태 S₂를 S₃로 갱신한다. Key는 연결할 단서, Value는 기록할 내용이다. 오른쪽 같은 토큰의 Query로 갱신된 상태 S₃를 읽어 출력을 계산한다. 출력은 기록하려는 Value와 구별한다.','Left: the Key and Value from p₂ update S₂ into S₃. The Key is a retrieval cue and the Value is the content to write. Right: the Query from the same token reads S₃ to compute the output, distinct from the Value being written.'],
 sources:[{label:'DeltaNet §2.2',url:'https://arxiv.org/html/2406.06484v1#S2.SS2'}],
 panels(locale:Locale){
 const a=new Panel(locale,['1. Key에 Value 연결하기','1. Associate a Value with a Key'],780);
 a.token(200,95,'p₂',120,'gray',60);a.line(260,165,260,190,C.muted,2);a.line(120,190,400,190,C.muted,2);a.arrow(120,190,120,225,C.blue);a.arrow(400,190,400,225,C.orange);
 a.token(20,240,'Key k₂',200,'blue',60);a.token(300,240,'Value v₂',200,'orange',60);
 a.text(120,347,['연결할 단서','Retrieval cue'],{size:23,anchor:'middle',width:220,color:C.blue});a.text(400,347,['기록할 내용','Content to write'],{size:23,anchor:'middle',width:220,color:C.orange});
 a.line(120,365,120,390,C.blue,2);a.line(120,390,230,390,C.blue,2);a.arrow(230,390,230,438,C.blue);
 a.line(400,365,400,412,C.orange,2);a.line(290,412,400,412,C.orange,2);a.arrow(290,412,290,438,C.orange);
 a.token(175,450,['상태 갱신','Update'],170,'purple',85);
 a.text(65,448,['기존 상태','Old state'],{size:21,anchor:'middle',width:130,color:C.teal});a.token(10,475,'S₂',110,'teal',60);a.arrow(130,505,165,505,C.teal);
 a.arrow(355,505,390,505,C.teal);a.token(400,475,'S₃',110,'teal',60);
 a.text(260,650,['기록 규칙: 누적 또는 델타','Write rule: accumulation or delta'],{size:24,anchor:'middle',width:500,color:C.purple});
 const b=new Panel(locale,['2. Query로 출력 계산하기','2. Compute output with a Query'],780);
 b.token(200,95,'p₂',120,'gray',60);b.arrow(260,170,260,225,C.blue);b.token(160,240,'Query q₂',200,'blue',60);
 b.text(260,347,['지금 읽을 단서','Current retrieval cue'],{size:23,anchor:'middle',width:480,color:C.blue});b.arrow(260,365,260,438,C.blue);
 b.text(75,435,['갱신된 상태','Updated state'],{size:21,anchor:'middle',width:150,color:C.teal});b.token(20,475,'S₃',110,'teal',60);b.arrow(140,505,190,505,C.teal);
 b.token(200,450,['상태 읽기','Read'],180,'purple',85);b.arrow(290,550,290,610,C.purple);b.token(190,625,['출력 o₂','Output o₂'],200,'teal',70);
 return[a,b];}
} satisfies FigureSpec;
