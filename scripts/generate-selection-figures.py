"""Original bilingual selection diagrams. Render: node scripts/render-communication-figures.mjs selection"""
from pathlib import Path
from html import escape
import json

ROOT=Path(__file__).resolve().parents[1]
INK='#182c40'; MUTED='#526577'; LINE='#d5dfe8'; BLUE='#246fb4'; TEAL='#247b72'; AMBER='#b8701e'
WF=['#d9ebfc','#bbdaf7','#9bc9f1','#79b4e5']; RUNTIME='#ffe3b5'; FREE='#f2f5f7'
LANG='ko'; MANIFEST=[]
def tr(v):return v[LANG=='en'] if isinstance(v,tuple) else str(v)
def text(x,y,s,size=24,color=INK,bold=False,anchor='start'):
 return ''.join(f'<text x="{x}" y="{y+i*size*1.4}" font-size="{size}" fill="{color}" font-weight="{700 if bold else 400}" text-anchor="{anchor}">{escape(line)}</text>' for i,line in enumerate(tr(s).split('\n')))
def rect(x,y,w,h,fill='white',stroke=LINE,rx=12,dashed=False):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="2"'+(' stroke-dasharray="8 6"' if dashed else '')+'/>'
def arrow(points,color=MUTED,double=False):
 return '<path d="M'+' L'.join(f'{x},{y}' for x,y in points)+f'" fill="none" stroke="{color}" stroke-width="2.5" marker-end="url(#arrow)"'+(' marker-start="url(#arrow-start)"' if double else '')+'/>'
def chip(cx,y,label,w=90):return rect(cx-w/2,y,w,44,'#eaf6f2',TEAL,8)+text(cx,y+29,label,23,TEAL,True,'middle')
def save(slug,title,sub,b,h,alt):
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{h}" viewBox="0 0 1200 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(tr(title))}</title><desc id="desc">{escape(tr(alt))}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="{MUTED}" stroke-width="1.5"/></marker><marker id="arrow-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M9 1 L1 5 L9 9" fill="none" stroke="{MUTED}" stroke-width="1.5"/></marker></defs><style>text{{font-family:Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}}path{{stroke-linecap:round;stroke-linejoin:round}}</style><rect width="1200" height="{h}" fill="white"/>'
 svg+=text(48,60,title,32,bold=True)+text(48,111,sub,23,MUTED)+f'<path d="M48,158 H1152" stroke="{LINE}"/>'+b+'</svg>'
 path=ROOT/'public/images/choosing-parallelism'/('en' if LANG=='en' else '')/(slug+'.svg');path.parent.mkdir(parents=True,exist_ok=True);path.write_text(svg)
 MANIFEST.append(dict(article='choosing-parallelism',slug=slug,locale=LANG,title=tr(title),alt=tr(alt),path=str(path.relative_to(ROOT)),width=1200,height=h))
def shards(x,y,ids,w=192,h=58):
 return ''.join(rect(x+i*w/len(ids),y,w/len(ids),h,WF[k],BLUE,0)+text(x+(i+.5)*w/len(ids),y+h/2+8,f'W{k+1}',23,BLUE,True,'middle') for i,k in enumerate(ids))
def gpu(x,y,g,ids,w=214,h=250):
 b=rect(x,y,w,h)+text(x+w/2,y+40,f'GPU {g}',25,bold=True,anchor='middle')
 sw=(w-32)*len(ids)/2
 b+=shards(x+(w-sw)/2,y+67,ids,sw,58)
 return b

def memory(x,y,ids,cap=24):
 # Eight pixels per GiB. W1..W4 are six GiB each in the assumed model.
 scale=8; b=rect(x,y,cap*scale,60,FREE,LINE,0)
 for i,k in enumerate(ids):b+=rect(x+i*48,y,48,60,WF[k],BLUE,0)+text(x+i*48+24,y+38,f'W{k+1}',20,BLUE,True,'middle')
 start=x+48*len(ids);b+=rect(start,y,64,60,RUNTIME,AMBER,0)+text(start+32,y+38,'8',23,AMBER,True,'middle')
 b+=text(x+96,y-22,('사용 가능 24 GiB','24 GiB available'),21,MUTED,anchor='middle')
 return b

