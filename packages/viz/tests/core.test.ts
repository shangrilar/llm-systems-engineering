import {describe,expect,it} from 'vitest';
import {C,Panel,compose,markerId,tr,wrap,type FigureSpec,type Locale} from '../src/index';

const spec=(layout?:'wide'):FigureSpec=>({
  articleId:'test',figureId:'01-sample',number:'0-1',layout,
  title:['상자 & 화살표','Boxes & arrows'],subtitle:'Shared subtitle',
  alt:['설명 <대체>','Alt <text>'],caption:['캡션','Caption'],
  sources:[{label:'Example',url:'https://example.com'}],
  panels(locale:Locale){
    const a=new Panel(locale,['왼쪽','Left'],300),b=new Panel(locale,['오른쪽','Right'],200);
    a.box(20,90,300,100,['제목','Title'],['본문','Body'],'teal');
    a.arrow(170,200,170,260,C.orange);
    b.token(20,90,'x₁');
    return [a,b];
  },
});

describe('text',()=>{
  it('selects the locale from a bilingual label',()=>{
    expect(tr(['가','a'],'ko')).toBe('가');
    expect(tr(['가','a'],'en')).toBe('a');
    expect(tr('shared','en')).toBe('shared');
  });
  it('wraps on spaces and keeps explicit line breaks',()=>{
    expect(wrap('one two three four',80,20)).toEqual(['one two','three','four']);
    expect(wrap('a\nb',500,20)).toEqual(['a','b']);
    expect(wrap('한국어 문장을 좁게 나눈다',100,20).length).toBeGreaterThan(1);
  });
});

describe('compose',()=>{
  it('places two panels per row on desktop and stacks them on mobile',()=>{
    const desktop=compose(spec(),'ko'),wide=compose(spec('wide'),'ko'),mobile=compose(spec(),'ko',true);
    expect(desktop.width).toBe(1200);
    expect(mobile.width).toBe(360);
    expect(desktop.svg).toContain('translate(40 ');
    expect(desktop.svg).toContain('translate(624 ');
    expect(wide.height).toBeGreaterThan(desktop.height);
    expect(mobile.svg).not.toContain('translate(624 ');
  });
  it('escapes text and records accessibility and source metadata',()=>{
    const {svg}=compose(spec(),'en');
    expect(svg).toContain('<title id="title">Boxes &amp; arrows</title>');
    expect(svg).toContain('<desc id="desc">Alt &lt;text&gt;</desc>');
    expect(svg).toContain('https://example.com');
  });
  it('defines every arrow marker that panels reference',()=>{
    const {svg}=compose(spec(),'ko');
    for(const [,id] of svg.matchAll(/url\(#([a-z-]+)\)/g))expect(svg).toContain(`<marker id="${id}"`);
    expect(markerId(C.orange)).toBe('arrow-orange');
    expect(markerId('#000000')).toBe('arrow-muted');
  });
  // Locks the exact SVG bytes so refactors cannot silently change published figures.
  it('keeps the SVG output stable',()=>{
    for(const locale of ['ko','en'] as Locale[])for(const mobile of [false,true])expect(compose(spec(),locale,mobile).svg).toMatchSnapshot(`${locale}-${mobile?'mobile':'desktop'}`);
  });
});
