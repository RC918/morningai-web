import { expect, test } from '@playwright/test';

// Checkly is a tool used to monitor deployed environments, such as production or preview environments.
// It runs end-to-end tests with the `.check.e2e.ts` extension after each deployment to ensure that the environment is up and running.
// With Checkly, you can monitor your production environment and run `*.check.e2e.ts` tests regularly at a frequency of your choice.
// If the tests fail, Checkly will notify you via email, Slack, or other channels of your choice.
// On the other hand, E2E tests ending with `*.e2e.ts` are only run before deployment.
// You can run them locally or on CI to ensure that the application is ready for deployment.

// BaseURL needs to be explicitly defined in the test file.
// Otherwise, Checkly runtime will throw an exception: `CHECKLY_INVALID_URL: Only URL's that start with http(s)`
// You can't use `goto` function directly with a relative path like with other *.e2e.ts tests.
// Check the example at https://feedback.checklyhq.com/changelog/new-changelog-436

test.describe('Sanity', () => {
  test.describe('Static pages', () => {
    test('should display the homepage with correct branding', async ({ page, baseURL }) => {
      await page.goto(`${baseURL}/zh-TW`);
      await page.waitForLoadState('domcontentloaded');

      // 檢查Morning AI品牌是否顯示
      await expect(page.getByRole('link', { name: 'Morning AI' })).toBeVisible();

      // 檢查主要標題是否顯示（使用語義選擇器）
      const mainHeading = page.locator('h1').first();

      await expect(mainHeading).toBeVisible();
      await expect(mainHeading).toContainText('AI');
    });

    test('should have working navigation', async ({ page, baseURL }) => {
      await page.goto(`${baseURL}/zh-TW`);
      await page.waitForLoadState('domcontentloaded');

      // 檢查主要導航連結
      await expect(page.getByRole('link', { name: '產品' })).toBeVisible();
      await expect(page.getByRole('link', { name: '文檔' })).toBeVisible();
      await expect(page.getByRole('link', { name: '登入' })).toBeVisible();
      await expect(page.getByRole('link', { name: '註冊' })).toBeVisible();
    });
  });
});
