import { getTranslations, getLocale } from 'next-intl/server';

export async function HeroSection() {
  const t = await getTranslations('hero');
  const locale = await getLocale();
  const isEnglish = locale.startsWith('en');

  return (
    <header className="relative flex-1 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 
          className={`text-white mb-8 leading-[1.1] ${
            isEnglish 
              ? 'text-5xl md:text-7xl font-medium tracking-tighter' 
              : 'text-5xl md:text-7xl font-normal tracking-tight'
          }`}
          style={{ fontFamily: isEnglish ? 'var(--font-albert-sans), sans-serif' : 'var(--font-noto-serif-sc)' }}
        >
          {t('title')}
          <br />
          <span className={isEnglish ? "font-extrabold text-white" : "font-bold text-white"}>
            {t('titleHighlight')}
          </span>
        </h1>
        <div className="mx-auto mb-10 max-w-3xl">
          <p 
            className={`${
              isEnglish
                ? 'text-white/70 text-xl md:text-2xl font-light tracking-wide'
                : 'text-white/50 text-lg md:text-xl font-serif'
            }`}
            style={{ fontFamily: isEnglish ? 'var(--font-albert-sans), sans-serif' : undefined }}
          >
            {t('description')}
          </p>
          <p 
            className={`mt-3 ${
              isEnglish
                ? 'text-white/90 text-lg md:text-xl font-medium tracking-wide'
                : 'text-white/80 text-base md:text-lg font-medium'
            }`}
            style={{ fontFamily: isEnglish ? 'var(--font-albert-sans), sans-serif' : undefined }}
          >
            {t('descriptionLine2')}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <div className="w-10 h-16 border-2 border-white/30 bg-white/10 backdrop-blur-md rounded-full flex justify-center p-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </header>
  );
}
