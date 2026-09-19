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

def path_arrow(points,color=MUTED):
    d='M'+' L'.join(f'{x},{y}' for x,y in points)
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="3" marker-end="url(#arrow)"/>'
def chip(cx,y,label,k,w=140):
    return rect(cx-w/2,y,w,44,FILLS[k%4],COLORS[k%4])+text(cx,y+29,label,22,COLORS[k%4],True,'middle')
def centered_box(cx,y,w,h,title,body='',fill='#f8fafc'):
    return rect(cx-w/2,y,w,h,fill)+text(cx,y+34,title,24,bold=True,anchor='middle')+text(cx,y+68,body,21,MUTED,anchor='middle')
def gpu_columns(height):
    return ''.join(rect(x,205,480,height,'#fbfcfd')+text(x+240,249,f'GPU {g}',29,bold=True,anchor='middle') for g,x in enumerate([48,672]))
def frame(fig,step,title,subtitle,b,height,label,alt):
    slug=f'ep-{fig:02}-step-{step}'
    save('expert-parallelism',slug,title,subtitle,b,height,alt)
    STEPS[LANG].setdefault(str(fig),[]).append(dict(slug=slug,label=tr(label),alt=tr(alt),height=height))
CENTERS=[180,396,804,1020]
TOKENS=['A1','A2','B1','B2']
ROUTES=[0,2,1,2]
def experts(y,h=194):
    return ''.join(rect(cx-98,y,196,h,'white')+text(cx,y+36,f'E{e}',27,bold=True,anchor='middle') for e,cx in enumerate(CENTERS))
def dispatch_edges(y0,y1):
    return path_arrow([(180,y0),(180,y1)],COLORS[0])+path_arrow([(396,y0),(396,y0+34),(780,y0+34),(780,y1)],COLORS[1])+path_arrow([(804,y0),(804,y0+86),(420,y0+86),(420,y1)],COLORS[2])+path_arrow([(1020,y0),(1020,y0+135),(844,y0+135),(844,y1)],COLORS[3])
