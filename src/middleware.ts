import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
  userAgent,
} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, AppConfig } from './utils/AppConfig';

const LANG_COOKIE = 'lang';
const ONE_YEAR = 60 * 60 * 24 * 365;

function mapCountryToLocale(cc?: string): string {
  switch ((cc || '').toUpperCase()) {
    case 'TW':
    case 'HK':
      return 'zh-TW';
    case 'CN':
      return 'zh-CN';
    default:
      return AppConfig.defaultLocale;
  }
}

function handleGeoIPRedirect(request: NextRequest): NextResponse | null {
  const { nextUrl, headers, cookies } = request;
  const ua = userAgent(request);

  // 讓爬蟲/監測工具保持原路徑（避免 SEO 受影響）
  if (ua.isBot) {
    return null;
  }

  // 已有語言 cookie 或明確在語言路徑下 → 不變更
  const cookieLang = cookies.get(LANG_COOKIE)?.value;
  const pathLocale = nextUrl.pathname.split('/')[1];

  if (cookieLang && AllLocales.includes(cookieLang as any)) {
    return null;
  }
  if (pathLocale && AllLocales.includes(pathLocale as any)) {
    return null;
  }

  // 只在根路徑時進行地理位置檢測
  if (nextUrl.pathname !== '/') {
    return null;
  }

  // 取得國別（優先 Vercel/Cloudflare，否則 Accept-Language）
  const cc
    = headers.get('x-vercel-ip-country')
    || headers.get('cf-ipcountry')
    || undefined;

  let locale: string;
  if (cc) {
    locale = mapCountryToLocale(cc);
  } else {
    // 退而求其次：Accept-Language
    const al = headers.get('accept-language') || '';
    if (/zh-TW|zh-Hant/i.test(al)) {
      locale = 'zh-TW';
    } else if (/zh-CN|zh-Hans|zh/i.test(al)) {
      locale = 'zh-CN';
    } else {
      locale = AppConfig.defaultLocale;
    }
  }

  // 302 導向到對應語言
  const url = nextUrl.clone();
  url.pathname = locale === 'en' ? '/en' : `/${locale}`;
  const res = NextResponse.redirect(url, { status: 302 });
  res.cookies.set(LANG_COOKIE, locale, { maxAge: ONE_YEAR, path: '/' });
  return res;
}

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/:locale/dashboard(.*)',
  '/onboarding(.*)',
  '/:locale/onboarding(.*)',
  '/api/(.*)',
  '/:locale/api/(.*)',
]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // 排除健康檢查和版本 API
  if (
    request.nextUrl.pathname === '/api/health'
    || request.nextUrl.pathname === '/api/version'
  ) {
    return NextResponse.next();
  }

  // 首先檢查是否需要進行地理位置重導向
  const geoRedirect = handleGeoIPRedirect(request);
  if (geoRedirect) {
    return geoRedirect;
  }

  if (
    request.nextUrl.pathname.includes('/sign-in')
    || request.nextUrl.pathname.includes('/sign-up')
    || isProtectedRoute(request)
  ) {
    return clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        const locale
          = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        await auth.protect({
          // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
          unauthenticatedUrl: signInUrl.toString(),
        });
      }

      const authObj = await auth();

      if (
        authObj.userId
        && !authObj.orgId
        && req.nextUrl.pathname.includes('/dashboard')
        && !req.nextUrl.pathname.endsWith('/organization-selection')
      ) {
        const orgSelection = new URL(
          '/onboarding/organization-selection',
          req.url,
        );

        return NextResponse.redirect(orgSelection);
      }

      return intlMiddleware(req);
    })(request, event);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'], // Also exclude tunnelRoute used in Sentry from the matcher
};
