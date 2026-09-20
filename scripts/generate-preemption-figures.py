"""Original bilingual teaching figures. Regenerate PNGs with the companion renderer."""
from pathlib import Path
from html import escape
import json
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images'
INK, MUTED, LINE = '#182C40', '#526577', '#DCE4EC'
COLORS = ['#2470BB', '#287D78', '#7954A3', '#B55B22']
FILLS = ['#EDF5FD', '#EDF7F5', '#F3EEF8', '#FFF2E6']
MANIFEST, LANG = [], 'ko'

def tr(s): return s[LANG == 'en'] if isinstance(s, tuple) else str(s)

def units(s): return sum(1 if unicodedata.east_asian_width(c) in 'WF' else .57 for c in s)

def lines(s, width, size):
    result=[]
    for part in tr(s).split('\n'):
        line=''
        for word in part.split(' '):
            candidate=(line+' '+word).strip()
            if line and units(candidate)*size > width:
                result.append(line); line=word
            else: line=candidate
        result.append(line)
    return result

def text(x,y,s,size=24,color=INK,bold=False,anchor='start',width=None):
    ll=lines(s,width,size) if width else tr(s).split('\n')
    return ''.join(f'<text x="{x}" y="{y+i*size*1.4}" fill="{color}" font-size="{size}" font-weight="{700 if bold else 400}" text-anchor="{anchor}">{escape(line)}</text>' for i,line in enumerate(ll))

def rect(x,y,w,h,fill='white',stroke=LINE):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'

def save(article,slug,title,subtitle,body,height,alt,caption):
    folder=OUT/article/('en' if LANG=='en' else '')
    folder.mkdir(parents=True,exist_ok=True)
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title desc"><title id="title">{escape(tr(title))}</title><desc id="desc">{escape(tr(alt))}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="{MUTED}" stroke-width="1.6"/></marker></defs><style>text{{font-family:Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}}path{{stroke-linecap:round;stroke-linejoin:round}}</style><rect width="1200" height="{height}" fill="white"/>'
    svg+=text(48,60,title,32,bold=True)+text(48,108,subtitle,23,MUTED,width=1104)
    svg+=f'<path d="M48,160 H1152" stroke="{LINE}"/>'+body+'</svg>'
    file=folder/(slug+'.svg'); file.write_text(svg)
    MANIFEST.append(dict(article=article,slug=slug,locale=LANG,title=tr(title),alt=tr(alt),caption=tr(caption),path=str(file.relative_to(ROOT)),width=1200,height=height))

def pg_cells(x,y,labels,color=COLORS[1],fill=FILLS[1],cw=40,h=48,gap=4,pending=False):
    b=''
    for i,label in enumerate(labels):
        xx=x+i*(cw+gap)
        b+=f'<rect x="{xx}" y="{y}" width="{cw}" height="{h}" rx="5" fill="{fill if label is not None else "white"}" stroke="{color}" stroke-width="1.5"'+(' stroke-dasharray="4 4"' if pending else '')+'/>'
        if label is not None:
            b+=text(xx+cw/2,y+h/2+7,label,22,color,True,'middle')
    return b

def pg_block(x,y,name,labels,color=COLORS[1],fill=FILLS[1],cw=40,h=48):
    return text(x,y,name,23,color,True)+pg_cells(x,y+16,labels,color,fill,cw,h)

def pg_arrow(x1,y1,x2,y2,color=MUTED):
    dx,dy=x2-x1,y2-y1
    length=(dx*dx+dy*dy)**.5
    ux,uy=dx/length,dy/length
    bx,by=x2-10*ux,y2-10*uy
    return f'<path d="M{x1},{y1} L{bx},{by}" stroke="{color}" stroke-width="2.5" fill="none"/><path d="M{x2},{y2} L{bx-4.5*uy},{by+4.5*ux} L{bx+4.5*uy},{by-4.5*ux} Z" fill="{color}"/>'

def memory_block(x,y,name,owner,labels,cw=48,h=48):
    color=COLORS[0] if owner=='A' else COLORS[1] if owner=='B' else MUTED
    fill=FILLS[0] if owner=='A' else FILLS[1] if owner=='B' else '#F7F9FB'
    w=4*cw+3*4+24
    b=rect(x,y,w,112,fill,color if owner else LINE)
    b+=text(x+12,y+30,name+(' · '+owner if owner else tr((' · 가용',' · Free'))),22,color,True)
    b+=pg_cells(x+12,y+46,labels,color,fill,cw=cw,h=h)
    return b

