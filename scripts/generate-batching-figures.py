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
def arrow(x1,y1,x2,y2,color=MUTED):
    return f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{color}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>'
def save(article,slug,title,subtitle,body,height,alt,caption):
    folder=OUT/article/('en' if LANG=='en' else '')
    folder.mkdir(parents=True,exist_ok=True)
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title desc"><title id="title">{escape(tr(title))}</title><desc id="desc">{escape(tr(alt))}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="{MUTED}" stroke-width="1.6"/></marker></defs><style>text{{font-family:Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}}path{{stroke-linecap:round;stroke-linejoin:round}}</style><rect width="1200" height="{height}" fill="white"/>'
    svg+=text(48,60,title,32,bold=True)+text(48,108,subtitle,23,MUTED,width=1104)
    svg+=f'<path d="M48,160 H1152" stroke="{LINE}"/>'+body+'</svg>'
    file=folder/(slug+'.svg'); file.write_text(svg)
    MANIFEST.append(dict(article=article,slug=slug,locale=LANG,title=tr(title),alt=tr(alt),caption=tr(caption),path=str(file.relative_to(ROOT)),width=1200,height=height))
for LANG in ['ko','en']:
    # Batching figures: execution cards and the scheduler's changing state.
    a = 'batching-and-scheduling'

    def batch_arrow(x1, y1, x2, y2, color=MUTED):
        return f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{color}" stroke-width="2.5" fill="none" marker-end="url(#batch-arrow)"/>'

    def batch_chip(x, y, w, label, ci, h=52, size=24):
        return rect(x, y, w, h, FILLS[ci], COLORS[ci]) + text(x+w/2, y+h/2+size*.34, label, size, COLORS[ci], True, 'middle')

    batch_defs = f'<defs><marker id="batch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M2,1 L8,5 L2,9" fill="none" stroke="{MUTED}" stroke-width="1.7"/></marker></defs>'

    b = batch_defs
    b += text(48, 205, ('P = Prefill · D = Decode · ✓ = 완료', 'P = Prefill · D = Decode · ✓ = complete'), 23, MUTED)
    b += text(1152, 205, ('동시에 최대 2개 요청', 'At most 2 requests per execution'), 23, MUTED, anchor='end')

    xs = [148 + j*204 for j in range(5)]
    def execution_card(x, y, number, work, highlight=False):
        q = rect(x, y, 188, 188, '#FAFBFD', COLORS[2] if highlight else LINE)
        q += text(x+94, y+33, (f'실행 {number}', f'Execution {number}'), 23, INK, True, 'middle')
        for i, item in enumerate(work):
            yy = y+48+i*66
            if item is None:
                q += f'<rect x="{x+13}" y="{yy}" width="162" height="52" rx="8" fill="#F5F7FA" stroke="{LINE}" stroke-width="1.5" stroke-dasharray="5 5"/>'
                q += text(x+94, yy+34, ('빈자리', 'Idle slot'), 23, MUTED, anchor='middle')
            else:
                name, phase, complete = item
                q += batch_chip(x+13, yy, 162, f'{name} · {phase}' + (' ✓' if complete else ''), 'ABCD'.index(name), size=24)
        return q

    b += text(48, 262, ('정적 배칭', 'Static batching'), 28, bold=True)
    b += text(1152, 262, ('묶음 전체가 끝난 뒤 새 요청 합류', 'Admit new requests after the whole batch finishes'), 23, MUTED, anchor='end')
    static = [
        [('A', 'D', True), ('B', 'D', False)],
        [('B', 'D', False), None],
        [('B', 'D', True), None],
        [('C', 'P', False), None],
        [('C', 'D', True), None],
    ]
    for j, work in enumerate(static):
        b += execution_card(xs[j], 286, j+1, work)
        if j < 4:
            b += batch_arrow(xs[j]+190, 380, xs[j+1]-4, 380)

    b += text(48, 512, ('대기 큐', 'Queue'), 23, bold=True)
    b += batch_chip(xs[1], 484, 392, ('C 대기', 'C waiting'), 2, h=49, size=24)
    b += text(xs[0]+94, 562, ('실행 1 뒤 C 도착', 'C arrives after 1'), 22, COLORS[2], anchor='middle')
    b += text(xs[2]+94, 562, ('B 완료', 'B completes'), 22, COLORS[1], anchor='middle')
    b += text(xs[3]+94, 562, ('C 합류', 'C admitted'), 22, COLORS[2], anchor='middle')

    b += f'<path d="M48,601 H1152" stroke="{LINE}"/>'
    b += text(48, 653, ('연속 배칭', 'Continuous batching'), 28, bold=True)
    b += text(1152, 653, ('매 실행 사이에 배치 갱신', 'Update the batch between executions'), 23, MUTED, anchor='end')
    continuous = [
        [('A', 'D', True), ('B', 'D', False)],
        [('B', 'D', False), ('C', 'P', False)],
        [('B', 'D', True), ('C', 'D', True)],
    ]
    for j, work in enumerate(continuous):
        b += execution_card(xs[j], 677, j+1, work, highlight=j==1)
        if j < 2:
            b += batch_arrow(xs[j]+190, 771, xs[j+1]-4, 771)
    b += text(xs[3]+190, 762, ('세 요청 모두 완료', 'All three requests complete'), 25, bold=True, anchor='middle')
    b += text(xs[3]+190, 808, ('C도 먼저 Prefill 수행', 'C also starts with Prefill'), 23, COLORS[2], anchor='middle')
    b += text(xs[0]+94, 906, ('실행 1 뒤 C 도착', 'C arrives after 1'), 22, COLORS[2], anchor='middle')
    b += text(xs[1]+94, 906, ('[A, B] → [B, C]', '[A, B] → [B, C]'), 24, COLORS[2], True, 'middle')
    b += text(48, 968, ('가로 방향은 실행 순서입니다. A·B는 이미 Decode 중이며, C는 새 요청입니다.', 'Columns show execution order. A and B are already decoding; C is new.'), 23, MUTED)
    save(a, '01-batch-composition',
         ('정적 배칭과 연속 배칭', 'Static and continuous batching'),
         ('같은 요청이라도, 다음 실행에 넣는 요청을 바꾸면 빈자리를 활용할 수 있습니다.', 'Changing which requests enter the next execution lets new work fill vacant slots.'),
         b, 1010,
         ('각 카드는 한 번의 실행에 선택한 배치다. A·B는 Decode 중이고 실행 1에서 A가 완료된 뒤 C가 도착한다. 정적 배칭은 실행 3에서 B가 끝난 뒤 실행 4에 C의 Prefill을 넣는다. 연속 배칭은 실행 2의 배치를 B의 Decode와 C의 Prefill로 구성하고 실행 3에서 B·C가 완료된다.', 'Each card is the batch selected for one execution. A and B are decoding. A completes at execution 1, then C arrives. Static batching waits for B to finish at execution 3 and prefills C at execution 4. Continuous batching selects B Decode and C Prefill for execution 2; B and C complete at execution 3.'),
         ('교육용 예시는 동시에 최대 두 요청을 실행한다. 연속 배칭은 자원이 허용할 때 다음 실행의 요청 구성을 바꾼다. 카드의 간격은 실행 순서이며 처리 시간의 비율이 아니다.', 'This teaching example runs at most two requests together. Continuous batching changes the next execution’s membership when resources permit. Card spacing denotes execution order, not proportional duration.'))

    b = batch_defs
    cols = [48, 424, 800]
    headings = [('1. 실행 결과', '1. Execution results'), ('2. 상태 갱신과 자원 확인', '2. Update and check'), ('3. 다음 배치 실행', '3. Execute next batch')]
    for x, heading in zip(cols, headings):
        b += text(x, 220, heading, 25, bold=True)
        b += rect(x, 249, 352, 552, '#FAFBFD')

    # Snapshot 1: admitted requests own GPU state; fresh queued requests do not.
    b += text(72, 294, ('진행 중인 요청', 'Admitted requests'), 23, bold=True)
    b += batch_chip(72, 314, 304, ('A · 완료 ✓', 'A · complete ✓'), 0)
    b += batch_chip(72, 380, 304, ('B · 계속 생성', 'B · continue'), 1)
    b += text(72, 481, ('GPU에 보관 중인 KV', 'KV stored on the GPU'), 23, bold=True)
    b += batch_chip(72, 502, 144, 'A KV', 0)
    b += batch_chip(232, 502, 144, 'B KV', 1)
    b += f'<path d="M72,590 H376" stroke="{LINE}"/>'
    b += text(72, 630, ('대기 큐 · 도착 순서', 'Queue · arrival order'), 23, bold=True)
    b += batch_chip(72, 651, 144, 'C', 2)
    b += batch_chip(232, 651, 144, 'D', 3)
    b += text(224, 749, ('C·D는 GPU KV 없음', 'C and D have no GPU KV'), 22, MUTED, anchor='middle')

    # Snapshot 2: release the completed request's exclusively owned KV.
    b += text(448, 294, ('A 제거, B 유지', 'Remove A; retain B'), 23, bold=True)
    b += batch_chip(448, 314, 304, ('B · 계속 생성', 'B · continue'), 1)
    b += text(448, 413, ('A의 KV 공간 반환', 'Release A’s KV allocation'), 23, COLORS[0], True)
    b += f'<rect x="448" y="437" width="144" height="52" rx="8" fill="white" stroke="{COLORS[0]}" stroke-width="1.5" stroke-dasharray="5 5"/>'
    b += text(520, 471, ('반환됨', 'Freed'), 23, MUTED, anchor='middle')
    b += batch_chip(608, 437, 144, 'B KV', 1)
    b += rect(448, 537, 304, 218, FILLS[2], COLORS[2])
    b += text(600, 577, ('C부터 합류 검토', 'Check C first'), 25, COLORS[2], True, 'middle')
    b += text(472, 632, ('✓ 실행 토큰 예산', '✓ Step token budget'), 23, COLORS[1], True)
    b += text(472, 674, ('✓ 필요한 KV 공간', '✓ Required KV space'), 23, COLORS[1], True)
    b += text(600, 723, ('이 예시에서는 충분', 'Both fit in this example'), 22, MUTED, anchor='middle')

    # Snapshot 3: selected work is not the queue or the entire stored state.
    b += text(824, 294, ('이번에 선택한 작업', 'Work selected now'), 23, bold=True)
    b += batch_chip(824, 314, 304, 'B · Decode', 1)
    b += batch_chip(824, 380, 304, 'C · Prefill', 2)
    b += batch_arrow(976, 443, 976, 474)
    b += rect(824, 489, 304, 91, '#E8EDF4', MUTED)
    b += text(976, 544, ('GPU 실행', 'GPU execution'), 27, bold=True, anchor='middle')
    b += f'<path d="M824,617 H1128" stroke="{LINE}"/>'
    b += text(824, 657, ('대기 큐', 'Waiting queue'), 23, bold=True)
    b += batch_chip(824, 679, 304, ('D · 다음 기회 대기', 'D · still waiting'), 3, size=23)
    b += text(976, 774, ('동시에 최대 2개 요청', 'At most 2 requests at once'), 22, MUTED, anchor='middle')
    b += batch_arrow(403, 340, 419, 340)
    b += batch_arrow(779, 340, 795, 340)
    b += f'<path d="M1132,535 H1175 V872 H24 V340 H43" stroke="{MUTED}" stroke-width="2.5" fill="none" marker-end="url(#batch-arrow)"/>'
    b += text(600, 847, ('실행 결과를 반영하고, 다음 배치를 다시 구성', 'Use the execution results to build the next batch again'), 24, bold=True, anchor='middle')
    b += text(48, 932, ('완료된 요청이 없어도, 자원이 충분하면 새 요청을 추가할 수 있습니다.', 'A new request can join without a completion if sufficient resources are available.'), 23, MUTED)
    save(a, '02-scheduling-cycle',
         ('실행 사이에 다음 배치를 다시 구성하기', 'Rebuild the batch between executions'),
         ('대기 큐, 진행 중인 요청의 상태, 실제로 실행할 배치는 서로 구별합니다.', 'Distinguish the queue, admitted request state, and the next batch.'),
         b, 982,
         ('실행 결과 A가 완료되고 B는 계속 생성한다. A가 독점 소유한 GPU KV를 반환하고 B의 KV는 유지한다. GPU KV가 없는 새 요청 C·D를 도착 순서대로 검토해 자원이 충분한 C를 합류시킨다. 최대 두 요청을 실행하는 예시에서 다음 배치는 B의 Decode와 C의 Prefill이며 D는 기다린다. 실행 결과를 다시 반영하는 화살표가 반복을 나타낸다.', 'A completes and B continues. A’s exclusively owned GPU KV is released while B’s KV is retained. New requests C and D have no GPU KV and are considered in arrival order. C fits the available resources. With at most two requests per execution, the next batch is B Decode and C Prefill while D waits. The returning arrow feeds execution results into the next decision.'),
         ('이 예시는 도착 순서대로 후보를 검토하는 FCFS를 사용한다. 완료된 요청의 상태를 정리하고 진행 중인 요청과 새 요청에 필요한 자원을 확인한 뒤 다음 실행을 구성한다. C의 합류는 자원이 충분한 경우이며, 완료 자체가 합류의 필수 조건은 아니다.', 'This example considers candidates in arrival order (FCFS). After cleaning up completed request state, the engine checks resources for ongoing and new requests before selecting the next execution. C joins because resources are available; a completion is not a prerequisite for admission.'))

    a='batching-and-scheduling'

    def bs_cells(x,y,n,color,fill,step=42,h=48,start=0,dashed=False):
        result=''
        for i in range(n):
            xx=x+(start+i)*step
            result+=f'<rect x="{xx}" y="{y}" width="{step-4}" height="{h}" rx="5" fill="{fill}" stroke="{color}" stroke-width="1.6"'+(' stroke-dasharray="5 4"' if dashed else '')+'/>'
        return result

    def bs_span(x,y,w,label,color=MUTED):
        return f'<path d="M{x},{y} v9 h{w} v-9" stroke="{color}" stroke-width="1.5" fill="none"/>'+text(x+w/2,y+42,label,23,color,anchor='middle')

    # B and C are identical in both figures: one ongoing Decode and one new Prefill.
    b=text(48,219,('다음 실행의 후보','Candidates for the next execution'),27,bold=True)
    b+=rect(48,246,520,160,FILLS[1],COLORS[1])+rect(600,246,552,160,FILLS[2],COLORS[2])
    b+=text(72,283,'B · Decode',28,COLORS[1],True)
    b+=text(72,326,('기존 KV 6개','6 KV positions retained'),24,COLORS[1])
    b+=text(72,373,('새 입력 1개 → KV 7개','1 new input → 7 KV positions'),24,COLORS[1],True)
    b+=text(624,283,'C · Prefill',28,COLORS[2],True)
    b+=text(624,326,('아직 KV 없음','No KV yet'),24,COLORS[2])
    b+=text(624,373,('입력 6개 → KV 6개','6 inputs → 6 KV positions'),24,COLORS[2],True)

    b+=text(48,471,('이번에 계산할 토큰','Tokens to compute now'),27,bold=True)
    x=96
    b+=text(x+19,510,'B',22,COLORS[1],True,anchor='middle')
    b+=text(x+42+124,510,'C',22,COLORS[2],True,anchor='middle')
    b+=bs_cells(x,529,1,COLORS[1],FILLS[1])
    b+=bs_cells(x,529,6,COLORS[2],FILLS[2],start=1)
    b+=bs_cells(x,529,1,LINE,'white',start=7)
    b+=bs_span(x,590,8*42-4,('실행 토큰 예산 8개','Step token budget: 8'))
    b+=text(650,564,'1 + 6 = 7',34,bold=True)
    b+=text(650,609,('예산 8개 안에 들어갑니다','Fits the budget of 8'),23,MUTED)

    b+=f'<path d="M48,679 H1152" stroke="{LINE}"/>'
    b+=text(48,731,('이 실행 뒤 보관할 실제 KV','Actual KV to retain after this execution'),27,bold=True)
    b+=text(96+145,776,'B · 7',23,COLORS[1],True,anchor='middle')
    b+=text(96+7*42+124,776,'C · 6',23,COLORS[2],True,anchor='middle')
    b+=bs_cells(96,798,6,COLORS[1],FILLS[1])
    b+=bs_cells(96,798,1,COLORS[1],FILLS[1],start=6,dashed=True)
    b+=bs_cells(96,798,6,COLORS[2],FILLS[2],start=7,dashed=True)
    b+=bs_cells(96,798,11,LINE,'white',start=13)
    b+=bs_span(96,858,24*42-4,('KV 저장 용량: 24개 위치 분량','KV capacity: 24 token positions'))
    b+=text(48,951,'7 + 6 = 13',34,bold=True)
    b+=text(364,951,('용량 24개 안에 들어갑니다','Fits within capacity 24'),24,MUTED)
    b+=bs_cells(48,987,1,COLORS[1],FILLS[1],step=30,h=28)
    b+=text(89,1010,('기존 KV','Existing KV'),22,MUTED)
    b+=bs_cells(319,987,1,COLORS[1],FILLS[1],step=30,h=28,dashed=True)
    b+=text(360,1010,('이번 실행에서 추가할 KV','KV to add in this execution'),22,MUTED)
    b+=text(48,1090,('이 공간을 실제로 배정할 수 있는지도 확인해야 합니다.','Can the engine actually allocate this space?'),26,bold=True,width=1104)
    save(a,'03-work-and-state',('이번 계산과 누적 KV를 따로 셉니다','Count new work and retained KV separately'),
        ('새 토큰 계산은 기존 KV를 없애지 않습니다.','Computing new tokens does not remove the KV already retained.'),b,1150,
        ('B는 KV 6개를 보유하고 새 입력 1개를 처리해 7개로 늘립니다. C는 입력 6개를 처리해 KV 6개를 만듭니다. 이번 계산 7토큰은 예산 8개 이내이고, 실행 뒤 실제 KV 13개는 저장 용량 24개 이내입니다. 실선은 기존 KV, 점선은 이번 실행에서 추가할 KV입니다.',
         'B retains 6 KV positions and processes 1 new input to reach 7. C processes 6 prompt inputs to create 6 KV positions. The 7 input tokens fit a step budget of 8, and the 13 resulting KV positions fit capacity 24. Solid outlines denote existing KV; dashed outlines denote KV to add.'),
        ('같은 B·C 후보라도 이번 계산량은 7토큰이고, 실행 뒤 유지할 KV는 13개 위치 분량입니다. 칸은 각 항목이 세는 단위이며 실제 실행 시간이나 GPU 전체 메모리 비율이 아닙니다. 필요한 실제 데이터량이 용량 안에 들어가도 요청에 배정할 공간은 별도로 확인해야 합니다.',
         'The same B and C require 7 tokens of new work but 13 retained KV positions. Cells count tokens or KV positions, not elapsed time or the share of total GPU memory. Fitting the actual data within capacity does not by itself guarantee that memory can be allocated.'))

    # A deliberately conservative contiguous reservation; no paged solution yet.
    b='<defs><pattern id="bs-reserved" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#EDF7F5"/><path d="M-2,2 L2,-2 M0,10 L10,0 M8,12 L12,8" stroke="#8DBCB8" stroke-width="1.5"/></pattern></defs>'
    b+=text(48,219,('B에 20개 위치를 미리 예약한 경우','If 20 KV positions are reserved for B'),27,COLORS[1],True)
    b+=text(48,261,('현재 실제 KV는 6개입니다.','B currently holds only 6 KV positions.'),24,MUTED)
    b+=text(96+124,316,('실제 KV 6','Actual KV: 6'),23,COLORS[1],True,anchor='middle')
    b+=text(96+6*42+292,316,('아직 쓰지 않은 예약 14','Reserved, unused: 14'),23,COLORS[1],True,anchor='middle')
    b+=text(96+20*42+82,316,('빈 공간 4','Free: 4'),23,MUTED,True,anchor='middle')
    b+=bs_cells(96,340,6,COLORS[1],FILLS[1],h=65)
    b+=bs_cells(96,340,14,COLORS[1],'url(#bs-reserved)',h=65,start=6)
    b+=bs_cells(96,340,4,LINE,'white',h=65,start=20)
    b+=bs_span(96,419,20*42-4,('B에 배정: 20','Allocated to B: 20'),COLORS[1])
    b+=bs_span(96+20*42,419,4*42-4,('배정 가능: 4','Available: 4'))
    b+=text(48,526,('빗금 영역은 비어 있어도 C에 배정할 수 없습니다.','The hatched space is unused, but unavailable to C.'),26,bold=True,width=1104)

    b+=f'<path d="M48,577 H1152" stroke="{LINE}"/>'
    b+=text(48,633,('새 요청 C가 필요한 공간','Space required by new request C'),26,COLORS[2],True)
    b+=text(671,633,('실제로 배정할 수 있는 공간','Space available for allocation'),26,bold=True)
    b+=bs_cells(48,664,6,COLORS[2],FILLS[2],step=52,h=56)
    b+=bs_cells(671,664,4,LINE,'white',step=52,h=56)
    b+=text(48,765,('입력 6개 → KV 공간 6개','6 prompt inputs → 6 KV positions'),23,COLORS[2])
    b+=text(671,765,('빈 공간 4개 < 필요한 6개','4 free < 6 required'),23,MUTED)
    b+=arrow(975,693,1044,693)
    b+=rect(1059,661,93,63,FILLS[2],COLORS[2])
    b+=text(1105,703,'C',29,COLORS[2],True,anchor='middle')
    b+=text(1105,772,('대기','Wait'),24,COLORS[2],True,anchor='middle')

    b+=f'<path d="M48,824 H1152" stroke="{LINE}"/>'
    b+=text(48,878,('필요한 실제 KV는 13개지만 C는 들어오지 못합니다.','Only 13 KV positions are needed, yet C cannot enter.'),26,bold=True,width=1104)
    b+=text(48,924,('다음 실행의 B 7개 + C 6개 / 전체 용량 24개','Next execution: B 7 + C 6 / total capacity 24'),23,MUTED,width=1104)
    b+=text(48,983,('KV 공간을 필요한 만큼 늘려 배정할 수 있다면?','What if KV storage could grow only as needed?'),28,COLORS[3],True,width=1104)
    save(a,'04-reserved-memory',('미사용 예약 공간이 새 요청을 막습니다','Unused reservations keep new requests waiting'),
        ('앞선 그림과 같은 B·C, 같은 KV 저장 용량 24개입니다.','The same B and C, with the same KV capacity of 24 positions.'),b,1050,
        ('KV 용량 24개 중 B가 20개를 예약했지만 현재 실제 KV는 6개뿐입니다. 나머지 14개는 B에 예약되어 다른 요청에 줄 수 없고, 배정 가능한 빈 공간은 4개입니다. C는 Prefill을 위해 6개가 필요해 대기합니다. B의 다음 KV 7개와 C의 KV 6개는 합계 13개이지만 현재 예약 방식이 C의 진입을 막습니다.',
         'B reserves 20 of 24 KV positions but currently uses only 6. The other 14 remain reserved for B, leaving just 4 positions available for allocation. C requires 6 for prefill and must wait. B would need 7 and C 6 after the next execution, only 13 total, but the reservation prevents C from entering.'),
        ('출력 길이를 미리 확정할 수 없어 큰 공간을 예약하는 방식의 예입니다. B의 다음 KV 한 위치는 자기 예약 공간을 쓰지만, C에는 새로 6개가 필요합니다. 여기서 풀은 가중치와 작업 공간을 제외한 KV 전용 공간이며, 칸은 블록이 아니라 토큰 한 위치의 KV 분량입니다.',
         'This example reserves a large region because the final output length is unknown. B’s next KV position uses its own reservation, while C needs 6 newly allocated positions. The pool is KV-only, excluding weights and workspace; cells count token positions, not paged blocks.'))

(ROOT/'scripts/batching-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
print(f'Generated {len(MANIFEST)} bilingual SVG figures.')
