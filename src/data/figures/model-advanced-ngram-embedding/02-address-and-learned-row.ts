import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-ngram-embedding',figureId:'02-address-and-learned-row',number:'ma-19-04',layout:'wide',
  eyebrow:['그림 4 · 주소와 벡터','Figure 4 · Address and vector'],
  title:['주소를 계산한 뒤 그 행의 학습된 벡터를 읽습니다','Compute an address, then read the learned vector in that row'],
  subtitle:['교육용 hash h₁(u,v) = (3u + v) mod 7 · Table 1: 7행 × 2성분','Toy hash h₁(u,v) = (3u + v) mod 7 · Table 1: 7 rows × 2 components'],
  captionIn:'article',caption:['[A,B]=[2,5]에서 3×2+5=11이고, 11을 7로 나눈 나머지 4가 조회할 행 번호입니다. Table 1의 row 4에 학습된 벡터 [0.2,0.8]을 읽습니다. 다른 묶음 [5,1]과 [1,4]의 주소는 각각 2와 0입니다. Hash 함수는 정해진 주소 연산이고, 표의 벡터는 학습되는 parameter입니다. 선택하지 않은 행의 E_i[0], E_i[1]은 알려지지 않은 값을 가리키는 기호이며 0이라는 뜻이 아닙니다. 이 식과 수치는 교육용으로 만들었고 실제 Qwen hash 구현이나 학습 결과가 아닙니다.','For [A,B]=[2,5], 3×2+5=11; the remainder of 11 divided by 7 is row address 4. Read the learned vector [0.2,0.8] from row 4 of Table 1. Groups [5,1] and [1,4] map to rows 2 and 0. The hash is a fixed addressing operation; table vectors are learned parameters. E_i[0] and E_i[1] denote unspecified values in unselected rows, not zeros. The formula and numbers are constructed for teaching and are not Qwen’s actual hash implementation or learned values.'],
  alt:['입력 [2,5]가 h1 계산 11 mod7을 거쳐 주소4가 되고 일곱 행의 표에서 row4의 0.2,0.8을 읽는다. 표의 다른 행은 기호다. 추가 계산 [5,1]은16 mod7=2,[1,4]는7 mod7=0이다.','Input [2,5] becomes address 4 via h1, 11 mod7. Row 4 of a seven-row table contains 0.2,0.8; other rows contain symbolic values. Additional calculations give [5,1]→16 mod7=2 and [1,4]→7 mod7=0.'],
  sources:[{label:'Qwen3.8-Next §2.3, deterministic n-gram addressing',url:'https://arxiv.org/html/2608.30320v1#S2.SS3'}],
  panels(locale:Locale,mobile?:boolean){
    const p=new Panel(locale,['주소에서 벡터로','From address to vector'],mobile?1625:1000,mobile?520:1104);
    p.token(110,125,'[A, B] = [2, 5]',300,'blue',68);p.arrow(260,203,260,240,C.blue);
    p.box(60,250,400,143,'h₁ = (3u + v) mod 7','3 × 2 + 5 = 11\n11 mod 7 = 4','gray');
    p.arrow(260,403,260,440,C.orange);p.token(160,450,'4',200,'orange',70);
    p.text(260,584,['주소: 정해진 연산의 결과','Address: a fixed computation'],{size:24,weight:600,color:C.orange,anchor:'middle',width:500});
    p.box(20,644,480,150,['같은 식으로 다른 묶음도 계산','Apply the same rule to other groups'],'[5, 1] → 16 mod 7 = 2\n[1, 4] → 7 mod 7 = 0','gray');
    const tx=mobile?140:760,ty=mobile?920:250;
    p.text(tx+104,ty-56,'Table 1 · [7×2]',{size:26,weight:600,color:C.teal,anchor:'middle',width:320});
    const values=Array.from({length:7},(_,i)=>i===4?[0.2,0.8]:[`E_${i}[0]`,`E_${i}[1]`]);
    matrix(p,tx,ty,values,{cellWidth:100,cellHeight:56,gap:8,size:24,rowLabels:['0','1','2','3','4','5','6'],rowLabelWidth:60,tone:r=>r===4?'orange':'teal'});
    const ry=ty+4*64+28;
    p.rect(tx-5,ty+4*64-5,218,66,'none',C.orange,10);
    if(mobile)p.path(`M370 485 H514 V${ry} H${tx+223}`,C.orange,2.5,false,true);
    else p.path(`M370 485 H660 V${ry} H${tx-55}`,C.orange,2.5,false,true);
    p.text(tx+104,ty+500,['벡터: 학습되는 parameter','Vector: learned parameters'],{size:24,weight:600,color:C.teal,anchor:'middle',width:440});
    p.token(mobile?80:650,mobile?1490:850,'m_B = [0.2, 0.8]',360,'teal',76);
    return [p];
  },
} satisfies FigureSpec;
