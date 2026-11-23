import {Panel,C,matrix,cells,type FigureSpec} from '@llm-systems/viz';
import {data,fmt,sources} from './shared';
const numeric=(rows:number[][],d=2)=>rows.map(r=>r.map(n=>fmt(n,d)));
export default {
 articleId:'training-01-forward-backward',figureId:'01-training-cycle',number:'1-1',eyebrow:['그림 1','Figure 1'],
 title:['예측한 값을 따라가면 학습 한 스텝이 보인다','Follow the values through one training step'],
 subtitle:['토큰 → 확률 → loss → gradient → 새 가중치','Tokens → probabilities → loss → gradients → new weights'],
 alt:['입력 토큰에서 activation과 가중치를 읽어 확률을 만들고 정답 확률이 loss로 모인다. Loss의 gradient는 dW와 dX로 갈라지며 optimizer가 W를 쓴다.','Tokens produce activations; reading weights produces probabilities. Target probabilities become loss. Gradients branch into dW and dX; the optimizer writes W.'],
 caption:['CPU toy의 실제 값과 학습 경로를 함께 그렸다. Softmax 이전 logits와 내부 연산은 축약했다. Backward는 W를 바꾸지 않으며 optimizer step이 새 W를 쓴다.','Recorded CPU toy values with the training path. Logits before softmax and internal operations are abbreviated. Backward leaves W unchanged; optimizer step writes new W.'],captionIn:'article',sources,layout:'wide',
 panels(locale,mobile){
  const p=new Panel(locale,null,mobile?1080:635,mobile?328:1104),small=mobile?16:19;
  if(mobile){
   cells(p,0,26,data.vocabulary,{w:76,h:38,gap:8,tone:'teal',size:18});
   p.path('M164 75 V90 H48 V105',C.teal,2.5,false,true);
   p.text(20,134,'X',{color:C.teal,weight:600,size:22});p.text(192,134,'W',{color:C.blue,weight:600,size:22});
   matrix(p,0,154,numeric(data.activation),{cellWidth:45,cellHeight:31,gap:3,tone:'teal',size:13});
   matrix(p,131,154,numeric(data.weight_before,1),{cellWidth:41,cellHeight:31,gap:3,tone:'blue',size:14});
   p.text(110,190,'×',{size:27});
   p.path('M48 296 V325 H164 V337',C.blue,3,false,true);p.path('M217 230 V325 H164',C.blue,3);
   p.text(164,360,['다음 토큰 확률','Next-token probabilities'],{size:19,anchor:'middle',width:326,color:C.blue});
   matrix(p,20,406,data.probabilities.slice(0,3).map(r=>r.map(n=>fmt(n,2))),{cellWidth:69,cellHeight:37,gap:3,size:17,tone:(r,c)=>data.target_ids[r]===c?'teal':'blue',columnLabels:data.vocabulary});
   p.path('M20 538 Q164 615 308 538',C.teal,2);p.arrow(164,577,164,618,C.teal);
   p.circle(164,667,43,C.orangeFill,C.orange);p.text(164,660,'loss',{anchor:'middle',width:100,size:19,color:C.orange});p.text(164,688,fmt(data.loss),{anchor:'middle',width:100,size:24,color:C.orange,weight:600});
   p.arrow(120,681,66,759,C.orange);p.arrow(208,681,268,759,C.orange);
   p.text(42,794,'dX',{size:23,color:C.orange,weight:600});p.text(197,794,'dW',{size:23,color:C.orange,weight:600});
   matrix(p,0,812,numeric(data.dX),{cellWidth:46,cellHeight:29,gap:3,size:13,tone:'orange'});
   matrix(p,133,812,numeric(data.dW),{cellWidth:43,cellHeight:29,gap:3,size:13,tone:'orange'});
   p.arrow(48,950,48,990,C.orange);p.text(48,1027,['이전 층','Earlier layer'],{size:17,anchor:'middle',width:112,color:C.orange});
   p.arrow(229,893,229,932,C.purple);p.circle(229,977,39,C.purpleFill,C.purple);p.text(229,982,'step',{size:23,anchor:'middle',width:90,color:C.purple});
   p.path('M275 977 H327 V209 H316',C.purple,3,false,true);p.text(273,1050,['W 쓰기','Write W'],{size:19,color:C.purple,width:110,anchor:'middle'});
  }else{
   cells(p,0,52,data.vocabulary,{w:65,h:37,gap:7,tone:'teal',size:18});
   p.text(0,26,['입력','Input'],{size:small,color:C.teal});p.arrow(138,100,138,142,C.teal);
   p.text(110,174,'X · 4×2',{size:24,color:C.teal});matrix(p,92,196,numeric(data.activation),{cellWidth:58,cellHeight:38,gap:4,tone:'teal',size:18});
   p.text(260,258,'×',{size:36});p.text(337,174,'W · 2×4',{size:24,color:C.blue});matrix(p,324,196,numeric(data.weight_before,1),{cellWidth:53,cellHeight:38,gap:4,tone:'blue',size:18});
   p.arrow(568,252,625,252,C.blue);p.text(596,192,['예측','Predict'],{size:18,color:C.blue,anchor:'middle',width:100});
   p.text(650,155,['다음 토큰 확률','Next-token probabilities'],{size:23,color:C.blue});
   matrix(p,648,196,data.probabilities.map(r=>r.map(n=>fmt(n,2))),{cellWidth:55,cellHeight:38,gap:4,size:18,tone:(r,c)=>data.target_ids[r]===c?'teal':'blue',columnLabels:data.vocabulary});
   p.path('M888 215 H910 Q930 252 958 252',C.teal,3);p.path('M888 258 H918 Q938 252 958 252',C.teal,3);p.path('M888 300 H910 Q930 252 958 252',C.teal,3);p.arrow(958,252,982,252,C.teal);
   p.circle(1040,252,49,C.orangeFill,C.orange);p.text(1040,243,'loss',{size:23,color:C.orange,anchor:'middle',width:100});p.text(1040,273,fmt(data.loss),{size:27,color:C.orange,weight:600,anchor:'middle',width:100});
   p.path('M1040 309 V490 H894',C.orange,3,false,true);p.text(926,402,'Backward',{color:C.orange,size:23,width:100});
   p.text(696,414,'dlogits',{size:23,color:C.orange});matrix(p,648,440,numeric(data.dY),{cellWidth:55,cellHeight:32,gap:4,tone:'orange',size:16});
   p.path('M634 473 H580 H560',C.orange,3,false,true);p.text(390,414,'dW · 2×4',{size:23,color:C.orange});matrix(p,324,440,numeric(data.dW),{cellWidth:53,cellHeight:32,gap:4,tone:'orange',size:16});
   p.path('M580 473 V604 H242 V511 H228',C.orange,3,false,true);p.text(110,414,'dX · 4×2',{size:23,color:C.orange});matrix(p,92,440,numeric(data.dX),{cellWidth:58,cellHeight:32,gap:4,tone:'orange',size:16});
   p.arrow(76,500,20,500,C.orange);p.text(0,569,['이전 층','Earlier layer'],{size:18,color:C.orange,width:90});
   p.path('M435 429 V423 H535 V340 H471',C.purple,3,false,true);p.circle(435,340,28,C.purpleFill,C.purple);p.text(435,347,'step',{size:19,color:C.purple,anchor:'middle',width:64});p.arrow(435,304,435,288,C.purple);
   p.text(308,361,['W 쓰기','Write W'],{size:20,color:C.purple,width:110});
  }
  return [p];
 }
} satisfies FigureSpec;
