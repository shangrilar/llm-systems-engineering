import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-hc-mhc',figureId:'02-read-mix-write',number:'ma-13-02',
  eyebrow:['그림 3 · 세 연결의 계산','Figure 3 · Three mappings'],
  title:['읽고 섞고 나누어 쓰는 계수의 역할이 다릅니다','Read, mix and write coefficients have different jobs'],
  subtitle:['같은 토큰 · 두 stream · d = 2 · X의 행은 stream, 열은 특징 성분','Same token · Two streams · d = 2 · X rows are streams; columns are features'],
  captionIn:'article',caption:['X의 두 행은 x₁=[2,0], x₂=[0,2]입니다. H_pre는 두 행을 하나의 F 입력 [1.5,0.5]로 모읍니다. F 내부 계산은 생략하고 출력 u=[0.4,−0.2]를 가정합니다. 별도 경로의 H_res는 X를 섞어 B를 만들고, H_post는 u를 두 행의 쓰기 기여 W로 만듭니다. 출력은 X′=B+W입니다. 숫자는 한 실행 지점의 교육용 계수이며 실제 학습값이 아닙니다. 여기서는 쓰기 계수를 H_post[2×1]로 정의합니다. 원 논문의 행벡터 H_post를 전치한 표기입니다. H_pre나 H_post가 일반적으로 합 1이어야 한다는 뜻은 아닙니다.','The two rows of X are x₁=[2,0] and x₂=[0,2]. H_pre combines them into F input [1.5,0.5]. We omit F internals and assume output u=[0.4,−0.2]. On a separate path, H_res mixes X into B; H_post distributes u into two write rows W. The output is X′=B+W. These are illustrative coefficients at one execution point, not measured weights. Here H_post has shape [2×1], the transpose of the paper’s row-vector convention. Neither H_pre nor H_post is required in general to sum to one.'],
  alt:['첫 패널에서 H_pre .75,.25가 X [[2,0],[0,2]]를 [1.5,.5]로 읽고 F 출력 .4,−.2를 가정한다. 둘째 패널은 H_res [[.8,.2],[.2,.8]]로 같은 X를 섞어 B [[1.6,.4],[.4,1.6]]를 만든다. 첫 패널의 쓰기 계수 [1,.5] 세로벡터와 u의 곱 W [[.4,−.2],[.2,−.1]]를 B에 더해 [[2,.2],[.6,1.5]]를 얻는다.','H_pre [.75,.25] reads X=[[2,0],[0,2]] as [1.5,.5], with assumed F output [.4,−.2]. H_res=[[.8,.2],[.2,.8]] mixes the same X into B=[[1.6,.4],[.4,1.6]]. The write column [1,.5] times u gives W=[[.4,−.2],[.2,−.1]], and B+W produces [[2,.2],[.6,1.5]].'],
  sources:[{label:'mHC §3, three HC mappings; transpose convention explained in caption',url:'https://arxiv.org/html/2512.24880v1#S3'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. 읽기 → F → 쓰기 기여','A. Read → F → write contribution'],1060);
    a.text(260,118,['같은 입력 X · 행 = stream','Input X · Each row is a stream'],{size:24,weight:600,anchor:'middle',width:490});
    matrix(a,205,155,[[2,0],[0,2]],{cellWidth:90,cellHeight:52,gap:8,size:27,tone:'teal',rowLabels:['x₁','x₂'],rowLabelWidth:45});
    a.arrow(299,278,299,310,C.blue);
    a.box(55,323,410,115,['읽기 · 0.75 x₁ + 0.25 x₂','Read · 0.75 x₁ + 0.25 x₂'],'[1.5, 0.5]','blue');
    a.arrow(260,448,260,480,C.blue);
    a.box(55,492,410,112,['F · 출력 u를 가정','F · Assume output u'],'u = [0.4, −0.2]','blue');
    a.arrow(260,614,260,650,C.orange);
    a.box(55,662,410,112,['쓰기 · stream별 배율','Write · One scale per stream'],'1 × u,  0.5 × u','orange');
    a.arrow(260,784,260,817,C.orange);
    matrix(a,205,833,[[.4,'−0.2'],[.2,'−0.1']],{cellWidth:90,cellHeight:52,gap:8,size:27,tone:'orange',rowLabels:['W₁','W₂'],rowLabelWidth:50});
    a.text(260,1000,['이 기여를 우회 결과에 더합니다','Add these contributions to the bypass'],{size:23,anchor:'middle',width:480});
    const b=new Panel(locale,['B. 같은 X의 우회 경로','B. Bypass from the same X'],1060);
    b.text(260,118,['읽기와 별도로 X를 혼합','Mix X independently of the read'],{size:24,weight:600,anchor:'middle',width:490});
    b.box(35,155,450,130,'H_res X',['B₁ = 0.8 x₁ + 0.2 x₂ = [1.6, 0.4]\nB₂ = 0.2 x₁ + 0.8 x₂ = [0.4, 1.6]','B₁ = 0.8 x₁ + 0.2 x₂ = [1.6, 0.4]\nB₂ = 0.2 x₁ + 0.8 x₂ = [0.4, 1.6]'],'teal');
    b.arrow(260,295,260,336,C.teal);
    b.text(260,380,['stream별로 B + W','Add B + W per stream'],{size:25,weight:600,anchor:'middle',width:480});
    for(let i=0;i<2;i++){
      const y=425+i*250;
      b.text(20,y,`x${i===0?'₁':'₂'}′`,{size:25,weight:600,color:C.teal,width:60});
      b.token(100,y-28,i===0?'[1.6, 0.4]':'[0.4, 1.6]',160,'teal',58);
      b.text(279,y+10,'+',{size:30,anchor:'middle',width:35});
      b.token(305,y-28,i===0?'[0.4, −0.2]':'[0.2, −0.1]',195,'orange',58);
      b.arrow(260,y+45,260,y+83,C.teal);
      b.token(140,y+95,i===0?'[2, 0.2]':'[0.6, 1.5]',240,'teal',62);
    }
    b.text(260,1000,['두 경로는 같은 X에서 출발','Both paths start from the same X'],{size:23,anchor:'middle',width:480});
    return [a,b];
  },
} satisfies FigureSpec;
