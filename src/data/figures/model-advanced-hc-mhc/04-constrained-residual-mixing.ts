import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hc-mhc',figureId:'04-constrained-residual-mixing',number:'ma-13-04',eyebrow:['그림 5','Figure 5'],
 title:['mHC는 섞는 양에 제약을 둡니다','mHC constrains how streams are mixed'],
 subtitle:['우회 혼합 H_res만 확대 · 앞 그림과 같은 교육용 행렬','Zoom into bypass H_res · Same illustrative matrix as before'],captionIn:'article',
 caption:['비음수·행 합 1은 각 출력을 입력값의 볼록 조합으로 만들며, 열 합 1은 stream 사이 합을 보존한다. mHC는 양수화와 반복 행열 정규화로 이 제약에 근접하도록 한다. 유한 반복 오차가 있으며 H_pre/F/H_post 경로와 전체 block 출력에 대한 범위 보장은 아니다.','Nonnegative unit row sums make each output a convex combination; unit column sums preserve the sum across streams. mHC approaches these constraints through positive entries and iterative row/column normalization. Finite iterations leave numerical error. These bounds do not cover H_pre/F/H_post or the full block output.'],
 alt:['[2,0]을 섞으면 [1.6,.4]가 되어 두 값 모두0~2 안에 있고 합2가 유지된다. H_res [[.8,.2],[.2,.8]]의 행·열 합은1이며 원점수에서 양수화와 반복 정규화로 만든다.','Mixing [2,0] gives [1.6,.4], both within0–2 and summing to2. H_res=[[.8,.2],[.2,.8]] has unit row and column sums, obtained from positive scores by iterative normalization.'],
 sources:[{label:'mHC §4.1–4.2',url:'https://arxiv.org/html/2512.24880v1#S4.SS2'}],
 panels(locale:Locale){
 const a=new Panel(locale,['A. 값은 섞이고, 합은 유지','A. Values mix; the sum is kept'],690);
 a.token(25,115,'[2, 0]ᵀ',185,'teal',65);a.arrow(220,148,296,148,C.teal);a.token(310,115,'[1.6, 0.4]ᵀ',190,'teal',65);
 a.text(260,230,['0.8 × 2 + 0.2 × 0 = 1.6','0.8 × 2 + 0.2 × 0 = 1.6'],{size:25,anchor:'middle',width:490});
 a.text(260,274,'0.2 × 2 + 0.8 × 0 = 0.4',{size:25,anchor:'middle',width:490});
 a.text(260,350,['각 출력은 입력 범위 안','Each output stays in the input range'],{size:23,weight:600,anchor:'middle',width:490});
 a.line(45,401,475,401,C.muted,2);for(const [v,label] of [[0,'0'],[.4,'0.4'],[1.6,'1.6'],[2,'2']] as const){const x=45+v*215;a.circle(x,401,5,C.teal,C.teal);a.text(x,444,label,{size:24,anchor:'middle',width:75});}
 a.box(40,495,440,95,['stream 사이 합 유지','Preserve the sum across streams'],'2 + 0 = 1.6 + 0.4 = 2','teal');
 a.text(260,645,['새 F 출력을 더하기 전의 성질','Before adding the fresh F output'],{size:22,anchor:'middle',width:490});
 const b=new Panel(locale,['B. 행·열의 합을 1로','B. Make row and column sums 1'],690);
 b.text(260,118,['모든 계수 ≥ 0','Every coefficient ≥ 0'],{size:24,weight:600,anchor:'middle',width:490});
 matrix(b,130,172,[[.8,.2],[.2,.8]],{cellWidth:90,cellHeight:58,gap:12,size:28,tone:'teal'});
 b.text(400,210,'= 1',{size:28,color:C.teal,width:90});b.text(400,280,'= 1',{size:28,color:C.teal,width:90});
 b.text(175,355,'1',{size:28,color:C.teal,anchor:'middle',width:60});b.text(277,355,'1',{size:28,color:C.teal,anchor:'middle',width:60});
 b.text(398,355,['열 합','Column sums'],{size:21,width:115});
 b.text(260,408,['행 합: 범위 유지 · 열 합: 합 유지','Rows: bound values · Columns: keep sum'],{size:22,anchor:'middle',width:500});
 b.box(35,461,450,133,['계수를 만드는 과정','How coefficients are formed'],['원점수 → 양수화 → 행·열 정규화 반복','Scores → positive entries → repeated row/column normalization'],'blue');
 b.text(260,645,['읽기와 쓰기는 별도 gate','Read and write have separate gates'],{size:22,anchor:'middle',width:490});
 return [a,b];
 }
} satisfies FigureSpec;
