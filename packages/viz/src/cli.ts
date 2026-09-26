// Usage (from the site root): npm run viz:build -- <src/data/figures/.../figure.ts> <QA directory>
// Intentionally accepts exactly one figure; there is no bulk rendering mode, so each output gets a visual review.
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {buildFigure} from './build';
import type {FigureSpec} from './frame';
const root=process.cwd();
const [input,qaDir]=process.argv.slice(2);
if(!input||!qaDir||process.argv.length!==4)throw new Error('Usage: viz:build <one figure config.ts> <QA directory>');
const source=path.resolve(root,input);
if(!source.startsWith(root+'/src/data/figures/')||!source.endsWith('.ts'))throw new Error('Choose one figure in src/data/figures (run from the site root)');
// Catch invalid drawing arguments before they become silent SVG path errors.
execFileSync(process.execPath,[path.join(root,'node_modules/typescript/bin/tsc'),'--noEmit','--skipLibCheck','--target','es2022','--moduleResolution','bundler','--module','esnext',source],{cwd:root,stdio:'inherit'});
const spec:FigureSpec=(await import(pathToFileURL(source).href)).default;
const result=await buildFigure(spec,{root,qaDir:path.resolve(root,qaDir),source});
console.log(JSON.stringify(result,null,2));
if(result.errors.length)process.exitCode=1;
