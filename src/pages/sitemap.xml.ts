import type { APIRoute } from 'astro';
import config from '../../site.config.json';
import articles from '../data/posts.json';

export const GET: APIRoute = () => {
  const paths = ['/', '/en/'];
  for (const article of articles) {
    for (const [locale, entry] of Object.entries(article.locales)) {
      if (entry.published) paths.push(`${locale === 'en' ? '/en' : ''}/posts/${entry.slug}/`);
    }
  }
  const urls = paths.map(path => `<url><loc>${new URL(path, config.url).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
