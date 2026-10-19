# 그림 작성 안내

새 그림은 `packages/viz`(`@llm-systems/viz`)로 만든다. 한 그림의 설정 파일에서 한국어·영어 × 데스크톱·모바일 네 가지 SVG와 2배율 PNG를 생성한다. 사이트는 생성된 정적 파일만 사용하므로 `npm run build`는 그림을 다시 만들지 않는다.

## 구성

| 위치 | 역할 |
|---|---|
| `packages/viz/src/theme.ts` | 색 토큰과 톤(`blue`·`teal`·`orange`·`purple`·`gray`·`red`), 글꼴, 화살표 marker |
| `packages/viz/src/text.ts` | `[ko, en]` 라벨(`Label`), 줄바꿈 폭 추정, SVG 텍스트 |
| `packages/viz/src/panel.ts` | `Panel`: 패널 좌표계의 `text`·`rect`·`box`·`line`·`path`·`arrow`·`token`·`circle`·`raw` |
| `packages/viz/src/frame.ts` | `FigureSpec`, `compose`: (eyebrow) → 제목 → 부제 → 패널 → 캡션 배치와 메타데이터 |
| `packages/viz/src/primitives.ts` | 여러 글에서 반복되는 도형: `cells`·`grid`·`curve`·`timeline` |
| `packages/viz/src/build.ts` | Chromium 렌더링, PNG 저장, 배치 검사, QA 기록 |
| `src/data/figures/<articleId>/<figureId>.ts` | 그림 하나의 설정. 두 언어가 같은 파일을 공유한다 |
| `public/images/<articleId>/[en/]<figureId>[-mobile].{svg,png}` | 생성 결과 |

의존 방향은 사이트 → viz다. viz는 사이트의 경로·Astro·글 목록을 import하지 않는다(`packages/viz/tests/boundaries.test.ts`).

## 애니메이션과 함께 사용할 때

구조·관계·수치 비교에는 기존 viz를 기본으로 쓴다. 수식·행렬 변환은 Manim, 계산·전송·대기 순서는 Motion Canvas를 선택할 수 있다. 웹에서 조작하는 장면을 같은 React 코드로 영상 콘텐츠에도 반복 활용할 때는 Remotion을 검토한다. 도구를 모두 사용하는 것이 목표는 아니다.

정적 그림과 애니메이션은 색·글꼴·한영 라벨·예제값을 공유한다. 테마의 원본은 이 문서의 `theme.ts`이며 그림별 라벨과 데이터도 한 곳에 둔다. 다른 런타임용 JSON은 생성 결과로 취급하고 재생성 방법을 기록한다. 애니메이션에는 정적 대체 그림과 재생·일시 정지·탐색 수단을 제공한다. 실제 측정한 프로파일·메모리 스냅샷과 설명 애니메이션을 구별한다.

학습 1편의 구현 예시는 `labs/training/visuals/README.md`와 `packages/motion-scenes/`에 있다. 애니메이션 제작은 사이트의 정적 빌드와 별도이며, 현재 production은 새 장면 런타임을 불러오지 않는다.

## 그림 하나 만들기

```ts
// src/data/figures/example/01-flow.ts
import {Panel,C,type FigureSpec,type Locale} from '@llm-systems/viz';
export default {
  articleId:'example',figureId:'01-flow',number:'1-1',
  title:['입력에서 출력까지','From input to output'],
  subtitle:['...','...'],
  alt:['...','...'],
  caption:['...','...'],
  sources:[],
  panels(locale:Locale,mobile?:boolean){
    const p=new Panel(locale,['단계','Steps'],300);
    p.box(20,90,480,80,['입력','Input'],'','gray');
    p.arrow(260,180,260,210);
    p.box(20,220,480,70,['출력','Output'],'','blue');
    return [p];
  },
} satisfies FigureSpec;
```

