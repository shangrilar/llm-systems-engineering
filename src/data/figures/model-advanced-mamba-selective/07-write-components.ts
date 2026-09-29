import {Panel,C,cells,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mamba-selective',figureId:'07-write-components',number:'mamba-07',eyebrow:['그림 3','Figure 3'],
 title:['B는 기록할 성분과 비율을 바꿉니다','B changes where and in what ratio to write'],
 subtitle:['한 채널 · 상태 성분 2개 · 입력 u = 1','One channel · Two state components · Input u = 1'],captionIn:'article',
 caption:['고정 B에는 Δ를 곱해도 성분 비율이 같다. 입력에서 B를 만들면 같은 Δ에서도 기록할 성분을 바꿀 수 있다. 교육용 예시.','Scaling fixed B preserves component ratios. Input-dependent B can change which component is written at the same Δ. Illustrative values.'],
 alt:['고정 B 1,2에 Δ1과2를 곱하면 기록은1,2와2,4로 비율이 같다. Δ1을 유지하고 입력별 B를1,0과0,1로 바꾸면 기록할 상태 성분이 바뀐다.','Fixed B=[1,2] gives writes [1,2] and [2,4] for Δ=1 and 2. With Δ=1 fixed, input-dependent B=[1,0] or [0,1] changes the written state component.'],
 sources:[{label:'Mamba §3.5.2',url:'https://arxiv.org/html/2312.00752v2#S3.SS5.SSS2'}],
 panels(locale:Locale){return [false,true].map(varyB=>{const p=new Panel(locale,varyB?['B를 입력에서 계산','Compute B from the input']:['B 고정 · Δ만 변경','Fixed B · Change only Δ'],710);
 p.box(20,100,480,90,varyB?['같은 Δ = 1','Same Δ = 1']:['같은 B = [1, 2]','Same B = [1, 2]'],'','gray');
 for(let i=0;i<2;i++){const y=240+i*230;const vals=varyB?(i===0?['1','0']:['0','1']):(i===0?['1','2']:['2','4']);
 p.text(20,y,varyB?(i===0?['입력 a → B = [1, 0]','Input a → B = [1, 0]']:['입력 b → B = [0, 1]','Input b → B = [0, 1]']):`Δ = ${i+1}`,{size:23,weight:600,color:C.orange});
 p.arrow(60,y+15,60,y+58,C.orange);
 p.text(115,y+50,['기록: Δ × B × u','Write: Δ × B × u'],{size:20});
 p.text(30,y+90,['성분 1','Component 1'],{size:19,width:170});p.text(260,y+90,['성분 2','Component 2'],{size:19,width:170});
 cells(p,20,y+105,vals,{w:210,h:55,gap:20,tone:'orange',size:26});}
 return p;});}
} satisfies FigureSpec;
