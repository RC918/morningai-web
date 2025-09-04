# 語言協商策略文檔

## 🌍 概述

本文檔描述了Morning AI多語言SaaS平台的語言協商策略，包括GeoIP智能引導、用戶選擇優先和SEO優化等核心機制。

## 🎯 協商順序

語言選擇按以下優先級順序進行：

1. **Cookie** (`lang`) - 用戶手動選擇的語言
2. **Pathname** - URL路徑中的語言段 (`/en`, `/zh-TW`, `/zh-CN`)
3. **GeoIP** - 基於用戶地理位置的智能推薦
4. **Accept-Language** - 瀏覽器語言偏好
5. **Default** - 預設語言 (`en`)

## 🗺️ 國別對應表

### GeoIP映射規則

| 國別代碼 | 語言 | 說明 |
|---------|------|------|
| TW | zh-TW | 台灣 → 繁體中文 |
| HK | zh-TW | 香港 → 繁體中文 |
| CN | zh-CN | 中國 → 簡體中文 |
| 其他 | en | 其他國家 → 英文 |

### 數據來源優先級

1. `x-vercel-ip-country` (Vercel Edge)
2. `cf-ipcountry` (Cloudflare)
3. `Accept-Language` header (回退方案)

## 🍪 Cookie規則

### 語言Cookie (`lang`)

- **名稱**: `lang`
- **有效期**: 1年 (365天)
- **路徑**: `/` (全站有效)
- **設置時機**: 
  - GeoIP自動引導時
  - 用戶手動切換語言時
- **優先級**: 最高 (覆蓋所有其他檢測)

### Cookie設置範例

```typescript
// 自動設置 (GeoIP)
res.cookies.set('lang', locale, { 
  maxAge: 365 * 24 * 60 * 60, 
  path: '/' 
});

// 手動設置 (用戶切換)
document.cookie = `lang=${value}; Max-Age=${ONE_YEAR}; Path=/`;
```

## 🔄 重導向邏輯

### 觸發條件

重導向**僅在**以下條件**全部滿足**時觸發：

1. ✅ 訪問根路徑 (`/`)
2. ✅ 非Bot/爬蟲用戶
3. ✅ 無語言Cookie
4. ✅ 路徑中無語言段

### 重導向行為

```typescript
// 重導向目標
TW/HK → /zh-TW
CN    → /zh-CN  
其他   → /en

// HTTP狀態碼: 302 (臨時重導向)
// 同時設置語言Cookie
```

### 不重導向情況

- ✅ Bot/爬蟲訪問 (保護SEO)
- ✅ 已有語言Cookie
- ✅ 直接訪問語言路徑 (`/en`, `/zh-TW`, `/zh-CN`)
- ✅ 非根路徑訪問

## 🤖 SEO保護

### Bot檢測

```typescript
import { userAgent } from 'next/server';

const ua = userAgent(request);
if (ua.isBot) {
  // 直接放行，不重導向
  return null;
}
```

### hreflang標籤

```html
<link rel="alternate" hreflang="en" href="https://app.morningai.me/en" />
<link rel="alternate" hreflang="zh-TW" href="https://app.morningai.me/zh-TW" />
<link rel="alternate" hreflang="zh-CN" href="https://app.morningai.me/zh-CN" />
<link rel="alternate" hreflang="x-default" href="https://app.morningai.me/en" />
```

### Sitemap結構

```xml
<!-- 每個頁面包含三語言版本 -->
<url>
  <loc>https://app.morningai.me/en</loc>
  <lastmod>2025-09-04</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://app.morningai.me/zh-TW</loc>
  <lastmod>2025-09-04</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://app.morningai.me/zh-CN</loc>
  <lastmod>2025-09-04</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
```

## 🧪 測試腳本

### E2E測試策略

#### 完整測試套件 (英文)
- 路徑: `tests/e2e/hero.spec.ts`
- 覆蓋: 內容驗證、功能測試、可訪問性、性能

#### 煙霧測試 (中文)
- 路徑: `tests/e2e/geoip-redirect.spec.ts`
- 覆蓋: 頁面載入、主要元素、語言切換

### GeoIP測試範例

```typescript
// 模擬台灣用戶
test('TW country code redirects to zh-TW', async ({ page, context }) => {
  await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'TW' });
  await page.goto('/');
  await expect(page).toHaveURL(/\/zh-TW(\/|$)/);
});

// 模擬中國用戶
test('CN country code redirects to zh-CN', async ({ page, context }) => {
  await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'CN' });
  await page.goto('/');
  await expect(page).toHaveURL(/\/zh-CN(\/|$)/);
});

// 測試Cookie持久化
test('Manual language override persists', async ({ page, context }) => {
  await context.setExtraHTTPHeaders({ 'x-vercel-ip-country': 'TW' });
  await page.goto('/');
  
  // 手動切換到英文
  await page.evaluate(() => {
    document.cookie = 'lang=en; Path=/; Max-Age=31536000';
  });
  
  await page.goto('/');
  await expect(page).toHaveURL(/\/en(\/|$)/);
});
```

## 📊 Analytics追蹤

### 語言維度設置

```typescript
// 頁面瀏覽追蹤
window.gtag('event', 'page_view', {
  page_location: url,
  language: locale,
  custom_dimension_1: locale, // 語言維度
});

// 語言切換追蹤
window.gtag('event', 'language_switch', {
  from_language: fromLocale,
  to_language: toLocale,
  custom_dimension_1: toLocale,
});
```

### 監控指標

- **語言分佈**: 各語言用戶比例
- **跳出率**: 按語言分組的跳出率
- **轉換率**: 各語言版本的轉換表現
- **切換行為**: 用戶語言切換頻率

## 🔧 技術實施

### Middleware架構

```typescript
// src/middleware.ts
export default clerkMiddleware((auth, req) => {
  // 1. GeoIP重導向處理
  const geoRedirect = handleGeoIPRedirect(req);
  if (geoRedirect) return geoRedirect;

  // 2. 認證保護
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  // 3. 正常處理
  return NextResponse.next();
});
```

### 配置文件

```typescript
// src/utils/AppConfig.ts
export const AppConfig = {
  defaultLocale: 'en',
  localePrefix: 'always', // 所有語言都有路徑前綴
  locales: [
    { id: 'en', name: 'English' },
    { id: 'zh-TW', name: '繁體中文' },
    { id: 'zh-CN', name: '简体中文' }
  ]
};
```

## 🔄 回退策略

### 提示模式

如果自動引導導致跳出率上升，可切換為「提示模式」：

```typescript
// 顯示語言建議，不自動重導向
function showLanguageSuggestion(suggestedLocale: string) {
  // 顯示語言切換提示橫幅
  // 用戶可選擇接受或忽略
}
```

### 版本回退

必要時可回退至v2.0.x：
- 保留語言Cookie行為
- 移除自動重導向邏輯
- 維持手動語言切換功能

## 📚 相關資源

### 文檔連結
- [Next.js國際化文檔](https://nextjs.org/docs/advanced-features/i18n)
- [next-intl文檔](https://next-intl-docs.vercel.app/)
- [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)

### 測試工具
- [Playwright測試框架](https://playwright.dev/)
- [語言切換測試腳本](./tests/e2e/geoip-redirect.spec.ts)
- [i18n期望值定義](./tests/i18n/hero.expectations.ts)

### 監控工具
- [Google Analytics 4](https://analytics.google.com/)
- [Vercel Analytics](https://vercel.com/analytics)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**文檔版本**: v2.1.0  
**最後更新**: 2025年9月4日  
**維護負責人**: Development Team

