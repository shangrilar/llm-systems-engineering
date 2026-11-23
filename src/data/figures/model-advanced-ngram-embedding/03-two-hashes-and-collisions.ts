import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
"articleId":"model-advanced-ngram-embedding",
"figureId":"03-two-hashes-and-collisions",
"number":"ma-19-05",
"eyebrow":["그림 5", "Figure 5"],
"title":["표 하나에서 충돌해도 전체 표현은 달라질 수 있습니다", "One collision need not make the whole vector identical"],
"subtitle":["해시마다 별도 표 · 독립적으로 조회한 벡터를 이어 붙임", "A separate table per hash · Concatenate independent lookups"],
"captionIn":"article",
"caption":["교육용 두 해시는 (2,5)와 (1,1)을 첫 표의 row 4에 함께 배정하지만 둘째 표에서는 row 1과 row 3으로 구별합니다. 두 입력은 같은 테이블들을 사용합니다. 주황 벡터 구간은 공유하고 나머지 구간은 달라질 수 있습니다. 조회는 독립적이지만 물리적 메모리 접근이 한 번이라는 뜻은 아닙니다. 모든 해시에서의 충돌 제거를 보장하지 않습니다.", "Two illustrative hashes map (2,5) and (1,1) to row 4 in the first table, but to rows 1 and 3 in the second. Both inputs use the same tables. The orange vector segment is shared; the other segment can differ. Lookups are independent, not one physical memory access. Collisions across all hashes remain possible."],
"alt":["교육용 두 해시는 (2,5)와 (1,1)을 첫 표의 row 4에 함께 배정하지만 둘째 표에서는 row 1과 row 3으로 구별합니다. 두 입력은 같은 테이블들을 사용합니다. 주황 벡터 구간은 공유하고 나머지 구간은 달라질 수 있습니다. 조회는 독립적이지만 물리적 메모리 접근이 한 번이라는 뜻은 아닙니다. 모든 해시에서의 충돌 제거를 보장하지 않습니다.", "Two illustrative hashes map (2,5) and (1,1) to row 4 in the first table, but to rows 1 and 3 in the second. Both inputs use the same tables. The orange vector segment is shared; the other segment can differ. Lookups are independent, not one physical memory access. Collisions across all hashes remain possible."],
"sources":[{"label": "Engram §2, §4.1, §6.2", "url": "https://arxiv.org/html/2601.07372v1"}],
panels(locale:Locale,mobile?:boolean){

const p=new Panel(locale,['A. 두 입력, 공통 테이블 두 개','A. Two inputs, two shared tables'],690);
p.token(20,110,'(A,B) = (2,5)',220,'blue',65);p.token(280,110,'(C,C) = (1,1)',220,'teal',65);
p.box(20,255,220,130,'Hash 1','(3u + v) mod 7','gray');p.box(280,255,220,130,'Hash 2','(u + 2v) mod 11','gray');
p.arrow(130,185,130,245,C.blue);p.arrow(390,185,390,245,C.teal);
p.path('M130 200 V220 H370 V245',C.blue,2,false,true);p.path('M390 200 V230 H150 V245',C.teal,2,false,true);
p.arrow(130,395,130,470,C.orange);p.arrow(390,395,390,470,C.teal);
p.box(20,485,220,180,'Table 1 · 7 rows',['두 입력 → row 4\n[0.2, 0.8]','Both → row 4\n[0.2, 0.8]'],'orange');
p.box(280,485,220,180,'Table 2 · 11 rows','row 1: [−0.5, 0.1]\nrow 3: [a, b]','teal');
const q=new Panel(locale,['B. 같은 구간과 다른 구간','B. Shared and distinct segments'],690);
['(A,B)','(C,C)'].forEach((s,i)=>{
let y=130+i*290;q.text(25,y,s,{size:27,weight:600,width:450});
q.token(20,y+45,'0.2 | 0.8',220,'orange',80);q.token(260,y+45,i===0?'−0.5 | 0.1':'a | b',240,'teal',80);
q.path(`M25 ${y+145} V${y+160} H495 V${y+145}`,C.ink,2);
q.text(260,y+210,['이어 붙인 4성분 벡터','Concatenated 4-component vector'],{size:23,anchor:'middle',width:490});
});
return [p,q];
}
} satisfies FigureSpec;
