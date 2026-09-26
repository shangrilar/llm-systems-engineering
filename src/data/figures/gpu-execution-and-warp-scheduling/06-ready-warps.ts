import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-execution-and-warp-scheduling",figureId:"06-ready-warps",number:"06-ready-warps",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 6","Figure 6"],
  title:["상주하는 워프가 모두 실행 가능한 것은 아닙니다","Resident Warps Are Not Always Ready to Execute"],
  subtitle:["스케줄러는 다음 명령을 발행할 수 있는 워프를 선택합니다.","The scheduler selects a warp whose next instruction can be issued."],
  alt:["한 워프 스케줄러의 상주 워프 A,B,C,D를 보여준다. A는 필요한 메모리 읽기 결과를, C는 동기화 지점에서 기다린다. B와 D는 다음 명령을 실행할 준비가 되어 있고 스케줄러가 이번에는 B를 선택해 명령을 발행한다. 상주 4개 중 실행 가능 2개, 선택 1개이다. 준비되었지만 선택되지 않은 D와 명령을 발행할 수 없는 A,C를 구분한다. SM 전체에 스케줄러가 하나라는 뜻이 아니며 그림 5의 워프 0~3과 일대일 배정을 나타내지 않는 별도 예시이다.","One warp scheduler has resident warps A, B, C, and D. A waits for a needed memory read result, and C waits at a synchronization point. B and D are ready for their next instructions, and the scheduler selects B this time. Of four resident warps, two are eligible and one is selected. D is ready but not selected, unlike A and C, which cannot issue their next instructions. This does not mean the SM has only one scheduler; this separate example does not map directly to warps 0 through 3 in Figure 5."],
  caption:["SM 전체에 스케줄러가 하나라는 뜻이 아니며, 그림 5의 워프와 대응하지 않는 별도 예시입니다.","This does not mean one scheduler per SM; it is a separate example, not the warps of Figure 5."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,807,1104,[48,206]);
    p.el("rect",{x:48,y:218,width:726,height:554,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:77,y:263,fill:C.ink,"font-size":(locale==='ko'?28:27),"font-weight":700,"text-anchor":"start"},["한 스케줄러가 담당하는 상주 워프들","Resident warps managed by one scheduler"]);
    p.el("rect",{x:74,y:294,width:674,height:93,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:97,y:329,fill:C.purple,"font-size":26,"font-weight":700,"text-anchor":"start"},["워프 A","Warp A"]);
    p.el('text',{x:97,y:365,fill:C.muted,"font-size":(locale==='ko'?22:20),"font-weight":400,"text-anchor":"start"},["메모리 읽기 결과를 기다림","Waiting for a memory read result"]);
    p.el("rect",{x:571,y:316,width:152,height:48,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:647,y:348,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("rect",{x:74,y:406,width:674,height:93,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:97,y:441,fill:C.teal,"font-size":26,"font-weight":700,"text-anchor":"start"},["워프 B","Warp B"]);
    p.el('text',{x:97,y:477,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["다음 명령을 실행할 준비가 됨","Ready for the next instruction"]);
    p.el("rect",{x:571,y:428,width:152,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:647,y:460,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["실행 가능","Eligible"]);
    p.el("rect",{x:74,y:518,width:674,height:93,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:97,y:553,fill:C.purple,"font-size":26,"font-weight":700,"text-anchor":"start"},["워프 C","Warp C"]);
    p.el('text',{x:97,y:589,fill:C.muted,"font-size":(locale==='ko'?22:20),"font-weight":400,"text-anchor":"start"},["동기화 지점에서 기다림","Waiting at a synchronization point"]);
    p.el("rect",{x:571,y:540,width:152,height:48,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:647,y:572,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},["대기","Waiting"]);
    p.el("rect",{x:74,y:630,width:674,height:93,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:97,y:665,fill:C.teal,"font-size":26,"font-weight":700,"text-anchor":"start"},["워프 D","Warp D"]);
    p.el('text',{x:97,y:701,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},["다음 명령을 실행할 준비가 됨","Ready for the next instruction"]);
    p.el("rect",{x:571,y:652,width:152,height:48,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:647,y:684,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"middle"},["실행 가능","Eligible"]);
    p.el("path",{d:"M750,452 H825 V405 H855",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("path",{d:"M750,676 H825 V472 H855",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el("rect",{x:861,y:354,width:291,height:187,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:1006,y:399,fill:C.blue,"font-size":27,"font-weight":700,"text-anchor":"middle"},["워프 스케줄러","Warp scheduler"]);
    p.el('text',{x:1006,y:449,fill:C.blue,"font-size":(locale==='ko'?23:21),"font-weight":400,"text-anchor":"middle"},["실행 가능한 후보 중","From eligible candidates"]);
    p.el('text',{x:1006,y:493,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["이번에는 B를 선택","Select B this time"]);
    p.el("path",{d:"M1006,551 L1006,612",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:861,y:630,width:291,height:69,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1006.5,y:672.5,fill:C.blue,"font-size":(locale==='ko'?23:22),"font-weight":600,"text-anchor":"middle"},["B의 다음 명령 발행","Issue B's next instruction"]);
    p.el("rect",{x:48,y:821,width:352,height:70,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:224,y:864,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},["상주 4개","4 resident"]);
    p.el("rect",{x:424,y:821,width:352,height:70,rx:12,fill:C.tealFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:864,fill:C.teal,"font-size":28,"font-weight":600,"text-anchor":"middle"},["실행 가능 2개","2 eligible"]);
    p.el("rect",{x:800,y:821,width:352,height:70,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:976,y:864,fill:C.blue,"font-size":28,"font-weight":600,"text-anchor":"middle"},["이번에 선택 1개","1 selected this time"]);
    p.el('text',{x:600,y:949,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["D도 준비되어 있지만, 이번에는 선택되지 않았습니다.","D is also ready, but is not selected this time."]);
    p.el('text',{x:600,y:997,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["대기하는 워프도 SM에 상주하며 자신의 실행 상태를 유지합니다.","Waiting warps remain resident on the SM and retain their execution state."]);
    return [p];
  },
} satisfies FigureSpec;
