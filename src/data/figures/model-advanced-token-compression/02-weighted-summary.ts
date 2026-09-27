import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-token-compression',figureId:'02-weighted-summary',number:'ma-06-02',
  eyebrow:['그림 2 · 요약 값의 계산','Figure 2 · Form a summary'],
  title:['여러 위치의 정보를 성분별로 합칩니다','Combine information across positions for each component'],
  subtitle:['행 = 토큰 위치 · 열 = 벡터 성분 · 투영 행렬과 숫자는 교육용 예시','Rows = token positions · Columns = components · Toy projection matrices and values'],
  captionIn:'article',caption:['위치별 학습 점수에 위치 축 softmax를 적용하면 각 성분에서 가중치의 합이 1이 됩니다. 두 입력을 성분별 가중합하여 c0 = [1.5, 3]을 만듭니다. c0는 본 attention이 읽는 새 항목입니다. DeepSeek-V4의 겹치는 두 block, 위치 bias와 후속 정규화·위치 처리는 생략했으며, 원래 attention과 같은 결과를 보장하는 예가 아닙니다.','Applying softmax across positions to learned scores makes each component’s weights sum to 1. Component-wise weighted sums of two inputs form c0 = [1.5, 3], a new entry read by core attention. DeepSeek-V4’s overlapping blocks, positional biases, and subsequent normalization and position processing are omitted. This example does not guarantee equivalence to attention over the original entries.'],
  alt:['입력 H=[[1,0],[0,1]]을 내용 행렬 Wᵤ=[[2,0],[0,4]]와 점수 행렬 Wₛ=[[ln3,0],[0,ln3]]로 각각 투영한다. 내용 U=[[2,0],[0,4]], 점수 S=[[ln3,0],[0,ln3]]을 얻고 점수의 각 열에 위치 방향 softmax를 적용해 가중치 A=[[.75,.25],[.25,.75]]를 얻는다. U와 A를 성분별로 곱한 뒤 위치 방향으로 합하면 요약 c₀=[1.5,3]이다. 모든 숫자와 투영 행렬은 교육용 예시다.','Input H=[[1,0],[0,1]] is projected with content matrix Wᵤ=[[2,0],[0,4]] and score matrix Wₛ=[[ln3,0],[0,ln3]]. Content U=[[2,0],[0,4]] and scores S=[[ln3,0],[0,ln3]] result. Column-wise softmax over positions gives weights A=[[.75,.25],[.25,.75]]. Multiply U and A elementwise and sum across positions to form c₀=[1.5,3]. All numbers and projection matrices are illustrative.'],
  sources:[{label:'DeepSeek-V4 §2.3, component-wise compression weights and row-axis softmax',url:'https://arxiv.org/html/2606.19348v1'}],
  panels(locale:Locale){
    const p=new Panel(locale,['① 같은 입력에서 두 경로로 투영','① Project the same input along two paths'],1260);
    p.text(260,120,['두 위치의 입력 벡터 H','Input vectors H at two positions'],{size:25,weight:600,anchor:'middle',width:510});
    matrix(p,175,160,[[1,0],[0,1]],{cellWidth:78,cellHeight:52,gap:10,size:25,tone:'gray',rowLabels:['h₀','h₁']});
    p.path('M260 290 V320 H130 V350',C.teal,2.5,false,true);
    p.path('M260 320 H390 V350',C.purple,2.5,false,true);
    p.text(130,390,['내용 투영 H Wᵤ','Content: H Wᵤ'],{size:24,weight:600,color:C.teal,anchor:'middle',width:235});
    p.text(390,390,['점수 투영 H Wₛ','Scores: H Wₛ'],{size:24,weight:600,color:C.purple,anchor:'middle',width:235});
    p.text(260,443,['학습되는 투영 행렬 · 아래는 예시 값','Learned projection matrices · Toy values'],{size:23,anchor:'middle',width:510});
    p.text(130,492,'Wᵤ',{size:25,weight:600,color:C.teal,anchor:'middle',width:200});
    p.text(390,492,'Wₛ',{size:25,weight:600,color:C.purple,anchor:'middle',width:200});
    matrix(p,44,517,[[2,0],[0,4]],{cellWidth:80,cellHeight:50,gap:10,size:25,tone:'teal'});
    matrix(p,304,517,[['ln 3',0],[0,'ln 3']],{cellWidth:80,cellHeight:50,gap:10,size:25,tone:'purple'});
    p.arrow(130,647,130,692,C.teal);p.arrow(390,647,390,692,C.purple);
    p.text(130,733,['내용 U = H Wᵤ','Content U = H Wᵤ'],{size:23,weight:600,color:C.teal,anchor:'middle',width:240});
    p.text(390,733,['점수 S = H Wₛ','Scores S = H Wₛ'],{size:23,weight:600,color:C.purple,anchor:'middle',width:240});
    matrix(p,44,760,[[2,0],[0,4]],{cellWidth:80,cellHeight:50,gap:10,size:25,tone:'teal'});
    matrix(p,304,760,[['ln 3',0],[0,'ln 3']],{cellWidth:80,cellHeight:50,gap:10,size:25,tone:'purple'});
    p.text(130,915,['행: 위치 0, 1','Rows: positions 0, 1'],{size:22,color:C.teal,anchor:'middle',width:235});
    p.arrow(390,887,390,935,C.purple);
    p.text(390,976,['열마다 위치 축 softmax','Softmax over positions in each column'],{size:23,color:C.purple,anchor:'middle',width:240});
    matrix(p,304,1055,[['0.75','0.25'],['0.25','0.75']],{cellWidth:80,cellHeight:50,gap:10,size:25,tone:'orange'});
    p.text(390,1205,['가중치 A','Weights A'],{size:23,weight:600,color:C.orange,anchor:'middle',width:240});

    const q=new Panel(locale,['② 가중치를 곱하고 위치 방향으로 합산','② Weight and sum across positions'],1260);
    q.text(130,125,['내용 U','Content U'],{size:25,weight:600,color:C.teal,anchor:'middle',width:230});
    q.text(390,125,['가중치 A','Weights A'],{size:25,weight:600,color:C.orange,anchor:'middle',width:230});
    matrix(q,44,165,[[2,0],[0,4]],{cellWidth:80,cellHeight:54,gap:10,size:25,tone:'teal'});
    matrix(q,304,165,[['0.75','0.25'],['0.25','0.75']],{cellWidth:80,cellHeight:54,gap:10,size:25,tone:'orange'});
    q.path('M130 300 V343 H225 V385',C.teal,2.5,false,true);
    q.path('M390 300 V343 H295 V385',C.orange,2.5,false,true);
    q.token(95,405,['대응하는 성분끼리 곱하기','Elementwise multiply'],330,'orange',85);
    q.arrow(260,508,260,560,C.orange);
    matrix(q,175,603,[['1.5',0],[0,3]],{cellWidth:78,cellHeight:54,gap:10,size:25,tone:'orange',rowLabels:['p₀','p₁'],columnLabels:[['성분 1','C1'],['성분 2','C2']]});
    q.arrow(260,742,260,790,C.purple);
    q.token(95,810,['위치 방향으로 합산 ↓','Sum across positions ↓'],330,'purple',65);
    q.text(260,931,'[1.5 + 0, 0 + 3]',{size:27,anchor:'middle',width:490});
    q.arrow(260,961,260,1005,C.purple);
    q.text(105,1067,'c₀ =',{size:28,weight:600,color:C.purple,anchor:'end',width:100});
    matrix(q,175,1025,[['1.5',3]],{cellWidth:78,cellHeight:58,gap:10,size:28,tone:'purple'});
    q.text(260,1160,['두 위치 → 요약 벡터 하나','Two positions → one summary vector'],{size:25,weight:600,color:C.purple,anchor:'middle',width:500});
    return [p,q];
  },
} satisfies FigureSpec;
