# LLM Systems Engineering 작업 지침

## 목적과 독자
- 한국어로 기초 지식을 단계적으로 설명하는 공개 교육 블로그다.
- 학습 순서: 기초 → 추론 → 학습(Pretraining·SFT) → RL 기반 Post-training.
- 분석 관점: 모델 / 하드웨어 / 워크로드. 하드웨어에는 커널, 런타임, 병렬화, 스케줄링 등 시스템 소프트웨어와 실행 전략을 포함한다.
- SFT도 통상 post-training에 포함된다는 용어 설명과 이 사이트의 교육용 분류를 구별한다.
- 기초 연재와 특집 분석을 연결한다. 원리, 작은 예시, 실행 과정, 근거, 적용 한계 순서로 설명한다.

## 공개 경계
- 이 저장소에 직접 작성한 공개용 글과 코드만 추가한다. 상위 작업 공간의 references/, 번역 HTML, PDF, 회사 코드·데이터·내부 수치를 가져오지 않는다.
- 출처 주장, 저자의 해석, 직접 측정한 결과를 구별한다. 교육용 그림을 성능 실험 결과로 표현하지 않는다.
- 작성자 경력·소속·성과는 사용자가 공개하기로 정한 정보만 싣는다.

## 발행 흐름
- 최초 저장소 부트스트랩 이후 새 글은 post/<slug> 브랜치와 Draft PR로 작성한다. 관련 그림과 실습 코드를 같은 PR에 포함한다.
- PR의 Cloudflare Pages 미리보기에서 본문, 모바일 화면, 수식, 링크, 시각화를 확인한다.
- 동일 브랜치에서 수정하고, 검토가 끝나면 main에 병합하여 정식 사이트에 자동 배포한다.
- PR 생성 요청을 병합 요청으로 해석하지 않는다. 사용자가 발행/병합을 요청하면 필요한 검증 후 진행한다.
- 공개 저장소의 브랜치와 Draft PR도 공개다. 미리보기는 기본 공개이며 Cloudflare Access 설정과 GitHub 원본 접근 범위는 별개다.
- Cloudflare 연동 전에는 로컬 빌드 검증과 원격 미리보기 검증을 구분해 보고한다.

## 콘텐츠와 링크
- 읽기는 홈페이지, 실습은 GitHub. README 목차는 홈페이지의 개별 글로 연결한다.
- 각 실습 README에는 실행법과 관련 글 링크를 둔다. 실행 코드 없는 글에 가짜 실습 버튼을 만들지 않는다.
- 글 원본은 src/pages/posts/<slug>.md, 공통 레이아웃은 src/layouts/Post.astro다.
- 글 목록은 src/data/posts.json으로 관리한다. npm run sync:readme로 GitHub 목차를 갱신한다.
- site.config.json의 url은 Cloudflare에서 실제 주소를 받은 후 설정한다. 확인 전 주소를 배포 완료 링크로 표시하지 않는다.

## 구현과 검증
- Astro 정적 빌드, npm과 package-lock.json 사용. 기본 명령: npm ci, npm run build, npm run dev.
- Cloudflare Pages: 빌드 npm run build, 출력 dist, 루트 저장소 루트, production main, Node 22.22.1.
- 새 글/변경 후 npm run build를 실행한다. 시각 검토 여부는 별도로 명시한다.
- node_modules/, dist/, .astro/, .env 파일을 커밋하지 않는다. 배포 토큰을 저장소에 넣지 않는다.
