import {Panel,C,cells,curve,type FigureSpec,type Locale} from '@llm-systems/viz';
// Redrawn with shared primitives (cells, curve) from scripts/generate-paged-kv-figures.py (figure 2).
export default {
  articleId:'paged-kv-cache',figureId:'02-logical-physical',number:'paged-kv-2',
  layout:'wide',screens:['desktop'],
  eyebrow:['그림 2','Figure 2'],
  title:['토큰 순서와 저장 위치 연결하기','Connect token order to storage locations'],
  subtitle:['첫 실행 뒤: B의 KV 7칸과 C의 KV 6칸을 각각 2블록에 저장했습니다.','After the first execution: B’s 7 KV positions and C’s 6 occupy 2 blocks each.'],
  alt:['B의 논리 블록 L0는 토큰 위치 0에서 3의 KV를 담고 물리 블록 P3에 저장된다. L1은 위치 4에서 6의 KV를 담고 P0에 저장된다. C의 L0와 L1은 각각 P1과 P4에 저장된다. P2와 P5는 비어 있다. 각 논리 블록에서 블록 테이블을 거쳐 실제 KV 셀까지 연결선이 이어진다.','B’s logical block L0 contains KV for token positions 0 through 3 and is stored in physical block P3. L1 contains positions 4 through 6 and is stored in P0. C’s L0 and L1 are stored in P1 and P4, respectively. P2 and P5 are free. Connections run from each logical block through the block table to the actual KV cells.'],
  caption:["블록 테이블이 요청 안의 토큰 순서와 실제 KV 저장 위치를 연결합니다.","The block table connects token order within a request to actual KV storage locations."],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,830,1120);
    p.text(8,32,['논리 블록','Logical blocks'],{size:25,weight:700});
    p.text(457,32,['블록 테이블','Block table'],{size:25,weight:700,anchor:'middle',width:300});
    p.text(930,32,['실제 KV 풀','Physical KV pool'],{size:25,weight:700,anchor:'middle',width:300});
    const physical=[['P0',['b4','b5','b6',null],'teal'],['P1',['c0','c1','c2','c3'],'purple'],['P2',[null,null,null,null],null],['P3',['b0','b1','b2','b3'],'teal'],['P4',['c4','c5',null,null],'purple'],['P5',[null,null,null,null],null]] as const;
    const slot:number[]=[];
    physical.forEach(([name,labels,tone],i)=>{
      const y=59+120*i,t=tone??'gray';
      p.rect(752,y,360,96,C.grayFill,C.line);
      p.text(768,y+28,name,{size:23,weight:700,color:C[t]});
      p.text(768,y+77,tone===null?['미배정','Free']:tone==='teal'?'B':'C',{size:21,color:C[t]});
      slot[i]=cells(p,884,y+24,labels,{tone:t,w:48,gap:5}).y+24;
    });
    const logical=[[112,'B · L0',['b0','b1','b2','b3'],'L0 → P3','teal',3],[232,'B · L1',['b4','b5','b6',null],'L1 → P0','teal',0],[472,'C · L0',['c0','c1','c2','c3'],'L0 → P1','purple',1],[592,'C · L1',['c4','c5',null,null],'L1 → P4','purple',4]] as const;
    for(const [y,label,labels,entry,tone] of logical){
      p.text(24,y-16,label,{size:23,weight:700,color:C[tone]});
      cells(p,24,y,labels,{tone,w:48});
      p.arrow(244,y+24,356,y+24,C[tone]);
      p.rect(370,y-6,174,60,C[`${tone}Fill`],C[tone]);
      p.text(457,y+33,entry,{size:24,weight:700,color:C[tone],anchor:'middle',width:170});
    }
    // Drawn after the table so each casing covers the connectors it crosses.
    for(const [y,,,,tone,target] of logical)curve(p,[544,y+24],[880,slot[target]],{tone,tail:146});
    p.text(24,337,['B: KV 7칸','B: 7 KV positions'],{size:23,weight:700,color:C.teal});
    p.text(24,697,['C: KV 6칸','C: 6 KV positions'],{size:23,weight:700,color:C.purple});
    p.text(8,808,['L = 요청 안의 순서 · P = 실제 저장 위치 · b/c 숫자 = 요청별 토큰 위치','L = order within a request · P = storage address · b/c numbers = token positions'],{size:22,color:C.muted});
    return [p];
  },
} satisfies FigureSpec;
