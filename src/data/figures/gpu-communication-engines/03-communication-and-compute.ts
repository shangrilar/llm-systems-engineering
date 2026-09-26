import {Panel,C,timeline,type FigureSpec,type Locale} from '@llm-systems/viz';
// Redrawn with the shared timeline primitive from the published SVG; its original generator was not kept.
export default {
  articleId:'gpu-communication-engines',figureId:'03-communication-and-compute',number:'hardware-14-3',
  layout:'wide',screens:['desktop'],
  eyebrow:['그림 3','Figure 3'],
  title:['통신과 계산을 함께 마치는 시간','Time to Finish Communication and Compute'],
  subtitle:['통신 시간이 같아도 SM 자원 경쟁이 줄면 계산 C가 더 일찍 끝날 수 있습니다.','With equal communication time, less SM contention can let C finish earlier.'],
  alt:['위는 SM 통신 커널과 독립 계산 C가 SM 자원을 함께 사용해 C가 늦어지는 경우다. 아래는 지원되는 복사를 CE가 맡아 SM 경쟁이 줄어 C가 더 일찍 끝날 수 있는 경우다. 두 경우 전달량과 계산량, 통신 시간은 같다. 전체 완료는 통신과 C가 모두 끝나는 시점이다. CE도 메모리와 연결 대역폭을 사용하므로 성능 개선을 항상 보장하는 그림이 아니며 실측 수치가 아니다.','An example where sharing SM resources with communication slows independent computation C. Using CE for a supported copy can reduce this contention and let C finish earlier. Transfer volume, computation and communication time are equal. Overall completion means both communication and C have finished. CE still uses memory and link bandwidth; this is an illustration, not a measurement or guaranteed improvement.'],
  caption:['통신 시간과 계산량은 두 경우에 같습니다. CE도 메모리와 연결 대역폭을 사용하므로 개선이 항상 보장되지는 않으며, 실측 수치가 아닙니다.','Communication time and work are the same in both cases. CE also uses memory and link bandwidth, so improvement is not guaranteed; this is not a measurement.'],
  sources:[],
  panels(locale:Locale){
    const p=new Panel(locale,null,850,1120);
    p.rect(8,10,1104,60,C.grayFill,C.line,12);
    p.text(560,50,['같은 통신·계산 C · SM 자원 경쟁이 계산을 늦추는 경우','Same transfer and C · Case where SM contention slows computation'],{size:25,weight:600,anchor:'middle',width:1080});
    // Illustrative durations in pixels of the time axis, not measurements.
    const cases=[{y:121,title:['SM을 통신과 계산이 함께 사용','Communication and compute share SMs'],engine:['통신 (SM)','Comm. (SM)'],compute:780},{y:516,title:['복사를 CE에 맡기고 SM에서 계산','CE copies while SMs compute'],engine:['통신 (CE)','Comm. (CE)'],compute:580}] as const;
    for(const c of cases){
      p.text(8,c.y,c.title,{size:28,weight:700,width:1100});
      const t=timeline(p,{x:8,y:c.y+44,width:1094,span:892,labelWidth:202,axis:['시간 →','Time →'],lanes:[
        {label:c.engine,bars:[{from:0,to:450,label:['같은 통신 시간','Same communication time'],tone:'indigo'}]},
        {label:['계산 C','Compute C'],bars:[{from:0,to:c.compute,label:['SM에서 계산','Compute on SMs'],tone:'purple'}]},
      ]});
      t.mark(450,0,['통신 완료','Comm. complete'],'indigo','start');
      t.mark(c.compute,1,['전체 완료','Overall completion']);
    }
    return [p];
  },
} satisfies FigureSpec;
