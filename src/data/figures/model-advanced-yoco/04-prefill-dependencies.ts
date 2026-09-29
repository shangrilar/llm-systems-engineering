import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-yoco',figureId:'04-prefill-dependencies',number:'yoco-04',layout:'wide',
  eyebrow:['그림 4 · Prefill의 계산 범위','Figure 4 · Prefill work'],
  title:['기억을 모두 만든 뒤 첫 출력에 필요한 위치를 계산합니다','Build all prompt memory, then compute the position needed for the first output'],
  subtitle:['YOCO · Prompt p0부터 p3까지 · 첫 생성 토큰 x₄만 필요 · 칸은 층별 계산 위치','YOCO · Prompt p0–p3 · Only the first generated token x₄ is required · Cells show layer-position work'],
  captionIn:'article',caption:['윗 두 행은 prompt 네 위치를 모두 처리해 global KV를 만드는 self-decoder입니다. 아랫 두 행에서 과거 p0부터 p2까지의 cross-decoder 출력은 이후 global KV 생성에 필요하지 않아 생략할 수 있습니다. 현재 p3은 두 cross-decoder 층을 모두 거치며 p0부터 p3까지의 global KV를 읽고 첫 토큰 x₄를 선택합니다. 이 표는 attention mask가 아니라 계산할 위치를 나타냅니다. Prompt의 각 위치 logprob처럼 과거 출력도 요구하면 생략 범위가 달라집니다.','The first two rows process every prompt position in the self-decoder to build global KV. Past cross-decoder outputs at p0–p2 are not needed to produce later global KV, so those computations can be skipped. Current p3 still traverses both cross-decoder layers, reads global KV for p0–p3 and selects x₄. This is a work grid, not an attention mask. Requesting past outputs, such as prompt-position logprobs, changes what may be skipped.'],
  alt:['계산 격자의 self1,self2 행은 p0부터 p3까지 네 칸 모두 실행한다. Cross3,Cross4 행은 p0부터 p2까지가 점선 생략 칸이고 p3만 읽기 계산한다. p3 결과로 x4를 선택한다. 별도 조건 카드가 과거 cross 출력의 global KV 생성 비의존성과 생성이 이어질 때 새 토큰 처리를 설명한다.','Self1 and Self2 execute all four columns p0–p3. Cross3 and Cross4 have dashed skipped cells at p0–p2 and active read cells only at p3. The p3 output selects x4. Separate notes explain the lack of global-KV dependence on past cross outputs and processing the selected token on the next step.'],
  sources:[{label:'YOCO §2.3, prefill early exit',url:'https://arxiv.org/html/2405.05254v1#S2.SS3'},{label:'DeepSeek-V4.1-Flash report §2.2 and §3.2.2',url:'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/main/DeepSeek_V41_Tech_Report.pdf'}],
  panels(locale:Locale,mobile?:boolean){
    const p=new Panel(locale,['YOCO의 첫 출력 준비','YOCO: prepare the first output'],mobile?1520:1010,mobile?520:1104);
    p.text(330,139,'Prompt',{size:27,weight:600,color:C.blue,anchor:'middle',width:365});
    for(let c=0;c<4;c++)p.text(194+c*86,208,`p${c}`,{size:26,weight:600,color:c===3?C.teal:C.blue,anchor:'middle',width:80});
    const rows=[{name:'Self 1',y:240},{name:'Self 2',y:350},{name:'Cross 3',y:550},{name:'Cross 4',y:660}];
    rows.forEach((r,i)=>{
      p.text(131,r.y+45,r.name,{size:23,weight:600,color:i<2?C.blue:C.teal,anchor:'end',width:129});
      for(let c=0;c<4;c++){
        const x=155+c*86,skip=i>=2&&c<3,tone=i<2?'blue':'teal';
        p.rect(x,r.y,78,74,skip?C.grayFill:C[tone==='blue'?'blueFill':'tealFill'],skip?C.gray:C[tone],9,skip);
        p.text(x+39,r.y+44,skip?['생략','Skip']:i<2?['계산','Run']:['읽기','Read'],{size:22,weight:600,color:skip?C.gray:C[tone],anchor:'middle',width:70});
      }
    });
    p.text(260,487,['p0부터 p3까지의 global KV 준비 완료','Global KV for p0–p3 is ready'],{size:24,weight:600,color:C.teal,anchor:'middle',width:500});
    p.arrow(452,744,452,810,C.orange);p.token(400,820,'x₄',104,'orange', 60);
    p.text(260,943,['p3에서 전체 기억을 읽고 x₄ 선택','At p3, read all memory and select x₄'],{size:24,weight:600,color:C.orange,anchor:'middle',width:500});
    const xx=mobile?20:600,yy=mobile?1035:210;
    p.box(xx,yy,480,175,['생략 조건','When skipping is valid'],['과거 뒤층 출력이 이후 global KV 생성에 필요하지 않습니다.','Past late-layer outputs are not required to build later global KV.'],'gray');
    p.box(xx,yy+215,480,233,['생성이 이어질 때','When generation continues'],['선택된 x₄는 다음 입력입니다. 그때 앞·뒤 층을 모두 지나며 새 KV를 추가합니다.','Selected x₄ is the next input. It then traverses both halves and adds new KV.'],'orange');
    return [p];
  },
} satisfies FigureSpec;
