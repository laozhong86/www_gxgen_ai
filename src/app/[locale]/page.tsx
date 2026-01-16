/**
 * 位置: src/app/[locale]/page.tsx
 * 用途: 首页 - 基于 code.html 落地页迁移
 */

import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { ChatSection } from '@/components/sections/ChatSection';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { TopBackdrop } from '@/components/sections/TopBackdrop';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      <TopBackdrop>
        <Header />
        <HeroSection />
      </TopBackdrop>
      <ChatSection />
      <Footer />
    </div>
  );
}
