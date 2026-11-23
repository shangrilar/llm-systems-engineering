import {Panel,C,matrix,grid,type FigureSpec,type Locale,type Label,type Tone} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-vision-encoder',figureId:'01-pixels-and-channels',number:'ma-21-01',layout:'wide',
  eyebrow:['그림 1 · 픽셀과 채널','Figure 1 · Pixels and channels'],
  title:['이미지는 위치마다 색 채널 값을 가진 배열입니다','An image is an array of color channels at spatial positions'],
  subtitle:['교육용 4×4 RGB 이미지 · H=4, W=4, C=3 · 총 48개 숫자','Toy 4×4 RGB image · H=4, W=4, C=3 · 48 numbers in total'],
  captionIn:'article',caption:['작은 칸 하나가 픽셀 하나입니다. A/B/C/D는 색 영역을 추적하기 위한 이름이며 vocabulary ID가 아닙니다. 한 픽셀은 R,G,B 세 숫자를 가지고, 이 예시의 16픽셀에는 총 48개 숫자가 있습니다. 색 값은 실제 모델 전처리 normalization 전의 교육용 0~1 값입니다. 이미지를 언어 모델에 연결하려면 먼저 vision encoder가 사용할 벡터 표현으로 바꿔야 합니다. 위 경로는 encoder 기반 연결 방식의 개요이며 다음 그림부터 patch projection을 펼칩니다.','Each small square is one pixel. A/B/C/D label color regions for tracking; they are not vocabulary IDs. Each pixel contains three numbers, R,G,B, so these 16 pixels contain 48 numbers in total. Colors use illustrative 0–1 values before model-specific preprocessing normalization. Connecting an image to a language model starts by turning pixels into vectors for a vision encoder. The overview shows an encoder-based connection path; the following figures expand patch projection.'],
  alt:['개요는 이미지, vision encoder, 연결 모듈, 언어 모델 순서이며 앞 두 단계가 강조된다. 4×4 이미지의 좌상 2×2는 A 빨강, 우상은 B 초록, 좌하는 C 파랑, 우하는 D 흰색이다. 픽셀(0,0)을 확대하면 RGB=[1,0,0]이다. 네 영역의 RGB는 A=[1,0,0], B=[0,1,0], C=[0,0,1], D=[1,1,1]이며 16픽셀×3채널=48개 숫자다.','The overview runs from image to vision encoder, connector and language model, highlighting the first two stages. In the 4×4 image, the top-left 2×2 region A is red, top-right B is green, bottom-left C is blue and bottom-right D is white. Enlarged pixel (0,0) has RGB=[1,0,0]. The four regions have A=[1,0,0], B=[0,1,0], C=[0,0,1], D=[1,1,1], totaling 16 pixels × 3 channels = 48 numbers.'],
  sources:[{label:'Vision Transformer §3.1, image shape and patch projection',url:'https://arxiv.org/html/2010.11929v2#S3.SS1'}],
  panels(locale:Locale,mobile?:boolean){
    const w=mobile?520:1104;
    const a=new Panel(locale,['A. 이미지에서 언어 모델까지','A. From image to language model'],mobile?735:275,w);
    const stages:Label[]=[['이미지','Image'],'Vision encoder',['연결 모듈','Connector'],['언어 모델','Language model']];
    stages.forEach((label,i)=>{
      const x=mobile?110:i*285,y=mobile?110+i*155:110;
      const tone:Tone=i===0?'blue':i===1?'teal':'gray';
      a.box(x,y,mobile?300:235,95,label,'',tone);
      if(i<3){if(mobile)a.arrow(x+150,y+105,x+150,y+145,i===0?C.teal:C.muted);else a.arrow(x+243,y+48,x+277,y+48,i===0?C.teal:C.muted);}
    });
    const b=new Panel(locale,['B. 16개 픽셀 · 각각 RGB','B. 16 pixels · RGB at each pixel'],mobile?1320:735,w);
    const gx=mobile?110:60,gy=180,cell=72,gap=6,step=cell+gap;
    const palette=['#ff0000','#00ff00','#0000ff','#ffffff'];
    const fills=Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>palette[Math.floor(r/2)*2+Math.floor(c/2)]));
    grid(b,gx,gy,4,4,{cell,gap,fill:(r,c)=>fills[r][c]});
    for(let r=0;r<4;r++)for(let c=0;c<4;c++){
      const i=Math.floor(r/2)*2+Math.floor(c/2);
      b.text(gx+c*step+36,gy+r*step+45,'ABCD'[i],{size:27,weight:600,color:i===2?'#ffffff':'#111111',anchor:'middle',width:60});
    }
    b.text(gx+153,115,['4행 × 4열','4 rows × 4 columns'],{size:25,weight:600,anchor:'middle',width:400});
    b.text(gx+153,545,'H 4 × W 4 × C 3 = 48',{size:25,weight:600,anchor:'middle',width:480});
    const zx=mobile?110:650,zy=mobile?735:240;
    if(mobile)b.path(`M${gx-10} ${gy+36} H55 V${zy+40} H${zx-10}`,C.orange,2.5,false,true);
    else b.path(`M${gx+36} ${gy-10} V140 H${zx+40} V${zy-10}`,C.orange,2.5,false,true);
    b.rect(zx,zy,80,80,'#ff0000',C.line,3);b.text(zx+40,zy+49,'A',{size:29,weight:600,color:'#111111',anchor:'middle',width:60});
    b.text(zx+110,zy+47,['픽셀 (0, 0)','Pixel (0, 0)'],{size:25,weight:600,width:310});
    b.arrow(zx+40,zy+90,zx+40,zy+155,C.orange);
    matrix(b,zx,zy+215,[[1,0,0]],{cellWidth:88,cellHeight:60,gap:7,size:25,tone:'orange',columnLabels:['R','G','B']});
    const ly=mobile?1130:635;
    b.text(mobile?30:30,ly,'A [1,0,0]     B [0,1,0]',{size:24,weight:600,width:500});
    b.text(mobile?30:570,mobile?ly+75:ly,'C [0,0,1]     D [1,1,1]',{size:24,weight:600,width:500});
    return [a,b];
  },
} satisfies FigureSpec;
