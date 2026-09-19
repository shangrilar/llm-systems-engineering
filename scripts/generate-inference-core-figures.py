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
    b=text(48,219,('추론: 다음 토큰을 생성','Inference: generate the next token'),29,BLUE,True)
    b+=box(48,267,310,126,('요청의 입력','Request input'),'p0  p1  p2')
    b+=box(442,267,290,126,('모델','Model'),('가중치 W 유지\n예측 점수 계산','Fixed weights W\nCompute scores'))
    b+=box(816,267,336,150,('다음 토큰 선택','Next token'),('마지막 위치의 점수로\nx0 선택','Final-position scores\nselect x0'),ORANGEF,ORANGE)
    b+=arrow(368,330,432,330)+arrow(742,330,806,330)
    b+=patharrow('M984,425 V466 H394 V362 H432')
    b+=text(442,507,('계속 생성하면 x0가 다음 입력','If continuing, x0 is the next input'),25,BLUE,width=710)
    b+=f'<path d="M48,543 H1152" stroke="{LINE}"/>'

    b+=text(48,595,('학습: 알려진 정답으로 모델을 갱신','Training: update the model using known targets'),29,TEAL,True)
    b+=text(48,637,('학습 데이터 p0 p1 p2 p3에서 입력과 다음 위치의 정답을 가져옵니다.','Training data p0 p1 p2 p3 supplies both inputs and next-position targets.'),24,MUTED,width=1104)
    b+=box(48,684,310,126,('학습 입력','Training input'),'p0  p1  p2',TEALF,TEAL)
    b+=box(442,684,290,126,('모델','Model'),('가중치 W로 계산\n각 위치의 점수 계산','Use weights W\nCompute predictions'),TEALF,TEAL)
    b+=box(816,684,336,126,('위치별 예측 점수','Predictions'),('p0 · p1 · p2 각각의\n후보 토큰별 점수','Vocabulary scores\nat p0, p1, and p2'),TEALF,TEAL)
    b+=arrow(368,747,432,747)+arrow(742,747,806,747)
    b+=text(48,867,('각 입력 위치는 현재와\n앞선 위치만 참조합니다.','No input position sees\nfuture positions.'),24,MUTED,width=310)
    b+=box(896,867,256,126,('데이터의 정답','Known targets'),'p1  p2  p3',PURPLEF,PURPLE)
    b+=arrow(840,820,840,1027)+arrow(1024,1003,1024,1027)
    b+=box(816,1037,336,126,('손실','Loss'),('위치별 예측 점수와\n정답을 비교','Compare position scores\nwith their targets'),TEALF,TEAL)
    b+=arrow(984,1173,984,1190)
    b+=box(816,1200,336,110,('역전파','Backward pass'),('손실에서 기울기 계산','Compute gradients'),TEALF,TEAL)
    b+=arrow(806,1255,742,1255)
    b+=box(442,1200,290,110,('가중치 갱신','Update weights'),('기울기로 W 갱신','Use the gradients'),TEALF,TEAL)
    b+=arrow(587,1190,587,820)
    b+=text(48,1235,('가중치를 갱신한 뒤\n다음 학습 배치를 처리합니다.','Update W, then process\nthe next batch.'),24,TEAL,width=310)
    b+=text(48,1370,('화살표는 계산과 데이터가 이어지는 경로입니다. 길이는 실행 시간을 뜻하지 않습니다.','Arrows connect computations and data; their lengths do not represent execution time.'),22,MUTED,width=1104)
    save(a,'01-execution',('추론은 토큰을 생성하고, 학습은 모델을 갱신합니다','Inference generates tokens; training updates the model'),('동일한 입력 p0 p1 p2가 모델을 통과한 뒤, 결과를 사용하는 방식이 달라집니다.','After the same input p0 p1 p2 passes through the model, its outputs serve different purposes.'),b,1420,('추론에서는 입력 p0 p1 p2가 고정된 가중치의 모델을 통과하고 마지막 위치의 점수로 x0를 선택합니다. 계속 생성하면 x0가 다음 입력입니다. 학습에서는 입력 p0 p1 p2의 위치별 예측 점수와 데이터의 정답 p1 p2 p3를 손실에서 비교합니다. 손실로부터 역전파해 기울기를 구하고 모델 가중치를 갱신합니다.','In inference, input p0 p1 p2 passes through the fixed-weight model and final-position scores select x0, which becomes the next input if generation continues. In training, loss compares predictions at p0 p1 p2 with targets p1 p2 p3 from the data. Backpropagation computes gradients used to update model weights.'),('추론은 예측 점수에서 다음 토큰을 선택합니다. 학습은 각 위치의 예측 점수와 알려진 정답으로 손실을 구하고, 역전파와 가중치 갱신으로 이어집니다.','Inference selects the next token from prediction scores. Training uses each position’s scores and known target to compute loss, followed by backpropagation and a weight update.'))

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

    b=text(48,219,('학습','Training'),29,TEAL,True)+text(642,219,('추론','Inference'),29,BLUE,True)
    b+=box(48,255,510,126,('모델 가중치 W','Model weights W'),('한 배치의 입력들이 함께 사용\n가중치 갱신의 대상','Shared by inputs in a batch\nUpdated during training'))
    b+=box(642,255,510,126,('모델 가중치 W','Model weights W'),('여러 요청이 함께 사용\n생성 동안 가중치 유지','Shared by multiple requests\nKept fixed during generation'))
    b+=text(48,433,('가중치 갱신을 위해 유지','Retained for weight updates'),26,TEAL,True,width=510)
    b+=text(642,433,('이후 생성을 위해 유지','Retained for later generation'),26,ORANGE,True,width=510)
    b+=box(48,470,510,132,('저장 활성값','Saved activations'),('순전파에서 만든 중간값\n역전파의 기울기 계산에 사용','Forward-pass intermediate values\nRetained for backward'),TEALF,TEAL)
    b+=box(48,622,510,132,('그레디언트','Gradients'),('역전파로 계산한 기울기\n가중치 갱신에 사용','Computed by backpropagation\nUsed to update the weights'),TEALF,TEAL)
    b+=box(48,774,510,132,('옵티마이저 상태','Optimizer state'),('업데이트에 쓰는 누적 통계 등\n옵티마이저에 따라 구성이 달라짐','Running statistics, for example\nContents depend on the optimizer'),TEALF,TEAL)
    b+=box(642,470,510,132,('KV 캐시','KV cache'),('처리한 토큰에서 계산한 K와 V\n이후 생성에서 다시 읽기 위해 보관','K and V from processed tokens\nReused in later generation'),ORANGEF,ORANGE)
    b+=text(642,661,('요청의 문맥을 이어 가는 상태','State for a request’s context'),25,ORANGE,True,width=510)
    b+=text(642,714,('더 많은 요청을 동시에 유지하거나\n더 긴 문맥을 보관하면\nKV에 필요한 저장 공간이 늘어납니다.','Keeping more requests active\nor retaining longer contexts\nincreases the space needed for KV.'),24,width=510)
    b+=note(955,('양쪽 모두 실행 중 중간값과 작업 공간이 필요합니다','Both also need intermediate values and workspace'),('추론도 실행 중 활성값을 만듭니다. 역전파를 위해 보관하지 않는다는 점이 다릅니다.','Inference also creates activations during execution, without retaining them for backpropagation.'),142)
    b+=text(48,1141,('카드는 저장 역할을 설명하며, 독립된 메모리 영역의 분할이나 실제 사용량·비율을 나타내지 않습니다.','Cards explain storage roles, not a partition into separate memory regions or actual amounts and proportions.'),22,MUTED,width=1104)
    b+=text(48,1204,('전체 가중치 학습과 KV 캐시 생성의 GPU 내 기본 구성입니다. 세부 저장 방식은 달라질 수 있습니다.','Typical full-parameter training and generation with KV caching, with state on the GPU. Storage choices can vary.'),22,MUTED,width=1104)
    save(a,'03-memory-state',('학습과 추론에서 사용하는 GPU 메모리','GPU memory in training and inference'),('둘 다 모델 가중치를 사용하지만, 다음 계산을 위해 보관하는 상태는 다릅니다.','Both use model weights, but retain different state for the computations that follow.'),b,1250,('학습과 추론 모두 모델 가중치를 GPU 메모리에 둡니다. 학습은 역전파용 활성값, 그레디언트, 옵티마이저 상태를 유지하고 추론은 이후 생성에 재사용할 KV 캐시를 유지합니다. 두 실행 모두 중간값과 작업 공간이 필요합니다. 카드는 저장 목적을 비교하며 사용량과 비율을 나타내지 않습니다.','Both training and inference store model weights in GPU memory. Training retains activations for backpropagation, gradients, and optimizer state; inference retains KV for later generation. Both also need intermediate values and workspace. Cards compare storage roles, not memory amounts or proportions.'),('가중치는 두 실행에 공통으로 필요합니다. 학습은 가중치 갱신에 필요한 상태를, 추론은 이후 생성에 재사용할 KV를 보관하며, 둘 다 계산 중 중간값과 작업 공간을 사용합니다.','Weights are needed in both workloads. Training retains state for weight updates, inference retains KV for later generation, and both use intermediate values and workspace while executing.'))

assert len(MANIFEST) == 6
for article in {f['article'] for f in MANIFEST}:
    ko = [(f['slug'],f['width'],f['height']) for f in MANIFEST if f['article']==article and f['locale']=='ko']
    en = [(f['slug'],f['width'],f['height']) for f in MANIFEST if f['article']==article and f['locale']=='en']
    assert ko == en
(ROOT/'scripts/inference-core-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
print(f'Generated {len(MANIFEST)} original bilingual SVGs.')
