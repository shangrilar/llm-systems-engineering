import {Panel,C,matrix,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-vision-encoder',figureId:'04-vision-contextualization',number:'ma-21-04',
  eyebrow:['그림 4 · Patch 사이 정보 교환','Figure 4 · Mixing across patches'],
  title:['Vision Encoder가 다른 Patch의 정보를 반영합니다','The vision encoder brings information across patches'],
  subtitle:['4개 patch · 입력 U[4×4] → 출력 Z[4×d_v], 여기서는 d_v=4','4 patches · Input U[4×4] → Output Z[4×d_v], with toy d_v=4'],
  captionIn:'article',caption:['U는 그림 3에서 위치 정보를 더한 네 patch 벡터입니다. Encoder의 self-attention은 각 위치의 Query로 같은 이미지의 여러 Key와 Value를 읽습니다. B는 한 block에서 A 위치의 정보 수집만 확대했으며 A 자신도 읽습니다. Q_A와 KV_A…KV_D는 그 block의 정규화된 입력에서 만들어집니다. Attention 출력 projection, norm 및 residual의 세부는 접었고 FFN은 위치별로 적용됩니다. A의 u′_A는 한 block 뒤의 표현이며 전체 encoder 뒤의 z_A와 구별합니다. 깊이는 설명을 위해 두 block으로 그렸습니다. 각 출력 행은 여전히 같은 patch 위치에 대응하지만 주변 정보가 반영된 연속 벡터입니다. Class token과 분류 head는 이 멀티모달 patch 경로에서 생략했습니다. Z를 언어 모델에 연결하는 단계는 다음 편에서 다룹니다.','U contains the four patch vectors after adding position information in Figure 3. Encoder self-attention uses each position’s query to read keys and values across the same image. B expands only position A’s aggregation within one block, including its own value. Q_A and KV_A…KV_D come from that block’s normalized input. Output projection, normalization and residual details are folded away; the FFN is applied per position. The one-block output u′_A differs from z_A after the whole encoder. Two blocks illustrate depth. Output rows retain their patch-position correspondence but are continuous vectors informed by surrounding patches. The class token and classification head are omitted from this multimodal patch path. The next article connects Z to the language model.'],
  alt:['입력 U는 A,B,C,D 네 행과 네 성분이다. Self-attention과 FFN을 포함한 두 vision block을 지나 Z의 z_A,z_B,z_C,z_D 네 행을 얻는다. 확대도에서 Q_A가 KV_A,KV_B,KV_C,KV_D를 모두 읽어 A의 attention 결과를 만들고 residual과 FFN을 거쳐 한 block 출력 u′_A가 된다. 최종 Z는 다음 편의 언어 모델 연결로 보낸다.','Input U has rows A,B,C,D with four components each. Two vision blocks containing self-attention and FFN produce Z with rows z_A,z_B,z_C,z_D. The enlargement shows Q_A reading KV_A,KV_B,KV_C,KV_D, then residual and FFN processing yield the one-block output u′_A. Final Z is passed to the next article’s language-model connector.'],
  sources:[{label:'Vision Transformer §3.1, Eqs. 1–3 and global self-attention',url:'https://arxiv.org/html/2010.11929v2#S3.SS1'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. 네 행은 유지되고 값은 변화','A. Same rows, new values'],1670);
    a.text(280,120,'U [4×4]',{size:26,weight:600,anchor:'middle',width:400,color:C.blue});
    matrix(a,105,165,Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>`u_${'ABCD'[r]}${c}`)),{cellWidth:86,cellHeight:55,gap:6,size:22,tone:'blue',rowLabels:['A','B','C','D']});
    a.arrow(280,415,280,465,C.blue);
    for(let i=0;i<2;i++){
      const y=475+i*205;
      a.box(30,y,460,140,`Vision block ${i+1}`,'Self-attention → FFN','teal');
      if(i===0)a.arrow(280,y+150,280,y+195,C.teal);
    }
    a.arrow(280,830,280,875,C.teal);
    a.text(280,930,'Z [4×d_v] · d_v = 4',{size:26,weight:600,anchor:'middle',width:470,color:C.teal});
    matrix(a,105,980,Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>`z_${'ABCD'[r]}${c}`)),{cellWidth:86,cellHeight:55,gap:6,size:22,tone:'teal',rowLabels:['A','B','C','D']});
    a.arrow(280,1230,280,1290,C.muted);
    a.box(20,1300,480,145,['언어 모델 연결: 다음 편','Connect to the LM: next article'],['연속 벡터 Z를 전달','Pass the continuous vectors Z'],'gray');
    const b=new Panel(locale,['B. 한 Block의 A 위치 확대','B. Position A within one block'],1670);
    b.box(20,110,480,110,['정규화된 입력에서 Q, K, V','Q, K, V from normalized input'],['Q_A는 A에서 · KV는 각 위치에서','Q_A from A · KV from each position'],'teal');
    for(let i=0;i<4;i++){
      const x=10+i*125;
      b.token(x,285,`KV_${'ABCD'[i]}`,115,'teal',65);
      b.arrow(x+57,360,250+i*75,450,C.teal);
    }
    b.token(20,500,'Q_A',150,'blue',65);b.arrow(180,532,210,532,C.blue);
    b.box(220,460,280,165,'Attention at A',['Q·K 점수 → softmax\nA~D의 V 가중합','Q·K scores → softmax\nWeighted V from A–D'],'teal');
    b.arrow(350,635,350,690,C.teal);b.box(220,700,280,135,'Residual + FFN',['A의 표현 갱신','Update A’s representation'],'blue');
    b.arrow(350,845,350,900,C.blue);b.token(220,910,'u′_A [4]',280,'blue',70);
    b.text(260,1050,['B, C, D도 각자의 Query로 갱신','B, C and D update with their own queries'],{size:24,weight:600,anchor:'middle',width:500});
    b.text(260,1145,['읽을 수 있는 위치 비교','Positions each query can read'],{anchor:'middle',width:500,weight:600});
    for(let mode=0;mode<2;mode++){
      const x=mode*265+20;
      b.text(x+110,1200,mode===0?'ViT':'Causal LM',{anchor:'middle',width:240,weight:600});
      for(let r=0;r<4;r++)for(let c=0;c<4;c++){
        const allowed=mode===0||c<=r;
        b.rect(x+c*53,1240+r*53,47,47,allowed?C.tealFill:C.grayFill,allowed?C.teal:C.line,3);
        b.text(x+c*53+24,1272+r*53,allowed?'✓':'×',{anchor:'middle',width:40,size:23,color:allowed?C.teal:C.muted});
      }
    }
    b.box(20,1490,480,140,['행: Query · 열: Key','Rows: queries · columns: keys'],['기본 ViT는 모든 패치 읽기\n지역 window 등 변형도 있음','Basic ViT reads all patches\nLocal-window variants also exist'],'gray');
    return [a,b];
  },
} satisfies FigureSpec;
