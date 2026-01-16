'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');

  return (
    <nav className="fixed top-6 left-6 right-6 max-w-7xl mx-auto z-50 glass-deep rounded-full px-8 py-4 flex justify-between items-center transition-all duration-300">
      <Link 
        href="/" 
        className="text-white leading-none hover:opacity-80 transition-opacity"
        style={{ fontFamily: '"Righteous", sans-serif', fontSize: '24px' }}
      >
        Gxgen
      </Link>
      <div className="flex items-center gap-6">
        <LanguageSwitcher />
        <a
          href="https://app.gxgen.ai/auth/login"
          className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          {t('getStarted')}
        </a>
      </div>
    </nav>
  );
}
