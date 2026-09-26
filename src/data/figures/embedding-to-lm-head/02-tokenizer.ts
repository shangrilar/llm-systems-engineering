import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"embedding-to-lm-head",figureId:"02-tokenizer",number:"02-tokenizer",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["텍스트를 토큰 ID로","From text to token IDs"],
  subtitle:["텍스트를 토큰 조각으로 나누고, 각 조각에 대응하는 정수 ID를 가져옵니다.","Split text into tokens and look up the integer ID for each token."],
  alt:["Hello world!를 Qwen3 토크나이저로 변환한 실제 결과. Hello는 9707, 앞에 공백이 있는 world는 1879, 느낌표는 0이다. 토큰 ID는 임베딩 층의 입력이 된다.","Actual Qwen3 tokenization of Hello world!: Hello maps to 9707, world with a leading space maps to 1879, and the exclamation mark maps to 0. These token IDs are the input to the embedding layer."],
  caption:["Qwen3 실제 예시 · ␣는 공백을 보이게 쓴 기호입니다. 특수 토큰은 추가하지 않았습니다.","Actual Qwen3 example. ␣ marks a space. No special tokens were added."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,511,1104,[48,205]);
    p.el('text',{x:80,y:244,fill:C.muted,"font-size":23,"font-weight":600,"text-anchor":"start"},["입력 텍스트","Input text"]);
    p.el("rect",{x:80,y:268,width:340,height:92,rx:14,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:250,y:324,fill:C.ink,"font-size":34,"font-weight":500,"text-anchor":"middle"},"Hello world!");
    p.el("path",{d:"M440,314 L504,314",fill:"none",stroke:"#8191A0","stroke-width":2.5,"marker-end":markerUrl("#8191A0")});
    p.el("rect",{x:528,y:268,width:300,height:92,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:678,y:314,fill:C.ink,"font-size":28,"font-weight":600,"text-anchor":"middle"},"Tokenizer");
    p.el('text',{x:678,y:345,fill:C.muted,"font-size":21,"font-weight":400,"text-anchor":"middle"},"Qwen3");
    p.el('text',{x:80,y:495,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"start"},["토큰 조각","Token pieces"]);
    p.el('text',{x:80,y:627,fill:C.muted,"font-size":24,"font-weight":600,"text-anchor":"start"},["토큰 ID","Token IDs"]);
    p.el("line",{"x1":678,"y1":370,"x2":678,"y2":388,stroke:"#8191A0","stroke-width":2.5});
    p.el("line",{"x1":440,"y1":388,"x2":1000,"y2":388,stroke:"#8191A0","stroke-width":2.5});
    p.el("path",{d:"M440,388 L440,438",fill:"none",stroke:"#8191A0","stroke-width":2.5,"marker-end":markerUrl("#8191A0")});
    p.el("path",{d:"M720,388 L720,438",fill:"none",stroke:"#8191A0","stroke-width":2.5,"marker-end":markerUrl("#8191A0")});
    p.el("path",{d:"M1000,388 L1000,438",fill:"none",stroke:"#8191A0","stroke-width":2.5,"marker-end":markerUrl("#8191A0")});
    p.el("rect",{x:330,y:450,width:220,height:70,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:440,y:495,fill:C.ink,"font-size":31,"font-weight":500,"text-anchor":"middle"},"Hello");
    p.el("path",{d:"M440,532 L440,569",fill:"none",stroke:"#8191A0","stroke-width":2.5,"marker-end":markerUrl("#8191A0")});
    p.el("rect",{x:330,y:582,width:220,height:70,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:440,y:627,fill:C.ink,"font-size":30,"font-weight":600,"text-anchor":"middle"},"9707");
    p.el("rect",{x:610,y:450,width:220,height:70,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:720,y:495,fill:C.ink,"font-size":31,"font-weight":500,"text-anchor":"middle"},"␣world");
    p.el("path",{d:"M720,532 L720,569",fill:"none",stroke:"#8191A0","stroke-width":2.5,"marker-end":markerUrl("#8191A0")});
    p.el("rect",{x:610,y:582,width:220,height:70,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:720,y:627,fill:C.ink,"font-size":30,"font-weight":600,"text-anchor":"middle"},"1879");
    p.el("rect",{x:890,y:450,width:220,height:70,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1000,y:495,fill:C.ink,"font-size":31,"font-weight":500,"text-anchor":"middle"},"!");
    p.el("path",{d:"M1000,532 L1000,569",fill:"none",stroke:"#8191A0","stroke-width":2.5,"marker-end":markerUrl("#8191A0")});
    p.el("rect",{x:890,y:582,width:220,height:70,rx:14,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:1000,y:627,fill:C.ink,"font-size":30,"font-weight":600,"text-anchor":"middle"},"0");
    p.el('text',{x:678,y:700,fill:C.ink,"font-size":25,"font-weight":600,"text-anchor":"middle"},["토큰마다 고유한 ID가 대응합니다.","Each token has its own ID."]);
    return [p];
  },
} satisfies FigureSpec;
