import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/test';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('should take screenshot of the Traditional Chinese homepage', async ({ page }) => {
      await page.goto('/zh-TW');

      await expect(page.getByText('我們創造智能設計與 AI 工具')).toBeVisible();

      await percySnapshot(page, 'Homepage - Traditional Chinese');
    });

    test('should take screenshot of the Simplified Chinese homepage', async ({ page }) => {
      await page.goto('/zh-CN');

      await expect(page.getByText('我们创造智能设计与 AI 工具')).toBeVisible();

      await percySnapshot(page, 'Homepage - Simplified Chinese');
    });

    test('should take screenshot of the English homepage', async ({ page }) => {
      await page.goto('/en');

      await expect(page.getByText('We Create Intelligent Design & AI Tools')).toBeVisible();

      await percySnapshot(page, 'Homepage - English');
    });
  });
});
