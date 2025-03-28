'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import ReservationForm from '@/components/Reservation/ReservationForm'

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType>();

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

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Modern Slider Section */}
      <main>
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Über uns</h2>
          <div className="prose prose-lg prose-invert mx-auto">
            <div className="text-gray-300 space-y-6">
              <p>
                Seit 2013 bietet Start Holiday VIP Transfer luxuriöse und komfortable Transportdienste in Antalya an. Jedes Jahr verbessern wir unsere Servicequalität durch wertvolles Feedback unserer Gäste und die engagierte Arbeit unseres professionellen Teams.
              </p>
              
              <p>
                Wir bieten unseren Gästen nicht nur Transferdienste an, sondern streben danach, unvergessliche Reiseerlebnisse zu schaffen. Zu unseren speziellen Dienstleistungen mit VIP-Minibussen gehören:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Flughafen - Hotel Transfers: Wir bringen Sie komfortabel und sicher an Ihr Ziel.</li>
                <li>Shopping-Touren: Wir bieten speziellen VIP-Transport zu den prestigeträchtigsten Einkaufszentren Antalyas wie Mall of Antalya, Terracity, Mark Antalya und weitere.</li>
                <li>Antalya Stadt, Kemer, Side, Manavgat, Alanya, Dimçayı, Kaş, Fethiye, Ölüdeniz, Saklıkent Fethiye: Wir bieten spezielle Routen für unsere Gäste, die die natürlichen und historischen Schönheiten von Antalya und Umgebung entdecken möchten.</li>
                <li>St. Nikolaus Kirche Besuch: Eine Kirche, die nach dem Tod des Heiligen Nikolaus in Demre erbaut wurde, der als Weihnachtsmann bekannt ist. Es wird angenommen, dass der Weihnachtsmann nach seinem Tod eine Zeit lang hier lag, bevor seine Überreste von italienischen Seeleuten nach Bari gebracht wurden.</li>
              </ul>

              <p>
                <strong className="text-white">Spezielle VIP-Touren:</strong> Sie können Ihr eigenes Programm erstellen und in Begleitung unserer professionellen Fahrer ein besonderes Erlebnis genießen.
              </p>

              <p className="text-xl font-semibold text-white text-center mt-8">
                Wir sind hier, um Ihre Reise in Antalya unvergesslich zu machen, mit Dienstleistungen, die Luxus, Komfort und Sicherheit vereinen!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 