from __future__ import annotations

import html
import json
from pathlib import Path


def build_report(directory):
    directory = Path(directory)
    records = [json.loads(line) for line in (directory / "metrics.jsonl").read_text().splitlines()]
    summary = json.loads((directory / "summary.json").read_text())
    wandb = json.loads((directory / "wandb.json").read_text()) if (directory / "wandb.json").exists() else {}
    wandb_link = f'<a href="{html.escape(wandb.get("url") or "", quote=True)}" target="_blank" rel="noopener">W&amp;B에서 loss와 지표 보기</a>' if wandb.get("url") else "W&amp;B 연결 없음"
    valid = [r for r in records if r.get("validation_loss") is not None]
    points = ""
    low, high = 0.0, 0.0
    if valid:
        low = min(r["validation_loss"] for r in valid)
        high = max(r["validation_loss"] for r in valid)
        points = " ".join(f'{50 + 650 * r["tokens"] / max(summary["tokens"], 1):.2f},'
                          f'{230 - 170 * (r["validation_loss"] - low) / max(high - low, 0.01):.2f}' for r in valid)
    rows = "".join("<tr>" + "".join("<td>" + html.escape(str(r.get(k))) + "</td>" for k in
                                   ("step", "tokens", "train_loss", "validation_loss", "step_seconds",
                                    "tokens_per_second_per_gpu", "estimated_mfu", "gpu_peak_allocated", "gpu_peak_reserved",
                                    "warmup", "profiled", "memory_sampled")) + "</tr>" for r in records)
    links = " ".join(f'<a href="{p.name}">{html.escape(p.name)}</a>' for p in directory.iterdir()
                     if p.is_file() and p.suffix in (".json", ".jsonl", ".pickle"))
    (directory / "report.html").write_text(f'''<!doctype html><html lang="ko"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>학습 실험 결과</title>
<style>body{{font:16px/1.7 system-ui;background:#f6f5f0;color:#192b32;margin:40px auto;max-width:1050px;padding:0 20px}}table{{border-collapse:collapse;min-width:700px}}td,th{{padding:9px;border-bottom:1px solid #d7dfdc;text-align:left}}svg{{width:100%;max-width:750px}}a{{color:#146658;margin-right:15px}}.scroll{{overflow:auto}}pre{{white-space:pre-wrap;overflow-wrap:anywhere}}</style>
<h1>학습 실험 결과</h1><p>실제 실행 로그에서 생성한 보고서입니다. Profile 실행의 시간은 일반 실행과 직접 비교하지 않습니다.</p>
<p>{wandb_link}</p>
<p>처리량과 MFU 요약에서는 워밍업, 프로파일 수집, 메모리 이력 수집 스텝을 제외합니다.
tokens/s/GPU는 실제 정답 토큰 수 ÷ update 벽시계 시간입니다. 현재는 단일 GPU이며, update 시간에는 패킹·전송·계산·optimizer가 포함됩니다.
MFU는 모델 행렬 연산량의 추정치 ÷ 시간 ÷ 해당 GPU의 dense BF16 이론 peak입니다. 실제 하드웨어 연산 카운터가 아닙니다.</p>
<h2>검증 loss 대 학습 토큰</h2><svg viewBox="0 0 750 280" role="img" aria-label="검증 loss 대 토큰">
<path d="M50 25V240H710" fill="none" stroke="#57696f"/><polyline points="{points}" fill="none" stroke="#146658" stroke-width="3"/>
<text x="320" y="275">학습 정답 토큰</text><text x="5" y="20">loss</text>
<text x="5" y="60">{high:.3f}</text><text x="5" y="230">{low:.3f}</text>
<text x="50" y="258">0</text><text x="620" y="258">{summary['tokens']}</text></svg>
<h2>실행 요약</h2><pre>{html.escape(json.dumps(summary, ensure_ascii=False, indent=2))}</pre>
<h2>Step별 관측</h2><div class="scroll"><table><thead><tr><th>step</th><th>tokens</th><th>train loss</th><th>validation loss</th><th>seconds</th><th>tokens/s/GPU</th><th>MFU 추정</th><th>peak allocated bytes</th><th>peak reserved bytes</th><th>warmup</th><th>profile</th><th>snapshot</th></tr></thead><tbody>{rows}</tbody></table></div>
<h2>원본 자료</h2><p>{links}</p><p>timeline.json은 Perfetto에서, memory-snapshot.pickle은 PyTorch memory visualizer에서 엽니다. GPU allocated/reserved는 PyTorch allocator 관측값입니다.</p></html>''')


def compare(directories, output):
    summaries = []
    for directory in directories:
        directory = Path(directory)
        summary = json.loads((directory / "summary.json").read_text())
        config = json.loads((directory / "config.json").read_text())
        manifest = json.loads((directory / "data-manifest.json").read_text())
        from .config import fingerprint
        summaries.append({"name": config["name"], "data": fingerprint(manifest), **summary})
    if any(s["profiled"] for s in summaries):
        raise ValueError("Profile runs are excluded from performance/loss comparisons")
    if len({s["data"] for s in summaries}) > 1:
        raise ValueError("Different datasets cannot be treated as a matched comparison")
    from .config import write_json
    write_json(output, summaries)
