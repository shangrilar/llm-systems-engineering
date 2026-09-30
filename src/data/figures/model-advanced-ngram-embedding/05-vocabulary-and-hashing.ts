import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
"articleId":"model-advanced-ngram-embedding",
"figureId":"05-vocabulary-and-hashing",
"number":"ma-19-03",
"eyebrow":["그림 3", "Figure 3"],
"title":["조합을 고르거나 고정 크기 표에 배정합니다", "Select groups or map them into a fixed-size table"],
"subtitle":["어휘 4개 → 바이그램 16개 · 표 크기를 제한하는 두 방법", "4 tokens → 16 bigrams · Two ways to bound table size"],
"captionIn":"article",
"caption":["모든 조합을 전용 행으로 저장하면 어휘 크기 V와 길이 n에 따라 V^n개가 필요합니다. 빈도 선별은 자주 나오는 조합에 전용 행을 주며 미등록 조합의 처리가 필요합니다. 해시는 드문 조합도 고정 크기 표의 행에 배정하지만 서로 다른 조합이 같은 행을 공유할 수 있습니다. 자주 등장해 더 자주 학습되는 것과 등록 대상을 빈도로 제한하는 것은 다릅니다.", "Giving every group a dedicated row requires V^n entries for vocabulary size V and order n. Frequency selection assigns dedicated rows to frequent groups and needs a policy for unlisted groups. Hashing maps rare groups too into a fixed-size table, but different groups may share a row. More frequent training updates are distinct from frequency-based admission."],
"alt":["모든 조합을 전용 행으로 저장하면 어휘 크기 V와 길이 n에 따라 V^n개가 필요합니다. 빈도 선별은 자주 나오는 조합에 전용 행을 주며 미등록 조합의 처리가 필요합니다. 해시는 드문 조합도 고정 크기 표의 행에 배정하지만 서로 다른 조합이 같은 행을 공유할 수 있습니다. 자주 등장해 더 자주 학습되는 것과 등록 대상을 빈도로 제한하는 것은 다릅니다.", "Giving every group a dedicated row requires V^n entries for vocabulary size V and order n. Frequency selection assigns dedicated rows to frequent groups and needs a policy for unlisted groups. Hashing maps rare groups too into a fixed-size table, but different groups may share a row. More frequent training updates are distinct from frequency-based admission."],
"sources":[{"label": "Engram §2, §4.1, §6.2", "url": "https://arxiv.org/html/2601.07372v1"}],
panels(locale:Locale,mobile?:boolean){

const a=new Panel(locale,['A. 빈도로 조합 선별','A. Select by frequency'],760);
const b=new Panel(locale,['B. 고정 크기 해시 표','B. Fixed-size hash table'],760);
for(const p of [a,b]){
['AA','AB','AC','AD','BA','BB','BC','BD','CA','CB','CC','CD','DA','DB','DC','DD'].forEach((s,i)=>p.token(25+(i%4)*125,110+Math.floor(i/4)*65,s,105,i===1||i===6?'teal':'gray',48));
}
a.arrow(260,385,260,425,C.teal);a.box(50,435,420,150,['선택된 조합의 전용 행','Dedicated rows for selected groups'],'AB → row 0\nBC → row 1','teal');
a.box(50,600,420,125,['나머지는 미등록','Other groups are unlisted'],['별도 fallback 규칙 필요','A separate fallback rule is needed'],'gray');
b.token(25,420,'AB',100,'blue',50);b.token(210,420,'BC',100,'teal',50);b.token(395,420,'DD',100,'gray',50);
b.path('M75 480 V520 H130 V550',C.blue,2.5,false,true);b.path('M260 480 V520 H390 V550',C.teal,2.5,false,true);b.path('M445 480 V505 H145 V550',C.gray,2.5,false,true);
b.token(35,565,'row 0',190,'orange',65);b.token(295,565,'row 1',190,'teal',65);
b.text(260,690,['AB와 DD는 같은 행 공유','AB and DD share one row'],{size:24,anchor:'middle',width:490});
return [a,b];
}
} satisfies FigureSpec;
