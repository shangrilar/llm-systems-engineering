import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-architecture",figureId:"03-read-compute-write",number:"03-read-compute-write",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 3","Figure 3"],
  title:["두 값을 더할 때 일어나는 일","What Happens When We Add Two Values?"],
  subtitle:["a = 2, b = 3을 읽어 c = 5를 만드는 과정을 따라갑니다.","Follow the steps from reading a = 2 and b = 3 to producing c = 5."],
  alt:["입력 읽기, 덧셈 실행, 결과 보관, 결과 저장의 네 단계. 메모리에 있는 a=2와 b=3을 register로 읽고 CUDA Core에서 더한 결과 c=5를 register에 담은 뒤 메모리에 저장한다. 캐시와 데이터 이동 장치의 세부 동작은 생략한다.","Four steps: read inputs, execute addition, keep the result, and store the result. Values a=2 and b=3 are read from memory into registers. A CUDA Core adds them, puts c=5 in a register, and the result is stored in memory. Cache and data movement details are omitted."],
  caption:["캐시와 데이터 이동 장치의 세부 동작은 생략했습니다.","Details of caches and data movement hardware are omitted."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,842,1104,[48,206]);
    p.el("rect",{x:48,y:220,width:528,height:348,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:266,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["① 입력 읽기","① Read inputs"]);
    p.el('text',{x:72,y:526,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["입력 값을 register로 가져옵니다.","Read the input values into registers."]);
    p.el("rect",{x:624,y:220,width:528,height:348,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:648,y:266,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["② 덧셈 실행","② Execute addition"]);
    p.el('text',{x:648,y:526,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["준비된 두 값을 CUDA Core가 더합니다.","A CUDA Core adds the two ready values."]);
    p.el("rect",{x:48,y:612,width:528,height:348,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:72,y:658,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["③ 결과 보관","③ Keep the result"]);
    p.el('text',{x:72,y:918,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["계산 결과를 register에 담습니다.","Keep the computed result in a register."]);
    p.el("rect",{x:624,y:612,width:528,height:348,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:648,y:658,fill:C.ink,"font-size":28,"font-weight":700,"text-anchor":"start"},["④ 결과 저장","④ Store the result"]);
    p.el('text',{x:648,y:918,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"start"},["register의 결과를 메모리에 씁니다.","Write the register result to memory."]);
    p.el("rect",{x:76,y:310,width:176,height:164,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:164,y:349,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["메모리","Memory"]);
    p.el('text',{x:164,y:399,fill:C.blue,"font-size":26,"font-weight":400,"text-anchor":"middle"},"a = 2");
    p.el('text',{x:164,y:436,fill:C.blue,"font-size":26,"font-weight":400,"text-anchor":"middle"},"b = 3");
    p.el("rect",{x:372,y:310,width:176,height:164,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:460,y:349,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Register");
    p.el('text',{x:460,y:399,fill:C.purple,"font-size":26,"font-weight":400,"text-anchor":"middle"},"a = 2");
    p.el('text',{x:460,y:436,fill:C.purple,"font-size":26,"font-weight":400,"text-anchor":"middle"},"b = 3");
    p.el("path",{d:"M261,392 L359,392",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:310,y:367,fill:C.blue,"font-size":20,"font-weight":600,"text-anchor":"middle"},["읽기","Read"]);
    p.el("rect",{x:652,y:310,width:176,height:164,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:740,y:349,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Register");
    p.el('text',{x:740,y:399,fill:C.purple,"font-size":26,"font-weight":400,"text-anchor":"middle"},"a = 2");
    p.el('text',{x:740,y:436,fill:C.purple,"font-size":26,"font-weight":400,"text-anchor":"middle"},"b = 3");
    p.el("rect",{x:948,y:310,width:176,height:164,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1036,y:349,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},"CUDA Core");
    p.el('text',{x:1036,y:399,fill:C.orange,"font-size":26,"font-weight":400,"text-anchor":"middle"},"2 + 3");
    p.el("path",{d:"M837,392 L935,392",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:886,y:367,fill:C.orange,"font-size":20,"font-weight":600,"text-anchor":"middle"},["입력","Inputs"]);
    p.el("rect",{x:76,y:702,width:176,height:164,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:164,y:741,fill:C.orange,"font-size":23,"font-weight":600,"text-anchor":"middle"},"CUDA Core");
    p.el('text',{x:164,y:791,fill:C.orange,"font-size":26,"font-weight":400,"text-anchor":"middle"},"2 + 3 = 5");
    p.el("rect",{x:372,y:702,width:176,height:164,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:460,y:741,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Register");
    p.el('text',{x:460,y:791,fill:C.purple,"font-size":26,"font-weight":400,"text-anchor":"middle"},"c = 5");
    p.el("path",{d:"M261,784 L359,784",fill:"none",stroke:C.orange,"stroke-width":3,"marker-end":markerUrl(C.orange)});
    p.el('text',{x:310,y:759,fill:C.orange,"font-size":20,"font-weight":600,"text-anchor":"middle"},["결과","Result"]);
    p.el("rect",{x:652,y:702,width:176,height:164,rx:12,fill:C.purpleFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:740,y:741,fill:C.purple,"font-size":23,"font-weight":600,"text-anchor":"middle"},"Register");
    p.el('text',{x:740,y:791,fill:C.purple,"font-size":26,"font-weight":400,"text-anchor":"middle"},"c = 5");
    p.el("rect",{x:948,y:702,width:176,height:164,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1036,y:741,fill:C.blue,"font-size":23,"font-weight":600,"text-anchor":"middle"},["메모리","Memory"]);
    p.el('text',{x:1036,y:791,fill:C.blue,"font-size":26,"font-weight":400,"text-anchor":"middle"},"c = 5");
    p.el("path",{d:"M837,784 L935,784",fill:"none",stroke:C.blue,"stroke-width":3,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:886,y:759,fill:C.blue,"font-size":20,"font-weight":600,"text-anchor":"middle"},["쓰기","Write"]);
    p.el('text',{x:600,y:1031,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["계산의 앞뒤에는 데이터를 읽고 저장하는 과정이 있습니다.","Data is read before computation and stored afterward."]);
    return [p];
  },
} satisfies FigureSpec;
