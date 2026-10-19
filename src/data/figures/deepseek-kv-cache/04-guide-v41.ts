import {L,spec} from './drawing';
// Section guide: figure 00 with the rows after V4.1-Flash hidden and V4.1-Flash highlighted.
export default spec('04-guide-v41',
 L('KV 캐시 저장과 읽기: V4.1-Flash','KV cache stored and read: V4.1-Flash'),
 L('MHA부터 V4.1-Flash까지 · 층간 공유로 저장하는 층 수를 줄인다','MHA to V4.1-Flash · sharing cuts the layers that store'),
 L('첫 그림의 두 그래프 가운데 가상 MHA부터 V4.1-Flash까지만 보이고 V4.1-Flash 행을 강조한다.','The two graphs of the first figure up to V4.1-Flash, with the V4.1-Flash row highlighted.'),
 {upTo:4,focus:4});
