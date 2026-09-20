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

def line(x1,y1,x2,y2,color=MUTED,dash=False):
    return f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{color}" stroke-width="2" fill="none"'+(' stroke-dasharray="6 5"' if dash else '')+'/>'

def dot(x,y,color=COLORS[1],open=False):
    return f'<circle cx="{x}" cy="{y}" r="9" fill="{"white" if open else color}" stroke="{color}" stroke-width="3"/>'

def bracket(a,z,y,label,color=INK,size=24):
    return line(a,y,z,y,color)+line(a,y-8,a,y+8,color)+line(z,y-8,z,y+8,color)+text((a+z)/2,y-20,label,size,color,True,'middle')

def card(x,y,w,title,value,color=COLORS[0],fill=FILLS[0]):
    return rect(x,y,w,110,fill,color)+text(x+20,y+34,title,22,color,True)+text(x+20,y+80,value,29,INK,True)

def figure1():
    x=lambda t:120+t*5
    b=text(48,205,('클라이언트 수신 기준 · 예시에서는 한 청크에 한 토큰','Client receipt times · One token per chunk in this example'),22,MUTED)
    b+=line(x(0),325,x(180),325)
    for t,label in [(0,('제출','Submit')),(100,('첫 토큰 x0','First token x0')),(130,('토큰 x1','Token x1')),(170,('토큰 x2','Token x2'))]:
        b+=dot(x(t),325,COLORS[1] if t else INK)+text(x(t),270,label,22,INK,True,'middle')+text(x(t),302,f'{t} ms',21,MUTED,anchor='middle')
    b+=line(x(180),240,x(180),340,COLORS[3])+text(x(180),239,('종료 180 ms','End 180 ms'),21,COLORS[3],True,'middle')
    b+=bracket(x(0),x(100),410,'TTFT · 100 ms',COLORS[0])
    b+=bracket(x(100),x(130),480,'ITL · 30 ms',COLORS[1],22)+bracket(x(130),x(170),480,'ITL · 40 ms',COLORS[1],22)
    b+=rect(500,535,620,120,FILLS[2],COLORS[2])+text(530,574,('TPOT · 첫 토큰 이후 간격의 평균','TPOT · Average interval after the first token'),23,COLORS[2],True)
    b+=text(530,621,'(30 + 40) / 2 = 35 ms/token',28,INK,True)
    b+=bracket(x(0),x(180),740,('전체 요청 시간 · E2E = 180 ms','Full request time · E2E = 180 ms'))
    b+=text(48,812,('출력 3개 → 간격 2개 · 마지막 토큰 수신과 요청 종료는 구별합니다.','3 output tokens → 2 intervals · Last-token receipt and request end are distinct.'),22,MUTED,width=1100)
    save('inference-metrics','01-request-latency',('한 요청에서 지연 시간 읽기','Read latency on one request timeline'),('어디서부터 어디까지 재는지 보면, 지표의 차이가 보입니다.','Each metric measures a different span on the same timeline.'),b,880,('제출 0ms, 토큰 수신 100·130·170ms, 종료 180ms. TTFT 100ms, ITL 30·40ms, TPOT 35ms/token, E2E 180ms.','Submit at 0ms, tokens at 100, 130 and 170ms, end at 180ms. TTFT 100ms, ITLs 30 and 40ms, TPOT 35ms/token, E2E 180ms.'),('TTFT에는 첫 출력까지의 대기와 처리·전달이 포함됩니다. 교육용 수신 시각입니다.','TTFT includes waiting, processing and delivery until the first output. Illustrative receipt times.'))

