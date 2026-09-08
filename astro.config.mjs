import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import config from './site.config.json' with { type: 'json' };
export default defineConfig({ output: 'static', ...(config.url ? { site: config.url } : {}), integrations:[mdx()], i18n:{defaultLocale:'ko',locales:['ko','en'],routing:{prefixDefaultLocale:false}} });
