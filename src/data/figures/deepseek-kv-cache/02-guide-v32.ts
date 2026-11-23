import {L,spec} from './drawing';
// Section guide: figure 00 with the rows after V3.2 hidden and V3.2 highlighted.
export default spec('02-guide-v32',
 L('KV 캐시 저장과 읽기: V3.2','KV cache stored and read: V3.2'),
 L('MHA부터 V3.2까지 · DSA는 읽는 위치를 줄인다(같은 정밀도에서는 저장 증가)','MHA to V3.2 · DSA cuts the positions read (at equal precision, storage grows)'),
 L('첫 그림의 두 그래프 가운데 가상 MHA부터 V3.2까지만 보이고 V3.2 행을 강조한다.','The two graphs of the first figure up to V3.2, with the V3.2 row highlighted.'),
 {upTo:2,focus:2});
