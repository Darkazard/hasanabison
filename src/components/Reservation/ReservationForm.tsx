'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'
import { MapPinIcon, UserIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import VehicleList from '@/components/Vehicle/VehicleList'
import Image from 'next/image'

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
}

interface VideoData {
  id: number
  thumbnail: string
  title: string
  youtubeUrl: string
}

interface Route {
  from: string
  to: string
  price: number
}

const routes: Route[] = [
  { from: 'Antalya Havalimanı', to: 'Konyaaltı', price: 35 },
  { from: 'Antalya Havalimanı', to: 'Lara', price: 35 },
  { from: 'Antalya Havalimanı', to: 'Kundu', price: 35 },
  { from: 'Antalya Havalimanı', to: 'Kaleiçi', price: 40 },
  { from: 'Antalya Havalimanı', to: 'Beldibi', price: 50 },
  { from: 'Antalya Havalimanı', to: 'Göynük', price: 50 },
  { from: 'Antalya Havalimanı', to: 'Kemer', price: 55 },
  { from: 'Antalya Havalimanı', to: 'Kiriş', price: 55 },
  { from: 'Antalya Havalimanı', to: 'Çamyuva', price: 60 },
  { from: 'Antalya Havalimanı', to: 'Tekirova', price: 60 },
  { from: 'Antalya Havalimanı', to: 'Çıralı', price: 80 },
  { from: 'Antalya Havalimanı', to: 'Olympos', price: 80 },
  { from: 'Antalya Havalimanı', to: 'Kaş', price: 140 },
  { from: 'Antalya Havalimanı', to: 'Kadriye Belek', price: 40 },
  { from: 'Antalya Havalimanı', to: 'Bogazkent', price: 45 },
  { from: 'Antalya Havalimanı', to: 'Side', price: 50 },
  { from: 'Antalya Havalimanı', to: 'Kızılağaç', price: 60 },
  { from: 'Antalya Havalimanı', to: 'Kızılot', price: 60 },
  { from: 'Antalya Havalimanı', to: 'Okurcalar', price: 60 },
  { from: 'Antalya Havalimanı', to: 'Türkler', price: 65 },
  { from: 'Antalya Havalimanı', to: 'Konaklı', price: 65 },
  { from: 'Antalya Havalimanı', to: 'Alanya merkez', price: 70 },
  { from: 'Antalya Havalimanı', to: 'Mahmutlar', price: 75 },
  { from: 'Antalya Havalimanı', to: 'Kargıcak', price: 75 },
  { from: 'Antalya Havalimanı', to: 'Fethiye', price: 160 }
]

