import {Panel,C,connector,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
 articleId:'model-advanced-mla-computation',figureId:'01-expanded-reference',number:'ma-03-01',
 eyebrow:['그림 2 · MLA의 기본 계산','Figure 2 · Basic MLA computation'],
 title:['두 점수를 더하고, Value를 모읍니다','Add two scores, then combine values'],
 subtitle:['현재 위치 p₃ · 헤드 1 · j는 캐시의 토큰 위치','Current position p₃ · Head 1 · j indexes cached positions'],
 captionIn:'article',caption:['각 위치 j에서 content와 위치 내적을 더한 뒤 전체 위치에 대해 scale과 softmax를 적용합니다. 위치 Key는 헤드 간 공유되며 Value 경로에는 들어가지 않습니다. 모든 벡터는 행벡터입니다.','At each position j, add content and position dot products, then scale and apply softmax over all positions. Position keys are shared across heads and do not enter the value path. All vectors are row vectors.'],
 alt:['왼쪽에서 위치 j의 잠재 벡터 cⱼ 1×3을 헤드 1의 Uᴷ₁과 Uⱽ₁ 3×2로 투영해 content Key와 Value 1×2를 만든다. 별도 위치 Key kⱼᴿ 1×2는 헤드 간 공유된다. 오른쪽은 현재 content Query와 content Key의 내적, 현재 위치 Query와 위치 Key의 내적을 더한다. 전체 위치의 점수에 scale과 softmax를 적용해 aⱼ를 얻고 Value를 가중합한다.','Left: latent cⱼ (1×3) is projected by head 1 matrices Uᴷ₁ and Uⱽ₁ (3×2) into content key and value vectors (1×2). Position key kⱼᴿ (1×2) is shared across heads. Right: add the content and position query-key dot products, scale and softmax across positions, then combine values with the resulting weights.'],
 sources:[{label:'DeepSeek-V2 §2.1',url:'https://arxiv.org/html/2405.04434v5#S2.SS1'}],
 panels(locale:Locale){
  const a=new Panel(locale,['1. 위치 j의 Key와 Value','1. Key and value at position j'],860);
  a.token(150,115,'cⱼ · 1×3',220,'teal',60);
  for(const [x,kind] of [[20,'K'],[280,'V']] as const){
   connector(a,[260,183],[x+110,260],{via:[[260,215],[x+110,215]],tone:'teal'});
   a.box(x,270,220,105,kind==='K'?'× Uᴷ₁':'× Uⱽ₁','3×2','purple');
   connector(a,[x+110,383],[x+110,432],{tone:'purple'});
   a.token(x,440,kind==='K'?'kⱼ,₁ᶜ · 1×2':'vⱼ,₁ · 1×2',220,'orange',60);
  }
  a.line(20,560,500,560,C.line,1);
  a.text(260,615,['위치 Key · 헤드 간 공유','Position key · Shared across heads'],{size:24,weight:600,anchor:'middle',width:470,color:C.purple});
  a.token(150,665,'kⱼᴿ · 1×2',220,'purple',60);
  a.text(260,790,['RoPE 적용 후','After RoPE'],{size:23,anchor:'middle',width:350,color:C.muted});
  const b=new Panel(locale,['2. 점수에서 출력까지','2. From scores to output'],860);
  for(const [x,pos] of [[10,false],[275,true]] as const){
   b.text(x+117,115,pos?['위치 · 2차원','Position · 2D']:['Content · 2차원','Content · 2D'],{size:23,weight:600,anchor:'middle',width:235,color:pos?C.purple:C.blue});
   b.token(x,150,pos?'q₃,₁ᴿ · kⱼᴿ':'q₃,₁ᶜ · kⱼ,₁ᶜ',235,pos?'purple':'blue',64);
   connector(b,[x+117.5,222],[260,306],{via:[[x+117.5,270],[260,270]],tone:pos?'purple':'blue'});
  }
  b.token(225,314,'+',70,'blue',54);
  connector(b,[260,376],[260,414],{tone:'blue'});
  b.token(150,422,'sⱼ',220,'blue',54);
  connector(b,[260,484],[260,532],{tone:'blue'});
  b.box(80,540,360,104,'scale · softmax',['전체 위치 j','Across all positions j'],'blue');
  connector(b,[260,652],[260,697],{tone:'blue'});
  b.token(80,705,'o₃,₁ = Σⱼ aⱼ vⱼ,₁',360,'orange',64);
  b.text(260,821,['출력 · 1×2','Output · 1×2'],{size:23,anchor:'middle',width:360,color:C.orange});
  return [a,b];
 }
} satisfies FigureSpec;
