import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/test';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('should take screenshot of the Traditional Chinese homepage', async ({ page }) => {
      await page.goto('/zh-TW');
      await page.waitForLoadState('networkidle');

      // 確保主要內容已載入
      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible();
      await expect(mainHeading).toContainText('AI');

      await percySnapshot(page, 'Homepage - Traditional Chinese');
    });

    test('should take screenshot of the Simplified Chinese homepage', async ({ page }) => {
      await page.goto('/zh-CN');
      await page.waitForLoadState('networkidle');

      // 確保主要內容已載入
      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible();
      await expect(mainHeading).toContainText('AI');

      await percySnapshot(page, 'Homepage - Simplified Chinese');
    });

    test('should take screenshot of the English homepage', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');

      // 確保主要內容已載入
      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible();
      await expect(mainHeading).toContainText('AI');

      await percySnapshot(page, 'Homepage - English');
    });
  });
});
