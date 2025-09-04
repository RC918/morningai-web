import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.PORT || 3000);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${PORT}`;

export default defineConfig({
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    locale: 'en-US',
    timezoneId: 'Asia/Taipei',
    viewport: { width: 1280, height: 900 },
  },
  webServer: {
    command: 'pnpm build && pnpm start -p ' + PORT,   // 先 build 再 start（避免 dev 崩掉）
    url: BASE_URL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
});

