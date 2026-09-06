import { defineConfig } from 'astro/config';
import config from './site.config.json' with { type: 'json' };
export default defineConfig({ output: 'static', ...(config.url ? { site: config.url } : {}) });
