import { expect, test } from '@playwright/test';

import { TEST_STRATEGY } from '../config/test-strategy';

// 英文完整測試套件 - Pricing區塊
for (const locale of TEST_STRATEGY.FULL_SUITE_LOCALES) {
  test.describe(`Pricing section - Full Suite (${locale})`, () => {
    test(`renders pricing plans correctly for ${locale}`, async ({ page }) => {
      const url = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      // 檢查Pricing區塊標題
      const pricingTitle = page.getByText(/Simple.*Transparent.*Pricing/i);

      await expect(pricingTitle).toBeVisible();

      // 檢查三個定價方案
      const starterPlan = page.getByText(/Starter/i);
      const professionalPlan = page.getByText(/Professional/i);
      const enterprisePlan = page.getByText(/Enterprise/i);

      await expect(starterPlan).toBeVisible();
      await expect(professionalPlan).toBeVisible();
      await expect(enterprisePlan).toBeVisible();

      // 檢查價格顯示
      const freePrice = page.getByText('$0');
      const proPrice = page.getByText('$79');
      const enterprisePrice = page.getByText('$199');

      await expect(freePrice).toBeVisible();
      await expect(proPrice).toBeVisible();
      await expect(enterprisePrice).toBeVisible();
    });

    test(`pricing buttons are functional for ${locale}`, async ({ page }) => {
      const url = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      // 檢查所有"Start Free Trial"按鈕
      const pricingButtons = page.getByRole('link', { name: /Start Free Trial/i });
      const buttonCount = await pricingButtons.count();

      expect(buttonCount).toBe(3); // 應該有三個定價方案按鈕

      // 檢查每個按鈕都可見且有href屬性
      for (let i = 0; i < buttonCount; i++) {
        const button = pricingButtons.nth(i);

        await expect(button).toBeVisible();
        await expect(button).toHaveAttribute('href');
      }
    });

    test(`pricing features are displayed for ${locale}`, async ({ page }) => {
      const url = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      // 檢查功能列表項目
      const teamMembers = page.getByText(/Team Members/i);
      const websites = page.getByText(/Websites/i);
      const storage = page.getByText(/Storage/i);
      const transfer = page.getByText(/Transfer/i);
      const emailSupport = page.getByText(/Email Support/i);

      await expect(teamMembers).toBeVisible();
      await expect(websites).toBeVisible();
      await expect(storage).toBeVisible();
      await expect(transfer).toBeVisible();
      await expect(emailSupport).toBeVisible();
    });

    test(`pricing section accessibility for ${locale}`, async ({ page }) => {
      const url = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      // 檢查定價卡片的結構
      const pricingCards = page.locator('[class*="pricing"], [data-testid*="pricing"]').or(
        page.locator('div').filter({ hasText: /\$\d+/ }),
      );

      // 至少應該有三個定價卡片
      const cardCount = await pricingCards.count();

      expect(cardCount).toBeGreaterThanOrEqual(3);

      // 檢查按鈕的可訪問性
      const buttons = page.getByRole('link', { name: /Start Free Trial/i });
      const buttonCount = await buttons.count();

      expect(buttonCount).toBe(3);
    });
  });
}
