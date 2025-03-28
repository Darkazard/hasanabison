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

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const swiperRef = useRef<SwiperType>();

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

  const getVisibleNumbers = () => {
    const totalSlides = slides.length;
    const current = activeSlide;
    
    if (current === 0) return [totalSlides - 1, 0, 1];
    if (current === totalSlides - 1) return [totalSlides - 2, totalSlides - 1, 0];
    return [current - 1, current, current + 1];
  }

  const links = [
    { href: '/en', text: 'Home' },
    { href: '/en/reservation', text: 'Reservation' },
    { href: '/en/cars', text: 'Cars' },
    { href: '/en/transfers', text: 'Transfers' },
    { href: '/en/gallery', text: 'Gallery' },
    { href: '/en/about', text: 'About' },
    { href: '/en/reviews', text: 'Reviews' },
    { href: '/en/contact', text: 'Contact' }
  ]

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex justify-between items-center py-4 px-4">
          <a href="/" className="text-xl font-bold text-white">
            <span className="text-red-600">Holiday</span> Transfer
          </a>
          <div className="flex items-center gap-1">
            <LanguageSelector className="scale-75" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 focus:outline-none"
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
        } md:hidden`}
        style={{ top: '60px', height: 'calc(100vh - 60px)', zIndex: 40 }}
      >
        <nav className="flex flex-col items-center justify-start h-full p-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-base hover:text-red-500 w-full text-center py-1.5"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>

      {/* Modern Slider Section */}
      <main className="pt-[60px] md:pt-0">
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

            {/* Custom Pagination */}
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
        </div>
      </main>

      {/* About Us Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 p-8 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">About Us</h2>
          <div className="prose prose-lg prose-invert mx-auto">
            <div className="text-gray-300 space-y-6">
              <p>
                Since 2013, Start Holiday VIP Transfer has been providing luxury and comfortable transportation services in Antalya. Each year, we enhance our service quality through valuable feedback from our guests and the dedicated work of our professional team.
              </p>
              
              <p>
                We don't just provide transfer services to our guests, but we aim to create unforgettable travel experiences. Among our special services with VIP minibuses:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Airport - Hotel Transfers: We deliver you to your destination with comfort and safety.</li>
                <li>Shopping Tours: We provide special VIP transportation to Antalya's most prestigious shopping centers such as Mall of Antalya, Terracity, Mark Antalya, etc.</li>
                <li>Antalya city, Kemer, Side, Manavgat, Alanya, Dimçayı, Kaş, Fethiye, Ölüdeniz, Saklıkent Fethiye: We offer special routes for our guests who want to discover the natural and historical beauties of Antalya and its surroundings.</li>
                <li>St. Nicholas Church Visit: A church built after the death of Saint Nicholas in Demre, who is believed to be Santa Claus. It is believed that after his death, Santa Claus lay here for a while, and later his remains were taken to Bari by Italian sailors.</li>
              </ul>

              <p>
                <strong className="text-white">Special VIP Tours:</strong> You can create your own program and have a special experience accompanied by our professional drivers.
              </p>

              <p className="text-xl font-semibold text-white text-center mt-8">
                We are here to make your journey in Antalya unforgettable, providing services that combine luxury, comfort, and safety!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Holiday Transfer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 