- 패널은 기본 폭 520의 자체 좌표계를 쓴다. 데스크톱은 한 줄에 두 패널(`layout:'wide'`이면 한 패널), 모바일은 세로로 쌓고 폭에 맞게 축소한다.
- `mobile` 인자로 좁은 화면의 배치를 바꿀 수 있다.
- `new Panel(locale, null, height, 1120)`과 `layout:'wide'`를 함께 쓰면 제목 없는 전체 폭 패널 하나에 자유롭게 그린다.
- 표준 그림 틀: eyebrow(“그림 N” / “Figure N”) → 제목(36/700) → 부제 → 구분선 → 패널 → 구분선 → **캡션(이미지 안 하단)**. 모든 공개 그림은 eyebrow와 캡션을 둔다.
- 그 밖의 옵션: `captionIn:'article'`(캡션을 이미지에서 뺀다. 표준 그림에는 쓰지 않는다), `screens:['desktop']`(`<img>` 하나로 넣는 그림처럼 모바일 변형이 필요 없을 때), `defs`(패턴 등 그림 전체의 `<defs>`).
- 이전 생성기에서 옮긴 그림은 `new Panel(locale, null, h, 1104, [48, y0])`로 원래 좌표를 유지하고 `p.el(tag, attrs, label)`로 요소를 그대로 쓴다. 수정할 때 해당 부분을 공통 도형으로 바꾼다.

## 공통 도형

| 함수 | 용도 | 반환값 |
|---|---|---|
| `cells(p,x,y,labels,{tone,w,h,gap})` | 토큰·KV 칸·메모리 단어 같은 같은 크기 칸의 열. `null`은 빈칸 | 폭, `center(i)` |
| `grid(p,x,y,rows,cols,{cell,gap,tone})` | 행렬·타일. `tone(r,c)`로 칸 색 지정 | 크기, `cellX/cellY`, `outline(r0,c0,r1,c1,tone)` |
| `curve(p,from,to,{tone,tail,casing})` | 교차하는 곡선 연결. 흰 테두리는 곡선 구간에만 둔다 | — |
| `timeline(p,{x,y,width,span,lanes,axis})` | 공통 시간축의 작업 막대. 시간 단위는 임의 | `at(t)`, `laneY(i)`, `mark(t,lane,label)` |

각 함수는 연결에 필요한 좌표를 반환한다. 화살표는 반환 좌표에 맞춰 그려서 칸이나 막대를 옮겨도 연결이 따라가게 한다.
- 설명용 수치는 캡션에 교육용임을 밝히고, 구현·논문을 근거로 그렸다면 `sources`에 남긴다.

사이트 루트에서 실행한다. 두 번째 인자는 QA 기록 위치이며 공개 저장소 밖(작업 공간 `outputs/` 등)을 지정한다.

```sh
npm run viz:build -- src/data/figures/example/01-flow.ts /tmp/example-figure-qa
```

공개된 그림을 다시 그려 비교할 때는 `--out <이미지 경로>`를 붙여 `public/images` 대신 다른 위치에 출력한다.

CLI는 설정 하나만 받는다. 타입 검사 → 네 가지 출력 생성 → 화면 이탈·텍스트 겹침·상자 밖 텍스트·연결선 침범 검사 순서로 진행하고 문제가 있으면 실패한다. 연결선 침범은 화살표가 있는 경로(`marker-end`)가 글자나 다른 상자·원을 지나는 경우다. 가장자리에 닿는 것은 허용한다. 검사를 통과해도 네 결과를 직접 열어 화살표·숫자·라벨의 연결과 가독성을 확인한 뒤 다음 그림으로 넘어간다.

## 공통 도형 추가 기준

글에 필요한 도형이 `Panel`이나 공통 도형에 없으면 먼저 그림 설정 안에서 직접 그린다. **두 번째 그림에서 같은 코드가 필요해질 때** `primitives.ts`로 옮긴다(다음 후보: 장치와 링크, 그래프 패널). 옮길 때는 기존 그림의 SVG가 바뀌지 않는지 확인한다. `tests/core.test.ts`의 snapshot은 `compose` 출력 바이트를 고정한다. 출력이 의도적으로 바뀌면 영향을 받는 그림을 다시 생성하고 시각 검토한 뒤 snapshot을 갱신한다.

