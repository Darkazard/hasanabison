'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'tr' | 'en' | 'ru' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Try to get language from localStorage
      const savedLanguage = localStorage.getItem('language') as Language;
      
      // Check URL path for language indicator
      const path = window.location.pathname;
      let urlLanguage: Language | null = null;
      
      if (path.startsWith('/en/')) {
        urlLanguage = 'en';
      } else if (path.startsWith('/ru/')) {
        urlLanguage = 'ru';
      } else if (path.startsWith('/de/')) {
        urlLanguage = 'de';
      }
      
      // Use URL language if available, otherwise use saved language or default to 'tr'
      const initialLanguage = urlLanguage || savedLanguage || 'tr';
      setLanguage(initialLanguage);
      setIsLoading(false);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 