"""Matched input/GPU comparison; warmup and trace export are outside timings."""
from __future__ import annotations
import gc,json,time
from pathlib import Path
import torch
from .config import write_json
from .data import TokenStore,sampler_for_config
from .model import Decoder,PackedBatch
from .measurement import model_flops


def matched_benchmark(config,dataset,output):
    output=Path(output)
    torch.set_float32_matmul_precision('high')
    manifest=json.loads((Path(dataset)/'manifest.json').read_text())
    store=TokenStore(dataset,'train',config['data']['max_seq_len'])
    segments,bins=sampler_for_config(store,config).next_batch()
    tokens=sum(len(s.inputs) for s in segments)
    flops=model_flops(config['model'],manifest['vocab_size'],[len(s.inputs) for s in segments])
    cases=[]
    for attention,loss_backend in [('flex','legacy_chunked'),('flex','liger'),
                                    ('flash_varlen','legacy_chunked'),('flash_varlen','liger')]:
        torch.manual_seed(config['seed']);torch.cuda.empty_cache()
        model=Decoder(manifest['vocab_size'],max_seq_len=config['data']['max_seq_len'],
                      backend=attention,loss_backend=loss_backend,**config['model']).cuda()
        opt=torch.optim.AdamW(model.parameters(),lr=config['train']['lr'],betas=(.9,.95),
                              weight_decay=config['train']['weight_decay'],fused=True)
        def update():
            opt.zero_grad(set_to_none=True)
            with torch.profiler.record_function('batch_to_device'):
                batch=PackedBatch.from_segments(segments,bins,'cuda')
            with torch.profiler.record_function('forward_loss'),torch.autocast('cuda',dtype=torch.bfloat16):
                loss=model.loss_sum(batch)/tokens
            with torch.profiler.record_function('backward'):loss.backward()
            with torch.profiler.record_function('clip_and_optimizer'):
                norm=torch.nn.utils.clip_grad_norm_(model.parameters(),config['train']['clip_grad'])
                if not torch.isfinite(loss) or not torch.isfinite(norm):raise RuntimeError('Non-finite matched benchmark')
                opt.step()
            torch.cuda.synchronize()
            return loss.item()
        for _ in range(3):update()
        torch.cuda.reset_peak_memory_stats();durations=[];losses=[]
        for _ in range(5):
            torch.cuda.synchronize();start=time.perf_counter();loss=update()
            durations.append(time.perf_counter()-start);losses.append(loss)
        case={'attention':attention,'loss_backend':loss_backend,'batch_size':len(bins),'actual_tokens':tokens,
              'warmup_updates':3,'measured_updates':5,'update_seconds':durations,'losses':losses,
              'tokens_per_second_per_gpu':tokens*5/sum(durations),
              'estimated_mfu':flops*5/sum(durations)/config['measurement']['bf16_peak_flops_per_gpu'],
              'peak_allocated':torch.cuda.max_memory_allocated(),'peak_reserved':torch.cuda.max_memory_reserved()}
        name=attention+'-'+loss_backend
        with torch.profiler.profile(activities=[torch.profiler.ProfilerActivity.CPU,torch.profiler.ProfilerActivity.CUDA],
                                    record_shapes=False,profile_memory=False) as profiler:update()
        path=output/('benchmark-'+name+'.json');profiler.export_chrome_trace(str(path))
        case['trace']=path.name;cases.append(case)
        write_json(output/'matched-benchmark-progress.json',{'completed_case':name,'cases':cases})
        print(json.dumps({'benchmark':case}),flush=True)
        del model,opt;gc.collect();torch.cuda.empty_cache()
    result={'passed':True,'scope':'Same preselected real-token input, seed/model/optimizer/precision/GPU. H2D+forward+backward+clip+AdamW included; runtime best-fit selection excluded. No profiler inside timed updates.',
            'parameters':sum(p.numel() for p in Decoder(manifest['vocab_size'],max_seq_len=config['data']['max_seq_len'],backend='sdpa_documents',**config['model']).parameters()),
            'document_chunks':len(segments),'cases':cases}
    write_json(output/'matched-benchmark.json',result)
    return result
