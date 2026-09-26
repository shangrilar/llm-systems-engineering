import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-architecture",figureId:"02-memory-spaces",number:"02-memory-spaces",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["데이터는 어디에 보관할까요?","Where Is Data Stored?"],
  subtitle:["여러 SM이 접근하는 공간과 각 SM 안의 공간을 구분합니다.","Distinguish storage shared across SMs from storage inside each SM."],
  alt:["SM A와 SM B 각각에 register와 L1 캐시 및 shared memory가 있다. L1 캐시와 shared memory는 온칩 저장 자원을 나누어 쓰지만 역할은 다르다. 각 SM은 공통 L2 캐시와 HBM에 접근한다. 연결선은 접근 관계이며 모든 데이터의 필수 이동 순서를 뜻하지 않는다.","SM A and SM B each have registers, L1 cache, and shared memory. L1 cache and shared memory share on-chip resources but have different roles. Each SM accesses a common L2 cache and HBM. Lines indicate access relationships, not a mandatory sequence for all data."],
  caption:["연결선은 접근 관계를 나타내며, 모든 데이터가 거치는 이동 순서를 뜻하지 않습니다.","Lines show access relationships, not a sequence that every piece of data must follow."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,972,1104,[48,206]);
    p.el("rect",{x:48,y:220,width:536,height:497,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:264,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"SM A");
    p.el("rect",{x:72,y:288,width:488,height:105,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:96,y:326,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"start"},"Register");
    p.el('text',{x:96,y:365,fill:C.purple,"font-size":(locale==='ko'?23:20),"font-weight":400,"text-anchor":"start"},["각 계산에 사용할 값과 중간 결과","Values and intermediate results for computation"]);
    p.el("rect",{x:72,y:415,width:488,height:268,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:96,y:451,fill:C.muted,"font-size":21,"font-weight":600,"text-anchor":"start"},["온칩 저장 자원을 나누어 사용","Shared on-chip storage resources"]);
    p.el("rect",{x:90,y:473,width:216,height:184,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:198,y:512,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["L1 캐시","L1 cache"]);
    p.el('text',{x:198,y:556,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["접근한 데이터의","Retains some"]);
    p.el('text',{x:198,y:587,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["일부를 보관해","accessed data"]);
    p.el('text',{x:198,y:618,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["다시 읽을 때 활용","for later reads"]);
    p.el("rect",{x:320,y:473,width:198,height:184,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:419,y:512,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"Shared memory");
    p.el('text',{x:419,y:556,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["함께 쓸 데이터를","Shared data is"]);
    p.el('text',{x:419,y:587,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["프로그램이","placed explicitly"]);
    p.el('text',{x:419,y:618,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["직접 배치","by the program"]);
    p.el("rect",{x:616,y:220,width:536,height:497,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:640,y:264,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"SM B");
    p.el("rect",{x:640,y:288,width:488,height:105,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:664,y:326,fill:C.purple,"font-size":25,"font-weight":600,"text-anchor":"start"},"Register");
    p.el('text',{x:664,y:365,fill:C.purple,"font-size":(locale==='ko'?23:20),"font-weight":400,"text-anchor":"start"},["각 계산에 사용할 값과 중간 결과","Values and intermediate results for computation"]);
    p.el("rect",{x:640,y:415,width:488,height:268,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:664,y:451,fill:C.muted,"font-size":21,"font-weight":600,"text-anchor":"start"},["온칩 저장 자원을 나누어 사용","Shared on-chip storage resources"]);
    p.el("rect",{x:658,y:473,width:216,height:184,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:766,y:512,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["L1 캐시","L1 cache"]);
    p.el('text',{x:766,y:556,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["접근한 데이터의","Retains some"]);
    p.el('text',{x:766,y:587,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["일부를 보관해","accessed data"]);
    p.el('text',{x:766,y:618,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["다시 읽을 때 활용","for later reads"]);
    p.el("rect",{x:888,y:473,width:198,height:184,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:987,y:512,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"middle"},"Shared memory");
    p.el('text',{x:987,y:556,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["함께 쓸 데이터를","Shared data is"]);
    p.el('text',{x:987,y:587,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["프로그램이","placed explicitly"]);
    p.el('text',{x:987,y:618,fill:C.teal,"font-size":21,"font-weight":400,"text-anchor":"middle"},["직접 배치","by the program"]);
    p.el("path",{d:"M316,718 V759 H884 V718",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("path",{d:"M600,759 V809",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("rect",{x:48,y:810,width:1104,height:116,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:78,y:855,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"start"},["L2 캐시","L2 cache"]);
    p.el('text',{x:78,y:895,fill:C.blue,"font-size":24,"font-weight":400,"text-anchor":"start"},["여러 SM의 메모리 접근을 돕는 공통 캐시","A common cache supporting memory access across SMs"]);
    p.el("path",{d:"M600,927 V980",fill:"none",stroke:C.blue,"stroke-width":2.5});
    p.el("rect",{x:48,y:982,width:1104,height:116,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:78,y:1027,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"start"},"HBM");
    p.el('text',{x:78,y:1067,fill:C.blue,"font-size":24,"font-weight":400,"text-anchor":"start"},["모델 가중치, 입력, 중간 데이터 등을 담는 큰 저장 공간","Large storage for model weights, inputs, intermediate data, and more"]);
    p.el('text',{x:600,y:1161,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},["저장 공간마다 위치와 역할이 다릅니다.","Each storage space has a different location and role."]);
    return [p];
  },
} satisfies FigureSpec;
