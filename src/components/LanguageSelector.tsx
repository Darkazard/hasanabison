'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

type Language = 'tr' | 'en' | 'ru' | 'de';

type RouteTranslations = {
  [key: string]: {
    [K in Exclude<Language, 'tr'>]: string;
  };
};

type RouteMappings = {
  [K in Language]: {
    [key: string]: {
      [L in Exclude<Language, K>]: string;
    };
  };
};

const flags = {
  tr: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="#E30A17"/>
      <circle cx="425" cy="400" r="200" fill="#ffffff"/>
      <circle cx="475" cy="400" r="160" fill="#E30A17"/>
      <polygon points="583.334,400 764.235,458.779 652.431,304.894 652.431,495.106 764.235,341.221" fill="#ffffff"/>
    </svg>
  ),
  en: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  ),
  de: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
      <rect width="5" height="3" y="0" fill="#000"/>
      <rect width="5" height="2" y="1" fill="#DD0000"/>
      <rect width="5" height="1" y="2" fill="#FFCE00"/>
    </svg>
  ),
  ru: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6">
      <rect fill="#fff" width="9" height="3"/>
      <rect fill="#0039A6" y="3" width="9" height="3"/>
      <rect fill="#D52B1E" y="2" width="9" height="2"/>
    </svg>
  )
};

const languages = [
  { code: 'tr', name: 'Türkçe' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' }
];

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className = '' }: LanguageSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    
    // Get the current path segments
    const segments = pathname.split('/').filter(Boolean);
    
    // If we're on the root path, just change the language
    if (segments.length === 0) {
      const homeRoutes: { [key in Language]: string } = {
        tr: '/anasayfa',
        en: '/en/home',
        ru: '/ru/glavnaya',
        de: '/de/startseite'
      };
      router.push(homeRoutes[lang]);
      return;
    }

    // If the first segment is a language code, remove it
    if (segments[0] === 'en' || segments[0] === 'ru' || segments[0] === 'de') {
      segments.shift();
    }

    // Get the current route in the source language
    const currentRoute = segments[0];

    // Define route mappings for each language combination
    const routeMappings: RouteMappings = {
      tr: {
        anasayfa: { en: 'home', ru: 'glavnaya', de: 'startseite' },
        rezervasyon: { en: 'reservation', ru: 'rezervatsiya', de: 'reservierung' },
        arabalar: { en: 'cars', ru: 'avtomobili', de: 'autos' },
        transferler: { en: 'transfers', ru: 'transfery', de: 'transfers' },
        galeri: { en: 'gallery', ru: 'galereya', de: 'galerie' },
        hakkimizda: { en: 'about', ru: 'o-nas', de: 'uber-uns' },
        yorumlar: { en: 'reviews', ru: 'otzyvy', de: 'bewertungen' },
        iletisim: { en: 'contact', ru: 'kontakty', de: 'kontakt' }
      },
      en: {
        home: { tr: 'anasayfa', ru: 'glavnaya', de: 'startseite' },
        reservation: { tr: 'rezervasyon', ru: 'rezervatsiya', de: 'reservierung' },
        cars: { tr: 'arabalar', ru: 'avtomobili', de: 'autos' },
        transfers: { tr: 'transferler', ru: 'transfery', de: 'transfers' },
        gallery: { tr: 'galeri', ru: 'galereya', de: 'galerie' },
        about: { tr: 'hakkimizda', ru: 'o-nas', de: 'uber-uns' },
        reviews: { tr: 'yorumlar', ru: 'otzyvy', de: 'bewertungen' },
        contact: { tr: 'iletisim', ru: 'kontakty', de: 'kontakt' }
      },
      ru: {
        glavnaya: { tr: 'anasayfa', en: 'home', de: 'startseite' },
        rezervatsiya: { tr: 'rezervasyon', en: 'reservation', de: 'reservierung' },
        avtomobili: { tr: 'arabalar', en: 'cars', de: 'autos' },
        transfery: { tr: 'transferler', en: 'transfers', de: 'transfers' },
        galereya: { tr: 'galeri', en: 'gallery', de: 'galerie' },
        'o-nas': { tr: 'hakkimizda', en: 'about', de: 'uber-uns' },
        otzyvy: { tr: 'yorumlar', en: 'reviews', de: 'bewertungen' },
        kontakty: { tr: 'iletisim', en: 'contact', de: 'kontakt' }
      },
      de: {
        startseite: { tr: 'anasayfa', en: 'home', ru: 'glavnaya' },
        reservierung: { tr: 'rezervasyon', en: 'reservation', ru: 'rezervatsiya' },
        autos: { tr: 'arabalar', en: 'cars', ru: 'avtomobili' },
        transfers: { tr: 'transferler', en: 'transfers', ru: 'transfery' },
        galerie: { tr: 'galeri', en: 'gallery', ru: 'galereya' },
        'uber-uns': { tr: 'hakkimizda', en: 'about', ru: 'o-nas' },
        bewertungen: { tr: 'yorumlar', en: 'reviews', ru: 'otzyvy' },
        kontakt: { tr: 'iletisim', en: 'contact', ru: 'kontakty' }
      }
    };

    // Get the mapped route based on current language and target language
    let mappedRoute = currentRoute;
    const currentLanguageRoutes = routeMappings[language as Language];
    if (currentLanguageRoutes && currentLanguageRoutes[currentRoute]) {
      mappedRoute = currentLanguageRoutes[currentRoute][lang as Exclude<Language, typeof language>] || currentRoute;
    }
    
    // Construct the new path
    const newPath = lang === 'tr' 
      ? `/${mappedRoute}`
      : `/${lang}/${mappedRoute}`;
    
    router.push(newPath);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code as Language)}
          className={`w-8 h-5 transition-opacity rounded overflow-hidden ${
            language === lang.code ? 'opacity-100 ring-2 ring-red-500' : 'opacity-70 hover:opacity-100'
          }`}
          title={lang.name}
        >
          {flags[lang.code as Language]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector; 