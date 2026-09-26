import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"cpu-gpu-work-execution",figureId:"03-host-waits-for-result",number:"03-host-waits-for-result",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["CPU는 언제 기다릴까?","When does the CPU wait?"],
  subtitle:["완료를 기다리는 GPU → CPU 복사 호출로 결과를 가져옵니다.","Retrieve results with a GPU → CPU copy call that waits for completion."],
  alt:["CPU는 A와 B를 등록하고 GPU에서 CPU로 결과를 복사하는 cudaMemcpy 호출에서 기다린다. 그동안 GPU는 계산 A, 계산 B, 결과 복사를 진행한다. 결과가 CPU 메모리에 준비되면 복사 호출이 반환되고 CPU가 실제 값을 사용한다. CPU의 대기와 GPU의 작업은 같은 시간에 일어난다.","The CPU submits A and B, then waits in a cudaMemcpy call that copies the result from GPU to CPU. Meanwhile, the GPU performs A, B, and the result copy. Once the result is ready in CPU memory, the call returns and the CPU uses the values. The CPU wait and GPU work overlap in time."],
  caption:["복사 호출에서 기다리는 시간에는 앞선 GPU 계산이 끝나기를 기다리는 시간도 포함될 수 있습니다.","Time spent in the copy call can include waiting for earlier GPU computation to finish."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,575,1104,[48,208]);
    p.el('text',{x:48,y:222,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["CPU에서 실제 결과 y를 사용하는 경우","When the CPU needs the actual values of y"]);
    p.el("path",{d:"M240,254 H1142",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted)});
    p.el('text',{x:1148,y:239,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"end"},["시간 →","Time →"]);
    p.el('text',{x:48,y:329,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},"CPU");
    p.el('text',{x:48,y:365,fill:C.muted,"font-size":(locale==='ko'?22:18),"font-weight":400,"text-anchor":"start"},["등록·결과 사용","Submit / use results"]);
    p.el("rect",{x:240,y:297,width:176,height:70,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:328,y:341,fill:C.blue,"font-size":25,"font-weight":600,"text-anchor":"middle"},["A·B 등록","Submit A, B"]);
    p.el("rect",{x:448,y:297,width:522,height:70,rx:12,fill:C.grayFill,stroke:C.muted,"stroke-width":1.5});
    p.el('text',{x:709,y:341,fill:C.muted,"font-size":26,"font-weight":600,"text-anchor":"middle"},["결과 복사 호출 안에서 대기","Wait inside the result-copy call"]);
    p.el("rect",{x:970,y:297,width:168,height:70,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:1054,y:341,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["결과 사용","Use results"]);
    p.el('text',{x:449,y:412,fill:C.muted,"font-size":20,"font-weight":400,"text-anchor":"start","font-family":"Menlo,Consolas,monospace"},"cudaMemcpy(..., cudaMemcpyDeviceToHost)");
    p.el('text',{x:48,y:526,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["GPU 작업","GPU work"]);
    p.el('text',{x:48,y:562,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["계산·복사","Compute / copy"]);
    p.el("rect",{x:320,y:492,width:270,height:86,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:455,y:544,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},["계산 A","Compute A"]);
    p.el("rect",{x:590,y:492,width:230,height:86,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:705,y:544,fill:C.teal,"font-size":29,"font-weight":600,"text-anchor":"middle"},["계산 B","Compute B"]);
    p.el("rect",{x:820,y:492,width:150,height:86,rx:12,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:895,y:527,fill:C.purple,"font-size":24,"font-weight":600,"text-anchor":"middle"},["결과 복사","Copy result"]);
    p.el('text',{x:895,y:560,fill:C.purple,"font-size":19,"font-weight":400,"text-anchor":"middle"},"GPU → CPU");
    p.el("path",{d:"M970,483 V375",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el('text',{x:971,y:619,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"end"},["CPU 메모리에 결과 준비","Result ready in CPU memory"]);
    p.el("rect",{x:48,y:661,width:1104,height:114,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:706,fill:C.ink,"font-size":(locale==='ko'?27:26),"font-weight":600,"text-anchor":"middle"},["CPU가 기다리는 동안에도 GPU 계산과 데이터 전달은 진행됩니다.","GPU computation and data transfer continue while the CPU waits."]);
    p.el('text',{x:600,y:745,fill:C.muted,"font-size":24,"font-weight":400,"text-anchor":"middle"},["결과 복사가 끝나야 CPU가 y의 실제 값을 사용할 수 있습니다.","The CPU can use the values of y once the result copy finishes."]);
    return [p];
  },
} satisfies FigureSpec;
