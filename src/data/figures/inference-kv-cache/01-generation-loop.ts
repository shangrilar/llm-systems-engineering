import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-kv-cache",figureId:"01-generation-loop",number:"01-generation-loop",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 1","Figure 1"],
  title:["선택한 출력이 다음 입력이 됩니다","The selected output becomes the next input"],
  subtitle:["p0 p1 p2로 시작해, 방금 선택한 토큰을 입력 문맥에 붙이며 생성을 이어 갑니다.","Starting from p0 p1 p2, append each selected token to the input context and continue generating."],
  alt:["입력 문맥 p0 p1 p2로 x0를 선택하고, x0를 문맥에 추가해 x1을 선택하며, x1을 추가해 x2를 선택합니다. 각 출력에서 다음 입력의 같은 토큰으로 화살표가 연결됩니다.","Context p0 p1 p2 selects x0. Appending x0 enables selection of x1, and appending x1 enables selection of x2. Each output connects directly to the same token in the next input."],
  caption:["다음에 입력할 토큰은 현재 토큰을 선택한 뒤에 정해집니다.","The next input token is known only after the current token is chosen."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,880,1104,[48,206]);
    if(locale==='ko'){
      p.el('text',{x:48,y:220,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},"x0 생성");
      p.el("rect",{x:48,y:255,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:86,y:292,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
      p.el("rect",{x:136,y:255,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:174,y:292,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
      p.el("rect",{x:224,y:255,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:262,y:292,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
      p.el("path",{d:"M314,283 L694,283",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el("rect",{x:704,y:237,width:180,height:108,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:794,y:278,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},"모델");
      p.el('text',{x:794,y:319,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"예측 점수");
      p.el("path",{d:"M896,283 L1034,283",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:965,y:262,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"선택");
      p.el("rect",{x:1044,y:255,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:1087,y:292,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
      p.el('text',{x:48,y:353,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"start"},"입력 문맥");
      p.el("path",{d:"M1087,322 V396 H350 V517",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:470,y:439,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},"선택한 토큰을 다음 입력에 추가");
      p.el('text',{x:48,y:490,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},"x1 생성");
      p.el("rect",{x:48,y:525,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:86,y:562,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
      p.el("rect",{x:136,y:525,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:174,y:562,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
      p.el("rect",{x:224,y:525,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:262,y:562,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
      p.el("rect",{x:312,y:525,width:76,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:350,y:562,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
      p.el("path",{d:"M402,553 L694,553",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el("rect",{x:704,y:507,width:180,height:108,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:794,y:548,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},"모델");
      p.el('text',{x:794,y:589,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"예측 점수");
      p.el("path",{d:"M896,553 L1034,553",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:965,y:532,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"선택");
      p.el("rect",{x:1044,y:525,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:1087,y:562,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x1");
      p.el('text',{x:48,y:623,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"start"},"입력 문맥");
      p.el("path",{d:"M1087,592 V666 H438 V787",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:470,y:709,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},"선택한 토큰을 다음 입력에 추가");
      p.el('text',{x:48,y:760,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},"x2 생성");
      p.el("rect",{x:48,y:795,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:86,y:832,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
      p.el("rect",{x:136,y:795,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:174,y:832,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
      p.el("rect",{x:224,y:795,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:262,y:832,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
      p.el("rect",{x:312,y:795,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:350,y:832,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
      p.el("rect",{x:400,y:795,width:76,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:438,y:832,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x1");
      p.el("path",{d:"M490,823 L694,823",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el("rect",{x:704,y:777,width:180,height:108,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:794,y:818,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},"모델");
      p.el('text',{x:794,y:859,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"예측 점수");
      p.el("path",{d:"M896,823 L1034,823",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:965,y:802,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"선택");
      p.el("rect",{x:1044,y:795,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:1087,y:832,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x2");
      p.el('text',{x:48,y:893,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"start"},"입력 문맥");
      p.el('text',{x:48,y:975,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},"각 실행의 마지막 입력 위치에서 나온 점수로 다음 토큰을 선택합니다.");
      p.el('text',{x:48,y:1040,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"입력 문맥은 생성이 참조하는 정보입니다. 실제로 다시 계산할 위치는 다음 그림에서 살펴봅니다.");
    }else{
      p.el('text',{x:48,y:220,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},"Generate x0");
      p.el("rect",{x:48,y:255,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:86,y:292,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
      p.el("rect",{x:136,y:255,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:174,y:292,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
      p.el("rect",{x:224,y:255,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:262,y:292,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
      p.el("path",{d:"M314,283 L694,283",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el("rect",{x:704,y:237,width:180,height:108,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:794,y:278,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},"Model");
      p.el('text',{x:794,y:319,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"Prediction scores");
      p.el("path",{d:"M896,283 L1034,283",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:965,y:262,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"Select");
      p.el("rect",{x:1044,y:255,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:1087,y:292,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
      p.el('text',{x:48,y:353,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"start"},"Input context");
      p.el("path",{d:"M1087,322 V396 H350 V517",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:470,y:439,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},"Append the selected token to the next input");
      p.el('text',{x:48,y:490,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},"Generate x1");
      p.el("rect",{x:48,y:525,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:86,y:562,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
      p.el("rect",{x:136,y:525,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:174,y:562,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
      p.el("rect",{x:224,y:525,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:262,y:562,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
      p.el("rect",{x:312,y:525,width:76,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:350,y:562,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
      p.el("path",{d:"M402,553 L694,553",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el("rect",{x:704,y:507,width:180,height:108,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:794,y:548,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},"Model");
      p.el('text',{x:794,y:589,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"Prediction scores");
      p.el("path",{d:"M896,553 L1034,553",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:965,y:532,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"Select");
      p.el("rect",{x:1044,y:525,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:1087,y:562,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x1");
      p.el('text',{x:48,y:623,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"start"},"Input context");
      p.el("path",{d:"M1087,592 V666 H438 V787",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:470,y:709,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},"Append the selected token to the next input");
      p.el('text',{x:48,y:760,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},"Generate x2");
      p.el("rect",{x:48,y:795,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:86,y:832,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
      p.el("rect",{x:136,y:795,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:174,y:832,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
      p.el("rect",{x:224,y:795,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:262,y:832,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
      p.el("rect",{x:312,y:795,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:350,y:832,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
      p.el("rect",{x:400,y:795,width:76,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:438,y:832,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x1");
      p.el("path",{d:"M490,823 L694,823",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el("rect",{x:704,y:777,width:180,height:108,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
      p.el('text',{x:794,y:818,fill:C.blue,"font-size":28,"font-weight":700,"text-anchor":"middle"},"Model");
      p.el('text',{x:794,y:859,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},"Prediction scores");
      p.el("path",{d:"M896,823 L1034,823",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
      p.el('text',{x:965,y:802,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},"Select");
      p.el("rect",{x:1044,y:795,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
      p.el('text',{x:1087,y:832,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x2");
      p.el('text',{x:48,y:893,fill:C.blue,"font-size":23,"font-weight":400,"text-anchor":"start"},"Input context");
      p.el('text',{x:48,y:975,fill:C.ink,"font-size":24,"font-weight":400,"text-anchor":"start"},"Each execution selects the next token from scores at its final input position.");
      p.el('text',{x:48,y:1040,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"Input context is the information generation uses. The next figure shows which positions");
      p.el('text',{x:48,y:1070.8,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"start"},"are computed.");
    }
    return [p];
  },
} satisfies FigureSpec;
