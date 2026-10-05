import {Panel,C,cells,type FigureSpec} from '@llm-systems/viz';
import {documents,packs,capacity} from './shared';

export default {
 articleId:'training-prep-02-data-preparation',figureId:'02-best-fit-packing',number:'prep-2-2',eyebrow:['그림 2','Figure 2'],layout:'wide',
 title:['문서를 자르지 않고 빈자리에 맞춘다','Fit whole documents into the remaining space'],
 subtitle:['한 칸 = 입력 토큰 1개 · pack당 상한 8','One cell = one input token · pack limit 8'],
 alt:['길이 A 6, B 4, C 3, D 2의 문서를 best-fit으로 두 pack에 담는다. 첫 pack은 A와 D로 8개, 둘째 pack은 B와 C로 7개이며 빈칸 하나는 미사용 용량이다. 문서를 자르거나 padding 토큰을 넣지 않는다.','Best-fit groups documents A 6, B 4, C 3, D 2 into two packs. A and D fill eight input slots; B and C use seven, leaving one unused slot. Documents stay whole and no padding token is added.'],
 caption:['설명을 위해 pack 상한을 8로 줄였다. 점 하나는 실제 입력 토큰 하나이며 회색 빈칸은 남은 용량으로, 모델 입력에 추가되는 padding이 아니다.','The pack limit is reduced to eight for illustration. Each dot is a real input token. The gray empty slot is unused capacity, not a padding token added to the model input.'],captionIn:'article',sources:[],
 panels(locale,mobile){
  const p=new Panel(locale,null,mobile?800:510,mobile?328:1104);
  const w=mobile?33:44,gap=mobile?3:4,h=mobile?44:60;
  const left=mobile?38:84,base=mobile?64:80,step=mobile?70:100;
  p.text(mobile?0:36,mobile?20:26,['배치 후보','Batch candidates'],{size:mobile?21:27,weight:600,color:C.muted});
  documents.forEach((d,i)=>{
   const y=base+i*step;
   p.text(mobile?0:36,y+h/2+8,d.id,{size:mobile?22:28,weight:600,color:C[d.tone]});
   cells(p,left,y,Array(d.length).fill('·'),{tone:d.tone,w,h,gap,size:mobile?25:32});
   p.text(mobile?290:397,y+h/2+8,String(d.length),{size:mobile?21:25,color:C[d.tone],anchor:'end'});
  });
  const right=mobile?20:630,ys=mobile?[470,650]:[120,330];
  if(mobile){
   p.text(164,385,'Best-fit',{size:23,weight:600,color:C.ink,anchor:'middle'});
   p.arrow(164,398,164,430,C.muted);
  }else{
   p.text(480,229,'Best-fit',{size:25,weight:600,anchor:'middle'});
   p.arrow(425,255,548,255,C.muted);
   p.text(right,26,['배치: pack 2개','Batch: 2 packs'],{size:27,weight:600,color:C.muted});
  }
  packs.forEach((docs,i)=>{
   const y=ys[i];
   p.text(right,y-(mobile?40:44),`Pack ${i}`,{size:mobile?21:27,weight:600});
   let offset=0;
   for(const d of docs){
    const x=right+offset*(w+gap);
    p.text(x+(d.length*(w+gap)-gap)/2,y-12,d.id,{size:mobile?19:25,color:C[d.tone],weight:600,anchor:'middle'});
    cells(p,x,y,Array(d.length).fill('·'),{tone:d.tone,w,h,gap,size:mobile?25:32});
    offset+=d.length;
   }
   for(let j=offset;j<capacity;j++){
    const x=right+j*(w+gap);
    p.rect(x,y,w,h,C.grayFill,C.line,5,true);
    p.line(x+7,y+h-9,x+w-7,y+9,C.line,2);
   }
   const used=docs.reduce((n,d)=>n+d.length,0);
   p.text(right,y+h+(mobile?29:37),[`${used}개 입력`,`${used} inputs`],{size:mobile?18:23,color:C.muted});
   if(used<capacity)p.text(right+capacity*(w+gap)-gap,y+h+(mobile?29:37),['미사용 1칸','1 unused slot'],{size:mobile?17:22,color:C.gray,anchor:'end',width:mobile?148:210});
  });
  return [p];
 }
} satisfies FigureSpec;
