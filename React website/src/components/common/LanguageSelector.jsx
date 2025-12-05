import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    // Ensure dropdown closes on outside navigation/interaction if needed later
    return () => {};
  }, []);

  const changeLanguage = (code) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors p-2"
        aria-label="Change Language"
      >
        <i className="fas fa-globe text-xl"></i>
        <span className="text-sm font-medium hidden xl:inline">{translations[lang].flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border-2 border-primary-500 z-50 animate-slide-down max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-secondary-500 font-semibold uppercase tracking-wide px-4 py-2 border-b border-secondary-200">
              Select Language
            </div>
            {Object.entries(translations).map(([code, langDef]) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  lang === code
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'hover:bg-secondary-50 text-secondary-700'
                }`}
              >
                <span className="text-2xl">{langDef.flag}</span>
                <span className="flex-1 text-left">{langDef.name}</span>
                {lang === code && (
                  <i className="fas fa-check text-primary-600"></i>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { translations };
