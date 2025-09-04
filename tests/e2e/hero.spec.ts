import { expect, test } from '@playwright/test';

import type { Locale } from '../i18n/hero.expectations';
import { buttonCopy, heroCopy, locales } from '../i18n/hero.expectations';

for (const locale of locales) {
  test.describe(`Hero section (${locale})`, () => {
    test(`renders correct copy for ${locale}`, async ({ page }) => {
      // 1) 走對語系路由
      const url = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(url);

      // 2) 等待頁面載入完成
      await page.waitForLoadState('domcontentloaded');

      // 3) 用語義選擇器定位Hero區塊的主標題
      const heroHeading = page.locator('h1').first();

      await expect(heroHeading).toBeVisible();

      // 4) 斷言對應語系文案（使用 RegExp 容忍輕微變更）
      const expected = heroCopy[locale as Locale];

      await expect(heroHeading).toHaveText(expected.heading);

      // 5) 檢查按鈕文字
      const buttons = buttonCopy[locale as Locale];

      // 檢查主要CTA按鈕
      const ctaButton = page.getByRole('link', { name: buttons.cta });

      await expect(ctaButton).toBeVisible();

      // 檢查Demo/聯絡按鈕
      const demoButton = page.getByRole('link', { name: buttons.demo });

      await expect(demoButton).toBeVisible();
    });
  });
}
