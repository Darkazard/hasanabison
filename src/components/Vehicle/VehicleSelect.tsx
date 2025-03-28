'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Vehicle {
  id: number;
  name: string;
  description: string;
  images: string[];
  passengerCapacity: string;
  luggageCapacity: string;
  features: string[];
  extraFeatures: string[];
  price: number;
  isPopular?: boolean;
}

interface ExtraService {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface VehicleSelectProps {
  onVehicleSelect: (data: {
    vehicleId: number | null;
    extras: number[];
    vehiclePrice: number;
    vehicleName: string;
    selectedExtras: { name: string; price: number }[];
  }) => void;
  initialPrice: number;
  onTripTypeChange?: (vehicleId: number, type: TripType) => void;
}

type TripType = 'one-way' | 'round-trip';

interface TripTypeSelectorProps {
  vehicleId: string;
  selectedTripType: TripType;
  onTripTypeChange: (tripType: TripType) => void;
}

// Move vehicles array outside component
const getVehicles = (lang: string): Vehicle[] => {
  switch (lang) {
    case 'en':
      return [
  {
    id: 1,
          name: "Economic",
          description: "Comfortable and economical travel option",
    images: [
      "/vehicles/ekonomik1.jpg",
      "/vehicles/ekonomik2.jpg",
      "/vehicles/ekonomik3.jpg",
      "/vehicles/ekonomik4.jpg",
      "/vehicles/ekonomik5.jpg"
    ],
    passengerCapacity: "1-5",
    luggageCapacity: "1-5",
    features: [
            "Services Included in Price",
            "TV & WiFi & FRIDGE",
            "Baby Seat",
            "FREE Water",
            "Refreshments",
            "Mini Bar (Paid)"
    ],
    extraFeatures: [
            "Meeting with Name Sign",
            "No Hidden Costs"
    ],
          price: 0 // Ekonomik seçenek için ek ücret yok
  },
  {
    id: 2,
          name: "Premium",
          description: "Premium vehicle with luxury travel experience",
    images: [
      "/vehicles/premium1.jpg",
      "/vehicles/premium2.jpg",
      "/vehicles/premium3.jpg",
      "/vehicles/premium4.jpg",
      "/vehicles/premium5.jpg"
    ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
          features: [
            "✨ Premium Services Included",
            "📱 High-Speed WiFi & 4K TV",
            "❄️ Private Mini Bar & Fridge",
            "👶 Luxury Baby Seat",
            "🌊 Premium Beverage Service",
            "💺 Massage VIP Seats"
          ],
          extraFeatures: [
            "🎯 VIP Welcome with Name Sign",
            "💎 100% Customer Satisfaction",
            "🏆 Most Preferred Option",
            "⭐ Premium Customer Support"
          ],
          price: 10, // Premium için +10 dolar
          isPopular: true
        },
        {
          id: 3,
          name: "Maybach",
          description: "Ultra luxury Maybach for VIP travel",
          images: [
            "/vehicles/business1.jpg",
            "/vehicles/business2.jpg",
            "/vehicles/business3.jpg",
            "/vehicles/business4.jpg",
            "/vehicles/business5.jpg"
          ],
          passengerCapacity: "1-3",
          luggageCapacity: "1-3",
          features: [
            "Services Included in Price",
            "TV & WiFi & FRIDGE",
            "Work Desk",
            "FREE Water",
            "Mini Bar (Paid)"
          ],
          extraFeatures: [
            "Meeting with Name Sign",
            "No Hidden Costs"
          ],
          price: 25 // Maybach için +25 dolar
        },
        {
          id: 4,
          name: "VIP Sprinter",
          description: "Ideal choice for large groups",
          images: [
            "/vehicles/family1.jpg",
            "/vehicles/family2.jpg",
            "/vehicles/family3.jpg",
            "/vehicles/family4.jpg",
            "/vehicles/family5.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Services Included in Price",
            "TV & WiFi & FRIDGE",
            "2 Baby Seats",
            "FREE Water",
            "Refreshments",
            "Mini Bar (Paid)"
          ],
          extraFeatures: [
            "Meeting with Name Sign",
            "No Hidden Costs"
          ],
          price: 20 // VIP Sprinter için +20 dolar
        },
        {
          id: 5,
          name: "VIP Sprinter Plus",
          description: "Ultimate luxury experience for large groups",
          images: [
            "/vehicles/luxury1.jpg",
            "/vehicles/luxury2.jpg",
            "/vehicles/luxury3.jpg",
            "/vehicles/luxury4.jpg",
            "/vehicles/luxury5.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Services Included in Price",
            "TV & WiFi & FRIDGE",
            "Massage Seat",
            "FREE Water",
            "Refreshments",
            "Mini Bar (Paid)"
          ],
          extraFeatures: [
            "Meeting with Name Sign",
            "No Hidden Costs"
          ],
          price: 30 // VIP Sprinter Plus için +30 dolar
        }
      ];
    case 'de':
      return [
        {
          id: 1,
          name: "Ekonomisch",
          description: "Komfortable und wirtschaftliche Reisemöglichkeit",
          images: [
            "/vehicles/ekonomik1.jpg",
            "/vehicles/ekonomik2.jpg",
            "/vehicles/ekonomik3.jpg",
            "/vehicles/ekonomik4.jpg",
            "/vehicles/ekonomik5.jpg"
          ],
          passengerCapacity: "1-5",
          luggageCapacity: "1-5",
          features: [
            "Im Preis enthaltene Leistungen",
            "TV & WLAN & KÜHLSCHRANK",
            "Babysitz",
            "GRATIS Wasser",
            "Erfrischungen",
            "Minibar (kostenpflichtig)"
          ],
          extraFeatures: [
            "Treffen mit Namensschild",
            "Keine versteckten Kosten"
          ],
          price: 0 // Ekonomik seçenek için ek ücret yok
        },
        {
          id: 2,
          name: "Premium",
          description: "Premium-Fahrzeug mit Luxus-Reiseerlebnis",
          images: [
            "/vehicles/premium1.jpg",
            "/vehicles/premium2.jpg",
            "/vehicles/premium3.jpg",
            "/vehicles/premium4.jpg",
            "/vehicles/premium5.jpg"
          ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
          features: [
            "✨ Premium-Dienste inklusive",
            "📱 Hochgeschwindigkeits-WLAN & 4K TV",
            "❄️ Private Minibar & Kühlschrank",
            "👶 Luxus-Babysitz",
            "🌊 Premium-Getränkeservice",
            "💺 VIP-Massagesitze"
          ],
          extraFeatures: [
            "🎯 VIP-Empfang mit Namensschild",
            "💎 100% Kundenzufriedenheit",
            "🏆 Meistgewählte Option",
            "⭐ Premium-Kundenbetreuung"
          ],
          price: 10, // Premium için +10 dolar
          isPopular: true
        },
        {
          id: 3,
          name: "Maybach",
          description: "Ultra-Luxus Maybach für VIP-Reisen",
          images: [
            "/vehicles/business1.jpg",
            "/vehicles/business2.jpg",
            "/vehicles/business3.jpg",
            "/vehicles/business4.jpg",
            "/vehicles/business5.jpg"
          ],
          passengerCapacity: "1-3",
          luggageCapacity: "1-3",
          features: [
            "Im Preis enthaltene Leistungen",
            "TV & WLAN & KÜHLSCHRANK",
            "Arbeitsplatz",
            "GRATIS Wasser",
            "Minibar (kostenpflichtig)"
          ],
          extraFeatures: [
            "Treffen mit Namensschild",
            "Keine versteckten Kosten"
          ],
          price: 25 // Maybach için +25 dolar
        },
        {
          id: 4,
          name: "VIP Sprinter",
          description: "Ideale Wahl für große Gruppen",
          images: [
            "/vehicles/family1.jpg",
            "/vehicles/family2.jpg",
            "/vehicles/family3.jpg",
            "/vehicles/family4.jpg",
            "/vehicles/family5.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Im Preis enthaltene Leistungen",
            "TV & WLAN & KÜHLSCHRANK",
            "2 Babysitze",
            "GRATIS Wasser",
            "Erfrischungen",
            "Minibar (kostenpflichtig)"
          ],
          extraFeatures: [
            "Treffen mit Namensschild",
            "Keine versteckten Kosten"
          ],
          price: 20 // VIP Sprinter için +20 dolar
        },
        {
          id: 5,
          name: "VIP Sprinter Plus",
          description: "Ultimatives Luxus-Erlebnis für große Gruppen",
          images: [
            "/vehicles/luxury1.jpg",
            "/vehicles/luxury2.jpg",
            "/vehicles/luxury3.jpg",
            "/vehicles/luxury4.jpg",
            "/vehicles/luxury5.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Im Preis enthaltene Leistungen",
            "TV & WLAN & KÜHLSCHRANK",
            "Massagesitz",
            "GRATIS Wasser",
            "Erfrischungen",
            "Minibar (kostenpflichtig)"
          ],
          extraFeatures: [
            "Treffen mit Namensschild",
            "Keine versteckten Kosten"
          ],
          price: 30 // VIP Sprinter Plus için +30 dolar
        }
      ];
    case 'ru':
      return [
        {
          id: 1,
          name: "Экономичный",
          description: "Комфортный и экономичный вариант путешествия",
          images: [
            "/vehicles/ekonomik1.jpg",
            "/vehicles/ekonomik2.jpg",
            "/vehicles/ekonomik3.jpg",
            "/vehicles/ekonomik4.jpg",
            "/vehicles/ekonomik5.jpg"
          ],
          passengerCapacity: "1-5",
          luggageCapacity: "1-5",
          features: [
            "Услуги включены в цену",
            "ТВ и WiFi и ХОЛОДИЛЬНИК",
            "Детское кресло",
            "БЕСПЛАТНАЯ вода",
            "Напитки",
            "Мини-бар (платный)"
          ],
          extraFeatures: [
            "Встреча с табличкой",
            "Без скрытых платежей"
          ],
          price: 0 // Ekonomik seçenek için ek ücret yok
        },
        {
          id: 2,
          name: "Премиум",
          description: "Премиальный автомобиль с люксовым путешествием",
          images: [
            "/vehicles/premium1.jpg",
            "/vehicles/premium2.jpg",
            "/vehicles/premium3.jpg",
            "/vehicles/premium4.jpg",
            "/vehicles/premium5.jpg"
          ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
          features: [
            "✨ Премиум-услуги включены",
            "📱 Высокоскоростной WiFi и 4K ТВ",
            "❄️ Приватный мини-бар и холодильник",
            "👶 Люкс детское кресло",
            "🌊 Премиум-напитки",
            "💺 VIP-массажные кресла"
          ],
          extraFeatures: [
            "🎯 VIP-встреча с табличкой",
            "💎 100% удовлетворенность клиентов",
            "🏆 Самый популярный вариант",
            "⭐ Премиум-поддержка"
          ],
          price: 10, // Premium için +10 dolar
          isPopular: true
        },
        {
          id: 3,
          name: "Майбах",
          description: "Ультра-люкс Maybach для VIP-путешествий",
          images: [
            "/vehicles/business1.jpg",
            "/vehicles/business2.jpg",
            "/vehicles/business3.jpg",
            "/vehicles/business4.jpg",
            "/vehicles/business5.jpg"
          ],
          passengerCapacity: "1-3",
          luggageCapacity: "1-3",
          features: [
            "Услуги включены в цену",
            "ТВ и WiFi и ХОЛОДИЛЬНИК",
            "Рабочий стол",
            "БЕСПЛАТНАЯ вода",
            "Мини-бар (платный)"
          ],
          extraFeatures: [
            "Встреча с табличкой",
            "Без скрытых платежей"
          ],
          price: 25 // Maybach için +25 dolar
        },
        {
          id: 4,
          name: "VIP Спринтер",
          description: "Идеальный выбор для больших групп",
          images: [
            "/vehicles/family1.jpg",
            "/vehicles/family2.jpg",
            "/vehicles/family3.jpg",
            "/vehicles/family4.jpg",
            "/vehicles/family5.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Услуги включены в цену",
            "ТВ и WiFi и ХОЛОДИЛЬНИК",
            "2 детских кресла",
            "БЕСПЛАТНАЯ вода",
            "Напитки",
            "Мини-бар (платный)"
          ],
          extraFeatures: [
            "Встреча с табличкой",
            "Без скрытых платежей"
          ],
          price: 20 // VIP Sprinter için +20 dolar
        },
        {
          id: 5,
          name: "VIP Спринтер Плюс",
          description: "Ультимативный люкс для больших групп",
          images: [
            "/vehicles/luxury1.jpg",
            "/vehicles/luxury2.jpg",
            "/vehicles/luxury3.jpg",
            "/vehicles/luxury4.jpg",
            "/vehicles/luxury5.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Услуги включены в цену",
            "ТВ и WiFi и ХОЛОДИЛЬНИК",
            "Массажное кресло",
            "БЕСПЛАТНАЯ вода",
            "Напитки",
            "Мини-бар (платный)"
          ],
          extraFeatures: [
            "Встреча с табличкой",
            "Без скрытых платежей"
          ],
          price: 30 // VIP Sprinter Plus için +30 dolar
        }
      ];
    default:
      return [
        {
          id: 1,
          name: "Ekonomik",
          description: "Konforlu ve ekonomik seyahat seçeneği",
          images: [
            "/vehicles/ekonomik1.jpg",
            "/vehicles/ekonomik2.jpg",
            "/vehicles/ekonomik3.jpg",
            "/vehicles/ekonomik4.jpg",
            "/vehicles/ekonomik5.jpg"
          ],
          passengerCapacity: "1-5",
          luggageCapacity: "1-5",
          features: [
            "Fiyata Dahil Hizmetler",
            "TV & WiFi & BUZDOLABI",
            "Bebek Koltuğu",
            "ÜCRETSİZ Su",
            "İçecekler",
            "Mini Bar (Ücretli)"
          ],
          extraFeatures: [
            "İsim Tabelası ile Karşılama",
            "Gizli Ücret Yok"
          ],
          price: 0 // Ekonomik seçenek için ek ücret yok
        },
        {
          id: 2,
          name: "Premium",
          description: "Premium araç ile lüks seyahat deneyimi",
          images: [
            "/vehicles/premium1.jpg",
            "/vehicles/premium2.jpg",
            "/vehicles/premium3.jpg",
            "/vehicles/premium4.jpg",
            "/vehicles/premium5.jpg"
          ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
    features: [
      "✨ Premium Hizmetler Dahil",
      "📱 Yüksek Hızlı WiFi & 4K TV",
      "❄️ Özel Mini Bar & Buzdolabı",
      "👶 Lüks Bebek Koltuğu",
            "🌊 Premium İçecek Servisi",
            "💺 VIP Masaj Koltukları"
    ],
    extraFeatures: [
            "🎯 İsim Tabelası ile VIP Karşılama",
      "💎 %100 Müşteri Memnuniyeti",
      "🏆 En Çok Tercih Edilen Seçenek",
      "⭐ Premium Müşteri Desteği"
    ],
          price: 10, // Premium için +10 dolar
    isPopular: true
  },
  {
    id: 3,
          name: "Maybach",
          description: "VIP seyahat için ultra lüks Maybach",
    images: [
      "/vehicles/business1.jpg",
      "/vehicles/business2.jpg",
      "/vehicles/business3.jpg",
      "/vehicles/business4.jpg",
      "/vehicles/business5.jpg"
    ],
    passengerCapacity: "1-3",
    luggageCapacity: "1-3",
    features: [
            "Fiyata Dahil Hizmetler",
            "TV & WiFi & BUZDOLABI",
      "Çalışma Masası",
            "ÜCRETSİZ Su",
            "Mini Bar (Ücretli)"
    ],
    extraFeatures: [
            "İsim Tabelası ile Karşılama",
            "Gizli Ücret Yok"
    ],
          price: 25 // Maybach için +25 dolar
  },
  {
    id: 4,
          name: "VIP Sprinter",
          description: "Büyük gruplar için ideal seçim",
    images: [
      "/vehicles/family1.jpg",
      "/vehicles/family2.jpg",
      "/vehicles/family3.jpg",
      "/vehicles/family4.jpg",
      "/vehicles/family5.jpg"
    ],
    passengerCapacity: "6-8",
    luggageCapacity: "6-8",
    features: [
            "Fiyata Dahil Hizmetler",
            "TV & WiFi & BUZDOLABI",
            "2 Bebek Koltuğu",
            "ÜCRETSİZ Su",
            "İçecekler",
            "Mini Bar (Ücretli)"
    ],
    extraFeatures: [
            "İsim Tabelası ile Karşılama",
            "Gizli Ücret Yok"
    ],
          price: 20 // VIP Sprinter için +20 dolar
  },
  {
    id: 5,
          name: "VIP Sprinter Plus",
          description: "Büyük gruplar için ultimatif lüks deneyim",
    images: [
      "/vehicles/luxury1.jpg",
      "/vehicles/luxury2.jpg",
      "/vehicles/luxury3.jpg",
      "/vehicles/luxury4.jpg",
      "/vehicles/luxury5.jpg"
    ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
    features: [
            "Fiyata Dahil Hizmetler",
            "TV & WiFi & BUZDOLABI",
      "Masaj Koltuğu",
            "ÜCRETSİZ Su",
            "İçecekler",
            "Mini Bar (Ücretli)"
    ],
    extraFeatures: [
            "İsim Tabelası ile Karşılama",
            "Gizli Ücret Yok"
          ],
          price: 30 // VIP Sprinter Plus için +30 dolar
        }
      ];
  }
};

const getExtraServices = (lang: string): ExtraService[] => {
  switch (lang) {
    case 'en':
      return [
        {
          id: 1,
          name: "Flower Bouquet",
          price: 30,
          description: "Beautiful flower bouquet"
        },
        {
          id: 2,
          name: "Champagne",
          price: 25,
          description: "Premium champagne"
        },
        {
          id: 3,
          name: "Fruit Basket",
          price: 15,
          description: "Fresh fruit basket"
        },
        {
          id: 4,
          name: "Flying Balloon",
          price: 10,
          description: "Decorative balloon"
        }
      ];
    case 'de':
      return [
        {
          id: 1,
          name: "Blumenstrauß",
          price: 30,
          description: "Schöner Blumenstrauß"
        },
        {
          id: 2,
          name: "Champagner",
          price: 25,
          description: "Premium Champagner"
        },
        {
          id: 3,
          name: "Obstkorb",
          price: 15,
          description: "Frischer Obstkorb"
        },
        {
          id: 4,
          name: "Fliegender Ballon",
          price: 10,
          description: "Dekorativer Ballon"
        }
      ];
    case 'ru':
      return [
        {
          id: 1,
          name: "Букет цветов",
          price: 30,
          description: "Красивый букет цветов"
        },
        {
          id: 2,
          name: "Шампанское",
          price: 25,
          description: "Премиум шампанское"
        },
        {
          id: 3,
          name: "Фруктовая корзина",
          price: 15,
          description: "Свежая фруктовая корзина"
        },
        {
          id: 4,
          name: "Воздушный шар",
          price: 10,
          description: "Декоративный шар"
        }
      ];
    default:
      return [
        {
          id: 1,
          name: "Buket Çiçek",
          price: 30,
          description: "Güzel buket çiçek"
        },
        {
          id: 2,
          name: "Şişe Şampanya",
          price: 25,
          description: "Premium şampanya"
        },
        {
          id: 3,
          name: "Meyve Tabağı",
          price: 15,
          description: "Taze meyve tabağı"
        },
        {
          id: 4,
          name: "Uçan Balon",
          price: 10,
          description: "Dekoratif balon"
        }
      ];
  }
};

// Trip type selection component
const TripTypeSelector = ({ vehicleId, selectedTripType, onTripTypeChange }: TripTypeSelectorProps) => {
  const params = useParams();
  const lang = (typeof params.lang === 'string' ? params.lang : '') || '';
  
  const getText = (lang: string) => {
    switch (lang) {
      case 'tr':
        return {
          oneWay: 'Tek Yön',
          roundTrip: 'Gidiş-Dönüş',
          discount: 'indirim'
        };
      case 'de':
        return {
          oneWay: 'Einfache Fahrt',
          roundTrip: 'Hin und Zurück',
          discount: 'Rabatt'
        };
      case 'ru':
        return {
          oneWay: 'В одну сторону',
          roundTrip: 'Туда и обратно',
          discount: 'скидка'
        };
      default:
        return {
          oneWay: 'One Way',
          roundTrip: 'Round Trip',
          discount: 'discount'
        };
    }
  };

  const texts = getText(lang);

  return (
    <div className="absolute top-2 right-2 z-10">
      <div className="flex flex-row gap-1">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-1.5">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onTripTypeChange('one-way')}
              className={`relative px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                selectedTripType === 'one-way'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {selectedTripType === 'one-way' && (
                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {texts.oneWay}
            </button>
            <button
              onClick={() => onTripTypeChange('round-trip')}
              className={`relative px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                selectedTripType === 'round-trip'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {selectedTripType === 'round-trip' && (
                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {texts.roundTrip}
            </button>
          </div>
          {selectedTripType === 'round-trip' && (
            <div className="text-xs text-green-400 text-center mt-1 font-medium">
              -$5 {texts.discount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const VehicleSelect = ({ onVehicleSelect, initialPrice, onTripTypeChange }: VehicleSelectProps) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [selectedExtrasMap, setSelectedExtrasMap] = useState<{ [key: number]: number[] }>({});
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tripTypes, setTripTypes] = useState<{ [key: number]: TripType }>({});
  const params = useParams();
  const lang = (typeof params.lang === 'string' ? params.lang : '') || '';

  const vehicles = getVehicles(lang);
  const extraServices = getExtraServices(lang);

  const getText = (lang: string) => {
    switch (lang) {
      case 'tr':
        return {
          oneWay: 'Tek Yön',
          roundTrip: 'Gidiş-Dönüş',
          discount: 'indirim',
          vehiclePrice: 'Araç Ücreti'
        };
      case 'de':
        return {
          oneWay: 'Einfache Fahrt',
          roundTrip: 'Hin und Zurück',
          discount: 'Rabatt',
          vehiclePrice: 'Fahrzeugpreis'
        };
      case 'ru':
        return {
          oneWay: 'В одну сторону',
          roundTrip: 'Туда и обратно',
          discount: 'скидка',
          vehiclePrice: 'Цена автомобиля'
        };
      default:
        return {
          oneWay: 'One Way',
          roundTrip: 'Round Trip',
          discount: 'discount',
          vehiclePrice: 'Vehicle Price'
        };
    }
  };

  const handleVehicleSelect = (vehicleId: number) => {
    const selectedVehicle = vehicles.find(v => v.id === vehicleId);
    if (selectedVehicle) {
      const vehicleExtras = selectedExtrasMap[vehicleId] || [];
      const selectedExtrasDetails = vehicleExtras.map(id => {
        const service = extraServices.find(s => s.id === id);
        return {
          name: service?.name || '',
          price: service?.price || 0
        };
      });

      // Ekstra hizmetlerin toplam fiyatı
      const extrasTotal = selectedExtrasDetails.reduce((sum, extra) => sum + extra.price, 0);

      // Araç fiyatı + Güzergah fiyatı
      const basePrice = initialPrice + selectedVehicle.price;

      // Gidiş-dönüş kontrolü
      const tripType = getTripType(vehicleId);
      let finalPrice = basePrice;

      if (tripType === 'round-trip') {
        // Gidiş-dönüş seçiliyse: (Temel fiyat × 2) - 5$ indirim
        finalPrice = (basePrice * 2) - 5;
      }

      // Ekstra hizmetleri ekle
      finalPrice += extrasTotal;

      // Seçimleri step3'e gönder
      onVehicleSelect({
        vehicleId,
        extras: vehicleExtras,
        vehiclePrice: finalPrice, // Toplam fiyat
        vehicleName: selectedVehicle.name,
        selectedExtras: selectedExtrasDetails
      });

      // URL'i güncelle
      const url = new URL(window.location.href);
      url.searchParams.set('tripType', tripType);
      url.searchParams.set('basePrice', basePrice.toString());
      url.searchParams.set('extrasTotal', extrasTotal.toString());
      url.searchParams.set('finalPrice', finalPrice.toString());
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleExtraServiceToggle = (vehicleId: number, serviceId: number) => {
    const service = getExtraServices(lang).find(s => s.id === serviceId);
    if (!service) return;

    if (serviceId === 1) {
      const vehicle = getVehicles(lang).find(v => v.id === vehicleId);
      if (!vehicle) return;

      const roundTripPrice = (initialPrice * 2) - 5; // Gidiş-dönüş için toplam fiyatın 2 katından 5 dolar düşürülür
      service.price = roundTripPrice;
    }

    setSelectedExtrasMap(prev => {
      const exists = prev[vehicleId]?.some(e => e === serviceId) || false;
      if (exists) {
      return {
        ...prev,
          [vehicleId]: prev[vehicleId]?.filter(e => e !== serviceId) || []
        };
      }
      return {
        ...prev,
        [vehicleId]: [...prev[vehicleId] || [], serviceId]
      };
    });
  };

  const handleTripTypeChange = (vehicleId: string, type: TripType) => {
    const numericId = parseInt(vehicleId, 10);
    setTripTypes(prev => ({ ...prev, [numericId]: type }));
    if (onTripTypeChange) {
      onTripTypeChange(numericId, type);
    }
  };

  const getTripType = (vehicleId: number): TripType => {
    return tripTypes[vehicleId] || 'one-way';
  };

  // Resim navigasyonu
  const nextImage = (vehicleId: number, maxLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [vehicleId]: (prev[vehicleId] + 1) % maxLength || 0
    }));
  };

  const prevImage = (vehicleId: number, maxLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [vehicleId]: prev[vehicleId] === 0 ? maxLength - 1 : (prev[vehicleId] - 1) || 0
    }));
  };

  const getCurrentImageIndex = (vehicleId: number) => {
    return currentImageIndices[vehicleId] || 0;
  };

  // Calculate total price including trip type
  const calculateTotalPrice = (vehicle: Vehicle, extras: { name: string; price: number }[], vehicleId: number) => {
    // Ekstra hizmetlerin toplam fiyatı
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
    
    // Araç fiyatı + Güzergah fiyatı
    const basePrice = initialPrice + vehicle.price;
    
    // Gidiş-dönüş kontrolü
    const tripType = getTripType(vehicleId);
    let finalPrice = basePrice;
    
    if (tripType === 'round-trip') {
      // Gidiş-dönüş seçiliyse: (Temel fiyat × 2) - 5$ indirim
      finalPrice = (basePrice * 2) - 5;
    }
    
    // Ekstra hizmetleri ekle
    finalPrice += extrasTotal;
    
    return finalPrice;
  };

  return (
    <div className="max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] mx-auto space-y-3 p-2">
      {vehicles.map((vehicle) => {
        const currentImageIndex = getCurrentImageIndex(vehicle.id);
        const vehicleExtras = selectedExtrasMap[vehicle.id] || [];
        const selectedExtrasDetails = vehicleExtras.map(id => {
          const service = extraServices.find(s => s.id === id);
          return {
            name: service?.name || '',
            price: service?.price || 0
          };
        });

        const extrasTotal = selectedExtrasDetails.reduce((sum, extra) => sum + extra.price, 0);
        const vehicleTotal = calculateTotalPrice(vehicle, selectedExtrasDetails, vehicle.id);
        const isSelected = selectedVehicleId === vehicle.id;
        const tripType = getTripType(vehicle.id);
        const texts = getText(lang);

        return (
          <div key={vehicle.id} className={`bg-black/80 backdrop-blur-sm rounded-xl p-2 lg:p-3 border ${
              vehicle.id === selectedVehicleId
                ? vehicle.isPopular
                  ? 'border-blue-500 ring-2 ring-blue-500'
                  : 'border-red-500 ring-2 ring-red-500'
                : vehicle.isPopular
                ? 'border-blue-500/50 hover:border-blue-500'
                : 'border-gray-800 hover:border-red-500'
          } transition-all duration-300 relative`}>
            {/* Vehicle Price Display */}
            <div className="absolute top-2 right-2 z-10">
              <div className={`px-3 py-1.5 rounded-lg ${
                vehicle.isPopular
                  ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80'
                  : 'bg-red-500/80'
              } backdrop-blur-sm text-white font-medium text-sm flex items-center gap-1.5`}>
                <span className="text-gray-200">{texts.vehiclePrice}:</span>
                <span className="font-bold">${vehicle.price}</span>
              </div>
            </div>

            {vehicle.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg z-10 whitespace-nowrap flex items-center gap-2">
                  <span className="animate-pulse">👑</span>
                <span>Most Preferred</span>
                  <span className="animate-pulse">👑</span>
                </div>
            )}
            
            <div className="grid grid-cols-12 gap-2 lg:gap-4">
              {/* Araç Görseli */}
              <div className="col-span-12 md:col-span-3 relative h-[200px]">
                <div className="absolute inset-0 flex items-center justify-between z-10 px-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(vehicle.id, vehicle.images.length);
                    }} 
                    className="w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors text-lg"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(vehicle.id, vehicle.images.length);
                    }} 
                    className="w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors text-lg"
                  >
                    ›
                  </button>
                </div>
                <div className="relative h-full w-full group">
                  <Image
                    src={vehicle.images[currentImageIndex]}
                    alt={vehicle.name}
                    fill
                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                  {vehicle.images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndices(prev => ({ ...prev, [vehicle.id]: idx }));
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Özellikler */}
              <div className="col-span-12 md:col-span-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-bold ${
                      vehicle.isPopular 
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent' 
                        : 'text-white'
                    }`}>
                      {vehicle.name}
                      {vehicle.isPopular && <span className="ml-2 text-yellow-400">⭐</span>}
                    </h3>
                    <p className="text-gray-400 mt-1 text-sm">{vehicle.description}</p>
                  </div>
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-1.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTripTypeChange(vehicle.id.toString(), 'one-way')}
                        className={`relative px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                          tripType === 'one-way'
                            ? 'bg-red-500 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {tripType === 'one-way' && (
                          <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                        )}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        {texts.oneWay}
                      </button>
                      <button
                        onClick={() => handleTripTypeChange(vehicle.id.toString(), 'round-trip')}
                        className={`relative px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                          tripType === 'round-trip'
                            ? 'bg-red-500 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {tripType === 'round-trip' && (
                          <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                        )}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        {texts.roundTrip}
                      </button>
                      </div>
                    {tripType === 'round-trip' && (
                      <div className="text-xs text-green-400 text-center mt-1 font-medium">
                        -$5 {texts.discount}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 p-2 rounded-lg bg-gray-900/50">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Passenger:</span>
                    <span className="font-medium text-white">{vehicle.passengerCapacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Luggage:</span>
                    <span className="font-medium text-white">{vehicle.luggageCapacity}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      {vehicle.isPopular ? (
                        <span className="text-gray-200">{feature}</span>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {vehicle.extraFeatures.length > 0 && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {vehicle.extraFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        {vehicle.isPopular ? (
                          <span className="text-gray-200">{feature}</span>
                        ) : (
                          <>
                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">{feature}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ek Hizmetler */}
              <div className="col-span-12 md:col-span-3 text-white mt-16 md:mt-8">
                <div className={`rounded-lg p-2.5 ${
                  vehicle.isPopular 
                    ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/20' 
                    : 'bg-gray-900/50'
                }`}>
                  <h4 className="text-[11px] font-medium mb-2 text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {lang === 'tr' ? 'Ek Hizmetler' : 
                     lang === 'de' ? 'Zusätzliche Dienste' : 
                     lang === 'ru' ? 'Дополнительные услуги' : 
                     'Extra Services'}
                  </h4>
                  <div className="space-y-1 mt-2">
                    {extraServices.map((service) => (
                      <div key={service.id} 
                        className="flex items-center justify-between p-1.5 rounded-md bg-black/30 hover:bg-black/40 transition-colors group">
                        <label className="flex items-center gap-1.5 cursor-pointer w-full">
                            <input
                              type="checkbox"
                              checked={vehicleExtras.includes(service.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleExtraServiceToggle(vehicle.id, service.id);
                              }}
                            className="w-3 h-3 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                          />
                          <div className="flex justify-between w-full">
                            <span className="text-[11px] text-gray-300 group-hover:text-white transition-colors">
                              {service.name}
                            </span>
                            <span className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">
                              +{service.price}$
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {selectedExtrasDetails.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-700">
                      <div className="text-[11px] text-gray-400 mb-1">
                        {lang === 'tr' ? 'Seçilen Hizmetler' : 
                         lang === 'de' ? 'Ausgewählte Dienste' : 
                         lang === 'ru' ? 'Выбранные услуги' : 
                         'Selected Services'}:
                      </div>
                      <div className="space-y-1">
                        {selectedExtrasDetails.map((extra, idx) => (
                          <div key={idx} className="flex justify-between text-[11px]">
                            <span className="text-gray-300">{extra.name}</span>
                            <span className="text-gray-300">+{extra.price}$</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-[11px] font-medium pt-1 border-t border-gray-700">
                          <span className="text-gray-300">
                            {lang === 'tr' ? 'Ek Hizmet Toplamı' : 
                             lang === 'de' ? 'Zusatzleistungen Gesamt' : 
                             lang === 'ru' ? 'Сумма доп. услуг' : 
                             'Extras Total'}:
                          </span>
                          <span className="text-gray-300">+{extrasTotal}$</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs text-gray-300">
                      {lang === 'tr' ? 'Toplam Tutar' : 
                       lang === 'de' ? 'Gesamtbetrag' : 
                       lang === 'ru' ? 'Итого к оплате' : 
                       'Total Amount'}:
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${
                        vehicle.isPopular 
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent' 
                          : 'text-red-400'
                      }`}>
                        {vehicleTotal}
                      </span>
                      <span className="text-sm text-gray-400">$</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVehicleSelect(vehicle.id);
                    }}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                      vehicle.isPopular
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    {vehicle.isPopular ? 
                      (lang === 'tr' ? 'HEMEN REZERVASYON YAP' : 
                       lang === 'de' ? 'JETZT BUCHEN' : 
                       lang === 'ru' ? 'ЗАБРОНИРОВАТЬ СЕЙЧАС' : 
                       'BOOK NOW') : 
                      (lang === 'tr' ? 'REZERVASYON YAP' : 
                       lang === 'de' ? 'RESERVIERUNG VORNEHMEN' : 
                       lang === 'ru' ? 'СДЕЛАТЬ БРОНИРОВАНИЕ' : 
                       'MAKE RESERVATION')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-6xl max-h-[90vh] aspect-video">
            <Image
              src={selectedImage}
              alt="Büyütülmüş görsel"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleSelect; 