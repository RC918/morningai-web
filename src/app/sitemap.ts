import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@/utils/Helpers';

const locales = ['en', 'zh-TW', 'zh-CN'] as const;
const pages = ['', 'about'] as const; // 添加更多頁面路徑

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const urls: MetadataRoute.Sitemap = [];

  // 為每個語言和頁面生成URL
  for (const locale of locales) {
    for (const page of pages) {
      const path = page ? `/${page}` : '';
      const url = locale === 'en'
        ? `${baseUrl}/en${path}`
        : `${baseUrl}/${locale}${path}`;

      urls.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: page === '' ? 1.0 : 0.8, // 首頁優先級最高
        alternates: {
          languages: {
            'en': `${baseUrl}/en${path}`,
            'zh-TW': `${baseUrl}/zh-TW${path}`,
            'zh-CN': `${baseUrl}/zh-CN${path}`,
            'x-default': `${baseUrl}/en${path}`, // 英文作為預設
          },
        },
      });
    }
  }

  return urls;
}