for LANG in ['ko','en']:
    # Figure 1: model placement on the SAME two GPUs; routes are schematic.
    b=gpu_columns(1275)
    for g,cx in enumerate([288,912]):
        seq='A' if g==0 else 'B'
        b+=text(cx,289,(f'입력 시퀀스 {seq}',f'Input sequence {seq}'),23,bold=True,anchor='middle')
        for j in range(2):b+=chip(CENTERS[g*2+j],310,TOKENS[g*2+j],g*2+j)
        b+=arrow(cx,361,cx,393)
        b+=centered_box(cx,401,420,101,('어텐션 등 공통 부분 · DP','Attention / common layers · DP'),('같은 가중치의 복제본','Replicas of the same weights'),'#eef5fb')
        b+=arrow(cx,509,cx,541)
        b+=centered_box(cx,548,326,84,'Router',('자기 토큰의 Expert 선택','Select experts for local tokens'),'#edf7f5')
    b+=text(600,670,('선택한 Expert 쪽으로 토큰 전달','Dispatch tokens to selected experts'),24,bold=True,anchor='middle')
    # Distinct lanes avoid implying a central routing device.
    b+=path_arrow([(220,632),(220,793)])+path_arrow([(356,632),(356,702),(804,702),(804,793)])
    b+=path_arrow([(844,632),(844,747),(396,747),(396,793)])+path_arrow([(980,632),(980,776),(864,776),(864,793)])
    b+=experts(800,126)
    for e,cx in enumerate(CENTERS):b+=text(cx,877,('서로 다른 가중치','Distinct weights'),21,MUTED,anchor='middle')
    b+=text(600,841,'EP',29,bold=True,anchor='middle')+text(600,879,('분할 보관','Sharded'),20,MUTED,anchor='middle')
    b+=path_arrow([(180,926),(180,1139)])+path_arrow([(804,926),(804,1010),(356,1010),(356,1139)])
    b+=path_arrow([(396,926),(396,1060),(844,1060),(844,1139)])+path_arrow([(864,926),(864,1139)])
    b+=text(600,1106,('출발 GPU로 결과 회수','Return results to the source GPU'),22,bold=True,anchor='middle')
    for g,cx in enumerate([288,912]):
        b+=centered_box(cx,1147,420,94,('원래 토큰별 결과','Results for original tokens'),('A1 · A2' if g==0 else 'B1 · B2'),'#eef5fb')
        b+=arrow(cx,1249,cx,1281)
        b+=centered_box(cx,1289,420,110,('다음 공통 연산 · DP','Next common operation · DP'),('자기 입력의 계산을 이어감','Continue each local input'),'#eef5fb')
    b+=text(600,1444,('GPU는 그대로 · 연산 부분에 따라 DP와 EP를 적용','Same GPUs · Different parallelism for different model parts'),23,bold=True,anchor='middle')
    b+=text(600,1527,('예시: 공통 가중치와 Router는 복제 · Expert 가중치는 분할 · 순전파','Example: replicate common weights and router; partition experts. Forward pass.'),21,MUTED,anchor='middle')
    frame(1,0,('어텐션은 복제하고, Expert는 나누어 배치하기','Replicate attention and partition experts'),('두 GPU가 서로 다른 시퀀스를 맡고, MoE 구간에서 토큰과 결과를 교환합니다.','Two GPUs handle different sequences and exchange tokens and results in the MoE block.'),b,1570,('같은 GPU에서 공통 부분은 DP, Expert는 EP','Common layers use DP; experts use EP on the same GPUs'),('GPU0과 GPU1의 어텐션 및 Router 가중치는 복제한다. GPU0에는 E0/E1, GPU1에는 E2/E3를 둔다. 토큰은 Expert로 전달되고 결과는 출발 GPU의 원래 토큰으로 돌아가 다음 공통 연산에 사용된다.','Attention and router weights are replicated on GPU0 and GPU1. E0/E1 reside on GPU0; E2/E3 on GPU1. Tokens travel to experts; results return to the source GPU and original token for the next common operation.'))

    # Figure 2: Top-1, one visible token/result location in each execution state.
    labels=[('입력: 각 GPU의 두 토큰','Input: two tokens on each GPU'),('Router: 토큰마다 Expert 선택','Router: select one expert per token'),('Dispatch: Expert별로 토큰 모으기','Dispatch: group tokens by expert'),('Expert: 각 토큰을 독립적으로 계산','Expert: compute each token independently'),('회수: 결과를 출발 GPU로','Return: send results to the source GPU'),('복구: 원래 순서로 다음 연산에 연결','Restore: original order for the next operation')]
    notes=[('A와 B는 서로 다른 시퀀스입니다. 한 칸은 토큰 하나의 활성값 벡터입니다.','A and B are different sequences. Each chip is one token activation vector.'),('Router는 목적지를 고릅니다. Expert에 보내는 것은 토큰의 입력 벡터입니다.','The router selects destinations. Experts receive token input vectors.'),('E2에는 A2와 B2가 함께 모입니다. Expert 가중치는 GPU에 그대로 있습니다.','E2 receives A2 and B2 together. Expert weights stay on their GPUs.'),('E2의 두 출력은 각각 A2와 B2로 계산합니다. 두 토큰의 값을 섞지 않습니다.','E2 computes outputs separately for A2 and B2; it does not mix their values.'),('원격 결과는 GPU 경계를 다시 건너고, 로컬 결과는 같은 GPU에 남습니다.','Remote results cross GPU boundaries again; local results stay on their GPU.'),('GPU0은 A1·A2, GPU1은 B1·B2의 결과를 원래 순서로 사용합니다.','GPU0 uses A1, A2 results; GPU1 uses B1, B2 results, in their original order.')]
    for step in range(6):
        b=gpu_columns(1090)
        for g,cx in enumerate([288,912]):
            b+=text(cx,291,('출발 위치: 시퀀스 '+('A' if g==0 else 'B'),'Source: sequence '+('A' if g==0 else 'B')),23,bold=True,anchor='middle')
            if step<=1:
                for j in range(2):k=g*2+j;b+=chip(CENTERS[k],310,TOKENS[k],k)
            else:b+=text(cx,341,'A1 · A2' if g==0 else 'B1 · B2',22,MUTED,anchor='middle')
            if step<=1:b+=arrow(cx,362,cx,390)
            b+=centered_box(cx,398,420,112,'Router',('같은 가중치 · 자기 토큰으로 선택','Same weights; route local tokens'))
            if step>=1:b+=text(cx,497,'A1 → E0    A2 → E2' if g==0 else 'B1 → E1    B2 → E2',22,bold=True,anchor='middle')
        b+=experts(704,240)
        if step==2:b+=dispatch_edges(516,699)
        if step in [2,3]:
            for k,e in enumerate(ROUTES):
                y=766+(58 if k==3 else 0)
                label=TOKENS[k] if step==2 else f'u({TOKENS[k]})'
                b+=chip(CENTERS[e],y,label,k,164)
            b+=text(1020,814,('선택 없음','Not selected'),21,MUTED,anchor='middle')
            if step==3:
                for e in [0,1,2]:b+=text(CENTERS[e],913,('토큰별 MLP','Token-wise MLP'),20,MUTED,anchor='middle')
        else:
            for e,cx in enumerate(CENTERS):b+=text(cx,826,('Expert 가중치 유지','Weights stay here'),19,MUTED,anchor='middle')
        if step==4:
            b+=path_arrow([(180,944),(180,1050)],COLORS[0])+path_arrow([(780,944),(780,981),(396,981),(396,1050)],COLORS[1])
            b+=path_arrow([(420,944),(420,1012),(804,1012),(804,1050)],COLORS[2])+path_arrow([(844,944),(844,1036),(1020,1036),(1020,1050)],COLORS[3])
        for g,cx in enumerate([288,912]):
            b+=rect(cx-210,1056,420,106,'white')+text(cx,1085,('원래 토큰 순서의 출력','Output in original token order'),22,bold=True,anchor='middle')
            if step>=4:
                for j in range(2):k=g*2+j;b+=chip(CENTERS[k],1102,f'y({TOKENS[k]})',k,166)
            if step==5:b+=arrow(cx,1169,cx,1190)
            b+=centered_box(cx,1200,420,77,('다음 공통 연산','Next common operation'),'', '#eef5fb' if step==5 else '#f8fafc')
        b+=text(600,1354,notes[step],22,bold=True,anchor='middle')
        b+=text(600,1400,('Top-1 · 색과 이름은 토큰 식별 · u는 Expert 출력, y는 토큰별 최종 출력','Top-1 · Color/name identify tokens · u = expert output; y = final token output'),20,MUTED,anchor='middle')
        frame(2,step,('토큰을 Expert로 보내고 원래 위치로 돌려받기','Send tokens to experts and return their results'),labels[step],b,1445,labels[step],notes[step])

    # Figure 3: one token, two expert outputs; combine stays inside source GPU.
    labels=[('A2의 Router: E0 0.7, E2 0.3 선택','A2 router: choose E0 0.7 and E2 0.3'),('같은 A2 벡터를 두 Expert에 전달','Send the same A2 vector to both experts'),('두 Expert가 서로 다른 출력 계산','Two experts compute distinct outputs'),('두 결과를 GPU0의 같은 토큰으로 회수','Return both results to the same token on GPU0'),('Router 가중치로 합쳐 A2의 출력 완성','Weight and combine to produce the A2 output')]
    for step in range(5):
        b=gpu_columns(1120)
        b+=text(288,291,('A2의 출발 GPU','Source GPU for A2'),23,bold=True,anchor='middle')+chip(288,313,'A2',1)
        b+=text(912,314,('다른 토큰의 흐름은 생략','Other tokens omitted'),22,MUTED,anchor='middle')
        b+=arrow(288,365,288,388)
        b+=centered_box(288,397,420,106,'Router','E0: 0.7     E2: 0.3','#edf7f5')
        b+=experts(700,210)
        for e in [1,3]:b+=text(CENTERS[e],817,('A2는 선택 안 함','Not selected for A2'),19,MUTED,anchor='middle')
        if step==1:
            b+=path_arrow([(220,503),(180,560),(180,695)],COLORS[1])+path_arrow([(356,503),(356,602),(804,602),(804,695)],COLORS[1])
            for e in [0,2]:b+=chip(CENTERS[e],770,'A2',1)
            b+=text(600,657,('두 Expert에 같은 입력 벡터','Same input vector for both experts'),22,bold=True,anchor='middle')
        elif step>=2:
            for e in [0,2]:b+=chip(CENTERS[e],770,f'u{e} = E{e}(A2)',1,186)
        else:
            for e in [0,2]:b+=text(CENTERS[e],817,('A2가 선택한 Expert','Selected for A2'),19,MUTED,anchor='middle')
        if step>=3:
            b+=path_arrow([(180,910),(180,1090)],COLORS[1])+path_arrow([(804,910),(804,977),(396,977),(396,1090)],COLORS[1])
            b+=text(804,1034,('u2를 GPU0으로 반환','Return u2 to GPU0'),22,MUTED,anchor='middle')
        b+=centered_box(288,1098,440,137,('GPU0 · A2의 결과 결합','GPU0 · Combine results for A2'),('두 출력이 모두 필요','Both outputs are needed'))
        if step>=3:b+=text(288,1212,'y(A2) = 0.7 × u0 + 0.3 × u2',24,bold=True,anchor='middle')
        if step==4:
            b+=chip(288,1270,'y(A2)',1,174)+arrow(288,1242,288,1263)
        b+=text(600,1390,('다른 토큰끼리 합치지 않습니다. 같은 A2에서 나온 두 결과만 결합합니다.','Combine only the two results for A2, never results from different tokens.'),23,bold=True,anchor='middle')
        frame(3,step,('여러 Expert의 결과도 같은 토큰으로 돌아오기','Return multiple expert results to the same token'),labels[step],b,1440,labels[step],('GPU0의 A2가 E0과 원격 GPU1의 E2를 선택한다. 두 결과 u0/u2를 GPU0에서 0.7/0.3으로 가중합해 y(A2)를 만든다.','A2 on GPU0 selects local E0 and remote E2 on GPU1. Their results u0/u2 return to GPU0 and are weighted 0.7/0.3 to produce y(A2).'))

    # Figure 4: eight equal-sized tokens, top-1, counts rather than timing.
    b=gpu_columns(925)
    for g,cx in enumerate([288,912]):
        seq='A' if g==0 else 'B'
        b+=text(cx,297,('출발: 토큰 4개','Start: four tokens'),25,bold=True,anchor='middle')
        for j in range(4):b+=chip(cx-108+(j%2)*216,320+(j//2)*58,f'{seq}{j+1}',j if g==0 else (j+2)%4,150)
        b+=arrow(cx,428,cx,465)
        b+=centered_box(cx,474,420,82,'Router',('토큰마다 Expert 하나 선택','Select one expert per token'))
    b+=path_arrow([(356,556),(356,595),(804,595),(804,714)])
    b+=text(600,580,'A2 · A3 · A4',21,MUTED,anchor='middle')
    b+=path_arrow([(844,556),(844,658),(396,658),(396,714)])
    b+=text(600,646,'B1',21,MUTED,anchor='middle')
    b+=path_arrow([(180,556),(180,714)])+path_arrow([(1020,556),(1020,688),(875,688),(875,714)])
    b+=experts(722,256)
    groups=[['A1'],['B1'],['A2','A3','A4','B2','B3','B4'],[]]
    for e,tokens in enumerate(groups):
        cx=CENTERS[e]
        for j,t in enumerate(tokens):
            k=(int(t[1])-1+(0 if t[0]=='A' else 2))%4
            b+=chip(cx-45+(j%2)*90,783+(j//2)*53,t,k,78)
        if not tokens:b+=text(cx,816,('입력 없음','No inputs'),21,MUTED,anchor='middle')
        b+=text(cx,953,(f'{len(tokens)}개',f'{len(tokens)} token' + ('' if len(tokens)==1 else 's')),23,bold=True,anchor='middle')
    for g,cx in enumerate([288,912]):
        b+=text(cx,1028,('Expert 2개 · 처리할 토큰 '+('2개' if g==0 else '6개'),'2 experts · '+('2' if g==0 else '6')+' tokens to process'),25,bold=True,anchor='middle')
        b+=text(cx,1080,('Expert 수는 같아도, 라우팅 결과는 다름','Same expert count; different routed load'),21,MUTED,anchor='middle')
    b+=text(600,1192,('같은 크기의 Expert 4개 · Top-1 · 토큰 수 비교이며 실행 시간의 비율은 아닙니다.','Four equally sized experts · Top-1 · Token counts do not imply a runtime ratio.'),22,MUTED,anchor='middle')
    frame(4,0,('Expert가 같은 개수여도 처리할 토큰 수는 다릅니다','Equal expert counts can receive different token counts'),('처음에는 GPU마다 토큰 4개 · 라우팅 후에는 GPU0에 2개, GPU1에 6개','Four tokens per GPU initially; routing assigns two to GPU0 and six to GPU1.'),b,1240,('입력 4/4 → Expert별 1/1/6/0 → GPU별 2/6','Inputs 4/4 → Experts 1/1/6/0 → GPUs 2/6'),('같은 수의 토큰에서 출발해도 라우팅 뒤 E0/E1/E2/E3는 각각 1/1/6/0개를 처리한다. 같은 Expert 수를 가진 GPU0과 GPU1의 토큰 계산량은 2/6개로 달라진다.','Equal initial token counts become 1/1/6/0 across E0/E1/E2/E3 after routing. GPU0 and GPU1 each hold two experts but process two and six tokens.'))

assert ROUTES==[0,2,1,2]
assert sum([1,1,6,0])==8
assert [len(STEPS['ko'][str(i)]) for i in range(1,5)]==[1,6,5,1]
(ROOT/'src/data/ep-steps.json').write_text(json.dumps(STEPS,ensure_ascii=False,indent=2)+'\n')
print(f'{len(MANIFEST)} bilingual EP SVG states generated.')
