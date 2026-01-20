/**
 * 位置: src/app/[locale]/layout.tsx
 * 用途: 国际化根布局
 */

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Noto_Serif_SC, Albert_Sans } from 'next/font/google';
import { locales, type Locale } from '@/i18n/config';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// 品牌标题字体 - 思源宋体 (中文使用)
const notoSerifSC = Noto_Serif_SC({
  variable: '--font-noto-serif-sc',
  subsets: ['latin'], // 注意：Google Fonts 的 Noto Serif SC 在 subsets 仅包含 latin，中文字符是按需加载的
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
  preload: false, // 禁用预加载，防止构建时下载失败
  fallback: ['serif'], // 网络问题时回退到系统字体
});

// 英文品牌字体 - Albert Sans (参考 pippit.ai)
const albertSans = Albert_Sans({
  variable: '--font-albert-sans',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params; // 验证 params promise
  const messages = await getMessages();
  const metadata = messages.metadata as Record<string, string>;

  return {
    title: metadata?.title || 'GxgenAI',
    description: metadata?.description || 'AI Matrix Marketing OS',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/favicon.png',
    },
    other: {
      // 性能优化：禁用电话号码自动识别
      'format-detection': 'telephone=no',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // 验证 locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 启用静态渲染
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        {/* DNS 预连接加速 Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* 预加载关键 CSS */}
        <link rel="preload" href="/fonts/Righteous-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifSC.variable} ${albertSans.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
