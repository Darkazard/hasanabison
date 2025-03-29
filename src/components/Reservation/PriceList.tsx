'use client'

import { useState, useEffect, useRef, memo } from 'react'
import { usePathname } from 'next/navigation'
import { routes } from '@/data/routes'

interface PriceListProps {
  onRouteSelect: (from: string, to: string, price: number) => void;
}

// Çeviri nesnesi
const translations = {
  tr: {
    from: 'Nereden',
    to: 'Nereye',
    transferPriceList: 'Transfer Fiyat Listesi',
    clickForRoute: 'Güzergah seçimi için tıklayınız',
    oneWay: 'Tek Yön',
    roundTrip: 'Gidiş-Dönüş',
    discountInfo: '(Gidiş-Dönüş seçiminde $5 indirim)',
    saveText: 'Tasarruf:',
    promoText: 'Gidiş-Dönüş seçerek $5 tasarruf edin!'
  },
  en: {
    from: 'From',
    to: 'To',
    transferPriceList: 'Transfer Price List',
    clickForRoute: 'Click to select route',
    oneWay: 'One Way',
    roundTrip: 'Round Trip',
    discountInfo: '($5 discount for round trip)',
    saveText: 'Save:',
    promoText: 'Save $5 by choosing round trip!'
  },
  de: {
    from: 'Von',
    to: 'Nach',
    transferPriceList: 'Transfer Preisliste',
    clickForRoute: 'Klicken Sie, um Route auszuwählen',
    oneWay: 'Einfache Fahrt',
    roundTrip: 'Hin und Zurück',
    discountInfo: '($5 Rabatt für Hin und Zurück)',
    saveText: 'Sparen:',
    promoText: 'Sparen Sie $5 mit Hin und Zurück!'
  },
  ru: {
    from: 'Откуда',
    to: 'Куда',
    transferPriceList: 'Список Цен на Трансфер',
    clickForRoute: 'Нажмите для выбора маршрута',
    oneWay: 'В одну сторону',
    roundTrip: 'Туда и обратно',
    discountInfo: '($5 скидка на поездку туда и обратно)',
    saveText: 'Экономия:',
    promoText: 'Сэкономьте $5, выбрав поездку туда и обратно!'
  }
}

const PriceList = memo(function PriceList({ onRouteSelect }: PriceListProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const priceListRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const currentLang = pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }, 0);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (priceListRef.current) {
      observer.observe(priceListRef.current);
    }

    return () => {
      if (priceListRef.current) {
        observer.unobserve(priceListRef.current);
      }
    };
  }, [hasAnimated]);

  const handleRouteSelect = (from: string, to: string, price: number) => {
    onRouteSelect(from, to, tripType === 'roundTrip' ? (price * 2) - 5 : price);
  };

  return (
    <div ref={priceListRef} className="mt-8">
      <h3 className="text-2xl font-semibold text-center mb-3">{translations[currentLang].transferPriceList}</h3>
      <p className="text-center text-green-500 font-medium text-sm md:text-base mb-4">{translations[currentLang].promoText}</p>
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={() => setTripType('oneWay')}
          className={`min-w-[140px] px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 flex items-center ${
            tripType === 'oneWay'
              ? 'bg-red-500 text-white'
              : 'bg-black/80 text-gray-400 hover:text-white'
          }`}
        >
          <span>{translations[currentLang].oneWay}</span>
          <span className="text-lg leading-none ml-2">➜</span>
        </button>
        <button
          onClick={() => setTripType('roundTrip')}
          className={`min-w-[140px] px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 flex items-center ${
            tripType === 'roundTrip'
              ? 'bg-red-500 text-white'
              : 'bg-black/80 text-gray-400 hover:bg-green-500/20 hover:text-green-500 border border-transparent hover:border-green-500'
          }`}
        >
          <span>{translations[currentLang].roundTrip}</span>
          <div className="flex flex-col -space-y-2 text-lg leading-none ml-2">
            <span>➜</span>
            <span className="rotate-180">➜</span>
          </div>
        </button>
      </div>
      {tripType === 'roundTrip' && (
        <p className="text-center text-red-500 text-sm md:text-base mb-4">{translations[currentLang].discountInfo}</p>
      )}
      <p className="text-center text-gray-400 text-sm md:text-base mb-4">{translations[currentLang].clickForRoute}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 max-w-7xl mx-auto px-2 md:px-4">
        {routes.map((route, index) => (
          <div
            key={`${route.from}-${route.to}`}
            onClick={() => handleRouteSelect(route.from, route.to, route.price)}
            className={`bg-black/80 backdrop-blur-sm rounded-xl p-3 md:p-4 flex justify-between items-center hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.01] cursor-pointer group border border-gray-800 hover:border-red-500 ${
              hasAnimated ? 'animate-fadeInUp' : 'opacity-0 translate-y-4'
            }`}
            style={{
              animationDelay: `${Math.floor(index / 2) * 200}ms`,
              animationFillMode: 'forwards',
              animationDuration: '0.8s',
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex flex-col min-w-0">
                  <span className="text-gray-400 text-xs md:text-sm">{translations[currentLang].from}</span>
                  <span className="text-white text-sm md:text-base font-medium truncate">{route.from}</span>
                </div>
                <div className="text-red-500 mx-1 md:mx-2 md:text-lg">➜</div>
                <div className="flex flex-col min-w-0">
                  <span className="text-gray-400 text-xs md:text-sm">{translations[currentLang].to}</span>
                  <span className="text-white text-sm md:text-base font-medium truncate">{route.to}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end ml-2 md:ml-3">
              <div className="flex items-center gap-2">
                <span className={`text-red-500 font-semibold text-base md:text-lg whitespace-nowrap group-hover:text-red-400 transition-colors ${tripType === 'roundTrip' ? 'line-through text-gray-500' : ''}`}>
                  ${tripType === 'roundTrip' ? route.price * 2 : route.price}
                </span>
                {tripType === 'roundTrip' && (
                  <span className="text-red-500 font-semibold text-base md:text-lg whitespace-nowrap group-hover:text-red-400 transition-colors">
                    ${(route.price * 2) - 5}
                  </span>
                )}
              </div>
              {tripType === 'roundTrip' && (
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <span>{translations[currentLang].saveText}</span>
                  <span>$5</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
});

export default PriceList; 