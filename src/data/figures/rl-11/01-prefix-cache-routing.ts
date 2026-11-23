import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-11',figureId:'01-prefix-cache-routing',number:'11-1',
  eyebrow:['그림 1','Figure 1'],
 title:['이미 계산한 prefix와 엔진의 대기열을 함께 본다','Route using both cached prefixes and engine queues'],
 subtitle:['엔진을 선택할 수 있는 요청의 예입니다. 같은 토큰 prefix의 KV를 재사용하면 입력 계산을 줄일 수 있습니다. 캐시가 가장 많이 맞는 엔진이 항상 가장 빨리 끝나는 것은 아닙니다.','An example for requests that can choose an engine. Reusing KV for an identical token prefix reduces input computation. The engine with the longest cache hit does not always finish first.'],
 alt:['공유 prefix P에서 응답 a와 b가 갈라지고 멀티턴에서는 응답 a와 도구 관측 뒤 새 입력이 붙는다. 엔진 A는 P의 KV가 있지만 긴 대기열, B는 P가 없지만 짧은 대기열이다. 라우터는 재계산과 대기를 함께 비교한다.','Responses a and b branch from shared prefix P. In a later turn, response a and tool observations extend that context. Engine A has cached P with a long queue; B lacks P but has a short queue. Routing compares recomputation and waiting.'],
 caption:['공유되는 것은 완전히 일치하는 prefix의 KV입니다. 서로 다른 생성 suffix는 공유하지 않습니다. 정책·KV 계산 설정과 호환되는 캐시만 재사용하며, weight update 후 보존·무효화·재계산 정책은 별도로 확인합니다.','Only KV for an exactly matching prefix is shared; divergent generated suffixes are not. Cache reuse requires compatible policy and KV computation settings. Cache retention, invalidation and recomputation after weight updates need explicit handling.'],
 sources:[{label:'Miles v0.1.0',url:'https://github.com/radixark/miles/tree/v0.1.0'},{label:'SGLang RadixAttention',url:'https://arxiv.org/abs/2312.07104'}],
 panels(locale:Locale){
 const p=new Panel(locale,['어디까지 같은 문맥인가','Where does the context match?'],835);
 p.box(16,106,488,113,['P · 공통 입력 prefix','P · shared input prefix'],['같은 token IDs와 앞선 문맥','Identical token IDs and preceding context'],'teal');
 p.arrow(126,225,126,278,C.teal);p.arrow(388,225,388,278,C.teal);
 p.box(16,288,230,122,['응답 a','Response a'],['고유 suffix','Unique suffix'],'blue');
 p.box(274,288,230,122,['응답 b','Response b'],['다른 suffix','Different suffix'],'purple');
 p.text(16,463,['P는 공유해도 a와 b의 KV는 다릅니다.','P is shared; the KV for a and b is different.'],{size:22,weight:600,width:488});
 p.text(16,551,['a의 다음 턴 입력','Next-turn input for a'],{size:23,weight:600,width:488});
 p.token(16,586,'P',80,'teal');p.token(106,586,'a',80,'blue');p.token(196,586,['도구 관측','Tool result'],168,'orange');p.token(374,586,['새 입력','New input'],130,'gray');
 p.text(16,690,['누적된 문맥 중 실제로 남아 있고 일치하는 부분까지 재사용','Reuse the matching part of the accumulated context that is still cached'],{size:22,width:488,color:C.muted});
 const q=new Panel(locale,['가상 엔진 상태와 배치 판단','Example engines and routing'],835);
 q.rect(16,102,488,191,C.blueFill,C.blue);q.text(32,139,['엔진 A · 긴 prefix hit','Engine A · long prefix hit'],{size:24,weight:600,width:456,color:C.blue});
 q.token(32,168,'KV(P)',160,'teal');q.text(213,198,['입력 재계산 적음','Less recomputation'],{size:21,width:277});
 q.text(32,257,['대기열','Queue'],{size:21,width:100});for(let i=0;i<6;i++)q.rect(145+i*53,232,43,35,C.blueFill,C.blue,5);
 q.rect(16,322,488,191,C.orangeFill,C.orange);q.text(32,359,['엔진 B · prefix miss','Engine B · prefix miss'],{size:24,weight:600,width:456,color:C.orange});
 q.rect(32,386,160,48,C.paper,C.gray,8,true);q.text(112,418,['KV 없음','No KV'],{size:22,width:142,anchor:'middle'});q.text(213,418,['입력 재계산 필요','Needs recomputation'],{size:21,width:277});
 q.text(32,477,['대기열','Queue'],{size:21,width:100});q.rect(145,452,43,35,C.orangeFill,C.orange,5);
 q.arrow(260,520,260,574,C.gray);
 q.box(16,584,488,135,['Router: 개념적 판단 기준','Router: conceptual cost comparison'],['재계산 비용 + 대기 비용 → 배치 결정','Recomputation cost + queue delay → placement'],'purple');
 q.text(16,772,['높은 hit 비율 ≠ 짧은 완료 시간','High hit rate ≠ short completion time'],{size:23,weight:600,width:488});
 return [p,q];
 }
} satisfies FigureSpec;
