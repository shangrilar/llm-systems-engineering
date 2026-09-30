import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-vision-encoder',figureId:'03-patches-and-position',number:'ma-21-03',
  eyebrow:['그림 3 · 벡터와 공간 위치','Figure 3 · Vectors and position'],
  title:['펼친 벡터에 원래 위치 정보를 함께 전달합니다','Carry the original position with each flattened vector'],
  subtitle:['대표 ViT: patch embedding + 학습된 1D position embedding · 각 벡터 4성분인 예시','Representative ViT: patch embedding + learned 1D position embedding · Toy four-component vectors'],
  captionIn:'article',caption:['A/B/C/D는 앞 그림의 네 patch입니다. Class token과 그 위치는 생략하고 네 patch에만 p0~p3 이름을 붙였습니다. 행 우선 순서로 펼치면 원래 patch 좌표와 index 0,1,2,3이 대응합니다. 원래 ViT는 각 index에 학습된 1D position embedding p_i를 더합니다. 그림의 (행,열) 좌표는 독자가 공간 대응을 추적하기 위한 주석이며 모델에 2D 좌표를 직접 넣는다는 뜻은 아닙니다. B 아래는 행 순서를 [A,C,B,D]로 바꾸어 표시할 때도 A↔p0,C↔p2,B↔p1,D↔p3의 대응을 유지한 예시입니다. 이를 새 순번대로 위치를 다시 붙여도 된다는 의미로 읽으면 안 됩니다. 실제 입력은 모델의 정해진 위치 규약을 따릅니다. 2D RoPE처럼 Attention 안에 위치를 반영하는 다른 방식도 있으며 여기서는 덧셈 방식만 펼칩니다.','A/B/C/D are the four patches from the preceding figure. The class token and its position are omitted; p0–p3 name only these four patches. Row-major flattening maps their original patch coordinates to indices 0,1,2,3. Original ViT adds a learned 1D position embedding p_i for each index. The (row,column) coordinates here annotate the spatial correspondence for the reader; they do not imply direct 2D coordinate input. The lower part of B illustrates a reordered display [A,C,B,D] while retaining A↔p0,C↔p2,B↔p1,D↔p3. It does not mean positions can be reassigned by the new list order. Actual inputs follow the model’s positional convention. Alternatives such as 2D RoPE encode position inside attention; this figure expands only additive embeddings.'],
  alt:['2×2 patch 지도에서 A(0,0),B(0,1),C(1,0),D(1,1)를 행 우선 index 0,1,2,3에 대응시킨다. e_A[4]+p0[4]=u_A[4]와 같은 덧셈을 네 patch에 적용한다. 표시 순서를 A,C,B,D로 바꾼 예시에도 위치 대응은 p0,p2,p1,p3으로 유지된다. 좌표는 독자용 주석이며 원래 ViT는 학습된 1D position embedding을 쓴다.','A 2×2 patch map links A(0,0),B(0,1),C(1,0),D(1,1) to row-major indices 0,1,2,3. Each patch receives an addition such as e_A[4]+p0[4]=u_A[4]. A reordered display A,C,B,D retains positions p0,p2,p1,p3. Coordinates annotate the diagram; original ViT uses learned 1D position embeddings.'],
  sources:[{label:'Vision Transformer §3.1, Eq. 1 and 1D position embeddings',url:'https://arxiv.org/html/2010.11929v2#S3.SS1'},{label:'Rotary Position Embedding for Vision Transformer',url:'https://arxiv.org/abs/2403.13298'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. 공간에서 순번으로','A. From space to sequence index'],1440);
    const colors=['#ff0000','#00ff00','#0000ff','#ffffff'];
    for(let i=0;i<4;i++){
      const x=20+(i%2)*270,y=130+Math.floor(i/2)*190;
      a.box(x,y,230,145,'ABCD'[i],`(${Math.floor(i/2)}, ${i%2})`,'gray');
      a.rect(x+160,y+18,50,50,colors[i],C.line,4);
    }
    a.arrow(260,485,260,555,C.blue);
    a.text(260,610,['행 우선 순서의 대응','Row-major correspondence'],{size:25,weight:600,anchor:'middle',width:500});
    for(let i=0;i<4;i++){
      const y=660+i*110;
      a.token(10,y,`${'ABCD'[i]} (${Math.floor(i/2)},${i%2})`,170,'blue',65);
      a.arrow(190,y+32,245,y+32,C.blue);a.token(255,y,`i=${i} → p${i} [4]`,250,'purple',65);
    }
    a.box(20,1130,480,245,['좌표는 설명용 주석','Coordinates annotate this diagram'],['원래 ViT: 학습된 1D 위치 벡터\n다른 방식: 2D RoPE\n위치 정보의 주입 방식은 모델마다 다릅니다.','Original ViT: learned 1D position vectors\nAlternative: 2D RoPE\nHow position enters depends on the model.'],'gray');
    const b=new Panel(locale,['B. 벡터와 위치를 한 쌍으로','B. Keep each vector with its position'],1440);
    b.text(260,120,['모든 e, p, u는 4성분','Every e, p and u has 4 components'],{size:23,anchor:'middle',width:510});
    for(let i=0;i<4;i++){
      const y=180+i*145;
      b.token(0,y,`e_${'ABCD'[i]}`,135,'blue',65);
      b.text(168,y+42,'+',{size:29,anchor:'middle',width:40,color:C.purple});
      b.token(200,y,`p${i}`,135,'purple',65);b.arrow(345,y+32,385,y+32,C.blue);b.token(395,y,`u_${'ABCD'[i]}`,120,'blue',65);
    }
    b.box(20,790,480,115,['표시 순서를 바꿔도 대응 유지','Preserve the pair when reordering'],['Patch와 원래 위치를 같이 이동','Move each patch with its original position'],'gray');
    for(let i=0;i<4;i++)b.token(10+i*125,955,`${'ABCD'[i]} · p${i}`,115,'purple',65);
    b.arrow(260,1030,260,1090,C.muted);
    const order=[0,2,1,3];
    order.forEach((i,j)=>b.token(10+j*125,1100,`${'ABCD'[i]} · p${i}`,115,'purple',65));
    b.text(260,1250,['행 순번만으로 공간을 대신하지 않습니다.','Sequence order alone does not replace spatial information.'],{size:24,weight:600,anchor:'middle',width:480});
    return [a,b];
  },
} satisfies FigureSpec;
