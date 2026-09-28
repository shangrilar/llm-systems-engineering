import {Panel,C,type FigureSpec,type Locale,type Label} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-attention-residuals',figureId:'04-residual-designs',number:'ma-14-04',layout:'wide',
 eyebrow:['그림 5 · 세 편의 연결','Figure 5 · Connect the three designs'],
 title:['무엇을 보관하고, 어떻게 읽고, 무엇을 갱신할까요?','What is stored, read, and updated?'],
 subtitle:['같은 토큰의 깊이 방향 전달 · F는 Attention 또는 MLP','Information along depth for one token · F is Attention or MLP'],
 captionIn:'article',caption:['mHC와 GR은 여러 residual stream을 유지하지만 읽기와 우회 경로가 다릅니다. mHC는 scalar 읽기와 제약된 우회 혼합을 사용하고, 여기의 GR은 branch별 정규화·성분별 gate 평균과 원본 우회를 사용합니다. 두 방식 모두 F 출력을 stream별 scalar로 씁니다. Full AttnRes는 과거의 새 출력들을 따로 보관해 깊이 attention으로 읽고 새 출력을 목록에 추가합니다. Block은 목록 대신 block 합을 갱신합니다. 이 그림은 성능 순위가 아닌 정보 전달 구조의 비교입니다.','mHC and GR maintain multiple residual streams with different read and bypass paths. mHC uses scalar reads and constrained bypass mixing; this GR uses branch normalization, componentwise gated averages and original bypasses. Both write F output using streamwise scalars. Full AttnRes retains earlier fresh outputs, reads them with depth attention and appends the new output. Block updates a block sum instead. This compares information flow, not performance.'],
 alt:['mHC, GR, AttnRes를 보관, 읽기, 갱신 세 기준으로 비교한다. mHC는 혼합한 우회에 쓰고 GR은 원본 우회에 쓴다. AttnRes는 깊이 목록을 읽고 새 출력을 추가한다.','Compare mHC, GR and AttnRes by storage, read and update. mHC writes into mixed bypasses; GR writes into original bypasses. AttnRes reads depth sources and appends fresh output.'],
 sources:[{label:'mHC',url:'https://arxiv.org/html/2512.24880v1'},{label:'GR',url:'https://arxiv.org/html/2608.30320v1#S2.SS2'},{label:'AttnRes',url:'https://arxiv.org/html/2607.24653v1#S2.SS2'}],
 panels(locale:Locale,mobile?:boolean){
 const rows:{name:Label,store:Label,read:Label,formula:string,update:Label}[]=[
 {name:['A. 13편 · mHC','A. Part 13 · mHC'],store:['여러 stream X = [x₁, x₂]','Multiple streams X = [x₁, x₂]'],read:['Stream별 scalar로 읽기','Read with streamwise scalars'],formula:'X′ = H_res X + H_post F(H_pre X)',update:['제약된 우회 혼합 + 새 출력 쓰기','Constrained bypass mix + write']},
 {name:['B. 14편 · Gated Residual','B. Part 14 · Gated Residual'],store:['여러 branch R = [R₁, R₂]','Multiple branches R = [R₁, R₂]'],read:['Branch norm → 성분 Gate → 평균','Branch norm → gates → average'],formula:'Rᵢ′ = Rᵢ + sᵢ F(x)',update:['원본 우회 + 새 출력의 scalar 쓰기','Original bypass + scalar write']},
 {name:['C. 15편 · Attention Residuals','C. Part 15 · Attention Residuals'],store:['깊이별 새 출력 [e, f₁, f₂, …]','Fresh depth outputs [e, f₁, f₂, …]'],read:['깊이별 점수 → softmax → 가중합','Depth scores → softmax → mix'],formula:'h = Σ αᵢ sourceᵢ → F(h) = f_new',update:['새 출력 추가 · Block은 현재 합 갱신','Append output; Block updates sum']}
 ];
 return rows.map(r=>{
 const p=new Panel(locale,r.name,mobile?640:415,mobile?520:1104);
 p.box(20,120,480,112,['보관','Store'],r.store,'blue');
 p.arrow(260,246,260,278,C.teal);
 p.box(20,293,480,112,['읽기 → F','Read → F'],r.read,'teal');
 const x=mobile?20:584,y=mobile?450:120;
 p.box(x,y,480,112,['갱신','Update'],r.update,'orange');
 p.text(x+240,y+169,r.formula,{size:22,anchor:'middle',width:470,color:C.blue,weight:600});
 if(!mobile)p.arrow(514,349,569,176,C.orange);
 return p;
 });
 }
} satisfies FigureSpec;
