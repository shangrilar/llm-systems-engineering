import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"gpu-architecture",figureId:"04-capacity-bandwidth-latency",number:"04-capacity-bandwidth-latency",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 4","Figure 4"],
  title:["용량·대역폭·접근 지연은 다릅니다","Capacity, Bandwidth, and Latency Differ"],
  subtitle:["데이터를 담는 양, 전달하는 양, 기다리는 시간을 구분합니다.","Distinguish how much is stored, how much is transferred, and how long we wait."],
  alt:["용량은 같은 크기의 데이터 칸 네 개와 여덟 개가 들어가는 공간으로 비교한다. 대역폭은 같은 시간에 도착한 데이터 묶음 세 개와 여섯 개로 비교한다. 접근 지연은 요청부터 사용 가능 시점까지 짧고 긴 두 시간선으로 비교한다. 각 패널은 독립적인 개념 비교이며 실측 수치가 아니다.","Capacity compares spaces holding four and eight equal data cells. Bandwidth compares three and six data bundles arriving in the same time. Access latency compares short and long timelines from a request until data is available. Each panel is a separate conceptual comparison, not a measurement."],
  caption:["세 패널은 독립적인 개념 비교이며 실측 수치가 아닙니다.","Each panel is an independent conceptual comparison, not a measurement."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,962,1104,[48,206]);
    p.el("rect",{x:48,y:215,width:1104,height:245,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:78,y:271,fill:C.ink,"font-size":30,"font-weight":700,"text-anchor":"start"},["용량","Capacity"]);
    p.el('text',{x:78,y:315,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["얼마나","How much"]);
    p.el('text',{x:78,y:346,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["담을 수 있나?","can it hold?"]);
    p.el('text',{x:744,y:258,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["저장할 수 있는 데이터의 양","Amount of data that can be stored"]);
    p.el("rect",{x:374,y:287,width:208,height:69,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:389,y:303,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:435,y:303,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:481,y:303,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:527,y:303,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:478,y:432,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["작은 용량","Smaller capacity"]);
    p.el("rect",{x:812,y:287,width:208,height:113,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:827,y:303,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:873,y:303,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:919,y:303,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:965,y:303,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:827,y:347,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:873,y:347,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:919,y:347,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:965,y:347,width:39,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:916,y:432,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["큰 용량","Larger capacity"]);
    p.el("rect",{x:48,y:484,width:1104,height:272,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:78,y:542,fill:C.ink,"font-size":30,"font-weight":700,"text-anchor":"start"},["대역폭","Bandwidth"]);
    p.el('text',{x:78,y:586,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["같은 시간에","How much moves"]);
    p.el('text',{x:78,y:617,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["얼마나 전달하나?","in the same time?"]);
    p.el('text',{x:744,y:528,fill:C.blue,"font-size":24,"font-weight":600,"text-anchor":"middle"},["같은 시간에 도착한 데이터","Data arriving in the same time"]);
    p.el('text',{x:417,y:592,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["적게","Less"]);
    p.el("rect",{x:489,y:557,width:602,height:60,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:509,y:570,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:600,y:570,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:691,y:570,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el('text',{x:417,y:691,fill:C.blue,"font-size":22,"font-weight":600,"text-anchor":"middle"},["많이","More"]);
    p.el("rect",{x:489,y:656,width:602,height:60,rx:12,fill:C.paper,stroke:C.line,"stroke-width":1.5});
    p.el("rect",{x:509,y:669,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:600,y:669,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:691,y:669,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:782,y:669,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:873,y:669,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:964,y:669,width:72,height:34,rx:4,fill:C.blueFill,stroke:C.blue,"stroke-width":1.5});
    p.el("rect",{x:48,y:780,width:1104,height:307,rx:12,fill:C.grayFill,stroke:C.line,"stroke-width":1.5});
    p.el('text',{x:78,y:838,fill:C.ink,"font-size":30,"font-weight":700,"text-anchor":"start"},["접근 지연","Access latency"]);
    p.el('text',{x:78,y:882,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["요청한 뒤","After a request,"]);
    p.el('text',{x:78,y:913,fill:C.muted,"font-size":23,"font-weight":400,"text-anchor":"start"},["얼마나 기다리나?","how long to wait?"]);
    p.el('text',{x:385,y:839,fill:C.purple,"font-size":21,"font-weight":600,"text-anchor":"middle"},["요청","Request"]);
    p.el('text',{x:677,y:839,fill:C.purple,"font-size":21,"font-weight":600,"text-anchor":"middle"},["사용 가능","Available"]);
    p.el("rect",{x:385,y:860,width:292,height:44,rx:6,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el("path",{d:"M385,852 V912",fill:"none",stroke:C.purple,"stroke-width":2});
    p.el("path",{d:"M389,882 L677,882",fill:"none",stroke:C.purple,"stroke-width":2.5,"marker-end":markerUrl(C.purple)});
    p.el("path",{d:"M677,852 V912",fill:"none",stroke:C.purple,"stroke-width":2});
    p.el('text',{x:531,y:939,fill:C.purple,"font-size":21,"font-weight":400,"text-anchor":"middle"},["기다리는 시간","Waiting time"]);
    p.el('text',{x:385,y:974,fill:C.purple,"font-size":21,"font-weight":600,"text-anchor":"middle"},["요청","Request"]);
    p.el('text',{x:1058,y:974,fill:C.purple,"font-size":21,"font-weight":600,"text-anchor":"middle"},["사용 가능","Available"]);
    p.el("rect",{x:385,y:995,width:673,height:44,rx:6,fill:C.purpleFill,stroke:C.purpleFill,"stroke-width":1.5});
    p.el("path",{d:"M385,987 V1047",fill:"none",stroke:C.purple,"stroke-width":2});
    p.el("path",{d:"M389,1017 L1058,1017",fill:"none",stroke:C.purple,"stroke-width":2.5,"marker-end":markerUrl(C.purple)});
    p.el("path",{d:"M1058,987 V1047",fill:"none",stroke:C.purple,"stroke-width":2});
    p.el('text',{x:721.5,y:1074,fill:C.purple,"font-size":21,"font-weight":400,"text-anchor":"middle"},["기다리는 시간","Waiting time"]);
    p.el('text',{x:600,y:1151,fill:C.ink,"font-size":27,"font-weight":600,"text-anchor":"middle"},["저장량, 전달량, 기다리는 시간은 서로 다른 특성입니다.","Storage amount, transfer amount, and waiting time are distinct."]);
    return [p];
  },
} satisfies FigureSpec;