## 기존 그림

모든 공개 그림은 이 모듈의 설정에서 생성한다. 이전 연재별 생성기에서 옮긴 그림은 원래 좌표를 유지한 `p.el(...)` 형태이며, 수정할 때 해당 부분을 공통 도형으로 바꾼다.

`npm run check`는 `public/images`의 모든 SVG·PNG에 대응하는 설정이 있는지, 각 SVG가 현재 설정의 출력과 같은지 확인한다. 테마나 그림 틀을 바꾸면 영향을 받는 그림을 다시 생성해야 검사를 통과한다.

## 그림 조각 옆 설명 (Annot)

그림 안에 긴 해설을 넣는 대신, 그림을 패널 단위로 잘라 각 조각 옆이나 아래에 본문 설명을 붙일 수 있다. 그림 설정은 그대로 두고 MDX에서 다음처럼 쓴다.

```mdx
import Annot from '../../components/Annot.astro';
import AnnotPart from '../../components/AnnotPart.astro';

<Annot fig="model-advanced-ced/01-ed-and-ced-paths" n={1} layout="cols">
<AnnotPart fig="model-advanced-ced/01-ed-and-ced-paths" panels="1">

**A. 전통 ED.** …

</AnnotPart>
<AnnotPart fig="model-advanced-ced/01-ed-and-ced-paths" panels="2">

**B. CED.** …

</AnnotPart>
</Annot>
```

- `layout`: `cols`(조각을 나란히, 설명은 아래), `rows`(조각마다 옆에 설명), `stack`(넓은 조각 아래 설명), `side`(조각 하나, 옆에 설명).
- `panels`: 1부터 센 패널 번호. `1+2`처럼 묶을 수 있다. `all`은 화면마다 그 그림의 모든 패널이며, 데스크톱과 모바일의 패널 수가 다른 그림(예: 데스크톱 한 패널, 모바일 세 패널)에 쓴다. `xr="0-0.5"`는 데스크톱에서 그 영역의 가로 일부만 보인다(오른쪽이 빈 넓은 패널). `yr`은 세로 일부를 같은 방식으로 자른다. 패널 하나로 그린 흐름도를 단계별로 나눌 때 쓴다.
- 흐름도 단계 영역이 겹치면 `only="path:q"`(그림 요소의 `data-path` 값, `+`로 묶음)를 더한다. 그 조각은 데스크톱 SVG를 본문에 넣고 다른 단계를 숨겨, 이웃 단계 조각이 섞여 보이지 않는다.
- `<Annot … whole>`: 600px 이하에서 조각 대신 모바일 그림 전체를 머리에 한 번 보이고 조각마다 설명만 쌓는다. 모바일 그림의 배치가 달라 `xr`/`yr`로 같은 단계를 자를 수 없는 패널 하나짜리 흐름도에 쓴다.
- 자르는 좌표는 `layoutBoxes()`(`packages/viz/src/frame.ts`)가 그림을 만드는 것과 같은 배치 계산에서 빌드할 때 구한다. 따로 측정하거나 좌표를 적지 않으므로 그림을 다시 만들어도 어긋나지 않는다. 데스크톱 조각은 그림 전체를 1016px에 놓았을 때의 배율을 넘지 않는다.
- 그림의 가정·제외 범위를 적는 캡션은 `<span slot="caption">…</span>`으로 넣으면 설명 아래 `figcaption`으로 보인다.
- 머리(번호·제목·부제)는 조각 위에 한 번 보이며 원본 PNG로 연결된다. 그림 번호는 이미지 안 eyebrow에 그대로 둔다.
- 600px 이하에서는 모바일 PNG에서 같은 패널을 잘라 쓰고 설명을 아래로 쌓는다. 모바일 변형이 없는 그림(`screens:['desktop']`)은 데스크톱 조각을 그대로 줄인다.
- 옮긴 설명은 그림 설정의 `captionIn:'article'`로 이미지에서 빼고, 그림 안의 긴 설명 상자도 지운다. 오해를 막는 짧은 문구(예: "허용 범위 ≠ 희소 선택")는 그림에 남긴다.
- `tests/annot.test.ts`가 그림·패널 번호의 유효성과 한·영 분할의 일치를 검사하고, `npm run check`는 `<Annot fig>`가 글의 `figureIds`에 있는지 확인한다.
- `viz:build`는 이미지 폴더의 `renders.json`에 SVG와 그 SVG에서 렌더한 PNG의 해시를 기록한다. `npm run check`는 기록이 있는 PNG가 현재 SVG에서 나왔는지 확인하고, `<Annot>`에 쓰는 그림은 기록이 반드시 있어야 한다(같은 크기의 오래된 PNG로 잘못 잘리는 것을 막는다). `tests/browser/annot.spec.ts`는 한·영 1280px·390px에서 조각 이미지가 로드되고 조각이 이미지 밖으로 벗어나지 않는지 확인한다.

