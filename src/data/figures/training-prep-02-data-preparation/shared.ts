import type {Tone} from '@llm-systems/viz';

// Small illustrative inputs shared by the packing and attention figures.
export const documents = [
  {id:'A',length:6,tone:'blue'},
  {id:'B',length:4,tone:'teal'},
  {id:'C',length:3,tone:'purple'},
  {id:'D',length:2,tone:'orange'},
] as const satisfies readonly {id:string;length:number;tone:Tone}[];
export const packs = [[documents[0],documents[3]],[documents[1],documents[2]]] as const;
export const packedDocuments = packs.flat();
export const boundaries = [0,...packedDocuments.map((_,i)=>packedDocuments.slice(0,i+1).reduce((n,d)=>n+d.length,0))];
export const capacity = 8;
