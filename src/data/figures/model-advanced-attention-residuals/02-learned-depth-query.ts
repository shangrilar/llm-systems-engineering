import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-attention-residuals',figureId:'02-learned-depth-query',number:'ma-14-02',
 eyebrow:['그림 3 · 깊이별 비중 계산','Figure 3 · Compute depth weights'],
 title:['점수는 정규화한 표현으로, 가중합은 원본으로 계산합니다','Score normalized sources; mix original sources'],
 subtitle:['그림 2와 같은 source · γ = 1 · ε 생략','Same sources as Figure 2 · γ = 1 · ε omitted'],
 captionIn:'article',caption:['목적지 sublayer가 가진 학습 파라미터 w와 정규화한 각 source를 내적합니다. 예시의 점수 [0, ln2, 0]을 softmax에 넣으면 [.25, .5, .25]가 됩니다. 이 비중을 정규화 전 원본에 적용하므로 결과는 [.5, 2, 1.5]입니다. w는 현재 hidden에서 Q projection으로 만든 값이 아니며, 같은 w라도 source가 달라지면 비중이 달라질 수 있습니다.','Each normalized source is dotted with learned parameter w owned by the destination sublayer. Softmax converts example scores [0, ln2, 0] into [.25, .5, .25]. Applying these weights to the original sources yields [.5, 2, 1.5]. w is not a Q projection of the current hidden state; different sources can produce different weights with the same w.'],
 alt:['원본 e=[2,0,0], f1=[0,4,0], f2=[0,0,6]을 RMSNorm으로 정규화하면 각 비영 성분은 √3이다. w=[0,ln2/√3,0]으로 점수 [0,ln2,0]을 만들고 softmax 비중 [.25,.5,.25]를 원본에 적용해 h3=[.5,2,1.5]를 얻는다.','RMSNorm maps the nonzero component of e=[2,0,0], f1=[0,4,0], f2=[0,0,6] to √3. With w=[0,ln2/√3,0], scores [0,ln2,0] yield softmax weights [.25,.5,.25]. Mixing the original sources gives h3=[.5,2,1.5].'],
 sources:[{label:'Kimi K3 §2.2, equations 8–9',url:'https://arxiv.org/html/2607.24653v1#S2.SS2'}],
 panels(locale:Locale){
 const a=new Panel(locale,['A. 점수를 만드는 경로','A. Scoring path'],790);
 a.text(260,124,['원본 source','Original sources'],{anchor:'middle',size:24,width:480});
 matrix(a,140,150,[[2,0,0],[0,4,0],[0,0,6]],{cellWidth:76,cellHeight:48,gap:8,size:24,tone:'teal',rowLabels:['e','f₁','f₂'],rowLabelWidth:60});
 a.arrow(260,328,260,383,C.blue);a.text(285,361,'RMSNorm',{size:22,width:215,color:C.blue});
 matrix(a,140,401,[['√3',0,0],[0,'√3',0],[0,0,'√3']],{cellWidth:76,cellHeight:48,gap:8,size:24,tone:'blue'});
 a.box(25,610,470,122,['목적지 층의 학습 파라미터','Learned layer parameter'],'w = [0, ln2/√3, 0]','purple');
 a.text(260,774,['점수ᵢ = wᵀ RMSNorm(sourceᵢ)','scoreᵢ = wᵀ RMSNorm(sourceᵢ)'],{anchor:'middle',size:22,width:490});
 const b=new Panel(locale,['B. 비중을 원본에 적용','B. Weight the originals'],790);
 b.text(260,124,['e, f₁, f₂의 점수','Scores for e, f₁, f₂'],{anchor:'middle',size:24,width:480});
 matrix(b,56,153,[[0,'ln2',0]],{cellWidth:128,cellHeight:60,gap:12,size:27,tone:'blue'});
 b.arrow(260,229,260,292,C.orange);b.text(286,265,'softmax',{size:23,width:190,color:C.orange});
 matrix(b,56,312,[[.25,.5,.25]],{cellWidth:128,cellHeight:60,gap:12,size:27,tone:'orange'});
 b.arrow(260,389,260,440,C.teal);
 b.box(25,457,470,125,['정규화 전 원본의 가중합','Mix original sources'],'h₃ = .25e + .5f₁ + .25f₂','teal');
 matrix(b,56,615,[[.5,2,1.5]],{cellWidth:128,cellHeight:60,gap:12,size:27,tone:'teal'});
 b.text(260,737,['같은 w라도 source에 따라 비중이 변함','Same w; weights depend on sources'],{anchor:'middle',size:22,width:480,color:C.muted});
 return [a,b];
 }
} satisfies FigureSpec;
