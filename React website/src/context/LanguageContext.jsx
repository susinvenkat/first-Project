import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations, defaultLang } from '../i18n/translations';

const LanguageContext = createContext({
  lang: defaultLang,
  setLang: () => {},
  t: (key) => key,
  dict: translations[defaultLang],
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const saved = localStorage.getItem('language') || defaultLang;
    setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', lang);
  }, [lang]);

  const dict = translations[lang] || translations[defaultLang];
  const defaultDict = translations[defaultLang];

  const t = useMemo(() => {
    return (path) => {
      const parts = path.split('.');
      let node = dict;
      for (const p of parts) {
        if (!node || typeof node !== 'object') {
          node = undefined;
          break;
        }
        node = node[p];
      }
      if (typeof node === 'string') return node;

      // Fallback to default language (English) when key missing
      let fallback = defaultDict;
      for (const p of parts) {
        if (!fallback || typeof fallback !== 'object') {
          fallback = undefined;
          break;
        }
        fallback = fallback[p];
      }
      return typeof fallback === 'string' ? fallback : path;
    };
  }, [dict, defaultDict]);

  const value = useMemo(() => ({ lang, setLang, t, dict }), [lang, t, dict]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}