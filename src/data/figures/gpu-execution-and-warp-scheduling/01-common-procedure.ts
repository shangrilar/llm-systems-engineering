import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-execution-and-warp-scheduling",figureId:"01-common-procedure",number:"01-common-procedure",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["출력은 여러 개지만 계산 절차는 같습니다","Many Outputs, One Computation Procedure"],
  subtitle:["같은 위치의 입력 두 개를 읽고, 더한 뒤, 그 위치에 결과를 저장합니다.","Read two inputs at the same position, add them, and store the result there."],
  alt:["벡터의 위치 0부터 3에서 A의 1,2,3,4와 B의 10,20,30,40을 각각 더해 C에 11,22,33,44를 저장한다. 각 출력은 다른 위치의 결과를 기다리지 않는다. 아래에서는 공통 절차를 A[i]와 B[i] 읽기, 더하기, C[i]에 저장하기로 정리한다. i는 0부터 시작하는 데이터 위치다.","At positions 0 through 3, add the values 1, 2, 3, 4 from A to 10, 20, 30, 40 from B and store 11, 22, 33, 44 in C. Each output is independent of results at other positions. Below, the common procedure is expressed as reading A[i] and B[i], adding them, and storing the result in C[i]. The index i starts at 0."],
  caption:["사용하는 값은 달라도, 같은 위치의 입력 두 개를 읽고 더해 그 위치에 저장하는 절차는 같습니다.","The values differ, but every output follows the same procedure: read two inputs at one position, add them, and store the result there."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,702,1104,[48,206]);
    p.raw("<g transform=\"translate(0,-50)\">");
    p.el("rect",{x:48,y:263,width:258,height:278,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:177,y:304,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["위치 0","Position 0"]);
    p.el('text',{x:177,y:355,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"A[0] = 1");
    p.el('text',{x:177,y:395,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"B[0] = 10");
    p.el("path",{d:"M78,417 H276",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:177,y:466,fill:C.orange,"font-size":29,"font-weight":700,"text-anchor":"middle"},"1 + 10 = 11");
    p.el('text',{x:177,y:511,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["C[0]에 저장","Store in C[0]"]);
    p.el("rect",{x:330,y:263,width:258,height:278,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:459,y:304,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["위치 1","Position 1"]);
    p.el('text',{x:459,y:355,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"A[1] = 2");
    p.el('text',{x:459,y:395,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"B[1] = 20");
    p.el("path",{d:"M360,417 H558",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:459,y:466,fill:C.orange,"font-size":29,"font-weight":700,"text-anchor":"middle"},"2 + 20 = 22");
    p.el('text',{x:459,y:511,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["C[1]에 저장","Store in C[1]"]);
    p.el("rect",{x:612,y:263,width:258,height:278,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:741,y:304,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["위치 2","Position 2"]);
    p.el('text',{x:741,y:355,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"A[2] = 3");
    p.el('text',{x:741,y:395,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"B[2] = 30");
    p.el("path",{d:"M642,417 H840",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:741,y:466,fill:C.orange,"font-size":29,"font-weight":700,"text-anchor":"middle"},"3 + 30 = 33");
    p.el('text',{x:741,y:511,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["C[2]에 저장","Store in C[2]"]);
    p.el("rect",{x:894,y:263,width:258,height:278,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1023,y:304,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["위치 3","Position 3"]);
    p.el('text',{x:1023,y:355,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"A[3] = 4");
    p.el('text',{x:1023,y:395,fill:C.ink,"font-size":25,"font-weight":400,"text-anchor":"middle"},"B[3] = 40");
    p.el("path",{d:"M924,417 H1122",fill:"none",stroke:C.line,"stroke-width":2});
    p.el('text',{x:1023,y:466,fill:C.orange,"font-size":29,"font-weight":700,"text-anchor":"middle"},"4 + 40 = 44");
    p.el('text',{x:1023,y:511,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["C[3]에 저장","Store in C[3]"]);
    p.el('text',{x:600,y:594,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["다른 위치의 결과를 기다리지 않고 각 출력을 구합니다.","Compute each output without waiting for results at other positions."]);
    p.el("path",{d:"M600,624 L600,672",fill:"none",stroke:C.blue,"stroke-width":2.5,"marker-end":markerUrl(C.blue)});
    p.el('text',{x:600,y:720,fill:C.blue,"font-size":(locale==='ko'?28:27),"font-weight":700,"text-anchor":"middle"},["모든 위치에서 반복하는 공통 계산 절차","The same computation procedure at every position"]);
    p.el("rect",{x:76,y:754,width:300,height:134,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:226,y:804,fill:C.blue,"font-size":26,"font-weight":700,"text-anchor":"middle"},["입력 읽기","Read inputs"]);
    p.el('text',{x:226,y:853,fill:C.ink,"font-size":26,"font-weight":400,"text-anchor":"middle"},["A[i]와 B[i]","A[i] and B[i]"]);
    p.el("path",{d:"M387,821 L438,821",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:450,y:754,width:300,height:134,rx:12,fill:C.orangeFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:600,y:804,fill:C.orange,"font-size":26,"font-weight":700,"text-anchor":"middle"},["더하기","Add"]);
    p.el('text',{x:600,y:853,fill:C.ink,"font-size":26,"font-weight":400,"text-anchor":"middle"},"A[i] + B[i]");
    p.el("path",{d:"M761,821 L812,821",fill:"none",stroke:C.blue,"stroke-width":2,"marker-end":markerUrl(C.blue)});
    p.el("rect",{x:824,y:754,width:300,height:134,rx:12,fill:C.blueFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:974,y:804,fill:C.blue,"font-size":26,"font-weight":700,"text-anchor":"middle"},["결과 저장","Store result"]);
    p.el('text',{x:974,y:853,fill:C.ink,"font-size":26,"font-weight":400,"text-anchor":"middle"},["C[i]에 저장","Store in C[i]"]);
    p.el('text',{x:600,y:943,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"middle"},["i는 담당할 데이터의 위치입니다. 여기서는 0부터 번호를 붙입니다.","i is the assigned data position. Here, positions are numbered from 0."]);
    p.raw('</g>');
    return [p];
  },
} satisfies FigureSpec;
