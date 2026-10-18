import {numbered} from './numbers';
import {Panel,C,type FigureSpec,type Label,type Locale} from '@llm-systems/viz';
import {L} from './data';
// When the six models appeared (2026): the day the weights appeared on Hugging Face, from press reports
// (sources below). Where sources differ by a day, one date is shown.
const W=1104,X0=40,X1=1060,AY=210;
const day=(m:number,d:number)=>(Date.UTC(2026,m-1,d)-Date.UTC(2026,6,1))/864e5,SPAN=day(10,8);
const X=(m:number,d:number)=>X0+(X1-X0)*day(m,d)/SPAN;
type E={name:string;m:number;d:number;sure:boolean;when:Label;how:Label;h:number;anchor:'start'|'end'|'middle'};
const EV:E[]=[
 {name:'Kimi K3',m:7,d:27,sure:true,when:'7.27',how:L('KDA 고정 상태 + MLA','KDA state + MLA'),h:-80,anchor:'middle'},
 {name:'Qwen3.8-Flash-Next',m:8,d:26,sure:true,when:'8.26',how:L('GDN 고정 상태 + QSA','GDN state + QSA'),h:80,anchor:'end'},
 {name:'Hy4-preview',m:8,d:28,sure:true,when:'8.28',how:L('DSA + 선택 위치 공유','DSA + shared selection'),h:-80,anchor:'end'},
 {name:'GLM-5.3',m:8,d:29,sure:true,when:'8.29',how:L('DSA + 선택 위치 공유','DSA + shared selection'),h:150,anchor:'start'},
 {name:'DeepSeek V4.1-Flash',m:9,d:10,sure:true,when:'9.10',how:L('압축 · KV 층간 공유 · SWA','compression · cross-layer KV · SWA'),h:-80,anchor:'start'},
 {name:'MiMo-V2.6-Pro',m:9,d:22,sure:true,when:'9.22',how:L('SWA + global 10층','SWA + 10 global layers'),h:80,anchor:'start'}];
function panel(l:Locale){
 const p=new Panel(l,null,0,W);
 p.circle(X0+6,20,5,C.blue,C.blue);p.text(X0+18,26,L('점 = Hugging Face 가중치 공개일 (보도 기준)','dot = weights on Hugging Face (as reported)'),{size:14,width:420});
 p.line(X0,AY,X1,AY,C.muted,2);
 for(const m of [7,8,9,10]){const x=X(m,1);p.line(x,AY-7,x,AY+7,C.muted,1.6);p.text(x+6,AY+26,l==='en'?({7:'Jul',8:'Aug',9:'Sep',10:'Oct'} as Record<number,string>)[m]:`${m}월`,{size:15,weight:700,color:C.muted,width:60});}
 p.text(X0,AY+46,'2026',{size:13,color:C.muted,width:60});
 for(const e of EV){
  const x=X(e.m,e.d),tip=AY-e.h;
  p.line(x,AY,x,tip,C.blue,1.5);
  p.circle(x,AY,6,e.sure?C.blue:C.paper,C.blue);
  const tx2=x+(e.anchor==='start'?8:e.anchor==='end'?-8:0);
  const ys=e.h>0?[tip-40,tip-20,tip-2]:[tip+18,tip+38,tip+56];
  p.text(tx2,ys[0],e.name,{size:16,weight:700,color:C.blue,anchor:e.anchor,width:260});
  p.text(tx2,ys[1],e.when,{size:13,color:C.ink,anchor:e.anchor,width:320});
  p.text(tx2,ys[2],e.how,{size:13,color:C.muted,anchor:e.anchor,width:320});
 }
 p.height=AY+80+72;return p;
}
export default {articleId:'open-models-kv-cache',figureId:'06-timeline',number:'open-models-kv-cache-06-timeline',layout:'wide',eyebrow:numbered('open-models-kv-cache/06-timeline',L('모델 구성','Model makeup')),
 title:L('여섯 모델이 나온 시기','When the six models appeared'),
 subtitle:L('2026년 7–9월 · 가중치 공개일, 보도 기준','July–September 2026 · weights release dates, as reported'),
 captionIn:'article',screens:['desktop'],
 caption:L('점은 Hugging Face에 가중치가 공개된 날이다(보도 기준).','Each dot is the day the weights appeared on Hugging Face (as reported).'),
 alt:L('2026년 7월부터 10월까지의 가로 시간축. Kimi K3 7월 27일, Qwen3.8-Flash-Next 8월 26일, Hy4-preview 8월 28일, GLM-5.3 8월 29일, DeepSeek V4.1-Flash 9월 10일, MiMo-V2.6-Pro 9월 22일. 각 모델 아래에 주요 방법을 적었다.','A horizontal time axis from July to October 2026: Kimi K3 July 27, Qwen3.8-Flash-Next August 26, Hy4-preview August 28, GLM-5.3 August 29, DeepSeek V4.1-Flash September 10, MiMo-V2.6-Pro September 22, each with its main methods.'),
 sources:[{label:'Kimi K3 weights (news, 2026-07-29)',url:'https://fastcompany.co.za/business/2026-07-29-everything-you-need-to-know-about-moonshot-ai-and-its-new-open-weight-model-kimi-k3/'},{label:'Qwen3.8-Flash-Next weights',url:'https://letsdatascience.com/news/alibaba-releases-qwen38-flash-model-weights-publicly-62298bf0'},{label:'Hy4-preview weights',url:'https://letsdatascience.com/news/tencent-releases-hy4-preview-open-model-weights-0f4d878a'},{label:'GLM-5.3 open release (Gigazine)',url:'https://gigazine.net/gsc_news/en/20260829-glm-5-3-open/'},{label:'DeepSeek V4.1-Flash (iThome)',url:'https://www.ithome.com.tw/news/178871'},{label:'MiMo-V2.6 open weights',url:'https://letsdatascience.com/news/xiaomi-releases-mimo-v26-open-weight-multimodal-models-d436ddef'}],panels:(l:Locale)=>[panel(l)]} satisfies FigureSpec;