## 텐서와 행렬 곱 (tensor.ts)

`tensor.ts`의 API는 기존 `matrix`/`grid` 출력을 바꾸지 않고 추가되었다. 모델 의미는 그림 설정에 두고, 공통 모듈은 텐서 표시와 연산 차원 계약을 담당한다.

- `axis(id, size, label?)`: 축의 의미 ID와 논리 크기. 숫자가 같아도 `head`와 `token`은 다른 축이다.
- `TensorSpec`: `{id, name, axes:[rowAxis,colAxis], role}`. role은 activation/weight/cache/ids다.
- `tensor(panel,x,y,spec,options)`: 이름·격자·논리 shape를 함께 표시한다. `sample`은 대표 셀 수이고 `⋯`는 축약 표시다. 숫자 `values`를 넣으면 sample과 실제 shape가 같아야 한다. 반환값의 `body`, `cell(r,c)`로 셀과 연결한다. 좁은 열벡터는 `labelWidth`를 지정할 수 있다.
- `transpose(spec)`: baseId를 유지하면서 view ID와 축 순서를 바꾼다. 복사를 의미하지 않는다.
- `product(a,b,id,name)`: 축 크기와 의미 ID가 일치하는 contraction만 허용한다. 범용 einsum/기호식 추론은 하지 않는다.
- `matmul(panel,x,y,a,b,{id,name,width?,values?})`: 두 피연산자와 결과를 정렬한다. 숫자 예시의 출력은 `multiply`로 계산한다.
- `operation`, `link`: 짧은 연산 표시와 명시적 연결. 자동 장애물 회피 기능은 없다. 장애물 회피가 필요하면 `route.ts`의 `route`/`connect`를 쓴다. 끝점과 첫·마지막 방향만 주면 이미 그린 상자·원·글자를 피하는 직각 경로를 찾는다(첫 구간 ≥10, 화살표 구간 ≥24, 같은 출발점의 선은 가능한 한 일찍 갈라짐). 한 출발점에서 여러 줄로 갈라지면 `flow.ts`의 `fanOut`을 쓴다.
- `cacheBank`: cache 역할을 명시한 텐서에 저장소 경계를 그린다. 공유 시 저장소를 반복해서 그리지 않고 reader를 연결한다.

## 행렬 평면 표기 (matrix-plane.ts)

`matrixPlane`은 작은 수치 행렬을 대괄호·옅은 격자로 그리고 이름과 `[행, 열]`을 함께 표시한다. 행·열의 의미는 평면 가장자리에 둔다. 동일한 `cell` 크기를 쓰면 수치 예제의 형태가 차원에 대응한다. 축약 없이 실제 값이 있는 직사각형 행렬 전용이며 큰 symbolic tensor는 기존 `tensor`를 사용한다. `selectRow`, `selectCol`, `focus`는 대응 요소를 강조한다. `data-tensor`와 `data-cell` 속성은 동일한 그림의 웹 상호작용에 사용한다.

