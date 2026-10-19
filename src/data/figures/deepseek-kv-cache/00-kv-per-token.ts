import {L,spec} from './drawing';
// Opening comparison of all versions. Each section reuses this figure with later rows hidden (01–04).
export default spec('00-kv-per-token',
 L('KV 캐시: 저장하는 양과 읽는 양','KV cache: what is stored and what is read'),
 L('양쪽 모두 배포 캐시 형식 · 왼쪽 토큰당 저장 증가량 · 오른쪽 토큰 하나를 생성할 때 읽는 양(128K 문맥)','Both in deployed cache formats · left: storage added per token · right: reads per generated token (128K context)'),
 L('가상 MHA, V2, V3.2, V4-Flash, V4.1-Flash를 두 그래프로 비교한다. 왼쪽은 긴 문맥에서 토큰당 늘어나는 KV 캐시로, 가상 MHA 3,932,160 B에서 V4.1-Flash 890 B까지 줄어든다. 오른쪽은 131,072토큰 문맥에서 토큰 하나를 생성할 때 모든 층이 읽는 양으로, 515 GB에서 35.0 MB까지 줄며 V3.2부터는 검색용 key가 대부분을 차지한다. 두 그래프는 단위와 눈금이 다르다.',
  'Two graphs compare a hypothetical MHA, V2, V3.2, V4-Flash and V4.1-Flash. Left: KV cache added per token in a long context, from 3,932,160 B to 890 B. Right: bytes read across all layers to generate one token in a 131,072-token context, from 515 GB to 35.0 MB, with search keys dominating from V3.2 on. The graphs use different units and scales.'));
