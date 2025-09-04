import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from Traditional Chinese to Simplified Chinese using dropdown and verify text on the homepage', async ({ page }) => {
      await page.goto('/zh-TW');

      await expect(page.getByText('我們創造智能設計與 AI 工具')).toBeVisible();

      await page.getByRole('button', { name: 'lang-switcher' }).click();
      await page.getByText('简体中文').click();

      await expect(page.getByText('我们创造智能设计与 AI 工具')).toBeVisible();
    });

    test('should switch language from Traditional Chinese to English using URL and verify text on the homepage', async ({ page }) => {
      await page.goto('/zh-TW');

      await expect(page.getByText('我們創造智能設計與 AI 工具')).toBeVisible();

      await page.goto('/en');

      await expect(page.getByText('We Create Intelligent Design & AI Tools')).toBeVisible();
    });
  });
});
