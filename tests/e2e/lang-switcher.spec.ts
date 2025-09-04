import { expect, test } from '@playwright/test';

test.describe('Language Switcher', () => {
  test('should switch between languages and persist navigation', async ({ page }) => {
    // 開始於繁體中文
    await page.goto('/zh-TW');
    await page.waitForLoadState('domcontentloaded');

    // 確認繁體中文內容
    await expect(page.getByText('我們創造智能設計與 AI 工具')).toBeVisible();

    // 點擊語言切換器
    await page.getByRole('button', { name: 'lang-switcher' }).click();

    // 切換到簡體中文
    await page.getByText('简体中文').click();
    await page.waitForLoadState('domcontentloaded');

    // 確認簡體中文內容
    await expect(page.getByText('我们创造智能设计与 AI 工具')).toBeVisible();
    await expect(page).toHaveURL(/\/zh-CN/);

    // 再切換到英文
    await page.getByRole('button', { name: 'lang-switcher' }).click();
    await page.getByText('English').click();
    await page.waitForLoadState('domcontentloaded');

    // 確認英文內容
    await expect(page.getByText('We Create Intelligent Design & AI Tools')).toBeVisible();
    await expect(page).toHaveURL(/\/en/);
  });

  test('should maintain language preference across page navigation', async ({ page }) => {
    // 設定為簡體中文
    await page.goto('/zh-CN');
    await page.waitForLoadState('domcontentloaded');

    // 導航到其他頁面
    await page.getByRole('link', { name: '产品' }).click();
    await page.waitForLoadState('domcontentloaded');

    // 回到首頁，應該保持簡體中文
    await page.getByRole('link', { name: 'Morning AI' }).click();
    await page.waitForLoadState('domcontentloaded');

    // 確認仍然是簡體中文
    await expect(page).toHaveURL(/\/zh-CN/);
    await expect(page.getByText('我们创造智能设计与 AI 工具')).toBeVisible();
  });
});
