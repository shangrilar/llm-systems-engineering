"""Translate the original editable Korean collective SVGs, keeping their geometry."""
from pathlib import Path
import xml.etree.ElementTree as E
import json
ROOT=Path(__file__).resolve().parents[1]
T={
'All-Gather: 모은 결과를 모두에게':'All-Gather: collect and share',
'All-Reduce: 합친 결과를 모두에게':'All-Reduce: reduce and share',
'All-to-All: 목적지별로 조각 교환하기':'All-to-All: exchange destination chunks',
'Broadcast: 같은 데이터를 모두에게':'Broadcast: the same data for everyone',
'GPU 0의 배열 전체를 모든 참여자의 출력 버퍼에 복사':'Copy GPU 0’s entire array to every participant’s output buffer',
'GPU 0의 입력 8개 원소 → 각 GPU의 출력 2개 원소':'GPU 0: 8 input elements → each GPU: 2 output elements',
'Gather: 각자의 조각을 한곳으로':'Gather: collect chunks at one GPU',
'Gather와 같은 입력에서 시작해, 이번에는 위치별 합을 계산합니다.':'Use the same inputs as Gather, but sum matching positions.',
'Reduce-Scatter: 합산한 결과를 나눠 갖기':'Reduce-Scatter: partition the reduced result',
'Reduce: 같은 위치의 값을 합치기':'Reduce: combine matching positions',
'Scatter: 서로 다른 조각을 나눠 갖기':'Scatter: distribute different chunks',
'rank 순서로 나누어 GPU 0, 1, 2, 3에 한 원소씩 배분':'Partition by rank: one element each for GPUs 0, 1, 2, and 3',
'root는 기준 데이터를 제공하는 참여자입니다. 여기서는 GPU 0이 맡습니다.':'The root supplies the source data. Here, GPU 0 is the root.',
'root의 배열을 rank 순서로 나누어, 각 GPU가 두 원소씩 받습니다.':'Split the root’s array by rank; each GPU receives two elements.',
'각 GPU가 네 위치의 값을 제공하고, 합산된 결과 중 한 원소씩 받습니다.':'Each GPU provides four values and receives one element of the reduced result.',
'각 GPU가 목적지별 조각을 보내고, 출발 GPU 순서로 받기':'Send destination-specific chunks; receive them in source-rank order',
'각 GPU를 담당하는 CPU 코드의 요청':'Requests from the CPU code responsible for each GPU',
'각 GPU의 배열을 rank 순서로 이어 붙여 root에 모읍니다.':'Concatenate each GPU’s array in rank order at the root.',
'각 GPU의 입력 2개 원소 → GPU 0의 출력 8개 원소':'Each GPU: 2 input elements → GPU 0: 8 output elements',
'각 GPU의 입력 2개 원소 → 각 GPU의 출력 8개 원소':'Each GPU: 2 input elements → each GPU: 8 output elements',
'각 상대에 같은 배열을 전달':'Same array to each peer',
'각 칸은 데이터 조각 하나입니다. 칸 안의 표기는 보내는 GPU → 받는 GPU입니다.':'Each box is a chunk. Its label means source GPU → destination GPU.',
'각자의 조각을 이어 붙인 전체 배열을 모든 GPU가 갖습니다.':'Every GPU receives the full array formed by concatenating the input chunks.',
'같은 결과로 이해하기: Gather → Broadcast':'Same result as: Gather → Broadcast',
'같은 결과로 이해하기: Reduce → Broadcast':'Same result as: Reduce → Broadcast',
'같은 목표: GPU 0의 [1, 2]를 네 GPU가 모두 갖게 하기':'Same goal: all four GPUs hold GPU 0’s [1, 2]',
'같은 위치끼리 합산한 값: [1111, 2222, 3333, 4444]':'Position-wise sums: [1111, 2222, 3333, 4444]',
'같은 위치끼리 합산한 배열을 모든 GPU가 갖습니다.':'Every GPU receives the array of position-wise sums.',
'개별 전달 요청에서 그룹의 동작으로':'From individual transfers to a group operation',
'그룹의 같은 동작에 참여':'Join the same group operation',
'기준 데이터를 받기':'Receive source data',
'기준 데이터를 제공':'Provide source data',
'두 방식이 만드는 데이터 결과':'The data result produced by both approaches',
'둘째 원소: 2 + 20 + 200 + 2000 = 2222':'Second element: 2 + 20 + 200 + 2000 = 2222',
'모든 GPU가 [1111, 2222, 3333, 4444]를 갖습니다.':'Every GPU holds [1111, 2222, 3333, 4444].',
'상대별로 송수신을 지정':'Specify each send and receive',
'이 출력을 All-Gather하면':'All-Gather these outputs:',
'입력 제공 없음':'No source input',
'첫째 원소: 1 + 10 + 100 + 1000 = 1111':'First element: 1 + 10 + 100 + 1000 = 1111',
'출력 대상 아님':'No result here',
'통신 상대를 하나씩 지정하거나, 그룹 전체가 수행할 동작을 요청합니다.':'Specify individual peers, or request an operation for the whole group.',
'통신 완료 후 · 출력 버퍼':'After completion · output buffers',
'통신 전 · 입력 버퍼':'Before communication · input buffers',
'하나의 통신 그룹 · root = GPU 0':'One group · root = GPU 0',
}
for i in range(1,6):T[f'집합 통신의 기본 동작 · 그림 {i}']=f'Collective Communication Basics · Figure {i}'
for i in range(1,5):T[f'집합 통신의 조합과 확장 · 그림 {i}']=f'Combining and Extending Collectives · Figure {i}'
ALTS={
'basics-01-requests':'Four GPUs acquire GPU 0’s array [1,2]. Left: individual Send/Recv requests. Right: all participants request Broadcast with root 0. Both produce the same data result.',
'basics-02-broadcast':'GPU 0 supplies [1,2]. All four participants, including root 0, receive [1,2] in their output buffers.',
'basics-03-scatter':'GPU 0 supplies [1,2,10,20,100,200,1000,2000]. Scatter distributes consecutive two-element chunks to GPUs 0–3 in rank order.',
'basics-04-gather':'Each GPU supplies two elements. Gather concatenates [1,2], [10,20], [100,200], [1000,2000] in rank order at GPU 0.',
'basics-05-reduce':'Reduce sums corresponding elements of four two-element inputs, producing [1111,2222] at root GPU 0 only.',
'combinations-01-all-gather':'All-Gather concatenates the four two-element input chunks in rank order, producing the same eight-element output on every GPU.',
'combinations-02-all-reduce':'All-Reduce sums corresponding elements of the four inputs; every GPU receives [1111,2222].',
'combinations-03-reduce-scatter':'Four four-element arrays are summed by position. GPUs 0–3 receive 1111,2222,3333,4444 respectively. The central full sum describes the result, not a required intermediate buffer.',
'combinations-04-all-to-all':'Each GPU sends one chunk for each destination and receives its own destination chunks from all source GPUs in rank order. Labels indicate source to destination; colors follow the source.',
}
E.register_namespace('','http://www.w3.org/2000/svg')
manifest=[]
for article in ['collective-communication-basics','collective-communication-combinations']:
    folder=ROOT/'public/images'/article
    (folder/'en').mkdir(parents=True,exist_ok=True)
    for file in sorted(folder.glob('*.svg')):
        tree=E.parse(file);root=tree.getroot()
        ko_title=root.find('{http://www.w3.org/2000/svg}title').text
        ko_alt=root.find('{http://www.w3.org/2000/svg}desc').text
        for el in root.iter():
            if el.tag.endswith('}text'):
                val=el.text or ''
                if any('\uac00'<=c<='\ud7a3' for c in val):
                    assert val in T,val
                    el.text=T[val]
                    if file.stem=='basics-01-requests' and val in ['각 상대에 같은 배열을 전달','기준 데이터를 받기','기준 데이터를 제공']:el.set('font-size','19')
        root.find('{http://www.w3.org/2000/svg}title').text=T[ko_title]
        root.find('{http://www.w3.org/2000/svg}desc').text=ALTS[file.stem]
        target=folder/'en'/file.name;tree.write(target,encoding='unicode')
        for loc,p,title,alt in [('ko',file,ko_title,ko_alt),('en',target,T[ko_title],ALTS[file.stem])]:
            manifest.append(dict(article=article,slug=file.stem,locale=loc,title=title,alt=alt,path=str(p.relative_to(ROOT)),width=int(root.get('width')),height=int(root.get('height'))))
(ROOT/'scripts/collective-figures.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('Translated nine SVGs, preserving Korean originals.')
