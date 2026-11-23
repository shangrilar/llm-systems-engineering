import {C,Panel,markerUrl,type FigureSpec,type Locale} from '@llm-systems/viz';
// Ported from the published SVG with its original geometry; replace parts with shared primitives when editing.
export default {
  articleId:"choosing-parallelism",figureId:"02-replicate-the-group",number:"02-replicate-the-group",
  layout:'wide',screens:['desktop'],
  eyebrow:["그림 2","Figure 2"],
  title:["실행 가능한 GPU 그룹을 통째로 복제하기","Replicate the entire working GPU group"],
  subtitle:["GPU 0·1의 가중치 배치를 GPU 2·3에도 동일하게 둡니다.","Copy the weight placement on GPUs 0–1 to GPUs 2–3."],
  alt:["두GPU로 된 TP그룹을 복제한다. GPU0과2는 W1/W2, GPU1과3은 W3/W4를 보관한다. 그룹1의 두GPU가 A/B 요청을 함께 계산하고 그룹2의 두GPU가 C/D를 함께 계산한다.","Replicate the two-GPU TP group. GPUs0 and2 hold W1/W2; GPUs1 and3 hold W3/W4. Both GPUs in group1 compute requests A/B; both GPUs in group2 compute C/D."],
  caption:["두 그룹은 같은 가중치 배치를 가진 독립적인 복제본입니다.","The two groups are independent replicas with the same weight placement."],
  sources:[],
  defs:"<marker id=\"ported-arrow-start\" viewBox=\"0 0 10 10\" refX=\"1\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M9 1 L1 5 L9 9\" fill=\"none\" stroke=\"#5C6C7C\" stroke-width=\"1.5\" /></marker>",
  panels(locale:Locale){
    const p=new Panel(locale,null,969,1104,[48,117]);
    p.el('text',{x:48,y:145,"font-size":20,fill:C.muted,"font-weight":400,"text-anchor":"start"},["↔ : 그룹 내부 통신 관계","↔ : communication within a group"]);
    p.el('text',{x:600,y:213,"font-size":27,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["서로 다른 요청 A · B · C · D","Independent requests A · B · C · D"]);
    p.el("rect",{x:412,y:236,width:76,height:44,rx:8,fill:C.tealFill,stroke:C.teal,"stroke-width":2});
    p.el('text',{x:450,y:265,"font-size":23,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"A");
    p.el("rect",{x:512,y:236,width:76,height:44,rx:8,fill:C.tealFill,stroke:C.teal,"stroke-width":2});
    p.el('text',{x:550,y:265,"font-size":23,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"B");
    p.el("rect",{x:612,y:236,width:76,height:44,rx:8,fill:C.tealFill,stroke:C.teal,"stroke-width":2});
    p.el('text',{x:650,y:265,"font-size":23,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"C");
    p.el("rect",{x:712,y:236,width:76,height:44,rx:8,fill:C.tealFill,stroke:C.teal,"stroke-width":2});
    p.el('text',{x:750,y:265,"font-size":23,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"D");
    p.el("path",{d:"M480,294 L480,331 L312,331 L312,373",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M720,294 L720,331 L888,331 L888,373",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:48,y:387,width:528,height:568,rx:12,fill:C.surface,stroke:C.blue,"stroke-width":2});
    p.el('text',{x:312,y:429,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["그룹 1 · 기존 모델 한 벌","Group 1 · One model replica"]);
    p.el("rect",{x:117,y:457,width:390,height:44,rx:8,fill:C.tealFill,stroke:C.teal,"stroke-width":2});
    p.el('text',{x:312,y:486,"font-size":23,fill:C.teal,"font-weight":700,"text-anchor":"middle"},["배정된 요청 A · B","Assigned requests A · B"]);
    p.el("path",{d:"M312,510 L312,538 L180,538 L180,558",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M312,538 L444,538 L444,558",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:68,y:566,width:224,height:253,rx:12,fill:"white",stroke:C.line,"stroke-width":2});
    p.el('text',{x:180,y:606,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"GPU 0");
    p.el("rect",{x:84,y:633,width:96,height:58,rx:0,fill:C.line,stroke:C.blue,"stroke-width":2});
    p.el('text',{x:132,y:670,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W1");
    p.el("rect",{x:180,y:633,width:96,height:58,rx:0,fill:"#bbdaf7",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:228,y:670,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W2");
    p.el('text',{x:180,y:735,"font-size":25,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"A · B");
    p.el('text',{x:180,y:782,"font-size":18,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["계산에 참여","Participate in computation"]);
    p.el("rect",{x:332,y:566,width:224,height:253,rx:12,fill:"white",stroke:C.line,"stroke-width":2});
    p.el('text',{x:444,y:606,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"GPU 1");
    p.el("rect",{x:348,y:633,width:96,height:58,rx:0,fill:"#9bc9f1",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:396,y:670,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W3");
    p.el("rect",{x:444,y:633,width:96,height:58,rx:0,fill:"#79b4e5",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:492,y:670,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W4");
    p.el('text',{x:444,y:735,"font-size":25,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"A · B");
    p.el('text',{x:444,y:782,"font-size":18,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["계산에 참여","Participate in computation"]);
    p.el("path",{d:"M299,684 L325,684",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted),"marker-start":"url(#ported-arrow-start)"});
    p.el('text',{x:312,y:868,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["TP 2 · 같은 요청을 나누어 계산","TP 2 · Split each request’s computation"]);
    p.el('text',{x:312,y:916,"font-size":23,fill:C.teal,"font-weight":400,"text-anchor":"middle"},["그룹의 출력: A · B","Group outputs: A · B"]);
    p.el("rect",{x:624,y:387,width:528,height:568,rx:12,fill:C.surface,stroke:C.blue,"stroke-width":2,"stroke-dasharray":"8 6"});
    p.el('text',{x:888,y:429,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["그룹 2 · 동일한 모델 한 벌","Group 2 · Same model replica"]);
    p.el("rect",{x:693,y:457,width:390,height:44,rx:8,fill:C.tealFill,stroke:C.teal,"stroke-width":2});
    p.el('text',{x:888,y:486,"font-size":23,fill:C.teal,"font-weight":700,"text-anchor":"middle"},["배정된 요청 C · D","Assigned requests C · D"]);
    p.el("path",{d:"M888,510 L888,538 L756,538 L756,558",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("path",{d:"M888,538 L1020,538 L1020,558",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted)});
    p.el("rect",{x:644,y:566,width:224,height:253,rx:12,fill:"white",stroke:C.line,"stroke-width":2});
    p.el('text',{x:756,y:606,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"GPU 2");
    p.el("rect",{x:660,y:633,width:96,height:58,rx:0,fill:C.line,stroke:C.blue,"stroke-width":2});
    p.el('text',{x:708,y:670,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W1");
    p.el("rect",{x:756,y:633,width:96,height:58,rx:0,fill:"#bbdaf7",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:804,y:670,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W2");
    p.el('text',{x:756,y:735,"font-size":25,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"C · D");
    p.el('text',{x:756,y:782,"font-size":18,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["계산에 참여","Participate in computation"]);
    p.el("rect",{x:908,y:566,width:224,height:253,rx:12,fill:"white",stroke:C.line,"stroke-width":2});
    p.el('text',{x:1020,y:606,"font-size":25,fill:C.ink,"font-weight":700,"text-anchor":"middle"},"GPU 3");
    p.el("rect",{x:924,y:633,width:96,height:58,rx:0,fill:"#9bc9f1",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:972,y:670,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W3");
    p.el("rect",{x:1020,y:633,width:96,height:58,rx:0,fill:"#79b4e5",stroke:C.blue,"stroke-width":2});
    p.el('text',{x:1068,y:670,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},"W4");
    p.el('text',{x:1020,y:735,"font-size":25,fill:C.teal,"font-weight":700,"text-anchor":"middle"},"C · D");
    p.el('text',{x:1020,y:782,"font-size":18,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["계산에 참여","Participate in computation"]);
    p.el("path",{d:"M875,684 L901,684",fill:"none",stroke:C.muted,"stroke-width":2.5,"marker-end":markerUrl(C.muted),"marker-start":"url(#ported-arrow-start)"});
    p.el('text',{x:888,y:868,"font-size":23,fill:C.blue,"font-weight":700,"text-anchor":"middle"},["TP 2 · 같은 요청을 나누어 계산","TP 2 · Split each request’s computation"]);
    p.el('text',{x:888,y:916,"font-size":23,fill:C.teal,"font-weight":400,"text-anchor":"middle"},["그룹의 출력: C · D","Group outputs: C · D"]);
    p.el('text',{x:600,y:1019,"font-size":27,fill:C.ink,"font-weight":700,"text-anchor":"middle"},["DP 2 · 같은 가중치 배치의 그룹을 두 벌 운영","DP 2 · Two groups with the same weight placement"]);
    p.el('text',{x:600,y:1071,"font-size":23,fill:C.muted,"font-weight":400,"text-anchor":"middle"},["그룹 안의 두 GPU는 함께 계산 · 두 그룹에는 서로 다른 요청 배분","Two GPUs cooperate within a group; different requests go to different groups."]);
    return [p];
  },
} satisfies FigureSpec;