def figure1():
    b=text(48,205,('KV 풀 4블록 · 블록당 4칸 · 공유 없음','KV pool: 4 blocks · 4 positions per block · No sharing'),23,MUTED)
    b+=text(48,265,('1. 마지막 블록에 한 칸씩 남아 있음','1. One position remains in each tail block'),27,bold=True)
    xs=[48,328,608,888]
    labels=[['0','1','2','3'],['4','5','6',None],['0','1','2','3'],['4','5','6',None]]
    for i,(x,ll) in enumerate(zip(xs,labels)):
        b+=memory_block(x,294,f'P{i}','A' if i<2 else 'B',ll,cw=56)
    b+=text(312,448,('A · KV 7칸','A · 7 KV positions'),24,COLORS[0],True,'middle')
    b+=text(872,448,('B · KV 7칸','B · 7 KV positions'),24,COLORS[1],True,'middle')
    b+=pg_arrow(600,470,600,525)
    b+=text(635,508,('각 요청의 다음 입력 처리','Process each request’s next input'),23,MUTED)
    b+=text(48,575,('2. 새 KV를 쓰면 기존 블록이 모두 참','2. The new KV fills both tail blocks'),27,bold=True)
    labels=[['0','1','2','3'],['4','5','6','7'],['0','1','2','3'],['4','5','6','7']]
    for i,(x,ll) in enumerate(zip(xs,labels)):
        b+=memory_block(x,604,f'P{i}','A' if i<2 else 'B',ll,cw=56)
    b+=text(312,758,('A · KV 8칸','A · 8 KV positions'),24,COLORS[0],True,'middle')
    b+=text(872,758,('B · KV 8칸','B · 8 KV positions'),24,COLORS[1],True,'middle')
    b+=text(48,828,('3. 그다음 입력에는 새 블록이 필요','3. The next input needs a new block'),27,bold=True)
    b+=rect(48,858,222,98,FILLS[0],COLORS[0])+text(159,895,('A의 다음 입력','A’s next input'),23,COLORS[0],True,'middle')
    b+=text(159,931,('위치 8','Position 8'),24,COLORS[0],anchor='middle')
    b+=pg_arrow(284,907,335,907,COLORS[0])
    b+=f'<rect x="352" y="858" width="264" height="98" rx="10" fill="white" stroke="{COLORS[3]}" stroke-width="2" stroke-dasharray="7 5"/>'
    b+=pg_cells(364,883,[None]*4,COLORS[3],FILLS[3],cw=56,h=48,pending=True)
    b+=text(653,895,('빈 블록 0개','0 free blocks'),27,COLORS[3],True)
    b+=text(653,934,('새 블록을 배정할 수 없음','No block available to allocate'),24,COLORS[3])
    b+=text(48,1015,('숫자 = 요청 안의 KV 위치 · 기존 블록의 빈칸과 가용 블록은 다릅니다.','Numbers = KV positions within each request · An empty slot is not a free block.'),22,MUTED)
    save('inference-preemption','01-growing-pressure',
         ('생성 중 부족해지는 KV 공간','Running out of KV space during generation'),
         ('남은 칸까지 채운 뒤에는, 다음 입력을 처리할 새 블록이 필요합니다.','Once the remaining positions fill, the next input requires another block.'),b,1060,
         ('네 블록에 A와 B의 KV가 각각 7칸씩 들어 있다. 각 마지막 블록의 한 칸을 채워 8칸이 되면 모든 칸이 찬다. 다음 위치 8의 KV를 쓰려면 새 블록이 필요하지만 가용 블록은 없다.','A and B each hold seven KV positions in a four-block pool. Each fills its final empty slot, reaching eight positions. Processing position eight then requires a new block, but none is free.'),
         ('처음부터 가용 블록은 0개여도 이미 배정된 블록의 남은 칸에는 KV를 쓸 수 있습니다. 그 칸까지 차면 추가 블록이 필요합니다. 앞 글과 별도의 4블록 예시입니다.','Even with zero free blocks, requests can use empty slots in their allocated blocks. Once those slots fill, another block is needed. This is a separate four-block example.'))

