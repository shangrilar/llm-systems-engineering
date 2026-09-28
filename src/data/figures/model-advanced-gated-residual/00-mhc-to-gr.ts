import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-gated-residual',figureId:'00-mhc-to-gr',number:'ma-15-00',eyebrow:['그림 1','Figure 1'],
 title:['여러 stream은 유지하고, 읽는 방식을 바꿉니다','Keep multiple streams; change how they are read'],
 subtitle:['같은 토큰 · 두 stream (branch) · 읽기 → F → 쓰기와 우회 경로','One token · Two streams (branches) · Read → F → write, plus bypass'],captionIn:'article',
 caption:['mHC는 stream별 scalar 읽기·쓰기와 제약된 H_res 혼합을 쓴다. Qwen GR은 branch별 정규화 후 성분별 gate로 읽고, 새 출력을 branch별 scalar로 원본에 더하며 직접 우회 혼합을 제거한다. F는 Attention 또는 MLP이다. 계수 생성과 mHC 내부 정규화는 생략했다. GR 읽기 gate와 쓰기 scalar는 모든 정규화 branch에서 계산된다.','mHC uses scalar read/write weights per stream plus constrained H_res mixing. Qwen GR normalizes branches, reads with componentwise gates, and adds scalar-weighted fresh output to each original branch without direct bypass mixing. F is attention or MLP. Coefficient generation and mHC internal normalization are omitted. GR read and write coefficients depend on all normalized branches.'],
 alt:['양쪽 모두 두 stream을 하나의 F 입력으로 읽고 새 출력을 두 stream에 더한다. 왼쪽 mHC는 우회 stream을 H_res로 섞는다. 오른쪽 GR은 원본을 그대로 우회시키며 읽기에 성분별 gate를 사용한다.','Both read two streams into one F input and add its output to both. mHC mixes bypass streams through H_res. GR preserves each original bypass and gates the read componentwise.'],
 sources:[{label:'Qwen GR §2.2, equations30–34',url:'https://arxiv.org/html/2608.30320v1#S2.SS2'},{label:'mHC §3–4',url:'https://arxiv.org/html/2512.24880v1'}],
 panels(locale:Locale){return [false,true].map(gr=>{
 const p=new Panel(locale,gr?['B. GR · 원본을 이어가기','B. GR · Carry each original']:['A. mHC · 우회도 혼합','A. mHC · Mix the bypass'],1010);
 p.rect(270,108,240,119,C.grayFill,C.line);p.token(282,139,'R₁',104,'teal',60);p.token(397,139,'R₂',104,'teal',60);
 p.path('M260 165 H130 V270',C.blue,2.5,false,true);
 p.box(20,282,220,125,gr?['성분별 읽기','Gated read']:['stream별 읽기','Read per stream'],gr?['각 branch 정규화 + gate','Branch norm + gates']:['scalar 가중합','Scalar-weighted sum'],'blue');
 p.arrow(130,417,130,449,C.blue);p.box(20,461,220,77,'F · d → d','','blue');
 p.arrow(130,548,130,580,C.orange);p.box(20,592,220,106,['stream별 쓰기','Scalar write'],'sᵢ × y','orange');
 if(gr){p.arrow(334,237,334,739,C.teal);p.arrow(449,237,449,739,C.teal);}
 else{p.arrow(334,237,334,449,C.teal);p.arrow(449,237,449,449,C.teal);p.box(270,461,240,106,['우회 혼합','Bypass mix'],'H_res','teal');p.arrow(334,577,334,739,C.teal);p.arrow(449,577,449,739,C.teal);}
 p.path('M130 708 V720 H392 V771',C.orange,2.5);p.arrow(392,771,365,771,C.orange);p.arrow(392,771,418,771,C.orange);
 for(const x of [334,449]){p.circle(x,771,23,C.paper,C.teal);p.text(x,779,'+',{size:29,anchor:'middle',width:35});p.arrow(x,804,x,838,C.teal);}
 p.token(282,850,'R₁′',104,'teal',60);p.token(397,850,'R₂′',104,'teal',60);
 p.text(260,970,gr?['Rᵢ′ = Rᵢ + sᵢ y','Rᵢ′ = Rᵢ + sᵢ y']:['R′ = H_res R + 쓰기 기여','R′ = H_res R + write contribution'],{size:24,weight:600,anchor:'middle',width:500});
 return p;
 });}
} satisfies FigureSpec;
