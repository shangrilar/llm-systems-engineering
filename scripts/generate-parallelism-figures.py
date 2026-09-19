"""Generate the article's original bilingual SVGs with Python's standard library.
PNG rendering uses a browser; SVGs are the editable source of truth.
"""
from pathlib import Path
from html import escape
import json
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images'
INK, MUTED, LINE = '#182C40', '#526577', '#DCE4EC'
COLORS = ['#2470BB', '#287D78', '#7954A3', '#B55B22']
FILLS = ['#EDF5FD', '#EDF7F5', '#F3EEF8', '#FFF2E6']
MANIFEST = []
STEPS = {'ko': {}, 'en': {}}
LANG = 'ko'
def tr(pair): return pair[LANG == 'en'] if isinstance(pair, tuple) else str(pair)
def units(s): return sum(1 if unicodedata.east_asian_width(c) in 'WF' else .57 for c in s)
def lines(s, width, size):
    out=[]
    for part in tr(s).split('\n'):
        line=''
        for word in part.split(' '):
            candidate = (line+' '+word).strip()
            if line and units(candidate)*size > width:
                out.append(line); line=word
            else: line=candidate
        out.append(line)
    return out

def text(x,y,s,size=24,color=INK,bold=False,anchor='start',width=None):
    ll=lines(s,width,size) if width else tr(s).split('\n')
    return ''.join(f'<text x="{x}" y="{y+i*size*1.4}" fill="{color}" font-size="{size}" font-weight="{700 if bold else 400}" text-anchor="{anchor}">{escape(line)}</text>' for i,line in enumerate(ll))
def rect(x,y,w,h,fill='white',stroke=LINE):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'
def arrow(x1,y1,x2,y2):
    return f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{MUTED}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>'
def box(x,y,w,h,title,body='',color=0):
    return rect(x,y,w,h,FILLS[color],COLORS[color])+text(x+18,y+36,title,25,COLORS[color],True,width=w-36)+text(x+18,y+86,body,23,width=w-36)
def banner(y,title,body=''):
    return rect(48,y,1104,100,'#F1F4F7')+text(72,y+36,title,25,bold=True)+text(72,y+76,body,23)
def save(a,slug,title,subtitle,body,height,alt):
    folder=OUT/a/('en' if LANG=='en' else '')
    folder.mkdir(parents=True,exist_ok=True)
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title desc"><title id="title">{escape(tr(title))}</title><desc id="desc">{escape(tr(alt))}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="{MUTED}" stroke-width="1.6"/></marker></defs><style>text{{font-family:Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}}path{{stroke-linecap:round;stroke-linejoin:round}}</style><rect width="1200" height="{height}" fill="white"/>'''
    svg+=text(48,60,title,32,bold=True)+text(48,108,subtitle,23,color=MUTED,width=1104)
    svg+='<path d="M48,160 H1152" stroke="'+LINE+'"/>'+body+'</svg>'
    file=folder/(slug+'.svg');file.write_text(svg)
    MANIFEST.append(dict(article=a,slug=slug,locale=LANG,title=tr(title),alt=tr(alt),path=str(file.relative_to(ROOT)),width=1200,height=height))

def table(y,headers,rows,widths=None,rowh=94):
    widths=widths or [1104/len(headers)]*len(headers)
    b='';x=48
    for w,h in zip(widths,headers):
        b+=rect(x,y,w-6,58,'#E8EDF4')+text(x+14,y+37,h,23,bold=True,width=w-30);x+=w
    for r,row in enumerate(rows):
        x=48
        for c,(w,val) in enumerate(zip(widths,row)):
            b+=rect(x,y+66+r*rowh,w-6,rowh-8,FILLS[(c-1)%4] if c else '#F7F9FB')
            b+=text(x+14,y+100+r*rowh,val,22,width=w-34);x+=w
    return b

# Validate a complete ring reduction, with each chunk's source contributions once.
vectors=[[10**r*(c+1) for c in range(4)] for r in range(4)]
active=[((r-1)%4,vectors[r][(r-1)%4]) for r in range(4)]
rs=[active.copy()]
for _ in range(3):
    active=[(active[(r-1)%4][0],active[(r-1)%4][1]+vectors[r][active[(r-1)%4][0]]) for r in range(4)]
    rs.append(active.copy())
