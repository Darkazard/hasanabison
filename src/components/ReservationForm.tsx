'use client';

import { translations } from '@/translations';
import { useTripType } from '@/contexts/TripTypeContext';
import { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';

// USD Price List
const USDPriceList = () => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Standard Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">$35</p>
      <p className="text-sm text-gray-400 mt-1">Per Person</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">VIP Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">$50</p>
      <p className="text-sm text-gray-400 mt-1">Per Person</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Luxury Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">$65</p>
      <p className="text-sm text-gray-400 mt-1">Per Person</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Van Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">$80</p>
      <p className="text-sm text-gray-400 mt-1">Per Person</p>
    </div>
  </div>
);

// EUR Price List
const EURPriceList = () => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Standard Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">€32</p>
      <p className="text-sm text-gray-400 mt-1">Pro Person</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">VIP Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">€45</p>
      <p className="text-sm text-gray-400 mt-1">Pro Person</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Luxus Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">€60</p>
      <p className="text-sm text-gray-400 mt-1">Pro Person</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Van Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">€75</p>
      <p className="text-sm text-gray-400 mt-1">Pro Person</p>
    </div>
  </div>
);

// RUB Price List
const RUBPriceList = () => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Стандартный трансфер</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">₽3200</p>
      <p className="text-sm text-gray-400 mt-1">За человека</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">VIP трансфер</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">₽4500</p>
      <p className="text-sm text-gray-400 mt-1">За человека</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Люкс трансфер</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">₽5800</p>
      <p className="text-sm text-gray-400 mt-1">За человека</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Минивэн трансфер</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">₽7200</p>
      <p className="text-sm text-gray-400 mt-1">За человека</p>
    </div>
  </div>
);

// TRY Price List
const TRYPriceList = () => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Standart Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">₺1100</p>
      <p className="text-sm text-gray-400 mt-1">Kişi Başı</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">VIP Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">₺1500</p>
      <p className="text-sm text-gray-400 mt-1">Kişi Başı</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Lüks Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">₺2000</p>
      <p className="text-sm text-gray-400 mt-1">Kişi Başı</p>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white">Van Transfer</h3>
      <p className="text-2xl font-bold text-red-500 mt-2">₺2500</p>
      <p className="text-sm text-gray-400 mt-1">Kişi Başı</p>
    </div>
  </div>
);