assert 24+8==32 and 24/2+8==20 and 24/4+8==14
for LANG in ['ko','en']:
 # 1. Capacity first, not just loading weights.
 b=rect(48,206,342,662,'#fbfcfd')+rect(438,206,714,662,'#f5f9fc',BLUE)
 b+=text(219,249,('GPU 하나에 전체 모델','Whole model on one GPU'),25,bold=True,anchor='middle')
 b+=text(795,249,('TP 2 · 두 GPU로 나눈 모델 한 벌','TP 2 · One model across two GPUs'),26,bold=True,anchor='middle')
 b+=text(795,301,('같은 요청의 계산에 함께 참여','Both GPUs compute the same request'),23,BLUE,anchor='middle')
 b+=rect(70,350,298,328)+text(219,391,'GPU 0',26,bold=True,anchor='middle')
 b+=text(219,445,('가중치 24 GiB','Weights: 24 GiB'),25,BLUE,True,'middle')+memory(87,522,[0,1,2,3])
 b+='<path d="M279,494 V601" stroke="#b64036" stroke-width="3" stroke-dasharray="6 5"/>'
 b+=text(219,636,('실행 공간 8 GiB가 초과','Extra 8 GiB does not fit'),20,'#b64036',True,'middle')
 for g,x in enumerate([460,806]):
  cx=x+162;b+=rect(x,350,324,328)+text(cx,391,f'GPU {g}',26,bold=True,anchor='middle')
  b+=text(cx,445,('가중치 12 GiB','Weights: 12 GiB'),25,BLUE,True,'middle')+memory(cx-96,522,[g*2,g*2+1])
  b+=text(cx,636,('실행 공간 8 + 여유 4 GiB','Execution: 8 + free: 4 GiB'),21,MUTED,anchor='middle')
 b+=text(219,733,'24 + 8 = 32 GiB',26,bold=True,anchor='middle')+text(219,788,('실행 공간 부족','Insufficient memory'),25,'#b64036',True,'middle')
 b+=text(795,733,('GPU당 12 + 8 = 20 GiB','Per GPU: 12 + 8 = 20 GiB'),27,bold=True,anchor='middle')
 b+=text(795,788,('요청을 실행할 수 있는 그룹','A group that can run requests'),27,TEAL,True,'middle')
 b+=rect(100,918,30,25,WF[0],BLUE,0)+text(144,940,('W1–W4: 가중치 조각','W1–W4: weight shards'),22)
 b+=rect(490,918,30,25,RUNTIME,AMBER,0)+text(534,940,('실행 공간','Execution memory'),22)
 b+=rect(866,918,30,25,FREE,LINE,0)+text(910,940,('여유 공간','Free memory'),22)
 b+=text(600,1001,('계산 예시: 각 GPU의 실행 공간은 8 GiB로 가정','Capacity example: assume 8 GiB of execution memory per GPU'),22,MUTED,anchor='middle')
 save('01-make-it-fit',('먼저 작업을 실행할 메모리 확보하기','First, make room to run the workload'),('모델 가중치뿐 아니라 요청 상태·활성값·버퍼도 들어가야 합니다.','Weights, request state, activations, and buffers must all fit.'),b,1046,('24GiB 메모리 한 GPU에 가중치24와 실행공간8은 들어가지 않는다. TP2에서는 W1/W2와 W3/W4를 나누어 각 GPU가 가중치12와 실행공간8을 보관하고 여유4를 확보한다.','One 24 GiB GPU cannot hold 24 GiB of weights plus 8 GiB for execution. TP2 places W1/W2 and W3/W4 on separate GPUs; each uses 12+8 GiB with 4 GiB free.'))
 # 2. Replicate the whole two-GPU group, not each shard in isolation.
 b=text(48,145,('↔ : 그룹 내부 통신 관계','↔ : communication within a group'),20,MUTED)+text(600,213,('서로 다른 요청 A · B · C · D','Independent requests A · B · C · D'),27,bold=True,anchor='middle')
 for cx,lab in zip([450,550,650,750],'ABCD'):b+=chip(cx,236,lab,76)
 b+=arrow([(480,294),(480,331),(312,331),(312,373)])+arrow([(720,294),(720,331),(888,331),(888,373)])
 for group,x,requests in [(0,48,'A · B'),(1,624,'C · D')]:
  cx=x+264;b+=rect(x,387,528,568,'#f5f9fc',BLUE,dashed=group==1)
  b+=text(cx,429,('그룹 1 · 기존 모델 한 벌' if group==0 else '그룹 2 · 동일한 모델 한 벌','Group 1 · One model replica' if group==0 else 'Group 2 · Same model replica'),25,bold=True,anchor='middle')
  b+=chip(cx,457,('배정된 요청 '+requests,'Assigned requests '+requests),390)
  b+=arrow([(cx,510),(cx,538),(x+132,538),(x+132,558)])+arrow([(cx,538),(x+396,538),(x+396,558)])
  for local,gx in enumerate([x+20,x+284]):
   b+=gpu(gx,566,group*2+local,[local*2,local*2+1],224,253)
   b+=text(gx+112,735,requests,25,TEAL,True,'middle')+text(gx+112,782,('계산에 참여','Participate in computation'),18,MUTED,anchor='middle')
  b+=arrow([(x+251,684),(x+277,684)],double=True)
  b+=text(cx,868,('TP 2 · 같은 요청을 나누어 계산','TP 2 · Split each request’s computation'),23,BLUE,True,'middle')
  b+=text(cx,916,('그룹의 출력: '+requests,'Group outputs: '+requests),23,TEAL,anchor='middle')
 b+=text(600,1019,('DP 2 · 같은 가중치 배치의 그룹을 두 벌 운영','DP 2 · Two groups with the same weight placement'),27,bold=True,anchor='middle')
 b+=text(600,1071,('그룹 안의 두 GPU는 함께 계산 · 두 그룹에는 서로 다른 요청 배분','Two GPUs cooperate within a group; different requests go to different groups.'),23,MUTED,anchor='middle')
 save('02-replicate-the-group',('실행 가능한 GPU 그룹을 통째로 복제하기','Replicate the entire working GPU group'),('GPU 0·1의 가중치 배치를 GPU 2·3에도 동일하게 둡니다.','Copy the weight placement on GPUs 0–1 to GPUs 2–3.'),b,1115,('두GPU로 된 TP그룹을 복제한다. GPU0과2는 W1/W2, GPU1과3은 W3/W4를 보관한다. 그룹1의 두GPU가 A/B 요청을 함께 계산하고 그룹2의 두GPU가 C/D를 함께 계산한다.','Replicate the two-GPU TP group. GPUs0 and2 hold W1/W2; GPUs1 and3 hold W3/W4. Both GPUs in group1 compute requests A/B; both GPUs in group2 compute C/D.'))
 # 3. The same GPU and request budget; no invented runtime or throughput.
 b=text(48,145,('↔ : 그룹 내부 통신 관계','↔ : communication within a group'),20,MUTED)
 for row,(tp,dp) in enumerate([(2,2),(4,1)]):
  y=204+row*498;b+=rect(48,y,1104,466,'#fbfcfd')
  b+=text(76,y+44,f'TP {tp} × DP {dp}',29,bold=True)
  b+=text(1124,y+44,('모델 복제본 2개' if dp==2 else '모델 복제본 1개','Two model replicas' if dp==2 else 'One model replica'),25,BLUE,True,'end')
  b+=text(600,y+96,('동일한 요청 A · B · C · D','The same requests A · B · C · D'),23,MUTED,anchor='middle')
  if dp==2:
   for group,x in enumerate([76,626]):
    cx=x+249;b+=rect(x,y+126,498,240,'#f5f9fc',BLUE)
    b+=chip(cx,y+144,'A · B' if group==0 else 'C · D',132)
    for local,gx in enumerate([x+24,x+272]):
     b+=gpu(gx,y+214,group*2+local,[local*2,local*2+1],202,136)
    b+=arrow([(cx,y+195),(cx,y+206),(x+125,y+206),(x+125,y+211)])+arrow([(cx,y+206),(x+373,y+206),(x+373,y+211)])
    b+=arrow([(x+233,y+312),(x+265,y+312)],double=True)
  else:
   b+=rect(76,y+126,1048,240,'#f5f9fc',BLUE)+chip(600,y+144,'A · B · C · D',258)
   centers=[210,470,730,990]
   b+=arrow([(600,y+195),(600,y+206),(210,y+206),(210,y+211)])
   for cx in centers[1:]:b+=arrow([(600,y+206),(cx,y+206),(cx,y+211)])
   for g,cx in enumerate(centers):b+=gpu(cx-100,y+214,g,[g],200,136)
   for cx in centers[:-1]:b+=arrow([(cx+107,y+312),(cx+153,y+312)],double=True)
  b+=text(600,y+409,('두 그룹이 서로 다른 요청을 처리' if dp==2 else '한 그룹의 네 GPU가 요청들의 계산에 함께 참여','Two groups handle different requests' if dp==2 else 'All four GPUs cooperate on the requests in one group'),25,bold=True,anchor='middle')
  b+=text(600,y+447,('그룹별로 입력을 배분하고 독립적으로 실행' if dp==2 else '한 그룹도 여러 요청을 배치로 처리할 수 있음','Requests are assigned to independently running groups' if dp==2 else 'One group can also batch multiple requests'),22,MUTED,anchor='middle')
 b+=text(600,1241,('실행 가능한 두 후보에서 함께 비교할 것','Compare both feasible candidates'),27,bold=True,anchor='middle')
 for i,label in enumerate([('GPU당 메모리 여유','Memory headroom'),('요청의 응답 시간','Request latency'),('전체 처리량','Total throughput'),('그룹 내부 통신','Within-group communication')]):
  x=48+i*280;b+=rect(x,1271,264,100,'#f5f8fb');lines=tr(label).replace('Within-group communication','Within-group\ncommunication');b+=text(x+132,1309 if '\n' in lines else 1327,lines,22,bold=True,anchor='middle')
 b+=text(600,1420,('한 모델에 쓸 GPU 수와 독립 복제본 수를 함께 조정합니다.','Adjust GPUs per model together with the number of independent replicas.'),23,MUTED,anchor='middle')
 save('03-balance-shards-and-replicas',('같은 GPU를 분할과 복제에 다르게 배분하기','Balance partitioning and replication on the same GPUs'),('두 배치 모두 GPU 4개와 동일한 요청을 사용합니다.','Both arrangements use four GPUs and the same requests.'),b,1466,('같은네GPU를 TP2×DP2의 두모델그룹 또는 TP4×DP1의 한모델그룹으로 구성한다. 첫배치는 A/B와C/D를 별도그룹에, 두번째는 A/B/C/D를 한그룹에 보낸다. 그룹하나도 여러요청을 배칭할수있으며 메모리여유,응답시간,처리량,내부통신을 비교한다.','Four GPUs form either two TP2 replicas or one TP4 replica. The first assigns A/B and C/D to separate groups; the second sends A/B/C/D to one group, which can batch requests. Compare memory headroom, latency, throughput, and within-group communication.'))
assert len(MANIFEST)==6
(ROOT/'scripts/selection-figures.json').write_text(json.dumps(MANIFEST,ensure_ascii=False,indent=2)+'\n')
print('Generated six bilingual selection diagrams; capacity examples verified.')