// Çeviri nesnesi
const translations = {
  tr: {
    from: 'Nereden ?',
    to: 'Nereye ?',
    person: 'Kişi ?',
    currency: 'Para Birimi ?',
    select: 'Seçiniz',
    adult: 'Yetişkin',
    child: 'Çocuk',
    passenger: 'Yolcu',
    selectRoute: 'LÜTFEN GÜZERGAH SEÇİNİZ',
    clickForReservation: 'REZERVASYON İÇİN TIKLA',
    priceAndReservation: 'FİYAT: {price}$ - REZERVASYON YAP',
    transferPriceList: 'Transfer Fiyat Listesi',
    clickForRoute: 'Güzergah seçimi için tıklayınız',
    fromLabel: 'Nereden',
    toLabel: 'Nereye',
    whoWeAre: 'Biz Kimiz',
    socialMedia: 'SOSYAL MEDYA',
    pleaseReview: 'Lütfen inceleyiniz',
    pleaseReadReviews: 'Lütfen yorumları okuyun',
    // Duyuru metinleri
    announcement: {
      title: 'LÜTFEN OKUYUNUZ !!!',
      greeting: 'Değerli misafirlerimiz',
      intro: 'Tatiliniz START HOLIDAY TRANSFER ile başlıyor. Siz ve aileniz bizim için önemlisiniz ✅',
      service: 'Havalimanında sizi isim ve soyisminizin yazılı olduğu karşılama panosuyla karşılıyor ve keyifli bir yolculuk için ücretsiz ikramlarla dolu özel olarak hazırlanmış VIP aracınıza eşlik ediyoruz. Uygun fiyatlarımız, ultra lüks araçlarımız ve kişiye özel hizmet anlayışımızla farkımızı ortaya koyuyoruz. Dönüş transferiniz için rezervasyon saatinde otel veya belirttiğiniz adreste sizi bekliyor ve gideceğiniz noktaya konforlu bir yolculuk sağlıyoruz.',
      pricing: 'Fiyatlarımızda şeffafız: gördüğünüz fiyatlar kişi başı değil, aracın toplam ücretidir. Araç içerisinde bebek koltuğu, internet, soğuk içecekler, atıştırmalıklar, buzdolabı, televizyon ve şarj soketleri gibi hizmetlerimizden ücretsiz yararlanabilirsiniz. Ayrıca tüm yolcularımız özel sigortamız kapsamında olup, güvenliğiniz önceliğimizdir.',
      booking: 'Artık rezervasyonunuzu ücretsiz olarak online veya 7/24 WhatsApp destek hattımızdan yapabilir, transfer ücretini araç içerisinde nakit veya öncesinde online olarak kredi kartı ile ödeyebilirsiniz.'
    }
  },
  en: {
    from: 'From ?',
    to: 'To ?',
    person: 'Person ?',
    currency: 'Currency ?',
    select: 'Select',
    adult: 'Adult',
    child: 'Child',
    passenger: 'Passenger',
    selectRoute: 'PLEASE SELECT A ROUTE',
    clickForReservation: 'CLICK FOR RESERVATION',
    priceAndReservation: 'PRICE: {price}$ - MAKE RESERVATION',
    transferPriceList: 'Transfer Price List',
    clickForRoute: 'Click to select route',
    fromLabel: 'From',
    toLabel: 'To',
    whoWeAre: 'Who We Are',
    socialMedia: 'SOCIAL MEDIA',
    pleaseReview: 'Please review',
    pleaseReadReviews: 'Please read reviews',
    // Announcement texts
    announcement: {
      title: 'PLEASE READ !!!',
      greeting: 'Dear guests',
      intro: 'Your holiday begins with START HOLIDAY TRANSFER. You and your family are important to us ✅',
      service: 'We welcome you at the airport with a greeting board displaying your name and surname, and accompany you to your specially prepared VIP vehicle filled with complimentary refreshments for a pleasant journey. We demonstrate our difference with our affordable prices, ultra-luxury vehicles, and personalized service approach. For your return transfer, we wait for you at your hotel or specified address at the reservation time and provide a comfortable journey to your destination.',
      pricing: 'We are transparent with our prices: the prices you see are for the entire vehicle, not per person. You can benefit from our free services such as baby seats, internet, cold drinks, snacks, refrigerator, television, and charging sockets in the vehicle. Additionally, all our passengers are covered by our special insurance, and your safety is our priority.',
      booking: 'Now you can make your reservation for free online or through our 24/7 WhatsApp support line, and pay for the transfer either in cash in the vehicle or online by credit card beforehand.'
    }
  },
  de: {
    from: 'Von ?',
    to: 'Nach ?',
    person: 'Person ?',
    currency: 'Währung ?',
    select: 'Auswählen',
    adult: 'Erwachsener',
    child: 'Kind',
    passenger: 'Passagier',
    selectRoute: 'BITTE ROUTE AUSWÄHLEN',
    clickForReservation: 'KLICKEN FÜR RESERVIERUNG',
    priceAndReservation: 'PREIS: {price}$ - RESERVIERUNG',
    transferPriceList: 'Transfer Preisliste',
    clickForRoute: 'Klicken Sie, um Route auszuwählen',
    fromLabel: 'Von',
    toLabel: 'Nach',
    whoWeAre: 'Wer Wir Sind',
    socialMedia: 'SOZIALE MEDIEN',
    pleaseReview: 'Bitte überprüfen',
    pleaseReadReviews: 'Bitte Bewertungen lesen',
    // Ankündigungstexte
    announcement: {
      title: 'BITTE LESEN !!!',
      greeting: 'Liebe Gäste',
      intro: 'Ihr Urlaub beginnt mit START HOLIDAY TRANSFER. Sie und Ihre Familie sind uns wichtig ✅',
      service: 'Wir begrüßen Sie am Flughafen mit einem Begrüßungsschild mit Ihrem Namen und begleiten Sie zu Ihrem speziell vorbereiteten VIP-Fahrzeug mit kostenlosen Erfrischungen für eine angenehme Reise. Wir zeigen unseren Unterschied durch günstige Preise, ultra-luxuriöse Fahrzeuge und persönlichen Service. Für Ihren Rücktransfer warten wir zur reservierten Zeit an Ihrem Hotel oder der angegebenen Adresse und sorgen für eine komfortable Fahrt zu Ihrem Ziel.',
      pricing: 'Wir sind transparent mit unseren Preisen: Die angezeigten Preise gelten für das gesamte Fahrzeug, nicht pro Person. Sie können kostenlose Services wie Kindersitze, Internet, kalte Getränke, Snacks, Kühlschrank, Fernseher und Ladebuchsen im Fahrzeug nutzen. Außerdem sind alle unsere Passagiere durch unsere Spezialversicherung abgedeckt, Ihre Sicherheit hat Priorität.',
      booking: 'Sie können jetzt Ihre Reservierung kostenlos online oder über unsere 24/7 WhatsApp-Hotline vornehmen und den Transfer entweder bar im Fahrzeug oder vorab online per Kreditkarte bezahlen.'
    }
  },
  ru: {
    from: 'Откуда ?',
    to: 'Куда ?',
    person: 'Человек ?',
    currency: 'Валюта ?',
    select: 'Выберите',
    adult: 'Взрослый',
    child: 'Ребенок',
    passenger: 'Пассажир',
    selectRoute: 'ПОЖАЛУЙСТА, ВЫБЕРИТЕ МАРШРУТ',
    clickForReservation: 'НАЖМИТЕ ДЛЯ БРОНИРОВАНИЯ',
    priceAndReservation: 'ЦЕНА: {price}$ - ЗАБРОНИРОВАТЬ',
    transferPriceList: 'Список Цен на Трансфер',
    clickForRoute: 'Нажмите для выбора маршрута',
    fromLabel: 'Откуда',
    toLabel: 'Куда',
    whoWeAre: 'Кто Мы',
    socialMedia: 'СОЦИАЛЬНЫЕ СЕТИ',
    pleaseReview: 'Пожалуйста, проверьте',
    pleaseReadReviews: 'Пожалуйста, прочитайте отзывы',
    // Тексты объявления
    announcement: {
      title: 'ПОЖАЛУЙСТА, ПРОЧИТАЙТЕ !!!',
      greeting: 'Дорогие гости',
      intro: 'Ваш отдых начинается с START HOLIDAY TRANSFER. Вы и ваша семья важны для нас ✅',
      service: 'Мы встречаем вас в аэропорту с приветственной табличкой с вашим именем и сопровождаем к специально подготовленному VIP-автомобилю с бесплатными освежающими напитками для приятного путешествия. Мы демонстрируем наше отличие доступными ценами, ультра-роскошными автомобилями и персонализированным подходом к обслуживанию. Для обратного трансфера мы ждем вас в отеле или указанном адресе в забронированное время и обеспечиваем комфортную поездку к месту назначения.',
      pricing: 'Мы прозрачны в ценах: указанные цены за весь автомобиль, а не за человека. Вы можете пользоваться бесплатными услугами, такими как детские кресла, интернет, холодные напитки, закуски, холодильник, телевизор и зарядные устройства в автомобиле. Кроме того, все наши пассажиры застрахованы нашей специальной страховкой, ваша безопасность - наш приоритет.',
      booking: 'Теперь вы можете сделать бронирование бесплатно онлайн или через нашу круглосуточную службу поддержки WhatsApp и оплатить трансфер наличными в автомобиле или заранее онлайн кредитной картой.'
    }
  }
}

