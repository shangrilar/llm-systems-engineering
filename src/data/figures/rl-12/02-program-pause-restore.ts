import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-12',figureId:'02-program-pause-restore',number:'12-2',
  eyebrow:['그림 2','Figure 2'],layout:'wide',
 title:['메모리가 부족할 때 프로그램 상태를 보고 쉬게 한다','Use program state to relieve memory pressure'],
 subtitle:['ThunderAgent의 program-aware scheduling을 단순화했습니다. 실행 단계·문맥 길이·현재 용량을 보고 Pause와 Restore를 결정합니다.','A simplified view of ThunderAgent program-aware scheduling. Phase, context length and available capacity inform Pause and Restore.'],
 alt:['backend A의 Reasoning P와 Acting Q가 KV를 점유한다. Q를 Pause해 backend 연결을 해제하고 기록을 전역 대기열에 보존한다. 공간이 있는 A 또는 B에 Restore해 회수한 prefix KV를 재계산하고 후속 Reasoning을 실행한다.','Reasoning P and Acting Q hold KV on backend A. Pause Q, detach it from the backend and retain its record in a global queue. Restore on A or B with capacity, recomputing evicted prefix KV before later Reasoning.'],
 caption:['Pause가 이미 실행 중인 외부 도구를 반드시 멈추지는 않습니다. Restore는 KV의 GPU 간 직접 복사나 OS 프로세스의 자동 복원과 같은 뜻이 아닙니다. 모든 대기 프로그램을 퇴거시키는 규칙도 아닙니다.','Pause need not stop an already running external tool. Restore does not mean direct GPU-to-GPU KV copying or automatic OS process restoration. This is not a rule to evict every waiting program.'],
 sources:[{label:'ThunderAgent §4',url:'https://arxiv.org/html/2602.13692v1#S4'}],
 panels(locale:Locale,mobile=false){
 const w=mobile?520:1120,sw=mobile?520:344,step=mobile?672:0,p=new Panel(locale,['자원 회수와 프로그램 보존','Reclaim resources, retain the program'],mobile?2270:950,w);
 for(let i=0;i<3;i++){
  const s=new Panel(locale,i===0?['① KV 압박','① KV pressure']:i===1?['② Pause','② Pause']:['③ Restore','③ Restore'],628,sw),bw=sw-32;
  if(i===0){
   s.box(16,101,bw,99,['Backend A','Backend A'],['KV 공간이 부족','KV capacity is tight'],'gray');
   s.box(16,226,bw,110,['P · Reasoning','P · Reasoning'],['GPU 생성 진행','Generating on GPU'],'blue');
   s.box(16,362,bw,110,['Q · Acting','Q · Acting'],['도구 실행 중 · KV 보유','Tool running · KV held'],'orange');
   s.text(16,524,['현재 Reasoning을 보호하며 Pause 후보 판단','Protect current Reasoning when choosing a Pause candidate'],{size:22,width:bw,weight:600});
  }else if(i===1){
   s.box(16,101,bw,135,['Q · 전역 대기열','Q · global queue'],['프로그램 기록·도구 상태 추적 유지','Keep program records and tool-state tracking'],'orange');
   s.line(sw/2,247,sw/2,299,C.gray,2,true);s.text(sw/2,320,'×',{size:30,color:C.red,anchor:'middle',width:50});
   s.box(16,346,bw,125,['Backend A 연결 해제','Detach from backend A'],['KV 회수 가능','KV becomes reclaimable'],'gray');
   s.text(16,524,['프로그램 보존 ≠ GPU KV 계속 점유','Retaining the program ≠ retaining its GPU KV'],{size:22,width:bw,weight:600});
  }else{
   s.box(16,101,bw,135,['Backend A 또는 B','Backend A or B'],['공간이 있는 곳에 재배치','Place on a backend with capacity'],'teal');
   s.arrow(sw/2,242,sw/2,285,C.teal);
   s.box(16,295,bw,124,['회수한 prefix KV 재계산','Recompute evicted KV'],['유효한 문맥 상태 준비','Prepare valid context'],'purple');
   s.arrow(sw/2,425,sw/2,468,C.purple);
   s.box(16,478,bw,110,['Q · 후속 Reasoning','Q · later Reasoning'],['도구 결과를 이어서 사용','Continue with tool results'],'blue');
  }
  const x=mobile?0:i*388,y=104+i*step;p.raw('<g transform="translate('+x+' '+y+')">'+s.svg()+'</g>');
 }
 const y=mobile?2134:816;
 p.text(16,y,['유지: 대기 중 KV 점유 · 퇴거: 재개 시 재계산이 필요할 수 있음','Retain: KV stays occupied while waiting · Evict: may need recomputation on resume'],{size:23,width:w-32,weight:600,color:C.muted});
 return [p];
 }
} satisfies FigureSpec;
