from pathlib import Path
from html import escape
import json
ROOT=Path(__file__).resolve().parents[1]
R=ROOT/'public/images'
DIRS={'sp':'sequence-parallelism','cp':'context-parallelism'}
for folder in DIRS.values():(R/folder).mkdir(parents=True,exist_ok=True)
INK='#183149'; MUTED='#587084'; LINE='#d8e2ea'; C=['#2470bb','#b55b22','#168376','#7755ad']; F=['#eaf3fd','#fff0e3','#e7f5ef','#f1eafa']; PURPLE='#6750a4'
frames=[]
def text(x,y,s,size=22,color=INK,bold=False,anchor='start'):
 return ''.join(f'<text x="{x}" y="{y+i*size*1.4}" font-size="{size}" fill="{color}" font-weight="{700 if bold else 400}" text-anchor="{anchor}">{escape(t)}</text>' for i,t in enumerate(s.split('\n')))
def rect(x,y,w,h,fill='white',stroke=LINE,rx=10):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'
def path(d,color=MUTED,dash=False,end=True):return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="2" {"stroke-dasharray=\"6 5\"" if dash else ""} {"marker-end=\"url(#arrow)\"" if end else ""}/>'
def arrow(x,y,xx,yy,color=MUTED):return path(f'M{x},{y} L{xx},{yy}',color)
def pill(x,y,w,s,fill='#f0f4f7',color=INK):return rect(x,y,w,44,fill,fill)+text(x+w/2,y+29,s,20,color,True,'middle')
def mat(x,y,rows,cols,label='',values=None,color=None,split=None,cell=30,rowids=None,colids=None,colors=None):
 s=text(x+cols*cell/2,y-38 if colids else y-15,label,20,INK,True,'middle') if label else ''
 for i in range(rows):
  for j in range(cols):
   k=colors[i][j] if colors is not None else (0 if (j<cols/2 if split=='col' else i<rows/2) else 1) if split else color
   fill=F[k] if k is not None else '#f0f4f7';stroke=C[k] if k is not None else '#aabcc9'
   s+=f'<rect x="{x+j*cell}" y="{y+i*cell}" width="{cell}" height="{cell}" fill="{fill}" stroke="{stroke}" stroke-width="1"/>'
   if values is not None:s+=text(x+(j+.5)*cell,y+(i+.69)*cell,str(values[i][j]),min(21,cell*.59),INK,False,'middle')
 if rowids is not None:
  for i,v in enumerate(rowids):s+=text(x-10,y+(i+.7)*cell,str(v),min(19,cell*.65),MUTED,False,'end')
 if colids is not None:
  for j,v in enumerate(colids):s+=text(x+(j+.5)*cell,y-9,str(v),min(19,cell*.65),MUTED,False,'middle')
 return s

