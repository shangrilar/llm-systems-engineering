import {L,signature} from './drawing';
// Section guide: the signature figure with the models of this section in focus.
export default signature('01-guide-state',
 L('토큰당 KV 캐시: linear attention을 쓰는 모델','KV cache per token: models with linear attention'),
 L('Kimi K3와 Qwen3.8-Flash-Next · 토큰당 증가량은 작아졌지만 큰 고정 상태가 따로 있다','Kimi K3 and Qwen3.8-Flash-Next · less per token, but a large separate fixed state'),
 L('대표 그림에서 Kimi K3와 Qwen3.8-Flash-Next를 강조했다. 토큰당 증가량은 27.6 kB와 25.3 kB이고, 문맥과 무관한 고정 상태가 449 MB와 59.0 MB 따로 있다.','The signature figure with Kimi K3 and Qwen3.8-Flash-Next in focus: 27.6 kB and 25.3 kB per token, plus a separate fixed state of 449 MB and 59.0 MB.'),{focus:['kimi','qwen']});