def figure2():
    titles=[('1. B 실행만 보류','1. Skip B’s execution'),('2. B의 KV 반환','2. Release B’s KV'),('3. A가 계속 진행','3. A makes progress')]
    xs=[48,430,812]
    b=text(48,205,('같은 풀: A 2블록 + B 2블록 · B의 토큰 이력은 계속 보존','Same pool: A owns 2 blocks, B owns 2 · B’s token history is retained'),23,MUTED)
    pools=[ [('A',4),('A',4),('B',4),('B',4)], [('A',4),('A',4),(None,0),(None,0)], [('A',4),('A',4),('A',1),(None,0)] ]
    for j,x in enumerate(xs):
        b+=rect(x,246,340,615,'#FAFBFD')+text(x+20,285,titles[j],24,bold=True)
        b+=text(x+20,334,[('A · 공간 부족','A · blocked by space'),('A · 새 공간 확보','A · space available'),('A · 다음 입력 처리','A · next input processed')][j],22,COLORS[0],True)
        b+=text(x+20,369,[('B · 이번 실행 제외','B · skipped this step'),('B · 재개 대기','B · waiting to resume'),('B · 재개 대기','B · waiting to resume')][j],22,COLORS[1],True)
        for i,(owner,n) in enumerate(pools[j]):
            xx=x+15+(i%2)*160; yy=410+(i//2)*143
            base=(i%2)*4 if i<2 else ((i-2)*4 if owner=='B' else 8)
            ll=[str(base+k) if k<n else None for k in range(4)]
            b+=memory_block(xx,yy,f'P{i}',owner,ll,cw=29,h=42)
        b+=text(x+170,725,[('가용 블록 0개','0 free blocks'),('가용 블록 2개','2 free blocks'),('가용 블록 1개','1 free block')][j],25,COLORS[3] if j==0 else INK,True,'middle')
        b+=text(x+170,777,[('KV 점유는 그대로','KV occupancy unchanged'),('독점 블록 2개 반환','2 exclusive blocks released'),('빈 P2 배정 → KV 1칸 기록','Allocate P2 → write one KV')][j],21,MUTED,anchor='middle')
    b+=pg_arrow(396,488,419,488,COLORS[3])+pg_arrow(778,488,801,488,COLORS[0])
    b+=text(48,920,('실행에서 제외하기','Skipping execution'),25,bold=True)
    b+=text(418,920,'≠',32,COLORS[3],True,'middle')
    b+=text(473,920,('GPU 블록을 다른 요청에 돌려주기','Releasing GPU blocks for another request'),25,bold=True)
    b+=text(48,972,('여기서는 B를 선택해 중단하고, 나중에 KV를 재계산합니다.','This example preempts B and later rebuilds its KV by recomputation.'),23,MUTED)
    save('inference-preemption','02-reclaim-blocks',
         ('B의 KV를 회수해 A 진행시키기','Reclaim B’s KV so A can proceed'),
         ('실행을 쉬게 해도 KV는 남습니다. 블록을 반환해야 다른 요청이 쓸 수 있습니다.','Skipping execution leaves KV allocated. Blocks must be released for another request.'),b,1025,
         ('첫 장면에서 B를 실행에서 제외해도 A와 B의 블록 두 개씩이 그대로 남아 가용 블록은 없다. B의 독점 블록 두 개를 반환하면 두 블록이 빈다. A에 하나를 배정하고 다음 입력의 KV를 쓰면 A는 KV 9칸을 세 블록에 보유하고 한 블록이 남는다. B는 이력을 보존하고 재개를 기다린다.','Skipping B leaves two blocks each allocated to A and B. Releasing B’s two exclusive blocks frees two. A takes one and processes its next input, reaching nine KV positions in three blocks with one block still free. B retains its history and waits to resume.'),
         ('B를 중단 대상으로 고른 예시이며 최적 정책을 뜻하지 않습니다. 반환은 블록을 재배정 가능한 상태로 바꾸는 동작입니다. 실행 중인 GPU 커널을 강제로 끊는 장면이 아닙니다.','Choosing B is an example, not an optimal policy. Releasing a block makes it available for reassignment. This does not depict interrupting a running GPU kernel.'))

def token_row(x,y,labels,cw=27,ci=1,pending=False):
    return pg_cells(x,y,labels,COLORS[ci],FILLS[ci],cw=cw,h=42,gap=4,pending=pending).replace('font-size="22"', 'font-size="20"')

def figure3():
    b=text(48,205,('요청 B · 입력 7개 + 이미 전달한 출력 x0, x1','Request B · 7 prompt tokens + delivered outputs x0 and x1'),23,MUTED)
    xs=[48,430,812]; history=[f'p{i}' for i in range(7)]+['x0','x1']
    for j,x in enumerate(xs):
        b+=rect(x,242,340,772,'#FAFBFD')
        b+=text(x+18,281,[('1. 중단 직전','1. Before preemption'),('2. 중단·대기','2. Paused and waiting'),('3. 공간 확보 후 재개','3. Resume with space')][j],24,bold=True)
        b+=text(x+18,337,('보존한 토큰 이력','Retained token history'),22,MUTED,True)
        b+=token_row(x+29,361,history)
        if j<2:
            b+=text(x+18,507,('GPU KV','GPU KV'),23,MUTED,True)
            if j==0:
                b+=token_row(x+29,538,history[:8])
                b+=pg_cells(x+277,538,[None],MUTED,'white',cw=27,h=42,pending=True)
                b+=text(x+18,626,('기존 KV 8개','8 existing KV positions'),24,COLORS[1],True)
                b+=text(x+18,666,('x1은 선택됐지만 KV는 아직 없음','x1 is selected; its KV is not built'),21,MUTED,width=304)
            else:
                b+=rect(x+25,538,290,88,'white',LINE)
                b+=text(x+170,591,('GPU KV 없음','No GPU KV'),26,MUTED,True,'middle')
                b+=text(x+18,677,('2블록 반환 · 이력은 유지','2 blocks released; history kept'),22,COLORS[1],True,width=304)
        else:
            b+=pg_arrow(x+170,422,x+170,460,COLORS[1])
            b+=rect(x+32,480,276,66,FILLS[2],COLORS[2])
            b+=text(x+170,521,('모델 · 고정 입력 9개','Model · 9 known inputs'),23,COLORS[2],True,'middle')
            b+=pg_arrow(x+170,557,x+170,592,COLORS[2])
            b+=text(x+18,641,('GPU KV · 9개','GPU KV · 9 positions'),23,MUTED,True)
            b+=token_row(x+29,665,history[:8])
            b+=token_row(x+277,665,['x1'],ci=3)
            b+=text(x+18,751,('기존 8개 복구 + x1 새로 계산','Rebuild 8 + compute x1’s KV'),22,COLORS[1],True,width=304)
        b+=text(x+18,832,('사용자에게 전달한 출력','Outputs delivered to the user'),21,MUTED,True)
        b+=token_row(x+30,862,['x0','x1'],cw=47,ci=1)
        if j==2:
            b+=pg_arrow(x+152,883,x+202,883,COLORS[3])+token_row(x+222,862,['x2'],cw=60,ci=3)
            b+=text(x+18,953,('새 x2만 전달','Deliver only the new x2'),22,COLORS[3],True)
        elif j==1:
            b+=text(x+18,953,('대기 중에는 새 출력 없음','No new output while waiting'),22,MUTED)
        else:
            b+=text(x+18,953,('기존 출력은 이미 전달됨','Earlier outputs already delivered'),21,MUTED)
    b+=pg_arrow(396,488,419,488)+pg_arrow(778,488,801,488)
    b+=text(48,1068,('p0부터 p6까지는 입력 토큰 · 기존 x0, x1은 다시 선택하거나 전달하지 않습니다.','p0 through p6 are prompt tokens · Do not resample or resend x0 and x1.'),22,MUTED)
    save('inference-preemption','03-recompute-state',
         ('보존한 토큰으로 KV 재계산하기','Rebuild KV from retained tokens'),
         ('답변의 이력을 그대로 입력에 넣어, 생성에 필요한 계산 상태를 다시 만듭니다.','Use the unchanged history as input to rebuild the state needed for generation.'),b,1115,
         ('요청 B의 입력 p0부터 p6과 출력 x0, x1 이력은 중단 중에도 보존한다. 원래 KV는 x0까지 8개이며 x1의 KV는 없다. GPU KV를 반환한 뒤 공간을 확보하면 알려진 토큰 9개를 모델에 입력한다. 기존 KV 8개를 복구하고 x1의 KV를 처음 계산하며, 새 x2만 선택해 사용자에게 전달한다.','B retains prompt p0 through p6 and outputs x0 and x1 while paused. Its original eight KV positions cover through x0, not x1. After releasing KV and obtaining space again, nine known tokens enter the model. Eight KV positions are rebuilt, x1’s KV is computed for the first time, and only new x2 is selected and delivered.'),
         ('여기서는 재사용할 캐시 없이 전체 이력을 한 번에 처리하는 예시입니다. 복구한 8개 KV와 새로 계산한 x1의 KV를 구별했습니다. x2를 선택한 직후에는 x2 자신의 KV가 아직 없습니다.','This example processes the entire history together without a reusable cache. Eight rebuilt KV positions are distinguished from x1’s newly computed KV. Immediately after selecting x2, its own KV has not yet been computed.'))
def figure4():
    """Swap is an alternative route from the same paused B state."""
    b = ''
    c, f = COLORS[1], FILLS[1]
    gray, grayfill = '#8191A0', '#F6F8FA'
    centers = [265, 615, 965]
    starts = [175, 525, 875]
    b += text(265,218,('1. GPU → CPU 보관','1. GPU → CPU'),24,bold=True,anchor='middle')
    b += text(615,218,('2. GPU 블록 반환','2. Release GPU blocks'),24,bold=True,anchor='middle')
    b += text(965,218,('3. CPU → GPU 복원','3. CPU → GPU'),24,bold=True,anchor='middle')
    b += text(265,254,('계산한 KV 값을 복사','Copy the computed KV'),22,MUTED,anchor='middle')
    b += text(615,254,('복사가 끝난 뒤 반환','Release only after copying'),22,MUTED,anchor='middle')
    b += text(965,254,('재개할 공간을 확보한 뒤','After GPU space is available'),22,MUTED,anchor='middle')
    b += pg_arrow(420,212,452,212) + pg_arrow(770,212,802,212)
    b += rect(48,281,1104,224,grayfill)
    b += rect(48,551,1104,224,grayfill)
    b += text(75,381,'GPU',24,bold=True)
    b += text(75,651,'CPU',24,bold=True)
    for i,(x,cx) in enumerate(zip(starts,centers)):
        if i == 1:
            b += pg_cells(x,317,[None]*4,gray,'white',cw=42,h=48)
            b += pg_cells(x,393,[None]*4,gray,'white',cw=42,h=48)
            b += text(cx,480,('2블록 반환','2 blocks released'),22,MUTED,True,'middle')
        else:
            b += pg_cells(x,317,['p0','p1','p2','p3'],c,f,cw=42,h=48)
            b += pg_cells(x,393,['p4','p5','p6','x0'],c,f,cw=42,h=48)
            b += text(cx,480,('B: KV 8개 · 2블록','B: 8 KV slots · 2 blocks'),22,c,True,'middle')
        b += pg_cells(x,587,['p0','p1','p2','p3'],c,f,cw=42,h=48)
        b += pg_cells(x,663,['p4','p5','p6','x0'],c,f,cw=42,h=48)
        b += text(cx,750,('B의 KV 8개 보관','8 KV slots kept for B'),22,c,True,'middle')
    b += pg_arrow(388,417,388,609,c)
    b += pg_arrow(1088,609,1088,417,c)
    b += text(267,533,('KV 복사','Copy KV'),22,c,True,'middle')
    b += text(967,533,('KV 복원','Restore KV'),22,c,True,'middle')
    b += rect(48,808,1104,350)
    b += text(72,848,('토큰 이력도 그대로 유지','The token history is also retained'),25,bold=True)
    b += pg_cells(72,870,['p0','p1','p2','p3','p4','p5','p6','x0','x1'],c,f,cw=42,h=48)
    b += text(533,900,('x1은 이미 전달했지만, KV는 아직 없음','x1 was delivered; its KV is not computed yet'),22,MUTED,width=590)
    b += text(72,970,('복원 후 x1을 처리하면','Process x1 after restoring KV'),25,bold=True)
    b += pg_block(72,1010,('복원한 블록','Restored block'),['p0','p1','p2','p3'],c,f,cw=42)
    b += pg_block(314,1010,('복원한 블록','Restored block'),['p4','p5','p6','x0'],c,f,cw=42)
    b += pg_block(556,1010,('새로 배정한 블록','New block'),['x1',None,None,None],COLORS[3],FILLS[3],cw=42)
    b += text(404,1132,('GPU: KV 9개 · 3블록','GPU: 9 KV slots · 3 blocks'),23,c,True,'middle')
    b += pg_arrow(774,1050,957,1050,c)
    b += text(865,1022,('새 토큰 선택','Select next'),22,MUTED,anchor='middle')
    b += pg_cells(991,1026,['x2'],COLORS[3],FILLS[3],cw=54,h=48)
    b += text(1018,1110,('새 출력','New output'),23,COLORS[3],True,'middle')
    save('inference-preemption','04-swap-state',
         ('KV를 GPU 밖에 보관했다가 복원하기','Store KV outside the GPU, then restore it'),
         ('재계산과 같은 중단 전 상태에서 출발하는 다른 방법: 이미 계산한 KV 값을 옮깁니다.','An alternative to recomputation from the same state: transfer the KV values already computed.'),
         b,1188,
         ('Swap의 세 단계. B의 KV 8개를 GPU에서 CPU로 복사하고, 복사 완료 후 GPU 두 블록을 반환한다. 나중에 GPU 공간을 확보하면 두 블록에 KV를 복원한다. 토큰 이력 p0부터 p6, x0, x1은 유지한다. 복원 후 x1을 처리할 세 번째 블록을 배정해 KV 9개를 만들고 새 출력 x2를 전달한다.',
          'Three swap stages: copy B’s eight KV slots from GPU to CPU, release two GPU blocks only after the copy completes, and restore the KV into two blocks when GPU space becomes available. The history p0 through p6, x0, and x1 is retained. A third block is allocated to process x1, producing nine KV slots and the new output x2.'),
         ('재계산 대신 이미 계산한 KV를 별도 메모리에 보관할 수도 있습니다. GPU 블록은 전송이 끝난 뒤 반환하고, 재개할 때 KV를 복원합니다. 복원한 KV는 x0까지이므로 아직 KV가 없는 x1을 처리할 블록을 추가로 배정합니다. Swap에는 보관 공간과 왕복 전송이 필요하며, 엔진마다 지원 방식은 다릅니다.',
          'Instead of recomputing, KV can be stored in separate memory. GPU blocks are released after the transfer completes; KV is restored when the request resumes. The restored KV covers only through x0, so another block is allocated to process x1. Swapping requires storage space and transfers in both directions, and support varies by engine.'))


def figure5():
    """A single illustrative recompute timeline, aligned with output events."""
    b = ''
    ac, af, bc, bf = COLORS[0], FILLS[0], COLORS[1], FILLS[1]
    start, pause, available, emit, end = 220,405,780,990,1134
    grayfill = '#F6F8FA'
    b += text(72,216,('재계산 방식의 실행 예시','Example using recomputation'),24,bold=True)
    b += pg_arrow(start,262,end,262)
    b += text(1132,241,('시간','Time'),22,MUTED,anchor='end')
    b += text(pause,311,('B 중단','B pauses'),23,bold=True,anchor='middle')
    b += text(available,311,('A 완료','A completes'),23,bold=True,anchor='middle')
    # These event lines connect execution, block ownership changes, and output.
    for x in [pause,available]:
        b += f'<path d="M{x},324 V908" stroke="{LINE}" stroke-width="2" stroke-dasharray="5 6" fill="none"/>'
    b += text(72,390,('요청 A','Request A'),24,ac,True)
    b += text(72,560,('요청 B','Request B'),24,bc,True)
    b += rect(start,346,pause-start,72,af,ac)
    b += rect(pause+6,346,available-pause-6,72,af,ac)
    b += text((start+pause)/2,390,('생성','Generate'),24,ac,True,'middle')
    b += text((pause+available)/2,390,('생성 계속','Keep generating'),24,ac,True,'middle')
    b += text((start+pause)/2,457,('KV 7 → 8\n2블록','KV 7 → 8\n2 blocks'),21,MUTED,anchor='middle')
    b += text((pause+available)/2,457,('KV 9 → 12 · 3블록','KV 9 → 12 · 3 blocks'),22,ac,True,'middle')
    b += text(966,390,('완료 · 블록 반환','Done · blocks released'),23,MUTED,anchor='middle')
    b += rect(start,516,pause-start,72,bf,bc)
    b += rect(pause+6,516,available-pause-12,72,grayfill)
    b += f'<rect x="{available}" y="516" width="{emit-available-6}" height="72" rx="10" fill="{bf}" stroke="{bc}" stroke-width="1.5" stroke-dasharray="5 4"/>'
    b += rect(emit,516,end-emit,72,bf,bc)
    b += text((start+pause)/2,560,('생성','Generate'),24,bc,True,'middle')
    b += text((pause+available)/2,560,('대기','Wait'),24,MUTED,True,'middle')
    b += text((available+emit)/2,560,('KV 재계산','Recompute KV'),23,bc,True,'middle')
    b += text((emit+end)/2,560,('생성','Generate'),24,bc,True,'middle')
    b += text((start+pause)/2,629,('KV 7 → 8\n2블록','KV 7 → 8\n2 blocks'),21,MUTED,anchor='middle')
    b += text((pause+available)/2,629,('GPU KV 없음','No GPU KV'),22,MUTED,anchor='middle')
    b += text((available+emit)/2,629,('완료 시 KV 9개\n3블록','On completion: 9 KV\n3 blocks'),21,bc,True,'middle')
    b += text(72,722,('블록 변화','Block changes'),23,bold=True)
    b += rect(309,677,192,111)
    b += text(pause,715,('B: 2블록 반환','B: release 2'),22,bc,True,'middle')
    b += text(pause,752,('A: 1블록 추가','A: add 1'),22,ac,True,'middle')
    b += rect(654,677,252,111)
    b += text(available,715,('A: 3블록 반환','A: release 3'),22,ac,True,'middle')
    b += text(available,752,('B: 3블록 배정','B: allocate 3'),22,bc,True,'middle')
    b += text(72,872,('B의 출력','B’s output'),24,bc,True)
    b += pg_arrow(start,876,end,876,bc)
    for x,label in [(274,'x0'),(370,'x1'),(990,'x2'),(1085,'x3')]:
        oc, of = (COLORS[3], FILLS[3]) if label in ['x2','x3'] else (bc,bf)
        b += pg_cells(x-26,852,[label],oc,of,cw=52,h=48)
    # A bracket marks the gap between the previously delivered x1 and new x2.
    b += f'<path d="M397,925 V936 H963 V925" stroke="{bc}" stroke-width="2.5" fill="none"/>'
    b += text(680,978,('대기 + KV 재계산 동안 새 출력 없음','No new output while waiting and recomputing KV'),24,bc,True,'middle')
    save('inference-preemption','05-output-gap',
         ('중단과 복구가 늘리는 출력 간격','Pausing and recovery extend the output gap'),
         ('B의 KV를 반환하면 A가 진행할 수 있지만, B의 다음 출력은 대기와 복구를 거친 뒤에 나옵니다.','Releasing B’s KV lets A proceed, but B must wait and recover before delivering its next output.'),
         b,1024,
         ('같은 시간축에서 요청 A와 B, 블록 변화, B의 출력 이벤트를 비교한다. B가 x0와 x1을 전달한 뒤 중단해 두 블록을 반환하면 A는 한 블록을 추가하고 KV 9개에서 12개까지 진행한다. A가 완료해 세 블록을 반환하면 B가 세 블록을 배정받아 알려진 9개 토큰으로 KV를 재계산한다. 대기와 재계산 중에는 새 출력이 없으며, 이후 x2와 x3가 전달된다.',
          'A and B, block changes, and B’s output events share one timeline. After delivering x0 and x1, B pauses and releases two blocks. A adds one block and grows from nine to twelve KV slots. When A completes and releases three blocks, B allocates three blocks and recomputes KV from nine known tokens. No new output is delivered while B waits or recomputes; x2 and x3 follow afterward.'),
         ('이 예시는 A의 완료로 공간이 확보된 뒤 B가 재계산하는 경로입니다. B는 알려진 토큰 9개로 KV를 복구하고 새 출력 x2부터 생성을 이어 갑니다. 이미 전달한 x0·x1을 다시 보내지 않으며, 대기와 복구만큼 출력 간격이 길어집니다. 시간선은 처리 순서를 보여 주는 예시이며 실측 시간 비율이 아닙니다.',
          'In this example, B recomputes after A completes and frees space. B rebuilds KV from nine known tokens, then continues with the new output x2 without sending x0 or x1 again. Waiting and recovery lengthen the output gap. The timeline illustrates the execution order, not measured time ratios.'))

for LANG in ['ko','en']:
    figure1(); figure2(); figure3(); figure4(); figure5()
(ROOT/'scripts/preemption-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
