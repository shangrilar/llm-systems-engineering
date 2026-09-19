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
def box(x,y,w,h,title,body='',color=0):
    return '<g data-panel="true">'+rect(x,y,w,h,FILLS[color],COLORS[color])+text(x+20,y+36,title,25,COLORS[color],True,width=w-40)+text(x+20,y+84,body,23,width=w-40)+'</g>'
def banner(y,title,body='',height=135):
    return '<g data-panel="true">'+rect(48,y,1104,height,'#F1F4F7')+text(72,y+35,title,25,bold=True,width=1056)+text(72,y+77,body,23,width=1056)+'</g>'
def save(article,slug,title,subtitle,body,height,alt,caption):
    folder=OUT/article/('en' if LANG=='en' else '')
    folder.mkdir(parents=True,exist_ok=True)
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title desc"><title id="title">{escape(tr(title))}</title><desc id="desc">{escape(tr(alt))}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="{MUTED}" stroke-width="1.6"/></marker></defs><style>text{{font-family:Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}}path{{stroke-linecap:round;stroke-linejoin:round}}</style><rect width="1200" height="{height}" fill="white"/>'
    svg+=text(48,60,title,32,bold=True)+text(48,108,subtitle,23,MUTED,width=1104)
    svg+=f'<path d="M48,160 H1152" stroke="{LINE}"/>'+body+'</svg>'
    file=folder/(slug+'.svg'); file.write_text(svg)
    MANIFEST.append(dict(article=article,slug=slug,locale=LANG,title=tr(title),alt=tr(alt),caption=tr(caption),path=str(file.relative_to(ROOT)),width=1200,height=height))
def table(y,headers,rows,widths,rowh=94):
    b='';x=48
    for w,h in zip(widths,headers):
        b+=rect(x,y,w-6,65,'#E8EDF4')+text(x+14,y+39,h,23,bold=True,width=w-30);x+=w
    for r,row in enumerate(rows):
        x=48
        for c,(w,val) in enumerate(zip(widths,row)):
            b+=rect(x,y+73+r*rowh,w-6,rowh-8,FILLS[r%3] if c else '#F7F9FB')
            b+=text(x+14,y+109+r*rowh,val,23,width=w-32);x+=w
    return b
def pool(y,owners):
    b='';w=168
    for i,owner in enumerate(owners):
        x=48+i*184
        ci='ABC'.find(owner[0]) if owner else -1
        b+=rect(x,y,w,97,FILLS[ci] if ci>=0 else '#F7F9FB',COLORS[ci] if ci>=0 else LINE)
        b+=text(x+16,y+32,f'P{i}',22,MUTED)+text(x+16,y+72,owner or ('비어 있음','Free'),24,COLORS[ci] if ci>=0 else MUTED,True)
    return b

