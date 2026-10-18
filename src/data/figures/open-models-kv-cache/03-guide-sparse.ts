import {L,signature} from './drawing';
// Section guide: the signature figure with the models of this section in focus.
export default signature('03-guide-sparse',
 L('토큰당 KV 캐시: sparse attention','KV cache per token: sparse attention'),
 L('골라 읽는 네 모델 · 읽는 양은 줄지만 저장량은 줄지 않는다','the four models that select · reads shrink, storage does not'),
 L('대표 그림에서 위치를 골라 읽는 Qwen3.8-Flash-Next, GLM-5.3, Hy4-preview, DeepSeek V4.1-Flash를 강조했다. 골라 읽기는 저장량을 줄이지 않으므로 GLM-5.3과 Hy4-preview는 토큰당 95.2 kB로 가장 크다.','The signature figure with the four selecting models in focus. Selection does not cut storage, so GLM-5.3 and Hy4-preview have the largest value, 95.2 kB per token.'),{focus:['qwen','glm','hy4','ds']});
