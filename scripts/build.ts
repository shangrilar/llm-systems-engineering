import {spawnSync} from 'node:child_process';
import {rm} from 'node:fs/promises';
import {validateContent} from './content';
validateContent();
await rm('dist',{recursive:true,force:true});
const result=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'inherit',env:process.env});
process.exit(result.status??1);
