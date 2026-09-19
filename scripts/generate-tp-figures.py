from pathlib import Path
from html import escape
import json
R=Path(__file__).resolve().parents[1]/'public/images/tensor-parallelism'
R.mkdir(parents=True,exist_ok=True)
INK='#183149'; MUTED='#587084'; LINE='#d8e2ea'; C=['#2470bb','#b55b22']; F=['#eaf3fd','#fff0e3']; PURPLE='#6750a4'
frames=[]
SUB=['₀','₁']
def text(x,y,s,size=22,color=INK,bold=False,anchor='start'):
 return ''.join(f'<text x="{x}" y="{y+i*size*1.4}" font-size="{size}" fill="{color}" font-weight="{700 if bold else 400}" text-anchor="{anchor}">{escape(t)}</text>' for i,t in enumerate(s.split('\n')))
def rect(x,y,w,h,fill='white',stroke=LINE,rx=10):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'
def arrow(x,y,xx,yy,color=MUTED,dash=False):return f'<path d="M{x},{y} L{xx},{yy}" fill="none" stroke="{color}" stroke-width="2" {"stroke-dasharray=\"6 5\"" if dash else ""} marker-end="url(#arrow)"/>'
def group(s,on):return '<g opacity="'+('1' if on else '.12')+'">'+s+'</g>'
def pill(x,y,w,s,fill='#f0f4f7',color=INK):return rect(x,y,w,44,fill,fill)+text(x+w/2,y+29,s,20,color,True,'middle')
def mat(x,y,rows,cols,label='',values=None,color=None,split=None,cell=30):
 s=''
 if label:s+=text(x+cols*cell/2,y-15,label,20,INK,True,'middle')
 for i in range(rows):
  for j in range(cols):
   k=(0 if (j<cols/2 if split=='col' else i<rows/2) else 1) if split else color
   fill=F[k] if k is not None else '#f0f4f7';stroke=C[k] if k is not None else '#aabcc9'
   s+=f'<rect x="{x+j*cell}" y="{y+i*cell}" width="{cell}" height="{cell}" fill="{fill}" stroke="{stroke}" stroke-width="1"/>'
   if values is not None:s+=text(x+(j+.5)*cell,y+(i+.69)*cell,str(values[i][j]),min(23,cell*.60),INK,False,'middle')
 if split:
  xx=x+cols*cell/2 if split=='col' else x;yy=y if split=='col' else y+rows*cell/2
  xe=xx if split=='col' else x+cols*cell;ye=y+rows*cell if split=='col' else yy
  s+=f'<path d="M{xx},{yy} L{xe},{ye}" stroke="white" stroke-width="5"/>'
 return s

def lanes(y,h):
 return ''.join(rect(x,y,528,h,'white',C[i])+text(x+22,y+34,f'GPU {i}',24,C[i],True) for i,x in enumerate([48,624]))
