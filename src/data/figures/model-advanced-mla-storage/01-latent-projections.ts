import {Panel,C,matrix,port,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mla-storage',figureId:'01-latent-projections',number:'ma-02-01',
 eyebrow:['그림 1 · MLA의 공동 표현','Figure 1 · Joint latent representation'],
 title:['하나의 잠재 벡터에서 헤드별 K·V 만들기','Head-specific K and V from one latent'],
 subtitle:['한 층 · 행벡터 · 교육용 차원과 값','One layer · Row vectors · Illustrative dimensions and values'],
 captionIn:'article',caption:['투영 행렬은 학습 가중치이며 헤드별 U는 전체 투영의 해당 출력 부분입니다.','Projection matrices are learned weights; each head uses its output slice of the full projection.'],
 alt:['p0부터 p3까지 각 블록은 입력 벡터 하나다. 현재 p3의 1×8 벡터를 W_D 8×3으로 투영해 c3=[1,2,3]을 얻었다고 가정한다. 동일한 잠재 벡터를 헤드 1과 2가 사용한다. 헤드별 Key와 Value 투영은 각각 3×2이며 출력은 헤드 1에서 [1,2], [4,2], 헤드 2에서 [2,3], [1,5]다.','Each p0–p3 block is one input vector. Suppose projecting the current p3 vector (1×8) through W_D (8×3) gives c3=[1,2,3]. Both heads use this latent. Each head has distinct 3×2 key and value projection slices, yielding [1,2] and [4,2] for Head 1, and [2,3] and [1,5] for Head 2.'],
 sources:[{label:'DeepSeek-V2 equations 9–11',url:'https://arxiv.org/html/2405.04434v5#S2.SS1.SSS2'}],
 layout:'wide',panels(locale:Locale,mobile?:boolean){
 const width=mobile?520:1120,mid=width/2;
 const p=new Panel(locale,null,mobile?1420:960,width);
 p.text(mid,35,['토큰별 입력 벡터 · 1×8','Input vectors · 1×8 each'],{size:23,anchor:'middle',width:width-30,color:C.muted});
 const start=mid-245;
 for(let i=0;i<4;i++)p.token(start+i*130,65,['p₀','p₁','p₂','p₃'][i],100,i===3?'blue':'gray',52);
 p.text(start+440,150,['현재','Current'],{size:22,anchor:'middle',width:150,color:C.blue});
 const down={x:mid-110,y:205,width:220,height:100};
 p.box(down.x,down.y,down.width,down.height,'Wᴰ · 8×3',['학습 가중치','Learned weights'],'purple');
 connector(p,[start+440,162],port(down,'top',.5,8),{via:[[start+440,181],[mid,181]],tone:'blue'});
 p.text(mid-112,390,'c₃ · 1×3',{size:23,weight:600,anchor:'end',width:140,color:C.teal});
 const c=matrix(p,mid-94,360,[[1,2,3]],{cellWidth:60,cellHeight:44,gap:4,size:24});
 connector(p,port(down,'bottom',.5,8),[mid,352],{tone:'teal'});
 const groups=[{x:mobile?0:20,y:475,n:1,ks:[[1,0],[0,1],[0,0]],vs:[[1,0],[0,1],[1,0]],k:[1,2],v:[4,2]},{x:mobile?0:580,y:mobile?935:475,n:2,ks:[[0,0],[1,0],[0,1]],vs:[[1,0],[0,1],[0,1]],k:[2,3],v:[1,5]}];
 for(const g of groups){
 const cx=g.x+260;
 connector(p,port(c,'bottom',.5,8),[cx,g.y-8],{via:mobile&&g.n===2?[[mid,431],[8,431],[8,g.y-28],[cx,g.y-28]]:[[mid,441],[cx,441]],tone:'teal'});
 p.rect(g.x+20,g.y,480,418,C.paper,C.line,12);
 p.text(cx,g.y+38,[`헤드 ${g.n}`,`Head ${g.n}`],{size:26,weight:600,anchor:'middle',width:300});
 for(const [i,kind,values,out] of [[0,'K',g.ks,g.k],[1,'V',g.vs,g.v]] as const){
 const y=g.y+82+i*166;
 p.text(g.x+43,y+64,'c₃ ×',{size:24,color:C.teal,width:100});
 matrix(p,g.x+150,y,values,{cellWidth:40,cellHeight:42,gap:3,size:19,tone:'purple'});
 p.text(g.x+188,y-15,`U${kind==='K'?'ᴷ':'ⱽ'}${g.n===1?'₁':'₂'} · 3×2`,{size:22,anchor:'middle',width:190,color:C.purple});
 connector(p,[g.x+240,y+66],[g.x+316,y+66],{tone:'orange'});
 matrix(p,g.x+330,y+46,[out],{cellWidth:60,cellHeight:40,gap:4,size:24,tone:'orange'});
 p.text(g.x+392,y+26,`${kind==='K'?'k':'v'}${g.n===1?'₁':'₂'}${kind==='K'?'ᶜ':''} · 1×2`,{size:23,anchor:'middle',width:175,color:C.orange});
 }
 }
 return [p];
 }
} satisfies FigureSpec;
