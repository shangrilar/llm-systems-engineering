"""Original bilingual figures for inference workload foundations.

Python standard library only. Render PNGs with render-inference-core-figures.mjs.
Educational diagrams; counts and matrix shapes are not measured performance.
"""
from pathlib import Path
from html import escape
import json
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images'
INK, MUTED, LINE = '#182C40', '#526577', '#DCE4EC'
BLUE, TEAL, ORANGE, PURPLE = '#2470BB', '#287D78', '#B55B22', '#7954A3'
BLUEF, TEALF, ORANGEF, PURPLEF = '#EDF5FD', '#EDF7F5', '#FFF2E6', '#F3EEF8'
LANG = 'ko'
MANIFEST = []

def tr(value):
    return value[LANG == 'en'] if isinstance(value, tuple) else str(value)

def wrap(value, width, size):
    result = []
    for part in tr(value).split('\n'):
        line = ''
        for word in part.split(' '):
            candidate = (line + ' ' + word).strip()
            units = sum(1 if unicodedata.east_asian_width(c) in 'WF' else .57 for c in candidate)
            if line and units * size > width:
                result.append(line)
                line = word
            else:
                line = candidate
        result.append(line)
    return result

def text(x, y, value, size=24, color=INK, bold=False, width=None, anchor='start'):
    lines = wrap(value, width, size) if width else tr(value).split('\n')
    return ''.join(f'<text x="{x}" y="{y+i*size*1.4}" fill="{color}" font-size="{size}" font-weight="{700 if bold else 400}" text-anchor="{anchor}">{escape(s)}</text>' for i,s in enumerate(lines))

def rect(x,y,w,h,fill='white',stroke=LINE,dash=False):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{stroke}" stroke-width="1.5"'+(' stroke-dasharray="6 5"' if dash else '')+'/>'

def arrow(x1,y1,x2,y2,color=MUTED):
    return f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{color}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>'

def patharrow(d):
    return f'<path d="{d}" stroke="{MUTED}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>'

def box(x,y,w,h,title,body='',fill=BLUEF,color=BLUE):
    return f'<g data-box="{x},{y},{w},{h}">'+rect(x,y,w,h,fill,color)+text(x+20,y+35,title,25,color,True,width=w-40)+text(x+20,y+78,body,22,width=w-40)+'</g>'

def note(y,title,body='',height=108):
    return f'<g data-box="48,{y},1104,{height}">'+rect(48,y,1104,height,'#F5F7FA')+text(70,y+35,title,25,bold=True,width=1060)+text(70,y+77,body,22,width=1060)+'</g>'

def token(x,y,label,kind='new',w=86,h=57):
    fill,color={'new':(ORANGEF,ORANGE),'old':(TEALF,TEAL),'plain':(BLUEF,BLUE),'empty':('#F7F9FB',MUTED)}[kind]
    return rect(x,y,w,h,fill,color,kind=='empty')+text(x+w/2,y+37,label,25,color,True,anchor='middle')

def save(article,slug,title,subtitle,body,height,alt,caption):
    folder=OUT/article/('en' if LANG=='en' else '')
    folder.mkdir(parents=True,exist_ok=True)
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title desc"><title id="title">{escape(tr(title))}</title><desc id="desc">{escape(tr(alt))}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="{MUTED}" stroke-width="1.6"/></marker></defs><style>text{{font-family:Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}}path{{stroke-linecap:round;stroke-linejoin:round}}</style><rect width="1200" height="{height}" fill="white"/>'''
    svg+=text(48,60,title,32,bold=True,width=1104)+text(48,112,subtitle,23,MUTED,width=1104)
    svg+=f'<path d="M48,170 H1152" stroke="{LINE}"/>'+body+'</svg>'
    target=folder/(slug+'.svg')
    target.write_text(svg)
    MANIFEST.append(dict(article=article,slug=slug,locale=LANG,title=tr(title),alt=tr(alt),caption=tr(caption),path=str(target.relative_to(ROOT)),width=1200,height=height))

