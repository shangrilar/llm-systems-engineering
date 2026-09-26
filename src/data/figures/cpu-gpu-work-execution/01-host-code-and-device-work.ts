import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"cpu-gpu-work-execution",figureId:"01-host-code-and-device-work",number:"01-host-code-and-device-work",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["이 코드는 어디에서 실행될까?","Where does this code run?"],
  subtitle:["CPU의 호출 코드와 GPU의 커널 본문을 연결합니다.","Connect CPU calls to the kernel bodies that run on the GPU."],
  alt:["CPU 코드가 GPU 버퍼 확보, 입력 복사, 커널 A와 B 실행, 결과 복사를 요청한다. GPU 커널 A는 입력에 1을 더하고 B는 중간값을 두 배로 만든다. 입력 [1,2,3,4]가 GPU로 복사되고 x, u, y를 거쳐 결과 [4,6,8,10]이 CPU로 돌아온다. 중간값 u는 GPU에 남는다. 점선은 실행 요청, 실선은 데이터 이동이다.","CPU code requests GPU buffers, an input copy, kernel launches A and B, and a result copy. GPU kernel A adds 1 to the input; B doubles the intermediate values. Input [1,2,3,4] is copied to the GPU, passes through x, u, and y, and returns to the CPU as [4,6,8,10]. Intermediate values u stay on the GPU. Dashed arrows represent launch requests; solid arrows represent data flow."],
  caption:["점선은 실행 요청, 실선은 데이터 이동입니다. 값은 설명용 예시입니다.","Dashed lines are execution requests; solid lines are data movement. Values are illustrative."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,820,1104,[48,208]);
    p.el("rect",{x:48,y:210,width:510,height:424,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:612,y:210,width:540,height:424,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:76,y:251,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["CPU에서 실행하는 호출 코드","Calling code on the CPU"]);
    p.el('text',{x:640,y:251,fill:C.ink,"font-size":27,"font-weight":700,"text-anchor":"start"},["GPU에서 실행하는 커널 본문","Kernel bodies on the GPU"]);
    p.el('text',{x:76,y:297,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start","font-family":"Menlo,Consolas,monospace"},"cudaMalloc(...)");
    p.el('text',{x:76,y:325,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["GPU의 x·u·y 버퍼 확보","Allocate GPU buffers for x, u, and y"]);
    p.el('text',{x:76,y:366,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start","font-family":"Menlo,Consolas,monospace"},"cudaMemcpy(...)");
    p.el('text',{x:76,y:394,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["CPU의 입력을 GPU로 복사","Copy CPU input to the GPU"]);
    p.el('text',{x:76,y:590,fill:C.ink,"font-size":23,"font-weight":400,"text-anchor":"start","font-family":"Menlo,Consolas,monospace"},"cudaMemcpy(...)");
    p.el('text',{x:76,y:618,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["GPU의 결과를 CPU로 복사","Copy GPU results to the CPU"]);
    p.el('text',{x:76,y:445,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"start","font-family":"Menlo,Consolas,monospace"},"A<<<...>>>(d_x, d_u);");
    p.el('text',{x:76,y:521,fill:C.teal,"font-size":23,"font-weight":600,"text-anchor":"start","font-family":"Menlo,Consolas,monospace"},"B<<<...>>>(d_u, d_y);");
    p.el("rect",{x:640,y:398,width:484,height:70,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:662,y:425,fill:C.blue,"font-size":21,"font-weight":600,"text-anchor":"start"},["계산 A","Compute A"]);
    p.el('text',{x:662,y:453,fill:C.blue,"font-size":24,"font-weight":400,"text-anchor":"start","font-family":"Menlo,Consolas,monospace"},"u[i] = x[i] + 1;");
    p.el("rect",{x:640,y:474,width:484,height:70,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:662,y:501,fill:C.teal,"font-size":21,"font-weight":600,"text-anchor":"start"},["계산 B","Compute B"]);
    p.el('text',{x:662,y:529,fill:C.teal,"font-size":24,"font-weight":400,"text-anchor":"start","font-family":"Menlo,Consolas,monospace"},"y[i] = 2 * u[i];");
    p.el("path",{d:"M544,437 H631",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue),"stroke-dasharray":"7 7"});
    p.el("path",{d:"M544,513 H631",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal),"stroke-dasharray":"7 7"});
    p.el('text',{x:640,y:310,fill:C.muted,"font-size":(locale==='ko'?23:22),"font-weight":400,"text-anchor":"start"},["공간 확보와 복사는 CPU에서 요청","The CPU requests allocation and copies"]);
    p.el('text',{x:640,y:347,fill:C.muted,"font-size":(locale==='ko'?23:22),"font-weight":400,"text-anchor":"start"},["커널의 계산은 GPU 스레드가 수행","GPU threads perform the computation"]);
    p.el("path",{d:"M646,588 H704",fill:"none",stroke:C.muted,"stroke-width":2,"marker-end":markerUrl(C.muted),"stroke-dasharray":"7 7"});
    p.el('text',{x:719,y:596,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["점선: 커널 실행 요청","Dashed: kernel launch request"]);
    p.el('text',{x:48,y:698,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["데이터가 놓이는 곳과 이동 경로","Where data lives and how it moves"]);
    p.el("rect",{x:48,y:736,width:226,height:160,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:161,y:776,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["CPU 메모리","CPU memory"]);
    p.el("rect",{x:343,y:736,width:514,height:160,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:776,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["GPU 메모리","GPU memory"]);
    p.el("rect",{x:926,y:736,width:226,height:160,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1039,y:776,fill:C.ink,"font-size":24,"font-weight":600,"text-anchor":"middle"},["CPU 메모리","CPU memory"]);
    p.el('text',{x:161,y:829,fill:C.orange,"font-size":25,"font-weight":600,"text-anchor":"middle"},["입력 x","Input x"]);
    p.el('text',{x:161,y:865,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"[1, 2, 3, 4]");
    p.el("rect",{x:364,y:806,width:112,height:62,rx:12,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:420,y:846,fill:C.orange,"font-size":29,"font-weight":600,"text-anchor":"middle"},"x");
    p.el("rect",{x:544,y:806,width:112,height:62,rx:12,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:600,y:846,fill:C.blue,"font-size":29,"font-weight":600,"text-anchor":"middle"},"u");
    p.el("rect",{x:724,y:806,width:112,height:62,rx:12,fill:C.tealFill,stroke:C.teal,"stroke-width":1.5});
    p.el('text',{x:780,y:846,fill:C.teal,"font-size":29,"font-weight":600,"text-anchor":"middle"},"y");
    p.el("path",{d:"M278,837 H355",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el("path",{d:"M860,837 H918",fill:"none",stroke:C.purple,"stroke-width":2,"marker-end":markerUrl(C.purple)});
    p.el("path",{d:"M482,837 H535",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:507,y:793,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},"A");
    p.el("path",{d:"M662,837 H715",fill:"none",stroke:C.teal,"stroke-width":2,"marker-end":markerUrl(C.teal)});
    p.el('text',{x:688,y:793,fill:C.teal,"font-size":22,"font-weight":600,"text-anchor":"middle"},"B");
    p.el('text',{x:1039,y:829,fill:C.teal,"font-size":25,"font-weight":600,"text-anchor":"middle"},["결과 y","Result y"]);
    p.el('text',{x:1039,y:865,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},"[4, 6, 8, 10]");
    p.el("rect",{x:48,y:938,width:1104,height:82,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:983,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["중간값 u는 GPU에 남아 다음 계산 B의 입력이 됩니다.","Intermediate values u stay on the GPU as input to B."]);
    return [p];
  },
} satisfies FigureSpec;
