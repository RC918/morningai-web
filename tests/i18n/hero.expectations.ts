export const locales = ['en', 'zh-TW', 'zh-CN'] as const;
export type Locale = typeof locales[number];

export const heroCopy: Record<Locale, { heading: RegExp; description?: RegExp }> = {
  en: {
    heading: /We Create Intelligent Design.+AI Tools/i,
    description: /intelligent solution platform|design system.+AI workflow/i,
  },
  'zh-TW': {
    heading: /我們創造智能設計與\s*AI\s*工具/,
    description: /一個智能解決方案平台|設計系統與 AI 工作流程/,
  },
  'zh-CN': {
    heading: /我们创造智能设计与\s*AI\s*工具/,
    description: /智能解决方案平台|设计系统与 AI 工作流程/,
  },
};

export const buttonCopy: Record<Locale, { cta: RegExp; demo: RegExp }> = {
  en: {
    cta: /Get Started|Start Now/i,
    demo: /Contact Us|Contact/i,
  },
  'zh-TW': {
    cta: /立即開始|開始使用/,
    demo: /聯絡客服|聯絡我們/,
  },
  'zh-CN': {
    cta: /立即开始|开始使用/,
    demo: /联系客服|联系我们/,
  },
};