// Para birimleri çevirisi
const currencyTranslations = {
  tr: [
    { code: 'TRY', symbol: '₺', name: 'Türk Lirası' },
    { code: 'USD', symbol: '$', name: 'Amerikan Doları' },
    { code: 'EUR', symbol: '€', name: 'Euro' }
  ],
  en: [
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' }
  ],
  de: [
    { code: 'TRY', symbol: '₺', name: 'Türkische Lira' },
    { code: 'USD', symbol: '$', name: 'US-Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' }
  ],
  ru: [
    { code: 'TRY', symbol: '₺', name: 'Турецкая лира' },
    { code: 'USD', symbol: '$', name: 'Доллар США' },
    { code: 'EUR', symbol: '€', name: 'Евро' }
  ]
}

export default function ReservationForm({ showExtras = true }: { showExtras?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step1Data, setStep1Data] = useState<Step1Data>({
    pickupLocation: 'Antalya Havalimanı',
    dropoffLocation: '',
    adults: 1,
    children: 0,
    currency: 'USD',
    price: 0
  })

  // Ortak input stilleri
  const inputClasses = "w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 hover:border-gray-600 transition-colors appearance-none"
  const labelClasses = "block text-sm font-medium text-gray-300 mb-2"
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false)

  const totalPassengers = step1Data.adults + step1Data.children

  const locations = [
    'Antalya Havalimanı',
    'Konyaaltı',
    'Lara',
    'Kundu',
    'Kaleiçi',
    'Beldibi',
    'Göynük',
    'Kemer',
    'Kiriş',
    'Çamyuva',
    'Tekirova',
    'Kadriye Belek',
    'Bogazkent',
    'Side',
    'Kızılağaç',
    'Kızılot',
    'Okurcalar',
    'Türkler',
    'Konaklı',
    'Alanya merkez',
    'Mahmutlar',
    'Kargıcak'
  ]

  const currencies = currencyTranslations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr']

  const videos: VideoData[] = [
    {
      id: 1,
      thumbnail: '/images/video-thumbnails/transfer-services.jpg',
      title: '',
      youtubeUrl: 'https://www.youtube.com/embed/NApPUzQpDAc'
    },
    {
      id: 2,
      thumbnail: '/images/video-thumbnails/vip-vehicles.jpg',
      title: '',
      youtubeUrl: 'https://www.youtube.com/embed/VIDEO_ID_2'
    },
    {
      id: 3,
      thumbnail: '/images/video-thumbnails/customer-experience.jpg',
      title: '',
      youtubeUrl: 'https://www.youtube.com/embed/VIDEO_ID_3'
    }
  ]

  // Güzergah seçildiğinde fiyatı güncelle
  const findRoutePrice = (from: string, to: string): number => {
    const route = routes.find(r => r.from.toLowerCase() === from.toLowerCase() && r.to.toLowerCase() === to.toLowerCase());
    
    if (!route && from && to) {
      // Güzergah listede yoksa -1 döndür (özel durum için)
      return -1;
    }
    
    return route ? route.price : 0;
  };

  // Form değişikliklerini takip et ve fiyatı güncelle
  useEffect(() => {
    if (step1Data.pickupLocation && step1Data.dropoffLocation) {
      const price = findRoutePrice(step1Data.pickupLocation, step1Data.dropoffLocation);
      setStep1Data(prev => ({ ...prev, price }));
    }
  }, [step1Data.pickupLocation, step1Data.dropoffLocation]);

  // Form gönderildiğinde
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step1Data.price === -1) {
      // Listede olmayan güzergah için WhatsApp'a yönlendir
      window.location.href = `https://wa.me/+905528988899?text=Merhaba,%20${step1Data.pickupLocation}%20-%20${step1Data.dropoffLocation}%20güzergahı%20için%20fiyat%20bilgisi%20alabilir%20miyim?`;
    } else if (step1Data.price > 0) {
      localStorage.setItem('reservationStep1', JSON.stringify(step1Data));
      
      // URL'den dil kodunu al
      let lang = '';
      if (pathname.startsWith('/en/')) lang = 'en';
      else if (pathname.startsWith('/de/')) lang = 'de';
      else if (pathname.startsWith('/ru/')) lang = 'ru';
      
      // Dil koduna göre yönlendirme yap
      if (lang) {
        const route = lang === 'en' ? 'reservation' : lang === 'de' ? 'reservierung' : 'rezervatsiya';
        router.push(`/${lang}/${route}/step2`);
      } else {
        router.push('/reservation/step2');
      }
    }
  };

  // Fiyat listesinden seçim yapıldığında
  const handleRouteSelect = (from: string, to: string, price: number) => {
    const newStep1Data = {
      ...step1Data,
      pickupLocation: from,
      dropoffLocation: to,
      price: price
    };
    
    setStep1Data(newStep1Data);
    localStorage.setItem('reservationStep1', JSON.stringify(newStep1Data));
    
    // URL'den dil kodunu al
    let lang = '';
    if (pathname.startsWith('/en/')) lang = 'en';
    else if (pathname.startsWith('/de/')) lang = 'de';
    else if (pathname.startsWith('/ru/')) lang = 'ru';
    
    // Dil koduna göre yönlendirme yap
    if (lang) {
      const route = lang === 'en' ? 'reservation' : lang === 'de' ? 'reservierung' : 'rezervatsiya';
      router.push(`/${lang}/${route}/step2`);
    } else {
      router.push('/reservation/step2');
    }
  };

  // Fiyat listesi bileşeni
  function PriceList() {
    const t = translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr']
    const [isVisible, setIsVisible] = useState(false);
    const priceListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
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
    }, []);

    return (
      <div ref={priceListRef} className="mt-8">
        <h3 className="text-2xl font-semibold text-white text-center mb-4">
          {t.transferPriceList}
        </h3>
        <p className="text-center text-gray-400 mb-8">
          {t.clickForRoute}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {routes.map((route, index) => (
            <div
              key={index}
              onClick={() => handleRouteSelect(route.from, route.to, route.price)}
              className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer hover:border-red-500"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <svg 
                    className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">{t.fromLabel}</p>
                    <p className="text-white font-medium">{route.from}</p>
                    <p className="text-sm text-gray-400 mt-2">{t.toLabel}</p>
                    <p className="text-white font-medium">{route.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-red-500 group-hover:text-red-600 transition-colors">
                    {route.price} $
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4">
      {/* Mobil Tasarım */}
      <div className="md:hidden">
        {/* Rezervasyon Formu */}
        <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-4 relative z-10 mx-auto max-w-5xl w-full border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <label className={labelClasses}>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].from}</label>
                <MapPinIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.pickupLocation}
                  onChange={(e) => setStep1Data({...step1Data, pickupLocation: e.target.value})}
                  className={`${inputClasses} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjkzIDEuNWEuOTk3Ljk5NyAwIDAgMSAxLjQxNCAwbDYuNjQ3IDYuNjQ2YS45OTcuOTk3IDAgMCAxLS43MDcgMS43MDdIMi4zNTNhLjk5Ny45OTcgMCAwIDEtLjcwNy0xLjcwN2w2LjY0Ny02LjY0NnoiLz48L3N2Zz4=') no-repeat right 0.75rem center/12px 12px`}
                  required
                >
                  <option value="" disabled>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].select}</option>
                  {locations.map((location) => (
                    <option 
                      key={location} 
                      value={location}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className={labelClasses}>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].to}</label>
                <MapPinIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.dropoffLocation}
                  onChange={(e) => setStep1Data({...step1Data, dropoffLocation: e.target.value})}
                  className={`${inputClasses} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjkzIDEuNWEuOTk3Ljk5NyAwIDAgMSAxLjQxNCAwbDYuNjQ3IDYuNjQ2YS45OTcuOTk3IDAgMCAxLS43MDcgMS43MDdIMi4zNTNhLjk5Ny45OTcgMCAwIDEtLjcwNy0xLjcwN2w2LjY0Ny02LjY0NnoiLz48L3N2Zz4=') no-repeat right 0.75rem center/12px 12px`}
                  required
                >
                  <option value="" disabled>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].select}</option>
                  {locations.map((location) => (
                    <option 
                      key={location} 
                      value={location}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className={labelClasses}>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].person}</label>
                <UserIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                  className={`${inputClasses} text-left`}
                >
                  {totalPassengers} {translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].passenger}
                </button>
                {isPassengerDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-3 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white">{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].adult}</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, adults: Math.max(1, prev.adults - 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >-</button>
                            <span className="text-white w-4 text-center">{step1Data.adults}</span>
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, adults: Math.min(10, prev.adults + 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].child}</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, children: Math.max(0, prev.children - 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >-</button>
                            <span className="text-white w-4 text-center">{step1Data.children}</span>
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, children: Math.min(10, prev.children + 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className={labelClasses}>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].currency}</label>
                <CurrencyDollarIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.currency}
                  onChange={(e) => setStep1Data({...step1Data, currency: e.target.value})}
                  className={inputClasses}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={step1Data.price === 0}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                step1Data.price === 0 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : step1Data.price === -1
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {step1Data.price === 0 
                ? translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].selectRoute
                : step1Data.price === -1
                ? translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].clickForReservation
                : translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].priceAndReservation.replace('{price}', step1Data.price.toString())}
            </button>
          </form>
        </div>
      </div>

      {/* Masaüstü Tasarım */}
      <div className="hidden md:block">
        {/* Rezervasyon Formu */}
        <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 relative z-10 mx-auto max-w-5xl w-full border border-gray-800">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="relative">
                <label className={labelClasses}>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].from}</label>
                <MapPinIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.pickupLocation}
                  onChange={(e) => setStep1Data({...step1Data, pickupLocation: e.target.value})}
                  className={`${inputClasses} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjkzIDEuNWEuOTk3Ljk5NyAwIDAgMSAxLjQxNCAwbDYuNjQ3IDYuNjQ2YS45OTcuOTk3IDAgMCAxLS43MDcgMS43MDdIMi4zNTNhLjk5Ny45OTcgMCAwIDEtLjcwNy0xLjcwN2w2LjY0Ny02LjY0NnoiLz48L3N2Zz4=') no-repeat right 0.75rem center/12px 12px`}
                  required
                >
                  <option value="" disabled>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].select}</option>
                  {locations.map((location) => (
                    <option 
                      key={location} 
                      value={location}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className={labelClasses}>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].to}</label>
                <MapPinIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.dropoffLocation}
                  onChange={(e) => setStep1Data({...step1Data, dropoffLocation: e.target.value})}
                  className={`${inputClasses} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjkzIDEuNWEuOTk3Ljk5NyAwIDAgMSAxLjQxNCAwbDYuNjQ3IDYuNjQ2YS45OTcuOTk3IDAgMCAxLS43MDcgMS43MDdIMi4zNTNhLjk5Ny45OTcgMCAwIDEtLjcwNy0xLjcwN2w2LjY0Ny02LjY0NnoiLz48L3N2Zz4=') no-repeat right 0.75rem center/12px 12px`}
                  required
                >
                  <option value="" disabled>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].select}</option>
                  {locations.map((location) => (
                    <option 
                      key={location} 
                      value={location}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className={labelClasses}>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].person}</label>
                <UserIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                  className={`${inputClasses} text-left`}
                >
                  {totalPassengers} {translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].passenger}
                </button>
                {isPassengerDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-3 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white">{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].adult}</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, adults: Math.max(1, prev.adults - 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >-</button>
                            <span className="text-white w-4 text-center">{step1Data.adults}</span>
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, adults: Math.min(10, prev.adults + 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].child}</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, children: Math.max(0, prev.children - 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >-</button>
                            <span className="text-white w-4 text-center">{step1Data.children}</span>
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, children: Math.min(10, prev.children + 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className={labelClasses}>{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].currency}</label>
                <CurrencyDollarIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.currency}
                  onChange={(e) => setStep1Data({...step1Data, currency: e.target.value})}
                  className={inputClasses}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={step1Data.price === 0}
              className={`w-full py-3 rounded-lg font-medium transition-colors mt-3 ${
                step1Data.price === 0 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : step1Data.price === -1
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {step1Data.price === 0 
                ? translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].selectRoute
                : step1Data.price === -1
                ? translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].clickForReservation
                : translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].priceAndReservation.replace('{price}', step1Data.price.toString())}
            </button>
          </form>
        </div>
      </div>

      {showExtras && (
        <>
          {/* Video Galerisi */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white text-center mb-4">{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].whoWeAre}</h2>
            <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 relative z-10 mx-auto max-w-5xl w-full border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(video.youtubeUrl)
                      setIsModalOpen(true)
                    }}
                    className="relative group cursor-pointer rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                        <PlayIcon className="w-16 h-16 text-red-500 group-hover:text-red-600 group-hover:scale-125 transition-all duration-300 drop-shadow-lg" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                        <h3 className="text-white text-lg font-medium">{video.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white text-center mb-6">{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].socialMedia}</h3>
            <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto px-4">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-red-500 transition-colors w-full flex items-center justify-center"
                >
                  <img src="/instagram.png" alt="Instagram" className="h-12 w-auto" />
                </a>
                <span className="text-gray-300 text-sm text-center">{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].pleaseReview}</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://www.tripadvisor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-red-500 transition-colors w-full flex items-center justify-center"
                >
                  <img src="/tripadvisor.png" alt="TripAdvisor" className="h-12 w-auto" />
                </a>
                <span className="text-gray-300 text-sm text-center">{translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].pleaseReadReviews}</span>
              </div>
            </div>
          </div>

          {/* Duyuru Kutusu */}
          <div className="mt-12 bg-gradient-to-r from-amber-900/80 to-amber-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-amber-700/50">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 text-center">
              {translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].announcement.title}
            </h2>
            <div className="text-amber-100/90 space-y-4 text-sm">
              <p className="font-semibold mb-4">
                {translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].announcement.greeting}
              </p>
              <p>
                {translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].announcement.intro}
              </p>
              <p>
                {translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].announcement.service}
              </p>
              <p>
                {translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].announcement.pricing}
              </p>
              <p>
                {translations[pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr'].announcement.booking}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Fiyat Listesi - Her zaman görünür */}
      <PriceList />

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-auto max-h-[80vh] max-w-[95vw] md:max-w-[80vw]">
            <div className="w-full h-full md:aspect-video">
              <iframe
                src={selectedVideo}
                className="w-full h-[50vh] md:h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => {
                setIsModalOpen(false)
                setSelectedVideo(null)
              }}
              className="absolute -top-8 right-2 md:-right-8 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 