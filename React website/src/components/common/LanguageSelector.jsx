import { useState, useEffect } from 'react';

const translations = {
  en: {
    name: 'English',
    flag: '🇬🇧',
    header: {
      home: 'Home',
      products: 'Products',
      industries: 'Industries',
      solutions: 'Solutions',
      services: 'Services',
      resources: 'Resources',
      company: 'Company',
      getQuote: 'Get Quote',
    }
  },
  hi: {
    name: 'हिन्दी',
    flag: '🇮🇳',
    header: {
      home: 'होम',
      products: 'उत्पाद',
      industries: 'उद्योग',
      solutions: 'समाधान',
      services: 'सेवाएं',
      resources: 'संसाधन',
      company: 'कंपनी',
      getQuote: 'कोटेशन प्राप्त करें',
    }
  },
  ar: {
    name: 'العربية',
    flag: '🇦🇪',
    header: {
      home: 'الرئيسية',
      products: 'المنتجات',
      industries: 'الصناعات',
      solutions: 'الحلول',
      services: 'الخدمات',
      resources: 'الموارد',
      company: 'الشركة',
      getQuote: 'احصل على عرض أسعار',
    }
  },
  ko: {
    name: '한국어',
    flag: '🇰🇷',
    header: {
      home: '홈',
      products: '제품',
      industries: '산업',
      solutions: '솔루션',
      services: '서비스',
      resources: '리소스',
      company: '회사',
      getQuote: '견적 요청',
    }
  },
  zh: {
    name: '中文',
    flag: '🇨🇳',
    header: {
      home: '首页',
      products: '产品',
      industries: '行业',
      solutions: '解决方案',
      services: '服务',
      resources: '资源',
      company: '公司',
      getQuote: '获取报价',
    }
  },
  ru: {
    name: 'Русский',
    flag: '🇷🇺',
    header: {
      home: 'Главная',
      products: 'Продукты',
      industries: 'Отрасли',
      solutions: 'Решения',
      services: 'Услуги',
      resources: 'Ресурсы',
      company: 'Компания',
      getQuote: 'Получить расчет',
    }
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪',
    header: {
      home: 'Startseite',
      products: 'Produkte',
      industries: 'Branchen',
      solutions: 'Lösungen',
      services: 'Dienstleistungen',
      resources: 'Ressourcen',
      company: 'Unternehmen',
      getQuote: 'Angebot anfordern',
    }
  }
};

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLang(savedLang);
    document.documentElement.lang = savedLang;
    if (savedLang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, []);

  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Set RTL direction for Arabic
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    
    setIsOpen(false);
    window.location.reload(); // Reload to apply translations
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors p-2"
        aria-label="Change Language"
      >
        <i className="fas fa-globe text-xl"></i>
        <span className="text-sm font-medium hidden xl:inline">{translations[currentLang].flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border-2 border-primary-500 z-50 animate-slide-down max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-secondary-500 font-semibold uppercase tracking-wide px-4 py-2 border-b border-secondary-200">
              Select Language
            </div>
            {Object.entries(translations).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentLang === code
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'hover:bg-secondary-50 text-secondary-700'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.name}</span>
                {currentLang === code && (
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