`matrixPlane`의 `format(value,row,col)`은 표시 문자열만 바꾸고 원본 수치는 유지한다. MHA 예제는 이를 소수 표시와 causal mask의 `−∞` 표시에 사용한다. 숫자 배열 자체에는 유한값만 허용하며 mask/softmax 계산은 그림 데이터에서 별도로 수행한다. `fontSize`는 작은 셀의 수치 글꼴 크기를 지정한다. 두 옵션을 생략하면 기존 출력이 유지된다.

## 숫자 없는 행렬 평면과 MLA 흐름

`symbolicPlane`(`symbolic.ts`)은 숫자 없는 행렬 평면을 그리는 공통 도형이다. 이름, `[행, 열]`, head 구간, 축소 축 강조를 표시하며 수치 요소나 실제 차원 비례를 가정하지 않는다.

`mla-flow` 네 설정은 Q/K/V 생성 → head attention → Key absorption → Value/Output absorption 순서다. 수학적 전개와 결합법칙을 설명하며 특정 커널 구현·가중치 저장 방식·성능을 주장하지 않는다. head당 내용 차원은 MHA 글과 같이 `d_k`(논문의 d_h), 위치 차원 `d_r`, latent 차원 `r_q`/`r_kv`로 구별한다. Absorption 후에도 점수 scale과 RoPE 경로는 유지된다.

네 그림은 아래 흐름도 문법을 따른다. DSA 그림(`dsa-flow`)에서 다시 필요해져 공통 모듈 `flow.ts`(`math`·`flowMatrix`·`junction`·`flowStep`·`badge`)와 `route.ts`(`route`·`connect`)로 옮겼다. 글별 설정은 열 차원 폭 표(`COL`)와 head 칸 수만 가진다. `dsa-flow/drawing.ts`의 `chain`은 항목 목록을 데스크톱에서는 가로로, 모바일에서는 세로로 배치한다.
- 행렬은 대괄호 없이 색 테두리 상자로 그린다(새 그림부터. 기존 `symbolicPlane`·`matrixPlane` 그림은 다음 수정 때 전환).
- 이름은 위, `[행, 열]`은 아래. 이름은 `math`로 위·아래 첨자를 쓴다(`Q^C_h`, `W^{UK}_h`).
- 상자 폭은 열 차원의 크기 순서를 따른다(비례 아님, `COL`). 높이는 48로 고정하고 `[T, T]`는 정사각형이다.
- `[T, H·d]`는 head 칸 4개(h, 빈 칸 2, ⋯)로 나누며 한 칸의 폭은 head별 상자 `[T, d]`와 같다.
- 곱셈의 A/B는 입력이 왼쪽·위, 가중치가 반대편이라는 배치 규칙과 다르거나 전치가 있을 때만 표시한다. 두 활성값의 곱은 왼쪽 A, 오른쪽 B가 기본이다.
- 흐름 연결선은 `connect`로 노드를 모두 그린 뒤 자동 경로로 그린다.
- 한 출발점에서 여러 줄로 갈라지는 연결(예: X에서 Query·KV·indexer 갈래)은 `fanOut(p, from, taps)`로 그린다. 세로 줄기 하나와 줄마다 수평 화살표 하나를 그리며 분기점 점은 찍지 않는다. 갈래마다 `connect`로 따로 경로를 찾으면 1px 어긋난 겹선이나 비켜 간 평행선이 생긴다. `fanOut`을 먼저 그리고 나머지는 `connect`로 그린다.
- 빌드는 같은 출발점(`data-source` 또는 첫 점)에서 나온 선끼리 0.1–30px 간격으로 평행하게 겹치면 실패한다(`parallel`).
- 위에서 들어오는 피연산자의 포트 표시는 세로선 왼쪽에 둔다(오른쪽에는 그 피연산자의 차원 표기가 있다).

이 문법을 쓰는 설정: `mla-flow`, `dsa-flow`, `hca-flow`, `csa-flow`, `csa2-flow`.
