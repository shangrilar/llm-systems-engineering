export type Locale = "ko" | "en";
export const localeFromPath = (path: string): Locale =>
  /^\/en(?:\/|$)/.test(path) ? "en" : "ko";
export const home = (locale: Locale) => (locale === "en" ? "/en/" : "/");
export const postUrl = (locale: Locale, slug: string) =>
  `${home(locale)}posts/${slug}/`;
export const shell = {
  ko: {
    description: "모델, 하드웨어, 워크로드로 배우는 LLM 시스템 엔지니어링.",
    skip: "본문으로 건너뛰기",
    nav: "주 메뉴",
    learn: "학습 경로",
    articles: "글 목록",
    footer: "작은 예제에서 큰 시스템으로.",
    source: "원고와 코드",
    back: "← 학습 경로",
    feedback: "궁금한 점이나 정정할 내용이 있나요?",
    issue: "GitHub에서 의견 남기기 ↗",
    list: "글 목록으로 돌아가기 →",
  },
  en: {
    description:
      "Learn LLM systems engineering through models, hardware and workloads.",
    skip: "Skip to content",
    nav: "Main navigation",
    learn: "Learning path",
    articles: "Articles",
    footer: "From small examples to large systems.",
    source: "Writing and code",
    back: "← Learning path",
    feedback: "Questions or corrections?",
    issue: "Share feedback on GitHub ↗",
    list: "Back to articles →",
  },
};
