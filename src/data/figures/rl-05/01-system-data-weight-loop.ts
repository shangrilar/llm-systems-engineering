import {readFileSync} from 'node:fs';
import {Panel,type FigureSpec} from '@llm-systems/viz';
// Quotation of Figure 1, PDF p. 2, RadixArk, Miles v0.1 (arXiv:2609.08368v1).
// Diagram-only crop; original labels and geometry are preserved. Not a CC-licensed asset.
const source=readFileSync(new URL('./assets/miles-v01-figure-1.png',import.meta.url)).toString('base64');
export default {
  articleId:'rl-05',figureId:'01-system-data-weight-loop',number:'5-1',
  kind:'quoted source figure',eyebrow:['그림 1','Figure 1'],layout:'wide',
  title:['Miles의 RL 학습 루프','The Miles RL loop'],
  subtitle:['Miles v0.1 · 원문 Figure 1','Miles v0.1 · original Figure 1'],
  alt:['Miles 원문 구성도. 왼쪽 SGLang 추론 엔진에서 생성한 trajectory가 중앙 data buffer를 거쳐 오른쪽 학습 엔진으로 전달된다. 아래 점선의 weight update는 새 가중치를 추론 쪽으로 돌려보낸다.','Original Miles diagram. Trajectories from the SGLang inference engines on the left pass through the central data buffer to training on the right. The dashed weight-update path returns new weights to rollout.'],
  caption:['출처: RadixArk, Miles v0.1, Figure 1.','Source: RadixArk, Miles v0.1, Figure 1.'],captionIn:'article',
  sources:[{label:'RadixArk, Miles v0.1, Figure 1 (PDF p. 2)',url:'https://arxiv.org/abs/2609.08368v1'}],
  panels(locale){
    const p=new Panel(locale,null,670,1366);
    p.raw(`<image width="1366" height="670" href="data:image/png;base64,${source}"/>`);
    return [p];
  },
} satisfies FigureSpec;
