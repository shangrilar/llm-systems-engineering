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
gather=[{r} for r in range(4)]; ag=[gather]
for _ in range(3):
    gather=[gather[r]|gather[(r-1)%4] for r in range(4)];ag.append(gather)
assert all(s==set(range(4)) for s in gather)
assert [1*1+2*2,1*3+2*4]==[5,11]
assert (2*3+1*10)/3==16/3
assert max((m+s+1 for m in range(4) for s in range(4)))==7

for LANG in ['ko','en']:
    a='collective-ring-tree'
    b=banner(188,('네 GPU의 입력을 같은 위치끼리 더하기','Add matching positions across four GPUs'), 'GPU 0 [1, 2, 3, 4]    GPU 1 [10, 20, 30, 40]')
    b+=text(72,327,'GPU 2 [100, 200, 300, 400]    GPU 3 [1000, 2000, 3000, 4000]',22)
    b+=text(48,381,('조각 A / B / C / D = 첫째 / 둘째 / 셋째 / 넷째 위치','Chunks A / B / C / D = positions 1 / 2 / 3 / 4'),24,bold=True)
    rows=[]
    for step,state in enumerate(rs):
        rows.append([('첫 전송 값','First send') if step==0 else (f'{step}회 전달 후',f'After step {step}')]+[f'{"ABCD"[c]} = {v}' for c,v in state])
    b+=table(411,[('상태','State'),'GPU 0','GPU 1','GPU 2','GPU 3'],rows,rowh=76)
    b+=banner(812,'GPU 0 → GPU 1 → GPU 2 → GPU 3 → GPU 0',('매 단계에서 네 GPU가 동시에 전달하고, 받은 값에 자신의 값을 더합니다.','Each step: all four GPUs send, receive, and add their local contribution.'))
    save(a,'01-ring-reduce-scatter',('Ring: 조각을 전달하며 합산하기','Ring: pass chunks and accumulate'),('각 칸은 그 단계에서 전달할 값 또는 새로 합산한 값입니다. 전체 버퍼는 아닙니다.','Each cell tracks one outgoing or newly reduced chunk, not the full buffer.'),b,954,('세 번의 이웃 전달 뒤 GPU 0부터 3에 A=1111, B=2222, C=3333, D=4444가 완성됩니다.','After three neighbor transfers, GPUs 0–3 own completed chunks A=1111, B=2222, C=3333, D=4444.'))
    b=table(198,[('상태','State'),'GPU 0','GPU 1','GPU 2','GPU 3'],[[('시작','Start') if i==0 else (f'{i}회 전달 후',f'After step {i}')]+[' · '.join('ABCD'[c] for c in sorted(s)) for s in state] for i,state in enumerate(ag)],rowh=88)
    b+=banner(650,'GPU 0 → GPU 1 → GPU 2 → GPU 3 → GPU 0',('완성된 조각을 한 개씩 전달합니다. 다시 더하지 않습니다.','Forward one completed chunk per step. Do not add it again.'))
    b+=banner(784,('모든 GPU의 최종 결과','Final result on every GPU'),'[A, B, C, D] = [1111, 2222, 3333, 4444]')
    save(a,'02-ring-all-gather',('Ring: 완성된 조각을 모두에게','Ring: distribute the completed chunks'),('색이 아닌 A·B·C·D 표식으로 각 조각의 위치를 추적합니다.','The A–D labels identify result chunks; each row lists the chunks now held.'),b,927,('세 단계의 All-Gather 뒤 모든 GPU가 A부터 D까지 갖습니다. Reduce-Scatter 세 단계와 합쳐 총 여섯 단계입니다.','Three All-Gather steps give all GPUs chunks A–D; with Reduce-Scatter, there are six steps.'))
    b=table(198,[('단계','Step'),('동시에 수행하는 전달','Transfers in the same step'),('새로 준비된 결과','New result')],[
      [('합산 1','Reduce 1'),'GPU 1 → 0; GPU 3 → 2','GPU 0: [11,22,33,44]\nGPU 2: [1100,2200,3300,4400]'],
      [('합산 2','Reduce 2'),'GPU 2 → 0','GPU 0: [1111,2222,3333,4444]'],
      [('배포 1','Broadcast 1'),'GPU 0 → 2',('GPU 0과 2가 전체 합 보유','GPUs 0 and 2 hold the full sum')],
      [('배포 2','Broadcast 2'),'GPU 0 → 1; GPU 2 → 3',('네 GPU가 전체 합 보유','All four GPUs hold the full sum')]], [174,426,504],116)
    b+=banner(772,('합산 트리: 1 → 0 ← 2 ← 3','Reduction tree: 1 → 0 ← 2 ← 3'),('GPU 0이 합산의 root입니다. 배포에서는 화살표 방향을 뒤집습니다.','GPU 0 is the reduction root. Broadcast reverses these edges.'))
    save(a,'03-tree',('Tree: 모아서 더하고 다시 펼치기','Tree: reduce, then broadcast'),('각 전송은 네 원소 전체를 보냅니다. Ring의 한 조각 전송과 크기가 다릅니다.','Each transfer carries all four elements, rather than one chunk as in the ring.'),b,916,('GPU 1과 3의 값을 각각 0과 2로 보내 합산한 뒤 GPU 2가 0으로 보냅니다. 전체 합을 역순으로 배포합니다.','GPU 1 sends to 0 and GPU 3 to 2; GPU 2 then sends its partial sum to 0. The full sum returns along reversed edges.'))
    b=banner(198,('논리적 Ring: 통신 상대와 순서','Logical ring: peers and order'),'GPU 0 → GPU 1 → GPU 2 → GPU 3 → GPU 0')
    b+=text(48,360,('실제 하드웨어: GPU들이 스위치를 통해 연결된 예','Physical hardware: GPUs connected through a switch'),26,bold=True)
    for i,x in enumerate([48,336,624,912]):
        b+=box(x,407,240,120,f'GPU {i}',color=i)+f'<path d="M{x+120},536 L{426+i*116},637" stroke="{MUTED}" stroke-width="2.5"/>'
    b+=box(375,637,450,125,('공유 스위치','Shared switch'),('같은 경로에서 대역폭 경쟁 가능','Transfers may contend for bandwidth'))
    b+=text(48,828,('Ring의 이웃이라고 전용 케이블로 직접 연결된 것은 아닙니다.','Logical neighbors need not have a dedicated direct cable.'),25,bold=True)
    save(a,'04-logical-physical',('전달 순서와 실제 연결을 구별하기','Separate transfer order from physical links'),('위는 알고리즘의 관계, 아래는 가능한 물리 연결의 한 예입니다.','Top: algorithmic relationship. Bottom: one possible physical topology.'),b,884,('논리적으로 Ring 순서로 전달해도 네 GPU가 공유 스위치를 거칠 수 있습니다.','A logical ring can run over a physical shared-switch topology.'))

    a='data-parallelism'
    b=text(48,212,('같은 모델 W를 네 벌 보관','Four copies of the same model W'),26,bold=True)
    for i,x in enumerate([48,328,608,888]):
        b+=box(x,249,264,125,('요청 '+chr(65+i),'Request '+chr(65+i)),color=i)+arrow(x+132,386,x+132,427)
        b+=box(x,439,264,178,f'GPU {i}',('전체 모델 W\n자기 요청 계산','Full model W\nOwn request'),i)+arrow(x+132,630,x+132,673)
        b+=box(x,685,264,125,('결과 '+chr(65+i),'Result '+chr(65+i)),color=i)
    save(a,'01-replicas',('DP: 같은 모델, 서로 다른 입력','DP: same model, different inputs'),('고정 가중치의 일반적인 dense 모델 추론 예시입니다.','An example of ordinary dense-model inference with fixed weights.'),b,854,('네 GPU가 모델 W 전체를 각각 보관하며 요청 A부터 D까지 따로 계산합니다.','Each GPU stores full model W and independently processes one of requests A–D.'))
    b=box(48,207,510,160,'GPU 0',('같은 가중치 w = 10\n입력 A → 기울기 g₀ = 2','Same weight w = 10\nInput A → gradient g₀ = 2'),0)+box(642,207,510,160,'GPU 1',('같은 가중치 w = 10\n입력 B → 기울기 g₁ = 6','Same weight w = 10\nInput B → gradient g₁ = 6'),1)
    b+=arrow(303,378,303,431)+arrow(897,378,897,431)
    b+=banner(446,('All-Reduce로 합산한 뒤 참여자 수로 나누기','All-Reduce the sum, then divide by the number of participants'),'g = (2 + 6) / 2 = 4')
    for i,x in enumerate([48,642]):
        b+=arrow(x+255,562,x+255,601)+box(x,615,510,167,f'GPU {i}',('학습률 η = 0.1\n같은 갱신: 10 − 0.1 × 4 = 9.6','Learning rate η = 0.1\nSame update: 10 − 0.1 × 4 = 9.6'),i)
    save(a,'02-gradients',('학습 DP: 기울기를 맞추고 같은 갱신','Training DP: synchronize gradients and updates'),('동일 크기의 입력 묶음, 묶음별 평균 손실, 단순 SGD 갱신을 가정합니다.','Assume equal local batch sizes, mean local losses, and a simple SGD update.'),b,830,('기울기 2와 6을 평균내어 4를 얻고 두 GPU 모두 가중치 10을 9.6으로 갱신합니다.','Average gradients 2 and 6 to get 4; both GPUs update weight 10 to 9.6.'))
    b=text(48,211,('한 요청의 실행에 1칸이 걸린다고 가정','Assume each request takes one time slot'),25,bold=True)
    b+=table(254,[('배치','Deployment'),('시간 1','Slot 1'),('시간 2','Slot 2'),('시간 3','Slot 3'),('시간 4','Slot 4')],[['1 GPU','A','B','C','D'],['2 GPUs · GPU 0','A','C','—','—'],['2 GPUs · GPU 1','B','D','—','—']],rowh=100)
    b+=banner(662,('전체 네 요청의 완료: 4칸 → 2칸','Completion of all four requests: 4 slots → 2 slots'),('요청 하나의 실행은 여전히 1칸입니다. 대기 시간은 줄어들 수 있습니다.','Each request still executes for one slot; time spent in the queue can shrink.'))
    save(a,'03-throughput',('실행 시간과 처리량을 구별하기','Distinguish execution time from throughput'),('네 요청이 동시에 도착하고, 요청 간 간섭과 분산 비용은 생략한 일정입니다.','All four requests arrive together; interference and dispatch costs are omitted.'),b,807,('GPU 하나는 네 요청을 네 슬롯에 처리하고 두 GPU는 두 슬롯에 처리하지만 개별 요청의 실행은 한 슬롯입니다.','One GPU finishes in four slots; two GPUs finish in two, while each request executes for one slot.'))

    a='tensor-parallelism'
    b=banner(192,('같은 행렬 곱','The same matrix product'),'X = [1, 2]     W = [[1, 3], [2, 4]]     Y = [5, 11]')
    for i,x in enumerate([48,642]):
        b+=box(x,335,510,245,f'GPU {i}',('X 전체: [1, 2]\nW의 '+('첫 열: [1, 2]ᵀ\n1×1 + 2×2 = 5' if i==0 else '둘째 열: [3, 4]ᵀ\n1×3 + 2×4 = 11'),'Full X: [1, 2]\n'+('First W column: [1, 2]ᵀ\n1×1 + 2×2 = 5' if i==0 else 'Second W column: [3, 4]ᵀ\n1×3 + 2×4 = 11')),i)
    b+=arrow(303,592,303,640)+arrow(897,592,897,640)+banner(657,('완성된 출력 조각: [5]와 [11]','Completed output shards: [5] and [11]'),('전체 출력이 필요하면 이어 붙입니다. 같은 위치의 부분합은 아닙니다.','Concatenate if the full output is needed; these are not partial sums.'))
    save(a,'01-columns',('출력 열을 나누면 결과도 나뉩니다','Split output columns, split the result'),('TP는 같은 입력의 한 연산을 여러 GPU가 함께 계산합니다.','In TP, multiple GPUs cooperate on one operation for the same input.'),b,803,('W의 열을 나누면 GPU 0이 5, GPU 1이 11을 완성합니다.','Splitting W by columns gives completed outputs 5 on GPU 0 and 11 on GPU 1.'))
    b=banner(192,('같은 행렬 곱','The same matrix product'),'X = [1, 2]     W = [[1, 3], [2, 4]]     Y = [5, 11]')
    b+=box(48,335,510,245,'GPU 0',('X의 첫 원소: [1]\nW의 첫 행: [1, 3]\n부분합 P₀ = [1, 3]','First X element: [1]\nFirst W row: [1, 3]\nPartial sum P₀ = [1, 3]'),0)
    b+=box(642,335,510,245,'GPU 1',('X의 둘째 원소: [2]\nW의 둘째 행: [2, 4]\n부분합 P₁ = [4, 8]','Second X element: [2]\nSecond W row: [2, 4]\nPartial sum P₁ = [4, 8]'),1)
    b+=arrow(303,592,303,640)+arrow(897,592,897,640)+banner(657,('같은 위치끼리 더해야 완성','Add corresponding positions to complete the result'),'P₀ + P₁ = [1 + 4, 3 + 8] = [5, 11]')
    save(a,'02-rows',('누적하는 축을 나누면 부분합이 생깁니다','Split the reduction axis, get partial sums'),('부분합은 각 GPU에 두 원소가 있지만 아직 완성된 출력이 아닙니다.','Each partial sum has two elements, but is not yet the completed output.'),b,803,('GPU 0의 [1,3]과 GPU 1의 [4,8]을 위치별로 더해 [5,11]을 얻습니다.','Add [1,3] and [4,8] elementwise to obtain [5,11].'))
    rows=[ [('같은 입력','Same input'),'X','X'],[('첫 선형 연산','First linear'),'X × U₀ → H₀','X × U₁ → H₁'],[('원소별 활성화','Elementwise activation'),'f(H₀)','f(H₁)'],[('둘째 선형 연산','Second linear'),'f(H₀) × V₀ → P₀','f(H₁) × V₁ → P₁'],[('All-Reduce 후','After All-Reduce'),'Y = P₀ + P₁','Y = P₀ + P₁']]
    b=table(204,[('계산 순서 ↓','Execution ↓'),'GPU 0','GPU 1'],rows,[280,412,412],96)
    b+=text(48,812,('U는 출력 열, V는 그에 대응하는 입력 행으로 나눕니다.','Split U by output columns and V by matching input rows.'),24,bold=True)
    save(a,'03-mlp',('두 연산 사이의 조각을 그대로 사용하기','Keep shards between two operations'),('중간 H를 모으지 않아도, 각 GPU가 자기 조각으로 다음 부분합을 계산할 수 있습니다.','Each GPU can compute its next partial sum without gathering intermediate H.'),b,867,('첫 선형 연산의 열 분할과 둘째 선형 연산의 행 분할을 연결해 중간 All-Gather를 피하는 MLP 흐름입니다.','An MLP pairs column and row partitions so the intermediate activation need not be all-gathered.'))

    a='sequence-parallelism'
    b=text(48,205,('활성값: 계산 중 만들어지는 토큰별 벡터','Activations: per-token vectors produced during computation'),25,bold=True)
    for k,(label,toks) in enumerate([(('TP의 복제 구간','Replicated region with TP'),[[0,1,2,3],[0,1,2,3]]),(('SP로 나눈 구간','Region partitioned with SP'),[[0,1],[2,3]])]):
        yy=245+k*288;b+=text(48,yy,label,26,bold=True)
        for g,x in enumerate([48,642]):
            b+=rect(x,yy+28,510,213,FILLS[g],COLORS[g])+text(x+20,yy+65,f'GPU {g}',25,COLORS[g],True)
            for j,t in enumerate(toks[g]):
                b+=rect(x+20+j*119,yy+92,110,112,'white',COLORS[g])+text(x+75+j*119,yy+127,f't{t}',24,anchor='middle')+text(x+75+j*119,yy+170,'h₀ … h₃',18,anchor='middle')
    b+=text(48,853,('한 토큰의 특징 네 개는 함께 유지합니다. 토큰 묶음만 나눕니다.','Keep all four features of each token together; partition the tokens.'),25,bold=True)
    save(a,'01-activations',('복제된 활성값을 토큰 방향으로 나누기','Partition replicated activations by token'),('Megatron SP의 관점입니다. 모델 가중치의 TP 분할은 유지합니다.','This is Megatron-style SP; the TP partition of model weights is retained.'),b,906,('TP에서 복제된 t0부터 t3를 SP에서는 GPU 0의 t0,t1과 GPU 1의 t2,t3로 나눕니다.','SP partitions replicated tokens t0–t3 into t0,t1 on GPU 0 and t2,t3 on GPU 1.'))
    b=table(193,[('순서','Order'),'GPU 0','GPU 1'],[
      [('토큰별 정규화','Per-token normalization'),'t0, t1','t2, t3'],['All-Gather','t0, t1, t2, t3','t0, t1, t2, t3'],[('TP MLP 계산','TP MLP computation'),('모든 토큰의 부분합 P₀','Partial sum P₀ for all tokens'),('모든 토큰의 부분합 P₁','Partial sum P₁ for all tokens')],['Reduce-Scatter',('완성된 결과 t0, t1','Completed results t0, t1'),('완성된 결과 t2, t3','Completed results t2, t3')],[('잔차 연결 등','Residual addition, etc.'),'t0, t1','t2, t3']], [280,412,412],105)
    b+=text(48,839,('All-Reduce 뒤 전체 결과를 복제하는 대신, 합산과 토큰 분할을 함께 합니다.','Reduce and partition by token instead of replicating the All-Reduce result.'),23,bold=True)
    save(a,'02-flow',('연산에 맞춰 모으고 다시 나누기','Gather and repartition around the operation'),('표는 순전파 흐름입니다. 잔차 입력도 대응하는 토큰 배치를 유지합니다.','Forward-pass flow; the residual input keeps the matching token partition.'),b,894,('정규화는 로컬 토큰에서 수행하고 All-Gather로 TP 입력을 만든 뒤 Reduce-Scatter로 결과를 다시 토큰별로 나눕니다.','Normalize local tokens, All-Gather the TP input, then Reduce-Scatter completed outputs by token.'))

    a='context-parallelism'
    for i,x in enumerate([48,642]):
        tok='t0, t1' if i==0 else 't2, t3'
        b=( '' if i==0 else b)+box(x,207,510,238,f'GPU {i}',(f'담당 토큰: {tok}\n로컬 Q · K · V\nQ는 이 GPU에 유지',f'Owned tokens: {tok}\nLocal Q · K · V\nKeep Q on this GPU'),i)
    b+=arrow(558,498,639,498)+text(600,478,('K·V 교환','Exchange K·V'),22,anchor='middle')+arrow(642,550,561,550)
    b+=box(48,596,510,194,'GPU 0',('Q₀₋₁로 필요한 K·V 참조\n출력: t0, t1','Q₀₋₁ attends to required K·V\nOutput: t0, t1'),0)+box(642,596,510,194,'GPU 1',('Q₂₋₃로 필요한 K·V 참조\n출력: t2, t3','Q₂₋₃ attends to required K·V\nOutput: t2, t3'),1)
    save(a,'01-kv',('Q는 두고, 필요한 K·V를 가져오기','Keep Q local; bring in the required K and V'),('K·V는 블록 단위로 전달할 수 있습니다. 마스크상 불필요한 참조는 제외합니다.','K and V can move block by block; masked-out references are unnecessary.'),b,837,('각 GPU가 자기 토큰의 Q를 유지하면서 필요한 다른 토큰의 K,V를 받아 어텐션을 계산합니다.','Each GPU retains Q for its own tokens and receives other required K,V blocks.'))
    b=text(328,211,('참조할 K·V의 토큰 →','Key/value tokens →'),26,bold=True)
    for j in range(6):b+=text(366+j*98,258,f't{j}',24,anchor='middle')
    for i in range(6):
        b+=text(48,313+i*69,f'GPU {0 if i<3 else 1} · Q(t{i})',24)
        for j in range(6):
            b+=rect(326+j*98,279+i*69,82,57,FILLS[0 if j<3 else 1] if j<=i else '#F1F4F7')
            b+=text(367+j*98,316+i*69,'●' if j<=i else '—',24,COLORS[0 if j<3 else 1] if j<=i else '#9BA7B4',anchor='middle')
    b+=banner(739,('● 참조하는 위치     — 미래 토큰이라 제외','● Attended position     — Future token, masked out'),('GPU 0: 1+2+3 = 6개 위치 / GPU 1: 4+5+6 = 15개 위치','GPU 0: 1+2+3 = 6 positions / GPU 1: 4+5+6 = 15 positions') )
    save(a,'02-causal',('토큰 수가 같아도 계산량은 다를 수 있습니다','Equal token counts can mean unequal work'),('여섯 토큰의 인과적 어텐션을 앞 세 토큰과 뒤 세 토큰으로 나눈 예입니다.','Causal attention over six tokens, partitioned into the first and last three.'),b,884,('인과적 어텐션의 삼각형에서 앞 세 행은 여섯 위치, 뒤 세 행은 열다섯 위치를 참조합니다.','The first three causal rows attend to six positions; the last three attend to fifteen.'))
    b=box(48,204,510,220,('K·V 블록 A','K·V block A'),('점수: [0, 0] → 가중치 [1, 1]\nV: [2, 4]\n가중합 6 / 가중치 합 2','Scores: [0, 0] → weights [1, 1]\nV: [2, 4]\nWeighted sum 6 / weight sum 2'),0)+box(642,204,510,220,('K·V 블록 B','K·V block B'),('점수: [0] → 가중치 [1]\nV: [10]\n가중합 10 / 가중치 합 1','Scores: [0] → weights [1]\nV: [10]\nWeighted sum 10 / weight sum 1'),1)
    b+=arrow(303,438,303,492)+arrow(897,438,897,492)+banner(509,('전체 기준으로 정규화','Normalize across both blocks'),'(6 + 10) / (2 + 1) = 16 / 3 ≈ 5.33')
    b+=banner(653,('블록별 평균을 단순 평균하면 다른 값','A plain average of the block averages is different'),'(3 + 10) / 2 = 6.5 ≠ 5.33')
    save(a,'03-normalization',('블록 결과는 가중치를 함께 합칩니다','Combine block results with their weights'),('Q 하나, 같은 점수 0, 스칼라 V를 사용해 정규화의 의미만 살펴봅니다.','Use one query, zero scores, and scalar V values to isolate normalization.'),b,800,('블록별 가중합과 가중치 합을 더해 16/3을 얻습니다. 블록별 출력의 단순 평균 6.5는 틀립니다.','Combining weighted sums and weight sums gives 16/3; averaging the two block outputs gives the incorrect 6.5.'))

    a='pipeline-parallelism'
    b=text(48,212,('모델의 층을 연속된 네 구간으로 배치','Place consecutive model layers on four stages'),26,bold=True)
    for i,x in enumerate([48,328,608,888]):
        b+=box(x,275,232,253,f'GPU {i}',(f'층 {2*i} · {2*i+1}\n이 구간의 가중치\n이 구간의 계산',f'Layers {2*i} · {2*i+1}\nStage weights\nStage computation'),i)
        if i<3:b+=arrow(x+237,396,x+275,396)
    b+=banner(623,('입력 → GPU 0 → GPU 1 → GPU 2 → GPU 3 → 출력','Input → GPU 0 → GPU 1 → GPU 2 → GPU 3 → Output'),('단계 사이에는 이전 층의 출력인 중간값을 전달합니다.','Each stage sends the activations produced by its final layer.'))
    save(a,'01-stages',('PP: 층을 나누고 중간값 전달하기','PP: partition layers and pass activations'),('한 입력의 계산은 앞 단계의 결과를 받은 뒤 다음 단계로 진행합니다.','For one input, a stage depends on the preceding stage’s result.'),b,778,('여덟 층을 두 층씩 네 GPU에 배치하고 입력이 순서대로 모든 단계를 통과합니다.','Eight layers are placed two per GPU; an input passes through all four stages in order.'))
    b=text(48,208,('한 칸 = 한 단계 계산 / A·B·C·D = 서로 다른 마이크로배치','One slot = one stage computation / A–D = different microbatches'),22,bold=True)
    for j in range(7): b+=text(285+j*126,269,str(j+1),24,anchor='middle')
    for i in range(4):
        b+=text(48,332+i*98,f'GPU {i}',26,COLORS[i],True)
        for j in range(7):
            active=0<=j-i<4
            b+=rect(228+j*126,294+i*98,112,76,FILLS[(j-i)%4] if active else '#F1F4F7')+text(284+j*126,343+i*98,chr(65+j-i) if active else '—',28,anchor='middle')
    b+=banner(747,('같은 시각에 다른 입력의 다른 층을 계산','Different stages process different inputs at the same time'),('네 마이크로배치는 7칸에 완료됩니다. A 하나는 4칸이 필요합니다.','Four microbatches finish in 7 slots. A alone still needs 4 slots.'))
    save(a,'02-schedule',('여러 입력으로 파이프라인 채우기','Fill the pipeline with multiple inputs'),('동일한 단계 시간, 순전파만 표시, 통신 시간은 생략한 일정입니다.','Equal stage times; forward pass only; communication time omitted.'),b,891,('4개 GPU의 대각선 일정에서 네 마이크로배치를 7슬롯 동안 처리하며 시작과 끝에 빈 슬롯이 생깁니다.','A diagonal four-GPU schedule completes four microbatches in seven slots, with idle slots at the start and end.'))

    a='expert-parallelism'
    b=table(199,[('순서','Order'),'GPU 0 · E0, E1','GPU 1 · E2, E3'],[
      [('토큰의 출발','Token origin'),'t0 → E0; t1 → E2','t2 → E1; t3 → E2'],[('Expert로 전달','Dispatch to experts'),'E0: t0\nE1: t2','E2: t1, t3\nE3: —'],[('Expert 계산','Expert computation'),'E0(t0), E1(t2)','E2(t1), E2(t3)'],[('출발지로 결과 회수','Return to origin'),'y(t0), y(t1)','y(t2), y(t3)']], [272,416,416],128)
    b+=text(48,825,('이동하는 것은 토큰의 벡터와 결과입니다. Expert 가중치는 맡은 GPU에 둡니다.','Token vectors and results move; expert weights stay on their assigned GPU.'),23,bold=True)
    save(a,'01-dispatch',('EP: 토큰을 Expert에게 보내고 결과 돌려받기','EP: dispatch tokens and return the results'),('E0–E3는 서로 다른 Expert입니다. 먼저 토큰당 하나를 고르는 top-1을 봅니다.','E0–E3 are different experts. Start with top-1 routing: one expert per token.'),b,881,('GPU 0의 t1을 GPU 1의 E2로 보내고 GPU 1의 t2를 GPU 0의 E1로 보낸 뒤 결과를 원래 GPU로 돌려보냅니다.','Send t1 from GPU 0 to E2 on GPU 1, and t2 from GPU 1 to E1 on GPU 0, then return the results.'))
    b=banner(194,('라우터가 토큰 t에 두 Expert와 결합 가중치를 선택','The router selects two experts and combination weights for token t'),'E0: 0.7     E2: 0.3')
    b+=arrow(600,310,303,373)+arrow(600,310,897,373)
    b+=box(48,390,510,181,'GPU 0 · E0',('t의 벡터를 계산\n출력 u₀','Compute on t’s vector\nOutput u₀'),0)+box(642,390,510,181,'GPU 1 · E2',('t의 벡터를 계산\n출력 u₂','Compute on t’s vector\nOutput u₂'),1)
    b+=arrow(303,585,600,644)+arrow(897,585,600,644)+banner(661,('토큰 t의 출발지에서 결합','Combine at token t’s origin'),'y(t) = 0.7 × u₀ + 0.3 × u₂')
    save(a,'02-combine',('여러 Expert를 선택하면 결과도 결합합니다','Multiple selected experts require result combination'),('top-2의 단순 예시입니다. 실제 가중치 처리 방식은 모델 정의를 따릅니다.','A simple top-2 example; the model defines how routing weights are handled.'),b,809,('토큰 하나를 E0과 E2에 보내고 출력에 0.7과 0.3을 곱해 합칩니다.','Send one token to E0 and E2, then combine their outputs with weights 0.7 and 0.3.'))
    b=text(48,208,('같은 크기의 Expert 네 개, top-1 토큰 여덟 개','Four equal-size experts and eight top-1 token assignments'),25,bold=True)
    for i,n in enumerate([1,1,6,0]):
        y=259+i*115;b+=text(48,y+39,f'E{i} · GPU {0 if i<2 else 1}',25)
        for j in range(n):b+=rect(293+j*110,y,96,65,FILLS[i],COLORS[i])+text(341+j*110,y+42,'t',26,anchor='middle')
        if not n:b+=text(307,y+42,('없음','None'),25,MUTED)
        b+=text(1020,y+42,str(n),27,bold=True)
    b+=banner(781,('Expert 수가 같다고 작업량이 같지는 않습니다.','Equal expert counts do not guarantee equal work.'),('GPU 0: 토큰 2개 / GPU 1: 토큰 6개 → 바쁜 쪽이 완료를 늦출 수 있습니다.','GPU 0: 2 tokens / GPU 1: 6 tokens → the busy GPU can delay completion.'))
    save(a,'03-imbalance',('라우팅이 만드는 작업량 불균형','Routing creates load imbalance'),('막대 한 칸은 Expert에 배정된 토큰 하나이며 실행 시간의 측정값이 아닙니다.','Each block is one token assignment, not a measured unit of execution time.'),b,925,('E0과 E1은 각각 한 토큰, E2는 여섯 토큰, E3는 영 토큰을 처리합니다.','E0 and E1 process one token each, E2 six, and E3 none.'))

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

assert len(MANIFEST)==46
(ROOT/'scripts/parallelism-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
print(f'Generated {len(MANIFEST)} SVGs; numerical example checks passed.')
