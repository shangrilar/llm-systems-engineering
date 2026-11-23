import {L,spec} from './drawing';
// Section guide: figure 00 with the rows after V4-Flash hidden and V4-Flash highlighted.
export default spec('03-guide-v4',
 L('KV 캐시 저장과 읽기: V4-Flash','KV cache stored and read: V4-Flash'),
 L('MHA부터 V4-Flash까지 · 토큰 여러 개를 entry 하나로 압축','MHA to V4-Flash · several tokens compressed into one entry'),
 L('첫 그림의 두 그래프 가운데 가상 MHA부터 V4-Flash까지만 보이고 V4-Flash 행을 강조한다.','The two graphs of the first figure up to V4-Flash, with the V4-Flash row highlighted.'),
 {upTo:3,focus:3});
