import {Panel,C,grid,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-vision-encoder',figureId:'02-patch-projection',number:'ma-21-02',
  eyebrow:['그림 2 · Patch Projection','Figure 2 · Patch projection'],
  title:['Patch의 픽셀을 펼쳐 벡터 하나로 바꿉니다','Flatten each patch and project it into one vector'],
  subtitle:['같은 4×4 RGB 이미지 · 2×2 patch 네 개 · 2×2×3 → 12 → 4','Same 4×4 RGB image · Four 2×2 patches · 2×2×3 → 12 → 4'],
  captionIn:'article',caption:['각 2×2 patch는 네 픽셀×세 채널=12개 숫자입니다. A의 픽셀을 행 우선으로 p0=(0,0), p1=(0,1), p2=(1,0), p3=(1,1) 순서로 읽고 각 픽셀 안에서는 RGB 순서로 펼칩니다. A의 x[0:3],x[3:6],x[6:9],x[9:12]는 한 벡터를 보기 쉽게 네 줄로 나눈 것이며 구간 끝은 포함하지 않습니다. 열벡터 x[12]에 모든 patch가 공유하는 W_patch[4×12]를 곱하면 4성분 벡터가 됩니다. 여기서는 평균 R,G,B와 전체 RGB 평균을 출력하는 교육용 W를 사용합니다. 네 출력은 표와 같으며 실제 학습된 projection이 색 평균만 계산하는 것은 아닙니다. 16개 word ID를 만드는 과정이 아니라 네 개의 연속 벡터를 만드는 과정입니다.','Each 2×2 patch contains four pixels × three channels = 12 numbers. A is flattened in row-major pixel order p0=(0,0), p1=(0,1), p2=(1,0), p3=(1,1), with RGB order inside each pixel. The slices x[0:3],x[3:6],x[6:9],x[9:12] display one vector across four lines; slice ends are exclusive. Multiplying column vector x[12] by W_patch[4×12], shared across all patches, produces a four-component vector. The toy W here computes mean R,G,B and the overall RGB mean, giving the four displayed outputs. A learned projection need not compute color averages. This creates four continuous vectors, not sixteen word IDs.'],
  alt:['같은 4×4 이미지를 A,B,C,D의 2×2 patch로 나눈다. A의 네 빨간 픽셀을 행 우선, RGB 순서로 펼쳐 [1,0,0] 네 묶음의 x_A[12]를 만든다. 공유 W_patch[4×12]를 곱하면 A=[1,0,0,1/3], B=[0,1,0,1/3], C=[0,0,1,1/3], D=[1,1,1,1]이다. W의 채널 평균 행은 해당 채널 네 자리에 1/4, 마지막 행은 모든 자리에 1/12를 둔다.','The same 4×4 image is split into 2×2 patches A,B,C,D. Flattening A’s four red pixels in row-major pixel order and RGB order creates x_A[12], four groups of [1,0,0]. Shared W_patch[4×12] produces A=[1,0,0,1/3], B=[0,1,0,1/3], C=[0,0,1,1/3], D=[1,1,1,1]. Each channel-mean row of W uses 1/4 at that channel’s four positions; the final row uses 1/12 everywhere.'],
  sources:[{label:'Vision Transformer §3.1, Eq. 1; toy projection designed for this figure',url:'https://arxiv.org/html/2010.11929v2#S3.SS1'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. Patch A를 12성분으로','A. Patch A into 12 components'],1500);
    const palette=['#ff0000','#00ff00','#0000ff','#ffffff'];
    const g=grid(a,100,140,4,4,{cell:70,gap:12,fill:(r,c)=>palette[Math.floor(r/2)*2+Math.floor(c/2)]});
    for(let r=0;r<4;r++)for(let c=0;c<4;c++){
      const i=Math.floor(r/2)*2+Math.floor(c/2);
      a.text(g.cellX(c)+35,g.cellY(r)+44,'ABCD'[i],{size:25,weight:600,anchor:'middle',width:60,color:i===2?'#ffffff':'#111111'});
    }
    for(let r=0;r<2;r++)for(let c=0;c<2;c++)g.outline(2*r,2*c,2*r+1,2*c+1,r===0&&c===0?'orange':'gray',4);
    a.path('M86 215 H40 V580 H95',C.orange,2.5,false,true);
    a.text(270,525,'x_A [12]',{size:26,weight:600,anchor:'middle',width:350,color:C.orange});
    a.text(270,575,['한 벡터를 네 묶음으로 표시','One vector shown as four groups'],{size:22,anchor:'middle',width:420});
    for(let i=0;i<4;i++){
      const y=650+i*110;
      a.text(145,y+35,`x[${3*i}:${3*i+3}]`,{size:23,anchor:'end',width:145});
      matrix(a,180,y,[[1,0,0]],{cellWidth:85,cellHeight:55,gap:7,size:24,tone:'orange',...(i===0?{columnLabels:['R','G','B']}: {})});
    }
    a.box(20,1140,480,235,['정해 둔 펼침 순서','A defined flattening order'],['픽셀: (0,0) → (0,1) → (1,0) → (1,1)\n픽셀 안: R → G → B\n네 묶음을 이어 붙여 12성분','Pixels: (0,0) → (0,1) → (1,0) → (1,1)\nWithin each pixel: R → G → B\nConcatenate four groups into 12 components'],'gray');
    const b=new Panel(locale,['B. 같은 W로 네 Patch 변환','B. Project every patch with W'],1500);
    b.token(60,110,'x_patch [12]',400,'orange',70);b.arrow(260,190,260,240,C.orange);
    b.box(20,250,480,160,'W_patch [4×12]',['공유: A, B, C, D 모두 같은 W','Shared: the same W for A, B, C and D'],'blue');
    b.arrow(260,420,260,470,C.blue);b.token(60,480,['출력 4성분','4 output components'],400,'blue',70);
    b.text(280,635,['패치별 투영 결과','Projected vector for each patch'],{size:23,weight:600,anchor:'middle',width:450});
    matrix(b,90,725,[[1,0,0,'1/3'],[0,1,0,'1/3'],[0,0,1,'1/3'],[1,1,1,1]],{cellWidth:95,cellHeight:65,gap:7,size:25,tone:'blue',rowLabels:['A','B','C','D'],columnLabels:['R','G','B','RGB']});
    b.text(260,1090,['4 patch → 4개 연속 벡터','4 patches → 4 continuous vectors'],{size:24,weight:600,anchor:'middle',width:510,color:C.blue});
    b.box(20,1170,480,265,['이 예시의 W 계수','Weights in this toy W'],['1~3행: 해당 채널 네 자리에 1/4\n그 밖의 자리는 0\n4행: 12자리 모두 1/12\n실제 학습 W는 일반적인 projection','Rows 1–3: 1/4 at four matching channel positions; 0 elsewhere\nRow 4: 1/12 at all 12 positions\nLearned W is a general projection'],'gray');
    return [a,b];
  },
} satisfies FigureSpec;
