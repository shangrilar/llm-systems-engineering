import {Panel,C,matrix,port,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mla-storage',figureId:'03-content-and-position',number:'ma-02-03',
 eyebrow:['그림 3 · Content와 위치 경로','Figure 3 · Content and position paths'],
 title:['Key·Value를 만드는 두 경로','Two paths for forming keys and values'],
 subtitle:['현재 p₃ · 행벡터 · 교육용 차원과 값','Current p₃ · Row vectors · Illustrative dimensions and values'],
 captionIn:'article',caption:['Key는 content와 위치 부분을 이어 붙인 표현입니다. 캐시에는 c₃와 k₃ᴿ만 저장하며, 펼친 헤드별 K·V는 구조를 설명하기 위한 표현입니다.','The key concatenates content and position. Only c₃ and k₃ᴿ are cached; expanded per-head K and V illustrate the structure.'],
 alt:['p3에서 W_D로 c3=[1,2,3]을, 별도 W_KR과 RoPE(3)으로 위치용 Key [r0,r1]을 만든다. 두 벡터가 캐시 저장 대상이다. c3는 헤드별 U_K와 U_V에 투영된다. 헤드 1의 Key는 [1,2,r0,r1], Value는 [4,2]이고 헤드 2의 Key는 [2,3,r0,r1], Value는 [1,5]다. 위치 부분은 동일하며 Value에는 이어 붙이지 않는다.','From p3, W_D produces c3=[1,2,3], while W_KR and RoPE(3) produce [r0,r1]. These two vectors are cached. Each head projects c3 through its U_K and U_V. Head 1 has key [1,2,r0,r1] and value [4,2]; Head 2 has key [2,3,r0,r1] and value [1,5]. Both keys share the positional part; values do not concatenate it.'],
 sources:[{label:'DeepSeek-V2 §2.1.3, equations 14–19',url:'https://arxiv.org/html/2405.04434v5#S2.SS1.SSS3'}],
 layout:'wide',panels(locale:Locale,mobile?:boolean){
 const width=mobile?520:1120,mid=width/2,dx=mobile?125:240,left=mid-dx,right=mid+dx;
 const p=new Panel(locale,null,mobile?1550:1100,width);
 const input={x:mid-80,y:20,width:160,height:60};p.box(input.x,input.y,input.width,input.height,'p₃ · 1×8','','blue');
 const wd={x:left-106,y:150,width:212,height:66},wk={x:right-106,y:150,width:212,height:66};
 for(const [b,label] of [[wd,'Wᴰ · 8×3'],[wk,'Wᴷᴿ · 8×2']] as const){p.box(b.x,b.y,b.width,b.height,label,'','purple');connector(p,port(input,'bottom',.5,8),port(b,'top',.5,8),{via:[[mid,110],[b.x+b.width/2,110]],tone:'blue'});}
 const rope={x:right-106,y:265,width:212,height:66};p.box(rope.x,rope.y,rope.width,rope.height,'RoPE(3)','','purple');connector(p,port(wk,'bottom',.5,8),port(rope,'top',.5,8),{tone:'purple'});
 p.text(left,391,'c₃ · 1×3',{size:24,weight:600,anchor:'middle',width:210,color:C.teal});p.text(right,391,'k₃ᴿ · 1×2',{size:24,weight:600,anchor:'middle',width:210,color:C.purple});
 const c=matrix(p,left-82,415,[[1,2,3]],{cellWidth:52,cellHeight:46,gap:4,size:24});const r=matrix(p,right-54,415,[['r₀','r₁']],{cellWidth:52,cellHeight:46,gap:4,size:23,tone:'purple'});
 connector(p,port(wd,'bottom',.5,8),[left,355],{tone:'teal'});connector(p,port(rope,'bottom',.5,8),[right,355],{tone:'purple'});
 for(const cx of [left,right])p.text(cx,494,['캐시 저장','Cached'],{size:21,anchor:'middle',width:180,color:C.muted});
 p.text(right,531,['헤드 간 공유','Shared by heads'],{size:21,anchor:'middle',width:240,color:C.purple});
 const groups=[{x:mobile?0:10,y:600,n:1,k:[1,2],v:[4,2]},{x:mobile?0:590,y:mobile?1070:600,n:2,k:[2,3],v:[1,5]}];
 for(const g of groups){
 const sub=g.n===1?'₁':'₂';p.rect(g.x+20,g.y,480,420,C.paper,C.line,12);p.text(g.x+260,g.y+38,[`헤드 ${g.n}`,`Head ${g.n}`],{size:26,weight:600,anchor:'middle',width:250});
 // Separate outer lanes preserve the shared origin without crossing head outputs.
 const lc=g.x+35,rc=g.x+490;
 connector(p,[left-92,438],[lc,g.y+110],{via:[[mobile?8:0,438],[mobile?8:0,560],[lc,560]],tone:'teal'});
 connector(p,[right+64,438],[g.x+430,g.y+142],{via:[[mobile?512:1118,438],[mobile?512:1118,578],[rc,578],[rc,g.y+75],[g.x+430,g.y+75]],tone:'purple'});
 for(const [idx,kind,vals] of [[0,'K',g.k],[1,'V',g.v]] as const){
 const y=g.y+150+idx*175;const b={x:g.x+65,y:y-22,width:152,height:86};p.box(b.x,b.y,b.width,b.height,`U${kind==='K'?'ᴷ':'ⱽ'}${sub}`,'3×2','purple');
 connector(p,[lc,g.y+110],port(b,'left',.5,8),{via:[[lc,y+21]],tone:'teal'});
 const out=matrix(p,g.x+260,y,[kind==='K'?[...vals,'r₀','r₁']:vals],{cellWidth:48,cellHeight:42,gap:6,size:22,tone:(_rr,col)=>kind==='K'&&col>=2?'purple':'orange'});
 connector(p,port(b,'right',.5,8),[out.x-8,y+21],{tone:'orange'});
 p.text(g.x+312,y-20,kind==='K'?`k${sub}ᶜ`:`v${sub} · 1×2`,{size:23,anchor:'middle',width:140,color:C.orange});
 if(kind==='K'){p.text(g.x+422,y+80,['위치','Position'],{size:21,anchor:'middle',width:110,color:C.purple});p.text(g.x+312,y+80,'Content',{size:21,anchor:'middle',width:110,color:C.orange});p.text(g.x+370,y+117,`Key · 1×4`,{size:22,weight:600,anchor:'middle',width:220});}
 }
 }
 return [p];
 }
} satisfies FigureSpec;
