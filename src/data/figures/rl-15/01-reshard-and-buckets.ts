import {Panel,C,type FigureSpec,type Locale,type Tone} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-15',figureId:'01-reshard-and-buckets',number:'15-1',
  eyebrow:['그림 1','Figure 1'],
 title:['같은 가중치를 추론 엔진의 분할에 맞춘다','Reshard the same weights for the inference engine'],
 subtitle:['4×4 논리 텐서의 열 분할을 행 분할로 바꾸는 교육용 예입니다. 색과 숫자는 변환 전후 같은 조각을 가리킵니다.','An illustrative 4×4 logical tensor changes from column shards to row shards. Colors and numbers identify the same pieces throughout.'],
 alt:['값 1에서 16의 논리 텐서를 학습 GPU 0은 왼쪽 두 열, GPU 1은 오른쪽 두 열로 보유한다. 추론 GPU 0은 위쪽 두 행, GPU 1은 아래쪽 두 행을 보유한다. 개별 텐서 수집과 이름·형식 변환 후 여러 조각을 bucket으로 전송한다. 조건에 따라 첫 bucket 전송과 다음 bucket 준비가 겹친다.','A logical tensor with values 1 through 16 is split by columns across two training GPUs and by rows across two inference GPUs. Per-tensor gathering and format conversion prepare buckets containing multiple pieces. Preparing the next bucket may overlap transfer of the first.'],
 caption:['논리 텐서 전체를 그린 것이 한 GPU에 전체 모델을 모은다는 뜻은 아닙니다. 실제 경로는 backend별로 다르며, 양자화된 가중치는 값과 scale 등 metadata의 규약도 함께 맞춰야 합니다.','The full logical tensor shown here does not mean the whole model is materialized on one GPU. Paths depend on the backend; quantized weights also require compatible values, scales and other metadata.'],
 sources:[{label:'Miles v0.1.0',url:'https://github.com/radixark/miles/tree/v0.1.0'}],
 panels(locale:Locale){
 const p=new Panel(locale,['분할은 달라도 값은 같음','Different shards, same values'],1180);
 const matrix=(y:number,horizontal:boolean)=>{for(let r=0;r<4;r++)for(let c=0;c<4;c++){const tone:Tone=(r<2?c<2?'blue':'purple':c<2?'teal':'orange');p.rect(84+c*66,y+r*66,62,62,C[`${tone}Fill`],C[tone],3);p.text(115+c*66,y+r*66+40,String(r*4+c+1),{size:25,anchor:'middle',width:56,color:C[tone],weight:600});}if(horizontal)p.line(74,y+130,358,y+130,C.ink,3,true);else p.line(214,y-8,214,y+272,C.ink,3,true);};
 p.text(8,115,['학습 측 · 열 기준 2분할','Training · two column shards'],{size:23,weight:600});
 p.text(97,171,'GPU 0',{size:21,color:C.blue,width:115});p.text(231,171,'GPU 1',{size:21,color:C.purple,width:115});matrix(196,false);
 p.arrow(214,477,214,515,C.muted);
 p.box(38,535,442,103,['같은 16개 값 · 필요한 조각 재배치','Same 16 values · rearrange the pieces'],'','gray');
 p.arrow(214,656,214,696,C.muted);
 p.text(8,742,['추론 측 · 행 기준 2분할','Inference · two row shards'],{size:23,weight:600});matrix(782,true);
 p.text(372,851,'GPU 0',{size:21,width:130,color:C.blue});p.text(372,982,'GPU 1',{size:21,width:130,color:C.teal});
 p.text(8,1120,['점선 = GPU 사이의 shard 경계','Dashed line = shard boundary between GPUs'],{size:21,color:C.muted,width:504});
 const q=new Panel(locale,['텐서에서 전송 단위로','From tensors to transfer units'],1180);
 q.box(16,103,488,128,['① 가중치 조각 모으기','① Gather weight pieces'],['여러 학습 GPU에서 필요한 조각을 모음','Collect the required pieces from training GPUs'],'blue');
 q.arrow(260,244,260,275,C.blue);
 q.box(16,294,488,128,['② 추론 형식에 맞춤','② Convert to the inference format'],['추론 GPU에 맞게 분할과 저장 형식을 변환','Match the partitioning and storage format of inference GPUs'],'purple');
 q.arrow(260,434,260,465,C.purple);
 q.box(16,483,488,164,['③ 조각을 bucket으로 묶음','③ Pack pieces into a bucket'],['여러 텐서의 조각을 담는 전송 단위. 하나의 모델 전체와 같지 않음','A transfer unit may contain pieces from multiple tensors; it is not the whole model'],'teal');
 q.text(16,704,['조건에 따라 준비와 전송을 겹침','Preparation and transfer may overlap'],{size:23,weight:600,width:488});
 q.arrow(154,764,496,764,C.muted);q.text(412,747,['시간','Time'],{size:19,width:90});
 q.text(16,817,'Bucket 1',{size:21,width:135});q.token(154,782,['준비','Prep'],108,'purple',52);q.token(268,782,['전송','Send'],222,'teal',52);
 q.text(16,897,'Bucket 2',{size:21,width:135});q.token(268,862,['준비','Prep'],108,'purple',52);q.token(382,862,['전송','Send'],108,'teal',52);
 q.line(268,848,376,848,C.muted,2,true);q.line(268,841,268,855,C.muted);q.line(376,841,376,855,C.muted);
 q.text(16,974,['점선 구간: B1 전송 중 B2 준비 가능','Dashed interval: B2 can be prepared while B1 transfers'],{size:21,color:C.muted,width:488});
 q.text(16,1082,['막대 길이는 실측 시간이 아닙니다. 실제 중첩은 buffer·stream·전송 구현에 달려 있습니다.','Bar lengths are not measurements. Actual overlap depends on buffers, streams and transport implementation.'],{size:21,width:488});
 return [p,q];
 }
} satisfies FigureSpec;
