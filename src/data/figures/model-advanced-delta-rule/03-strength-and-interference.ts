import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-delta-rule',figureId:'03-strength-and-interference',number:'ma-09-03',layout:'wide',eyebrow:['그림 4','Figure 4'],title:['β로 보정량 조절하기','Control the correction with β'],
 subtitle:['모두 같은 S₂에서 출발 · k₂=[1,0], v₂=[1,1]','All cases start from the same S₂ · k₂=[1,0], v₂=[1,1]'],captionIn:'article',
 caption:['β=0,0.5,1은 같은 상태에서 출발하는 비교이며 연속 시간 단계가 아니다.','β=0,0.5,1 are alternative updates from the same state, not successive time steps.'],
 alt:['같은 이전 상태 [[2,0],[0,3]]에 보정량 [[−1,1],[0,0]]을 β=0,0.5,1만큼 반영한다. 현재 Key로 읽은 값은 각각 [2,0],[1.5,0.5],[1,1]이다.','From the same old state, scale correction [[−1,1],[0,0]] by β=0,0.5,1. Readouts with the current Key are [2,0],[1.5,0.5],[1,1].'],
 sources:[{label:'DeltaNet',url:'https://arxiv.org/html/2406.06484v1#S2.SS2'}],
 panels(locale:Locale){const p=new Panel(locale,null,750);
 p.text(260,50,['목표 Value: [1, 1]','Target Value: [1, 1]'],{size:28,anchor:'middle',width:480});
 p.text(225,130,['갱신한 상태 S₃','Updated state S₃'],{size:23,anchor:'middle',width:270,color:C.teal});p.text(435,130,['읽은 값','Readout'],{size:24,anchor:'middle',width:160,color:C.orange});
 const vals=[[[2,0],[0,3]],[[1.5,.5],[0,3]],[[1,1],[0,3]]];for(let i=0;i<3;i++){const y=180+i*180;p.text(55,y+32,'β='+[0,.5,1][i],{size:25,anchor:'middle',width:105,color:C.orange});p.text(55,y+88,([['유지','Keep'],['절반','Half'],['전부','Full']] as [string,string][])[i],{size:22,anchor:'middle',width:105,color:C.muted});const m=matrix(p,135,y,vals[i],{cellWidth:75,cellHeight:55,gap:10,size:26,tone:'teal'});p.rect(132,y-3,m.width+6,61,'none',C.orange,7);p.arrow(307,y+30,350,y+30,C.orange);matrix(p,365,y,[vals[i][0]],{cellWidth:65,cellHeight:55,gap:8,size:25,tone:'orange'});}return[p];}
} satisfies FigureSpec;
