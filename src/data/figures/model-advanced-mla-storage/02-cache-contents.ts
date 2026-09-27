import {Panel,C,matrix,port,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mla-storage',figureId:'02-cache-contents',number:'ma-02-02',
 eyebrow:['그림 2 · 실제 저장 항목','Figure 2 · Cache contents'],
 title:['잠재 벡터와 위치용 Key를 한 행에 저장하기','Store the latent and positional key together'],
 subtitle:['한 층 · 현재 위치 p₃ · 토큰당 3 + 2성분','One layer · Current position p₃ · 3 + 2 components per token'],
 captionIn:'article',caption:['위치용 Key는 헤드 간 공유합니다. RoPE를 분리하는 이유와 계산 과정은 본문 및 다음 편에서 설명합니다.','The positional key is shared across heads. The text and next article explain why RoPE is separated.'],
 alt:['현재 p3의 1×8 입력에서 두 경로가 갈라진다. W_D 8×3은 잠재 벡터 c3를, W_KR 8×2와 RoPE(3)은 위치용 Key k3R을 만든다. 두 행벡터의 3성분과 2성분을 캐시의 새 p3 행에 함께 저장한다. 앞선 p0,p1,p2 행은 그대로 남는다.','The p3 input (1×8) splits into two paths. W_D (8×3) produces c3; W_KR (8×2) followed by RoPE(3) produces k3R. The three latent and two positional-key components enter the new p3 cache row. Existing p0–p2 rows remain.'],
 sources:[{label:'DeepSeek-V2 equations 14–19',url:'https://arxiv.org/html/2405.04434v5#S2.SS1.SSS3'}],
 layout:'wide',panels(locale:Locale,mobile?:boolean){
 const width=mobile?520:1120,mid=width/2,dx=mobile?125:240;
 const p=new Panel(locale,null,1050,width);
 const input={x:mid-80,y:35,width:160,height:60};
 p.box(input.x,input.y,input.width,input.height,'p₃ · 1×8','','blue');
 const left=mid-dx,right=mid+dx;
 const wd={x:left-106,y:180,width:212,height:66},wk={x:right-106,y:180,width:212,height:66};
 p.box(wd.x,wd.y,wd.width,wd.height,'Wᴰ · 8×3','','purple');p.box(wk.x,wk.y,wk.width,wk.height,'Wᴷᴿ · 8×2','','purple');
 for(const b of [wd,wk])connector(p,port(input,'bottom',.5,8),port(b,'top',.5,8),{via:[[mid,135],[b.x+b.width/2,135]],tone:'blue'});
 const rope={x:right-106,y:307,width:212,height:66};p.box(rope.x,rope.y,rope.width,rope.height,'RoPE(3)','','purple');
 connector(p,port(wk,'bottom',.5,8),port(rope,'top',.5,8),{tone:'purple'});
 p.text(left,439,'c₃ · 1×3',{size:24,weight:600,anchor:'middle',width:210,color:C.teal});
 p.text(right,439,'k₃ᴿ · 1×2',{size:24,weight:600,anchor:'middle',width:210,color:C.purple});
 const c=matrix(p,left-82,466,[[1,2,3]],{cellWidth:52,cellHeight:46,gap:4,size:24});
 const k=matrix(p,right-54,466,[['r₀','r₁']],{cellWidth:52,cellHeight:46,gap:4,size:23,tone:'purple'});
 connector(p,port(wd,'bottom',.5,8),[left,401],{tone:'teal'});connector(p,port(rope,'bottom',.5,8),[right,401],{tone:'purple'});
 p.text(mid,592,['KV 캐시 · 위치별 한 행','KV cache · One row per position'],{size:25,weight:600,anchor:'middle',width:480});
 const x=mid-140,y=710;
 p.text(x+90,649,['잠재 벡터','Latent'],{size:23,anchor:'middle',width:180,color:C.teal});
 p.text(x+250,649,['위치용 Key','RoPE key'],{size:23,anchor:'middle',width:145,color:C.purple});
 p.line(x,665,x+180,665,C.teal,3);p.line(x+186,665,x+304,665,C.purple,3);
 const cache=matrix(p,x,y,[[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[1,2,3,'r₀','r₁']],{cellWidth:56,cellHeight:42,gap:6,size:22,rowLabels:['p₀','p₁','p₂','p₃'],rowLabelWidth:40,tone:(_r,col)=>col<3?'teal':'purple'});
 const row=cache.row(3);p.rect(row.x-5,row.y-5,row.width+10,row.height+10,'none',C.orange,6);
 connector(p,port(c,'bottom',.5,8),[row.x+90,row.y+row.height+13],{via:[[left,548],[mid-238,548],[mid-238,row.y+row.height+40],[row.x+90,row.y+row.height+40]],tone:'teal'});
 connector(p,port(k,'bottom',.5,8),[row.x+250,row.y+row.height+13],{via:[[right,548],[mid+238,548],[mid+238,row.y+row.height+40],[row.x+250,row.y+row.height+40]],tone:'purple'});
 p.text(mid,1004,['새 행 p₃ · 5성분','New row p₃ · 5 components'],{size:25,weight:600,anchor:'middle',width:450,color:C.orange});
 return [p];
 }
} satisfies FigureSpec;
