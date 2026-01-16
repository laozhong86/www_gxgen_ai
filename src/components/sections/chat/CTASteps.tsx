import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function CTASteps() {
  const t = await getTranslations();

  return (
    <div className="pl-14">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Link
          href="https://app.gxgen.ai/auth/login"
          className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-black/20 text-center"
        >
          {t('nav.getStarted')}
        </Link>
      </div>
      <p className="text-sm text-gray-400">{t('cta.freeTrialNote')}</p>
      <p className="text-xs text-gray-300 mt-2">{t('cta.trustedBy')}</p>
    </div>
  );
}
