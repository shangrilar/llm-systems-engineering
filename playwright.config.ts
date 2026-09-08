import {defineConfig} from '@playwright/test';
const baseURL=`http://127.0.0.1:${process.env.PREVIEW_PORT??4348}`;
export default defineConfig({
  testDir:'tests/browser',workers:1,timeout:60000,
  use:{baseURL,browserName:'chromium'},
  webServer:{command:'npm run build && node --import tsx scripts/serve-preview.ts',url:baseURL,reuseExistingServer:false},
  reporter:[['list'],['json',{outputFile:'test-results/browser.json'}]],
});
