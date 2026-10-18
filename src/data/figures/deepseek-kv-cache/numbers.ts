import {tr,type Label} from '@llm-systems/viz';
// Figure order in the DeepSeek KV cache article. Each figure shows its number in the eyebrow ("그림 3 · MLA"),
// so the article needs no caption line under the notes; reordering figures means regenerating them.
const ORDER=[
 'deepseek-kv-cache/00-kv-per-token',
 'deepseek-kv-cache/01-guide-v2',
 'mla-flow/01-projections',
 'mla-flow/02-attention',
 'mla-flow/03-key-absorption',
 'mla-flow/04-value-absorption',
 'deepseek-kv-cache/02-guide-v32',
 'dsa-flow/01-indexer-projections',
 'dsa-flow/02-index-score',
 'dsa-flow/03-sparse-attention',
 'deepseek-kv-cache/03-guide-v4',
 'hca-flow/01-weight-map',
 'hca-flow/02-compression',
 'hca-flow/03-visible-entries',
 'hca-flow/04-attention',
 'csa-flow/01-weight-map',
 'csa-flow/02-overlap-compression',
 'csa-flow/03-indexer',
 'csa-flow/04-visible-entries',
 'deepseek-kv-cache/04-guide-v41',
 'csa2-flow/07-compression-span',
 'csa2-flow/06-indexer-key-source',
 'csa2-flow/01-three-modes',
 'csa2-flow/04-layer-layout',
 'csa2-flow/05-hierarchical-indexer',
 'deepseek-kv-cache/06-ced-sources',
 'deepseek-kv-cache/07-ced-prefill'];
export function numbered(id:string,topic:Label):Label{
  const n=ORDER.indexOf(id)+1;
  if(!n)throw new Error('Figure not in the article order: '+id);
  return [`그림 ${n} · ${tr(topic,'ko')}`,`Figure ${n} · ${tr(topic,'en')}`];
}
