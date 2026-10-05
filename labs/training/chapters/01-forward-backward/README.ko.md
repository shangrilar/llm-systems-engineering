# 학습 1편: 학습 한 스텝

관련 글: [학습 한 스텝](https://ai-systems-engineering.com/posts/training-01-forward-backward/).
이 URL은 글 발행 후 사용할 주소이며, 현재는 Draft PR 미리보기에서 검토한다.

`train.py`는 이 편의 forward → loss → backward → AdamW update를 독립적으로 보여 준다.
공통 RunPod runner나 FineWeb 사전학습 기준선은 호출하지 않는다. 이 작은 CPU correctness exercise에는
RunPod/W&B key가 필요하지 않다. `--device cuda`는 같은 코드를 GPU에서 실행하는 선택지이며,
GPU 처리량이나 메모리는 아직 이 편에서 측정하지 않았다.

저장소 루트에서 별도 환경에 설치하고 실행한다.

```sh
python3 -m venv .venv-chapter-01
. .venv-chapter-01/bin/activate
python -m pip install -r labs/training/chapters/01-forward-backward/requirements.txt
python labs/training/chapters/01-forward-backward/train.py --device cpu
```

모델은 공개 SmolLM2-135M이며 model/tokenizer revision을 함께 고정한다. 첫 실행은 모델을 다운로드한다.
출력은 `results/chapter-01.json`이다. `--output /absolute/path/result.json`으로 위치를 바꿀 수 있다.
`--toy-only`는 모델 다운로드 없이 그림 5의 float64 선형층 계산만 대조한다.

관측 내용:

- 생성: `I like` 마지막 위치에서 토큰 하나를 선택한다.
- 학습: `I like AI`와 EOS를 넣고 각 위치의 top-5, 나머지 확률 질량과 정답 확률을 기록한다.
- Loss: 직접 한 번 shift한 CE와 HF 내부 loss를 대조한다.
- Backward: 첫 MLP down_proj의 저장 weight 형태에 맞춘 wgrad/xgrad를 autograd와 비교한다.
- Update: backward 후 가중치 유지, fresh AdamW의 step 후 변화와 m/v를 기록한다.

`hf-result.json`은 본문에 사용한 CPU FP32 한 스텝의 직접 측정 결과다. 모델의 학습 성능 평가나
검증 loss가 아니다. 환경과 입력이 기록되어 있으며, 허용 오차 검사는 코드에 있다.
그림의 네 어휘 toy와 이 실제 모델의 숫자를 비교해서 품질 차이를 주장하지 않는다.
