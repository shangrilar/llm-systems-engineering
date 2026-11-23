import {L,accessFigure} from './drawing';
// What one generated token touches at 131,072 and 1,048,576 positions (independent bars, shared log axis).
export default accessFigure('15-access',
 L('토큰 하나를 만들 때 접근하는 양','What one generated token touches'),
 L('같은 모델을 두 문맥 길이에서 · KV 읽기, 검색용 key 읽기, 상태 행렬 읽기+쓰기','the same models at two context lengths · KV reads, search-key reads, state-matrix read + write'),
 L('같은 여섯 모델이 토큰 하나를 생성할 때 접근하는 양을 두 문맥 길이에서 비교한다. 세 항목은 독립 막대이며 로그 눈금이다.','The same six models compared by what one generated token touches, at two context lengths. The three items are separate bars on a log scale.'));
