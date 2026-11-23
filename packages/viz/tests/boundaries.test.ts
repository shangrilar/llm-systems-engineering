import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {expect,it} from 'vitest';

// The site depends on viz, never the reverse, and viz must not reach outside its own package.
it('imports only its own modules, node built-ins, and playwright',()=>{
  const src=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../src');
  for(const file of fs.readdirSync(src)){
    const code=fs.readFileSync(path.join(src,file),'utf8');
    for(const [,spec] of code.matchAll(/from '([^']+)'/g))expect(spec,`${file}: ${spec}`).toMatch(/^(\.\/[a-z]+|node:[a-z_/]+|playwright)$/);
  }
});
