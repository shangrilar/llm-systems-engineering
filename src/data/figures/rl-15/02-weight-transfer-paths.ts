import {Panel,C,type FigureSpec,type Locale,type Label} from '@llm-systems/viz';
export default {
  captionIn:'article',
 articleId:'rl-15',figureId:'02-weight-transfer-paths',number:'15-2',
  eyebrow:['그림 2','Figure 2'],layout:'wide',
 title:['배치와 통신 환경에 맞는 전송 경로를 고른다','Choose a transfer path for the deployment'],
 subtitle:['Miles v0.1.0의 세 경로를 단순화했습니다. 화살표는 메모리·저장소 사이 이동이며, 길이나 굵기는 속도 비교가 아닙니다.','Three simplified paths in Miles v0.1.0. Arrows show movement between memory and storage; their length and width do not encode speed.'],
 alt:['Broadcast는 학습 측에서 NCCL로 분배한 후 추론 측에서 분할 적용한다. P2P는 학습 GPU에서 CPU 모델의 layout 변환과 pinned host buffer를 거쳐 RDMA로 대상 GPU의 weight 주소에 쓴다. Disk-delta는 같은 기준 checkpoint의 byte 변경을 공유 저장소로 전달하고 수신 측 local checkpoint를 패치한 후 GPU로 읽는다.','Broadcast distributes via NCCL then loads target shards. P2P stages weights through a CPU model and pinned host buffers before RDMA writes into registered target GPU weight memory. Disk-delta publishes byte changes against a matching checkpoint base, patches a local checkpoint and reloads it to GPUs.'],
 caption:['P2P라는 이름만으로 CPU를 거치지 않는다고 판단할 수 없습니다. 실제 비용에는 변환·전송·적용이 포함되며, 어떤 방식이 빠른지는 모델·병렬 배치·연결망·저장소 조건에 따라 달라집니다.','P2P does not imply a path that bypasses the CPU. Cost includes conversion, transfer and application; the fastest option depends on the model, parallel layout, network and storage.'],
 sources:[{label:'SGLang receiver, Miles v0.1.0 release pin',url:'https://github.com/sgl-project/sglang/blob/cb05a44f35a7c9e27e46d74112cc841ca674ef43/python/sglang/srt/model_loader/remote_instance_weight_loader_utils.py'},{label:'Miles P2P v0.1.0',url:'https://github.com/radixark/miles/blob/v0.1.0/docs/advanced/p2p-weight-transfer.md'},{label:'Miles disk-delta v0.1.0',url:'https://github.com/radixark/miles/blob/v0.1.0/miles/backends/megatron_utils/update_weight/update_weight_from_distributed/delta.py'}],
 panels(locale:Locale,mobile=false){
 const w=mobile?520:1120,sw=mobile?520:344,step=mobile?1180:0,p=new Panel(locale,['같은 원본과 대상 · 다른 이동 경로','Three weight-transfer routes'],mobile?3650:1250,w);
 const titles:Label[]=['Broadcast','P2P','Disk-delta'];
 for(let i=0;i<3;i++){
  const s=new Panel(locale,titles[i],1140,sw),bw=sw-32,c=sw/2;
  s.text(16,101,i===0?['공통 GPU 통신망의 기본 선택','Default on a shared GPU fabric']:i===1?['여러 노드의 병렬 전송 활용','Parallel senders across nodes']:['직접 통신망 없이 저장소 공유','Shared storage without a direct fabric'],{size:21,weight:600,width:bw,color:C.teal});
  s.raw('<g transform="translate(0 65)">');
  s.box(16,103,bw,101,['학습 GPU들','Training GPUs'],['동일한 새 가중치','The same new weights'],'blue');
  s.arrow(c,217,c,250,C.blue);
  if(i===0){
   s.box(16,266,bw,164,['전송할 텐서 준비','Prepare tensors to send'],['Gather·형식 변환 후 source rank에서 배포','Gather and convert; distribute from source ranks'],'purple');
   s.box(16,492,bw,127,['NCCL broadcast','NCCL broadcast'],['collective 통신 그룹','Collective communication group'],'teal');
   s.box(16,681,bw,161,['대상별 load','Load on each target'],['각 추론 rank의 분할에 맞춰 적용','Apply the shard needed by each inference rank'],'purple');
  }else if(i===1){
   s.box(16,266,bw,164,['송신 CPU 메모리','Sender CPU memory'],['CPU 모델로 layout 변환 → pinned host buffer','CPU model layout conversion → pinned host buffer'],'orange');
   s.box(16,492,bw,127,['RDMA write','RDMA write'],['대상 rank별 필요한 조각','Required shards per target rank'],'teal');
   s.box(16,681,bw,161,['등록된 GPU 주소','Registered GPU addresses'],['대상 가중치 메모리에 직접 쓰기','Write directly into target weights'],'purple');
  }else{
   s.box(16,266,bw,164,['CPU의 이전 snapshot','Previous CPU snapshot'],['같은 base에서 바뀐 bytes를 인코딩','Encode byte changes against the same base'],'orange');
   s.box(16,492,bw,127,['공유 파일 저장소','Shared filesystem'],['base b → delta b+1','base b → delta b+1'],'teal');
   s.box(16,681,bw,161,['로컬 checkpoint 패치','Patch a local checkpoint'],['base·version·checksum 확인 → GPU로 reload','Check base, version and checksum → reload to GPU'],'purple');
  }
  s.arrow(c,443,c,476,C.purple);s.arrow(c,632,c,665,C.teal);s.arrow(c,855,c,889,C.purple);
  s.box(16,906,bw,101,['추론 GPU들','Inference GPUs'],['일관된 새 가중치','Consistent new weights'],'blue');
  s.raw('</g>');
  p.raw('<g transform="translate('+(mobile?0:i*388)+' '+(104+i*step)+')">'+s.svg()+'</g>');
 }
 return [p];
 }
} satisfies FigureSpec;
