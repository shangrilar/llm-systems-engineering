import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-gated-residual',figureId:'02-scalar-write',number:'ma-15-02',
  eyebrow:['그림 3 · 원래 Branch에 쓰기','Figure 3 · Write to each branch'],
  title:['새 출력에 Scalar를 곱해 원래 Branch에 더합니다','Scale the new output and add to each original branch'],
  subtitle:['읽기는 성분별 gate · 쓰기는 Branch별 scalar · 앞 그림과 같은 입력','Componentwise read gates · One write scalar per branch · Same input as Figure 2'],
  captionIn:'article',caption:['A의 x=[.6,−.2]는 앞 그림의 읽기 결과입니다. F 내부는 생략하고 y=[.5,−.25]를 가정합니다. 별도 쓰기 controller는 정규화된 모든 branch를 보고 s=2σ(…)를 계산합니다. 주어진 출력 s₁=1.2, s₂=.4는 모두 0<s<2 범위 안입니다. B에서 각각의 scalar가 y의 두 성분에 똑같이 곱해집니다. 쓰기 대상은 원본 R₁=[2,2], R₂=[4,−4]이며 정규화된 R̂가 아닙니다. 결과는 [2.6,1.7], [4.2,−4.1]입니다. branch 사이를 직접 섞는 H_res 경로는 없습니다.','A uses read result x=[.6,−.2] from Figure 2. F internals are omitted and y=[.5,−.25] is assumed. A separate write controller sees all normalized branches and computes s=2σ(…). Given outputs s₁=1.2 and s₂=.4 both lie in 0<s<2. In B, each scalar multiplies both components of y equally. Writes add to original R₁=[2,2] and R₂=[4,−4], not normalized R̂. The results are [2.6,1.7] and [4.2,−4.1]. There is no direct branch-mixing H_res path.'],
  alt:['읽기 결과 x에서 F가 예시 출력 y=[.5,-.25]를 만든다. 별도 controller는 정규화한 두 branch를 모두 보고 s1=1.2,s2=.4를 낸다. 첫 branch는 원래 [2,2]에 [.6,-.3]을 더해 [2.6,1.7]이 되고 둘째는 원래 [4,-4]에 [.2,-.1]을 더해 [4.2,-4.1]이 된다.','F maps read result x to assumed output y=[.5,-.25]. A separate controller reads both normalized branches and outputs s1=1.2,s2=.4. Branch 1 adds [.6,-.3] to original [2,2], yielding [2.6,1.7]. Branch 2 adds [.2,-.1] to original [4,-4], yielding [4.2,-4.1].'],
  sources:[{label:'Qwen3.8-Flash-Next §2.2, equations 33–34',url:'https://arxiv.org/html/2608.30320v1#S2.SS2'}],
  panels(locale:Locale){
 const a=new Panel(locale,['A. 새 출력과 쓰기 계수','A. Fresh output and write scales'],830);
 a.box(15,120,230,105,['읽은 입력 x','Read input x'],'[0.6, −0.2]','blue');
 a.box(280,120,225,105,'R̂₁, R̂₂',['모든 정규화 값','All branches'],'blue');
 a.arrow(130,235,130,280,C.blue);a.arrow(393,235,393,280,C.purple);
 a.box(15,292,230,105,'F',['출력 y를 가정','Assume output y'],'blue');
 a.box(280,292,225,105,['쓰기 계수','Write scales'],'2 × sigmoid','purple');
 a.arrow(130,407,130,450,C.blue);a.arrow(393,407,393,450,C.purple);
 a.token(20,462,'y = [0.5, −0.25]',225,'blue',65);a.token(280,462,'s₁ = 1.2, s₂ = 0.4',225,'purple',65);
 a.text(260,606,['읽기: 성분마다 다른 gate','Read: a gate for each component'],{size:24,color:C.blue,anchor:'middle',width:490});
 a.text(260,653,['쓰기: stream마다 scalar 하나','Write: one scalar for each stream'],{size:24,color:C.orange,anchor:'middle',width:490});
 a.text(260,766,'0 < sᵢ < 2',{size:25,anchor:'middle',width:490});
 const b=new Panel(locale,['B. 같은 y를 원본에 더하기','B. Add the same y to each original'],830);
 b.token(150,112,'y = [0.5, −0.25]',220,'blue',60);
 b.line(260,182,260,225,C.orange);b.line(130,225,390,225,C.orange);
 for(let i=0;i<2;i++){
  const cx=130+260*i,sub=i===0?'₁':'₂';
  b.arrow(cx,225,cx,269,C.orange);b.token(cx-105,281,i===0?'× s₁ = 1.2':'× s₂ = 0.4',210,'orange',58);
  b.arrow(cx,349,cx,390,C.orange);b.token(cx-105,402,i===0?'[0.6, −0.3]':'[0.2, −0.1]',210,'orange',58);
  b.arrow(cx,470,cx,510,C.orange);
  b.token(cx-105,522,i===0?'+ [2, 2] (R₁)':'+ [4, −4] (R₂)',210,'teal',58);
  b.token(cx-105,622,i===0?'[2.6, 1.7]':'[4.2, −4.1]',210,'teal',60);b.arrow(cx,592,cx,610,C.teal);
  b.text(cx,729,`R${sub}′ = R${sub} + s${sub} y`,{size:24,weight:600,color:C.teal,anchor:'middle',width:250});
 }

 b.text(260,799,['정규화 전 원본 R에 더합니다','Add to original R, before normalization'],{size:22,anchor:'middle',width:500});
 return [a,b];
 },
} satisfies FigureSpec;
