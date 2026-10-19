import {Panel,C,connector,type FigureSpec,type Label,type Locale,type Tone} from '@llm-systems/viz';
import {L} from './drawing';
import {numbered} from './numbers';
// Where a CED decoder layer's KV comes from, for the current token t (V4.1 report §2.2–2.3).
// Left: the layer stack, computation flowing upwards. The encoder output builds the shared global KV (main KV +
// search keys), made by the decoder's first Full layer and shared by the rest. Right: inside one decoder layer, its
// own query reads the selected main KV entries together with its own local KV. Teaching size: 2 + 2 layers.
function box(p:Panel,x:number,y:number,w:number,h:number,t:Label,tone:Tone|'gray',o:{bold?:boolean;dash?:boolean;size?:number}={}){
 const c=tone==='gray'?C.gray:C[tone],f=tone==='gray'?C.grayFill:C[`${tone}Fill` as keyof typeof C];
 p.rect(x,y,w,h,f,c,8,o.dash);p.text(x+w/2,y+h/2+7,t,{size:o.size??17,weight:o.bold?700:600,color:c,anchor:'middle',width:w-8});
}
function panel(l:Locale){
 const p=new Panel(l,null,0,1104);
 // Layer stack.
 const sx=40,sw=230,bh=54,yD2=60,yD1=170,yB=262,yE2=300,yE1=410;
 box(p,sx,yD2,sw,bh,L('decoder 층 2','decoder layer 2'),'blue',{bold:true});
 box(p,sx,yD1,sw,bh,L('decoder 층 1','decoder layer 1'),'gray');
 box(p,sx,yE2,sw,bh,L('encoder 층 2','encoder layer 2'),'gray');
 box(p,sx,yE1,sw,bh,L('encoder 층 1','encoder layer 1'),'gray');
 const cx=sx+sw/2;
 p.text(cx,yE1+bh+44,L('토큰 t 입력','token t input'),{size:15,color:C.muted,anchor:'middle',width:200});
 connector(p,[cx,yE1+bh+24],[cx,yE1+bh],{tone:'gray',width:2});
 connector(p,[cx,yE1],[cx,yE2+bh],{tone:'gray',width:2});
 connector(p,[cx,yE2],[cx,yD1+bh],{tone:'gray',width:2});
 connector(p,[cx,yD1],[cx,yD2+bh],{tone:'gray',width:2});
 p.line(sx-20,yB,sx+sw+20,yB,C.teal,1.5,true);
 // Encoder output → shared global KV.
 const gx=440,gy=yB-70,gw=420,gh=140;
 connector(p,[sx+sw+20,yB],[gx,yB],{tone:'teal',width:1.8});
 p.text(sx+sw+30,yB-10,L('encoder 최종 출력','encoder output'),{size:15,color:C.teal,width:150});
 p.rect(gx,gy,gw,gh,C.tealFill,C.teal,10);
 p.text(gx+16,gy+28,L('공유 global KV','shared global KV'),{size:18,weight:700,color:C.teal,width:gw-20});
 p.text(gx+16,gy+52,L('decoder 첫 Full 층이 만들고 나머지 층이 공유','built by the first decoder Full layer, then shared'),{size:14,color:C.teal,width:gw-20});
 const cell=(x:number,y:number,tone:'teal'|'red',t:string)=>{p.rect(x,y,44,30,tone==='teal'?C.tealFill:C.redFill,C[tone],4);p.text(x+22,y+21,t,{size:13,color:C[tone],anchor:'middle',width:42});};
 const lab=['…','t−2','t−1','t'],c0=gx+150;
 p.text(gx+16,gy+86,'main KV',{size:15,weight:600,color:C.teal,width:130});lab.forEach((t,i)=>cell(c0+i*50,gy+66,'teal',t));
 p.text(gx+16,gy+124,L('검색용 key','search keys'),{size:15,weight:600,color:C.red,width:130});lab.forEach((t,i)=>cell(c0+i*50,gy+104,'red',t));
 // Inside decoder layer 2 for token t.
 const zx=440,zy=490,zw=650,zh=320;
 // The zoom frame is a plain path, not a box: the arrows inside it must not count as crossing it.
 p.path(`M${zx} ${zy} H${zx+zw} V${zy+zh} H${zx} Z`,C.blue,1.5,true);
 p.text(zx+16,zy+30,L('decoder 층 2 안에서 (토큰 t)','inside decoder layer 2 (token t)'),{size:17,weight:700,color:C.blue,width:zw-20});
 // Decoder layer 2 and the zoom title share the blue tone, so no extra leader line is drawn.
 box(p,zx+20,zy+140,130,48,L('이 층 입력','layer input'),'gray');
 box(p,zx+210,zy+70,140,48,L('주 Query','main query'),'blue');
 box(p,zx+210,zy+220,140,48,'local KV','orange');
 p.text(zx+280,zy+290,L('이 층 저장소에 쌓임','kept in this layer’s cache'),{size:14,color:C.orange,anchor:'middle',width:220});
 connector(p,[zx+150,zy+156],[zx+210,zy+94],{via:[[zx+180,zy+156],[zx+180,zy+94]],tone:'blue',width:1.8});
 connector(p,[zx+150,zy+172],[zx+210,zy+244],{via:[[zx+180,zy+172],[zx+180,zy+244]],tone:'orange',width:1.8});
 // Main attention: own query scores [selected main KV ; own local KV], then a weighted sum.
 const ax=zx+420,ay=zy+110,aw=210,ah=120;
 p.rect(ax,ay,aw,ah,C.blueFill,C.blue,10);
 p.text(ax+aw/2,ay+40,L('주 attention','main attention'),{size:18,weight:700,color:C.blue,anchor:'middle',width:aw-10});
 p.text(ax+aw/2,ay+68,L('자기 주 Query로 점수','scores with its own query'),{size:14,color:C.blue,anchor:'middle',width:aw-10});
 p.text(ax+aw/2,ay+90,L('→ 가중합','→ weighted sum'),{size:14,color:C.blue,anchor:'middle',width:aw-10});
 connector(p,[zx+350,zy+94],[ax,ay+30],{via:[[zx+385,zy+94],[zx+385,ay+30]],tone:'blue',width:1.8});
 connector(p,[zx+350,zy+244],[ax,ay+ah-30],{via:[[zx+385,zy+244],[zx+385,ay+ah-30]],tone:'orange',width:1.8});
 // Selection: search keys → chosen positions; the selected main KV entries go into the main attention.
 const selx=900,sely=gy+gh+40;
 box(p,selx,sely,190,44,L('위치 선택','pick positions'),'red');
 p.text(selx+95,sely+64,L('Full·Reindex: 선택','Full, Reindex: select'),{size:13,color:C.red,anchor:'middle',width:190});
 p.text(selx+95,sely+82,L('Reuse: 목록 재사용','Reuse: reuse the list'),{size:13,color:C.red,anchor:'middle',width:190});
 connector(p,[gx+gw,gy+119],[selx+95,sely],{via:[[selx+95,gy+119]],tone:'red',width:1.8});
 connector(p,[gx+gw-60,gy+gh],[ax+60,ay],{tone:'teal',width:1.8,via:[[gx+gw-60,ay-40],[ax+60,ay-40]]});
 p.text(gx+gw-50,ay-50,L('선택된 main KV','selected main KV'),{size:14,color:C.teal,width:160});
 connector(p,[selx+95,sely+92],[ax+aw-40,ay],{via:[[selx+95,ay-20],[ax+aw-40,ay-20]],tone:'red',width:1.8});
 // Output goes up to the next layer.
 p.text(ax+aw/2,ay+ah+48,L('출력 → 다음 층','output → next layer'),{size:15,color:C.muted,anchor:'middle',width:aw});
 connector(p,[ax+aw/2,ay+ah],[ax+aw/2,ay+ah+26],{tone:'blue',width:1.8});
 p.text(0,zy+zh+40,L('예시 2+2층 / 실제 20+20층 · 정규화와 위치 변환은 생략','example 2 + 2 layers / real 20 + 20 · normalization and position transforms omitted'),{size:15,color:C.muted,width:1100});
 p.height=zy+zh+64;return p;
}
export default {articleId:'deepseek-kv-cache',figureId:'06-ced-sources',number:'deepseek-kv-cache-06-ced-sources',layout:'wide',eyebrow:numbered('deepseek-kv-cache/06-ced-sources','CED'),
 title:L('decoder 층은 두 출처의 KV를 자기 Query로 읽는다','A decoder layer reads KV from two sources with its own query'),
 subtitle:L('global KV는 encoder 출력에서 · Query와 local KV는 이 층에서 · 보고서의 CED 실행 방식','global KV from the encoder output · query and local KV from this layer · CED as run in the report'),
 captionIn:'article',screens:['desktop'],
 caption:L('CED decoder 층의 KV 출처. global KV(main KV와 검색용 key)는 encoder 최종 출력에서 decoder 첫 Full 층이 만들고 나머지 층이 공유한다. 각 decoder 층은 자기 입력에서 주 Query와 local KV를 만들고, 자기 주 Query로 선택된 main KV와 자기 local KV를 함께 읽는다.','Where a CED decoder layer’s KV comes from. The global KV (main KV and search keys) is built from the encoder output by the decoder’s first Full layer and shared by the rest. Each decoder layer makes its own query and local KV from its input and reads the selected main KV together with its own local KV with that query.'),
 alt:L('왼쪽은 아래에서 위로 쌓인 encoder 층 1·2와 decoder 층 1·2. encoder 최종 출력에서 오른쪽의 공유 global KV(main KV와 검색용 key)로 화살표가 간다. 아래 확대 상자는 decoder 층 2 안에서 이 층 입력이 주 Query와 local KV로 갈라지고, 검색용 key로 고른 위치의 main KV와 local KV를 주 Query가 함께 읽어 가중합하는 과정을 보여 준다.','Left: encoder layers 1–2 and decoder layers 1–2 stacked upwards. The encoder output feeds the shared global KV (main KV and search keys) on the right. The zoom box shows decoder layer 2: its input splits into its main query and local KV, and the main query reads the main KV entries picked with the search keys together with the local KV, then takes a weighted sum.'),
 sources:[{label:'DeepSeek-V4.1-Flash report · §2.2, §2.3',url:'https://arxiv.org/abs/2609.19969'}],
 panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
