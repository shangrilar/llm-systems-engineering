import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'model-advanced-cross-layer-kv',figureId:'03-what-is-shared',number:'cla-03',
  eyebrow:['그림 3 · 저장과 계산 구별하기','Figure 3 · Storage and computation'],
  title:['KV를 공유해도 각 층의 계산은 남습니다','Sharing KV does not remove the layers'],
  subtitle:['같은 두 층 비교 · 파랑: 층별 계산 · 청록: 저장된 KV','The same two layers · Blue: layer computation · Teal: stored KV'],
  captionIn:'article',caption:['KV 두 묶음을 하나로 줄여도 두 층은 각자의 Q로 attention을 계산합니다. 같은 KV를 다시 읽는 비용도 남으므로 저장량 감소가 attention 계산량이나 실행 시간의 같은 비율 감소를 뜻하지 않습니다. 공유는 모델 구조의 선택이며 기존 모델의 캐시를 임의로 지우는 방법이 아닙니다.','Two KV banks become one, but both layers still compute attention with their own Queries. Each layer still reads KV, so the storage reduction does not imply the same reduction in attention work or latency. Sharing is an architectural choice, not permission to delete caches from an existing model.'],
  alt:['왼쪽은 두 층이 각자의 KV를 읽고 오른쪽은 같은 KV를 읽는다. 양쪽 모두 Q1과 Q2, attention 두 번 및 순차 hidden 경로가 남는다.','Two layers read separate KV on the left and one shared KV on the right. Both retain Q1, Q2, two attention computations and sequential hidden flow.'],
  sources:[{label:'CLA §2.2–2.3',url:'https://arxiv.org/html/2405.12981v1#S2.SS3'}],
  panels(locale:Locale){
    return [false,true].map(shared=>{
      const p=new Panel(locale,shared?['B. 층간 KV 공유','B. Shared KV']:['A. 층별 KV','A. Separate KV'],850);
      p.token(25,105,'h₁',195,'blue',55);p.arrow(122,170,122,215,C.blue);
      p.box(15,225,215,130,'L₁ · Q₁','Attention + FFN','blue');
      p.arrow(122,365,122,435,C.blue);p.text(135,408,'h₂',{size:23,color:C.blue,width:70});
      p.box(15,445,215,130,'L₂ · Q₂','Attention + FFN','blue');
      p.arrow(122,585,122,630,C.blue);p.token(25,640,'h₃',195,'blue',55);
      if(shared){
        p.box(310,325,195,130,'KV-L₁',['같은 값 재사용','One shared bank'],'teal');
        p.path('M300 385 H270 V290 H240',C.teal,2.5,false,true);
        p.path('M300 395 H280 V510 H240',C.teal,2.5,false,true);
      }else{
        for(const [y,n] of [[225,1],[445,2]]){
          p.box(310,y,195,130,`KV-L${n}`,['층별 저장','Stored per layer'],'teal');
          p.arrow(300,y+65,240,y+65,C.teal);
        }
      }
      p.box(15,735,490,95,shared?['KV 1묶음 · Attention 2번','1 KV bank · 2 attentions']:['KV 2묶음 · Attention 2번','2 KV banks · 2 attentions'],'','gray');
      return p;
    });
  },
} satisfies FigureSpec;
