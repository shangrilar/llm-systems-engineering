import {Panel,C,cells,grid,type FigureSpec} from '@llm-systems/viz';
import {packedDocuments,boundaries} from './shared';

export default {
 articleId:'training-prep-02-data-preparation',figureId:'03-packed-attention',number:'prep-2-3',eyebrow:['그림 3','Figure 3'],layout:'wide',
 title:['Padding 없이, 문맥은 따로 유지한다','Remove padding, preserve separate contexts'],
 subtitle:['실제 입력 15개 · 독립 문맥 4개','15 real inputs · 4 independent contexts'],
 alt:['A 6개, D 2개, B 4개, C 3개의 실제 입력만 이어 붙이고 각 문서의 position ID는 0부터 시작한다. 누적 경계는 0,6,8,12,15이다. Attention 행렬은 문서별 대각 블록의 아래 삼각형만 허용하며 다른 문서와 미래 토큰은 참조하지 않는다.','Only the real inputs A 6, D 2, B 4, C 3 are flattened. Position IDs restart at zero per document; cumulative boundaries are 0,6,8,12,15. Attention allows only each document block’s lower triangle, excluding other documents and future tokens.'],
 caption:['Attention 행렬은 허용 관계를 설명하는 개념 그림이다. 실제 varlen 실행은 전체 T×T 마스크를 만들지 않고 cu_seqlens로 독립 구간을 전달한다.','The attention matrix illustrates allowed relationships. Actual varlen execution passes independent segments via cu_seqlens rather than building a full T×T mask.'],captionIn:'article',sources:[],
 panels(locale,mobile){
  const p=new Panel(locale,null,mobile?740:930,mobile?328:1104);
  const x=mobile?9:140,y=mobile?68:75,w=mobile?18:57,gap=mobile?3:4,h=mobile?30:48;
  p.text(mobile?0:x,20,['실제 토큰만 이어 붙인 입력','Flattened real-token input'],{size:mobile?18:25,weight:600});
  let offset=0;
  for(const d of packedDocuments){
   const dx=x+offset*(w+gap);
   p.text(dx+(d.length*(w+gap)-gap)/2,y-12,d.id,{size:mobile?17:25,color:C[d.tone],weight:600,anchor:'middle'});
   const row=cells(p,dx,y,Array(d.length).fill('·'),{tone:d.tone,w,h,gap,size:mobile?21:30});
   for(let j=0;j<d.length;j++)p.text(row.center(j),y+h+(mobile?29:36),String(j),{size:mobile?14:22,color:C[d.tone],weight:j===0?700:400,anchor:'middle'});
   offset+=d.length;
  }
  p.text(mobile?0:20,mobile?158:150,mobile?['Position ID: 문서마다 0부터','Position IDs restart at 0']:['Position ID','Position ID'],{size:mobile?16:20,color:C.muted,width:mobile?328:100});
  p.text(mobile?0:x,mobile?200:210,`cu_seqlens = [${boundaries.join(', ')}]`,{size:mobile?16:24,color:C.ink,width:mobile?328:950});
  const mx=mobile?40:230,my=mobile?292:320,cell=mobile?17:32,mgap=mobile?1:3,step=cell+mgap,total=boundaries.at(-1)!;
  const segment=(n:number)=>packedDocuments.findIndex((_,i)=>n>=boundaries[i]&&n<boundaries[i+1]);
  p.text(mx+(total*step-mgap)/2,my-(mobile?45:57),'K / V',{size:mobile?19:27,color:C.muted,anchor:'middle'});
  p.text(mobile?3:128,my+(total*step-mgap)/2,'Q',{size:mobile?19:27,color:C.muted,anchor:'middle'});
  const matrix=grid(p,mx,my,total,total,{cell,gap:mgap,
   tone:(r,c)=>segment(r)===segment(c)&&c<=r?packedDocuments[segment(r)].tone:null,
   fill:(r,c)=>segment(r)!==segment(c)?C.grayFill:null,
   hatch:(r,c)=>segment(r)===segment(c)&&c>r,
  });
  packedDocuments.forEach((d,i)=>{
   const start=boundaries[i],end=boundaries[i+1]-1,mid=(start+end)/2;
   p.text(mx+mid*step+cell/2,my-12,d.id,{size:mobile?16:24,color:C[d.tone],weight:600,anchor:'middle'});
   p.text(mx-(mobile?12:25),my+mid*step+cell/2+(mobile?5:8),d.id,{size:mobile?16:24,color:C[d.tone],weight:600,anchor:'middle'});
   matrix.outline(start,start,end,end,d.tone,0);
  });
  const lx=mobile?9:835,ly=mobile?610:365,ls=mobile?18:28,legendStep=mobile?40:105;
  const legend=[
   {label:['참조 허용','Allowed attention'] as const,fill:C.blueFill,stroke:C.blue,hatch:false},
   {label:['같은 문서의 미래: 참조 불가','Same-document future: blocked'] as const,fill:C.paper,stroke:C.line,hatch:true},
   {label:['다른 문서: 참조 불가','Other documents: blocked'] as const,fill:C.grayFill,stroke:C.line,hatch:false},
  ];
  // Keep the legend a key to the matrix, not a prose caption.
  legend.forEach((entry,i)=>{
   const yy=ly+i*legendStep;
   p.rect(lx,yy,ls,ls,entry.fill,entry.stroke,3);
   if(entry.hatch)p.line(lx+4,yy+ls-4,lx+ls-4,yy+4,C.line,1.6);
   p.text(lx+ls+12,yy+ls*.8,entry.label,{size:mobile?16:22,color:C.muted,width:mobile?285:220});
  });
  return [p];
 }
} satisfies FigureSpec;
