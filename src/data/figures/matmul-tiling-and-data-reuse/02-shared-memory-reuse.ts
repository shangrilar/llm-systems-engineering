import {Panel,C,grid,type FigureSpec,type Locale} from '@llm-systems/viz';
// Redrawn with shared primitives (grid, outline) from the published figure 2.
export default {
  articleId:'matmul-tiling-and-data-reuse',figureId:'02-shared-memory-reuse',number:'matmul-2',
  layout:'wide',screens:['desktop'],
  eyebrow:['그림 2','Figure 2'],
  title:['계산할 출력을 고르면, 공유할 입력이 보입니다','Select outputs to find their common inputs'],
  subtitle:['출력 영역 선택 → 필요한 입력 확인 → 공유 메모리에서 함께 사용','Select outputs → Identify inputs → Reuse in shared memory'],
  alt:["더 큰 8×8 출력 C에서 왼쪽 위 4×4 영역을 한 블록이 맡는 예시다. 이에 필요한 A의 첫 네 행과 B의 첫 네 열을 찾는다. 각 행과 열의 길이는 8이다. 선택한 출력과 입력을 주황, 파랑, 보라로 구별한다. 함께 필요한 입력을 전역 메모리에서 공유 메모리로 가져오고, A의 0행에서 가져온 한 값 a를 출력 0행의 네 요소에, B의 0열에서 가져온 한 값 b를 출력 0열의 네 요소에 사용한다. 테두리는 입력을 재사용하는 출력의 행과 열을 가리킨다. 출력은 공유 메모리에 놓인 것으로 그리지 않는다. 입력을 나누어 가져오거나 부분합을 누적하는 단계는 이 그림에 넣지 않는다. 타일은 함께 계산할 직사각형 영역이다. 실제 블록 크기나 권장 타일 크기를 뜻하지 않는다.","One block owns the upper-left 4 × 4 region of a larger 8 × 8 output C. Find the first four rows of A and first four columns of B, each of length 8. Orange, blue and purple distinguish selected outputs and inputs. Bring common inputs from global to shared memory. Value a from row 0 of A serves four outputs in row 0; value b from column 0 of B serves four outputs in column 0. Outlines mark the output row and column reusing an input. Outputs are not depicted as stored in shared memory. Input chunking and partial-sum accumulation are not shown here. A tile is a rectangular region computed together, not a recommended tile or actual block size."],
  caption:["입력을 나누어 가져오거나 부분합을 누적하는 단계는 생략했습니다. 타일 크기는 권장값이 아닙니다.","Chunked loading and partial-sum accumulation are omitted; the tile size is not a recommendation."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1290,1120);
    const card=(y:number,h:number,title:readonly [string,string])=>{p.rect(8,y,1104,h,C.grayFill,C.line,12);p.text(36,y+45,title,{size:27,weight:700,width:1060});};
    card(7,330,['1. 출력에서 함께 계산할 영역을 고릅니다.','1. Select an output region to compute together.']);
    const out=grid(p,56,82,8,8,{tone:(r,c)=>r<4&&c<4?'orange':null});
    const tile=out.outline(0,0,3,3,'orange',4);
    p.line(tile.right,102,367,102,C.orange,2);
    p.text(401,119,['이 4 × 4 영역을 한 블록이 맡습니다.','One block owns this 4 × 4 region.'],{size:29,weight:700,color:C.orange,width:700});
    p.text(401,175,['타일은 함께 계산할 작은 직사각형 영역입니다.','A tile is a small rectangle computed together.'],{size:24,color:C.muted,width:700});
    p.text(401,219,['선택한 출력 16개를 만드는 데 필요한 입력을 찾아봅시다.','Find the inputs needed for these 16 outputs.'],{size:24,color:C.muted,width:700});
    p.text(out.x+out.width/2,324,['출력 C','Output C'],{size:21,weight:700,color:C.orange,anchor:'middle',width:200});

    card(372,368,['2. 선택한 출력에 필요한 A의 행과 B의 열을 찾습니다.','2. Find the rows of A and columns of B these outputs need.']);
    const a=grid(p,72,493,8,8,{cell:24,tone:r=>r<4?'blue':null});
    const b=grid(p,426,493,8,8,{cell:24,tone:(_,c)=>c<4?'purple':null});
    p.text(a.x+a.width/2,467,['A의 행 4개','4 rows of A'],{size:25,weight:700,color:C.blue,anchor:'middle',width:300});
    p.text(b.x+b.width/2,467,['B의 열 4개','4 columns of B'],{size:25,weight:700,color:C.purple,anchor:'middle',width:300});
    p.text(725,523,['같은 출력 행의 요소들은','Outputs in the same row'],{size:24,color:C.blue,width:380});
    p.text(725,559,['A의 같은 행을 사용','use the same row of A'],{size:24,color:C.blue,width:380});
    p.text(725,626,['같은 출력 열의 요소들은','Outputs in the same column'],{size:24,color:C.purple,width:380});
    p.text(725,662,['B의 같은 열을 사용','use the same column of B'],{size:24,color:C.purple,width:380});

    card(775,422,['3. 함께 필요한 입력을 공유 메모리에 가져와 사용합니다.','3. Load common inputs into shared memory for reuse.']);
    p.rect(36,862,415,273,C.paper,C.line,12);
    p.text(243,900,['공유 메모리','Shared memory'],{size:26,weight:700,anchor:'middle',width:380});
    p.rect(58,930,370,64,C.blueFill,C.line,12);
    p.text(243,970,['A의 0행에서 가져온 값 a','Value a from row 0 of A'],{size:23,weight:700,color:C.blue,anchor:'middle',width:350});
    p.rect(58,1030,370,64,C.purpleFill,C.line,12);
    p.text(243,1070,['B의 0열에서 가져온 값 b','Value b from column 0 of B'],{size:23,weight:700,color:C.purple,anchor:'middle',width:350});
    const o=grid(p,759,900,4,4,{cell:46,tone:()=>'orange'});
    const row=o.outline(0,0,0,3,'blue',5),col=o.outline(0,0,3,0,'purple',6);
    p.text(o.x+o.width/2,875,['블록이 맡은 출력','Outputs owned by the block'],{size:23,weight:700,color:C.orange,anchor:'middle',width:400});
    p.path(`M440 962 H580 V${row.y+27} H${row.x-14}`,C.blue,3,false,true);
    p.path(`M440 1062 H610 V1117 H${col.x+26} V${col.bottom+8}`,C.purple,3,false,true);
    p.text(982,997,['a는 한 행의','a: 4 outputs'],{size:19,color:C.blue,width:160});
    p.text(982,1026,['출력 4개에','in one row'],{size:19,color:C.blue,width:160});
    p.text(854,1164,['b는 한 열의 출력 4개에 사용','b: 4 outputs in one column'],{size:22,weight:700,color:C.purple,anchor:'middle',width:400});
    p.text(560,1251,['여러 출력이 함께 쓰는 입력을, 블록 안에서 공유합니다.','Share common inputs across outputs within the block.'],{size:27,weight:700,anchor:'middle',width:1100});
    return [p];
  },
} satisfies FigureSpec;
