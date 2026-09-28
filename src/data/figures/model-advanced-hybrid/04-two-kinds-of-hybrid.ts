import {Panel,C,grid,type FigureSpec,type Locale,type Label} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-hybrid',figureId:'04-two-kinds-of-hybrid',number:'ma-12-05',layout:'wide',
 eyebrow:['그림 5 · 무엇을 섞는가','Figure 5 · What is being combined?'],
 title:['하이브리드마다 섞는 대상이 다릅니다','Hybrid models combine different things'],
 subtitle:['혼합 대상 비교 · 층별 배치와 비율은 생략','Compare the components · Layer order and ratios omitted'],
 captionIn:'article',caption:['상태+KV는 fixed-state recurrent층과 KV Attention층의 조합이다. SWA도 KV를 저장한다. CSA/HCA는 토큰축 압축 KV를 사용하며 fixed recurrent state가 아니다. A의 두 형태는 별도층에 존재하며 서로 직접 같은 캐시를 공유한다는 의미가 아니다. 모델명은 명시한 variant에 한정한다.','State+KV combines fixed-state recurrent layers and KV attention layers. SWA still stores KV. CSA/HCA store token-compressed KV, not fixed recurrent state. Icons belong to separate layers and do not imply shared caches. Model examples refer only to the named variants.'],
 alt:['세 분류를 비교한다. Kimi K3, Qwen3.8, GLM5.3Flash는 상태와KV를, MiMoV2.6은SWA와Global을, DeepSeekV4는CSA와HCA를 조합한다.','Three categories: Kimi K3,Qwen3.8 and GLM5.3Flash combine state and KV; MiMoV2.6 combines SWA and global attention; DeepSeekV4 combines CSA and HCA.'],
 sources:[{label:'Kimi K3',url:'https://huggingface.co/moonshotai/Kimi-K3'},{label:'Qwen3.8',url:'https://huggingface.co/Qwen/Qwen3.8-27B'},{label:'Qwen3.8-Flash-Next',url:'https://huggingface.co/Qwen/Qwen3.8-Flash-Next'},{label:'GLM-5.3-Flash config',url:'https://huggingface.co/zai-org/GLM-5.3-Flash/blob/main/config.json'},{label:'MiMo V2.6',url:'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL'},{label:'DeepSeek V4 §2.3',url:'https://arxiv.org/html/2606.19348v1#S2.SS3'}],
 panels(locale:Locale,mobile?:boolean){return [0,1,2].map(i=>{
  const w=mobile?520:1104,p=new Panel(locale,([['A. 상태 + KV','A. State + KV'],['B. 읽기 범위','B. Read range'],['C. 압축·선택 방식','C. Compression and selection']] as Label[])[i],i===0?(mobile?860:550):(mobile?480:450),w);
  const x1=mobile?20:160,x2=mobile?290:690,bw=mobile?210:260,cy=132;
  const names:Label[][]=[[['상태 갱신','State update'],['KV 참조','KV access']],['SWA','Global'],['CSA','HCA']];
  p.token(x1,cy,names[i][0],bw,i===0?'teal':'orange',65);p.token(x2,cy,names[i][1],bw,'purple',65);
  p.text(w/2,cy+43,'+',{size:30,anchor:'middle',width:50});
  const c1=x1+bw/2,c2=x2+bw/2;
  if(i===0)grid(p,c1-32,226,2,2,{cell:28,gap:6,tone:()=> 'teal'});
  else for(let r=0;r<(i===1?3:4);r++)p.rect(c1-48,218+r*19,96,13,r%2===0||i===1?C.orangeFill:C.grayFill,r%2===0||i===1?C.orange:C.line,3);
  for(let r=0;r<(i===2?1:6);r++)p.rect(c2-48,218+r*19,96,13,C.purpleFill,C.purple,3);
  const labels:Label[][]=[[['고정 크기 상태','Fixed-size state'],['위치별 기억','Position-indexed memory']],[['최근 KV','Recent KV'],['전체 문맥 KV','Full-context KV']],[['압축 후 일부 선택','Compress, then select'],['강하게 압축','Compress more heavily']]];
  p.text(c1,370,labels[i][0],{size:23,weight:600,anchor:'middle',width:bw+10,color:i===0?C.teal:C.orange});
  p.text(c2,370,labels[i][1],{size:23,weight:600,anchor:'middle',width:bw+10,color:C.purple});
  if(i===0){
   const cases=[['Kimi K3','KDA + MLA'],['Qwen3.8¹','GDN + Global'],['GLM-5.3-Flash','KDA + Sparse'],['Qwen3.8-Flash-Next','GDN + QSA']];
   cases.forEach(([model,mix],j)=>{
    const y=mobile?463+j*83:426+j*28;
    p.text(mobile?20:140,y,model,{size:21,weight:600,width:mobile?480:400});
    p.text(mobile?20:650,mobile?y+30:y,mix,{size:21,width:mobile?480:400,color:C.muted});
   });
   p.text(20,mobile?820:555,'¹ 27B / 2.4T-A95B',{size:18,width:w-40,color:C.muted});
   p.height=mobile?860:590;
  }else p.text(w/2,mobile?445:425,i===1?'MiMo V2.6 Pro / Flash':'DeepSeek V4 Pro / Flash',{size:23,weight:600,anchor:'middle',width:w-30});
  return p;
 });}
} satisfies FigureSpec;
