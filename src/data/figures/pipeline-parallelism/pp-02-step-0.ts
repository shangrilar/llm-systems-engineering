import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"pipeline-parallelism",figureId:"pp-02-step-0",number:"pp-02-step-0",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["한 배치를 더 작은 마이크로배치로 나누기","Split one batch into smaller microbatches"],
  subtitle:["색 = 입력 A·B·C·D · 작은 칸 = 각 시퀀스의 토큰","Colors = inputs A, B, C, D · Small cells = tokens in each sequence"],
  alt:["배치에 있던 네 입력 시퀀스를 하나씩 나누되 각 시퀀스의 토큰은 유지한다. 모든 입력은 네 GPU를 통과하고 학습 예시에서는 기울기를 모아 한 번 갱신한다.","Split four input sequences into individual microbatches without splitting their tokens. All inputs pass through all four GPUs; in the training example, accumulate their gradients for one update."],
  caption:["크기 1은 설명용 예시입니다. 모든 마이크로배치는 GPU 0부터 GPU 3까지 모두 통과합니다.","A size of 1 is illustrative; every microbatch passes through GPU 0 to GPU 3."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,809,1104,[48,196]);
    p.el("rect",{x:100,y:209,width:1000,height:168,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:249,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"middle"},["배치 크기 4 = 입력 시퀀스 4개","Batch size 4 = four input sequences"]);
    p.el("rect",{x:134,y:270,width:206,height:85,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:148,y:299,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"start"},"A");
    p.el("rect",{x:149,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:184.2,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:219.4,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:254.6,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:289.8,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:371,y:270,width:206,height:85,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:385,y:299,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"B");
    p.el("rect",{x:386,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:421.2,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:456.4,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:491.6,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:526.8,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:608,y:270,width:206,height:85,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:622,y:299,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"start"},"C");
    p.el("rect",{x:623,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:658.2,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:693.4,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:728.6,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:763.8,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:845,y:270,width:206,height:85,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:859,y:299,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"start"},"D");
    p.el("rect",{x:860,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:895.2,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:930.4,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:965.6,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1000.8,y:315,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("path",{d:"M600,389 L600,445",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:780,y:425,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["토큰은 자르지 않음","Keep each sequence intact"]);
    p.el("rect",{x:48,y:467,width:264,height:188,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:501,fill:C.blue,"font-size":22,"font-weight":700,"text-anchor":"middle"},["마이크로배치 1","Microbatch 1"]);
    p.el("rect",{x:77,y:520,width:206,height:85,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:91,y:549,fill:C.blue,"font-size":23,"font-weight":700,"text-anchor":"start"},"A");
    p.el("rect",{x:92,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:127.2,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:162.4,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:197.6,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:232.8,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:180,y:637,fill:C.ink,"font-size":21,"font-weight":400,"text-anchor":"middle"},["크기 1","Size 1"]);
    p.el("rect",{x:328,y:467,width:264,height:188,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:460,y:501,fill:C.teal,"font-size":22,"font-weight":700,"text-anchor":"middle"},["마이크로배치 2","Microbatch 2"]);
    p.el("rect",{x:357,y:520,width:206,height:85,rx:10,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:371,y:549,fill:C.teal,"font-size":23,"font-weight":700,"text-anchor":"start"},"B");
    p.el("rect",{x:372,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:407.2,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:442.4,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:477.6,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el("rect",{x:512.8,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:460,y:637,fill:C.ink,"font-size":21,"font-weight":400,"text-anchor":"middle"},["크기 1","Size 1"]);
    p.el("rect",{x:608,y:467,width:264,height:188,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:740,y:501,fill:C.purple,"font-size":22,"font-weight":700,"text-anchor":"middle"},["마이크로배치 3","Microbatch 3"]);
    p.el("rect",{x:637,y:520,width:206,height:85,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:651,y:549,fill:C.purple,"font-size":23,"font-weight":700,"text-anchor":"start"},"C");
    p.el("rect",{x:652,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:687.2,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:722.4,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:757.6,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el("rect",{x:792.8,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:740,y:637,fill:C.ink,"font-size":21,"font-weight":400,"text-anchor":"middle"},["크기 1","Size 1"]);
    p.el("rect",{x:888,y:467,width:264,height:188,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:501,fill:C.orange,"font-size":22,"font-weight":700,"text-anchor":"middle"},["마이크로배치 4","Microbatch 4"]);
    p.el("rect",{x:917,y:520,width:206,height:85,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:931,y:549,fill:C.orange,"font-size":23,"font-weight":700,"text-anchor":"start"},"D");
    p.el("rect",{x:932,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:967.2,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1002.4,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1037.6,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el("rect",{x:1072.8,y:565,width:33.2,height:23,rx:10,fill:"white",stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1020,y:637,fill:C.ink,"font-size":21,"font-weight":400,"text-anchor":"middle"},["크기 1","Size 1"]);
    p.el('text',{x:600,y:707,fill:C.ink,"font-size":25,"font-weight":700,"text-anchor":"middle"},["처리할 입력은 그대로 네 개 · 더 작은 묶음 네 개로 실행","Still four inputs · Executed as four smaller groups"]);
    p.el("rect",{x:100,y:746,width:1000,height:104,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:785,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["A·B·C·D 각각이 같은 경로를 끝까지 통과","A, B, C, and D each follow the same complete path"]);
    p.el('text',{x:600,y:827,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"middle"},"GPU 0 → GPU 1 → GPU 2 → GPU 3");
    p.el("rect",{x:100,y:888,width:1000,height:109,rx:10,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:928,fill:C.ink,"font-size":23,"font-weight":700,"text-anchor":"middle"},["학습 예시: 네 마이크로배치의 기울기를 누적 → 가중치 한 번 갱신","Training: accumulate gradients across four microbatches → one update"]);
    p.el('text',{x:600,y:970,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["마이크로배치 하나마다 가중치를 바꾸는 예시가 아닙니다.","This example does not update weights after each microbatch."]);
    return [p];
  },
} satisfies FigureSpec;