assert active==[(r,1111*(r+1)) for r in range(4)]
# Retain the whole working vector so each update can be followed in place.
rs_vectors=[[v.copy() for v in vectors]]
for state in rs[1:]:
    current=[v.copy() for v in rs_vectors[-1]]
    for r,(c,value) in enumerate(state):current[r][c]=value
    rs_vectors.append(current)
assert all(rs_vectors[3][r][r]==sum(v[r] for v in vectors) for r in range(4))
assert rs_vectors[1][0]==[1,2,3003,4]
assert rs_vectors[2][0]==[1,2202,3003,4]
assert rs_vectors[3][0]==[1111,2202,3003,4]
gather=[{r} for r in range(4)]; ag=[gather]
for _ in range(3):
    gather=[gather[r]|gather[(r-1)%4] for r in range(4)];ag.append(gather)
assert all(s==set(range(4)) for s in gather)
assert [1*1+2*2,1*3+2*4]==[5,11]
assert (2*3+1*10)/3==16/3
assert max((m+s+1 for m in range(4) for s in range(4)))==7

for LANG in ['ko','en']:
    a='collective-ring-tree'
    # Keep GPU positions fixed across panels; arrows carry the pre-transfer values.
    def input_boxes(y, gathered=False, tree=False):
        b=''
        for r,x in enumerate([48,328,608,888]):
            b+=rect(x,y,264,126,FILLS[r],COLORS[r])+text(x+18,y+30,f'GPU {r}',24,COLORS[r],True)
            value=f'{"ABCD"[r]} = {1111*(r+1)}' if gathered else str(vectors[r])
            b+=text(x+18,y+67,value,20)
            label=('전체 배열 전달','Send the whole array') if tree else (('완성된 조각','Completed chunk') if gathered else ('처음 보낼 조각: ','First send: '))
            b+=text(x+18,y+105,tr(label)+('' if gathered or tree else 'ABCD'[(r-1)%4]),19,MUTED)
        return b

    def ring_panel(y,step,gathered=False,continuous=True):
        b=text(48,y+27,('시작 · 전달 전의 상태','Start · before any transfer') if step==0 else (f'{step}단계',f'Step {step}'),28,bold=True)
        centers=[(600,y+116),(930,y+285),(600,y+454),(270,y+285)]
        paths=[(758,y+145,899,y+222),(899,y+348,758,y+425),(442,y+425,301,y+348),(301,y+222,442,y+145)]
        labels=[(935,y+179),(935,y+405),(265,y+405),(265,y+179)]
        for r,(x1,y1,x2,y2) in enumerate(paths):
            if step==0:
                b+=f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{LINE}" stroke-width="2.5"/>'
                continue
            b+=arrow(x1,y1,x2,y2)
            if gathered:
                c=(r-step+1)%4; label='ABCD'[c]
            else:
                c,v=rs[step-1][r];label=f'{"ABCD"[c]}: {v}'
            lx,ly=labels[r];b+=text(lx,ly,label,23,bold=True,anchor='middle')
        for r,(x,cy) in enumerate(centers):
            b+=rect(x-150,cy-57,300,114,FILLS[r],COLORS[r])+text(x,cy-33,f'GPU {r}',23,COLORS[r],True,anchor='middle')
            changed=(r-step)%4 if gathered else (rs[step][r][0] if step else -1)
            values=[1111*(c+1) if c in ag[step][r] else None for c in range(4)] if gathered else rs_vectors[step][r]
            for c,value in enumerate(values):
                cx=x-136+c*68
                faded=(not gathered and step==3 and c!=r)
                marked=(c==changed)
                fill='#E9EDF0' if faded else ('white' if value is not None else '#F5F7F9')
                b+=text(cx+32,cy-9,'ABCD'[c],16,MUTED,anchor='middle')
                b+=rect(cx,cy-1,64,30,fill,COLORS[r] if marked else LINE)
                if marked:b+=f'<rect x="{cx}" y="{cy-1}" width="64" height="30" rx="8" fill="none" stroke="{COLORS[r]}" stroke-width="3"/>'
                b+=text(cx+32,cy+20,'—' if value is None else str(value),18,'#88939E' if faded else INK,marked,anchor='middle')
            if step==0:
                label=('완성된 자기 조각만 보관','Only the owned result chunk') if gathered else ('처음 보낼 조각: '+'ABCD'[(r-1)%4],'First send: '+'ABCD'[(r-1)%4])
            elif gathered:
                label=('새로 받은 값: ','Received: ');label=tr(label)+f'{"ABCD"[changed]} = {1111*(changed+1)}'
            else:
                c,v=rs[step][r];incoming=rs[step-1][(r-1)%4][1]
                label=f'{"ABCD"[c]}: {vectors[r][c]} + {incoming} = {v}'
            b+=text(x,cy+47,label,18,MUTED,anchor='middle')
        if gathered:
            note=('테두리: 새로 채운 위치\n—: 아직 받지 않은 결과','Outlined: newly filled slot\n—: result not yet received')
            if step==0:note=('완성된 조각에서 시작\n—: 아직 없는 결과','Start with completed chunks\n—: missing result')
            if step==3:note=('모든 위치가 채워짐\n네 GPU 모두 같은 결과','All positions filled\nSame result on all GPUs')
        else:
            note=('테두리: 이번에 더한 위치\n나머지 값은 그대로 유지','Outlined: updated position\nOther values are retained')
            if step==0:note=('각 GPU의 입력 벡터\n아직 합산하지 않은 값','Input vector on each GPU\nNo reduction yet')
            if step==3:note=('진한 칸: 완성된 결과 조각\n옅은 칸: 결과가 아닌 중간값','Dark: completed result chunk\nFaded: intermediate values')
        b+=text(600,y+278,note,19,MUTED,anchor='middle')
        if continuous and step<3:b+=arrow(600,y+526,600,y+551)
        return b

    b=text(48,204,('시작: GPU마다 A · B · C · D의 입력 보관','Start: each GPU holds inputs for A · B · C · D'),26,bold=True)
    b+=input_boxes(225)
    b+=text(48,389,('A · B · C · D = 배열의 첫째 · 둘째 · 셋째 · 넷째 위치','A · B · C · D = array positions 1 · 2 · 3 · 4'),23,MUTED)
    for step in range(1,4):b+=ring_panel(420+(step-1)*570,step)
    b+=banner(2100,('완성: GPU마다 합산된 조각 하나씩 보관','Done: one reduced chunk per GPU'),'GPU 0: A=1111    GPU 1: B=2222    GPU 2: C=3333    GPU 3: D=4444')
    save(a,'01-ring-reduce-scatter',('Ring: 조각을 전달하며 합산하기','Ring: pass chunks and accumulate'),('각 GPU의 전체 벡터에서 더해지는 위치를 따라갑니다. 화살표는 보내는 조각입니다.','Follow updates within each GPU’s full vector. Arrows show the chunk sent.'),b,2240,('원형으로 배치한 네 GPU가 세 단계에 걸쳐 조각을 전달하고 합산합니다. 전체 벡터에서 갱신한 위치를 강조하며, 마지막에는 GPU마다 완성된 결과 한 칸과 나머지 중간값을 구별합니다.','Four GPUs arranged in a ring exchange and reduce chunks in three steps. Each whole vector highlights its updated position; the final state distinguishes one completed result from intermediate values on each GPU.'))
    b=text(48,204,('시작: Reduce-Scatter에서 완성한 조각','Start: completed chunks from Reduce-Scatter'),26,bold=True)
    b+=input_boxes(225,True)
    b+=text(48,389,('화살표의 조각 하나를 전달하고, 받은 조각도 계속 보관합니다.','Send the one chunk shown on each arrow, and retain received chunks.'),23,MUTED)
    for step in range(1,4):b+=ring_panel(420+(step-1)*570,step,True)
    b+=banner(2100,('완성: 네 GPU 모두 같은 배열 보관','Done: the same array on all four GPUs'),'[A, B, C, D] = [1111, 2222, 3333, 4444]')
    save(a,'02-ring-all-gather',('Ring: 완성된 조각을 모두에게','Ring: distribute the completed chunks'),('완성된 조각을 받아 벡터의 빈 위치를 채웁니다. 값은 다시 더하지 않습니다.','Receive completed chunks to fill missing vector positions, without adding again.'),b,2240,('원형으로 배치한 네 GPU가 매 단계 조각 하나씩 전달합니다. 빈 위치를 채워 세 단계 뒤 모두 [1111, 2222, 3333, 4444]를 보관합니다.','Four GPUs arranged in a ring each forward one chunk per step. They fill missing positions and all hold [1111, 2222, 3333, 4444] after three steps.'))

    b=text(48,204,('시작: Ring과 같은 네 입력 배열','Start: the same four input arrays as the ring'),26,bold=True)
    b+=input_boxes(225,tree=True)
    # Each edge transfers a whole array; keep completed sums on the broadcast senders.
    tree_states=[[[11,22,33,44],vectors[1],[1100,2200,3300,4400],vectors[3]],
                 [[1111,2222,3333,4444],vectors[1],[1100,2200,3300,4400],vectors[3]],
                 [[1111,2222,3333,4444],vectors[1],[1111,2222,3333,4444],vectors[3]],
                 [[1111,2222,3333,4444] for _ in range(4)]]
    assert tree_states[0][0]==[x+y for x,y in zip(vectors[0],vectors[1])]
    assert tree_states[0][2]==[x+y for x,y in zip(vectors[2],vectors[3])]
    assert tree_states[1][0]==[sum(v[c] for v in vectors) for c in range(4)]
    titles=[('1단계 · 아래에서 두 곳으로 합산','Step 1 · reduce in two places'),('2단계 · GPU 0에 전체 합 완성','Step 2 · complete the sum on GPU 0'),('3단계 · GPU 0에서 GPU 2로 배포','Step 3 · broadcast from GPU 0 to GPU 2'),('4단계 · GPU 1과 GPU 3에도 배포','Step 4 · broadcast to GPUs 1 and 3')]
    def tree_panel(y,i):
        state=vectors if i<0 else tree_states[i]
        b=text(48,y+24,('시작 · 각 GPU의 입력','Start · input on each GPU') if i<0 else titles[i],28,bold=True)
        centers=[(600,y+101),(290,y+274),(910,y+274),(910,y+442)]
        # Light edges show the fixed tree; arrowheads mark only this step's transfers.
        edges=[(450,y+160,330,y+214),(750,y+160,870,y+214),(910,y+338,910,y+381)]
        for x1,y1,x2,y2 in edges:b+=f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{LINE}" stroke-width="2.5"/>'
        active_edges=[] if i<0 else [[0,2],[1],[1],[0,2]][i]
        for e in active_edges:
            x1,y1,x2,y2=edges[e]
            b+=arrow(x2,y2,x1,y1) if i<2 else arrow(x1,y1,x2,y2)
        for r,(x,cy) in enumerate(centers):
            b+=rect(x-174,cy-53,348,106,FILLS[r],COLORS[r])+text(x,cy-19,f'GPU {r}'+(' · root' if r==0 else ''),24,COLORS[r],True,anchor='middle')
            b+=text(x,cy+23,str(state[r]),21,bold=True,anchor='middle')
        msg=[('1 → 0, 3 → 2\n두 전달과 합산을 동시에','1 → 0, 3 → 2\nBoth transfers reduce in parallel'),('2 → 0\n부분합끼리 더하기','2 → 0\nAdd the two partial sums'),('0 → 2\n완성된 배열을 복사','0 → 2\nCopy the completed array'),('0 → 1, 2 → 3\n다시 더하지 않고 복사','0 → 1, 2 → 3\nCopy without adding again')][i]
        if i<0:msg=('같은 위치끼리 합산할 네 배열','Four arrays to sum position by position')
        b+=text(80,y+416,msg,23,MUTED)
        return b
    for i in range(4):b+=tree_panel(410+i*510,i)
    save(a,'03-tree',('Tree: 모아서 더하고 다시 펼치기','Tree: reduce, then broadcast'),('화살표 하나가 배열 전체를 전달합니다. 상자는 전달 후의 값, 옅은 선은 트리 연결입니다.','Each arrow carries a whole array. Boxes show values after transfer; faint lines show tree edges.'),b,2465,('같은 트리 배치를 네 번 보여줍니다. 두 단계로 GPU 0에 합산하고, 화살표를 뒤집어 두 단계로 모든 GPU에 배포합니다.','Four panels keep the same tree layout: two reduction steps to GPU 0, followed by two broadcast steps along reversed edges.'))
    # Interactive frames reuse the exact same state and geometry as the overview.
    for figure,count,title in [('01',4,('Ring: 조각을 전달하며 합산하기','Ring: pass chunks and accumulate')),('02',4,('Ring: 완성된 조각을 모두에게','Ring: distribute the completed chunks')),('03',5,('Tree: 모아서 더하고 다시 펼치기','Tree: reduce, then broadcast'))]:
        frames=[]
        for step in range(count):
            label=('시작 상태','Starting state') if step==0 else ((f'전달 {step}단계',f'Transfer step {step}') if figure!='03' else titles[step-1])
            subtitle=('색과 위치는 GPU를 구별합니다. 다음 단계에서도 같은 위치를 유지합니다.','Colors and positions identify GPUs and remain fixed across steps.') if step==0 else (('전체 벡터에서 합산되는 위치를 강조합니다. 화살표는 보내는 조각입니다.','The updated position is highlighted in each full vector. Arrows show sent chunks.') if figure=='01' else (('받은 결과로 빈 위치를 채웁니다. 화살표는 보내는 조각입니다.','Fill missing positions with received results. Arrows show sent chunks.') if figure=='02' else ('화살표: 배열 전체 전달 · 상자: 전달 후의 값','Arrows: whole-array transfers · Boxes: values after transfer')))
            body=tree_panel(210,step-1) if figure=='03' else ring_panel(210,step,figure=='02',False)
            if figure=='01' and step==3:body+=text(48,786,('합산 완료: GPU마다 결과 조각 하나씩 보관','Reduction complete: each GPU holds one result chunk'),24,bold=True)
            if figure=='02' and step==3:body+=text(48,786,'[A, B, C, D] = [1111, 2222, 3333, 4444]',24,bold=True)
            alt=tr(title)+' — '+tr(label)+'. '+tr(subtitle)
            slug=f'{figure}-step-{step}'
            save(a,slug,title,subtitle,body,830,alt)
            MANIFEST.pop() # Frames are catalogued separately from the overview PNGs.
            frames.append(dict(slug=slug,label=tr(label),alt=alt))
        STEPS[LANG][figure]=frames
    b=banner(198,('논리적 Ring: 통신 상대와 순서','Logical ring: peers and order'),'GPU 0 → GPU 1 → GPU 2 → GPU 3 → GPU 0')
    b+=text(48,360,('실제 하드웨어: GPU들이 스위치를 통해 연결된 예','Physical hardware: GPUs connected through a switch'),26,bold=True)
    for i,x in enumerate([48,336,624,912]):
        b+=box(x,407,240,120,f'GPU {i}',color=i)+f'<path d="M{x+120},536 L{426+i*116},637" stroke="{MUTED}" stroke-width="2.5"/>'
    b+=box(375,637,450,125,('공유 스위치','Shared switch'),('같은 경로에서 대역폭 경쟁 가능','Transfers may contend for bandwidth'))
    b+=text(48,828,('Ring의 이웃이라고 전용 케이블로 직접 연결된 것은 아닙니다.','Logical neighbors need not have a dedicated direct cable.'),25,bold=True)
    save(a,'04-logical-physical',('전달 순서와 실제 연결을 구별하기','Separate transfer order from physical links'),('위는 알고리즘의 관계, 아래는 가능한 물리 연결의 한 예입니다.','Top: algorithmic relationship. Bottom: one possible physical topology.'),b,884,('논리적으로 Ring 순서로 전달해도 네 GPU가 공유 스위치를 거칠 수 있습니다.','A logical ring can run over a physical shared-switch topology.'))

    a='choosing-parallelism'
    for r,(label,groups) in enumerate([( ('모델 네 벌 · DP','Four replicas · DP'),[[0],[1],[2],[3]]),(('두 GPU씩 두 벌 · TP + DP','Two replicas of two GPUs · TP + DP'),[[0,1],[2,3]]),(('네 GPU로 한 벌 · TP','One replica across four GPUs · TP'),[[0,1,2,3]])]):
        y=212+r*226;b=('' if r==0 else b)+text(48,y,label,26,bold=True)
        for g,group in enumerate(groups):
            x=48+group[0]*280;w=len(group)*280-16;b+=rect(x,y+29,w,140,FILLS[g],COLORS[g])
            for i in group:b+=text(48+i*280+132,y+83,f'GPU {i}',25,anchor='middle')+text(48+i*280+132,y+127,('W 전체' if len(group)==1 else f'W의 1/{len(group)}','Full W' if len(group)==1 else f'1/{len(group)} of W'),23,anchor='middle')
    b+=text(48,901,('같은 테두리 안의 GPU들이 한 모델 실행을 함께 담당합니다.','GPUs inside one border cooperate on the same model execution.'),24,bold=True)
    save(a,'01-layouts',('GPU 네 개를 배치하는 세 가지 방법','Three ways to arrange four GPUs'),('예시는 dense 모델의 가중치를 균등하게 나눌 수 있는 TP를 가정합니다.','Assume TP can evenly partition the dense model’s weights in this example.'),b,951,('4개 단일 GPU 복제본, 2개의 2-GPU TP 복제본, 1개의 4-GPU TP 복제본을 비교합니다.','Compare four single-GPU replicas, two two-GPU TP replicas, and one four-GPU TP replica.'))
    b=banner(194,('GPU당 사용 가능 메모리 24 GiB / 모델 가중치 32 GiB','Usable memory: 24 GiB per GPU / model weights: 32 GiB'),('요청 상태·중간값·임시 공간 등에 GPU당 8 GiB가 필요하다고 가정','Assume 8 GiB per GPU for request state, activations, and temporary storage'))
    b= b+table(344,[('배치','Deployment'),('가중치 / GPU','Weights / GPU'),('총 사용 / GPU','Total / GPU'),('판단','Decision')],[
      ['DP × 4','32 GiB','32 + 8 = 40 GiB',('초과','Too large')],['TP 2 × DP 2','16 GiB','16 + 8 = 24 GiB',('여유 없음','No headroom')],['TP 4 × DP 1','8 GiB','8 + 8 = 16 GiB',('8 GiB 여유','8 GiB headroom')]], [280,250,294,280],111)
    b+=text(48,795,('모델 가중치만 들어간다고 실행에 필요한 메모리까지 충족되는 것은 아닙니다.','Fitting the weights alone does not establish that the workload fits.'),24,bold=True)
    save(a,'02-memory',('속도를 비교하기 전에 메모리부터','Check memory before comparing speed'),('실제 모델 벤치마크가 아닌, 가정을 둔 용량 계산 예시입니다.','An assumed capacity example, not a benchmark of a real model.'),b,851,('24GiB GPU와 32GiB 모델에서 추가 상태 8GiB를 포함하면 세 배치가 각각 40,24,16GiB를 사용합니다.','With 24 GiB GPUs, 32 GiB weights and 8 GiB extra state, per-GPU totals are 40, 24 and 16 GiB.'))
    b=box(48,216,510,212,('한 요청의 완료','Completion of one request'),('도착 → 대기 → 실행 → 완료\n사용자는 대기 시간도 경험합니다.','Arrival → queue → execution → completion\nThe user experiences queueing too.'),0)+box(642,216,510,212,('여러 요청의 처리량','Throughput across requests'),('같은 시간에 완료한 작업량\n같은 입력·출력 조건으로 비교합니다.','Work completed per unit time\nCompare matching input/output conditions.'),1)
    b+=arrow(303,443,303,495)+arrow(897,443,897,495)
    b+=banner(513,('목표를 만족하는 배치에서 전체 완료를 확인','Check end-to-end completion for feasible deployments'),('계산 감소 ↔ 반복 통신 · 대기 · 동시에 처리할 복제본 수','Less computation ↔ repeated communication, waiting, and replica count'))
    b+=table(665,[('측정 조건','Measurement conditions'),('함께 기록할 항목','Record together')],[[('같은 모델·정밀도·입력/출력 길이·요청 도착 패턴','Same model, precision, lengths, and arrival pattern'),('메모리 최고 사용량·응답 시간 분포·처리량·통신과 대기','Peak memory, latency distribution, throughput, communication and waiting')]], [552,552],152)
    save(a,'03-goals',('응답 시간과 처리량을 함께 판단하기','Evaluate latency and throughput together'),('모든 경우에 가장 좋은 병렬화 하나가 정해져 있지는 않습니다.','There is no single best parallelization for every workload.'),b,919,('요청의 대기와 실행 시간을 구별하고 메모리, 응답 시간 분포, 처리량을 같은 조건에서 측정합니다.','Distinguish queueing from execution and compare memory, latency distributions, and throughput under matching conditions.'))

assert len(MANIFEST)==14
(ROOT/'scripts/parallelism-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
print(f'Generated {len(MANIFEST)} SVGs; numerical example checks passed.')

(ROOT/'src/data/ring-tree-steps.json').write_text(json.dumps(STEPS,ensure_ascii=False,indent=2)+'\n')
