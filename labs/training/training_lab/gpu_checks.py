"""Fail before the training run if CUDA loss or document attention is incorrect."""
from __future__ import annotations
import argparse, json, contextlib
from pathlib import Path
import torch
import torch.nn.functional as F
from .config import load_config, write_json
from .loss import linear_ce
from .model import flash_varlen


def relative_error(actual, expected):
    a,e=actual.float(),expected.float()
    return {"max_absolute":(a-e).abs().max().item(),
            "relative_l2":((a-e).norm()/e.norm().clamp_min(1e-12)).item()}


def check(output):
    torch.manual_seed(42)
    report={"torch":torch.__version__,"cuda":torch.version.cuda,"gpu":torch.cuda.get_device_name(),
            "native_lce_available":hasattr(F,"linear_cross_entropy")}
    assert report['native_lce_available']
    # LM head loss, hidden xgrad and tied-head weight wgrad under actual BF16 AMP.
    x=torch.randn(257,64,device='cuda')*.1
    w=torch.randn(512,64,device='cuda')*.1
    y=torch.randint(512,(257,),device='cuda')
    outputs={}
    for backend in ['reference','torch_linear_ce','liger']:
        h=x.clone().requires_grad_();weight=w.clone().requires_grad_()
        with torch.autocast('cuda',dtype=torch.bfloat16):
            loss=linear_ce(h,weight,y,backend,chunk_tokens=64)/y.numel()
        loss.backward();outputs[backend]=(loss.detach(),h.grad,weight.grad)
    ref=outputs['reference']
    for backend,key in [('torch_linear_ce','native_lce'),('liger','liger_lce')]:
        actual=outputs[backend]
        report[key]={name:relative_error(a,b) for name,a,b in zip(['loss','xgrad','wgrad'],actual,ref)}
        assert actual[0].dtype==torch.float32
        assert report[key]['loss']['max_absolute']<.002
        assert all(report[key][k]['relative_l2']<.03 for k in ['xgrad','wgrad'])
    # The previous tiny test missed BF16 loss-sum accumulation bias. Exercise
    # many output chunks and a larger vocabulary before accepting a backend.
    x=torch.randn(8193,64,device='cuda')*.1
    w=torch.randn(8192,64,device='cuda')*.1
    y=torch.randint(8192,(8193,),device='cuda')
    report['large_token_loss']={}
    outputs={}
    for backend in ['reference','torch_linear_ce','liger']:
        h=x.clone().requires_grad_();weight=w.clone().requires_grad_()
        with torch.autocast('cuda',dtype=torch.bfloat16):
            total=linear_ce(h,weight,y,backend,chunk_tokens=128)
            loss=total/y.numel()
        loss.backward();outputs[backend]=(loss.detach(),h.grad,weight.grad)
        assert total.dtype==torch.float32
    for backend in ['torch_linear_ce','liger']:
        errors={name:relative_error(a,b) for name,a,b in zip(['loss','xgrad','wgrad'],outputs[backend],outputs['reference'])}
        report['large_token_loss'][backend]=errors
        assert errors['loss']['max_absolute']<.0005
        assert all(errors[k]['relative_l2']<.03 for k in ['xgrad','wgrad'])
    # Same BF16 Q/K/V compared with independent, FP32 math attention segments.
    lengths=[5,17,1,64,33];offsets=[0]
    for n in lengths:offsets.append(offsets[-1]+n)
    cu=torch.tensor(offsets,dtype=torch.int32,device='cuda')
    qkv=[torch.randn(offsets[-1],4,16,device='cuda',dtype=torch.bfloat16) for _ in range(3)]
    def compute(use_flash,values):
        if use_flash:return flash_varlen(*values,cu,max(lengths))
        chunks=[]
        for a,b in zip(offsets,offsets[1:]):
            q,k,v=[t[a:b].float().transpose(0,1).unsqueeze(0) for t in values]
            with torch.nn.attention.sdpa_kernel(torch.nn.attention.SDPBackend.MATH):
                z=F.scaled_dot_product_attention(q,k,v,is_causal=True)
            chunks.append(z.squeeze(0).transpose(0,1))
        return torch.cat(chunks)
    upstream=torch.randn_like(qkv[0]);outputs={}
    for kind in ['reference','flash']:
        values=[t.clone().requires_grad_() for t in qkv]
        z=compute(kind=='flash',values);(z.float()*upstream.float()).sum().backward()
        outputs[kind]=(z.detach(),*[t.grad for t in values])
    report['flash_varlen']={name:relative_error(a,b) for name,a,b in zip(['output','dq','dk','dv'],outputs['flash'],outputs['reference'])}
    assert all(v['relative_l2']<.03 for v in report['flash_varlen'].values())
    modified=[t.clone() for t in qkv]
    for t in modified:t[:lengths[0]]+=2
    z=compute(True,modified)
    isolation=relative_error(z[lengths[0]:],outputs['flash'][0][lengths[0]:])
    assert isolation['max_absolute']==0
    report['document_isolation']=isolation
    report['passed']=True
    write_json(Path(output)/'gpu-preflight.json',report)
    print(json.dumps(report),flush=True)
    return report


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--config',required=True);p.add_argument('--output',required=True)
    a=p.parse_args();load_config(a.config);check(a.output)
