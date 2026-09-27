import {Panel,C,type FigureSpec} from '@llm-systems/viz';
export default {
 articleId:'rl-09',figureId:'02-quantization-conventions',number:'8-2',eyebrow:['그림 2','Figure 2'],captionIn:'article',
 title:['추론만 양자화하거나, 학습 순전파도 맞춘다','Quantize inference alone, or align training forward too'],
 subtitle:['각 구성에서 두 엔진에 같은 입력 P와 앞선 토큰을 넣습니다.','Within each configuration, both engines receive the same P and preceding tokens.'],
 alt:['왼쪽은 공통 양자화 규약으로 학습 순전파와 추론이 같은 양자화 값을 사용한다. 오른쪽은 학습은 BF16 원래 값을 쓰고 추론은 FP8 근삿값을 쓴다.','Left: training forward and inference use the same quantized values under shared rules. Right: training uses original BF16 values while inference uses FP8 approximations.'],
 caption:['',''],sources:[{label:'Miles v0.1 §3.1',url:'https://arxiv.org/abs/2609.08368v1'}],
 panels(locale){return [true,false].map(shared=>{
  const p=new Panel(locale,shared?['양쪽에 같은 양자화 적용','Shared quantization']:['BF16 학습 + FP8 추론','BF16 training + FP8 inference'],680);
  p.box(65,100,390,95,['같은 가중치 버전','Same weight version'],'','gray');
  if(shared){
   p.arrow(260,208,260,244,C.purple);
   p.box(16,260,488,125,['공통 양자화 규약','Shared quantization rules'],['같은 값·scale 규칙','Same value and scale rules'],'purple');
   p.path('M260 396 V422 H132 V452',C.purple,2.5,false,true);
   p.path('M260 422 H388 V452',C.purple,2.5,false,true);
  }else{
   p.path('M260 208 V235 H132 V452',C.teal,2.5,false,true);
   p.path('M260 235 H388 V270',C.orange,2.5,false,true);
   p.box(276,285,228,100,['FP8 양자화','FP8 quantization'],'','orange');
   p.arrow(388,398,388,452,C.orange);
  }
  p.box(16,470,232,126,['학습 순전파','Training forward'],shared?['양자화한 값','Quantized values']:['BF16 원래 값','Original BF16 values'],'teal');
  p.box(272,470,232,126,['추론','Inference'],shared?['같은 양자화 값','Same quantized values']:['FP8 근삿값','FP8 approximations'],shared?'teal':'orange');
  if(shared)p.text(260,646,['FP8 / MXFP8 / NVFP4','FP8 / MXFP8 / NVFP4'],{size:23,width:488,anchor:'middle',color:C.purple});
  return p;
 });}
} satisfies FigureSpec;
