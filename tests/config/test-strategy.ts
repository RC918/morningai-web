// 測試策略配置：英文完整測試套件，中文煙霧測試

export const TEST_STRATEGY = {
  // 英文：完整測試套件
  FULL_SUITE_LOCALES: ['en'] as const,

  // 中文：煙霧測試（基本功能驗證）
  SMOKE_TEST_LOCALES: ['zh-TW', 'zh-CN'] as const,

  // 所有支援的語言
  ALL_LOCALES: ['en', 'zh-TW', 'zh-CN'] as const,
} as const;

export type FullSuiteLocale = typeof TEST_STRATEGY.FULL_SUITE_LOCALES[number];
export type SmokeTestLocale = typeof TEST_STRATEGY.SMOKE_TEST_LOCALES[number];
export type AllLocale = typeof TEST_STRATEGY.ALL_LOCALES[number];

// 完整測試套件包含的測試類型
export const FULL_SUITE_TESTS = [
  'hero',
  'features',
  'pricing',
  'navigation',
  'footer',
  'cta',
  'faq',
  'seo',
  'accessibility',
] as const;

// 煙霧測試包含的基本測試類型
export const SMOKE_TESTS = [
  'hero',
  'navigation',
  'language-switching',
] as const;

export type FullSuiteTest = typeof FULL_SUITE_TESTS[number];
export type SmokeTest = typeof SMOKE_TESTS[number];
