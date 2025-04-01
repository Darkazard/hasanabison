'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import ReservationForm from '@/components/Reservation/ReservationForm'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import LanguageSelector from '@/components/LanguageSelector'
import { usePathname } from 'next/navigation'
import { translations } from '@/translations'

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

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType>();
  const pathname = usePathname();
  const currentLang = pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr';

  // Menü açıldığında sayfa scrollunu engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isMenuOpen]);

  const slides = [
    { image: '/images/slider/slide1.jpg' },
    { image: '/images/slider/slide2.jpg' },
    { image: '/images/slider/slide3.jpg' },
    { image: '/images/slider/slide4.jpg' },
    { image: '/images/slider/slide5.jpg' },
    { image: '/images/slider/slide6.jpg' },
    { image: '/images/slider/slide7.jpg' },
    { image: '/images/slider/slide8.jpg' },
    { image: '/images/slider/slide9.jpg' },
    { image: '/images/slider/slide10.jpg' },
    { image: '/images/slider/slide11.jpg' },
    { image: '/images/slider/slide12.jpg' },
    { image: '/images/slider/slide13.jpg' },
    { image: '/images/slider/slide14.jpg' },
    { image: '/images/slider/slide15.jpg' },
    { image: '/images/slider/slide16.jpg' }
  ]

  // Görünecek pagination numaralarını hesapla
  const getVisibleNumbers = () => {
    const totalSlides = slides.length;
    const current = activeSlide;
    
    if (current === 0) return [totalSlides - 1, 0, 1];
    if (current === totalSlides - 1) return [totalSlides - 2, totalSlides - 1, 0];
    return [current - 1, current, current + 1];
  }

  const links = [
    { href: '/anasayfa', text: 'Anasayfa' },
    { href: '/rezervasyon', text: 'Rezervasyon' },
    { href: '/araclar', text: 'Araçlar' },
    { href: '/transferler', text: 'Transferler' },
    { href: '/galeri', text: 'Galeri' },
    { href: '/hakkimizda', text: 'Hakkımızda' },
    { href: '/yorumlar', text: 'Yorumlar' },
    { href: '/iletisim', text: 'İletişim' }
  ]

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="flex justify-between items-center py-3 px-4">
          <a href="/" className="text-xl font-bold text-white">
            <span className="text-red-600">Holiday</span> Transfer
          </a>
          <div className="flex items-center gap-2">
            <LanguageSelector className="scale-75" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden z-[90]`}
        style={{ top: '52px', height: 'calc(100vh - 52px)' }}
      >
        <nav className="flex flex-col items-center justify-start h-full p-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-base hover:text-red-500 w-full text-center py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>

      {/* Modern Slider Section */}
      <main className="pt-[52px] md:pt-0">
        <div className="container mx-auto px-4 py-8">
          <div className="relative max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[55vh] lg:h-[85vh]">
              <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={false}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-full rounded-2xl"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveSlide(swiper.realIndex);
                }}
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        style={{ objectFit: 'cover' }}
                        className="rounded-2xl lg:object-contain lg:bg-[#111]"
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Özel Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {getVisibleNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.slideToLoop(num);
                    }
                  }}
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all duration-300 ${
                    activeSlide === num
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-black/50 text-gray-300 hover:bg-black/70 hover:text-white'
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Reservation Form */}
          <div className="mt-8">
            <ReservationForm showExtras={true} />
          </div>

          {/* About Us Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="bg-black backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800 p-8 mb-20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Hakkımızda</h2>
              <div className="prose prose-lg prose-invert mx-auto">
                <div className="text-white space-y-6">
                  <p>
                    2013 yılından bu yana, Start Holiday VIP Transfer olarak Antalya'da lüks ve konforlu ulaşım hizmetleri sunuyoruz. Her geçen yıl, değerli misafirlerimizden aldığımız geri bildirimler ve profesyonel ekibimizin özverili çalışmaları sayesinde hizmet kalitemizi daha da kusursuz hale getiriyoruz.
                  </p>
                  
                  <p>
                    Misafirlerimize sadece bir transfer hizmeti sunmuyor, aynı zamanda unutulmaz bir seyahat deneyimi yaşatmayı hedefliyoruz. VIP minibüslerimizle sunduğumuz özel hizmetler arasında:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Havalimanı - Otel Transferleri: Konforlu ve güvenli bir şekilde gideceğiniz noktaya ulaştırıyoruz.</li>
                    <li>Alışveriş Turları: Antalya'nın en prestijli alışveriş merkezlerine Mall of Antalya, Terracity, Mark Antalya vb... özel VIP ulaşım sağlıyoruz.</li>
                    <li>Antalya city, Kemer, Side, Manavgat, Alanya, Dimçayı, Kaş, Fethiye, Ölüdeniz, Saklıkent Fethiye: Antalya ve çevresinin doğal ve tarihi güzelliklerini keşfetmek isteyen misafirlerimize özel rotalar sunuyoruz.</li>
                    <li>St. Nicholas Kilisesi Ziyareti: Demre'de bulunan, Noel Baba olduğuna inanılan Aziz Nikolaos'ın ölümü ile yapılan kilise. Noel Baba'nın ölümünden sonra bir süre burada yattığı daha sonra kemiklerinin İtalyan denizcilerce Bari'ye götürüldüğüne inanılır.</li>
                  </ul>

                  <p>
                    <strong className="text-white">Özel VIP Geziler:</strong> Kendi programınızı oluşturabilir, profesyonel sürücülerimiz eşliğinde size özel bir deneyim yaşayabilirsiniz.
                  </p>

                  <p className="text-xl font-semibold text-white text-center mt-8">
                    Lüks, konfor ve güveni bir arada sunan hizmetlerimizle, Antalya'da unutulmaz bir yolculuk için buradayız!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 