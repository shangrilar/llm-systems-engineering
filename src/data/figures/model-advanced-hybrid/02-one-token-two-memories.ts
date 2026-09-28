import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hybrid',figureId:'02-one-token-two-memories',number:'ma-12-06',layout:'wide',
 eyebrow:['그림 6 · 한 토큰의 실행','Figure 6 · One token in flight'],
 title:['표현은 다음 층으로, 기억은 다음 토큰으로 이어집니다','Representations go to the next layer; memory goes to the next token'],
 subtitle:['현재 위치 p₃ · 층 2: GDN → 층 3: KV Attention · 점선: 같은 층의 다음 토큰 처리','Current position p₃ · Layer 2: GDN → Layer 3: KV attention · Dashed: next token in the same layer'],
 captionIn:'article',caption:['p3을 처리하기 전 S3에서 처리 후 S4로 갱신한다. GDN은 같은 입력에서 q,k,v,alpha,beta를 만든 뒤 갱신된 상태를 q로 읽는다. 출력 투영과FFN,residual은 출력 단계에 접었다. Attention층은 이전층의 출력에서 자신의QKV를 만든다. state 성분의 숫자는 시간,p의숫자는 위치,층번호는 패널제목이다. 한 상태의전후모습은 별도영구복사본이 아니다.','For p3, update pre-token S3 to post-token S4. GDN derives q,k,v,alpha,beta from its input and reads the updated state with q. Output projection,FFN and residual are folded into output. The attention layer derives its own QKV from the previous layer output. State subscripts count tokens; panel labels identify layers. Before/after snapshots are not permanent copies.'],
 alt:['층2GDN은p3의입력에서q,k,v,alpha,beta를만들고S3을S4로갱신한후q로읽는다. 그출력이층3입력으로이어지고층3은자신의QKV로캐시에p3행을추가해읽는다. 두저장소는각각같은층의p4처리로이어진다.','Layer2GDN derives q,k,v,alpha,beta for p3,updates S3 toS4,and reads with q. Its output becomes layer3input. Layer3creates its own QKV,appends thep3KVrow,and reads thecache. Each store persists into its own layer’sp4step.'],
 sources:[{label:'Gated DeltaNet',url:'https://arxiv.org/abs/2412.06464'}],
 panels(locale:Locale,mobile?:boolean){
  const p=new Panel(locale,null,mobile?2170:1100,mobile?520:1104);
  const ay=mobile?1120:0,ax=mobile?0:584;
  p.text(20,44,['층 2 · GDN','Layer 2 · GDN'],{size:26,weight:600,width:480});
  p.token(150,110,['p₃의 입력 표현','Input for p₃'],220,'blue',64);
  p.arrow(260,184,260,211,C.blue);
  p.box(150,221,300,105,['학습된 가중치로 계산','Learned projections'],'q₃, k₃, v₃, α₃, β₃','blue');
  p.path('M140 273 H20 V740 H140',C.blue,2.5,false,true);
  p.text(32,665,'q₃',{size:24,width:80,color:C.blue});
  p.text(312,379,'k₃, v₃, α₃, β₃',{size:20,width:190,color:C.orange});
  p.path('M300 336 V478 H340',C.orange,2.5,false,true);
  p.text(89,425,'S₃',{size:27,anchor:'middle',width:110,color:C.teal});
  p.text(404,425,'S₄',{size:27,anchor:'middle',width:110,color:C.teal});
  matrix(p,35,448,[['a₃','b₃'],['c₃','d₃']],{cellWidth:48,cellHeight:43,gap:6,tone:'teal',size:23});
  matrix(p,350,448,[['a₄','b₄'],['c₄','d₄']],{cellWidth:48,cellHeight:43,gap:6,tone:'teal',size:23});
  p.line(149,478,300,478,C.orange,2.5);
  p.text(230,533,['갱신','Update'],{size:23,anchor:'middle',width:160,color:C.orange});
  p.path('M401 551 V646 H290 V691',C.teal,2.5,false,true);
  p.token(150,701,['q₃로 상태 읽기','Read state with q₃'],280,'teal',78);
  p.arrow(290,789,290,830,C.blue);
  p.token(150,840,['다음 층의 입력 표현','Input for the next layer'],280,'blue',78);
  p.path('M461 494 H498 V986 H453',C.teal,2.5,true,true);
  p.token(260,947,['층 2 · p₄','Layer 2 · p₄'],190,'teal',78);
  p.text(ax+20,ay+44,['층 3 · KV Attention','Layer 3 · KV attention'],{size:26,weight:600,width:480});
  p.token(ax+150,ay+110,['층 2에서 온 표현','From layer 2'],260,'blue',64);
  if(mobile)p.path(`M150 879 H6 V${ay+142} H140`,C.blue,2.5,false,true);
  else p.path('M440 879 H475 V1050 H552 V142 H724',C.blue,2.5,false,true);
  p.arrow(ax+280,ay+184,ax+280,ay+211,C.blue);
  p.box(ax+150,ay+221,280,105,['이 층의 Q / K / V','This layer’s Q / K / V'],'q₃, k₃, v₃','blue');
  p.path(`M${ax+140} ${ay+273} H${ax+20} V${ay+740} H${ax+140}`,C.blue,2.5,false,true);
  p.text(ax+32,ay+665,'q₃',{size:24,width:80,color:C.blue});
  p.text(ax+88,ay+402,['p₀–p₂','p₀–p₂'],{size:24,anchor:'middle',width:150,color:C.purple});
  p.text(ax+370,ay+402,['p₀–p₃','p₀–p₃'],{size:24,anchor:'middle',width:170,color:C.purple});
  matrix(p,ax+35,ay+426,[['k₀','v₀'],['k₁','v₁'],['k₂','v₂']],{cellWidth:44,cellHeight:43,gap:6,size:22,tone:'purple'});
  matrix(p,ax+320,ay+426,[['k₀','v₀'],['k₁','v₁'],['k₂','v₂']],{cellWidth:44,cellHeight:43,gap:6,size:22,tone:'purple'});
  matrix(p,ax+320,ay+573,[['k₃','v₃']],{cellWidth:44,cellHeight:43,gap:6,size:22,tone:'orange'});
  p.arrow(ax+139,ay+478,ax+308,ay+478,C.muted);
  p.text(ax+222,ay+442,['유지','Keep'],{size:22,anchor:'middle',width:150,color:C.muted});
  p.path(`M${ax+440} ${ay+273} H${ax+472} V${ay+594} H${ax+424}`,C.orange,2.5,false,true);
  p.text(ax+310,ay+361,'k₃, v₃',{size:24,width:150,color:C.orange});
  p.path(`M${ax+367} ${ay+626} V${ay+646} H${ax+290} V${ay+691}`,C.purple,2.5,false,true);
  p.token(ax+150,ay+701,['q₃로 KV 읽기','Read KV with q₃'],280,'purple',78);
  p.arrow(ax+290,ay+789,ax+290,ay+830,C.blue);
  p.token(ax+150,ay+840,['다음 층의 입력 표현','Input for the next layer'],280,'blue',78);
  p.path(`M${ax+367} ${ay+626} H${ax+501} V${ay+986} H${ax+453}`,C.purple,2.5,true,true);
  p.token(ax+260,ay+947,['층 3 · p₄','Layer 3 · p₄'],190,'purple',78);
  return [p];
 }
} satisfies FigureSpec;
