import {C,Panel,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"pipeline-parallelism",figureId:"pp-batch-wait",number:"pp-batch-wait",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["배치를 통째로 넘기면 GPU들이 차례로 계산합니다","Passing the whole batch makes GPUs compute one at a time"],
  subtitle:["입력 하나의 토큰을 자르지 않고, 네 입력을 함께 다음 단계로 전달합니다.","Keep each input sequence intact and pass all four inputs to the next stage together."],
  alt:["GPU 0부터 3까지 배치 A·B·C·D를 각각 4칸씩 차례로 계산한다. 각 구간에서 GPU 하나만 계산하고 나머지 세 개는 이 배치를 계산하지 않는다.","GPUs 0 through 3 compute batch A, B, C, D in sequence, taking four slots each. In each interval, only one GPU computes while the other three do no work on this batch."],
  caption:["레이어를 나누어 담았지만, 이 배치만 실행하면 계산은 여전히 GPU 순서대로 진행됩니다.","The layers are split, but running this batch alone still computes one GPU after another."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,751,1104,[48,196]);
    p.el('text',{x:600,y:207,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["배치 크기 4: 입력 A·B·C·D를 한 묶음으로 실행","Batch size 4: execute inputs A, B, C, D as one group"]);
    p.el("rect",{x:134,y:235,width:206,height:85,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:148,y:264,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"start"},"A");
    p.el("rect",{x:149,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:184.2,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:219.4,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:254.6,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:289.8,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:371,y:235,width:206,height:85,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:385,y:264,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"B");
    p.el("rect",{x:386,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:421.2,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:456.4,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:491.6,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:526.8,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:608,y:235,width:206,height:85,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:622,y:264,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"start"},"C");
    p.el("rect",{x:623,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:658.2,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:693.4,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:728.6,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:763.8,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:845,y:235,width:206,height:85,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:859,y:264,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"start"},"D");
    p.el("rect",{x:860,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:895.2,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:930.4,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:965.6,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1000.8,y:280,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:600,y:366,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["한 배치의 순전파 · 파란 블록 = 계산 · 회색 구간 = 이 배치의 계산 없음","One batch, forward only · Blue = computing · Gray = no work on this batch"]);
    p.el('text',{x:248,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"0");
    p.el('text',{x:302,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"1");
    p.el('text',{x:356,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"2");
    p.el('text',{x:410,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"3");
    p.el('text',{x:464,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"4");
    p.el('text',{x:518,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"5");
    p.el('text',{x:572,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"6");
    p.el('text',{x:626,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"7");
    p.el('text',{x:680,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"8");
    p.el('text',{x:734,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"9");
    p.el('text',{x:788,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"10");
    p.el('text',{x:842,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"11");
    p.el('text',{x:896,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"12");
    p.el('text',{x:950,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"13");
    p.el('text',{x:1004,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"14");
    p.el('text',{x:1058,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"15");
    p.el('text',{x:1112,y:410,fill:C.muted,"font-size":17,"font-weight":400,"text-anchor":"middle"},"16");
    p.el('text',{x:70,y:459,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},"GPU 0");
    p.el('text',{x:70,y:487,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"start"},["레이어 0·1","Layers 0, 1"]);
    p.el("rect",{x:248,y:428,width:864,height:64,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:788,y:467,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["계산 없음","No computation"]);
    p.el("rect",{x:250,y:428,width:212,height:64,rx:10,fill:C.line,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:356,y:467,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"A · B · C · D");
    p.el('text',{x:70,y:541,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},"GPU 1");
    p.el('text',{x:70,y:569,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"start"},["레이어 2·3","Layers 2, 3"]);
    p.el("rect",{x:248,y:510,width:864,height:64,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:356,y:549,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["입력 대기","Waiting for input"]);
    p.el('text',{x:896,y:549,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["계산 없음","No computation"]);
    p.el("rect",{x:466,y:510,width:212,height:64,rx:10,fill:C.line,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:572,y:549,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"A · B · C · D");
    p.el('text',{x:70,y:623,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},"GPU 2");
    p.el('text',{x:70,y:651,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"start"},["레이어 4·5","Layers 4, 5"]);
    p.el("rect",{x:248,y:592,width:864,height:64,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:464,y:631,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["입력 대기","Waiting for input"]);
    p.el('text',{x:1004,y:631,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["계산 없음","No computation"]);
    p.el("rect",{x:682,y:592,width:212,height:64,rx:10,fill:C.line,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:788,y:631,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"A · B · C · D");
    p.el('text',{x:70,y:705,fill:C.ink,"font-size":24,"font-weight":700,"text-anchor":"start"},"GPU 3");
    p.el('text',{x:70,y:733,fill:C.muted,"font-size":19,"font-weight":400,"text-anchor":"start"},["레이어 6·7","Layers 6, 7"]);
    p.el("rect",{x:248,y:674,width:864,height:64,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:572,y:713,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},["입력 대기","Waiting for input"]);
    p.el("rect",{x:898,y:674,width:212,height:64,rx:10,fill:C.line,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:1004,y:713,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},"A · B · C · D");
    p.el('text',{x:600,y:804,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["예시: 단계마다 배치 전체를 4칸 동안 계산 · 통신 시간 생략","Example: four slots per stage for the whole batch; communication omitted"]);
    p.el("rect",{x:48,y:839,width:1104,height:100,rx:10,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:875,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"start"},["한 GPU가 계산하는 동안, 다른 세 GPU는 이 배치를 계산하지 못합니다.","While one GPU computes, the other three do no work on this batch."]);
    p.el('text',{x:72,y:915,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start"},["다음 GPU는 네 입력의 결과를 모두 받은 뒤 시작합니다.","The next GPU starts only after receiving results for all four inputs."]);
    return [p];
  },
} satisfies FigureSpec;
