import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const root=resolve('dist');
const mime:Record<string,string>={'.html':'text/html','.png':'image/png','.svg':'image/svg+xml','.css':'text/css','.js':'text/javascript','.json':'application/json'};
createServer(async(req,res)=>{
  try{
    let path=resolve(root,'.'+decodeURIComponent(new URL(req.url!,'http://localhost').pathname));
    if(path!==root&&!path.startsWith(root+'/')){res.statusCode=403;res.end();return;}
    if((await stat(path)).isDirectory())path+='/index.html';
    res.setHeader('Content-Type',mime[extname(path)]??'application/octet-stream');
    res.end(await readFile(path));
  }catch{res.statusCode=404;res.end('Not found');}
}).listen(Number(process.env.PREVIEW_PORT??4348),'127.0.0.1');
