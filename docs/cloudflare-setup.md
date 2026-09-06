# Cloudflare Pages 연동

1. Cloudflare에서 Pages 프로젝트 생성 → GitHub 연결.
2. shangrilar/llm-systems-engineering 저장소 선택.
3. Production branch: main. Framework preset: Astro.
4. Root directory: 저장소 루트(비워 둠). Build command: npm run build. Build output directory: dist.
5. 환경 변수 NODE_VERSION=22.22.1 설정.
6. Production과 Preview의 자동 배포를 켠다.
7. 첫 배포 성공 후 실제 production URL을 site.config.json의 url에 입력한다. npm run sync:readme로 목차 링크를 만든다. 이 변경은 첫 글 PR에 포함할 수 있다.
8. 이미 열려 있는 첫 글 PR의 브랜치에 새 커밋을 push해 preview 빌드를 유발하고 GitHub 배포 체크/Cloudflare 대시보드에서 주소를 확인한다.
9. 모바일 화면, 본문, 글 이동, 시각화와 링크를 확인한 뒤 PR을 main에 병합한다.

미리보기는 기본 공개다. 필요하면 Pages Settings → General → Enable access policy에서 Cloudflare Access를 설정한다. 공개 GitHub 원고는 별도로 계속 공개된다.

공식 문서:
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/configuration/preview-deployments/
