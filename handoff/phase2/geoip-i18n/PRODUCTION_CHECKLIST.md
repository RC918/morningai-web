# Production上線檢查清單

## 🚀 發版流程

### 1. 代碼合併
- [ ] 合併PR至main分支
- [ ] 建立Tag: `v2.1.0-geoip-i18n`
- [ ] 確認所有CI檢查通過
  - [ ] build ✅
  - [ ] unit tests ✅
  - [ ] e2e-en ✅
  - [ ] e2e-smoke-i18n ✅

### 2. 部署發佈
- [ ] Vercel Production發佈
- [ ] 清理CDN/edge cache
- [ ] 確認部署狀態為成功

## ✅ 上線後驗證 (必跑)

### 1. GeoIP功能驗證

#### Header模擬測試
```bash
# 台灣用戶 → 繁體中文
curl -H "x-vercel-ip-country: TW" https://app.morningai.me/
# 預期: 302重導向到 /zh-TW

# 中國用戶 → 簡體中文  
curl -H "x-vercel-ip-country: CN" https://app.morningai.me/
# 預期: 302重導向到 /zh-CN

# 美國用戶 → 英文
curl -H "x-vercel-ip-country: US" https://app.morningai.me/
# 預期: 302重導向到 /en
```

#### 瀏覽器測試
- [ ] 訪問根路徑 `/` 確認自動重導向
- [ ] 檢查重導向目標語言正確
- [ ] 確認頁面內容語言匹配

### 2. Cookie持久化測試

#### 手動語言切換
- [ ] 在 `/` 手動切換到不同語言
- [ ] 重新訪問 `/` 確認保持選擇
- [ ] 檢查cookie設置正確 (`lang=選擇的語言`)
- [ ] 確認cookie有效期為1年

#### 測試步驟
1. 清除所有cookie
2. 訪問 `/` (應自動重導向)
3. 手動切換語言 (如: en → zh-TW)
4. 重新訪問 `/` 
5. 確認停留在手動選擇的語言

### 3. SEO結構檢查

#### hreflang標籤
- [ ] 檢查 `<link rel="alternate" hreflang>` 標籤
- [ ] 確認包含所有語言版本 (en, zh-TW, zh-CN)
- [ ] 確認 x-default 指向英文版本

```html
<!-- 預期輸出 -->
<link rel="alternate" hreflang="en" href="https://app.morningai.me/en" />
<link rel="alternate" hreflang="zh-TW" href="https://app.morningai.me/zh-TW" />
<link rel="alternate" hreflang="zh-CN" href="https://app.morningai.me/zh-CN" />
<link rel="alternate" hreflang="x-default" href="https://app.morningai.me/en" />
```

#### Sitemap檢查
- [ ] 訪問 `/sitemap.xml`
- [ ] 確認包含三語言路徑
- [ ] 檢查URL格式正確

### 4. Analytics數據確認

#### GA4設置檢查
- [ ] 確認GA追蹤代碼載入
- [ ] 檢查語言維度 (custom_dimension_1) 設置
- [ ] 30分鐘內確認有數據流入

#### 事件追蹤測試
- [ ] 頁面瀏覽事件包含語言維度
- [ ] 語言切換事件正確觸發
- [ ] 事件參數包含正確的語言代碼

## 📊 監控設置

### 1. 7日監控啟動

#### 關鍵指標
- [ ] **PV (頁面瀏覽量)**: 按語言分組
- [ ] **跳出率**: 各語言版本對比
- [ ] **轉換率**: 語言對轉換影響
- [ ] **語言分佈**: 用戶語言偏好分析

#### 異常閾值
- [ ] 設置告警: 相較上週 ±15% 觸發
- [ ] 配置通知渠道
- [ ] 建立監控儀表板

### 2. 自動化測試

#### Playwright定時任務
- [ ] **每日一次**: e2e-en 完整測試套件
- [ ] **每次發版**: e2e-smoke-i18n 煙霧測試
- [ ] 測試失敗自動告警

#### 監控腳本
```bash
# 每小時檢查重導向功能
*/60 * * * * curl -s -o /dev/null -w "%{http_code}" -H "x-vercel-ip-country: TW" https://app.morningai.me/
```

## 🔧 故障排除

### 常見問題

#### 1. 重導向不生效
**症狀**: 訪問 `/` 沒有重導向
**檢查**:
- [ ] 確認middleware部署成功
- [ ] 檢查Edge Function日誌
- [ ] 驗證GeoIP header存在

#### 2. Cookie不持久
**症狀**: 手動切換後重新訪問又變回自動檢測
**檢查**:
- [ ] 確認cookie設置正確
- [ ] 檢查cookie路徑和域名
- [ ] 驗證有效期設置

#### 3. SEO標籤缺失
**症狀**: hreflang標籤不顯示
**檢查**:
- [ ] 確認generateMetadata函數正確
- [ ] 檢查各語言頁面metadata
- [ ] 驗證URL生成邏輯

### 回退預案

#### 提示模式切換
如果自動引導導致跳出率顯著上升：

```typescript
// 環境變數控制
const ENABLE_AUTO_REDIRECT = process.env.ENABLE_AUTO_REDIRECT !== 'false';

if (!ENABLE_AUTO_REDIRECT) {
  // 切換為提示模式，不自動重導向
  return showLanguageSuggestion(suggestedLocale);
}
```

#### 版本回退
必要時回退至v2.0.x：
- [ ] 回退代碼到穩定版本
- [ ] 保留語言cookie行為
- [ ] 維持手動語言切換功能

## 📋 完成確認

### 驗證完成清單
- [ ] GeoIP重導向功能正常
- [ ] Cookie持久化生效
- [ ] SEO標籤完整
- [ ] Analytics數據流入
- [ ] 監控告警設置
- [ ] 自動化測試運行

### 簽核流程
- [ ] 技術負責人驗證完成
- [ ] 產品負責人確認功能
- [ ] 24小時監控數據正常
- [ ] **最終簽核完畢** ✅

## 📞 聯絡資訊

### 緊急聯絡
- **技術負責人**: Development Team
- **產品負責人**: Product Owner  
- **運維支援**: DevOps Team

### 監控連結
- **GA4儀表板**: [Analytics Dashboard]
- **Vercel部署**: [Deployment Dashboard]
- **錯誤監控**: [Error Tracking]

---

**檢查清單版本**: v2.1.0  
**建立日期**: 2025年9月4日  
**最後更新**: 2025年9月4日

