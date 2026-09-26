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

CLI는 설정 하나만 받는다. 타입 검사 → 네 가지 출력 생성 → 화면 이탈·텍스트 겹침·상자 밖 텍스트 검사 순서로 진행하고 문제가 있으면 실패한다. 검사를 통과해도 네 결과를 직접 열어 화살표·숫자·라벨의 연결과 가독성을 확인한 뒤 다음 그림으로 넘어간다.

## 공통 도형 추가 기준

글에 필요한 도형이 `Panel`이나 공통 도형에 없으면 먼저 그림 설정 안에서 직접 그린다. **두 번째 그림에서 같은 코드가 필요해질 때** `primitives.ts`로 옮긴다(다음 후보: 장치와 링크, 그래프 패널). 옮길 때는 기존 그림의 SVG가 바뀌지 않는지 확인한다. `tests/core.test.ts`의 snapshot은 `compose` 출력 바이트를 고정한다. 출력이 의도적으로 바뀌면 영향을 받는 그림을 다시 생성하고 시각 검토한 뒤 snapshot을 갱신한다.

## 기존 그림

이 모듈 이전에 공개한 그림은 각 연재의 `scripts/generate-*.py`와 작업 공간의 생성 스크립트로 만들었다. 한꺼번에 옮기지 않으며, 해당 그림을 수정할 때 이 모듈로 다시 작성한다.
