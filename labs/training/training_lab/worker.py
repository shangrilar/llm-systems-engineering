"""Compatibility entry for old training worker environments."""
import base64
import json
import os
from .runpod import make_job
from experiment_runner.worker import serve as shared_serve


def serve():
    if "LAB_CONFIG_B64" not in os.environ:
        return shared_serve()
    config = json.loads(base64.b64decode(os.environ.pop("LAB_CONFIG_B64")))
    os.environ["EXPERIMENT_PROVENANCE"] = os.environ.get("LAB_PROVENANCE", "{}")
    return shared_serve(make_job(config), os.environ["LAB_RUN_ID"],
                        os.environ.pop("LAB_AUTH_TOKEN"), legacy_recovery=True)


if __name__ == "__main__":
    serve()
