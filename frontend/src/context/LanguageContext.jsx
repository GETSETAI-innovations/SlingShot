import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('esac_language') || 'EN';
  });

  const applyGoogleTranslate = (targetLang) => {
    const langCode = targetLang.toLowerCase(); // 'en' or 'hi'
    const cookieVal = `/en/${langCode}`;

    // Set cookie across root and domain
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`;
    if (window.location.hostname.includes('.')) {
      const rootDomain = window.location.hostname.split('.').slice(-2).join('.');
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${rootDomain};`;
    }

    // Trigger google translate select element
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const el = document.querySelector('.goog-te-combo');
        if (el) {
          el.value = langCode;
          el.dispatchEvent(new Event('change'));
          clearInterval(interval);
        } else if (attempts > 20) {
          clearInterval(interval);
        }
      }, 150);
    }

    document.documentElement.lang = langCode;
  };

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('esac_language', lang);
    applyGoogleTranslate(lang);
  };

  useEffect(() => {
    const saved = localStorage.getItem('esac_language') || 'EN';
    if (saved === 'HI') {
      applyGoogleTranslate('HI');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
