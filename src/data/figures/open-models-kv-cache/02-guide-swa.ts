import {L,signature} from './drawing';
// Section guide: the signature figure with the models of this section in focus.
export default signature('02-guide-swa',
 L('토큰당 KV 캐시: SWA','KV cache per token: SWA'),
 L('MiMo-V2.6-Pro와 DeepSeek V4.1-Flash · SWA 층의 KV는 고정 상태로 따로 적었다','MiMo-V2.6-Pro and DeepSeek V4.1-Flash · SWA KV is listed as a separate fixed state'),
 L('대표 그림에서 SWA를 쓰는 MiMo-V2.6-Pro와 DeepSeek V4.1-Flash를 강조했다. SWA 층의 KV는 39.3 MB와 5.2 MB에서 멈추고, 토큰당 증가량은 MiMo의 global 10층과 DeepSeek의 global KV 저장층 4개에서 나온다.','The signature figure with the SWA users MiMo-V2.6-Pro and DeepSeek V4.1-Flash in focus. Their SWA KV stops at 39.3 MB and 5.2 MB; the 51.2 kB and 3.20 kB per token come from the other layers.'),{focus:['mimo','ds']});
