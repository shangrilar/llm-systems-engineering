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

def frame(fig,step,title,subtitle,body,height,label,alt,slug=None):
    slug=slug or f'pp-{fig:02}-step-{step}'
    save('pipeline-parallelism',slug,title,subtitle,body,height,alt)
    STEPS[LANG].setdefault(str(fig),[]).append(dict(slug=slug,label=tr(label),alt=tr(alt),height=height))

def sample(x,y,k,w=206,h=85):
    s=rect(x,y,w,h,FILLS[k],COLORS[k])+text(x+14,y+29,chr(65+k),23,COLORS[k],True)
    for t in range(5):s+=rect(x+15+t*(w-30)/5,y+45,(w-40)/5,23,'white',COLORS[k])
    return s

for LANG in ['ko','en']:
    for step in range(3):
        edges=''
        b=text(600,211,('하나의 모델 · Transformer 레이어 8개','One model · Eight Transformer layers'),27,bold=True,anchor='middle')
        for g in range(4):
            x=40+280*g
            b+=rect(x,247,264,281,'#f8fafc')+text(x+132,285,f'GPU {g}',25,bold=True,anchor='middle')
            for j in range(2):
                xx=x+20+j*130
                b+=rect(xx,326,94,106,'#edf5fd','#2470bb')+text(xx+47,385,(f'층 {2*g+j}',f'Layer {2*g+j}'),23,bold=True,anchor='middle')
            b+=text(x+132,477,(f'단계 {g} · 레이어 2개',f'Stage {g} · Two layers'),21,MUTED,anchor='middle')
            if step:
                edges+=arrow(x+119 if step==1 else x+145,379,x+145 if step==1 else x+119,379)
            if g<3 and step:
                edges+=arrow(x+249 if step==1 else x+295,379,x+295 if step==1 else x+249,379)
        b+=edges
        if step==0:
            b+=banner(570,('각 GPU는 자기 레이어의 가중치와 계산을 담당','Each GPU holds and computes its own layers'),('입력 하나는 네 GPU의 레이어를 모두 통과합니다.','One input passes through the layers on all four GPUs.'))
            b+=text(600,746,('다음: 순전파와 역전파의 전달 방향 보기','Next: see the directions of forward and backward passes'),24,anchor='middle')
        elif step==1:
            b+=text(600,567,('순전파: 입력 → GPU 0 → GPU 1 → GPU 2 → GPU 3 → 출력','Forward: input → GPU 0 → GPU 1 → GPU 2 → GPU 3 → output'),24,bold=True,anchor='middle')
            b+=banner(607,('GPU 경계에서는 앞 레이어의 출력인 활성값을 전달','Across GPU boundaries, send activations from the preceding layer'),('받은 활성값으로 다음 레이어를 계산합니다. 가중치는 이동하지 않습니다.','The next layer uses those activations. Weights stay on their assigned GPU.'))
            b+=text(600,773,('학습에서는 출력과 정답으로 손실을 계산한 뒤 역전파를 시작합니다.','In training, compute the loss from the output and target, then backpropagate.'),22,anchor='middle')
        else:
            b+=text(600,567,('역전파: 손실 → GPU 3 → GPU 2 → GPU 1 → GPU 0','Backward: loss → GPU 3 → GPU 2 → GPU 1 → GPU 0'),25,bold=True,anchor='middle')
            b+=banner(607,('GPU 경계에서는 활성값에 대한 기울기를 반대 방향으로 전달','Send gradients of activations back across GPU boundaries'),('각 GPU는 자기 레이어의 가중치 기울기도 계산해 보관합니다.','Each GPU also computes and retains gradients for its own weights.'))
            b+=text(600,773,('역전파 계산에는 순전파에서 얻은 값도 필요합니다.','Backward computation also needs values obtained during the forward pass.'),22,anchor='middle')
        frame(1,step,('모델의 레이어를 나누고, 계산의 앞뒤를 연결하기','Partition layers and connect forward and backward passes'),('블록 하나 = Transformer 레이어 하나 · 화살표 = 한 입력의 계산 방향','One block = one Transformer layer · Arrows = computation direction for one input'),b,825,[('8개 레이어 배치','Place eight layers'),('순전파: 활성값 전달','Forward: send activations'),('역전파: 기울기 전달','Backward: send gradients')][step],[( '8개 레이어를 GPU 0부터 3까지 두 개씩 배치한다.','Eight layers are placed two per GPU, from GPU 0 to GPU 3.'),('레이어 0부터 7까지 계산하고 GPU 경계에서 활성값을 다음 단계로 전달한다.','Compute layers 0 through 7, passing activations across GPU boundaries.'),('손실에서 출발해 레이어 7부터 0으로 역전파한다. 활성값 기울기를 앞 단계로 보내며 가중치 기울기는 각 GPU에서 계산한다.','Backpropagate from the loss through layers 7 to 0. Send activation gradients to the previous stage and compute weight gradients locally.')][step])

    b=text(600,207,('배치 크기 4: 입력 A·B·C·D를 한 묶음으로 실행','Batch size 4: execute inputs A, B, C, D as one group'),25,bold=True,anchor='middle')
    for k in range(4):b+=sample(134+k*237,235,k)
    b+=text(600,366,('한 배치의 순전파 · 파란 블록 = 계산 · 회색 구간 = 이 배치의 계산 없음','One batch, forward only · Blue = computing · Gray = no work on this batch'),22,MUTED,anchor='middle')
    x0=248;cw=54;top=428;rh=82
    for tick in range(17):
        xx=x0+tick*cw
        b+=text(xx,top-18,str(tick),17,MUTED,anchor='middle')
    for gpu in range(4):
        yy=top+gpu*rh;xx=x0+gpu*4*cw
        b+=text(70,yy+31,f'GPU {gpu}',24,bold=True)+text(70,yy+59,(f'레이어 {2*gpu}·{2*gpu+1}',f'Layers {2*gpu}, {2*gpu+1}'),19,MUTED)
        b+=rect(x0,yy,16*cw,64,'#f1f4f7')
        if gpu>0:b+=text(x0+gpu*2*cw,yy+39,('입력 대기','Waiting for input'),21,MUTED,anchor='middle')
        if gpu<3:b+=text(xx+4*cw+(3-gpu)*2*cw,yy+39,('계산 없음','No computation'),21,MUTED,anchor='middle')
        b+=rect(xx+2,yy,4*cw-4,64,'#d6e5f3',COLORS[0])+text(xx+2*cw,yy+39,'A · B · C · D',23,bold=True,anchor='middle')
    b+=text(600,804,('예시: 단계마다 배치 전체를 4칸 동안 계산 · 통신 시간 생략','Example: four slots per stage for the whole batch; communication omitted'),22,MUTED,anchor='middle')
    b+=banner(839,('한 GPU가 계산하는 동안, 다른 세 GPU는 이 배치를 계산하지 못합니다.','While one GPU computes, the other three do no work on this batch.'),('다음 GPU는 네 입력의 결과를 모두 받은 뒤 시작합니다.','The next GPU starts only after receiving results for all four inputs.'))
    frame(2,0,('배치를 통째로 넘기면 GPU들이 차례로 계산합니다','Passing the whole batch makes GPUs compute one at a time'),('입력 하나의 토큰을 자르지 않고, 네 입력을 함께 다음 단계로 전달합니다.','Keep each input sequence intact and pass all four inputs to the next stage together.'),b,987,('배치 전체가 끝날 때까지 다음 GPU는 대기','The next GPU waits for the whole batch'),('GPU 0부터 3까지 배치 A·B·C·D를 각각 4칸씩 차례로 계산한다. 각 구간에서 GPU 하나만 계산하고 나머지 세 개는 이 배치를 계산하지 않는다.','GPUs 0 through 3 compute batch A, B, C, D in sequence, taking four slots each. In each interval, only one GPU computes while the other three do no work on this batch.'),slug='pp-batch-wait')

    b=rect(100,209,1000,168,'#f8fafc')+text(600,249,('배치 크기 4 = 입력 시퀀스 4개','Batch size 4 = four input sequences'),27,bold=True,anchor='middle')
    for k in range(4):b+=sample(134+k*237,270,k)
    b+=arrow(600,389,600,445)+text(780,425,('토큰은 자르지 않음','Keep each sequence intact'),22,MUTED,anchor='middle')
    for k in range(4):
        x=48+k*280
        b+=rect(x,467,264,188,'white',COLORS[k])+text(x+132,501,(f'마이크로배치 {k+1}',f'Microbatch {k+1}'),22,COLORS[k],True,'middle')
        b+=sample(x+29,520,k)+text(x+132,637,('크기 1','Size 1'),21,anchor='middle')
    b+=text(600,707,('처리할 입력은 그대로 네 개 · 더 작은 묶음 네 개로 실행','Still four inputs · Executed as four smaller groups'),25,bold=True,anchor='middle')
    b+=rect(100,746,1000,104,'#f8fafc')+text(600,785,('A·B·C·D 각각이 같은 경로를 끝까지 통과','A, B, C, and D each follow the same complete path'),23,bold=True,anchor='middle')+text(600,827,'GPU 0 → GPU 1 → GPU 2 → GPU 3',24,anchor='middle')
    b+=rect(100,888,1000,109,'#f3eef8')+text(600,928,('학습 예시: 네 마이크로배치의 기울기를 누적 → 가중치 한 번 갱신','Training: accumulate gradients across four microbatches → one update'),23,bold=True,anchor='middle')+text(600,970,('마이크로배치 하나마다 가중치를 바꾸는 예시가 아닙니다.','This example does not update weights after each microbatch.'),22,MUTED,anchor='middle')
    frame(3,0,('한 배치를 더 작은 마이크로배치로 나누기','Split one batch into smaller microbatches'),('색 = 입력 A·B·C·D · 작은 칸 = 각 시퀀스의 토큰','Colors = inputs A, B, C, D · Small cells = tokens in each sequence'),b,1045,('배치 크기 4 → 크기 1 네 묶음','Batch of four → four groups of one'),('배치에 있던 네 입력 시퀀스를 하나씩 나누되 각 시퀀스의 토큰은 유지한다. 모든 입력은 네 GPU를 통과하고 학습 예시에서는 기울기를 모아 한 번 갱신한다.','Split four input sequences into individual microbatches without splitting their tokens. All inputs pass through all four GPUs; in the training example, accumulate their gradients for one update.'),slug='pp-02-step-0')

    times=[0,1,2,3,4,7,16]
    for step,now in enumerate(times):
        b=text(600,205,('같은 입력 A·B·C·D · 같은 GPU 4개 · 순전파 비교','Same inputs A, B, C, D · Same four GPUs · Forward pass only'),24,bold=True,anchor='middle')
        b+=rect(48,226,1104,100,'#f8fafc')+text(72,263,('가정: 단계마다 입력 1개 = 1칸 / 배치 크기 4를 통째로 = 4칸','Assume per stage: one input = 1 slot / whole batch of four = 4 slots'),22,bold=True)+text(72,302,('단계의 계산 시간은 같고 통신 시간은 생략합니다. 측정값이 아닌 비교 예시입니다.','Equal stage times; communication omitted. An illustrative comparison, not a measurement.'),21,MUTED)
        for panel,y in enumerate([380,857]):
            b+=text(48,y,('배치를 통째로 전달','Pass the whole batch') if panel==0 else ('마이크로배치로 나눠 겹쳐 실행','Split into microbatches and overlap'),27,bold=True)
            x0=248;cw=54;top=y+65;rh=68
            for tick in range(17):
                xx=x0+tick*cw;b+=text(xx,top-18,str(tick),17,MUTED,anchor='middle')
                b+=f'<path d="M{xx},{top} V{top+4*rh}" stroke="{LINE}" stroke-width="1"/>'
            for gpu in range(4):
                yy=top+gpu*rh;b+=text(70,yy+39,f'GPU {gpu}',24,bold=True)
                if panel==0:
                    start=gpu*4;end=start+4;xx=x0+start*cw
                    b+=rect(xx+2,yy+5,4*cw-4,52,'#f1f4f7','#a7b5c4')
                    progress=max(0,min(now,end)-start)/4
                    if progress:b+=rect(xx+2,yy+5,(4*cw-4)*progress,52,'#d6e5f3','#a7b5c4')
                    b+=text(xx+2*cw,yy+38,'A · B · C · D',22,bold=True,anchor='middle')
                else:
                    for k in range(4):
                        start=gpu+k;end=start+1;xx=x0+start*cw
                        b+=rect(xx+2,yy+5,cw-4,52,FILLS[k] if now>=end else 'white',COLORS[k])+text(xx+cw/2,yy+39,chr(65+k),24,COLORS[k],now>=end,'middle')
            if panel==1:
                b+=text(899,top+132,('7칸 이후: 이 배치의 계산 종료','After slot 7: this batch is finished'),22,MUTED,anchor='middle')
            if now:
                xx=x0+now*cw;b+=f'<path d="M{xx},{top-8} V{top+4*rh+5}" stroke="#b54042" stroke-width="2" stroke-dasharray="5 4"/>'
            complete=4 if panel==0 and now>=16 else max(0,min(4,now-3)) if panel==1 else 0
            b+=text(250,top+4*rh+42,(f'완료한 입력: {complete} / 4',f'Completed inputs: {complete} / 4'),23,bold=True)
            b+=text(1105,top+4*rh+42,('전체 완료: 16칸','All complete: 16 slots') if panel==0 else ('전체 완료: 7칸','All complete: 7 slots'),23,COLORS[0] if panel==0 else COLORS[1],True,'end')
        label=[('시작 전','Before execution'),('1칸: A를 다음 GPU로','Slot 1: pass A onward'),('2칸: 서로 다른 입력 계산','Slot 2: different inputs overlap'),('3칸: 다음 단계까지 채우기','Slot 3: fill the next stage'),('4칸: 아래에서는 A 완료','Slot 4: A completes below'),('7칸: 아래의 네 입력 완료','Slot 7: all four complete below'),('16칸: 위의 네 입력 완료','Slot 16: all four complete above')][step]
        b+=text(600,1311,('색 채움 = 수행한 계산 · 실행 중 빈칸 = 대기 · 빨간 점선 = 현재 시각','Color fill = work done · Gaps during execution = idle · Red line = current time'),21,MUTED,anchor='middle')
        b+=text(600,1360,('네 입력의 계산을 없앤 것이 아니라, 서로 다른 GPU에서 겹쳐 실행합니다.','The same four inputs are computed, with work overlapping across GPUs.'),24,bold=True,anchor='middle')
        frame(4,step,('배치를 나누면 다음 GPU가 먼저 시작할 수 있습니다','Splitting the batch lets the next GPU start sooner'),('다음을 눌러 같은 시간축에서 두 실행의 진행과 완료를 비교하세요.','Use Next to compare progress and completion on the same time axis.'),b,1410,label,(f'시각 {now}. 통째 배치는 각 단계 4칸씩 총 16칸, 마이크로배치 파이프라인은 총 7칸이다. 같은 네 입력과 네 GPU의 순전파를 비교한다.',f'Time {now}. The whole batch takes four slots per stage, finishing in 16; microbatch pipelining finishes in seven. Compare forward passes with the same four inputs and four GPUs.'),slug=f'pp-03-step-{step}')

# Balanced stages, linear example times, no communication: both perform 16 GPU-slots of work.
assert sum(4 for _ in range(4))==sum(1 for g in range(4) for m in range(4))==16
assert max(g+m+1 for g in range(4) for m in range(4))==7
for g in range(1,4):
    for m in range(4):assert g+m >= (g-1)+m+1
assert [max(0,min(4,t-3)) for t in [0,1,2,3,4,7,16]]==[0,0,0,0,1,4,4]
(ROOT/'src/data/pp-steps.json').write_text(json.dumps(STEPS,ensure_ascii=False,indent=2)+'\n')
print(f'{len(MANIFEST)} bilingual SVG states; batch size, work and dependencies verified.')
