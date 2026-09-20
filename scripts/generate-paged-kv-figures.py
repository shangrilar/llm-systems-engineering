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

for LANG in ['ko','en']:
    a='paged-kv-cache'
    # Figure 1: the same KV pool, allocated in a different unit.
    b = text(48, 207, ('B의 현재 KV 6칸', 'B currently holds 6 KV positions'), 24, COLORS[1], True)
    b += text(1152, 207, ('새 요청 C · 입력 6토큰', 'New request C · 6 input tokens'), 24, COLORS[2], True, 'end')
    b += text(48, 278, ('큰 공간을 미리 예약', 'Reserve a large region in advance'), 28, bold=True)
    b += text(1152, 278, ('C 대기', 'C waits'), 27, COLORS[2], True, 'end')
    b += text(68, 335, ('B 예약 20칸', '20 positions reserved for B'), 24, COLORS[1], True)
    b += text(1060, 335, ('가용 4칸', '4 free'), 24, MUTED, True, 'middle')
    b += rect(58, 354, 900, 90, FILLS[1], COLORS[1])
    b += rect(978, 354, 164, 90, '#F7F9FB', LINE)
    for group in range(5):
        labels = [str(j) if j < 6 else None for j in range(group*4, group*4+4)]
        b += pg_cells(66+184*group, 375, labels, cw=34, h=48, gap=4)
    b += pg_cells(986, 375, [None]*4, color=MUTED, fill='#F7F9FB', cw=34, h=48, gap=4)
    b += text(191, 485, ('실제 KV 6', '6 actual KV'), 23, COLORS[1], True, 'middle')
    b += text(638, 485, ('미사용 예약 14', '14 reserved, unused'), 23, MUTED, anchor='middle')
    b += text(1060, 485, ('4 < C의 입력 6', '4 < C’s 6 inputs'), 22, COLORS[2], anchor='middle')
    b += f'<path d="M48,531 H1152" stroke="{LINE}"/>'
    b += text(48, 587, ('필요한 블록만 배정', 'Allocate only the blocks needed'), 28, bold=True)
    b += text(1152, 587, ('C 합류 가능', 'C can join'), 27, COLORS[2], True, 'end')
    b += text(232, 644, ('B · 2블록 = 8칸', 'B · 2 blocks = 8 slots'), 24, COLORS[1], True, 'middle')
    b += text(600, 644, ('C · 2블록 = 8칸', 'C · 2 blocks = 8 slots'), 24, COLORS[2], True, 'middle')
    b += text(968, 644, ('가용 · 2블록 = 8칸', 'Free · 2 blocks = 8 slots'), 24, MUTED, True, 'middle')
    block_xs = [58 + 184*i for i in range(6)]
    for i, xx in enumerate(block_xs):
        ci = 1 if i < 2 else (2 if i < 4 else None)
        cc, ff = (COLORS[ci], FILLS[ci]) if ci is not None else (MUTED, '#F7F9FB')
        if i in (2, 3):
            b += f'<rect x="{xx}" y="666" width="164" height="90" rx="10" fill="{ff}" stroke="{cc}" stroke-width="1.5" stroke-dasharray="7 5"/>'
        else:
            b += rect(xx, 666, 164, 90, ff, cc if ci is not None else LINE)
        labels = [str(j) for j in range(4)] if i == 0 else (['4', '5', None, None] if i == 1 else [None]*4)
        b += pg_cells(xx+8, 687, labels, color=cc, fill=ff, cw=34, h=48, gap=4, pending=i in (2, 3))
    b += text(232, 799, ('B의 다음 KV 7칸도 수용', 'B can grow to 7 KV positions'), 22, COLORS[1], anchor='middle')
    b += text(600, 799, ('C 배정 · 아직 계산 전', 'Allocated to C · still empty'), 22, COLORS[2], anchor='middle')
    b += text(968, 799, ('남은 블록 2개', '2 blocks remain free'), 22, MUTED, anchor='middle')
    b += text(48, 868, ('1블록 = KV 4칸 · 채운 칸은 이미 계산된 KV · 빈칸은 아직 KV 없음', '1 block = 4 KV positions · Filled cells hold KV; empty cells do not.'), 23, MUTED)
    save(a, '01-needed-blocks',
         ('예약 공간을 필요한 블록으로 바꾸기', 'Replace a large reservation with needed blocks'),
         ('같은 24칸에서도, B가 미리 차지하는 공간을 줄이면 C를 받을 수 있습니다.', 'The same 24-position KV pool can admit C when B reserves less space in advance.'),
         b, 918,
         ('24칸 KV 풀에서 B의 실제 KV는 6칸이다. 20칸을 예약하면 미사용 예약이 14칸이고 가용 공간은 4칸이어서 입력 6토큰의 C가 기다린다. 블록당 4칸으로 B에 2블록, C에 2블록을 배정하면 2블록이 남는다. C의 블록은 배정만 되었고 아직 KV를 계산하지 않아 비어 있다.', 'B has 6 KV positions in a 24-position pool. Reserving 20 leaves 14 unused reserved positions and only 4 free, so C with 6 input tokens waits. With 4 positions per block, assigning 2 blocks to B and 2 to C leaves 2 free blocks. C’s assigned blocks are still empty because its inputs have not yet been processed.'),
         ('비교 대상은 GPU 전체 메모리가 아니라 같은 크기의 KV 풀입니다. B의 다음 입력으로 KV가 7칸이 되어도 기존 2블록에 들어갑니다. C에는 입력 6토큰을 처리할 공간 2블록을 배정했으며, 이 시점에는 실제 KV가 없습니다.', 'Both rows show the same KV pool, not all GPU memory. B’s next input increases its KV to 7 positions, still within its 2 blocks. C receives 2 blocks for its 6 inputs, but these blocks do not yet contain computed KV.'))

    # Figure 2: logical block order, block tables, and real KV storage.
    b = text(48, 212, ('논리 블록', 'Logical blocks'), 25, bold=True)
    b += text(497, 212, ('블록 테이블', 'Block table'), 25, bold=True, anchor='middle')
    b += text(970, 212, ('실제 KV 풀', 'Physical KV pool'), 25, bold=True, anchor='middle')
    physical = [
        ('P0', ['b4', 'b5', 'b6', None], 1),
        ('P1', ['c0', 'c1', 'c2', 'c3'], 2),
        ('P2', [None]*4, None),
        ('P3', ['b0', 'b1', 'b2', 'b3'], 1),
        ('P4', ['c4', 'c5', None, None], 2),
        ('P5', [None]*4, None),
    ]
    for i, (name, labels, ci) in enumerate(physical):
        yy = 239 + 120*i
        cc, ff = (COLORS[ci], FILLS[ci]) if ci is not None else (MUTED, '#F7F9FB')
        b += rect(792, yy, 360, 96, '#FAFBFD', LINE)
        b += text(808, yy+28, name, 23, cc, True)
        b += text(808, yy+77, ('미배정', 'Free') if ci is None else ('B' if ci == 1 else 'C'), 21, cc)
        b += pg_cells(924, yy+24, labels, color=cc, fill=ff, cw=48, h=48, gap=5)
    logical = [
        (292, ('B · L0', 'B · L0'), ['b0', 'b1', 'b2', 'b3'], 'L0 → P3', 1, 3),
        (412, ('B · L1', 'B · L1'), ['b4', 'b5', 'b6', None], 'L1 → P0', 1, 0),
        (652, ('C · L0', 'C · L0'), ['c0', 'c1', 'c2', 'c3'], 'L0 → P1', 2, 1),
        (772, ('C · L1', 'C · L1'), ['c4', 'c5', None, None], 'L1 → P4', 2, 4),
    ]
    for yy, label, labels, entry, ci, pi in logical:
        b += pg_block(64, yy-16, label, labels, color=COLORS[ci], fill=FILLS[ci], cw=48, h=48)
        b += pg_arrow(284, yy+24, 396, yy+24, COLORS[ci])
        b += rect(410, yy-6, 174, 60, FILLS[ci], COLORS[ci])
        b += text(497, yy+33, entry, 24, COLORS[ci], True, 'middle')
    # White casings keep crossings readable without changing their destinations.
    for yy, label, labels, entry, ci, pi in logical:
        sy, ty = yy+24, 287+120*pi
        path = f'M584,{sy} C654,{sy} 688,{ty} 770,{ty} H916'
        b += f'<path d="{path}" fill="none" stroke="white" stroke-width="9"/>'
        b += f'<path d="{path}" fill="none" stroke="{COLORS[ci]}" stroke-width="2.5"/>'
        b += pg_arrow(916, ty, 920, ty, COLORS[ci])
    b += text(64, 517, ('B: KV 7칸', 'B: 7 KV positions'), 23, COLORS[1], True)
    b += text(64, 877, ('C: KV 6칸', 'C: 6 KV positions'), 23, COLORS[2], True)
    b += text(48, 988, ('L = 요청 안의 순서 · P = 실제 저장 위치 · b/c 숫자 = 요청별 토큰 위치', 'L = order within a request · P = storage address · b/c numbers = token positions'), 22, MUTED)
    save(a, '02-logical-physical',
         ('토큰 순서와 저장 위치 연결하기', 'Connect token order to storage locations'),
         ('첫 실행 뒤: B의 KV 7칸과 C의 KV 6칸을 각각 2블록에 저장했습니다.', 'After the first execution: B’s 7 KV positions and C’s 6 occupy 2 blocks each.'),
         b, 1040,
         ('B의 논리 블록 L0는 토큰 위치 0에서 3의 KV를 담고 물리 블록 P3에 저장된다. L1은 위치 4에서 6의 KV를 담고 P0에 저장된다. C의 L0와 L1은 각각 P1과 P4에 저장된다. P2와 P5는 비어 있다. 각 논리 블록에서 블록 테이블을 거쳐 실제 KV 셀까지 연결선이 이어진다.', 'B’s logical block L0 contains KV for token positions 0 through 3 in physical block P3. Its L1 contains positions 4 through 6 in P0. C’s L0 and L1 map to P1 and P4. P2 and P5 are free. Connectors run from every logical block through its table entry to the actual KV cells.'),
         ('B의 토큰 순서는 L0 다음 L1이지만 실제 저장 위치는 P3 다음 P0입니다. 블록 테이블이 두 순서를 연결하므로 요청별 KV를 큰 연속 공간에 둘 필요가 없습니다. 왼쪽 논리 블록은 같은 데이터를 설명하는 관점이며, 별도의 KV 복사본이 아닙니다.', 'B’s logical order is L0 then L1, while their storage locations are P3 then P0. The table connects these orders, so each request does not need one large contiguous region. The logical view on the left describes the same data; it is not an additional KV copy.'))

    # Keep physical addresses fixed while B's last block fills and then grows.
    b=text(48,208,('칸의 숫자 = 요청 안의 KV 위치 · 블록당 4칸', 'Cell numbers = KV positions within each request · 4 slots per block'),24,MUTED)
    def growth_pool(y,count):
        q=''
        content=[list(range(4,min(count,8)))+[None]*max(8-count,0),[0,1,2,3],[None]*4,[0,1,2,3],[4,5,None,None],[8,None,None,None] if count==9 else [None]*4]
        owners=['B','C','', 'B','C','B' if count==9 else '']
        for i,(labels,owner) in enumerate(zip(content,owners)):
            x=68+i*184
            ci=1 if owner=='B' else 2
            color=COLORS[ci] if owner else MUTED
            fill=FILLS[ci] if owner else '#F5F7FA'
            q+=pg_block(x,y,f'P{i}'+(' · '+owner if owner else ''),labels,color,fill,cw=34)
        return q
    for count,y in [(7,245),(8,522),(9,799)]:
        b+=rect(48,y,1104,206,'#FAFBFD')
        b+=text(68,y+38,f'B · KV {count}',27,COLORS[1],True)
        b+=text(330,y+37,'L0 → P3  ·  L1 → P0'+('  ·  L2 → P5' if count==9 else ''),24,COLORS[1],True)
        b+=growth_pool(y+93,count)
        if count==8:
            b+=f'<rect x="{68+3*38-3}" y="{y+106}" width="40" height="54" rx="7" fill="none" stroke="{COLORS[3]}" stroke-width="3"/>'
        if count==9:
            b+=f'<rect x="{68+5*184-3}" y="{y+106}" width="40" height="54" rx="7" fill="none" stroke="{COLORS[3]}" stroke-width="3"/>'
    b+=pg_arrow(105,464,105,508,COLORS[3])+text(142,493,('입력 위치 7 처리 → P0의 마지막 빈칸에 KV 기록','Process input position 7 → write KV into P0’s last slot'),25,COLORS[3],True)
    b+=pg_arrow(105,741,105,785,COLORS[3])+text(142,770,('입력 위치 8 처리 → 새 블록 P5를 연결하고 KV 기록','Process input position 8 → attach P5 and write KV'),25,COLORS[3],True)
    b+=text(48,1060,('기존 P3·P0는 이동하지 않습니다. C의 P1·P4도 유지합니다.','P3 and P0 stay in place. C retains P1 and P4.'),26,bold=True)
    b+=text(48,1105,('주황색 테두리 = 이번 입력에서 새로 기록한 KV','Orange outline = KV written for the new input'),23,MUTED)
    save(a,'03-growing-blocks',('생성에 맞춰 블록 늘리기','Grow the allocation as generation proceeds'),
         ('B의 KV가 7 → 8 → 9개로 늘어나는 세 시점입니다. C의 KV는 6개로 고정합니다.','B grows from 7 to 8 to 9 KV positions. C stays at 6.'),b,1150,
         ('B의 KV 7개는 P3와 P0에 있습니다. 입력 위치 7을 처리하면 P0의 마지막 칸이 채워집니다. 다음 입력 위치 8을 처리할 때 새 P5를 배정하고 L2를 연결합니다. 기존 B와 C의 블록은 이동하지 않습니다.',
          'B’s 7 KV positions occupy P3 and P0. Processing input position 7 fills P0. Processing position 8 allocates P5 and adds L2 to the table. Existing B and C blocks do not move.'),
         ('숫자는 요청 안의 KV 위치 번호입니다. 새 토큰을 입력으로 처리할 때 KV가 기록되며, 빈칸이 있으면 그대로 쓰고 블록이 가득 차면 하나를 더 배정합니다. 마지막 블록 안의 미사용 칸은 남을 수 있습니다.',
          'Numbers identify KV positions within each request. KV is written when a token is processed as input. An existing empty slot is used first; another block is allocated when needed. The last block can still have unused slots.'))

    b=rect(48,203,1104,116,FILLS[1],COLORS[1])
    b+=text(72,242,('B의 블록 테이블', 'B’s block table'),25,COLORS[1],True)
    b+=text(72,286,'L0 → P3  ·  L1 → P0  ·  L2 → P5',27,COLORS[1],True)
    b+=text(48,368,('물리 블록 풀에서 B의 유효한 KV 9개를 참조','Read B’s 9 valid KV positions in the physical pool'),27,bold=True)
    b+=text(48,409,('색이 있는 칸 = 읽는 KV · 회색 = 읽지 않는 공간','Colored cells = KV being read · gray = not read'),23,MUTED)
    physical=[[4,5,6,7],[0,1,2,3],[None]*4,[0,1,2,3],[4,5,None,None],[8,None,None,None]]
    for i,labels in enumerate(physical):
        x=48+i*184
        owner='B' if i in [0,3,5] else ('C' if i in [1,4] else '')
        color=COLORS[1] if owner=='B' else '#8B969F'
        fill=FILLS[1] if owner=='B' else '#F0F2F4'
        b+=text(x,465,f'P{i}'+(' · '+owner if owner else ''),24,color,True)
        for j,label in enumerate(labels):
            active=owner=='B' and label is not None
            b+=pg_cells(x+j*38,489,[label],COLORS[1] if active else '#B7C0C8',FILLS[1] if active else '#F0F2F4',cw=34,h=52)
            if not active:
                b+=f'<path d="M{x+j*38+5},536 L{x+j*38+29},494" stroke="#A9B3BC" stroke-width="1.4"/>'
    # A shared connector represents the set of valid KV operands, not serial reads.
    for i,n in [(0,4),(3,4),(5,1)]:
        x=48+i*184;w=n*38-4;center=x+w/2
        b+=f'<path d="M{x},552 V566 H{x+w} V552 M{center},566 V650" fill="none" stroke="{COLORS[1]}" stroke-width="2.5"/>'
    b+=f'<path d="M122,650 H985" stroke="{COLORS[1]}" stroke-width="2.5" fill="none"/>'
    b+=pg_arrow(590,650,590,737,COLORS[1])
    b+=text(625,704,('KV 9개', '9 KV positions'),23,COLORS[1],True)
    b+=rect(48,753,248,124,FILLS[0],COLORS[0])
    b+=text(172,801,('현재 Q','Current Q'),28,COLORS[0],True,'middle')
    b+=text(172,846,('입력 위치 8','Input position 8'),23,COLORS[0],anchor='middle')
    b+=pg_arrow(306,815,407,815,COLORS[0])
    b+='<g data-panel="true">'+rect(420,753,340,124,'#F4F7FA')+text(590,805,'Attention',30,bold=True,anchor='middle')+text(590,848,('유효한 KV 전체로 계산','Over all valid KV'),23,MUTED,anchor='middle')+'</g>'
    b+=pg_arrow(773,815,905,815)
    b+=rect(918,753,234,124,'#F4F7FA')+text(1035,821,('하나의 결과','One result'),27,bold=True,anchor='middle')
    b+=text(48,949,('KV는 각자의 블록에 둔 채로 읽습니다.','KV stays in its own physical blocks while being read.'),27,bold=True)
    b+=text(48,994,('C의 KV와 P5의 미사용 3칸은 계산 대상에서 제외합니다.','C’s KV and the 3 unused slots in P5 are excluded.'),23,MUTED)
    save(a,'04-paged-attention-read',('흩어진 KV로 Attention 계산하기','Compute attention over scattered KV'),
         ('블록 테이블로 저장 위치를 찾고, 현재 Q와 같은 요청의 KV를 함께 사용합니다.','The block table locates storage; the current Q uses the KV of its own request.'),b,1040,
         ('B의 블록 테이블은 L0를 P3, L1을 P0, L2를 P5에 연결합니다. 현재 입력 위치 8의 Q는 P3의 4개, P0의 4개, P5의 1개 KV로 하나의 Attention 결과를 계산합니다. C의 KV, 빈 P2, P5의 미사용 칸은 제외합니다.',
          'B maps L0 to P3, L1 to P0 and L2 to P5. Q at input position 8 uses 4 KV positions in P3, 4 in P0 and 1 in P5 to compute one attention result. C’s KV, free P2 and unused P5 slots are excluded.'),
         ('연결선은 Attention에 참여하는 데이터의 관계를 나타냅니다. KV를 하나의 연속 버퍼로 복사하는 단계가 아닙니다. 위치 8의 Q는 현재 입력의 KV를 포함해 유효한 9개 위치를 참조합니다.',
          'Connectors show which operands participate in attention, not a copy into a contiguous buffer. Q at position 8 attends to all 9 valid positions, including the current input’s KV.'))

    # Same prompt, two output candidates: the tables stay separate.
    def pg_response_table(x, y, name, mappings, w=172):
        q = rect(x, y, w, 156, '#FAFBFD')
        q += text(x+w/2, y+33, name, 23, bold=True, anchor='middle')
        q += f'<path d="M{x+14},{y+49} H{x+w-14}" stroke="{LINE}"/>'
        for i, mapping in enumerate(mappings):
            q += text(x+w/2, y+83+i*49, mapping, 23, MUTED, anchor='middle')
        return q

    b = text(48, 210, ('응답마다 KV 복사', 'A copy for each response'), 27, bold=True)
    b += text(1152, 210, ('물리 블록 4개', '4 physical blocks'), 25, COLORS[3], True, 'end')
    b += rect(48, 237, 1104, 316, '#FAFBFD')
    for tx, bx, name, ids in [
        (76, 352, ('응답 1', 'Response 1'), ('P0', 'P1')),
        (652, 928, ('응답 2', 'Response 2'), ('P2', 'P3')),
    ]:
        b += text(tx, 273, ('블록 테이블', 'Block table'), 22, MUTED)
        b += pg_response_table(tx, 293, name, [f'L0 → {ids[0]}', f'L1 → {ids[1]}'])
        b += pg_block(bx, 330, ids[0], ['p0', 'p1', 'p2', 'p3'], cw=44, h=48)
        b += pg_block(bx, 436, ids[1], ['p4', 'p5', None, None], cw=44, h=48)
        b += pg_arrow(tx+180, 370, bx-12, 370)
        bend = tx+226
        b += f'<path d="M{tx+180},419 H{bend} V476" stroke="{MUTED}" stroke-width="2.5" fill="none"/>'
        b += pg_arrow(bend, 476, bx-12, 476)

    b += text(48, 611, ('공통 KV 블록 공유', 'Share the common KV blocks'), 27, bold=True)
    b += text(1152, 611, ('물리 블록 2개', '2 physical blocks'), 25, COLORS[1], True, 'end')
    b += rect(48, 638, 1104, 333, '#FAFBFD')
    b += text(76, 675, ('블록 테이블', 'Block table'), 22, MUTED)
    b += text(952, 675, ('블록 테이블', 'Block table'), 22, MUTED)
    b += pg_response_table(76, 695, ('응답 1', 'Response 1'), ['L0 → P0', 'L1 → P1'])
    b += pg_response_table(952, 695, ('응답 2', 'Response 2'), ['L0 → P0', 'L1 → P1'])
    b += pg_block(504, 732, 'P0', ['p0', 'p1', 'p2', 'p3'], cw=44, h=48)
    b += pg_block(504, 850, 'P1', ['p4', 'p5', None, None], cw=44, h=48)
    b += pg_arrow(256, 772, 492, 772)
    b += pg_arrow(944, 772, 704, 772)
    b += f'<path d="M256,821 H368 V890" stroke="{MUTED}" stroke-width="2.5" fill="none"/>'
    b += pg_arrow(368, 890, 492, 890)
    b += f'<path d="M944,821 H824 V890" stroke="{MUTED}" stroke-width="2.5" fill="none"/>'
    b += pg_arrow(824, 890, 704, 890)
    b += text(600, 949, ('테이블은 각각, 공통 KV는 한 벌', 'Separate tables, one shared copy of the KV'), 23, COLORS[1], True, 'middle')
    save(a, '05-shared-prefix',
         ('여러 응답이 공통 KV를 공유하기', 'Sharing common KV across responses'),
         ('같은 입력 6토큰에서 응답 2개를 만듭니다. 블록 하나에는 4위치의 KV가 들어갑니다.', 'Two responses start from the same 6-token prompt. Each block holds KV for 4 positions.'),
         b, 1010,
         ('위쪽은 두 응답이 같은 프롬프트 p0부터 p5까지의 KV를 각자 복사하여 물리 블록 네 개를 쓰는 장면이다. 아래쪽은 두 개의 별도 블록 테이블이 같은 P0와 P1을 가리켜 물리 블록 두 개만 쓰는 장면이다. P0에는 p0부터 p3, P1에는 p4와 p5가 있고 마지막 두 칸은 비어 있다.', 'The top duplicates the KV for prompt positions p0 through p5 for two responses, using four physical blocks. Below, two separate block tables both reference P0 and P1, using only two physical blocks. P0 holds p0 through p3; P1 holds p4 and p5 with two unused slots.'),
         ('공통 입력을 처리한 뒤, 각 응답의 다음 입력을 처리하기 전의 상태다. 같은 문맥에서 계산된 공통 prefix의 KV를 공유하며, 두 응답의 블록 테이블은 각각 유지한다. 칸의 p0부터 p5는 토큰 위치에 대응하는 KV를 뜻한다.', 'This is after processing the common prompt and before processing each response’s next input. The responses share KV for the common prefix computed in the same context, while keeping separate block tables. Cell labels p0 through p5 denote KV for those token positions.'))

    # Copy on write: the first writer copies only the shared, partly filled tail.
    def pg_tail(x, y, name, owner, new=None, ci=2):
        q = text(x, y, name, 22, MUTED, True)
        q += text(x+204, y+96, owner, 21, COLORS[1] if new is None else COLORS[ci], anchor='end')
        q += pg_cells(x, y+16, ['p4', 'p5'], cw=48, h=48)
        q += pg_cells(x+104, y+16, [new], color=COLORS[ci] if new is not None else COLORS[1], fill=FILLS[ci] if new is not None else FILLS[1], cw=48, h=48)
        q += pg_cells(x+156, y+16, [None], cw=48, h=48)
        return q

    b = ''
    cols = [48, 428, 808]
    stage_titles = [('1. 공통 입력 처리 후', '1. Prompt processed'), ('2. 응답 1: a0 처리', '2. Response 1: a0'), ('3. 응답 2: b0 처리', '3. Response 2: b0')]
    for i, x in enumerate(cols):
        b += rect(x, 198, 344, 777, '#FAFBFD')
        b += text(x+20, 239, stage_titles[i], 23, bold=True, width=304)
        bx = x+70
        b += text(bx, 337, 'P0', 22, MUTED, True)
        b += text(bx+204, 337, ('두 응답 공유', 'Shared by both'), 21, COLORS[1], anchor='end')
        b += pg_cells(bx, 353, ['p0', 'p1', 'p2', 'p3'], cw=48, h=48)
        b += text(x+172, 936, (f'물리 블록 {2 if i == 0 else 3}개', f'{2 if i == 0 else 3} physical blocks'), 24, COLORS[1], True, 'middle')
    b += pg_arrow(398, 450, 418, 450)
    b += pg_arrow(778, 450, 798, 450)

    b += pg_tail(118, 539, 'P1', ('두 응답 공유', 'Shared by both'))
    b += text(220, 689, ('다음 KV를 쓰기 전', 'Before writing the next KV'), 23, MUTED, anchor='middle')

    b += text(600, 285, ('공유 블록에 쓰기 → 복사', 'Shared block → copy'), 20, COLORS[2], anchor='middle', width=304)
    b += pg_tail(498, 539, 'P1', ('응답 2만', 'Response 2 only'))
    b += pg_tail(498, 777, 'P2', ('응답 1만', 'Response 1 only'), 'a0', 2)
    # A routed connector copies the existing p4/p5 KV to the newly allocated tail.
    b += f'<path d="M490,579 H464 V817" stroke="{COLORS[1]}" stroke-width="2.5" fill="none"/>'
    b += pg_arrow(464, 817, 490, 817, COLORS[1])
    b += text(600, 665, ('p4·p5 복사', 'Copy p4 and p5'), 23, COLORS[1], True, 'middle')
    b += rect(594, 693, 64, 45, FILLS[2], COLORS[2])
    b += text(626, 723, 'a0', 23, COLORS[2], True, 'middle')
    b += pg_arrow(626, 743, 626, 784, COLORS[2])

    b += text(980, 285, ('독점 블록에 바로 쓰기', 'Own block → write'), 20, COLORS[3], anchor='middle', width=304)
    b += pg_tail(878, 539, 'P1', ('응답 2만', 'Response 2 only'), 'b0', 3)
    b += rect(974, 448, 64, 45, FILLS[3], COLORS[3])
    b += text(1006, 478, 'b0', 23, COLORS[3], True, 'middle')
    b += pg_arrow(1006, 498, 1006, 546, COLORS[3])
    b += pg_tail(878, 777, 'P2', ('응답 1만', 'Response 1 only'), 'a0', 2)
    b += text(600, 1025, ('가득 찬 첫 블록은 계속 공유하고, 쓰기가 필요한 마지막 블록만 분리합니다.', 'The full first block stays shared; only the tail that needs a write is split.'), 23, MUTED, anchor='middle')
    save(a, '06-copy-on-write',
         ('쓰기가 필요할 때 공유 블록 분리하기', 'Splitting a shared block when a write is needed'),
         ('공유 중인 마지막 블록에 새 KV를 써야 할 때, 그 블록만 복사합니다.', 'When new KV must be written to a shared tail block, only that block is copied.'),
         b, 1080,
         ('첫 상태에서 두 응답은 p0부터 p3까지 든 P0와 p4, p5가 든 부분 블록 P1을 공유한다. 응답 1의 새 입력 a0를 처리하면서 공유 꼬리 블록에 KV를 써야 하므로 P2를 배정해 p4와 p5만 복사하고 a0의 KV를 추가한다. 응답 2는 이제 혼자 참조하는 원래 P1에 b0의 KV를 추가한다. P0는 계속 공유되고 총 세 물리 블록을 쓴다.', 'Initially, both responses share full block P0 with p0 through p3 and partial tail P1 with p4 and p5. Processing a0 for response 1 requires a write to the shared tail, so P2 is allocated, p4 and p5 are copied, and the KV for a0 is appended. Response 2 then appends the KV for b0 to the original P1, which it now references exclusively. P0 stays shared and only three physical blocks are used.'),
         ('응답 1이 먼저 쓰는 예시다. 복사의 조건은 출력 토큰 선택 자체가 아니라 공유 블록에 KV를 기록해야 하는 순간이다. 두 응답이 모두 복사하면 네 블록이 필요하지만, 이 예시에서는 첫 블록을 공유해 세 블록으로 충분하다. 마지막 미사용 칸은 남아 있다.', 'Response 1 writes first in this example. Copying is triggered by a required KV write to a shared block, rather than by selecting an output token. Fully separate copies would need four blocks; keeping the first block shared needs only three here. The final unused slots remain.'))


(ROOT/'scripts/paged-kv-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
print(f'Generated {len(MANIFEST)} bilingual SVG figures.')