def save(fig,step,title,subtitle,body,h,label):
 slug=f'{fig:02}-step-{step}'
 s=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{h}" viewBox="0 0 1200 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title+" · "+label)}</title><desc id="desc">{escape(subtitle)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="{MUTED}" stroke-width="1.5"/></marker></defs><style>text{{font-family:Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}}path{{stroke-linecap:round;stroke-linejoin:round}}</style><rect width="1200" height="{h}" fill="white"/>'
 s+=text(40,48,title,30,bold=True)+text(40,87,subtitle,21,MUTED)+f'<path d="M40,112 H1160" stroke="{LINE}"/>'+body+'</svg>'
 (R/(slug+'.svg')).write_text(s);frames.append(dict(fig=fig,step=step,slug=slug,title=title,label=label,height=h))

def mm(a,b):return [[sum(v*w for v,w in zip(row,col)) for col in zip(*b)] for row in a]
X=[[1,2,0,1],[0,1,2,1]];W=[[1,0,2,1],[0,1,1,0],[1,1,0,2],[2,0,1,1]];Y=mm(X,W)
assert Y==[[3,2,5,2],[4,3,2,5]]
cols=[mm(X,[r[k*2:k*2+2] for r in W]) for k in range(2)]
parts=[mm([r[k*2:k*2+2] for r in X],W[k*2:k*2+2]) for k in range(2)]
assert [cols[0][i]+cols[1][i] for i in range(2)]==Y
assert [[parts[0][i][j]+parts[1][i][j] for j in range(4)] for i in range(2)]==Y
for fig in [1,2]:
 for step in range(3):
  row=fig==2
  b=text(48,148,'분할 전: 같은 X × W = Y',23,bold=True)
  b+=mat(90,218,2,4,'X · 2×4',X,split='col' if row else None,cell=36)+text(300,265,'×',34)
  b+=mat(420,182,4,4,'W · 4×4',W,split='row' if row else 'col',cell=36)+text(700,265,'=',34)
  b+=mat(875,218,2,4,'Y · 2×4',Y,split=None if row else 'col',cell=36)
  b+=text(90,349,'X의 행: 같은 입력의 토큰 2개 · 열: 입력 특징 4개',20,MUTED)
  b+=pill(705,324,430,'파랑: GPU 0 몫   주황: GPU 1 몫')
  b+=lanes(390,306)
  for k,left in enumerate([48,624]):
   if not row:
    b+=text(left+22,463,'같은 X 전체 × W의 열 조각',21,bold=True)
    b+=mat(left+30,526,2,4,'X',X,cell=28)+text(left+160,565,'×',27)
    b+=mat(left+212,498,4,2,f'W{SUB[k]}',[r[k*2:k*2+2] for r in W],k,cell=28)+text(left+310,565,'=',27)
    result=mat(left+378,526,2,2,f'Y{SUB[k]}',cols[k],k,cell=28)+text(left+264,661,'다른 출력 위치의 완성된 값',20,C[k],True,'middle')
   else:
    b+=text(left+22,463,'X의 열 조각 × W의 대응하는 행',21,bold=True)
    b+=mat(left+30,526,2,2,f'X{SUB[k]}',[r[k*2:k*2+2] for r in X],k,cell=28)+text(left+113,565,'×',27)
    b+=mat(left+165,526,2,4,f'W{SUB[k]}',W[k*2:k*2+2],k,cell=28)+text(left+306,565,'=',27)
    result=mat(left+361,526,2,4,f'P{SUB[k]}',parts[k],k,cell=28)+text(left+264,661,'같은 출력 위치에 대한 부분합',20,C[k],True,'middle')
   b+=group(result,step>=1)
  if row:
   out=text(600,749,'같은 위치끼리 더하기',24,bold=True,anchor='middle')
   out+=mat(210,800,2,4,'P₀',parts[0],0,cell=32)+text(375,845,'+',30)+mat(460,800,2,4,'P₁',parts[1],1,cell=32)+text(625,845,'=',30)+mat(725,800,2,4,'Y',Y,cell=32)
   out+=text(600,912,'모든 GPU에 Y 전체가 필요하면 All-Reduce',22,PURPLE,True,'middle')
  else:
   out=text(600,749,'두 조각을 나란히 놓으면 원래 Y',24,bold=True,anchor='middle')
   out+=mat(210,800,2,2,'Y₀',cols[0],0,cell=32)+text(340,842,'이어 붙이기',21)+mat(505,800,2,2,'Y₁',cols[1],1,cell=32)+text(625,845,'=',30)+mat(725,800,2,4,'Y',Y,split='col',cell=32)
   out+=text(600,912,'결과의 관계를 표시한 것 · 실제로 모을지는 다음 연산에 따라 결정',20,MUTED,False,'middle')
  b+=group(out,step>=2)
  save(fig,step,'열을 나누면 출력 조각이 완성됩니다' if not row else '행을 나누면 출력의 부분합이 생깁니다','두 GPU가 같은 입력의 행렬 곱을 나눠 계산합니다.',b,950,['행렬 분할','GPU별 계산','결과의 관계' if not row else '부분합 합산'][step])

# FFN: independent feature shards through elementwise activation.
for step in range(3):
 b=text(48,150,'분할 전 FFN: X → 첫 Linear → 활성화 → 둘째 Linear → Y',23,bold=True)
 b+=mat(65,230,2,4,'X',cell=19)+text(165,263,'×',26)+mat(215,211,4,8,'U · 4×8',split='col',cell=19)
 b+=text(407,263,'→ f →',23)+mat(525,230,2,8,'f(XU) · 2×8',split='col',cell=19)+text(714,263,'×',26)
 b+=mat(775,173,8,4,'V · 8×4',split='row',cell=19)+text(895,263,'=',26)+mat(970,230,2,4,'Y',cell=19)
 b+=lanes(360,574)
 for k,left in enumerate([48,624]):
  b+=text(left+22,427,'첫 Linear · U를 열로 분할',21,bold=True)
  b+=mat(left+24,490,2,4,'같은 X',cell=24)+text(left+135,527,'×',25)+mat(left+190,466,4,4,f'U{SUB[k]}',color=k,cell=24)+text(left+315,527,'=',25)+mat(left+378,490,2,4,f'H{SUB[k]}',color=k,cell=24)
  b+=arrow(left+426,548,left+426,588)+pill(left+303,602,205,'원소별 활성화 f',F[k],C[k])
  b+=text(left+22,694,'둘째 Linear · V를 대응하는 행으로 분할',20,bold=True)
  nxt=mat(left+24,763,2,4,f'f(H{SUB[k]})',color=k,cell=24)+text(left+135,800,'×',25)+mat(left+190,739,4,4,f'V{SUB[k]}',color=k,cell=24)+text(left+315,800,'=',25)+mat(left+378,763,2,4,f'P{SUB[k]} · 부분합',color=k,cell=24)
  nxt+=f'<path d="M{left+404},651 V662 H{left+12} V722 H{left+72} V733" fill="none" stroke="{MUTED}" stroke-width="2" marker-end="url(#arrow)"/>'
  nxt+=arrow(left+426,831,left+264,1009)
  b+=group(nxt,step>=1)
 b+=group(pill(270,1190,660,'두 Linear 사이: 중간값을 모으는 통신 없음'),step>=1)
 out=arrow(312,1009,504,1009)+arrow(888,1009,696,1009)+pill(504,987,192,'All-Reduce','#f0eafa',PURPLE)
 for k,left in enumerate([48,624]):out+=arrow(600,1035,left+264,1084)+mat(left+216,1120,2,4,'같은 Y = P₀ + P₁',cell=24)
 b+=group(out,step>=2)
 save(3,step,'FFN: 열 분할의 출력을 행 분할의 입력으로','두 GPU는 같은 X를 사용하고, 서로 다른 중간 특징을 맡습니다. 기본 FFN의 순전파입니다.',b,1260,['첫 Linear와 활성화','중간 통신 없이 둘째 Linear','마지막 부분합 합산'][step])

for step in range(3):
 b=text(48,150,'같은 입력: 토큰 2개 × 특징 4개 · 헤드 2개를 GPU마다 하나씩',23,bold=True)
 for j,l in enumerate(['WQ','WK','WV']):b+=mat(90+j*205,199,4,4,l,split='col',cell=20)
 b+=text(748,234,'헤드별 계산',21,bold=True)+arrow(726,266,878,266)+mat(960,199,4,4,'WO',split='row',cell=20)
 b+=text(48,322,'Q·K·V의 열 조각과 WO의 행 조각은 같은 헤드에 대응합니다.',21,MUTED)
 b+=lanes(355,680)
 for k,left in enumerate([48,624]):
  b+=mat(left+222,421,2,4,'같은 X 전체',cell=21)
  b+=text(left+264,499,'X에 아래 세 가중치 조각을 각각 곱함',20,MUTED,False,'middle')
  for j,l in enumerate(['Q','K','V']):
   xx=left+74+j*166
   b+=mat(xx,544,4,2,f'W{l}{SUB[k]}',color=k,cell=21)+arrow(xx+21,637,xx+21,660)+mat(xx,697,2,2,f'{l}{SUB[k]}',color=k,cell=21)
  core=rect(left+22,765,484,79,F[k],F[k])+text(left+39,796,'QKᵀ/√dₕ → Softmax → × V',21,bold=True)+text(left+39,825,'담당 헤드에서 모든 토큰을 계산',18,MUTED)+mat(left+418,790,2,2,'O'+SUB[k],color=k,cell=21)
  core+=f'<path d="M{left+439},836 V854 H{left+12} V895 H{left+48} V902" fill="none" stroke="{MUTED}" stroke-width="2" marker-end="url(#arrow)"/>'
  core+=text(left+22,887,'Output Projection · WO의 행 분할',21,bold=True)
  core+=arrow(left+422,999,left+264,1130)
  core+=mat(left+24,937,2,2,f'O{SUB[k]}',color=k,cell=24)+text(left+105,976,'×',25)+mat(left+173,937,2,4,f'WO{SUB[k]}',color=k,cell=24)+text(left+311,976,'=',25)+mat(left+374,937,2,4,f'P{SUB[k]}',color=k,cell=24)
  b+=group(core,step>=1)
 b+=group(pill(208,1298,784,'헤드 출력을 모으지 않고 Output Projection까지 계산'),step>=1)
 out=arrow(312,1130,504,1130)+arrow(888,1130,696,1130)+pill(504,1108,192,'All-Reduce','#f0eafa',PURPLE)
 for k,left in enumerate([48,624]):out+=arrow(600,1157,left+264,1192)+mat(left+216,1230,2,4,'같은 Y = P₀ + P₁',cell=24)
 b+=group(out,step>=2)
 save(4,step,'어텐션: 헤드별 계산을 출력 투영까지 이어갑니다','일반적인 멀티헤드 어텐션의 순전파 · 토큰을 나누지 않고 헤드를 나눕니다.',b,1370,['헤드별 Q·K·V 투영','헤드 계산과 출력 투영','마지막 부분합 합산'][step])

for step in range(3):
 b=text(48,150,'한 트랜스포머 레이어 · 기본 TP 순전파 · Pre-Norm 예시',22,bold=True)
 for k,left in enumerate([48,624]):
  b+=rect(left,177,528,1000,'white',C[k])+text(left+24,211,f'GPU {k}',24,C[k],True)
  b+=mat(left+228,245,2,4,'같은 입력 X',cell=18)
  def node(y,label,r=None,c=None,split=None):
   s=rect(left+56,y,426,56,F[k] if r else '#f4f6f8',LINE)+text(left+74,y+35,label,20,bold=bool(r))
   if r:
    for j in range(3 if label.startswith('QKV') else 1):s+=mat(left+369+j*27,y+10,r,c,color=k,cell=min(9 if label.startswith('QKV') else 11,36/r))
   return s
  b+=node(314,'정규화 (각 GPU에서)')+node(390,'QKV Projection · 열 분할',4,2)+node(466,'담당 헤드의 어텐션',2,2)+node(542,'Output Projection · 행 분할',2,4)
  for ya,yb in [(286,303),(375,379),(451,455),(527,531)]:b+=arrow(left+270,ya,left+270,yb)
  b+=node(684,'잔차 더하기')+node(760,'정규화 (각 GPU에서)')+node(836,'MLP 첫 Linear · 열 분할',4,4)+node(912,'원소별 활성화')+node(988,'MLP 둘째 Linear · 행 분할',4,4)
  for ya,yb in [(745,749),(821,825),(897,901),(973,977)]:b+=arrow(left+270,ya,left+270,yb)
  b+=node(1124,'잔차 더하기 → 다음 레이어')
  # Local residual connections stay inside each GPU lane.
  b+=f'<path d="M{left+220},270 H{left+24} V712 H{left+48}" fill="none" stroke="{MUTED}" stroke-width="1.5" marker-end="url(#arrow)"/>'
  b+=f'<path d="M{left+56},712 H{left+35} V1152 H{left+48}" fill="none" stroke="{MUTED}" stroke-width="1.5" marker-end="url(#arrow)"/>'
  for y in [620,1066]:
   ar=pill(left+143,y,254,'합산된 결과 전체','#f0eafa',PURPLE)+arrow(left+270,y+47,left+270,y+56)
   b+=group(ar,step>=1)
 for y in [478,924]:
  b+=text(600,y,'중간',17,MUTED,False,'middle')+text(600,y+25,'All-Gather',17,MUTED,False,'middle')+text(600,y+50,'생략',19,C[0],True,'middle')
 for y in [641,1087]:
  ar=f'<path d="M318,{y-43} V{y-35} H560 V{y-25} M894,{y-43} V{y-35} H640 V{y-25}" fill="none" stroke="{PURPLE}" stroke-width="2" marker-end="url(#arrow)"/>'+f'<path d="M446,{y} H501 M699,{y} H754" fill="none" stroke="{PURPLE}" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>'+pill(503,y-22,194,'All-Reduce','#f0eafa',PURPLE)
  b+=group(ar,step>=1)
 b+=group(text(600,1221,'레이어 하나의 순전파: 중간 모으기는 생략하고, 최종 합산은 두 번',22,PURPLE,True,'middle'),step>=1)
 repeat=''
 for i in range(3):repeat+=rect(118+i*13,1250+i*15,320,57,'#f0f4f7',LINE)
 repeat+=text(312,1317,'같은 구조의 레이어 반복',20,bold=True,anchor='middle')
 repeat+=text(560,1280,'L개 레이어 → All-Reduce 2L회',26,bold=True)+text(560,1323,'중간 통신을 줄인 효과도 레이어마다 쌓입니다.',21,MUTED)
 b+=group(repeat,step>=2)
 save(5,step,'통신 위치를 트랜스포머 레이어 전체에서 보기','파랑·주황: 각 GPU의 계산   보라: GPU 간 최종 합산   가는 우회선: 같은 GPU의 잔차',b,1375,['각 GPU의 계산 경로','필요한 통신과 생략한 통신','여러 레이어에서 반복되는 비용'][step])
(R/'frames.json').write_text(json.dumps(frames,ensure_ascii=False,indent=2))
print(f'{len(frames)} frames generated; matrix values and shard reconstruction verified.')

# Translate the same SVG geometry; fail rather than leave untranslated labels.
import re
translations=json.loads((Path(__file__).parent/'tp-figure-en.json').read_text())
def en(s):
 if s in translations:return translations[s]
 if not re.search('[가-힣]',s):return s
 if ' · ' in s:return ' · '.join(en(p) for p in s.split(' · '))
 raise ValueError('Missing English label: '+s)
(R/'en').mkdir(exist_ok=True)
for frame in frames:
 svg=(R/(frame['slug']+'.svg')).read_text()
 from html import unescape
 svg=re.sub(r'>([^<>]+)<',lambda m:'>'+escape(en(unescape(m[1])))+'<',svg)
 (R/'en'/(frame['slug']+'.svg')).write_text(svg)
steps={locale:{} for locale in ['ko','en']}
for f in frames:
 for locale in steps:
  t=lambda s:en(s) if locale=='en' else s
  steps[locale].setdefault(f"{f['fig']:02}",[]).append(dict(slug=f['slug'],label=f"{f['step']+1}. "+t(f['label']),alt=t(f['title'])+' · '+t(f['label']),height=f['height']))
(Path(__file__).resolve().parents[1]/'src/data/tp-steps.json').write_text(json.dumps(steps,ensure_ascii=False,indent=2)+'\n')
(R/'frames.json').unlink()
