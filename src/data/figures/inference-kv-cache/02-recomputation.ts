import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"inference-kv-cache",figureId:"02-recomputation",number:"02-recomputation",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["캐시가 없으면 입력 문맥을 다시 계산합니다","Without a cache, recompute the input context"],
  subtitle:["같은 세 실행에서 모델의 각 층이 계산하는 위치를 펼쳐 봅니다.","Unroll the positions computed in each model layer across the same three executions."],
  alt:["캐시가 없을 때 첫 실행은 p0 p1 p2를 계산해 x0를 선택합니다. 다음 실행은 p0 p1 p2를 재계산하고 x0를 새로 계산해 x1을 선택합니다. 그 다음은 p0 p1 p2 x0를 재계산하고 x1을 새로 계산해 x2를 선택합니다.","Without caching, the first execution computes p0 p1 p2 to select x0. The next recomputes p0 p1 p2 and newly computes x0 to select x1. The following recomputes p0 p1 p2 x0 and newly computes x1 to select x2."],
  caption:["캐시가 없으면 실행마다 과거 위치의 K·V와 Attention·MLP 계산을 다시 수행합니다.","Without a cache, every run recomputes past positions’ K and V along with Attention and the MLP."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,1042,1104,[48,206]);
    p.el('text',{x:48,y:220,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["x0 생성","Generate x0"]);
    p.el("rect",{x:48,y:247,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:86,y:284,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("path",{d:"M86,312 L86,334",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:136,y:247,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:174,y:284,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("path",{d:"M174,312 L174,334",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:224,y:247,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:262,y:284,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("path",{d:"M262,312 L262,334",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:30,y:341,width:854,height:112,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:48,y:360,width:76,height:72,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:86,y:389,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el('text',{x:86,y:417,fill:C.orange,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:136,y:360,width:76,height:72,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:174,y:389,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el('text',{x:174,y:417,fill:C.orange,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:224,y:360,width:76,height:72,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:262,y:389,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el('text',{x:262,y:417,fill:C.orange,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el('text',{x:694,y:385,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["모델의 각 층","Each model layer"]);
    p.el('text',{x:694,y:422,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["이 위치들을 계산","Compute these positions"]);
    p.el("path",{d:"M896,396 L1034,396",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:965,y:375,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["선택","Select"]);
    p.el("rect",{x:1044,y:368,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1087,y:405,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
    p.el('text',{x:48,y:530,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["x1 생성","Generate x1"]);
    p.el("rect",{x:48,y:557,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:86,y:594,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("path",{d:"M86,622 L86,644",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:136,y:557,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:174,y:594,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("path",{d:"M174,622 L174,644",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:224,y:557,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:262,y:594,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("path",{d:"M262,622 L262,644",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:312,y:557,width:76,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:350,y:594,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
    p.el("path",{d:"M350,622 L350,644",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:30,y:651,width:854,height:112,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:48,y:670,width:76,height:72,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:86,y:699,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el('text',{x:86,y:727,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:136,y:670,width:76,height:72,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:174,y:699,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el('text',{x:174,y:727,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:224,y:670,width:76,height:72,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:262,y:699,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el('text',{x:262,y:727,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:312,y:670,width:76,height:72,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:350,y:699,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},"x0");
    p.el('text',{x:350,y:727,fill:C.orange,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el('text',{x:694,y:695,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["모델의 각 층","Each model layer"]);
    p.el('text',{x:694,y:732,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["이 위치들을 계산","Compute these positions"]);
    p.el("path",{d:"M896,706 L1034,706",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:965,y:685,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["선택","Select"]);
    p.el("rect",{x:1044,y:678,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1087,y:715,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x1");
    p.el('text',{x:48,y:840,fill:C.ink,"font-size":26,"font-weight":700,"text-anchor":"start"},["x2 생성","Generate x2"]);
    p.el("rect",{x:48,y:867,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:86,y:904,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el("path",{d:"M86,932 L86,954",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:136,y:867,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:174,y:904,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el("path",{d:"M174,932 L174,954",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:224,y:867,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:262,y:904,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el("path",{d:"M262,932 L262,954",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:312,y:867,width:76,height:57,rx:10,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:350,y:904,fill:C.blue,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x0");
    p.el("path",{d:"M350,932 L350,954",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:400,y:867,width:76,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:438,y:904,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x1");
    p.el("path",{d:"M438,932 L438,954",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el("rect",{x:30,y:961,width:854,height:112,rx:10,fill:C.surface,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:48,y:980,width:76,height:72,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:86,y:1009,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p0");
    p.el('text',{x:86,y:1037,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:136,y:980,width:76,height:72,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:174,y:1009,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p1");
    p.el('text',{x:174,y:1037,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:224,y:980,width:76,height:72,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:262,y:1009,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"p2");
    p.el('text',{x:262,y:1037,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:312,y:980,width:76,height:72,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:350,y:1009,fill:C.purple,"font-size":24,"font-weight":700,"text-anchor":"middle"},"x0");
    p.el('text',{x:350,y:1037,fill:C.purple,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el("rect",{x:400,y:980,width:76,height:72,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:438,y:1009,fill:C.orange,"font-size":24,"font-weight":700,"text-anchor":"middle"},"x1");
    p.el('text',{x:438,y:1037,fill:C.orange,"font-size":18,"font-weight":400,"text-anchor":"middle"},["계산","calc"]);
    p.el('text',{x:694,y:1005,fill:C.blue,"font-size":24,"font-weight":700,"text-anchor":"middle"},["모델의 각 층","Each model layer"]);
    p.el('text',{x:694,y:1042,fill:C.blue,"font-size":21,"font-weight":400,"text-anchor":"middle"},["이 위치들을 계산","Compute these positions"]);
    p.el("path",{d:"M896,1016 L1034,1016",stroke:C.muted,"stroke-width":2.5,fill:"none","marker-end":markerUrl(C.muted)});
    p.el('text',{x:965,y:995,fill:C.muted,"font-size":22,"font-weight":400,"text-anchor":"middle"},["선택","Select"]);
    p.el("rect",{x:1044,y:988,width:86,height:57,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:1087,y:1025,fill:C.orange,"font-size":25,"font-weight":700,"text-anchor":"middle"},"x2");
    p.el('text',{x:48,y:1116,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["과거 위치도 다시 계산하지만, 과거 출력을 다시 선택하지는 않습니다.","Earlier positions are recomputed; earlier output tokens are not selected again."]);
    p.el("rect",{x:48,y:1170,width:22,height:22,rx:10,fill:C.purpleFill,stroke:C.purple,"stroke-width":1.5});
    p.el('text',{x:82,y:1190,fill:C.purple,"font-size":23,"font-weight":400,"text-anchor":"start"},["계산 칸: 이미 처리한 위치를 다시 계산","Computation cell: recompute an earlier position"]);
    p.el("rect",{x:48,y:1213,width:22,height:22,rx:10,fill:C.orangeFill,stroke:C.orange,"stroke-width":1.5});
    p.el('text',{x:82,y:1233,fill:C.orange,"font-size":23,"font-weight":400,"text-anchor":"start"},["계산 칸: 새로 입력된 위치를 처음 계산","Computation cell: compute a new position"]);
    return [p];
  },
} satisfies FigureSpec;
