import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-11',figureId:'02-batching-kv-capacity',number:'11-2',
  eyebrow:['그림 2','Figure 2'],layout:'wide',
 title:['빈자리를 채울 때 KV 용량도 함께 확인한다','Fill free slots while staying within KV capacity'],
 subtitle:['가상 실행: A가 끝나면 D를 받습니다. D의 입력 처리에도 연산이 들고, 긴 B·C는 KV 메모리를 계속 점유합니다.','Illustrative execution: admit D after A finishes. D needs input computation, while long-running B and C continue to occupy KV memory.'],
 alt:['세 실행 자리에서 A가 시각2에 끝나고 D가 입력 처리 후 생성한다. B는4, C는6에 끝난다. 시각1,3.5,5.5의 진행중 KV 점유는 임의 단위8,10,9이며 용량12 이내다.','A finishes at time 2, freeing one of three slots for D prefill and decode. B finishes at 4 and C at 6. Active KV occupancy at times 1, 3.5 and 5.5 is 8, 10 and 9 arbitrary units, below capacity 12.'],
 caption:['시간·KV 수치는 설명용입니다. 타임라인은 요청의 진행 구간이며 GPU 커널의 동시 실행을 뜻하지 않습니다. 막대는 진행 중 KV만 집계하며, 완료 요청의 prefix cache 보존은 별도 정책입니다.','Time and KV values are illustrative. Intervals show request progress, not simultaneous GPU kernels. Bars count active-request KV only; retaining completed requests as prefix cache is a separate policy.'],
 sources:[{label:'PagedAttention',url:'https://arxiv.org/abs/2309.06180'}],
 panels(locale:Locale,mobile=false){
 const w=mobile?520:1120,p=new Panel(locale,['진행 구간과 같은 시점의 KV 점유','Request progress and KV snapshots'],1090,w);
 const left=mobile?100:150,right=w-30,unit=(right-left)/6,tx=(t:number)=>left+t*unit;
 p.text(16,122,['자리','Slot'],{size:21,width:left-25,color:C.muted});
 for(let t=0;t<=6;t++){p.text(tx(t),121,String(t),{size:20,anchor:'middle',width:40});p.line(tx(t),136,tx(t),408,C.line,1,true);}
 const seg=(s:number,e:number,y:number,label:string,color:string,fill:string,prefill=false)=>{p.rect(tx(s)+2,y,(e-s)*unit-4,56,fill,color,7);if(prefill)for(let x=tx(s)+8;x<tx(e)-15;x+=14)p.line(x,y+49,x+9,y+37,color,1.3);p.text((tx(s)+tx(e))/2,y+33,label,{size:22,weight:600,anchor:'middle',width:(e-s)*unit-10,color});};
 [1,2,3].forEach((n,i)=>p.text(16,187+i*90,String(n),{size:23,width:60}));
 seg(0,2,154,'A',C.blue,C.blueFill);seg(2,3,154,'D:P',C.orange,C.orangeFill,true);seg(3,6,154,'D',C.orange,C.orangeFill);seg(0,4,244,'B',C.purple,C.purpleFill);seg(0,6,334,'C',C.teal,C.tealFill);
 p.text(16,454,['P: 새 입력 prefill · 그 외: decode 진행 구간','P: new-input prefill · others: decode intervals'],{size:22,width:w-32,color:C.muted});
 p.text(16,537,['진행 중 KV 점유 · 임의 단위','Active KV occupancy · arbitrary units'],{size:24,weight:600,width:w-32});
 const base=818,scale=16,bw=mobile?58:116;
 p.line(left,base-12*scale,right,base-12*scale,C.red,2,true);
 p.text(16,base-12*scale-17,['용량 12','Capacity 12'],{size:20,color:C.red,width:w-32});
 const snaps=[{t:1,v:[{n:2,label:'A',c:C.blue},{n:3,label:'B',c:C.purple},{n:3,label:'C',c:C.teal}]},{t:3.5,v:[{n:2,label:'D',c:C.orange},{n:4,label:'B',c:C.purple},{n:4,label:'C',c:C.teal}]},{t:5.5,v:[{n:3,label:'D',c:C.orange},{n:6,label:'C',c:C.teal}]}];
 snaps.forEach(s=>{let y=base;for(const a of s.v){const h=a.n*scale;y-=h;p.rect(tx(s.t)-bw/2,y,bw,h,a.c,C.paper,0);p.text(tx(s.t),y+h/2+8,a.label+' '+a.n,{size:20,color:C.paper,weight:600,anchor:'middle',width:bw});}p.text(tx(s.t),y-14,String(s.v.reduce((n,a)=>n+a.n,0)),{size:22,weight:600,anchor:'middle',width:70});p.text(tx(s.t),855,'t='+s.t,{size:20,anchor:'middle',width:100});});
 p.line(left,base,right,base,C.muted,1);
 p.box(16,918,w-32,135,['요청 수 제한과 KV 예산을 함께 만족','Satisfy both request limits and KV budget'],['빈 실행 자리가 있어도 KV가 부족하면 새 요청을 바로 받을 수 없습니다.','A free execution slot is not enough when KV memory is insufficient.'],'gray');
 return [p];
 }
} satisfies FigureSpec;
