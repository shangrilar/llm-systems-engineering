import {Panel,C,type FigureSpec,type Label,type Tone} from '@llm-systems/viz';
export default {
 articleId:'rl-10',figureId:'01-sync-async-timeline',number:'10-1',eyebrow:['그림 1','Figure 1'],captionIn:'article',layout:'wide',
 title:['다음 경험을 만드는 동안 준비된 경험을 학습한다','Train on ready experience while generating the next'],
 subtitle:['생성·학습 GPU가 분리된 교육용 예입니다. G1·G2는 각각 학습에 필요한 완료 그룹 묶음입니다.','An illustrative schedule with separate generation and training GPUs. G1 and G2 are collections of groups needed for training.'],
 alt:['동기는 G1 생성 후 학습과 동기화를 마친 뒤 G2를 생성한다. 비동기는 G1을 학습하는 동안 G2를 생성하고 가중치 동기화 동안만 생성을 잠시 멈춘다.','Synchronous execution generates G2 after G1 training and synchronization. Asynchronous execution generates G2 during G1 training, pausing generation during weight synchronization.'],caption:['',''],
 sources:[{label:'Miles v0.1 §2.2',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale,mobile){const W=mobile?520:1120;return [false,true].map(async=>{
 const p=new Panel(locale,async?['비동기 · 생성과 학습을 겹치기','Asynchronous · overlap work']:['동기 · 생성 다음 학습','Synchronous · generate, then train'],470,W);
 const left=mobile?84:125,right=W-18,X=(t:number)=>left+(right-left)*t/11;
 p.arrow(left,115,right,115,C.muted);p.text(left,98,['시간 →','Time →'],{size:20,width:180,color:C.muted});
 p.text(8,206,['생성','Gen.'],{size:20,width:left-14,color:C.blue});p.text(8,350,['학습','Train'],{size:20,width:left-14,color:C.teal});
 const bar=(y:number,a:number,b:number,label:Label,tone:Tone)=>{p.rect(X(a),y,X(b)-X(a),64,C[`${tone}Fill`],C[tone],4);if(label)p.text((X(a)+X(b))/2,y+40,label,{size:22,weight:600,width:X(b)-X(a)-6,anchor:'middle',color:C[tone]});};
 p.line(left,242,right,242,C.line,1);p.line(left,386,right,386,C.line,1);
 bar(178,0,3,'G1','blue');bar(322,0,3,['대기','Wait'],'gray');bar(322,3,5,'G1','teal');
 if(async){bar(178,3,5,'G2','blue');bar(178,5.5,6.5,'G2','blue');bar(322,5,6.5,['대기','Wait'],'gray');bar(322,6.5,8.5,'G2','teal');p.arrow(X(3),249,X(3),306,C.blue);}
 else{bar(178,5.5,8.5,'G2','blue');bar(322,5,8.5,['대기','Wait'],'gray');bar(322,8.5,10.5,'G2','teal');p.arrow(X(3),249,X(3),306,C.blue);}
 const syncs=async?[5,8.5]:[5,10.5];for(const t of syncs){bar(178,t,t+.5,'','orange');p.line(X(t+.25),156,X(t+.25),173,C.orange,2);p.text(X(t+.25),143,'sync',{size:17,anchor:'middle',width:65,color:C.orange});}
 p.text(left,438,['주황 구간: 가중치 반영 · 생성 일시정지','Orange: apply weights · pause generation'],{size:20,width:W-left-14,color:C.orange});
 return p;});}
} satisfies FigureSpec;
