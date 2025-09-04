export const locales = ['en', 'zh-TW', 'zh-CN'] as const;
export type Locale = typeof locales[number];

export const heroCopy: Record<Locale, { heading: RegExp; description?: RegExp }> = {
  'en': {
    heading: /We Create Intelligent Design.+AI Tools/i,
    description: /Build powerful applications.+comprehensive SaaS platform/i,
  },
  'zh-TW': {
    heading: /我們創造智能設計與\s*AI\s*工具/,
    description: /使用我們的綜合 SaaS 平台構建強大的應用程式/,
  },
  'zh-CN': {
    heading: /我们创造智能设计与\s*AI\s*工具/,
    description: /使用我们的综合 SaaS 平台构建强大的应用程序/,
  },
};

export const buttonCopy: Record<Locale, { cta: RegExp; demo: RegExp }> = {
  'en': {
    cta: /Start Building for Free/i,
    demo: /Watch Live Demo/i,
  },
  'zh-TW': {
    cta: /免費開始構建/,
    demo: /觀看現場演示/,
  },
  'zh-CN': {
    cta: /免费开始构建/,
    demo: /观看现场演示/,
  },
};
