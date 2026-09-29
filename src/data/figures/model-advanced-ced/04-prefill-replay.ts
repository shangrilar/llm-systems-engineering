import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'model-advanced-ced',figureId:'04-prefill-replay',number:'ced-04',
  eyebrow:['그림 6 · Prefill 계산 범위','Figure 6 · Prefill work'],
  title:['CED는 최근 구간도 계산해 Local KV를 준비합니다','CED also processes a recent suffix to prepare local KV'],
  subtitle:['Prompt 6위치 · 교육용 앞 2층 + 뒤 2층 · CED 재계산 구간 W = 2','Six prompt positions · Illustrative 2 + 2 layers · CED replay suffix W = 2'],
  captionIn:'article',caption:['이 격자는 attention mask가 아니라 실행할 query 위치입니다. YOCO는 global KV를 준비한 뒤 마지막 입력 위치만 cross-decoder에서 처리해 첫 출력을 얻습니다. CED는 decoder의 local KV도 필요하므로 최근 구간을 재계산합니다. W=2는 설명용 축소 값이며 실제 모델 설정이 아닙니다. Bounded replay는 구간 밖 local 참조를 잘라 근사 상태를 만들며, 전체 decoder 계산과 수학적으로 같지 않습니다. 긴 입력의 나머지 decoder 계산은 생략합니다.','This is a grid of query positions to execute, not an attention mask. After preparing global KV, YOCO processes the last prompt position through its cross-decoder. CED also replays a recent suffix to prepare decoder-local KV. W=2 is illustrative, not the model setting. Bounded replay truncates local references outside the suffix and produces approximate states, not states mathematically identical to a full decoder pass.'],
  alt:['YOCO는 앞 두 층에서 p0부터 p5까지 계산하고 뒤 두 층은 p5만 계산한다. CED는 encoder 전체 위치를 계산하고 decoder는 p4와 p5를 계산하여 local KV를 준비한다. 두 경우 p5 출력에서 x6을 선택한다.','YOCO runs early layers over p0 through p5 and later layers only at p5. CED runs the encoder across all positions, then decoder at p4 and p5 to prepare local KV. Both select x6 from the p5 output.'],
  sources:[{label:'YOCO §2.3',url:'https://arxiv.org/html/2405.05254v1#S2.SS3'},{label:'Decoder SWA Bounded Replay §3.2.2',url:'https://arxiv.org/html/2609.19969v1#S3.SS2.SSS2'}],
  panels(locale:Locale){
    return [false,true].map(ced=>{
      const p=new Panel(locale,ced?['B. CED · 최근 2위치도 처리','B. CED · Replay the last 2 positions']:['A. YOCO · 마지막 위치 처리','A. YOCO · Run the final position'],1050);
      const x=148,step=60;
      for(let c=0;c<6;c++)p.text(x+c*step+25,155,`p${c}`,{size:20,anchor:'middle',width:54});
      [200,300,540,640].forEach((y,r)=>{
        p.text(130,y+34,`${r<2?ced?'Enc':'Self':ced?'Dec':'Cross'} ${r<2?r+1:r-1}`,{size:20,weight:600,anchor:'end',width:125});
        for(let c=0;c<6;c++){
          const active=r<2||c>=(ced?4:5),tone=r<2?'blue':ced?'orange':'teal';
          p.rect(x+c*step,y,50,58,active?C[`${tone}Fill`]:C.grayFill,active?C[tone]:C.gray,6,!active);
          p.text(x+c*step+25,y+37,active?'●':'–',{size:21,anchor:'middle',width:46,color:active?C[tone]:C.gray});
        }
      });
      p.box(15,400,490,95,['입력 전체의 Global KV 준비 완료','Global KV is ready for the prompt'],'','teal');
      p.arrow(473,710,473,755,C.orange);p.token(408,765,'x6',102,'orange',60);
      p.text(265,810,['p5에서 첫 출력 선택 →','Select the first output at p5 →'],{size:22,anchor:'middle',width:270,color:C.orange});
      p.box(15,885,490,140,ced?['Local KV 복원은 근사','Local KV reconstruction is approximate']:['과거 뒤층 출력이 필요 없음','Past cross-decoder outputs are unused'],ced?['구간 밖 SWA 참조를 생략합니다.','SWA references outside the suffix are truncated.']:['Global KV 생성이 앞부분에서 끝납니다.','Global KV construction ends in the earlier stack.'],'gray');
      return p;
    });
  },
} satisfies FigureSpec;
