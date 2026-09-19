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

assert (2+6)/2 == 4 and 10-0.1*4 == 9.6
for LANG in ['ko','en']:
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


assert len(MANIFEST)==6
print('Generated six DP SVGs.')