def figure2():
    x=lambda t:190+t*82
    b=text(48,205,('모든 요청과 출력이 들어 있는 10초 관측 창','A 10-second window containing all requests and outputs'),23,MUTED)
    b+=bracket(x(0),x(10),258,('관측 시간 10초','Observation time: 10 s'))
    for t in [0,2,4,6,8,10]:
        b+=line(x(t),290,x(t),610,LINE,True)+text(x(t),638,f'{t} s',20,MUTED,anchor='middle')
    for i,(start,tokens,end) in enumerate([(1,[3,4,5],5.4),(2,[4,5,6,7,8],8.4),(3,[7,8.5],9)]):
        y=335+i*115;c=COLORS[i]
        b+=text(48,y+7,f'{chr(65+i)}',28,c,True)+line(x(start),y,x(end),y,c)+dot(x(start),y,c,True)
        for t in tokens:b+=dot(x(t),y,c)
        b+=rect(x(end)-12,y-16,30,32,FILLS[i],c)+text(x(end)+3,y+7,'✓',22,c,True,'middle')
        b+=text(1100,y+7,(f'{len(tokens)}토큰',f'{len(tokens)} tokens'),23,c,True,'middle')
    b+=dot(90,697,INK,True)+text(112,705,('요청 제출','Submit'),22)
    b+=dot(360,697)+text(382,705,('출력 토큰 수신','Output token received'),22)
    b+=text(795,705,'✓',25,COLORS[0],True)+text(828,705,('요청 완료','Completed'),22)
    b+=card(48,758,525,('완료 요청 3개','3 completed requests'),'3 / 10 = 0.3 requests/s')
    b+=card(605,758,547,('출력 토큰 3 + 5 + 2 = 10개','3 + 5 + 2 = 10 output tokens'),'10 / 10 = 1 token/s',COLORS[1],FILLS[1])
    b+=text(48,922,('여러 요청의 결과를 같은 시간으로 나눕니다. 입력 토큰은 세지 않았습니다.','Count results across requests over the same time. Input tokens are not counted.'),22,MUTED,width=1100)
    save('inference-metrics','02-counting-throughput',('같은 시간 동안 처리한 양 세기','Count work over the same time window'),('완료한 요청을 셀 수도 있고, 전달한 출력 토큰을 셀 수도 있습니다.','Count completed requests or delivered output tokens.'),b,985,('10초 안에서 A·B·C가 중첩 실행해 모두 완료하며 출력은 각각3·5·2개. 요청 처리량0.3requests/s, 출력 처리량1token/s.','A, B and C overlap and complete within 10 seconds with 3, 5 and 2 outputs. Request throughput is 0.3 requests/s and output throughput is 1 token/s.'),('앞 그림과 별개의 교육용 실행입니다. 한 요청의 TPOT 역수와 전체 처리량을 구별합니다.','A separate illustrative run. The inverse of one request’s TPOT is not aggregate throughput.'))

def figure3():
    b=text(48,205,('두 경우 모두 첫 토큰부터 마지막 토큰까지 70 ms','Both cases span 70 ms from the first to the last token'),23,MUTED)
    for i,(times,label) in enumerate([([0,35,70],('일정한 간격','Even intervals')),([0,5,70],('긴 출력 공백','A long output gap'))]):
        y=330+i*260; x=lambda t:170+t*11
        b+=text(48,y-85,label,26,COLORS[i],True)+line(x(0),y,x(70),y)
        for j,t in enumerate(times):b+=dot(x(t),y,COLORS[i])+text(x(t),y+39,f'x{j}',21,COLORS[i],True,'middle')
        for a,z in zip(times,times[1:]):
            if z-a>10:b+=bracket(x(a),x(z),y-20,f'{z-a} ms',COLORS[i])
            else:b+=bracket(x(a),x(z),y-20,'',COLORS[i])+line((x(a)+x(z))/2,y-28,x(z)+45,y-65,COLORS[i])+text(x(z)+55,y-67,'5 ms',22,COLORS[i],True)
        b+=text(990,y+7,'TPOT',22,MUTED)+text(980,y+47,'35 ms/token',23,COLORS[2],True)
        if i:b+=rect(x(5)+25,y+63,650,55,FILLS[3],COLORS[3])+text(x(5)+350,y+98,('65 ms 동안 다음 출력이 오지 않음','No next output for 65 ms'),23,COLORS[3],True,'middle')
    b+=rect(48,775,1104,100,FILLS[2],COLORS[2])+text(80,816,('같은 평균으로는 생성 도중의 멈춤을 알 수 없습니다.','The same average can hide a pause during generation.'),27,COLORS[2],True)+text(80,852,'(35 + 35) / 2 = (5 + 65) / 2 = 35 ms/token',23)
    save('inference-metrics','03-average-and-gaps',('평균이 같아도 출력 간격은 다릅니다','The same average can hide different gaps'),('TPOT는 간격의 평균입니다. ITL은 각 간격을 드러냅니다.','TPOT averages the intervals. ITL exposes each individual gap.'),b,930,('두 출력열의 ITL은35·35ms와5·65ms. TPOT는둘다35ms/token이지만두번째에는65ms공백이있습니다.','Two streams have ITLs of 35/35ms and 5/65ms. Both have TPOT 35ms/token, but the second has a 65ms gap.'),('첫 토큰 수신을 상대시간0으로 맞춘 비교입니다.','Both timelines start at relative time zero when the first token is received.'))

