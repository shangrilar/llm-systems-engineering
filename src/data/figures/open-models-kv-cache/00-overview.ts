import {L,signature} from './drawing';
// Signature figure: the KV cache added per token, by model.
export default signature('00-overview',
 L('모델마다 다른 토큰당 KV 캐시','KV cache per token differs by model'),
 L('긴 문맥에서 토큰 하나가 늘 때의 평균 저장 증가량 · 배포 캐시 형식','average storage added per token in a long context · deployed cache formats'),
 L('여섯 모델의 토큰당 KV 캐시 증가량을 선형 눈금 막대로 비교한다. 큰 순서로 GLM-5.3과 Hy4-preview 92.6 kB, MiMo-V2.6-Pro 51.2 kB, Kimi K3 27.6 kB, Qwen3.8-Flash-Next 25.3 kB, DeepSeek V4.1-Flash 890 B다. 막대 아래에는 문맥과 무관하게 요청마다 따로 드는 고정 상태를 적었다.','Six models compared by KV cache added per token on a linear scale: largest first, GLM-5.3 and Hy4-preview 92.6 kB, MiMo-V2.6-Pro 51.2 kB, Kimi K3 27.6 kB, Qwen3.8-Flash-Next 25.3 kB, DeepSeek V4.1-Flash 890 B. Under the bars is the fixed state each request holds regardless of context.'));