for LANG in ['ko','en']:
    a='inference-and-training'
    b=text(48,219,('자기회귀 생성','Autoregressive generation'),28,BLUE,True)+text(642,219,('Next-token 학습','Next-token training'),28,TEAL,True)
    b+=box(48,249,510,130,('알고 있는 입력','Known input'),'p0  p1  p2\n'+tr(('다음 토큰은 아직 모름','The next token is not yet known')))
    b+=box(642,249,510,130,('알고 있는 학습 토큰열','Known training sequence'),'p0  p1  p2  p3\n'+tr(('다음 위치의 정답도 데이터에 있음','Next-position targets are in the data')),TEALF,TEAL)
    for x in [303,897]:b+=arrow(x,393,x,418)
    b+=box(48,435,510,125,('Forward: 예측 계산','Forward: compute predictions'),('가중치 W 유지\n현재 입력과 앞선 문맥 사용','Keep weights W fixed\nCurrent input with prior context'))
    b+=box(642,435,510,125,('Forward: 여러 위치를 함께','Forward: known positions'),('입력 p0 p1 p2의 예측 계산\n각 위치는 미래를 보지 못함','Predict from input positions p0 p1 p2\nEach position cannot see the future'),TEALF,TEAL)
    for x in [303,897]:b+=arrow(x,574,x,599)
    b+=box(48,616,510,140,('Logits → 다음 토큰 선택','Logits → select the next token'),('마지막 입력 위치의 logits → x0\nGreedy 또는 sampling','Last-position logits → x0\nGreedy selection or sampling'))
    b+=box(642,616,510,140,('Loss → backward','Loss → backward'),('정답 p1 p2 p3와 비교\n손실에서 가중치 기울기 계산','Compare with targets p1 p2 p3\nWeight gradients from the loss'),TEALF,TEAL)
    for x in [303,897]:b+=arrow(x,770,x,795)
    b+=box(48,812,510,138,('선택한 토큰으로 생성 계속','Continue with the selected token'),('종료하지 않으면 x0가 다음 입력\n한 요청 안에서는 순차적으로 반복','If continuing, use x0 as next input\nRepeat in order within a request'))
    b+=box(642,812,510,138,('Optimizer → 가중치 갱신','Optimizer → update weights'),('기울기로 W 갱신\n다음 학습 배치에서 반복','Update W using the gradients\nRepeat on the next training batch'),TEALF,TEAL)
    b+=box(48,996,510,130,('유지할 상태','State to retain'),('토큰 이력 · KV 캐시 · 종료 조건','Token history · KV cache · stop conditions'),'#F5F7FA',MUTED)
    b+=box(642,996,510,130,('유지할 상태','State to retain'),('활성값 · 기울기 · 옵티마이저 상태','Activations · gradients\nOptimizer state'),'#F5F7FA',MUTED)
    b+=text(48,1160,('표준적인 지도 학습과 생성의 비교입니다. 화살표는 실행 순서이며 시간 비율이 아닙니다.','Standard supervised training and generation; arrows show order, not elapsed time.'),22,MUTED,width=1104)
    save(a,'01-execution',('같은 모델, 다른 실행 흐름','Same model, different execution flows'),('생성은 다음 입력을 선택하고, 학습은 알려진 정답으로 가중치를 갱신합니다.','Generation selects its next input; training updates weights against known targets.'),b,1210,('생성은 고정된 가중치로 forward와 토큰 선택을 반복하고, 학습은 알려진 여러 위치의 예측과 손실, 역전파, 가중치 갱신을 수행합니다.','Generation repeats forward passes and token selection with fixed weights. Training predicts known positions, computes loss and gradients, and updates weights.'),('같은 Transformer도 입력이 주어지는 방식, 반복할 계산, 유지할 상태가 다르면 다른 워크로드가 됩니다.','The same Transformer forms different workloads when its inputs, repeated computation, and retained state differ.'))

    stages=[(('요청 도착 · 입력 준비','Request arrives · prepare input'),('텍스트를 토큰으로 바꾸고 요청 상태 생성','Tokenize text and create request state')),(('대기 큐','Waiting queue'),('도착한 요청이 실행 기회를 기다림','Arriving requests wait for an execution opportunity')),(('실행 대상 선택 · 자원 확인','Select work · check resources'),('이번 단계의 토큰 예산과 KV 공간을 함께 고려','Consider both the step token budget and KV capacity')),(('선택한 토큰을 배치로 실행','Execute selected tokens as a batch'),('요청별 문맥을 유지하며 모델 계산','Compute while preserving each request’s context')),(('다음 토큰 선택 · 상태 갱신','Select next tokens · update state'),('계산된 KV, 토큰 이력, 종료 조건을 갱신','Update KV, token history, and stop conditions')),(('출력 전달 · 완료/취소 정리','Deliver output · clean up ended requests'),('완료·취소 시 더 이상 필요 없는 자원 회수','Free unused resources after finish or cancellation'))]
    b=''
    for i,(title,body) in enumerate(stages):
        y=208+i*151
        b+=box(48,y,692,121,title,body)
        if i<5:b+=arrow(394,y+123,394,y+139)
    b+=box(816,208,336,162,('실행 전','Before execution'),('대기 요청 ≠ 진행 중 요청\n≠ 이번 배치의 요청','Waiting ≠ in progress\n≠ selected in this batch'),TEALF,TEAL)
    b+=box(816,420,336,238,('KV 공간 부족','KV space shortage'),('새 요청 진입을 늦추거나\n진행 요청 중단\n→ KV 회수 → 재개 대기','Delay admission, or\npreempt a request\n→ free KV → wait'),ORANGEF,ORANGE)
    b+=arrow(751,556,802,556)
    b+=text(816,714,('자원 확보와 선택은 함께 조정','Selection and allocation interact'),22,MUTED,width=336)
    b+=box(816,814,336,187,('미완료 요청','Unfinished requests'),('다음 단계의 선택으로 반복\n출력 전달은 계산과\n겹쳐 진행될 수도 있음','Return to selection\nOutput delivery may\noverlap with execution'),PURPLEF,PURPLE)
    b+=patharrow('M740,1019 H778 V510 H751')
    b+=text(48,1126,('단계 사이의 요청 관리입니다. GPU 커널을 중간에 끊는 흐름을 뜻하지 않습니다.','These are request-management steps, not interruptions of a running GPU kernel.'),22,MUTED,width=1104)
    save(a,'02-request-lifecycle',('요청 도착에서 종료까지','From request arrival to completion'),('개념적 실행 지도입니다. 선택·공간 확보·출력 전달의 세부 순서는 엔진마다 다릅니다.','A conceptual map; engines differ in how they order selection, allocation, and delivery.'),b,1172,('요청은 입력 준비와 대기를 거쳐 자원에 맞게 선택되어 실행되고 상태와 출력을 갱신합니다. 미완료 요청은 반복하고 KV 부족 시 진입 지연이나 중단과 회수로 처리합니다.','Requests wait after input preparation, are selected within resource limits, execute, and update state and output. Unfinished requests repeat; KV pressure can delay admission or trigger preemption and reclamation.'),('대기, 실행, 상태 관리, 출력 전달이 하나의 반복을 이룹니다. 실행 대상에서 빠지는 것과 KV 공간을 회수하는 것은 별개의 동작입니다.','Queueing, execution, state management, and delivery form a loop. Excluding a request from a batch and reclaiming its KV storage are separate actions.'))

    a='inference-kv-cache'
    b=note(198,('현재 상태: p0 p1 p2를 처리한 뒤 x0를 선택했습니다','Current state: p0 p1 p2 have been processed and x0 selected'),('이제 x0를 입력으로 사용해 x1을 선택할 차례입니다.','The next step consumes x0 to select x1.'))
    b+=text(48,365,('캐시 없이 다시 계산','Recompute without a cache'),27,BLUE,True)+text(642,365,('과거 KV 재사용','Reuse previously computed KV'),27,TEAL,True)
    for i,t in enumerate(['p0','p1','p2','x0']):
        b+=token(68+i*118,403,t,'new',102)
        b+=token(662+i*118,403,t,'old' if i<3 else 'new',102)
    b+=box(48,499,510,158,('모든 입력 위치를 다시 통과','Run every input position again'),('p0 p1 p2 x0의 projection · MLP\n과거 위치의 K/V도 다시 계산','Projections and MLP for p0 p1 p2 x0\nRecompute K/V at prior positions'),ORANGEF,ORANGE)
    b+=box(642,499,510,158,('새 입력 위치만 통과','Run only the new input position'),('x0의 projection · MLP\np0 p1 p2의 저장된 K/V는 재사용','Projections and MLP for x0\nReuse stored K/V for p0 p1 p2'),TEALF,TEAL)
    for x in [303,897]:b+=arrow(x,671,x,705)
    b+=box(48,720,510,130,('마지막 위치의 결과로 x1 선택','Final position → x1'),('과거 문맥을 다시 계산해 복원\n새 위치도 전체 과거를 참조','Recompute earlier context\nAttend to the full history'))
    b+=box(642,720,510,130,('새 Q는 누적 K/V를 참조','New Q attends to all K/V'),('Q(x0)와 K/V(p0 p1 p2 x0)\n마지막 위치의 결과로 x1 선택','Q(x0) and K/V(p0 p1 p2 x0)\nFinal position → x1'),TEALF,TEAL)
    b+=note(901,('미래 토큰은 과거 위치의 계산 결과를 바꾸지 않습니다','Future tokens do not change earlier positions’ results'),('인과적 어텐션과 고정된 모델 조건에서 각 층의 과거 K/V를 재사용합니다.','With causal attention and fixed model conditions, reuse each layer’s earlier K/V.'),112)
    b+=text(48,1064,('주황: 이번 계산 위치 · 초록: 저장된 KV · 칸 크기는 계산 시간과 무관','Orange: positions computed now · Green: reused KV · Cell sizes do not show runtime'),22,MUTED,width=1104)
    save(a,'01-reuse',('과거 계산을 반복하지 않는 KV 캐시','KV caching avoids repeating prior computation'),('한 요청의 다음 생성 단계를 비교합니다. p는 입력 토큰, x는 선택한 출력 토큰입니다.','Compare one request’s next step. p denotes prompt tokens; x denotes selected output tokens.'),b,1120,('캐시가 없으면 p0 p1 p2 x0의 계산을 반복합니다. KV 캐시가 있으면 x0만 새로 처리하고 x0의 Q가 저장된 과거 KV와 새 KV를 참조해 x1을 선택합니다.','Without caching, recompute p0 p1 p2 x0. With caching, process only x0 and let its Q attend to reused prior KV plus its new KV to select x1.'),('KV 캐시는 과거 위치의 projection·MLP 재계산을 줄입니다. 새 위치의 attention이 과거 K/V를 읽는 일은 여전히 필요합니다.','KV caching avoids re-running projections and MLPs at previous positions. Attention at the new position still reads the earlier K/V.'))

    b=text(48,214,('모델 실행을 마치고 다음 토큰을 선택한 직후의 상태','State immediately after model execution and next-token selection'),25,bold=True,width=1104)
    headers=[(48,214,('단계','Step')),(286,540,('입력·출력 토큰 이력','Prompt and output history')),(850,302,('방금 선택한 토큰','Just selected'))]
    for x,w,label in headers:b+=rect(x,254,w,57,'#E8EDF4')+text(x+17,291,label,23,bold=True,width=w-32)
    rows=[(('Prefill 이후','After prefill'),['p0','p1','p2','x0'],3,'x0'),(('Decode 이후','After decode'),['p0','p1','p2','x0','x1'],4,'x1'),(('다음 decode 이후','After next decode'),['p0','p1','p2','x0','x1','x2'],5,'x2')]
    for i,(label,toks,nkv,new) in enumerate(rows):
        y=348+i*204
        b+=text(48,y+38,label,23,bold=True,width=218)
        for j,t in enumerate(toks):b+=token(286+j*89,y,t,'old' if j<nkv else 'empty',79)
        b+=text(286,y+99,(f'KV 계산 완료: {nkv}개 위치',f'KV computed: {nkv} positions'),22,TEAL)
        b+=text(286,y+138,(f'다음 입력 후보: {new}',f'Next input if continuing: {new}'),22,ORANGE)
        b+=box(850,y,302,144,new,('선택은 끝남\n자기 K/V는 아직 없음','Already selected\nNo own K/V yet'),ORANGEF,ORANGE)
    b+=note(1001,('선택한 토큰 수와 KV가 준비된 위치 수는 다릅니다','Selected tokens and KV-ready positions are different counts'),('x2에서 종료하면 x2를 다음 모델 실행에 넣지 않아도 됩니다.','If generation stops at x2, no subsequent model execution on x2 is required.'),111)
    b+=text(48,1161,('초록 실선: 해당 위치의 KV 있음 · 회색 점선: 이력에는 있지만 KV는 아직 없음','Solid green: KV exists · Dashed gray: in history, but its KV is not ready'),22,MUTED,width=1104)
    save(a,'02-kv-frontier',('토큰 선택과 KV 계산의 경계','The boundary between token selection and KV computation'),('일반적인 한 토큰씩의 생성입니다. 첫 출력 x0는 prefill의 마지막 위치 logits에서 나옵니다.','Ordinary one-token generation: the first output x0 comes from the final prefill position’s logits.'),b,1216,('Prefill 후 p0 p1 p2의 KV와 선택된 x0가 있고 x0의 KV는 없습니다. 다음 단계는 x0의 KV를 만들고 x1을 선택하며, 이어 x1의 KV를 만들고 x2를 선택합니다.','After prefill, KV exists for p0 p1 p2 and x0 has been selected without its own KV. The next step computes KV for x0 and selects x1; the following step computes KV for x1 and selects x2.'),('선택한 토큰은 다음 모델 실행에서 입력이 되어야 자기 K/V가 계산됩니다. 요청이 그 전에 종료되면 그 마지막 토큰의 K/V를 만들 필요가 없습니다.','A selected token obtains its own K/V when consumed by the next model execution. If the request ends first, its last selected token need not receive K/V.'))

    a='prefill-and-decode'
    b=text(48,213,('Prefill: 한 요청, 입력 4개','Prefill: one request, four input tokens'),27,BLUE,True)
    for i,t in enumerate(['p0','p1','p2','p3']):b+=token(48+i*100,243,t,'new',86)
    b+=box(502,243,650,133,('토큰별 연산: T = 4','Token-wise operations: T = 4'),('Projection · MLP는 네 입력 위치를 계산\nAttention은 각 위치에서 과거·현재 K/V 참조','Projections and MLP compute four input positions\nEach query attends to its past and current K/V'))
    b+=text(48,418,('인과적 어텐션: 행은 Q, 열은 K/V 위치','Causal attention: Q rows, K/V columns'),22,MUTED)
    for j in range(4):b+=text(258+j*66,468,f'p{j}',20,anchor='middle')
    for i in range(4):
        b+=text(48,520+i*56,f'Q(p{i})',22)
        for j in range(4):b+=rect(232+j*66,488+i*56,51,42,TEALF if j<=i else '#F3F5F7')+text(257+j*66,517+i*56,'●' if j<=i else '—',21,TEAL if j<=i else MUTED,anchor='middle')
    b+=box(642,463,510,240,('여러 위치의 Q를 함께 계산','Compute Q for multiple positions'),('Q: [4, d] · K/V: [4, d]\n점수의 논리적 형태: [4, 4]\n미래 위치는 마스크로 제외','Q: [4, d] · K/V: [4, d]\nLogical score shape: [4, 4]\nFuture positions are masked out'),TEALF,TEAL)
    b+=text(48,779,('Decode: 요청 B개, 요청당 새 입력 1개','Decode: B requests, one new input each'),27,ORANGE,True)
    b+=box(48,808,510,196,('토큰별 연산: T = B','Token-wise operations: T = B'),('요청 A의 새 입력 x0\n요청 B의 새 입력 x0\n요청마다 독립적인 토큰·문맥','New input x0 for request A\nNew input x0 for request B\nIndependent tokens and contexts'),ORANGEF,ORANGE)
    b+=box(642,808,510,196,('요청마다 자기 누적 K/V 참조','Attend to this request’s K/V'),('요청당 Q: [1, d]\n요청당 K/V: [L, d]\n요청당 점수: [1, L]','Per-request Q: [1, d]\nPer-request K/V: [L, d]\nPer-request scores: [1, L]'),TEALF,TEAL)
    b+=note(1044,('T: 이번 계산 위치 수 · L: 한 요청이 참조하는 누적 문맥 길이','T: positions computed now · L: one request’s attended context length'),('한 head의 단순 차원입니다. L은 현재 위치를 포함하며 요청마다 다를 수 있습니다.','Shapes are for one head. L includes the current position and can differ by request.'),114)
    b+=text(48,1205,('● 참조할 위치 / — 미래라 제외. 점수 배열을 실제 메모리에 저장해야 한다는 뜻은 아닙니다.','● Attended / — Masked future. The logical score array need not be materialized in memory.'),22,MUTED,width=1104)
    save(a,'01-token-positions',('이번 계산 위치와 참조할 문맥','Positions computed now and context attended to'),('토큰별 연산에는 이번 위치 수가, attention에는 참조하는 문맥 길이도 중요합니다.','Token-wise work depends on current positions; attention also depends on context length.'),b,1260,('Prefill은 네 입력 위치의 projection과 MLP를 계산하고 삼각형 causal attention을 적용합니다. Decode는 요청마다 한 입력 위치만 계산하지만 각 Q는 자기 요청의 길이 L인 K/V를 참조합니다.','Prefill computes projections and MLPs at four input positions with triangular causal attention. Decode computes one new input position per request, while each Q attends to its own request’s K/V of length L.'),('Decode에서 새로 계산하는 위치 수는 요청당 하나입니다. 과거 위치의 토큰별 연산을 다시 하지 않아도, attention은 누적 문맥의 K/V를 읽습니다.','Decode computes one new position per request. Even without re-running token-wise operations at earlier positions, attention reads K/V across the accumulated context.'))

    b=note(197,('선형 연산: X[T, d_in] × W[d_in, d_out] → Y[T, d_out]','Linear operation: X[T, d_in] × W[d_in, d_out] → Y[T, d_out]'),('T는 이번에 이 연산을 통과하는 토큰 위치 수입니다.','T counts the token positions passing through this operation now.'),110)
    for x,t,label in [(48,1,('한 토큰으로 W 사용','Use W for one token')),(642,4,('여러 토큰에 같은 W 재사용','Reuse the same W across tokens'))]:
        b+=text(x,366,label,26,bold=True,width=510)
        b+=box(x,401,510,137,f'T = {t}',('한 요청만 실행하는 decode 예','Decode with only one request') if t==1 else ('여러 prefill 토큰 또는 여러 요청의 decode','Multiple prefill tokens or batched decode'),BLUEF,BLUE)
        b+=rect(x+160,580,190,110,PURPLEF,PURPLE)+text(x+255,625,'W',32,PURPLE,True,anchor='middle')+text(x+255,665,'d_in × d_out',23,PURPLE,anchor='middle')
        for j in range(t):
            xx=x+47+(j*116 if t>1 else 168)
            b+=token(xx,758,f't{j}','new',80)
            b+=arrow(x+255,704,xx+40,745)
        b+=text(x+255,860,('동일한 가중치 크기','Same weight size'),24,PURPLE,True,anchor='middle')
    b+=rect(48,909,1104,155,'#F5F7FA')+text(70,948,('연산량 ≈ 2T × d_in × d_out','FLOPs ≈ 2T × d_in × d_out'),25,bold=True)+text(70,990,('가중치 읽기량 ≈ s × d_in × d_out','Weight bytes ≈ s × d_in × d_out'),25,bold=True)+text(70,1037,('가중치 읽기만 고려한 비율 ≈ 2T/s FLOP/byte (s: 가중치 원소당 바이트)','Weight-only ratio ≈ 2T/s FLOP/byte (s: bytes per weight element)'),22)
    b+=text(48,1110,('가중치 이동이 지배적이라는 근사입니다. 입력·출력 이동, 캐시·타일링, 실제 실행 효율은 생략했습니다.','Approximation for weight-dominated traffic; input/output traffic, caching, tiling, and execution efficiency are omitted.'),22,MUTED,width=1104)
    b+=text(48,1187,('화살표는 재사용 관계입니다. GPU 내부의 실제 데이터 이동 경로나 속도 측정이 아닙니다.','Arrows show reuse, not a physical GPU data path or measured speed.'),22,MUTED,width=1104)
    save(a,'02-weight-reuse',('같은 가중치로 더 많은 토큰 계산하기','Compute more tokens with the same weights'),('T가 늘면 가중치 한 벌을 읽어 수행하는 연산량이 늘어납니다.','Larger T provides more computation per set of weights read.'),b,1240,('T가 1인 경우 가중치 W를 한 토큰에 쓰고 T가 4이면 같은 W를 네 토큰에 재사용합니다. 가중치 읽기만 고려한 산술 집약도는 원소당 s바이트일 때 약 2T/s입니다.','With T=1, W is used for one token; with T=4, the same W is reused across four tokens. Considering weight reads alone gives an arithmetic-intensity approximation of 2T/s for s bytes per weight element.'),('가중치 크기가 같아도 이번에 함께 처리하는 토큰 수가 많으면 재사용이 늘어납니다. 이 비율은 선형 연산의 직관용 근사이며 모델 전체의 정확한 산술 집약도는 아닙니다.','Even with the same weight size, processing more token positions together increases reuse. This ratio is an intuition for a linear operation, not the exact arithmetic intensity of the entire model.'))

    b=text(48,220,('가중치 읽기','Read model weights'),28,PURPLE,True)+text(642,220,('KV 읽기','Read request KV'),28,TEAL,True)
    b+=box(48,253,510,170,('요청들이 같은 W를 사용','Requests use the same W'),('동일한 모델·가중치의 요청을 배칭\n토큰을 더 모으면 가중치 재사용 증가','Batch requests using the same weights\nMore tokens increase weight reuse'),PURPLEF,PURPLE)
    b+=box(642,253,510,170,('요청마다 자기 문맥을 사용','One context per request'),('A는 KV(A), B는 KV(B), C는 KV(C)\n요청이 늘면 읽을 KV도 늘어남','A uses KV(A), B uses KV(B), C uses KV(C)\nMore requests also add KV to read'),TEALF,TEAL)
    b+=rect(207,468,190,91,PURPLEF,PURPLE)+text(302,526,'W',31,PURPLE,True,anchor='middle')
    for i,t in enumerate(['A','B','C']):
        xx=48+i*186
        b+=token(xx+7,638,t,'plain',115)+arrow(302,573,xx+64,624)
        xx2=642+i*174
        b+=rect(xx2,468,160,91,TEALF,TEAL)+text(xx2+80,523,f'KV({t})',25,TEAL,True,anchor='middle')
        b+=token(xx2+22,638,t,'plain',115)+arrow(xx2+80,573,xx2+80,624)
    b+=text(48,750,('같은 W를 여러 새 토큰에 재사용','Reuse the same W across new tokens'),24,PURPLE,True,width=510)
    b+=text(642,750,('독립된 문맥은 서로 합쳐 참조하지 않음','Independent contexts are not attended as one'),24,TEAL,True,width=510)
    b+=note(828,('작은 배치의 decode: 적은 연산에 비해 많은 가중치·KV를 읽기 쉽습니다','Small-batch decode can read many weight/KV bytes for relatively few FLOPs'),('문맥이 길어지면 요청별 KV 읽기도 커집니다. 배칭의 이득은 무한히 늘지 않습니다.','Longer contexts add KV traffic per request. Batching gains do not grow without limit.'),122)
    b+=note(990,('메모리 대역폭의 한계와 저장 공간 부족을 구별합니다','Distinguish memory bandwidth limits from insufficient capacity'),('읽는 속도가 병목인 것과 KV를 저장할 공간이 모자라는 것은 다른 문제입니다.','Being limited by reading speed differs from running out of space to store KV.'),120)
    b+=text(48,1160,('기본 예시: 독립적인 KV, prefix 공유 없음. 실제 병목은 T·문맥 길이·정밀도·모델·하드웨어에 따라 달라집니다.','Baseline: independent KV, no prefix sharing. The bottleneck varies with T, context length, precision, model, and hardware.'),22,MUTED,width=1104)
    save(a,'03-memory-reads',('가중치 재사용과 KV 읽기는 다릅니다','Weight reuse and KV reads behave differently'),('각 요청은 이번 decode에서 새 입력 하나를 처리합니다. 화살표는 데이터 의존 관계입니다.','Each request consumes one new input in this decode step. Arrows denote data dependencies.'),b,1234,('요청 A B C는 동일한 가중치 W를 재사용하지만 자기 요청의 독립된 KV를 각각 읽습니다. 배칭은 가중치 재사용을 늘려도 누적 문맥을 읽는 비용을 없애지 않습니다.','Requests A, B, and C reuse the same weights W, but each reads its own independent KV. Batching improves weight reuse without removing the cost of reading accumulated context.'),('작은 배치의 decode에서는 가중치와 누적 K/V의 읽기 비용을 함께 봐야 합니다. 가중치는 요청 간 재사용할 수 있지만 독립적인 KV는 요청 수와 문맥 길이에 따라 늘어납니다.','For small-batch decode, consider both weight and accumulated K/V reads. Weights can be reused across requests, whereas independent KV grows with request count and context length.'))

assert len(MANIFEST) == 14
for article in {f['article'] for f in MANIFEST}:
    ko = [(f['slug'],f['width'],f['height']) for f in MANIFEST if f['article']==article and f['locale']=='ko']
    en = [(f['slug'],f['width'],f['height']) for f in MANIFEST if f['article']==article and f['locale']=='en']
    assert ko == en
(ROOT/'scripts/inference-core-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
print(f'Generated {len(MANIFEST)} original bilingual SVGs.')
