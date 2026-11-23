import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'model-advanced-ced',figureId:'02-sequences-and-causality',number:'ced-02',
  eyebrow:['그림 2 · 토큰열과 읽기 범위','Figure 2 · Sequences and visibility'],
  title:['입력 전체를 읽는 ED와 과거부터 이어 가는 CED','ED reads the source; CED extends a causal sequence'],
  subtitle:['행: 읽는 위치 Q · 열: 참조 위치 K · 색: 허용 · 점선: 미래 차단','Rows: Query positions · Columns: Key positions · Color: allowed · Dashed: future blocked'],
  captionIn:'article',caption:['왼쪽은 입력 세 위치와 출력 두 위치가 독립적인 T5형 예입니다. 오른쪽은 같은 토큰열의 인과적 위치 대응을 보여줍니다. CED의 아래 격자는 압축·희소 선택 이전의 인과적 허용 범위이며 실제 CSA2 접근 행렬이 아닙니다. 실행 중 Q 한 위치가 여러 KV 항목을 읽을 수 있으므로, 같은 토큰열이라는 말은 Q와 KV 텐서 길이가 항상 같다는 뜻이 아닙니다.','Left: three source positions and two target positions in a T5-style model. Right: causal position correspondence in one CED sequence. The lower CED grid shows the causal envelope before compression and sparse selection, not the actual CSA2 access matrix. A one-position Query can read many KV entries; one sequence does not mean equal runtime tensor lengths.'],
  alt:['ED encoder의 3x3 격자는 모두 허용되고 decoder cross-attention의 2x3도 입력 전체를 읽는다. CED의 encoder 및 decoder 대 encoder 위치 격자는 4x4 하삼각이며 미래 위치를 차단한다.','ED has fully visible 3x3 encoder and 2x3 cross-attention grids. CED encoder and decoder-to-encoder position grids are 4x4 lower triangles blocking future positions.'],
  sources:[{label:'T5 masks, Figure 3–4',url:'https://jmlr.org/papers/volume21/20-074/20-074.pdf'},{label:'CED §2.2',url:'https://arxiv.org/html/2609.19969v1#S2.SS2'}],
  panels(locale:Locale){
    return [false,true].map(ced=>{
      const p=new Panel(locale,ced?['B. CED · 같은 위치축','B. CED · One position axis']:['A. ED · 두 위치축','A. ED · Two position axes'],1050);
      const draw=(top:number,rows:number,cols:number,cross:boolean)=>{
        const x=170,y=top+85,step=72;
        p.text(260,top,cross?ced?['Decoder → Encoder 위치','Decoder → Encoder positions']:'Decoder → Source':'Encoder → Encoder',{size:24,weight:600,anchor:'middle',width:500});
        for(let c=0;c<cols;c++)p.text(x+c*step+30,y-22,`${ced?'p':'s'}${c}`,{size:21,anchor:'middle',width:60,color:C.teal});
        for(let r=0;r<rows;r++){
          p.text(x-24,y+r*step+38,`${ced?'p':cross?'t':'s'}${r}`,{size:21,anchor:'end',width:110,color:C.blue});
          for(let c=0;c<cols;c++){const allow=!ced||c<=r;p.rect(x+c*step,y+r*step,60,60,allow?C.tealFill:C.paper,allow?C.teal:C.gray,4,!allow);}
        }
      };
      draw(130,ced?4:3,ced?4:3,false);
      draw(560,ced?4:2,ced?4:3,true);
      p.box(15,955,490,80,ced?['인과적 허용 범위 ≠ 실제 희소 선택','Causal allowance ≠ sparse selection']:['입력과 출력 길이는 독립적','Source and target lengths are independent'],'','gray');
      return p;
    });
  },
} satisfies FigureSpec;
