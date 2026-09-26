import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-execution-and-warp-scheduling",figureId:"02-indexed-executions",number:"02-indexed-executions",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["담당 인덱스가 다른 실행으로 나눕니다","Separate Executions, Different Indices"],
  subtitle:["절차는 같고, 인덱스 i에 따라 읽는 입력과 저장하는 위치가 달라집니다.","The procedure stays the same; i determines which inputs to read and where to store."],
  alt:["공통 계산 절차를 i=0,1,2인 세 개의 실행 흐름으로 펼친다. 각 실행은 A[i]와 B[i]를 읽어 더하고 C[i]에 저장한다. 첫 실행은 1+10=11을 C[0]에, 둘째는 2+20=22를 C[1]에, 셋째는 3+30=33을 C[2]에 저장한다. 각 실행 흐름 아래에 스레드 0,1,2라고 이름을 붙인다.","The common computation procedure is expanded into three execution flows with i=0, 1, and 2. Each reads A[i] and B[i], adds them, and stores the result in C[i]. The first stores 1+10=11 in C[0], the second stores 2+20=22 in C[1], and the third stores 3+30=33 in C[2]. The flows are labeled Thread 0, 1, and 2."],
  caption:["각 스레드는 같은 절차를 실행하고, 인덱스 i로 자신이 사용할 데이터 위치만 정합니다.","Every thread runs the same procedure; the index i only selects which data positions it uses."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,890,1104,[48,206]);
    p.el("rect",{x:252,y:214,width:696,height:76,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:260,fill:C.ink,"font-size":(locale==='ko'?27:25),"font-weight":600,"text-anchor":"middle"},["공통 절차: A[i]와 B[i]를 더해 C[i]에 저장","Common procedure: add A[i] and B[i], store in C[i]"]);
    p.el("path",{d:"M600,302 V330 H224 M600,330 H976",fill:"none",stroke:C.blue,"stroke-width":2});
    p.el("path",{d:"M224,331 L224,353",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:48,y:368,width:352,height:656,rx:12,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:224,y:416,fill:C.blue,"font-size":32,"font-weight":700,"text-anchor":"middle"},"i = 0");
    p.el("rect",{x:72,y:454,width:304,height:121,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:224,y:499,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["A[0]에서 1 읽기","Read 1 from A[0]"]);
    p.el('text',{x:224,y:546,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["B[0]에서 10 읽기","Read 10 from B[0]"]);
    p.el("path",{d:"M224,587 L224,622",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:72,y:637,width:304,height:76,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:224,y:683,fill:C.orange,"font-size":29,"font-weight":600,"text-anchor":"middle"},"1 + 10 = 11");
    p.el("path",{d:"M224,726 L224,768",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:72,y:784,width:304,height:93,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:224,y:838.5,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["C[0]에 11 저장","Store 11 in C[0]"]);
    p.el('text',{x:224,y:948,fill:C.blue,"font-size":29,"font-weight":700,"text-anchor":"middle"},["스레드 0","Thread 0"]);
    p.el('text',{x:224,y:990,fill:C.muted,"font-size":(locale==='ko'?22:20),"font-weight":400,"text-anchor":"middle"},["하나의 개별 실행 흐름","One individual execution flow"]);
    p.el("path",{d:"M600,331 L600,353",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:424,y:368,width:352,height:656,rx:12,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:600,y:416,fill:C.blue,"font-size":32,"font-weight":700,"text-anchor":"middle"},"i = 1");
    p.el("rect",{x:448,y:454,width:304,height:121,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:499,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["A[1]에서 2 읽기","Read 2 from A[1]"]);
    p.el('text',{x:600,y:546,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["B[1]에서 20 읽기","Read 20 from B[1]"]);
    p.el("path",{d:"M600,587 L600,622",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:448,y:637,width:304,height:76,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:683,fill:C.orange,"font-size":29,"font-weight":600,"text-anchor":"middle"},"2 + 20 = 22");
    p.el("path",{d:"M600,726 L600,768",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:448,y:784,width:304,height:93,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:838.5,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["C[1]에 22 저장","Store 22 in C[1]"]);
    p.el('text',{x:600,y:948,fill:C.blue,"font-size":29,"font-weight":700,"text-anchor":"middle"},["스레드 1","Thread 1"]);
    p.el('text',{x:600,y:990,fill:C.muted,"font-size":(locale==='ko'?22:20),"font-weight":400,"text-anchor":"middle"},["하나의 개별 실행 흐름","One individual execution flow"]);
    p.el("path",{d:"M976,331 L976,353",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:800,y:368,width:352,height:656,rx:12,fill:C.paper,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:976,y:416,fill:C.blue,"font-size":32,"font-weight":700,"text-anchor":"middle"},"i = 2");
    p.el("rect",{x:824,y:454,width:304,height:121,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:976,y:499,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["A[2]에서 3 읽기","Read 3 from A[2]"]);
    p.el('text',{x:976,y:546,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["B[2]에서 30 읽기","Read 30 from B[2]"]);
    p.el("path",{d:"M976,587 L976,622",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:824,y:637,width:304,height:76,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:976,y:683,fill:C.orange,"font-size":29,"font-weight":600,"text-anchor":"middle"},"3 + 30 = 33");
    p.el("path",{d:"M976,726 L976,768",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:824,y:784,width:304,height:93,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:976,y:838.5,fill:C.blue,"font-size":27,"font-weight":600,"text-anchor":"middle"},["C[2]에 33 저장","Store 33 in C[2]"]);
    p.el('text',{x:976,y:948,fill:C.blue,"font-size":29,"font-weight":700,"text-anchor":"middle"},["스레드 2","Thread 2"]);
    p.el('text',{x:976,y:990,fill:C.muted,"font-size":(locale==='ko'?22:20),"font-weight":400,"text-anchor":"middle"},["하나의 개별 실행 흐름","One individual execution flow"]);
    p.el('text',{x:600,y:1080,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["각 스레드는 같은 절차를 자신의 인덱스에 해당하는 데이터로 수행합니다.","Each thread follows the same procedure on data at its own index."]);
    return [p];
  },
} satisfies FigureSpec;
