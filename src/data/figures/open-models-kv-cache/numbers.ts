import {tr,type Label} from '@llm-systems/viz';
// Figure order in the open models KV cache article. Each figure shows its number in the eyebrow ("그림 3 · SWA"),
// so the article needs no caption line under the notes; reordering figures means regenerating them.
const ORDER=[
 'open-models-kv-cache/00-overview',
 'open-models-kv-cache/05-five-methods',
 'open-models-kv-cache/06-timeline',
 'open-models-kv-cache/07-layer-map',
 'open-models-kv-cache/02-guide-swa',
 'open-models-kv-cache/11-swa',
 'open-models-kv-cache/01-guide-state',
 'open-models-kv-cache/08-state-update',
 'open-models-kv-cache/09-state-size',
 'open-models-kv-cache/10-state-vs-attn',
 'open-models-kv-cache/03-guide-sparse',
 'open-models-kv-cache/12-selection',
 'open-models-kv-cache/16-select-reuse',
 'open-models-kv-cache/04-guide-share',
 'open-models-kv-cache/13-sharing',
 'open-models-kv-cache/14-request',
 'open-models-kv-cache/15-access',
];
export function numbered(id:string,topic:Label):Label{
  const n=ORDER.indexOf(id)+1;
  if(!n)throw new Error('Figure not in the article order: '+id);
  return [`그림 ${n} · ${tr(topic,'ko')}`,`Figure ${n} · ${tr(topic,'en')}`];
}
