FROM pytorch/pytorch:2.8.0-cuda12.8-cudnn9-devel@sha256:a7103283ea7113e10ae5d014bd2342acebda0bc53164b2f7b1dd6eb7a766bdb6
WORKDIR /workspace/training-lab
COPY requirements-worker.txt .
RUN python -m pip install --no-cache-dir -r requirements-worker.txt
COPY training_lab/ training_lab/
COPY experiments/ experiments/
CMD ["python", "-u", "-m", "training_lab", "local", "--config", "smoke"]