// Video Popup Component
const VideoPopup = ({ isOpen, onClose, videoId }: { isOpen: boolean; onClose: () => void; videoId: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const ReservationForm = () => {
  const pathname = usePathname();
  let currentLang = 'en';
  
  if (pathname) {
    if (pathname.includes('/tr')) {
      currentLang = 'tr';
    } else if (pathname.includes('/de')) {
      currentLang = 'de';
    } else if (pathname.includes('/ru')) {
      currentLang = 'ru';
    }
  }

  const t = translations[currentLang as keyof typeof translations];
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  
  const [currency, setCurrency] = useState(() => {
    switch (currentLang) {
      case 'de': return 'EUR';
      case 'ru': return 'RUB';
      case 'tr': return 'TRY';
      default: return 'USD';
    }
  });

  const [price, setPrice] = useState(() => {
    switch (currentLang) {
      case 'de': return 32;
      case 'ru': return 3200;
      case 'tr': return 1100;
      default: return 35;
    }
  });

  const getPriceWithCurrency = () => {
    switch (currentLang) {
      case 'de':
        return {
          currency: 'EUR',
          symbol: '€',
          prices: {
            base: 32,
            vip: 45,
            luxury: 60,
            van: 75
          }
        };
      case 'ru':
        return {
          currency: 'RUB',
          symbol: '₽',
          prices: {
            base: 3200,
            vip: 4500,
            luxury: 5800,
            van: 7200
          }
        };
      case 'tr':
        return {
          currency: 'TRY',
          symbol: '₺',
          prices: {
            base: 1100,
            vip: 1500,
            luxury: 2000,
            van: 2500
          }
        };
      default:
        return {
          currency: 'USD',
          symbol: '$',
          prices: {
            base: 35,
            vip: 50,
            luxury: 65,
            van: 80
          }
        };
    }
  };

  const { tripType, setTripType } = useTripType();
  const [step1Data, setStep1Data] = useState<{
    pickupLocation: string;
    dropoffLocation: string;
    adults: number;
    children: number;
    currency: string;
    price: number;
    tripType: 'one-way' | 'round-trip';
  } | null>(null);
  const params = useParams();
  const router = useRouter();
  const priceInfo = getPriceWithCurrency();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const savedStep1 = localStorage.getItem('reservationStep1');
    if (savedStep1) {
      const parsedData = JSON.parse(savedStep1);
      setStep1Data(parsedData);
      if (parsedData.tripType) {
        setTripType(parsedData.tripType);
      }
    }
  }, []);

  const handleTripTypeChange = (type: 'one-way' | 'round-trip') => {
    setTripType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const step1Data = {
      pickupLocation,
      dropoffLocation,
      adults,
      children,
      currency: priceInfo.currency,
      price: priceInfo.prices.base,
      tripType
    };

    localStorage.setItem('reservationStep1', JSON.stringify(step1Data));
    router.push('/reservation/step2');
  };

  const PriceListComponent = () => {
    switch (currentLang) {
      case 'de':
        return <EURPriceList />;
      case 'ru':
        return <RUBPriceList />;
      case 'tr':
        return <TRYPriceList />;
      default:
        return <USDPriceList />;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... existing form fields ... */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleTripTypeChange('one-way')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              tripType === 'one-way'
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {currentLang === 'de' ? 'Einzelfahrt' : 
             currentLang === 'tr' ? 'Tek Yön' : 
             currentLang === 'ru' ? 'В одну сторону' : 'One Way'}
          </button>
          <button
            type="button"
            onClick={() => handleTripTypeChange('round-trip')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              tripType === 'round-trip'
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {currentLang === 'de' ? 'Hin und Zurück' : 
             currentLang === 'tr' ? 'Gidiş Dönüş' : 
             currentLang === 'ru' ? 'Туда и обратно' : 'Round Trip'}
          </button>
        </div>

        {/* Price List Section */}
        <PriceListComponent />
      </form>

      {/* Video Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="group cursor-pointer" onClick={() => setSelectedVideo('oIHdAPHF4NI')}>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
            <img
              src="/images/transfer-service.jpg"
              alt="Transfer Service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="mt-3 text-lg font-medium text-white">Start Holiday Transfer Hizmeti</h3>
          <p className="mt-1 text-sm text-gray-400">Profesyonel transfer hizmetimizi keşfedin</p>
        </div>

        <div className="group cursor-pointer" onClick={() => setSelectedVideo('JsCaQfTWEdw')}>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
            <img
              src="/images/luxury-fleet.jpg"
              alt="Luxury Fleet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="mt-3 text-lg font-medium text-white">Lüks Araç Filosu</h3>
          <p className="mt-1 text-sm text-gray-400">Modern ve konforlu araçlarımızla hizmetinizdeyiz</p>
        </div>

        <div className="group cursor-pointer" onClick={() => setSelectedVideo('_OCMbMM0BmE')}>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
            <img
              src="/images/professional-drivers.jpg"
              alt="Professional Drivers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="mt-3 text-lg font-medium text-white">Profesyonel Sürücüler</h3>
          <p className="mt-1 text-sm text-gray-400">Deneyimli ve güvenilir sürücülerimiz</p>
        </div>

        <div className="group cursor-pointer" onClick={() => setSelectedVideo('jn5KzJoEmvs')}>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
            <img
              src="/images/customer-satisfaction.jpg"
              alt="Customer Satisfaction"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="mt-3 text-lg font-medium text-white">Müşteri Memnuniyeti</h3>
          <p className="mt-1 text-sm text-gray-400">Mutlu müşterilerimizin deneyimleri</p>
        </div>
      </div>

      {/* Video Popup */}
      <VideoPopup
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo || ''}
      />
    </div>
  );
};

export default ReservationForm; 