def figure4():
    vals=[100+10*i for i in range(18)]+[600,1000]
    b=text(48,205,('20개 요청의 TTFT · 짧은 순서로 정렬','TTFT for 20 requests · Sorted from shortest to longest'),23,MUTED)
    for v in [0,500,1000]:
        y=650-v*.36;b+=line(100,y,1130,y,LINE)+text(83,y+7,str(v),20,MUTED,anchor='end')
    b+=text(48,253,'ms',21,MUTED)
    for i,v in enumerate(vals):
        xx=120+i*49;c=COLORS[0] if i<10 else COLORS[2] if i<19 else COLORS[3]
        b+=rect(xx,650-v*.36,32,v*.36,FILLS[0] if i<10 else FILLS[2] if i<19 else FILLS[3],c)
        if i in [0,9,18,19]:b+=text(xx+16,681,str(i+1),21,c,True,'middle')
        if i in [9,18,19]:b+=text(xx+16,650-v*.36-15,str(v),21,c,True,'middle')
    b+=text(630,727,('정렬한 요청의 순서 →','Rank of each sorted request →'),23,MUTED,anchor='middle')
    b+=card(48,770,525,('p50 · 20개 중 10번째','p50 · 10th of 20 requests'),'190 ms',COLORS[0],FILLS[0])
    b+=card(605,770,547,('p95 · 20개 중 19번째','p95 · 19th of 20 requests'),'600 ms',COLORS[2],FILLS[2])
    b+=text(48,930,('이 예시는 순위 = 올림(p × 20) 규칙입니다. 각 막대는 한 요청의 TTFT입니다.','Here, rank = ceil(p × 20). Each bar is one request’s TTFT.'),22,MUTED,width=1100)
    save('inference-metrics','04-request-latency-distribution',('일부 요청이 더 오래 기다립니다','Some requests wait much longer'),('백분위수는 정렬한 지연 값에서 어느 위치를 보는지 나타냅니다.','A percentile identifies a position among sorted latency values.'),b,1000,('정렬한20개요청의TTFT막대.10번째190ms가p50,19번째600ms가p95,20번째1000ms.순위올림방식을사용한예시.','Sorted TTFT bars for 20 requests. The 10th is 190ms (p50), the 19th 600ms (p95), and the 20th 1000ms, using nearest-rank percentiles.'),('교육용 작은 표본입니다. 실제 꼬리 지연 추정에는 충분한 표본이 필요하며 도구의 백분위수 규칙도 확인합니다.','A small illustrative sample. Tail estimates need enough samples; check the tool’s percentile convention.'))

def figure5():
    b=rect(48,194,1104,94,FILLS[2],COLORS[2])+text(76,231,('통과 조건 · 각 요청이 두 목표를 모두 만족','Pass rule · Each request must meet both targets'),25,COLORS[2],True)
    b+=text(76,270,'TTFT ≤ 1 s   AND   TPOT ≤ 50 ms/token',27,INK,True)
    b+=text(48,340,('같은 10초 동안 성공 완료한 요청 10개','10 requests completed successfully within the same 10 seconds'),24,INK,True)
    for i in range(10):
        row,col=divmod(i,5);xx=48+col*224;yy=380+row*112;good=i<8;c=COLORS[1] if good else COLORS[3]
        b+=rect(xx,yy,208,86,FILLS[1] if good else FILLS[3],c)+text(xx+18,yy+33,f'{chr(65+i)}   '+('✓' if good else '×'),25,c,True)
        label=('목표 모두 충족','Both targets met') if good else (('TTFT 초과','TTFT exceeded') if i==8 else ('TPOT 초과','TPOT exceeded'))
        b+=text(xx+18,yy+65,label,21,c)
    b+=card(48,635,525,('전체 요청 처리량','Total request throughput'),'10 / 10 = 1 request/s',COLORS[0],FILLS[0])
    b+=card(605,635,547,('목표 충족 요청 처리량 · Goodput','Request goodput'),'8 / 10 = 0.8 requests/s',COLORS[1],FILLS[1])
    b+=text(48,800,('목표 달성률은 8 / 10 = 80% · Goodput의 단위는 요청/초','Target attainment is 8 / 10 = 80% · Goodput is measured in requests/s'),23,MUTED,width=1104)
    b+=text(48,862,('완료한 양과 지연 목표를 지키며 완료한 양을 함께 봅니다.','Consider both total completions and completions within latency targets.'),25,INK,True,width=1104)
    save('inference-metrics','05-goodput-targets',('지연 목표를 만족한 처리량 세기','Count throughput that meets latency targets'),('Goodput을 계산하려면 먼저 통과 조건과 관측 시간을 정합니다.','Define the pass conditions and observation window before counting goodput.'),b,955,('10초간10개요청완료.8개는TTFT1초이하와TPOT50ms/token이하를함께만족.2개는하나의목표초과.처리량1request/s,goodput0.8requests/s,달성률80%.','Ten requests complete in ten seconds. Eight meet both TTFT ≤1s and TPOT ≤50ms/token; two miss one target. Throughput 1 request/s, goodput 0.8 requests/s, attainment 80%.'),('이 그림은 목표를 모두 충족하며 성공 완료한 요청 수/관측 시간으로 요청 기준goodput을 정의합니다.','Request goodput here is successfully completed requests meeting all targets divided by observation time.'))

for LANG in ['ko','en']:
    for fn in [figure1,figure2,figure3,figure4,figure5]:fn()
(ROOT/'scripts/metrics-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
