import {Panel,C,grid,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-vision-language',figureId:'03-text-generation-path',number:'ma-22-04',
  eyebrow:['그림 4 · 다음 Text Token','Figure 4 · The next text token'],
  title:['함께 처리한 Hidden에서 다음 Text Token을 고릅니다','Predict the next text token from the joint hidden state'],
  subtitle:['주 경로: embedding 삽입형 · 행 벡터 표기 · h_last[8] W_head[8×|Vocab|]','Main path: embedding insertion · Row-vector notation · h_last[8] W_head[8×|Vocab|]'],
  captionIn:'article',caption:['앞 그림의 일곱 입력 위치를 causal decoder가 처리한 뒤 마지막 위치 Pos 6의 최종 hidden에서 다음 text token y0를 예측합니다. Final norm은 hidden에 포함한 것으로 접었습니다. LM head의 출력은 텍스트 어휘에 대한 logits이며 decoding 규칙으로 ID를 고릅니다. 다음 step에는 y0의 embedding을 새 위치 Pos 7에 넣어 문맥이 여덟 위치가 됩니다. 선택 직후 y0가 이미 처리되었다는 뜻은 아니며 실제 decoding은 앞선 KV를 재사용할 수 있습니다. 회색 비교 삽화는 visual memory를 별도로 두고 언어 Query가 cross-attention으로 읽는 대안입니다. Flamingo의 resampler와 KV projection 등 memory 준비 세부를 접은 개념도이며 삽입형과 동시에 필요한 단계가 아닙니다. 시각 입력을 읽는 이 경로가 이미지나 음성 출력 능력까지 뜻하지는 않습니다.','A causal decoder processes the seven positions from the previous figure and predicts text token y0 from the final hidden state at Pos 6. Final normalization is folded into that hidden state. The LM head outputs logits over the text vocabulary; decoding selects an ID. On the next step, y0’s embedding enters at new Pos 7, extending the context to eight positions. Selection alone does not mean y0 has already been processed; decoding may reuse prior KV. The gray inset shows an alternative: language queries read separate visual memory through cross-attention. It folds away memory preparation such as Flamingo’s resampler and KV projections, and is not an additional required stage of the insertion path. Reading visual input does not by itself imply image or audio output capability.'],
  alt:['Visual 네 행과 text 세 행의 입력을 decoder가 처리한다. 마지막 위치의 h_last[8]가 LM head[8×|Vocab|]를 지나 text logits를 만들고 ID y0를 선택한다. 다음 step에는 y0의 embedding 여덟 성분을 Pos7에 넣는다. 별도 회색 비교도에서는 decoder Query와 visual bank의 KV가 cross-attention에서 만나 이후 언어 경로로 간다.','A decoder processes four visual and three text rows. Final-position h_last[8] passes through an LM head[8×|Vocab|] to produce text logits and select ID y0. The next step inserts the eight-component embedding of y0 at Pos7. A separate gray inset shows decoder queries reading visual-bank KV through cross-attention before continuing along the language path.'],
  sources:[{label:'LLaVA §4.1–4.2, autoregressive language output',url:'https://arxiv.org/html/2304.08485v2#S4.SS2'},{label:'Flamingo §3.1.1–3.1.2, resampler and visual cross-attention',url:'https://arxiv.org/html/2204.14198v1#S3.SS1'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. 일곱 입력에서 y0까지','A. From seven inputs to y0'],1650);
    a.text(280,120,'H_input [7×8]',{size:26,weight:600,anchor:'middle',width:400});
    const g=grid(a,135,170,7,8,{cell:41,gap:5,tone:r=>r<4?'teal':'blue'});
    g.outline(6,0,6,7,'orange',3);
    const rows=['V_G1','V_G2','V_G3','V_G4','E_1','E_2','E_3'];
    rows.forEach((row,r)=>a.text(115,g.cellY(r)+29,row,{size:23,anchor:'end',width:90,color:r<4?C.teal:C.blue}));
    a.arrow(300,500,300,540,C.blue);a.box(40,550,460,130,'Decoder blocks','Causal self-attention + FFN','blue');
    a.arrow(270,690,270,745,C.blue);a.token(40,755,'Pos 6 → h_last [8]',460,'orange',75);
    a.arrow(270,840,270,900,C.orange);a.box(40,910,460,115,'LM head','W_head [8×|Vocab|]','blue');
    a.arrow(270,1035,270,1090,C.blue);a.box(40,1100,460,120,'Logits [|Vocab|]',['Decoding 규칙으로 ID 선택','Select an ID with a decoding rule'],'blue');
    a.arrow(270,1230,270,1280,C.blue);a.token(40,1290,['다음 Text ID: y0','Next text ID: y0'],460,'orange',75);
    a.box(40,1440,460,140,['출력 공간은 Text 어휘','Output space: text vocabulary'],['이미지 입력을 읽고 텍스트로 답하는 경로입니다.','A path that reads visual input and responds in text.'],'gray');
    const b=new Panel(locale,['B. 선택 뒤 다음 Step으로','B. After selection: the next step'],1650);
    b.token(60,110,'y0',400,'orange',65);b.arrow(260,185,260,245,C.orange);
    b.box(20,255,480,115,'Embedding table',['선택한 ID의 행 조회','Retrieve the selected ID’s row'],'blue');b.arrow(260,380,260,415,C.blue);
    grid(b,85,475,1,8,{cell:47,gap:6,tone:()=> 'orange'});
    b.text(290,455,'E(y0) [1×8]',{size:24,weight:600,anchor:'middle',width:400,color:C.orange});
    b.arrow(294,535,294,590,C.orange);b.box(20,600,480,120,['새 입력 위치 Pos 7','New input position: Pos 7'],['이 embedding으로 다음 step 진행','Use this embedding on the next step'],'blue');
    b.text(260,785,['문맥의 위치 수: 7 → 8','Context positions: 7 → 8'],{size:25,weight:600,anchor:'middle',width:500});
    b.rect(10,905,500,710,C.grayFill,C.gray,12);
    b.text(30,952,['대안적 결합 위치','An alternative fusion location'],{size:26,weight:600,width:460,color:C.gray});
    b.box(30,1040,200,160,['Decoder Hidden','Decoder hidden'],'Query','blue');
    b.box(300,1040,200,160,'Visual bank',['Z → 변환 → KV','Z → preparation → KV'],'teal');
    b.arrow(130,1210,130,1270,C.blue);b.arrow(400,1210,400,1270,C.teal);
    b.box(60,1280,400,150,'Cross-attention',['언어 Query가 시각 KV 읽기','Language queries read visual KV'],'teal');
    b.arrow(260,1440,260,1490,C.blue);b.token(60,1500,['이후 언어 경로','Continue the language path'],400,'blue',70);
    return [a,b];
  },
} satisfies FigureSpec;
