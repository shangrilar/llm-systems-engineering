import {Panel,C,cells,type FigureSpec} from '@llm-systems/viz';

const example={tokens:['11','12','13','14','15','EOS'],input0:['11','12','13','14'],target0:['12','13','14','15'],input1:['15'],target1:['EOS'],limit:4};

export default {
 articleId:'training-prep-02-data-preparation',figureId:'01-chunk-and-target',number:'prep-2-1',eyebrow:['그림 1','Figure 1'],layout:'wide',
 title:['문서는 나누고, 다음 정답은 유지한다','Split the document, preserve the next target'],
 subtitle:['입력 상한 4 · 정답용 다음 토큰 참조','Input limit 4 · one-token target lookahead'],
 alt:['11,12,13,14,15,EOS인 문서에서 입력을 11–14와 15의 두 조각으로 나눈다. 첫 조각 정답은 12–15이고 마지막 조각 정답은 EOS다. 15는 첫 조각의 정답에만 참조되며 입력은 네 토큰으로 유지된다.','A document 11,12,13,14,15,EOS is split into inputs 11–14 and 15. The first targets are 12–15 and the last target is EOS. The lookahead 15 is only a target of the first chunk; its input stays four tokens long.'],
 caption:['설명용 토큰 ID와 입력 상한을 사용한다. 실제 tokenizer의 EOS ID와 4k 문맥 길이는 본문에서 설명한다. 두 조각의 attention은 연결하지 않는다.','Token IDs and the context limit are illustrative. The actual tokenizer EOS ID and 4k limit are described in the article. Attention does not connect the two chunks.'],captionIn:'article',sources:[],
 panels(locale,mobile){
  const p=new Panel(locale,null,mobile?810:550,mobile?328:1104);
  const w=mobile?42:76,h=mobile?43:54,gap=mobile?6:12,x=mobile?17:190,y=mobile?48:52;
  p.text(mobile?0:x,y-18,['원본 문서','Source document'],{size:mobile?19:25,color:C.muted});
  const row=cells(p,x,y,example.tokens,{tone:'gray',w,h,gap,size:mobile?17:26});
  const firstRight=x+4*(w+gap)-gap;
  p.line(x,y+h+12,firstRight,y+h+12,C.blue,3);p.line(x,y+h+6,x,y+h+18,C.blue,3);p.line(firstRight,y+h+6,firstRight,y+h+18,C.blue,3);
  p.line(row.center(4)-w/2,y+h+12,row.center(4)+w/2,y+h+12,C.teal,3);
  p.text((x+firstRight)/2,y+h+42,['입력 4개','4 inputs'],{size:mobile?17:22,color:C.blue,anchor:'middle',width:firstRight-x});
  p.text(row.center(4),y+h+42,['1개','1'],{size:mobile?17:22,color:C.teal,anchor:'middle',width:w+8});
  const left=mobile?30:65,right=mobile?30:790,top=mobile?238:245,second=mobile?590:245;
  const cw=mobile?53:105,ch=mobile?50:64,cg=mobile?7:16,labelY=mobile?top-38:top-45;
  p.text(left,labelY,['조각 0','Chunk 0'],{size:mobile?23:29,color:C.blue,weight:600});
  p.text(right,second-(mobile?38:45),['조각 1','Chunk 1'],{size:mobile?23:29,color:C.teal,weight:600});
  p.arrow(mobile?110:315,y+h+55,mobile?110:315,top-67,C.blue);
  if(mobile)p.path(`M${row.center(4)} ${y+h+54} V180 H320 V${second-72} H${right+cw/2}`,C.teal,2.5,false,true);
  else p.path(`M${row.center(4)} ${y+h+54} V167 H${right+cw/2} V${second-67}`,C.teal,2.5,false,true);
  p.text(left,top-9,['입력 x','Input x'],{size:mobile?17:22,color:C.blue});
  cells(p,left,top,example.input0,{tone:'blue',w:cw,h:ch,gap:cg,size:mobile?23:31});
  p.text(right,second-9,['입력 x','Input x'],{size:mobile?17:22,color:C.teal});
  cells(p,right,second,example.input1,{tone:'teal',w:cw,h:ch,gap:cg,size:mobile?23:31});
  const ty=top+(mobile?134:142),ty1=second+(mobile?134:142);
  p.text(left,ty-10,['정답 y','Target y'],{size:mobile?17:22,color:C.orange});
  const targets=cells(p,left,ty,example.target0,{tone:'orange',w:cw,h:ch,gap:cg,size:mobile?23:31});
  p.text(right,ty1-10,['정답 y','Target y'],{size:mobile?17:22,color:C.orange});
  cells(p,right,ty1,example.target1,{tone:'orange',w:cw,h:ch,gap:cg,size:mobile?19:29});
  [0,1,2,3].forEach(i=>p.arrow(left+i*(cw+cg)+cw/2,top+ch+12,left+i*(cw+cg)+cw/2,ty-36,C.orange));
  p.arrow(right+cw/2,second+ch+12,right+cw/2,ty1-36,C.orange);
  const lastX=targets.center(3);
  p.rect(lastX-cw/2-3,ty-3,cw+6,ch+6,'none',C.orange,7);
  p.text(lastX,ty+ch+38,['다음 토큰 참조','Lookahead target'],{size:mobile?17:21,color:C.orange,anchor:'middle',width:mobile?145:230});
  if(mobile)p.text(150,ty1+ch-8,['문서 끝의 EOS','EOS at document end'],{size:17,color:C.muted,width:175});
  else p.text(right+cw/2,ty1+ch+38,['문서 끝의 EOS','Document-end EOS'],{size:21,color:C.muted,anchor:'middle',width:240});
  return [p];
 }
} satisfies FigureSpec;
