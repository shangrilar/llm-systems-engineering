import {Panel,C,grid,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-engram',figureId:'03-convolution-and-residual',number:'ma-20-04',
  eyebrow:['그림 4 · Backbone으로 복귀','Figure 4 · Back to the backbone'],
  title:['Gated Value를 보정한 뒤 Hidden에 더합니다','Refine the gated values, then add them to hidden states'],
  subtitle:['① Engram 내부의 덧셈 → ② Backbone의 덧셈 · Convolution은 B에서 확대','① Addition inside Engram → ② Addition to the backbone · B expands the convolution'],
  captionIn:'article',caption:['그림 3의 gated value를 위치별로 모은 Ṽ[T×d]가 출발점입니다. Engram은 Y=SiLU(Conv1D(RMSNorm(Ṽ)))+Ṽ를 만든 뒤 H←H+Y로 backbone에 반영합니다. 내부의 Ṽ 우회와 외부의 H 우회는 다른 덧셈입니다. 원논문은 kernel 크기 w=4, dilation δ=N을 사용합니다. B의 N=3 예시에서는 정규화된 한 성분 a_s[c]의 시점 t,t−3,t−6,t−9를 읽으며 네 연속 token을 읽지 않습니다. Depthwise convolution 자체는 다른 성분을 섞지 않습니다. 왼쪽 경계의 부족한 과거는 padding하며 미래는 읽지 않습니다. A는 그림 1의 삽입 지점을 단일 branch로 확대합니다. C는 mHC의 4개 branch 중 2개를 보여주며 조회 표와 Value projection은 공유하고 Key projection과 gate는 branch마다 다릅니다.','Starting from the gated values in Figure 3, Ṽ[T×d], Engram computes Y=SiLU(Conv1D(RMSNorm(Ṽ)))+Ṽ, then integrates it through H←H+Y. The internal Ṽ bypass and external H bypass feed different additions. The paper uses kernel size w=4 and dilation δ=N. With N=3 in B, a normalized component a_s[c] is read at t,t−3,t−6,t−9, rather than four consecutive tokens. The depthwise convolution itself does not mix components. Missing history at the left boundary is padded; no future position is read. A expands the insertion point in Figure 1 using a single branch. C shows two of the four mHC branches: lookup tables and the value projection are shared, while key projections and gates differ by branch.'],
  alt:['Ṽ가 RMSNorm, depthwise causal Conv1D, SiLU를 차례로 지나 내부 덧셈 1에서 원래 Ṽ와 합쳐져 Y가 된다. 외부 덧셈 2는 원래 H와 Y를 합친 뒤 기존 Attention과 MoE로 보낸다. 확대도에서는 정규화된 같은 성분의 10개 시점 중 t−9,t−6,t−3,t 네 칸만 convolution에 연결되고 나머지 칸은 회색이다. C는 공유 표와 Value에서 branch별 Key·gate를 거쳐 각 residual로 연결한다.','Ṽ passes through RMSNorm, depthwise causal Conv1D and SiLU, then addition 1 combines it with the original Ṽ to form Y. Addition 2 combines Y with the original H and sends the result to standard Attention and MoE. The enlargement connects only t−9,t−6,t−3,t among ten positions of the same normalized component to the convolution, with other positions gray. C links shared tables and values to each residual through branch-specific keys and gates.'],
  sources:[{label:'Engram §2.3, Eq. 5 and backbone integration',url:'https://arxiv.org/html/2601.07372v1#S2.SS3'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. 서로 다른 두 덧셈','A. Two distinct additions'],1630);
    a.token(20,110,'Ṽ [T×d]',300,'orange',65);a.token(380,110,'H',130,'blue',65);
    a.line(170,185,170,215,C.orange,2.5);a.path('M170 215 H10 V965 H122',C.orange,2.5,false,true);
    a.arrow(170,215,170,265,C.orange);a.box(40,275,280,95,'RMSNorm','','orange');
    a.arrow(180,380,180,435,C.orange);a.box(40,445,280,155,'Depthwise Conv1D',['causal · B에서 확대','Causal · Expanded in B'],'orange');
    a.arrow(180,610,180,670,C.orange);a.token(40,680,'SiLU',280,'orange',65);
    a.path('M180 755 V835 H160 V930',C.orange,2.5,false,true);
    a.circle(160,965,30,C.orangeFill,C.orange);a.text(160,974,'+',{size:29,anchor:'middle',width:40,color:C.orange});
    a.text(205,967,['① 내부','① Internal'],{size:24,weight:600,width:150,color:C.orange});
    a.arrow(160,1005,160,1060,C.orange);a.token(40,1070,'Y [T×d]',280,'orange',65);
    a.arrow(160,1145,160,1220,C.orange);
    a.path('M445 185 V1250 H198',C.blue,2.5,false,true);
    a.circle(160,1250,30,C.blueFill,C.blue);a.text(160,1259,'+',{size:29,anchor:'middle',width:40,color:C.blue});
    a.text(210,1197,['② H + Y','② H + Y'],{size:24,weight:600,width:200,color:C.blue});
    a.arrow(160,1290,160,1350,C.blue);a.box(20,1360,320,190,['기존 Backbone','Standard backbone'],'Attention → MoE','blue');
    const b=new Panel(locale,['B. 간격을 두고 과거 읽기','B. Read history with gaps'],1630);
    b.box(20,110,480,120,'w = 4 · δ = N = 3',['네 시점 · 같은 성분 c','Four positions · Same component c'],'orange');
    b.text(260,300,'a_s = RMSNorm(Ṽ_s)',{size:25,weight:600,anchor:'middle',width:500});
    const g=grid(b,25,405,1,10,{cell:42,gap:6,tone:(_r,c)=>c%3===0?'orange':'gray'});
    for(const c of [0,3,6,9]){
      const x=g.cellX(c)+21;
      b.text(x,370,c===9?'t':`t−${9-c}`,{size:23,anchor:'middle',width:80,color:C.orange});
      b.text(x,434,'c',{size:22,weight:600,anchor:'middle',width:36,color:C.orange});
      b.arrow(x,458,x,565,C.orange);
    }
    b.box(10,575,500,130,['성분 c의 Conv1D','Conv1D for component c'],['선택한 네 값을 가중합','Weighted sum of the four selected values'],'orange');
    b.arrow(260,715,260,775,C.orange);b.token(100,785,'Conv(a)_t[c]',320,'orange',70);
    b.box(20,950,480,185,['Depthwise의 범위','What depthwise means'],['이 convolution은 같은 성분의 과거를 결합합니다. 다른 성분을 섞는 선은 없습니다.','This convolution combines history within each component. No cross-component links are drawn.'],'gray');
    b.box(20,1210,480,180,['Causal 경계','Causal boundary'],['현재 t까지 읽습니다. 시작 부분에서 부족한 과거는 padding으로 채웁니다.','Reads only up to t. Missing history near the sequence start is filled by padding.'],'gray');

const c=new Panel(locale,['C. mHC에서는 branch별로 gate','C. mHC gates each branch separately'],820);
c.token(20,110,['공유 조회 표 → e','Shared lookup tables → e'],480,'teal',65);
c.arrow(260,185,260,225,C.teal);c.token(20,235,'W_V → v (shared)',480,'teal',65);
for(let i=0;i<2;i++){
 const x=20+i*260;c.box(x,370,220,160,`Branch ${i+1}`,`h${i+1} ↔ W_K${i+1} e\n→ α${i+1}`,'blue');
 c.path(`M${i===0?25:495} 185 H${i===0?8:512} V350 H${x+110} V360`,C.teal,2,false,true);
 c.path(`M260 310 V665 H${i===0?250:270}`,C.teal,2,false,true);
 c.arrow(x+110,540,x+110,585,C.orange);c.box(x,595,220,145,`α${i+1} × v`,['conv 후 해당 H에 더함','Conv, then add to its H'],'orange');
}
c.text(260,780,['2개 branch만 확대 · 실제 실험은 4개','Two branches shown · Four in the experiment'],{size:23,anchor:'middle',width:490});
return [a,b,c];
  },
} satisfies FigureSpec;
