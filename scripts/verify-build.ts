import {readFile,stat} from 'node:fs/promises';
import {validateContent} from './content';
const {articles,profile}=validateContent();
for(const [path,locale]of [['dist/index.html','ko'],['dist/en/index.html','en']]){
  const html=await readFile(path,'utf8');
  if(!html.includes(`lang="${locale}"`))throw Error(`Wrong language: ${path}`);
}
for(const article of articles)
  for(const [locale,entry]of Object.entries(article.locales)){
    if(!entry)continue;
    const path=`dist/${locale==='en'?'en/':''}posts/${entry.slug}/index.html`;
    const html=await readFile(path,'utf8');
    if(!html.includes(`lang="${locale}"`))throw Error(`Wrong article language: ${path}`);
    if((html.match(/<h1\b/g)??[]).length!==1)throw Error(`Expected one title: ${path}`);
    if(!entry.published&&!html.includes(locale==='ko'?'초안':'Draft'))throw Error(`Missing draft notice: ${path}`);
    for(const match of html.matchAll(/<img\b[^>]*\bsrc="(\/images\/[^"?#]+)"/g))
      if(!(await stat('dist'+match[1])).isFile())throw Error(`Missing article image: ${match[1]}`);
  }
console.log(`${profile}: Korean/English article pages and images verified.`);
