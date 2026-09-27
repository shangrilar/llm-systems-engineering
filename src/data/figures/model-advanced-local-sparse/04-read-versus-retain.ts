import {Panel,C,matrix,port,connector,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-local-sparse',figureId:'04-read-versus-retain',number:'ma-04-04',
  eyebrow:['그림 4 · 읽기와 보관','Figure 4 · Read and retain'],
  title:['적게 읽는 것과 적게 보관하는 것은 다릅니다','Fewer reads do not always mean less storage'],
  subtitle:['각 칸은 한 위치의 KV · 층마다 자기 cache를 관리 · 교육용 상태 예시','Each cell is one position’s KV · Each layer owns its cache · Teaching state examples'],
  caption:['Window 밖의 위치를 다시 읽지 않는 층은 오래된 KV를 버릴 수 있습니다. 그러나 원래 KV에서 다음 Query의 선택을 수행하는 sparse 설계에서는 지금 읽지 않은 KV도 필요할 수 있습니다. 삭제 가능 여부는 해당 층의 접근 규칙과 상태 수명으로 판단합니다.','A layer that never reads outside its window can discard old KV. A sparse design that selects the next query’s positions from original KV may still need entries that are unread now. Safe deletion depends on that layer’s access rule and state lifetime.'],
  alt:['A의 window-only 층은 p7에서{5,6,7}, p8에서{6,7,8}을 보관하므로 5를 삭제하고 8을 추가한다. 별도 full-attention 층의 캐시에는 p0부터 p8이 있고 p5도 유지된다. B는 원래 KV가 선택에 필요한 sparse 층으로 p0부터 p7의 8개를 보관하면서 현재 q7은{0,5,7}의 3개만 읽는다.','A window-only layer retains {5,6,7} at p7 and {6,7,8} at p8, removing 5 and adding 8. A separate full-attention layer retains positions 0–8, including p5. B is a sparse layer whose selection requires original KV: it keeps all 8 positions 0–7 while q7 reads only 3 positions {0,5,7}.'],
  sources:[{label:'Mistral 7B §2, rolling buffer cache',url:'https://arxiv.org/html/2310.06825v1#S2'}],
  panels(locale:Locale){
    const a=new Panel(locale,['A. Window 전용 층','A. A window-only layer'],1260);
    a.text(10,114,['조건: window 밖 위치를 다시 읽지 않음','Condition: never reads outside the window'],{size:24,weight:600,width:500});
    a.rect(10,199,500,659,C.paper,C.teal,12);
    a.text(30,244,['이 층의 KV cache','This layer’s KV cache'],{size:26,weight:600,color:C.teal,width:458});
    a.text(30,310,['p7을 처리할 때','While processing p7'],{size:24,weight:600,width:458});
    matrix(a,112,347,[[5,6,7]],{cellWidth:88,cellHeight:62,gap:16,size:27});
    a.arrow(260,435,260,558,C.muted);
    a.text(83,491,['p5 삭제','Remove p5'],{size:24,color:C.muted,anchor:'middle',width:142});
    a.text(425,491,['p8 추가','Add p8'],{size:24,color:C.orange,anchor:'middle',width:142});
    a.text(30,601,['p8을 처리할 때','While processing p8'],{size:24,weight:600,width:458});
    matrix(a,112,638,[[6,7,8]],{cellWidth:88,cellHeight:62,gap:16,size:27,tone:(_,j)=>j===2?'orange':'teal'});
    a.text(30,774,['보관: 최근 3개 위치의 KV','Retain KV for the latest 3 positions'],{size:25,weight:600,color:C.teal,width:458});
    a.rect(10,927,500,278,C.grayFill,C.muted,12);
    a.text(30,971,['다른 full-attention 층의 cache','A different full-attention layer’s cache'],{size:24,weight:600,color:C.muted,width:458});
    matrix(a,38,1045,[Array.from({length:9},(_,i)=>i)],{cellWidth:44,cellHeight:52,gap:6,size:22,tone:'gray'});
    a.text(30,1147,['이 cache의 p5는 그대로 보관합니다.','This cache still retains p5.'],{size:24,color:C.muted,width:458});

    const b=new Panel(locale,['B. 선택에 원래 KV가 필요한 층','B. Selection needs original KV'],1260);
    b.text(10,114,['조건: 다음 Query가 다른 위치를 고를 수 있음','Condition: the next query may select other positions'],{size:24,weight:600,width:500});
    b.token(216,226,'q7',88,'blue',54);
    b.text(20,260,['현재 읽기','Current reads'],{size:23,color:C.muted,width:176});
    const row=matrix(b,38,427,[Array.from({length:8},(_,i)=>i)],{cellWidth:48,cellHeight:56,gap:8,size:24,tone:(_,j)=>[0,5,7].includes(j)?'teal':'gray'});
    // Border encloses the whole retained state; drawing it unfilled preserves cells.
    b.parts.push('<rect x="10" y="397" width="500" height="350" rx="12" fill="none" stroke="'+C.teal+'" stroke-width="1.5"/>');
    connector(b,[260,288],[260,343],{tone:'blue',arrow:false});
    b.line(port(row.cell(0,0),'top')[0],343,port(row.cell(0,7),'top')[0],343,C.blue,2.5);
    for(const j of [0,5,7]){
      const to=port(row.cell(0,j),'top',.5,8);
      connector(b,[to[0],343],to,{tone:'blue'});
    }
    b.text(30,547,['이 층의 KV cache','This layer’s KV cache'],{size:26,weight:600,color:C.teal,width:458});
    b.text(30,605,['회색 칸도 보관 중입니다.','Gray entries are still retained.'],{size:24,weight:600,color:C.muted,width:458});
    b.text(30,663,['다음 Query에서 선택될 수 있습니다.','They may be selected by the next query.'],{size:24,color:C.muted,width:458});
    b.text(260,830,['보관 8개 · 현재 읽기 3개','8 retained · 3 read now'],{size:28,weight:600,color:C.blue,anchor:'middle',width:490});
    b.box(30,929,460,196,['읽지 않았다고 삭제하지는 않습니다.','Unread does not mean disposable.'],['선택에 필요한 상태와 선택 후 읽는 KV를 구별합니다.','Distinguish the state needed for selection from the KV read after selection.'],'gray');
    return [a,b];
  },
} satisfies FigureSpec;
