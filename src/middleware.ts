/**
 * 位置: src/middleware.ts
 * 用途: 国际化路由中间件
 */

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // 默认语言不显示前缀
});

export const config = {
  // 匹配所有路径，排除静态文件和 API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
