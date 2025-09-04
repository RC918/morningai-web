import { expect, test } from '@playwright/test';

test.describe('I18n Basic', () => {
  test.describe('URL-based Language Switching', () => {
    test('should display correct content for each language via URL', async ({ page }) => {
      // 測試繁體中文
      await page.goto('/zh-TW');
      await page.waitForLoadState('networkidle');
      const h1TW = page.locator('h1').first();
      await expect(h1TW).toBeVisible();
      await expect(h1TW).toContainText('我們創造');

      // 測試簡體中文
      await page.goto('/zh-CN');
      await page.waitForLoadState('networkidle');
      const h1CN = page.locator('h1').first();
      await expect(h1CN).toBeVisible();
      await expect(h1CN).toContainText('我们创造');

      // 測試英文
      await page.goto('/en');
      await page.waitForLoadState('networkidle');
      const h1EN = page.locator('h1').first();
      await expect(h1EN).toBeVisible();
      await expect(h1EN).toContainText('We Create');
    });
  });
});
