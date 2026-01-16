/**
 * 位置: src/i18n/config.ts
 * 用途: 国际化配置 - 18 种语言支持
 */

export const locales = [
  'zh-CN',
  'zh-TW',
  'en-US',
  'ja-JP',
  'ko-KR',
  'de-DE',
  'fr-FR',
  'es-ES',
  'pt-BR',
  'it-IT',
  'ru-RU',
  'pl-PL',
  'tr-TR',
  'vi-VN',
  'th-TH',
  'id-ID',
  'ms-MY',
  'fil-PH',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-US';

// 语言显示名称
export const localeNames: Record<Locale, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'ko-KR': '한국어',
  'de-DE': 'Deutsch',
  'fr-FR': 'Français',
  'es-ES': 'Español',
  'pt-BR': 'Português',
  'it-IT': 'Italiano',
  'ru-RU': 'Русский',
  'pl-PL': 'Polski',
  'tr-TR': 'Türkçe',
  'vi-VN': 'Tiếng Việt',
  'th-TH': 'ไทย',
  'id-ID': 'Indonesia',
  'ms-MY': 'Melayu',
  'fil-PH': 'Filipino',
};

// 语言前缀映射（用于浏览器语言检测）
export const localePrefixMap: Record<string, Locale> = {
  zh: 'zh-CN',
  en: 'en-US',
  ja: 'ja-JP',
  ko: 'ko-KR',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  pt: 'pt-BR',
  it: 'it-IT',
  ru: 'ru-RU',
  pl: 'pl-PL',
  tr: 'tr-TR',
  vi: 'vi-VN',
  th: 'th-TH',
  id: 'id-ID',
  ms: 'ms-MY',
  fil: 'fil-PH',
  tl: 'fil-PH',
};