for LANG in ['ko','en']:
    a='batching-and-scheduling'
    b=text(48,205,('P = 전체 입력 prefill · D = 요청당 새 토큰 1개 decode · — = 실행 없음','P = full prefill · D = decode one new token per request · — = no execution'),22,bold=True)
    schedules=[('Static batching',[['P','D ✓','—','—','—','—','—'],['P','D','D','D','D ✓','—','—'],['—','wait','wait','wait','wait','P','D ✓']]),('Continuous batching',[['P','D ✓','—','—','—','—','—'],['P','D','D','D','D ✓','—','—'],['—','wait','P','D ✓','—','—','—']])]
    for k,(title,rows) in enumerate(schedules):
        y=251+k*345
        b+=text(48,y,title,28,bold=True)
        for j in range(7): b+=text(310+j*125,y+42,str(j+1),23,anchor='middle')
        for r,row in enumerate(rows):
            yy=y+60+r*72
            b+=text(48,yy+39,f'{"ABC"[r]}',28,COLORS[r],True)
            for j,v in enumerate(row):
                active=v not in ['—','wait']
                label=('대기','Wait') if v=='wait' else v
                b+=rect(252+j*125,yy,114,58,FILLS[r] if active else '#F7F9FB',COLORS[r] if active else LINE)+text(309+j*125,yy+38,label,23,COLORS[r] if active else MUTED,active,'middle')
        b+=text(48,y+301,('C는 단계 1 직후 도착. ✓ = 완료.','C arrives just after step 1. ✓ = complete.'),22,MUTED)
    b+=banner(955,('빈자리에 들어온 C도 먼저 prefill을 수행합니다.','C fills a vacant slot and first performs prefill.'),('단계는 같은 시간이 아닙니다. 예시는 prefill·decode 혼합 배치를 허용합니다.','Steps need not take equal time. This example permits mixed prefill/decode batches.'))
    save(a,'01-continuous-batching',('완료된 요청의 자리를 다음 요청에게','Reuse a completed request’s batch slot'),('동시에 최대 두 요청을 실행하는 교육용 일정입니다. 성능 측정값이 아닙니다.','A teaching schedule with at most two requests per step; not a performance measurement.'),b,1110,('Static에서는 A가 끝나도 B의 종료까지 C가 기다립니다. Continuous에서는 C의 prefill이 단계 3에 들어가고 decode 뒤 종료합니다.','Static batching makes C wait for B despite A finishing. Continuous batching admits C for prefill at step 3, followed by decode and completion.'),('한 칸은 실행 순서를 뜻한다. Continuous batching은 완료된 요청을 제거하고 다음 단계의 구성을 바꾼다. 혼합 배치 여부와 실제 단계 시간은 엔진·입력에 따라 달라진다.','Cells show execution order. Continuous batching removes completed requests and changes the next batch; mixed-batch support and step duration depend on the engine and inputs.'))

    b=table(195,[('후보','Candidate'),('이번 계산','New work'),('계산할 토큰','Tokens this step'),('KV 저장 위치','Stored KV positions')],[['A','Decode','1','7 → 8'],['B','Decode','1','11 → 12'],['C','Prefill','6','0 → 6']],[180,264,294,366],90)
    for i,(title,value,detail) in enumerate([
        (('요청 수','Request count'),'3 / 3',('허용 범위','Fits')),
        (('실행 토큰 예산','Step token budget'),'8 / 8',('1 + 1 + 6: 허용 범위','1 + 1 + 6: fits')),
        (('KV 저장 용량','KV capacity'),'26 / 24',('8 + 12 + 6: 공간 부족','8 + 12 + 6: does not fit'))]):
        x=48+i*376
        b+=box(x,589,352,187,title,value,3 if i==2 else i)+text(x+20,745,detail,22,COLORS[3 if i==2 else i])
    b+=arrow(600,800,600,848)+banner(871,('이번에는 A·B 실행, C는 대기','Run A and B this step; keep C waiting'),('실행 토큰은 2개, 계산 후 KV는 20/24. 세 제한은 서로 다른 수를 셉니다.','2 tokens execute; KV occupies 20/24 afterward. These limits count different things.'))
    save(a,'02-resource-budgets',('배치에 넣기 전에 세 가지 수를 확인하기','Check three different budgets before admission'),('KV는 토큰 슬롯 기준의 단순 모델입니다. 블록 반올림과 공유는 생략합니다.','KV uses a simplified token-slot model; block rounding and sharing are omitted.'),b,1030,('요청 수 3과 실행 토큰 8은 제한을 만족하지만 필요한 KV 26은 용량 24를 넘습니다. C를 대기시키면 A와 B가 2토큰을 계산해 KV 20을 저장합니다.','Three requests and eight execution tokens fit their limits, but 26 KV positions exceed capacity 24. Deferring C lets A and B execute two tokens and store 20 KV positions.'),('이번에 계산할 토큰 수와 누적 KV 위치 수를 구별한다. 이 예시는 새 요청 C의 진입을 늦추며, A와 B의 문맥은 각각 독립적으로 유지한다.','Distinguish tokens computed now from accumulated KV positions. This example delays admission of C and keeps A and B’s contexts independent.'))

    a='paged-kv-cache'
    b=text(48,207,('요청 A: 토큰 10개 → 논리 블록 3개','Request A: 10 tokens → 3 logical blocks'),27,COLORS[0],True)
    blocks=[('L0','t0  t1  t2  t3','P3'),('L1','t4  t5  t6  t7','P0'),('L2','t8  t9  —  —','P5')]
    for i,(logical,toks,physical) in enumerate(blocks):
        x=48+i*376
        b+=box(x,240,352,151,logical,toks,0)+arrow(x+176,404,x+176,449)
        b+=rect(x,467,352,83,'#F1F4F7')+text(x+176,519,f'{logical} → {physical}',28,bold=True,anchor='middle')
    b+=text(48,598,('블록 테이블: 논리적 순서에서 물리 주소를 찾습니다.','Block table: translate logical order into physical addresses.'),25,bold=True)
    b+=text(48,666,('GPU 물리 블록 풀 · 각 블록은 4토큰의 K와 V 저장','GPU physical block pool · each block stores K and V for 4 tokens'),24,bold=True)
    b+=pool(705,['A · L1','B · L0','','A · L0','','A · L2'])
    b+=banner(851,('Attention은 P3 → P0 → P5의 KV를 논리적 순서로 참조','Attention follows P3 → P0 → P5 for A’s logical KV order'),('물리 블록은 이어 붙어 있지 않아도 됩니다. 마지막 블록의 두 칸은 남습니다.','Physical blocks need not be adjacent. Two positions remain unused in the last block.'))
    save(a,'01-block-mapping',('토큰 순서와 저장 위치를 분리하기','Separate token order from storage location'),('블록 크기 4의 교육용 예시입니다. A·B는 각자 KV 블록을 소유합니다.','Teaching example with block size 4. A and B own separate KV blocks.'),b,1013,('A의 논리 블록 L0, L1, L2가 각각 물리 블록 P3, P0, P5에 대응합니다. 각 블록은 4토큰의 K와 V를 저장하며 마지막에는 2칸이 남습니다.','A’s logical blocks L0,L1,L2 map to physical blocks P3,P0,P5. Each stores four tokens’ K,V; the final block leaves two slots unused.'),('블록 테이블이 토큰의 논리적 순서와 비연속 물리 공간을 연결한다. PagedAttention은 이 매핑을 따라 해당 요청의 K/V를 읽는다.','The block table maps logical token order to noncontiguous storage. PagedAttention follows this mapping to read the request’s K/V.'))

    b=text(48,205,('A 실행 중 · A는 P0·P3·P5, B는 P1 소유','A running · A owns P0/P3/P5; B owns P1'),25,bold=True)
    b+=pool(239,['A · L1','B · L0','','A · L0','','A · L2'])
    b+=arrow(600,357,600,403)+text(48,446,('A 종료 → A의 블록 세 개를 빈 풀로 반환','A completes → return A’s three blocks to the free pool'),25,bold=True)
    b+=pool(480,['','B · L0','','','',''])
    b+=arrow(600,595,600,641)+text(48,683,('C 입력 6토큰 → P0·P5를 배정해 새 KV 저장','C prefills 6 tokens → allocate P0/P5 and write C’s KV'),25,bold=True)
    b+=pool(717,['C · L0','B · L0','','','','C · L1'])
    b+=banner(858,('저장 공간은 재사용하고, 요청의 내용은 새로 씁니다.','Reuse the storage and write the new request’s contents.'),('B의 블록과 테이블은 유지합니다. 이 예시에는 prefix 공유가 없습니다.','B’s block and mapping remain unchanged. This example has no prefix sharing.'))
    save(a,'02-reuse-blocks',('완료된 요청의 블록을 반환하고 다시 배정하기','Free completed requests’ blocks and reallocate them'),('P0부터 P5까지 같은 물리 블록 풀의 세 시점을 비교합니다.','Three snapshots of the same physical block pool P0–P5.'),b,1015,('A 종료로 P0, P3, P5가 반환된 뒤 새 요청 C가 P0, P5를 배정받습니다. B의 P1은 계속 유지합니다.','A’s completion frees P0,P3,P5, then C receives P0,P5. B retains P1 throughout.'),('요청이 끝나면 독점 소유하던 KV 블록을 반환한다. C는 반환된 공간에 자신의 K/V를 기록하며 A의 캐시 내용을 그대로 사용하는 것이 아니다.','A completed request returns its exclusively owned KV blocks. C writes its own K/V into the returned storage rather than using A’s cached contents.'))

    a='inference-preemption'
    b=banner(194,('A가 다음 토큰을 처리하려면 새 블록 1개가 필요','A needs one more block for its next token'),('현재 풀: [A, A, B, B] · 빈 블록 0개 · B의 두 블록은 독점 소유','Current pool: [A, A, B, B] · 0 free blocks · B exclusively owns its two blocks'),110)
    b+=arrow(550,327,303,382)+arrow(650,327,897,382)
    b+=box(48,405,510,317,('B를 이번 실행에서 제외','Skip B for this step'),('B의 GPU KV는 그대로 유지\n\n풀: [A, A, B, B]\n빈 블록: 0개\nA의 새 블록을 확보하지 못함','Keep B’s GPU KV allocated\n\nPool: [A, A, B, B]\nFree blocks: 0\nA still cannot obtain its next block'),0)
    b+=box(642,405,510,317,('B를 중단하고 KV 회수','Preempt B and reclaim its KV'),('B의 GPU KV 블록 두 개 반환\n\n풀: [A, A, —, —]\n빈 블록: 2개\n토큰 이력은 보존, B는 재개 대기','Return B’s two GPU KV blocks\n\nPool: [A, A, —, —]\nFree blocks: 2\nRetain history; B waits to resume'),3)
    b+=arrow(897,743,897,798)+box(642,821,510,145,('A에 블록 1개 배정','Allocate one block to A'),('풀: [A, A, A, —] · 빈 블록 1개','Pool: [A, A, A, —] · 1 free block'),0)
    b+=text(48,822,('메모리를 돌려주는 동작이\n실제로 있어야 공간이 생깁니다.','Memory becomes available only\nwhen its allocation is released.'),26,bold=True,width=490)
    b+=text(48,1022,('요청 단계 사이의 관리입니다. 실행 중 GPU 커널의 중단을 뜻하지 않습니다.','This occurs between request execution steps, not by interrupting a running GPU kernel.'),23,MUTED)
    save(a,'01-reclaim-kv',('실행을 쉬는 것과 공간을 돌려주는 것은 다릅니다','Skipping work and reclaiming memory are different'),('B를 중단 대상으로 고른 단순 예시입니다. 최적의 정책을 뜻하지 않습니다.','A simple policy chooses B for preemption; it is not claimed to be optimal.'),b,1070,('B를 배치에서만 빼면 KV 블록 2개가 남아 빈 공간이 없습니다. B의 KV를 실제로 반환하면 2개가 비고 A에 1개를 줄 수 있습니다.','Excluding B from a batch retains its two KV blocks and leaves no free space. Releasing B’s KV frees two blocks, one of which can be assigned to A.'),('한 단계 미루는 것만으로는 KV 점유가 줄지 않는다. Preemption으로 B의 독점 KV를 회수하면 A를 진행시킬 공간을 확보할 수 있다.','Deferring a step alone does not reduce KV occupancy. Reclaiming B’s exclusively owned KV through preemption makes room for A’s progress.'))

    b=box(48,203,1104,167,('중단 직전: x1까지 선택·전달','Before preemption: x1 selected and delivered'),('보존할 이력: p0 p1 p2 x0 x1     /     GPU KV: p0 p1 p2 x0\nx1은 다음 실행의 입력이므로 아직 자기 KV가 없을 수 있습니다.','History: p0 p1 p2 x0 x1     /     GPU KV: p0 p1 p2 x0\nx1 is the next input and need not have its own KV yet.'),1)
    b+=arrow(600,390,600,433)
    b+=box(48,454,1104,141,('중단: 토큰 이력은 유지, GPU KV는 해제','Preempt: retain token history, release GPU KV'),('이력: p0 p1 p2 x0 x1     /     GPU KV: 없음     /     사용자에게 새 출력 없음','History: p0 p1 p2 x0 x1     /     GPU KV: none     /     No new user output'),3)
    b+=arrow(600,615,600,658)
    b+=box(48,679,1104,168,('재개: 고정된 이력을 입력으로 KV 재계산','Resume: rebuild KV from the fixed history'),('입력: p0 p1 p2 x0 x1 → KV: p0 p1 p2 x0 x1 → 다음 토큰 x2 선택\n기존 x0·x1을 다시 샘플링하지 않습니다. 새 x2만 사용자에게 전달합니다.','Input: p0 p1 p2 x0 x1 → KV: p0 p1 p2 x0 x1 → select next token x2\nDo not resample x0 or x1. Deliver only the new x2 to the user.'),0)
    b+=banner(895,('복구하는 것은 계산 상태이며, 기존 출력의 선택은 유지합니다.','Rebuild computation state while preserving earlier output choices.'),('여기서는 recompute를 표시합니다. Swap은 다른 저장소에 보관한 KV를 복원합니다.','This shows recomputation. Swapping instead restores KV saved in another storage tier.'))
    save(a,'02-recompute-resume',('출력 이력을 지키면서 KV를 다시 만들기','Rebuild KV while preserving output history'),('입력 p0·p1·p2, 출력 x0·x1까지 진행한 요청 B의 교육용 예시입니다.','Teaching example: request B has prompt p0/p1/p2 and outputs x0/x1.'),b,1050,('중단 전 KV는 p0, p1, p2, x0이고 출력은 x1까지 전달되었습니다. KV를 해제해도 이력을 유지하고 재개 시 x1까지 계산하여 새 x2만 선택·전달합니다.','Before preemption KV covers p0,p1,p2,x0 while x1 is delivered. Retaining history allows recomputation through x1 and delivery of only the new x2.'),('이미 선택한 토큰은 재계산 때 고정된 입력으로 사용한다. 마지막 선택 토큰과 KV 계산 완료 위치가 다를 수 있으며, 기존 출력을 다시 생성하거나 전송하지 않는다.','Previously selected tokens become fixed inputs during recomputation. The last selected token and KV frontier can differ; prior outputs are neither regenerated nor resent.'))

    a='inference-metrics'
    b=text(48,208,('같은 시간축의 교육용 값 · 한 출력 청크에 토큰 하나를 가정','Illustrative shared clock · assume one token per output chunk'),23,bold=True)
    b+=text(48,270,('엔진 선택','Engine selection'),24,COLORS[0],True)+arrow(250,326,1120,326)
    b+=text(48,424,('클라이언트 관측','Client observation'),24,COLORS[1],True)+arrow(120,484,1120,484)
    for i,(engine,client) in enumerate([(90,100),(120,130),(160,170)]):
        xe,xc=120+engine*5,120+client*5
        b+=f'<circle cx="{xe}" cy="326" r="8" fill="{COLORS[0]}"/>'+text(xe,293,f'x{i} · {engine} ms',22,COLORS[0],True,'middle')
        b+=arrow(xe,341,xc,462)
        b+=f'<circle cx="{xc}" cy="484" r="8" fill="{COLORS[1]}"/>'+text(xc,525,f'x{i} · {client} ms',22,COLORS[1],True,'middle')
    b+=f'<circle cx="120" cy="484" r="8" fill="{INK}"/>'+text(120,447,('제출 · 0 ms','Send · 0 ms'),22,bold=True)
    b+=text(276,373,('입력 준비·큐 대기·prefill 포함','Includes input work, queueing, and prefill'),21,MUTED,width=290)
    for y,end,label in [(608,620,'TTFT = 100 ms'),(685,970,('첫 토큰 → 마지막 토큰: 70 ms','First → last token: 70 ms')),(774,1020,('제출 → 종료 관측: E2E = 180 ms','Send → completion: E2E = 180 ms'))]:
        start=620 if y==685 else 120
        b+=f'<path d="M{start},{y-10} V{y+10} M{start},{y} H{end} M{end},{y-10} V{y+10}" stroke="{MUTED}" fill="none" stroke-width="2"/>'+text((start+end)/2,y-22,label,23,bold=True,anchor='middle')
    b+=text(1020,818,('종료 · 180 ms','Done · 180 ms'),22,MUTED,anchor='middle')
    b+=banner(859,('엔진에서 선택한 시각과 사용자가 받은 시각은 다릅니다.','Selection time differs from the time seen by the user.'),('청크가 여러 토큰을 담으면 청크 간격으로 개별 토큰의 ITL을 복원할 수 없습니다.','When chunks contain several tokens, chunk gaps do not reveal each token’s individual ITL.'))
    save(a,'01-observation-boundaries',('어디에서 시간을 재는지 먼저 정하기','Choose the observation boundary first'),('화살표는 선택된 토큰이 출력 처리를 거쳐 클라이언트에 도달하는 경로입니다.','Arrows show selected tokens passing through output handling to the client.'),b,1018,('엔진은 90, 120, 160ms에 토큰을 선택하고 클라이언트는 100, 130, 170ms에 관측합니다. 제출 0ms, 종료 180ms이며 TTFT는 100ms입니다.','The engine selects at 90, 120, 160ms and the client observes at 100, 130, 170ms. Submission is 0ms, completion 180ms, and TTFT 100ms.'),('TTFT는 이 그림에서 클라이언트 제출부터 첫 출력 관측까지다. 엔진의 토큰 선택, 출력 처리, 네트워크 전달과 종료 통지는 서로 다른 관측 지점을 만든다.','Here TTFT runs from client submission to first observed output. Engine selection, output processing, network delivery, and completion notification create different measurement boundaries.'))

    b=box(48,197,530,445,('한 요청 A: 시간 간격','One request A: time intervals'),('제출 0 ms · 토큰 100 / 130 / 170 ms\n종료 관측 180 ms · 출력 토큰 3개\n\nTTFT = 100 − 0 = 100 ms\nITL = 30 ms, 40 ms\nTPOT = (170 − 100) / (3 − 1)\n          = 35 ms/token\nE2E = 180 − 0 = 180 ms','Send 0 ms · tokens 100 / 130 / 170 ms\nCompletion 180 ms · 3 output tokens\n\nTTFT = 100 − 0 = 100 ms\nITL = 30 ms, 40 ms\nTPOT = (170 − 100) / (3 − 1)\n          = 35 ms/token\nE2E = 180 − 0 = 180 ms'),0)
    b+=box(622,197,530,445,('전체 서버: 10초 관측 창','Whole server: a 10-second window'),('이 창에서 요청 A·B·C 모두 완료\n출력 토큰: A 3개 · B 5개 · C 2개\n\n요청 처리량 = 3 / 10\n                  = 0.3 req/s\n출력 토큰 처리량 = (3 + 5 + 2) / 10\n                         = 1 tok/s\n입력 토큰은 이 분자에 포함하지 않음','A, B, C all finish within this window\nOutput tokens: A 3 · B 5 · C 2\n\nRequest throughput = 3 / 10\n                              = 0.3 req/s\nOutput throughput = (3 + 5 + 2) / 10\n                             = 1 tok/s\nInput tokens are not in this numerator'),1)
    b+=banner(685,('TPOT도 종료 경계의 정의를 확인해야 합니다.','Check the end boundary in the TPOT definition.'),('본문은 마지막 토큰 170 ms를 사용합니다. 종료 180 ms를 쓰면 TPOT는 40 ms입니다.','This article uses the last token at 170 ms. Using completion at 180 ms gives TPOT 40 ms.'),135)
    b+=banner(851,('개별 지연 시간의 역수는 서버 전체 처리량이 아닙니다.','The reciprocal of request latency is not whole-server throughput.'),('숫자는 계산 연습용입니다. 한 요청만으로 p95·p99 같은 지연 분포를 알 수 없습니다.','These are arithmetic examples. One request cannot establish latency percentiles such as p95/p99.'),135)
    save(a,'02-latency-throughput',('대기 시간과 처리량의 분모를 구별하기','Distinguish latency and throughput denominators'),('왼쪽은 한 요청의 시간 기록, 오른쪽은 서버 전체 관측 창의 별도 집계입니다.','Left: one request’s trace. Right: a separate count over the server’s observation window.'),b,1036,('출력 3개의 TTFT는 100ms, ITL은 30과 40ms, 마지막 토큰 기준 TPOT는 35ms, E2E는 180ms입니다. 10초간 3요청과 출력 10토큰은 0.3req/s와 1tok/s입니다.','Three outputs give TTFT 100ms, ITLs 30/40ms, last-token TPOT 35ms, and E2E 180ms. Three requests and 10 output tokens over 10s give 0.3req/s and 1tok/s.'),('TPOT는 첫 토큰 뒤의 시간을 나머지 출력 토큰 수로 나눈다. 마지막 토큰과 종료 통지 중 무엇을 끝점으로 쓰는지 확인하고, 처리량의 집계 대상과 관측 시간도 함께 적는다.','TPOT divides post-first-token time by the remaining output-token count. Check whether its endpoint is the last token or completion, and state throughput’s counted quantity and observation duration.'))

(ROOT/'scripts/inference-runtime-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
print(f'Generated {len(MANIFEST)} bilingual SVG figures.')
