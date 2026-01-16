'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { useState, useEffect, useRef } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white/60 hover:text-white text-sm font-medium transition-colors"
      >
        <svg width="1em" height="1em" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="none" role="presentation" xmlns="http://www.w3.org/2000/svg" className="language-button-icon-x_azMl text-base" fontSize="16">
          <g>
            <path fillOpacity=".6" d="M13.333 8c0 .46-.058.907-.168 1.333h-1.942a8.047 8.047 0 0 0 0-2.666h1.942c.11.426.168.873.168 1.333ZM9.867 6.667a6.698 6.698 0 0 1 0 2.666H6.133a6.697 6.697 0 0 1 0-2.666h3.734Zm1.011-1.334h1.742a5.346 5.346 0 0 0-3.145-2.46 7.99 7.99 0 0 1 1.403 2.46Zm-4.353-2.46a5.346 5.346 0 0 0-3.145 2.46h1.742a7.99 7.99 0 0 1 1.403-2.46Zm.03 2.46A6.68 6.68 0 0 1 8 3.24a6.68 6.68 0 0 1 1.445 2.094h-2.89ZM4.777 6.667H2.835a5.343 5.343 0 0 0 0 2.666h1.942a8.055 8.055 0 0 1 0-2.666Zm.345 4H3.38a5.346 5.346 0 0 0 3.145 2.46 7.989 7.989 0 0 1-1.403-2.46Zm5.211 3.58A6.67 6.67 0 0 0 8 1.333a6.667 6.667 0 0 0-2.333 12.914c.656.245 1.36.39 2.096.416a6.885 6.885 0 0 0 .474 0 6.645 6.645 0 0 0 2.096-.416Zm-.858-1.12a7.991 7.991 0 0 0 1.403-2.46h1.742a5.346 5.346 0 0 1-3.145 2.46Zm-.03-2.46h-2.89c.345.79.838 1.5 1.445 2.094a6.682 6.682 0 0 0 1.445-2.094Z" clipRule="evenodd" fillRule="evenodd" data-follow-fill="#000" fill="currentColor"></path>
          </g>
        </svg>
        <span>{localeNames[locale]}</span>
      </button>
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 py-2 bg-card border border-border rounded-lg shadow-xl min-w-[140px] max-h-[480px] overflow-y-auto z-50"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors ${
                loc === locale ? 'text-primary font-medium' : 'text-foreground'
              }`}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
