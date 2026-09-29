import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'model-advanced-yoco',figureId:'02-cross-attention-sources',number:'yoco-02',
  eyebrow:['그림 2 · Cross-attention의 두 출처','Figure 2 · Two sources for cross-attention'],
  title:['Query는 현재 층에서, KV는 앞부분에서 만듭니다','Query comes from this layer; KV comes from the earlier stack'],
  subtitle:['같은 생성열 · 현재 p3 · 행벡터 표기 · d = 4, d_head = 2','One generation sequence · Current p3 · Row vectors · d = 4, d_head = 2'],
  captionIn:'article',caption:['왼쪽은 뒤쪽 한 층의 현재 표현에서 Q를, self-decoder의 최종 표현 M에서 공유 K와 V를 만드는 경로입니다. 오른쪽은 Q가 p0부터 p3까지의 K와 점수를 구하고 같은 위치의 V를 가중합하는 과정입니다. 두 출처여도 같은 토큰열이며 현재 위치 이후는 읽지 않습니다. K/V는 최초 생성 후 캐시에서 재사용합니다.','Left: the current later-layer representation supplies Q; the self-decoder output M supplies shared K and V. Right: Q scores K at p0 through p3 and combines the corresponding V rows. The two sources belong to one causal sequence. K/V are cached after creation; future positions are not read.'],
  alt:['h3에서 WQ로 q를 만들고 M의 네 행에서 WK와 WV로 K와 V를 만든다. q의 네 점수를 softmax로 바꾸어 V 네 행을 섞는다.','h at p3 projects through WQ to q. Four M rows project through WK/WV to K/V. Four query scores become softmax weights over the four V rows.'],
  sources:[{label:'YOCO §2.2',url:'https://arxiv.org/html/2405.05254v1#S2.SS2'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. Q와 K/V를 만들기','A. Produce Q and K/V'],800);
    a.box(10,110,225,150,['뒤층 h(p3) [1×4]','Later h(p3) [1×4]'],['현재 위치 하나','One current position'],'blue');
    a.box(285,110,225,150,'M [4×4]',['앞부분의 p0…p3','Earlier outputs p0…p3'],'teal');
    a.arrow(122,270,122,320,C.blue);a.arrow(397,270,397,320,C.teal);
    a.box(10,330,225,125,'W_Q [4×2]',['층마다 다름','Layer-specific'],'blue');
    a.box(285,330,225,125,'W_K, W_V',['각각 [4×2]','Each [4×2]'],'teal');
    a.arrow(122,465,122,515,C.blue);a.arrow(397,465,397,515,C.teal);
    a.box(10,525,225,120,'q [1×2]','','blue');
    a.box(285,525,225,120,'K, V [4×2]',['뒤층들이 공유','Shared by later layers'],'teal');
    a.box(10,695,500,90,['출처가 다름 = Cross-attention','Different sources = Cross-attention'],'','gray');
    const b=new Panel(locale,['B. 익숙한 Attention 계산','B. The same attention operation'],800);
    b.box(30,110,460,115,'q Kᵀ / √2','[1×2] × [2×4] → [1×4]','blue');
    b.arrow(260,235,260,275,C.blue);b.token(135,285,'softmax',250,'purple',60);
    b.arrow(260,355,260,400,C.purple);
    for(let i=0;i<4;i++){b.text(80+120*i,438,`p${i}`,{size:22,anchor:'middle',width:100});b.token(30+120*i,460,`α${i}`,100,'purple',60);}
    b.arrow(260,530,260,565,C.teal);
    b.box(30,575,460,100,'α V → o [1×2]',['같은 위치의 V를 가중합','Weighted sum of matching V rows'],'teal');
    b.arrow(260,685,260,715,C.blue);b.token(90,725,'o W_O → [1×4]',340,'blue',55);
    return [a,b];
  },
} satisfies FigureSpec;
