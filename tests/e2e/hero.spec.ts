import { expect, test } from '@playwright/test';

import { TEST_STRATEGY } from '../config/test-strategy';
import type { Locale } from '../i18n/hero.expectations';
import { buttonCopy, heroCopy } from '../i18n/hero.expectations';

// 英文完整測試套件
for (const locale of TEST_STRATEGY.FULL_SUITE_LOCALES) {
  test.describe(`Hero section - Full Suite (${locale})`, () => {
    test(`renders correct copy for ${locale}`, async ({ page }) => {
      const url = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      // 檢查主標題 - 使用更具體的選擇器
      const heroHeading = page.getByRole('heading', { level: 1 }).or(
        page.locator('h1').filter({ hasText: /Create.*AI.*Tools/i }),
      );

      await expect(heroHeading).toBeVisible({ timeout: 10000 });

      const expected = heroCopy[locale as Locale];

      await expect(heroHeading).toHaveText(expected.heading);

      // 檢查描述文字
      if (expected.description) {
        const heroDescription = page.locator('p').first();

        await expect(heroDescription).toHaveText(expected.description);
      }

      // 檢查按鈕文字
      const buttons = buttonCopy[locale as Locale];

      const ctaButton = page.getByRole('link', { name: buttons.cta });

      await expect(ctaButton).toBeVisible();

      const demoButton = page.getByRole('link', { name: buttons.demo });

      await expect(demoButton).toBeVisible();
    });

    test(`hero buttons are functional for ${locale}`, async ({ page }) => {
      const url = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      const buttons = buttonCopy[locale as Locale];

      // 測試CTA按鈕可點擊
      const ctaButton = page.getByRole('link', { name: buttons.cta });

      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toHaveAttribute('href');

      // 測試Demo按鈕可點擊
      const demoButton = page.getByRole('link', { name: buttons.demo });

      await expect(demoButton).toBeVisible();
      await expect(demoButton).toHaveAttribute('href');
    });

    test(`hero section accessibility for ${locale}`, async ({ page }) => {
      const url = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      // 檢查標題層級結構
      const h1 = page.getByRole('heading', { level: 1 });

      await expect(h1).toHaveCount(1); // 頁面應該只有一個 h1

      // 檢查按鈕的可訪問性
      const buttons = buttonCopy[locale as Locale];

      const ctaButton = page.getByRole('link', { name: buttons.cta });

      await expect(ctaButton).toBeVisible();

      const demoButton = page.getByRole('link', { name: buttons.demo });

      await expect(demoButton).toBeVisible();
    });
  });
}

// 中文煙霧測試（基本功能驗證）
for (const locale of TEST_STRATEGY.SMOKE_TEST_LOCALES) {
  test.describe(`Hero section - Smoke Test (${locale})`, () => {
    test(`basic functionality for ${locale}`, async ({ page }) => {
      const url = `/${locale}`;
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      // 基本檢查：頁面載入成功，主要元素存在
      const heroHeading = page.getByRole('heading', { level: 1 }).or(
        page.locator('h1').filter({ hasText: /創造.*AI.*工具/i }),
      );

      await expect(heroHeading).toBeVisible({ timeout: 10000 });

      const expected = heroCopy[locale as Locale];

      await expect(heroHeading).toHaveText(expected.heading);

      // 檢查主要按鈕存在且可見
      const buttons = buttonCopy[locale as Locale];

      const ctaButton = page.getByRole('link', { name: buttons.cta });

      await expect(ctaButton).toBeVisible();

      const demoButton = page.getByRole('link', { name: buttons.demo });

      await expect(demoButton).toBeVisible();
    });
  });
}
