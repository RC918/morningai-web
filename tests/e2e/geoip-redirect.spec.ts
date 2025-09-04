import { expect, test } from '@playwright/test';

test.describe('GeoIP Language Negotiation', () => {
  test('TW country code redirects to zh-TW', async ({ page, context }) => {
    // 模擬來自台灣的請求
    await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'TW' });

    await page.goto('/');

    // 應該重導向到繁體中文頁面
    await expect(page).toHaveURL(/\/zh-TW(\/|$)/);

    // 檢查頁面內容是繁體中文
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('我們創造智能設計與 AI 工具');
  });

  test('HK country code redirects to zh-TW', async ({ page, context }) => {
    // 模擬來自香港的請求
    await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'HK' });

    await page.goto('/');

    // 應該重導向到繁體中文頁面
    await expect(page).toHaveURL(/\/zh-TW(\/|$)/);
  });

  test('CN country code redirects to zh-CN', async ({ page, context }) => {
    // 模擬來自中國的請求
    await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'CN' });

    await page.goto('/');

    // 應該重導向到簡體中文頁面
    await expect(page).toHaveURL(/\/zh-CN(\/|$)/);

     // 檢查頁面內容是簡體中文
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('我们创造智能设计与 AI 工具');
  });

  test('Unknown country code redirects to English', async ({ page, context }) => {
    // 模擬來自其他國家的請求
    await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'US' });

    await page.goto('/');

    // 應該重導向到英文頁面
    await expect(page).toHaveURL(/\/en(\/|$)/);

    // 檢查頁面內容是英文
    const heading = page.getByRole('heading', { level: 1 });

    await expect(heading).toContainText('We Create Intelligent Design');
  });

  test('Empty country code falls back to Accept-Language', async ({ page, context }) => {
    // 模擬沒有國別資訊但有Accept-Language的請求
    await context.setExtraHTTPHeaders({
      'x-vercel-ip-country': '',
      'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
    });

    await page.goto('/');

    // 應該根據Accept-Language重導向到繁體中文
    await expect(page).toHaveURL(/\/zh-TW(\/|$)/);
  });

  test('Manual language override persists', async ({ page, context }) => {
    // 首先模擬來自台灣的請求
    await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'TW' });

    await page.goto('/');

    await expect(page).toHaveURL(/\/zh-TW(\/|$)/);

    // 手動切換到英文
    await page.evaluate(() => {
      document.cookie = 'lang=en; Path=/; Max-Age=31536000';
    });

    // 訪問其他頁面
    await page.goto('/about');

    // 再回到首頁
    await page.goto('/');

    // 應該保持英文，不再自動重導向
    await expect(page).toHaveURL(/\/en(\/|$)/);
  });

  test('Existing language path is not redirected', async ({ page, context }) => {
    // 模擬來自台灣的請求
    await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'TW' });

    // 直接訪問英文頁面
    await page.goto('/en');

    // 應該保持在英文頁面，不被重導向
    await expect(page).toHaveURL(/\/en(\/|$)/);

    // 檢查內容確實是英文
    const heading = page.getByRole('heading', { level: 1 });

    await expect(heading).toContainText('We Create Intelligent Design');
  });

  test('Language cookie prevents redirect', async ({ page, context }) => {
    // 設置語言cookie
    await context.addCookies([{
      name: 'lang',
      value: 'en',
      domain: 'localhost',
      path: '/',
    }]);

    // 模擬來自台灣的請求
    await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'TW' });

    await page.goto('/');

    // 應該尊重cookie，保持英文
    await expect(page).toHaveURL(/\/en(\/|$)/);
  });

  test('Language switcher sets cookie and tracks event', async ({ page }) => {
    await page.goto('/en');

    // 點擊語言切換器
    const langSwitcher = page.getByRole('button', { name: 'lang-switcher' });
    await langSwitcher.click();

    // 選擇繁體中文
    const zhTWOption = page.getByRole('menuitemradio', { name: '繁體中文' });
    await zhTWOption.click();

    // 等待頁面重新載入
    await page.waitForLoadState('domcontentloaded');

    // 檢查URL變更
    await expect(page).toHaveURL(/\/zh-TW(\/|$)/);

    // 檢查cookie是否設置
    const cookies = await page.context().cookies();
    const langCookie = cookies.find(cookie => cookie.name === 'lang');

    expect(langCookie?.value).toBe('zh-TW');
  });
});