def lanes(y,h):return ''.join(rect(x,y,528,h,'white',C[i])+text(x+22,y+34,f'GPU {i}',24,C[i],True) for i,x in enumerate([48,624]))
def save(article,fig,step,title,subtitle,body,h,label,alt):
 slug=f'{article}-{fig:02}-step-{step}'
 s=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{h}" viewBox="0 0 1200 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title+" · "+label)}</title><desc id="desc">{escape(alt)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="{MUTED}" stroke-width="1.5"/></marker></defs><style>text{{font-family:Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}}path{{stroke-linecap:round;stroke-linejoin:round}}</style><rect width="1200" height="{h}" fill="white"/>'
 s+=text(40,48,title,30,bold=True)+text(40,87,subtitle,21,MUTED)+f'<path d="M40,112 H1160" stroke="{LINE}"/>'+body+'</svg>'
 (R/DIRS[article]/(slug+'.svg')).write_text(s);frames.append(dict(article=article,fig=fig,step=step,slug=slug,title=title,label=label,height=h,alt=alt))

# SP 1: tensor ownership through TP-only layer, matching the previously reviewed TP figures.
b=lanes(145,1160)
for k,left in enumerate([48,624]):
 def stage(y,title,kind,sub):
  s=rect(left+40,y,448,132,F[k] if kind=='tp' else '#f8fafc')+text(left+57,y+32,title,22,bold=True)
  s+=text(left+57,y+68,sub,19,MUTED)
  if kind=='tp':s+=mat(left+338,y+34,4,2,color=k,cell=24)+text(left+57,y+104,'모든 토큰 · 특징/헤드 일부',18,C[k])
  else:s+=mat(left+318,y+27,4,4,split='row',cell=24)+text(left+57,y+104,'모든 토큰 · 전체 특징',18,PURPLE)
  return s
 b+=stage(204,'정규화 (Norm)','sp','각 토큰의 전체 특징으로 계산')
 b+=arrow(left+264,339,left+264,366)+stage(374,'TP 어텐션','tp',f'GPU {k}가 맡은 헤드 계산')
 b+=pill(left+92,527,350,'All-Reduce → 결과 전체 복제',F[3],PURPLE)
 b+=arrow(left+264,509,left+264,524)+arrow(left+264,573,left+264,593)
 b+=stage(601,'잔차 연결 + 정규화','sp','잔차를 더한 뒤 정규화')
 b+=arrow(left+264,736,left+264,763)+stage(771,'TP FFN','tp',f'GPU {k}가 맡은 중간 특징 계산')
 b+=arrow(left+264,907,left+264,929)+pill(left+92,936,350,'All-Reduce → 결과 전체 복제',F[3],PURPLE)
 b+=arrow(left+264,983,left+264,1006)+stage(1014,'잔차 연결','sp','다음 레이어로 전달')
 b+=path(f'M{left+40},235 H{left+17} V632 H{left+37}',dash=True)
 b+=path(f'M{left+40},687 H{left+25} V1050 H{left+37}',dash=True)
 b+=text(left+264,1200,'정규화·잔차 구간의 같은 행렬을',21,anchor='middle')+text(left+264,1235,'두 GPU가 모두 가지고 계산',23,PURPLE,True,'middle')
b+=pill(195,1331,810,'SP가 줄이려는 것: TP 구간 사이의 활성값 복제와 중복 계산',F[3],PURPLE)
save('sp',1,0,'TP가 나누는 계산과, 그 사이에 남는 중복','행렬의 행 = 토큰 4개 · 열 = 특징 4개   |   점선 = 같은 GPU의 잔차 경로',b,1410,'TP만 적용한 레이어','두 GPU가 어텐션 헤드와 FFN 중간 특징을 나누지만 정규화와 잔차 구간에는 동일한 4×4 활성값을 갖는다.')

# SP 2: local normalization with actual row values and residual correspondence.
X=[[1,2,3,4],[2,1,2,1],[3,1,1,3],[4,2,2,4]]
b=text(600,156,'같은 입력 X를 토큰 행으로 나눕니다',24,bold=True,anchor='middle')
b+=mat(504,212,4,4,'',X,split='row',cell=48,rowids=['t0','t1','t2','t3'],colids=['h0','h1','h2','h3'])
b+=text(760,249,'각 행은 토큰 하나',22,bold=True)+text(760,285,'h0~h3 = 그 토큰의 특징',20,MUTED)
b+=path('M504,258 H312 V447',C[0])+path('M696,354 H888 V447',C[1])
b+=lanes(462,520)
for k,left in enumerate([48,624]):
 ids=[f't{2*k}',f't{2*k+1}'];vals=X[k*2:k*2+2]
 b+=mat(left+83,558,2,4,'입력 조각',vals,color=k,cell=36,rowids=ids)
 b+=arrow(left+236,595,left+286,595)+mat(left+324,558,2,4,'정규화 결과',color=k,cell=36,rowids=ids)
 b+=text(left+264,685,'한 행의 h0~h3가 모두 여기에 있습니다.',21,C[k],True,'middle')
 b+=text(left+264,722,'RMSNorm: 같은 행의 제곱 평균으로 크기 조정',19,MUTED,False,'middle')
 b+=mat(left+61,818,2,4,'결과 조각',color=k,cell=24,rowids=ids)+text(left+177,850,'+',28)
 b+=mat(left+235,818,2,4,'같은 토큰의 잔차',color=k,cell=24)+text(left+350,850,'=',28)+mat(left+401,818,2,4,'',color=k,cell=24)
 b+=text(left+264,927,'잔차도 같은 토큰끼리 더하면 됩니다.',21,anchor='middle')
b+=pill(192,1015,816,'정규화와 잔차 연결: 다른 GPU의 토큰 없이 계산',F[2],C[2])
b+=text(600,1110,'이 구간의 활성값: GPU마다 4×4 전체 → 2×4 조각',24,bold=True,anchor='middle')
save('sp',2,0,'토큰을 나누되, 한 토큰의 특징은 모두 갖습니다','SP 구간의 예: RMSNorm과 잔차 연결 · 파랑 t0·t1 / 주황 t2·t3',b,1150,'토큰별 정규화와 잔차','4×4 입력의 두 행씩을 GPU에 배치한다. 각 GPU에 한 토큰의 특징 네 개가 모두 있어 RMSNorm과 대응 토큰의 잔차 덧셈을 독립적으로 수행한다.')

# SP 3: exact matrix math, row shards -> full input -> feature shards -> partials -> reduced row shards.
U=[[1,0,1,0],[0,1,0,1],[1,1,0,0],[0,0,1,1]]
V=[[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1]]
def mm(a,b):return [[sum(v*w for v,w in zip(row,col)) for col in zip(*b)] for row in a]
H=[mm(X,[row[k*2:k*2+2] for row in U]) for k in range(2)]
P=[mm(H[k],V[k*2:k*2+2]) for k in range(2)]
Y=mm(mm(X,U),V)
assert [[P[0][i][j]+P[1][i][j] for j in range(4)] for i in range(4)]==Y
labels=['SP: 토큰 조각','All-Gather: 입력 모으기','TP: 열 분할과 활성화','TP: 행 분할의 부분합','Reduce-Scatter: 합산 후 토큰 분할']
for step in range(5):
 b=''
 for n,label in enumerate(['SP','All-Gather','열 분할','행 분할','Reduce-Scatter']):
  x=40+n*233;b+=pill(x,136,220,label,F[3] if n==step else '#f3f5f7',PURPLE if n==step else MUTED)
 b+=lanes(206,598)
 for k,left in enumerate([48,624]):
  rows=2 if step in [0,4] else 4;ids=[f't{i}' for i in (range(k*2,k*2+2) if rows==2 else range(4))]
  vals=X[k*2:k*2+2] if step==0 else X if step==1 else H[k] if step==2 else P[k] if step==3 else Y[k*2:k*2+2]
  title=['토큰 조각 X','모든 토큰의 X',f'활성화된 특징 조각 H{k}',f'부분합 P{k}','완성된 출력의 토큰 조각'][step]
  cols=2 if step==2 else 4
  if step in [2,3]:
   if step==2:
    b+=mat(left+36,322,4,4,'X',cell=24,split='row')+text(left+152,381,'×',26)+mat(left+214,322,4,2,f'U{k} · 열 조각',values=[row[k*2:k*2+2] for row in U],color=k,cell=24)
    b+=text(left+296,381,'→',28)+pill(left+350,342,150,'활성화 f',F[k],C[k])
   else:
    b+=mat(left+64,322,4,2,f'H{k}',color=k,cell=24)+text(left+151,381,'×',26)+mat(left+234,346,2,4,f'V{k} · 행 조각',values=V[k*2:k*2+2],color=k,cell=24)+text(left+370,381,'=',28)
   yy=510
  elif step==4:
   b+=mat(left+82,340,2,4,'P0의 담당 토큰',values=P[0][k*2:k*2+2],color=0,cell=32)+text(left+247,388,'+',28)+mat(left+323,340,2,4,'P1의 담당 토큰',values=P[1][k*2:k*2+2],color=1,cell=32)
   b+=arrow(left+264,420,left+264,477)
   yy=523
  else:yy=380
  b+=mat(left+(528-cols*42)/2,yy,rows,cols,title,vals,color=k if step!=1 else None,split='row' if step==1 else None,cell=42,rowids=ids,colids=[f'f{k*2+j}' for j in range(2)] if step==2 else None)
  line=[f't{2*k}·t{2*k+1}의 전체 특징', '같은 X로 서로 다른 가중치 열을 계산', '모든 토큰 · 중간 특징의 절반', '모든 토큰 · 출력 특징 전체의 부분합', f't{2*k}·t{2*k+1}의 전체 출력 특징'][step]
  b+=text(left+264,737,line,21,C[k],True,'middle')
 if step==0:
  b+=text(600,866,'정규화를 마친 입력을 토큰별로 나눠 가진 상태',24,bold=True,anchor='middle')
  b+=text(600,909,'다음 TP Linear에서는 두 GPU가 같은 X의 서로 다른 출력 특징을 계산합니다.',21,MUTED,False,'middle')
 elif step==1:
  b+=pill(284,842,632,'All-Gather: t0·t1 조각과 t2·t3 조각을 모음',F[3],PURPLE)
  b+=text(600,925,'각 GPU가 모든 토큰의 입력을 갖고, 자기 가중치 열 조각을 적용합니다.',21,anchor='middle')
 elif step==2:
  b+=pill(259,842,682,'각 특징 값이 완성되어 원소별 활성화를 바로 적용',F[2],C[2])
  b+=text(600,925,'예시는 ReLU: 양수는 그대로 유지 · 다음 Linear까지 중간 통신 없음',21,anchor='middle')
 elif step==3:
  b+=text(600,861,'같은 출력 위치에 대한 P0와 P1이 생겼습니다.',24,bold=True,anchor='middle')
  b+=text(600,908,'예: t0의 첫 특징 → GPU 0의 4 + GPU 1의 5 = 9',22,PURPLE,True,'middle')
 else:
  b+=pill(235,842,730,'Reduce-Scatter: 같은 위치의 P0 + P1을 더하고 토큰별로 분배',F[3],PURPLE)
  b+=text(600,925,'출력을 단순히 반으로 버리는 것이 아니라, 두 부분합을 합쳐 완성합니다.',21,anchor='middle')
 b+=text(600,994,'같은 두 GPU가 SP 구간에서는 토큰을, TP 구간에서는 중간 특징을 나눕니다.',22,bold=True,anchor='middle')
 save('sp',3,step,'SP와 TP의 경계에서 데이터 배치를 바꾸기','4개 토큰 · 입력/중간/출력 특징 각 4개 · 숫자는 작은 FFN 예시',b,1040,labels[step],title+'; '+line+'; '+labels[step])

# SP 4: complete pre-norm forward layer with SP/TP boundaries and local residual paths.
b=lanes(144,1510)
for k,left in enumerate([48,624]):
 def snode(y,label,layout='sp',small=''):
  s=rect(left+53,y,440,76,F[k] if layout=='tp' else '#f8fafc')+text(left+69,y+30,label,20,bold=True)
  if small:s+=text(left+69,y+58,small,17,MUTED)
  rows,cols=(2,4) if layout=='sp' else (4,2) if layout=='tp' else (4,4)
  s+=mat(left+389,y+13,rows,cols,color=k if layout!='full' else None,split='row' if layout=='full' else None,cell=12)
  return s
 b+=snode(206,'SP: 정규화','sp',f't{2*k}·t{2*k+1} / 전체 특징')
 b+=snode(405,'TP: QKV Projection','tp','모든 토큰 / 담당 헤드')
 b+=snode(508,'TP: 담당 헤드의 어텐션','tp','모든 토큰의 Q·K·V로 계산')
 b+=snode(611,'TP: Output Projection','full','출력의 부분합 P'+str(k))
 b+=snode(811,'SP: 잔차 연결','sp','합산이 끝난 담당 토큰 + 같은 토큰의 잔차')
 b+=snode(914,'SP: 정규화','sp','같은 토큰 배치를 유지')
 b+=snode(1113,'TP: 첫 Linear + 활성화','tp','모든 토큰 / 중간 특징 일부')
 b+=snode(1216,'TP: 둘째 Linear','full','출력의 부분합 P'+str(k))
 b+=snode(1416,'SP: 잔차 연결','sp','담당 토큰의 전체 특징 → 다음 레이어')
 for y,yy in [(283,312),(384,403),(483,506),(586,609),(689,712),(788,809),(889,912),(993,1019),(1092,1111),(1191,1214),(1294,1317),(1395,1414)]:b+=arrow(left+272,y,left+272,yy)
 for y,kind in [(317,'All-Gather'),(718,'Reduce-Scatter'),(1026,'All-Gather'),(1324,'Reduce-Scatter')]:
  b+=pill(left+131,y,282,kind,F[3],PURPLE)
  b+=text(left+272,y+65,'모든 토큰의 입력' if kind=='All-Gather' else '합산 + 담당 토큰만 보유',18,PURPLE,False,'middle')
 b+=path(f'M{left+53},220 H{left+20} V850 H{left+51}',dash=True)
 b+=path(f'M{left+53},850 H{left+32} V1454 H{left+51}',dash=True)
 b+=text(left+272,1571,'SP: 토큰 절반 / 전체 특징',21,C[k],True,'middle')+text(left+272,1605,'TP 내부: 모든 토큰 / 특징·헤드 일부',21,C[k],True,'middle')
for y in [339,740,1048,1346]:b+=path(f'M580,{y-7} H620',PURPLE)+path(f'M620,{y+7} H580',PURPLE)
b+=text(600,1710,'TP의 All-Reduce를 Reduce-Scatter와 All-Gather로 나눠 배치',24,PURPLE,True,'middle')
b+=text(600,1752,'그 사이 정규화·잔차 구간에서는 담당 토큰 조각만 유지합니다.',22,anchor='middle')
save('sp',4,0,'한 레이어에서 SP 영역과 TP 영역을 연결하기','같은 GPU 두 개 · 기본 Pre-Norm 순전파 · 보라 = 집합 통신 / 점선 = 로컬 잔차',b,1790,'레이어 전체의 통신 경계','SP 정규화 뒤 All-Gather, TP 어텐션 뒤 Reduce-Scatter, SP 잔차 및 정규화 뒤 All-Gather, TP FFN 뒤 Reduce-Scatter. 잔차는 담당 토큰의 배치를 유지한다.')

# CP 1: compare coverage without conflating TP parameter sharding and CP token sharding.
b=''
for side,left in enumerate([48,624]):
 b+=rect(left,146,528,1180)+text(left+264,186,'SP + TP' if side==0 else 'CP만 적용',28,bold=True,anchor='middle')
 b+=text(left+264,225,'Megatron SP · 가중치는 TP로 분할' if side==0 else '모델 가중치는 두 GPU에 동일하게 보유',19,MUTED,False,'middle')
 for stage,(y,title) in enumerate([(282,'정규화'),(612,'어텐션'),(942,'FFN')]):
  b+=text(left+264,y,title,24,bold=True,anchor='middle')
  for k in range(2):
   xx=left+47+k*244;yy=y+34
   b+=rect(xx,yy,192,180,F[k],C[k])+text(xx+96,yy+31,f'GPU {k}',21,C[k],True,'middle')
   r,c=(2,4) if side==1 or stage==0 else (4,2)
   b+=mat(xx+96-c*13,yy+110-r*13,r,c,color=k,cell=26)
  note=('담당 토큰 / 전체 특징' if side==1 or stage==0 else '모든 토큰 / 특징·헤드 일부')
  b+=text(left+264,y+246,note,21,bold=True,anchor='middle')
  if stage<2:b+=arrow(left+264,y+270,left+264,y+291)
 b+=pill(left+38,1242,452,'TP로 들어갈 때 전체 토큰 입력을 모음' if side==0 else '내 Q도 다른 토큰의 K·V가 필요',F[3],PURPLE)
b+=pill(190,1362,820,'CP의 핵심 문제: 문맥을 나눠도 토큰 사이의 어텐션 연결은 유지',F[2],C[2])
b+=text(600,1450,'CP 쪽은 Q와 최종 출력의 토큰 소유권을 표시합니다.',21,anchor='middle')
b+=text(600,1487,'어텐션 내부에서는 K·V를 옮기거나, 토큰·헤드 배치를 바꿔 계산합니다.',21,MUTED,False,'middle')
save('cp',1,0,'SP와 CP는 어디까지 토큰을 나눠 처리할까요?','행 = 토큰 · 열 = 특징   |   기본 순전파, TP와 CP를 결합한 경우는 생략',b,1530,'SP와 CP의 분할 범위','SP와 TP의 결합은 정규화에서 토큰을 나누고 어텐션과 FFN에서는 모든 토큰의 일부 특징을 계산한다. CP 단독은 토큰을 나눠 맡고 어텐션에서 타 GPU 정보와 연결한다.')

# CP 2: causal matrix and concrete cross-token dependency.
b=lanes(147,252)
for k,left in enumerate([48,624]):
 ids=[f't{k*2}',f't{k*2+1}']
 for j,lab in enumerate(['Q','K','V']):b+=mat(left+74+j*164,238,2,2,lab,color=k,cell=36,rowids=ids if j==0 else None)
 b+=text(left+264,365,'내 토큰에서 Q·K·V를 계산',22,C[k],True,'middle')
b+=text(600,453,'Q 한 행은 참조 가능한 모든 K·V에 연결됩니다.',25,bold=True,anchor='middle')
x=238;y=548;cell=82
for i in range(4):
 for j in range(4):
  k=i//2;fill=F[k] if j<=i else '#f5f6f7';stroke=C[k] if j<=i else LINE
  b+=rect(x+j*cell,y+i*cell,cell,cell,fill,stroke,0)
  b+=text(x+(j+.5)*cell,y+(i+.63)*cell,'●' if j<=i else '—',26,C[k] if j<=i else '#c3cbd2',False,'middle')
 b+=text(x-20,y+(i+.64)*cell,f'Q(t{i})',22,C[i//2],True,'end')
 b+=text(x+(i+.5)*cell,y-22,f'K(t{i})',21,C[i//2],True,'middle')
b+=rect(x,y+3*cell,4*cell,cell,'none',C[1],2)
b+=text(670,583,'예: GPU 1의 Q(t3)',25,C[1],True)+text(670,629,'t0·t1의 K·V → GPU 0에 있음',22,C[0],True)+text(670,671,'t2·t3의 K·V → GPU 1에 있음',22,C[1],True)
b+=text(670,746,'로컬 토큰만 계산하면',23,bold=True)+text(670,783,'앞선 문맥 t0·t1을 빠뜨립니다.',23,bold=True)
b+=text(402,922,'● 계산하는 토큰 쌍   — 미래 토큰: 마스킹',21,MUTED,False,'middle')
b+=pill(186,968,828,'Ring: K·V 블록을 순환  /  Ulysses: 전체 문맥을 헤드별로 재배치',F[3],PURPLE)
save('cp',2,0,'토큰을 나눠도 어텐션의 연결은 끊을 수 없습니다','인과적 어텐션 예시 · 행 = 질의 Q의 토큰 / 열 = 참조할 K의 토큰',b,1050,'다른 GPU의 K·V가 필요한 이유','GPU 1의 Q(t3)는 GPU 0에 있는 토큰 t0,t1의 K,V도 필요하다. 하삼각형 행렬에서 GPU 경계를 넘는 참조를 보여준다.')

# CP 3: Ring sequence, keeping Q fixed; all-to-all token attention without causal mask for clarity.
positions=[(442,155),(827,410),(442,671),(57,410)]
for step in range(5):
 final=step==4;n=min(step,3)
 b=''
 for k,(xx,yy) in enumerate(positions):
  origin=(k-n)%4
  b+=rect(xx,yy,316,198,'white',C[k])+text(xx+18,yy+33,f'GPU {k}',24,C[k],True)
  b+=mat(xx+30,yy+88,2,2,f'Q{k} 고정',color=k,cell=26)
  if final:
   b+=arrow(xx+120,yy+111,xx+177,yy+111)+mat(xx+217,yy+88,2,2,f'출력 O{k}',color=k,cell=26)
  else:
   b+=mat(xx+140,yy+88,2,2,f'K{origin}',color=origin,cell=26)+mat(xx+236,yy+88,2,2,f'V{origin}',color=origin,cell=26)
  b+=text(xx+158,yy+176,f'내 토큰 t{2*k}·t{2*k+1}의 출력 완성' if final else f'Q: t{2*k}·t{2*k+1}   KV: t{2*origin}·t{2*origin+1}',18,MUTED,False,'middle')
 paths=['M759,255 C938,255 985,326 985,400','M985,618 C985,743 915,770 768,770','M432,770 C245,770 215,708 215,618','M215,400 C215,276 289,255 432,255']
 if not final:
  for d in paths:b+=path(d,C[2])
 b+=text(600,438,'내 토큰의 어텐션 완성' if final else 'Q는 제자리에',25,bold=True,anchor='middle')+text(600,480,'다음 연산으로 전달' if final else 'K·V 블록만 순환',25,C[2],True,'middle')
 b+=pill(417,521,366,'4개 블록 계산 완료' if final else f'{n+1} / 4 블록 계산',F[3],PURPLE)
 b+=text(600,606,'GPU 0을 아래에서 따라갑니다',20,MUTED,False,'middle')
 b+=rect(48,920,1104,337,'#f8fafc')+text(76,960,'GPU 0: Q0가 참조한 K·V 블록' if final else 'GPU 0: 참조한 K·V 블록 · 진한 테두리 = 현재 블록',25,C[0],True)
 order=[(-s)%4 for s in range(n+1)];assert len(set(order))==n+1
 for j in range(8):
  origin=j//2;done=origin in order
  b+=text(130+j*62,1007,f't{j}',20,C[origin],True,'middle')
  for r in range(2):
   b+=rect(100+j*62,1022+r*48,60,46,F[origin] if done else 'white',C[origin] if done else LINE,0)
   if done:b+=text(130+j*62,1053+r*48,'●',23,C[origin],False,'middle')
 if not final:b+=f'<rect x="{100+((-n)%4)*124}" y="1022" width="122" height="94" rx="0" fill="none" stroke="{INK}" stroke-width="3"/>'
 for r in range(2):b+=text(89,1053+r*48,f't{r}',20,C[0],True,'end')
 b+=text(720,1015,'방문 순서: '+ ' → '.join('KV'+str(v) for v in order),20,bold=True)
 b+=text(720,1059,'Q0 × Kᵀ → 점수',20)+text(720,1094,'현재 V → 누적 출력에 반영',20)
 b+=text(76,1159,'누적하는 것: 가중합 + 정규화에 필요한 최댓값·분모',23,PURPLE,True)
 b+=text(76,1208,'전체 참조 범위에 맞춘 출력 O0 완성' if final else '블록별 평균을 더하지 않고, 같은 Softmax 기준으로 누적합니다.',22,bold=final)
 b+=text(600,1310,'모든 GPU가 자기 Q에 대해 같은 과정을 동시에 진행합니다.',23,bold=True,anchor='middle')
 labels=['로컬 K·V 계산','첫 번째 전달과 계산','두 번째 전달과 계산','세 번째 전달과 계산','정규화된 출력 완성']
 save('cp',3,step,'Ring: Q는 두고, K·V 블록을 차례로 가져옵니다','한 헤드의 토큰 8개를 GPU 4개에 분할 · 모든 토큰을 참조하는 예시',b,1350,labels[step],f'단계 {step+1}. GPU 0은 Q(t0,t1)을 유지하며 '+', '.join('KV'+str(v) for v in order)+' 블록의 기여를 정규화 통계와 함께 누적한다.')

# CP 4: Ulysses, rank-coded token ownership and head-coded borders in actual token x head grid.
for step in range(5):
 b=''
 for j,lab in enumerate(['토큰 분할','All-to-All','헤드별 어텐션','역 All-to-All','토큰 분할 복원']):b+=pill(40+j*233,137,220,lab,F[3] if j==step else '#f3f5f7',PURPLE if j==step else MUTED)
 b+=lanes(213,621)
 for k,left in enumerate([48,624]):
  tokenlayout=step in [0,4];r,c=(2,2) if tokenlayout else (4,1)
  ids=list(range(k*2,k*2+2)) if tokenlayout else list(range(4));heads=[0,1] if tokenlayout else [k]
  # three side-by-side real Q/K/V grids until output stage
  labs=['Q','K','V'] if step in [0,1] else ['O = Attention(Q,K,V)']
  for j,lab in enumerate(labs):
   xx=left+70+j*159 if len(labs)==3 else left+264-c*30
   yy=365
   colors=[[i//2 for h in heads] for i in ids]
   vals=[[f'h{h}' for h in heads] for i in ids]
   b+=mat(xx,yy,r,c,lab,vals,cell=49 if len(labs)==3 else 60,rowids=['t'+str(i) for i in ids],colors=colors)
  if step==2:
   b+=text(left+264,753,f'헤드 h{k}: Q의 모든 토큰 × K의 모든 토큰',20,C[k],True,'middle')
  elif step==3:
   b+=text(left+264,753,'내 헤드의 출력을 다시 토큰별로 전송',21,C[k],True,'middle')
  else:
   b+=text(left+264,753,'내 토큰 / 모든 헤드' if tokenlayout else '모든 토큰 / 내 헤드',23,C[k],True,'middle')
 if step in [1,3]:
  b+=arrow(365,637,834,637,PURPLE)+text(600,621,'t0·t1의 h1 → GPU 1' if step==1 else 't2·t3의 h0 출력 → GPU 1',20,PURPLE,True,'middle')
  b+=arrow(834,701,365,701,PURPLE)+text(600,683,'t2·t3의 h0 → GPU 0' if step==1 else 't0·t1의 h1 출력 → GPU 0',20,PURPLE,True,'middle')
 if step==0:
  b+=text(600,893,'각 GPU가 자기 토큰에서 모든 헤드의 Q·K·V를 만듭니다.',24,bold=True,anchor='middle')
  b+=text(600,940,'파랑 행 = t0·t1  /  주황 행 = t2·t3  /  한 칸 = 해당 토큰·헤드의 벡터',20,MUTED,False,'middle')
 elif step==1:
  b+=pill(193,864,814,'All-to-All: h0 데이터는 GPU 0으로, h1 데이터는 GPU 1로',F[3],PURPLE)
  b+=text(600,949,'Q·K·V 모두 재배치: 각 GPU는 자기 헤드의 전체 문맥을 갖습니다.',22,bold=True,anchor='middle')
 elif step==2:
  b+=pill(276,864,648,'각 헤드의 전체 문맥이 한 GPU에 모여 있습니다.',F[2],C[2])
  b+=text(600,949,'담당 헤드의 어텐션을 로컬에서 완성합니다.',24,bold=True,anchor='middle')
 elif step==3:
  b+=pill(166,864,868,'역 All-to-All: t0·t1 출력은 GPU 0으로, t2·t3 출력은 GPU 1로',F[3],PURPLE)
  b+=text(600,949,'Q·K·V를 되돌리는 대신, 계산된 어텐션 출력 O를 재배치합니다.',22,bold=True,anchor='middle')
 else:
  b+=pill(216,864,768,'내 토큰의 모든 헤드가 모임 → Output Projection → FFN',F[2],C[2])
  b+=text(600,949,'모델 가중치는 복제한 채, 활성값의 토큰·헤드 배치를 바꿨습니다.',22,bold=True,anchor='middle')
 b+=text(600,1025,'예: 토큰 4개 · 헤드 2개 · GPU 2개 / 기본 멀티헤드 어텐션',21,MUTED,False,'middle')
 save('cp',4,step,'Ulysses: 토큰 분할을 헤드 분할로 바꿔 계산합니다','가중치 분할이 아니라 Q·K·V와 출력의 재배치 · 이 방식도 원문에서는 Sequence Parallelism으로 부릅니다.',b,1070,['토큰별 Q·K·V','Q·K·V All-to-All','담당 헤드의 어텐션','출력의 역 All-to-All','토큰별 출력 복원'][step],['각 GPU가 두 토큰의 두 헤드를 갖는다.','GPU 0은 모든 토큰의 h0, GPU 1은 모든 토큰의 h1의 Q,K,V를 갖는다.','각 GPU가 담당 헤드의 전체 문맥 어텐션을 계산한다.','전체 토큰, 일부 헤드의 출력 O를 원래 토큰 소유자에게 보낸다.','각 GPU가 담당 토큰의 모든 헤드 출력을 갖고 로컬 Output Projection과 FFN으로 이어간다.'][step])

# CP 5: exact causal work counts; preserve positions while changing ownership.
for step in range(2):
 owners=[0,0,0,0,1,1,1,1] if step==0 else [0,0,1,1,1,1,0,0]
 counts=[sum(i+1 for i in range(8) if owners[i]==k) for k in range(2)]
 assert counts==([10,26] if step==0 else [18,18])
 b=text(600,159,'연속한 토큰 4개씩 배치' if step==0 else '앞·뒤 토큰을 묶어 배치',27,bold=True,anchor='middle')
 x=173;y=238;c=66
 for i in range(8):
  k=owners[i];b+=text(x-17,y+(i+.65)*c,'t'+str(i),22,C[k],True,'end')+text(x+(i+.5)*c,y-22,'t'+str(i),20,MUTED,False,'middle')
  for j in range(8):
   b+=rect(x+j*c,y+i*c,c,c,F[k] if j<=i else '#fafafa',C[k] if j<=i else LINE,0)
   if j<=i:b+=text(x+(j+.5)*c,y+(i+.66)*c,'●',24,C[k],False,'middle')
 for k in range(2):
  yy=260+k*240
  b+=rect(775,yy,355,198,F[k],C[k])+text(797,yy+40,f'GPU {k}',26,C[k],True)
  b+=text(797,yy+83,' · '.join('t'+str(i) for i in range(8) if owners[i]==k),23,bold=True)
  b+=text(797,yy+130,' + '.join(str(i+1) for i in range(8) if owners[i]==k),23)
  b+=text(797,yy+171,f'= {counts[k]}개 토큰 쌍',25,C[k],True)
 b+=text(436,820,'행: Q 토큰 / 열: K 토큰 / ●: 계산할 참조',21,MUTED,False,'middle')
 b+=pill(173,871,922,'토큰 수는 같아도 계산량이 다릅니다.' if step==0 else '토큰의 원래 위치와 인과 마스크는 그대로, 담당 GPU만 변경합니다.',F[3],PURPLE)
 b+=text(600,976,'늦은 토큰일수록 더 많은 앞선 토큰을 참조합니다.' if step==0 else '여기서는 토큰 쌍 수를 맞췄습니다. 실제 시간은 통신·커널 구현에도 달려 있습니다.',21,anchor='middle')
 save('cp',5,step,'인과적 어텐션에서는 토큰 배치도 중요합니다','토큰 8개 · GPU 2개 · 각 GPU의 Q가 계산할 토큰 쌍 수를 비교',b,1020,['연속 토큰 분할','앞·뒤 토큰을 묶은 분할'][step],f'GPU 0과 GPU 1이 각각 네 토큰을 맡는다. 계산할 토큰 쌍은 {counts[0]} 대 {counts[1]}이다. 원래 토큰 위치와 causal mask는 변하지 않는다.')

# Numerical invariants supporting the interactive diagrams.
assert P[0][0][0]==4 and P[1][0][0]==5 and Y[0][0]==9
for k in range(4):assert sorted((k-s)%4 for s in range(4))==[0,1,2,3]
source=[{(t,h) for t in range(k*2,k*2+2) for h in range(2)} for k in range(2)]
heads=[{(t,k) for t in range(4)} for k in range(2)]
assert set.union(*source)==set.union(*heads) and not (heads[0]&heads[1])

print(f'{len(frames)} SVG states. Matrix partial sums, Ring coverage, Ulysses ownership, and causal counts verified.')

# English uses the same geometry and values; missing translations fail generation.
import re
from html import unescape
translations=json.loads((ROOT/'scripts/sp-cp-figure-en.json').read_text())
def en(s):
 if s in translations:return translations[s]
 if not re.search('[가-힣]',s):return s
 patterns=[
  (r'GPU (\d)가 맡은 중간 특징 계산',r'GPU \1’s hidden features'),
  (r'GPU (\d)가 맡은 헤드 계산',r'GPU \1’s assigned heads'),
  (r'Q(\d) 고정',r'Q\1 fixed'),(r'출력 O(\d)',r'Output O\1'),
  (r'내 토큰 (t\d·t\d)의 출력 완성',r'Output for \1 complete'),
  (r'(\d) / 4 블록 계산',r'\1 / 4 blocks processed'),
  (r'방문 순서: (.*)',r'Visited: \1'),(r'= (\d+)개 토큰 쌍',r'= \1 token pairs'),
  (r'(t\d·t\d)의 전체 출력 특징',r'All output features of \1'),
  (r'(t\d·t\d)의 전체 특징',r'All features of \1'),
  (r'(t\d·t\d) / 전체 특징',r'\1 / All features'),
  (r'(U\d) · 열 조각',r'\1 · Column shard'),(r'(V\d) · 행 조각',r'\1 · Row shard'),
  (r'활성화된 특징 조각 (H\d)',r'Activated feature shard \1'),
  (r'(?:출력의 )?부분합 (P\d)',r'Partial sum \1'),
  (r'헤드 (h\d): Q의 모든 토큰 × K의 모든 토큰',r'Head \1: All Q tokens × All K tokens'),
 ]
 for pattern,replacement in patterns:
  if re.fullmatch(pattern,s):return re.sub(pattern,replacement,s)
 if ' · ' in s:return ' · '.join(en(p) for p in s.split(' · '))
 raise ValueError('Missing English label: '+s)
steps={locale:{'sp':{},'cp':{}} for locale in ['ko','en']}
for f in frames:
 folder=R/DIRS[f['article']]
 (folder/'en').mkdir(exist_ok=True)
 svg=(folder/(f['slug']+'.svg')).read_text()
 svg=re.sub(r'>([^<>]+)<',lambda m:'>'+escape(en(unescape(m[1])))+'<',svg)
 (folder/'en'/(f['slug']+'.svg')).write_text(svg)
 for locale in steps:
  t=lambda s:en(s) if locale=='en' else s
  steps[locale][f['article']].setdefault(str(f['fig']),[]).append(dict(slug=f['slug'],label=t(f['label']),alt=t(f['alt']),height=f['height']))
(ROOT/'src/data/sp-cp-steps.json').write_text(json.dumps(steps,ensure_ascii=False,indent=2)+'\n')
