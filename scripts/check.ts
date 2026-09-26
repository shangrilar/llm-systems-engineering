import {validateContent} from './content';
import {checkFigures} from './check-figures';
validateContent();
console.log('Article metadata and translation revisions checked.');
const problems=await checkFigures();
if(problems.length){console.error(problems.join('\n'));process.exit(1);}
console.log('Figure images match their configs.');
