/**
 * 位置: src/i18n/navigation.ts
 * 用途: next-intl 导航工具（支持 locale 切换）
 */

import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
  });
