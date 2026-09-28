import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-gated-residual',figureId:'01-normalize-and-read',number:'ma-15-01',
  eyebrow:['그림 2 · Branch별 정규화와 읽기','Figure 2 · Normalize and read'],
  title:['각 Branch를 정규화하고, 성분별로 읽어 평균합니다','Normalize each branch; gate components and average'],
  subtitle:['같은 토큰 · 2 branch × d = 2 · 설명용으로 줄인 구성','Same token · Two branches × d = 2 · Simplified example'],
  captionIn:'article',caption:['Qwen3.8-Flash-Next의 실제 구성은 4 branch입니다. A의 정규화는 각 branch에 따로 적용합니다. γ=1, ε를 생략한 예시에서 R₁=[2,2]와 R₂=[4,−4]는 각각 R̂₁=[1,1], R̂₂=[1,−1]이 됩니다. 원본 R을 보존하는 우회선은 앞 그림에 표시했습니다. A의 controller는 모든 정규화 branch를 보고 성분별 sigmoid gate를 만듭니다. 주어진 gate 출력 예시 G₁=[.8,.2], G₂=[.4,.6]을 적용하면 [.8,.2]와 [.4,−.6]이고, 평균하면 x=[.6,−.2]입니다. Gate를 합 1로 정규화하는 softmax는 없습니다. controller 내부 projection은 접었습니다.','Qwen3.8-Flash-Next uses four branches. A normalizes each branch separately. With γ=1 and ε omitted, R₁=[2,2] and R₂=[4,−4] become R̂₁=[1,1] and R̂₂=[1,−1]. The preceding figure shows the bypass preserving the original R values. In A, a controller sees all normalized branches and predicts componentwise sigmoid gates. Given illustrative gate outputs G₁=[.8,.2] and G₂=[.4,.6], gated vectors are [.8,.2] and [.4,−.6]; averaging yields x=[.6,−.2]. There is no softmax enforcing a unit gate sum. Internal controller projections are folded into its box.'],
  alt:['두 원본 branch [2,2]와 [4,−4]는 각자 RMSNorm을 거쳐 [1,1]과 [1,−1]이 된다. 두 정규화 벡터 모두 읽기 controller에 들어간다. 같은 정규화 값에 gate를 곱하는 경로를 별도 패널로 표시했다. 예시 gate [.8,.2]와 [.4,.6]을 성분별로 곱한 뒤 두 결과를 평균해 [.6,−.2]를 만든다.','Two branches [2,2] and [4,−4] normalize separately to [1,1] and [1,−1]. Both normalized vectors enter the read controller. Example gates [.8,.2] and [.4,.6] multiply componentwise; averaging the two gated vectors yields [.6,−.2].'],
  sources:[{label:'Qwen3.8-Flash-Next §2.2, equations 30–32',url:'https://arxiv.org/html/2608.30320v1#S2.SS2'}],
  panels(locale:Locale){
 const a=new Panel(locale,['A. 값과 gate의 두 경로','A. Separate values and gates'],800);
 for(let i=0;i<2;i++){
  const cx=130+i*260;
  a.text(cx,117,`R${i===0?'₁':'₂'}`,{size:24,weight:600,anchor:'middle',width:150});
  matrix(a,cx-78,147,[i===0?[2,2]:[4,'−4']],{cellWidth:72,cellHeight:52,gap:12,size:26,tone:'teal'});
  a.arrow(cx,209,cx,239,C.blue);a.token(cx-104,250,'RMSNorm',208,'blue',56);a.arrow(cx,316,cx,345,C.blue);
  matrix(a,cx-78,355,[i===0?[1,1]:[1,'−1']],{cellWidth:72,cellHeight:52,gap:12,size:26,tone:'blue'});
  a.text(cx,450,`R̂${i===0?'₁':'₂'}`,{size:25,color:C.blue,anchor:'middle',width:160});
  a.path(`M${cx} 465 V500 H${i===0?210:310} V535`,C.purple,2.5,false,true);
 }
 a.box(65,547,390,98,['모든 정규화 값을 함께 읽기','Read all normalized values'],['학습한 controller → sigmoid','Learned controller → sigmoid'],'purple');
 a.text(260,694,['성분별 gate G₁, G₂ → B','Component gates G₁, G₂ → B'],{size:24,weight:600,color:C.purple,anchor:'middle',width:490});
 a.text(260,751,['값 R̂₁, R̂₂도 B에서 그대로 사용','Use the same R̂₁, R̂₂ values in B'],{size:22,color:C.blue,anchor:'middle',width:490});
 const b=new Panel(locale,['B. 성분마다 다르게 읽기','B. Read each component differently'],800);
 for(let i=0;i<2;i++){
  const y=125+i*240;
  b.text(70,y,`G${i===0?'₁':'₂'}`,{size:24,color:C.purple,anchor:'middle',width:120});
  b.text(335,y,`R̂${i===0?'₁':'₂'}`,{size:24,color:C.blue,anchor:'middle',width:120});
  matrix(b,15,y+30,[i===0?[.8,.2]:[.4,.6]],{cellWidth:72,cellHeight:56,gap:10,size:27,tone:'purple'});
  b.text(218,y+69,'⊙',{size:34,anchor:'middle',width:50});
  matrix(b,295,y+30,[i===0?[1,1]:[1,'−1']],{cellWidth:72,cellHeight:56,gap:10,size:27,tone:'blue'});
  b.arrow(260,y+99,260,y+130,C.blue);
  matrix(b,178,y+141,[i===0?[.8,.2]:[.4,'−0.6']],{cellWidth:76,cellHeight:56,gap:12,size:27,tone:'blue'});
 }
 b.box(30,603,460,99,['두 결과를 더하고 2로 나누기','Sum both results and divide by 2'],'x = [0.6, −0.2]','blue');
 b.text(260,751,['gate 합을 1로 맞추지는 않음','Gates need not sum to one'],{size:22,anchor:'middle',width:490});
 return [a,b];
 },
} satisfies FigureSpec;
