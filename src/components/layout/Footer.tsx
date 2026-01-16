import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="bg-[#0b0b0b] pt-20 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm text-white/40 mb-20">
        <div className="md:col-span-2">
          <div 
            className="text-white text-xl mb-6"
            style={{ fontFamily: '"Righteous", sans-serif' }}
          >
            Gxgen
          </div>
          <p className="max-w-xs leading-relaxed">{t('tagline')}</p>
        </div>
        <div>
          <h6 className="text-white font-bold mb-6">{t('explore')}</h6>
          <ul className="space-y-4">
            <li>
              <Link href="/solutions" className="hover:text-primary transition-colors">
                {t('solutions')}
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-primary transition-colors">
                {t('capabilities')}
              </Link>
            </li>
            <li>
              <Link href="/cases" className="hover:text-primary transition-colors">
                {t('cases')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-white font-bold mb-6">{t('connect')}</h6>
          <ul className="space-y-4">
            <li>
              <a href="https://twitter.com" className="hover:text-primary transition-colors">
                Twitter (X)
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://discord.com" className="hover:text-primary transition-colors">
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/20 pt-8 border-t border-white/5">
        <p>{t('copyright')}</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="/privacy">{t('privacy')}</Link>
          <Link href="/terms">{t('terms')}</Link>
          <Link href="/security">{t('security')}</Link>
        </div>
      </div>
    </footer>
  );
}
