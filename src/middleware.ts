/**
 * 位置: src/middleware.ts
 * 用途: 国际化路由中间件
 */

import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // 默认语言不显示前缀
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Return 404 for likely static files that didn't match public assets
  // This prevents them from hitting the App Router [locale] catch-all and causing "static to dynamic" errors
  if (/\.(php|bak|env|sql|json|html|png|js|txt|xml|map|css|ico)$/i.test(pathname)) {
    return new NextResponse(null, { status: 404 });
  }
  
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except api, _next, _vercel
  // We include files (.*\\..*) in the matcher so we can intercept 404s for them in middleware
  matcher: ['/((?!api|_next|_vercel).*)'],
};
