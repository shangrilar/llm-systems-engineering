import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
"articleId":"model-advanced-ngram-embedding",
"figureId":"01-suffix-token-groups",
"number":"ma-19-01",
"eyebrow":["그림 1", "Figure 1"],
"title":["같은 위치에 토큰 표현과 묶음 표현을 함께 줍니다", "Token and group features meet at the same position"],
"subtitle":["현재 위치에서 끝나는 묶음 · 교육용 추가형 구조", "Groups end at the current position · Illustrative additive design"],
"captionIn":"article",
"caption":["A, B, C 각 위치의 기본 임베딩 경로를 유지합니다. 바이그램 (A,B)는 B에, (B,C)는 C에 반영합니다. 트라이그램 (A,B,C)는 C에만 반영합니다. 묶음을 끝 위치에 맞춰 놓으므로 미래 토큰이 앞 위치로 흐르지 않습니다. 덧셈은 projection으로 차원을 맞춘 교육용 입력 결합 예시이며 모든 N-gram 구조의 필수 방식은 아닙니다. 경계 padding은 생략했습니다.", "The ordinary embedding path remains at A, B and C. Bigram (A,B) contributes at B, (B,C) at C, and trigram (A,B,C) at C only. Aligning groups with their endpoints prevents future-token leakage. Addition illustrates input fusion after dimension-matching projections; it is not mandatory for every N-gram design. Boundary padding is omitted."],
"alt":["A, B, C 각 위치의 기본 임베딩 경로를 유지합니다. 바이그램 (A,B)는 B에, (B,C)는 C에 반영합니다. 트라이그램 (A,B,C)는 C에만 반영합니다. 묶음을 끝 위치에 맞춰 놓으므로 미래 토큰이 앞 위치로 흐르지 않습니다. 덧셈은 projection으로 차원을 맞춘 교육용 입력 결합 예시이며 모든 N-gram 구조의 필수 방식은 아닙니다. 경계 padding은 생략했습니다.", "The ordinary embedding path remains at A, B and C. Bigram (A,B) contributes at B, (B,C) at C, and trigram (A,B,C) at C only. Aligning groups with their endpoints prevents future-token leakage. Addition illustrates input fusion after dimension-matching projections; it is not mandatory for every N-gram design. Boundary padding is omitted."],
"sources":[{"label": "Engram §2, §4.1, §6.2", "url": "https://arxiv.org/html/2601.07372v1"}],
panels(locale:Locale,mobile?:boolean){

const p=new Panel(locale,['A. 위치별로 나란히 보기','A. Align features by position'],740);
const xs=[75,245,415];
['A','B','C'].forEach((t,i)=>{
 const x=xs[i]; p.token(x-60,110,t,120,'blue',55);p.arrow(x,175,x,205,C.blue);
 p.token(x-70,215,`e(${t})`,140,'blue',60);
 if(i>0)p.token(x-75,335,i===1?'g(A,B)':'g(B,C)',150,'teal',60);
 if(i===2)p.token(x-75,455,'g(A,B,C)',150,'teal',60);
 p.path(`M${x} 285 H${Math.max(2,x-82)} V595 H${x-25}`,C.blue,2,false,true);
 if(i>0)p.path(`M${x} 405 V${i===2?425:560} ${i===2?'H505 V595 H440':'V570'}`,C.teal,2,false,true);
 if(i===2)p.arrow(x,525,x,568,C.teal);
 p.circle(x,595,22,C.orangeFill,C.orange);p.text(x,603,'+',{size:25,anchor:'middle',width:35});
 p.arrow(x,625,x,660,C.blue);p.token(x-60,670,`x_${t}`,120,'blue',55);
});
p.text(20,310,['단일 토큰','Single token'],{size:21,color:C.blue,width:180});
p.text(20,430,['2개 묶음','2-token group'],{size:21,color:C.teal,width:180});
p.text(20,550,['3개 묶음','3-token group'],{size:21,color:C.teal,width:180});
const q=new Panel(locale,['B. (A,B)는 B에만 반영','B. (A,B) contributes at B'],740);
q.token(50,110,'A',130,'gray',60);q.token(330,110,'B',130,'blue',60);
q.path('M65 195 V220 H445 V195',C.teal,3);q.arrow(255,220,255,270,C.teal);
q.token(80,280,'Lookup (A,B)',360,'teal',65);q.arrow(260,355,260,395,C.teal);
q.token(80,405,'g(A,B)',360,'teal',65);
q.path('M260 480 V525 H395 V565',C.teal,3,false,true);
q.token(325,580,'B',140,'orange',60);
return [p,q];
}
} satisfies FigureSpec;
