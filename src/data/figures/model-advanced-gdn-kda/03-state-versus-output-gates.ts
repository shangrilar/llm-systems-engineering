import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-gdn-kda',figureId:'03-state-versus-output-gates',number:'ma-10-03',eyebrow:['그림 4','Figure 4'],title:['한 토큰에서 유지와 보정을 함께 조절하기','Retention and correction for one token'],
 subtitle:['현재 토큰 p₂ · 한 head · 상태 갱신 → Query로 읽기','Current token p₂ · One head · Update state → Read with Query'],captionIn:'article',
 caption:['α와 β는 현재 입력에서 계산되어 서로 다른 단계에 사용된다. 같은 토큰의 Key와 Value로 보정하고 Query로 갱신된 상태를 읽는다.','The current input produces α and β for different steps. Its Key and Value drive correction; its Query reads the updated state.'],
 alt:['왼쪽 현재 입력 p₂에서 학습한 투영과 변환으로 유지율 α와 보정 비율 β를 계산한다. 오른쪽 기존 상태 S₂에 α를 적용한 후, 현재 Key와 Value 및 β로 델타 보정하여 S₃를 얻는다. S₃는 다음 시점으로 전달되고 현재 Query는 S₃를 읽어 출력을 만든다.','Left: learned projections and transforms of p₂ produce retention α and correction strength β. Right: apply α to S₂, then use the current Key, Value and β for delta correction. S₃ continues to the next step and is read by the current Query for the output.'],
 sources:[{label:'Gated DeltaNet §3.1',url:'https://arxiv.org/html/2412.06464v1#S3.SS1'},{label:'Kimi Linear §3',url:'https://arxiv.org/html/2510.26692v1#S3'}],
 panels(locale:Locale){
 const a=new Panel(locale,['입력에서 조절값 계산','Compute controls from the input'],800);
 a.token(180,110,'p₂',160,'blue',60);a.arrow(260,185,260,225,C.blue);a.token(55,245,['학습한 가중치로 투영','Project with learned weights'],410,'gray',70);
 a.line(260,330,260,380,C.purple,2);a.line(125,380,395,380,C.purple,2);a.arrow(125,380,125,430,C.purple);a.arrow(395,380,395,430,C.orange);
 a.token(20,450,'α',210,'purple',60);a.token(290,450,'β',210,'orange',60);
 a.text(125,565,['기존 상태 유지율','Old-state retention'],{size:25,anchor:'middle',width:235,color:C.purple});a.text(395,565,['차이 반영 비율','Correction strength'],{size:25,anchor:'middle',width:235,color:C.orange});
 a.text(125,665,['GDN: 값 하나','GDN: one value'],{size:23,anchor:'middle',width:235});a.text(125,725,['KDA: 성분별 값','KDA: per component'],{size:23,anchor:'middle',width:235});
 const b=new Panel(locale,['같은 토큰의 상태 갱신과 읽기','Update and read for the same token'],1010);
 b.token(300,110,'S₂',180,'teal',55);b.arrow(390,180,390,215,C.teal);
 b.token(300,235,['유지율 적용','Retain'],180,'purple',65);b.token(65,242,'α',130,'purple',50);b.arrow(210,267,280,267,C.purple);
 b.arrow(390,315,390,350,C.purple);b.token(300,370,'S̄',180,'teal',55);b.arrow(390,440,390,475,C.teal);
 b.token(300,495,['델타 보정','Delta correction'],180,'orange',105);b.token(65,485,'β',130,'orange',50);b.arrow(210,510,280,510,C.orange);
 b.token(25,555,'k₂',90,'blue',45);b.token(135,555,'v₂',90,'orange',45);b.line(70,610,70,630,C.blue,2);b.line(180,610,180,630,C.orange,2);b.line(70,630,260,630,C.orange,2);b.line(260,630,260,580,C.orange,2);b.arrow(260,580,285,580,C.orange);
 b.arrow(390,615,390,650,C.teal);b.token(300,670,'S₃',180,'teal',55);
 b.line(390,740,390,770,C.teal,2);b.line(170,770,390,770,C.teal,2);b.arrow(170,770,170,815,C.teal);b.arrow(390,770,390,940,C.teal);
 b.token(90,835,['상태 읽기','Read state'],180,'purple',60);b.token(5,740,'q₂',80,'blue',45);b.line(45,800,45,865,C.blue,2);b.arrow(45,865,75,865,C.blue);
 b.arrow(180,910,180,940,C.teal);b.text(180,985,['현재 출력','Current output'],{size:24,anchor:'middle',width:230,color:C.teal});b.text(390,985,['다음 시점','Next time step'],{size:24,anchor:'middle',width:220,color:C.teal});return[a,b];}
} satisfies FigureSpec;
